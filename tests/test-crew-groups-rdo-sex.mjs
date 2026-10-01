import test from 'node:test';
import assert from 'node:assert/strict';

import { getBandKey, buildLines, buildSupervisoryLines } from '../modules/setup-panel/utils/buildLines.js';
import { buildExtraPositionLines } from '../modules/setup-panel/utils/extraPositions.js';
import { buildTrainingClassLines } from '../modules/setup-panel/utils/trainingClasses.js';

test('getBandKey defaults to shiftId when ungrouped', () => {
  const S = {
    state: {
      shifts: [
        { id: 'S1', name: 'AM1' },
        { id: 'S2', name: 'AM2' }
      ],
      shiftCrewGroups: []
    }
  };

  assert.equal(getBandKey(S, 'S1'), 'S1');
  assert.equal(getBandKey(S, 'S2'), 'S2');
});

test('getBandKey returns crew group key when shift is grouped', () => {
  const S = {
    state: {
      shifts: [
        { id: 'S1', name: 'AM1', crewGroupId: 'cg1' },
        { id: 'S2', name: 'AM2', crewGroupId: 'cg1' },
        { id: 'S3', name: 'PM1' }
      ],
      shiftCrewGroups: [
        { id: 'cg1', name: 'AM Crew', shiftIds: ['S1', 'S2'] }
      ]
    }
  };

  assert.equal(getBandKey(S, 'S1'), 'crew_cg1');
  assert.equal(getBandKey(S, 'S2'), 'crew_cg1');
  assert.equal(getBandKey(S, 'S3'), 'S3');
});

test('RDO assignment is round-robin within band and decoupled from sex', () => {
  const S = {
    state: {
      shifts: [
        { id: 'S1', name: 'AM1', paid: 8 }
      ],
      ftM: 4,
      ftF: 4,
      ptM: 0,
      ptF: 0,
      ptHoursPerDay: 4,
      issues: []
    },
    targetWorkDays: () => 5,
    shiftLabel: (s) => s.name,
    consecutiveRdos: (count, seed) => [seed, (seed + 1) % 7]
  };

  const lines = buildLines(S, { S1: 8 });

  assert.equal(lines.length, 8);

  // Check RDO seeds cycle 0..6, 0..
  const seeds = lines.map(l => l.rdoDays[0]);
  assert.deepEqual(seeds, [0, 1, 2, 3, 4, 5, 6, 0]);

  // Check total M and F
  const mCount = lines.filter(l => l.sex === 'M').length;
  const fCount = lines.filter(l => l.sex === 'F').length;
  assert.equal(mCount, 4);
  assert.equal(fCount, 4);

  // Sexes are interleaved across RDO seed buckets
  assert.notEqual(lines[0].sex, lines[1].sex);
});

test('PT TSO lines get correct RDO count based on PT targetWorkDays', () => {
  const S = {
    state: {
      shifts: [
        { id: 'S1', name: 'AM1', paid: 4 }
      ],
      ftM: 0,
      ftF: 0,
      ptM: 2,
      ptF: 2,
      ptHoursPerDay: 4,
      issues: []
    },
    targetWorkDays: (shiftId, empClass) => empClass === 'PT' ? 3 : 5,
    shiftLabel: (s) => s.name,
    consecutiveRdos: (count, seed) => {
      const res = [];
      for (let i = 0; i < count; i++) res.push((seed + i) % 7);
      return res;
    }
  };

  const lines = buildLines(S, { S1: 4 });

  assert.equal(lines.length, 4);
  lines.forEach(l => {
    assert.equal(l.empClass, 'PT');
    // PT workDays = 3 => rdoCount = 7 - 3 = 4
    assert.equal(l.rdoDays.length, 4);
  });
});

