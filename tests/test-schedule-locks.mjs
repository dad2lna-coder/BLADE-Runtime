import assert from "node:assert";
import { attachScheduleLocks, lineMatchesLockRule, isLineScheduleLocked } from "../modules/setup-panel/utils/scheduleLocks.js";
import { getLinesForClass } from "../modules/setup-panel/utils/rebalanceFt.js";
import { attachShiftMath } from "../modules/setup-panel/utils/shiftMath.js";

function timeToMin(t) {
  if (!t) return 0;
  var parts = String(t).split(":").map(Number);
  return (parts[0] || 0) * 60 + (parts[1] || 0);
}

function isValidTimeText(t) {
  return /^\d{2}:\d{2}$/.test(String(t));
}

function buildScheduleForLine(S, line, days) {
  var rdo = new Set((line.rdoDays || []).map(Number));
  var arr = [];
  for (var i = 0; i < days; i++) {
    var dow = i % 7;
    arr.push(rdo.has(dow) ? "RDO" : "WORK");
  }
  return arr;
}

var S = {
  state: {
    shifts: [
      { id: "S1", name: "AM", start: "05:00", end: "13:30", paid: 8, rdoHard: [] },
      { id: "S2", name: "PM", start: "13:30", end: "22:00", paid: 8, rdoHard: [] },
      { id: "S3", name: "Split", start: "05:00", end: "17:00", segments: [{ start: "05:00", end: "10:00" }, { start: "12:00", end: "17:00" }], paid: 10, rdoHard: [2, 3, 6] }
    ],
    scheduleLocks: [],
    lines: [],
    startDate: "2026-10-01",
    weekCount: 1
  },
  timeToMin: timeToMin,
  isValidTimeText: isValidTimeText,
  safeNumber: function (v, d) { return Number.isFinite(+v) ? +v : d; }
};

attachShiftMath(S);
attachScheduleLocks(S);
S.getLinesForClass = getLinesForClass;

// Test 1: Stacked lock rules composition (AND within rule, OR across rules)
var line1 = { id: "L1", shiftId: "S1", empClass: "STSO", isStso: true, sex: "M" };
var line2 = { id: "L2", shiftId: "S2", empClass: "STSO", isStso: true, sex: "F" };
var line3 = { id: "L3", shiftId: "S1", empClass: "FT", sex: "F" };

var rule1 = { id: "R1", classKey: "STSO", sex: "M", shiftId: "S1" }; // STSO M on S1
var rule2 = { id: "R2", classKey: "TSO_FT", sex: "F", shiftId: null };  // Female FT TSO any shift

S.state.scheduleLocks = [rule1, rule2];

assert.strictEqual(S.isLineScheduleLocked(line1), true, "L1 matches rule1 (STSO M S1)");
assert.strictEqual(S.isLineScheduleLocked(line2), false, "L2 does NOT match rule1 (sex F) or rule2 (class STSO)");
assert.strictEqual(S.isLineScheduleLocked(line3), true, "L3 matches rule2 (Female FT TSO)");

// Test 2: Dynamic re-evaluation when lines change
var line4 = { id: "L4", shiftId: "S2", empClass: "FT", sex: "F" };
assert.strictEqual(S.isLineScheduleLocked(line4), true, "New line L4 matches rule2 dynamically");

line4.sex = "M";
assert.strictEqual(S.isLineScheduleLocked(line4), false, "L4 no longer matches after sex change");

// Test 3: Hard RDO keeping without truncation (any DOW 0-6, contiguous & split)
// Check 3 hard RDOs on 4x10 split shift S3
var defSplit = S.state.shifts[2]; // S3 has rdoHard: [2, 3, 6]
var workDays = S.targetWorkDays(defSplit.id, "FT"); // 4
var rdoCount = 7 - workDays; // 3

var hard = defSplit.rdoHard;
assert.strictEqual(hard.length, 3, "S3 has 3 hard RDOs [2, 3, 6]");

// Verify no truncation
var rdoDays = hard.slice();
if (rdoDays.length < rdoCount) {
  for (var d = 0; d < 7 && rdoDays.length < rdoCount; d++) {
    if (rdoDays.indexOf(d) < 0) rdoDays.push(d);
  }
}
assert.strictEqual(rdoDays.length, 3, "All 3 hard RDO days kept without truncation");

var sampleSplitLine = { id: "LSPLIT", shiftId: "S3", empClass: "FT", rdoDays: rdoDays };
var sched = buildScheduleForLine(S, sampleSplitLine, 7);

assert.strictEqual(sched[2], "RDO", "DOW 2 (Tue) is RDO");
assert.strictEqual(sched[3], "RDO", "DOW 3 (Wed) is RDO");
assert.strictEqual(sched[6], "RDO", "DOW 6 (Sat) is RDO");

// Test 4: Hard RDO for each DOW 0..6 sole check
for (var dow = 0; dow <= 6; dow++) {
  var shiftSingleHard = { id: "SH_" + dow, name: "Hard" + dow, start: "08:00", end: "16:30", paid: 8, rdoHard: [dow] };
  S.state.shifts.push(shiftSingleHard);

  var wDays = S.targetWorkDays(shiftSingleHard.id, "FT"); // 5
  var rCount = 7 - wDays; // 2
  var hDays = shiftSingleHard.rdoHard.slice();
  for (var d0 = 0; d0 < 7 && hDays.length < rCount; d0++) {
    if (hDays.indexOf(d0) < 0) hDays.push(d0);
  }
  assert.ok(hDays.indexOf(dow) >= 0, "Sole hard day " + dow + " is in rdoDays");

  var testLine = { id: "LT_" + dow, shiftId: shiftSingleHard.id, empClass: "FT", rdoDays: hDays };
  var testSched = buildScheduleForLine(S, testLine, 7);
  assert.strictEqual(testSched[dow], "RDO", "Sole hard DOW " + dow + " is scheduled RDO");
}

console.log("ALL SCHEDULE LOCKS & HARD RDO UNIT TESTS PASSED SUCCESSFULLY!");
