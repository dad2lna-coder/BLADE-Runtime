<script>
    import { createEventDispatcher } from 'svelte';
    import LineCard from './LineCard.svelte';
    
    export let lines = []; // the unassignedPool array
    export let selected = {};
    export let roleFilter = 'ALL';
    export let expanded = false;
    
    const dispatch = createEventDispatcher();
    
    function toggle() {
        expanded = !expanded;
        dispatch('toggle', { expanded });
    }
    
    $: k = lines.length;
</script>

<details id="team-pool-section" class="card" bind:open={expanded} on:toggle={toggle}>
    <summary class="section-title">
        <span id="team-pool-summary-label">Unassigned pool — {k} in pool (filtered)</span>
    </summary>
    
    {#if expanded}
        {#if lines.length === 0}
            <p class="muted">No unassigned lines match the active filters.</p>
        {:else}
            <div id="team-pool" class="team-role-list" data-role={roleFilter}>
                {#each lines as line (line.id)}
                    <LineCard 
                        p={line} 
                        selectable={true} 
                        selected={selected[line.id]} 
                        on:change={(e) => dispatch('select', { lineId: line.id, selected: e.target.checked })} 
                    />
                {/each}
            </div>
        {/if}
    {:else}
        <div id="team-pool"></div>
    {/if}
</details>
