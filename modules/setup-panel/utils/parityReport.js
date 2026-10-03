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

export function checkParity(S, classKey, selectedBandKeys) {
  if (!S || !S.state) return { disparities: [], proposals: [], summary: "No Scheduler state" };

  var lines = getParityLinesForClass(S, classKey);
  if (!lines.length) {
    return { disparities: [], proposals: [], summary: "No lines found for class " + classKey };
  }

  // Filter lines by selected bands
  var bandSet = new Set(Array.isArray(selectedBandKeys) && selectedBandKeys.length ? selectedBandKeys : []);
  var targetLines = lines.filter(function (l) {
    if (!l.shiftId) return false;
    var bk = getBandKey(S, l.shiftId);
    return bandSet.size === 0 || bandSet.has(bk);
  });

  if (!targetLines.length) {
    return { disparities: [], proposals: [], summary: "No lines match the selected bands." };
  }

  var totalM = targetLines.filter(function (l) { return l.sex === "M"; }).length;
  var totalF = targetLines.filter(function (l) { return l.sex === "F"; }).length;
  var totalCount = totalM + totalF;
  var classFShare = totalCount > 0 ? totalF / totalCount : 0.5;

  // Group lines by shiftId and patternKey
  var byShiftAndPattern = {};
  targetLines.forEach(function (l) {
    var sId = l.shiftId || "default";
    var pk = rdoPatternKey(l.rdoDays);
    var key = sId + "|" + pk;
    if (!byShiftAndPattern[key]) {
      byShiftAndPattern[key] = { shiftId: sId, patternKey: pk, rdoDays: l.rdoDays || [], M: [], F: [] };
    }
    if (l.sex === "F") byShiftAndPattern[key].F.push(l);
    else if (l.sex === "M") byShiftAndPattern[key].M.push(l);
  });

  // Identify disparities where one sex holds an RDO pattern exclusively or disproportionately
  var disparities = [];
  Object.keys(byShiftAndPattern).forEach(function (key) {
    var group = byShiftAndPattern[key];
    var countM = group.M.length;
    var countF = group.F.length;
    var countTot = countM + countF;
    if (countTot < 1) return;

    var fShare = countTot > 0 ? countF / countTot : 0;
    var diff = Math.abs(fShare - classFShare);

    // Disparity if 100% single sex with >= 1 line or large share deviation (> 0.25)
    if ((countM > 0 && countF === 0 && totalF > 0) || (countF > 0 && countM === 0 && totalM > 0) || (countTot >= 2 && diff > 0.25)) {
      disparities.push({
        shiftId: group.shiftId,
        patternKey: group.patternKey,
        rdoDays: group.rdoDays,
        countM: countM,
        countF: countF,
        total: countTot,
        fShare: fShare,
        classFShare: classFShare
      });
    }
  });

  // Propose RDO pattern swaps between lines of different sexes on the same shift / band
  var proposals = [];
  var shifts = S.state.shifts || [];

  shifts.forEach(function (sh) {
    var shiftLines = targetLines.filter(function (l) {
      return l.shiftId === sh.id && !(S.isLineScheduleLocked && S.isLineScheduleLocked(l));
    });

    var fLines = shiftLines.filter(function (l) { return l.sex === "F"; });
    var mLines = shiftLines.filter(function (l) { return l.sex === "M"; });

    if (!fLines.length || !mLines.length) return;

    // Check if swap would balance pattern shares
    fLines.forEach(function (fLine) {
      var fPk = rdoPatternKey(fLine.rdoDays);
      mLines.forEach(function (mLine) {
        var mPk = rdoPatternKey(mLine.rdoDays);
        if (fPk === mPk) return; // Same pattern, swap wouldn't change anything

        // Check if fLine's pattern is over-represented by F or mLine's pattern is over-represented by M
        var fGroup = byShiftAndPattern[sh.id + "|" + fPk] || { M: [], F: [] };
        var mGroup = byShiftAndPattern[sh.id + "|" + mPk] || { M: [], F: [] };

        var fGroupFShare = (fGroup.M.length + fGroup.F.length) > 0 ? fGroup.F.length / (fGroup.M.length + fGroup.F.length) : 0;
        var mGroupMShare = (mGroup.M.length + mGroup.F.length) > 0 ? mGroup.M.length / (mGroup.M.length + mGroup.F.length) : 0;

        if (fGroupFShare > classFShare || mGroupMShare > (1 - classFShare)) {
          // Avoid duplicate pairs
          var alreadyPaired = proposals.some(function (p) {
            return p.lineA.id === fLine.id || p.lineB.id === mLine.id || p.lineA.id === mLine.id || p.lineB.id === fLine.id;
          });

          if (!alreadyPaired) {
            proposals.push({
              lineA: fLine,
              lineB: mLine,
              shift: sh,
              rdoA_before: fLine.rdoDays,
              rdoB_before: mLine.rdoDays,
              rdoA_after: mLine.rdoDays,
              rdoB_after: fLine.rdoDays,
              note: "Swap RDO patterns " + formatRdos(fLine.rdoDays) + " ↔ " + formatRdos(mLine.rdoDays)
            });
          }
        }
      });
    });
  });

  var summaryMsg = "Class " + classKey + " (" + totalM + "M / " + totalF + "F, F% = " + Math.round(classFShare * 100) + "%): " +
    (disparities.length ? disparities.length + " pattern disparity/disparities found." : "RDO patterns are balanced across sexes.");

  return {
    disparities: disparities,
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
