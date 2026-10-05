/** Svelte mount for setup panel top-level form (gated by ?setup=svelte). */
import SetupForm from './SetupForm.svelte';

let _instance = null;

export function initSetupSvelte(S) {
  const rootId = 'setup-svelte-root';
  let root = document.getElementById(rootId);
  if (!root) {
    root = document.createElement('div');
    root.id = rootId;
    const tabSetup = document.getElementById('tab-setup');
    if (tabSetup) tabSetup.prepend(root);
  }
  root.style.display = 'block';
  // Hide classic FTE/period/toolbar siblings while Svelte is active
  const tabSetup = root.closest('#tab-setup');
  if (tabSetup) tabSetup.classList.add('setup-svelte-active');

  if (_instance) _instance.$destroy();

  // Pull current state from Scheduler
  const fte = (S && S.state && S.state.fte) ? S.state.fte : {};
  const period = (S && S.state) ? {
    startDate: S.state.startDate || '',
    weeks: S.state.weeks || 1,
    generateSeed: S.state.generateSeed || 'random',
  } : {};

  _instance = new SetupForm({
    target: root,
    props: {
      fte,
      period,
      disabled: true,
    },
  });

  // Bridge events back to Scheduler
  function onFte(e) {
    if (S && S.applyFte) S.applyFte(e.detail);
  }
  function onPeriod(e) {
    if (S && S.state) {
      // Handle period fields: startDate, weeks, generateSeed
      if (e.detail.startDate !== undefined) S.state.startDate = e.detail.startDate;
      if (e.detail.weeks !== undefined) S.state.weekCount = e.detail.weeks;
      if (e.detail.generateSeed !== undefined) S.state.generateSeed = e.detail.generateSeed;
    }
  }
  function onGenerate() {
    if (S && S.generate) S.generate();
  }
  function onExport() {
    if (S && S.exportBoardExcel) S.exportBoardExcel();
  }
  function onClear() {
    if (S && S.clearAll) S.clearAll();
  }
  function onImport() {
    if (!S || !S.importJsonFile) return;
    var input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json,.json";
    input.onchange = function (event) {
      var file = event.target.files && event.target.files[0];
      if (!file) return;
      // Read the file and process it through the same path as the classic
      // import handler (js/io.js: S.applyPayload), which populates
      // S.state.lines and triggers a lines-table refresh.
      var reader = new FileReader();
      reader.onload = function (event) {
        try {
          S.applyPayload(JSON.parse(event.target.result));
        } catch (err) {
          if (S.updateStatus) S.updateStatus("Import failed.");
          S.state.issues = ["Import failed: " + (err && err.message ? err.message : "Invalid JSON")];
          if (S.renderIssues) S.renderIssues();
        }
      };
      reader.readAsText(file);
      input.remove();
    };
    document.body.appendChild(input);
    input.click();
  }

  window.addEventListener('setup:fte-change', onFte);
  window.addEventListener('setup:period-change', onPeriod);
  window.addEventListener('setup:generate', onGenerate);
  window.addEventListener('setup:export', onExport);
  window.addEventListener('setup:clear', onClear);
  window.addEventListener('setup:import', onImport);

  // Cleanup on unmount
  _instance.$on('destroy', () => {
    window.removeEventListener('setup:fte-change', onFte);
    window.removeEventListener('setup:period-change', onPeriod);
    window.removeEventListener('setup:generate', onGenerate);
    window.removeEventListener('setup:export', onExport);
    window.removeEventListener('setup:clear', onClear);
    window.removeEventListener('setup:import', onImport);
    _instance = null;
  });
}

export function destroySetupSvelte() {
  if (_instance) { _instance.$destroy(); _instance = null; }
}