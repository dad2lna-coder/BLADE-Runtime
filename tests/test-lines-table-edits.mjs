import assert from "node:assert";
import { initLineHelpers } from "../modules/shared/lines/helpers.js";
import { initRowModel } from "../modules/lines-table/row-model.js";

const Scheduler = {
  state: {
    startDate: "2026-03-01",
    weekCount: 1,
    shifts: [
      { id: "S1", name: "AM Shift", start: "06:00", end: "14:30", paid: 8 },
      { id: "S2", name: "PM Shift", start: "14:00", end: "22:30", paid: 8 }
    ],
    lines: [
      { id: "101", lineCode: "L01", shiftId: "S1", empClass: "FT", isStso: true, sex: "M", function: "BAG" },
      { id: "102", lineCode: "L02", shiftId: "S2", empClass: "FT", isLtso: true, sex: "F", function: "PAX" },
      { id: "103", lineCode: "L03", shiftId: "S1", empClass: "PT", sex: "M", function: "DFO" }
    ],
    schedule: {
      "101": ["WORK", "WORK", "WORK", "WORK", "WORK", "RDO", "RDO"],
      "102": ["WORK", "WORK", "WORK", "WORK", "WORK", "RDO", "RDO"],
      "103": ["WORK", "WORK", "WORK", "RDO", "RDO", "RDO", "RDO"]
    },
    functionRotation: {
      "101": ["BAG", "BAG", "BAG", "BAG", "BAG", null, null],
      "102": ["PAX", "PAX", "PAX", "PAX", "PAX", null, null],
      "103": ["DFO", "DFO", "DFO", null, null, null, null]
    }
  },
  getShift(id) {
    return (Scheduler.state.shifts || []).find(s => s.id === id);
  },
  timeToMin(t) {
    if (!t) return 0;
    const parts = String(t).split(":").map(Number);
    return parts[0] * 60 + (parts[1] || 0);
  },
  isValidTimeText(t) {
    return /^([01]\d|2[0-3]):[0-5]\d$/.test(String(t || ""));
  }
};

initLineHelpers(Scheduler);
initRowModel(Scheduler);

console.log("Testing Lines Table Filtering & Sorting...");

// Test Search Filter
Scheduler.linesView.searchCode = "L02";
let filtered = Scheduler.filterLinesForView(Scheduler.state.lines);
assert.strictEqual(filtered.length, 1, "Should filter down to L02");
assert.strictEqual(filtered[0].lineCode, "L02");

Scheduler.linesView.searchCode = "";

// Test Duty Filter
Scheduler.linesView.filterDuty = "BAG";
filtered = Scheduler.filterLinesForView(Scheduler.state.lines);
assert.strictEqual(filtered.length, 1, "Should filter BAG duty line");
assert.strictEqual(filtered[0].lineCode, "L01");

Scheduler.linesView.filterDuty = "DFO";
filtered = Scheduler.filterLinesForView(Scheduler.state.lines);
assert.strictEqual(filtered.length, 1, "Should filter DFO duty line");
assert.strictEqual(filtered[0].lineCode, "L03");

Scheduler.linesView.filterDuty = "";

// Test Start Time Sorting
Scheduler.linesView.sortBy = "start";
Scheduler.linesView.sortDir = "asc";
let sorted = Scheduler.sortLinesForView(Scheduler.state.lines);
assert.strictEqual(sorted[0].shiftId, "S1");

// Test Shift Start Time Editing
const shiftS1 = Scheduler.getShift("S1");
assert.strictEqual(shiftS1.start, "06:00");
shiftS1.start = "05:30";
shiftS1.end = "14:00";

const rowModels = Scheduler.getLineRowModels();
const row1 = rowModels.find(r => r.id === "101");
assert.strictEqual(row1.start, "05:30", "Row model should reflect updated shift start time");
assert.strictEqual(row1.end, "14:00", "Row model should reflect updated shift end time");

console.log("ALL LINES TABLE EDIT & FILTER TESTS PASSED SUCCESSFULLY!");
