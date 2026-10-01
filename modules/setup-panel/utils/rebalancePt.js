/**
 * Post-generate rebalance for PT TSO lines across non-long shifts.
 */

export function selectPtTsoLines(lines) {
  if (!Array.isArray(lines)) return [];
  return lines.filter(function (l) {
    if (!l) return false;
    var isPt = l.empClass === "PT" || l.isPt === true;
    if (!isPt) return false;
    if (l.isStso || l.isLtso || l.empClass === "STSO" || l.empClass === "LTSO") return false;
    if (l.isExtra || l.extraPositionId || l.extraName) return false;
    if (l.isTraining || l.training || l.trainingClass || l.empClass === "ESTI" || l.empClass === "MSTI") return false;
    return true;
  });
}

export function getEligiblePtShifts(shifts) {
  if (!Array.isArray(shifts)) return [];
  return shifts.filter(function (s) {
    if (!s) return false;
    var isLong = (+s.paid || 8) >= 10;
    return !isLong;
  });
}

export function rebalancePtTsoShifts(S) {
  if (!S || !S.state) return false;
  S.state.issues = S.state.issues || [];

  var lines = S.state.lines || [];
  var ptLines = selectPtTsoLines(lines);
  var eligibleShifts = getEligiblePtShifts(S.state.shifts || []);

  if (ptLines.length === 0) {
    var issue1 = "Rebalance PT TSO shifts: No eligible PT TSO lines to rebalance.";
    S.state.issues.push(issue1);
    if (S.updateStatus) S.updateStatus(issue1);
    if (typeof window !== "undefined" && window.alert) window.alert(issue1);
    return false;
  }

  if (eligibleShifts.length < 2) {
    var issue2 = "Rebalance PT TSO shifts: At least 2 non-long shifts required (found " + eligibleShifts.length + ").";
    S.state.issues.push(issue2);
    if (S.updateStatus) S.updateStatus(issue2);
    if (typeof window !== "undefined" && window.alert) window.alert(issue2);
    return false;
  }

  // Record before counts per shift name
  var beforeCounts = {};
  eligibleShifts.forEach(function (s) {
    var name = s.name || s.id;
    beforeCounts[name] = 0;
  });
  ptLines.forEach(function (line) {
    var s = eligibleShifts.find(function (sh) { return sh.id === line.shiftId; });
    var name = s ? (s.name || s.id) : (line.shiftName || line.shiftId);
    beforeCounts[name] = (beforeCounts[name] || 0) + 1;
  });

  // Force spread PT lines round-robin across eligible shifts (ignoring hard RDO)
  var movedCount = 0;
  ptLines.forEach(function (line, idx) {
    var targetShift = eligibleShifts[idx % eligibleShifts.length];
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

  // Record after counts per shift name
  var afterCounts = {};
  eligibleShifts.forEach(function (s) {
    var name = s.name || s.id;
    afterCounts[name] = 0;
  });
  ptLines.forEach(function (line) {
    var s = eligibleShifts.find(function (sh) { return sh.id === line.shiftId; });
    var name = s ? (s.name || s.id) : (line.shiftName || line.shiftId);
    afterCounts[name] = (afterCounts[name] || 0) + 1;
  });

  var shiftSummaries = [];
  eligibleShifts.forEach(function (s) {
    var name = s.name || s.id;
    var b = beforeCounts[name] || 0;
    var a = afterCounts[name] || 0;
    shiftSummaries.push(name + ": " + b + "→" + a);
  });

  var countsStr = shiftSummaries.join(", ");
  var msg = "Rebalanced " + ptLines.length + " PT TSO line(s) (" + movedCount + " moved) · " + countsStr + " · Ignored hard RDO for rescue.";
  if (S.updateStatus) S.updateStatus(msg);

  // Re-assign cert pools if present
  if (S.assignCertPools) {
    try { S.assignCertPools(); } catch (e) { console.error("rebalancePt assignCertPools", e); }
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

export function attachRebalancePt(S) {
  if (!S) return;
  S.selectPtTsoLines = selectPtTsoLines;
  S.getEligiblePtShifts = getEligiblePtShifts;
  S.rebalancePtTsoShifts = function () {
    return rebalancePtTsoShifts(S);
  };
}