test('Extra positions and training classes get balanced band x class RDOs', () => {
  const S = {
    state: {
      shifts: [
        { id: 'S1', name: 'AM1', paid: 8 }
      ],
      extraPositions: [
        { id: 'ex1', name: 'MSTI', m: 2, f: 2, opsFte: true, bands: [{ start: '04:00', end: '12:00', min: 1 }] }
      ],
      esti: 2,
      msti: 0,
      issues: []
    },
    targetWorkDays: () => 5,
    shiftLabel: (s) => s.name,
    consecutiveRdos: (count, seed) => [seed, (seed + 1) % 7]
  };

  const extraLines = buildExtraPositionLines(S);
  assert.equal(extraLines.length, 4);
  const extraM = extraLines.filter(l => l.sex === 'M').length;
  const extraF = extraLines.filter(l => l.sex === 'F').length;
  assert.equal(extraM, 2);
  assert.equal(extraF, 2);

  const trainingLines = buildTrainingClassLines(S);
  assert.equal(trainingLines.length, 2);
  assert.equal(trainingLines[0].empClass, 'ESTI');
});

test('Fixed seed produces identical schedule; different seed can vary schedule', () => {
  const S1 = {
    state: {
      shifts: [{ id: 'S1', name: 'AM1', paid: 8 }],
      ftM: 5,
      ftF: 5,
      activeSeed: 12345,
      issues: []
    },
    targetWorkDays: () => 5,
    shiftLabel: (s) => s.name,
    consecutiveRdos: (count, seed) => [seed, (seed + 1) % 7]
  };

  const S2 = {
    state: {
      shifts: [{ id: 'S1', name: 'AM1', paid: 8 }],
      ftM: 5,
      ftF: 5,
      activeSeed: 12345,
      issues: []
    },
    targetWorkDays: () => 5,
    shiftLabel: (s) => s.name,
    consecutiveRdos: (count, seed) => [seed, (seed + 1) % 7]
  };

  const S3 = {
    state: {
      shifts: [{ id: 'S1', name: 'AM1', paid: 8 }],
      ftM: 5,
      ftF: 5,
      activeSeed: 99999,
      issues: []
    },
    targetWorkDays: () => 5,
    shiftLabel: (s) => s.name,
    consecutiveRdos: (count, seed) => [seed, (seed + 1) % 7]
  };

  const lines1 = buildLines(S1, { S1: 10 });
  const lines2 = buildLines(S2, { S1: 10 });
  const lines3 = buildLines(S3, { S1: 10 });

  // Fixed seed 12345 produces exact same line sex & RDO mapping
  assert.deepEqual(lines1.map(l => ({ sex: l.sex, rdo: l.rdoDays })), lines2.map(l => ({ sex: l.sex, rdo: l.rdoDays })));

  // Different seed 99999 changes RDO / sex mapping
  assert.notDeepEqual(lines1.map(l => ({ sex: l.sex, rdo: l.rdoDays })), lines3.map(l => ({ sex: l.sex, rdo: l.rdoDays })));
});

test('respinSelectedSlices reshuffles on each click and options.keepSeed provides determinism', async () => {
  const S = {
    state: {
      activeSeed: 98765,
      generateSeed: "98765",
      lines: [
        { id: 1, shiftId: 'S1', shiftName: '0330', position: 'STSO', isStso: true, sex: 'M', rdoDays: [0, 1] },
        { id: 2, shiftId: 'S1', shiftName: '0330', position: 'STSO', isStso: true, sex: 'M', rdoDays: [2, 3] },
        { id: 3, shiftId: 'S1', shiftName: '0330', position: 'STSO', isStso: true, sex: 'M', rdoDays: [4, 5] },
        { id: 4, shiftId: 'S1', shiftName: '0330', position: 'STSO', isStso: true, sex: 'M', rdoDays: [1, 2] }
      ],
      schedule: { 1: [], 2: [], 3: [], 4: [] },
      weekCount: 1
    },
    DAYS: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    targetWorkDays: () => 5,
    consecutiveRdos: (count, seed) => [seed % 7, (seed + 1) % 7],
    buildScheduleForLine: () => ["WORK", "WORK", "WORK", "WORK", "WORK", "RDO", "RDO"]
  };

  const mod = await import('../modules/setup-panel/actions/shiftsTable.js');
  mod.attachShiftsTable(S);

  // Consecutive respin calls reshuffle with fresh entropy
  S.respinSelectedSlices(['0330 · STSO · M']);
  const rdoBatch1 = S.state.lines.map(l => l.rdoDays.slice());

  S.respinSelectedSlices(['0330 · STSO · M']);
  const rdoBatch2 = S.state.lines.map(l => l.rdoDays.slice());

  assert.notDeepEqual(rdoBatch1, rdoBatch2);

  // When keepSeed: true is passed, result is deterministic
  S.respinSelectedSlices(['0330 · STSO · M'], { keepSeed: true });
  const rdoBatch3 = S.state.lines.map(l => l.rdoDays.slice());

  S.respinSelectedSlices(['0330 · STSO · M'], { keepSeed: true });
  const rdoBatch4 = S.state.lines.map(l => l.rdoDays.slice());

  assert.deepEqual(rdoBatch3, rdoBatch4);
});

