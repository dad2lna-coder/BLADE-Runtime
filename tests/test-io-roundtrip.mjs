import assert from "node:assert";
import { test } from "node:test";
import fs from "node:fs";
import path from "node:path";

test("JSON export/import round-trip preserves opsFte, training fields, and line dayTimes", () => {
  const S = {};
  global.window = {
    Scheduler: S,
    dispatchEvent: () => {}
  };
  global.document = {
    createElement: () => ({ href: "", download: "", click: () => {} }),
    body: { appendChild: () => {}, removeChild: () => {} },
    getElementById: () => null
  };
  global.URL = { createObjectURL: () => "", revokeObjectURL: () => {} };
  global.CustomEvent = class CustomEvent {
    constructor(type, opts) {
      this.type = type;
      this.detail = opts ? opts.detail : null;
    }
  };

  const ioCode = fs.readFileSync(path.resolve("js/io.js"), "utf8");
  eval(ioCode);

  assert.ok(S.applyPayload, "Scheduler.applyPayload exists");

  S.state = {
    open: "03:30",
    close: "23:00",
    weekCount: 1,
    ftM: 5, ftF: 5,
    shifts: [{ id: "S1", name: "Day Shift", start: "06:00", end: "14:30" }],
    lines: [],
    schedule: {},
    mode: "initial"
  };

  S.safeNumber = (val, def) => (typeof val === "number" ? val : def);
  S.isValidTimeText = (t) => typeof t === "string" && t.length > 0;
  S.parseStartDate = () => new Date();

  const originalLines = [
    {
      id: "1",
      lineCode: "TSO 01",
      shiftId: "S1",
      empClass: "FT",
      opsFte: true,
      startTime: "06:00",
      endTime: "14:30",
      function: "PAX",
      dayTimes: { mon: { start: "07:00", end: "15:30" } }
    },
    {
      id: "2",
      lineCode: "ESTI 01",
      shiftId: "S1",
      empClass: "ESTI",
      isTraining: true,
      trainingClass: "ESTI",
      opsFte: false,
      function: "TRAINING"
    }
  ];

  const payload = {
    config: {
      open: "03:30",
      close: "23:00",
      weekCount: 1,
      shifts: S.state.shifts
    },
    results: {
      lines: originalLines,
      schedule: { "1": ["WORK", "WORK", "RDO"], "2": ["WORK", "WORK", "RDO"] },
      mode: "exported"
    }
  };

  S.applyPayload(payload);

  const importedLines = S.state.lines;
  assert.strictEqual(importedLines.length, 2, "2 lines imported");

  const line1 = importedLines.find(l => l.id === "1");
  assert.ok(line1, "Line 1 exists");
  assert.strictEqual(line1.opsFte, true, "Line 1 opsFte is true");
  assert.strictEqual(line1.function, "PAX", "Line 1 function is PAX");
  assert.strictEqual(line1.startTime, "06:00", "Line 1 startTime preserved");
  assert.strictEqual(line1.endTime, "14:30", "Line 1 endTime preserved");
  assert.deepStrictEqual(line1.dayTimes, { mon: { start: "07:00", end: "15:30" } }, "Line 1 dayTimes preserved");

  const line2 = importedLines.find(l => l.id === "2");
  assert.ok(line2, "Line 2 (ESTI) exists");
  assert.strictEqual(line2.opsFte, false, "Line 2 opsFte is false");
  assert.strictEqual(line2.isTraining, true, "Line 2 isTraining is true");
  assert.strictEqual(line2.trainingClass, "ESTI", "Line 2 trainingClass preserved");
  assert.strictEqual(line2.function, "TRAINING", "Line 2 function is TRAINING");
});
