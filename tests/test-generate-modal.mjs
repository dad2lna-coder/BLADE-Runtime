import test from 'node:test';
import assert from 'node:assert/strict';

import { bridgeScheduler } from '../modules/setup-panel/actions/bridge.js';
import { initLineHelpers } from '../modules/shared/lines/helpers.js';
import { initFunctionCoverage } from '../modules/function-coverage/index.js';

function createMockScheduler() {
  const S = {
    $: (id) => null,
    state: {
      startDate: '2025-01-05',
      weekCount: 1,
      open: '03:30',
      close: '23:00',
      ftM: 4, ftF: 4,
      ptM: 0, ptF: 0,
      ptHoursPerDay: 4,
      stsoM: 2, stsoF: 2,
      ltsoM: 1, ltsoF: 1,
      esti: 0, msti: 0,
      extraPositions: [],
      shifts: [
        { id: 'S1', name: '0330', start: '03:30', end: '12:00', paid: 8, stsoForce: 1, ltsoForce: 1, force: 2 },
        { id: 'S2', name: '1200', start: '12:00', end: '20:30', paid: 8, stsoForce: 1, ltsoForce: 0, force: 2 }
      ],
      lines: [],
      schedule: {},
      functionRotation: {},
      issues: []
    },
    timeToMin: (t) => {
      const p = String(t || '00:00').split(':');
      return (+p[0] || 0) * 60 + (+p[1] || 0);
    },
    shiftLabel: (s) => (s.start || '') + '–' + (s.end || ''),
    rdoCountForShift: () => 2,
    targetWorkDays: () => 5,
    consecutiveRdos: (count, seed) => [seed % 7, (seed + 1) % 7],
    getShift: (id) => S.state.shifts.find(s => s.id === id),
    lineRoleKey: (l) => l.isStso || l.empClass === 'STSO' ? 'STSO' : (l.isLtso || l.empClass === 'LTSO' ? 'LTSO' : 'TSO'),
    lineStartMin: (l) => {
      const sh = S.getShift(l.shiftId);
      return sh ? S.timeToMin(sh.start) : 0;
    },
    isAmSide: (startMin) => startMin < 720,
    computeShiftAnchors: () => ({ amStart: 210, pmStart: 720 }),
    updateStatus: () => {}
  };

  bridgeScheduler(S);
  initLineHelpers(S);
  initFunctionCoverage(S);

  return S;
}

test('Base generate vs STSO-only generate leaves other classes untouched', () => {
  const S = createMockScheduler();
  S.generate();

  const initialLines = S.state.lines.map(l => ({ ...l }));
  const initialSchedule = { ...S.state.schedule };
  const initialRotation = { ...S.state.functionRotation };

  const nonStsoBefore = initialLines.filter(l => !S.belongsToClass(l, 'STSO'));
  assert.ok(nonStsoBefore.length > 0, 'Should have non-STSO lines');

  // Single-class generate for STSO
  S.generateClass('STSO');

  const linesAfter = S.state.lines;

  // Check every non-STSO line remained identical
  nonStsoBefore.forEach(orig => {
    const after = linesAfter.find(l => l.id === orig.id);
    assert.ok(after, `Line ${orig.id} should still exist`);
    assert.equal(after.shiftId, orig.shiftId, `Line ${orig.id} shiftId unchanged`);
    assert.equal(after.sex, orig.sex, `Line ${orig.id} sex unchanged`);
    assert.equal(after.function, orig.function, `Line ${orig.id} function unchanged`);
    assert.deepEqual(S.state.schedule[after.id], initialSchedule[orig.id], `Line ${orig.id} schedule unchanged`);
    assert.deepEqual(S.state.functionRotation[after.id], initialRotation[orig.id], `Line ${orig.id} rotation unchanged`);
  });
});

test('Stepper under headcount produces shortfall lines marked "-" excluded from counts', () => {
  const S = createMockScheduler();
  S.generate();

  // STSO headcount is M:2, F:2. Provide targets for M:1, F:2 (1 M shortfall)
  const targets = {
    S1: { M: 1, F: 1 },
    S2: { M: 0, F: 1 }
  };

  S.generateClass('STSO', targets);

  const stsoLines = S.state.lines.filter(l => S.belongsToClass(l, 'STSO'));
  assert.equal(stsoLines.length, 4, 'Total STSO lines should match headcount of 4');

  const shortfallLines = stsoLines.filter(l => l.isShortfall || l.function === '-');
  assert.equal(shortfallLines.length, 1, 'Exactly 1 shortfall line generated');

  const sf = shortfallLines[0];
  assert.equal(sf.function, '-', 'Shortfall line function is "-"');

  const rot = S.state.functionRotation[sf.id];
  assert.ok(rot, 'Shortfall line rotation exists');
  const sched = S.state.schedule[sf.id];
  for (let d = 0; d < 7; d++) {
    if (sched[d] === 'WORK') {
      assert.equal(rot[d], '-', `Work day ${d} duty must be "-" for shortfall line`);
    }
  }
});

