/** Capacity + daily mod-set coverage assignment + mod-set board */
import { attachModSetDay } from "./mod-set-day.js";
import { attachCapacityRender } from "./capacity-render.js";

export function initCapacityMath(S) {
  S = S || window.Scheduler;
  if (!S) return;

  function cfg() {
    return (S.getAirportConfig && S.getAirportConfig()) || { startTime: "03:30", endTime: "23:00", terminals: [] };
  }
  function toMin(t) { return S.timeToMin ? S.timeToMin(t) : 0; }
  function label(m) { return S.slotLabel ? S.slotLabel(m) : (S.minToTime ? S.minToTime(m) : String(m)); }
  function lanesOf(ms) {
    var n = Number(ms && ms.lanes);
    return Number.isFinite(n) && n >= 0 ? n : 2;
  }
  function rates() {
    var v = cfg().volumePerHour || {};
    var std = Number(v.STD) || 150;
    var pre = Number(v.PRE) || 240;
    var mix = Number(v.MIX);
    if (!Number.isFinite(mix) || mix <= 0) mix = (std + pre) / 2;
    return { STD: std, PRE: pre, MIX: mix };
  }
  function paxHalf(program, n) {
    var r = rates();
    return n * ((r[program] != null ? r[program] : r.STD) / 2);
  }
  function windowOf(node, parent) {
    var start = toMin((node && node.startTime) || (parent && parent.startTime) || cfg().startTime || "03:30");
    var end = toMin((node && node.endTime) || (parent && parent.endTime) || cfg().endTime || "23:00");
    if (end <= start) end += 1440;
    return { start: start, end: end };
  }
  function setOpen(ms, cp, term, slotMin) {
    var win = windowOf(cp, term);
    if (slotMin < win.start || slotMin >= win.end) return false;
    var start = toMin((ms && ms.startTime) || cp.startTime);
    var end = ms && ms.endTime ? toMin(ms.endTime) : win.end;
    if (end <= start) end += 1440;
    return start <= slotMin && slotMin < end;
  }

  attachModSetDay(S);
  attachCapacityRender(S);

  S.capacitySlots = function () {
    var c = cfg();
    var open = Math.floor(toMin(c.startTime || "03:30") / 30) * 30;
    var close = Math.ceil(toMin(c.endTime || "23:00") / 30) * 30;
    if (close <= open) close += 1440;
    var out = [];
    for (var m = open; m < close; m += 30) out.push(m);
    return out;
  };

  S.computeLaneCapacityMatrix = function () {
    var c = cfg();
    var slots = S.capacitySlots();
    var cps = [];
    (c.terminals || []).forEach(function (term) {
      (term.checkpoints || []).forEach(function (cp) {
        cps.push({ key: "t" + term.id + "c" + cp.id, terminalId: term.id, terminal: term.name, checkpointId: cp.id, checkpoint: cp.name, term: term, cp: cp });
      });
    });
    var rows = slots.map(function (slot) {
      var byCp = {}, byTerm = {}, airportLanes = 0, airportPax = 0;
      cps.forEach(function (col) {
        var lanes = 0, pax = 0;
        (col.cp.modSets || []).forEach(function (ms) {
          if (!setOpen(ms, col.cp, col.term, slot)) return;
          var n = lanesOf(ms);
          lanes += n;
          pax += paxHalf(ms.program || "STD", n);
        });
        byCp[col.key] = { lanes: lanes, pax: pax };
        if (!byTerm[col.terminalId]) byTerm[col.terminalId] = { lanes: 0, pax: 0 };
        byTerm[col.terminalId].lanes += lanes;
        byTerm[col.terminalId].pax += pax;
        airportLanes += lanes;
        airportPax += pax;
      });
      return { slot: slot, time: label(slot), byCheckpoint: byCp, byTerminal: byTerm, airportLanes: airportLanes, airportPax: airportPax };
    });
    var peakLanes = 0, peakPax = 0;
    rows.forEach(function (r) {
      if (r.airportLanes > peakLanes) peakLanes = r.airportLanes;
      if (r.airportPax > peakPax) peakPax = r.airportPax;
    });
    return { checkpoints: cps, terminals: (c.terminals || []).map(function (t) { return { id: t.id, name: t.name }; }), rows: rows, rates: rates(), peakLanes: peakLanes, peakPax: peakPax };
  };
  S.computeCapacity = S.computeLaneCapacityMatrix;

  S.initCapacity = function () {
    if (typeof S.switchTab === "function" && !S._capacityTabWrapped) {
      S._capacityTabWrapped = true;
      var orig = S.switchTab;
      S.switchTab = function (name) {
        orig(name);
        if (name === "capacity") {
          S.renderCapacity();
          S.renderModSetBoard();
        }
      };
    }
    S.renderCapacity();
  };
}
