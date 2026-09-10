<script lang="ts">
  import type { TeamStats } from "../types";

  export let stats: TeamStats;
  export let onToggleFollow: (id: string) => void;

  $: pct = stats.total ? Math.round((100 * stats.assigned) / stats.total) : 0;

  function roleBits(counts: TeamStats["rows"][number]["counts"]) {
    return (["STSO", "LTSO", "TSO"] as const)
      .map((r) => {
        const c = counts[r];
        if (!c.M && !c.F) return null;
        return { role: r, m: c.M, f: c.F };
      })
      .filter((x): x is NonNullable<typeof x> => !!x);
  }
</script>

<div class="team-stats-body">
  <div class="team-stat-summary">
    <div><strong>{stats.assigned}</strong> / {stats.total} assigned ({pct}%)</div>
    <div class="muted">{stats.unassigned} still in pool</div>
    <div class="team-stat-bar"><div class="team-stat-bar-fill" style="width:{pct}%"></div></div>
  </div>

  <div class="team-stat-teams">
    {#if !stats.rows.length}
      <p class="muted">No teams yet.</p>
    {:else}
      {#each stats.rows as row}
        {@const m = row.counts.STSO.M + row.counts.LTSO.M + row.counts.TSO.M}
        {@const f = row.counts.STSO.F + row.counts.LTSO.F + row.counts.TSO.F}
        {@const fPct = m + f ? Math.round((100 * f) / (m + f)) : 0}
        <div
          class="team-stat-team-line"
          title="Click to pin/unpin to the Follow-Me dock"
          on:click={() => onToggleFollow(row.id)}
        >
          <strong>{row.name}</strong>
          <span class="muted">({row.counts.total} · {fPct}%F)</span>
          {#each roleBits(row.counts) as bit, i}
            <span class="role-bit">{i > 0 ? " · " : " "}{bit.role} <span class="sex-m">{bit.m}M</span>/<span
                class="sex-f">{bit.f}F</span></span>
          {/each}
          {#if row.followMe}<span class="team-follow-badge">Pinned</span>{/if}
        </div>
      {/each}
    {/if}
  </div>
</div>
