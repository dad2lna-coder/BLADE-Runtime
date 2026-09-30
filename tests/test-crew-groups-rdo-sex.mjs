import test from 'node:test';
import assert from 'node:assert/strict';

import { getBandKey, buildLines, buildSupervisoryLines } from '../modules/setup-panel/utils/buildLines.js';

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
