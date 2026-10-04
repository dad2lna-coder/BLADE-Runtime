/** RDO Parity (Fairness) Report and Swap Proposal Engine.
 *  Identifies sex imbalances across RDO patterns on shifts/bands and proposes
 *  swapping RDO patterns between lines of different sexes without changing shift or sex.
 */
import { getBandKey } from "./buildLines.js";
import { getBandLabel } from "../actions/generateModal.js";
import { formatRdos } from "./rebalanceDfo.js";

export function getParityLinesForClass(S, classKey) {
  var lines = (S && S.state && S.state.lines) || [];
  return lines.filter(function (l) {
    return S.belongsToClass ? S.belongsToClass(l, classKey) : false;
  });
}

export function rdoPatternKey(rdoDays) {
  if (!Array.isArray(rdoDays) || !rdoDays.length) return "none";
  return rdoDays.slice().map(Number).sort(function (a, b) { return a - b; }).join("-");
}

function isWeekendPattern(rdoDays) {
  if (!Array.isArray(rdoDays)) return false;
  return rdoDays.indexOf(0) >= 0 || rdoDays.indexOf(6) >= 0;
}

function getShiftLabel(S, shiftId) {
  var shifts = (S && S.state && S.state.shifts) || [];
  var sh = shifts.find(function (s) { return s.id === shiftId; });
  return sh ? (sh.name || sh.id) : shiftId;
}

