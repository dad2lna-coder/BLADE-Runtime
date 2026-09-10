/**
 * Data model for the Blade Team Builder plugin.
 *
 * The plugin never reaches into a global `window.Scheduler` object. It is
 * handed plain data (`lines`, `shifts`) as props/attributes, and it reports
 * changes back out through events. See README.md for the integration
 * contract with the host Blade app.
 */

export type Sex = "M" | "F";
export type Role = "TSO" | "LTSO" | "STSO";
export type Phase = "Opening" | "AM" | "PM" | "Closing";

/** A shift definition, as produced by Blade's Setup tab. */
export interface Shift {
  id: string;
  name: string;
  /** "HH:MM" 24-hour */
  start: string;
  /** "HH:MM" 24-hour */
  end: string;
  paid?: number;
}

/** A single bid line, as produced by Blade's schedule generator. */
export interface Line {
  id: number | string;
  lineCode?: string;
  shiftId: string;
  shiftName?: string;
  sex: Sex;
  /** "FT" | "PT" | "LTSO" | "STSO" | ... */
  empClass?: string;
  isStso?: boolean;
  isLtso?: boolean;
  rdoDays?: number[];
  paid?: number;
}

/** Denormalized, display-ready view of a Line inside the Team Builder. */
export interface PoolEntry {
  /** Same value as the source Line's id, coerced to a number for map keys. */
  id: number;
  lineId: Line["id"];
  lineCode: string;
  role: Role;
  start: string;
  startMin: number;
  rdo: string;
  rdoLabel: string;
  sex: Sex;
  empClass: string;
  shiftId: string;
  shiftName: string;
  paid: number;
}

export interface Team {
  id: string;
  name: string;
  /** PoolEntry ids (numbers), in display order. */
  members: number[];
  followMe: boolean;
  phase: Phase | null;
}

export interface TeamFilters {
  role: "ALL" | Role;
  start: string;
  /** Day-of-week index (0-6) as a string, or "" for any. */
  rdo: string;
}

export interface ArchTargets {
  stso: number;
  ltso: number;
  tso: number;
}

export interface FormOptions {
  /** Minutes of tolerance when matching candidate start times to a team's anchor. */
  startWindowMin: number;
  /** If true, a single shared RDO day (instead of an exact match) is enough to place someone. */
  allowOneRdo: boolean;
}

export type OddityCode = "FILL" | "NOLTSO" | "SEX";

export interface TeamOddity {
  code: OddityCode;
  label: string;
}

export interface RoleSexCounts {
  M: number;
  F: number;
}

export interface TeamMemberCounts {
  STSO: RoleSexCounts;
  LTSO: RoleSexCounts;
  TSO: RoleSexCounts;
  total: number;
}

export interface TeamStatsRow {
  id: string;
  name: string;
  counts: TeamMemberCounts;
  followMe: boolean;
  oddities: TeamOddity[];
}

export interface TeamStats {
  total: number;
  assigned: number;
  unassigned: number;
  rows: TeamStatsRow[];
}

/** Shape of the data the host app hands in. */
export interface TeamBuilderInput {
  lines: Line[];
  shifts: Shift[];
  /** Days from midnight the schedule spans, used only to size RDO rebalancing. Defaults to 7. */
  weekCount?: number;
  /** Minutes of slack used when classifying a start time into Opening/AM/PM/Closing. Defaults to 15. */
  phaseThresholdMin?: number;
}

/** Snapshot the plugin emits whenever team membership or team list changes. */
export interface TeamBuilderSnapshot {
  teams: Team[];
}

/** Emitted when the plugin swaps two lines' RDO days to improve sex balance. The host owns
 *  re-deriving each line's actual WORK/RDO calendar and should re-run its own schedule builder
 *  for the two line ids listed. */
export interface RdoSwap {
  lineIdA: Line["id"];
  lineIdB: Line["id"];
  rdoDaysA: number[];
  rdoDaysB: number[];
}
