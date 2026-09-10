<script lang="ts">
  import type { Team, PoolEntry } from "../types";
  import { sortedMembers, teamMemberCounts } from "../utils/team";
  import { findEntry } from "../utils/pool";
  import { dropZone } from "../actions/dnd";
  import LineCard from "./LineCard.svelte";

  export let team: Team;
  export let pool: PoolEntry[];
  /** Compact "dock" rendering: header only, no member list (used in the Follow-Me dock). */
  export let dock = false;
  export let onRename: (id: string, name: string) => void;
  export let onToggleFollow: (id: string) => void;
  export let onRemoveTeam: (id: string) => void;
  export let onDropMember: (poolId: number, teamId: string) => void;
  export let onRemoveMember: (poolId: number, teamId: string) => void;

  $: counts = teamMemberCounts(team, pool);
  $: members = sortedMembers(team, pool);

  function countBit(role: "STSO" | "LTSO" | "TSO") {
    const c = counts[role];
    if (!c.M && !c.F) return null;
    const tot = c.M + c.F;
    const fPct = tot ? Math.round((100 * c.F) / tot) : 0;
    return { role, m: c.M, f: c.F, fPct };
  }
  $: chips = (["STSO", "LTSO", "TSO"] as const).map(countBit).filter((x): x is NonNullable<typeof x> => !!x);
  $: overallF = (() => {
    const m = counts.STSO.M + counts.LTSO.M + counts.TSO.M;
    const f = counts.STSO.F + counts.LTSO.F + counts.TSO.F;
    const tot = m + f;
    return tot ? Math.round((100 * f) / tot) : 0;
  })();
</script>

<div class="team-board" data-team-id={team.id} data-phase={team.phase ?? ""}>
  <div class="team-board-head">
    {#if dock}
      <span style="font-weight:700">{team.name}</span>
    {:else}
      <input
        type="text"
        class="team-name-input"
        value={team.name}
        title="Zero-padded for sort order"
        on:change={(e) => onRename(team.id, e.currentTarget.value)}
      />
    {/if}

    {#if team.phase}
      <span class="team-phase-badge" title="Phase group">{team.phase}</span>
    {/if}

    <span class="team-counts-header" title="Assigned by role and sex">
      <span class="team-count-total">{counts.total}</span>
      <span class="team-count-chip">F% {overallF}</span>
      {#each chips as c}
        <span class="team-count-chip">
          {c.role} <span class="sex-m">{c.m}M</span>/<span class="sex-f">{c.f}F</span>
          <span class="muted">({c.fPct}%F)</span>
        </span>
      {/each}
    </span>

    {#if !dock}
      <label class="follow-me-label" title="Dock this team top-right while scrolling">
        <input type="checkbox" checked={team.followMe} on:change={() => onToggleFollow(team.id)} />
        Follow Me
      </label>
      <button type="button" class="btn btn-red btn-sm" on:click={() => onRemoveTeam(team.id)}>Remove</button>
    {/if}
  </div>

  {#if !dock}
    <div class="team-line-cols muted">
      <span></span><span>Role</span><span>Sex</span><span>Hours</span><span>RDO</span><span>FT/PT</span><span></span>
    </div>
    <div
      class="team-board-list"
      data-team-id={team.id}
      data-empty={members.length ? undefined : "1"}
      use:dropZone={{ onDrop: (id) => onDropMember(id, team.id) }}
    >
      {#each members as mid (mid)}
        {@const entry = findEntry(pool, mid)}
        {#if entry}
          <LineCard {entry} variant="board" onRemove={() => onRemoveMember(mid, team.id)} />
        {/if}
      {/each}
    </div>
  {/if}
</div>
