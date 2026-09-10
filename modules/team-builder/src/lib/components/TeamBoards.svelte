<script lang="ts">
  import type { Team, PoolEntry } from "../types";
  import TeamBoard from "./TeamBoard.svelte";

  export let teams: Team[];
  export let pool: PoolEntry[];
  export let dock = false;
  export let emptyMessage = 'No teams yet. Click "+ New team".';
  export let onRename: (id: string, name: string) => void;
  export let onToggleFollow: (id: string) => void;
  export let onRemoveTeam: (id: string) => void;
  export let onDropMember: (poolId: number, teamId: string) => void;
  export let onRemoveMember: (poolId: number, teamId: string) => void;
</script>

<div class="team-boards">
  {#if !teams.length}
    <p class="muted">{emptyMessage}</p>
  {:else}
    {#each teams as team (team.id)}
      <TeamBoard
        {team}
        {pool}
        {dock}
        {onRename}
        {onToggleFollow}
        {onRemoveTeam}
        {onDropMember}
        {onRemoveMember}
      />
    {/each}
  {/if}
</div>
