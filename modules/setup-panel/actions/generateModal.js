/** Setup Generate Modal UI — owns class buttons, per-shift targets/steppers,
 *  weekday band columns matrix, RDO parity report, and DFO cert balance path.
 */
import { getBandKey } from "../utils/buildLines.js";
import { formatRdos } from "../utils/rebalanceDfo.js";
import { parseStartDate, addDays, weekdaySun0 } from "../../shared/utils/dates.js";

export function getModalClassOptions(S) {
  var options = [
    { key: "STSO", label: "STSO" },
    { key: "LTSO", label: "LTSO" },
    { key: "TSO", label: "TSO" },
    { key: "MSTI", label: "MSTI" },
    { key: "ESTI", label: "ESTI" }
  ];

  var extraList = (S && S.state && S.state.extraPositions) || [];
  extraList.forEach(function (pos) {
    var name = String(pos.name || pos.id || "Position").trim();
    options.push({
      key: "EXTRA_" + pos.id,
      label: "Extra: " + name
    });
  });

  return options;
}

export function renderClassButtons(S) {
  var container = typeof document !== "undefined" ? document.getElementById("generate-class-buttons") : null;
  if (!container) return;

  var options = getModalClassOptions(S);
  container.innerHTML = options.map(function (opt) {
    return '<button type="button" class="btn btn-amber btn-sm btn-generate-class" data-class-key="' + opt.key + '">Generate ' + opt.label + ' Only</button>';
  }).join("");

  container.querySelectorAll(".btn-generate-class").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var key = btn.getAttribute("data-class-key");
      var targets = (S._perShiftTargets && S._perShiftTargets[key]) || null;
      if (S.generateClass) {
        S.generateClass(key, targets);
      }
      if (S.renderGenerateModalContent) {
        S.renderGenerateModalContent();
      }
    });
  });
}

export function initPerShiftTargetsForClass(S, classKey) {
  S._perShiftTargets = S._perShiftTargets || {};
  if (S._perShiftTargets[classKey]) return S._perShiftTargets[classKey];

  var shifts = (S.state && S.state.shifts) || [];
  var targets = {};
  shifts.forEach(function (s) { targets[s.id] = { M: 0, F: 0 }; });

  var lines = (S.state && S.state.lines) || [];
  var classLines = lines.filter(function (l) { return S.belongsToClass ? S.belongsToClass(l, classKey) : false; });

  if (classLines.length) {
    classLines.forEach(function (l) {
      if (!l.shiftId || !targets[l.shiftId]) return;
      if (l.isShortfall) return;
      if (l.sex === "F") targets[l.shiftId].F++;
      else targets[l.shiftId].M++;
    });
  } else {
    var hc = S.getClassHeadcount ? S.getClassHeadcount(classKey) : { M: 0, F: 0, total: 0 };
    if (shifts.length > 0) {
      var mM = hc.M, mF = hc.F;
      for (var i = 0; i < shifts.length; i++) {
        var sId = shifts[i].id;
        var takeM = Math.floor(mM / (shifts.length - i));
        var takeF = Math.floor(mF / (shifts.length - i));
        targets[sId].M = takeM;
        targets[sId].F = takeF;
        mM -= takeM;
        mF -= takeF;
      }
    }
  }

  S._perShiftTargets[classKey] = targets;
  return targets;
}

