<svelte:options
  customElement={{
    tag: "blade-team-builder",
    shadow: "none",
    props: {
      lines: { type: "Array" },
      shifts: { type: "Array" },
      weekCount: { type: "Number" },
      phaseThresholdMin: { type: "Number" },
      archStso: { type: "Number" },
      archLtso: { type: "Number" },
      archTso: { type: "Number" }
    }
  }}
/>

<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { Line, Shift, Team, RdoSwap } from "../types";
  import { createTeamBuilderStore } from "../stores/teamBuilderStore";
  import TeamFilters_ from "./TeamFilters.svelte";
  import UnassignedPool from "./UnassignedPool.svelte";
  import TeamBoards from "./TeamBoards.svelte";
  import TeamStats from "./TeamStats.svelte";
  import OddityBanner from "./OddityBanner.svelte";
  import AutoFormControls from "./AutoFormControls.svelte";
  import FollowMeDock from "./FollowMeDock.svelte";

  /** Bid lines produced by Blade's schedule generator. */
  export let lines: Line[] = [];
  /** Shift definitions from Blade's Setup tab. */
  export let shifts: Shift[] = [];
  /** How many days a full schedule cycle spans, used only to size RDO rebalancing (weeks * 7). */
  export let weekCount = 1;
  /** Minutes of slack for Opening/AM/PM/Closing phase classification. */
  export let phaseThresholdMin = 15;
  /** Starting per-team target headcounts. */
  export let archStso = 1;
  export let archLtso = 1;
  export let archTso = 6;

  const dispatch = createEventDispatcher<{
    teamschange: { teams: Team[] };
    status: { message: string };
    rdoswap: { swaps: RdoSwap[] };
  }>();

  const store = createTeamBuilderStore({ lines, shifts, phaseThresholdMin });
  store.archTargets.set({ stso: archStso, ltso: archLtso, tso: archTso });
  void weekCount; // reserved for future use (multi-week RDO rebalancing window)

  // Keep the store's copies of lines/shifts/threshold in sync with prop changes
  // from the host app (e.g. after Blade re-generates a schedule).
  $: store.lines.set(lines);
  $: store.shifts.set(shifts);
  $: store.phaseThresholdMin.set(phaseThresholdMin);

  const { teams, filters, selected, archTargets, formOptions, pool, unassigned, stats, anyFollowed } = store;

  // Report every team-list change to the host app.
  $: dispatch("teamschange", { teams: $teams });

  function status(message: string) {
    dispatch("status", { message });
  }

  function handleAutoForm() {
    const result = store.autoForm();
    const w = $formOptions.startWindowMin;
    status(
      `Auto-formed ${result.teams.length} team(s) · window ${w} min` +
        ($formOptions.allowOneRdo ? " · 1-RDO allowed" : " · exact RDO") +
        ` · opposite STSO/LTSO sex preferred · ${result.assigned} assigned · ${result.leftInPool} in pool`
    );
  }

  function handleRebalance() {
    const swaps = store.rebalanceRdo();
    if (swaps.length) {
      dispatch("rdoswap", { swaps });
      status(`RDO sex-balanced (${swaps.length} swap${swaps.length === 1 ? "" : "s"})`);
    }
  }

  function handleAssignSelected(teamId: string) {
    const n = store.assignSelectedTo(teamId);
    const team = $teams.find((t) => t.id === teamId);
    status(`Added ${n} line(s) to ${team?.name ?? teamId}`);
  }

  function handleCloseFollowDocks() {
    store.clearAllFollow();
    status("Team builder docks closed");
  }

  $: notFollowing = $teams.filter((t) => !t.followMe);
  $: following = $teams.filter((t) => t.followMe);
  $: countHint = $teams.length
    ? `${$teams.length} team(s) · ${$teams.reduce((n, t) => n + t.members.length, 0)} assigned · ${$unassigned.length} in pool (filtered)`
    : "No teams yet — click + New team";
</script>

<div class="blade-team-builder">
  <OddityBanner rows={$stats.rows} />

  <div class="card">
    <div class="section-title">
      <span>Team forming</span>
      <span class="muted">{countHint}</span>
    </div>
    <div class="toolbar">
      <button type="button" class="btn btn-amber" on:click={store.newTeam}>+ New team</button>
      <button type="button" class="btn" on:click={handleRebalance}>Rebalance RDO by sex</button>
    </div>

    <AutoFormControls
      arch={$archTargets}
      formOptions={$formOptions}
      onArchChange={(v) => store.archTargets.set(v)}
      onFormOptionsChange={(v) => store.formOptions.set(v)}
      onAutoForm={handleAutoForm}
    />

    <TeamFilters_
      filters={$filters}
      pool={$pool}
      teams={$teams}
      selectedCount={$selected.size}
      onFilterChange={(v) => store.filters.set(v)}
      onClearFilters={store.clearFilters}
      onSelectAllVisible={store.selectAllVisible}
      onClearSelection={store.clearSelection}
      onAssignSelected={handleAssignSelected}
    />
  </div>

  <div class="card">
    <div class="section-title">Unassigned pool</div>
    <UnassignedPool
      pool={$unassigned}
      selected={$selected}
      onToggleSelect={store.toggleSelected}
      onUnassign={(id) => store.moveMember(id, null)}
    />
  </div>

  <div class="card">
    <div class="section-title">
      <span>Teams</span>
      <button type="button" class="btn btn-amber btn-sm" on:click={store.newTeam}>+ New team</button>
    </div>
    {#if $anyFollowed && !notFollowing.length}
      <p class="muted">All teams are in Follow Me (top-right). Uncheck Follow Me on a team to pin it here.</p>
    {:else}
      <TeamBoards
        teams={notFollowing}
        pool={$pool}
        onRename={store.renameTeam}
        onToggleFollow={store.toggleFollow}
        onRemoveTeam={store.removeTeam}
        onDropMember={(poolId, teamId) => store.moveMember(poolId, teamId)}
        onRemoveMember={(poolId) => store.moveMember(poolId, null)}
      />
    {/if}
  </div>

  <TeamStats stats={$stats} onToggleFollow={store.toggleFollow} />

  <FollowMeDock
    visible={$anyFollowed}
    followedTeams={following}
    pool={$pool}
    stats={$stats}
    onToggleFollow={store.toggleFollow}
    onRename={store.renameTeam}
    onRemoveTeam={store.removeTeam}
    onDropMember={(poolId, teamId) => store.moveMember(poolId, teamId)}
    onRemoveMember={(poolId) => store.moveMember(poolId, null)}
    onNewTeam={store.newTeam}
    onClose={handleCloseFollowDocks}
  />
</div>

<style>
  @import "../styles/team-builder.css";
</style>
