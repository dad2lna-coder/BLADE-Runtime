let api = null;

import { ensureFunctionCoverage, bagPoolTotal, dfoPoolTotal } from "./pools.js";
import { computeShiftAnchors } from "./duty.js";
import {
  getShiftRequirement, setShiftRequirement, emptyRequirements,
  configuredShiftIdsFromRequirements, formatRequirementDiagnostic, num0
} from "./shifts.js";

export function bindBandsApi(scheduler) {
  api = scheduler;
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
  setVal("fc-pool-dfo-pt", fc.poolTsoDfoPt);
  const wrap = api.$("fc-bands-wrap");
  const add = api.$("fc-add-band");
  if (wrap) wrap.style.display = "";
  if (add) add.style.display = "";
}