export function renderTargetControls(S) {
  var selectEl = typeof document !== "undefined" ? document.getElementById("generate-target-class-select") : null;
  var tbody = typeof document !== "undefined" ? document.getElementById("generate-shift-targets-tbody") : null;
  var infoEl = typeof document !== "undefined" ? document.getElementById("generate-target-headcount-info") : null;

  if (!selectEl || !tbody) return;

  var options = getModalClassOptions(S);
  if (!S._activeTargetClass) S._activeTargetClass = options[0] ? options[0].key : "STSO";

  selectEl.innerHTML = options.map(function (opt) {
    var sel = opt.key === S._activeTargetClass ? " selected" : "";
    return '<option value="' + opt.key + '"' + sel + '>' + opt.label + '</option>';
  }).join("");

  if (!S._targetClassSelectBound) {
    S._targetClassSelectBound = true;
    selectEl.addEventListener("change", function (e) {
      S._activeTargetClass = e.target.value;
      renderTargetControls(S);
    });
  }

  var classKey = S._activeTargetClass;
  var hc = S.getClassHeadcount ? S.getClassHeadcount(classKey) : { M: 0, F: 0, total: 0 };
  var targets = initPerShiftTargetsForClass(S, classKey);
  var shifts = (S.state && S.state.shifts) || [];

  var sumM = 0;
  var sumF = 0;
  shifts.forEach(function (s) {
    var t = targets[s.id] || { M: 0, F: 0 };
    sumM += (+t.M || 0);
    sumF += (+t.F || 0);
  });

  if (infoEl) {
    var isTrain = classKey === "MSTI" || classKey === "ESTI";
    if (isTrain) {
      var totalSum = sumM + sumF;
      var shortTotal = Math.max(0, hc.total - totalSum);
      infoEl.textContent = "Total: " + totalSum + " / " + hc.total + " targeted (" + shortTotal + " shortfall)";
    } else {
      var shortM = Math.max(0, hc.M - sumM);
      var shortF = Math.max(0, hc.F - sumF);
      infoEl.textContent = "Male: " + sumM + " / " + hc.M + " (" + shortM + " shortfall) | Female: " + sumF + " / " + hc.F + " (" + shortF + " shortfall)";
    }
  }

  tbody.innerHTML = shifts.map(function (s) {
    var t = targets[s.id] || { M: 0, F: 0 };
    var curM = +t.M || 0;
    var curF = +t.F || 0;
    var curTotal = curM + curF;

    var canIncM = sumM < hc.M;
    var canIncF = sumF < hc.F;

    var labelTime = (s.start || "") + (s.end ? "–" + s.end : "");
    var shiftName = "<strong>" + (s.name || s.id) + "</strong>" + (labelTime ? ' <span class="muted">(' + labelTime + ")</span>" : "");

    return '<tr data-shift-id="' + s.id + '">' +
      '<td>' + shiftName + '</td>' +
      '<td style="text-align:center;white-space:nowrap">' +
        '<button type="button" class="btn btn-sm btn-target-m-down" data-shift-id="' + s.id + '">-</button> ' +
        '<span style="display:inline-block;width:2rem;text-align:center;font-weight:600">' + curM + '</span> ' +
        '<button type="button" class="btn btn-sm btn-target-m-up" data-shift-id="' + s.id + '"' + (canIncM ? "" : " disabled") + '>+</button>' +
      '</td>' +
      '<td style="text-align:center;white-space:nowrap">' +
        '<button type="button" class="btn btn-sm btn-target-f-down" data-shift-id="' + s.id + '">-</button> ' +
        '<span style="display:inline-block;width:2rem;text-align:center;font-weight:600">' + curF + '</span> ' +
        '<button type="button" class="btn btn-sm btn-target-f-up" data-shift-id="' + s.id + '"' + (canIncF ? "" : " disabled") + '>+</button>' +
      '</td>' +
      '<td style="text-align:center;white-space:nowrap">' +
        '<button type="button" class="btn btn-sm btn-target-tot-down" data-shift-id="' + s.id + '">-</button> ' +
        '<span style="display:inline-block;width:2.5rem;text-align:center;font-weight:700">' + curTotal + '</span> ' +
        '<button type="button" class="btn btn-sm btn-target-tot-up" data-shift-id="' + s.id + '"' + ((canIncM || canIncF) ? "" : " disabled") + '>+</button>' +
      '</td>' +
      '</tr>';
  }).join("");

  tbody.querySelectorAll(".btn-target-m-up").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var sId = btn.getAttribute("data-shift-id");
      if (sumM < hc.M) {
        targets[sId].M++;
        renderTargetControls(S);
      }
    });
  });

  tbody.querySelectorAll(".btn-target-m-down").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var sId = btn.getAttribute("data-shift-id");
      if (targets[sId].M > 0) {
        targets[sId].M--;
        renderTargetControls(S);
      }
    });
  });

  tbody.querySelectorAll(".btn-target-f-up").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var sId = btn.getAttribute("data-shift-id");
      if (sumF < hc.F) {
        targets[sId].F++;
        renderTargetControls(S);
      }
    });
  });

  tbody.querySelectorAll(".btn-target-f-down").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var sId = btn.getAttribute("data-shift-id");
      if (targets[sId].F > 0) {
        targets[sId].F--;
        renderTargetControls(S);
      }
    });
  });

  tbody.querySelectorAll(".btn-target-tot-up").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var sId = btn.getAttribute("data-shift-id");
      if (sumM < hc.M) {
        targets[sId].M++;
      } else if (sumF < hc.F) {
        targets[sId].F++;
      }
      renderTargetControls(S);
    });
  });

  tbody.querySelectorAll(".btn-target-tot-down").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var sId = btn.getAttribute("data-shift-id");
      if (targets[sId].F > 0) {
        targets[sId].F--;
      } else if (targets[sId].M > 0) {
        targets[sId].M--;
      }
      renderTargetControls(S);
    });
  });
}

