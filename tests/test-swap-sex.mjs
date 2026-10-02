import test from 'node:test';
import assert from 'node:assert/strict';

import {
  getLinesForSwapClass,
  proposeSexSwaps,
  approveSexSwaps,
  attachSwapSex
} from '../modules/setup-panel/utils/swapSex.js';

test('proposeSexSwaps requires at least 2 selected shifts and greedily pairs M and F lines', () => {
  const S = {
    state: {
      shifts: [
        { id: 'S1', name: '0330' },
        { id: 'S2', name: '1345' }
      ],
      lines: [
        // S1 has 2 M and 0 F (M-heavy)
        { id: 'L1', lineCode: '001', shiftId: 'S1', empClass: 'FT', sex: 'M', rdoDays: [0, 6] },
        { id: 'L2', lineCode: '002', shiftId: 'S1', empClass: 'FT', sex: 'M', rdoDays: [0, 6] },
        // S2 has 0 M and 2 F (F-heavy)
        { id: 'L3', lineCode: '003', shiftId: 'S2', empClass: 'FT', sex: 'F', rdoDays: [0, 6] },
        { id: 'L4', lineCode: '004', shiftId: 'S2', empClass: 'FT', sex: 'F', rdoDays: [0, 6] }
      ]
    }
  };

  // Less than 2 shifts selected returns error
  const res1 = proposeSexSwaps(S, 'TSO_ALL', ['S1']);
  assert.notEqual(res1.error, null);
  assert.ok(res1.error.includes('at least 2 shifts'));

  // 2 shifts selected proposes M<->F swap pairs
  const res2 = proposeSexSwaps(S, 'TSO_ALL', ['S1', 'S2']);
  assert.equal(res2.error, null);
  assert.equal(res2.proposals.length, 2, 'Should propose 2 M<->F swap pairs');

  const pair0 = res2.proposals[0];
  assert.equal(pair0.lineM.sex, 'M');
  assert.equal(pair0.lineF.sex, 'F');
  assert.equal(pair0.shiftA.id, 'S1');
  assert.equal(pair0.shiftB.id, 'S2');
});

test('approveSexSwaps exchanges seats between M and F lines without changing line sexes or metadata', () => {
  let certPoolsCalled = false;
  let statusMsg = '';

  const S = {
    state: {
      weekCount: 1,
      shifts: [
        { id: 'S1', name: '0330', start: '03:30', end: '12:00' },
        { id: 'S2', name: '1345', start: '13:45', end: '22:15', rdoHard: [1, 2] }
      ],
      lines: [
        {
          id: 'L1',
          lineCode: 'Line 001',
          shiftId: 'S1',
          shiftName: '0330',
          empClass: 'FT',
          sex: 'M',
          paid: 8,
          rdoDays: [0, 6],
          certPool: 'B',
          teamId: 'Team 1',
          function: 'DFO',
          functionEligible: { dfo: true }
        },
        {
          id: 'L2',
          lineCode: 'Line 002',
          shiftId: 'S2',
          shiftName: '1345',
          empClass: 'FT',
          sex: 'F',
          paid: 8,
          rdoDays: [0, 6],
          certPool: 'A',
          teamId: 'Team 2',
          function: 'BAG',
          functionEligible: { bag: true }
        }
      ],
      schedule: {}
    },
    updateStatus: (msg) => { statusMsg = msg; },
    assignCertPools: () => { certPoolsCalled = true; },
    buildScheduleForLine: (l, days) => Array(days).fill('WORK'),
    shiftLabel: (s) => s.name
  };

  attachSwapSex(S);

  const propRes = S.proposeSexSwaps('TSO_ALL', ['S1', 'S2']);
  assert.equal(propRes.proposals.length, 1);

  const pair = propRes.proposals[0];
  const ok = S.approveSexSwaps([
    {
      lineMId: pair.lineM.id,
      lineFId: pair.lineF.id,
      shiftAId: pair.shiftA.id,
      shiftBId: pair.shiftB.id,
      rdoMAfter: pair.rdoMAfter,
      rdoFAfter: pair.rdoFAfter
    }
  ]);

  assert.equal(ok, true);
  assert.equal(certPoolsCalled, true);
  assert.ok(statusMsg.includes('Swapped 1 M<->F pair(s)'));

  // Inspect L1 (M line): moved to S2, sex remains 'M', paid/certPool/function preserved
  const l1 = S.state.lines.find(l => l.id === 'L1');
  assert.equal(l1.shiftId, 'S2');
  assert.equal(l1.shiftName, '1345');
  assert.equal(l1.sex, 'M', 'Male line sex MUST remain M');
  assert.equal(l1.certPool, 'B');
  assert.equal(l1.function, 'DFO');
  assert.equal(l1.teamId, 'Team 1');
  assert.deepEqual(l1.rdoDays, [1, 2]); // Updated for S2 hard RDOs

  // Inspect L2 (F line): moved to S1, sex remains 'F', paid/certPool/function preserved
  const l2 = S.state.lines.find(l => l.id === 'L2');
  assert.equal(l2.shiftId, 'S1');
  assert.equal(l2.shiftName, '0330');
  assert.equal(l2.sex, 'F', 'Female line sex MUST remain F');
  assert.equal(l2.certPool, 'A');
  assert.equal(l2.function, 'BAG');
  assert.equal(l2.teamId, 'Team 2');
  assert.deepEqual(l2.rdoDays, [0, 6]); // Retained [0, 6] as S1 has no hard RDOs
});
