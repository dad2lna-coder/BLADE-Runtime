/** Single-class roster generator. Rebuilds lines for one class while keeping
 *  all other classes' lines, shifts, RDOs, duties, and certs untouched.
 */
import { buildScheduleForLine } from "../actions/generate.js";
import { assignCertPoolsToLines } from "./certAssign.js";

export function belongsToClass(line, classKey) {
  if (!line) return false;
  if (classKey === "STSO") {
    return !!(line.isStso || line.empClass === "STSO" || line.position === "STSO");
  }
  if (classKey === "LTSO") {
    return !!(line.isLtso || line.empClass === "LTSO" || line.position === "LTSO");
  }
  if (classKey === "TSO") {
    var isStsoOrLtso = line.isStso || line.isLtso || line.empClass === "STSO" || line.empClass === "LTSO";
    var isExtraOrTraining = line.isExtra || line.extraPositionId || line.isTraining || line.trainingClass || line.empClass === "ESTI" || line.empClass === "MSTI";
    return !isStsoOrLtso && !isExtraOrTraining;
  }
  if (classKey === "MSTI") {
    return line.trainingClass === "MSTI" || line.empClass === "MSTI" || line.extraName === "MSTI";
  }
  if (classKey === "ESTI") {
    return line.trainingClass === "ESTI" || line.empClass === "ESTI" || line.extraName === "ESTI";
  }
  if (classKey.indexOf("EXTRA_") === 0) {
    var extraId = classKey.substring(6);
    return line.extraPositionId === extraId || String(line.extraPositionId) === extraId || line.extraName === extraId;
  }
  return false;
}

export function getClassHeadcount(S, classKey) {
  var st = (S && S.state) || {};
  if (classKey === "STSO") return { M: st.stsoM || 0, F: st.stsoF || 0, total: (st.stsoM || 0) + (st.stsoF || 0) };
  if (classKey === "LTSO") return { M: st.ltsoM || 0, F: st.ltsoF || 0, total: (st.ltsoM || 0) + (st.ltsoF || 0) };
  if (classKey === "TSO") {
    var m = (st.ftM || 0) + (st.ptM || 0);
    var f = (st.ftF || 0) + (st.ptF || 0);
    return { M: m, F: f, total: m + f };
  }
  if (classKey === "MSTI") return { M: 0, F: 0, total: st.msti || 0 };
  if (classKey === "ESTI") return { M: 0, F: 0, total: st.esti || 0 };
  if (classKey.indexOf("EXTRA_") === 0) {
    var extraId = classKey.substring(6);
    var list = st.extraPositions || [];
    var pos = list.find(function (p) { return p.id === extraId || p.name === extraId; });
    if (pos) return { M: +pos.m || 0, F: +pos.f || 0, total: (+pos.m || 0) + (+pos.f || 0) };
  }
  return { M: 0, F: 0, total: 0 };
}

function getNextId(existingIds, startId) {
  var id = startId;
  while (existingIds.has(id)) {
    id++;
  }
  existingIds.add(id);
  return id;
}

