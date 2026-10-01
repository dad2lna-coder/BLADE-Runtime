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

export function computePtQuotas(S, eligibleShifts, totalPt) {
  if (!eligibleShifts.length || totalPt <= 0) return {};
  var openMin = (S && S.timeToMin && S.state && S.state.open) ? S.timeToMin(S.state.open) : 210;
  var closeMin = (S && S.timeToMin && S.state && S.state.close) ? S.timeToMin(S.state.close) : 1380;
  if (closeMin <= openMin) { openMin = 210; closeMin = 1380; }

  var slots = [];
  for (var m = openMin; m < closeMin; m += 15) {
    slots.push(m);
  }

  var weights = eligibleShifts.map(function (s) {
    var w = 0;
    if (S && typeof S.shiftCoversSlot === "function") {
      slots.forEach(function (slot) {
        if (S.shiftCoversSlot(s.id, slot)) w++;
      });
    } else {
      var startM = (S && S.timeToMin && s.start) ? S.timeToMin(s.start) : 480;
      var endM = (S && S.timeToMin && s.end) ? S.timeToMin(s.end) : 990;
      slots.forEach(function (slot) {
        if (slot >= startM && slot < endM) w++;
      });
    }
    return Math.max(1, w);
  });

  var totalWeight = weights.reduce(function (a, b) { return a + b; }, 0) || 1;
  var numShifts = eligibleShifts.length;
  var quotas = eligibleShifts.map(function () { return 0; });
  var poolToAllocate = totalPt;

  // Seed each eligible shift with 1 if totalPt >= eligibleShifts.length, or top totalPt shifts if totalPt >= 2
  if (totalPt >= numShifts) {
    for (var i = 0; i < numShifts; i++) {
      quotas[i] = 1;
    }
    poolToAllocate = totalPt - numShifts;
  } else if (totalPt >= 2 && numShifts >= 2) {
    var indices = eligibleShifts.map(function (s, idx) { return { index: idx, w: weights[idx] }; });
    indices.sort(function (a, b) { return b.w - a.w; });
    for (var k = 0; k < totalPt; k++) {
      quotas[indices[k].index] = 1;
    }
    poolToAllocate = 0;
  }

  if (poolToAllocate > 0) {
    var rawExtra = eligibleShifts.map(function (s, i) {
      return (poolToAllocate * weights[i]) / totalWeight;
    });

    var extraQuotas = rawExtra.map(function (rq) { return Math.floor(rq); });
    var assignedExtra = extraQuotas.reduce(function (a, b) { return a + b; }, 0);
    var rem = poolToAllocate - assignedExtra;

    if (rem > 0) {
      var remainders = rawExtra.map(function (rq, i) {
        return { index: i, rem: rq - extraQuotas[i] };
      });
      remainders.sort(function (a, b) { return b.rem - a.rem; });
      for (var k = 0; k < rem; k++) {
        extraQuotas[remainders[k].index]++;
      }
    }

    for (var j = 0; j < numShifts; j++) {
      quotas[j] += extraQuotas[j];
    }
  }

  var result = {};
  eligibleShifts.forEach(function (s, i) {
    result[s.id] = quotas[i];
  });
  return result;
}

export function canLineMoveToShift(line, shift) {
  if (!line || !shift) return false;
  var hard = Array.isArray(shift.rdoHard) ? shift.rdoHard.map(Number).filter(function (x) { return x >= 0 && x <= 6; }) : [];
  if (!hard.length) return true;
  var lineRdos = Array.isArray(line.rdoDays) ? line.rdoDays.map(Number) : [];
  for (var i = 0; i < hard.length; i++) {
    if (lineRdos.indexOf(hard[i]) < 0) {
      return false;
    }
  }
  return true;
}

