/**
 * Selective FT TSO shift rebalancing via surplus-by-sex candidate modal.
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

function shiftStartMins(S, s) {
  if (!s || !s.start) return 0;
  if (S && typeof S.timeToMin === "function") return S.timeToMin(s.start);
  var p = String(s.start).split(":");
  return (+p[0] || 0) * 60 + (+p[1] || 0);
}

export function getFtRebalanceCandidates(S) {
  if (!S || !S.state) return { candidates: [], shifts: [], isEven: true };

  var lines = S.state.lines || [];
  var ftLines = selectFtTsoLines(lines);
  var shifts = S.state.shifts || [];

  if (ftLines.length === 0 || shifts.length < 2) {
    return { candidates: [], shifts: shifts, isEven: true };
  }

  var shiftCount = shifts.length;

  // Counts per shift & sex
  var countsM = {};
  var countsF = {};
  shifts.forEach(function (s) { countsM[s.id] = 0; countsF[s.id] = 0; });

  var totalM = 0;
  var totalF = 0;
  ftLines.forEach(function (l) {
    var sx = (l.sex === "F") ? "F" : "M";
    if (sx === "F") {
      countsF[l.shiftId] = (countsF[l.shiftId] || 0) + 1;
      totalF++;
    } else {
      countsM[l.shiftId] = (countsM[l.shiftId] || 0) + 1;
      totalM++;
    }
  });

  var floorM = Math.floor(totalM / shiftCount);
  var ceilM = Math.ceil(totalM / shiftCount);
  var floorF = Math.floor(totalF / shiftCount);
  var ceilF = Math.ceil(totalF / shiftCount);

  var underfullM = shifts.filter(function (s) { return (countsM[s.id] || 0) < floorM; });
  var underfullF = shifts.filter(function (s) { return (countsF[s.id] || 0) < floorF; });

  var candidates = [];

  shifts.forEach(function (s) {
    var cM = countsM[s.id] || 0;
    if (cM > ceilM) {
      var surplusM = cM - floorM;
      var linesM = ftLines.filter(function (l) {
        return l.shiftId === s.id && l.sex !== "F";
      }).sort(function (a, b) { return String(a.id).localeCompare(String(b.id)); });

      var selectedM = linesM.slice(0, surplusM);

      // Best target underfull shift for M
      var targetShiftsM = underfullM.slice().sort(function (a, b) {
        var cA = countsM[a.id] || 0;
        var cB = countsM[b.id] || 0;
        if (cA !== cB) return cA - cB;
        var stA = shiftStartMins(S, a);
        var stB = shiftStartMins(S, b);
        if (stA !== stB) return stA - stB;
        return String(a.id).localeCompare(String(b.id));
      });
      if (!targetShiftsM.length) {
        targetShiftsM = shifts.filter(function (sh) { return sh.id !== s.id; }).sort(function (a, b) {
          return (countsM[a.id] || 0) - (countsM[b.id] || 0);
        });
      }
      var recommendedM = targetShiftsM[0] ? targetShiftsM[0].id : s.id;

      selectedM.forEach(function (l) {
        candidates.push({
          line: l,
          currentShift: s,
          recommendedShiftId: recommendedM,
          sex: "M"
        });
      });
    }

    var cF = countsF[s.id] || 0;
    if (cF > ceilF) {
      var surplusF = cF - floorF;
      var linesF = ftLines.filter(function (l) {
        return l.shiftId === s.id && l.sex === "F";
      }).sort(function (a, b) { return String(a.id).localeCompare(String(b.id)); });

      var selectedF = linesF.slice(0, surplusF);

      // Best target underfull shift for F
      var targetShiftsF = underfullF.slice().sort(function (a, b) {
        var cA = countsF[a.id] || 0;
        var cB = countsF[b.id] || 0;
        if (cA !== cB) return cA - cB;
        var stA = shiftStartMins(S, a);
        var stB = shiftStartMins(S, b);
        if (stA !== stB) return stA - stB;
        return String(a.id).localeCompare(String(b.id));
      });
      if (!targetShiftsF.length) {
        targetShiftsF = shifts.filter(function (sh) { return sh.id !== s.id; }).sort(function (a, b) {
          return (countsF[a.id] || 0) - (countsF[b.id] || 0);
        });
      }
      var recommendedF = targetShiftsF[0] ? targetShiftsF[0].id : s.id;

      selectedF.forEach(function (l) {
        candidates.push({
          line: l,
          currentShift: s,
          recommendedShiftId: recommendedF,
          sex: "F"
        });
      });
    }
  });

  return {
    candidates: candidates,
    shifts: shifts,
    isEven: candidates.length === 0
  };
}

export function approveFtRebalance(S, moves) {
  if (!S || !S.state) return false;
  S.state.issues = S.state.issues || [];

  if (!Array.isArray(moves) || moves.length === 0) {
    var msg0 = "No FT TSO lines checked to rebalance.";
    if (S.updateStatus) S.updateStatus(msg0);
    return false;
  }

  var shifts = S.state.shifts || [];
  var lines = S.state.lines || [];
  var ftLines = selectFtTsoLines(lines);

  // Before M and F counts
  var beforeM = {};
  var beforeF = {};
  shifts.forEach(function (s) {
    var name = s.name || s.id;
    beforeM[name] = 0;
    beforeF[name] = 0;
  });
  ftLines.forEach(function (l) {
    var s = shifts.find(function (sh) { return sh.id === l.shiftId; });
    var name = s ? (s.name || s.id) : (l.shiftName || l.shiftId);
    if (l.sex === "F") beforeF[name] = (beforeF[name] || 0) + 1;
    else beforeM[name] = (beforeM[name] || 0) + 1;
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

  // After M and F counts
  var updatedFtLines = selectFtTsoLines(lines);
  var afterM = {};
  var afterF = {};
  shifts.forEach(function (s) {
    var name = s.name || s.id;
    afterM[name] = 0;
    afterF[name] = 0;
  });
  updatedFtLines.forEach(function (l) {
    var s = shifts.find(function (sh) { return sh.id === l.shiftId; });
    var name = s ? (s.name || s.id) : (l.shiftName || l.shiftId);
    if (l.sex === "F") afterF[name] = (afterF[name] || 0) + 1;
    else afterM[name] = (afterM[name] || 0) + 1;
  });

  var shiftSummaries = [];
  shifts.forEach(function (s) {
    var name = s.name || s.id;
    var bM = beforeM[name] || 0;
    var aM = afterM[name] || 0;
    var bF = beforeF[name] || 0;
    var aF = afterF[name] || 0;
    if (bM !== 0 || aM !== 0 || bF !== 0 || aF !== 0) {
      shiftSummaries.push(name + ": M " + bM + "→" + aM + ", F " + bF + "→" + aF);
    }
  });

  var countsStr = shiftSummaries.join(" · ");
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
