import type { Team, PoolEntry, ArchTargets, FormOptions, Role, Line, RdoSwap } from "../types";
import { padNum } from "./time";
import { createTeam, teamMemberCounts, renumberTeamsByStart } from "./team";
import { findEntry, groupPoolByRole } from "./pool";

function sexOf(p: PoolEntry): "M" | "F" {
  return p.sex === "F" ? "F" : "M";
}

function startsClose(a: PoolEntry, b: PoolEntry, windowMin: number): boolean {
  const diff = Math.abs(a.startMin - b.startMin);
  const wrap = Math.min(diff, 24 * 60 - diff);
  return wrap <= windowMin;
}

function rdoDaysOf(p: PoolEntry): number[] {
  return p.rdo ? p.rdo.split(",").map(Number).filter((d) => d >= 0 && d <= 6) : [];
}

function rdoExact(a: PoolEntry, b: PoolEntry): boolean {
  const ka = rdoDaysOf(a).slice().sort().join(",");
  const kb = rdoDaysOf(b).slice().sort().join(",");
  return ka === kb && ka !== "";
}

function rdoOverlapCount(a: PoolEntry, b: PoolEntry): number {
  const set = new Set(rdoDaysOf(a));
  return rdoDaysOf(b).filter((d) => set.has(d)).length;
}

export interface AutoFormResult {
  teams: Team[];
  assigned: number;
  leftInPool: number;
}

/**
 * One team per STSO line ("supervisor anchors the team"). Everyone else is
 * placed by: start time within `startWindowMin` of the team's anchor, AND
 * (an exact RDO match, or - if `allowOneRdo` - at least one shared RDO day).
 * Among several eligible teams, prefer: better match quality, then the
 * opposite sex of the anchor for LTSO/STSO (spreads supervision across
 * sexes), then whichever choice improves that role's sex balance, then the
 * team with the most unmet need. Anyone who doesn't fit stays in the pool
 * for manual placement.
 */
export function autoFormTeams(
  pool: PoolEntry[],
  arch: ArchTargets,
  opts: FormOptions,
  phaseThresholdMin: number
): AutoFormResult {
  const byRole = groupPoolByRole(pool);
  const nTeams = byRole.STSO.length;
  if (!nTeams) return { teams: [], assigned: 0, leftInPool: pool.length };

  let teams: Team[] = [];
  for (let i = 0; i < nTeams; i++) teams.push(createTeam(teams.length));

  const used = new Set<number>();
  const targetFor = (role: Role) => (role === "STSO" ? arch.stso : role === "LTSO" ? arch.ltso : arch.tso);

  function roleNeed(team: Team, role: Role): number {
    const c = teamMemberCounts(team, pool);
    return Math.max(0, targetFor(role) - (c[role].M + c[role].F));
  }
  function teamAnchor(team: Team): PoolEntry | undefined {
    return team.members.length ? findEntry(pool, team.members[0]) : undefined;
  }
  function matchQuality(p: PoolEntry, anchor: PoolEntry | undefined): number {
    if (!anchor) return 0;
    if (!startsClose(p, anchor, opts.startWindowMin)) return 0;
    if (rdoExact(p, anchor)) return 3;
    if (opts.allowOneRdo && rdoOverlapCount(p, anchor) >= 1) return 1;
    return 0;
  }
  function oppositeSup(p: PoolEntry, anchor: PoolEntry | undefined, role: Role): number {
    if (role !== "LTSO" && role !== "STSO") return 0;
    if (!anchor) return 0;
    return sexOf(p) !== sexOf(anchor) ? 1 : 0;
  }
  function teamSexScore(team: Team, candidate: PoolEntry): number {
    const c = teamMemberCounts(team, pool);
    let m = c.STSO.M + c.LTSO.M + c.TSO.M;
    let f = c.STSO.F + c.LTSO.F + c.TSO.F;
    sexOf(candidate) === "F" ? f++ : m++;
    return Math.abs(m - f) / Math.max(1, m + f);
  }
  function roleSexScore(team: Team, role: Role, candidate: PoolEntry): number {
    const c = teamMemberCounts(team, pool);
    let m = c[role].M;
    let f = c[role].F;
    sexOf(candidate) === "F" ? f++ : m++;
    return Math.abs(m - f) / Math.max(1, m + f);
  }

  // Seed each team with one STSO, ordered by start time so team numbers follow the schedule.
  const stsoSeeds = [...byRole.STSO].sort((a, b) =>
    a.startMin !== b.startMin ? a.startMin - b.startMin : a.rdo.localeCompare(b.rdo)
  );
  stsoSeeds.forEach((p, idx) => {
    const team = teams[idx];
    if (!team) return;
    team.members.push(p.id);
    used.add(p.id);
    team.name = padNum(idx + 1, Math.max(2, String(nTeams).length));
  });
  teams = renumberTeamsByStart(teams, pool, phaseThresholdMin);

  function assignRole(role: Role) {
    const candidates = byRole[role]
      .filter((p) => !used.has(p.id))
      .sort((a, b) => {
        if (sexOf(a) !== sexOf(b)) return sexOf(a) === "F" ? -1 : 1;
        return a.startMin - b.startMin;
      });

    for (const p of candidates) {
      const scored = teams
        .map((t) => {
          if (roleNeed(t, role) <= 0) return null;
          const anchor = teamAnchor(t);
          const q = matchQuality(p, anchor);
          if (!q) return null;
          return {
            team: t,
            q,
            opp: oppositeSup(p, anchor, role),
            need: roleNeed(t, role),
            teamSex: teamSexScore(t, p),
            roleSex: roleSexScore(t, role, p)
          };
        })
        .filter((x): x is NonNullable<typeof x> => x !== null);

      if (!scored.length) continue; // leave in pool for manual placement

      scored.sort((a, b) => {
        if (b.q !== a.q) return b.q - a.q;
        if (b.opp !== a.opp) return b.opp - a.opp;
        if (a.teamSex !== b.teamSex) return a.teamSex - b.teamSex;
        if (a.roleSex !== b.roleSex) return a.roleSex - b.roleSex;
        return b.need - a.need;
      });
      scored[0].team.members.push(p.id);
      used.add(p.id);
    }
  }

  assignRole("STSO");
  assignRole("LTSO");
  assignRole("TSO");

  return { teams, assigned: used.size, leftInPool: pool.length - used.size };
}