export function getBandLabel(S, bandKey) {
  if (bandKey.indexOf("crew_") === 0) {
    var cgId = bandKey.substring(5);
    var groups = (S.state && S.state.shiftCrewGroups) || [];
    var grp = groups.find(function (g) { return g.id === cgId; });
    if (grp) return "Group: " + (grp.name || grp.id);
  }
  var shifts = (S.state && S.state.shifts) || [];
  var sh = shifts.find(function (s) { return s.id === bandKey; });
  if (sh) return (sh.name || sh.id) + (sh.start ? " (" + sh.start + "–" + sh.end + ")" : "");
  return bandKey;
}

export function renderWeekdayBandsMatrix(S) {
  var tbody = typeof document !== "undefined" ? document.getElementById("generate-weekday-bands-tbody") : null;
  if (!tbody) return;

  var lines = (S.state && S.state.lines) || [];
  var schedule = (S.state && S.state.schedule) || {};
  var shifts = (S.state && S.state.shifts) || [];

  if (!lines.length || !shifts.length) {
    tbody.innerHTML = '<tr><td colspan="8" class="muted" style="text-align:center">No lines generated yet. Click Generate to populate.</td></tr>';
    return;
  }

  var baseDate = parseStartDate(S.state ? S.state.startDate : null);

  var bandKeys = [];
  var seenBands = {};

  shifts.forEach(function (s) {
    var bk = getBandKey(S, s.id);
    if (!seenBands[bk]) {
      seenBands[bk] = true;
      bandKeys.push(bk);
    }
  });

  var bandCounts = {};
  bandKeys.forEach(function (bk) {
    bandCounts[bk] = [];
    for (var d = 0; d < 7; d++) {
      bandCounts[bk][d] = { M: 0, F: 0, total: 0 };
    }
  });

  lines.forEach(function (line) {
    if (!line || !line.shiftId) return;
    if (line.isShortfall || line.function === "-") return;

    var bk = getBandKey(S, line.shiftId);
    if (!bandCounts[bk]) {
      bandCounts[bk] = [];
      for (var d = 0; d < 7; d++) bandCounts[bk][d] = { M: 0, F: 0, total: 0 };
      bandKeys.push(bk);
    }

    var lineSched = schedule[line.id] || [];
    var rotation = S.state && S.state.functionRotation ? (S.state.functionRotation[line.id] || S.state.functionRotation[String(line.id)]) : null;

    for (var dayIdx = 0; dayIdx < 7; dayIdx++) {
      if (lineSched[dayIdx] === "WORK") {
        var dayDuty = rotation ? rotation[dayIdx] : line.function;
        if (dayDuty === "-") continue;

        var calDow = weekdaySun0(addDays(baseDate, dayIdx));

        bandCounts[bk][calDow].total++;
        if (line.sex === "F") bandCounts[bk][calDow].F++;
        else if (line.sex === "M") bandCounts[bk][calDow].M++;
      }
    }
  });

  tbody.innerHTML = bandKeys.map(function (bk) {
    var bLabel = getBandLabel(S, bk);
    var cells = [];
    for (var calDow = 0; calDow < 7; calDow++) {
      var c = bandCounts[bk][calDow];
      var text = c.M + "M / " + c.F + "F (" + c.total + ")";
      cells.push('<td style="text-align:center;font-size:0.85rem">' + text + '</td>');
    }

    return '<tr>' +
      '<td><strong>' + bLabel + '</strong></td>' +
      cells.join("") +
      '</tr>';
  }).join("");
}

