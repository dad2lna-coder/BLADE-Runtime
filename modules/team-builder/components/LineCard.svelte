<script>
    import { createEventDispatcher } from 'svelte';
    export let p;
    export let selectable = false;
    export let removable = false;
    export let compact = false;
    export let teamId = null;
    export let selected = false;
    
    const dispatch = createEventDispatcher();
    
    $: sexCls = p.sex === 'M' ? 'sex-m' : 'sex-f';
    $: isLead = p.role === 'STSO' || p.role === 'LTSO';
    $: emp = p.empClass === 'PT' ? 'PT' : (p.empClass === 'FT' ? 'FT' : (isLead ? p.role : 'FT'));
    $: empDisplay = isLead ? (p.empClass === 'PT' || p.empClass === 'FT' ? p.empClass : '—') : emp;
    
    // Assumes shift object is resolved onto `p` or uses fallback logic
    $: hours = p.start + '–' + (p.end || ''); 
    $: badgeCls = 'badge ' + (p.badge || '');
</script>

{#if compact || removable}
    <div class="team-line team-line-compact" data-id={p.id}>
        <span class="team-drag-handle" title="Drag">⋮⋮</span>
        <span class="tl-role">{p.role}</span>
        <span class="tl-sex {sexCls}">{p.sex || '—'}</span>
        <span class="tl-hours muted" title={p.shiftName || p.shiftId}>{hours}</span>
        <span class="tl-rdo muted" title="RDO">RDO {p.rdoLabel || '—'}</span>
        <span class="tl-emp muted">{empDisplay}</span>
        {#if removable}
            <button type="button" class="btn btn-red btn-sm" on:click={() => dispatch('remove', { lineId: p.id, teamId })}>✕</button>
        {/if}
    </div>
{:else}
    <div class="team-line" data-id={p.id}>
        <span class="team-drag-handle" title="Drag to move">⋮⋮</span>
        {#if selectable}
            <label class="team-line-check">
                <input type="checkbox" data-select-line={p.id} checked={selected} on:change>
            </label>
        {/if}
        <span class="team-line-code">{p.lineCode}</span>
        <span class={badgeCls}>{p.shiftName || p.shiftId}</span>
        <span class="muted">{p.start}</span>
        <span class="muted">RDO {p.rdoLabel}</span>
        <span class={sexCls}>{p.sex}</span>
        <span class="muted">{p.empClass}</span>
    </div>
{/if}