test('RDO Parity check detects pattern imbalance and proposes approve-first swap without changing shift/sex', () => {
  const S = createMockScheduler();
  S.generate();

  // Create explicit imbalance on S1 for STSO:
  const stsoS1 = S.state.lines.filter(l => S.belongsToClass(l, 'STSO') && l.shiftId === 'S1');
  if (stsoS1.length >= 2) {
    stsoS1[0].sex = 'F';
    stsoS1[0].rdoDays = [0, 6]; // Sat-Sun
    stsoS1[1].sex = 'M';
    stsoS1[1].rdoDays = [1, 2]; // Mon-Tue
  }

  const res = S.checkParity('STSO', []);
  assert.ok(res.summary.includes('STSO'), 'Parity check returned summary');

  if (res.proposals.length > 0) {
    const prop = res.proposals[0];
    assert.equal(prop.lineA.shiftId, prop.lineB.shiftId, 'Swap is on same shift');
    assert.notEqual(prop.lineA.sex, prop.lineB.sex, 'Swap is between different sexes');

    const lineAId = prop.lineA.id;
    const lineBId = prop.lineB.id;

    // Approve parity swap
    S.approveParitySwaps([{
      lineAId: lineAId,
      lineBId: lineBId,
      rdoA_after: prop.rdoA_after,
      rdoB_after: prop.rdoB_after
    }]);

    const updatedA = S.state.lines.find(l => l.id === lineAId);
    assert.deepEqual(updatedA.rdoDays, prop.rdoA_after, 'Line A RDOs updated');
    assert.equal(updatedA.shiftId, prop.lineA.shiftId, 'Line A shiftId unchanged');
    assert.equal(updatedA.sex, prop.lineA.sex, 'Line A sex unchanged');
  }
});

test('DFO cert balance proposes same-sex cert move when cert counts differ without changing shiftId', () => {
  const S = createMockScheduler();
  S.generate();

  const stsoLines = S.state.lines.filter(l => S.belongsToClass(l, 'STSO'));
  if (stsoLines.length >= 4) {
    stsoLines[0].shiftId = 'S1'; stsoLines[0].shiftName = '0330';
    stsoLines[1].shiftId = 'S1'; stsoLines[1].shiftName = '0330';
    stsoLines[2].shiftId = 'S2'; stsoLines[2].shiftName = '1200';
    stsoLines[3].shiftId = 'S2'; stsoLines[3].shiftName = '1200';

    stsoLines[0].certPool = 'B'; stsoLines[0].function = 'DFO';
    stsoLines[1].certPool = 'B'; stsoLines[1].function = 'DFO';
    stsoLines[2].certPool = 'A'; stsoLines[2].function = 'PAX';
    stsoLines[3].certPool = 'A'; stsoLines[3].function = 'PAX';

    const res = S.proposeDfoCertBalance('STSO');
    assert.equal(res.mode, 'cert_move', 'Detects cert count mismatch across shifts');
    assert.ok(res.proposals.length > 0, 'Generates cert move proposals');

    const prop = res.proposals[0];
    assert.equal(prop.donorLine.sex, prop.receiverLine.sex, 'Cert move is between same sex');
    assert.notEqual(prop.donorShift.id, prop.receiverShift.id, 'Cert move is across shifts');

    const donorShiftBefore = prop.donorLine.shiftId;
    const receiverShiftBefore = prop.receiverLine.shiftId;

    // Approve cert move
    S.approveDfoCertBalance(res, [prop]);

    assert.equal(prop.donorLine.shiftId, donorShiftBefore, 'Donor line shiftId completely unchanged');
    assert.equal(prop.receiverLine.shiftId, receiverShiftBefore, 'Receiver line shiftId completely unchanged');
    assert.equal(prop.receiverLine.certPool, 'B', 'Receiver line gained DFO cert B');
  }
});

test('DFO cert balance tries all receiver shifts for same-sex match in 3-shift setup', () => {
  const S = createMockScheduler();
  S.state.shifts.push({ id: 'S3', name: '1500', start: '15:00', end: '23:30', paid: 8, stsoForce: 1, ltsoForce: 0, force: 2 });
  S.generate();

  const stsoLines = S.state.lines.filter(l => S.belongsToClass(l, 'STSO'));
  if (stsoLines.length >= 4) {
    // S1 has 2 certs (1 Female, 1 Male) -> donor shift
    stsoLines[0].shiftId = 'S1'; stsoLines[0].sex = 'F'; stsoLines[0].certPool = 'B'; stsoLines[0].function = 'DFO';
    stsoLines[3].shiftId = 'S1'; stsoLines[3].sex = 'M'; stsoLines[3].certPool = 'B'; stsoLines[3].function = 'DFO';
    // S2: 1 Male line without DFO cert (first short shift - only Male)
    stsoLines[1].shiftId = 'S2'; stsoLines[1].sex = 'M'; stsoLines[1].certPool = 'A'; stsoLines[1].function = 'PAX';
    // S3: 1 Female line without DFO cert (second short shift)
    stsoLines[2].shiftId = 'S3'; stsoLines[2].sex = 'F'; stsoLines[2].certPool = 'A'; stsoLines[2].function = 'PAX';

    const res = S.proposeDfoCertBalance('STSO');
    assert.equal(res.mode, 'cert_move', 'Mode is cert_move');
    const femaleProps = res.proposals.filter(p => p.donorLine.id === stsoLines[0].id);
    assert.ok(femaleProps.length > 0, 'Found proposal for female donor');
    const prop = femaleProps[0];
    assert.equal(prop.receiverLine.id, stsoLines[2].id, 'Female donor on S1 paired with female receiver on S3');
    assert.equal(prop.receiverShift.id, 'S3', 'Receiver shift is S3');
    assert.equal(prop.donorLine.sex, prop.receiverLine.sex, 'Same sex pair F <-> F');
  }
});

