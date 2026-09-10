<script lang="ts">
  import type { PoolEntry } from "../types";
  import { groupPoolByRole, roleGroupOrder } from "../utils/pool";
  import { dropZone } from "../actions/dnd";
  import LineCard from "./LineCard.svelte";

  export let pool: PoolEntry[];
  export let selected: Set<number>;
  export let onToggleSelect: (id: number) => void;
  export let onUnassign: (id: number) => void;

  $: groups = groupPoolByRole(pool);
  $: roles = roleGroupOrder();
</script>

<div class="team-pool" use:dropZone={{ onDrop: onUnassign }}>
  {#if !pool.length}
    <p class="muted">No unassigned lines match the filters. Generate a schedule first, or clear filters.</p>
  {:else}
    {#each roles as role}
      {#if groups[role].length}
        <div class="team-role-group">
          <div class="team-role-title">{role} <span class="muted">({groups[role].length})</span></div>
          <div class="team-role-list" data-role={role}>
            {#each groups[role] as entry (entry.id)}
              <LineCard {entry} variant="pool" selected={selected.has(entry.id)} {onToggleSelect} />
            {/each}
          </div>
        </div>
      {/if}
    {/each}
  {/if}
</div>
