let api = null;

import { ensureFunctionCoverage, bagPoolTotal, dfoPoolTotal } from "./pools.js";
import { computeShiftAnchors } from "./duty.js";
import {
  getShiftRequirement, setShiftRequirement, emptyRequirements,
  configuredShiftIdsFromRequirements, formatRequirementDiagnostic, num0
} from "./shifts.js";
import {
  bindExtrasApi,
  ensureExtraPositions,
  readExtraPositionsFromDom,
  renderExtraPositions,
  addExtraPosition,
  buildExtraPositionLines
} from "./extras.js";

export {
  ensureExtraPositions,
  readExtraPositionsFromDom,
  renderExtraPositions,
  addExtraPosition,
  buildExtraPositionLines
};

export function bindBandsApi(scheduler) {
  api = scheduler;
  bindExtrasApi(scheduler);
}

function setVal(id, v) { const el = api.$(id); if (el) el.value = v; }
function setChk(id, v) { const el = api.$(id); if (el) el.checked = !!v; }
function readNum(id) { const el = api.$(id); return el ? num0(el.value) : null; }

export function syncFunctionModeUi() {
  const fc = ensureFunctionCoverage();
  setVal("fc-pool-bag-stso-m", fc.poolStsoBagM); setVal("fc-pool-bag-stso-f", fc.poolStsoBagF);
  setVal("fc-pool-bag-ltso-m", fc.poolLtsoBagM); setVal("fc-pool-bag-ltso-f", fc.poolLtsoBagF);
  setVal("fc-pool-bag-tso-m", fc.poolTsoBagM); setVal("fc-pool-bag-tso-f", fc.poolTsoBagF);
  setVal("fc-pool-dfo-stso-m", fc.poolStsoDfoM); setVal("fc-pool-dfo-stso-f", fc.poolStsoDfoF);
  setVal("fc-pool-dfo-ltso-m", fc.poolLtsoDfoM); setVal("fc-pool-dfo-ltso-f", fc.poolLtsoDfoF);
  setVal("fc-pool-dfo-tso-m", fc.poolTsoDfoM); setVal("fc-pool-dfo-tso-f", fc.poolTsoDfoF);
  const wrap = api.$("fc-bands-wrap");
  const add = api.$("fc-add-band");
  if (wrap) wrap.style.display = "";
  if (add) add.style.display = "";
}

export function fillFunctionCoverageForm() {
  const fc = ensureFunctionCoverage();
  setVal("fc-phase-thr", fc.phaseThresholdMin); setChk("fc-ampm-split", fc.amPmSplit);
  setVal("fc-bias", fc.bias || "none");
  syncFunctionModeUi();
  renderFunctionShiftsTable();
  updateFunctionCoveragePreview();
  if (renderExtraPositions) renderExtraPositions();
}

export function openFunctionCoverageModal() {
  fillFunctionCoverageForm();
  const modal = api.$("func-coverage-modal");
  if (modal) modal.style.display = "block";
}

export function closeFunctionCoverageModal() {
  const modal = api.$("func-coverage-modal");
  if (modal) modal.style.display = "none";
}

function syncDerivedMode(fc) {
  var bag = bagPoolTotal(fc) > 0, dfo = dfoPoolTotal(fc) > 0;
  fc.poolBag = bagPoolTotal(fc);
  fc.poolStsoDfo = num0(fc.poolStsoDfoM) + num0(fc.poolStsoDfoF);
  fc.poolLtsoDfo = num0(fc.poolLtsoDfoM) + num0(fc.poolLtsoDfoF);
  fc.poolTsoDfo = num0(fc.poolTsoDfoM) + num0(fc.poolTsoDfoF);
  fc.mode = bag && dfo ? "both" : bag ? "bag" : dfo ? "dfo" : "none";
  return fc.mode;
}

function shiftOptionLabel(s) {
  return String(s.name || s.id || "") + " (" + (s.start || "?") + "–" + (s.end || "?") + ")";
}

