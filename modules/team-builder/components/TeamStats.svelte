<script>
    export let assignedCounts = {
        STSO: { M: 0, F: 0, total: 0 },
        LTSO: { M: 0, F: 0, total: 0 },
        TSO: { M: 0, F: 0, total: 0 },
        total: 0
    };
    export let totalCounts = {
        STSO: { M: 0, F: 0, total: 0 },
        LTSO: { M: 0, F: 0, total: 0 },
        TSO: { M: 0, F: 0, total: 0 },
        total: 0
    };

    function pct(part, whole) {
        return whole ? Math.round(100 * part / whole) : 0;
    }
    
    $: totalM = totalCounts.STSO.M + totalCounts.LTSO.M + totalCounts.TSO.M;
    $: totalF = totalCounts.STSO.F + totalCounts.LTSO.F + totalCounts.TSO.F;
    $: assignedM = assignedCounts.STSO.M + assignedCounts.LTSO.M + assignedCounts.TSO.M;
    $: assignedF = assignedCounts.STSO.F + assignedCounts.LTSO.F + assignedCounts.TSO.F;
    
    $: totalOverallF = pct(totalF, totalCounts.total);
    $: assignedOverallF = pct(assignedF, assignedCounts.total);
</script>

<div class="team-stats-card card">
    <div class="section-title">Team formation status</div>
    <div class="team-stats-grid">
        <div class="team-stat-col">
            <div class="ts-label">TOTAL LINES</div>
            <div class="ts-big">{totalCounts.total} <span class="ts-sub">({pct(assignedCounts.total, totalCounts.total)}% assigned)</span></div>
            <div class="ts-row"><span>STSO</span> <span>{totalCounts.STSO.total}</span></div>
            <div class="ts-row"><span>LTSO</span> <span>{totalCounts.LTSO.total}</span></div>
            <div class="ts-row"><span>TSO</span>  <span>{totalCounts.TSO.total}</span></div>
        </div>
        
        <div class="team-stat-col">
            <div class="ts-label">ASSIGNED GENDER (TARGET: {totalOverallF}% F)</div>
            <div class="ts-big">{assignedCounts.total} <span class="ts-sub">({assignedOverallF}% F)</span></div>
            <div class="ts-row">
                <span>STSO</span> 
                <span>
                    <span class="sex-m">{assignedCounts.STSO.M}M</span>/<span class="sex-f">{assignedCounts.STSO.F}F</span> 
                    <span class="muted">({pct(assignedCounts.STSO.F, assignedCounts.STSO.total)}%F target {pct(totalCounts.STSO.F, totalCounts.STSO.total)}%)</span>
                </span>
            </div>
            <div class="ts-row">
                <span>LTSO</span> 
                <span>
                    <span class="sex-m">{assignedCounts.LTSO.M}M</span>/<span class="sex-f">{assignedCounts.LTSO.F}F</span> 
                    <span class="muted">({pct(assignedCounts.LTSO.F, assignedCounts.LTSO.total)}%F target {pct(totalCounts.LTSO.F, totalCounts.LTSO.total)}%)</span>
                </span>
            </div>
            <div class="ts-row">
                <span>TSO</span>  
                <span>
                    <span class="sex-m">{assignedCounts.TSO.M}M</span>/<span class="sex-f">{assignedCounts.TSO.F}F</span> 
                    <span class="muted">({pct(assignedCounts.TSO.F, assignedCounts.TSO.total)}%F target {pct(totalCounts.TSO.F, totalCounts.TSO.total)}%)</span>
                </span>
            </div>
        </div>
    </div>
</div>

<style>
    .team-stats-grid { display: flex; gap: 2rem; margin-top: 1rem; }
    .team-stat-col { flex: 1; }
    .ts-label { font-size: 0.75rem; font-weight: 600; color: var(--muted); letter-spacing: 0.05em; margin-bottom: 0.5rem; }
    .ts-big { font-size: 2rem; font-weight: 300; margin-bottom: 1rem; }
    .ts-sub { font-size: 1rem; color: var(--muted); }
    .ts-row { display: flex; justify-content: space-between; padding: 0.25rem 0; border-bottom: 1px solid var(--border); font-size: 0.9rem; }
    .ts-row:last-child { border-bottom: none; }
</style>