function rdoImbalanceScore(lines: Pick<Line, "sex" | "rdoDays">[]): number {
  let mTot = 0,
    fTot = 0;
  const mDay = new Array(7).fill(0);
  const fDay = new Array(7).fill(0);
  for (const l of lines) {
    const isF = l.sex === "F";
    isF ? fTot++ : mTot++;
    for (const d of l.rdoDays ?? []) (isF ? fDay : mDay)[d]++;
  }
  let score = 0;
  for (let d = 0; d < 7; d++) {
    const mShare = mTot ? mDay[d] / mTot : 0;
    const fShare = fTot ? fDay[d] / fTot : 0;
    score += Math.abs(mShare - fShare);
  }
  return score;
}

/**
 * Look for pairs of same-role, same-RDO-length, opposite-sex lines whose RDO
 * patterns can be swapped to even out the male/female split on each weekday.
 * Returns the list of swaps to make; the plugin does not mutate schedules
 * itself (see RdoSwap in types.ts) - the host re-runs its own schedule
 * builder for the affected line ids.
 */
export function rebalanceRdoBySex(lines: Line[], maxIterationsPerRole = 80): RdoSwap[] {
  const swaps: RdoSwap[] = [];
  const roles: Role[] = ["STSO", "LTSO", "TSO"];
  for (const role of roles) {
    const group = lines.filter((l) => {
      const r: Role = l.isStso ? "STSO" : l.isLtso ? "LTSO" : "TSO";
      return r === role;
    });

    let improved = true;
    let guard = 0;
    while (improved && guard++ < maxIterationsPerRole) {
      improved = false;
      let best: { a: Line; b: Line; da: number[]; db: number[]; score: number } | null = null;
      const base = rdoImbalanceScore(group);

      for (let i = 0; i < group.length; i++) {
        for (let j = i + 1; j < group.length; j++) {
          const a = group[i];
          const b = group[j];
          if (a.sex === b.sex) continue;
          if ((a.rdoDays?.length ?? 0) !== (b.rdoDays?.length ?? 0)) continue;
          const da = [...(a.rdoDays ?? [])];
          const db = [...(b.rdoDays ?? [])];
          if ([...da].sort().join() === [...db].sort().join()) continue;

          const trial = group.map((l) => (l === a ? { ...l, rdoDays: db } : l === b ? { ...l, rdoDays: da } : l));
          const next = rdoImbalanceScore(trial);
          if (next + 0.0001 < base && (!best || next < best.score)) {
            best = { a, b, da, db, score: next };
          }
        }
      }

      if (best) {
        best.a.rdoDays = best.db;
        best.b.rdoDays = best.da;
        swaps.push({ lineIdA: best.a.id, lineIdB: best.b.id, rdoDaysA: best.db, rdoDaysB: best.da });
        improved = true;
      }
    }
  }
  return swaps;
}
