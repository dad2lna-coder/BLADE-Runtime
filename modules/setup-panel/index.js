/** Setup Panel — owns Setup-tab inputs, shifts table, extra positions, staffing export. */
import { ensureStyles } from "./utils/sync.js";
import { bridgeScheduler } from "./actions/bridge.js";
import { renderAll, bindSetupActions } from "./actions/render.js";
import { attachExtraPositions } from "./utils/extraPositions.js";
import { attachTrainingClasses } from "./utils/trainingClasses.js";

let _boundDomContentLoaded = false;

function seedStartDate(S) {
  var el = document.getElementById("cfg-start");
  if (!el) return;
  if (!el.value && S.parseStartDate && S.toDateInputValue) {
    var d = S.parseStartDate(null);
    el.value = S.toDateInputValue(d);
    if (S.state) S.state.startDate = d;
  }
}

export function initSetupPanel(scheduler) {
  const S = scheduler || window.Scheduler;
  // Gate: if Svelte setup is active, skip classic render but still wire listeners
  if (S.__USE_SVELTE_SETUP) {
    ensureStyles();
    // Wire Svelte-generated events to classic Scheduler methods
    if (typeof S.generate === "function") {
      window.addEventListener('setup:generate', function () { S.generate(); });
    }
    if (typeof S.exportBoard === "function") {
      window.addEventListener('setup:export', function () { S.exportBoard(); });
    }
    if (typeof S.clear === "function") {
      window.addEventListener('setup:clear', function () { S.clear(); });
    }
    // Import not yet wired; placeholder
    // Add class to hide classic FTE/period/toolbar via CSS
    const tabSetup = document.getElementById('tab-setup');
    if (tabSetup) tabSetup.classList.add('setup-svelte-active');
    window.dispatchEvent(new CustomEvent("setup:mounted"));
    return;
  }
  try {
    bridgeScheduler(S);
  } catch (err) {
    console.error("initSetupPanel", err);
    if (S && S.updateStatus) S.updateStatus("Setup generate failed to attach — check console.");
    throw err;
  }

  var origRenderAll = S.renderAll;
  S.renderAll = function () {
    renderAll(S);
    if (typeof origRenderAll === "function" && origRenderAll !== S.renderAll) {
      try { origRenderAll.apply(this, arguments); } catch (_) {}
    }
  };

  seedStartDate(S);

  if (!_boundDomContentLoaded) {
    _boundDomContentLoaded = true;
    document.addEventListener("DOMContentLoaded", function () {
      seedStartDate(S);
      renderAll(S);
      setTimeout(function () { renderAll(S); }, 400);
    });
  }

  window.addEventListener("blade-intro-done", function () {
    renderAll(S);
    setTimeout(function () { renderAll(S); }, 200);
  });

  bindSetupActions(S);
  if (typeof S.hookConsoleIo === "function") S.hookConsoleIo();
  window.dispatchEvent(new CustomEvent("setup:mounted"));
  if (S.initShiftDayTimes) S.initShiftDayTimes();

  if (typeof S.initFunctionCoverage === "function") {
    var addBtn = document.getElementById("fc-add-band");
    if (!S._funcCoverageBound || (addBtn && !addBtn._fcBound)) {
      S._funcCoverageBound = false;
      S.initFunctionCoverage(S);
    } else if (S.fillFunctionCoverageForm) {
      try { S.fillFunctionCoverageForm(); } catch (_) {}
    }
  }
  // Setup owns extra-type cards + line build; reclaim if FC rebound the helpers.
  attachExtraPositions(S);
  attachTrainingClasses(S);

  renderAll(S);
}