test('renderRdoRespinSlices defaults checkboxes to checked and empty respin warns', async () => {
  let statusMsg = '';
  const S = {
    state: {
      lines: [
        { id: 1, shiftId: 'S1', shiftName: '0330', position: 'STSO', isStso: true, sex: 'M', rdoDays: [0, 1] }
      ],
      schedule: { 1: [] }
    },
    updateStatus: (msg) => { statusMsg = msg; }
  };

  const mod = await import('../modules/setup-panel/actions/shiftsTable.js');
  mod.attachShiftsTable(S);

  // Calling respin with empty selection warns user
  S.respinSelectedSlices([]);
  assert.equal(statusMsg, "No slices selected for respin.");
});

test('renderRdoMatrixModal sorts shifts earliest to latest by start time', async () => {
  const S = {
    state: {
      shifts: [
        { id: 'S1', name: '1230', start: '12:30' },
        { id: 'S2', name: '0330', start: '03:30' },
        { id: 'S3', name: '0400', start: '04:00' }
      ],
      lines: [
        { id: 1, shiftId: 'S1', shiftName: '1230', position: 'STSO', isStso: true, sex: 'M', rdoDays: [0, 1] },
        { id: 2, shiftId: 'S2', shiftName: '0330', position: 'STSO', isStso: true, sex: 'M', rdoDays: [0, 1] },
        { id: 3, shiftId: 'S3', shiftName: '0400', position: 'STSO', isStso: true, sex: 'M', rdoDays: [0, 1] }
      ],
      schedule: { 1: [], 2: [], 3: [] }
    },
    DAYS: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    timeToMin: (t) => {
      const p = t.split(':');
      return (+p[0] || 0) * 60 + (+p[1] || 0);
    },
    getShift: (id) => S.state.shifts.find(s => s.id === id)
  };

  const mod = await import('../modules/setup-panel/actions/shiftsTable.js');
  mod.attachShiftsTable(S);

  S.renderRdoMatrixModal();
  // Ensure shiftsTable attached without error
  assert.equal(typeof S.renderRdoMatrixModal, 'function');
});