export function checkParity(S, classKey, selectedBandKeys) {
  if (!S || !S.state) return { disparities: [], proposals: [], summary: "No Scheduler state" };

  if (classKey === "STSO") {
    return {
      disparities: [],
      proposals: [],
      summary: "STSO parity check not applicable under half-day RDO parity rules (LTSO & TSO only)."
    };
  }

  var lines = getParityLinesForClass(S, classKey);
  if (!lines.length) {
    return { disparities: [], proposals: [], summary: "No lines found for class " + classKey };
  }

  // Filter lines by selected bands
  var bandSet = new Set(Array.isArray(selectedBandKeys) && selectedBandKeys.length ? selectedBandKeys : []);
  var targetLines = lines.filter(function (l) {
    if (!l.shiftId) return false;
    if (l.isShortfall || l.function === "-") return false;
    var bk = getBandKey(S, l.shiftId);
    return bandSet.size === 0 || bandSet.has(bk);
  });

  if (!targetLines.length) {
    return { disparities: [], proposals: [], summary: "No active lines match the selected bands." };
  }

  // Find all unique weekend RDO patterns across this class (Midweek patterns are ignored in this pass)
  var patternMap = {};
  targetLines.forEach(function (l) {
    if (isWeekendPattern(l.rdoDays)) {
      var pk = rdoPatternKey(l.rdoDays);
      if (!patternMap[pk]) {
        patternMap[pk] = {
          patternKey: pk,
          rdoDays: (l.rdoDays || []).slice()
        };
      }
    }
  });

  var weekendPatterns = Object.keys(patternMap).map(function (k) { return patternMap[k]; });

  // Get active shifts in targetLines
  var shiftIds = [];
  var seenShifts = {};
  targetLines.forEach(function (l) {
    if (l.shiftId && !seenShifts[l.shiftId]) {
      seenShifts[l.shiftId] = true;
      shiftIds.push(l.shiftId);
    }
  });

  var proposals = [];
  var disparities = [];
  var shortfalls = [];
  var pairedLineIds = new Set();

  weekendPatterns.forEach(function (pat) {
    // Benchmark size = max male count or female count across all shifts for this pattern (at least 1)
    var targetCount = 0;
    shiftIds.forEach(function (shId) {
      var shLines = targetLines.filter(function (l) { return l.shiftId === shId; });
      var cM = shLines.filter(function (l) { return l.sex === "M" && rdoPatternKey(l.rdoDays) === pat.patternKey; }).length;
      var cF = shLines.filter(function (l) { return l.sex === "F" && rdoPatternKey(l.rdoDays) === pat.patternKey; }).length;
      if (cM > targetCount) targetCount = cM;
      if (cF > targetCount) targetCount = cF;
    });
    if (targetCount < 1) targetCount = 1;

    shiftIds.forEach(function (shId) {
      var shLines = targetLines.filter(function (l) {
        return l.shiftId === shId && !(S.isLineScheduleLocked && S.isLineScheduleLocked(l));
      });

      var patM = shLines.filter(function (l) { return l.sex === "M" && rdoPatternKey(l.rdoDays) === pat.patternKey; });
      var patF = shLines.filter(function (l) { return l.sex === "F" && rdoPatternKey(l.rdoDays) === pat.patternKey; });

      var cM = patM.length;
      var cF = patF.length;

      var shLabel = getShiftLabel(S, shId);
      var patLabel = formatRdos(pat.rdoDays);

      if (cM !== targetCount || cF !== targetCount || (cM > 0 && cF === 0) || (cF > 0 && cM === 0)) {
        disparities.push({
          shiftId: shId,
          patternKey: pat.patternKey,
          rdoDays: pat.rdoDays,
          countM: cM,
          countF: cF,
          targetCount: targetCount
        });

        var needM = targetCount - cM;
        var needF = targetCount - cF;

        var availM = shLines.filter(function (l) {
          return l.sex === "M" && rdoPatternKey(l.rdoDays) !== pat.patternKey && !pairedLineIds.has(l.id);
        });
        var availF = shLines.filter(function (l) {
          return l.sex === "F" && rdoPatternKey(l.rdoDays) !== pat.patternKey && !pairedLineIds.has(l.id);
        });

        while (needM > 0 || needF > 0) {
          if (needM > 0 && needF > 0) {
            var donorF = availF.shift();
            var donorM = availM.shift();
            if (donorF && donorM) {
              pairedLineIds.add(donorF.id);
              pairedLineIds.add(donorM.id);
              proposals.push({
                lineA: donorF,
                lineB: donorM,
                shiftId: shId,
                rdoA_before: donorF.rdoDays,
                rdoB_before: donorM.rdoDays,
                rdoA_after: pat.rdoDays,
                rdoB_after: pat.rdoDays,
                note: shLabel + " shift: Assign pattern " + patLabel + " to " + (donorF.lineCode || donorF.id) + " (F) & " + (donorM.lineCode || donorM.id) + " (M)"
              });
              needM--;
              needF--;
            } else {
              if (!donorM) shortfalls.push(shLabel + " shift short of " + needM + " Male line(s) on pattern " + patLabel);
              if (!donorF) shortfalls.push(shLabel + " shift short of " + needF + " Female line(s) on pattern " + patLabel);
              break;
            }
          } else if (needF > 0) {
            if (availF.length >= 2 && needF >= 2) {
              var dF1 = availF.shift();
              var dF2 = availF.shift();
              pairedLineIds.add(dF1.id);
              pairedLineIds.add(dF2.id);
              proposals.push({
                lineA: dF1,
                lineB: dF2,
                shiftId: shId,
                rdoA_before: dF1.rdoDays,
                rdoB_before: dF2.rdoDays,
                rdoA_after: pat.rdoDays,
                rdoB_after: pat.rdoDays,
                note: shLabel + " shift: Assign pattern " + patLabel + " to " + (dF1.lineCode || dF1.id) + " (F) & " + (dF2.lineCode || dF2.id) + " (F)"
              });
              needF -= 2;
            } else if (availF.length >= 1) {
              var dF = availF.shift();
              var patM_line = patM[0] || shLines.find(function (l) { return l.sex === "M" && rdoPatternKey(l.rdoDays) === pat.patternKey; });
              if (patM_line) {
                pairedLineIds.add(dF.id);
                proposals.push({
                  lineA: dF,
                  lineB: patM_line,
                  shiftId: shId,
                  rdoA_before: dF.rdoDays,
                  rdoB_before: patM_line.rdoDays,
                  rdoA_after: pat.rdoDays,
                  rdoB_after: pat.rdoDays,
                  note: shLabel + " shift: Assign pattern " + patLabel + " to " + (dF.lineCode || dF.id) + " (F)"
                });
                needF--;
              } else {
                shortfalls.push(shLabel + " shift short of " + needF + " Female line(s) on pattern " + patLabel);
                break;
              }
            } else {
              shortfalls.push(shLabel + " shift short of " + needF + " Female line(s) on pattern " + patLabel);
              break;
            }
          } else if (needM > 0) {
            if (availM.length >= 2 && needM >= 2) {
              var dM1 = availM.shift();
              var dM2 = availM.shift();
              pairedLineIds.add(dM1.id);
              pairedLineIds.add(dM2.id);
              proposals.push({
                lineA: dM1,
                lineB: dM2,
                shiftId: shId,
                rdoA_before: dM1.rdoDays,
                rdoB_before: dM2.rdoDays,
                rdoA_after: pat.rdoDays,
                rdoB_after: pat.rdoDays,
                note: shLabel + " shift: Assign pattern " + patLabel + " to " + (dM1.lineCode || dM1.id) + " (M) & " + (dM2.lineCode || dM2.id) + " (M)"
              });
              needM -= 2;
            } else if (availM.length >= 1) {
              var dM = availM.shift();
              var patF_line = patF[0] || shLines.find(function (l) { return l.sex === "F" && rdoPatternKey(l.rdoDays) === pat.patternKey; });
              if (patF_line) {
                pairedLineIds.add(dM.id);
                proposals.push({
                  lineA: dM,
                  lineB: patF_line,
                  shiftId: shId,
                  rdoA_before: dM.rdoDays,
                  rdoB_before: patF_line.rdoDays,
                  rdoA_after: pat.rdoDays,
                  rdoB_after: pat.rdoDays,
                  note: shLabel + " shift: Assign pattern " + patLabel + " to " + (dM.lineCode || dM.id) + " (M)"
                });
                needM--;
              } else {
                shortfalls.push(shLabel + " shift short of " + needM + " Male line(s) on pattern " + patLabel);
                break;
              }
            } else {
              shortfalls.push(shLabel + " shift short of " + needM + " Male line(s) on pattern " + patLabel);
              break;
            }
          }
        }
      }
    });
  });

  var summaryMsg = "";
  if (shortfalls.length > 0) {
    summaryMsg = "Class " + classKey + " parity shortfalls: " + shortfalls.join("; ");
  } else if (disparities.length > 0) {
    summaryMsg = "Class " + classKey + ": " + disparities.length + " pattern disparity/disparities found across shifts. Proposed swaps to achieve equal weekend RDO parity per shift.";
  } else {
    summaryMsg = "Class " + classKey + ": Patterns are balanced.";
  }

  return {
    disparities: disparities,
    shortfalls: shortfalls,
    proposals: proposals,
    summary: summaryMsg
  };
}

