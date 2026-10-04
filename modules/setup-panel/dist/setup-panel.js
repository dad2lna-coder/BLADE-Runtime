function Q(t, r) {
  if (typeof document > "u") return r;
  const a = document.getElementById(t);
  return a && a.value != null && a.value !== "" ? a.value : r;
}
function Mt(t) {
  const r = t.getAirportConfig && t.getAirportConfig(), a = r && r.startTime || "03:30", n = r && r.endTime || "23:00";
  let o = typeof document < "u" ? document.getElementById("cfg-open") : null, s = typeof document < "u" ? document.getElementById("cfg-close") : null;
  o && (o.value = a), s && (s.value = n), t.state && (t.state.open = a, t.state.close = n);
}
function br() {
  if (typeof document > "u" || document.getElementById("setup-panel-css")) return;
  const t = document.createElement("link");
  t.id = "setup-panel-css", t.rel = "stylesheet", t.href = "modules/setup-panel/styles/setup-panel.css", document.head.appendChild(t);
}
function Ft(t) {
  if (t.ensureFunctionCoverage && t.ensureFunctionCoverage(), t.fillFunctionCoverageForm)
    try {
      t.fillFunctionCoverageForm();
    } catch {
    }
  if (t.renderFunctionBandsTable && t.renderFunctionBandsTable(), t.updateFunctionCoveragePreview && t.updateFunctionCoveragePreview(), t.renderExtraPositions)
    try {
      t.renderExtraPositions();
    } catch {
    }
  if (t.fillCertPoolForm)
    try {
      t.fillCertPoolForm();
    } catch {
    }
}
function He() {
  return [
    { id: "S1", name: "0330", start: "03:30", end: "12:00", paid: 8, force: 0, ltsoForce: 0, stsoForce: 0, rdoHard: [] },
    { id: "S2", name: "0400", start: "04:00", end: "12:30", paid: 8, force: 0, ltsoForce: 0, stsoForce: 0, rdoHard: [] },
    { id: "S3", name: "1230", start: "12:00", end: "20:30", paid: 8, force: 0, ltsoForce: 0, stsoForce: 0, rdoHard: [] },
    { id: "S4", name: "1430", start: "14:30", end: "23:00", paid: 8, force: 0, ltsoForce: 0, stsoForce: 0, rdoHard: [] },
    { id: "S5", name: "4×10", start: "10:30", end: "20:00", paid: 10, force: 0, ltsoForce: 0, stsoForce: 0, rdoHard: [2, 3, 6] }
  ];
}
function Ct() {
  return {
    mode: "none",
    poolStsoDfoM: 0,
    poolStsoDfoF: 0,
    poolLtsoDfoM: 0,
    poolLtsoDfoF: 0,
    poolTsoDfoM: 0,
    poolTsoDfoF: 0,
    poolStsoBagM: 0,
    poolStsoBagF: 0,
    poolLtsoBagM: 0,
    poolLtsoBagF: 0,
    poolTsoBagM: 0,
    poolTsoBagF: 0,
    poolStsoDfo: 0,
    poolLtsoDfo: 0,
    poolTsoDfo: 0,
    poolBag: 0,
    amPmSplit: !0,
    phaseThresholdMin: 15,
    bias: "none",
    requirements: { STSO: {}, LTSO: {}, TSO: {} },
    requirementShiftIds: []
  };
}
function Tr() {
  return {
    open: "03:30",
    close: "23:00",
    useDynamicHours: !1,
    dayHours: null,
    startDate: null,
    weekCount: 1,
    ftM: 10,
    ftF: 10,
    ptM: 4,
    ptF: 4,
    ptHoursPerDay: 4,
    ptDaysPerWeek: 3,
    ltsoM: 1,
    ltsoF: 1,
    stsoM: 2,
    stsoF: 2,
    esti: 0,
    msti: 0,
    certDfoMax: 0,
    certPaxMax: 0,
    certBagMax: 0,
    certDfoEnabled: !0,
    certBagEnabled: !0,
    certPool: { pools: ["A", "B"], targetBPercent: 45, functionMap: { DFO: "B", BAG: "", PAX: "" } },
    functionRotation: {},
    functionCoverage: Ct(),
    shifts: He(),
    shiftCrewGroups: [],
    scheduleLocks: [],
    lines: [],
    schedule: {},
    extraPositions: [],
    issues: [],
    mode: "—"
  };
}
const se = {
  fte: null,
  period: null,
  extraPositions: null,
  functionCoverage: null
};
function Er(t) {
  if (t) {
    t.state || (t.state = {});
    var r = Tr();
    Object.keys(r).forEach(function(a) {
      t.state[a] == null && (t.state[a] = r[a]);
    }), (!Array.isArray(t.state.shifts) || !t.state.shifts.length) && (t.state.shifts = He()), t.state.functionCoverage || (t.state.functionCoverage = Ct()), t.state.certPool || (t.state.certPool = { pools: ["A", "B"], targetBPercent: 45, functionMap: { DFO: "B", BAG: "", PAX: "" } }), Array.isArray(t.state.shiftCrewGroups) || (t.state.shiftCrewGroups = []), Array.isArray(t.state.scheduleLocks) || (t.state.scheduleLocks = []), t.defaultShifts = He, t.shiftSeq || (t.shiftSeq = t.state.shifts && t.state.shifts.length || 6);
  }
}
function xt(t) {
  const r = {
    ftM: +(Q("cfg-ft-m", t.state && t.state.ftM) || 0),
    ftF: +(Q("cfg-ft-f", t.state && t.state.ftF) || 0),
    ptM: +(Q("cfg-pt-m", t.state && t.state.ptM) || 0),
    ptF: +(Q("cfg-pt-f", t.state && t.state.ptF) || 0),
    ptHoursPerDay: +(Q("cfg-pt-hours", t.state && t.state.ptHoursPerDay) || 4),
    ptDaysPerWeek: +(Q("cfg-pt-days", t.state && t.state.ptDaysPerWeek) || 3),
    ltsoM: +(Q("cfg-ltso-m", t.state && t.state.ltsoM) || 0),
    ltsoF: +(Q("cfg-ltso-f", t.state && t.state.ltsoF) || 0),
    stsoM: +(Q("cfg-stso-m", t.state && t.state.stsoM) || 0),
    stsoF: +(Q("cfg-stso-f", t.state && t.state.stsoF) || 0),
    esti: +(Q("cfg-esti", t.state && t.state.esti) || 0),
    msti: +(Q("cfg-msti", t.state && t.state.msti) || 0)
  };
  return se.fte = r, r;
}
function Mr(t) {
  const r = {
    open: Q("cfg-open", t.state && t.state.open || "03:30"),
    close: Q("cfg-close", t.state && t.state.close || "23:00"),
    weeks: Math.max(1, Math.min(8, +(Q("cfg-weeks", t.state && t.state.weekCount) || 1))),
    start: Q("cfg-start", ""),
    generateSeed: Q("cfg-generate-seed", t.state && t.state.generateSeed || "random")
  };
  return se.period = r, r;
}
function Lt(t, r) {
  if (!r) return;
  function a(s, d) {
    if (typeof document > "u") return;
    const i = document.getElementById(s);
    i && d != null && (i.value = d);
  }
  if (a("cfg-ft-m", r.ftM), a("cfg-ft-f", r.ftF), a("cfg-pt-m", r.ptM), a("cfg-pt-f", r.ptF), r.ptHoursPerDay != null && a("cfg-pt-hours", r.ptHoursPerDay), r.ptDaysPerWeek != null && a("cfg-pt-days", r.ptDaysPerWeek), a("cfg-ltso-m", r.ltsoM), a("cfg-ltso-f", r.ltsoF), a("cfg-stso-m", r.stsoM), a("cfg-stso-f", r.stsoF), a("cfg-esti", r.esti), a("cfg-msti", r.msti), !!t.state) {
    t.state.ftM = +r.ftM || 0, t.state.ftF = +r.ftF || 0, t.state.ptM = +r.ptM || 0, t.state.ptF = +r.ptF || 0;
    var n = +r.ptHoursPerDay;
    t.state.ptHoursPerDay = Number.isFinite(n) && n > 0 ? Math.min(12, n) : 4;
    var o = Math.round(+r.ptDaysPerWeek);
    t.state.ptDaysPerWeek = Number.isFinite(o) && o > 0 ? Math.max(1, Math.min(6, o)) : 3, t.state.ltsoM = +r.ltsoM || 0, t.state.ltsoF = +r.ltsoF || 0, t.state.stsoM = +r.stsoM || 0, t.state.stsoF = +r.stsoF || 0, t.state.esti = +r.esti || 0, t.state.msti = +r.msti || 0;
  }
}
function Fr(t) {
  if (t.readShiftsFromDom)
    try {
      t.readShiftsFromDom();
    } catch {
    }
  if (t.readExtraPositionsFromDom)
    try {
      t.readExtraPositionsFromDom();
    } catch {
    }
  if (t.readFunctionCoverageFromDom)
    try {
      t.readFunctionCoverageFromDom();
    } catch {
    }
  else if (t.readFunctionBandsFromDom)
    try {
      t.readFunctionBandsFromDom();
    } catch {
    }
  if (t.readCertPoolFromDom)
    try {
      t.readCertPoolFromDom();
    } catch {
    }
  se.extraPositions = t.state && t.state.extraPositions || [], se.functionCoverage = t.state && t.state.functionCoverage || null, se.certPool = t.state && t.state.certPool || null;
}
function Ge(t) {
  const r = xt(t), a = Mr(t);
  return Lt(t, r), t.state && (t.state.open = a.open, t.state.close = a.close, t.state.weekCount = a.weeks, t.state.generateSeed = a.generateSeed, t.parseStartDate && (t.state.startDate = t.parseStartDate(a.start || null))), Fr(t), {
    fte: r,
    period: a,
    extraPositions: se.extraPositions,
    functionCoverage: se.functionCoverage,
    certPool: se.certPool,
    shifts: t.state && t.state.shifts || [],
    shiftCrewGroups: t.state && t.state.shiftCrewGroups || [],
    scheduleLocks: t.state && t.state.scheduleLocks || []
  };
}
function Cr(t) {
  const r = Ge(t), a = {
    app: "blade-staffing",
    version: 1,
    savedAt: t.dj ? t.dj().toISOString() : (/* @__PURE__ */ new Date()).toISOString(),
    fte: r.fte,
    functionCoverage: r.functionCoverage,
    extraPositions: r.extraPositions || [],
    certPool: r.certPool || t.state && t.state.certPool || null,
    shiftCrewGroups: r.shiftCrewGroups || [],
    scheduleLocks: r.scheduleLocks || []
  }, n = new Blob([JSON.stringify(a, null, 2)], { type: "application/json" }), o = t.exportFileName && t.exportFileName("Staffing", ".json") || "staffing.json";
  if (t.saveBlob)
    t.saveBlob(n, o);
  else if (typeof document < "u") {
    const s = document.createElement("a"), d = URL.createObjectURL(n);
    s.href = d, s.download = o, document.body.appendChild(s), s.click(), document.body.removeChild(s), URL.revokeObjectURL(d);
  }
  try {
    localStorage.setItem("blade.staffingJson", JSON.stringify(a));
  } catch {
  }
  return t.updateStatus && t.updateStatus("Saved staffing (FTE + function coverage + cert pools + extra positions)."), a;
}
function xr(t) {
  t && (t.rdoChecksHtml = function(r) {
    var a = new Set((r || []).map(Number));
    return (t.DAYS || []).map(function(n, o) {
      return '<label class="rdo-chk" title="' + n + '"><input type="checkbox" data-rdo="' + o + '"' + (a.has(o) ? " checked" : "") + " /><span>" + n.charAt(0) + "</span></label>";
    }).join("");
  }, t.readShiftsFromDom = function() {
    if (typeof document > "u") return t.state.shifts;
    var r = document.querySelectorAll("#shifts-tbody tr[data-shift-id]");
    if (!r.length) return t.state.shifts;
    var a = [];
    return r.forEach(function(n) {
      var o = n.getAttribute("data-shift-id"), s = t.getShift ? t.getShift(o) : null, d = n.querySelector("[data-f=name]") && n.querySelector("[data-f=name]").value.trim() || o, i = n.querySelector("[data-f=start]") && n.querySelector("[data-f=start]").value || "05:00", u = n.querySelector("[data-f=end]") && n.querySelector("[data-f=end]").value || "13:30", l = n.querySelector("[data-f=start2]"), f = n.querySelector("[data-f=end2]"), v = l ? l.value : "", h = f ? f.value : "", c = null;
      if (v && h && t.isValidTimeText(i) && t.isValidTimeText(u) && t.isValidTimeText(v) && t.isValidTimeText(h)) {
        var y = t.timeToMin(i), g = t.timeToMin(u), m = t.timeToMin(v), p = t.timeToMin(h);
        g > y && p > m && m > g && (c = [
          { start: i, end: u },
          { start: v, end: h }
        ]);
      }
      var b = +(n.querySelector("[data-f=paid]") && n.querySelector("[data-f=paid]").value);
      if (!b || b <= 0)
        if (c) {
          var M = t.timeToMin(c[0].end) - t.timeToMin(c[0].start), T = t.timeToMin(c[1].end) - t.timeToMin(c[1].start);
          b = Math.max(1, Math.round((M + T) / 60 * 2) / 2);
        } else {
          var L = t.timeToMin(u) - t.timeToMin(i);
          b = Math.max(1, Math.round(L / 60 * 2) / 2);
        }
      for (var E = Math.max(0, Math.floor(+(n.querySelector("[data-f=force]") && n.querySelector("[data-f=force]").value) || 0)), A = Math.max(0, Math.floor(+(n.querySelector("[data-f=ltsoForce]") && n.querySelector("[data-f=ltsoForce]").value) || 0)), C = Math.max(0, Math.floor(+(n.querySelector("[data-f=stsoForce]") && n.querySelector("[data-f=stsoForce]").value) || 0)), I = [], F = 0; F < 7; F++) {
        var B = n.querySelector('[data-rdo="' + F + '"]');
        B && B.checked && I.push(F);
      }
      var N = s && s.dayTimes ? s.dayTimes : null, k = n.querySelector("[data-f=phase]"), R = k && k.value || s && s.phase || "auto", _ = n.querySelector("[data-f=crewGroupId]"), w = _ && _.value || s && s.crewGroupId || "", x = {
        id: o,
        name: d,
        start: c ? c[0].start : i,
        end: c ? c[1].end : u,
        paid: b,
        force: E,
        ltsoForce: A,
        stsoForce: C,
        rdoHard: I,
        dayTimes: N,
        phase: R,
        crewGroupId: w
      };
      c && (x.segments = c), a.push(x);
    }), t.state.shifts = a, a;
  }, t.renderCrewGroupsUI = function() {
    var r = document.getElementById("crew-groups-list");
    if (r) {
      var a = t.state.shiftCrewGroups || [], n = t.state.shifts || [];
      if (!a.length) {
        r.innerHTML = '<p class="muted" style="margin:0">No crew groups defined. Shifts default to individual shift bands.</p>';
        return;
      }
      r.innerHTML = a.map(function(o) {
        var s = n.map(function(d) {
          var i = d.crewGroupId === o.id || o.shiftIds && o.shiftIds.indexOf(d.id) !== -1;
          return '<label style="display:inline-flex;align-items:center;gap:0.25rem;margin-right:0.75rem;font-size:0.85rem"><input type="checkbox" class="cg-shift-cb" data-cg-id="' + o.id + '" data-shift-id="' + d.id + '"' + (i ? " checked" : "") + " />" + (d.name || d.id) + "</label>";
        }).join("");
        return '<div class="card" style="margin:0;padding:0.5rem 0.75rem;background:var(--bg-subtle, #f8f9fa)"><div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:0.35rem"><strong>' + (o.name || o.id) + '</strong><button type="button" class="btn btn-red btn-cg-del" data-cg-id="' + o.id + '" style="padding:0.1rem 0.4rem;font-size:0.75rem">Delete group</button></div><div>' + s + "</div></div>";
      }).join(""), r.querySelectorAll(".btn-cg-del").forEach(function(o) {
        o.addEventListener("click", function() {
          var s = o.getAttribute("data-cg-id");
          t.state.shiftCrewGroups = (t.state.shiftCrewGroups || []).filter(function(d) {
            return d.id !== s;
          }), (t.state.shifts || []).forEach(function(d) {
            d.crewGroupId === s && (d.crewGroupId = "");
          }), t.renderCrewGroupsUI(), t.renderShiftsTable();
        });
      }), r.querySelectorAll(".cg-shift-cb").forEach(function(o) {
        o.addEventListener("change", function() {
          var s = o.getAttribute("data-cg-id"), d = o.getAttribute("data-shift-id"), i = (t.state.shifts || []).find(function(l) {
            return l.id === d;
          });
          i && (o.checked ? i.crewGroupId = s : i.crewGroupId === s && (i.crewGroupId = ""));
          var u = (t.state.shiftCrewGroups || []).find(function(l) {
            return l.id === s;
          });
          u && (u.shiftIds = (t.state.shifts || []).filter(function(l) {
            return l.crewGroupId === s;
          }).map(function(l) {
            return l.id;
          })), t.renderShiftsTable();
        });
      });
    }
  }, t.renderShiftsTable = function() {
    var r = document.getElementById("shifts-tbody");
    if (r) {
      var a = t.state.shiftCrewGroups || [];
      r.innerHTML = (t.state.shifts || []).map(function(n) {
        var o = t.shiftHasDayOverrides && t.shiftHasDayOverrides(n.id), s = o ? "btn btn-amber" : "btn", d = o ? "Has per-day time overrides" : "Set different start/end per day of week", i = '<option value="">(None / Solo)</option>' + a.map(function(c) {
          var y = n.crewGroupId === c.id ? " selected" : "";
          return '<option value="' + c.id + '"' + y + ">" + (c.name || c.id) + "</option>";
        }).join(""), u = !!(n.segments && n.segments.length === 2), l = u ? n.segments[0].start : n.start, f = u ? n.segments[0].end : n.end, v = u ? n.segments[1].start : "", h = u ? n.segments[1].end : "";
        return '<tr data-shift-id="' + n.id + '"><td><input type="text" data-f="name" value="' + String(n.name).replace(/"/g, "&quot;") + '" style="width:5.5rem" /></td><td><input type="time" data-f="start" value="' + l + '" /></td><td><input type="time" data-f="end" value="' + f + '" /></td><td><input type="time" data-f="start2" value="' + v + '" placeholder="Seg 2 start" /></td><td><input type="time" data-f="end2" value="' + h + '" placeholder="Seg 2 end" /></td><td><select data-f="phase"><option value="auto"' + ((n.phase || "auto") === "auto" ? " selected" : "") + '>Auto</option><option value="opening"' + (n.phase === "opening" ? " selected" : "") + '>Opening</option><option value="am"' + (n.phase === "am" ? " selected" : "") + '>AM</option><option value="pm"' + (n.phase === "pm" ? " selected" : "") + '>PM</option><option value="closing"' + (n.phase === "closing" ? " selected" : "") + '>Closing</option></select></td><td><input type="number" data-f="paid" min="1" step="0.5" value="' + n.paid + '" style="width:4rem" /></td><td><input type="number" data-f="force" min="0" value="' + (n.force || 0) + '" style="width:4rem" title="TSO force" /></td><td><input type="number" data-f="ltsoForce" min="0" value="' + (n.ltsoForce || 0) + '" style="width:4rem" title="LTSO force" /></td><td><input type="number" data-f="stsoForce" min="0" value="' + (n.stsoForce || 0) + '" style="width:4rem" title="STSO force" /></td><td><div class="rdo-row">' + t.rdoChecksHtml(n.rdoHard) + '</div></td><td style="white-space:nowrap"><button type="button" class="' + s + '" data-day-times="' + n.id + '" title="' + d + '">Day times…</button> <button type="button" class="btn btn-red" data-remove="' + n.id + '">✕</button></td><td><select data-f="crewGroupId">' + i + "</select></td></tr>";
      }).join(""), r.querySelectorAll("select[data-f=crewGroupId]").forEach(function(n) {
        n.addEventListener("change", function() {
          t.readShiftsFromDom(), t.renderCrewGroupsUI();
        });
      }), r.querySelectorAll("[data-remove]").forEach(function(n) {
        n.addEventListener("click", function() {
          t.readShiftsFromDom();
          var o = n.getAttribute("data-remove");
          t.state.shifts = t.state.shifts.filter(function(s) {
            return s.id !== o;
          }), t.renderShiftsTable();
        });
      }), r.querySelectorAll("[data-day-times]").forEach(function(n) {
        n.addEventListener("click", function() {
          t.readShiftsFromDom(), t.openShiftDayTimesModal(n.getAttribute("data-day-times"));
        });
      });
    }
  }, t.addShift = function() {
    if (t.state) {
      t.readShiftsFromDom(), t.shiftSeq = t.shiftSeq || (t.state.shifts || []).length + 1;
      var r = "S" + t.shiftSeq++;
      t.state.shifts = t.state.shifts || [], t.state.shifts.push({
        id: r,
        name: "Shift",
        start: "08:00",
        end: "16:30",
        paid: 8,
        force: 0,
        ltsoForce: 0,
        stsoForce: 0,
        rdoHard: []
      }), t.renderShiftsTable();
    }
  }, t._editingDayTimesShiftId = null, t.openShiftDayTimesModal = function(r) {
    var a = t.getShift(r);
    if (a) {
      t._editingDayTimesShiftId = r;
      var n = document.getElementById("shift-day-times-modal"), o = document.getElementById("shift-day-times-title"), s = !!(a.segments && a.segments.length === 2), d = s ? a.segments[0].start + "–" + a.segments[0].end + " / " + a.segments[1].start + "–" + a.segments[1].end : a.start + "–" + a.end;
      o && (o.textContent = "Day times for " + (a.name || a.id) + " (base " + d + ")");
      var i = document.getElementById("shift-day-times-tbody");
      if (i) {
        var u = t.DAYS || ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], l = a.dayTimes || {};
        i.innerHTML = u.map(function(f, v) {
          var h = l[String(v)], c = !!(h && (h.start || h.segments)), y = !!(h && h.segments && h.segments.length === 2), g = y ? h.segments[0].start : h ? h.start : s ? a.segments[0].start : a.start, m = y ? h.segments[0].end : h ? h.end : s ? a.segments[0].end : a.end, p = y ? h.segments[1].start : s ? a.segments[1].start : "", b = y ? h.segments[1].end : s ? a.segments[1].end : "";
          return '<tr data-dow="' + v + '"><td><strong>' + f + '</strong></td><td><label class="rdo-chk" style="flex-direction:row;gap:0.35rem"><input type="checkbox" data-sdt="use" ' + (c ? "checked" : "") + '> Override</label></td><td><input type="time" data-sdt="start" value="' + g + '" step="900" ' + (c ? "" : "disabled") + '></td><td><input type="time" data-sdt="end" value="' + m + '" step="900" ' + (c ? "" : "disabled") + '></td><td><input type="time" data-sdt="start2" value="' + p + '" step="900" placeholder="Seg 2 start" ' + (c ? "" : "disabled") + '></td><td><input type="time" data-sdt="end2" value="' + b + '" step="900" placeholder="Seg 2 end" ' + (c ? "" : "disabled") + '></td><td class="muted" data-sdt="dur"></td></tr>';
        }).join(""), t.updateShiftDayTimesDurations(), n && (n.style.display = "block", n.setAttribute("aria-hidden", "false"));
      }
    }
  }, t.closeShiftDayTimesModal = function() {
    var r = document.getElementById("shift-day-times-modal");
    r && (r.style.display = "none", r.setAttribute("aria-hidden", "true")), t._editingDayTimesShiftId = null;
  }, t.updateShiftDayTimesDurations = function() {
    document.querySelectorAll("#shift-day-times-tbody tr[data-dow]").forEach(function(r) {
      var a = r.querySelector("[data-sdt=use]"), n = r.querySelector("[data-sdt=start]"), o = r.querySelector("[data-sdt=end]"), s = r.querySelector("[data-sdt=start2]"), d = r.querySelector("[data-sdt=end2]"), i = r.querySelector("[data-sdt=dur]");
      if (!(!a || !n || !o || !i)) {
        var u = !a.checked;
        if (n.disabled = u, o.disabled = u, s && (s.disabled = u), d && (d.disabled = u), !a.checked) {
          i.textContent = "base", i.style.color = "var(--muted)";
          return;
        }
        var l = t.timeToMin(n.value), f = t.timeToMin(o.value), v = s && d && s.value && d.value;
        if (v) {
          var h = t.timeToMin(s.value), c = t.timeToMin(d.value);
          if (f <= l || c <= h || h <= f) {
            i.textContent = "Invalid", i.style.color = "var(--red)";
            return;
          }
          var y = f - l + (c - h), g = Math.floor(y / 60), m = y % 60;
          i.textContent = g + "h" + (m ? " " + m + "m" : ""), i.style.color = "";
        } else if (f <= l)
          i.textContent = "Invalid", i.style.color = "var(--red)";
        else {
          var p = f - l, b = Math.floor(p / 60), M = p % 60;
          i.textContent = b + "h" + (M ? " " + M + "m" : ""), i.style.color = "";
        }
      }
    });
  }, t.exportAllRdoMatrixCsv = function() {
    var r = t.state && t.state.lines || [];
    if (!r.length) {
      t.updateStatus && t.updateStatus("No generated lines to export.");
      return;
    }
    var a = t.DAYS || ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    function n(m) {
      if (!m || !m.length) return "None";
      var p = m.slice().map(Number).sort(function(b, M) {
        return b - M;
      });
      return p.map(function(b) {
        return a[b] || b;
      }).join("-");
    }
    var o = r.filter(function(m) {
      if (m.isTraining || m.empClass === "ESTI" || m.empClass === "MSTI") return !1;
      var p = (m.sex || "").toUpperCase();
      return p === "M" || p === "F";
    });
    if (!o.length) {
      t.updateStatus && t.updateStatus("No sexed position lines available for CSV export.");
      return;
    }
    var s = {};
    o.forEach(function(m) {
      var p = n(m.rdoDays);
      s[p] = !0;
    });
    var d = Object.keys(s).sort(), i = {};
    o.forEach(function(m) {
      var p = m.extraName || (m.isStso ? "STSO" : m.isLtso ? "LTSO" : m.empClass === "PT" ? "PT TSO" : "FT TSO"), b = m.shiftName || m.shiftLabel || m.shiftId || "Shift", M = (m.sex || "").toUpperCase(), T = p + "||" + b + "||" + M;
      i[T] || (i[T] = { pos: p, shift: b, sex: M, lines: [] }), i[T].lines.push(m);
    });
    var u = [];
    u.push(["Position", "Shift", "Sex"].concat(d).join(","));
    function l(m, p) {
      var b = t.getShift ? t.getShift(p ? p.shiftId : "") : null;
      if (!b && t.state && t.state.shifts && (b = t.state.shifts.find(function(T) {
        return T.name === m || T.id === m;
      })), b && b.start && t.timeToMin) return t.timeToMin(b.start);
      if (p && p.startTime && t.timeToMin) return t.timeToMin(p.startTime);
      var M = String(m).match(/(\d{2}):?(\d{2})/);
      return M ? (+M[1] || 0) * 60 + (+M[2] || 0) : 0;
    }
    var f = Object.keys(i).sort(function(m, p) {
      var b = i[m], M = i[p], T = String(b.pos).localeCompare(String(M.pos));
      if (T !== 0) return T;
      var L = l(b.shift, b.lines[0]), E = l(M.shift, M.lines[0]);
      return L !== E ? L - E : b.sex !== M.sex ? b.sex === "M" ? -1 : 1 : 0;
    });
    f.forEach(function(m) {
      var p = i[m], b = {};
      p.lines.forEach(function(T) {
        var L = n(T.rdoDays);
        b[L] = (b[L] || 0) + 1;
      });
      var M = ['"' + p.pos + '"', '"' + p.shift + '"', p.sex];
      d.forEach(function(T) {
        M.push(b[T] || 0);
      }), u.push(M.join(","));
    });
    var v = u.join(`
`), h = new Blob([v], { type: "text/csv;charset=utf-8;" }), c = "RDO_Sex_Matrix_All.csv";
    if (t.saveBlob)
      t.saveBlob(h, c);
    else if (typeof document < "u") {
      var y = document.createElement("a"), g = URL.createObjectURL(h);
      y.href = g, y.download = c, document.body.appendChild(y), y.click(), document.body.removeChild(y), URL.revokeObjectURL(g);
    }
    t.updateStatus && t.updateStatus("Exported unfiltered RDO x Sex matrix CSV.");
  }, t.saveShiftDayTimes = function() {
    var r = t.getShift(t._editingDayTimesShiftId);
    if (!r) {
      t.closeShiftDayTimesModal();
      return;
    }
    var a = {};
    document.querySelectorAll("#shift-day-times-tbody tr[data-dow]").forEach(function(n) {
      var o = n.getAttribute("data-dow"), s = n.querySelector("[data-sdt=use]"), d = n.querySelector("[data-sdt=start]"), i = n.querySelector("[data-sdt=end]"), u = n.querySelector("[data-sdt=start2]"), l = n.querySelector("[data-sdt=end2]");
      if (!(!s || !s.checked || !d || !i) && !(!t.isValidTimeText(d.value) || !t.isValidTimeText(i.value))) {
        var f = d.value, v = i.value, h = u ? u.value : "", c = l ? l.value : "";
        if (h && c && t.isValidTimeText(h) && t.isValidTimeText(c)) {
          var y = t.timeToMin(f), g = t.timeToMin(v), m = t.timeToMin(h), p = t.timeToMin(c);
          if (g > y && p > m && m > g) {
            a[String(o)] = {
              start: f,
              end: c,
              segments: [
                { start: f, end: v },
                { start: h, end: c }
              ]
            };
            return;
          }
        }
        t.timeToMin(v) <= t.timeToMin(f) || !r.segments && f === r.start && v === r.end || (a[String(o)] = { start: f, end: v });
      }
    }), r.dayTimes = Object.keys(a).length ? a : null, t.closeShiftDayTimesModal(), t.renderShiftsTable(), t.updateStatus && t.updateStatus("Updated day times for " + (r.name || r.id)), t.renderAll && t.renderAll();
  }, t.openRdoMatrixModal = function() {
    var r = typeof document < "u" ? document.getElementById("rdo-matrix-modal") : null;
    r && (r.style.display = "flex", r.setAttribute("aria-hidden", "false")), t.renderRdoMatrixModal();
  }, t.closeRdoMatrixModal = function() {
    var r = typeof document < "u" ? document.getElementById("rdo-matrix-modal") : null;
    r && (r.style.display = "none", r.setAttribute("aria-hidden", "true"));
  }, t.openRdoRespinModal = function() {
    var r = typeof document < "u" ? document.getElementById("rdo-respin-modal") : null;
    r && (r.style.display = "flex", r.setAttribute("aria-hidden", "false")), t.renderRdoRespinSlices();
  }, t.closeRdoRespinModal = function() {
    var r = typeof document < "u" ? document.getElementById("rdo-respin-modal") : null;
    r && (r.style.display = "none", r.setAttribute("aria-hidden", "true"));
  }, t.renderRdoRespinSlices = function() {
    var r = document.getElementById("rdo-respin-slices-list");
    if (r) {
      var a = t.state && t.state.lines || [];
      if (!a.length) {
        r.innerHTML = '<p class="muted" style="margin:0">No generated lines available.</p>';
        return;
      }
      var n = a.filter(function(d) {
        if (d.isTraining || d.empClass === "ESTI" || d.empClass === "MSTI") return !1;
        var i = (d.sex || "").toUpperCase();
        return i === "M" || i === "F";
      }), o = {};
      n.forEach(function(d) {
        var i = d.extraName || (d.isStso ? "STSO" : d.isLtso ? "LTSO" : d.empClass === "PT" ? "PT TSO" : "FT TSO"), u = d.shiftName || d.shiftLabel || d.shiftId || "Shift", l = (d.sex || "").toUpperCase(), f = u + " · " + i + " · " + l;
        o[f] || (o[f] = { key: f, count: 0 }), o[f].count++;
      });
      var s = Object.keys(o).sort();
      if (!s.length) {
        r.innerHTML = '<p class="muted" style="margin:0">No slices available.</p>';
        return;
      }
      r.innerHTML = s.map(function(d) {
        var i = o[d];
        return '<label style="display:flex;align-items:center;gap:0.5rem;font-size:0.9rem;cursor:pointer"><input type="checkbox" class="respin-slice-cb" data-slice-key="' + d.replace(/"/g, "&quot;") + '" checked /><span><strong>' + i.key + '</strong> <span class="muted">(' + i.count + " line" + (i.count > 1 ? "s" : "") + ")</span></span></label>";
      }).join("");
    }
  }, t.respinSelectedSlices = function(r, a) {
    var n = a || {};
    if (!r || !r.length) {
      t.updateStatus && t.updateStatus("No slices selected for respin.");
      return;
    }
    var o = new Set(r), s = t.state && t.state.lines || [];
    if (s.length) {
      var d = t.state && t.state.weekCount ? t.state.weekCount * 7 : 7, i = {};
      s.forEach(function(v) {
        if (!(v.isTraining || v.empClass === "ESTI" || v.empClass === "MSTI")) {
          var h = v.extraName || (v.isStso ? "STSO" : v.isLtso ? "LTSO" : v.empClass === "PT" ? "PT TSO" : "FT TSO"), c = v.shiftName || v.shiftLabel || v.shiftId || "Shift", y = (v.sex || "").toUpperCase(), g = c + " · " + h + " · " + y;
          o.has(g) && (i[g] || (i[g] = []), i[g].push(v));
        }
      }), n.keepSeed || (t._respinNonce = (t._respinNonce || 0) + 1);
      var u = n.nonce !== void 0 ? n.nonce : t._respinNonce || 0, l = t.state && typeof t.state.activeSeed == "number" ? t.state.activeSeed : t.state && t.state.generateSeed && t.state.generateSeed !== "random" ? parseInt(t.state.generateSeed, 10) : 42;
      Number.isFinite(l) || (l = 42);
      var f = 0;
      Object.keys(i).forEach(function(v, h) {
        var c = i[v];
        if (c.length) {
          for (var y = Math.abs(l) + h * 7919 + u * 10007 + 1337 >>> 0, g = function() {
            var E = y += 1831565813;
            return E = Math.imul(E ^ E >>> 15, E | 1), E ^= E + Math.imul(E ^ E >>> 7, E | 61), ((E ^ E >>> 14) >>> 0) / 4294967296;
          }, m = [], p = 0; p < c.length; p++)
            m.push(p % 7);
          for (var b = m.length - 1; b > 0; b--) {
            var M = Math.floor(g() * (b + 1)), T = m[b];
            m[b] = m[M], m[M] = T;
          }
          var L = Math.floor(g() * 7);
          c.forEach(function(E, A) {
            var C = (m[A] + L) % 7, I = t.targetWorkDays ? t.targetWorkDays(E.shiftId, E.empClass) : (+E.paid || 8) >= 10 ? 4 : 5, F = Math.max(1, 7 - I), B = t.getShift ? t.getShift(E.shiftId) : null, N = B && Array.isArray(B.rdoHard) && B.rdoHard.length > 0 ? B.rdoHard.map(Number).filter(function(w) {
              return w >= 0 && w <= 6;
            }) : E.rdoHard && Array.isArray(E.rdoDays) ? E.rdoDays : [];
            if (N.length > 0) {
              var k = N.slice();
              if (k.length < F)
                for (var R = 0; R < 7 && k.length < F; R++) {
                  var _ = (C + R) % 7;
                  k.indexOf(_) < 0 && k.push(_);
                }
              E.rdoDays = k, E.rdoHard = !0;
            } else t.consecutiveRdos ? (E.rdoDays = t.consecutiveRdos(F, C), E.rdoHard = !1) : (E.rdoDays = [C % 7, (C + 1) % 7], E.rdoHard = !1);
            t.buildScheduleForLine && (t.state.schedule[E.id] = t.buildScheduleForLine(E, d)), f++;
          });
        }
      }), t.renderRdoMatrixModal && t.renderRdoMatrixModal(), t.renderAll && t.renderAll(), t.renderLines && t.renderLines(), t.updateStatus && t.updateStatus("Respun RDOs for " + f + " line(s) across " + Object.keys(i).length + " slice(s).");
    }
  }, t.renderRdoMatrixModal = function() {
    var r = typeof document < "u" ? document.getElementById("rdo-matrix-pos-select") : null, a = typeof document < "u" ? document.getElementById("rdo-matrix-table-wrap") : null;
    if (!a) return;
    var n = t.state && t.state.lines || [];
    if (!n.length) {
      a.innerHTML = '<p class="muted">No generated schedule lines available. Click <strong>GENERATE</strong> first.</p>';
      return;
    }
    var o = ["STSO", "LTSO", "TSO", "FT TSO", "PT TSO"];
    n.forEach(function(p) {
      var b = p.extraName || p.position || p.empClass;
      b && o.indexOf(b) === -1 && b !== "FT" && b !== "PT" && b !== "ESTI" && b !== "MSTI" && o.push(b);
    });
    var s = r ? r.value : "";
    s || (s = "STSO"), r && (r.innerHTML = o.map(function(p) {
      var b = p === s ? " selected" : "";
      return '<option value="' + p + '"' + b + ">" + p + "</option>";
    }).join(""));
    function d(p, b) {
      var M = (b || "STSO").toUpperCase();
      if (M === "STSO") return p.isStso || p.position === "STSO" || p.empClass === "STSO";
      if (M === "LTSO") return p.isLtso || p.position === "LTSO" || p.empClass === "LTSO";
      if (M === "TSO") return (p.position === "TSO" || p.empClass === "FT" || p.empClass === "PT") && !p.isExtra && !p.isTraining;
      if (M === "FT TSO" || M === "FT") return p.empClass === "FT" && !p.isExtra && !p.isTraining;
      if (M === "PT TSO" || M === "PT") return p.empClass === "PT" && !p.isExtra && !p.isTraining;
      var T = (p.position || p.extraName || p.empClass || "").toUpperCase();
      return T === M;
    }
    var i = n.filter(function(p) {
      return d(p, s);
    });
    if (!i.length) {
      a.innerHTML = '<p class="muted">No lines found for position class <strong>' + s + "</strong>.</p>";
      return;
    }
    var u = t.DAYS || ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    function l(p) {
      if (!p || !p.length) return "None";
      var b = p.slice().map(Number).sort(function(M, T) {
        return M - T;
      });
      return b.map(function(M) {
        return u[M] || M;
      }).join("-");
    }
    var f = {};
    i.forEach(function(p) {
      var b = l(p.rdoDays);
      f[b] = !0;
    });
    var v = Object.keys(f).sort(), h = {};
    i.forEach(function(p) {
      var b = p.shiftName || p.shiftLabel || p.shiftId || "Shift";
      h[b] || (h[b] = []), h[b].push(p);
    });
    function c(p, b) {
      var M = t.getShift ? t.getShift(b ? b.shiftId : "") : null;
      if (!M && t.state && t.state.shifts && (M = t.state.shifts.find(function(L) {
        return L.name === p || L.id === p;
      })), M && M.start && t.timeToMin) return t.timeToMin(M.start);
      if (b && b.startTime && t.timeToMin) return t.timeToMin(b.startTime);
      var T = String(p).match(/(\d{2}):?(\d{2})/);
      return T ? (+T[1] || 0) * 60 + (+T[2] || 0) : 0;
    }
    var y = Object.keys(h).sort(function(p, b) {
      var M = c(p, h[p][0]), T = c(b, h[b][0]);
      return M - T;
    }), g = [];
    y.forEach(function(p) {
      var b = h[p];
      ["M", "F"].forEach(function(M) {
        var T = b.filter(function(A) {
          return (A.sex || "").toUpperCase() === M;
        }), L = {};
        T.forEach(function(A) {
          var C = l(A.rdoDays);
          L[C] = (L[C] || 0) + 1;
        });
        var E = v.map(function(A) {
          var C = L[A] || 0;
          return '<td style="text-align:center;' + (C > 0 ? "font-weight:bold" : "opacity:0.4") + '">' + C + "</td>";
        }).join("");
        g.push(
          "<tr><td><strong>" + p + '</strong></td><td><span class="badge" style="background:' + (M === "M" ? "#007bff" : "#e83e8c") + ';color:#fff;padding:0.15rem 0.4rem;border-radius:3px">' + M + "</span></td>" + E + "</tr>"
        );
      });
    });
    var m = v.map(function(p) {
      return '<th style="text-align:center">' + p + "</th>";
    }).join("");
    a.innerHTML = '<table class="data-table" style="width:100%;border-collapse:collapse"><thead><tr><th>Shift</th><th>Sex</th>' + m + "</tr></thead><tbody>" + g.join("") + "</tbody></table>";
  }, t.initShiftDayTimes = function() {
    if (!t._sdtBound) {
      t._sdtBound = !0;
      var r = document.getElementById("shift-day-times-close");
      r && r.addEventListener("click", t.closeShiftDayTimesModal);
      var a = document.getElementById("btn-sdt-cancel");
      a && a.addEventListener("click", t.closeShiftDayTimesModal);
      var n = document.getElementById("btn-sdt-save");
      n && n.addEventListener("click", t.saveShiftDayTimes);
      var o = document.getElementById("btn-sdt-clear");
      o && o.addEventListener("click", function() {
        var d = t.getShift(t._editingDayTimesShiftId);
        document.querySelectorAll("#shift-day-times-tbody tr[data-dow]").forEach(function(i) {
          var u = i.querySelector("[data-sdt=use]"), l = i.querySelector("[data-sdt=start]"), f = i.querySelector("[data-sdt=end]");
          u && (u.checked = !1), l && d && (l.value = d.start), f && d && (f.value = d.end);
        }), t.updateShiftDayTimesDurations();
      }), document.addEventListener("change", function(d) {
        if (d.target) {
          var i = d.target.getAttribute("data-sdt");
          if (!(i !== "use" && i !== "start" && i !== "end")) {
            if (i === "use") {
              var u = d.target.closest("tr"), l = t.getShift(t._editingDayTimesShiftId);
              if (u && l && !d.target.checked) {
                var f = u.querySelector("[data-sdt=start]"), v = u.querySelector("[data-sdt=end]");
                f && (f.value = l.start), v && (v.value = l.end);
              }
            }
            t.updateShiftDayTimesDurations();
          }
        }
      });
      var s = document.getElementById("shift-day-times-modal");
      s && s.addEventListener("click", function(d) {
        d.target === s && t.closeShiftDayTimesModal();
      });
    }
  });
}
function Ae(t) {
  var r = t >>> 0 || 1;
  return function() {
    var a = r += 1831565813;
    return a = Math.imul(a ^ a >>> 15, a | 1), a ^= a + Math.imul(a ^ a >>> 7, a | 61), ((a ^ a >>> 14) >>> 0) / 4294967296;
  };
}
function qe(t, r) {
  for (var a = t.slice(), n = a.length - 1; n > 0; n--) {
    var o = Math.floor(r() * (n + 1)), s = a[n];
    a[n] = a[o], a[o] = s;
  }
  return a;
}
function de(t, r) {
  var a = t && t.state && t.state.shifts || [], n = a.find(function(d) {
    return d.id === r;
  });
  if (!n) return r || "default";
  if (n.crewGroupId) return "crew_" + n.crewGroupId;
  var o = t && t.state && t.state.shiftCrewGroups || [], s = o.find(function(d) {
    return d.shiftIds && d.shiftIds.indexOf(r) !== -1;
  });
  return s ? "crew_" + s.id : r;
}
function Lr(t, r, a, n, o) {
  n = n || { M: 0, F: 0 };
  function s(c, y) {
    var g = c + y;
    return r[g] > 0 ? (r[g]--, { empClass: c, sex: y }) : null;
  }
  var d = (t.state.ftM || 0) + (t.state.ptM || 0), i = (t.state.ftF || 0) + (t.state.ptF || 0), u = d + i, l = u > 0 ? i / u : 0.5;
  function f(c) {
    var y = r[c + "M"] || 0, g = r[c + "F"] || 0;
    if (y <= 0 && g <= 0) return null;
    if (y <= 0) return s(c, "F");
    if (g <= 0) return s(c, "M");
    var m = n.M + n.F;
    if (m === 0) return l >= 0.5 ? s(c, "F") : s(c, "M");
    var p = n.F / m;
    return p < l - 0.02 ? s(c, "F") : p > l + 0.02 || y >= g ? s(c, "M") : s(c, "F");
  }
  if (a) return f("FT");
  if (o) return f("PT") || f("FT");
  var v = (r.FTM || 0) + (r.FTF || 0), h = (r.PTM || 0) + (r.PTF || 0);
  return v > 0 ? f("FT") : h > 0 ? f("PT") : null;
}
function Dr(t, r) {
  var a = { FTM: t.state.ftM || 0, FTF: t.state.ftF || 0, PTM: t.state.ptM || 0, PTF: t.state.ptF || 0 }, n = { M: 0, F: 0 }, o = t.state.shifts || [], s = [];
  o.forEach(function(c) {
    var y = r[c.id] || 0;
    y > 0 && (c.force || 0) > 0 && s.push(c);
  }), o.forEach(function(c) {
    var y = r[c.id] || 0;
    y > 0 && !(c.force > 0) && s.push(c);
  });
  var d = t.state && typeof t.state.activeSeed == "number", i = d ? Ae(t.state.activeSeed + 500) : null, u = [];
  s.forEach(function(c) {
    for (var y = r[c.id] || 0, g = de(t, c.id), m = (+c.paid || 8) >= 10, p = 0; p < y; p++)
      u.push({
        def: c,
        bandKey: g,
        isLong: m,
        shiftIndex: p
      });
  });
  var l = {};
  u.forEach(function(c) {
    l[c.bandKey] || (l[c.bandKey] = []), l[c.bandKey].push(c);
  }), Object.keys(l).forEach(function(c) {
    var y = l[c], g = i ? Math.floor(i() * 7) : 0, m = g;
    y.forEach(function(p) {
      p.rdoSeed = m % 7, m++;
    });
  });
  var f = 0;
  u.forEach(function(c) {
    c.isLong || f++;
  });
  var v = [], h = 1;
  return Object.keys(l).forEach(function(c) {
    var y = l[c], g = {};
    y.forEach(function(F) {
      var B = F.rdoSeed;
      g[B] || (g[B] = []), g[B].push(F);
    });
    var m = 0;
    Object.keys(g).forEach(function(F) {
      g[F].length > m && (m = g[F].length);
    });
    for (var p = i ? qe([0, 1, 2, 3, 4, 5, 6], i) : [0, 1, 2, 3, 4, 5, 6], b = [], M = 0; M < m; M++)
      for (var T = 0; T < 7; T++) {
        var L = p[T];
        g[L] && g[L][M] && b.push(g[L][M]);
      }
    var E = 0;
    b.forEach(function(F) {
      F.isLong || E++;
    });
    var A = (a.PTM || 0) + (a.PTF || 0), C = 0;
    E > 0 && f > 0 && A > 0 && (C = Math.round(E * A / f), C = Math.max(0, Math.min(E, Math.min(A, C))));
    var I = 0;
    b.forEach(function(F) {
      var B = F.def, N = F.isLong, k = !1;
      N || (k = I < C);
      var R = Lr(t, a, N, n, k);
      if (!R) {
        t.state.issues.push(B.name + ": pool empty or 4x10 needs FT."), N || (f = Math.max(0, f - 1));
        return;
      }
      N || (R.empClass === "PT" && I++, f = Math.max(0, f - 1)), n[R.sex]++, F.person = R;
      var _ = t.targetWorkDays(F.def.id, R.empClass), w = 7 - _, x = Array.isArray(F.def.rdoHard) ? F.def.rdoHard.map(Number).filter(function(V) {
        return V >= 0 && V <= 6;
      }) : [];
      if (x.length > 0) {
        if (F.rdoDays = x.slice(), F.rdoDays.length < w)
          for (var P = 0; P < 7 && F.rdoDays.length < w; P++)
            F.rdoDays.indexOf(P) < 0 && F.rdoDays.push(P);
        F.rdoHard = !0;
      } else
        F.rdoDays = t.consecutiveRdos(w, F.rdoSeed), F.rdoHard = !1;
    });
  }), u.forEach(function(c) {
    c.person && (v.push({
      id: h,
      lineCode: "Line " + String(h).padStart(3, "0"),
      shiftId: c.def.id,
      shiftName: c.def.name,
      shiftLabel: t.shiftLabel(c.def),
      empClass: c.person.empClass,
      sex: c.person.sex,
      function: "",
      rdoDays: c.rdoDays,
      rdoHard: c.rdoHard,
      paid: c.person.empClass === "PT" ? function() {
        var y = +(t.state && t.state.ptHoursPerDay);
        return Number.isFinite(y) && y > 0 ? Math.min(12, y) : 4;
      }() : c.def.paid || 8
    }), h++);
  }), v;
}
function Ir(t, r, a) {
  a = a || { M: 0, F: 0 };
  function n(d) {
    return t[d] > 0 ? (t[d]--, d) : null;
  }
  if (t.M <= 0 && t.F <= 0) return null;
  if (t.M <= 0) return n("F");
  if (t.F <= 0) return n("M");
  var o = a.M + a.F;
  if (o === 0) return r >= 0.5 ? n("F") : n("M");
  var s = a.F / o;
  return s < r - 0.02 ? n("F") : s > r + 0.02 || t.M >= t.F ? n("M") : n("F");
}
function Ar(t, r, a) {
  var n = a === "LTSO", o = {
    M: n ? t.state.ltsoM || 0 : t.state.stsoM || 0,
    F: n ? t.state.ltsoF || 0 : t.state.stsoF || 0
  }, s = o.M, d = o.F, i = s + d, u = i > 0 ? d / i : 0.5, l = { M: 0, F: 0 }, f = n ? "ltsoForce" : "stsoForce", v = t.state && typeof t.state.activeSeed == "number", h = v ? Ae(t.state.activeSeed + (n ? 2e3 : 1e3)) : null, c = t.state.shifts || [], y = [];
  c.forEach(function(T) {
    var L = r[T.id] || 0;
    L > 0 && (T[f] || 0) > 0 && y.push(T);
  }), c.forEach(function(T) {
    var L = r[T.id] || 0;
    L > 0 && !(T[f] > 0) && y.push(T);
  });
  var g = [];
  y.forEach(function(T) {
    for (var L = r[T.id] || 0, E = de(t, T.id), A = 0; A < L; A++)
      g.push({
        def: T,
        bandKey: E
      });
  });
  var m = {};
  g.forEach(function(T) {
    m[T.bandKey] || (m[T.bandKey] = []), m[T.bandKey].push(T);
  }), Object.keys(m).forEach(function(T) {
    var L = m[T], E = h ? Math.floor(h() * 7) : 0, A = E;
    L.forEach(function(C) {
      var I = (+C.def.paid || 8) >= 10 ? 4 : 5, F = 7 - I, B = Array.isArray(C.def.rdoHard) ? C.def.rdoHard.map(Number).filter(function(k) {
        return k >= 0 && k <= 6;
      }) : [];
      if (C.rdoSeed = A % 7, A++, B.length > 0) {
        if (C.rdoDays = B.slice(), C.rdoDays.length < F)
          for (var N = 0; N < 7 && C.rdoDays.length < F; N++)
            C.rdoDays.indexOf(N) < 0 && C.rdoDays.push(N);
        C.rdoHard = !0;
      } else
        C.rdoDays = t.consecutiveRdos(F, C.rdoSeed), C.rdoHard = !1;
    });
  }), Object.keys(m).forEach(function(T) {
    var L = m[T], E = {};
    L.forEach(function(k) {
      var R = k.rdoSeed;
      E[R] || (E[R] = []), E[R].push(k);
    });
    var A = 0;
    Object.keys(E).forEach(function(k) {
      E[k].length > A && (A = E[k].length);
    });
    for (var C = h ? qe([0, 1, 2, 3, 4, 5, 6], h) : [0, 1, 2, 3, 4, 5, 6], I = [], F = 0; F < A; F++)
      for (var B = 0; B < 7; B++) {
        var N = C[B];
        E[N] && E[N][F] && I.push(E[N][F]);
      }
    I.forEach(function(k) {
      var R = Ir(o, u, l);
      if (!R) {
        t.state.issues.push(k.def.name + ": " + a + " pool empty.");
        return;
      }
      l[R]++, k.sex = R;
    });
  });
  var p = [], b = n ? 2e4 : 1e4, M = b;
  return g.forEach(function(T) {
    T.sex && (p.push({
      id: M,
      lineCode: a + " " + String(p.length + 1).padStart(2, "0"),
      shiftId: T.def.id,
      shiftName: T.def.name,
      shiftLabel: t.shiftLabel(T.def),
      empClass: a,
      position: a,
      isLtso: n,
      isStso: !n,
      sex: T.sex,
      function: "",
      rdoDays: T.rdoDays,
      rdoHard: T.rdoHard,
      paid: T.def.paid || 8
    }), M++);
  }), p;
}
function S(t) {
  var r = Number(t);
  return Number.isFinite(r) && r > 0 ? Math.floor(r) : 0;
}
function Le() {
  return [{ start: "04:00", end: "20:30", min: 1 }];
}
function ke(t) {
  if (!t) return !1;
  var r = t.opsFte;
  if (r === !0 || r === 1) return !0;
  var a = String(r ?? "no").trim().toLowerCase();
  return a === "yes" || a === "y" || a === "true" || a === "1";
}
function kr(t) {
  return String(t && t.name || "Position").trim() || "Position";
}
function Or(t) {
  return t ? t.isExtra || t.extraPositionId ? !!t.opsFte : !0 : !1;
}
function wr(t, r) {
  var a = {}, n = t && typeof t == "object" ? t : {};
  return (r || []).forEach(function(o) {
    !o || !o.id || (a[o.id] = S(n[o.id]));
  }), Object.keys(n).forEach(function(o) {
    a[o] == null && (a[o] = S(n[o]));
  }), a;
}
function Dt(t, r, a) {
  return t = t && typeof t == "object" ? t : {}, t.id || (t.id = "extra-" + (r + 1)), t.name || (t.name = "Position"), t.m = S(t.m), t.f = S(t.f), t.opsFte = ke(t), (!Array.isArray(t.bands) || !t.bands.length) && (t.bands = Le()), t.shiftCounts = wr(t.shiftCounts, a), t;
}
function oe(t) {
  t.state || (t.state = {}), Array.isArray(t.state.extraPositions) || (t.state.extraPositions = []);
  var r = t.state && t.state.shifts || [];
  return t.state.extraPositions.forEach(function(a, n) {
    Dt(a, n, r);
  }), t.state.extraPositions;
}
function pe(t, r) {
  if (t && typeof t.$ == "function")
    try {
      var a = t.$(r);
      if (a) return a;
    } catch {
    }
  return typeof document < "u" ? document.querySelector(r) : null;
}
function Te(t) {
  var r = oe(t), a = t.state && t.state.shifts || [];
  return r.forEach(function(n) {
    var o = pe(t, '[data-extra-name="' + n.id + '"]'), s = pe(t, '[data-extra-m="' + n.id + '"]'), d = pe(t, '[data-extra-f="' + n.id + '"]'), i = pe(t, '[data-extra-ops="' + n.id + '"]');
    o && (n.name = String(o.value || n.name).trim() || n.name), s && (n.m = S(s.value)), d && (n.f = S(d.value)), i && (n.opsFte = String(i.value || "no").toLowerCase() === "yes"), Array.isArray(n.bands) || (n.bands = Le());
    for (var u = 0; u < n.bands.length; u++) {
      var l = n.bands[u] || {};
      ["start", "end", "min"].forEach(function(f) {
        var v = pe(t, '[data-extra-band="' + n.id + '"][data-extra-bi="' + u + '"][data-extra-bf="' + f + '"]');
        v && (f === "min" ? l[f] = S(v.value) : l[f] = v.value || l[f]);
      }), n.bands[u] = l;
    }
    n.shiftCounts = n.shiftCounts || {}, a.forEach(function(f) {
      if (!(!f || !f.id)) {
        var v = pe(t, '[data-extra-shift-count="' + n.id + '"][data-extra-shift-id="' + f.id + '"]');
        v && (n.shiftCounts[f.id] = S(v.value));
      }
    });
  }), r;
}
function Br(t, r) {
  if (!r || !r.length)
    return '<p class="muted extra-pos-shifts-empty">Add shifts to park this type on a start time.</p>';
  var a = r.map(function(n) {
    var o = t.shiftCounts && t.shiftCounts[n.id] != null ? S(t.shiftCounts[n.id]) : 0, s = (n.name || n.id) + (n.start ? " " + n.start : "");
    return '<label class="extra-shift-park">' + s + ' <input type="number" min="0" max="99" data-extra-shift-count="' + t.id + '" data-extra-shift-id="' + n.id + '" value="' + o + '" style="width:3.5rem"></label>';
  }).join("");
  return '<div class="extra-pos-shifts"><span class="muted">Park on shifts</span>' + a + "</div>";
}
function Pr(t, r) {
  return (t || []).map(function(a) {
    var n = (a.bands || []).map(function(d, i) {
      return '<tr><td><input type="time" data-extra-band="' + a.id + '" data-extra-bi="' + i + '" data-extra-bf="start" value="' + (d.start || "04:00") + '" step="900"></td><td><input type="time" data-extra-band="' + a.id + '" data-extra-bi="' + i + '" data-extra-bf="end" value="' + (d.end || "20:30") + '" step="900"></td><td><input type="number" min="0" max="99" data-extra-band="' + a.id + '" data-extra-bi="' + i + '" data-extra-bf="min" value="' + (d.min != null ? d.min : 0) + '" style="width:3.5rem"></td><td><button type="button" class="btn btn-red btn-sm" data-extra-band-remove="' + a.id + '" data-extra-bi="' + i + '">✕</button></td></tr>';
    }).join(""), o = ke(a) ? "yes" : "no", s = String(a.name || "").split('"').join("");
    return '<div class="extra-pos-card" data-extra-card="' + a.id + '"><div class="fte-sex-row extra-pos-head"><label>Name <input type="text" data-extra-name="' + a.id + '" value="' + s + '" style="width:7rem"></label><label>Male <input type="number" min="0" data-extra-m="' + a.id + '" value="' + S(a.m) + '" style="width:4.5rem"></label><label>Female <input type="number" min="0" data-extra-f="' + a.id + '" value="' + S(a.f) + '" style="width:4.5rem"></label><label>Ops FTE <select data-extra-ops="' + a.id + '"><option value="no"' + (o === "no" ? " selected" : "") + '>No</option><option value="yes"' + (o === "yes" ? " selected" : "") + '>Yes</option></select></label><button type="button" class="btn btn-red btn-sm" data-extra-remove="' + a.id + '">Remove</button><button type="button" class="btn btn-sm" data-extra-add-band="' + a.id + '">+ Band</button></div>' + Br(a, r) + '<div class="lines-scroll extra-pos-bands"><table class="data-table"><thead><tr><th>Start</th><th>End</th><th>Min</th><th></th></tr></thead><tbody>' + n + "</tbody></table></div></div>";
  }).join("");
}
function _r(t, r, a) {
  var n = [], o = r && r.length ? r : [];
  if (o.forEach(function(i) {
    for (var u = S(t.shiftCounts && i && t.shiftCounts[i.id]), l = 0; l < u; l++) n.push(i);
  }), !n.length && o.length)
    for (var s = 0; s < a; s++) n.push(o[s % o.length]);
  else if (n.length < a && o.length)
    for (var d = n.length; n.length < a; )
      n.push(o[d % o.length]), d++;
  return n.length > a && (n = n.slice(0, a)), n;
}
function Rr(t, r) {
  var a = +(t && t.paid || 8), n = String(t && t.empClass || "").trim().toUpperCase();
  if (n === "PT") return "PT";
  var o = r && r.state ? Number(r.state.ptHoursPerDay) : NaN;
  return Number.isFinite(o) && o > 0 && a > 0 && a <= o || a > 0 && a < 8 ? "PT" : "FT";
}
function Nr(t, r, a, n) {
  var o = Math.max(1, 7 - a), s = Array.isArray(r && r.rdoHard) ? r.rdoHard.map(Number).filter(function(l) {
    return l >= 0 && l <= 6;
  }) : [], d;
  if (s.length > 0) {
    if (d = s.slice(), d.length < o)
      for (var i = 0; i < 7 && d.length < o; i++)
        d.indexOf(i) < 0 && d.push(i);
  } else t && t.consecutiveRdos ? d = t.consecutiveRdos(o, n) : d = [0, 6];
  for (; d.length < o; )
    for (var u = 0; u < 7 && d.length < o; u++)
      d.indexOf(u) < 0 && d.push(u);
  return { rdoDays: d, hard: s.length > 0 };
}
function Hr(t) {
  var r = [], a = oe(t), n = t.state && t.state.shifts || [], o = n[0] || { id: "", name: "Shift", start: "04:00", end: "20:30", paid: 8, rdoHard: [] };
  return a.forEach(function(s, d) {
    var i = S(s.m), u = S(s.f), l = i + u;
    if (!l) return;
    (!s.bands || !s.bands.length) && t.state && t.state.issues && t.state.issues.push((s.name || "Position") + ": no coverage bands.");
    for (var f = (t.state && t.state.activeSeed || 42) + 3e3 + d * 100, v = Ae(f), h = kr(s), c = _r(s, n.length ? n : [o], l), y = [], g = 0; g < l; g++) {
      var m = c[g] || o, p = de(t, m.id);
      y.push({
        def: m,
        bandKey: p
      });
    }
    var b = {};
    y.forEach(function(I) {
      b[I.bandKey] || (b[I.bandKey] = []), b[I.bandKey].push(I);
    }), Object.keys(b).forEach(function(I) {
      var F = b[I], B = Math.floor(v() * 7), N = B;
      F.forEach(function(k) {
        k.rdoSeed = N % 7, N++;
      });
    });
    var M = i, T = u, L = l > 0 ? u / l : 0.5, E = { M: 0, F: 0 };
    function A() {
      if (M <= 0 && T <= 0) return null;
      if (M <= 0)
        return T--, "F";
      if (T <= 0)
        return M--, "M";
      var I = E.M + E.F;
      if (I === 0)
        return L >= 0.5 ? (T--, "F") : (M--, "M");
      var F = E.F / I;
      return F < L - 0.02 ? (T--, "F") : F > L + 0.02 || M >= T ? (M--, "M") : (T--, "F");
    }
    Object.keys(b).forEach(function(I) {
      var F = b[I], B = {};
      F.forEach(function(P) {
        var V = P.rdoSeed;
        B[V] || (B[V] = []), B[V].push(P);
      });
      var N = 0;
      Object.keys(B).forEach(function(P) {
        B[P].length > N && (N = B[P].length);
      });
      for (var k = qe([0, 1, 2, 3, 4, 5, 6], v), R = [], _ = 0; _ < N; _++)
        for (var w = 0; w < 7; w++) {
          var x = k[w];
          B[x] && B[x][_] && R.push(B[x][_]);
        }
      R.forEach(function(P) {
        var V = A();
        if (V) {
          E[V]++, P.sex = V;
          var D = Rr(P.def, t), G = t.targetWorkDays ? t.targetWorkDays(P.def.id, D) : (+P.def.paid || 8) >= 10 ? 4 : 5, W = Nr(t, P.def, G, P.rdoSeed);
          P.empClass = D, P.rdoDays = W.rdoDays, P.rdoHard = W.hard;
        }
      });
    });
    var C = 3e4 + d * 1e3;
    y.forEach(function(I, F) {
      I.sex && r.push({
        id: C + F + 1,
        lineCode: h + " " + String(F + 1).padStart(2, "0"),
        shiftId: I.def.id,
        shiftName: I.def.name,
        shiftLabel: t.shiftLabel ? t.shiftLabel(I.def) : (I.def.start || "") + "-" + (I.def.end || ""),
        empClass: I.empClass,
        position: h,
        isLtso: !1,
        isStso: !1,
        isExtra: !0,
        extraPositionId: s.id,
        extraName: h,
        opsFte: ke(s),
        sex: I.sex,
        function: "",
        rdoDays: I.rdoDays,
        rdoHard: I.rdoHard,
        paid: I.def.paid || 8
      });
    });
  }), r;
}
function It(t) {
  t && (t.opsFteYes = ke, t.lineInOpsCoverage = Or, t.ensureExtraPositions = function() {
    return oe(t);
  }, t.readExtraPositionsFromDom = function() {
    return Te(t);
  }, t.buildExtraPositionLines = function() {
    return Hr(t);
  }, t.renderExtraPositions = function() {
    var r = typeof document < "u" ? document.getElementById("extra-pos-list") : null;
    if (r) {
      var a = oe(t);
      r.innerHTML = Pr(a, t.state && t.state.shifts || []);
    }
  }, t.addExtraPosition = function(r) {
    Te(t);
    var a = oe(t);
    a.push(Dt({
      id: "extra-" + Date.now() + "-" + (a.length + 1),
      name: r || "MSTI",
      m: 0,
      f: 0,
      opsFte: !1,
      bands: Le(),
      shiftCounts: {}
    }, a.length, t.state && t.state.shifts || [])), t.renderExtraPositions();
  }, typeof document < "u" && !t._extraDocBound && (t._extraDocBound = !0, document.addEventListener("click", function(r) {
    var a = r.target;
    if (!(!a || !a.getAttribute)) {
      var n = a.getAttribute("data-extra-remove");
      if (n != null) {
        Te(t), t.state.extraPositions = oe(t).filter(function(c) {
          return c.id !== n;
        }), t.renderExtraPositions();
        return;
      }
      var o = a.getAttribute("data-extra-add-band");
      if (o != null) {
        Te(t);
        for (var s = oe(t), d = null, i = 0; i < s.length; i++) s[i].id === o && (d = s[i]);
        d && (Array.isArray(d.bands) || (d.bands = Le()), d.bands.push({ start: "04:00", end: "20:30", min: 1 })), t.renderExtraPositions();
        return;
      }
      var u = a.getAttribute("data-extra-band-remove"), l = a.getAttribute("data-extra-bi");
      if (u != null) {
        Te(t);
        for (var f = oe(t), v = null, h = 0; h < f.length; h++) f[h].id === u && (v = f[h]);
        v && Array.isArray(v.bands) && v.bands.splice(+l, 1), t.renderExtraPositions();
      }
    }
  })));
}
var Gr = ["ESTI", "MSTI"];
function ge(t) {
  var r = String(t ?? "").trim().toUpperCase();
  return r === "ESTI" || r === "MSTI";
}
function At(t) {
  return t ? !!(t.isTraining || t.trainingClass || ge(t.empClass) || ge(t.position) || ge(t.extraName) || ge(t.role)) : !1;
}
function ct(t) {
  var r = Number(t);
  return Number.isFinite(r) && r > 0 ? Math.floor(r) : 0;
}
function jr(t) {
  var r = t && t.state || {};
  return { ESTI: ct(r.esti), MSTI: ct(r.msti) };
}
function qr(t, r) {
  var a = t && t.length ? t : [], n = [];
  if (!a.length) {
    for (var o = { id: "", name: "Shift", start: "04:00", end: "20:30", paid: 8, rdoHard: [] }, s = 0; s < r; s++) n.push(o);
    return n;
  }
  for (var d = 0; d < r; d++) n.push(a[d % a.length]);
  return n;
}
function Ur(t, r, a, n) {
  var o = Math.max(1, 7 - a), s = Array.isArray(r && r.rdoHard) ? r.rdoHard.map(Number).filter(function(l) {
    return l >= 0 && l <= 6;
  }) : [], d;
  if (s.length > 0) {
    if (d = s.slice(), d.length < o)
      for (var i = 0; i < 7 && d.length < o; i++)
        d.indexOf(i) < 0 && d.push(i);
  } else t && t.consecutiveRdos ? d = t.consecutiveRdos(o, n) : d = [0, 6];
  for (; d.length < o; )
    for (var u = 0; u < 7 && d.length < o; u++)
      d.indexOf(u) < 0 && d.push(u);
  return { rdoDays: d, hard: s.length > 0 };
}
function Vr(t) {
  var r = [], a = jr(t), n = t.state && t.state.shifts || [], o = n[0] || { id: "", name: "Shift", start: "04:00", end: "20:30", paid: 8, rdoHard: [] };
  return Gr.forEach(function(s, d) {
    var i = a[s] || 0;
    if (i) {
      for (var u = (t.state && t.state.activeSeed || 42) + 4e3 + d * 100, l = Ae(u), f = qr(n.length ? n : [o], i), v = [], h = 0; h < i; h++) {
        var c = f[h] || o, y = de(t, c.id);
        v.push({
          def: c,
          bandKey: y
        });
      }
      var g = {};
      v.forEach(function(p) {
        g[p.bandKey] || (g[p.bandKey] = []), g[p.bandKey].push(p);
      }), Object.keys(g).forEach(function(p) {
        var b = g[p], M = Math.floor(l() * 7), T = M;
        b.forEach(function(L) {
          L.rdoSeed = T % 7, T++;
          var E = t.targetWorkDays ? t.targetWorkDays(L.def.id, "FT") : (+L.def.paid || 8) >= 10 ? 4 : 5, A = Ur(t, L.def, E, L.rdoSeed);
          L.rdoDays = A.rdoDays, L.rdoHard = A.hard;
        });
      });
      var m = 4e4 + d * 1e3;
      v.forEach(function(p, b) {
        r.push({
          id: m + b + 1,
          lineCode: s + " " + String(b + 1).padStart(2, "0"),
          shiftId: p.def.id,
          shiftName: p.def.name,
          shiftLabel: t.shiftLabel ? t.shiftLabel(p.def) : (p.def.start || "") + "-" + (p.def.end || ""),
          empClass: s,
          position: s,
          role: s,
          isLtso: !1,
          isStso: !1,
          isExtra: !0,
          isTraining: !0,
          trainingClass: s,
          extraPositionId: "training-" + s,
          extraName: s,
          opsFte: !1,
          sex: "",
          function: "TRAINING",
          rdoDays: p.rdoDays,
          rdoHard: p.rdoHard,
          paid: p.def.paid || 8
        });
      });
    }
  }), r;
}
function Wr(t) {
  var r = t && t.state && t.state.lines || [];
  t.teams = t.teams || { teams: [] }, Array.isArray(t.teams.teams) || (t.teams.teams = []);
  var a = {}, n = {};
  return r.forEach(function(o) {
    if (At(o)) {
      var s = String(o.trainingClass || o.empClass || o.extraName || "").trim().toUpperCase();
      ge(s) && (n[+o.id] = s, a[s] || (a[s] = []), a[s].push(o.id));
    }
  }), Object.keys(a).forEach(function(o) {
    var s = t.teams.teams.find(function(d) {
      return d.trainingGroup === o || d.extraGroup === o || d.name === o;
    });
    s || (s = {
      id: "TR-" + o,
      name: o,
      members: [],
      followMe: !1,
      phase: null,
      extraGroup: o,
      trainingGroup: o
    }, t.teams.teams.push(s)), s.extraGroup = o, s.trainingGroup = o, s.name = o, s.members = a[o].slice();
  }), t.teams.teams.forEach(function(o) {
    if (o.trainingGroup && a[o.trainingGroup]) {
      o.members = a[o.trainingGroup].slice();
      return;
    }
    o.members = (o.members || []).filter(function(s) {
      return !n[+s] || o.trainingGroup && n[+s] === o.trainingGroup;
    });
  }), a;
}
function kt(t) {
  t && (t.isTrainingClassName = ge, t.isTrainingLine = At, t.buildTrainingClassLines = function() {
    return Vr(t);
  }, t.formTrainingTeams = function() {
    return Wr(t);
  });
}
function ue(t, r = null) {
  const a = new CustomEvent(t, { detail: r });
  window.dispatchEvent(a);
}
const le = {
  // Core Lines Table Events
  LINES_REQUEST_RENDER: "lines:request-render",
  LINES_INLINE_EDIT: "lines:inline-edit",
  LINES_DAY_TOGGLE: "lines:day-toggle",
  LINES_FILTER_CHANGE: "lines:filter-change",
  LINES_SORT_CHANGE: "lines:sort-change",
  LINES_COVERAGE_REFRESH: "lines:coverage-refresh",
  LINES_SCROLL_INDEX: "lines:scroll-index",
  LINES_EXPORT_XLSX: "lines:export-xlsx",
  LINES_TEAM_FORMATION: "lines:team-formation",
  LINES_TEAM_REBALANCE: "lines:team-rebalance",
  // Setup Panel Events
  SETUP_GENERATE_START: "setup:generate-start",
  SETUP_GENERATE_COMPLETE: "setup:generate-complete",
  SETUP_ISSUES_DETECTED: "setup:issues-detected",
  // Coverage Events
  COVERAGE_RECALC: "coverage:recalc",
  // Team Builder Events
  TEAM_FORMATION_START: "team:formation-start",
  TEAM_FORMATION_COMPLETE: "team:formation-complete",
  TEAM_REBALANCE: "team:rebalance",
  // Demand Capacity
  DEMAND_CAPACITY_UPDATE: "demand:capacity-update",
  // General System Events
  SYSTEM_STATUS_UPDATE: "system:status-update",
  SYSTEM_CLEAR_ALL: "system:clear-all",
  SETUP_MOUNTED: "setup:mounted",
  INSTRUCTIONS_SHOWN: "instructions:shown"
};
function Jr() {
  return typeof window < "u" && window.luxon && window.luxon.DateTime ? window.luxon.DateTime : typeof globalThis < "u" && globalThis.luxon && globalThis.luxon.DateTime ? globalThis.luxon.DateTime : null;
}
function ye(t) {
  var r = Jr();
  if (r) {
    if (!t) return r.now().startOf("day");
    if (typeof t == "string") {
      var a = r.fromISO(t.slice(0, 10));
      if (a.isValid) return a.startOf("day");
    }
    return t && typeof t.toJSDate == "function" ? r.fromJSDate(t.toJSDate()).startOf("day") : t instanceof Date ? r.fromJSDate(t).startOf("day") : t && t.isValid && t.toISODate ? t.startOf ? t.startOf("day") : t : r.now().startOf("day");
  }
  var n;
  return t ? typeof t == "string" ? n = /* @__PURE__ */ new Date(t.slice(0, 10) + "T00:00:00") : t instanceof Date ? n = new Date(t.getTime()) : t && t.toJSDate ? n = t.toJSDate() : n = /* @__PURE__ */ new Date() : n = /* @__PURE__ */ new Date(), isNaN(n.getTime()) && (n = /* @__PURE__ */ new Date()), n.setHours(0, 0, 0, 0), {
    isValid: !0,
    weekday: n.getDay() === 0 ? 7 : n.getDay(),
    startOf: function() {
      return ye(n);
    },
    plus: function(o) {
      var s = new Date(n.getTime());
      return o && o.days && s.setDate(s.getDate() + o.days), ye(s);
    },
    toFormat: function(o) {
      var s = n.getFullYear(), d = String(n.getMonth() + 1).padStart(2, "0"), i = String(n.getDate()).padStart(2, "0");
      return s + "-" + d + "-" + i;
    },
    toISODate: function() {
      var o = n.getFullYear(), s = String(n.getMonth() + 1).padStart(2, "0"), d = String(n.getDate()).padStart(2, "0");
      return o + "-" + s + "-" + d;
    },
    toJSDate: function() {
      return n;
    }
  };
}
function Ot(t, r) {
  return ye(t).plus({ days: r });
}
function wt(t) {
  return ye(t).weekday % 7;
}
function Ue(t, r, a) {
  for (var n = [], o = new Set((r.rdoDays || []).map(Number)), s = t.targetWorkDays(r.shiftId, r.empClass), d = ye(t.state.startDate), i = Math.ceil(a / 7), u = 0; u < i; u++) {
    for (var l = [], f = 0; f < 7; f++) {
      var v = u * 7 + f;
      if (v >= a) break;
      l.push({ off: v, dow: wt(Ot(d, v)) });
    }
    var h = {};
    l.forEach(function(y) {
      h[y.off] = o.has(y.dow) ? "RDO" : "WORK";
    });
    var c = l.filter(function(y) {
      return h[y.off] === "WORK";
    }).sort(function(y, g) {
      return y.dow - g.dow;
    });
    c.forEach(function(y, g) {
      h[y.off] = g < s ? "WORK" : "RDO";
    }), l.forEach(function(y) {
      n[y.off] = h[y.off];
    });
  }
  for (var f = 0; f < a; f++) n[f] || (n[f] = "RDO");
  return n.slice(0, a);
}
function vt(t) {
  t.state.issues = [], t.collectSetupInputs && t.collectSetupInputs(), t.readShiftsFromDom && t.readShiftsFromDom();
  var r = String(t.state.generateSeed || "random").trim().toLowerCase();
  if (!r || r === "random")
    t.state.activeSeed = Math.floor(Math.random() * 2147483647);
  else {
    var a = parseInt(r, 10);
    t.state.activeSeed = Number.isFinite(a) ? Math.abs(a) : 42;
  }
  if (!t.state.shifts || !t.state.shifts.length) {
    t.state.issues.push("Add at least one shift with a start and end time."), t.renderAll && t.renderAll(), t.updateStatus && t.updateStatus("No shifts defined.");
    return;
  }
  t.state.shifts.forEach(function(D) {
    if (!(!D.rdoHard || !D.rdoHard.length)) {
      var G = t.rdoCountForShift(D, "FT");
      D.rdoHard.length !== G && (D.rdoHard.length > G ? t.state.issues.push(D.name + ": hard RDOs checked " + D.rdoHard.length + " day(s) exceeds pattern target " + G + " (paid " + D.paid + "h). Extra hard days kept; work-day count drops.") : t.state.issues.push(D.name + ": hard RDOs checked " + D.rdoHard.length + " day(s); padded to pattern target " + G + " (paid " + D.paid + "h)."));
    }
  }), t.readExtraPositionsFromDom && t.readExtraPositionsFromDom();
  var n = 0;
  (t.state && t.state.extraPositions || []).forEach(function(D) {
    n += (+D.m || 0) + (+D.f || 0);
  });
  var o = (+t.state.esti || 0) + (+t.state.msti || 0), s = t.state.ftM + t.state.ftF + t.state.ptM + t.state.ptF;
  if (s <= 0 && n <= 0 && o <= 0) {
    t.state.issues.push("Set FT/PT male and female headcounts above zero, or add an extra type with people."), t.state.lines = [], t.state.schedule = {}, t.renderAll && t.renderAll(), t.updateStatus && t.updateStatus("No staff to schedule.");
    return;
  }
  var d = t.timeToMin(t.state.open), i = t.timeToMin(t.state.close);
  if (i <= d) {
    t.state.issues.push("Close time must be after open time."), t.renderAll && t.renderAll();
    return;
  }
  var u = [];
  t.state.lines && Array.isArray(t.state.lines) && t.isLineScheduleLocked && (u = t.state.lines.filter(function(D) {
    return t.isLineScheduleLocked(D);
  }));
  function l(D, G, W) {
    var j = Object.assign({}, D || {});
    return G.forEach(function(H) {
      W(H) && H.shiftId && j[H.shiftId] > 0 && j[H.shiftId]--;
    }), j;
  }
  var f = function(D) {
    return !(D.isLtso || D.isStso || D.empClass === "LTSO" || D.empClass === "STSO" || D.isExtra || D.extraPositionId || D.isTraining || D.trainingClass);
  }, v = function(D) {
    return D.isLtso || D.empClass === "LTSO";
  }, h = function(D) {
    return D.isStso || D.empClass === "STSO";
  }, c = u.filter(f), y = u.filter(v), g = u.filter(h), m = u.filter(function(D) {
    return !f(D) && !v(D) && !h(D);
  });
  u.forEach(function(D) {
    var G = t.getShift ? t.getShift(D.shiftId) : null;
    G && (D.shiftName = G.name, D.shiftLabel = t.shiftLabel ? t.shiftLabel(G) : (G.start || "") + "–" + (G.end || ""), D.startTime !== void 0 && (D.startTime = G.start), D.endTime !== void 0 && (D.endTime = G.end), D.start !== void 0 && (D.start = G.start), D.end !== void 0 && (D.end = G.end));
  });
  var p = [], b = "extras";
  if (s > 0) {
    var M = t.allocateShiftHeadcounts(s, d, i), T = l(M.counts, c, f);
    b = M.mode, p = t.buildLines(T);
  }
  t.state.mode = b;
  var L = Math.max(0, t.state.ltsoM + t.state.ltsoF - y.length), E = [];
  if (L > 0) {
    var A = t.allocateSupervisoryHeadcounts(L, d, i, "ltsoForce", p);
    E = t.buildSupervisoryLines(A.counts || {}, "LTSO");
  }
  var C = Math.max(0, t.state.stsoM + t.state.stsoF - g.length), I = [];
  if (C > 0) {
    var F = t.allocateSupervisoryHeadcounts(C, d, i, "stsoForce", p);
    I = t.buildSupervisoryLines(F.counts || {}, "STSO");
  }
  var B = t.buildExtraPositionLines ? t.buildExtraPositionLines() : [], N = t.buildTrainingClassLines ? t.buildTrainingClassLines() : [];
  t.state.lines = [].concat(
    c,
    p,
    y,
    E,
    g,
    I,
    m,
    B,
    N
  );
  var k = t.state.weekCount * 7;
  t.state.schedule = {}, t.state.lines.forEach(function(D) {
    t.state.schedule[D.id] = Ue(t, D, k);
  }), t.readFunctionBandsFromDom && t.readFunctionBandsFromDom();
  var R = t.getFunctionMode ? t.getFunctionMode() : "none";
  t.generateFunctionAssignments ? t.generateFunctionAssignments({ fromGenerate: !0 }) : t.clearLineFunctions && t.clearLineFunctions(), t.assignCertPools && t.assignCertPools();
  var _ = [];
  if (function() {
    var G = t.state.lines || [], W = { TSO: !0, LTSO: !0, STSO: !0, FT: !0, PT: !0 };
    function j(q) {
      var z = String(q.extraName || q.position || "").trim();
      return z && !W[z] ? z : "";
    }
    t.teams = t.teams || { teams: [] }, Array.isArray(t.teams.teams) || (t.teams.teams = []);
    var H = {}, X = {};
    G.forEach(function(q) {
      if ((q.isExtra || q.extraPositionId) && !(q.isTraining || t.isTrainingLine && t.isTrainingLine(q))) {
        var z = t.lineInOpsCoverage ? t.lineInOpsCoverage(q) : !!q.opsFte;
        if (z) {
          X[+q.id] = !0;
          var Y = j(q);
          Y && (H[Y] || (H[Y] = []), H[Y].push(q.id));
        }
      }
    }), Object.keys(H).forEach(function(q) {
      var z = t.teams.teams.find(function(U) {
        return U.extraGroup === q || U.name === q;
      });
      z || (z = { id: "TX-" + q, name: q, members: [], followMe: !1, phase: null, extraGroup: q }, t.teams.teams.push(z)), z.extraGroup = q, z.name = q;
      var Y = {};
      (z.members || []).forEach(function(U) {
        Y[+U] = !0;
      }), H[q].forEach(function(U) {
        Y[+U] || z.members.push(U);
      });
    }), t.teams.teams.forEach(function(q) {
      var z = String(q.name || "").trim().toUpperCase(), Y = W[z] || W[String(q.extraGroup || "").trim().toUpperCase()];
      if (q.extraGroup && H[q.extraGroup]) {
        q.members = H[q.extraGroup].slice();
        return;
      }
      q.members = (q.members || []).filter(function(U) {
        var Z = G.find(function(ee) {
          return +ee.id == +U;
        });
        if (Z && (Z.isExtra || Z.extraPositionId)) {
          var te = t.lineInOpsCoverage ? t.lineInOpsCoverage(Z) : !!Z.opsFte;
          if (!te) return !1;
        }
        return !X[+U] || q.extraGroup && H[q.extraGroup] && H[q.extraGroup].indexOf(U) >= 0 ? !0 : !Y && !!q.extraGroup;
      });
    }), t.formTrainingTeams && t.formTrainingTeams();
  }(), t.renderTeams)
    try {
      t.renderTeams();
    } catch {
    }
  for (var w = t.state.lines.filter(function(D) {
    return D.isLtso || D.isStso ? !1 : D.isExtra || D.extraPositionId ? !!D.opsFte : !0;
  }), x = 0; x < Math.min(7, k); x++)
    _.push(w.filter(function(D) {
      return t.state.schedule[D.id][x] === "WORK";
    }).length);
  var P = Math.min.apply(null, _), V = Math.max.apply(null, _);
  V - P > Math.max(2, Math.ceil(s * 0.15)) && t.state.issues.push("Day-of-week TSO headcount still varies " + P + "–" + V + " (RDO stagger). Prefer varied seeds are already applied.");
  try {
    t.renderAll && t.renderAll(), t.renderCoverageBars && t.renderCoverageBars(), t.__USE_SVELTE_LINES ? ue(le.LINES_REQUEST_RENDER, null) : t.renderLines && t.renderLines();
  } catch (D) {
    console.error("generate UI refresh", D);
  }
  t.updateStatus && t.updateStatus(
    "Scheduled " + t.state.lines.length + " lines (FT " + t.state.ftM + "/" + t.state.ftF + " · PT " + t.state.ptM + "/" + t.state.ptF + " · LTSO " + t.state.ltsoM + "/" + t.state.ltsoF + " · STSO " + t.state.stsoM + "/" + t.state.stsoF + " · ESTI " + (t.state.esti || 0) + " · MSTI " + (t.state.msti || 0) + ") · " + b + " · " + t.state.weekCount + " wk" + (R && R !== "none" ? " · " + String(R).toUpperCase() + " duties" : "") + (t.state.issues.length ? " · " + t.state.issues.length + " note(s)" : "")
  );
}
function Xr(t) {
  t && (t.buildScheduleForLine = function(r, a) {
    return Ue(t, r, a);
  }, t._setupGenerate = function() {
    return vt(t);
  }, t.generate = function() {
    return vt(t);
  });
}
function Ve(t, r) {
  for (var a = [], n = t; n < r; n += 30) a.push(n);
  return a;
}
function Bt(t, r, a, n) {
  var o = n || {}, s = Object.assign({}, r), d = Object.keys(s);
  if (d.length < 2) return s;
  function i(y) {
    var g = 1 / 0, m = -1 / 0;
    return a.forEach(function(p) {
      var b = 0;
      d.forEach(function(M) {
        t.shiftCoversSlot(M, p) && (b += y[M] || 0);
      }), b < g && (g = b), b > m && (m = b);
    }), m - g;
  }
  for (var u = i(s), l = 0; l < 80; l++) {
    for (var f = !1, v = 0; v < d.length; v++)
      if (!o[d[v]]) {
        for (var h = 0; h < d.length; h++)
          if (!(v === h || (s[d[v]] || 0) <= 0) && !o[d[h]]) {
            s[d[v]]--, s[d[h]] = (s[d[h]] || 0) + 1;
            var c = i(s);
            c < u ? (u = c, f = !0) : (s[d[h]]--, s[d[v]]++);
          }
      }
    if (!f) break;
  }
  return s;
}
function zr(t, r, a, n) {
  var o = Ve(a, n), s = (t.state.shifts || []).filter(function(p) {
    return t.shiftOverlapsWindow(p, a, n);
  });
  if (!s.length || r <= 0) return { counts: {}, mode: "none" };
  var d = {}, i = 0;
  if (s.forEach(function(p) {
    var b = Math.max(0, Math.floor(Number(p.force) || 0));
    b > 0 && (d[p.id] = b, i += b);
  }), i > r) {
    t.state.issues.push("Force total (" + i + ") exceeds staff (" + r + ") — scaled down proportionally.");
    var u = r / i, l = 0, f = Object.keys(d);
    f.forEach(function(p, b) {
      b === f.length - 1 ? d[p] = r - l : (d[p] = Math.floor(d[p] * u), l += d[p]);
    }), i = r;
  }
  var v = r - i, h = s.filter(function(p) {
    return !d[p.id];
  });
  v > 0 && !h.length && t.state.issues.push("All shifts have Force > 0 but " + v + " people left unassigned — add a shift with Force 0 or raise a force.");
  var c = Object.assign({}, d);
  if (h.forEach(function(p) {
    c[p.id] = c[p.id] || 0;
  }), h.length && v > 0) {
    var y = h.map(function(p) {
      var b = 0;
      return o.forEach(function(M) {
        t.shiftCoversSlot(p.id, M) && b++;
      }), Math.max(1, b);
    }), g = y.reduce(function(p, b) {
      return p + b;
    }, 0), m = 0;
    h.forEach(function(p, b) {
      if (b === h.length - 1) c[p.id] = (c[p.id] || 0) + (v - m);
      else {
        var M = Math.floor(v * y[b] / g);
        c[p.id] = (c[p.id] || 0) + M, m += M;
      }
    });
  }
  return { counts: c, mode: "heuristic" };
}
function Yr(t, r, a, n, o, s) {
  var d = Ve(a, n), i = (t.state.shifts || []).filter(function(T) {
    return t.shiftOverlapsWindow(T, a, n);
  });
  if (!i.length || r <= 0) return { counts: {} };
  var u = {}, l = 0;
  if (i.forEach(function(T) {
    var L = Math.max(0, Math.floor(Number(T[o]) || 0));
    L > 0 && (u[T.id] = L, l += L);
  }), l > r) {
    t.state.issues.push(o.replace("Force", "").toUpperCase() + " force total (" + l + ") exceeds pool (" + r + ") — scaled down.");
    var f = r / l, v = 0, h = Object.keys(u);
    h.forEach(function(T, L) {
      L === h.length - 1 ? u[T] = r - v : (u[T] = Math.floor(u[T] * f), v += u[T]);
    }), l = r;
  }
  var c = r - l, y = i.filter(function(T) {
    return !u[T.id];
  }), g = Object.assign({}, u);
  if (y.forEach(function(T) {
    g[T.id] = g[T.id] || 0;
  }), y.length && c > 0) {
    var m = {};
    (s || t.state.lines || []).forEach(function(T) {
      T.isStso || T.isLtso || (m[T.shiftId] = (m[T.shiftId] || 0) + 1);
    });
    var p = y.map(function(T) {
      if (m[T.id] > 0) return m[T.id];
      var L = 0;
      return d.forEach(function(E) {
        t.shiftCoversSlot(T.id, E) && L++;
      }), Math.max(1, L);
    }), b = p.reduce(function(T, L) {
      return T + L;
    }, 0) || 1, M = 0;
    y.forEach(function(T, L) {
      if (L === y.length - 1) g[T.id] = (g[T.id] || 0) + (c - M);
      else {
        var E = Math.floor(c * p[L] / b);
        g[T.id] = (g[T.id] || 0) + E, M += E;
      }
    });
  }
  return { counts: Bt(t, g, d, u) };
}
function Qr(t) {
  return t ? t.isExtra || t.extraPositionId ? t.opsFte ? String(t.extraName || t.position || "").trim() : "" : t.isStso || t.empClass === "STSO" ? "STSO" : t.isLtso || t.empClass === "LTSO" ? "LTSO" : t.empClass === "FT" || t.empClass === "PT" || t.empClass === "TSO" || !t.empClass ? "TSO" : "" : "";
}
function $r(t) {
  var r = Qr(t);
  if (!r) return "";
  var a = t && t.sex === "F" ? "F" : "M";
  return r + ":" + a;
}
function Zr(t, r) {
  var a = String(t || "").toUpperCase();
  if (a !== "DFO" && a !== "BAG" && a !== "PAX") return "";
  var n = r && r.functionMap ? r.functionMap[a] : "";
  return n ? String(n) : "";
}
function De(t, r) {
  if (typeof t == "number" && Number.isFinite(t)) return t;
  if (typeof r == "function") {
    var a = r(t);
    if (Number.isFinite(a)) return a;
  }
  var n = String(t || ""), o = n.match(/^(\d{1,2}):(\d{2})/);
  return o ? +o[1] * 60 + +o[2] : 0;
}
function Kr(t, r, a) {
  if (!a) return !0;
  var n = a[t.id] || a[String(t.id)];
  return !Array.isArray(n) || !n.length ? !0 : (n[r] || "RDO") === "WORK";
}
function Pt(t, r) {
  var a = r.getShift ? r.getShift(t.shiftId) : null, n = De(a && a.start, r.timeToMin), o = De(a && a.end, r.timeToMin);
  return o <= n && (o += 24 * 60), { start: n, end: o };
}
function _t(t, r, a, n) {
  if (!Kr(t, r, n.schedule)) return !1;
  var o = Pt(t, n), s = a;
  return s < o.start && o.end > 24 * 60 && (s += 24 * 60), s >= o.start && s < o.end;
}
function Sr(t, r) {
  var a = r.openMin, n = r.closeMin;
  return r.dayHours && r.dayHours[t] && (a = De(r.dayHours[t].open, r.timeToMin), n = De(r.dayHours[t].close, r.timeToMin)), Number.isFinite(a) || (a = 0), (!Number.isFinite(n) || n <= a) && (n = a + 24 * 60), { open: a, close: n };
}
function ea(t, r) {
  for (var a = [], n = {}, o = 0; o < 7; o++) {
    var s = Sr(o, t), d = s.open, i = s.close;
    (!Number.isFinite(d) || !Number.isFinite(i) || i <= d) && r.forEach(function(f) {
      var v = Pt(f, t);
      (v.start < d || d === 0) && (d = v.start), v.end > i && (i = v.end);
    });
    for (var u = d; u < i; u += 60) {
      var l = o + ":" + u;
      n[l] || (n[l] = !0, a.push({ day: o, hour: u }));
    }
  }
  return a;
}
function ta(t, r, a, n) {
  var o = [];
  if (r.forEach(function(i) {
    _t(i, t.day, t.hour, n) && o.push(i);
  }), !o.length) return !1;
  var s = o.filter(function(i) {
    return i.certPool === "B";
  }).length, d = Math.ceil(o.length * (a.targetBPercent / 100) - 1e-9);
  return s < d;
}
function ra(t, r, a) {
  t.forEach(function(l) {
    var f = Zr(l.function, r);
    l.certPool = f || "";
  });
  for (var n = ea(a, t), o = 0, s = t.length * 8; o++ < s; ) {
    var d = n.filter(function(l) {
      return ta(l, t, r, a);
    });
    if (!d.length) break;
    var i = null, u = 0;
    if (t.forEach(function(l) {
      if (!l.certPool) {
        var f = 0;
        d.forEach(function(v) {
          _t(l, v.day, v.hour, a) && f++;
        }), f > u ? (u = f, i = l) : f === u && f > 0 && i && (l.id || 0) < (i.id || 0) && (i = l);
      }
    }), !i || u <= 0) break;
    i.certPool = "B";
  }
  t.forEach(function(l) {
    l.certPool || (l.certPool = "A");
  });
}
function We(t, r, a) {
  r = Oe(r);
  var n = Array.isArray(t) ? t : [], o = typeof a == "function" ? { startMinOf: a, schedule: null, getShift: null, timeToMin: null, openMin: 0, closeMin: 24 * 60, dayHours: null } : a && typeof a == "object" ? a : {};
  o.startMinOf || (o.startMinOf = function() {
    return 0;
  });
  var s = {};
  return n.forEach(function(d) {
    if (d) {
      if ((d.isExtra || d.extraPositionId) && !d.opsFte) {
        d.certPool = "";
        return;
      }
      var i = $r(d);
      if (!i) {
        d.certPool = "";
        return;
      }
      s[i] || (s[i] = []), s[i].push(d);
    }
  }), Object.keys(s).forEach(function(d) {
    ra(s[d], r, o);
  }), n.forEach(function(d) {
    if (d) {
      var i = !!(d.isExtra || d.extraPositionId);
      if (i && !d.opsFte) {
        d.certPool = "";
        return;
      }
      !i && !d.certPool && (d.certPool = "A");
    }
  }), n;
}
function aa(t) {
  if (!(!t || !t.state)) {
    t.ensureCertPoolConfig && t.ensureCertPoolConfig(), typeof document < "u" && document.getElementById("cfg-cert-pool-b-pct") && t.readCertPoolFromDom && t.readCertPoolFromDom();
    var r = t.timeToMin && t.state.open ? t.timeToMin(t.state.open) : 0, a = t.timeToMin && t.state.close ? t.timeToMin(t.state.close) : 24 * 60;
    We(t.state.lines || [], t.state.certPool, {
      startMinOf: function(n) {
        if (t.getShift && t.timeToMin) {
          var o = t.getShift(n.shiftId);
          return o ? t.timeToMin(o.start) : 0;
        }
        return 0;
      },
      getShift: t.getShift,
      timeToMin: t.timeToMin,
      schedule: t.state.schedule || {},
      openMin: r,
      closeMin: a,
      dayHours: t.state.useDynamicHours ? t.state.dayHours : null
    });
  }
}
function Rt(t) {
  var r = typeof document < "u" ? document.getElementById("cfg-cert-dfo") : null, a = typeof document < "u" ? document.getElementById("cfg-cert-pax") : null, n = typeof document < "u" ? document.getElementById("cfg-cert-bag") : null, o = typeof document < "u" ? document.getElementById("cfg-cert-dfo-on") : null, s = typeof document < "u" ? document.getElementById("cfg-cert-bag-on") : null;
  t.state.certDfoMax = Math.max(0, Math.floor(+(r && r.value) || 0)), t.state.certPaxMax = Math.max(0, Math.floor(+(a && a.value) || 0)), t.state.certBagMax = Math.max(0, Math.floor(+(n && n.value) || 0)), t.state.certDfoEnabled = !o || !!o.checked, t.state.certBagEnabled = !s || !!s.checked;
}
function Nt(t) {
  (t.state.lines || []).forEach(function(r) {
    r.function = "";
  });
}
function na(t) {
  if (Rt(t), !t.state.lines || !t.state.lines.length) {
    t.updateStatus && t.updateStatus("Generate lines first, then assign certifications.");
    return;
  }
  Nt(t);
  var r = [];
  if (t.state.certDfoEnabled && t.state.certDfoMax > 0)
    for (var a = 0; a < t.state.certDfoMax; a++) r.push("DFO");
  if (t.state.certPaxMax > 0)
    for (var n = 0; n < t.state.certPaxMax; n++) r.push("PAX");
  if (t.state.certBagEnabled && t.state.certBagMax > 0)
    for (var o = 0; o < t.state.certBagMax; o++) r.push("BAG");
  if (!r.length) {
    t.renderLines && t.renderLines(), t.updateStatus && t.updateStatus("No certification targets (max 0 or disabled). Functions cleared.");
    return;
  }
  var s = t.state.lines.filter(function(v) {
    return !v.isStso && !v.isLtso && v.empClass !== "STSO" && v.empClass !== "LTSO";
  });
  s.sort(function(v, h) {
    var c = t.getShift ? t.getShift(v.shiftId) : null, y = t.getShift ? t.getShift(h.shiftId) : null, g = c ? t.timeToMin(c.start) : 0, m = y ? t.timeToMin(y.start) : 0;
    return g !== m ? g - m : v.sex !== h.sex ? v.sex === "F" ? -1 : 1 : (v.id || 0) - (h.id || 0);
  });
  var d = { DFO: 0, PAX: 0, BAG: 0 }, i = {}, u = 0;
  r.forEach(function(v) {
    for (var h = 0; h < s.length; ) {
      var c = s[u % s.length];
      if (u++, h++, !(!c || i[c.id]) && !c.function) {
        c.function = v, i[c.id] = !0, d[v]++;
        return;
      }
    }
  }), t.renderLines && t.renderLines(), t.renderTeams && t.renderTeams();
  var l = typeof document < "u" ? document.getElementById("cert-assign-hint") : null, f = "Assigned DFO " + d.DFO + " · PAX " + d.PAX + " · BAG " + d.BAG + " (schedules unchanged)";
  l && (l.textContent = f), t.updateStatus && t.updateStatus(f);
}
function Ht() {
  return {
    pools: ["A", "B"],
    targetBPercent: 45,
    functionMap: { DFO: "B", BAG: "", PAX: "" }
  };
}
function Oe(t) {
  var r = Ht();
  if (!t || typeof t != "object") return r;
  var a = Array.isArray(t.pools) ? t.pools.map(function(d) {
    return String(d ?? "").trim();
  }).filter(Boolean) : r.pools.slice();
  a.indexOf("A") < 0 && a.unshift("A"), a.indexOf("B") < 0 && a.push("B");
  var n = Number(t.targetBPercent);
  Number.isFinite(n) || (n = r.targetBPercent), n = Math.max(0, Math.min(100, n));
  var o = t.functionMap && typeof t.functionMap == "object" ? t.functionMap : {}, s = {
    DFO: Pe(o.DFO, r.functionMap.DFO),
    BAG: Pe(o.BAG, r.functionMap.BAG),
    PAX: Pe(o.PAX, r.functionMap.PAX)
  };
  return { pools: a, targetBPercent: n, functionMap: s };
}
function Pe(t, r) {
  if (t == null || t === "") return r ?? "";
  var a = String(t).trim();
  return !a || a.toLowerCase() === "none" ? "" : a;
}
function Ie(t) {
  return t.state || (t.state = {}), t.state.certPool = Oe(t.state.certPool), t.state.certPool;
}
function ia(t) {
  Ie(t);
  var r = typeof document < "u" ? document.getElementById("cfg-cert-pool-b-pct") : null, a = typeof document < "u" ? document.getElementById("cfg-cert-map-dfo") : null, n = typeof document < "u" ? document.getElementById("cfg-cert-map-bag") : null, o = typeof document < "u" ? document.getElementById("cfg-cert-map-pax") : null, s = {
    pools: ["A", "B"],
    targetBPercent: r ? r.value : t.state.certPool.targetBPercent,
    functionMap: {
      DFO: a ? a.value : t.state.certPool.functionMap.DFO,
      BAG: n ? n.value : t.state.certPool.functionMap.BAG,
      PAX: o ? o.value : t.state.certPool.functionMap.PAX
    }
  };
  return t.state.certPool = Oe(s), t.state.certPool;
}
function oa(t) {
  var r = Ie(t);
  function a(n, o) {
    if (!(typeof document > "u")) {
      var s = document.getElementById(n);
      s && o != null && (s.value = o);
    }
  }
  a("cfg-cert-pool-b-pct", r.targetBPercent), a("cfg-cert-map-dfo", r.functionMap.DFO || "none"), a("cfg-cert-map-bag", r.functionMap.BAG || "none"), a("cfg-cert-map-pax", r.functionMap.PAX || "none");
}
function sa(t) {
  t && (t.defaultCertPoolConfig = Ht, t.normalizeCertPoolConfig = Oe, t.ensureCertPoolConfig = function() {
    return Ie(t);
  }, t.readCertPoolFromDom = function() {
    return ia(t);
  }, t.fillCertPoolForm = function() {
    return oa(t);
  }, t.assignCertPools = function() {
    return aa(t);
  }, t.assignCertPoolsToLines = We, Ie(t));
}
function da(t) {
  t && (t.operatingSlots = Ve, t.refineBalance = function(r, a, n, o) {
    return Bt(t, r, a, o);
  }, t.allocateShiftHeadcounts = function(r, a, n) {
    return zr(t, r, a, n);
  }, t.allocateSupervisoryHeadcounts = function(r, a, n, o, s) {
    return Yr(t, r, a, n, o, s);
  }, t.buildLines = function(r) {
    return Dr(t, r);
  }, t.buildSupervisoryLines = function(r, a) {
    return Ar(t, r, a);
  }, t.readCertConfigFromDom = function() {
    return Rt(t);
  }, t.clearLineFunctions = function() {
    return Nt(t);
  }, t.assignCertifications = function() {
    return na(t);
  });
}
function fe(t, r) {
  return (t.state.shifts || []).find(function(a) {
    return a.id === r;
  });
}
function fa(t, r) {
  var a = (t.state.shifts || []).findIndex(function(n) {
    return n.id === r;
  });
  return t.BADGES[(a >= 0 ? a : 0) % t.BADGES.length];
}
function ua(t) {
  return t ? t.segments && Array.isArray(t.segments) && t.segments.length === 2 ? String(t.segments[0].start).replace(":", "") + "-" + String(t.segments[0].end).replace(":", "") + " / " + String(t.segments[1].start).replace(":", "") + "-" + String(t.segments[1].end).replace(":", "") : String(t.start).replace(":", "") + "-" + String(t.end).replace(":", "") : "—";
}
function Gt(t, r, a) {
  var n = fe(t, r);
  if (!n) return [{ start: "00:00", end: "00:00" }];
  var o = String(a);
  if (n.dayTimes && n.dayTimes[o]) {
    var s = n.dayTimes[o];
    if (s.segments && Array.isArray(s.segments) && s.segments.length === 2 && t.isValidTimeText(s.segments[0].start) && t.isValidTimeText(s.segments[0].end) && t.isValidTimeText(s.segments[1].start) && t.isValidTimeText(s.segments[1].end))
      return [
        { start: s.segments[0].start, end: s.segments[0].end },
        { start: s.segments[1].start, end: s.segments[1].end }
      ];
    if (t.isValidTimeText(s.start) && t.isValidTimeText(s.end))
      return [{ start: s.start, end: s.end }];
  }
  return n.segments && Array.isArray(n.segments) && n.segments.length === 2 ? [
    { start: n.segments[0].start, end: n.segments[0].end },
    { start: n.segments[1].start, end: n.segments[1].end }
  ] : [{ start: n.start, end: n.end }];
}
function la(t, r, a) {
  var n = fe(t, r);
  if (!n) return { start: "00:00", end: "00:00", isOverride: !1 };
  var o = String(a);
  return n.dayTimes && n.dayTimes[o] && t.isValidTimeText(n.dayTimes[o].start) && t.isValidTimeText(n.dayTimes[o].end) ? { start: n.dayTimes[o].start, end: n.dayTimes[o].end, isOverride: !0 } : { start: n.start, end: n.end, isOverride: !1 };
}
function ca(t, r) {
  var a = fe(t, r);
  return !!(a && a.dayTimes && Object.keys(a.dayTimes).length);
}
function va(t, r, a, n) {
  var o = n != null ? Gt(t, r, n) : null;
  if (!o) {
    var s = fe(t, r);
    if (!s) return !1;
    o = s.segments && s.segments.length === 2 ? s.segments : [{ start: s.start, end: s.end }];
  }
  for (var d = 0; d < o.length; d++) {
    var i = o[d], u = t.timeToMin(i.start), l = t.timeToMin(i.end);
    if (l <= u) {
      if (a >= u || a < l) return !0;
    } else if (a >= u && a < l) return !0;
  }
  return !1;
}
function pa(t, r, a, n) {
  return r ? t.timeToMin(r.start) < n && t.timeToMin(r.end) > a : !1;
}
function jt(t, r, a) {
  if (a === "PT") {
    var n = Math.round(+(t.state && t.state.ptDaysPerWeek));
    return Number.isFinite(n) && n > 0 ? Math.max(1, Math.min(6, n)) : 3;
  }
  if (a === "STSO" || a === "LTSO") {
    var o = fe(t, r);
    return o && (+o.paid || 8) >= 10 ? 4 : 5;
  }
  var s = fe(t, r);
  return s && (+s.paid || 8) >= 10 ? 4 : 5;
}
function ha(t, r) {
  for (var a = Math.max(1, Math.min(6, t || 2)), n = [], o = 0; o < a; o++) n.push((r + o) % 7);
  return n;
}
function ma(t, r, a) {
  var n = jt(t, r && r.id, a || "FT");
  return Math.max(1, 7 - n);
}
function ga(t, r, a) {
  var n = "S" + (a + 1), o = r && r.id ? String(r.id) : n, s = r && r.name ? String(r.name) : o, d = null;
  if (r && r.segments && Array.isArray(r.segments) && r.segments.length === 2) {
    var i = r.segments[0], u = r.segments[1];
    if (i && u && t.isValidTimeText(i.start) && t.isValidTimeText(i.end) && t.isValidTimeText(u.start) && t.isValidTimeText(u.end)) {
      var l = t.timeToMin(i.start), f = t.timeToMin(i.end), v = t.timeToMin(u.start), h = t.timeToMin(u.end);
      f > l && h > v && v > f && (d = [
        { start: i.start, end: i.end },
        { start: u.start, end: u.end }
      ]);
    }
  }
  var c = d ? d[0].start : r && t.isValidTimeText(r.start) ? r.start : "08:00", y = d ? d[1].end : r && t.isValidTimeText(r.end) ? r.end : "16:30", g = t.safeNumber(r && r.paid, 8, 1, 24), m = Math.floor(t.safeNumber(r && r.force, 0, 0, null)), p = Math.floor(t.safeNumber(r && r.ltsoForce, 0, 0, null)), b = Math.floor(t.safeNumber(r && r.stsoForce, 0, 0, null)), M = Array.isArray(r && r.rdoHard) ? r.rdoHard.map(Number).filter(function(w) {
    return Number.isInteger(w) && w >= 0 && w <= 6;
  }) : [], T = null;
  if (r && r.dayTimes && typeof r.dayTimes == "object") {
    T = {};
    for (var L in r.dayTimes)
      if (Object.prototype.hasOwnProperty.call(r.dayTimes, L)) {
        var E = r.dayTimes[L];
        if (E) {
          if (E.segments && Array.isArray(E.segments) && E.segments.length === 2) {
            var A = E.segments[0], C = E.segments[1];
            if (A && C && t.isValidTimeText(A.start) && t.isValidTimeText(A.end) && t.isValidTimeText(C.start) && t.isValidTimeText(C.end)) {
              var I = t.timeToMin(A.start), F = t.timeToMin(A.end), B = t.timeToMin(C.start), N = t.timeToMin(C.end);
              if (F > I && N > B && B > F) {
                T[String(L)] = {
                  start: A.start,
                  end: C.end,
                  segments: [
                    { start: A.start, end: A.end },
                    { start: C.start, end: C.end }
                  ]
                };
                continue;
              }
            }
          }
          t.isValidTimeText(E.start) && t.isValidTimeText(E.end) && (T[String(L)] = { start: E.start, end: E.end });
        }
      }
    Object.keys(T).length || (T = null);
  }
  var k = r && r.phase || "auto";
  ["auto", "opening", "am", "pm", "closing"].indexOf(k) < 0 && (k = "auto");
  var R = r && r.crewGroupId ? String(r.crewGroupId) : "", _ = {
    id: o,
    name: s,
    start: c,
    end: y,
    paid: g,
    force: m,
    ltsoForce: p,
    stsoForce: b,
    rdoHard: M,
    dayTimes: T,
    phase: k,
    crewGroupId: R
  };
  return d && (_.segments = d), _;
}
function ya(t, r) {
  var a = fe(t, r);
  if (!a) return String(r || "");
  if (a.crewGroupId && t && t.state && Array.isArray(t.state.shiftCrewGroups)) {
    var n = t.state.shiftCrewGroups.find(function(o) {
      return o && o.id === a.crewGroupId;
    });
    if (n && Array.isArray(n.shiftIds) && n.shiftIds.indexOf(a.id) >= 0)
      return n.id;
  }
  return a.id;
}
function ba(t) {
  t && (t.getShift = function(r) {
    return fe(t, r);
  }, t.shiftBadge = function(r) {
    return fa(t, r);
  }, t.shiftLabel = ua, t.getEffectiveShiftSegments = function(r, a) {
    return Gt(t, r, a);
  }, t.getEffectiveShiftTimes = function(r, a) {
    return la(t, r, a);
  }, t.shiftHasDayOverrides = function(r) {
    return ca(t, r);
  }, t.shiftCoversSlot = function(r, a, n) {
    return va(t, r, a, n);
  }, t.shiftOverlapsWindow = function(r, a, n) {
    return pa(t, r, a, n);
  }, t.targetWorkDays = function(r, a) {
    return jt(t, r, a);
  }, t.consecutiveRdos = ha, t.rdoCountForShift = function(r, a) {
    return ma(t, r, a);
  }, t.normalizeShift = function(r, a) {
    return ga(t, r, a);
  }, t.getBandKey = function(r) {
    return ya(t, r);
  });
}
function pt(t) {
  return {
    startTime: t.state && t.state.open || "03:30",
    endTime: t.state && t.state.close || "23:00",
    volumePerHour: { STD: 150, PRE: 240, MIX: 195 },
    terminals: []
  };
}
function Ta(t) {
  if (t) {
    t.state.airportConfig || (t.state.airportConfig = pt(t)), t.getAirportConfig = function() {
      return t.state.airportConfig || pt(t);
    }, t.initAirportConfig = function() {
    }, t.openAirfieldConfirm = function() {
      return !1;
    }, t.confirmAirfieldConfig = function() {
      return Promise.resolve();
    }, t.markAirfieldDirty = function() {
    }, t.importAirfieldFile = function() {
      t.updateStatus && t.updateStatus("Airfield import removed — rebuild that module.");
    };
    var r = typeof document < "u" ? document.getElementById("btn-airport-config") : null;
    r && !r._setupStub && (r._setupStub = !0, r.addEventListener("click", function() {
      t.updateStatus && t.updateStatus("Airfield config removed. Rebuild as its own module.");
    }));
  }
}
function Ea(t) {
  if (t = t || window.Scheduler, !t) return;
  var r = ["FF2A9D8F", "FFE76F51", "FF6A4C93", "FF90BE6D", "FFF4A261", "FF457B9D", "FFE9C46A", "FFD62828", "FF2D6A4F", "FF9B5DE5", "FF00BBF9", "FFFB5607"], a = ["FFBDE0FE", "FFCDB4DB", "FFA8DADC", "FFFFC8DD", "FFB5EAD7", "FFFFDAC1", "FFC7CEEA", "FFE2F0CB"];
  function n() {
    var c = { style: "thin", color: { argb: "FF000000" } };
    return { top: c, left: c, bottom: c, right: c };
  }
  function o(c, y, g) {
    c.alignment = { vertical: "middle", horizontal: "center" }, c.font = { name: "Calibri", size: 11, color: { argb: g || "FF000000" }, bold: !0 }, c.border = n(), y && (c.fill = { type: "pattern", pattern: "solid", fgColor: { argb: y } });
  }
  function s(c) {
    return c && (c.isExtra || c.extraPositionId) ? String(c.position || c.extraName || "").trim() || "TSO" : c.isStso || c.empClass === "STSO" ? "STSO" : c.isLtso || c.empClass === "LTSO" ? "LTSO" : "TSO";
  }
  function d(c) {
    if (t.teams && t.teams.teams) {
      for (var y = 0; y < t.teams.teams.length; y++)
        for (var g = t.teams.teams[y], m = g.members || [], p = 0; p < m.length; p++)
          if (String(m[p]) === String(c)) return { name: g.name || g.id, id: g.id, order: y };
    }
    return { name: "", id: "", order: 9999 };
  }
  function i() {
    return t.listModSets ? t.listModSets() : [];
  }
  function u(c) {
    var y = null;
    return i().forEach(function(g, m) {
      String(g.id) === String(c) && (y = { name: g.name, checkpoint: g.checkpoint, argb: r[m % r.length] });
    }), y;
  }
  function l(c, y, g) {
    if (y && t.modSetForTeamDay) {
      var m = t.modSetForTeamDay(y.id, g);
      if (m != null) return m;
    }
    return c.modSetId != null ? c.modSetId : y && y.modSetId;
  }
  function f(c, y) {
    var g = t.getRotationDuty ? t.getRotationDuty(c.id, y) : null;
    return g || c.function || null;
  }
  function v(c, y, g, m) {
    if (!m) return "RDO";
    var p = f(c, g);
    if (p === "BAG" || p === "BAGS") return "BAG";
    var b = u(l(c, y, g)), M = b ? b.name : "";
    return p === "DFO" && M ? "DFO " + M : p === "DFO" ? "DFO" : M || "WORK";
  }
  t.exportBoardExcel = function() {
    var c = (t.state && t.state.lines || []).slice();
    if (!c.length) {
      t.updateStatus && t.updateStatus("No lines to export. Generate first.");
      return;
    }
    function y() {
      if (typeof ExcelJS > "u") throw new Error("ExcelJS not loaded");
      c.sort(function(_, w) {
        var x = d(_.id), P = d(w.id), V = String(x.name || "zzz"), D = String(P.name || "zzz");
        return V !== D ? V.localeCompare(D, void 0, { numeric: !0 }) : String(_.lineCode || _.id).localeCompare(String(w.lineCode || w.id), void 0, { numeric: !0 });
      });
      var m = t.DAYS || ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], p = "FF1F4E79", b = "FF000000", M = "FFF4B4B4", T = "FFFFF3A8", L = new ExcelJS.Workbook();
      L.creator = "BrokeSched";
      var E = L.addWorksheet("Board"), A = ["Team", "Line", "Shift", "Start", "End", "Position", "Sex", "Function"].concat(m);
      E.addRow(A);
      for (var C = 1; C <= A.length; C++)
        o(E.getRow(1).getCell(C), p, "FFFFFFFF");
      var I = {};
      function F(_, w) {
        I[w] || (I[w] = [0, 0, 0, 0, 0, 0, 0]), I[w][_] += 1;
      }
      var B = {}, N = 0;
      c.forEach(function(_, w) {
        var x = d(_.id);
        x.name && !B[x.name] && (B[x.name] = a[N++ % a.length]);
        for (var P = t.getShift ? t.getShift(_.shiftId) : null, V = [x.name || "", _.lineCode || _.id, _.shiftName || P && P.name || "", P ? P.start : "", P ? P.end : "", s(_), _.sex || "", _.function || ""], D = [], G = 0; G < 7; G++) {
          var W = t.state.schedule && (t.state.schedule[_.id] || t.state.schedule[String(_.id)]) || [], j = (W[G] || "RDO") === "WORK", H = j ? f(_, G) : null, X = H === "BAG" || H === "BAGS", q = H === "DFO", z = v(_, x.id ? x : null, G, j);
          V.push(z);
          var Y = u(l(_, x.id ? x : null, G));
          D.push({ isRdo: !j, isBag: X, isDfo: q, fill: Y ? Y.argb : null }), j ? X ? F(G, "BAG") : (F(G, Y ? Y.name : "UNASSIGNED"), q && F(G, "DFO")) : F(G, "RDO");
        }
        E.addRow(V);
        var U = E.getRow(w + 2);
        U.height = 18;
        for (var Z = 1; Z <= V.length; Z++) {
          var te = U.getCell(Z), ee = Z - 9;
          ee >= 0 && ee < 7 ? D[ee].isRdo ? o(te, b, "FFFFFFFF") : D[ee].isBag ? o(te, M, "FF000000") : D[ee].isDfo ? o(te, T, "FF000000") : o(te, D[ee].fill || "FFFFFFFF", "FF000000") : Z === 1 && x.name && B[x.name] ? o(te, B[x.name], "FF000000") : o(te, "FFFFFFFF", "FF000000");
        }
      }), E.columns.forEach(function(_, w) {
        _.width = w === 1 ? 14 : 12;
      }), E.views = [{ state: "frozen", ySplit: 1 }], E.autoFilter = { from: { row: 1, column: 1 }, to: { row: c.length + 1, column: A.length } };
      var k = L.addWorksheet("Counts"), R = ["Location"].concat(m).concat(["Total"]);
      k.addRow(R);
      for (var C = 1; C <= R.length; C++) o(k.getRow(1).getCell(C), p, "FFFFFFFF");
      return Object.keys(I).sort().forEach(function(_, w) {
        var x = I[_], P = 0;
        x.forEach(function(G) {
          P += G;
        }), k.addRow([_].concat(x, [P]));
        for (var V = k.getRow(w + 2), D = 1; D <= R.length; D++) o(V.getCell(D), "FFFFFFFF", "FF000000");
      }), k.columns.forEach(function(_) {
        _.width = 14;
      }), L.xlsx.writeBuffer().then(function(_) {
        var w = new Blob([_], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }), x = document.createElement("a"), P = URL.createObjectURL(w);
        x.href = P, x.download = "scheduler-board-" + (t.dj ? t.dj().format("YYYY-MM-DD") : "export") + ".xlsx", document.body.appendChild(x), x.click(), document.body.removeChild(x), URL.revokeObjectURL(P), t.updateStatus && t.updateStatus("Exported Board + Counts (.xlsx).");
      });
    }
    try {
      if (typeof ExcelJS > "u") {
        var g = document.createElement("script");
        g.src = "lib/exceljs.min.js?v=20260902i", g.onload = function() {
          y();
        }, document.head.appendChild(g);
      } else y();
    } catch (m) {
      t.updateStatus && t.updateStatus("Board export failed: " + (m && m.message ? m.message : m));
    }
  };
  function h() {
    if (!(typeof document > "u")) {
      var c = document.getElementById("btn-export-lines-excel");
      c && !c._boardHooked && (c._boardHooked = !0, c.addEventListener("click", function() {
        setTimeout(function() {
          t.exportBoardExcel();
        }, 50);
      }));
    }
  }
  typeof document < "u" && (document.addEventListener("DOMContentLoaded", h), h());
}
function qt(t, r) {
  return Array.isArray(t) ? t.filter(function(a) {
    if (!a || r && r.isLineScheduleLocked && r.isLineScheduleLocked(a)) return !1;
    var n = a.empClass === "PT" || a.isPt === !0;
    return !(!n || a.isStso || a.isLtso || a.empClass === "STSO" || a.empClass === "LTSO" || a.isExtra || a.extraPositionId || a.extraName || a.isTraining || a.training || a.trainingClass || a.empClass === "ESTI" || a.empClass === "MSTI");
  }) : [];
}
function Ut(t) {
  return Array.isArray(t) ? t.filter(function(r) {
    if (!r) return !1;
    var a = (+r.paid || 8) >= 10;
    return !a;
  }) : [];
}
function Ma(t) {
  if (!t || !t.state) return !1;
  t.state.issues = t.state.issues || [];
  var r = t.state.lines || [], a = qt(r, t), n = Ut(t.state.shifts || []);
  if (a.length === 0) {
    var o = "Rebalance PT TSO shifts: No eligible PT TSO lines to rebalance.";
    return t.state.issues.push(o), t.updateStatus && t.updateStatus(o), typeof window < "u" && window.alert && window.alert(o), !1;
  }
  if (n.length < 2) {
    var s = "Rebalance PT TSO shifts: At least 2 non-long shifts required (found " + n.length + ").";
    return t.state.issues.push(s), t.updateStatus && t.updateStatus(s), typeof window < "u" && window.alert && window.alert(s), !1;
  }
  var d = {};
  n.forEach(function(h) {
    var c = h.name || h.id;
    d[c] = 0;
  }), a.forEach(function(h) {
    var c = n.find(function(g) {
      return g.id === h.shiftId;
    }), y = c ? c.name || c.id : h.shiftName || h.shiftId;
    d[y] = (d[y] || 0) + 1;
  });
  var i = 0;
  a.forEach(function(h, c) {
    var y = n[c % n.length];
    h.shiftId !== y.id && (h.shiftId = y.id, h.shiftName = y.name, h.shiftLabel = t.shiftLabel ? t.shiftLabel(y) : (y.start || "") + "–" + (y.end || ""), h.startTime !== void 0 && (h.startTime = y.start), h.endTime !== void 0 && (h.endTime = y.end), h.start !== void 0 && (h.start = y.start), h.end !== void 0 && (h.end = y.end), i++);
  });
  var u = {};
  n.forEach(function(h) {
    var c = h.name || h.id;
    u[c] = 0;
  }), a.forEach(function(h) {
    var c = n.find(function(g) {
      return g.id === h.shiftId;
    }), y = c ? c.name || c.id : h.shiftName || h.shiftId;
    u[y] = (u[y] || 0) + 1;
  });
  var l = [];
  n.forEach(function(h) {
    var c = h.name || h.id, y = d[c] || 0, g = u[c] || 0;
    l.push(c + ": " + y + "→" + g);
  });
  var f = l.join(", "), v = "Rebalanced " + a.length + " PT TSO line(s) (" + i + " moved) · " + f + " · Ignored hard RDO for rescue.";
  if (t.updateStatus && t.updateStatus(v), t.assignCertPools)
    try {
      t.assignCertPools();
    } catch {
      console.error("rebalancePt assignCertPools", e);
    }
  if (t.renderRdoMatrixModal && t.renderRdoMatrixModal(), t.renderAll && t.renderAll(), t.renderLines && t.renderLines(), t.__USE_SVELTE_LINES && typeof window < "u")
    try {
      ue(le.LINES_REQUEST_RENDER, null);
    } catch {
    }
  return !0;
}
function Fa(t) {
  t && (t.selectPtTsoLines = qt, t.getEligiblePtShifts = Ut, t.rebalancePtTsoShifts = function() {
    return Ma(t);
  });
}
function Je(t, r) {
  return Array.isArray(t) ? t.filter(function(a) {
    if (!a) return !1;
    var n = !!(a.isExtra || a.extraPositionId || a.extraName && a.extraName !== "ESTI" && a.extraName !== "MSTI"), o = !!(a.isTraining || a.training || a.trainingClass || a.empClass === "ESTI" || a.empClass === "MSTI" || a.extraName === "ESTI" || a.extraName === "MSTI");
    if (r === "STSO")
      return (a.isStso || a.empClass === "STSO" || a.position === "STSO") && !n && !o;
    if (r === "LTSO")
      return (a.isLtso || a.empClass === "LTSO" || a.position === "LTSO") && !n && !o;
    if (r === "TSO_FT")
      return (a.empClass === "FT" || !a.empClass) && !a.isPt && a.empClass !== "PT" && !a.isStso && !a.isLtso && a.empClass !== "STSO" && a.empClass !== "LTSO" && !n && !o;
    if (r === "TSO_PT")
      return (a.empClass === "PT" || a.isPt) && !a.isStso && !a.isLtso && a.empClass !== "STSO" && a.empClass !== "LTSO" && !n && !o;
    if (r === "TSO_ALL")
      return !a.isStso && !a.isLtso && a.empClass !== "STSO" && a.empClass !== "LTSO" && !n && !o;
    if (r === "ESTI")
      return a.empClass === "ESTI" || a.trainingClass === "ESTI" || a.extraName === "ESTI";
    if (r === "MSTI")
      return a.empClass === "MSTI" || a.trainingClass === "MSTI" || a.extraName === "MSTI";
    if (r.indexOf("EXTRA_") === 0) {
      var s = r.substring(6);
      return n && (String(a.extraPositionId) === s || String(a.extraName) === s || String(a.position) === s);
    }
    return !1;
  }) : [];
}
function Vt(t) {
  var r = [
    { key: "TSO_FT", label: "TSO — FT" },
    { key: "TSO_PT", label: "TSO — PT" },
    { key: "TSO_ALL", label: "TSO — All" },
    { key: "STSO", label: "STSO" },
    { key: "LTSO", label: "LTSO" },
    { key: "ESTI", label: "ESTI" },
    { key: "MSTI", label: "MSTI" }
  ], a = {}, n = t && t.state && t.state.extraPositions || [];
  n.forEach(function(s) {
    var d = s.id || s.name, i = "EXTRA_" + d, u = s.name || s.id || "Extra Position";
    a[i] || (a[i] = !0, r.push({ key: i, label: "Extra: " + u }));
  });
  var o = t && t.state && t.state.lines || [];
  return o.forEach(function(s) {
    if (s.isExtra || s.extraPositionId) {
      var d = s.extraPositionId || s.extraName || s.position, i = "EXTRA_" + d;
      d && !a[i] && (a[i] = !0, r.push({ key: i, label: "Extra: " + (s.extraName || s.position || d) }));
    }
  }), r;
}
function Ca(t, r, a) {
  if (!t || !r) return "—";
  var n = t.state && t.state.functionCoverage && t.state.functionCoverage.bands || [], o = n.find(function(s) {
    return s.shiftId === r.id || s.shift === r.name;
  });
  return a === "STSO" ? r.stsoForce ? r.stsoForce : o && o.stsoMin != null ? o.stsoMin : "—" : a === "LTSO" ? r.ltsoForce ? r.ltsoForce : o && o.ltsoMin != null ? o.ltsoMin : "—" : a === "TSO_FT" || a === "TSO_PT" || a === "TSO_ALL" ? r.force ? r.force : o && o.tsoMin != null ? o.tsoMin : "—" : "—";
}
function xa(t, r, a) {
  if (!t || !t.state) return { proposals: [], error: "No Scheduler state" };
  var n = t.state.lines || [], o = t.state.shifts || [], s = Je(n, r);
  if (!s.length)
    return { proposals: [], error: "No lines generated in selected class" };
  var d = 0;
  if (o.forEach(function(g) {
    d += a[g.id] || 0;
  }), d !== 0)
    return { proposals: [], error: "Deltas must sum to 0 (current net delta: " + (d > 0 ? "+" + d : d) + ")" };
  var i = o.filter(function(g) {
    return (a[g.id] || 0) < 0;
  }), u = o.filter(function(g) {
    return (a[g.id] || 0) > 0;
  });
  if (!i.length || !u.length)
    return { proposals: [], error: null };
  var l = {};
  i.forEach(function(g) {
    l[g.id] = Math.abs(a[g.id]);
  });
  var f = {};
  u.forEach(function(g) {
    f[g.id] = a[g.id];
  });
  var v = s.length, h = s.filter(function(g) {
    return g.sex === "F";
  }).length, c = v > 0 ? h / v : 0.5, y = [];
  return i.forEach(function(g) {
    for (var m = l[g.id], p = s.filter(function(k) {
      return k.shiftId === g.id && !(t.isLineScheduleLocked && t.isLineScheduleLocked(k));
    }); m > 0 && p.length > 0; ) {
      var b = u.find(function(k) {
        return f[k.id] > 0;
      });
      if (!b) break;
      var M = p.filter(function(k) {
        return k.sex === "F";
      }).length, T = p.length > 0 ? M / p.length : 0, L = T > c, E = p.find(function(k) {
        return L ? k.sex === "F" : k.sex === "M";
      }) || p[0], A = E.rdoDays || [], C = A.slice(), I = "Shift move", F = Array.isArray(b.rdoHard) ? b.rdoHard.map(Number).filter(function(k) {
        return k >= 0 && k <= 6;
      }) : [];
      if (F.length > 0) {
        var B = F.filter(function(k) {
          return A.indexOf(k) < 0;
        });
        if (B.length > 0) {
          C = F.slice();
          for (var N = 0; N < 7 && C.length < A.length; N++)
            C.indexOf(N) < 0 && C.push(N);
          I = "Updated RDOs for shift hard RDOs";
        }
      }
      y.push({
        line: E,
        fromShift: g,
        toShift: b,
        rdoBefore: A,
        rdoAfter: C,
        note: I
      }), p = p.filter(function(k) {
        return k.id !== E.id;
      }), l[g.id]--, f[b.id]--, m--;
    }
  }), { proposals: y, error: null };
}
function La(t, r) {
  if (!t || !t.state) return !1;
  if (t.state.issues = t.state.issues || [], !Array.isArray(r) || r.length === 0) {
    var a = "No moves checked to approve.";
    return t.updateStatus && t.updateStatus(a), !1;
  }
  var n = t.state.shifts || [], o = t.state.lines || [], s = 0, d = t.state.weekCount ? t.state.weekCount * 7 : 7;
  if (r.forEach(function(l) {
    var f = o.find(function(m) {
      return String(m.id) === String(l.lineId);
    });
    if (f) {
      var v = n.find(function(m) {
        return m.id === l.targetShiftId;
      });
      if (v) {
        var h = f.shiftId !== v.id, c = !1;
        if (Array.isArray(l.rdoAfter) && l.rdoAfter.length > 0) {
          var y = (f.rdoDays || []).slice().sort().join(","), g = l.rdoAfter.slice().sort().join(",");
          y !== g && (f.rdoDays = l.rdoAfter.slice(), c = !0);
        }
        h && (f.shiftId = v.id, f.shiftName = v.name, f.shiftLabel = t.shiftLabel ? t.shiftLabel(v) : (v.start || "") + "–" + (v.end || ""), f.startTime !== void 0 && (f.startTime = v.start), f.endTime !== void 0 && (f.endTime = v.end), f.start !== void 0 && (f.start = v.start), f.end !== void 0 && (f.end = v.end)), (h || c) && (s++, t.buildScheduleForLine && t.state.schedule && (t.state.schedule[f.id] = t.buildScheduleForLine(f, d)));
      }
    }
  }), s === 0) {
    var i = "No shift changes were made for checked lines.";
    return t.updateStatus && t.updateStatus(i), !1;
  }
  var u = "Rebalanced " + s + " line(s).";
  if (t.updateStatus && t.updateStatus(u), typeof window < "u" && window.alert && window.alert(u), t.assignCertPools)
    try {
      t.assignCertPools();
    } catch {
      console.error("rebalanceFt assignCertPools", e);
    }
  if (t.renderRdoMatrixModal && t.renderRdoMatrixModal(), t.renderAll && t.renderAll(), t.renderLines && t.renderLines(), t.__USE_SVELTE_LINES && typeof window < "u")
    try {
      ue(le.LINES_REQUEST_RENDER, null);
    } catch {
    }
  return !0;
}
function Da(t) {
  t && (t.getLinesForClass = Je, t.getAvailableClasses = function() {
    return Vt(t);
  }, t.getClassBandMin = function(r, a) {
    return Ca(t, r, a);
  }, t.proposeClassMoves = function(r, a) {
    return xa(t, r, a);
  }, t.approveClassRebalance = function(r) {
    return La(t, r);
  });
}
function Wt(t) {
  if (!t) return !1;
  var r = !!(t.isExtra || t.extraPositionId || t.extraName && t.extraName !== "ESTI" && t.extraName !== "MSTI"), a = !!(t.isTraining || t.training || t.trainingClass || t.empClass === "ESTI" || t.empClass === "MSTI" || t.extraName === "ESTI" || t.extraName === "MSTI");
  if (r || a) return !1;
  var n = t.functionEligible || {}, o = !!(n.bag || n.BAG);
  if (o) return !1;
  var s = t.function === "DFO" || !!(n.dfo || n.DFO);
  return s;
}
function Jt(t, r) {
  return Array.isArray(t) ? t.filter(function(a) {
    return Wt(a) ? r === "STSO" ? a.isStso || a.empClass === "STSO" || a.position === "STSO" : r === "LTSO" ? a.isLtso || a.empClass === "LTSO" || a.position === "LTSO" : r === "TSO_FT" ? (a.empClass === "FT" || !a.empClass) && !a.isPt && a.empClass !== "PT" && !a.isStso && !a.isLtso && a.empClass !== "STSO" && a.empClass !== "LTSO" : r === "TSO_PT" ? (a.empClass === "PT" || a.isPt) && !a.isStso && !a.isLtso && a.empClass !== "STSO" && a.empClass !== "LTSO" : r === "TSO_ALL" ? !a.isStso && !a.isLtso && a.empClass !== "STSO" && a.empClass !== "LTSO" : !1 : !1;
  }) : [];
}
function Ia() {
  return [
    { key: "TSO_ALL", label: "TSO — All" },
    { key: "TSO_FT", label: "TSO — FT" },
    { key: "TSO_PT", label: "TSO — PT" },
    { key: "STSO", label: "STSO" },
    { key: "LTSO", label: "LTSO" }
  ];
}
function Aa(t, r, a) {
  if (!t || !r) return "—";
  var n = "TSO";
  a === "STSO" ? n = "STSO" : a === "LTSO" && (n = "LTSO");
  var o = t.state && t.state.functionCoverage;
  if (o && o.requirements && o.requirements[n] && o.requirements[n][r.id]) {
    var s = o.requirements[n][r.id];
    if (s && s.min != null) return s.min;
  }
  var d = o && o.bands || [], i = d.find(function(u) {
    return u.shiftId === r.id || u.shift === r.name;
  });
  if (n === "STSO") {
    if (r.stsoForce != null) return r.stsoForce;
    if (i && i.stsoMin != null) return i.stsoMin;
  } else if (n === "LTSO") {
    if (r.ltsoForce != null) return r.ltsoForce;
    if (i && i.ltsoMin != null) return i.ltsoMin;
  } else {
    if (r.force != null) return r.force;
    if (i && i.tsoMin != null) return i.tsoMin;
  }
  return "—";
}
var ka = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
function ae(t) {
  if (!Array.isArray(t) || !t.length) return "None";
  var r = t.slice().map(Number).sort(function(a, n) {
    return a - n;
  });
  return r.map(function(a) {
    return ka[a] || a;
  }).join("-");
}
function Oa(t, r, a) {
  if (!t || !t.state) return { proposals: [], error: "No Scheduler state" };
  var n = t.state.lines || [], o = t.state.shifts || [], s = Jt(n, r);
  if (!s.length)
    return { proposals: [], error: "No DFO-eligible lines in selected class" };
  var d = 0;
  if (o.forEach(function(g) {
    d += a[g.id] || 0;
  }), d !== 0)
    return { proposals: [], error: "Deltas must sum to 0 (current net delta: " + (d > 0 ? "+" + d : d) + ")" };
  var i = o.filter(function(g) {
    return (a[g.id] || 0) < 0;
  }), u = o.filter(function(g) {
    return (a[g.id] || 0) > 0;
  });
  if (!i.length || !u.length)
    return { proposals: [], error: null };
  var l = {};
  i.forEach(function(g) {
    l[g.id] = Math.abs(a[g.id]);
  });
  var f = {};
  u.forEach(function(g) {
    f[g.id] = a[g.id];
  });
  var v = s.length, h = s.filter(function(g) {
    return g.sex === "F";
  }).length, c = v > 0 ? h / v : 0.5, y = [];
  return i.forEach(function(g) {
    for (var m = l[g.id], p = s.filter(function(k) {
      return k.shiftId === g.id && !(t.isLineScheduleLocked && t.isLineScheduleLocked(k));
    }); m > 0 && p.length > 0; ) {
      var b = u.find(function(k) {
        return f[k.id] > 0;
      });
      if (!b) break;
      var M = p.filter(function(k) {
        return k.sex === "F";
      }).length, T = p.length > 0 ? M / p.length : 0, L = T > c, E = p.find(function(k) {
        return L ? k.sex === "F" : k.sex === "M";
      }) || p[0], A = E.rdoDays || [], C = A.slice(), I = "Shift move", F = Array.isArray(b.rdoHard) ? b.rdoHard.map(Number).filter(function(k) {
        return k >= 0 && k <= 6;
      }) : [];
      if (F.length > 0) {
        var B = F.filter(function(k) {
          return A.indexOf(k) < 0;
        });
        if (B.length > 0) {
          C = F.slice();
          for (var N = 0; N < 7 && C.length < A.length; N++)
            C.indexOf(N) < 0 && C.push(N);
          I = "Updated RDOs for shift hard RDOs";
        }
      }
      y.push({
        line: E,
        fromShift: g,
        toShift: b,
        rdoBefore: A,
        rdoAfter: C,
        note: I
      }), p = p.filter(function(k) {
        return k.id !== E.id;
      }), l[g.id]--, f[b.id]--, m--;
    }
  }), { proposals: y, error: null };
}
function wa(t, r) {
  if (!t || !t.state) return !1;
  if (t.state.issues = t.state.issues || [], !Array.isArray(r) || r.length === 0) {
    var a = "No moves checked to approve.";
    return t.updateStatus && t.updateStatus(a), !1;
  }
  var n = t.state.shifts || [], o = t.state.lines || [], s = 0, d = t.state.weekCount ? t.state.weekCount * 7 : 7;
  if (r.forEach(function(l) {
    var f = o.find(function(m) {
      return String(m.id) === String(l.lineId);
    });
    if (f) {
      var v = n.find(function(m) {
        return m.id === l.targetShiftId;
      });
      if (v) {
        var h = f.shiftId !== v.id, c = !1;
        if (Array.isArray(l.rdoAfter) && l.rdoAfter.length > 0) {
          var y = (f.rdoDays || []).slice().sort().join(","), g = l.rdoAfter.slice().sort().join(",");
          y !== g && (f.rdoDays = l.rdoAfter.slice(), c = !0);
        }
        h && (f.shiftId = v.id, f.shiftName = v.name, f.shiftLabel = t.shiftLabel ? t.shiftLabel(v) : (v.start || "") + "–" + (v.end || ""), f.startTime !== void 0 && (f.startTime = v.start), f.endTime !== void 0 && (f.endTime = v.end), f.start !== void 0 && (f.start = v.start), f.end !== void 0 && (f.end = v.end)), (h || c) && (s++, t.buildScheduleForLine && t.state.schedule && (t.state.schedule[f.id] = t.buildScheduleForLine(f, d)));
      }
    }
  }), s === 0) {
    var i = "No shift changes were made for checked lines.";
    return t.updateStatus && t.updateStatus(i), !1;
  }
  var u = "Rebalanced " + s + " DFO line(s).";
  if (t.updateStatus && t.updateStatus(u), typeof window < "u" && window.alert && window.alert(u), t.assignCertPools)
    try {
      t.assignCertPools();
    } catch {
      console.error("rebalanceDfo assignCertPools", e);
    }
  if (t.renderRdoMatrixModal && t.renderRdoMatrixModal(), t.renderAll && t.renderAll(), t.renderLines && t.renderLines(), t.__USE_SVELTE_LINES && typeof window < "u")
    try {
      ue(le.LINES_REQUEST_RENDER, null);
    } catch {
    }
  return !0;
}
function Ba(t) {
  t && (t.isDfoEligibleLine = Wt, t.getDfoLinesForClass = function(r) {
    return Jt(t.state && t.state.lines || [], r);
  }, t.getDfoAvailableClasses = Ia, t.getDfoBandMin = function(r, a) {
    return Aa(t, r, a);
  }, t.proposeDfoMoves = function(r, a) {
    return Oa(t, r, a);
  }, t.approveDfoRebalance = function(r) {
    return wa(t, r);
  });
}
function Xt(t, r) {
  return Je(t, r);
}
function Pa(t, r, a) {
  if (!t || !t.state) return { proposals: [], error: "No Scheduler state" };
  if (!Array.isArray(a) || a.length < 2)
    return { proposals: [], error: "Select at least 2 shifts to swap seats." };
  var n = t.state.lines || [], o = t.state.shifts || [], s = o.filter(function(x) {
    return a.indexOf(x.id) >= 0;
  });
  if (s.length < 2)
    return { proposals: [], error: "Select at least 2 valid shifts to swap seats." };
  var d = Xt(n, r).filter(function(x) {
    return a.indexOf(x.shiftId) >= 0 && !(t.isLineScheduleLocked && t.isLineScheduleLocked(x));
  });
  if (!d.length)
    return { proposals: [], error: "No lines in selected class on selected shifts." };
  var i = {}, u = {};
  s.forEach(function(x) {
    i[x.id] = d.filter(function(P) {
      return P.shiftId === x.id && P.sex === "M";
    }), u[x.id] = d.filter(function(P) {
      return P.shiftId === x.id && P.sex === "F";
    });
  });
  var l = d.length, f = d.filter(function(x) {
    return x.sex === "F";
  }).length, v = l > 0 ? f / l : 0.5, h = [];
  function c(x, P) {
    var V = x.rdoDays || [], D = V.slice(), G = "Shift seat swap", W = Array.isArray(P.rdoHard) ? P.rdoHard.map(Number).filter(function(X) {
      return X >= 0 && X <= 6;
    }) : [];
    if (W.length > 0) {
      var j = W.filter(function(X) {
        return V.indexOf(X) < 0;
      });
      if (j.length > 0) {
        D = W.slice();
        for (var H = 0; H < 7 && D.length < V.length; H++)
          D.indexOf(H) < 0 && D.push(H);
        G = "Updated RDOs for hard RDO constraint";
      }
    }
    return { rdoBefore: V, rdoAfter: D, note: G };
  }
  for (var y = {}, g = !0; g; ) {
    g = !1;
    for (var m = s.slice().sort(function(x, P) {
      var V = i[x.id].length, D = u[x.id].length, G = V + D, W = i[P.id].length, j = u[P.id].length, H = W + j, X = G > 0 ? D / G : v, q = H > 0 ? j / H : v;
      return X - q;
    }), p = s.slice().sort(function(x, P) {
      var V = i[x.id].length, D = u[x.id].length, G = V + D, W = i[P.id].length, j = u[P.id].length, H = W + j, X = G > 0 ? D / G : v, q = H > 0 ? j / H : v;
      return q - X;
    }), b = 0; b < m.length && !g; b++) {
      var M = m[b], T = i[M.id].find(function(x) {
        return !y[x.id];
      });
      if (T)
        for (var L = 0; L < p.length && !g; L++) {
          var E = p[L];
          if (M.id !== E.id) {
            var A = u[E.id].find(function(x) {
              return !y[x.id];
            });
            if (A) {
              var C = d.filter(function(x) {
                return x.shiftId === M.id;
              }).length, I = d.filter(function(x) {
                return x.shiftId === E.id;
              }).length, F = u[M.id].length, B = u[E.id].length, N = C > 0 ? F / C : v, k = I > 0 ? B / I : v;
              if (N <= v || k >= v || N < k) {
                y[T.id] = !0, y[A.id] = !0, i[M.id] = i[M.id].filter(function(x) {
                  return x.id !== T.id;
                }), u[E.id] = u[E.id].filter(function(x) {
                  return x.id !== A.id;
                });
                var R = c(T, E), _ = c(A, M), w = "Seat exchange between " + (M.name || M.id) + " and " + (E.name || E.id);
                (R.note.includes("hard") || _.note.includes("hard")) && (w += " (Hard RDO updated)"), h.push({
                  lineM: T,
                  lineF: A,
                  shiftA: M,
                  shiftB: E,
                  rdoMBefore: R.rdoBefore,
                  rdoMAfter: R.rdoAfter,
                  rdoFBefore: _.rdoBefore,
                  rdoFAfter: _.rdoAfter,
                  notes: w
                }), g = !0;
              }
            }
          }
        }
    }
  }
  return h.length ? { proposals: h, error: null } : { proposals: [], error: "No M<->F seat swap pairs available across selected shifts." };
}
function _a(t, r) {
  if (!t || !t.state) return !1;
  if (t.state.issues = t.state.issues || [], !Array.isArray(r) || r.length === 0) {
    var a = "No swap pairs checked to approve.";
    return t.updateStatus && t.updateStatus(a), !1;
  }
  var n = t.state.shifts || [], o = t.state.lines || [], s = 0, d = t.state.weekCount ? t.state.weekCount * 7 : 7;
  if (r.forEach(function(l) {
    var f = o.find(function(y) {
      return String(y.id) === String(l.lineMId);
    }), v = o.find(function(y) {
      return String(y.id) === String(l.lineFId);
    });
    if (!(!f || !v)) {
      var h = n.find(function(y) {
        return y.id === l.shiftAId;
      }), c = n.find(function(y) {
        return y.id === l.shiftBId;
      });
      !h || !c || (f.shiftId = c.id, f.shiftName = c.name, f.shiftLabel = t.shiftLabel ? t.shiftLabel(c) : (c.start || "") + "–" + (c.end || ""), f.startTime !== void 0 && (f.startTime = c.start), f.endTime !== void 0 && (f.endTime = c.end), f.start !== void 0 && (f.start = c.start), f.end !== void 0 && (f.end = c.end), Array.isArray(l.rdoMAfter) && l.rdoMAfter.length > 0 && (f.rdoDays = l.rdoMAfter.slice()), v.shiftId = h.id, v.shiftName = h.name, v.shiftLabel = t.shiftLabel ? t.shiftLabel(h) : (h.start || "") + "–" + (h.end || ""), v.startTime !== void 0 && (v.startTime = h.start), v.endTime !== void 0 && (v.endTime = h.end), v.start !== void 0 && (v.start = h.start), v.end !== void 0 && (v.end = h.end), Array.isArray(l.rdoFAfter) && l.rdoFAfter.length > 0 && (v.rdoDays = l.rdoFAfter.slice()), t.buildScheduleForLine && t.state.schedule && (t.state.schedule[f.id] = t.buildScheduleForLine(f, d), t.state.schedule[v.id] = t.buildScheduleForLine(v, d)), s++);
    }
  }), s === 0) {
    var i = "No M<->F seat swaps were made.";
    return t.updateStatus && t.updateStatus(i), !1;
  }
  var u = "Swapped " + s + " M<->F pair(s) (" + s * 2 + " lines).";
  if (t.updateStatus && t.updateStatus(u), typeof window < "u" && window.alert && window.alert(u), t.assignCertPools)
    try {
      t.assignCertPools();
    } catch {
      console.error("swapSex assignCertPools", e);
    }
  if (t.renderRdoMatrixModal && t.renderRdoMatrixModal(), t.renderAll && t.renderAll(), t.renderLines && t.renderLines(), t.__USE_SVELTE_LINES && typeof window < "u")
    try {
      ue(le.LINES_REQUEST_RENDER, null);
    } catch {
    }
  return !0;
}
function Ra(t) {
  t && (t.getLinesForSwapClass = function(r) {
    return Xt(t.state && t.state.lines || [], r);
  }, t.getSwapAvailableClasses = function() {
    return Vt(t);
  }, t.proposeSexSwaps = function(r, a) {
    return Pa(t, r, a);
  }, t.approveSexSwaps = function(r) {
    return _a(t, r);
  });
}
function zt(t, r, a) {
  return !(!r || !a || a.classKey && a.classKey !== "ALL" && (!t.getLinesForClass || t.getLinesForClass([r], a.classKey).length === 0) || a.sex && a.sex !== "ALL" && (r.sex || "").toUpperCase() !== a.sex.toUpperCase() || a.shiftId != null && a.shiftId !== "" && String(r.shiftId) !== String(a.shiftId));
}
function Na(t, r) {
  if (!t || !t.state || !Array.isArray(t.state.scheduleLocks) || !t.state.scheduleLocks.length)
    return !1;
  for (var a = 0; a < t.state.scheduleLocks.length; a++)
    if (zt(t, r, t.state.scheduleLocks[a])) return !0;
  return !1;
}
function Ha(t) {
  t && (t.lineMatchesLockRule = function(r, a) {
    return zt(t, r, a);
  }, t.isLineScheduleLocked = function(r) {
    return Na(t, r);
  });
}
function Ga(t) {
  var r = document.getElementById("lock-schedules-modal");
  if (r) {
    var a = document.getElementById("lock-rule-class");
    if (a) {
      var n = t.getAvailableClasses ? t.getAvailableClasses() : [], o = '<option value="ALL">All Classes</option>' + n.map(function(u) {
        return '<option value="' + u.key + '">' + String(u.label).replace(/"/g, "&quot;") + "</option>";
      }).join("");
      a.innerHTML = o;
    }
    var s = document.getElementById("lock-rule-shift");
    if (s) {
      var d = t.state && t.state.shifts || [], i = '<option value="">All Shifts</option>' + d.map(function(u) {
        var l = t.shiftLabel ? t.shiftLabel(u) : u.start + "–" + u.end;
        return '<option value="' + u.id + '">' + String(u.name || u.id).replace(/"/g, "&quot;") + " (" + l + ")</option>";
      }).join("");
      s.innerHTML = i;
    }
    Fe(t), r.style.display = "flex", r.setAttribute("aria-hidden", "false");
  }
}
function ja() {
  var t = document.getElementById("lock-schedules-modal");
  t && (t.style.display = "none", t.setAttribute("aria-hidden", "true"));
}
function Fe(t) {
  var r = document.getElementById("lock-rules-list");
  if (!r) return;
  var a = t.state && t.state.scheduleLocks || [];
  if (!a.length) {
    r.innerHTML = '<p class="muted" style="margin:0">No lock rules defined. All generated lines move freely.</p>';
    return;
  }
  var n = t.state && t.state.lines || [], o = t.state && t.state.shifts || [], s = t.getAvailableClasses ? t.getAvailableClasses() : [];
  function d(l) {
    if (!l || l === "ALL") return "All Classes";
    var f = s.find(function(v) {
      return v.key === l;
    });
    return f ? f.label : l;
  }
  function i(l) {
    if (!l) return "Any Shift";
    var f = o.find(function(h) {
      return h.id === l;
    });
    if (!f) return "Shift " + l + " (deleted)";
    var v = t.shiftLabel ? t.shiftLabel(f) : f.start + "–" + f.end;
    return (f.name || f.id) + " (" + v + ")";
  }
  function u(l) {
    return !l || l === "ALL" ? "All" : l === "M" ? "Male (M)" : "Female (F)";
  }
  r.innerHTML = a.map(function(l) {
    var f = n.filter(function(h) {
      return t.lineMatchesLockRule ? t.lineMatchesLockRule(h, l) : !1;
    }).length, v = f > 0 ? "<strong>" + f + " matching line" + (f > 1 ? "s" : "") + "</strong>" : '<span class="muted">(0 matching lines)</span>';
    return '<div style="display:flex;align-items:center;justify-space-between;padding:0.5rem 0.75rem;background:var(--bg-subtle,#f8f9fa);border:1px solid #ddd;border-radius:4px;gap:0.75rem"><div style="flex:1;font-size:0.88rem"><div><strong>Class:</strong> ' + d(l.classKey) + " &middot; <strong>Gender:</strong> " + u(l.sex) + " &middot; <strong>Shift:</strong> " + i(l.shiftId) + '</div><div style="font-size:0.8rem;margin-top:0.2rem">' + v + '</div></div><button type="button" class="btn btn-sm btn-red btn-del-lock-rule" data-rule-id="' + l.id + '">Remove</button></div>';
  }).join(""), r.querySelectorAll(".btn-del-lock-rule").forEach(function(l) {
    l.addEventListener("click", function() {
      var f = l.getAttribute("data-rule-id");
      t.state && t.state.scheduleLocks && (t.state.scheduleLocks = t.state.scheduleLocks.filter(function(v) {
        return v.id !== f;
      })), Fe(t);
    });
  });
}
function qa(t) {
  var r = document.getElementById("lock-rule-class"), a = document.getElementById("lock-rule-sex"), n = document.getElementById("lock-rule-shift"), o = r ? r.value : "ALL", s = a ? a.value : "ALL", d = n && n.value ? n.value : null, i = {
    id: "LOCK_" + Date.now() + "_" + Math.floor(Math.random() * 1e4),
    classKey: o,
    sex: s,
    shiftId: d
  };
  t.state.scheduleLocks = t.state.scheduleLocks || [], t.state.scheduleLocks.push(i), Fe(t);
}
function Ua(t) {
  if (!t || (t.openLockSchedulesModal = function() {
    Ga(t);
  }, t.closeLockSchedulesModal = ja, t.renderLockRulesList = function() {
    Fe(t);
  }, typeof document > "u")) return;
  function r() {
    var a = document.getElementById("btn-lock-schedules");
    a && !a._lockedBound && (a._lockedBound = !0, a.addEventListener("click", function() {
      t.openLockSchedulesModal();
    }));
    var n = document.getElementById("lock-schedules-close");
    n && !n._lockedBound && (n._lockedBound = !0, n.addEventListener("click", t.closeLockSchedulesModal));
    var o = document.getElementById("btn-lock-schedules-done");
    o && !o._lockedBound && (o._lockedBound = !0, o.addEventListener("click", t.closeLockSchedulesModal));
    var s = document.getElementById("btn-add-lock-rule");
    s && !s._lockedBound && (s._lockedBound = !0, s.addEventListener("click", function() {
      qa(t);
    }));
    var d = document.getElementById("btn-clear-lock-rules");
    d && !d._lockedBound && (d._lockedBound = !0, d.addEventListener("click", function() {
      t.state && (t.state.scheduleLocks = []), Fe(t);
    }));
  }
  document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", r) : r();
}
function Ce(t) {
  var r = [
    { key: "STSO", label: "STSO" },
    { key: "LTSO", label: "LTSO" },
    { key: "TSO", label: "TSO" },
    { key: "MSTI", label: "MSTI" },
    { key: "ESTI", label: "ESTI" }
  ], a = t && t.state && t.state.extraPositions || [];
  return a.forEach(function(n) {
    var o = String(n.name || n.id || "Position").trim();
    r.push({
      key: "EXTRA_" + n.id,
      label: "Extra: " + o
    });
  }), r;
}
function ht(t) {
  var r = typeof document < "u" ? document.getElementById("generate-class-buttons") : null;
  if (r) {
    var a = Ce(t);
    r.innerHTML = a.map(function(n) {
      return '<button type="button" class="btn btn-amber btn-sm btn-generate-class" data-class-key="' + n.key + '">Generate ' + n.label + " Only</button>";
    }).join(""), r.querySelectorAll(".btn-generate-class").forEach(function(n) {
      n.addEventListener("click", function() {
        var o = n.getAttribute("data-class-key"), s = t._perShiftTargets && t._perShiftTargets[o] || null;
        t.generateClass && t.generateClass(o, s), t.renderGenerateModalContent && t.renderGenerateModalContent();
      });
    });
  }
}
function Yt(t, r) {
  if (t._perShiftTargets = t._perShiftTargets || {}, t._perShiftTargets[r]) return t._perShiftTargets[r];
  var a = t.state && t.state.shifts || [], n = {};
  a.forEach(function(b) {
    n[b.id] = { M: 0, F: 0 };
  });
  var o = t.state && t.state.lines || [], s = o.filter(function(b) {
    return t.belongsToClass ? t.belongsToClass(b, r) : !1;
  });
  if (s.length)
    s.forEach(function(b) {
      !b.shiftId || !n[b.shiftId] || b.isShortfall || (b.sex === "F" ? n[b.shiftId].F++ : n[b.shiftId].M++);
    });
  else {
    var d = t.getClassHeadcount ? t.getClassHeadcount(r) : { M: 0, F: 0, total: 0 };
    if (a.length > 0) {
      var i = r === "MSTI" || r === "ESTI";
      if (i)
        for (var u = d.total, l = 0; l < a.length; l++) {
          var f = a[l].id, v = Math.floor(u / (a.length - l));
          n[f].M = v, u -= v;
        }
      else
        for (var h = d.M, c = d.F, y = 0; y < a.length; y++) {
          var g = a[y].id, m = Math.floor(h / (a.length - y)), p = Math.floor(c / (a.length - y));
          n[g].M = m, n[g].F = p, h -= m, c -= p;
        }
    }
  }
  return t._perShiftTargets[r] = n, n;
}
function ie(t) {
  var r = typeof document < "u" ? document.getElementById("generate-target-class-select") : null, a = typeof document < "u" ? document.getElementById("generate-shift-targets-tbody") : null, n = typeof document < "u" ? document.getElementById("generate-target-headcount-info") : null;
  if (!(!r || !a)) {
    var o = Ce(t);
    t._activeTargetClass || (t._activeTargetClass = o[0] ? o[0].key : "STSO"), r.innerHTML = o.map(function(m) {
      var p = m.key === t._activeTargetClass ? " selected" : "";
      return '<option value="' + m.key + '"' + p + ">" + m.label + "</option>";
    }).join(""), t._targetClassSelectBound || (t._targetClassSelectBound = !0, r.addEventListener("change", function(m) {
      t._activeTargetClass = m.target.value, ie(t);
    }));
    var s = t._activeTargetClass, d = t.getClassHeadcount ? t.getClassHeadcount(s) : { M: 0, F: 0, total: 0 }, i = Yt(t, s), u = t.state && t.state.shifts || [], l = 0, f = 0;
    if (u.forEach(function(m) {
      var p = i[m.id] || { M: 0, F: 0 };
      l += +p.M || 0, f += +p.F || 0;
    }), n) {
      var v = s === "MSTI" || s === "ESTI";
      if (v) {
        var h = l + f, c = Math.max(0, d.total - h);
        n.textContent = "Total: " + h + " / " + d.total + " targeted (" + c + " shortfall)";
      } else {
        var y = Math.max(0, d.M - l), g = Math.max(0, d.F - f);
        n.textContent = "Male: " + l + " / " + d.M + " (" + y + " shortfall) | Female: " + f + " / " + d.F + " (" + g + " shortfall)";
      }
    }
    a.innerHTML = u.map(function(m) {
      var p = i[m.id] || { M: 0, F: 0 }, b = +p.M || 0, M = +p.F || 0, T = b + M, L = s === "MSTI" || s === "ESTI", E = l + f, A = !L && l < d.M, C = !L && f < d.F, I = L ? E < d.total : A || C, F = (m.start || "") + (m.end ? "–" + m.end : ""), B = "<strong>" + (m.name || m.id) + "</strong>" + (F ? ' <span class="muted">(' + F + ")</span>" : "");
      return '<tr data-shift-id="' + m.id + '"><td>' + B + '</td><td style="text-align:center;white-space:nowrap"><button type="button" class="btn btn-sm btn-target-m-down" data-shift-id="' + m.id + '"' + (L ? " disabled" : "") + '>-</button> <span style="display:inline-block;width:2rem;text-align:center;font-weight:600">' + b + '</span> <button type="button" class="btn btn-sm btn-target-m-up" data-shift-id="' + m.id + '"' + (A ? "" : " disabled") + '>+</button></td><td style="text-align:center;white-space:nowrap"><button type="button" class="btn btn-sm btn-target-f-down" data-shift-id="' + m.id + '"' + (L ? " disabled" : "") + '>-</button> <span style="display:inline-block;width:2rem;text-align:center;font-weight:600">' + M + '</span> <button type="button" class="btn btn-sm btn-target-f-up" data-shift-id="' + m.id + '"' + (C ? "" : " disabled") + '>+</button></td><td style="text-align:center;white-space:nowrap"><button type="button" class="btn btn-sm btn-target-tot-down" data-shift-id="' + m.id + '">-</button> <span style="display:inline-block;width:2.5rem;text-align:center;font-weight:700">' + T + '</span> <button type="button" class="btn btn-sm btn-target-tot-up" data-shift-id="' + m.id + '"' + (I ? "" : " disabled") + ">+</button></td></tr>";
    }).join(""), a.querySelectorAll(".btn-target-m-up").forEach(function(m) {
      m.addEventListener("click", function() {
        var p = m.getAttribute("data-shift-id");
        l < d.M && (i[p].M++, ie(t));
      });
    }), a.querySelectorAll(".btn-target-m-down").forEach(function(m) {
      m.addEventListener("click", function() {
        var p = m.getAttribute("data-shift-id");
        i[p].M > 0 && (i[p].M--, ie(t));
      });
    }), a.querySelectorAll(".btn-target-f-up").forEach(function(m) {
      m.addEventListener("click", function() {
        var p = m.getAttribute("data-shift-id");
        f < d.F && (i[p].F++, ie(t));
      });
    }), a.querySelectorAll(".btn-target-f-down").forEach(function(m) {
      m.addEventListener("click", function() {
        var p = m.getAttribute("data-shift-id");
        i[p].F > 0 && (i[p].F--, ie(t));
      });
    }), a.querySelectorAll(".btn-target-tot-up").forEach(function(m) {
      m.addEventListener("click", function() {
        var p = m.getAttribute("data-shift-id"), b = s === "MSTI" || s === "ESTI";
        b ? l + f < d.total && i[p].M++ : l < d.M ? i[p].M++ : f < d.F && i[p].F++, ie(t);
      });
    }), a.querySelectorAll(".btn-target-tot-down").forEach(function(m) {
      m.addEventListener("click", function() {
        var p = m.getAttribute("data-shift-id");
        i[p].F > 0 ? i[p].F-- : i[p].M > 0 && i[p].M--, ie(t);
      });
    });
  }
}
function Qt(t, r) {
  if (r.indexOf("crew_") === 0) {
    var a = r.substring(5), n = t.state && t.state.shiftCrewGroups || [], o = n.find(function(i) {
      return i.id === a;
    });
    if (o) return "Group: " + (o.name || o.id);
  }
  var s = t.state && t.state.shifts || [], d = s.find(function(i) {
    return i.id === r;
  });
  return d ? (d.name || d.id) + (d.start ? " (" + d.start + "–" + d.end + ")" : "") : r;
}
function mt(t) {
  var r = typeof document < "u" ? document.getElementById("generate-weekday-bands-tbody") : null;
  if (r) {
    var a = t.state && t.state.lines || [], n = t.state && t.state.schedule || {}, o = t.state && t.state.shifts || [];
    if (!a.length || !o.length) {
      r.innerHTML = '<tr><td colspan="8" class="muted" style="text-align:center">No lines generated yet. Click Generate to populate.</td></tr>';
      return;
    }
    var s = ye(t.state ? t.state.startDate : null), d = [], i = {};
    o.forEach(function(l) {
      var f = de(t, l.id);
      i[f] || (i[f] = !0, d.push(f));
    });
    var u = {};
    d.forEach(function(l) {
      u[l] = [];
      for (var f = 0; f < 7; f++)
        u[l][f] = { M: 0, F: 0, total: 0 };
    }), a.forEach(function(l) {
      if (!(!l || !l.shiftId) && !(l.isShortfall || l.function === "-")) {
        var f = de(t, l.shiftId);
        if (!u[f]) {
          u[f] = [];
          for (var v = 0; v < 7; v++) u[f][v] = { M: 0, F: 0, total: 0 };
          d.push(f);
        }
        for (var h = n[l.id] || [], c = t.state && t.state.functionRotation ? t.state.functionRotation[l.id] || t.state.functionRotation[String(l.id)] : null, y = 0; y < 7; y++)
          if (h[y] === "WORK") {
            var g = c ? c[y] : l.function;
            if (g === "-") continue;
            var m = wt(Ot(s, y));
            u[f][m].total++, l.sex === "F" ? u[f][m].F++ : l.sex === "M" && u[f][m].M++;
          }
      }
    }), r.innerHTML = d.map(function(l) {
      for (var f = Qt(t, l), v = [], h = 0; h < 7; h++) {
        var c = u[l][h], y = c.M + "M / " + c.F + "F (" + c.total + ")";
        v.push('<td style="text-align:center;font-size:0.85rem">' + y + "</td>");
      }
      return "<tr><td><strong>" + f + "</strong></td>" + v.join("") + "</tr>";
    }).join("");
  }
}
function gt(t) {
  var r = typeof document < "u" ? document.getElementById("generate-parity-class-select") : null, a = typeof document < "u" ? document.getElementById("generate-parity-bands-select") : null, n = typeof document < "u" ? document.getElementById("btn-generate-check-parity") : null, o = typeof document < "u" ? document.getElementById("btn-generate-approve-parity") : null, s = typeof document < "u" ? document.getElementById("generate-parity-results-wrap") : null, d = typeof document < "u" ? document.getElementById("generate-parity-proposals-tbody") : null;
  if (!(!r || !a)) {
    var i = Ce(t);
    t._activeParityClass || (t._activeParityClass = i[0] ? i[0].key : "STSO"), r.innerHTML = i.map(function(v) {
      var h = v.key === t._activeParityClass ? " selected" : "";
      return '<option value="' + v.key + '"' + h + ">" + v.label + "</option>";
    }).join(""), t._parityClassSelectBound || (t._parityClassSelectBound = !0, r.addEventListener("change", function(v) {
      t._activeParityClass = v.target.value, t._parityReportResult = null, s && (s.style.display = "none");
    }));
    var u = t.state && t.state.shifts || [], l = [], f = {};
    u.forEach(function(v) {
      var h = de(t, v.id);
      f[h] || (f[h] = !0, l.push(h));
    }), t._selectedParityBands = t._selectedParityBands || {}, l.forEach(function(v) {
      t._selectedParityBands[v] === void 0 && (t._selectedParityBands[v] = !0);
    }), a.innerHTML = l.map(function(v) {
      var h = Qt(t, v), c = t._selectedParityBands[v] !== !1;
      return '<label style="font-weight:normal;font-size:0.85rem;white-space:nowrap"><input type="checkbox" class="parity-band-cb" data-band-key="' + v + '"' + (c ? " checked" : "") + " /> " + h + "</label>";
    }).join(""), a.querySelectorAll(".parity-band-cb").forEach(function(v) {
      v.addEventListener("change", function() {
        var h = v.getAttribute("data-band-key");
        t._selectedParityBands[h] = v.checked, t._parityReportResult = null, s && (s.style.display = "none");
      });
    }), n && !n._parityBound && (n._parityBound = !0, n.addEventListener("click", function(v) {
      v.preventDefault();
      var h = t._activeParityClass || "STSO", c = [];
      Object.keys(t._selectedParityBands || {}).forEach(function(y) {
        t._selectedParityBands[y] && c.push(y);
      }), t.checkParity && (t._parityReportResult = t.checkParity(h, c), _e(t));
    })), o && !o._parityBound && (o._parityBound = !0, o.addEventListener("click", function(v) {
      v.preventDefault();
      var h = [];
      if (d && d.querySelectorAll("tr[data-pair-idx]").forEach(function(g) {
        var m = g.querySelector(".parity-swap-cb");
        if (m && m.checked) {
          var p = [], b = [];
          try {
            p = JSON.parse(g.getAttribute("data-rdo-a-after"));
          } catch {
          }
          try {
            b = JSON.parse(g.getAttribute("data-rdo-b-after"));
          } catch {
          }
          h.push({
            lineAId: g.getAttribute("data-line-a-id"),
            lineBId: g.getAttribute("data-line-b-id"),
            rdoA_after: p,
            rdoB_after: b
          });
        }
      }), h.length && t.approveParitySwaps) {
        t.approveParitySwaps(h);
        var c = t._activeParityClass || "STSO", y = [];
        Object.keys(t._selectedParityBands || {}).forEach(function(g) {
          t._selectedParityBands[g] && y.push(g);
        }), t.checkParity && (t._parityReportResult = t.checkParity(c, y), _e(t));
      }
    })), t._parityReportResult && _e(t);
  }
}
function _e(t) {
  var r = typeof document < "u" ? document.getElementById("generate-parity-results-wrap") : null, a = typeof document < "u" ? document.getElementById("generate-parity-summary") : null, n = typeof document < "u" ? document.getElementById("generate-parity-proposals-tbody") : null;
  if (!(!r || !a || !n)) {
    var o = t._parityReportResult;
    if (!o) {
      r.style.display = "none";
      return;
    }
    r.style.display = "block", a.textContent = o.summary || "";
    var s = o.proposals || [];
    if (!s.length) {
      var d = o.shortfalls && o.shortfalls.length > 0 || o.disparities && o.disparities.length > 0, i = d ? "RDO pattern parity shortfalls detected. Cannot auto-balance with available lines." : "No RDO pattern swaps needed. Patterns are balanced.";
      n.innerHTML = '<tr><td colspan="3" class="muted" style="text-align:center">' + i + "</td></tr>";
      return;
    }
    n.innerHTML = s.map(function(u, l) {
      var f = u.lineA, v = u.lineB, h = ae(u.rdoA_before), c = ae(u.rdoB_before), y = JSON.stringify(u.rdoA_after), g = JSON.stringify(u.rdoB_after), m = "<strong>" + (f.lineCode || f.id) + "</strong> (" + f.sex + ", " + (f.shiftName || f.shiftId) + ") RDO: " + h, p = "<strong>" + (v.lineCode || v.id) + "</strong> (" + v.sex + ", " + (v.shiftName || v.shiftId) + ") RDO: " + c;
      return '<tr data-pair-idx="' + l + '" data-line-a-id="' + f.id + '" data-line-b-id="' + v.id + `" data-rdo-a-after='` + y + "' data-rdo-b-after='" + g + `'><td><input type="checkbox" class="parity-swap-cb" checked /> ` + m + "</td><td>" + p + '</td><td><strong style="color:var(--amber,#d97706)">' + u.note + "</strong></td></tr>";
    }).join("");
  }
}
function yt(t) {
  var r = typeof document < "u" ? document.getElementById("generate-dfo-class-select") : null, a = typeof document < "u" ? document.getElementById("btn-generate-propose-dfo") : null, n = typeof document < "u" ? document.getElementById("btn-generate-approve-dfo") : null, o = typeof document < "u" ? document.getElementById("generate-dfo-results-wrap") : null, s = typeof document < "u" ? document.getElementById("generate-dfo-proposals-tbody") : null;
  if (r) {
    var d = Ce(t);
    t._activeDfoClass || (t._activeDfoClass = d[0] ? d[0].key : "STSO"), r.innerHTML = d.map(function(i) {
      var u = i.key === t._activeDfoClass ? " selected" : "";
      return '<option value="' + i.key + '"' + u + ">" + i.label + "</option>";
    }).join(""), t._dfoClassSelectBound || (t._dfoClassSelectBound = !0, r.addEventListener("change", function(i) {
      t._activeDfoClass = i.target.value, t._dfoCertBalanceResult = null, o && (o.style.display = "none");
    })), a && !a._dfoBound && (a._dfoBound = !0, a.addEventListener("click", function(i) {
      i.preventDefault();
      var u = t._activeDfoClass || "STSO";
      t.proposeDfoCertBalance && (t._dfoCertBalanceResult = t.proposeDfoCertBalance(u), Re(t));
    })), n && !n._dfoBound && (n._dfoBound = !0, n.addEventListener("click", function(i) {
      i.preventDefault();
      var u = t._dfoCertBalanceResult;
      if (u) {
        var l = [];
        if (u.mode === "cert_move" && s && s.querySelectorAll("tr[data-prop-idx]").forEach(function(v) {
          var h = v.querySelector(".dfo-cert-swap-cb");
          if (h && h.checked) {
            var c = +v.getAttribute("data-prop-idx");
            u.proposals[c] && l.push(u.proposals[c]);
          }
        }), t.approveDfoCertBalance) {
          t.approveDfoCertBalance(u, l);
          var f = t._activeDfoClass || "STSO";
          t.proposeDfoCertBalance && (t._dfoCertBalanceResult = t.proposeDfoCertBalance(f), Re(t));
        }
      }
    })), t._dfoCertBalanceResult && Re(t);
  }
}
function Re(t) {
  var r = typeof document < "u" ? document.getElementById("generate-dfo-results-wrap") : null, a = typeof document < "u" ? document.getElementById("generate-dfo-summary") : null, n = typeof document < "u" ? document.getElementById("generate-dfo-proposals-tbody") : null;
  if (!(!r || !a || !n)) {
    var o = t._dfoCertBalanceResult;
    if (!o) {
      r.style.display = "none";
      return;
    }
    if (r.style.display = "block", a.textContent = o.summary || "", o.mode === "baggage_reshuffle") {
      n.innerHTML = '<tr><td style="text-align:center"><input type="checkbox" class="dfo-cert-swap-cb" checked /></td><td><strong>Baggage Duty Rotation</strong></td><td>All</td><td>Matched per shift (' + (o.certCountPerShift || 0) + ' certs)</td><td><strong style="color:var(--amber,#d97706)">Reshuffle baggage duty days across work days (resolveBagDuties)</strong></td></tr>';
      return;
    }
    var s = o.proposals || [];
    if (!s.length) {
      n.innerHTML = '<tr><td colspan="5" class="muted" style="text-align:center">No DFO cert moves required. Shift cert counts match.</td></tr>';
      return;
    }
    n.innerHTML = s.map(function(d, i) {
      var u = d.donorLine, l = d.receiverLine, f = d.donorShift ? d.donorShift.name || d.donorShift.id : "", v = d.receiverShift ? d.receiverShift.name || d.receiverShift.id : "";
      return '<tr data-prop-idx="' + i + '"><td style="text-align:center"><input type="checkbox" class="dfo-cert-swap-cb" checked /></td><td><strong>' + (u.lineCode || u.id) + " → " + (l.lineCode || l.id) + '</strong></td><td><span class="badge" style="background:' + (d.sex === "M" ? "#007bff" : "#e83e8c") + ';color:#fff;padding:0.15rem 0.4rem;border-radius:3px">' + d.sex + "</span></td><td>" + f + " (" + (u.lineCode || u.id) + ") & " + v + " (" + (l.lineCode || l.id) + ')</td><td><strong style="color:var(--amber,#d97706)">' + d.note + "</strong></td></tr>";
    }).join("");
  }
}
function Va(t) {
  var r = typeof document < "u" ? document.getElementById("generate-modal") : null;
  r && (r.style.display = "flex", r.setAttribute("aria-hidden", "false"), t.renderGenerateModalContent && t.renderGenerateModalContent());
}
function je(t) {
  var r = typeof document < "u" ? document.getElementById("generate-modal") : null;
  r && (r.style.display = "none", r.setAttribute("aria-hidden", "true"));
}
function Wa(t) {
  if (!t || t._generateModalListenersBound) return;
  t._generateModalListenersBound = !0;
  function r(a, n) {
    var o = typeof document < "u" ? document.getElementById(a) : null;
    o && o.addEventListener("click", n);
  }
  r("generate-modal-close", function(a) {
    a.preventDefault(), je();
  }), r("btn-generate-modal-done", function(a) {
    a.preventDefault(), je();
  }), r("btn-generate-all", function(a) {
    a.preventDefault(), t.generate && t.generate(), t.renderGenerateModalContent && t.renderGenerateModalContent();
  });
}
function Ja(t) {
  t && (t.openGenerateModal = function() {
    Wa(t), Va(t);
  }, t.closeGenerateModal = function() {
    je();
  }, t.getModalClassOptions = function() {
    return Ce(t);
  }, t.renderClassButtons = function() {
    ht(t);
  }, t.renderTargetControls = function() {
    ie(t);
  }, t.initPerShiftTargetsForClass = function(r) {
    return Yt(t, r);
  }, t.renderWeekdayBandsMatrix = function() {
    mt(t);
  }, t.renderParityReportSection = function() {
    gt(t);
  }, t.renderDfoSection = function() {
    yt(t);
  }, t.renderGenerateModalContent = function() {
    ht(t), ie(t), mt(t), gt(t), yt(t);
  });
}
function xe(t, r) {
  if (!t) return !1;
  if (r === "STSO")
    return !!(t.isStso || t.empClass === "STSO" || t.position === "STSO");
  if (r === "LTSO")
    return !!(t.isLtso || t.empClass === "LTSO" || t.position === "LTSO");
  if (r === "TSO") {
    var a = t.isStso || t.isLtso || t.empClass === "STSO" || t.empClass === "LTSO", n = t.isExtra || t.extraPositionId || t.isTraining || t.trainingClass || t.empClass === "ESTI" || t.empClass === "MSTI";
    return !a && !n;
  }
  if (r === "MSTI")
    return t.trainingClass === "MSTI" || t.empClass === "MSTI" || t.extraName === "MSTI";
  if (r === "ESTI")
    return t.trainingClass === "ESTI" || t.empClass === "ESTI" || t.extraName === "ESTI";
  if (r.indexOf("EXTRA_") === 0) {
    var o = r.substring(6);
    return t.extraPositionId === o || String(t.extraPositionId) === o || t.extraName === o;
  }
  return !1;
}
function $t(t, r) {
  var a = t && t.state || {};
  if (r === "STSO") return { M: a.stsoM || 0, F: a.stsoF || 0, total: (a.stsoM || 0) + (a.stsoF || 0) };
  if (r === "LTSO") return { M: a.ltsoM || 0, F: a.ltsoF || 0, total: (a.ltsoM || 0) + (a.ltsoF || 0) };
  if (r === "TSO") {
    var n = (a.ftM || 0) + (a.ptM || 0), o = (a.ftF || 0) + (a.ptF || 0);
    return { M: n, F: o, total: n + o };
  }
  if (r === "MSTI") return { M: 0, F: 0, total: a.msti || 0 };
  if (r === "ESTI") return { M: 0, F: 0, total: a.esti || 0 };
  if (r.indexOf("EXTRA_") === 0) {
    var s = r.substring(6), d = a.extraPositions || [], i = d.find(function(u) {
      return u.id === s || u.name === s;
    });
    if (i) return { M: +i.m || 0, F: +i.f || 0, total: (+i.m || 0) + (+i.f || 0) };
  }
  return { M: 0, F: 0, total: 0 };
}
function he(t, r) {
  for (var a = r; t.has(a); )
    a++;
  return t.add(a), a;
}
function Xa(t, r, a) {
  if (!(!t || !t.state)) {
    t.state.issues = t.state.issues || [], t.collectSetupInputs && t.collectSetupInputs(), t.readShiftsFromDom && t.readShiftsFromDom();
    var n = t.timeToMin ? t.timeToMin(t.state.open) : 210, o = t.timeToMin ? t.timeToMin(t.state.close) : 1380, s = (t.state.weekCount || 1) * 7, d = t.state.lines || [], i = t.state.schedule || {}, u = t.state.functionRotation || {}, l = [], f = [];
    d.forEach(function(O) {
      xe(O, r) ? t.isLineScheduleLocked && t.isLineScheduleLocked(O) && f.push(O) : l.push(O);
    });
    var v = /* @__PURE__ */ new Set();
    l.forEach(function(O) {
      v.add(+O.id);
    }), f.forEach(function(O) {
      v.add(+O.id);
    });
    var h = {}, c = {};
    l.concat(f).forEach(function(O) {
      i[O.id] && (h[O.id] = i[O.id].slice()), u[O.id] && (c[O.id] = u[O.id].slice());
    });
    var y = [], g = $t(t, r), m = t.state.shifts || [], p = m[0] || { id: "S1", name: "AM", start: "03:30", end: "12:00", paid: 8 }, b = 0, M = 0, T = 0, L = 0, E = 0, A = 0, C = {}, I = {};
    m.forEach(function(O) {
      C[O.id] = 0, I[O.id] = 0;
    }), f.forEach(function(O) {
      var $ = O.sex === "F", re = O.empClass === "PT";
      $ ? (M++, re ? A++ : L++, O.shiftId && I[O.shiftId] != null && I[O.shiftId]++) : (b++, re ? E++ : T++, O.shiftId && C[O.shiftId] != null && C[O.shiftId]++);
    });
    var F = 1;
    if (r === "STSO" ? F = 1e4 : r === "LTSO" ? F = 2e4 : r === "TSO" ? F = 1 : r === "MSTI" ? F = 4e4 : r === "ESTI" ? F = 41e3 : r.indexOf("EXTRA_") === 0 && (F = 3e4), a && typeof a == "object") {
      var B = r === "MSTI" || r === "ESTI", N = B ? Math.max(0, g.total - f.length) : Math.max(0, g.M - b), k = B ? 0 : Math.max(0, g.F - M), R = N, _ = k, w = b, x = M, P = r === "TSO" ? Math.max(0, (+t.state.ptM || 0) - E) : 0, V = r === "TSO" ? Math.max(0, (+t.state.ptF || 0) - A) : 0;
      if (m.forEach(function(O) {
        var $ = a[O.id] || { M: 0, F: 0 }, re = Math.max(0, +$.M || 0), Be = Math.max(0, +$.F || 0), ce = C[O.id] || 0, ve = I[O.id] || 0, K = Math.max(0, re - ce), be = Math.max(0, Be - ve);
        B ? (K = Math.min(K, R), R -= K, w += K) : (K = Math.min(K, R), R -= K, w += K, be = Math.min(be, _), _ -= be, x += be);
        for (var dt = 0; dt < K; dt++) {
          var gr = he(v, F), ft = P > 0;
          ft && P--, y.push(Ee(t, r, gr, O, B ? "" : "M", !1, ft));
        }
        for (var ut = 0; ut < be; ut++) {
          var yr = he(v, F), lt = V > 0;
          lt && V--, y.push(Ee(t, r, yr, O, "F", !1, lt));
        }
      }), B)
        for (var D = f.length + (N - R), G = Math.max(0, g.total - D), W = 0; W < G; W++) {
          var j = he(v, F);
          y.push(Ee(t, r, j, p, "", !1, !1));
        }
      else {
        for (var H = Math.max(0, g.M - w), X = Math.max(0, g.F - x), q = 0; q < H; q++) {
          var z = he(v, F), Y = P > 0;
          Y && P--;
          var U = Ee(t, r, z, p, "M", !0, Y);
          y.push(U);
        }
        for (var Z = 0; Z < X; Z++) {
          var te = he(v, F), ee = V > 0;
          ee && V--;
          var Kt = Ee(t, r, te, p, "F", !0, ee);
          y.push(Kt);
        }
      }
    } else {
      var Xe = l.concat(f);
      if (r === "STSO") {
        var ze = Math.max(0, (t.state.stsoM || 0) - b), Ye = Math.max(0, (t.state.stsoF || 0) - M), Qe = ze + Ye;
        if (Qe > 0) {
          var St = t.state.stsoM, er = t.state.stsoF;
          t.state.stsoM = ze, t.state.stsoF = Ye;
          var tr = t.allocateSupervisoryHeadcounts(Qe, n, o, "stsoForce", Xe);
          y = t.buildSupervisoryLines(tr.counts || {}, "STSO"), t.state.stsoM = St, t.state.stsoF = er;
        }
      } else if (r === "LTSO") {
        var $e = Math.max(0, (t.state.ltsoM || 0) - b), Ze = Math.max(0, (t.state.ltsoF || 0) - M), Ke = $e + Ze;
        if (Ke > 0) {
          var rr = t.state.ltsoM, ar = t.state.ltsoF;
          t.state.ltsoM = $e, t.state.ltsoF = Ze;
          var nr = t.allocateSupervisoryHeadcounts(Ke, n, o, "ltsoForce", Xe);
          y = t.buildSupervisoryLines(nr.counts || {}, "LTSO"), t.state.ltsoM = rr, t.state.ltsoF = ar;
        }
      } else if (r === "TSO") {
        var Se = Math.max(0, (t.state.ftM || 0) - T), et = Math.max(0, (t.state.ftF || 0) - L), tt = Math.max(0, (t.state.ptM || 0) - E), rt = Math.max(0, (t.state.ptF || 0) - A), at = Se + et + tt + rt;
        if (at > 0) {
          var ir = t.state.ftM, or = t.state.ftF, sr = t.state.ptM, dr = t.state.ptF;
          t.state.ftM = Se, t.state.ftF = et, t.state.ptM = tt, t.state.ptF = rt;
          var fr = t.allocateShiftHeadcounts(at, n, o);
          y = t.buildLines(fr.counts || {}), t.state.ftM = ir, t.state.ftF = or, t.state.ptM = sr, t.state.ptF = dr;
        }
      } else if (r === "ESTI" || r === "MSTI") {
        var we = Math.max(0, g.total - f.length);
        if (we > 0) {
          var ur = t.state.esti, lr = t.state.msti;
          r === "ESTI" ? t.state.esti = we : t.state.msti = we;
          var cr = t.buildTrainingClassLines ? t.buildTrainingClassLines() : [];
          y = cr.filter(function(O) {
            return xe(O, r);
          }), t.state.esti = ur, t.state.msti = lr;
        }
      } else if (r.indexOf("EXTRA_") === 0) {
        var nt = r.substring(6), vr = t.state && t.state.extraPositions || [], ne = vr.find(function(O) {
          return O.id === nt || O.name === nt;
        });
        if (ne) {
          var it = Math.max(0, (+ne.m || 0) - b), ot = Math.max(0, (+ne.f || 0) - M);
          if (it + ot > 0) {
            var pr = ne.m, hr = ne.f;
            ne.m = it, ne.f = ot;
            var mr = t.buildExtraPositionLines ? t.buildExtraPositionLines() : [];
            y = mr.filter(function(O) {
              return xe(O, r);
            }), ne.m = pr, ne.f = hr;
          }
        }
      }
      y.forEach(function(O) {
        if (v.has(+O.id)) {
          var $ = he(v, F);
          O.id = $;
          var re = O.position || r;
          O.lineCode = re + " " + String($).padStart(3, "0");
        } else
          v.add(+O.id);
      });
    }
    t.state.lines = l.concat(f, y), y.forEach(function(O) {
      t.state.schedule[O.id] = Ue(t, O, s);
    }), Object.keys(h).forEach(function(O) {
      t.state.schedule[O] = h[O];
    }), t.state.functionRotation = t.state.functionRotation || {}, Object.keys(c).forEach(function(O) {
      t.state.functionRotation[O] = c[O];
    }), y.forEach(function(O) {
      var $ = [], re = t.state.schedule[O.id] || [], Be = O.isTraining || O.trainingClass || O.empClass === "ESTI" || O.empClass === "MSTI";
      if (O.isShortfall || O.function === "-") {
        O.function = "-";
        for (var ce = 0; ce < s; ce++)
          $[ce] = re[ce] === "WORK" ? "-" : "OFF";
      } else if (Be) {
        O.function = "TRAINING";
        for (var ve = 0; ve < s; ve++)
          $[ve] = re[ve] === "WORK" ? "TRAINING" : "OFF";
      } else {
        O.function = O.function || "PAX";
        for (var K = 0; K < s; K++)
          $[K] = re[K] === "WORK" ? O.function || "PAX" : "OFF";
      }
      t.state.functionRotation[O.id] = $;
    });
    var st = y.filter(function(O) {
      return !O.isShortfall && O.function !== "-";
    });
    y.forEach(function(O) {
      (O.isShortfall || O.function === "-") && (O.certPool = "A", O.functionEligible && (O.functionEligible.dfo = !1, O.functionEligible.pax = !1));
    }), t.assignCertPoolsToLines && st.length && We(st, t.state.certPool, {
      startMinOf: function(O) {
        if (t.getShift && t.timeToMin) {
          var $ = t.getShift(O.shiftId);
          return $ ? t.timeToMin($.start) : 0;
        }
        return 0;
      },
      getShift: t.getShift,
      timeToMin: t.timeToMin,
      schedule: t.state.schedule || {},
      openMin: n,
      closeMin: o
    });
    try {
      t.renderAll && t.renderAll(), t.renderCoverageBars && t.renderCoverageBars(), t.__USE_SVELTE_LINES && typeof window < "u" ? ue(le.LINES_REQUEST_RENDER, null) : t.renderLines && t.renderLines();
    } catch (O) {
      console.error("generateClass UI refresh", O);
    }
    t.updateStatus && t.updateStatus("Generated " + r + " (" + y.length + " lines). Other classes untouched.");
  }
}
function Ee(t, r, a, n, o, s, d) {
  var i = r === "STSO", u = r === "LTSO", l = r === "MSTI" || r === "ESTI", f = r.indexOf("EXTRA_") === 0, v = i ? "STSO" : u ? "LTSO" : l ? r : d ? "PT" : "FT", h = i ? "STSO" : u ? "LTSO" : l ? r : "TSO", c = t && t.state ? Number(t.state.ptHoursPerDay) : NaN, y = Number.isFinite(c) && c > 0 ? Math.min(12, c) : 4, g = d ? y : n.paid || 8, m = h + " " + String(a).padStart(3, "0"), p = !1;
  if (f) {
    var b = r.substring(6);
    h = b, m = b + " " + String(a).padStart(3, "0");
    var M = t && t.state && t.state.extraPositions || [], T = M.find(function(F) {
      return F.id === b || F.name === b;
    });
    T && (t && t.opsFteYes ? p = t.opsFteYes(T) : p = String(T.opsFte).toLowerCase() === "yes" || T.opsFte === !0 || T.opsFte === 1, T.name && (h = T.name));
  }
  for (var L = t.targetWorkDays ? t.targetWorkDays(n.id, v) : (+n.paid || 8) >= 10 ? 4 : 5, E = 7 - L, A = Array.isArray(n.rdoHard) ? n.rdoHard.map(Number).filter(function(F) {
    return F >= 0 && F <= 6;
  }) : [], C = A.length > 0 ? A.slice() : t.consecutiveRdos ? t.consecutiveRdos(E, a % 7) : [0, 6]; C.length < E; )
    for (var I = 0; I < 7 && C.length < E; I++)
      C.indexOf(I) < 0 && C.push(I);
  return {
    id: a,
    lineCode: m,
    shiftId: n.id,
    shiftName: n.name,
    shiftLabel: t.shiftLabel ? t.shiftLabel(n) : (n.start || "") + "–" + (n.end || ""),
    empClass: v,
    position: h,
    isStso: i,
    isLtso: u,
    isExtra: f,
    isTraining: l,
    trainingClass: l ? r : null,
    extraPositionId: f ? r.substring(6) : null,
    extraName: f ? r.substring(6) : null,
    opsFte: p,
    sex: l ? "" : o,
    function: s ? "-" : l ? "TRAINING" : "PAX",
    isShortfall: !!s,
    rdoDays: C,
    rdoHard: A.length > 0,
    paid: g
  };
}
function za(t) {
  t && (t.belongsToClass = xe, t.getClassHeadcount = function(r) {
    return $t(t, r);
  }, t.generateClass = function(r, a) {
    return Xa(t, r, a);
  });
}
function Ya(t, r) {
  var a = t && t.state && t.state.lines || [];
  return a.filter(function(n) {
    return t.belongsToClass ? t.belongsToClass(n, r) : !1;
  });
}
function bt(t) {
  return !Array.isArray(t) || !t.length ? "none" : t.slice().map(Number).sort(function(r, a) {
    return r - a;
  }).join("-");
}
function Me(t) {
  return Array.isArray(t) ? t.indexOf(0) >= 0 || t.indexOf(6) >= 0 : !1;
}
function Qa(t, r) {
  var a = t && t.state && t.state.shifts || [], n = a.find(function(o) {
    return o.id === r;
  });
  return n ? n.name || n.id : r;
}
function $a(t, r, a) {
  if (!t || !t.state) return { disparities: [], proposals: [], summary: "No Scheduler state" };
  if (r === "STSO")
    return {
      disparities: [],
      proposals: [],
      summary: "STSO parity check not applicable under half-day RDO parity rules (LTSO & TSO only)."
    };
  var n = Ya(t, r);
  if (!n.length)
    return { disparities: [], proposals: [], summary: "No lines found for class " + r };
  var o = new Set(Array.isArray(a) && a.length ? a : []), s = n.filter(function(g) {
    if (!g.shiftId || g.isShortfall || g.function === "-") return !1;
    var m = de(t, g.shiftId);
    return o.size === 0 || o.has(m);
  });
  if (!s.length)
    return { disparities: [], proposals: [], summary: "No active lines match the selected bands." };
  var d = {};
  s.forEach(function(g) {
    if (Me(g.rdoDays)) {
      var m = bt(g.rdoDays);
      d[m] || (d[m] = {
        patternKey: m,
        rdoDays: (g.rdoDays || []).slice()
      });
    }
  });
  var i = Object.keys(d).map(function(g) {
    return d[g];
  }), u = [], l = {};
  s.forEach(function(g) {
    g.shiftId && !l[g.shiftId] && (l[g.shiftId] = !0, u.push(g.shiftId));
  });
  var f = [], v = [], h = [], c = /* @__PURE__ */ new Set();
  u.forEach(function(g) {
    var m = s.filter(function(j) {
      return j.shiftId === g && !(t.isLineScheduleLocked && t.isLineScheduleLocked(j));
    }), p = Qa(t, g), b = {};
    m.forEach(function(j) {
      b[j.id] = bt(j.rdoDays);
    });
    for (var M = 10, T = 0; T < M; ) {
      T++;
      var L = !1, E = {};
      m.forEach(function(j) {
        var H = b[j.id];
        E[H] || (E[H] = { M: 0, F: 0 }), j.sex === "M" ? E[H].M++ : j.sex === "F" && E[H].F++;
      });
      for (var A = i.slice(), C = 0; C < A.length; C++) {
        var I = A[C], F = I.patternKey, B = E[F] || { M: 0, F: 0 };
        if (B.M > B.F && B.M >= 2) {
          for (var N = 0; N < A.length; N++)
            if (C !== N) {
              var k = A[N], R = k.patternKey, _ = E[R] || { M: 0, F: 0 };
              if (_.F > _.M && _.F >= 2) {
                var w = m.find(function(j) {
                  return j.sex === "M" && b[j.id] === F && !c.has(j.id);
                }), x = m.find(function(j) {
                  return j.sex === "F" && b[j.id] === R && !c.has(j.id);
                });
                if (w && x) {
                  c.add(w.id), c.add(x.id), b[w.id] = R, b[x.id] = F;
                  var P = ae(I.rdoDays), V = ae(k.rdoDays);
                  f.push({
                    lineA: x,
                    lineB: w,
                    shiftId: g,
                    rdoA_before: x.rdoDays,
                    rdoB_before: w.rdoDays,
                    rdoA_after: I.rdoDays,
                    rdoB_after: k.rdoDays,
                    note: p + " shift: Swap RDOs so " + (x.lineCode || x.id) + " (F) gains pattern " + P + " & " + (w.lineCode || w.id) + " (M) gains pattern " + V
                  }), L = !0;
                  break;
                }
              }
            }
          if (L) break;
        }
      }
      if (!L) {
        for (var C = 0; C < A.length; C++) {
          var I = A[C], F = I.patternKey, B = E[F] || { M: 0, F: 0 };
          if (B.M > B.F && B.M >= 2) {
            var w = m.find(function(U) {
              return U.sex === "M" && b[U.id] === F && !c.has(U.id);
            }), x = m.find(function(U) {
              return U.sex === "F" && b[U.id] !== F && !Me(U.rdoDays) && !c.has(U.id);
            });
            if (w && x) {
              var D = b[x.id];
              c.add(w.id), c.add(x.id), b[w.id] = D, b[x.id] = F;
              var P = ae(I.rdoDays), G = ae(x.rdoDays);
              f.push({
                lineA: x,
                lineB: w,
                shiftId: g,
                rdoA_before: x.rdoDays,
                rdoB_before: w.rdoDays,
                rdoA_after: I.rdoDays,
                rdoB_after: x.rdoDays,
                note: p + " shift: Swap RDOs so " + (x.lineCode || x.id) + " (F) gains pattern " + P + " & " + (w.lineCode || w.id) + " (M) gains pattern " + G
              }), L = !0;
              break;
            }
          } else if (B.F > B.M && B.F >= 2) {
            var x = m.find(function(U) {
              return U.sex === "F" && b[U.id] === F && !c.has(U.id);
            }), w = m.find(function(U) {
              return U.sex === "M" && b[U.id] !== F && !Me(U.rdoDays) && !c.has(U.id);
            });
            if (w && x) {
              var D = b[w.id];
              c.add(w.id), c.add(x.id), b[w.id] = F, b[x.id] = D;
              var P = ae(I.rdoDays), G = ae(w.rdoDays);
              f.push({
                lineA: x,
                lineB: w,
                shiftId: g,
                rdoA_before: x.rdoDays,
                rdoB_before: w.rdoDays,
                rdoA_after: w.rdoDays,
                rdoB_after: I.rdoDays,
                note: p + " shift: Swap RDOs so " + (w.lineCode || w.id) + " (M) gains pattern " + P + " & " + (x.lineCode || x.id) + " (F) gains pattern " + G
              }), L = !0;
              break;
            }
          }
        }
        if (!L) {
          for (var C = 0; C < A.length; C++) {
            var I = A[C], F = I.patternKey, B = E[F] || { M: 0, F: 0 };
            if (B.M === 0 && B.F === 0) {
              var w = m.find(function(U) {
                return U.sex === "M" && !Me(U.rdoDays) && !c.has(U.id);
              }), x = m.find(function(U) {
                return U.sex === "F" && !Me(U.rdoDays) && !c.has(U.id);
              });
              if (w && x) {
                c.add(w.id), c.add(x.id), b[w.id] = F, b[x.id] = F;
                var P = ae(I.rdoDays);
                f.push({
                  lineA: x,
                  lineB: w,
                  shiftId: g,
                  rdoA_before: x.rdoDays,
                  rdoB_before: w.rdoDays,
                  rdoA_after: I.rdoDays,
                  rdoB_after: I.rdoDays,
                  note: p + " shift: Assign pattern " + P + " to " + (x.lineCode || x.id) + " (F) & " + (w.lineCode || w.id) + " (M)"
                }), L = !0;
                break;
              }
            }
          }
          if (!L) break;
        }
      }
    }
    var W = {};
    m.forEach(function(j) {
      var H = b[j.id];
      W[H] || (W[H] = { M: 0, F: 0 }), j.sex === "M" ? W[H].M++ : j.sex === "F" && W[H].F++;
    }), i.forEach(function(j) {
      var H = W[j.patternKey] || { M: 0, F: 0 }, X = ae(j.rdoDays);
      (H.M !== H.F || H.M === 0 || H.F === 0) && (v.push({
        shiftId: g,
        patternKey: j.patternKey,
        rdoDays: j.rdoDays,
        countM: H.M,
        countF: H.F
      }), H.M === 0 && h.push(p + " shift short of Male line on pattern " + X), H.F === 0 && h.push(p + " shift short of Female line on pattern " + X));
    });
  });
  var y = "";
  return h.length > 0 ? y = "Class " + r + " parity shortfalls: " + h.join("; ") : v.length > 0 ? y = "Class " + r + ": " + v.length + " pattern disparity/disparities found across shifts. Proposed swaps to achieve equal weekend RDO parity per shift." : y = "Class " + r + ": Patterns are balanced.", {
    disparities: v,
    shortfalls: h,
    proposals: f,
    summary: y
  };
}
function Za(t, r) {
  if (!t || !t.state || !Array.isArray(r) || !r.length) return !1;
  var a = t.state.lines || [], n = (t.state.weekCount || 1) * 7, o = 0;
  return r.forEach(function(s) {
    var d = a.find(function(p) {
      return String(p.id) === String(s.lineAId);
    }), i = a.find(function(p) {
      return String(p.id) === String(s.lineBId);
    });
    if (!(!d || !i)) {
      var u = s.rdoA_after, l = s.rdoB_after;
      if (Array.isArray(u) && Array.isArray(l)) {
        if (d.rdoDays = u.slice(), i.rdoDays = l.slice(), t.buildScheduleForLine && t.state.schedule && (t.state.schedule[d.id] = t.buildScheduleForLine(d, n), t.state.schedule[i.id] = t.buildScheduleForLine(i, n)), t.state.functionRotation) {
          for (var f = [], v = [], h = t.state.schedule[d.id] || [], c = t.state.schedule[i.id] || [], y = d.function || "PAX", g = i.function || "PAX", m = 0; m < n; m++)
            f[m] = h[m] === "WORK" ? y : "OFF", v[m] = c[m] === "WORK" ? g : "OFF";
          t.state.functionRotation[d.id] = f, t.state.functionRotation[i.id] = v;
        }
        o++;
      }
    }
  }), o > 0 ? (t.updateStatus && t.updateStatus("Approved " + o + " RDO parity pattern swap(s)."), t.renderAll && t.renderAll(), t.__USE_SVELTE_LINES && typeof window < "u" ? ue(le.LINES_REQUEST_RENDER, null) : t.renderLines && t.renderLines(), !0) : !1;
}
function Ka(t) {
  t && (t.checkParity = function(r, a) {
    return $a(t, r, a);
  }, t.approveParitySwaps = function(r) {
    return Za(t, r);
  });
}
function Sa(t, r) {
  var a = t && t.state && t.state.lines || [];
  return a.filter(function(n) {
    if (!n) return !1;
    var o = !!(n.isExtra || n.extraPositionId), s = !!(n.isTraining || n.trainingClass || n.empClass === "ESTI" || n.empClass === "MSTI");
    return o || s ? !1 : r === "STSO" ? n.isStso || n.empClass === "STSO" || n.position === "STSO" : r === "LTSO" ? n.isLtso || n.empClass === "LTSO" || n.position === "LTSO" : r === "TSO" ? !n.isStso && !n.isLtso && n.empClass !== "STSO" && n.empClass !== "LTSO" : t.belongsToClass ? t.belongsToClass(n, r) : !0;
  });
}
function Ne(t) {
  return t ? t.certPool === "B" || t.function === "DFO" : !1;
}
function en(t, r) {
  if (!t || !t.state) return { mode: "none", proposals: [], summary: "No Scheduler state" };
  var a = Sa(t, r), n = t.state.shifts || [];
  if (!a.length || !n.length)
    return { mode: "none", proposals: [], summary: "No lines or shifts found for class " + r };
  var o = {}, s = {};
  n.forEach(function(b) {
    o[b.id] = 0, s[b.id] = 0;
  }), a.forEach(function(b) {
    !b.shiftId || o[b.shiftId] == null || (s[b.shiftId]++, Ne(b) && o[b.shiftId]++);
  });
  var d = n.filter(function(b) {
    return s[b.id] > 0;
  });
  if (!d.length)
    return { mode: "none", proposals: [], summary: "No active lines on shifts for class " + r };
  var i = d.map(function(b) {
    return o[b.id];
  }), u = Math.min.apply(null, i), l = Math.max.apply(null, i), f = u === l;
  if (f)
    return {
      mode: "baggage_reshuffle",
      certsMatch: !0,
      certCountPerShift: u,
      proposals: [],
      summary: "DFO cert counts already match across shifts (" + u + " certs/shift). Proposed fix: Reshuffle baggage duty days."
    };
  var v = Math.round(i.reduce(function(b, M) {
    return b + M;
  }, 0) / i.length), h = d.filter(function(b) {
    return o[b.id] > v;
  }), c = d.filter(function(b) {
    return o[b.id] < v;
  }), y = Object.assign({}, o), g = [], m = /* @__PURE__ */ new Set();
  h.forEach(function(b) {
    for (var M = y[b.id] - v, T = a.filter(function(R) {
      return R.shiftId === b.id && Ne(R) && !(t.isLineScheduleLocked && t.isLineScheduleLocked(R));
    }), L = 0; L < T.length && M > 0; L++) {
      for (var E = T[L], A = E.sex || "M", C = null, I = null, F = c.filter(function(R) {
        return y[R.id] < v;
      }), B = 0; B < F.length; B++) {
        var N = F[B], k = a.find(function(R) {
          return R.shiftId === N.id && (R.sex || "M") === A && !Ne(R) && !m.has(R.id) && !(t.isLineScheduleLocked && t.isLineScheduleLocked(R));
        });
        if (k) {
          C = k, I = N;
          break;
        }
      }
      !C || !I || (m.add(C.id), g.push({
        donorLine: E,
        receiverLine: C,
        sex: A,
        donorShift: b,
        receiverShift: I,
        note: "Move DFO cert from " + (E.lineCode || E.id) + " (" + b.name + ") to " + (C.lineCode || C.id) + " (" + I.name + "). Lines do not move."
      }), y[b.id]--, y[I.id]++, M--);
    }
  });
  var p = "DFO cert counts differ between shifts (" + u + " to " + l + "). Proposed fix: Move DFO certs between same-sex lines across shifts (lines stay on original shifts).";
  return {
    mode: "cert_move",
    certsMatch: !1,
    proposals: g,
    summary: p
  };
}
function tn(t, r, a) {
  if (!t || !t.state || !r) return !1;
  if (r.mode === "baggage_reshuffle") {
    t.readFunctionCoverageFromDom && t.readFunctionCoverageFromDom();
    var n = t.ensureFunctionCoverage ? t.ensureFunctionCoverage() : t.state.functionCoverage, o = (t.state.weekCount || 1) * 7;
    return t.resolveBagDuties && t.resolveBagDuties(n, o), t.updateStatus && t.updateStatus("Approved baggage day reshuffle."), !0;
  }
  if (r.mode === "cert_move") {
    var s = Array.isArray(a) && a.length ? a : r.proposals;
    if (!s || !s.length) return !1;
    var d = t.state.lines || [], i = 0;
    if (s.forEach(function(f) {
      var v = d.find(function(g) {
        return String(g.id) === String(f.donorLine.id);
      }), h = d.find(function(g) {
        return String(g.id) === String(f.receiverLine.id);
      });
      if (!(!v || !h)) {
        if ((v.sex || "M") !== (h.sex || "M")) {
          t.state && t.state.issues && t.state.issues.push("Refused DFO cert move between different sexes (" + v.sex + " vs " + h.sex + ")");
          return;
        }
        var c = v.shiftId, y = h.shiftId;
        v.certPool = "A", v.function = "PAX", v.functionEligible && (v.functionEligible.dfo = !1, v.functionEligible.pax = !0), h.certPool = "B", h.function = "DFO", h.functionEligible && (h.functionEligible.dfo = !0, h.functionEligible.pax = !1), v.shiftId = c, h.shiftId = y, i++;
      }
    }), i > 0) {
      if (t.resolveBagDuties) {
        var u = t.ensureFunctionCoverage ? t.ensureFunctionCoverage() : t.state.functionCoverage, l = (t.state.weekCount || 1) * 7;
        t.resolveBagDuties(u, l);
      }
      return t.updateStatus && t.updateStatus("Approved " + i + " same-sex DFO cert move(s). Lines remained in place."), t.renderAll && t.renderAll(), t.__USE_SVELTE_LINES && typeof window < "u" ? ue(le.LINES_REQUEST_RENDER, null) : t.renderLines && t.renderLines(), !0;
    }
  }
  return !1;
}
function rn(t) {
  t && (t.proposeDfoCertBalance = function(r) {
    return en(t, r);
  }, t.approveDfoCertBalance = function(r, a) {
    return tn(t, r, a);
  });
}
function J(t, r) {
  try {
    r();
  } catch (a) {
    console.error("setup-panel bridge:", t, a);
  }
}
function an(t) {
  t && (J("attachSetupState", function() {
    Er(t);
  }), J("attachCertPools", function() {
    sa(t);
  }), J("attachGenerate", function() {
    Xr(t);
  }), J("attachShiftMath", function() {
    ba(t);
  }), J("attachShiftsTable", function() {
    xr(t);
  }), J("attachExtraPositions", function() {
    It(t);
  }), J("attachTrainingClasses", function() {
    kt(t);
  }), J("attachAllocation", function() {
    da(t);
  }), J("attachAirportStub", function() {
    Ta(t);
  }), J("attachExportBoard", function() {
    Ea(t);
  }), J("attachRebalancePt", function() {
    Fa(t);
  }), J("attachRebalanceFt", function() {
    Da(t);
  }), J("attachRebalanceDfo", function() {
    Ba(t);
  }), J("attachSwapSex", function() {
    Ra(t);
  }), J("attachScheduleLocks", function() {
    Ha(t);
  }), J("attachScheduleLocksUi", function() {
    Ua(t);
  }), J("attachGenerateModal", function() {
    Ja(t);
  }), J("attachClassGenerate", function() {
    za(t);
  }), J("attachParityReport", function() {
    Ka(t);
  }), J("attachDfoCertBalance", function() {
    rn(t);
  }), J("rebuildSetupTab", function() {
    t.rebuildSetupTab = function() {
      Mt(t), Ft(t), t.renderShiftsTable && t.renderShiftsTable(), t.renderExtraPositions && t.renderExtraPositions();
    };
  }), J("snapshotFte", function() {
    t.snapshotFte = function() {
      return xt(t);
    };
  }), J("applyFte", function() {
    t.applyFte = function(r) {
      Lt(t, r);
    };
  }), J("collectSetupInputs", function() {
    t.collectSetupInputs = function() {
      return Ge(t);
    };
  }), J("exportStaffingConfig", function() {
    t.exportStaffingConfig = function() {
      return Cr(t);
    };
  }), J("exportJson", function() {
    if (typeof t.exportJson == "function" && !t.exportJson._setupCollectWrapped) {
      var r = t.exportJson;
      t.exportJson = function() {
        return Ge(t), r.apply(t, arguments);
      }, t.exportJson._setupCollectWrapped = !0;
    }
  }), (typeof t._setupGenerate != "function" || typeof t.generate != "function") && (console.error("setup-panel bridge: generate not attached", {
    _setupGenerate: typeof t._setupGenerate,
    generate: typeof t.generate
  }), t.updateStatus && t.updateStatus("Setup generate failed to attach — check console.")));
}
function me(t) {
  if (Mt(t), Ft(t), t.renderCrewGroupsUI && t.renderCrewGroupsUI(), t.renderShiftsTable && t.renderShiftsTable(), t.renderExtraPositions && t.renderExtraPositions(), t.renderRdoMatrixModal && t.renderRdoMatrixModal(), t && t.state) {
    var r = t.selectPtTsoLines ? t.selectPtTsoLines(t.state.lines) : [], a = t.getEligiblePtShifts ? t.getEligiblePtShifts(t.state.shifts) : [], n = "";
    r.length === 0 ? n = "need at least 1 PT TSO line generated." : a.length < 2 && (n = "need at least 2 non-long shifts (paid < 10h).");
    var o = n ? "Rebalance PT TSO shifts: " + n : "Rebalance PT TSO shifts across non-long shifts.";
    ["btn-rebalance-pt", "btn-rebalance-pt-modal"].forEach(function(s) {
      var d = document.getElementById(s);
      d && (d.title = o, d.disabled = !1);
    });
  }
}
function Zt(t) {
  if (typeof t.addFcShiftRequirement == "function") {
    t.addFcShiftRequirement();
    return;
  }
  if (typeof t.addFcBand == "function" && t.addFcBand !== Zt) {
    t.addFcBand();
    return;
  }
  typeof t.readFunctionBandsFromDom == "function" && t.readFunctionBandsFromDom(), typeof t.ensureFunctionCoverage == "function" && t.ensureFunctionCoverage(), t.renderFunctionShiftsTable ? t.renderFunctionShiftsTable() : t.renderFunctionBandsTable && t.renderFunctionBandsTable(), t.updateFunctionCoveragePreview && t.updateFunctionCoveragePreview();
}
function nn(t) {
  if (!(!t || t._fcImportPatch || typeof t.applyPayload != "function")) {
    t._fcImportPatch = !0;
    var r = t.applyPayload;
    t.applyPayload = function(a) {
      r.call(t, a);
      var n = a && (a.config || a.legacy || a), o = n && n.functionCoverage;
      o && typeof o == "object" && t.state && (o._bandMigrationAttempted = !1, t.state.functionCoverage = Object.assign(t.state.functionCoverage || {}, o), t.ensureFunctionCoverage && t.ensureFunctionCoverage(), t.fillFunctionCoverageForm && t.fillFunctionCoverageForm()), a && a.fte && t.applyFte && t.applyFte(a.fte);
      var s = a && a.certPool || n && n.certPool || null;
      s && t.state && (t.state.certPool = t.normalizeCertPoolConfig ? t.normalizeCertPoolConfig(s) : s, t.fillCertPoolForm && t.fillCertPoolForm()), t.renderExtraPositions && t.renderExtraPositions();
    };
  }
}
function on(t) {
  if (!t) return;
  t.addFcBand = t.addFcShiftRequirement || t.addFcBand || function() {
    Zt(t);
  }, nn(t), t._rebalanceDeltas = {}, t._rebalanceCurrentClass = "TSO_FT", t._rebalanceProposal = null, t.openFtRebalanceModal = function() {
    var i = typeof document < "u" ? document.getElementById("ft-rebalance-modal") : null;
    i && (i.style.display = "flex", i.setAttribute("aria-hidden", "false")), t._rebalanceDeltas = {}, t._rebalanceProposal = null, t.renderFtRebalanceClassSelect(), t.renderFtRebalanceModal();
  }, t.closeFtRebalanceModal = function() {
    var i = typeof document < "u" ? document.getElementById("ft-rebalance-modal") : null;
    i && (i.style.display = "none", i.setAttribute("aria-hidden", "true")), t._rebalanceDeltas = {}, t._rebalanceProposal = null;
  }, t.renderFtRebalanceClassSelect = function() {
    var i = typeof document < "u" ? document.getElementById("rebalance-class-select") : null;
    if (i) {
      var u = t.getAvailableClasses ? t.getAvailableClasses() : [];
      t._rebalanceCurrentClass || (t._rebalanceCurrentClass = "TSO_FT"), i.innerHTML = u.map(function(l) {
        var f = l.key === t._rebalanceCurrentClass ? " selected" : "";
        return '<option value="' + l.key + '"' + f + ">" + l.label + "</option>";
      }).join("");
    }
  }, t.renderFtRebalanceModal = function() {
    var i = typeof document < "u" ? document.getElementById("rebalance-bands-tbody") : null;
    if (i) {
      var u = t._rebalanceCurrentClass || "TSO_FT", l = t.state && t.state.lines || [], f = t.getLinesForClass ? t.getLinesForClass(l, u) : [], v = t.state && t.state.shifts || [], h = {}, c = {};
      v.forEach(function(p) {
        h[p.id] = 0, c[p.id] = 0;
      }), f.forEach(function(p) {
        p.sex === "F" ? c[p.shiftId] = (c[p.shiftId] || 0) + 1 : h[p.shiftId] = (h[p.shiftId] || 0) + 1;
      });
      var y = t._rebalanceDeltas || {}, g = 0;
      i.innerHTML = v.map(function(p) {
        var b = h[p.id] || 0, M = c[p.id] || 0, T = b + M, L = T > 0 ? Math.round(M / T * 100) + "%" : "—", E = t.getClassBandMin ? t.getClassBandMin(p, u) : "—", A = y[p.id] || 0;
        g += A;
        var C = (p.start || "") + (p.end ? "–" + p.end : ""), I = "<strong>" + (p.name || p.id) + "</strong>" + (C ? ' <span class="muted">(' + C + ")</span>" : "");
        return '<tr data-shift-id="' + p.id + '"><td>' + I + '</td><td style="text-align:center">' + E + '</td><td style="text-align:center">' + b + '</td><td style="text-align:center">' + M + '</td><td style="text-align:center"><strong>' + T + '</strong></td><td style="text-align:center">' + L + '</td><td style="text-align:center;white-space:nowrap"><button type="button" class="btn btn-sm btn-delta-down" data-shift-id="' + p.id + '" style="padding:0.1rem 0.4rem;margin-right:0.25rem">▼</button><span class="delta-val" style="display:inline-block;width:2rem;font-weight:bold">' + (A > 0 ? "+" + A : A) + '</span><button type="button" class="btn btn-sm btn-delta-up" data-shift-id="' + p.id + '" style="padding:0.1rem 0.4rem;margin-left:0.25rem">▲</button></td></tr>';
      }).join("");
      var m = document.getElementById("rebalance-delta-net");
      m && (m.textContent = "Net delta: " + (g > 0 ? "+" + g : g), m.style.color = g === 0 ? "var(--green, #28a745)" : "var(--red, #dc3545)"), i.querySelectorAll(".btn-delta-up").forEach(function(p) {
        p.addEventListener("click", function() {
          var b = p.getAttribute("data-shift-id");
          t._rebalanceDeltas[b] = (t._rebalanceDeltas[b] || 0) + 1, t._rebalanceProposal = null, t.renderFtRebalanceModal();
        });
      }), i.querySelectorAll(".btn-delta-down").forEach(function(p) {
        p.addEventListener("click", function() {
          var b = p.getAttribute("data-shift-id");
          t._rebalanceDeltas[b] = (t._rebalanceDeltas[b] || 0) - 1, t._rebalanceProposal = null, t.renderFtRebalanceModal();
        });
      }), t.renderFtProposalTable();
    }
  }, t.renderFtProposalTable = function() {
    var i = typeof document < "u" ? document.getElementById("rebalance-proposal-wrap") : null, u = typeof document < "u" ? document.getElementById("rebalance-proposal-tbody") : null;
    if (!(!i || !u)) {
      var l = t._rebalanceProposal;
      if (!l || !l.proposals || !l.proposals.length) {
        i.style.display = "none", u.innerHTML = "";
        return;
      }
      i.style.display = "block", u.innerHTML = l.proposals.map(function(f, v) {
        var h = f.line, c = f.fromShift ? f.fromShift.name || f.fromShift.id : "", y = f.toShift ? f.toShift.name || f.toShift.id : "", g = t.formatRdos ? t.formatRdos(f.rdoBefore) : (f.rdoBefore || []).join("-"), m = t.formatRdos ? t.formatRdos(f.rdoAfter) : (f.rdoAfter || []).join("-"), p = JSON.stringify(f.rdoAfter);
        return '<tr data-proposal-idx="' + v + '" data-line-id="' + h.id + '" data-to-shift-id="' + f.toShift.id + `" data-rdo-after='` + p + `'><td style="text-align:center"><input type="checkbox" class="proposal-move-cb" checked /></td><td><strong>` + (h.lineCode || h.id) + '</strong></td><td><span class="badge" style="background:' + (h.sex === "M" ? "#007bff" : "#e83e8c") + ';color:#fff;padding:0.15rem 0.4rem;border-radius:3px">' + (h.sex || "—") + "</span></td><td>" + c + "</td><td><strong>" + y + "</strong></td><td>" + g + '</td><td><strong style="color:var(--amber, #d97706)">' + m + '</strong></td><td><span class="muted">' + (f.note || "") + "</span></td></tr>";
      }).join("");
    }
  }, t._swapSexCurrentClass = "TSO_ALL", t._swapSexSelectedShifts = {}, t._swapSexProposal = null, t.openSwapSexModal = function() {
    var i = typeof document < "u" ? document.getElementById("swap-sex-modal") : null;
    i && (i.style.display = "flex", i.setAttribute("aria-hidden", "false")), t._swapSexProposal = null, t.renderSwapSexClassSelect(), t.renderSwapSexShiftsList(), t.renderSwapSexProposalTable();
  }, t.closeSwapSexModal = function() {
    var i = typeof document < "u" ? document.getElementById("swap-sex-modal") : null;
    i && (i.style.display = "none", i.setAttribute("aria-hidden", "true")), t._swapSexProposal = null;
  }, t.renderSwapSexClassSelect = function() {
    var i = typeof document < "u" ? document.getElementById("swap-sex-class-select") : null;
    if (i) {
      var u = t.getSwapAvailableClasses ? t.getSwapAvailableClasses() : [];
      t._swapSexCurrentClass || (t._swapSexCurrentClass = "TSO_ALL"), i.innerHTML = u.map(function(l) {
        var f = l.key === t._swapSexCurrentClass ? " selected" : "";
        return '<option value="' + l.key + '"' + f + ">" + l.label + "</option>";
      }).join("");
    }
  }, t.renderSwapSexShiftsList = function() {
    var i = typeof document < "u" ? document.getElementById("swap-sex-shifts-list") : null;
    if (i) {
      var u = t._swapSexCurrentClass || "TSO_ALL";
      t.state && t.state.lines;
      var l = t.getLinesForSwapClass ? t.getLinesForSwapClass(u) : [], f = t.state && t.state.shifts || [], v = {}, h = {};
      f.forEach(function(c) {
        v[c.id] = 0, h[c.id] = 0;
      }), l.forEach(function(c) {
        c.sex === "F" ? h[c.shiftId] = (h[c.shiftId] || 0) + 1 : v[c.shiftId] = (v[c.shiftId] || 0) + 1;
      }), i.innerHTML = f.map(function(c) {
        var y = v[c.id] || 0, g = h[c.id] || 0, m = y + g, p = t._swapSexSelectedShifts[c.id] !== !1;
        return t._swapSexSelectedShifts[c.id] = p, '<label style="display:inline-flex;align-items:center;gap:0.35rem;white-space:nowrap;font-size:0.9rem"><input type="checkbox" class="swap-sex-shift-cb" data-shift-id="' + c.id + '"' + (p ? " checked" : "") + " /> <strong>" + (c.name || c.id) + "</strong> (" + y + "M / " + g + "F = " + m + ")</label>";
      }).join(""), i.querySelectorAll(".swap-sex-shift-cb").forEach(function(c) {
        c.addEventListener("change", function() {
          var y = c.getAttribute("data-shift-id");
          t._swapSexSelectedShifts[y] = c.checked, t._swapSexProposal = null, t.renderSwapSexProposalTable();
        });
      });
    }
  }, t.renderSwapSexProposalTable = function() {
    var i = typeof document < "u" ? document.getElementById("swap-sex-proposal-wrap") : null, u = typeof document < "u" ? document.getElementById("swap-sex-proposal-tbody") : null;
    if (!(!i || !u)) {
      var l = t._swapSexProposal;
      if (!l || !l.proposals || !l.proposals.length) {
        i.style.display = "none", u.innerHTML = "";
        return;
      }
      i.style.display = "block", u.innerHTML = l.proposals.map(function(f, v) {
        var h = f.lineM, c = f.lineF, y = f.shiftA ? f.shiftA.name || f.shiftA.id : "", g = f.shiftB ? f.shiftB.name || f.shiftB.id : "", m = JSON.stringify(f.rdoMAfter), p = JSON.stringify(f.rdoFAfter);
        return '<tr data-proposal-idx="' + v + '" data-line-m-id="' + h.id + '" data-line-f-id="' + c.id + '" data-shift-a-id="' + f.shiftA.id + '" data-shift-b-id="' + f.shiftB.id + `" data-rdo-m-after='` + m + "' data-rdo-f-after='" + p + `'><td style="text-align:center"><input type="checkbox" class="swap-sex-proposal-cb" checked /></td><td><span class="badge" style="background:#007bff;color:#fff;padding:0.15rem 0.4rem;border-radius:3px">M</span> <strong>` + (h.lineCode || h.id) + "</strong> (" + y + " → " + g + ')</td><td><span class="badge" style="background:#e83e8c;color:#fff;padding:0.15rem 0.4rem;border-radius:3px">F</span> <strong>' + (c.lineCode || c.id) + "</strong> (" + g + " → " + y + ')</td><td><span class="muted">' + (f.notes || "") + "</span></td></tr>";
      }).join("");
    }
  }, t._dfoRebalanceDeltas = {}, t._dfoRebalanceCurrentClass = "TSO_ALL", t._dfoRebalanceProposal = null, t.openDfoRebalanceModal = function() {
    var i = typeof document < "u" ? document.getElementById("dfo-rebalance-modal") : null;
    i && (i.style.display = "flex", i.setAttribute("aria-hidden", "false")), t._dfoRebalanceDeltas = {}, t._dfoRebalanceProposal = null, t.renderDfoRebalanceClassSelect(), t.renderDfoRebalanceModal();
  }, t.closeDfoRebalanceModal = function() {
    var i = typeof document < "u" ? document.getElementById("dfo-rebalance-modal") : null;
    i && (i.style.display = "none", i.setAttribute("aria-hidden", "true")), t._dfoRebalanceDeltas = {}, t._dfoRebalanceProposal = null;
  }, t.renderDfoRebalanceClassSelect = function() {
    var i = typeof document < "u" ? document.getElementById("dfo-rebalance-class-select") : null;
    if (i) {
      var u = t.getDfoAvailableClasses ? t.getDfoAvailableClasses() : [];
      t._dfoRebalanceCurrentClass || (t._dfoRebalanceCurrentClass = "TSO_ALL"), i.innerHTML = u.map(function(l) {
        var f = l.key === t._dfoRebalanceCurrentClass ? " selected" : "";
        return '<option value="' + l.key + '"' + f + ">" + l.label + "</option>";
      }).join("");
    }
  }, t.renderDfoRebalanceModal = function() {
    var i = typeof document < "u" ? document.getElementById("dfo-rebalance-bands-tbody") : null;
    if (i) {
      var u = t._dfoRebalanceCurrentClass || "TSO_ALL";
      t.state && t.state.lines;
      var l = t.getDfoLinesForClass ? t.getDfoLinesForClass(u) : [], f = t.state && t.state.shifts || [], v = {}, h = {};
      f.forEach(function(m) {
        v[m.id] = 0, h[m.id] = 0;
      }), l.forEach(function(m) {
        m.sex === "F" ? h[m.shiftId] = (h[m.shiftId] || 0) + 1 : v[m.shiftId] = (v[m.shiftId] || 0) + 1;
      });
      var c = t._dfoRebalanceDeltas || {}, y = 0;
      i.innerHTML = f.map(function(m) {
        var p = v[m.id] || 0, b = h[m.id] || 0, M = p + b, T = M > 0 ? Math.round(b / M * 100) + "%" : "—", L = t.getDfoBandMin ? t.getDfoBandMin(m, u) : "—", E = c[m.id] || 0;
        y += E;
        var A = (m.start || "") + (m.end ? "–" + m.end : ""), C = "<strong>" + (m.name || m.id) + "</strong>" + (A ? ' <span class="muted">(' + A + ")</span>" : "");
        return '<tr data-shift-id="' + m.id + '"><td>' + C + '</td><td style="text-align:center">' + L + '</td><td style="text-align:center">' + p + '</td><td style="text-align:center">' + b + '</td><td style="text-align:center"><strong>' + M + '</strong></td><td style="text-align:center">' + T + '</td><td style="text-align:center;white-space:nowrap"><button type="button" class="btn btn-sm btn-dfo-delta-down" data-shift-id="' + m.id + '" style="padding:0.1rem 0.4rem;margin-right:0.25rem">▼</button><span class="delta-val" style="display:inline-block;width:2rem;font-weight:bold">' + (E > 0 ? "+" + E : E) + '</span><button type="button" class="btn btn-sm btn-dfo-delta-up" data-shift-id="' + m.id + '" style="padding:0.1rem 0.4rem;margin-left:0.25rem">▲</button></td></tr>';
      }).join("");
      var g = document.getElementById("dfo-rebalance-delta-net");
      g && (g.textContent = "Net delta: " + (y > 0 ? "+" + y : y), g.style.color = y === 0 ? "var(--green, #28a745)" : "var(--red, #dc3545)"), i.querySelectorAll(".btn-dfo-delta-up").forEach(function(m) {
        m.addEventListener("click", function() {
          var p = m.getAttribute("data-shift-id");
          t._dfoRebalanceDeltas[p] = (t._dfoRebalanceDeltas[p] || 0) + 1, t._dfoRebalanceProposal = null, t.renderDfoRebalanceModal();
        });
      }), i.querySelectorAll(".btn-dfo-delta-down").forEach(function(m) {
        m.addEventListener("click", function() {
          var p = m.getAttribute("data-shift-id");
          t._dfoRebalanceDeltas[p] = (t._dfoRebalanceDeltas[p] || 0) - 1, t._dfoRebalanceProposal = null, t.renderDfoRebalanceModal();
        });
      }), t.renderDfoProposalTable();
    }
  }, t.renderDfoProposalTable = function() {
    var i = typeof document < "u" ? document.getElementById("dfo-rebalance-proposal-wrap") : null, u = typeof document < "u" ? document.getElementById("dfo-rebalance-proposal-tbody") : null;
    if (!(!i || !u)) {
      var l = t._dfoRebalanceProposal;
      if (!l || !l.proposals || !l.proposals.length) {
        i.style.display = "none", u.innerHTML = "";
        return;
      }
      i.style.display = "block", u.innerHTML = l.proposals.map(function(f, v) {
        var h = f.line, c = f.fromShift ? f.fromShift.name || f.fromShift.id : "", y = f.toShift ? f.toShift.name || f.toShift.id : "", g = t.formatRdos ? t.formatRdos(f.rdoBefore) : (f.rdoBefore || []).join("-"), m = t.formatRdos ? t.formatRdos(f.rdoAfter) : (f.rdoAfter || []).join("-"), p = JSON.stringify(f.rdoAfter);
        return '<tr data-proposal-idx="' + v + '" data-line-id="' + h.id + '" data-to-shift-id="' + f.toShift.id + `" data-rdo-after='` + p + `'><td style="text-align:center"><input type="checkbox" class="dfo-proposal-move-cb" checked /></td><td><strong>` + (h.lineCode || h.id) + '</strong></td><td><span class="badge" style="background:' + (h.sex === "M" ? "#007bff" : "#e83e8c") + ';color:#fff;padding:0.15rem 0.4rem;border-radius:3px">' + (h.sex || "—") + "</span></td><td>" + c + "</td><td><strong>" + y + "</strong></td><td>" + g + '</td><td><strong style="color:var(--amber, #d97706)">' + m + '</strong></td><td><span class="muted">' + (f.note || "") + "</span></td></tr>";
      }).join("");
    }
  };
  function r(i, u, l) {
    !i || i._spBound || (i._spBound = !0, i.addEventListener(u, l));
  }
  var a = document.getElementById("fc-add-band");
  a && !a._fcBound && r(a, "click", function(i) {
    i.preventDefault(), t.addFcShiftRequirement ? t.addFcShiftRequirement() : t.addFcBand && t.addFcBand();
  }), r(document.getElementById("btn-add-position"), "click", function(i) {
    i.preventDefault(), t.addExtraPosition && t.addExtraPosition("MSTI");
  }), r(document.getElementById("btn-add-shift"), "click", function(i) {
    i.preventDefault(), t.addShift && t.addShift();
  }), r(document.getElementById("btn-add-crew-group"), "click", function(i) {
    i.preventDefault();
    var u = document.getElementById("cg-name-input"), l = u ? u.value.trim() : "";
    l || (l = "Group " + ((t.state.shiftCrewGroups || []).length + 1));
    var f = "cg_" + Date.now();
    t.state.shiftCrewGroups = t.state.shiftCrewGroups || [], t.state.shiftCrewGroups.push({ id: f, name: l, shiftIds: [] }), u && (u.value = ""), t.renderCrewGroupsUI && t.renderCrewGroupsUI(), t.renderShiftsTable && t.renderShiftsTable();
  }), r(document.getElementById("btn-rdo-matrix"), "click", function(i) {
    i.preventDefault(), t.openRdoMatrixModal && t.openRdoMatrixModal();
  }), r(document.getElementById("rdo-matrix-close"), "click", function(i) {
    i.preventDefault(), t.closeRdoMatrixModal && t.closeRdoMatrixModal();
  }), r(document.getElementById("rdo-matrix-pos-select"), "change", function() {
    t.renderRdoMatrixModal && t.renderRdoMatrixModal();
  }), r(document.getElementById("btn-rdo-export-all"), "click", function(i) {
    i.preventDefault(), t.exportAllRdoMatrixCsv && t.exportAllRdoMatrixCsv();
  });
  function n(i) {
    if (i && i.preventDefault(), typeof t.rebalancePtTsoShifts != "function") {
      var u = "Setup rebalance PT failed to attach — check console.";
      t.updateStatus && t.updateStatus(u), typeof window < "u" && window.alert && window.alert(u);
      return;
    }
    var l = t.selectPtTsoLines ? t.selectPtTsoLines(t.state ? t.state.lines : []) : [], f = t.getEligiblePtShifts ? t.getEligiblePtShifts(t.state ? t.state.shifts : []) : [];
    if (l.length === 0) {
      var v = "Rebalance PT TSO shifts: Need at least 1 PT TSO line generated.";
      t.updateStatus && t.updateStatus(v), typeof window < "u" && window.alert && window.alert(v);
      return;
    }
    if (f.length < 2) {
      var h = "Rebalance PT TSO shifts: Need at least 2 non-long shifts (paid < 10h).";
      t.updateStatus && t.updateStatus(h), typeof window < "u" && window.alert && window.alert(h);
      return;
    }
    t.rebalancePtTsoShifts();
  }
  r(document.getElementById("btn-rebalance-pt"), "click", n), r(document.getElementById("btn-rebalance-pt-modal"), "click", n);
  function o(i) {
    if (i && i.preventDefault(), typeof t.openFtRebalanceModal != "function") {
      var u = "Setup rebalance shifts failed to attach — check console.";
      t.updateStatus && t.updateStatus(u), typeof window < "u" && window.alert && window.alert(u);
      return;
    }
    t.openFtRebalanceModal();
  }
  r(document.getElementById("btn-rebalance-ft"), "click", o), r(document.getElementById("btn-rebalance-ft-modal"), "click", o), r(document.getElementById("ft-rebalance-close"), "click", function(i) {
    i.preventDefault(), t.closeFtRebalanceModal && t.closeFtRebalanceModal();
  }), r(document.getElementById("btn-ft-cancel"), "click", function(i) {
    i.preventDefault(), t.closeFtRebalanceModal && t.closeFtRebalanceModal();
  }), r(document.getElementById("rebalance-class-select"), "change", function(i) {
    t._rebalanceCurrentClass = i.target.value, t._rebalanceDeltas = {}, t._rebalanceProposal = null, t.renderFtRebalanceModal();
  }), r(document.getElementById("btn-rebalance-propose"), "click", function(i) {
    i.preventDefault();
    var u = t._rebalanceCurrentClass || "TSO_FT", l = t._rebalanceDeltas || {};
    if (t.proposeClassMoves) {
      var f = t.proposeClassMoves(u, l);
      if (f.error) {
        t.updateStatus && t.updateStatus(f.error), typeof window < "u" && window.alert && window.alert(f.error);
        return;
      }
      t._rebalanceProposal = f, t.renderFtProposalTable();
    }
  }), r(document.getElementById("btn-ft-select-all"), "click", function(i) {
    i.preventDefault(), document.querySelectorAll(".proposal-move-cb").forEach(function(u) {
      u.checked = !0;
    });
  }), r(document.getElementById("btn-ft-clear-all"), "click", function(i) {
    i.preventDefault(), document.querySelectorAll(".proposal-move-cb").forEach(function(u) {
      u.checked = !1;
    });
  }), r(document.getElementById("btn-do-ft-rebalance"), "click", function(i) {
    i.preventDefault();
    var u = [];
    if (document.querySelectorAll("#rebalance-proposal-tbody tr[data-line-id]").forEach(function(f) {
      var v = f.querySelector(".proposal-move-cb");
      if (v && v.checked) {
        var h = f.getAttribute("data-rdo-after"), c = [];
        try {
          c = JSON.parse(h);
        } catch {
        }
        u.push({
          lineId: f.getAttribute("data-line-id"),
          targetShiftId: f.getAttribute("data-to-shift-id"),
          rdoAfter: c
        });
      }
    }), !u.length) {
      t.updateStatus && t.updateStatus("No moves checked to approve.");
      return;
    }
    if (t.approveClassRebalance) {
      var l = t.approveClassRebalance(u);
      l && (t._rebalanceDeltas = {}, t._rebalanceProposal = null, t.renderFtRebalanceModal());
    }
  });
  function s(i) {
    if (i && i.preventDefault(), typeof t.openDfoRebalanceModal != "function") {
      var u = "Setup rebalance DFO failed to attach — check console.";
      t.updateStatus && t.updateStatus(u), typeof window < "u" && window.alert && window.alert(u);
      return;
    }
    t.openDfoRebalanceModal();
  }
  r(document.getElementById("btn-resolve-bag"), "click", function(i) {
    i.preventDefault(), t.readFunctionCoverageFromDom && t.readFunctionCoverageFromDom();
    var u = t.ensureFunctionCoverage ? t.ensureFunctionCoverage() : t.state && t.state.functionCoverage, l = t.state && t.state.weekCount ? t.state.weekCount * 7 : 7;
    if (!t.state || !t.state.lines || !t.state.lines.length) {
      var f = "Generate lines first.";
      t.updateStatus && t.updateStatus(f), typeof window < "u" && window.alert && window.alert(f);
      return;
    }
    t.resolveBagDuties && t.resolveBagDuties(u, l);
  }), r(document.getElementById("btn-rebalance-dfo"), "click", s), r(document.getElementById("btn-rebalance-dfo-modal"), "click", s), r(document.getElementById("dfo-rebalance-close"), "click", function(i) {
    i.preventDefault(), t.closeDfoRebalanceModal && t.closeDfoRebalanceModal();
  }), r(document.getElementById("btn-dfo-cancel"), "click", function(i) {
    i.preventDefault(), t.closeDfoRebalanceModal && t.closeDfoRebalanceModal();
  }), r(document.getElementById("dfo-rebalance-class-select"), "change", function(i) {
    t._dfoRebalanceCurrentClass = i.target.value, t._dfoRebalanceDeltas = {}, t._dfoRebalanceProposal = null, t.renderDfoRebalanceModal();
  }), r(document.getElementById("btn-dfo-rebalance-propose"), "click", function(i) {
    i.preventDefault();
    var u = t._dfoRebalanceCurrentClass || "TSO_ALL", l = t._dfoRebalanceDeltas || {};
    if (t.proposeDfoMoves) {
      var f = t.proposeDfoMoves(u, l);
      if (f.error) {
        t.updateStatus && t.updateStatus(f.error), typeof window < "u" && window.alert && window.alert(f.error);
        return;
      }
      t._dfoRebalanceProposal = f, t.renderDfoProposalTable();
    }
  }), r(document.getElementById("btn-dfo-select-all"), "click", function(i) {
    i.preventDefault(), document.querySelectorAll(".dfo-proposal-move-cb").forEach(function(u) {
      u.checked = !0;
    });
  }), r(document.getElementById("btn-dfo-clear-all"), "click", function(i) {
    i.preventDefault(), document.querySelectorAll(".dfo-proposal-move-cb").forEach(function(u) {
      u.checked = !1;
    });
  });
  function d(i) {
    if (i && i.preventDefault(), typeof t.openSwapSexModal != "function") {
      var u = "Setup swap M/F failed to attach — check console.";
      t.updateStatus && t.updateStatus(u), typeof window < "u" && window.alert && window.alert(u);
      return;
    }
    t.openSwapSexModal();
  }
  r(document.getElementById("btn-swap-sex"), "click", d), r(document.getElementById("btn-swap-sex-modal"), "click", d), r(document.getElementById("swap-sex-close"), "click", function(i) {
    i.preventDefault(), t.closeSwapSexModal && t.closeSwapSexModal();
  }), r(document.getElementById("btn-swap-sex-cancel"), "click", function(i) {
    i.preventDefault(), t.closeSwapSexModal && t.closeSwapSexModal();
  }), r(document.getElementById("swap-sex-class-select"), "change", function(i) {
    t._swapSexCurrentClass = i.target.value, t._swapSexProposal = null, t.renderSwapSexShiftsList(), t.renderSwapSexProposalTable();
  }), r(document.getElementById("btn-swap-sex-select-all-shifts"), "click", function(i) {
    i.preventDefault(), (t.state ? t.state.shifts : []).forEach(function(u) {
      t._swapSexSelectedShifts[u.id] = !0;
    }), t._swapSexProposal = null, t.renderSwapSexShiftsList();
  }), r(document.getElementById("btn-swap-sex-clear-all-shifts"), "click", function(i) {
    i.preventDefault(), (t.state ? t.state.shifts : []).forEach(function(u) {
      t._swapSexSelectedShifts[u.id] = !1;
    }), t._swapSexProposal = null, t.renderSwapSexShiftsList();
  }), r(document.getElementById("btn-swap-sex-propose"), "click", function(i) {
    i.preventDefault();
    var u = t._swapSexCurrentClass || "TSO_ALL", l = [];
    if (Object.keys(t._swapSexSelectedShifts || {}).forEach(function(v) {
      t._swapSexSelectedShifts[v] && l.push(v);
    }), t.proposeSexSwaps) {
      var f = t.proposeSexSwaps(u, l);
      if (f.error) {
        t.updateStatus && t.updateStatus(f.error), typeof window < "u" && window.alert && window.alert(f.error);
        return;
      }
      t._swapSexProposal = f, t.renderSwapSexProposalTable();
    }
  }), r(document.getElementById("btn-swap-sex-select-all"), "click", function(i) {
    i.preventDefault(), document.querySelectorAll(".swap-sex-proposal-cb").forEach(function(u) {
      u.checked = !0;
    });
  }), r(document.getElementById("btn-swap-sex-clear-all"), "click", function(i) {
    i.preventDefault(), document.querySelectorAll(".swap-sex-proposal-cb").forEach(function(u) {
      u.checked = !1;
    });
  }), r(document.getElementById("btn-do-swap-sex"), "click", function(i) {
    i.preventDefault();
    var u = [];
    if (document.querySelectorAll("#swap-sex-proposal-tbody tr[data-line-m-id]").forEach(function(f) {
      var v = f.querySelector(".swap-sex-proposal-cb");
      if (v && v.checked) {
        var h = f.getAttribute("data-rdo-m-after"), c = f.getAttribute("data-rdo-f-after"), y = [], g = [];
        try {
          y = JSON.parse(h);
        } catch {
        }
        try {
          g = JSON.parse(c);
        } catch {
        }
        u.push({
          lineMId: f.getAttribute("data-line-m-id"),
          lineFId: f.getAttribute("data-line-f-id"),
          shiftAId: f.getAttribute("data-shift-a-id"),
          shiftBId: f.getAttribute("data-shift-b-id"),
          rdoMAfter: y,
          rdoFAfter: g
        });
      }
    }), !u.length) {
      t.updateStatus && t.updateStatus("No swap pairs checked to approve.");
      return;
    }
    if (t.approveSexSwaps) {
      var l = t.approveSexSwaps(u);
      l && (t._swapSexProposal = null, t.renderSwapSexShiftsList(), t.renderSwapSexProposalTable());
    }
  }), r(document.getElementById("btn-do-dfo-rebalance"), "click", function(i) {
    i.preventDefault();
    var u = [];
    if (document.querySelectorAll("#dfo-rebalance-proposal-tbody tr[data-line-id]").forEach(function(f) {
      var v = f.querySelector(".dfo-proposal-move-cb");
      if (v && v.checked) {
        var h = f.getAttribute("data-rdo-after"), c = [];
        try {
          c = JSON.parse(h);
        } catch {
        }
        u.push({
          lineId: f.getAttribute("data-line-id"),
          targetShiftId: f.getAttribute("data-to-shift-id"),
          rdoAfter: c
        });
      }
    }), !u.length) {
      t.updateStatus && t.updateStatus("No moves checked to approve.");
      return;
    }
    if (t.approveDfoRebalance) {
      var l = t.approveDfoRebalance(u);
      l && (t._dfoRebalanceDeltas = {}, t._dfoRebalanceProposal = null, t.renderDfoRebalanceModal());
    }
  }), r(document.getElementById("btn-rdo-respin-open"), "click", function(i) {
    i.preventDefault(), t.openRdoRespinModal && t.openRdoRespinModal();
  }), r(document.getElementById("rdo-respin-close"), "click", function(i) {
    i.preventDefault(), t.closeRdoRespinModal && t.closeRdoRespinModal();
  }), r(document.getElementById("btn-respin-cancel"), "click", function(i) {
    i.preventDefault(), t.closeRdoRespinModal && t.closeRdoRespinModal();
  }), r(document.getElementById("btn-respin-select-all"), "click", function(i) {
    i.preventDefault(), document.querySelectorAll(".respin-slice-cb").forEach(function(u) {
      u.checked = !0;
    });
  }), r(document.getElementById("btn-respin-clear-all"), "click", function(i) {
    i.preventDefault(), document.querySelectorAll(".respin-slice-cb").forEach(function(u) {
      u.checked = !1;
    });
  }), r(document.getElementById("btn-do-respin"), "click", function(i) {
    i.preventDefault();
    var u = [];
    if (document.querySelectorAll(".respin-slice-cb:checked").forEach(function(l) {
      var f = l.getAttribute("data-slice-key");
      f && u.push(f);
    }), !u.length) {
      t.updateStatus && t.updateStatus("No slices selected for respin.");
      return;
    }
    t.respinSelectedSlices && t.respinSelectedSlices(u), t.closeRdoRespinModal && t.closeRdoRespinModal();
  }), r(document.getElementById("btn-save-staffing"), "click", function() {
    t.exportStaffingConfig && t.exportStaffingConfig();
  }), r(document.getElementById("btn-generate"), "click", function(i) {
    i.preventDefault(), t.openGenerateModal ? t.openGenerateModal() : t.generate && t.generate();
  }), r(document.getElementById("btn-export"), "click", function(i) {
    i.preventDefault(), t.exportJson && t.exportJson();
  }), r(document.getElementById("btn-import"), "click", function(i) {
    i.preventDefault();
    var u = document.getElementById("file-import");
    u && (u.value = "", u.click());
  }), r(document.getElementById("btn-clear"), "click", function(i) {
    i.preventDefault(), t.clearAll && t.clearAll();
  }), r(document.getElementById("file-import"), "change", function(i) {
    var u = i.target.files && i.target.files[0];
    t.importJsonFile && t.importJsonFile(u);
  });
}
let Tt = !1;
function Et(t) {
  var r = document.getElementById("cfg-start");
  if (r && !r.value && t.parseStartDate && t.toDateInputValue) {
    var a = t.parseStartDate(null);
    r.value = t.toDateInputValue(a), t.state && (t.state.startDate = a);
  }
}
function sn(t) {
  const r = t || window.Scheduler;
  if (r.__USE_SVELTE_SETUP) {
    br(), typeof r.generate == "function" && window.addEventListener("setup:generate", function() {
      r.generate();
    }), typeof r.exportBoard == "function" && window.addEventListener("setup:export", function() {
      r.exportBoard();
    }), typeof r.clear == "function" && window.addEventListener("setup:clear", function() {
      r.clear();
    });
    const o = document.getElementById("tab-setup");
    o && o.classList.add("setup-svelte-active"), window.dispatchEvent(new CustomEvent("setup:mounted"));
    return;
  }
  try {
    an(r);
  } catch (o) {
    throw console.error("initSetupPanel", o), r && r.updateStatus && r.updateStatus("Setup generate failed to attach — check console."), o;
  }
  var a = r.renderAll;
  if (r.renderAll = function() {
    if (me(r), typeof a == "function" && a !== r.renderAll)
      try {
        a.apply(this, arguments);
      } catch {
      }
  }, Et(r), Tt || (Tt = !0, document.addEventListener("DOMContentLoaded", function() {
    Et(r), me(r), setTimeout(function() {
      me(r);
    }, 400);
  })), window.addEventListener("blade-intro-done", function() {
    me(r), setTimeout(function() {
      me(r);
    }, 200);
  }), on(r), typeof r.hookConsoleIo == "function" && r.hookConsoleIo(), window.dispatchEvent(new CustomEvent("setup:mounted")), r.initShiftDayTimes && r.initShiftDayTimes(), typeof r.initFunctionCoverage == "function") {
    var n = document.getElementById("fc-add-band");
    if (!r._funcCoverageBound || n && !n._fcBound)
      r._funcCoverageBound = !1, r.initFunctionCoverage(r);
    else if (r.fillFunctionCoverageForm)
      try {
        r.fillFunctionCoverageForm();
      } catch {
      }
  }
  It(r), kt(r), me(r);
}
export {
  sn as initSetupPanel
};
