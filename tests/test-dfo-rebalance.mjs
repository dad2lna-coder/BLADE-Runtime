import test from 'node:test';
import assert from 'node:assert/strict';

import {
  isDfoEligibleLine,
  getDfoLinesForClass,
  getDfoBandMin,
  proposeDfoMoves,
  approveDfoRebalance,
  attachRebalanceDfo
} from '../modules/setup-panel/utils/rebalanceDfo.js';

test('isDfoEligibleLine correctly identifies DFO-eligible lines and excludes bag-block/extras/training', () => {
  // Eligible: function === "DFO"
  assert.equal(isDfoEligibleLine({ function: 'DFO' }), true);
  // Eligible: functionEligible.dfo === true
  assert.equal(isDfoEligibleLine({ functionEligible: { dfo: true } }), true);

  // Excluded: BAG block (functionEligible.bag === true) even if function === "DFO" or functionEligible.dfo === true
  assert.equal(isDfoEligibleLine({ function: 'DFO', functionEligible: { dfo: true, bag: true } }), false);

  // Excluded: PAX line without DFO tag
  assert.equal(isDfoEligibleLine({ function: 'PAX', functionEligible: { dfo: false, pax: true } }), false);

  // Excluded: Extra positions
  assert.equal(isDfoEligibleLine({ function: 'DFO', isExtra: true }), false);
  assert.equal(isDfoEligibleLine({ function: 'DFO', extraPositionId: 'ex1' }), false);

  // Excluded: Training classes
  assert.equal(isDfoEligibleLine({ function: 'DFO', isTraining: true }), false);
  assert.equal(isDfoEligibleLine({ function: 'DFO', empClass: 'ESTI' }), false);
  assert.equal(isDfoEligibleLine({ function: 'DFO', trainingClass: 'MSTI' }), false);
});

test('getDfoLinesForClass filters DFO lines by class key', () => {
  const lines = [
    { id: 1, function: 'DFO', empClass: 'FT', sex: 'M' },
    { id: 2, function: 'DFO', empClass: 'PT', isPt: true, sex: 'F' },
    { id: 3, function: 'DFO', empClass: 'STSO', isStso: true, sex: 'M' },
    { id: 4, function: 'DFO', empClass: 'LTSO', isLtso: true, sex: 'F' },
    { id: 5, function: 'DFO', empClass: 'FT', functionEligible: { bag: true }, sex: 'M' }, // Bag block
    { id: 6, function: 'PAX', empClass: 'FT', sex: 'F' } // Not DFO
  ];

  const tsoAll = getDfoLinesForClass(lines, 'TSO_ALL');
  assert.deepEqual(tsoAll.map(l => l.id), [1, 2]);

  const tsoFt = getDfoLinesForClass(lines, 'TSO_FT');
  assert.deepEqual(tsoFt.map(l => l.id), [1]);

  const tsoPt = getDfoLinesForClass(lines, 'TSO_PT');
  assert.deepEqual(tsoPt.map(l => l.id), [2]);

  const stso = getDfoLinesForClass(lines, 'STSO');
  assert.deepEqual(stso.map(l => l.id), [3]);

  const ltso = getDfoLinesForClass(lines, 'LTSO');
  assert.deepEqual(ltso.map(l => l.id), [4]);
});

test('getDfoBandMin returns requirement min or shift force or dash', () => {
  const S = {
    state: {
      functionCoverage: {
        requirements: {
          TSO: { S1: { min: 5, max: 10 } },
          STSO: { S1: { min: 1, max: 2 } }
        }
      }
    }
  };

  const s1 = { id: 'S1', name: '0330' };
  const s2 = { id: 'S2', name: '0400', force: 3 };

  assert.equal(getDfoBandMin(S, s1, 'TSO_ALL'), 5);
  assert.equal(getDfoBandMin(S, s1, 'STSO'), 1);
  assert.equal(getDfoBandMin(S, s2, 'TSO_ALL'), 3);
  assert.equal(getDfoBandMin(S, s2, 'LTSO'), '—');
});

