window.Blade = window.Blade || {};
(function (B) {
  "use strict";
  B.emptyAirfield = function () {
    return {
      schema: "blade.airfield.v2",
      airport: "DFW",
      open: "03:30",
      close: "23:00",
      volumePerHour: { STD: 150, PRE: 240, MIX: 195 },
      terminals: [],
      checkpoints: [],
      bagSites: []
    };
  };
  B.seedAirfield = function () {
    return {
      schema: "blade.airfield.v2",
      airport: "DFW",
      open: "03:30",
      close: "23:00",
      volumePerHour: { STD: 150, PRE: 240, MIX: 195 },
      terminals: [
        { id: "A", name: "Terminal A", open: "03:30", close: "23:00", baseTsoCost: { STD: 6, PRE: 5, MIX: 6 } }
      ],
      checkpoints: [
        {
          id: "A-MAIN", name: "A Main", terminalId: "A", open: "03:30", close: "23:00",
          kcm: { open: "05:00", close: "19:00" },
          mods: [
            { open: "03:30", close: "23:00", program: "STD", ait: 1, lanes: [{ n: 1, ct: 0 }, { n: 2, ct: 0 }] },
            { open: "05:00", close: "23:00", program: "MIX", ait: 1, lanes: [{ n: 3, ct: 1 }] }
          ]
        },
        {
          id: "A-PRE", name: "A PreCheck", terminalId: "A", open: "04:00", close: "21:00", kcm: null,
          mods: [{ open: "04:00", close: "21:00", program: "PRE", ait: 1, lanes: [{ n: 4, ct: 0 }, { n: 5, ct: 0 }] }]
        }
      ],
      bagSites: [
        { id: "CBRA-A", name: "Terminal A CBRA", kind: "CBRA", present: true, terminalId: "A", open: "04:00", close: "21:00", units: [{ n: 1 }, { n: 2 }, { n: 3 }], lead: 1 },
        { id: "OS-A", name: "Terminal A Oversized", kind: "OS", present: true, terminalId: "A", open: "05:00", close: "20:00", units: [{ n: 1 }], lead: 0 },
        { id: "OSRA-A", name: "Terminal A OSRA", kind: "OSRA", present: false, terminalId: "A", open: "05:00", close: "20:00", units: [{ n: 1 }], lead: 0 }
      ]
    };
  };
  B.cpsFor = function (field, tid) {
    return (field.checkpoints || []).filter(function (c) { return c.terminalId === tid; });
  };
  B.nextLaneN = function (cp) {
    var max = 0;
    (cp.mods || []).forEach(function (m) {
      (m.lanes || []).forEach(function (l) { if (l.n > max) max = l.n; });
    });
    return max + 1;
  };
  B.validate = function (field) {
    var errors = [];
    var warnings = [];
    if (!field.checkpoints.length) errors.push("No checkpoints.");
    field.checkpoints.forEach(function (cp) {
      if (!field.terminals.some(function (t) { return t.id === cp.terminalId; })) {
        errors.push("Checkpoint " + cp.id + " missing terminal " + cp.terminalId);
      }
      if (!cp.mods.length) errors.push(cp.name + " has zero modsets.");
      cp.mods.forEach(function (m, i) {
        if (!m.lanes.length) errors.push(cp.name + " modset " + (i + 1) + " has zero lanes.");
      });
      var term = field.terminals.filter(function (t) { return t.id === cp.terminalId; })[0];
      if (term && (cp.open < term.open || cp.close > term.close)) {
        warnings.push(cp.name + " window is outside " + term.name + " (warn only).");
      }
    });
    (field.bagSites || []).forEach(function (b) {
      if (b.present && !b.units.length) errors.push(b.name + " is present with zero units.");
    });
    return { errors: errors, warnings: warnings };
  };
  B.seatSummary = function (field) {
    var paxLanes = 0, ait = 0, bagUnits = 0;
    field.checkpoints.forEach(function (cp) {
      cp.mods.forEach(function (m) {
        paxLanes += (m.lanes || []).length;
        ait += Number(m.ait) || 0;
      });
    });
    (field.bagSites || []).forEach(function (b) {
      if (b.present) bagUnits += (b.units || []).length;
    });
    return { paxLanes: paxLanes, ait: ait, bagUnits: bagUnits };
  };
})(window.Blade);