export function renderParityReportSection(S) {
  var classSelect = typeof document !== "undefined" ? document.getElementById("generate-parity-class-select") : null;
  var bandsWrap = typeof document !== "undefined" ? document.getElementById("generate-parity-bands-select") : null;
  var checkBtn = typeof document !== "undefined" ? document.getElementById("btn-generate-check-parity") : null;
  var approveBtn = typeof document !== "undefined" ? document.getElementById("btn-generate-approve-parity") : null;
  var resultsWrap = typeof document !== "undefined" ? document.getElementById("generate-parity-results-wrap") : null;
  var tbody = typeof document !== "undefined" ? document.getElementById("generate-parity-proposals-tbody") : null;

  if (!classSelect || !bandsWrap) return;

  var options = getModalClassOptions(S);
  if (!S._activeParityClass) S._activeParityClass = options[0] ? options[0].key : "STSO";

  classSelect.innerHTML = options.map(function (opt) {
    var sel = opt.key === S._activeParityClass ? " selected" : "";
    return '<option value="' + opt.key + '"' + sel + '>' + opt.label + '</option>';
  }).join("");

  if (!S._parityClassSelectBound) {
    S._parityClassSelectBound = true;
    classSelect.addEventListener("change", function (e) {
      S._activeParityClass = e.target.value;
      S._parityReportResult = null;
      if (resultsWrap) resultsWrap.style.display = "none";
    });
  }

  var shifts = (S.state && S.state.shifts) || [];
  var bandKeys = [];
  var seen = {};
  shifts.forEach(function (s) {
    var bk = getBandKey(S, s.id);
    if (!seen[bk]) {
      seen[bk] = true;
      bandKeys.push(bk);
    }
  });

  S._selectedParityBands = S._selectedParityBands || {};
  bandKeys.forEach(function (bk) {
    if (S._selectedParityBands[bk] === undefined) S._selectedParityBands[bk] = true;
  });

  bandsWrap.innerHTML = bandKeys.map(function (bk) {
    var lbl = getBandLabel(S, bk);
    var isChecked = S._selectedParityBands[bk] !== false;
    return '<label style="font-weight:normal;font-size:0.85rem;white-space:nowrap">' +
      '<input type="checkbox" class="parity-band-cb" data-band-key="' + bk + '"' + (isChecked ? ' checked' : '') + ' /> ' + lbl +
      '</label>';
  }).join("");

  bandsWrap.querySelectorAll(".parity-band-cb").forEach(function (cb) {
    cb.addEventListener("change", function () {
      var bk = cb.getAttribute("data-band-key");
      S._selectedParityBands[bk] = cb.checked;
      S._parityReportResult = null;
      if (resultsWrap) resultsWrap.style.display = "none";
    });
  });

  if (checkBtn && !checkBtn._parityBound) {
    checkBtn._parityBound = true;
    checkBtn.addEventListener("click", function (e) {
      e.preventDefault();
      var cls = S._activeParityClass || "STSO";
      var selBands = [];
      Object.keys(S._selectedParityBands || {}).forEach(function (bk) {
        if (S._selectedParityBands[bk]) selBands.push(bk);
      });

      if (S.checkParity) {
        S._parityReportResult = S.checkParity(cls, selBands);
        renderParityProposalsTable(S);
      }
    });
  }

  if (approveBtn && !approveBtn._parityBound) {
    approveBtn._parityBound = true;
    approveBtn.addEventListener("click", function (e) {
      e.preventDefault();
      var pairs = [];
      if (tbody) {
        tbody.querySelectorAll("tr[data-pair-idx]").forEach(function (tr) {
          var cb = tr.querySelector(".parity-swap-cb");
          if (cb && cb.checked) {
            var rdoA = [];
            var rdoB = [];
            try { rdoA = JSON.parse(tr.getAttribute("data-rdo-a-after")); } catch (err) {}
            try { rdoB = JSON.parse(tr.getAttribute("data-rdo-b-after")); } catch (err) {}
            pairs.push({
              lineAId: tr.getAttribute("data-line-a-id"),
              lineBId: tr.getAttribute("data-line-b-id"),
              rdoA_after: rdoA,
              rdoB_after: rdoB
            });
          }
        });
      }

      if (pairs.length && S.approveParitySwaps) {
        S.approveParitySwaps(pairs);
        var cls = S._activeParityClass || "STSO";
        var selBands = [];
        Object.keys(S._selectedParityBands || {}).forEach(function (bk) {
          if (S._selectedParityBands[bk]) selBands.push(bk);
        });
        if (S.checkParity) {
          S._parityReportResult = S.checkParity(cls, selBands);
          renderParityProposalsTable(S);
        }
      }
    });
  }

  if (S._parityReportResult) {
    renderParityProposalsTable(S);
  }
}