test('proposeDfoMoves validates net delta and proposes moves among DFO-eligible lines', () => {
  const S = {
    state: {
      shifts: [
        { id: 'S1', name: 'AM' },
        { id: 'S2', name: 'PM' }
      ],
      lines: [
        { id: 'L1', lineCode: '001', shiftId: 'S1', function: 'DFO', empClass: 'FT', sex: 'M', rdoDays: [0, 6] },
        { id: 'L2', lineCode: '002', shiftId: 'S1', function: 'DFO', empClass: 'FT', sex: 'F', rdoDays: [0, 6] },
        { id: 'L3', lineCode: '003', shiftId: 'S1', function: 'DFO', empClass: 'FT', sex: 'M', rdoDays: [1, 2] },
        { id: 'L4', lineCode: '004', shiftId: 'S1', function: 'PAX', empClass: 'FT', sex: 'F', rdoDays: [3, 4] } // Non-DFO
      ]
    }
  };

  // Non-zero net delta returns error
  const badDeltas = { S1: -2, S2: +1 };
  const badRes = proposeDfoMoves(S, 'TSO_ALL', badDeltas);
  assert.notEqual(badRes.error, null);
  assert.ok(badRes.error.includes('sum to 0'));

  // Valid net delta: -2 on S1, +2 on S2
  const goodDeltas = { S1: -2, S2: +2 };
  const propRes = proposeDfoMoves(S, 'TSO_ALL', goodDeltas);
  assert.equal(propRes.error, null);
  assert.equal(propRes.proposals.length, 2);

  // All proposed lines must be DFO eligible (L1, L2, L3; NOT L4)
  propRes.proposals.forEach(p => {
    assert.equal(isDfoEligibleLine(p.line), true);
    assert.equal(p.fromShift.id, 'S1');
    assert.equal(p.toShift.id, 'S2');
  });
});

test('approveDfoRebalance updates shifts, schedules, and preserves DFO identity and line metadata', () => {
  let certPoolsCalled = false;
  let statusMsg = '';

  const S = {
    state: {
      weekCount: 1,
      shifts: [
        { id: 'S1', name: '0330', start: '03:30', end: '12:00' },
        { id: 'S2', name: '1345', start: '13:45', end: '22:15', rdoHard: [0, 6] }
      ],
      lines: [
        {
          id: 'L1',
          lineCode: 'Line 001',
          shiftId: 'S1',
          shiftName: '0330',
          empClass: 'FT',
          sex: 'F',
          paid: 8,
          rdoDays: [1, 2],
          function: 'DFO',
          functionEligible: { dfo: true, bag: false, pax: false },
          certPool: 'B',
          teamId: 'Team 1',
          team: '001'
        },
        {
          id: 'L2',
          lineCode: 'Line 002',
          shiftId: 'S1',
          shiftName: '0330',
          empClass: 'FT',
          sex: 'M',
          paid: 8,
          rdoDays: [0, 6],
          function: 'BAG',
          functionEligible: { dfo: false, bag: true, pax: false }, // Bag block
          certPool: 'A'
        }
      ],
      schedule: {}
    },
    updateStatus: (msg) => { statusMsg = msg; },
    assignCertPools: () => { certPoolsCalled = true; },
    buildScheduleForLine: (l, days) => Array(days).fill('WORK'),
    shiftLabel: (s) => s.name
  };

  attachRebalanceDfo(S);

  // Propose moving L1 from S1 to S2
  const deltas = { S1: -1, S2: 1 };
  const propRes = S.proposeDfoMoves('TSO_ALL', deltas);
  assert.equal(propRes.proposals.length, 1);

  const move = propRes.proposals[0];
  assert.equal(move.line.id, 'L1');

  // Approve move
  const ok = S.approveDfoRebalance([
    {
      lineId: move.line.id,
      targetShiftId: move.toShift.id,
      rdoAfter: move.rdoAfter
    }
  ]);

  assert.equal(ok, true);
  assert.equal(certPoolsCalled, true);
  assert.ok(statusMsg.includes('Rebalanced 1 DFO line(s)'));

  // Inspect moved line L1
  const l1 = S.state.lines.find(l => l.id === 'L1');
  assert.equal(l1.shiftId, 'S2');
  assert.equal(l1.shiftName, '1345');
  assert.equal(l1.function, 'DFO');
  assert.equal(l1.functionEligible.dfo, true);
  assert.equal(l1.functionEligible.bag, false);
  assert.equal(l1.certPool, 'B');
  assert.equal(l1.paid, 8);
  assert.equal(l1.sex, 'F');
  assert.equal(l1.teamId, 'Team 1');
  assert.deepEqual(l1.rdoDays, [0, 6]); // Updated for S2 hard RDOs [0, 6]

  // Inspect untouched line L2 (BAG block)
  const l2 = S.state.lines.find(l => l.id === 'L2');
  assert.equal(l2.shiftId, 'S1');
  assert.equal(l2.function, 'BAG');
});