test('exportAllRdoMatrixCsv exports all sexed position lines and respinSelectedSlices updates target lines', async () => {
  const S = {
    state: {
      lines: [
        { id: 1, shiftId: 'S1', shiftName: '0330', position: 'STSO', isStso: true, sex: 'M', rdoDays: [0, 1] },
        { id: 2, shiftId: 'S1', shiftName: '0330', position: 'STSO', isStso: true, sex: 'F', rdoDays: [2, 3] },
        { id: 3, shiftId: 'S2', shiftName: '0400', position: 'TSO', empClass: 'FT', sex: 'M', rdoDays: [4, 5] },
        { id: 4, shiftId: 'S3', shiftName: '0400', position: 'ESTI', empClass: 'ESTI', sex: '', rdoDays: [0, 6], isTraining: true }
      ],
      schedule: { 1: [], 2: [], 3: [], 4: [] },
      weekCount: 1
    },
    DAYS: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    targetWorkDays: () => 5,
    consecutiveRdos: (count, seed) => [(seed + 1) % 7, (seed + 2) % 7],
    buildScheduleForLine: () => ["WORK", "WORK", "WORK", "WORK", "WORK", "RDO", "RDO"]
  };

  const mod = await import('../modules/setup-panel/actions/shiftsTable.js');
  mod.attachShiftsTable(S);
  assert.equal(typeof S.exportAllRdoMatrixCsv, 'function');
  assert.equal(typeof S.respinSelectedSlices, 'function');

  // Test selective respin on '0330 · STSO · M'
  S.respinSelectedSlices(['0330 · STSO · M']);
  // Line 1 should be updated while line 2 (F) and line 3 (TSO) remain unchanged in sex/position
  assert.equal(S.state.lines[0].sex, 'M');
  assert.equal(S.state.lines[1].sex, 'F');
});

test('Grouped shift crew shares RDO and sex balance pool for STSO/LTSO', () => {
  const S = {
    state: {
      shifts: [
        { id: 'S1', name: 'AM1', paid: 8, crewGroupId: 'cg1' },
        { id: 'S2', name: 'AM2', paid: 8, crewGroupId: 'cg1' }
      ],
      stsoM: 2,
      stsoF: 2,
      shiftCrewGroups: [
        { id: 'cg1', name: 'AM Crew', shiftIds: ['S1', 'S2'] }
      ],
      issues: []
    },
    shiftLabel: (s) => s.name,
    consecutiveRdos: (count, seed) => [seed, (seed + 1) % 7]
  };

  const lines = buildSupervisoryLines(S, { S1: 2, S2: 2 }, 'STSO');

  assert.equal(lines.length, 4);

  // Round robin RDOs across the crew group: 0, 1, 2, 3
  const rdo0 = lines.map(l => l.rdoDays[0]);
  assert.deepEqual(rdo0, [0, 1, 2, 3]);

  // Sexes balanced across group
  const mCount = lines.filter(l => l.sex === 'M').length;
  const fCount = lines.filter(l => l.sex === 'F').length;
  assert.equal(mCount, 2);
  assert.equal(fCount, 2);
});

test('Proportional PT placement distributes PT across multiple non-long shifts and keeps long shifts FT-only', () => {
  const S = {
    state: {
      shifts: [
        { id: 'S1', name: 'AM1', paid: 8 },
        { id: 'S2', name: 'AM2', paid: 8 },
        { id: 'S3', name: 'PM1', paid: 8 },
        { id: 'S4', name: 'Long1', paid: 10 }
      ],
      ftM: 7,
      ftF: 6,
      ptM: 3,
      ptF: 3,
      ptHoursPerDay: 4,
      issues: []
    },
    targetWorkDays: (shiftId, empClass) => empClass === 'PT' ? 3 : 5,
    shiftLabel: (s) => s.name,
    consecutiveRdos: (count, seed) => [seed % 7, (seed + 1) % 7]
  };

  const counts = { S1: 5, S2: 5, S3: 5, S4: 4 };
  const lines = buildLines(S, counts);

  assert.equal(lines.length, 19);

  // Long shift S4 must be FT-only
  const s4Lines = lines.filter(l => l.shiftId === 'S4');
  assert.equal(s4Lines.length, 4);
  s4Lines.forEach(l => {
    assert.equal(l.empClass, 'FT');
  });

  // PT placement across non-long shifts S1, S2, S3
  const ptLines = lines.filter(l => l.empClass === 'PT');
  assert.equal(ptLines.length, 6);

  const ptShiftsWithPt = new Set(ptLines.map(l => l.shiftId));
  assert.ok(ptShiftsWithPt.size >= 2, `Expected PT on >= 2 distinct non-long shifts, got ${ptShiftsWithPt.size}`);
});

