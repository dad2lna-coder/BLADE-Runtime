<script>
  import { onMount } from 'svelte';

  export let fte = {};
  export let period = {};
  export let disabled = false;

  function emit(name, detail = {}) {
    window.dispatchEvent(new CustomEvent(name, { detail }));
  }

  // Handle input blur to commit changes to S.state
  function commitFte(field, value) {
    const num = Number(value);
    if (!isNaN(num)) {
      emit('setup:fte-change', { ...fte, [field]: num });
    }
  }

  function commitPeriod(field, value) {
    emit('setup:period-change', { ...period, [field]: value });
  }
</script>

<div id="setup-svelte-root" class="setup-svelte-form" class:hidden={!disabled}>
  <div class="card">
    <div class="section-title">Schedule period</div>
    <div class="period-row" style="display:flex;flex-wrap:wrap;gap:1rem;align-items:center">
      <label>Schedule start <input type="date" id="svelte-cfg-start" value={period.startDate || ''} on:change={(e) => { commitPeriod('startDate', e.target.value); }} /></label>
      <label>Weeks <input type="number" id="svelte-cfg-weeks" min="1" max="8" value={period.weeks || 1} style="width:4.5rem" on:change={(e) => { commitPeriod('weeks', e.target.value); }} /></label>
      <label>Generate seed <input type="text" id="svelte-cfg-generate-seed" placeholder="random" value={period.generateSeed || 'random'} style="width:6.5rem" on:change={(e) => { commitPeriod('generateSeed', e.target.value); }} title="Leave as 'random' or enter a number for reproducible scheduling" /></label>
    </div>
  </div>

  <details class="card setup-fold" id="svelte-card-fte" open>
    <summary class="section-title">FTE</summary>
    <div class="fte-block">
      <div class="fte-role" style="text-align:center;font-weight:700;margin:0.85rem 0 0.35rem">FT TSO</div>
      <div class="fte-sex-row" style="display:flex;justify-content:center;gap:2rem;flex-wrap:wrap">
        <label>Male <input type="number" id="svelte-cfg-ft-m" min="0" value={fte.ftM || 10} style="width:4.5rem" on:blur={(e) => commitFte('ftM', e.target.value)} /></label>
        <label>Female <input type="number" id="svelte-cfg-ft-f" min="0" value={fte.ftF || 10} style="width:4.5rem" on:blur={(e) => commitFte('ftF', e.target.value)} /></label>
      </div>
      <div class="fte-role" style="text-align:center;font-weight:700;margin:0.85rem 0 0.35rem">PT TSO</div>
      <div class="fte-sex-row" style="display:flex;justify-content:center;gap:2rem;flex-wrap:wrap">
        <label>Male <input type="number" id="svelte-cfg-pt-m" min="0" value={fte.ptM || 4} style="width:4.5rem" on:blur={(e) => commitFte('ptM', e.target.value)} /></label>
        <label>Female <input type="number" id="svelte-cfg-pt-f" min="0" value={fte.ptF || 4} style="width:4.5rem" on:blur={(e) => commitFte('ptF', e.target.value)} /></label>
      </div>
      <div class="fte-sex-row" style="display:flex;justify-content:center;gap:2rem;flex-wrap:wrap">
        <label>Hours/day <input type="number" id="svelte-cfg-pt-hours" min="1" max="12" value={fte.ptHours || 4} style="width:4.5rem" on:blur={(e) => commitFte('ptHours', e.target.value)} /></label>
        <label>Days/week <input type="number" id="svelte-cfg-pt-days" min="1" max="6" value={fte.ptDays || 3} style="width:4.5rem" on:blur={(e) => commitFte('ptDays', e.target.value)} /></label>
      </div>
      <div class="fte-role" style="text-align:center;font-weight:700;margin:0.85rem 0 0.35rem">LTSO</div>
      <div class="fte-sex-row" style="display:flex;justify-content:center;gap:2rem;flex-wrap:wrap">
        <label>Male <input type="number" id="svelte-cfg-ltso-m" min="0" value={fte.ltsoM || 1} style="width:4.5rem" on:blur={(e) => commitFte('ltsoM', e.target.value)} /></label>
        <label>Female <input type="number" id="svelte-cfg-ltso-f" min="0" value={fte.ltsoF || 1} style="width:4.5rem" on:blur={(e) => commitFte('ltsoF', e.target.value)} /></label>
      </div>
      <div class="fte-role" style="text-align:center;font-weight:700;margin:0.85rem 0 0.35rem">STSO</div>
      <div class="fte-sex-row" style="display:flex;justify-content:center;gap:2rem;flex-wrap:wrap">
        <label>Male <input type="number" id="svelte-cfg-stso-m" min="0" value={fte.stsoM || 2} style="width:4.5rem" on:blur={(e) => commitFte('stsoM', e.target.value)} /></label>
        <label>Female <input type="number" id="svelte-cfg-stso-f" min="0" value={fte.stsoF || 2} style="width:4.5rem" on:blur={(e) => commitFte('stsoF', e.target.value)} /></label>
      </div>
      <div class="fte-role" style="text-align:center;font-weight:700;margin:0.85rem 0 0.35rem">Training dept</div>
      <p class="muted" style="margin:0 0 0.35rem;text-align:center">ESTI and MSTI are training classes — no sex, not ops FTE.</p>
      <div class="fte-sex-row" style="display:flex;justify-content:center;gap:2rem;flex-wrap:wrap">
        <label>ESTI <input type="number" id="svelte-cfg-esti" min="0" value={fte.esti || 0} style="width:4.5rem" on:blur={(e) => commitFte('esti', e.target.value)} /></label>
        <label>MSTI <input type="number" id="svelte-cfg-msti" min="0" value={fte.msti || 0} style="width:4.5rem" on:blur={(e) => commitFte('msti', e.target.value)} /></label>
      </div>
    </div>
  </details>

  <div class="toolbar" style="margin-top:0.75rem;gap:0.5rem;flex-wrap:wrap">
    <button type="button" class="btn btn-amber" on:click={() => emit('setup:generate')}>[GEN] GENERATE</button>
    <button type="button" class="btn" on:click={() => emit('setup:export')}>[EXP] EXPORT</button>
    <button type="button" class="btn" on:click={() => emit('setup:import')}>[IMP] IMPORT</button>
    <button type="button" class="btn btn-red" on:click={() => emit('setup:clear')}>[CLR] CLEAR</button>
  </div>
</div>