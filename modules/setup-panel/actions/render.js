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

  S.openFtRebalanceModal = function () {
    var modal = typeof document !== "undefined" ? document.getElementById("ft-rebalance-modal") : null;
    if (modal) { modal.style.display = "flex"; modal.setAttribute("aria-hidden", "false"); }
    S.renderFtRebalanceModal();
  };

  S.closeFtRebalanceModal = function () {
    var modal = typeof document !== "undefined" ? document.getElementById("ft-rebalance-modal") : null;
    if (modal) { modal.style.display = "none"; modal.setAttribute("aria-hidden", "true"); }
  };

  S.renderFtRebalanceModal = function () {
    var tbody = typeof document !== "undefined" ? document.getElementById("ft-rebalance-tbody") : null;
    if (!tbody) return;

    var info = S.getFtRebalanceCandidates ? S.getFtRebalanceCandidates() : { candidates: [], shifts: [], isEven: true };

    if (info.isEven || !info.candidates.length) {
      tbody.innerHTML = '<tr><td colspan="6" class="muted" style="text-align:center;padding:1rem">FT TSO already even across shifts by sex.</td></tr>';
      return;
    }

    var shifts = info.shifts || [];

    tbody.innerHTML = info.candidates.map(function (item) {
      var l = item.line;
      var currShiftName = item.currentShift ? (item.currentShift.name || item.currentShift.id) : (l.shiftName || l.shiftId);
      var optionsHtml = shifts.map(function (s) {
        var sel = s.id === item.recommendedShiftId ? " selected" : "";
        return '<option value="' + s.id + '"' + sel + '>' + (s.name || s.id) + '</option>';
      }).join("");

      return '<tr data-line-id="' + l.id + '">' +
        '<td style="text-align:center"><input type="checkbox" class="ft-candidate-cb" data-line-id="' + l.id + '" checked /></td>' +
        '<td><strong>' + (l.lineCode || l.id) + '</strong></td>' +
        '<td>' + currShiftName + '</td>' +
        '<td><span class="badge" style="background:' + (l.sex === "M" ? "#007bff" : "#e83e8c") + ';color:#fff;padding:0.15rem 0.4rem;border-radius:3px">' + (l.sex || "—") + '</span></td>' +
        '<td>' + (l.paid || 8) + 'h</td>' +
        '<td><select class="ft-target-select" data-line-id="' + l.id + '" style="padding:0.2rem 0.4rem;font-size:0.85rem">' + optionsHtml + '</select></td>' +
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
    if (typeof S.getFtRebalanceCandidates !== "function" || typeof S.openFtRebalanceModal !== "function") {
      var err = "Setup rebalance FT failed to attach — check console.";
      if (S.updateStatus) S.updateStatus(err);
      if (typeof window !== "undefined" && window.alert) window.alert(err);
      return;
    }
    var info = S.getFtRebalanceCandidates();
    if (info.isEven || !info.candidates.length) {
      var msg = "FT TSO already even across shifts.";
      if (S.updateStatus) S.updateStatus(msg);
      if (typeof window !== "undefined" && window.alert) window.alert(msg);
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
  bindOnce(document.getElementById("btn-ft-select-all"), "click", function (e) {
    e.preventDefault();
    document.querySelectorAll(".ft-candidate-cb").forEach(function (cb) { cb.checked = true; });
  });
  bindOnce(document.getElementById("btn-ft-clear-all"), "click", function (e) {
    e.preventDefault();
    document.querySelectorAll(".ft-candidate-cb").forEach(function (cb) { cb.checked = false; });
  });
  bindOnce(document.getElementById("btn-do-ft-rebalance"), "click", function (e) {
    e.preventDefault();
    var moves = [];
    document.querySelectorAll("#ft-rebalance-tbody tr[data-line-id]").forEach(function (tr) {
      var cb = tr.querySelector(".ft-candidate-cb");
      var sel = tr.querySelector(".ft-target-select");
      if (cb && cb.checked && sel) {
        moves.push({
          lineId: tr.getAttribute("data-line-id"),
          targetShiftId: sel.value
        });
      }
    });
    if (!moves.length) {
      if (S.updateStatus) S.updateStatus("No FT TSO lines checked for move.");
      return;
    }
    if (S.approveFtRebalance) S.approveFtRebalance(moves);
    if (S.closeFtRebalanceModal) S.closeFtRebalanceModal();
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