export function generateClass(S, classKey, perShiftTargets) {
  if (!S || !S.state) return;
  S.state.issues = S.state.issues || [];
  if (S.collectSetupInputs) S.collectSetupInputs();
  if (S.readShiftsFromDom) S.readShiftsFromDom();

  var openMin = S.timeToMin ? S.timeToMin(S.state.open) : 210;
  var closeMin = S.timeToMin ? S.timeToMin(S.state.close) : 1380;
  var days = (S.state.weekCount || 1) * 7;
  var existingLines = S.state.lines || [];
  var existingSchedule = S.state.schedule || {};
  var existingRotation = S.state.functionRotation || {};

  // Separate untouched lines from lines belonging to classKey
  var untouchedLines = [];
  var lockedClassLines = [];

  existingLines.forEach(function (l) {
    if (!belongsToClass(l, classKey)) {
      untouchedLines.push(l);
    } else if (S.isLineScheduleLocked && S.isLineScheduleLocked(l)) {
      lockedClassLines.push(l);
    }
  });

  // Collect existing line IDs
  var usedIds = new Set();
  untouchedLines.forEach(function (l) { usedIds.add(+l.id); });
  lockedClassLines.forEach(function (l) { usedIds.add(+l.id); });

  // Save snapshot of untouched line schedule & functionRotation
  var savedSchedule = {};
  var savedRotation = {};
  untouchedLines.concat(lockedClassLines).forEach(function (l) {
    if (existingSchedule[l.id]) savedSchedule[l.id] = existingSchedule[l.id].slice();
    if (existingRotation[l.id]) savedRotation[l.id] = existingRotation[l.id].slice();
  });

  var newClassLines = [];
  var hc = getClassHeadcount(S, classKey);
  var shifts = S.state.shifts || [];
  var fallbackShift = shifts[0] || { id: "S1", name: "AM", start: "03:30", end: "12:00", paid: 8 };

  if (perShiftTargets && typeof perShiftTargets === "object") {
    // Generate class using perShiftTargets
    var startId = 1;
    if (classKey === "STSO") startId = 10000;
    else if (classKey === "LTSO") startId = 20000;
    else if (classKey === "TSO") startId = 1;
    else if (classKey === "MSTI") startId = 40000;
    else if (classKey === "ESTI") startId = 41000;
    else if (classKey.indexOf("EXTRA_") === 0) startId = 30000;

    var totalTargetM = 0;
    var totalTargetF = 0;

    shifts.forEach(function (sh) {
      var t = perShiftTargets[sh.id] || { M: 0, F: 0 };
      var tM = Math.max(0, +t.M || 0);
      var tF = Math.max(0, +t.F || 0);
      totalTargetM += tM;
      totalTargetF += tF;

      for (var i = 0; i < tM; i++) {
        var idM = getNextId(usedIds, startId);
        newClassLines.push(createLineForClass(S, classKey, idM, sh, "M", false));
      }
      for (var j = 0; j < tF; j++) {
        var idF = getNextId(usedIds, startId);
        newClassLines.push(createLineForClass(S, classKey, idF, sh, "F", false));
      }
    });

    // Handle shortfalls if target sum < entered headcount
    var shortfallM = Math.max(0, hc.M - totalTargetM);
    var shortfallF = Math.max(0, hc.F - totalTargetF);

    for (var sm = 0; sm < shortfallM; sm++) {
      var sfIdM = getNextId(usedIds, startId);
      var lineSfM = createLineForClass(S, classKey, sfIdM, fallbackShift, "M", true);
      newClassLines.push(lineSfM);
    }
    for (var sf = 0; sf < shortfallF; sf++) {
      var sfIdF = getNextId(usedIds, startId);
      var lineSfF = createLineForClass(S, classKey, sfIdF, fallbackShift, "F", true);
      newClassLines.push(lineSfF);
    }
  } else {
    // Standard generation for this class
    if (classKey === "STSO") {
      var stsoTotal = Math.max(0, (S.state.stsoM + S.state.stsoF) - lockedClassLines.length);
      if (stsoTotal > 0) {
        var stsoAlloc = S.allocateSupervisoryHeadcounts(stsoTotal, openMin, closeMin, "stsoForce", untouchedLines);
        newClassLines = S.buildSupervisoryLines(stsoAlloc.counts || {}, "STSO");
      }
    } else if (classKey === "LTSO") {
      var ltsoTotal = Math.max(0, (S.state.ltsoM + S.state.ltsoF) - lockedClassLines.length);
      if (ltsoTotal > 0) {
        var ltsoAlloc = S.allocateSupervisoryHeadcounts(ltsoTotal, openMin, closeMin, "ltsoForce", untouchedLines);
        newClassLines = S.buildSupervisoryLines(ltsoAlloc.counts || {}, "LTSO");
      }
    } else if (classKey === "TSO") {
      var tsoTotal = Math.max(0, hc.total - lockedClassLines.length);
      if (tsoTotal > 0) {
        var allocation = S.allocateShiftHeadcounts(tsoTotal, openMin, closeMin);
        newClassLines = S.buildLines(allocation.counts || {});
      }
    } else if (classKey === "ESTI" || classKey === "MSTI") {
      var trainLines = S.buildTrainingClassLines ? S.buildTrainingClassLines() : [];
      newClassLines = trainLines.filter(function (l) { return belongsToClass(l, classKey); });
    } else if (classKey.indexOf("EXTRA_") === 0) {
      var extraLines = S.buildExtraPositionLines ? S.buildExtraPositionLines() : [];
      newClassLines = extraLines.filter(function (l) { return belongsToClass(l, classKey); });
    }
  }

  // Combine updated lines
  S.state.lines = untouchedLines.concat(lockedClassLines, newClassLines);

  // Rebuild schedule for new class lines only
  newClassLines.forEach(function (line) {
    S.state.schedule[line.id] = buildScheduleForLine(S, line, days);
  });

  // Restore untouched & locked line schedules
  Object.keys(savedSchedule).forEach(function (lineId) {
    S.state.schedule[lineId] = savedSchedule[lineId];
  });

  // Setup function rotation & duties
  S.state.functionRotation = S.state.functionRotation || {};
  Object.keys(savedRotation).forEach(function (lineId) {
    S.state.functionRotation[lineId] = savedRotation[lineId];
  });

  // Populate duties for new class lines
  newClassLines.forEach(function (line) {
    var rot = [];
    var sched = S.state.schedule[line.id] || [];
    var isTrain = line.isTraining || line.trainingClass || line.empClass === "ESTI" || line.empClass === "MSTI";

    if (line.isShortfall || line.function === "-") {
      line.function = "-";
      for (var d = 0; d < days; d++) {
        rot[d] = sched[d] === "WORK" ? "-" : "OFF";
      }
    } else if (isTrain) {
      line.function = "TRAINING";
      for (var dt = 0; dt < days; dt++) {
        rot[dt] = sched[dt] === "WORK" ? "TRAINING" : "OFF";
      }
    } else {
      line.function = line.function || "PAX";
      for (var dp = 0; dp < days; dp++) {
        rot[dp] = sched[dp] === "WORK" ? (line.function || "PAX") : "OFF";
      }
    }
    S.state.functionRotation[line.id] = rot;
  });

  // Assign cert pools for new lines without overwriting untouched lines
  if (S.assignCertPoolsToLines) {
    assignCertPoolsToLines(newClassLines, S.state.certPool, {
      startMinOf: function (line) {
        if (S.getShift && S.timeToMin) {
          var sh = S.getShift(line.shiftId);
          return sh ? S.timeToMin(sh.start) : 0;
        }
        return 0;
      },
      getShift: S.getShift,
      timeToMin: S.timeToMin,
      schedule: S.state.schedule || {},
      openMin: openMin,
      closeMin: closeMin
    });
  }

  // Refresh UI
  try {
    if (S.renderAll) S.renderAll();
    if (S.renderCoverageBars) S.renderCoverageBars();
    if (S.__USE_SVELTE_LINES && typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("lines:request-render"));
    } else if (S.renderLines) S.renderLines();
  } catch (err) {
    console.error("generateClass UI refresh", err);
  }

  if (S.updateStatus) {
    S.updateStatus("Generated " + classKey + " (" + newClassLines.length + " lines). Other classes untouched.");
  }
}

