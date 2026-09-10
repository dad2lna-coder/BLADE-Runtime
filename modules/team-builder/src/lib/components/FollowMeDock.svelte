<script lang="ts">
  import type { Team, PoolEntry, TeamStats } from "../types";
  import { floatPanel } from "../actions/floatPanel";
  import TeamStats_ from "./TeamStats.svelte";
  import TeamBoards from "./TeamBoards.svelte";

  export let visible: boolean;
  export let followedTeams: Team[];
  export let pool: PoolEntry[];
  export let stats: TeamStats;
  export let onToggleFollow: (id: string) => void;
  export let onRename: (id: string, name: string) => void;
  export let onRemoveTeam: (id: string) => void;
  export let onDropMember: (poolId: number, teamId: string) => void;
  export let onRemoveMember: (poolId: number, teamId: string) => void;
  export let onNewTeam: () => void;
  export let onClose: () => void;
</script>

{#if visible}
  <div class="team-follow-docks">
    <div
      class="team-float-panel team-stats-dock card"
      use:floatPanel={{ handleSelector: "[data-drag-handle]", initialRight: "24rem", initialTop: "7.5rem" }}
    >
      <div class="float-panel-head" data-drag-handle>
        <span class="section-title">Assignment</span>
        <button type="button" class="btn btn-sm" on:click={onClose}>✕</button>
      </div>
      <TeamStats_ {stats} {onToggleFollow} />
    </div>

    <div
      class="team-float-panel team-boards-dock card"
      use:floatPanel={{ handleSelector: "[data-drag-handle]", initialRight: "0.75rem", initialTop: "7.5rem" }}
    >
      <div class="float-panel-head" data-drag-handle>
        <span class="section-title">Teams</span>
        <button type="button" class="btn btn-amber btn-sm" on:click={onNewTeam}>+ New</button>
      </div>
      <TeamBoards
        teams={followedTeams}
        {pool}
        dock
        emptyMessage='Check "Follow Me" on a team to dock it here.'
        {onRename}
        onToggleFollow={onToggleFollow}
        {onRemoveTeam}
        {onDropMember}
        {onRemoveMember}
      />
    </div>
  </div>
{/if}
