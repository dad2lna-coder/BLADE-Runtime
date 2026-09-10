import type { Team, PoolEntry, TeamMemberCounts, ArchTargets, TeamOddity, Role } from "../types";
import { padNum } from "./time";
import { computeShiftAnchors, phaseOfStart, PHASE_RANK, type PhaseAnchors } from "./phase";
import { findEntry } from "./pool";

let teamSeq = 1;

/** Reset the internal id counter. Call once when a fresh Team Builder session starts,
 *  or leave alone to keep ids unique across the page's lifetime. */
export function resetTeamSequence(startAt = 1): void {
  teamSeq = startAt;
}

export function createTeam(existingCount: number, name?: string): Team {
  const n = teamSeq++;
  const width = Math.max(2, String(existingCount + 1).length);
  return {
    id: `T${n}`,
    name: name && name !== "" ? String(name) : padNum(n, width),
    members: [],
    followMe: false,
    phase: null
  };
}

export function teamMemberCounts(team: Team, pool: PoolEntry[]): TeamMemberCounts {
  const counts: TeamMemberCounts = {
    STSO: { M: 0, F: 0 },
    LTSO: { M: 0, F: 0 },
    TSO: { M: 0, F: 0 },
    total: 0
  };
  for (const mid of team.members) {
    const p = findEntry(pool, mid);
    if (!p) continue;
    counts.total++;
    const role: Role = p.role === "STSO" || p.role === "LTSO" ? p.role : "TSO";
    counts[role][p.sex === "F" ? "F" : "M"]++;
  }
  return counts;
}

export function teamPhaseInfo(
  team: Team,
  pool: PoolEntry[],
  anchors: PhaseAnchors,
  thresholdMin: number
): { startMin: number; phase: "Opening" | "AM" | "PM" | "Closing"; rank: number } {
  let best = 24 * 60;
  let phase: "Opening" | "AM" | "PM" | "Closing" = "AM";
  for (const mid of team.members) {
    const p = findEntry(pool, mid);
    if (!p) continue;
    if (p.startMin < best) {
      best = p.startMin;
      phase = phaseOfStart(p.startMin, anchors, thresholdMin);
    }
  }
  return { startMin: best, phase, rank: PHASE_RANK[phase] };
}

/** Sort teams Opening -> AM -> PM -> Closing, then by start time, and re-pad names 01, 02, ... */
export function renumberTeamsByStart(
  teams: Team[],
  pool: PoolEntry[],
  thresholdMin: number
): Team[] {
  const anchors = computeShiftAnchors(pool);
  const withInfo = teams.map((t) => ({ team: t, info: teamPhaseInfo(t, pool, anchors, thresholdMin) }));
  withInfo.sort((a, b) => {
    if (a.info.rank !== b.info.rank) return a.info.rank - b.info.rank;
    if (a.info.startMin !== b.info.startMin) return a.info.startMin - b.info.startMin;
    return a.team.id.localeCompare(b.team.id);
  });
  const width = Math.max(2, String(withInfo.length).length);
  return withInfo.map(({ team, info }, i) => ({
    ...team,
    phase: info.phase,
    name: padNum(i + 1, width)
  }));
}

export function addMemberToTeam(teams: Team[], teamId: string, poolId: number): Team[] {
  return teams.map((t) => {
    if (t.id === teamId) {
      return t.members.includes(poolId) ? t : { ...t, members: [...t.members, poolId] };
    }
    // A line can only belong to one team at a time.
    return t.members.includes(poolId) ? { ...t, members: t.members.filter((m) => m !== poolId) } : t;
  });
}

export function removeMemberFromTeam(teams: Team[], teamId: string, poolId: number): Team[] {
  return teams.map((t) => (t.id === teamId ? { ...t, members: t.members.filter((m) => m !== poolId) } : t));
}

const ROLE_RANK: Record<Role, number> = { STSO: 0, LTSO: 1, TSO: 2 };

/** Members within a team, sorted supervisors-first then by pool id. */
export function sortedMembers(team: Team, pool: PoolEntry[]): number[] {
  return [...team.members].sort((a, b) => {
    const pa = findEntry(pool, a);
    const pb = findEntry(pool, b);
    const ra = pa ? ROLE_RANK[pa.role] : 3;
    const rb = pb ? ROLE_RANK[pb.role] : 3;
    return ra !== rb ? ra - rb : a - b;
  });
}

export function teamOddities(team: Team, pool: PoolEntry[], arch: ArchTargets): TeamOddity[] {
  const flags: TeamOddity[] = [];
  const c = teamMemberCounts(team, pool);
  const archSize = arch.stso + arch.ltso + arch.tso;
  const fill = archSize ? c.total / archSize : 1;
  if (archSize && fill < 0.7) flags.push({ code: "FILL", label: `${Math.round(fill * 100)}% filled` });
  if (arch.ltso > 0 && c.LTSO.M + c.LTSO.F < 1) flags.push({ code: "NOLTSO", label: "no LTSO" });
  const m = c.STSO.M + c.LTSO.M + c.TSO.M;
  const f = c.STSO.F + c.LTSO.F + c.TSO.F;
  const tot = m + f;
  if (tot >= 3 && Math.abs(m - f) / tot >= 0.4) flags.push({ code: "SEX", label: `${m}M/${f}F` });
  return flags;
}
