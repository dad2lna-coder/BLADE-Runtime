/** Coverage module — matrix, bars, shift mix, cuts. */
import { attachRender } from "./actions/render.js";
import { bindCoverageUI } from "./actions/bind.js";
import { applyCoverageCutsToLines, initCuts } from "./components/cuts.js";
import { attachHourly } from "./utils/hourly.js";

/**
 * Create a Scheduler-compatible adapter from runtime context.
 * @param {Object} context - Runtime context { contracts, eventBus, state, registerTab, registerFKey }
 * @param {Object} [legacyS] - Optional legacy Scheduler for fallback
 * @returns {Object} Scheduler-like object
 */
function createSchedulerAdapter(context, legacyS) {
  const contracts = context.contracts || {};
  const eventBus = context.eventBus;
  const S = legacyS || window.Scheduler || {};

  // Ensure S exists
  window.Scheduler = window.Scheduler || S;

  // Delegate to contracts for shared state
  const scheduleState = contracts.ScheduleState || {};
  const coverageState = contracts.CoverageState || {};

  // Adapter object that mimics Scheduler interface
  const adapter = {
    // State access via contracts
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
      // Allow setting on legacy S for backward compat
      if (S.state) Object.assign(S.state, val);
      if (scheduleState.setLines && val.lines) scheduleState.setLines(val.lines);
    },

    // Time utilities - delegate to contract
    timeToMin: (t) => scheduleState.timeToMin ? scheduleState.timeToMin(t) : S.timeToMin?.(t) || 0,
    minToTime: (m) => scheduleState.minToTime ? scheduleState.minToTime(m) : S.minToTime?.(m) || "00:00",
    parseStartDate: S.parseStartDate || ((val) => new Date(val)),
    dj: S.dj || ((val) => ({ toISODate: () => "", add: (n) => new Date(), day: () => "" })),

    // DOM helper
    $: S.$ || ((id) => document.getElementById(id)),

    // Shift/shift utilities
    getShift: S.getShift || (() => ({ start: "00:00", end: "00:00" })),
    getEffectiveShiftTimes: S.getEffectiveShiftTimes || ((shiftId, dow) => {
      const sh = adapter.getShift(shiftId);
      return { start: sh.start, end: sh.end };
    }),
    lineCoversSlot: S.lineCoversSlot || (() => false),
    lineRoleKey: S.lineRoleKey || ((line) => line.isStso ? "STSO" : line.isLtso ? "LTSO" : "TSO"),
    getRotationDuty: S.getRotationDuty || (() => null),
    shiftBadge: S.shiftBadge || (() => ""),

    // Coverage view state
    coverageView: S.coverageView || { stso: false, ltso: false, tso: true, funcView: "all" },

    // Day labels
    DAYS: S.DAYS || ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    slotLabel: S.slotLabel || ((slot) => {
      const h = Math.floor(slot / 60);
      const m = slot % 60;
      return String(h).padStart(2, "0") + ":" + String(m).padStart(2, "0");
    }),

    // Render functions (will be attached by attachRender)
    renderCoverageBars: S.renderCoverageBars || (() => {}),
    renderShiftSummary: S.renderShiftSummary || (() => {}),

    // Event bus integration
    eventBus: eventBus,
    on: eventBus?.subscribe || (() => () => {}),
    emit: eventBus?.publish || (() => {}),

    // Tab registration
    registerTab: context.registerTab || (() => {}),
    registerFKey: context.registerFKey || (() => {}),

    // Legacy compatibility
    applyCoverageCutsToLines: S.applyCoverageCutsToLines || (() => {}),
    updateStatus: S.updateStatus || (() => {})
  };

  // Register the coverage tab if runtime provides registration
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
  // Detect if we're called with runtime context (has contracts/eventBus) or legacy Scheduler
  const isRuntimeContext = schedulerOrContext && (
    schedulerOrContext.contracts ||
    schedulerOrContext.eventBus ||
    schedulerOrContext.registerTab
  );

  let S;
  if (isRuntimeContext) {
    // New runtime lifecycle: create adapter from context
    S = createSchedulerAdapter(schedulerOrContext, window.Scheduler);
  } else {
    // Legacy: direct Scheduler object
    S = schedulerOrContext || window.Scheduler;
  }

  // Initialize coverage module with the (adapted) Scheduler
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

  // Publish ready event if event bus available
  if (S.eventBus) {
    S.eventBus.publish("coverage:ready", { module: "coverage" });
  }

  return S;
}

// Legacy default export for backward compatibility
export default initCoverage;