export function renderFunctionShiftsTable() {
  const tbody = api.$("fc-bands-tbody"); if (!tbody) return;
  const table = tbody.closest("table");
  const thead = table && table.querySelector("thead");
  if (thead) {
    thead.innerHTML = "<tr><th>Shift</th><th>Start</th><th>End</th><th>STSO min</th><th>STSO max</th><th>LTSO min</th><th>LTSO max</th><th>TSO min</th><th>TSO max</th><th></th></tr>";
  }
  const fc = ensureFunctionCoverage();
  const shifts = api.state.shifts || [];
  const ids = configuredShiftIdsFromRequirements(fc);
  tbody.innerHTML = ids.map(function (shiftId, i) {
    const sh = api.getShift ? api.getShift(shiftId) : null;
    const start = sh ? sh.start : "—";
    const end = sh ? sh.end : "—";
    function num(role, key) {
      var rec = getShiftRequirement(role, shiftId, fc);
      return '<td><input type="number" min="0" max="99" data-fc-req="' + i + '" data-fc-field="' + role + "-" + key + '" value="' + rec[key] + '" style="width:3.5rem"></td>';
    }
    var opts = shifts.map(function (s) {
      return '<option value="' + String(s.id).replace(/"/g, "") + '"' + (String(s.id) === String(shiftId) ? " selected" : "") + ">" +
        shiftOptionLabel(s).replace(/</g, "<") + "</option>";
    }).join("");
    if (!sh) {
      opts = '<option value="' + String(shiftId).replace(/"/g, "") + '" selected>' +
        String(shiftId).replace(/</g, "<") + " (missing)</option>" + opts;
    }
    return "<tr>" +
      '<td><select data-fc-req="' + i + '" data-fc-field="shiftId">' + opts + "</select></td>" +
      '<td class="muted">' + start + "</td>" +
      '<td class="muted">' + end + "</td>" +
      num("STSO", "min") + num("STSO", "max") +
      num("LTSO", "min") + num("LTSO", "max") +
      num("TSO", "min") + num("TSO", "max") +
      '<td><button type="button" class="btn btn-red btn-sm" data-fc-remove="' + i + '">\u2715</button></td></tr>';
  }).join("");
}

export function renderFunctionBandsTable() {
  return renderFunctionShiftsTable();
}

function readPoolsAndTools(fc) {
  function take(id, key) { var n = readNum(id); if (n != null) fc[key] = n; }
  take("fc-pool-bag-stso-m", "poolStsoBagM"); take("fc-pool-bag-stso-f", "poolStsoBagF");
  take("fc-pool-bag-ltso-m", "poolLtsoBagM"); take("fc-pool-bag-ltso-f", "poolLtsoBagF");
  take("fc-pool-bag-tso-m", "poolTsoBagM"); take("fc-pool-bag-tso-f", "poolTsoBagF");
  take("fc-pool-dfo-stso-m", "poolStsoDfoM"); take("fc-pool-dfo-stso-f", "poolStsoDfoF");
  take("fc-pool-dfo-ltso-m", "poolLtsoDfoM"); take("fc-pool-dfo-ltso-f", "poolLtsoDfoF");
  take("fc-pool-dfo-tso-m", "poolTsoDfoM"); take("fc-pool-dfo-tso-f", "poolTsoDfoF");
  syncDerivedMode(fc);
  const thr = api.$("fc-phase-thr"), split = api.$("fc-ampm-split");
  if (thr) fc.phaseThresholdMin = num0(thr.value || 15);
  if (split) fc.amPmSplit = !!split.checked;
  const biasEl = api.$("fc-bias");
  if (biasEl) {
    var v = biasEl.value;
    if (v === "male" || v === "female" || v === "none") fc.bias = v;
    else fc.bias = "none";
  }
}

export function readFunctionCoverageFromDom() {
  const fc = ensureFunctionCoverage();
  readPoolsAndTools(fc);
  const tbody = api.$("fc-bands-tbody");
  if (!tbody) return fc;
  const selects = tbody.querySelectorAll('[data-fc-req][data-fc-field="shiftId"]');
  if (!selects.length) return fc;
  const ids = [];
  const seen = {};
  const next = emptyRequirements();
  selects.forEach(function (sel) {
    var i = +sel.getAttribute("data-fc-req");
    var shiftId = sel.value;
    if (!shiftId || seen[shiftId]) return;
    seen[shiftId] = true;
    ids.push(shiftId);
    ["STSO", "LTSO", "TSO"].forEach(function (role) {
      var minEl = tbody.querySelector('[data-fc-req="' + i + '"][data-fc-field="' + role + '-min"]');
      var maxEl = tbody.querySelector('[data-fc-req="' + i + '"][data-fc-field="' + role + '-max"]');
      var min = minEl ? num0(minEl.value) : 0;
      var max = maxEl ? num0(maxEl.value) : min;
      if (max < min) max = min;
      next[role][shiftId] = { min: min, max: max };
    });
  });
  fc.requirements = next;
  fc.requirementShiftIds = ids;
  return fc;
}

export function readFunctionBandsFromDom() {
  return readFunctionCoverageFromDom();
}

export function addFcShiftRequirement(shiftId) {
  readFunctionCoverageFromDom();
  const fc = ensureFunctionCoverage();
  const shifts = (api.state && api.state.shifts) || [];
  const used = configuredShiftIdsFromRequirements(fc);
  var id = shiftId;
  if (!id) {
    for (var i = 0; i < shifts.length; i++) {
      if (used.indexOf(String(shifts[i].id)) < 0) { id = shifts[i].id; break; }
    }
  }
  if (!id) {
    if (api.updateStatus) api.updateStatus("All shifts are already listed, or no shifts are defined.");
    return fc;
  }
  id = String(id);
  if (used.indexOf(id) >= 0) return fc;
  fc.requirementShiftIds = used.concat([id]);
  ["STSO", "LTSO", "TSO"].forEach(function (role) {
    setShiftRequirement(role, id, 0, 0, fc);
  });
  renderFunctionShiftsTable();
  updateFunctionCoveragePreview();
  return fc;
}

export function addFcBand() {
  return addFcShiftRequirement();
}

export function updateFunctionCoveragePreview() {
  const el = api.$("fc-preview"); if (!el) return;
  const fc = ensureFunctionCoverage();
  const anchors = computeShiftAnchors();
  const ids = configuredShiftIdsFromRequirements(fc);
  const reqTxt = ids.map(function (shiftId) {
    var sh = api.getShift ? api.getShift(shiftId) : null;
    var stso = getShiftRequirement("STSO", shiftId, fc);
    var ltso = getShiftRequirement("LTSO", shiftId, fc);
    var tso = getShiftRequirement("TSO", shiftId, fc);
    return (sh ? (sh.name || shiftId) + " " + sh.start + "–" + sh.end : shiftId) +
      " STSO " + stso.min + "\u2013" + stso.max +
      " LTSO " + ltso.min + "\u2013" + ltso.max +
      " TSO " + tso.min + "\u2013" + tso.max;
  }).join(" | ");
  var diag = (fc.lastDiagnostics || []).map(formatRequirementDiagnostic).join(" \u00b7 ");
  var legacy = (Array.isArray(fc.bands) && fc.bands.length)
    ? " \u00b7 " + fc.bands.length + " unmapped legacy band(s) retained"
    : "";
  el.textContent = "BAG STSO " + fc.poolStsoBagM + "/" + fc.poolStsoBagF +
    " LTSO " + fc.poolLtsoBagM + "/" + fc.poolLtsoBagF +
    " TSO " + fc.poolTsoBagM + "/" + fc.poolTsoBagF +
    " \u00b7 DFO STSO " + fc.poolStsoDfoM + "/" + fc.poolStsoDfoF +
    " LTSO " + fc.poolLtsoDfoM + "/" + fc.poolLtsoDfoF +
    " TSO " + fc.poolTsoDfoM + "/" + fc.poolTsoDfoF +
    " \u00b7 AM " + (api.slotLabel ? api.slotLabel(anchors.am) : "") +
    " PM " + (api.slotLabel ? api.slotLabel(anchors.pm) : "") +
    " " + (reqTxt || "no shift requirements") +
    (diag ? " \u00b7 " + diag : "") +
    legacy;
}

export function bindFunctionCoverageUi() {
  var addBandEl = api.$("fc-add-band");
  if (api._funcCoverageBound && addBandEl && addBandEl._fcBound) return;
  if (!api.$("fc-bands-tbody")) return;
  api._funcCoverageBound = true;
  api.addFcShiftRequirement = addFcShiftRequirement;
  api.addFcBand = addFcShiftRequirement;
  api.renderFunctionShiftsTable = renderFunctionShiftsTable;

  ensureFunctionCoverage();
  ensureExtraPositions();

  fillFunctionCoverageForm();
  renderFunctionShiftsTable();
  updateFunctionCoveragePreview();
  renderExtraPositions();

  var el;
  el = api.$("btn-open-func-coverage");
  if (el) el.addEventListener("click", function () { openFunctionCoverageModal(); });
  el = api.$("func-coverage-close");
  if (el) el.addEventListener("click", function () { closeFunctionCoverageModal(); });
  el = api.$("fc-cancel");
  if (el) el.addEventListener("click", function () { closeFunctionCoverageModal(); });
  el = api.$("fc-save");
  if (el) el.addEventListener("click", function () {
    readFunctionCoverageFromDom();
    syncFunctionModeUi();
    renderFunctionShiftsTable();
    updateFunctionCoveragePreview();
    if (api.updateStatus) api.updateStatus("Function coverage settings saved.");
  });

  el = api.$("fc-add-band");
  if (el && !el._fcBound && !el._spBound) {
    el._fcBound = true;
    el.addEventListener("click", function (e) {
      e.preventDefault();
      addFcShiftRequirement();
    });
  }

  if (!api._funcDocBound) {
    api._funcDocBound = true;
    document.addEventListener("click", function (e) {
      var t = e.target;
      if (!t) return;
      if (t.getAttribute && t.getAttribute("data-fc-remove") != null) {
        readFunctionCoverageFromDom();
        var idx = +t.getAttribute("data-fc-remove");
        var fc = ensureFunctionCoverage();
        var ids = configuredShiftIdsFromRequirements(fc);
        if (idx >= 0 && idx < ids.length) {
          var removed = ids.splice(idx, 1)[0];
          fc.requirementShiftIds = ids;
          ["STSO", "LTSO", "TSO"].forEach(function (role) {
            if (fc.requirements[role]) delete fc.requirements[role][removed];
          });
        }
        renderFunctionShiftsTable();
        updateFunctionCoveragePreview();
      }
    });
    document.addEventListener("change", function (e) {
      var t = e.target;
      if (!t) return;
      if ((t.getAttribute && t.getAttribute("data-fc-req") != null) || (t.id && t.id.indexOf("fc-") === 0)) {
        readFunctionCoverageFromDom();
        if (t.getAttribute("data-fc-field") === "shiftId") renderFunctionShiftsTable();
        updateFunctionCoveragePreview();
      }
    });
  }

  el = api.$("btn-add-position");
  if (el && !el._extraBound) {
    el._extraBound = true;
    el.addEventListener("click", function (e) {
      e.preventDefault();
      addExtraPosition("MSTI");
    });
  }

  if (!api._extraDocBound) {
    api._extraDocBound = true;
    document.addEventListener("click", function (e) {
      var t = e.target;
      if (!t || !t.getAttribute) return;
      var rem = t.getAttribute("data-extra-remove");
      if (rem != null) {
        readExtraPositionsFromDom();
        api.state.extraPositions = ensureExtraPositions().filter(function (p) { return p.id !== rem; });
        renderExtraPositions();
        return;
      }
      var addBand = t.getAttribute("data-extra-add-band");
      if (addBand != null) {
        readExtraPositionsFromDom();
        var list = ensureExtraPositions();
        var pos = null;
        for (var i = 0; i < list.length; i++) if (list[i].id === addBand) pos = list[i];
        if (pos) {
          if (!Array.isArray(pos.bands)) pos.bands = [];
          pos.bands.push({ start: "12:00", end: "16:00", min: 0 });
        }
        renderExtraPositions();
        return;
      }
      var bandRem = t.getAttribute("data-extra-band-remove");
      var bi = t.getAttribute("data-extra-bi");
      if (bandRem != null && bi != null) {
        readExtraPositionsFromDom();
        var plist = ensureExtraPositions();
        var p = null;
        for (var j = 0; j < plist.length; j++) if (plist[j].id === bandRem) p = plist[j];
        if (p && Array.isArray(p.bands)) p.bands.splice(+bi, 1);
        renderExtraPositions();
      }
    });
    document.addEventListener("change", function (e) {
      var t = e.target;
      if (!t || !t.getAttribute) return;
      if (t.getAttribute("data-extra-name") != null || t.getAttribute("data-extra-m") != null || t.getAttribute("data-extra-f") != null || t.getAttribute("data-extra-band") != null) {
        readExtraPositionsFromDom();
      }
    });
  }
}
