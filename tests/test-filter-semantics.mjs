import assert from "node:assert";
import { lineMatchesCoverageFilter, computeHourlyByDow } from "../modules/coverage/utils/hourly.js";
import { computeRoleMatrixByDow } from "../modules/reports/deviation.js";

// Dummy scheduler state
function createMockScheduler() {
  const S = {
    state: {
      open: "06:00",
      close: "18:00",
      startDate: "2026-09-28",
      weekCount: 1,
      lines: [
        { id: "L1", shiftId: "S1", sex: "M", function: "DFO", functionEligible: { dfo: true } }, // DFO person
        { id: "L2", shiftId: "S1", sex: "F", function: "TSO", functionEligible: { pax: true } },  // Regular person
        { id: "L3", shiftId: "S1", sex: "", role: "ESTI", isTraining: true, opsFte: false }     // Non-ops training line
      ],
      shifts: [
        { id: "S1", name: "AM", start: "06:00", end: "14:00" }
      ],
      schedule: {
        "L1": ["WORK", "WORK", "WORK", "WORK", "WORK", "RDO", "RDO"],
        "L2": ["WORK", "WORK", "WORK", "WORK", "WORK", "RDO", "RDO"],
        "L3": ["WORK", "WORK", "WORK", "WORK", "WORK", "RDO", "RDO"]
      },
      functionRotation: {
        "L1": ["BAG", "PAX", null, "DFO", "BAG", "RDO", "RDO"],
        "L2": ["BAG", "PAX", null, null, null, "RDO", "RDO"],
        "L3": [null, null, null, null, null, "RDO", "RDO"]
      }
    },
    coverageView: { stso: true, ltso: true, tso: true, funcView: "all" },
    lineInOpsCoverage(line) {
      if (!line) return false;
      if (line.isTraining || line.isExtra || line.extraPositionId) return !!line.opsFte;
      return true;
    },
    timeToMin(t) {
      const [h, m] = t.split(":").map(Number);
      return h * 60 + m;
    },
    getShift(id) {
      return S.state.shifts.find(s => s.id === id);
    },
    lineRoleKey(line) {
      if (line.isTraining || line.role === "ESTI") return "ESTI";
      return "TSO";
    },
    getRotationDuty(lineId, dayOff) {
      const rot = S.state.functionRotation[lineId];
      return rot ? rot[dayOff] : null;
    },
    coverageSlots() {
      return [360, 390, 420]; // 06:00, 06:30, 07:00
    }
  };
  return S;
}

console.log("Running Filter Semantics tests...");

const S = createMockScheduler();
const lineDfo = S.state.lines[0];
const lineReg = S.state.lines[1];
const lineTraining = S.state.lines[2];

// Test Non-Ops / Training Gate
S.coverageView.funcView = "all";
assert.strictEqual(lineMatchesCoverageFilter(S, lineTraining, 0), false, "Training / opsFte: false line is excluded from Coverage filter");

// Day 0: L1 is on BAG, L2 is on BAG
// DFO person on BAG day
S.coverageView.funcView = "dfo";
assert.strictEqual(lineMatchesCoverageFilter(S, lineDfo, 0), true, "DFO person on BAG day is in DFO mode");
assert.strictEqual(lineMatchesCoverageFilter(S, lineReg, 0), false, "Regular person on BAG day is NOT in DFO mode");

S.coverageView.funcView = "bag";
assert.strictEqual(lineMatchesCoverageFilter(S, lineDfo, 0), true, "DFO person on BAG day is in BAG mode");
assert.strictEqual(lineMatchesCoverageFilter(S, lineReg, 0), true, "Regular person on BAG day is in BAG mode");

S.coverageView.funcView = "pax";
assert.strictEqual(lineMatchesCoverageFilter(S, lineDfo, 0), false, "DFO person on BAG day is NOT in PAX mode");
assert.strictEqual(lineMatchesCoverageFilter(S, lineReg, 0), false, "Regular person on BAG day is NOT in PAX mode");

S.coverageView.funcView = "all";
assert.strictEqual(lineMatchesCoverageFilter(S, lineDfo, 0), true, "DFO person on BAG day is in ALL mode");
assert.strictEqual(lineMatchesCoverageFilter(S, lineReg, 0), true, "Regular person on BAG day is in ALL mode");

// Day 1: L1 is on PAX, L2 is on PAX
S.coverageView.funcView = "dfo";
assert.strictEqual(lineMatchesCoverageFilter(S, lineDfo, 1), true, "DFO person on PAX day is in DFO mode");
assert.strictEqual(lineMatchesCoverageFilter(S, lineReg, 1), false, "Regular person on PAX day is NOT in DFO mode");

S.coverageView.funcView = "bag";
assert.strictEqual(lineMatchesCoverageFilter(S, lineDfo, 1), false, "DFO person on PAX day is NOT in BAG mode");
assert.strictEqual(lineMatchesCoverageFilter(S, lineReg, 1), false, "Regular person on PAX day is NOT in BAG mode");

S.coverageView.funcView = "pax";
assert.strictEqual(lineMatchesCoverageFilter(S, lineDfo, 1), true, "DFO person on PAX day is in PAX mode");
assert.strictEqual(lineMatchesCoverageFilter(S, lineReg, 1), true, "Regular person on PAX day is in PAX mode");

// Test Reports computeRoleMatrixByDow
const totalRpt = computeRoleMatrixByDow(S, { mode: "total" });
const dfoRpt = computeRoleMatrixByDow(S, { mode: "dfoPool" });
const bagRpt = computeRoleMatrixByDow(S, { mode: "baggage" });
const paxRpt = computeRoleMatrixByDow(S, { mode: "passenger" });

// Day offset 0 (Sun): L1 and L2 both working on BAG. L3 (training) working but excluded.
// slot 0 (06:00), dow 0 (Sun):
assert.strictEqual(totalRpt.matrix[0][0].TSO.M + totalRpt.matrix[0][0].TSO.F, 2, "Total report counts both L1(M) and L2(F) and excludes training L3");
assert.strictEqual(dfoRpt.matrix[0][0].TSO.M, 1, "DFO report counts L1(M) on BAG day");
assert.strictEqual(dfoRpt.matrix[0][0].TSO.F, 0, "DFO report excludes L2(F)");
assert.strictEqual(bagRpt.matrix[0][0].TSO.M + bagRpt.matrix[0][0].TSO.F, 2, "BAG report counts both L1 and L2 on BAG day");
assert.strictEqual(paxRpt.matrix[0][0].TSO.M + paxRpt.matrix[0][0].TSO.F, 0, "PAX report excludes both L1 and L2 on BAG day");

// Day offset 1 (Mon): L1 and L2 both working on PAX
assert.strictEqual(paxRpt.matrix[0][1].TSO.M + paxRpt.matrix[0][1].TSO.F, 2, "PAX report counts both L1 and L2 on PAX day");

console.log("Filter Semantics tests PASSED successfully!");
