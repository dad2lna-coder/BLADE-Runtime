/** Schedule Lock rules: protect matching lines' shift assignments across GENERATE / rebalances / swap. */

export function lineMatchesLockRule(S, line, rule) {
  if (!line || !rule) return false;

  if (rule.classKey && rule.classKey !== "ALL") {
    if (!S.getLinesForClass || S.getLinesForClass([line], rule.classKey).length === 0) {
      return false;
    }
  }

  if (rule.sex && rule.sex !== "ALL") {
    if ((line.sex || "").toUpperCase() !== rule.sex.toUpperCase()) return false;
  }

  if (rule.shiftId != null && rule.shiftId !== "") {
    if (String(line.shiftId) !== String(rule.shiftId)) return false;
  }

  return true;
}

export function isLineScheduleLocked(S, line) {
  if (!S || !S.state || !Array.isArray(S.state.scheduleLocks) || !S.state.scheduleLocks.length) {
    return false;
  }
  for (var i = 0; i < S.state.scheduleLocks.length; i++) {
    if (lineMatchesLockRule(S, line, S.state.scheduleLocks[i])) return true;
  }
  return false;
}

export function attachScheduleLocks(S) {
  if (!S) return;
  S.lineMatchesLockRule = function (line, rule) { return lineMatchesLockRule(S, line, rule); };
  S.isLineScheduleLocked = function (line) { return isLineScheduleLocked(S, line); };
}