function renderParityProposalsTable(S) {
  var resultsWrap = typeof document !== "undefined" ? document.getElementById("generate-parity-results-wrap") : null;
  var summaryEl = typeof document !== "undefined" ? document.getElementById("generate-parity-summary") : null;
  var tbody = typeof document !== "undefined" ? document.getElementById("generate-parity-proposals-tbody") : null;

  if (!resultsWrap || !summaryEl || !tbody) return;

  var res = S._parityReportResult;
  if (!res) {
    resultsWrap.style.display = "none";
    return;
  }

  resultsWrap.style.display = "block";
  summaryEl.textContent = res.summary || "";

  var proposals = res.proposals || [];
  if (!proposals.length) {
    tbody.innerHTML = '<tr><td colspan="3" class="muted" style="text-align:center">No RDO pattern swaps needed. Patterns are balanced.</td></tr>';
    return;
  }

  tbody.innerHTML = proposals.map(function (p, idx) {
    var lA = p.lineA;
    var lB = p.lineB;
    var rA_before = formatRdos(p.rdoA_before);
    var rB_before = formatRdos(p.rdoB_before);
    var rA_afterJson = JSON.stringify(p.rdoA_after);
    var rB_afterJson = JSON.stringify(p.rdoB_after);

    var labelA = '<strong>' + (lA.lineCode || lA.id) + '</strong> (' + lA.sex + ', ' + (lA.shiftName || lA.shiftId) + ') RDO: ' + rA_before;
    var labelB = '<strong>' + (lB.lineCode || lB.id) + '</strong> (' + lB.sex + ', ' + (lB.shiftName || lB.shiftId) + ') RDO: ' + rB_before;

    return '<tr data-pair-idx="' + idx + '" data-line-a-id="' + lA.id + '" data-line-b-id="' + lB.id + '" data-rdo-a-after=\'' + rA_afterJson + '\' data-rdo-b-after=\'' + rB_afterJson + '\'>' +
      '<td><input type="checkbox" class="parity-swap-cb" checked /> ' + labelA + '</td>' +
      '<td>' + labelB + '</td>' +
      '<td><strong style="color:var(--amber,#d97706)">' + p.note + '</strong></td>' +
      '</tr>';
  }).join("");
}

