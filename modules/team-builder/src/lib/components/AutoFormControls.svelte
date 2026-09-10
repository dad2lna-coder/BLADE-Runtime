<script lang="ts">
  import type { ArchTargets, FormOptions } from "../types";

  export let arch: ArchTargets;
  export let formOptions: FormOptions;
  export let hint = "";
  export let onArchChange: (next: ArchTargets) => void;
  export let onFormOptionsChange: (next: FormOptions) => void;
  export let onAutoForm: () => void;
</script>

<div class="toolbar team-arch-bar">
  <label>
    STSO
    <input
      type="number"
      min="0"
      max="20"
      value={arch.stso}
      on:change={(e) => onArchChange({ ...arch, stso: Math.max(0, Number(e.currentTarget.value) || 0) })}
    />
  </label>
  <label>
    LTSO
    <input
      type="number"
      min="0"
      max="20"
      value={arch.ltso}
      on:change={(e) => onArchChange({ ...arch, ltso: Math.max(0, Number(e.currentTarget.value) || 0) })}
    />
  </label>
  <label>
    TSO
    <input
      type="number"
      min="0"
      max="50"
      value={arch.tso}
      on:change={(e) => onArchChange({ ...arch, tso: Math.max(0, Number(e.currentTarget.value) || 0) })}
    />
  </label>

  <span class="team-form-opts">
    <label title="Treat nearby start times as the same crew window">
      Start window (min)
      <input
        type="number"
        min="0"
        max="180"
        step="15"
        value={formOptions.startWindowMin}
        on:change={(e) =>
          onFormOptionsChange({
            ...formOptions,
            startWindowMin: Math.max(0, Math.min(180, Number(e.currentTarget.value) || 0))
          })}
      />
    </label>
    <label
      class="follow-me-label"
      title="Also place people who share at least one RDO day and fall in the start window"
    >
      <input
        type="checkbox"
        checked={formOptions.allowOneRdo}
        on:change={(e) => onFormOptionsChange({ ...formOptions, allowOneRdo: e.currentTarget.checked })}
      />
      Allow 1 matching RDO
    </label>
  </span>

  <button type="button" class="btn btn-amber" on:click={onAutoForm}>Auto-form teams</button>
  {#if hint}<span class="muted">{hint}</span>{/if}
</div>
