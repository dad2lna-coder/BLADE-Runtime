import { writable, derived, get, type Readable, type Writable } from "svelte/store";
import type {
  Line,
  Shift,
  Team,
  TeamFilters,
  ArchTargets,
  FormOptions,
  PoolEntry,
  TeamStats,
  RdoSwap
} from "../types";
import { collectPool, pruneMissingMembers, unassignedPool, assignedIds } from "../utils/pool";
import {
  createTeam,
  addMemberToTeam,
  removeMemberFromTeam,
  renumberTeamsByStart,
  teamMemberCounts,
  teamOddities
} from "../utils/team";
import { autoFormTeams, rebalanceRdoBySex, type AutoFormResult } from "../utils/autoForm";

export interface TeamBuilderStore {
  lines: Writable<Line[]>;
  shifts: Writable<Shift[]>;
  teams: Writable<Team[]>;
  filters: Writable<TeamFilters>;
  selected: Writable<Set<number>>;
  archTargets: Writable<ArchTargets>;
  formOptions: Writable<FormOptions>;
  phaseThresholdMin: Writable<number>;

  pool: Readable<PoolEntry[]>;
  unassigned: Readable<PoolEntry[]>;
  stats: Readable<TeamStats>;
  anyFollowed: Readable<boolean>;

  // actions
  newTeam: () => void;
  removeTeam: (id: string) => void;
  renameTeam: (id: string, name: string) => void;
  toggleFollow: (id: string) => void;
  clearAllFollow: () => void;
  moveMember: (poolId: number, toTeamId: string | null) => void;
  toggleSelected: (poolId: number) => void;
  selectAllVisible: () => void;
  clearSelection: () => void;
  assignSelectedTo: (teamId: string) => number;
  clearFilters: () => void;
  autoForm: () => AutoFormResult;
  rebalanceRdo: () => RdoSwap[];
  renumber: () => void;
}

const DEFAULT_FILTERS: TeamFilters = { role: "ALL", start: "", rdo: "" };
const DEFAULT_ARCH: ArchTargets = { stso: 1, ltso: 1, tso: 6 };
const DEFAULT_FORM_OPTS: FormOptions = { startWindowMin: 30, allowOneRdo: false };

export function createTeamBuilderStore(initial?: {
  lines?: Line[];
  shifts?: Shift[];
  phaseThresholdMin?: number;
}): TeamBuilderStore {
  const lines = writable<Line[]>(initial?.lines ?? []);
  const shifts = writable<Shift[]>(initial?.shifts ?? []);
  const teams = writable<Team[]>([]);
  const filters = writable<TeamFilters>({ ...DEFAULT_FILTERS });
  const selected = writable<Set<number>>(new Set());
  const archTargets = writable<ArchTargets>({ ...DEFAULT_ARCH });
  const formOptions = writable<FormOptions>({ ...DEFAULT_FORM_OPTS });
  const phaseThresholdMin = writable<number>(initial?.phaseThresholdMin ?? 15);

  const pool = derived([lines, shifts], ([$lines, $shifts]) => collectPool($lines, $shifts));

  // Whenever the pool changes shape (a Generate happened upstream), drop team
  // members whose line no longer exists.
  pool.subscribe(($pool) => {
    teams.update((t) => pruneMissingMembers(t, $pool));
  });

  const unassigned = derived([pool, teams, filters], ([$pool, $teams, $filters]) =>
    unassignedPool($pool, $teams, $filters)
  );

  const stats = derived([pool, teams, archTargets], ([$pool, $teams, $arch]) => {
    const assigned = assignedIds($teams);
    let assignedN = 0;
    for (const p of $pool) if (assigned.has(p.id)) assignedN++;
    return {
      total: $pool.length,
      assigned: assignedN,
      unassigned: $pool.length - assignedN,
      rows: $teams.map((t) => ({
        id: t.id,
        name: t.name,
        counts: teamMemberCounts(t, $pool),
        followMe: t.followMe,
        oddities: teamOddities(t, $pool, $arch)
      }))
    };
  });

  const anyFollowed = derived(teams, ($teams) => $teams.some((t) => t.followMe));

  function newTeam() {
    teams.update((list) => [...list, createTeam(list.length)]);
  }

  function removeTeam(id: string) {
    teams.update((list) => list.filter((t) => t.id !== id));
  }

  function renameTeam(id: string, name: string) {
    teams.update((list) => list.map((t) => (t.id === id ? { ...t, name } : t)));
  }

  function toggleFollow(id: string) {
    teams.update((list) => list.map((t) => (t.id === id ? { ...t, followMe: !t.followMe } : t)));
  }

  function clearAllFollow() {
    teams.update((list) => list.map((t) => ({ ...t, followMe: false })));
  }

  /** Move a pool member into a team, or back to the unassigned pool (toTeamId = null). */
  function moveMember(poolId: number, toTeamId: string | null) {
    teams.update((list) => {
      const stripped = list.map((t) => ({ ...t, members: t.members.filter((m) => m !== poolId) }));
      if (toTeamId == null) return stripped;
      return addMemberToTeam(stripped, toTeamId, poolId);
    });
  }

  function toggleSelected(poolId: number) {
    selected.update((set) => {
      const next = new Set(set);
      next.has(poolId) ? next.delete(poolId) : next.add(poolId);
      return next;
    });
  }

  function selectAllVisible() {
    const visible = get(unassigned);
    selected.update((set) => {
      const next = new Set(set);
      for (const p of visible) next.add(p.id);
      return next;
    });
  }

  function clearSelection() {
    selected.set(new Set());
  }

  function assignSelectedTo(teamId: string): number {
    const ids = [...get(selected)];
    if (!ids.length) return 0;
    teams.update((list) => ids.reduce((acc, id) => addMemberToTeam(acc, teamId, id), list));
    clearSelection();
    return ids.length;
  }

  function clearFilters() {
    filters.set({ ...DEFAULT_FILTERS });
  }

  function autoForm(): AutoFormResult {
    const result = autoFormTeams(get(pool), get(archTargets), get(formOptions), get(phaseThresholdMin));
    teams.set(result.teams);
    return result;
  }

  function rebalanceRdo(): RdoSwap[] {
    const currentLines = get(lines);
    const clones = currentLines.map((l) => ({ ...l }));
    const swaps = rebalanceRdoBySex(clones);
    if (swaps.length) lines.set(clones);
    return swaps;
  }

  function renumber() {
    teams.update((list) => renumberTeamsByStart(list, get(pool), get(phaseThresholdMin)));
  }

  return {
    lines,
    shifts,
    teams,
    filters,
    selected,
    archTargets,
    formOptions,
    phaseThresholdMin,
    pool,
    unassigned,
    stats,
    anyFollowed,
    newTeam,
    removeTeam,
    renameTeam,
    toggleFollow,
    clearAllFollow,
    moveMember,
    toggleSelected,
    selectAllVisible,
    clearSelection,
    assignSelectedTo,
    clearFilters,
    autoForm,
    rebalanceRdo,
    renumber
  };
}