export function renderDfoSection(S) {
  var classSelect = typeof document !== "undefined" ? document.getElementById("generate-dfo-class-select") : null;
  var proposeBtn = typeof document !== "undefined" ? document.getElementById("btn-generate-propose-dfo") : null;
  var approveBtn = typeof document !== "undefined" ? document.getElementById("btn-generate-approve-dfo") : null;
  var resultsWrap = typeof document !== "undefined" ? document.getElementById("generate-dfo-results-wrap") : null;
  var tbody = typeof document !== "undefined" ? document.getElementById("generate-dfo-proposals-tbody") : null;

  if (!classSelect) return;

  var options = getModalClassOptions(S);
  if (!S._activeDfoClass) S._activeDfoClass = options[0] ? options[0].key : "STSO";

  classSelect.innerHTML = options.map(function (opt) {
    var sel = opt.key === S._activeDfoClass ? " selected" : "";
    return '<option value="' + opt.key + '"' + sel + '>' + opt.label + '</option>';
  }).join("");

  if (!S._dfoClassSelectBound) {
    S._dfoClassSelectBound = true;
    classSelect.addEventListener("change", function (e) {
      S._activeDfoClass = e.target.value;
      S._dfoCertBalanceResult = null;
      if (resultsWrap) resultsWrap.style.display = "none";
    });
  }

  if (proposeBtn && !proposeBtn._dfoBound) {
    proposeBtn._dfoBound = true;
    proposeBtn.addEventListener("click", function (e) {
      e.preventDefault();
      var cls = S._activeDfoClass || "STSO";
      if (S.proposeDfoCertBalance) {
        S._dfoCertBalanceResult = S.proposeDfoCertBalance(cls);
        renderDfoProposalsTable(S);
      }
    });
  }

  if (approveBtn && !approveBtn._dfoBound) {
    approveBtn._dfoBound = true;
    approveBtn.addEventListener("click", function (e) {
      e.preventDefault();
      var res = S._dfoCertBalanceResult;
      if (!res) return;

      var selected = [];
      if (res.mode === "cert_move" && tbody) {
        tbody.querySelectorAll("tr[data-prop-idx]").forEach(function (tr) {
          var cb = tr.querySelector(".dfo-cert-swap-cb");
          if (cb && cb.checked) {
            var idx = +tr.getAttribute("data-prop-idx");
            if (res.proposals[idx]) selected.push(res.proposals[idx]);
          }
        });
      }

      if (S.approveDfoCertBalance) {
        S.approveDfoCertBalance(res, selected);
        var cls = S._activeDfoClass || "STSO";
        if (S.proposeDfoCertBalance) {
          S._dfoCertBalanceResult = S.proposeDfoCertBalance(cls);
          renderDfoProposalsTable(S);
        }
      }
    });
  }

  if (S._dfoCertBalanceResult) {
    renderDfoProposalsTable(S);
  }
}

