<script lang="ts">
  import type { TeamStatsRow } from "../types";

  export let rows: TeamStatsRow[];

  $: fill = rows.filter((r) => r.oddities.some((o) => o.code === "FILL")).map((r) => r.name);
  $: noltso = rows.filter((r) => r.oddities.some((o) => o.code === "NOLTSO")).map((r) => r.name);
  $: sex = rows.filter((r) => r.oddities.some((o) => o.code === "SEX")).map((r) => r.name);
  $: total = fill.length + noltso.length + sex.length;
</script>

{#if rows.length}
  <div class="team-oddity-banner" class:has-flags={total > 0}>
    {#if total === 0}
      TEAMS CHECK&nbsp;&nbsp;OK &nbsp;·&nbsp; {rows.length} team(s) &nbsp;·&nbsp; none under 70% &nbsp;·&nbsp; all
      have LTSO &nbsp;·&nbsp; sex split ok
    {:else}
      TEAMS CHECK&nbsp;&nbsp;
      {#if fill.length}{fill.length} under 70% ({fill.join(", ")})&nbsp;&nbsp;·&nbsp;&nbsp;{/if}
      {#if noltso.length}{noltso.length} no LTSO ({noltso.join(", ")})&nbsp;&nbsp;·&nbsp;&nbsp;{/if}
      {#if sex.length}{sex.length} sex split ({sex.join(", ")}){/if}
    {/if}
  </div>
{/if}
