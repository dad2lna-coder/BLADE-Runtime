<script>
    import { createEventDispatcher } from 'svelte';
    import LineCard from './LineCard.svelte';
    
    export let team;
    export let expanded = false;
    export let teamLines = []; // lines resolved from team.members
    
    const dispatch = createEventDispatcher();
    
    $: counts = (function() {
        let m = {STSO:0, LTSO:0, TSO:0, F_STSO:0, F_LTSO:0, F_TSO:0};
        teamLines.forEach(l => {
            const role = l.role || 'TSO';
            if (role === 'STSO') { m.STSO++; if (l.sex === 'F') m.F_STSO++; }
            else if (role === 'LTSO') { m.LTSO++; if (l.sex === 'F') m.F_LTSO++; }
            else { m.TSO++; if (l.sex === 'F') m.F_TSO++; }
        });
        const tM = m.STSO + m.LTSO + m.TSO;
        const tF = m.F_STSO + m.F_LTSO + m.F_TSO;
        return {
            total: tM,
            fPct: tM ? Math.round(100 * tF / tM) : 0,
            STSO: { total: m.STSO, m: m.STSO - m.F_STSO, f: m.F_STSO },
            LTSO: { total: m.LTSO, m: m.LTSO - m.F_LTSO, f: m.F_LTSO },
            TSO: { total: m.TSO, m: m.TSO - m.F_TSO, f: m.F_TSO }
        };
    })();

    function toggle() {
        expanded = !expanded;
        dispatch('toggle', { teamId: team.id, expanded });
    }
</script>

<details class="team-board card" data-team-id={team.id} open={expanded} on:toggle={toggle}>
    <summary class="team-board-head section-title">
        <input type="text" class="team-name-input" value={team.name || ''} data-team-id={team.id} on:click|stopPropagation on:input>
        
        <span class="team-counts-header" title="Assigned by role and sex">
            <span class="team-count-total">{counts.total}</span>
            <span class="team-count-chip">F% {counts.fPct}</span>
            {#each ['STSO', 'LTSO', 'TSO'] as role}
                {#if counts[role].total > 0}
                    <span class="team-count-chip">
                        {role} 
                        <span class="sex-m">{counts[role].m}M</span>/<span class="sex-f">{counts[role].f}F</span> 
                        <span class="muted">({Math.round(100 * counts[role].f / counts[role].total)}%F)</span>
                    </span>
                {/if}
            {/each}
        </span>
        
        <div class="team-board-actions">
            <label class="follow-me-label" title="Follow Me (dock this team on screen)" on:click|stopPropagation>
                <input type="checkbox" data-team-follow={team.id} checked={team.followMe} on:change> Follow
            </label>
            <button type="button" class="btn btn-red" data-remove-team={team.id} on:click|stopPropagation>✕</button>
        </div>
    </summary>
    
    <div class="team-board-list" data-team-id={team.id}>
        {#if expanded}
            {#if teamLines.length}
                {#each teamLines as line (line.id)}
                    <LineCard p={line} removable={true} teamId={team.id} on:remove on:click />
                {/each}
            {:else}
                <div class="team-board-empty muted">Drag lines here</div>
            {/if}
        {:else}
            <div class="team-board-compact muted">
                {teamLines.length} member{teamLines.length === 1 ? '' : 's'} — expand
            </div>
        {/if}
    </div>
</details>
