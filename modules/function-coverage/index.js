/**
 * Function Coverage — staffing pools, bands, assignments, and UI.
 * Integrated with BLADE Runtime shell for generic module lifecycle.
 */
import * as pools from "./lib/pools.js";
import * as bands from "./lib/bands.js";
import * as duty from "./lib/duty.js";
import * as assign from "./lib/assign.js";
import * as shifts from "./lib/shifts.js";
import * as coverage from "./lib/coverage.js";
import * as migrate from "./lib/migrate.js";

import {
  bindDutyApi, lineRoleKey, isOpsFunctionRole, lineIsDfoTagged, getRotationDuty,
  lineStartMin, phaseOfStart, isAmSide, computeShiftAnchors, lineCoversSlot,
  bandForMinute, clearLineFunctions
} from "./lib/duty.js";

import {
  bindPoolsApi, ensureFunctionCoverage, getFunctionMode, fteCapsByRoleSex,
  capFunctionPoolsToFte, buildCertifiedPools, bagPoolTotal, dfoPoolTotal
} from "./lib/pools.js";

import {
  bindBandsApi, syncFunctionModeUi, fillFunctionCoverageForm,
  openFunctionCoverageModal, closeFunctionCoverageModal, renderFunctionBandsTable,
  renderFunctionShiftsTable, readFunctionBandsFromDom, readFunctionCoverageFromDom,
  updateFunctionCoveragePreview, ensureExtraPositions,
  readExtraPositionsFromDom, renderExtraPositions, addExtraPosition,
  buildExtraPositionLines, bindFunctionCoverageUi, addFcShiftRequirement, addFcBand
} from "./lib/bands.js";

import {
  bindAssignApi, generateFunctionAssignments, markDfo, markBag,
  applyShiftFunctionRequirements
} from "./lib/assign.js";

import {
  bindShiftsApi, getConfiguredFunctionShifts, getShiftRequirement,
  getEligibleLinesForShift
} from "./lib/shifts.js";

import { bindCoverageCalcApi, computeAssignedCoverage, countAssignedAtSlot } from "./lib/coverage.js";
import { migrateFunctionCoverageConfig } from "./lib/migrate.js";

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

  // Register the function-coverage tab if runtime provides registration
  if (context.registerTab) {
    context.registerTab({
      id: "function-coverage",
      label: "FUNCTION",
      priority: 2,
      order: 2
    });
  }

  return adapter;
}

/**
 * Initialize the Function Coverage module.
 * Accepts either a legacy Scheduler object or a runtime context.
 */