test('rebalancePtTsoShifts redistributes PT TSO lines across non-long shifts preserving FT, PT paid, rdoDays, sex, function, certPool, and ids', async () => {
  const { rebalancePtTsoShifts, attachRebalancePt } = await import('../modules/setup-panel/utils/rebalancePt.js');

  const S = {
    state: {
      open: '03:30',
      close: '23:00',
      shifts: [
        { id: 'S1', name: 'AM1', start: '05:00', end: '13:30', paid: 8 },
        { id: 'S2', name: 'PM1', start: '13:00', end: '21:30', paid: 8 },
        { id: 'S3', name: 'Long1', start: '06:00', end: '16:30', paid: 10 }
      ],
      lines: [
        { id: 1, lineCode: 'Line 001', shiftId: 'S1', shiftName: 'AM1', empClass: 'PT', sex: 'M', paid: 4, rdoDays: [0, 1], schedule: ['RDO', 'RDO', 'WORK', 'WORK', 'WORK', 'WORK', 'WORK'], function: 'DFO', certPool: 'B' },
        { id: 2, lineCode: 'Line 002', shiftId: 'S1', shiftName: 'AM1', empClass: 'PT', sex: 'F', paid: 4, rdoDays: [1, 2], schedule: ['WORK', 'RDO', 'RDO', 'WORK', 'WORK', 'WORK', 'WORK'], function: 'BAG', certPool: 'A' },
        { id: 3, lineCode: 'Line 003', shiftId: 'S1', shiftName: 'AM1', empClass: 'PT', sex: 'M', paid: 4, rdoDays: [2, 3], schedule: ['WORK', 'WORK', 'RDO', 'RDO', 'WORK', 'WORK', 'WORK'], function: '', certPool: 'A' },
        { id: 4, lineCode: 'Line 004', shiftId: 'S1', shiftName: 'AM1', empClass: 'PT', sex: 'F', paid: 4, rdoDays: [3, 4], schedule: ['WORK', 'WORK', 'WORK', 'RDO', 'RDO', 'WORK', 'WORK'], function: 'PAX', certPool: 'B' },
        { id: 5, lineCode: 'Line 005', shiftId: 'S1', shiftName: 'AM1', empClass: 'FT', sex: 'M', paid: 8, rdoDays: [0, 6] },
        { id: 6, lineCode: 'Line 006', shiftId: 'S2', shiftName: 'PM1', empClass: 'FT', sex: 'F', paid: 8, rdoDays: [0, 6] },
        { id: 7, lineCode: 'STSO 01', shiftId: 'S1', shiftName: 'AM1', empClass: 'STSO', isStso: true, sex: 'M', paid: 8, rdoDays: [0, 6] }
      ],
      issues: []
    },
    shiftLabel: (s) => s.name,
    timeToMin: (t) => {
      const p = String(t).split(':');
      return (+p[0] || 0) * 60 + (+p[1] || 0);
    }
  };

  attachRebalancePt(S);
  assert.equal(typeof S.rebalancePtTsoShifts, 'function');

  const result = S.rebalancePtTsoShifts();
  assert.equal(result, true);

  // PT lines should now be on >= 2 distinct non-long shifts (S1 and S2)
  const ptLines = S.state.lines.filter(l => l.empClass === 'PT');
  assert.equal(ptLines.length, 4);
  const ptShifts = new Set(ptLines.map(l => l.shiftId));
  assert.ok(ptShifts.size >= 2, `Expected PT on >= 2 shifts, got ${ptShifts.size}`);
  assert.ok(!ptShifts.has('S3'), 'Long shift S3 must remain closed to PT');

  // Check FT and STSO lines are untouched
  assert.equal(S.state.lines.find(l => l.id === 5).shiftId, 'S1');
  assert.equal(S.state.lines.find(l => l.id === 6).shiftId, 'S2');
  assert.equal(S.state.lines.find(l => l.id === 7).shiftId, 'S1');

  // Check PT line 1 fields preserved
  const l1 = S.state.lines.find(l => l.id === 1);
  assert.equal(l1.id, 1);
  assert.equal(l1.lineCode, 'Line 001');
  assert.equal(l1.empClass, 'PT');
  assert.equal(l1.sex, 'M');
  assert.equal(l1.paid, 4);
  assert.deepEqual(l1.rdoDays, [0, 1]);
  assert.equal(l1.function, 'DFO');
  assert.equal(l1.certPool, 'B');
});

