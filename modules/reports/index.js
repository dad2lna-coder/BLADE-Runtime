/** Reports host — nested Management / Demand / Cohesion sub-tabs. */
import { initReportsPrint } from "./print.js";
import { initReportsMath } from "./reports-math.js";
import { initCapacityMath } from "./capacity-math.js";

function paintReportSub(S, id) {
  if (id === "management" && S.renderReports) S.renderReports();
  if (id === "cohesion" && S.renderTeamCohesionReport) S.renderTeamCohesionReport();
  if (id === "demand" && S.renderDemandCapacity) S.renderDemandCapacity();
}

export function switchReportSub(scheduler, id) {
  var S = scheduler || window.Scheduler;
  if (!S || !id) return;
  S.reportSubTab = id;
  document.querySelectorAll("#report-subtabs .report-sub-btn").forEach(function (b) {
    b.classList.toggle("active", b.dataset.subtab === id);
  });
  document.querySelectorAll("#report-sub-panels .report-sub-panel").forEach(function (p) {
    p.classList.toggle("active", p.id === "report-sub-" + id);
  });
  paintReportSub(S, id);
}

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
    hookConsoleIo: S.hookConsoleIo || (() => {}),
    renderDemandCapacity: S.renderDemandCapacity || (() => {}),
    prepareDemandCapacityForPrint: S.prepareDemandCapacityForPrint || (() => {})
  };

  return adapter;
}

export function initReportsShell(schedulerOrContext) {
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

  if (!S) return;

  initReportsMath(S);
  initCapacityMath(S);

  if (S.initReports) S.initReports();

  S.switchReportSub = function (id) {
    switchReportSub(S, id);
  };

  if (!S._reportSubClicksBound) {
    S._reportSubClicksBound = true;
    document.addEventListener("click", function (e) {
      var btn = e.target && e.target.closest ? e.target.closest(".report-sub-btn") : null;
      if (!btn || !btn.dataset.subtab) return;
      S.switchReportSub(btn.dataset.subtab);
    });
  }

  var current = S.reportSubTab;
  if (!current && S.reportSubTabs && S.reportSubTabs.length) current = S.reportSubTabs[0].id;
  if (current) S.switchReportSub(current);
  initReportsPrint(S);

  if (S.eventBus) {
    S.eventBus.publish("reports:ready", { module: "reports" });
  }

  return S;
}
