/**
 * Selective FT TSO shift rebalancing via candidate modal.
 */

export function selectFtTsoLines(lines) {
  if (!Array.isArray(lines)) return [];
  return lines.filter(function (l) {
    if (!l) return false;
    var isFt = (l.empClass === "FT" || !l.empClass) && !l.isPt && l.empClass !== "PT";
    if (!isFt) return false;
    if (l.isStso || l.isLtso || l.empClass === "STSO" || l.empClass === "LTSO") return false;
    if (l.isExtra || l.extraPositionId || l.extraName) return false;
    if (l.isTraining || l.training || l.trainingClass || l.empClass === "ESTI" || l.empClass === "MSTI") return false;
    return true;
  });
}

export function getFtRebalanceCandidates(S) {
  if (!S || !S.state) return { candidates: [], shifts: [], overfullShifts: [], underfullShifts: [], isEven: true };

  var lines = S.state.lines || [];
  var ftLines = selectFtTsoLines(lines);
  var shifts = S.state.shifts || [];

  if (ftLines.length === 0 || shifts.length < 2) {
    return { candidates: [], shifts: shifts, overfullShifts: [], underfullShifts: [], isEven: true };
  }

  // Count FT TSO per shiftId
  var ftCounts = {};
  shifts.forEach(function (s) { ftCounts[s.id] = 0; });
  ftLines.forEach(function (l) {
    if (ftCounts[l.shiftId] !== undefined) {
      ftCounts[l.shiftId]++;
    } else {
      ftCounts[l.shiftId] = 1;
    }
  });

  var totalFt = ftLines.length;
  var shiftCount = shifts.length;
  var avg = totalFt / shiftCount;

  var overfullShifts = shifts.filter(function (s) { return (ftCounts[s.id] || 0) > avg; });
  var underfullShifts = shifts.filter(function (s) { return (ftCounts[s.id] || 0) < avg; });

  var overfullSet = new Set(overfullShifts.map(function (s) { return s.id; }));

  if (!overfullShifts.length || !underfullShifts.length) {
    return { candidates: [], shifts: shifts, overfullShifts: overfullShifts, underfullShifts: underfullShifts, isEven: true };
  }

  // Determine default recommended target shift: underfull shift with lowest FT count
  function shiftStartMins(s) {
    if (!s || !s.start) return 0;
    if (S && typeof S.timeToMin === "function") return S.timeToMin(s.start);
    var p = String(s.start).split(":");
    return (+p[0] || 0) * 60 + (+p[1] || 0);
  }

  var sortedUnderfull = underfullShifts.slice().sort(function (a, b) {
    var countA = ftCounts[a.id] || 0;
    var countB = ftCounts[b.id] || 0;
    if (countA !== countB) return countA - countB;
    var startA = shiftStartMins(a);
    var startB = shiftStartMins(b);
    if (startA !== startB) return startA - startB;
    return String(a.id).localeCompare(String(b.id));
  });

  var recommendedShift = sortedUnderfull[0];

  var candidates = ftLines.filter(function (l) { return overfullSet.has(l.shiftId); }).map(function (l) {
    var currShift = shifts.find(function (s) { return s.id === l.shiftId; });
    return {
      line: l,
      currentShift: currShift,
      recommendedShiftId: recommendedShift ? recommendedShift.id : l.shiftId
    };
  });

  return {
    candidates: candidates,
    shifts: shifts,
    overfullShifts: overfullShifts,
    underfullShifts: underfullShifts,
    isEven: false
  };
}

export function approveFtRebalance(S, moves) {
  if (!S || !S.state) return false;
  S.state.issues = S.state.issues || [];

  if (!Array.isArray(moves) || moves.length === 0) {
    var msg0 = "No FT TSO lines selected to rebalance.";
    if (S.updateStatus) S.updateStatus(msg0);
    return false;
  }

  var shifts = S.state.shifts || [];
  var lines = S.state.lines || [];
  var ftLines = selectFtTsoLines(lines);

  // Before counts
  var beforeCounts = {};
  shifts.forEach(function (s) { beforeCounts[s.name || s.id] = 0; });
  ftLines.forEach(function (l) {
    var s = shifts.find(function (sh) { return sh.id === l.shiftId; });
    var name = s ? (s.name || s.id) : (l.shiftName || l.shiftId);
    beforeCounts[name] = (beforeCounts[name] || 0) + 1;
  });

  var movedCount = 0;
  moves.forEach(function (m) {
    var line = lines.find(function (l) { return String(l.id) === String(m.lineId); });
    if (!line) return;
    var targetShift = shifts.find(function (s) { return s.id === m.targetShiftId; });
    if (!targetShift) return;

    if (line.shiftId !== targetShift.id) {
      line.shiftId = targetShift.id;
      line.shiftName = targetShift.name;
      line.shiftLabel = S.shiftLabel ? S.shiftLabel(targetShift) : ((targetShift.start || "") + "–" + (targetShift.end || ""));
      if (line.startTime !== undefined) line.startTime = targetShift.start;
      if (line.endTime !== undefined) line.endTime = targetShift.end;
      if (line.start !== undefined) line.start = targetShift.start;
      if (line.end !== undefined) line.end = targetShift.end;
      movedCount++;
    }
  });

  if (movedCount === 0) {
    var msgNoMove = "No shift changes were made (selected lines already on target shifts).";
    if (S.updateStatus) S.updateStatus(msgNoMove);
    return false;
  }

  // After counts
  var updatedFtLines = selectFtTsoLines(lines);
  var afterCounts = {};
  shifts.forEach(function (s) { afterCounts[s.name || s.id] = 0; });
  updatedFtLines.forEach(function (l) {
    var s = shifts.find(function (sh) { return sh.id === l.shiftId; });
    var name = s ? (s.name || s.id) : (l.shiftName || l.shiftId);
    afterCounts[name] = (afterCounts[name] || 0) + 1;
  });

  var shiftSummaries = [];
  shifts.forEach(function (s) {
    var name = s.name || s.id;
    var b = beforeCounts[name] || 0;
    var a = afterCounts[name] || 0;
    if (b !== 0 || a !== 0) {
      shiftSummaries.push(name + ": " + b + "→" + a);
    }
  });

  var countsStr = shiftSummaries.join(", ");
  var statusMsg = "Rebalanced " + movedCount + " FT TSO line(s) · " + countsStr;
  if (S.updateStatus) S.updateStatus(statusMsg);
  if (typeof window !== "undefined" && window.alert) {
    window.alert(statusMsg);
  }

  // Re-assign cert pools if present
  if (S.assignCertPools) {
    try { S.assignCertPools(); } catch (e) { console.error("rebalanceFt assignCertPools", e); }
  }

  // Refresh matrix & lines views
  if (S.renderRdoMatrixModal) S.renderRdoMatrixModal();
  if (S.renderAll) S.renderAll();
  if (S.renderLines) S.renderLines();
  if (S.__USE_SVELTE_LINES && typeof window !== "undefined") {
    try { window.dispatchEvent(new CustomEvent("lines:request-render")); } catch (e) {}
  }

  return true;
}

export function attachRebalanceFt(S) {
  if (!S) return;
  S.selectFtTsoLines = selectFtTsoLines;
  S.getFtRebalanceCandidates = function () {
    return getFtRebalanceCandidates(S);
  };
  S.approveFtRebalance = function (moves) {
    return approveFtRebalance(S, moves);
  };
}