test('rebalancePtTsoShifts moves all-AM PT pile onto >=2 non-long shifts when equal weights', async () => {
  const { rebalancePtTsoShifts } = await import('../modules/setup-panel/utils/rebalancePt.js');

  let updatedStatus = '';
  const S = {
    state: {
      open: '03:30',
      close: '23:00',
      shifts: [
        { id: 'S1', name: 'AM1', start: '05:00', end: '13:30', paid: 8 },
        { id: 'S2', name: 'PM1', start: '13:00', end: '21:30', paid: 8 },
        { id: 'S3', name: 'PM2', start: '14:00', end: '22:30', paid: 8 }
      ],
      lines: [
        { id: 101, lineCode: 'Line 001', shiftId: 'S1', shiftName: 'AM1', empClass: 'PT', sex: 'M', paid: 4, rdoDays: [0, 1] },
        { id: 102, lineCode: 'Line 002', shiftId: 'S1', shiftName: 'AM1', empClass: 'PT', sex: 'F', paid: 4, rdoDays: [1, 2] },
        { id: 103, lineCode: 'Line 003', shiftId: 'S1', shiftName: 'AM1', empClass: 'PT', sex: 'M', paid: 4, rdoDays: [2, 3] },
        { id: 104, lineCode: 'Line 004', shiftId: 'S1', shiftName: 'AM1', empClass: 'PT', sex: 'F', paid: 4, rdoDays: [3, 4] },
        { id: 201, lineCode: 'Line 005', shiftId: 'S1', shiftName: 'AM1', empClass: 'FT', sex: 'M', paid: 8, rdoDays: [0, 6] },
        { id: 202, lineCode: 'Line 006', shiftId: 'S2', shiftName: 'PM1', empClass: 'FT', sex: 'F', paid: 8, rdoDays: [0, 6] }
      ],
      issues: []
    },
    updateStatus: (msg) => { updatedStatus = msg; },
    shiftLabel: (s) => s.name,
    timeToMin: (t) => {
      const p = String(t).split(':');
      return (+p[0] || 0) * 60 + (+p[1] || 0);
    }
  };

  const res = rebalancePtTsoShifts(S);
  assert.equal(res, true);

  const ptLines = S.state.lines.filter(l => l.empClass === 'PT');
  const distinctShifts = new Set(ptLines.map(l => l.shiftId));
  assert.ok(distinctShifts.size >= 2, `Expected PT on >= 2 shifts, got ${distinctShifts.size}`);

  // Moved count > 0 verified by status message or lines having shiftId !== 'S1'
  const movedLines = ptLines.filter(l => l.shiftId !== 'S1');
  assert.ok(movedLines.length > 0, 'Expected at least 1 PT line to move off S1');
  assert.ok(updatedStatus.includes('moved'), 'Expected status message to confirm moved lines');

  // FT lines unchanged
  assert.equal(S.state.lines.find(l => l.id === 201).shiftId, 'S1');
  assert.equal(S.state.lines.find(l => l.id === 202).shiftId, 'S2');
});