test('DFO cert balance refuses cross-sex proposal and skips move if no same-sex receiver exists', () => {
  const S = createMockScheduler();
  S.generate();

  const stsoLines = S.state.lines.filter(l => S.belongsToClass(l, 'STSO'));
  if (stsoLines.length >= 2) {
    // S1 has 1 Female line with DFO cert
    stsoLines[0].shiftId = 'S1'; stsoLines[0].sex = 'F'; stsoLines[0].certPool = 'B'; stsoLines[0].function = 'DFO';
    // S2 has ONLY Male lines without DFO cert
    stsoLines[1].shiftId = 'S2'; stsoLines[1].sex = 'M'; stsoLines[1].certPool = 'A'; stsoLines[1].function = 'PAX';
    for (let i = 2; i < stsoLines.length; i++) {
      stsoLines[i].shiftId = 'S1'; stsoLines[i].sex = 'M'; stsoLines[i].certPool = 'A'; stsoLines[i].function = 'PAX';
    }

    const res = S.proposeDfoCertBalance('STSO');
    // Since S2 has no Female line, same-sex move cannot be proposed
    const crossSexProps = res.proposals.filter(p => p.donorLine.sex !== p.receiverLine.sex);
    assert.equal(crossSexProps.length, 0, 'No cross-sex move proposals created');

    // Test approveDfoCertBalance explicitly refusing a cross-sex proposal
    const fakeCrossSexProp = {
      donorLine: stsoLines[0], // Female
      receiverLine: stsoLines[1], // Male
      sex: 'F',
      donorShift: S.getShift('S1'),
      receiverShift: S.getShift('S2')
    };

    const approved = S.approveDfoCertBalance({ mode: 'cert_move', proposals: [fakeCrossSexProp] }, [fakeCrossSexProp]);
    assert.equal(approved, false, 'approveDfoCertBalance refused cross-sex proposal');
    assert.equal(stsoLines[0].shiftId, 'S1', 'Donor shiftId unchanged');
    assert.equal(stsoLines[1].shiftId, 'S2', 'Receiver shiftId unchanged');
    assert.equal(stsoLines[1].certPool, 'A', 'Receiver certPool unchanged');
  }
});

test('DFO cert balance proposes baggage reshuffle when cert counts match', () => {
  const S = createMockScheduler();
  S.generate();

  const stsoLines = S.state.lines.filter(l => S.belongsToClass(l, 'STSO'));
  const s1Lines = stsoLines.filter(l => l.shiftId === 'S1');
  const s2Lines = stsoLines.filter(l => l.shiftId === 'S2');

  // Equalize cert counts: 1 on S1, 1 on S2
  if (s1Lines.length > 0) { s1Lines[0].certPool = 'B'; s1Lines[0].function = 'DFO'; }
  if (s2Lines.length > 0) { s2Lines[0].certPool = 'B'; s2Lines[0].function = 'DFO'; }

  const res = S.proposeDfoCertBalance('STSO');
  assert.equal(res.mode, 'baggage_reshuffle', 'Mode is baggage_reshuffle when cert counts match');
  assert.equal(res.certsMatch, true, 'certsMatch is true');

  const ok = S.approveDfoCertBalance(res, []);
  assert.equal(ok, true, 'Baggage reshuffle approved successfully');
});

test('TSO target generation spends PT and FT separately and creates PT lines', () => {
  const S = createMockScheduler();
  S.state.ftM = 2; S.state.ftF = 2;
  S.state.ptM = 2; S.state.ptF = 2;

  const targets = {
    S1: { M: 3, F: 3 },
    S2: { M: 1, F: 1 }
  };

  S.generateClass('TSO', targets);

  const tsoLines = S.state.lines.filter(l => S.belongsToClass(l, 'TSO'));
  assert.equal(tsoLines.length, 8, 'Total TSO lines generated = 8');

  const ptLines = tsoLines.filter(l => l.empClass === 'PT');
  const ftLines = tsoLines.filter(l => l.empClass === 'FT');

  assert.equal(ptLines.length, 4, 'Exactly 4 PT lines generated (2 M PT, 2 F PT)');
  assert.equal(ftLines.length, 4, 'Exactly 4 FT lines generated (2 M FT, 2 F FT)');

  ptLines.forEach(l => {
    assert.notEqual(l.empClass, 'FT', 'PT line is never marked as FT');
    assert.equal(l.paid, 4, 'PT line paid hours per day is 4');
  });
});
