/** Coverage module — matrix, bars, shift mix, cuts. */
import { attachRender } from "./actions/render.js";
import { bindCoverageUI } from "./actions/bind.js";
import { applyCoverageCutsToLines, initCuts } from "./components/cuts.js";
import { attachHourly } from "./utils/hourly.js";

function createSchedulerAdapter(context, legacyS) {
  const contracts = context.contracts || {};
  const eventBus = context.eventBus;
  const S = legacyS || window.Scheduler || {};
  window.Scheduler = window.Scheduler || S;

  const scheduleState = contracts.ScheduleState || {};
  const coverageState = contracts.CoverageState || {};

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
    toDateInputValue: S.toDateInputValue || ((val) => {
      var date = S.parseStartDate(val);
      var dd = String(date.getDate()).padStart(2, "0");
      var mm = String(date.getMonth() + 1).padStart(2, "0");
      var yyyy = date.getFullYear();
      return yyyy + "-" + mm + "-" + dd;
    }),
    getShift: S.getShift || (() => ({ start: "00:00", end: "00:00" })),
    getEffectiveShiftTimes: S.getEffectiveShiftTimes || ((shiftId, dow) => {
      const sh = adapter.getShift(shiftId);
      return { start: sh.start, end: sh.end };
    }),
    lineCoversSlot: S.lineCoversSlot || (() => false),
    lineRoleKey: S.lineRoleKey || ((line) => line.isStso ? "STSO" : line.isLtso ? "LTSO" : "TSO"),
    getRotationDuty: S.getRotationDuty || (() => null),
    shiftBadge: S.shiftBadge || (() => ""),
    coverageView: S.coverageView || { stso: false, ltso: false, tso: true, funcView: "all" },
    DAYS: S.DAYS || ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    slotLabel: S.slotLabel || ((slot) => {
      const h = Math.floor(slot / 60);
      const mm = slot % 60;
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
    updateStatus: S.updateStatus || (() => {})
  };

  if (context.registerTab) {
    context.registerTab({
      id: "coverage",
      label: "COVERAGE",
      priority: 1,
      order: 3
    });
  }

  return adapter;
}

export function initCoverage(schedulerOrContext) {
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

  attachHourly(S);
  S.coverageView = S.coverageView || {
    stso: false,
    ltso: false,
    tso: true,
    funcView: "all"
  };

  attachRender(S);
  S.applyCoverageCutsToLines = function () {
    return applyCoverageCutsToLines(S);
  };

  bindCoverageUI(S);
  initCuts(S);

  if (S.renderCoverageBars) S.renderCoverageBars();

  if (S.eventBus) {
    S.eventBus.publish("coverage:ready", { module: "coverage" });
  }

  return S;
}

export default initCoverage;
