<script lang="ts">
  import type { PoolEntry } from "../types";
  import { draggableCard } from "../actions/dnd";

  export let entry: PoolEntry;
  /** "pool" shows a select checkbox; "board" shows a remove button and compact stats. */
  export let variant: "pool" | "board" = "pool";
  export let selected = false;
  export let onToggleSelect: ((id: number) => void) | undefined = undefined;
  export let onRemove: ((id: number) => void) | undefined = undefined;

  $: sexClass = entry.sex === "M" ? "sex-m" : "sex-f";
</script>

{#if variant === "board"}
  <div class="team-line team-line-compact" data-id={entry.id} use:draggableCard={{ id: entry.id }}>
    <span class="team-drag-handle" title="Drag">⋮⋮</span>
    <span class="tl-role">{entry.role}</span>
    <span class="tl-sex {sexClass}">{entry.sex}</span>
    <span class="tl-hours muted" title={entry.shiftName}>{entry.start}</span>
    <span class="tl-rdo muted" title="RDO">RDO {entry.rdoLabel}</span>
    <span class="tl-emp muted">{entry.empClass || "—"}</span>
    {#if onRemove}
      <button type="button" class="btn btn-red btn-sm" on:click={() => onRemove?.(entry.id)}>✕</button>
    {/if}
  </div>
{:else}
  <div class="team-line" data-id={entry.id} use:draggableCard={{ id: entry.id }}>
    <span class="team-drag-handle" title="Drag to move">⋮⋮</span>
    <label class="team-line-check">
      <input
        type="checkbox"
        checked={selected}
        on:change={() => onToggleSelect?.(entry.id)}
      />
    </label>
    <span class="team-line-code">{entry.lineCode}</span>
    <span class="badge">{entry.shiftName}</span>
    <span class="muted">{entry.start}</span>
    <span class="muted">RDO {entry.rdoLabel}</span>
    <span class={sexClass}>{entry.sex}</span>
    <span class="muted">{entry.empClass}</span>
  </div>
{/if}

<!--
  Shared primitives (.btn, .muted, .sex-m/.sex-f, .badge, .team-line, ...)
  live once in styles/team-builder.css, imported by the root TeamBuilder
  component. Only truly card-specific rules go here.
-->
<style>
  .tl-role,
  .tl-sex,
  .tl-hours,
  .tl-rdo,
  .tl-emp {
    font-size: 0.78rem;
  }
</style>
