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
