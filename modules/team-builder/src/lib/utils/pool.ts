import type { Line, Shift, PoolEntry, Role, TeamFilters, Team } from "../types";
import { timeToMin, DAY_NAMES } from "./time";

export function roleOfLine(line: Line): Role {
  if (line.isStso) return "STSO";
  if (line.isLtso) return "LTSO";
  return "TSO";
}

export function rdoKey(line: Pick<Line, "rdoDays">): string {
  return [...(line.rdoDays ?? [])].sort((a, b) => a - b).join(",");
}

export function rdoLabel(line: Pick<Line, "rdoDays">): string {
  const key = rdoKey(line);
  if (!key) return "—";
  return key
    .split(",")
    .map((i) => DAY_NAMES[Number(i)] ?? i)
    .join(",");
}

function buildShiftIndex(shifts: Shift[]): Map<string, Shift> {
  return new Map(shifts.map((s) => [s.id, s]));
}

/** Turn raw Lines into the flat, display-ready rows the Team Builder works with. */
export function collectPool(lines: Line[], shifts: Shift[]): PoolEntry[] {
  const shiftById = buildShiftIndex(shifts);
  return lines.map((line) => {
    const shift = shiftById.get(line.shiftId);
    return {
      id: Number(line.id),
      lineId: line.id,
      lineCode: line.lineCode ?? `L${line.id}`,
      role: roleOfLine(line),
      start: shift?.start ?? "—",
      startMin: shift ? timeToMin(shift.start) ?? 0 : 0,
      rdo: rdoKey(line),
      rdoLabel: rdoLabel(line),
      sex: line.sex ?? "M",
      empClass: line.empClass ?? "",
      shiftId: line.shiftId,
      shiftName: line.shiftName ?? shift?.name ?? line.shiftId,
      paid: line.paid ?? shift?.paid ?? 0
    };
  });
}

/** Drop team members whose backing line no longer exists (e.g. after Blade re-generates). */
export function pruneMissingMembers(teams: Team[], pool: PoolEntry[]): Team[] {
  const valid = new Set(pool.map((p) => p.id));
  return teams.map((t) => ({ ...t, members: t.members.filter((m) => valid.has(m)) }));
}

export function applyFilters(pool: PoolEntry[], filters: TeamFilters): PoolEntry[] {
  return pool.filter((p) => {
    if (filters.role !== "ALL" && p.role !== filters.role) return false;
    if (filters.start && p.start !== filters.start) return false;
    if (filters.rdo !== "") {
      const days = p.rdo ? p.rdo.split(",") : [];
      if (!days.includes(String(filters.rdo))) return false;
    }
    return true;
  });
}

export function assignedIds(teams: Team[]): Set<number> {
  const set = new Set<number>();
  for (const t of teams) for (const m of t.members) set.add(m);
  return set;
}

export function unassignedPool(pool: PoolEntry[], teams: Team[], filters: TeamFilters): PoolEntry[] {
  const assigned = assignedIds(teams);
  return applyFilters(pool, filters).filter((p) => !assigned.has(p.id));
}

const ROLE_ORDER: Role[] = ["TSO", "LTSO", "STSO"];

export function groupPoolByRole(list: PoolEntry[]): Record<Role, PoolEntry[]> {
  const groups: Record<Role, PoolEntry[]> = { TSO: [], LTSO: [], STSO: [] };
  for (const p of list) groups[p.role in groups ? p.role : "TSO"].push(p);
  return groups;
}

export function roleGroupOrder(): Role[] {
  return ROLE_ORDER;
}

export function findEntry(pool: PoolEntry[], id: number): PoolEntry | undefined {
  return pool.find((p) => p.id === id);
}

export function uniqueStartTimes(pool: PoolEntry[]): string[] {
  return [...new Set(pool.map((p) => p.start))].sort();
}
