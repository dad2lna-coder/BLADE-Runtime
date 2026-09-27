export function computeShiftAnchors(S) {
  var starts = {};
  (S.state.lines || []).forEach(function (l) {
    var sh = S.getShift(l.shiftId);
    if (!sh) return;
    var m = S.timeToMin(sh.start);
    starts[m] = (starts[m] || 0) + 1;
  });
  var entries = Object.keys(starts)
    .map(function (k) {
      return { min: +k, n: starts[k] };
    })
    .sort(function (a, b) {
      return a.min - b.min;
    });
  if (!entries.length) return { am: 8 * 60, pm: 14 * 60 };
  var am = entries[0].min;
  var amN = 0;
  entries.forEach(function (e) {
    if (e.min < 12 * 60 && e.n > amN) {
      amN = e.n;
      am = e.min;
    }
  });
  var pm = entries[entries.length - 1].min;
  var pmN = 0;
  entries.forEach(function (e) {
    if (e.min >= 12 * 60 && e.n > pmN) {
      pmN = e.n;
      pm = e.min;
    }
  });
  return { am: am, pm: pm };
}

export function phaseOfStart(startMin, anchors, threshold) {
  threshold = threshold != null ? threshold : 30;
  if (startMin <= anchors.am - threshold && startMin < 11 * 60) return "Opening";
  if (startMin < anchors.pm - threshold) return "AM";
  if (startMin <= anchors.pm + threshold) return "PM";
  return "Closing";
}