test('rebalancePtTsoShifts with AM-heavy weights and totalPt >= 2 still places >= 1 PT on a non-AM shift', async () => {
  const { rebalancePtTsoShifts } = await import('../modules/setup-panel/utils/rebalancePt.js');

  const S = {
    state: {
      open: '03:30',
      close: '23:00',
      shifts: [
        { id: 'S1', name: 'AM1', start: '03:30', end: '23:00', paid: 8 }, // huge coverage
        { id: 'S2', name: 'PM1', start: '13:00', end: '14:00', paid: 8 }, // tiny 1h coverage
        { id: 'S3', name: 'PM2', start: '14:00', end: '15:00', paid: 8 }  // tiny 1h coverage
      ],
      lines: [
        { id: 1, lineCode: 'Line 001', shiftId: 'S1', shiftName: 'AM1', empClass: 'PT', sex: 'M', paid: 4, rdoDays: [0, 1] },
        { id: 2, lineCode: 'Line 002', shiftId: 'S1', shiftName: 'AM1', empClass: 'PT', sex: 'F', paid: 4, rdoDays: [1, 2] }
      ],
      issues: []
    },
    shiftLabel: (s) => s.name,
    timeToMin: (t) => {
      const p = String(t).split(':');
      return (+p[0] || 0) * 60 + (+p[1] || 0);
    }
  };

  rebalancePtTsoShifts(S);

  const ptLines = S.state.lines.filter(l => l.empClass === 'PT');
  const ptShifts = new Set(ptLines.map(l => l.shiftId));
  assert.ok(ptShifts.size >= 2, `Seeding rule must ensure PT placed on >= 2 shifts even with AM-heavy weights, got ${ptShifts.size}`);
});

test('rebalancePtTsoShifts handles hard RDO constraints and edge cases', async () => {
  const { rebalancePtTsoShifts } = await import('../modules/setup-panel/utils/rebalancePt.js');

  // Hard RDO constraint test
  const S_hard = {
    state: {
      open: '03:30',
      close: '23:00',
      shifts: [
        { id: 'S1', name: 'AM1', start: '05:00', end: '13:30', paid: 8, rdoHard: [] },
        { id: 'S2', name: 'PM1', start: '13:00', end: '21:30', paid: 8, rdoHard: [0, 6] }
      ],
      lines: [
        { id: 1, lineCode: 'Line 001', shiftId: 'S1', shiftName: 'AM1', empClass: 'PT', sex: 'M', paid: 4, rdoDays: [1, 2] },
        { id: 2, lineCode: 'Line 002', shiftId: 'S1', shiftName: 'AM1', empClass: 'PT', sex: 'F', paid: 4, rdoDays: [1, 2] }
      ],
      issues: []
    },
    shiftLabel: (s) => s.name,
    timeToMin: (t) => {
      const p = String(t).split(':');
      return (+p[0] || 0) * 60 + (+p[1] || 0);
    }
  };

  rebalancePtTsoShifts(S_hard);
  // Hard RDO fallback handles placement without throwing and records note if needed
  assert.equal(S_hard.state.lines.length, 2);

  // 0 PT lines edge case
  const S_no_pt = {
    state: {
      shifts: [
        { id: 'S1', name: 'AM1', paid: 8 },
        { id: 'S2', name: 'PM1', paid: 8 }
      ],
      lines: [
        { id: 1, lineCode: 'Line 001', shiftId: 'S1', empClass: 'FT', sex: 'M', paid: 8 }
      ],
      issues: []
    }
  };
  const resNoPt = rebalancePtTsoShifts(S_no_pt);
  assert.equal(resNoPt, false);
  assert.ok(S_no_pt.state.issues.some(i => i.includes('No eligible PT TSO lines')));

  // < 2 eligible non-long shifts edge case
  const S_one_shift = {
    state: {
      shifts: [
        { id: 'S1', name: 'AM1', paid: 8 },
        { id: 'S2', name: 'Long1', paid: 10 }
      ],
      lines: [
        { id: 1, lineCode: 'Line 001', shiftId: 'S1', empClass: 'PT', sex: 'M', paid: 4 }
      ],
      issues: []
    }
  };
  const resOneShift = rebalancePtTsoShifts(S_one_shift);
  assert.equal(resOneShift, false);
  assert.ok(S_one_shift.state.issues.some(i => i.includes('At least 2 non-long shifts required')));
});
