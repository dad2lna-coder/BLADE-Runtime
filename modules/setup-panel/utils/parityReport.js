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

function getShiftHalf(S, shiftId) {
  var shifts = (S && S.state && S.state.shifts) || [];
  var sh = shifts.find(function (s) { return s.id === shiftId; });
  if (!sh || !sh.start) return "AM";
  var startMin = S.timeToMin ? S.timeToMin(sh.start) : 210;
  // Strictly by start time: before 11:00 (660 min) is AM half, 11:00 and later is PM half
  return startMin < 660 ? "AM" : "PM";
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

  // Find all unique RDO patterns across this class
  var patternMap = {};
  targetLines.forEach(function (l) {
    var pk = rdoPatternKey(l.rdoDays);
    if (!patternMap[pk]) {
      patternMap[pk] = {
        patternKey: pk,
        rdoDays: (l.rdoDays || []).slice(),
        isWeekend: isWeekendPattern(l.rdoDays),
        countM: 0,
        countF: 0
      };
    }
    if (l.sex === "M") patternMap[pk].countM++;
    else if (l.sex === "F") patternMap[pk].countF++;
  });

  var allPatterns = Object.keys(patternMap).map(function (k) { return patternMap[k]; });

  // Separate patterns: weekend patterns first, then midweek-only; higher total imbalance first
  allPatterns.sort(function (a, b) {
    if (a.isWeekend && !b.isWeekend) return -1;
    if (!a.isWeekend && b.isWeekend) return 1;
    var devA = Math.abs(a.countM - a.countF);
    var devB = Math.abs(b.countM - b.countF);
    if (devA !== devB) return devB - devA;
    return a.patternKey.localeCompare(b.patternKey);
  });

  var proposals = [];
  var disparities = [];
  var shortfalls = [];
  var pairedLineIds = new Set();

  // Evaluate each pattern across AM and PM halves
  var halves = ["AM", "PM"];

  allPatterns.forEach(function (pat) {
    halves.forEach(function (half) {
      var halfLines = targetLines.filter(function (l) {
        return getShiftHalf(S, l.shiftId) === half && !(S.isLineScheduleLocked && S.isLineScheduleLocked(l));
      });

      var patLines = halfLines.filter(function (l) { return rdoPatternKey(l.rdoDays) === pat.patternKey; });
      var mPat = patLines.filter(function (l) { return l.sex === "M"; });
      var fPat = patLines.filter(function (l) { return l.sex === "F"; });

      var countM = mPat.length;
      var countF = fPat.length;

      var halfLabel = half === "AM" ? "Morning half (<11:00)" : "Afternoon half (>=11:00)";
      var patLabel = formatRdos(pat.rdoDays);

      if (countM >= 1 && countF >= 1) {
        return;
      }

      disparities.push({
        half: half,
        patternKey: pat.patternKey,
        rdoDays: pat.rdoDays,
        countM: countM,
        countF: countF
      });

      if (countM === 0 && countF === 0) {
        // Empty half for this pattern: need both 1 Male and 1 Female assigned to pat.rdoDays
        var donorF0 = halfLines.find(function (l) {
          return l.sex === "F" && rdoPatternKey(l.rdoDays) !== pat.patternKey && !pairedLineIds.has(l.id);
        });
        var donorM0 = halfLines.find(function (l) {
          return l.sex === "M" && rdoPatternKey(l.rdoDays) !== pat.patternKey && !pairedLineIds.has(l.id);
        });

        if (donorF0 && donorM0) {
          pairedLineIds.add(donorF0.id);
          pairedLineIds.add(donorM0.id);
          proposals.push({
            lineA: donorF0,
            lineB: donorM0,
            half: half,
            rdoA_before: donorF0.rdoDays,
            rdoB_before: donorM0.rdoDays,
            rdoA_after: pat.rdoDays,
            rdoB_after: pat.rdoDays,
            note: half + " half: Assign pattern " + patLabel + " to " + (donorF0.lineCode || donorF0.id) + " (F) & " + (donorM0.lineCode || donorM0.id) + " (M)"
          });
        } else {
          if (!donorM0) shortfalls.push(halfLabel + " short of 1 Male on pattern " + patLabel);
          if (!donorF0) shortfalls.push(halfLabel + " short of 1 Female on pattern " + patLabel);
        }
      } else if (countM === 0) {
        // Has female(s) on pat, missing male
        var donorM = halfLines.find(function (l) {
          return l.sex === "M" && rdoPatternKey(l.rdoDays) !== pat.patternKey && !pairedLineIds.has(l.id);
        });
        var donorF = fPat.length > 1 ? fPat.find(function (l) { return !pairedLineIds.has(l.id); }) : null;
        if (!donorF) {
          donorF = halfLines.find(function (l) {
            return l.sex === "F" && !pairedLineIds.has(l.id);
          });
        }

        if (donorM && donorF) {
          pairedLineIds.add(donorM.id);
          pairedLineIds.add(donorF.id);
          var rdoA_after = pat.rdoDays;
          var rdoB_after = (fPat.length > 1 && rdoPatternKey(donorF.rdoDays) === pat.patternKey) ? donorM.rdoDays : pat.rdoDays;
          proposals.push({
            lineA: donorF,
            lineB: donorM,
            half: half,
            rdoA_before: donorF.rdoDays,
            rdoB_before: donorM.rdoDays,
            rdoA_after: rdoA_after,
            rdoB_after: rdoB_after,
            note: half + " half: Assign pattern " + patLabel + " to " + (donorM.lineCode || donorM.id) + " (M) & " + (donorF.lineCode || donorF.id) + " (F)"
          });
        } else {
          shortfalls.push(halfLabel + " short of 1 Male on pattern " + patLabel);
        }
      } else if (countF === 0) {
        // Has male(s) on pat, missing female
        var donorF2 = halfLines.find(function (l) {
          return l.sex === "F" && rdoPatternKey(l.rdoDays) !== pat.patternKey && !pairedLineIds.has(l.id);
        });
        var donorM2 = mPat.length > 1 ? mPat.find(function (l) { return !pairedLineIds.has(l.id); }) : null;
        if (!donorM2) {
          donorM2 = halfLines.find(function (l) {
            return l.sex === "M" && !pairedLineIds.has(l.id);
          });
        }

        if (donorF2 && donorM2) {
          pairedLineIds.add(donorF2.id);
          pairedLineIds.add(donorM2.id);
          var rdoA_after2 = pat.rdoDays;
          var rdoB_after2 = (mPat.length > 1 && rdoPatternKey(donorM2.rdoDays) === pat.patternKey) ? donorF2.rdoDays : pat.rdoDays;
          proposals.push({
            lineA: donorF2,
            lineB: donorM2,
            half: half,
            rdoA_before: donorF2.rdoDays,
            rdoB_before: donorM2.rdoDays,
            rdoA_after: rdoA_after2,
            rdoB_after: rdoB_after2,
            note: half + " half: Assign pattern " + patLabel + " to " + (donorF2.lineCode || donorF2.id) + " (F) & " + (donorM2.lineCode || donorM2.id) + " (M)"
          });
        } else {
          shortfalls.push(halfLabel + " short of 1 Female on pattern " + patLabel);
        }
      }
    });
  });

  var summaryMsg = "";
  if (shortfalls.length > 0) {
    summaryMsg = "Class " + classKey + " parity shortfalls: " + shortfalls.join("; ");
  } else if (disparities.length > 0) {
    summaryMsg = "Class " + classKey + ": " + disparities.length + " pattern disparity/disparities found across halves. Proposed swaps to achieve 1M & 1F per pattern in each half.";
  } else {
    summaryMsg = "Class " + classKey + ": Patterns are balanced (1M & 1F per pattern in each half).";
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
