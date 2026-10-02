import test from 'node:test';
import assert from 'node:assert/strict';

import {
  initFunctionCoverage,
  resolveBagDuties,
  rotateShiftBagDuties
} from '../modules/function-coverage/index.js';

test('resolveBagDuties repaints per-day BAG duties on DFO lines to hit shift requirements without moving lines or altering BAG-block/PAX', () => {
  const S = {
    $: (id) => null,
    timeToMin: (t) => {
      const p = String(t || '00:00').split(':');
      return (+p[0] || 0) * 60 + (+p[1] || 0);
    },
    state: {
      weekCount: 1,
      shifts: [
        { id: 'S1', name: '0330', start: '03:30', end: '12:00' }
      ],
      functionCoverage: {
        requirements: {
          TSO: { S1: { min: 2, max: 2 } }
        }
      },
      lines: [
        // 4 DFO lines on S1
        { id: 'L1', lineCode: '001', shiftId: 'S1', startTime: '03:30', empClass: 'FT', sex: 'M', rdoDays: [5, 6], function: 'DFO', functionEligible: { dfo: true, bag: false } },
        { id: 'L2', lineCode: '002', shiftId: 'S1', startTime: '03:30', empClass: 'FT', sex: 'F', rdoDays: [5, 6], function: 'DFO', functionEligible: { dfo: true, bag: false } },
        { id: 'L3', lineCode: '003', shiftId: 'S1', startTime: '03:30', empClass: 'FT', sex: 'M', rdoDays: [5, 6], function: 'DFO', functionEligible: { dfo: true, bag: false } },
        { id: 'L4', lineCode: '004', shiftId: 'S1', startTime: '03:30', empClass: 'FT', sex: 'F', rdoDays: [5, 6], function: 'DFO', functionEligible: { dfo: true, bag: false } },
        // 1 BAG block line on S1
        { id: 'L5', lineCode: '005', shiftId: 'S1', startTime: '03:30', empClass: 'FT', sex: 'M', rdoDays: [5, 6], function: 'BAG', functionEligible: { dfo: false, bag: true } },
        // 1 PAX line on S1
        { id: 'L6', lineCode: '006', shiftId: 'S1', startTime: '03:30', empClass: 'FT', sex: 'F', rdoDays: [5, 6], function: 'PAX', functionEligible: { dfo: false, bag: false, pax: true } }
      ],
      schedule: {
        'L1': ['WORK', 'WORK', 'WORK', 'WORK', 'WORK', 'RDO', 'RDO'],
        'L2': ['WORK', 'WORK', 'WORK', 'WORK', 'WORK', 'RDO', 'RDO'],
        'L3': ['WORK', 'WORK', 'WORK', 'WORK', 'WORK', 'RDO', 'RDO'],
        'L4': ['WORK', 'WORK', 'WORK', 'WORK', 'WORK', 'RDO', 'RDO'],
        'L5': ['WORK', 'WORK', 'WORK', 'WORK', 'WORK', 'RDO', 'RDO'],
        'L6': ['WORK', 'WORK', 'WORK', 'WORK', 'WORK', 'RDO', 'RDO']
      },
      functionRotation: {
        'L5': ['BAG', 'BAG', 'BAG', 'BAG', 'BAG', 'OFF', 'OFF'],
        'L6': ['PAX', 'PAX', 'PAX', 'PAX', 'PAX', 'OFF', 'OFF']
      }
    },
    getShift: (id) => S.state.shifts.find(s => s.id === id),
    updateStatus: () => {}
  };

  initFunctionCoverage(S);

  const result = S.resolveBagDuties(S.state.functionCoverage, 7);
  assert.equal(result.shortfalls.length, 0);

  // Check per-day BAG duty counts on work day 0 (Sun) for DFO lines
  let dfoBagCountDay0 = 0;
  ['L1', 'L2', 'L3', 'L4'].forEach(id => {
    const rot = S.state.functionRotation[id];
    if (rot && rot[0] === 'BAG') dfoBagCountDay0++;
  });
  assert.equal(dfoBagCountDay0, 2, 'Exactly 2 DFO lines assigned BAG on work day 0 to hit req min=2');

  // Verify non-BAG work days on DFO lines are 'DFO'
  ['L1', 'L2', 'L3', 'L4'].forEach(id => {
    const rot = S.state.functionRotation[id];
    for (let d = 0; d < 5; d++) {
      assert.ok(rot[d] === 'BAG' || rot[d] === 'DFO', `Duty on work day ${d} must be BAG or DFO`);
    }
  });

  // Verify BAG block line L5 rotation remains BAG on work days
  assert.deepEqual(S.state.functionRotation['L5'], ['BAG', 'BAG', 'BAG', 'BAG', 'BAG', 'OFF', 'OFF']);

  // Verify PAX line L6 rotation remains PAX on work days
  assert.deepEqual(S.state.functionRotation['L6'], ['PAX', 'PAX', 'PAX', 'PAX', 'PAX', 'OFF', 'OFF']);

  // Verify metadata (shiftId, rdoDays, function, functionEligible, sex, empClass) completely untouched
  const l1 = S.state.lines.find(l => l.id === 'L1');
  assert.equal(l1.shiftId, 'S1');
  assert.equal(l1.sex, 'M');
  assert.equal(l1.empClass, 'FT');
  assert.equal(l1.function, 'DFO');
  assert.deepEqual(l1.rdoDays, [5, 6]);
});

test('resolveBagDuties reports shortfalls when available DFO lines fall short of req min', () => {
  let statusMsg = '';
  const S = {
    $: (id) => null,
    timeToMin: (t) => {
      const p = String(t || '00:00').split(':');
      return (+p[0] || 0) * 60 + (+p[1] || 0);
    },
    state: {
      weekCount: 1,
      shifts: [
        { id: 'S1', name: '0330', start: '03:30', end: '12:00' }
      ],
      functionCoverage: {
        requirements: {
          TSO: { S1: { min: 4, max: 4 } }
        }
      },
      lines: [
        { id: 'L1', lineCode: '001', shiftId: 'S1', startTime: '03:30', empClass: 'FT', sex: 'M', rdoDays: [5, 6], function: 'DFO', functionEligible: { dfo: true, bag: false } }
      ],
      schedule: {
        'L1': ['WORK', 'WORK', 'WORK', 'WORK', 'WORK', 'RDO', 'RDO']
      },
      functionRotation: {}
    },
    getShift: (id) => S.state.shifts.find(s => s.id === id),
    updateStatus: (msg) => { statusMsg = msg; }
  };

  initFunctionCoverage(S);

  const result = S.resolveBagDuties(S.state.functionCoverage, 7);
  assert.equal(result.shortfalls.length, 1);
  assert.ok(result.shortfalls[0].includes('TSO'));
  assert.ok(statusMsg.includes('Shortfalls'));
});