export function renderGenderBalanceReports(S) {
  var el = S.$("report-gender");
  if (!el) return;
  if (!S.state.lines || !S.state.lines.length) {
    el.innerHTML = '<p class="muted">Generate a schedule first.</p>';
    return;
  }
  var thr = S.reportsView.phaseThresholdMin || 30;
  var skewThr = S.reportsView.skewThreshold || 5;
  var anchors = S.computeShiftAnchors();

  var totalM = 0;
  var totalF = 0;
  S.state.lines.forEach(function (l) {
    if (l.sex === "F") totalF++;
    else totalM++;
  });
  var overallFPct = totalM + totalF ? Math.round((100 * totalF) / (totalM + totalF)) : 0;

  var phases = ["Opening", "AM", "PM", "Closing"];
  var phaseDay = {};
  phases.forEach(function (p) {
    phaseDay[p] = [0, 1, 2, 3, 4, 5, 6].map(function () {
      return { M: 0, F: 0 };
    });
  });

  var base = S.state.startDate ? S.state.startDate : (S.parseStartDate ? S.parseStartDate(null) : null);
  var dowToOffset = {};
  var days = Math.min(7, (S.state.weekCount || 1) * 7);
  for (var off = 0; off < days; off++) {
    var dow;
    if (base && typeof base.add === "function") dow = base.add(off, "day").day();
    else dow = off % 7;
    if (dowToOffset[dow] == null) dowToOffset[dow] = off;
  }
  for (var d0 = 0; d0 < 7; d0++) {
    if (dowToOffset[d0] == null) dowToOffset[d0] = d0 % Math.max(1, days);
  }

  S.state.lines.forEach(function (l) {
    var sh = S.getShift(l.shiftId);
    if (!sh) return;
    var phase;
    if (sh.phase && sh.phase !== "auto") {
      var map = { opening: "Opening", am: "AM", pm: "PM", closing: "Closing" };
      phase = map[sh.phase] || "AM";
    } else {
      phase = S.phaseOfStart(S.timeToMin(sh.start), anchors, thr);
    }
    var sex = l.sex === "F" ? "F" : "M";
    for (var dow = 0; dow < 7; dow++) {
      var off = dowToOffset[dow];
      if (off == null) continue;
      if ((S.state.schedule[l.id] || [])[off] !== "WORK") continue;
      phaseDay[phase][dow][sex]++;
    }
  });

  var daysArr = S.DAYS || ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  var html =
    '<h3 class="section-title">Gender balance by shift phase</h3>' +
    '<p class="muted">AM anchor ' +
    S.slotLabel(anchors.am) +
    " \u00b7 PM anchor " +
    S.slotLabel(anchors.pm) +
    " \u00b7 threshold \u00b1" +
    thr +
    " min \u00b7 overall F% " +
    overallFPct +
    " \u00b7 skew flag >" +
    skewThr +
    " pts</p>" +
    '<div class="lines-scroll"><table class="data-table"><thead><tr><th>Phase</th>';
  for (var d = 0; d < 7; d++) html += "<th>" + daysArr[d] + "</th>";
  html += "</tr></thead><tbody>";
  phases.forEach(function (p) {
    html += "<tr><td><strong>" + p + "</strong></td>";
    for (var d = 0; d < 7; d++) {
      var cell = phaseDay[p][d];
      var t = cell.M + cell.F;
      var fPct = t ? Math.round((100 * cell.F) / t) : 0;
      var skew = Math.abs(fPct - overallFPct) > skewThr;
      html +=
        "<td class=\"" +
        (skew ? "hc-high" : "") +
        '\">' +
        fPct +
        "% F" +
        (skew ? " \u26a0" : "") +
        " <span class=\"muted\">(" +
        cell.M +
        "M/" +
        cell.F +
        "F)</span></td>";
    }
    html += "</tr>";
  });
  html += "</tbody></table></div>";

  var dfoAM = { M: 0, F: 0 };
  var dfoPM = { M: 0, F: 0 };
  S.state.lines.forEach(function (l) {
    var elig = l.functionEligible || {};
    if (!elig.dfo) return;
    var sh = S.getShift(l.shiftId);
    if (!sh) return;
    var start = S.timeToMin(sh.start);
    var sex = l.sex === "F" ? "F" : "M";
    var thr = (S.state.functionCoverage && S.state.functionCoverage.phaseThresholdMin) || 15;
    if (S.isAmSide ? S.isAmSide(start, anchors, thr) : start < anchors.pm) dfoAM[sex]++;
    else dfoPM[sex]++;
  });
  function pctF(b) {
    var t = b.M + b.F;
    return t ? Math.round((100 * b.F) / t) : 0;
  }
  html +=
    '<h3 class="section-title" style="margin-top:1rem">DFO certified pool by AM/PM</h3>' +
    '<table class="data-table"><thead><tr><th>Window</th><th>Male</th><th>Female</th><th>F%</th></tr></thead><tbody>' +
    "<tr><td>AM (start before " +
    S.slotLabel(anchors.pm) +
    ")</td><td>" +
    dfoAM.M +
    "</td><td>" +
    dfoAM.F +
    "</td><td>" +
    pctF(dfoAM) +
    "%</td></tr>" +
    "<tr><td>PM (start at/after " +
    S.slotLabel(anchors.pm) +
    ")</td><td>" +
    dfoPM.M +
    "</td><td>" +
    dfoPM.F +
    "</td><td>" +
    pctF(dfoPM) +
    "%</td></tr></tbody></table>";

  var rdoM = [0, 0, 0, 0, 0, 0, 0];
  var rdoF = [0, 0, 0, 0, 0, 0, 0];
  S.state.lines.forEach(function (l) {
    var arr = l.sex === "F" ? rdoF : rdoM;
    (l.rdoDays || []).forEach(function (d) {
      if (d >= 0 && d <= 6) arr[d]++;
    });
  });
  html +=
    '<h3 class="section-title" style="margin-top:1rem">RDO pattern equity by gender</h3>' +
    '<table class="data-table"><thead><tr><th>Sex</th>';
  for (var d = 0; d < 7; d++) html += "<th>" + daysArr[d] + "</th>";
  html += "<th>Total</th></tr></thead><tbody>";
  function rdoRow(label, arr) {
    var sum = arr.reduce(function (a, b) { return a + b; }, 0);
    var row = "<tr><td><strong>" + label + "</strong></td>";
    arr.forEach(function (n) {
      row += "<td>" + n + (sum ? " <span class=\"muted\">(" + Math.round((100 * n) / sum) + "%)</span>" : "") + "</td>";
    });
    row += "<td>" + sum + "</td></tr>";
    return row;
  }
  html += rdoRow("Male", rdoM) + rdoRow("Female", rdoF) + "</tbody></table>";
  el.innerHTML = html;
}

export function attachGenderBalance(S) {
  if (!S) return;
  S.computeShiftAnchors = function () { return computeShiftAnchors(S); };
  S.phaseOfStart = phaseOfStart;
  S.renderGenderBalanceReports = function () { return renderGenderBalanceReports(S); };
}