export function initFunctionCoverage(schedulerOrContext) {
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

  // Bind all internal APIs to the (adapted) Scheduler
  bindDutyApi(S);
  bindPoolsApi(S);
  bindShiftsApi(S);
  bindCoverageCalcApi(S);
  bindBandsApi(S);
  bindAssignApi(S);

  // Expose helper functions on Scheduler for other modules
  S.fteCapsByRoleSex = fteCapsByRoleSex;
  S.ensureFunctionCoverage = ensureFunctionCoverage;
  S.getFunctionMode = getFunctionMode;
  S.syncFunctionModeUi = syncFunctionModeUi;
  S.fillFunctionCoverageForm = fillFunctionCoverageForm;
  S.computeShiftAnchors = computeShiftAnchors;
  S.phaseOfStart = phaseOfStart;
  S.isAmSide = isAmSide;
  S.lineStartMin = lineStartMin;
  S.lineRoleKey = lineRoleKey;
  S.isOpsFunctionRole = isOpsFunctionRole;
  S.lineIsDfoTagged = lineIsDfoTagged;
  S.getRotationDuty = getRotationDuty;
  S.lineCoversSlot = lineCoversSlot;
  S.bandForMinute = bandForMinute;
  S.clearLineFunctions = clearLineFunctions;
  S.openFunctionCoverageModal = openFunctionCoverageModal;
  S.closeFunctionCoverageModal = closeFunctionCoverageModal;
  S.renderFunctionBandsTable = renderFunctionBandsTable;
  S.renderFunctionShiftsTable = renderFunctionShiftsTable;
  S.readFunctionBandsFromDom = readFunctionBandsFromDom;
  S.readFunctionCoverageFromDom = readFunctionCoverageFromDom;
  S.updateFunctionCoveragePreview = updateFunctionCoveragePreview;
  S.capFunctionPoolsToFte = capFunctionPoolsToFte;
  S.buildCertifiedPools = buildCertifiedPools;
  S.generateFunctionAssignments = generateFunctionAssignments;
  S.applyShiftFunctionRequirements = applyShiftFunctionRequirements;
  S.getConfiguredFunctionShifts = getConfiguredFunctionShifts;
  S.getShiftRequirement = getShiftRequirement;
  S.getEligibleLinesForShift = getEligibleLinesForShift;
  S.addFcShiftRequirement = addFcShiftRequirement;
  S.addFcBand = addFcBand;
  S.computeAssignedCoverage = computeAssignedCoverage;
  S.countAssignedAtSlot = countAssignedAtSlot;
  S.migrateFunctionCoverageConfig = migrateFunctionCoverageConfig;
  S.ensureExtraPositions = ensureExtraPositions;
  S.readExtraPositionsFromDom = readExtraPositionsFromDom;
  S.renderExtraPositions = renderExtraPositions;
  S.addExtraPosition = addExtraPosition;
  S.buildExtraPositionLines = buildExtraPositionLines;
  S.bindFunctionCoverageUi = bindFunctionCoverageUi;
  S.initFunctionCoverage = initFunctionCoverage;

  // UI binding and initialization
  bindFunctionCoverageUi();

  // Publish ready event if event bus available
  if (S.eventBus) {
    S.eventBus.publish("function-coverage:ready", { module: "function-coverage" });
  }

  return S;
}

// Re-export internal API functions for other modules
export {
  bindDutyApi,
  lineRoleKey,
  isOpsFunctionRole,
  lineIsDfoTagged,
  getRotationDuty,
  lineStartMin,
  phaseOfStart,
  isAmSide,
  computeShiftAnchors,
  lineCoversSlot,
  bandForMinute,
  clearLineFunctions,
} from "./lib/duty.js";

export {
  bindPoolsApi,
  ensureFunctionCoverage,
  getFunctionMode,
  fteCapsByRoleSex,
  capFunctionPoolsToFte,
  buildCertifiedPools,
  bagPoolTotal,
  dfoPoolTotal,
} from "./lib/pools.js";

export {
  bindBandsApi,
  syncFunctionModeUi,
  fillFunctionCoverageForm,
  openFunctionCoverageModal,
  closeFunctionCoverageModal,
  renderFunctionBandsTable,
  renderFunctionShiftsTable,
  readFunctionBandsFromDom,
  readFunctionCoverageFromDom,
  updateFunctionCoveragePreview,
  ensureExtraPositions,
  readExtraPositionsFromDom,
  renderExtraPositions,
  addExtraPosition,
  buildExtraPositionLines,
  bindFunctionCoverageUi,
  addFcShiftRequirement,
  addFcBand,
} from "./lib/bands.js";

export {
  bindAssignApi,
  generateFunctionAssignments,
  markDfo,
  markBag,
  applyShiftFunctionRequirements,
} from "./lib/assign.js";

export {
  bindShiftsApi,
  getConfiguredFunctionShifts,
  getShiftRequirement,
  getEligibleLinesForShift,
} from "./lib/shifts.js";

export {
  bindCoverageCalcApi,
  computeAssignedCoverage,
  countAssignedAtSlot,
} from "./lib/coverage.js";

export { migrateFunctionCoverageConfig } from "./lib/migrate.js";

export { pools, bands, assign, shifts, coverage, migrate };
