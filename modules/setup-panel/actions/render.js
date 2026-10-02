/** Render setup panel and bind one-shot event actions. */
import { syncHoursFromAirfield } from "../utils/sync.js";
import { paintFunctionCoverage } from "./paint.js";

export function renderAll(S) {
  syncHoursFromAirfield(S);
  paintFunctionCoverage(S);
  if (S.renderCrewGroupsUI) S.renderCrewGroupsUI();
  if (S.renderShiftsTable) S.renderShiftsTable();
  if (S.renderExtraPositions) S.renderExtraPositions();
  if (S.renderRdoMatrixModal) S.renderRdoMatrixModal();
  if (S && S.state) {
    var ptLines = S.selectPtTsoLines ? S.selectPtTsoLines(S.state.lines) : [];
    var elShifts = S.getEligiblePtShifts ? S.getEligiblePtShifts(S.state.shifts) : [];
    var reason = "";
    if (ptLines.length === 0) {
      reason = "need at least 1 PT TSO line generated.";
    } else if (elShifts.length < 2) {
      reason = "need at least 2 non-long shifts (paid < 10h).";
    }
    var titleText = reason ? "Rebalance PT TSO shifts: " + reason : "Rebalance PT TSO shifts across non-long shifts.";
    ["btn-rebalance-pt", "btn-rebalance-pt-modal"].forEach(function (id) {
      var btn = document.getElementById(id);
      if (btn) {
        btn.title = titleText;
        btn.disabled = false;
      }
    });
  }
}

function addFcBandClassic(S) {
  if (typeof S.addFcShiftRequirement === "function") {
    S.addFcShiftRequirement();
    return;
  }
  if (typeof S.addFcBand === "function" && S.addFcBand !== addFcBandClassic) {
    S.addFcBand();
    return;
  }
  if (typeof S.readFunctionBandsFromDom === "function") S.readFunctionBandsFromDom();
  if (typeof S.ensureFunctionCoverage === "function") S.ensureFunctionCoverage();
  if (S.renderFunctionShiftsTable) S.renderFunctionShiftsTable();
  else if (S.renderFunctionBandsTable) S.renderFunctionBandsTable();
  if (S.updateFunctionCoveragePreview) S.updateFunctionCoveragePreview();
}

function patchImportCoverage(S) {
  if (!S || S._fcImportPatch || typeof S.applyPayload !== "function") return;
  S._fcImportPatch = true;
  var orig = S.applyPayload;
  S.applyPayload = function (payload) {
    orig.call(S, payload);
    var cfg = payload && (payload.config || payload.legacy || payload);
    var incoming = cfg && cfg.functionCoverage;
    if (incoming && typeof incoming === "object" && S.state) {
      incoming._bandMigrationAttempted = false;
      S.state.functionCoverage = Object.assign(S.state.functionCoverage || {}, incoming);
      if (S.ensureFunctionCoverage) S.ensureFunctionCoverage();
      if (S.fillFunctionCoverageForm) S.fillFunctionCoverageForm();
    }
    if (payload && payload.fte && S.applyFte) S.applyFte(payload.fte);
    var incomingPool = (payload && payload.certPool)
      || (cfg && cfg.certPool)
      || null;
    if (incomingPool && S.state) {
      S.state.certPool = S.normalizeCertPoolConfig
        ? S.normalizeCertPoolConfig(incomingPool)
        : incomingPool;
      if (S.fillCertPoolForm) S.fillCertPoolForm();
    }
    if (S.renderExtraPositions) S.renderExtraPositions();
  };
}

