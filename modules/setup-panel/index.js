/** Setup Panel — owns Setup-tab inputs, shifts table, extra positions, staffing export. */
import { ensureStyles } from "./utils/sync.js";
import { bridgeScheduler } from "./actions/bridge.js";
import { renderAll, bindSetupActions } from "./actions/render.js";
import { attachExtraPositions } from "./utils/extraPositions.js";

let _boundDomContentLoaded = false;

function createSchedulerAdapter(context, legacyS) {
  const contracts = context.contracts || {};
  const eventBus = context.eventBus;
  const S = legacyS || window.Scheduler || {};
  window.Scheduler = window.Scheduler || S;

  const scheduleState = contracts.ScheduleState || {};
  const adapter = {
    get state() {
      return {
        lines: scheduleState.lines || S.state?.lines || [],
        schedule: scheduleState.schedule || S.state?.schedule || {},
        shifts: scheduleState.shifts || S.state?.shifts || [],
        startDate: scheduleState.startDate || S.state?.startDate || null,
        weekCount: S.state?.weekCount || 1,
        functionCoverage: S.state?.functionCoverage || { mode: "none" },
        extraPositions: S.state?.extraPositions || [],
        issues: S.state?.issues || []
      };
    },
    set state(val) {
      if (S.state) Object.assign(S.state, val);
      if (scheduleState.setLines && val.lines) scheduleState.setLines(val.lines);
    },
    timeToMin: (t) => scheduleState.timeToMin ? scheduleState.timeToMin(t) : S.timeToMin?.(t) || 0,
    minToTime: (m) => scheduleState.minToTime ? scheduleState.minToTime(m) : S.minToTime?.(m) || "00:00",
    parseStartDate: S.parseStartDate || ((val) => new Date(val)),
    toDateInputValue: S.toDateInputValue || ((d) => {
      var date = adapter.parseStartDate(d);
      var dd = String(date.getDate()).padStart(2, "0");
      var mm = String(date.getMonth() + 1).padStart(2, "0");
      var yyyy = date.getFullYear();
      return yyyy + "-" + mm + "-" + dd;
    }),
    dj: S.dj || ((val) => ({
      startOf: () => adapter.parseStartDate(val).toISOString().slice(0, 10),
      format: (fmt) => adapter.parseStartDate(val).toISOString().slice(0, 10),
      add: (n) => { var d = new Date(adapter.parseStartDate(val)); d.setDate(d.getDate() + n); return d; },
      day: () => ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][adapter.parseStartDate(val).getDay()],
      toISODate: () => adapter.parseStartDate(val).toISOString().slice(0, 10),
      toJSDate: () => adapter.parseStartDate(val)
    })),
    $: S.$ || ((id) => document.getElementById(id)),
    getShift: S.getShift || (() => ({ start: "00:00", end: "00:00" })),
    getEffectiveShiftTimes: S.getEffectiveShiftTimes || ((shiftId, dow) => {
      var sh = adapter.getShift(shiftId);
      return { start: sh.start, end: sh.end };
    }),
    lineCoversSlot: S.lineCoversSlot || (() => false),
    lineRoleKey: S.lineRoleKey || ((line) => line.isStso ? "STSO" : line.isLtso ? "LTSO" : "TSO"),
    getRotationDuty: S.getRotationDuty || (() => null),
    shiftBadge: S.shiftBadge || (() => ""),
    coverageView: S.coverageView || { stso: false, ltso: false, tso: true, funcView: "all" },
    DAYS: S.DAYS || ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    slotLabel: S.slotLabel || ((slot) => {
      var h = Math.floor(slot / 60);
      var mm = slot % 60;
      return String(h).padStart(2, "0") + ":" + String(mm).padStart(2, "0");
    }),
    renderCoverageBars: S.renderCoverageBars || (() => {}),
    renderShiftSummary: S.renderShiftSummary || (() => {}),
    eventBus: eventBus,
    on: eventBus?.subscribe || (() => () => {}),
    emit: eventBus?.publish || (() => {}),
    registerTab: context.registerTab || (() => {}),
    registerFKey: context.registerFKey || (() => {}),
    applyCoverageCutsToLines: S.applyCoverageCutsToLines || (() => {}),
    updateStatus: S.updateStatus || (() => {}),
    initShiftDayTimes: S.initShiftDayTimes || (() => {}),
    initFunctionCoverage: S.initFunctionCoverage || (() => {}),
    fillFunctionCoverageForm: S.fillFunctionCoverageForm || (() => {}),
    hookConsoleIo: S.hookConsoleIo || (() => {})
  };

  if (context.registerTab) {
    context.registerTab({
      id: "setup",
      label: "SETUP",
      priority: 1,
      order: 1
    });
  }

  return adapter;
}

function seedStartDate(S) {
  var el = document.getElementById("cfg-start");
  if (!el) return;
  if (!el.value && S.parseStartDate && S.toDateInputValue) {
    var d = S.parseStartDate(null);
    el.value = S.toDateInputValue(d);
    if (S.state) S.state.startDate = d;
  }
}

export function initSetupPanel(schedulerOrContext) {
  const isRuntimeContext = schedulerOrContext && (
    schedulerOrContext.contracts ||
    schedulerOrContext.eventBus ||
    schedulerOrContext.registerTab
  );

  let S;
  if (isRuntimeContext) {
    S = createSchedulerAdapter(schedulerOrContext, window.Scheduler);
  } else {
    S = schedulerOrContext || window.Scheduler;
  }

  ensureStyles();
  try {
    bridgeScheduler(S);
  } catch (err) {
    console.error("initSetupPanel", err);
    if (S && S.updateStatus) S.updateStatus("Setup generate failed to attach — check console.");
    throw err;
  }
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
      try { S.fillFunctionCoverageForm(); } catch (e) {}
    }
  }

  attachExtraPositions(S);

  renderAll(S);

  if (S.eventBus) {
    S.eventBus.publish("setup:ready", { module: "setup-panel" });
  }

  return S;
}

export default initSetupPanel;