function createLineForClass(S, classKey, id, shift, sex, isShortfall) {
  var isStso = classKey === "STSO";
  var isLtso = classKey === "LTSO";
  var isTrain = classKey === "MSTI" || classKey === "ESTI";
  var isExtra = classKey.indexOf("EXTRA_") === 0;

  var empClass = isStso ? "STSO" : (isLtso ? "LTSO" : (isTrain ? classKey : "FT"));
  var position = isStso ? "STSO" : (isLtso ? "LTSO" : (isTrain ? classKey : "TSO"));

  var lineCode = position + " " + String(id).padStart(3, "0");
  if (isExtra) {
    var extraId = classKey.substring(6);
    position = extraId;
    lineCode = extraId + " " + String(id).padStart(3, "0");
  }

  var workDays = S.targetWorkDays ? S.targetWorkDays(shift.id, empClass) : ((+shift.paid || 8) >= 10 ? 4 : 5);
  var rdoCount = 7 - workDays;
  var hard = Array.isArray(shift.rdoHard)
    ? shift.rdoHard.map(Number).filter(function (x) { return x >= 0 && x <= 6; })
    : [];
  var rdoDays = hard.length > 0 ? hard.slice() : (S.consecutiveRdos ? S.consecutiveRdos(rdoCount, id % 7) : [0, 6]);
  while (rdoDays.length < rdoCount) {
    for (var d = 0; d < 7 && rdoDays.length < rdoCount; d++) {
      if (rdoDays.indexOf(d) < 0) rdoDays.push(d);
    }
  }

  return {
    id: id,
    lineCode: lineCode,
    shiftId: shift.id,
    shiftName: shift.name,
    shiftLabel: S.shiftLabel ? S.shiftLabel(shift) : ((shift.start || "") + "–" + (shift.end || "")),
    empClass: empClass,
    position: position,
    isStso: isStso,
    isLtso: isLtso,
    isExtra: isExtra,
    isTraining: isTrain,
    trainingClass: isTrain ? classKey : null,
    extraPositionId: isExtra ? classKey.substring(6) : null,
    extraName: isExtra ? classKey.substring(6) : null,
    sex: isTrain ? "" : sex,
    function: isShortfall ? "-" : (isTrain ? "TRAINING" : "PAX"),
    isShortfall: !!isShortfall,
    rdoDays: rdoDays,
    rdoHard: hard.length > 0,
    paid: shift.paid || 8
  };
}

export function attachClassGenerate(S) {
  if (!S) return;
  S.belongsToClass = belongsToClass;
  S.getClassHeadcount = function (classKey) { return getClassHeadcount(S, classKey); };
  S.generateClass = function (classKey, perShiftTargets) { return generateClass(S, classKey, perShiftTargets); };
}