export function rebalancePtTsoShifts(S) {
  if (!S || !S.state) return false;
  S.state.issues = S.state.issues || [];

  var lines = S.state.lines || [];
  var ptLines = selectPtTsoLines(lines);
  var eligibleShifts = getEligiblePtShifts(S.state.shifts || []);

  if (ptLines.length === 0) {
    var issueMsg1 = "Rebalance PT TSO shifts: No eligible PT TSO lines to rebalance.";
    S.state.issues.push(issueMsg1);
    if (S.updateStatus) S.updateStatus(issueMsg1);
    return false;
  }

  if (eligibleShifts.length < 2) {
    var issueMsg2 = "Rebalance PT TSO shifts: At least 2 non-long shifts required to rebalance PT lines (found " + eligibleShifts.length + ").";
    S.state.issues.push(issueMsg2);
    if (S.updateStatus) S.updateStatus(issueMsg2);
    return false;
  }

  var quotas = computePtQuotas(S, eligibleShifts, ptLines.length);
  var assignedCounts = {};
  eligibleShifts.forEach(function (s) { assignedCounts[s.id] = 0; });

  function findMaxDeficitShift(candidates, originalShiftId) {
    if (!candidates || !candidates.length) return null;
    var maxDeficit = -Infinity;
    candidates.forEach(function (s) {
      var def = (quotas[s.id] || 0) - (assignedCounts[s.id] || 0);
      if (def > maxDeficit) maxDeficit = def;
    });
    var tied = candidates.filter(function (s) {
      return ((quotas[s.id] || 0) - (assignedCounts[s.id] || 0)) === maxDeficit;
    });
    var orig = tied.find(function (s) { return s.id === originalShiftId; });
    return orig || tied[0];
  }

  var movedCount = 0;
  ptLines.forEach(function (line) {
    var originalShiftId = line.shiftId;
    var currentShift = eligibleShifts.find(function (s) { return s.id === originalShiftId; });

    var compatibleShifts = eligibleShifts.filter(function (s) {
      return canLineMoveToShift(line, s);
    });

    var compatibleWithDeficit = compatibleShifts.filter(function (s) {
      return (quotas[s.id] || 0) - (assignedCounts[s.id] || 0) > 0;
    });

    var targetShift = null;
    if (compatibleWithDeficit.length > 0) {
      targetShift = findMaxDeficitShift(compatibleWithDeficit, originalShiftId);
    } else if (compatibleShifts.length > 0) {
      // Hard-RDO fallback: preferred deficit shift was blocked, pick max-deficit compatible shift (soft overshoot OK)
      targetShift = findMaxDeficitShift(compatibleShifts, originalShiftId);
    }

    if (targetShift) {
      assignedCounts[targetShift.id] = (assignedCounts[targetShift.id] || 0) + 1;
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
      if (assignedCounts[targetShift.id] > (quotas[targetShift.id] || 0)) {
        var note = "PT line " + (line.lineCode || line.id) + " assigned to shift " + (targetShift.name || targetShift.id) + " (quota overflow: " + assignedCounts[targetShift.id] + "/" + (quotas[targetShift.id] || 0) + ").";
        S.state.issues.push(note);
      }
    } else {
      // All non-long shifts blocked by hard RDO
      assignedCounts[originalShiftId] = (assignedCounts[originalShiftId] || 0) + 1;
      var currentShiftName = currentShift ? currentShift.name : (line.shiftName || line.shiftId);
      var issueNote = "PT line " + (line.lineCode || line.id) + " kept on shift " + currentShiftName + " due to hard RDO constraints.";
      S.state.issues.push(issueNote);
    }
  });

  // Re-assign cert pools if present
  if (S.assignCertPools) {
    try { S.assignCertPools(); } catch (e) { console.error("rebalancePt assignCertPools", e); }
  }

  // Refresh matrix/lines views
  if (S.renderRdoMatrixModal) S.renderRdoMatrixModal();
  if (S.renderAll) S.renderAll();
  if (S.renderLines) S.renderLines();
  if (S.__USE_SVELTE_LINES) {
    try { window.dispatchEvent(new CustomEvent("lines:request-render")); } catch (e) {}
  }

  var msg = "Rebalanced " + ptLines.length + " PT TSO line(s) across " + eligibleShifts.length + " non-long shift(s) (" + movedCount + " line(s) moved).";
  if (movedCount === 0 && ptLines.length > 0) {
    msg = "PT TSO shifts rebalanced: all " + ptLines.length + " line(s) are already optimally distributed across " + eligibleShifts.length + " shift(s).";
  }
  if (S.updateStatus) S.updateStatus(msg);
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