export function bindSetupActions(S) {
  if (!S) return;
  S.addFcBand = S.addFcShiftRequirement || S.addFcBand || function () { addFcBandClassic(S); };
  patchImportCoverage(S);

  S._rebalanceDeltas = {};
  S._rebalanceCurrentClass = "TSO_FT";
  S._rebalanceProposal = null;

  S.openFtRebalanceModal = function () {
    var modal = typeof document !== "undefined" ? document.getElementById("ft-rebalance-modal") : null;
    if (modal) { modal.style.display = "flex"; modal.setAttribute("aria-hidden", "false"); }
    S._rebalanceDeltas = {};
    S._rebalanceProposal = null;
    S.renderFtRebalanceClassSelect();
    S.renderFtRebalanceModal();
  };

  S.closeFtRebalanceModal = function () {
    var modal = typeof document !== "undefined" ? document.getElementById("ft-rebalance-modal") : null;
    if (modal) { modal.style.display = "none"; modal.setAttribute("aria-hidden", "true"); }
    S._rebalanceDeltas = {};
    S._rebalanceProposal = null;
  };

  S.renderFtRebalanceClassSelect = function () {
    var selectEl = typeof document !== "undefined" ? document.getElementById("rebalance-class-select") : null;
    if (!selectEl) return;
    var options = S.getAvailableClasses ? S.getAvailableClasses() : [];
    if (!S._rebalanceCurrentClass) S._rebalanceCurrentClass = "TSO_FT";
    selectEl.innerHTML = options.map(function (opt) {
      var sel = opt.key === S._rebalanceCurrentClass ? " selected" : "";
      return '<option value="' + opt.key + '"' + sel + '>' + opt.label + '</option>';
    }).join("");
  };

  S.renderFtRebalanceModal = function () {
    var tbody = typeof document !== "undefined" ? document.getElementById("rebalance-bands-tbody") : null;
    if (!tbody) return;

    var classKey = S._rebalanceCurrentClass || "TSO_FT";
    var lines = (S.state && S.state.lines) || [];
    var classLines = S.getLinesForClass ? S.getLinesForClass(lines, classKey) : [];
    var shifts = (S.state && S.state.shifts) || [];

    var countsM = {};
    var countsF = {};
    shifts.forEach(function (s) { countsM[s.id] = 0; countsF[s.id] = 0; });
    classLines.forEach(function (l) {
      if (l.sex === "F") countsF[l.shiftId] = (countsF[l.shiftId] || 0) + 1;
      else countsM[l.shiftId] = (countsM[l.shiftId] || 0) + 1;
    });

    var deltas = S._rebalanceDeltas || {};
    var netDelta = 0;

    tbody.innerHTML = shifts.map(function (s) {
      var cM = countsM[s.id] || 0;
      var cF = countsF[s.id] || 0;
      var total = cM + cF;
      var fPct = total > 0 ? Math.round((cF / total) * 100) + "%" : "—";
      var minVal = S.getClassBandMin ? S.getClassBandMin(s, classKey) : "—";
      var dVal = deltas[s.id] || 0;
      netDelta += dVal;

      var labelTime = (s.start || "") + (s.end ? "–" + s.end : "");
      var shiftDisp = "<strong>" + (s.name || s.id) + "</strong>" + (labelTime ? ' <span class="muted">(' + labelTime + ")</span>" : "");

      return '<tr data-shift-id="' + s.id + '">' +
        '<td>' + shiftDisp + '</td>' +
        '<td style="text-align:center">' + minVal + '</td>' +
        '<td style="text-align:center">' + cM + '</td>' +
        '<td style="text-align:center">' + cF + '</td>' +
        '<td style="text-align:center"><strong>' + total + '</strong></td>' +
        '<td style="text-align:center">' + fPct + '</td>' +
        '<td style="text-align:center;white-space:nowrap">' +
          '<button type="button" class="btn btn-sm btn-delta-down" data-shift-id="' + s.id + '" style="padding:0.1rem 0.4rem;margin-right:0.25rem">▼</button>' +
          '<span class="delta-val" style="display:inline-block;width:2rem;font-weight:bold">' + (dVal > 0 ? "+" + dVal : dVal) + '</span>' +
          '<button type="button" class="btn btn-sm btn-delta-up" data-shift-id="' + s.id + '" style="padding:0.1rem 0.4rem;margin-left:0.25rem">▲</button>' +
        '</td>' +
        '</tr>';
    }).join("");

    var netEl = document.getElementById("rebalance-delta-net");
    if (netEl) {
      netEl.textContent = "Net delta: " + (netDelta > 0 ? "+" + netDelta : netDelta);
      netEl.style.color = netDelta === 0 ? "var(--green, #28a745)" : "var(--red, #dc3545)";
    }

    tbody.querySelectorAll(".btn-delta-up").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var sId = btn.getAttribute("data-shift-id");
        S._rebalanceDeltas[sId] = (S._rebalanceDeltas[sId] || 0) + 1;
        S._rebalanceProposal = null;
        S.renderFtRebalanceModal();
      });
    });

    tbody.querySelectorAll(".btn-delta-down").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var sId = btn.getAttribute("data-shift-id");
        S._rebalanceDeltas[sId] = (S._rebalanceDeltas[sId] || 0) - 1;
        S._rebalanceProposal = null;
        S.renderFtRebalanceModal();
      });
    });

    S.renderFtProposalTable();
  };

  S.renderFtProposalTable = function () {
    var wrap = typeof document !== "undefined" ? document.getElementById("rebalance-proposal-wrap") : null;
    var tbody = typeof document !== "undefined" ? document.getElementById("rebalance-proposal-tbody") : null;
    if (!wrap || !tbody) return;

    var propInfo = S._rebalanceProposal;
    if (!propInfo || !propInfo.proposals || !propInfo.proposals.length) {
      wrap.style.display = "none";
      tbody.innerHTML = "";
      return;
    }

    wrap.style.display = "block";
    tbody.innerHTML = propInfo.proposals.map(function (p, idx) {
      var l = p.line;
      var fromName = p.fromShift ? (p.fromShift.name || p.fromShift.id) : "";
      var toName = p.toShift ? (p.toShift.name || p.toShift.id) : "";
      var rBefore = S.formatRdos ? S.formatRdos(p.rdoBefore) : (p.rdoBefore || []).join("-");
      var rAfter = S.formatRdos ? S.formatRdos(p.rdoAfter) : (p.rdoAfter || []).join("-");
      var rAfterJson = JSON.stringify(p.rdoAfter);

      return '<tr data-proposal-idx="' + idx + '" data-line-id="' + l.id + '" data-to-shift-id="' + p.toShift.id + '" data-rdo-after=\'' + rAfterJson + '\'>' +
        '<td style="text-align:center"><input type="checkbox" class="proposal-move-cb" checked /></td>' +
        '<td><strong>' + (l.lineCode || l.id) + '</strong></td>' +
        '<td><span class="badge" style="background:' + (l.sex === "M" ? "#007bff" : "#e83e8c") + ';color:#fff;padding:0.15rem 0.4rem;border-radius:3px">' + (l.sex || "—") + '</span></td>' +
        '<td>' + fromName + '</td>' +
        '<td><strong>' + toName + '</strong></td>' +
        '<td>' + rBefore + '</td>' +
        '<td><strong style="color:var(--amber, #d97706)">' + rAfter + '</strong></td>' +
        '<td><span class="muted">' + (p.note || "") + '</span></td>' +
        '</tr>';
    }).join("");
  };

  function bindOnce(el, type, fn) {
    if (!el || el._spBound) return;
    el._spBound = true;
    el.addEventListener(type, fn);
  }
  var addShiftBtn = document.getElementById("fc-add-band");
  if (addShiftBtn && !addShiftBtn._fcBound) {
    bindOnce(addShiftBtn, "click", function (e) {
      e.preventDefault();
      if (S.addFcShiftRequirement) S.addFcShiftRequirement();
      else if (S.addFcBand) S.addFcBand();
    });
  }
  bindOnce(document.getElementById("btn-add-position"), "click", function (e) {
    e.preventDefault();
    if (S.addExtraPosition) S.addExtraPosition("MSTI");
  });
  bindOnce(document.getElementById("btn-add-shift"), "click", function (e) {
    e.preventDefault();
    if (S.addShift) S.addShift();
  });
  bindOnce(document.getElementById("btn-add-crew-group"), "click", function (e) {
    e.preventDefault();
    var input = document.getElementById("cg-name-input");
    var name = input ? input.value.trim() : "";
    if (!name) name = "Group " + ((S.state.shiftCrewGroups || []).length + 1);
    var id = "cg_" + Date.now();
    S.state.shiftCrewGroups = S.state.shiftCrewGroups || [];
    S.state.shiftCrewGroups.push({ id: id, name: name, shiftIds: [] });
    if (input) input.value = "";
    if (S.renderCrewGroupsUI) S.renderCrewGroupsUI();
    if (S.renderShiftsTable) S.renderShiftsTable();
  });
  bindOnce(document.getElementById("btn-rdo-matrix"), "click", function (e) {
    e.preventDefault();
    if (S.openRdoMatrixModal) S.openRdoMatrixModal();
  });
  bindOnce(document.getElementById("rdo-matrix-close"), "click", function (e) {
    e.preventDefault();
    if (S.closeRdoMatrixModal) S.closeRdoMatrixModal();
  });
  bindOnce(document.getElementById("rdo-matrix-pos-select"), "change", function () {
    if (S.renderRdoMatrixModal) S.renderRdoMatrixModal();
  });
  bindOnce(document.getElementById("btn-rdo-export-all"), "click", function (e) {
    e.preventDefault();
    if (S.exportAllRdoMatrixCsv) S.exportAllRdoMatrixCsv();
  });
  function handleRebalanceClick(e) {
    if (e) e.preventDefault();
    if (typeof S.rebalancePtTsoShifts !== "function") {
      var err = "Setup rebalance PT failed to attach — check console.";
      if (S.updateStatus) S.updateStatus(err);
      if (typeof window !== "undefined" && window.alert) window.alert(err);
      return;
    }
    var ptLines = S.selectPtTsoLines ? S.selectPtTsoLines(S.state ? S.state.lines : []) : [];
    var elShifts = S.getEligiblePtShifts ? S.getEligiblePtShifts(S.state ? S.state.shifts : []) : [];
    if (ptLines.length === 0) {
      var r1 = "Rebalance PT TSO shifts: Need at least 1 PT TSO line generated.";
      if (S.updateStatus) S.updateStatus(r1);
      if (typeof window !== "undefined" && window.alert) window.alert(r1);
      return;
    }
    if (elShifts.length < 2) {
      var r2 = "Rebalance PT TSO shifts: Need at least 2 non-long shifts (paid < 10h).";
      if (S.updateStatus) S.updateStatus(r2);
      if (typeof window !== "undefined" && window.alert) window.alert(r2);
      return;
    }
    S.rebalancePtTsoShifts();
  }

  bindOnce(document.getElementById("btn-rebalance-pt"), "click", handleRebalanceClick);
  bindOnce(document.getElementById("btn-rebalance-pt-modal"), "click", handleRebalanceClick);

  function handleFtRebalanceClick(e) {
    if (e) e.preventDefault();
    if (typeof S.openFtRebalanceModal !== "function") {
      var err = "Setup rebalance shifts failed to attach — check console.";
      if (S.updateStatus) S.updateStatus(err);
      if (typeof window !== "undefined" && window.alert) window.alert(err);
      return;
    }
    S.openFtRebalanceModal();
  }

  bindOnce(document.getElementById("btn-rebalance-ft"), "click", handleFtRebalanceClick);
  bindOnce(document.getElementById("btn-rebalance-ft-modal"), "click", handleFtRebalanceClick);
  bindOnce(document.getElementById("ft-rebalance-close"), "click", function (e) {
    e.preventDefault();
    if (S.closeFtRebalanceModal) S.closeFtRebalanceModal();
  });
  bindOnce(document.getElementById("btn-ft-cancel"), "click", function (e) {
    e.preventDefault();
    if (S.closeFtRebalanceModal) S.closeFtRebalanceModal();
  });

  bindOnce(document.getElementById("rebalance-class-select"), "change", function (e) {
    S._rebalanceCurrentClass = e.target.value;
    S._rebalanceDeltas = {};
    S._rebalanceProposal = null;
    S.renderFtRebalanceModal();
  });

  bindOnce(document.getElementById("btn-rebalance-propose"), "click", function (e) {
    e.preventDefault();
    var classKey = S._rebalanceCurrentClass || "TSO_FT";
    var deltas = S._rebalanceDeltas || {};
    if (S.proposeClassMoves) {
      var res = S.proposeClassMoves(classKey, deltas);
      if (res.error) {
        if (S.updateStatus) S.updateStatus(res.error);
        if (typeof window !== "undefined" && window.alert) window.alert(res.error);
        return;
      }
      S._rebalanceProposal = res;
      S.renderFtProposalTable();
    }
  });

  bindOnce(document.getElementById("btn-ft-select-all"), "click", function (e) {
    e.preventDefault();
    document.querySelectorAll(".proposal-move-cb").forEach(function (cb) { cb.checked = true; });
  });
  bindOnce(document.getElementById("btn-ft-clear-all"), "click", function (e) {
    e.preventDefault();
    document.querySelectorAll(".proposal-move-cb").forEach(function (cb) { cb.checked = false; });
  });

  bindOnce(document.getElementById("btn-do-ft-rebalance"), "click", function (e) {
    e.preventDefault();
    var moves = [];
    document.querySelectorAll("#rebalance-proposal-tbody tr[data-line-id]").forEach(function (tr) {
      var cb = tr.querySelector(".proposal-move-cb");
      if (cb && cb.checked) {
        var rdoAfterRaw = tr.getAttribute("data-rdo-after");
        var rdoAfter = [];
        try { rdoAfter = JSON.parse(rdoAfterRaw); } catch (err) {}
        moves.push({
          lineId: tr.getAttribute("data-line-id"),
          targetShiftId: tr.getAttribute("data-to-shift-id"),
          rdoAfter: rdoAfter
        });
      }
    });
    if (!moves.length) {
      if (S.updateStatus) S.updateStatus("No moves checked to approve.");
      return;
    }
    if (S.approveClassRebalance) {
      var ok = S.approveClassRebalance(moves);
      if (ok) {
        S._rebalanceDeltas = {};
        S._rebalanceProposal = null;
        S.renderFtRebalanceModal();
      }
    }
  });

  bindOnce(document.getElementById("btn-rdo-respin-open"), "click", function (e) {
    e.preventDefault();
    if (S.openRdoRespinModal) S.openRdoRespinModal();
  });
  bindOnce(document.getElementById("rdo-respin-close"), "click", function (e) {
    e.preventDefault();
    if (S.closeRdoRespinModal) S.closeRdoRespinModal();
  });
  bindOnce(document.getElementById("btn-respin-cancel"), "click", function (e) {
    e.preventDefault();
    if (S.closeRdoRespinModal) S.closeRdoRespinModal();
  });
  bindOnce(document.getElementById("btn-respin-select-all"), "click", function (e) {
    e.preventDefault();
    document.querySelectorAll(".respin-slice-cb").forEach(function (cb) { cb.checked = true; });
  });
  bindOnce(document.getElementById("btn-respin-clear-all"), "click", function (e) {
    e.preventDefault();
    document.querySelectorAll(".respin-slice-cb").forEach(function (cb) { cb.checked = false; });
  });
  bindOnce(document.getElementById("btn-do-respin"), "click", function (e) {
    e.preventDefault();
    var selected = [];
    document.querySelectorAll(".respin-slice-cb:checked").forEach(function (cb) {
      var key = cb.getAttribute("data-slice-key");
      if (key) selected.push(key);
    });
    if (!selected.length) {
      if (S.updateStatus) S.updateStatus("No slices selected for respin.");
      return;
    }
    if (S.respinSelectedSlices) S.respinSelectedSlices(selected);
    if (S.closeRdoRespinModal) S.closeRdoRespinModal();
  });
  bindOnce(document.getElementById("btn-save-staffing"), "click", function () {
    if (S.exportStaffingConfig) S.exportStaffingConfig();
  });

  bindOnce(document.getElementById("btn-generate"), "click", function (e) {
    e.preventDefault();
    if (S.generate) S.generate();
  });
  bindOnce(document.getElementById("btn-export"), "click", function (e) {
    e.preventDefault();
    if (S.exportJson) S.exportJson();
  });
  bindOnce(document.getElementById("btn-import"), "click", function (e) {
    e.preventDefault();
    var fileInput = document.getElementById("file-import");
    if (fileInput) { fileInput.value = ""; fileInput.click(); }
  });
  bindOnce(document.getElementById("btn-clear"), "click", function (e) {
    e.preventDefault();
    if (S.clearAll) S.clearAll();
  });
  bindOnce(document.getElementById("file-import"), "change", function (event) {
    var file = event.target.files && event.target.files[0];
    if (S.importJsonFile) S.importJsonFile(file);
  });
}
