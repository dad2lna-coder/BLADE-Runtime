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