function renderDfoProposalsTable(S) {
  var resultsWrap = typeof document !== "undefined" ? document.getElementById("generate-dfo-results-wrap") : null;
  var summaryEl = typeof document !== "undefined" ? document.getElementById("generate-dfo-summary") : null;
  var tbody = typeof document !== "undefined" ? document.getElementById("generate-dfo-proposals-tbody") : null;

  if (!resultsWrap || !summaryEl || !tbody) return;

  var res = S._dfoCertBalanceResult;
  if (!res) {
    resultsWrap.style.display = "none";
    return;
  }

  resultsWrap.style.display = "block";
  summaryEl.textContent = res.summary || "";

  if (res.mode === "baggage_reshuffle") {
    tbody.innerHTML = '<tr>' +
      '<td style="text-align:center"><input type="checkbox" class="dfo-cert-swap-cb" checked /></td>' +
      '<td><strong>Baggage Duty Rotation</strong></td>' +
      '<td>All</td>' +
      '<td>Matched per shift (' + (res.certCountPerShift || 0) + ' certs)</td>' +
      '<td><strong style="color:var(--amber,#d97706)">Reshuffle baggage duty days across work days (resolveBagDuties)</strong></td>' +
      '</tr>';
    return;
  }

  var proposals = res.proposals || [];
  if (!proposals.length) {
    tbody.innerHTML = '<tr><td colspan="5" class="muted" style="text-align:center">No DFO cert moves required. Shift cert counts match.</td></tr>';
    return;
  }

  tbody.innerHTML = proposals.map(function (p, idx) {
    var dL = p.donorLine;
    var rL = p.receiverLine;
    var dShiftName = p.donorShift ? (p.donorShift.name || p.donorShift.id) : "";
    var rShiftName = p.receiverShift ? (p.receiverShift.name || p.receiverShift.id) : "";

    return '<tr data-prop-idx="' + idx + '">' +
      '<td style="text-align:center"><input type="checkbox" class="dfo-cert-swap-cb" checked /></td>' +
      '<td><strong>' + (dL.lineCode || dL.id) + ' → ' + (rL.lineCode || rL.id) + '</strong></td>' +
      '<td><span class="badge" style="background:' + (p.sex === "M" ? "#007bff" : "#e83e8c") + ';color:#fff;padding:0.15rem 0.4rem;border-radius:3px">' + p.sex + '</span></td>' +
      '<td>' + dShiftName + ' (' + (dL.lineCode || dL.id) + ') & ' + rShiftName + ' (' + (rL.lineCode || rL.id) + ')</td>' +
      '<td><strong style="color:var(--amber,#d97706)">' + p.note + '</strong></td>' +
      '</tr>';
  }).join("");
}

export function openGenerateModal(S) {
  var modal = typeof document !== "undefined" ? document.getElementById("generate-modal") : null;
  if (!modal) return;
  modal.style.display = "flex";
  modal.setAttribute("aria-hidden", "false");

  if (S.renderGenerateModalContent) {
    S.renderGenerateModalContent();
  }
}

export function closeGenerateModal(S) {
  var modal = typeof document !== "undefined" ? document.getElementById("generate-modal") : null;
  if (!modal) return;
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
}

function bindModalListeners(S) {
  if (!S || S._generateModalListenersBound) return;
  S._generateModalListenersBound = true;

  function bindClick(id, fn) {
    var el = typeof document !== "undefined" ? document.getElementById(id) : null;
    if (el) el.addEventListener("click", fn);
  }

  bindClick("generate-modal-close", function (e) {
    e.preventDefault();
    closeGenerateModal(S);
  });

  bindClick("btn-generate-modal-done", function (e) {
    e.preventDefault();
    closeGenerateModal(S);
  });

  bindClick("btn-generate-all", function (e) {
    e.preventDefault();
    if (S.generate) S.generate();
    if (S.renderGenerateModalContent) S.renderGenerateModalContent();
  });
}

export function attachGenerateModal(S) {
  if (!S) return;

  S.openGenerateModal = function () {
    bindModalListeners(S);
    openGenerateModal(S);
  };
  S.closeGenerateModal = function () { closeGenerateModal(S); };
  S.getModalClassOptions = function () { return getModalClassOptions(S); };
  S.renderClassButtons = function () { renderClassButtons(S); };
  S.renderTargetControls = function () { renderTargetControls(S); };
  S.renderWeekdayBandsMatrix = function () { renderWeekdayBandsMatrix(S); };
  S.renderParityReportSection = function () { renderParityReportSection(S); };
  S.renderDfoSection = function () { renderDfoSection(S); };

  S.renderGenerateModalContent = function () {
    renderClassButtons(S);
    renderTargetControls(S);
    renderWeekdayBandsMatrix(S);
    renderParityReportSection(S);
    renderDfoSection(S);
  };
}
