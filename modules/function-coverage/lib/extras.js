let api = null;

import {
  ensureExtraList,
  readExtraListFromDom,
  extraCardsHtml,
  buildExtraPositionLines as buildExtraLines,
  normalizeExtraPosition
} from "../../setup-panel/utils/extraPositions.js";

export function bindExtrasApi(scheduler) {
  api = scheduler;
}

export function ensureExtraPositions() {
  return ensureExtraList(api);
}

export function readExtraPositionsFromDom() {
  return readExtraListFromDom(api);
}

export function renderExtraPositions() {
  const host = api.$("extra-pos-list");
  if (!host) return;
  const list = ensureExtraList(api);
  host.innerHTML = extraCardsHtml(list, (api.state && api.state.shifts) || []);
}

export function addExtraPosition(name) {
  readExtraListFromDom(api);
  var list = ensureExtraList(api);
  list.push(normalizeExtraPosition({
    id: "extra-" + Date.now() + "-" + (list.length + 1),
    name: name || "MSTI",
    m: 0,
    f: 0,
    opsFte: false,
    bands: [{ start: "04:00", end: "20:30", min: 1 }],
    shiftCounts: {}
  }, list.length, (api.state && api.state.shifts) || []));
  renderExtraPositions();
}

export function buildExtraPositionLines() {
  return buildExtraLines(api);
}
