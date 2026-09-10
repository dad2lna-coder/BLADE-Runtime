<script lang="ts">
  import type { TeamFilters, Team, Role, PoolEntry } from "../types";
  import { DAY_NAMES } from "../utils/time";
  import { uniqueStartTimes } from "../utils/pool";

  export let filters: TeamFilters;
  export let pool: PoolEntry[];
  export let teams: Team[];
  export let selectedCount: number;
  export let onFilterChange: (next: TeamFilters) => void;
  export let onClearFilters: () => void;
  export let onSelectAllVisible: () => void;
  export let onClearSelection: () => void;
  export let onAssignSelected: (teamId: string) => void;

  let assignTarget = "";

  $: startOptions = uniqueStartTimes(pool);

  function setRole(role: Role | "ALL") {
    onFilterChange({ ...filters, role });
  }
  function setStart(start: string) {
    onFilterChange({ ...filters, start });
  }
  function setRdo(rdo: string) {
    onFilterChange({ ...filters, rdo });
  }
</script>

<div class="toolbar">
  <label>
    Role
    <select value={filters.role} on:change={(e) => setRole(e.currentTarget.value)}>
      <option value="ALL">All</option>
      <option value="TSO">TSO</option>
      <option value="LTSO">LTSO</option>
      <option value="STSO">STSO</option>
    </select>
  </label>

  <label>
    Start
    <select value={filters.start} on:change={(e) => setStart(e.currentTarget.value)}>
      <option value="">All starts</option>
      {#each startOptions as s}
        <option value={s}>{s}</option>
      {/each}
    </select>
  </label>

  <label>
    RDO
    <select value={filters.rdo} on:change={(e) => setRdo(e.currentTarget.value)}>
      <option value="">Any RDO day</option>
      {#each DAY_NAMES as name, i}
        <option value={String(i)}>{name}</option>
      {/each}
    </select>
  </label>

  <button type="button" class="btn" on:click={onClearFilters}>Clear filters</button>

  <span class="team-assign-bar toolbar">
    <label>
      Add selected to
      <select bind:value={assignTarget}>
        <option value="">— Select team —</option>
        {#each teams as t}
          <option value={t.id}>{t.name || t.id}</option>
        {/each}
      </select>
    </label>
    <button
      type="button"
      class="btn btn-amber"
      disabled={!assignTarget || !selectedCount}
      on:click={() => assignTarget && onAssignSelected(assignTarget)}
    >
      Add to team{selectedCount ? ` (${selectedCount})` : ""}
    </button>
    <button type="button" class="btn" on:click={onSelectAllVisible}>Select all visible</button>
    <button type="button" class="btn" on:click={onClearSelection}>Clear selection</button>
  </span>
</div>
