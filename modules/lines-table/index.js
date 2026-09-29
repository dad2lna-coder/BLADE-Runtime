/** Lines Table module -- Svelte island inside the classic Lines tab.
 * Rows come from filtered/sorted getRowModels. Edits write Scheduler.state.
 * Integrated with BLADE Runtime shell for generic module lifecycle.
 */
import LinesTable from './LinesTable.svelte';
import { initRowModel } from './row-model.js';
import { initLineColors } from './line-colors.js';

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

  // Register the lines-table tab if runtime provides registration
  if (context.registerTab) {
    context.registerTab({
      id: "lines",
      label: "LINES",
      priority: 1,
      order: 2
    });
  }

  return adapter;
}

export function initLinesTable(schedulerOrContext) {
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

  // Original initialization logic preserved
  initRowModel(S);
  initLineColors(S);

  const root = document.getElementById("lines-table-root");
  if (!root) {
    console.warn("lines-table: #lines-table-root not found");
    return;
  }

  if (S.__USE_SVELTE_LINES === false) {
    root.innerHTML = '';
    root.style.display = 'none';
    if (S.renderLines) S.renderLines();
    return;
  }

  if (root._linesTableMounted) return;
  root._linesTableMounted = true;

  function resolvers() {
    return {
      teamResolver: typeof S.teamMetaForLine === "function" ? S.teamMetaForLine : null,
      shiftResolver: typeof S.getShift === "function" ? S.getShift : null,
      rotationDutyResolver: typeof S.getRotationDuty === "function" ? S.getRotationDuty : getRotationDutyLocal
    };
  }

  function getRotationDutyLocal(lineId, dayIndex) {
    const key = String(lineId);
    const rot = S.state && S.state.functionRotation;
    const arr = rot && (rot[key] || rot[lineId]);
    if (!Array.isArray(arr)) return null;
    const duty = arr[dayIndex];
    if (duty === "BAG") return "BAG";
    if (duty === "PAX" || duty === "DFO") return "PAX";
    return null;
  }

  function setRotationDuty(lineId, dayIndex, duty) {
    var key = String(lineId);
    if (!S.state.functionRotation) S.state.functionRotation = {};
    if (!S.state.functionRotation[key]) S.state.functionRotation[key] = [];
    while (S.state.functionRotation[key].length <= dayIndex) S.state.functionRotation[key].push(null);
    S.state.functionRotation[key][dayIndex] = duty; // "BAG" | "PAX" | null
  }

  function isDfoCapable(line) {
    if (!line) return false;
    if (line.function === "DFO") return true;
    const elig = line.functionEligible;
    return !!(elig && (elig.dfo === true || elig.DFO === true));
  }

  function buildRows() {
    const lines = (S.state && Array.isArray(S.state.lines)) ? S.state.lines : [];
    const filtered = typeof S.sortLinesForView === "function" && typeof S.filterLinesForView === "function"
      ? S.sortLinesForView(S.filterLinesForView(lines))
      : lines;
    const schedule = (S.state && S.state.schedule) || {};
    const models = typeof S.getRowModels === "function"
      ? S.getRowModels(filtered, schedule, resolvers())
      : (typeof S.getLineRowModels === "function"
          ? S.getLineRowModels(resolvers())
          : []);
    return Array.isArray(models) ? models : [];
  }

  function teamOptions() {
    if (S.teams && Array.isArray(S.teams.teams)) return S.teams.teams;
    return [];
  }

  function shiftOptions() {
    return (S.state && Array.isArray(S.state.shifts)) ? S.state.shifts : [];
  }

  function currentExportStyle() {
    if (typeof S.getExportStyle === "function") return S.getExportStyle();
    return (S.state && S.state.exportStyle) || null;
  }

  function applyProps(comp) {
    if (!comp || typeof comp.$set !== "function") return;
    const nextRows = buildRows();
    if (typeof S.applyExportCssVars === "function") S.applyExportCssVars();
    comp.$set({
      rows: Array.isArray(nextRows) ? nextRows : [],
      shiftOptions: shiftOptions(),
      teamOptions: teamOptions(),
      exportStyle: currentExportStyle()
    });
  }

  function writeInlineEdit(detail) {
    if (!detail) return;
    const line = S.findLineById ? S.findLineById(detail.lineId) : null;
    if (!line) return;
    const field = detail.field;
    const value = detail.value;
    if (field === "lineCode") {
      line.lineCode = String(value || "").trim() || line.lineCode;
    } else if (field === "sex") {
      line.sex = value === "F" ? "F" : "M";
    } else if (field === "function") {
      line.function = value === "DFO" || value === "PAX" || value === "BAG" ? value : "";
    } else if (field === "certPool") {
      var pool = String(value || "").trim().toUpperCase();
      line.certPool = pool === "A" || pool === "B" ? pool : "";
    } else if (field === "emp") {
      if (S.applyLineEmp) S.applyLineEmp(line, value);
    } else if (field === "position") {
      var extraPos = !!(line.isExtra || line.extraPositionId);
      var pos = String(value == null ? "" : value).trim();
      if (extraPos) {
        if (pos) {
          line.position = pos;
          line.extraName = pos;
        }
        line.isStso = false;
        line.isLtso = false;
      } else if (S.applyLineEmp) {
        S.applyLineEmp(line, pos);
      }
    } else if (field === "shift") {
      if (S.applyLineShift) S.applyLineShift(line, value);
    } else if (field === "team") {
      if (S.setLineTeam) S.setLineTeam(detail.lineId, value);
    }
    if (S.updateStatus) S.updateStatus("Updated " + (line.lineCode || detail.lineId));
    refresh();
    if ((field === "emp" || field === "position" || field === "shift") && S.renderCoverageBars) {
      S.renderCoverageBars();
    }
    if (field === "team" && S.renderTeams) S.renderTeams();
  }

  function writeDayToggle(detail) {
    if (!detail) return;
    const line = S.findLineById ? S.findLineById(detail.lineId) : null;
    const dayIndex = Number(detail.dayIndex);
    if (!line || !Number.isInteger(dayIndex) || dayIndex < 0 || dayIndex > 6) return;
    const key = String(line.id);
    if (!S.state.schedule) S.state.schedule = {};
    var existing = S.state.schedule[key] || S.state.schedule[line.id];
    if (!Array.isArray(existing)) existing = [];
    S.state.schedule[key] = existing;
    while (S.state.schedule[key].length < 7) S.state.schedule[key].push("RDO");
    if (!S.state.functionRotation) S.state.functionRotation = {};
    if (!S.state.functionRotation[key] && S.state.functionRotation[line.id]) {
      S.state.functionRotation[key] = S.state.functionRotation[line.id];
    }

    const cur = S.state.schedule[key][dayIndex] || "RDO";
    const bagIdentity = line.function === "BAG";
    const dfo = isDfoCapable(line);

    if (cur !== "WORK") {
      S.state.schedule[key][dayIndex] = "WORK";
      if (bagIdentity) {
        setRotationDuty(key, dayIndex, "BAG");
      } else if (dfo) {
        var rawDuty = (typeof S.getRotationDuty === "function"
          ? S.getRotationDuty(line.id, dayIndex)
          : getRotationDutyLocal(line.id, dayIndex));
        var duty = rawDuty === "DFO" || rawDuty === "PAX" || !rawDuty ? "PAX" : rawDuty;
        if (duty === "PAX") {
          setRotationDuty(key, dayIndex, "BAG");
        } else {
          S.state.schedule[key][dayIndex] = "RDO";
          setRotationDuty(key, dayIndex, null);
        }
      } else {
        S.state.schedule[key][dayIndex] = "RDO";
        setRotationDuty(key, dayIndex, null);
      }
    } else if (bagIdentity) {
      S.state.schedule[key][dayIndex] = "RDO";
      setRotationDuty(key, dayIndex, null);
    } else if (dfo) {
      var rawDuty2 = (typeof S.getRotationDuty === "function"
        ? S.getRotationDuty(line.id, dayIndex)
        : getRotationDutyLocal(line.id, dayIndex));
      var duty2 = rawDuty2 === "DFO" || rawDuty2 === "PAX" || !rawDuty2 ? "PAX" : rawDuty2;
      if (duty2 === "PAX") {
        setRotationDuty(key, dayIndex, "BAG");
      } else {
        S.state.schedule[key][dayIndex] = "RDO";
        setRotationDuty(key, dayIndex, null);
      }
    } else {
      S.state.schedule[key][dayIndex] = "RDO";
      setRotationDuty(key, dayIndex, null);
    }

    if (S.syncRdoDaysFromSchedule) S.syncRdoDaysFromSchedule(line);
    refresh();
    if (S.renderCoverageBars) S.renderCoverageBars();
  }

  const refresh = () => {
    try {
      const svelteComponent = root._linesTableApp;
      if (svelteComponent) {
        applyProps(svelteComponent);
      } else {
        if (root.childNodes.length) root.innerHTML = '';
        const nextRows = buildRows();
        if (typeof S.applyExportCssVars === "function") S.applyExportCssVars();
        root._linesTableApp = new LinesTable({
          target: root,
          props: {
            rows: Array.isArray(nextRows) ? nextRows : [],
            shiftOptions: shiftOptions(),
            teamOptions: teamOptions(),
            exportStyle: currentExportStyle(),
            onInlineEdit: writeInlineEdit,
            onDayToggle: writeDayToggle
          }
        });
      }
    } catch (err) {
      console.error("lines-table: refresh failed", err);
    }
  };

  refresh();

  document.addEventListener("click", (e) => {
    const btn = e.target.closest?.(".tab-btn");
    if (btn && btn.dataset.tab === "lines") refresh();
  });

  ["lines:request-render", "lines:filter-change", "lines:sort-change", "lines:coverage-refresh"].forEach((event) => {
    window.addEventListener(event, refresh);
  });

  root.refresh = refresh;

  // Publish ready event if event bus available
  if (S.eventBus) {
    S.eventBus.publish("lines-table:ready", { module: "lines-table" });
  }

  return S;
}
