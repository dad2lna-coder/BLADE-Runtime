// Shift-driven function assignment.
// Requirements are (role, shiftId, min, max) counts of generated lines —
// not 30-minute slot headcounts. Coverage slots are derived afterwards.
import { lineRoleKey } from "./duty.js";
import { lineStartMin, isAmSide, computeShiftAnchors } from "./duty.js";
import { ensureFunctionCoverage, capFunctionPoolsToFte, buildCertifiedPools } from "./pools.js";
import {
  getShiftRequirement, getEligibleLinesForShift, openingAndClosingShifts,
  lineOnShift
} from "./shifts.js";

let api = null;

export function bindAssignApi(scheduler) {
  api = scheduler;
}

function worksDay(line, d) {
  var sched = api.state.schedule[line.id] || api.state.schedule[String(line.id)];
  if (!sched) return false;
  return sched[d] === "WORK";
}

function ensureEligible(line) {
  if (!line.functionEligible || typeof line.functionEligible !== "object") {
    line.functionEligible = { dfo: false, bag: false, pax: false };
  }
  return line.functionEligible;
}

function unused(role, sex, fc) {
  var lines = api.state.lines || [];
  return lines.filter(function (l) {
    if (l.isExtra || l.extraPositionId) return false;
    var el = ensureEligible(l);
    return lineRoleKey(l) === role && l.sex === sex && !el.bag && !el.dfo;
  });
}

function sortByBias(arr, fc) {
  return arr.slice().sort(function (a, b) {
    if (fc && fc.bias === "male" && a.sex !== b.sex) return a.sex === "M" ? -1 : 1;
    if (fc && fc.bias === "female" && a.sex !== b.sex) return a.sex === "F" ? -1 : 1;
    return lineStartMin(a) - lineStartMin(b) || String(a.id).localeCompare(String(b.id));
  });
}

function countBagDuties(lineId) {
  var row = api.state.functionRotation && api.state.functionRotation[String(lineId)];
  if (!row) return 0;
  var n = 0;
  for (var i = 0; i < row.length; i++) if (row[i] === "BAG") n++;
  return n;
}

export function markBag(role, sex, n, fc) {
  if (!n || n <= 0) return { total: 0 };
  fc = fc || ensureFunctionCoverage();
  var lines = unused(role, sex, fc).slice();
  lines.sort(function (a, b) {
    return lineStartMin(a) - lineStartMin(b) || String(a.id).localeCompare(String(b.id));
  });
  var taken = 0;
  for (var i = 0; i < lines.length && taken < n; i++) {
    ensureEligible(lines[i]).bag = true;
    taken++;
  }
  return { total: taken };
}

function isPtLine(line) {
  return !!(line && (line.empClass === "PT" || line.isPt === true));
}

function tsoPtDfoRemaining(fc) {
  var cap = Math.max(0, Math.floor(+(fc && fc.poolTsoDfoPt) || 0));
  var used = 0;
  (api.state.lines || []).forEach(function (l) {
    if (!l || l.isExtra || l.extraPositionId) return;
    if (lineRoleKey(l) !== "TSO") return;
    if (!isPtLine(l)) return;
    var el = l.functionEligible;
    if (el && el.dfo) used++;
  });
  return Math.max(0, cap - used);
}

export function markDfo(role, sex, n, fc) {
  if (!n || n <= 0) return { am: 0, pm: 0, total: 0 };
  fc = fc || ensureFunctionCoverage();
  var anchors = computeShiftAnchors();
  var thr = fc.phaseThresholdMin || 15;
  var pool = unused(role, sex, fc).slice();
  pool.sort(function (a, b) {
    if (role === "TSO") {
      var ap = isPtLine(a) ? 1 : 0;
      var bp = isPtLine(b) ? 1 : 0;
      if (ap !== bp) return ap - bp;
    }
    return lineStartMin(a) - lineStartMin(b) || String(a.id).localeCompare(String(b.id));
  });
  var amSide = pool.filter(function (l) { return isAmSide(lineStartMin(l), anchors, thr); });
  var pmSide = pool.filter(function (l) { return !isAmSide(lineStartMin(l), anchors, thr); });
  var oc = openingAndClosingShifts();
  amSide.sort(function (a, b) {
    var aOpen = lineOnShift(a, oc.open) ? 0 : 1;
    var bOpen = lineOnShift(b, oc.open) ? 0 : 1;
    if (aOpen !== bOpen) return aOpen - bOpen;
    return lineStartMin(a) - lineStartMin(b) || String(a.id).localeCompare(String(b.id));
  });
  pmSide.sort(function (a, b) {
    var aClose = lineOnShift(a, oc.close) ? 0 : 1;
    var bClose = lineOnShift(b, oc.close) ? 0 : 1;
    if (aClose !== bClose) return aClose - bClose;
    return lineStartMin(a) - lineStartMin(b) || String(a.id).localeCompare(String(b.id));
  });
  var needAm = fc.amPmSplit ? Math.ceil(n / 2) : n;
  var needPm = fc.amPmSplit ? Math.floor(n / 2) : 0;
  if (amSide.length < needAm) { needPm += needAm - amSide.length; needAm = amSide.length; }
  if (pmSide.length < needPm) { needAm = Math.min(amSide.length, needAm + (needPm - pmSide.length)); needPm = pmSide.length; }
  while (needAm + needPm > n) {
    if (needPm >= needAm && needPm > 0) needPm--;
    else if (needAm > 0) needAm--;
    else break;
  }
  function take(arr, count) {
    var taken = 0;
    for (var i = 0; i < arr.length && taken < count; i++) {
      var cand = arr[i];
      var el = ensureEligible(cand);
      if (el.bag || el.dfo) continue;
      if (role === "TSO" && isPtLine(cand) && tsoPtDfoRemaining(fc) <= 0) continue;
      el.dfo = true;
      taken++;
    }
    return taken;
  }
  var gotAm = take(amSide, needAm);
  var gotPm = take(pmSide, needPm);
  var short = n - gotAm - gotPm;
  if (short > 0) gotPm += take(unused(role, sex, fc), short);
  return { am: gotAm, pm: gotPm, total: gotAm + gotPm };
}