export function approveParitySwaps(S, swapPairs) {
  if (!S || !S.state || !Array.isArray(swapPairs) || !swapPairs.length) return false;

  var lines = S.state.lines || [];
  var days = (S.state.weekCount || 1) * 7;
  var count = 0;

  swapPairs.forEach(function (pair) {
    var lA = lines.find(function (l) { return String(l.id) === String(pair.lineAId); });
    var lB = lines.find(function (l) { return String(l.id) === String(pair.lineBId); });
    if (!lA || !lB) return;

    var newRdoA = pair.rdoA_after;
    var newRdoB = pair.rdoB_after;

    if (Array.isArray(newRdoA) && Array.isArray(newRdoB)) {
      lA.rdoDays = newRdoA.slice();
      lB.rdoDays = newRdoB.slice();

      if (S.buildScheduleForLine && S.state.schedule) {
        S.state.schedule[lA.id] = S.buildScheduleForLine(lA, days);
        S.state.schedule[lB.id] = S.buildScheduleForLine(lB, days);
      }

      // Rebuild functionRotation so duty days follow new work / RDO days
      if (S.state.functionRotation) {
        var rotA = [];
        var rotB = [];
        var schedA = S.state.schedule[lA.id] || [];
        var schedB = S.state.schedule[lB.id] || [];
        var dutyA = lA.function || "PAX";
        var dutyB = lB.function || "PAX";

        for (var d = 0; d < days; d++) {
          rotA[d] = schedA[d] === "WORK" ? dutyA : "OFF";
          rotB[d] = schedB[d] === "WORK" ? dutyB : "OFF";
        }
        S.state.functionRotation[lA.id] = rotA;
        S.state.functionRotation[lB.id] = rotB;
      }

      count++;
    }
  });

  if (count > 0) {
    if (S.updateStatus) S.updateStatus("Approved " + count + " RDO parity pattern swap(s).");
    if (S.renderAll) S.renderAll();
    if (S.__USE_SVELTE_LINES && typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("lines:request-render"));
    } else if (S.renderLines) S.renderLines();
    return true;
  }
  return false;
}

export function attachParityReport(S) {
  if (!S) return;
  S.checkParity = function (classKey, selectedBandKeys) { return checkParity(S, classKey, selectedBandKeys); };
  S.approveParitySwaps = function (swapPairs) { return approveParitySwaps(S, swapPairs); };
}
