let h = null;
function he(t) {
  h = t;
}
function lt(t) {
  return t ? t.isExtra || t.extraPositionId ? t.empClass || t.position || "EXTRA" : t.isStso || t.empClass === "STSO" ? "STSO" : t.isLtso || t.empClass === "LTSO" ? "LTSO" : "TSO" : "TSO";
}
function be(t) {
  var e = lt(t);
  return e === "STSO" || e === "LTSO" || e === "TSO";
}
function Te(t) {
  return !t || t.isExtra || t.extraPositionId ? !1 : t.function === "DFO" || !!(t.functionEligible && t.functionEligible.dfo);
}
function Jt(t, e) {
  var n = h.state.functionRotation || {}, r = n[String(t)] || n[t];
  if (r) {
    var o = r[e];
    return o == null || o === "" ? null : o;
  }
  var i = null;
  if (h.state && Array.isArray(h.state.lines)) {
    for (var s = 0; s < h.state.lines.length; s++)
      if (String(h.state.lines[s].id) === String(t)) {
        i = h.state.lines[s];
        break;
      }
  }
  return i && (i.function === "BAG" || i.function === "DFO" || i.function === "PAX") ? i.function : null;
}
function ft(t) {
  var e = h.getShift(t.shiftId);
  return e ? h.timeToMin(e.start) : 0;
}
function At(t, e, n) {
  return n = n ?? 15, e = e || Ct(), t <= e.am - n && t < 11 * 60 ? "Opening" : t >= e.pm + n && t >= 11 * 60 + 15 ? "Closing" : t < e.pm ? "AM" : "PM";
}
function Fe(t, e, n) {
  return At(t, e, n) === "Opening" || At(t, e, n) === "AM";
}
function Qt(t, e, n) {
  var r = h.state.schedule[t.id] || h.state.schedule[String(t.id)];
  if (!r || r[e] !== "WORK") return !1;
  var o = e % 7, i = h.state && h.state.startDate;
  if (i && (o = h.weekdaySun0 && h.addDays ? h.weekdaySun0(h.addDays(i, e)) : h.dj ? h.dj(i).add(e).day() : e % 7), h.shiftCoversSlot) return h.shiftCoversSlot(t.shiftId, n, o);
  var s = h.getEffectiveShiftSegments ? h.getEffectiveShiftSegments(t.shiftId, o) : null;
  if (!s) {
    var u = h.getEffectiveShiftTimes ? h.getEffectiveShiftTimes(t.shiftId, o) : null;
    if (u)
      s = [{ start: u.start, end: u.end }];
    else {
      var a = h.getShift(t.shiftId);
      if (!a) return !1;
      s = a.segments && a.segments.length === 2 ? a.segments : [{ start: a.start, end: a.end }];
    }
  }
  for (var f = 0; f < s.length; f++) {
    var l = h.timeToMin(s[f].start), d = h.timeToMin(s[f].end);
    if (d <= l) {
      if (n >= l || n < d) return !0;
    } else if (n >= l && n < d) return !0;
  }
  return !1;
}
function Me(t, e) {
  if (e = e || h.ensureFunctionCoverage && h.ensureFunctionCoverage().bands || [], !Array.isArray(e) || !e.length) return null;
  for (var n = 0; n < e.length; n++) {
    var r = e[n], o = h.timeToMin(r.start), i = h.timeToMin(r.end);
    i <= o && (i += 1440);
    var s = t;
    if (i > 1440 && s < o && (s += 1440), s >= o && s < i) return r;
  }
  return null;
}
function Ct() {
  var t = {};
  (h.state.lines || []).forEach(function(s) {
    var u = h.getShift(s.shiftId);
    if (u) {
      var a = h.timeToMin(u.start);
      t[a] = (t[a] || 0) + 1;
    }
  });
  var e = Object.keys(t).map(function(s) {
    return { min: +s, n: t[s] };
  }).sort(function(s, u) {
    return s.min - u.min;
  });
  if (!e.length) return { am: 8 * 60, pm: 14 * 60 };
  var n = e[0].min, r = 0;
  e.forEach(function(s) {
    s.min < 11 * 60 && s.n > r && (r = s.n, n = s.min);
  });
  var o = e[e.length - 1].min, i = 0;
  return e.forEach(function(s) {
    s.min >= 11 * 60 + 15 && s.n > i && (i = s.n, o = s.min);
  }), i === 0 && e.forEach(function(s) {
    s.min >= 12 * 60 && s.n > i && (i = s.n, o = s.min);
  }), { am: n, pm: o };
}
function xe() {
  (h.state.lines || []).forEach(function(t) {
    t.function = "", t.functionEligible = { dfo: !1, bag: !1, pax: !1 };
  }), h.state.functionRotation = {};
}
let y = null;
function Yt(t) {
  y = t;
}
function O(t) {
  return Math.max(0, Math.floor(+t || 0));
}
function dt() {
  return { STSO: {}, LTSO: {}, TSO: {} };
}
function te(t) {
  var e = dt();
  return !t || typeof t != "object" || ["STSO", "LTSO", "TSO"].forEach(function(n) {
    var r = t[n];
    !r || typeof r != "object" || Object.keys(r).forEach(function(o) {
      if (o) {
        var i = r[o] || {}, s = O(i.min), u = i.max == null ? s : O(i.max);
        u < s && (u = s), e[n][String(o)] = { min: s, max: u };
      }
    });
  }), e;
}
function at(t) {
  var e = [], n = {};
  t && Array.isArray(t.requirementShiftIds) && t.requirementShiftIds.forEach(function(o) {
    var i = String(o || "");
    !i || n[i] || (n[i] = !0, e.push(i));
  });
  var r = t && t.requirements || {};
  return ["STSO", "LTSO", "TSO"].forEach(function(o) {
    var i = r[o] || {};
    Object.keys(i).forEach(function(s) {
      var u = String(s || "");
      !u || n[u] || (n[u] = !0, e.push(u));
    });
  }), e;
}
function ee(t) {
  return t = t || y && y.state && y.state.functionCoverage || {}, !y || typeof y.getShift != "function" ? [] : at(t).map(function(e) {
    return y.getShift(e);
  }).filter(Boolean);
}
function K(t, e, n) {
  n = n || y && y.state && y.state.functionCoverage || {};
  var r = n.requirements && n.requirements[t] && n.requirements[t][e];
  if (!r) return { min: 0, max: 0 };
  var o = O(r.min), i = r.max == null ? o : O(r.max);
  return i < o && (i = o), { min: o, max: i };
}
function ne(t, e, n, r, o) {
  if (o = o || y && y.state && y.state.functionCoverage, !o) return null;
  o.requirements || (o.requirements = dt()), o.requirements[t] || (o.requirements[t] = {});
  var i = O(n), s = r == null ? i : O(r);
  return s < i && (s = i), o.requirements[t][String(e)] = { min: i, max: s }, o.requirements[t][String(e)];
}
function ut(t, e, n) {
  if (n = n || {}, !y || !y.state) return [];
  var r = y.state.lines || [];
  return r.filter(function(o) {
    return !(!o || o.isExtra || o.extraPositionId || !o.shiftId || String(o.shiftId) !== String(e) || typeof y.getShift == "function" && !y.getShift(o.shiftId) || lt(o) !== t || n.sex && o.sex !== n.sex);
  });
}
function Oe() {
  var t = y && y.state && y.state.shifts || [], e = null, n = null;
  return t.forEach(function(r) {
    if (!(!r || !r.id)) {
      var o = y.timeToMin ? y.timeToMin(r.start) : 0;
      (!e || o < y.timeToMin(e.start)) && (e = r), (!n || o > y.timeToMin(n.start)) && (n = r);
    }
  }), { open: e, close: n };
}
function De(t, e) {
  return !!(t && e && String(t.shiftId) === String(e.id));
}
function oe(t) {
  if (!t) return "";
  var e = (t.requiredMin != null ? t.requiredMin : 0) + "-" + (t.requiredMax != null ? t.requiredMax : 0);
  return t.role + " / Shift " + (t.shiftLabel || t.shiftId) + " Eligible: " + t.eligible + " Required: " + e + " Assigned: " + t.assigned + " Status: " + (t.status || "OK");
}
const He = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  bindShiftsApi: Yt,
  configuredShiftIdsFromRequirements: at,
  emptyRequirements: dt,
  formatRequirementDiagnostic: oe,
  getConfiguredFunctionShifts: ee,
  getEligibleLinesForShift: ut,
  getShiftRequirement: K,
  lineOnShift: De,
  normalizeRequirements: te,
  num0: O,
  openingAndClosingShifts: Oe,
  setShiftRequirement: ne
}, Symbol.toStringTag, { value: "Module" }));
function Ee(t, e) {
  var n = e.toLowerCase(), r = t[n + "Min"] != null ? O(t[n + "Min"]) : O(t[n]), o = t[n + "Max"] != null ? O(t[n + "Max"]) : r;
  return o < r && (o = r), { min: r, max: o };
}
function Bt(t, e, n) {
  n.push(e), t && Array.isArray(t) && t.indexOf(e) < 0 && t.push(e);
}
function Pt(t, e) {
  e = e || {};
  var n = Array.isArray(e.shifts) ? e.shifts : [], r = e.issues, o = {
    ok: !0,
    migrated: !1,
    mapped: 0,
    unmapped: [],
    ambiguous: [],
    warnings: []
  };
  if (!t || typeof t != "object") return o;
  (!t.requirements || typeof t.requirements != "object") && (t.requirements = dt()), ["STSO", "LTSO", "TSO"].forEach(function(a) {
    (!t.requirements[a] || typeof t.requirements[a] != "object") && (t.requirements[a] = {});
  });
  var i = Array.isArray(t.bands) ? t.bands : [];
  if (!i.length)
    return delete t.bands, o;
  var s = {}, u = [];
  return i.forEach(function(a) {
    if (!a || typeof a != "object" || !a.start || !a.end) {
      a && u.push(a), o.ok = !1;
      return;
    }
    var f = n.filter(function(d) {
      return d && d.start === a.start && d.end === a.end;
    });
    if (!f.length) {
      Bt(
        r,
        "Function coverage: legacy band " + a.start + "–" + a.end + " could not be mapped to a shift (no exact start/end match).",
        o.warnings
      ), o.unmapped.push({ start: a.start, end: a.end }), u.push(a), o.ok = !1;
      return;
    }
    if (f.length > 1) {
      Bt(
        r,
        "Function coverage: legacy band " + a.start + "–" + a.end + " matches multiple shifts (" + f.map(function(d) {
          return d.name || d.id;
        }).join(", ") + ") — not mapped.",
        o.warnings
      ), o.ambiguous.push({
        start: a.start,
        end: a.end,
        shiftIds: f.map(function(d) {
          return d.id;
        })
      }), u.push(a), o.ok = !1;
      return;
    }
    var l = f[0];
    if (s[l.id]) {
      Bt(
        r,
        "Function coverage: multiple legacy bands map to shift " + (l.name || l.id) + " — not mapped.",
        o.warnings
      ), o.ambiguous.push({ start: a.start, end: a.end, shiftId: l.id }), u.push(a), o.ok = !1;
      return;
    }
    s[l.id] = !0, ["STSO", "LTSO", "TSO"].forEach(function(d) {
      if (!t.requirements[d][l.id]) {
        var v = Ee(a, d);
        t.requirements[d][l.id] = { min: v.min, max: v.max };
      }
    }), Array.isArray(t.requirementShiftIds) || (t.requirementShiftIds = []), t.requirementShiftIds.indexOf(l.id) < 0 && t.requirementShiftIds.push(l.id), o.mapped++;
  }), u.length ? t.bands = u : delete t.bands, o.migrated = o.mapped > 0, o;
}
const Xe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  migrateFunctionCoverageConfig: Pt
}, Symbol.toStringTag, { value: "Module" }));
let F = null;
function ye(t) {
  F = t;
}
function Vt(t) {
  var e = F.getShift ? F.getShift(t) : null;
  return e && F.timeToMin && e.start != null ? F.timeToMin(e.start) : 1e9;
}
function Rt(t, e) {
  e && (F = e), t = t || (F && F.ensureFunctionCoverage ? F.ensureFunctionCoverage() : {});
  var n = F.state.lines || [];
  n.forEach(function(m) {
    m.isExtra || m.extraPositionId || (m.functionEligible = { dfo: !1, bag: !1, pax: !1 }, m.function = "");
  });
  var r = F.computeShiftAnchors(), o = t.phaseThresholdMin || 15;
  function i(m) {
    return (!m.functionEligible || typeof m.functionEligible != "object") && (m.functionEligible = { dfo: !1, bag: !1, pax: !1 }), m.functionEligible;
  }
  function s(m, x) {
    return n.filter(function(M) {
      if (M.isExtra || M.extraPositionId) return !1;
      var A = i(M);
      return F.lineRoleKey(M) === m && M.sex === x && !A.bag && !A.dfo;
    });
  }
  function u(m, x, M) {
    if (!M || M <= 0) return { total: 0 };
    var A = s(m, x).slice();
    A.sort(function(j, V) {
      return F.lineStartMin(j) - F.lineStartMin(V) || String(j.id).localeCompare(String(V.id));
    });
    for (var S = 0, E = 0; E < A.length && S < M; E++)
      i(A[E]).bag = !0, S++;
    return { total: S };
  }
  function a(m) {
    return m ? m.isPt === !0 ? !0 : String(m.empClass || "").trim().toUpperCase() === "PT" : !1;
  }
  function f(m) {
    return Math.max(0, Math.floor(+m || 0));
  }
  function l() {
    var m = f(t.poolTsoDfoPt), x = [];
    n.forEach(function(E) {
      if (!(!E || E.isExtra || E.extraPositionId) && F.lineRoleKey(E) === "TSO" && a(E)) {
        var j = i(E);
        j.bag || !j.dfo || x.push(E);
      }
    }), x.sort(function(E, j) {
      var V = F.lineStartMin(j) - F.lineStartMin(E);
      return V || String(j.id).localeCompare(String(E.id));
    });
    for (var M = 0; x.length > m; ) {
      var A = x.shift();
      i(A).dfo = !1, M++;
    }
    if (M && F.state) {
      F.state.issues || (F.state.issues = []);
      var S = "PT DFO capped to " + m;
      F.state.issues.indexOf(S) < 0 && F.state.issues.push(S);
    }
    return M;
  }
  function d(m) {
    var x = 0, M = 0;
    m.forEach(function(S) {
      x += S.am || 0, M += S.pm || 0;
    });
    var A = 0;
    return n.forEach(function(S) {
      if (!(!S || S.isExtra || S.extraPositionId) && F.lineRoleKey(S) === "TSO") {
        var E = S.functionEligible;
        E && E.dfo && !E.bag && A++;
      }
    }), { total: A, am: x, pm: M };
  }
  var v = f(t.poolTsoDfoPt);
  function p() {
    var m = 0;
    return n.forEach(function(x) {
      if (!(!x || x.isExtra || x.extraPositionId) && F.lineRoleKey(x) === "TSO" && a(x)) {
        var M = x.functionEligible;
        M && M.dfo && !M.bag && m++;
      }
    }), m;
  }
  function B(m) {
    var x = i(m);
    return x.bag || x.dfo ? !1 : a(m) ? v <= 0 ? !1 : (x.dfo = !0, v--, !0) : (x.dfo = !0, !0);
  }
  function q() {
    var m = f(t.poolTsoDfoPt);
    ["M", "F"].forEach(function(x) {
      for (; p() < m; ) {
        var M = s("TSO", x).filter(a), A = n.filter(function(S) {
          if (!S || S.isExtra || S.extraPositionId || F.lineRoleKey(S) !== "TSO" || S.sex !== x || a(S)) return !1;
          var E = i(S);
          return E.dfo && !E.bag;
        });
        if (!M.length || !A.length) break;
        M.sort(k), A.sort(function(S, E) {
          var j = F.lineStartMin(E) - F.lineStartMin(S);
          return j || String(E.id).localeCompare(String(S.id));
        }), i(A[0]).dfo = !1, i(M[0]).dfo = !0, v > 0 && v--;
      }
    });
  }
  function k(m, x) {
    var M = a(m) ? 1 : 0, A = a(x) ? 1 : 0;
    return M !== A ? M - A : F.lineStartMin(m) - F.lineStartMin(x) || String(m.id).localeCompare(String(x.id));
  }
  function $(m, x, M) {
    if (!M || M <= 0) return { am: 0, pm: 0, total: 0 };
    var A = s(m, x).slice(), S = [], E = {}, j = !1, V = t.requirements && t.requirements[m] || {};
    Object.keys(V).forEach(function(b) {
      var D = K(m, b, t);
      if (!(D.min <= 0 && D.max <= 0) && !(typeof F.getShift == "function" && !F.getShift(b))) {
        var C = String(b);
        E[C] || (E[C] = !0, S.push(C), j = !0);
      }
    }), S.length || A.forEach(function(b) {
      if (!(!b || b.shiftId == null || b.shiftId === "")) {
        var D = String(b.shiftId);
        E[D] || (E[D] = !0, S.push(D));
      }
    }), S.sort(function(b, D) {
      var C = Vt(b) - Vt(D);
      return C || String(b).localeCompare(String(D));
    });
    var Z = {};
    S.forEach(function(b) {
      Z[b] = [];
    }), A.forEach(function(b) {
      var D = b.shiftId != null ? String(b.shiftId) : "";
      Z[D] && Z[D].push(b);
    });
    function Ht(b) {
      b.sort(function(D, C) {
        return m === "TSO" ? k(D, C) : F.lineStartMin(D) - F.lineStartMin(C) || String(D.id).localeCompare(String(C.id));
      });
    }
    S.forEach(function(b) {
      Ht(Z[b]);
    });
    var Xt = Math.min(M, A.length), Kt = S.map(function(b) {
      return j ? Math.max(K(m, b, t).min, 1) : 1;
    }), ct = 0;
    Kt.forEach(function(b) {
      ct += b;
    }), ct || (ct = 1);
    var N = [], gt = [], Nt = 0;
    S.forEach(function(b, D) {
      var C = Xt * Kt[D] / ct, nt = Math.floor(C);
      N[D] = nt, Nt += nt, gt.push({ i: D, frac: C - nt });
    }), gt.sort(function(b, D) {
      return D.frac !== b.frac ? D.frac - b.frac : b.i - D.i;
    });
    for (var et = Xt - Nt, bt = 0; bt < gt.length && et > 0; bt++)
      N[gt[bt].i]++, et--;
    for (et = 0, S.forEach(function(b, D) {
      var C = Z[b].length;
      N[D] > C && (et += N[D] - C, N[D] = C);
    }); et > 0; ) {
      for (var Tt = -1, zt = -1, st = 0; st < S.length; st++) {
        var Ft = Z[S[st]].length - N[st];
        Ft <= 0 || Ft > zt && (zt = Ft, Tt = st);
      }
      if (Tt < 0) break;
      N[Tt]++, et--;
    }
    var J = [];
    if (S.forEach(function(b, D) {
      for (var C = Z[b], nt = N[D], Et = 0; Et < C.length && J.length < M && nt > 0; Et++) {
        var yt = C[Et], Lt = i(yt);
        if (!(Lt.bag || Lt.dfo)) {
          if (m === "TSO") {
            if (!B(yt)) continue;
          } else
            Lt.dfo = !0;
          J.push(yt), nt--;
        }
      }
    }), J.length < M) {
      var Mt = s(m, x).slice();
      Ht(Mt);
      for (var xt = 0; xt < Mt.length && J.length < M; xt++) {
        var Ot = Mt[xt], Dt = i(Ot);
        if (!(Dt.bag || Dt.dfo)) {
          if (m === "TSO") {
            if (!B(Ot)) continue;
          } else
            Dt.dfo = !0;
          J.push(Ot);
        }
      }
    }
    var Ut = 0, Wt = 0;
    return J.forEach(function(b) {
      F.isAmSide(F.lineStartMin(b), r, o) ? Ut++ : Wt++;
    }), { am: Ut, pm: Wt, total: J.length };
  }
  var P = {
    stso: { m: u("STSO", "M", t.poolStsoBagM).total, f: u("STSO", "F", t.poolStsoBagF).total },
    ltso: { m: u("LTSO", "M", t.poolLtsoBagM).total, f: u("LTSO", "F", t.poolLtsoBagF).total },
    tso: { m: u("TSO", "M", t.poolTsoBagM).total, f: u("TSO", "F", t.poolTsoBagF).total }
  };
  P.stso.total = P.stso.m + P.stso.f, P.ltso.total = P.ltso.m + P.ltso.f, P.tso.total = P.tso.m + P.tso.f;
  var L = {
    stso: $("STSO", "M", t.poolStsoDfoM),
    stsoF: $("STSO", "F", t.poolStsoDfoF),
    ltso: $("LTSO", "M", t.poolLtsoDfoM),
    ltsoF: $("LTSO", "F", t.poolLtsoDfoF),
    tso: $("TSO", "M", t.poolTsoDfoM),
    tsoF: $("TSO", "F", t.poolTsoDfoF)
  };
  q(), l();
  var W = d([L.tso, L.tsoF]);
  return {
    bag: P,
    stso: { total: L.stso.total + L.stsoF.total, am: L.stso.am + L.stsoF.am, pm: L.stso.pm + L.stsoF.pm },
    ltso: { total: L.ltso.total + L.ltsoF.total, am: L.ltso.am + L.ltsoF.am, pm: L.ltso.pm + L.ltsoF.pm },
    tso: W,
    anchors: r
  };
}
let G = null;
function re(t) {
  G = t, ye(t);
}
function T(t) {
  return Math.max(0, Math.floor(+t || 0));
}
function it(t) {
  return T(t.poolStsoBagM) + T(t.poolStsoBagF) + T(t.poolLtsoBagM) + T(t.poolLtsoBagF) + T(t.poolTsoBagM) + T(t.poolTsoBagF);
}
function kt(t) {
  return T(t.poolStsoDfoM) + T(t.poolStsoDfoF) + T(t.poolLtsoDfoM) + T(t.poolLtsoDfoF) + T(t.poolTsoDfoM) + T(t.poolTsoDfoF);
}
function R() {
  G.state.functionCoverage || (G.state.functionCoverage = {});
  var t = G.state.functionCoverage;
  return [
    "poolStsoDfoM",
    "poolStsoDfoF",
    "poolLtsoDfoM",
    "poolLtsoDfoF",
    "poolTsoDfoM",
    "poolTsoDfoF",
    "poolStsoBagM",
    "poolStsoBagF",
    "poolLtsoBagM",
    "poolLtsoBagF",
    "poolTsoBagM",
    "poolTsoBagF",
    "poolTsoDfoPt"
  ].forEach(function(e) {
    t[e] == null && (t[e] = 0);
  }), t.poolStsoDfo == null && (t.poolStsoDfo = T(t.poolStsoDfoM) + T(t.poolStsoDfoF)), t.poolLtsoDfo == null && (t.poolLtsoDfo = T(t.poolLtsoDfoM) + T(t.poolLtsoDfoF)), t.poolTsoDfo == null && (t.poolTsoDfo = T(t.poolTsoDfoM) + T(t.poolTsoDfoF)), t.poolBag == null && (t.poolBag = it(t)), !t.poolStsoDfoM && !t.poolStsoDfoF && t.poolStsoDfo && (t.poolStsoDfoM = t.poolStsoDfo), !t.poolLtsoDfoM && !t.poolLtsoDfoF && t.poolLtsoDfo && (t.poolLtsoDfoM = t.poolLtsoDfo), !t.poolTsoDfoM && !t.poolTsoDfoF && t.poolTsoDfo && (t.poolTsoDfoM = t.poolTsoDfo), !t.poolTsoBagM && !t.poolTsoBagF && t.poolBag && (t.poolTsoBagM = t.poolBag), t.amPmSplit == null && (t.amPmSplit = !0), t.phaseThresholdMin == null && (t.phaseThresholdMin = 15), t.bias == null && (t.bias = "none"), G.state.functionRotation || (G.state.functionRotation = {}), Array.isArray(t.bands) && t.bands.length && !t._bandMigrationAttempted && (t._bandMigrationAttempted = !0, Pt(t, {
    shifts: G.state && G.state.shifts || [],
    issues: G.state && G.state.issues
  })), t.requirements = te(t.requirements), Array.isArray(t.requirementShiftIds) || (t.requirementShiftIds = []), t.requirementShiftIds.length || ["STSO", "LTSO", "TSO"].forEach(function(e) {
    Object.keys(t.requirements[e] || {}).forEach(function(n) {
      t.requirementShiftIds.indexOf(n) < 0 && t.requirementShiftIds.push(n);
    });
  }), delete t.stsoIsDfo, delete t.poolDfo, delete t.poolPax, $t(t), t;
}
function ie() {
  return $t(R());
}
function It() {
  var t = G.state || {};
  return {
    STSO: { M: T(t.stsoM), F: T(t.stsoF) },
    LTSO: { M: T(t.ltsoM), F: T(t.ltsoF) },
    TSO: { M: T(t.ftM) + T(t.ptM), F: T(t.ftF) + T(t.ptF) }
  };
}
function _t(t, e) {
  t = t || R();
  var n = It();
  function r(o, i, s, u, a) {
    var f = n[o].M, l = n[o].F, d = T(t[i]), v = T(t[s]), p = T(t[u]), B = T(t[a]);
    d > f && (e && e.push("BAG " + o + " M pool " + d + " exceeds FTE " + f + " — capped."), d = f), v > l && (e && e.push("BAG " + o + " F pool " + v + " exceeds FTE " + l + " — capped."), v = l);
    var q = Math.max(0, f - d), k = Math.max(0, l - v);
    p > q && (e && e.push("DFO " + o + " M pool " + p + " exceeds remaining FTE " + q + " after BAG — capped."), p = q), B > k && (e && e.push("DFO " + o + " F pool " + B + " exceeds remaining FTE " + k + " after BAG — capped."), B = k), t[i] = d, t[s] = v, t[u] = p, t[a] = B;
  }
  return r("STSO", "poolStsoBagM", "poolStsoBagF", "poolStsoDfoM", "poolStsoDfoF"), r("LTSO", "poolLtsoBagM", "poolLtsoBagF", "poolLtsoDfoM", "poolLtsoDfoF"), r("TSO", "poolTsoBagM", "poolTsoBagF", "poolTsoDfoM", "poolTsoDfoF"), $t(t), t;
}
function $t(t) {
  var e = it(t) > 0, n = kt(t) > 0;
  return t.poolBag = it(t), t.poolStsoDfo = T(t.poolStsoDfoM) + T(t.poolStsoDfoF), t.poolLtsoDfo = T(t.poolLtsoDfoM) + T(t.poolLtsoDfoF), t.poolTsoDfo = T(t.poolTsoDfoM) + T(t.poolTsoDfoF), t.mode = e && n ? "both" : e ? "bag" : n ? "dfo" : "none", t;
}
const Ke = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  bagPoolTotal: it,
  bindPoolsApi: re,
  buildCertifiedPools: Rt,
  capFunctionPoolsToFte: _t,
  dfoPoolTotal: kt,
  ensureFunctionCoverage: R,
  fteCapsByRoleSex: It,
  getFunctionMode: ie
}, Symbol.toStringTag, { value: "Module" }));
let c = null;
function ae(t) {
  c = t;
}
function I(t, e) {
  const n = c.$(t);
  n && (n.value = e);
}
function Le(t, e) {
  const n = c.$(t);
  n && (n.checked = !!e);
}
function Be(t) {
  const e = c.$(t);
  return e ? O(e.value) : null;
}
function pt() {
  const t = R();
  I("fc-pool-bag-stso-m", t.poolStsoBagM), I("fc-pool-bag-stso-f", t.poolStsoBagF), I("fc-pool-bag-ltso-m", t.poolLtsoBagM), I("fc-pool-bag-ltso-f", t.poolLtsoBagF), I("fc-pool-bag-tso-m", t.poolTsoBagM), I("fc-pool-bag-tso-f", t.poolTsoBagF), I("fc-pool-dfo-stso-m", t.poolStsoDfoM), I("fc-pool-dfo-stso-f", t.poolStsoDfoF), I("fc-pool-dfo-ltso-m", t.poolLtsoDfoM), I("fc-pool-dfo-ltso-f", t.poolLtsoDfoF), I("fc-pool-dfo-tso-m", t.poolTsoDfoM), I("fc-pool-dfo-tso-f", t.poolTsoDfoF), I("fc-pool-dfo-pt", t.poolTsoDfoPt);
  const e = c.$("fc-bands-wrap"), n = c.$("fc-add-band");
  e && (e.style.display = ""), n && (n.style.display = "");
}
function vt() {
  const t = R();
  I("fc-phase-thr", t.phaseThresholdMin), Le("fc-ampm-split", t.amPmSplit), I("fc-bias", t.bias || "none"), pt(), H(), z(), U && U();
}
function jt() {
  vt();
  const t = c.$("func-coverage-modal");
  t && (t.style.display = "block");
}
function mt() {
  const t = c.$("func-coverage-modal");
  t && (t.style.display = "none");
}
function Ae(t) {
  var e = it(t) > 0, n = kt(t) > 0;
  return t.poolBag = it(t), t.poolStsoDfo = O(t.poolStsoDfoM) + O(t.poolStsoDfoF), t.poolLtsoDfo = O(t.poolLtsoDfoM) + O(t.poolLtsoDfoF), t.poolTsoDfo = O(t.poolTsoDfoM) + O(t.poolTsoDfoF), t.mode = e && n ? "both" : e ? "bag" : n ? "dfo" : "none", t.mode;
}
function qe(t) {
  return String(t.name || t.id || "") + " (" + (t.start || "?") + "–" + (t.end || "?") + ")";
}
function H() {
  const t = c.$("fc-bands-tbody");
  if (!t) return;
  const e = t.closest("table"), n = e && e.querySelector("thead");
  n && (n.innerHTML = "<tr><th>Shift</th><th>Start</th><th>End</th><th>STSO min</th><th>STSO max</th><th>LTSO min</th><th>LTSO max</th><th>TSO min</th><th>TSO max</th><th></th></tr>");
  const r = R(), o = c.state.shifts || [], i = at(r);
  t.innerHTML = i.map(function(s, u) {
    const a = c.getShift ? c.getShift(s) : null, f = a ? a.start : "—", l = a ? a.end : "—";
    function d(p, B) {
      var q = K(p, s, r);
      return '<td><input type="number" min="0" max="99" data-fc-req="' + u + '" data-fc-field="' + p + "-" + B + '" value="' + q[B] + '" style="width:3.5rem"></td>';
    }
    var v = o.map(function(p) {
      return '<option value="' + String(p.id).replace(/"/g, "") + '"' + (String(p.id) === String(s) ? " selected" : "") + ">" + qe(p).replace(/</g, "<") + "</option>";
    }).join("");
    return a || (v = '<option value="' + String(s).replace(/"/g, "") + '" selected>' + String(s).replace(/</g, "<") + " (missing)</option>" + v), '<tr><td><select data-fc-req="' + u + '" data-fc-field="shiftId">' + v + '</select></td><td class="muted">' + f + '</td><td class="muted">' + l + "</td>" + d("STSO", "min") + d("STSO", "max") + d("LTSO", "min") + d("LTSO", "max") + d("TSO", "min") + d("TSO", "max") + '<td><button type="button" class="btn btn-red btn-sm" data-fc-remove="' + u + '">✕</button></td></tr>';
  }).join("");
}
function se() {
  return H();
}
function Ce(t) {
  function e(s, u) {
    var a = Be(s);
    a != null && (t[u] = a);
  }
  e("fc-pool-bag-stso-m", "poolStsoBagM"), e("fc-pool-bag-stso-f", "poolStsoBagF"), e("fc-pool-bag-ltso-m", "poolLtsoBagM"), e("fc-pool-bag-ltso-f", "poolLtsoBagF"), e("fc-pool-bag-tso-m", "poolTsoBagM"), e("fc-pool-bag-tso-f", "poolTsoBagF"), e("fc-pool-dfo-stso-m", "poolStsoDfoM"), e("fc-pool-dfo-stso-f", "poolStsoDfoF"), e("fc-pool-dfo-ltso-m", "poolLtsoDfoM"), e("fc-pool-dfo-ltso-f", "poolLtsoDfoF"), e("fc-pool-dfo-tso-m", "poolTsoDfoM"), e("fc-pool-dfo-tso-f", "poolTsoDfoF"), e("fc-pool-dfo-pt", "poolTsoDfoPt"), Ae(t);
  const n = c.$("fc-phase-thr"), r = c.$("fc-ampm-split");
  n && (t.phaseThresholdMin = O(n.value || 15)), r && (t.amPmSplit = !!r.checked);
  const o = c.$("fc-bias");
  if (o) {
    var i = o.value;
    i === "male" || i === "female" || i === "none" ? t.bias = i : t.bias = "none";
  }
}
function Y() {
  const t = R();
  Ce(t);
  const e = c.$("fc-bands-tbody");
  if (!e) return t;
  const n = e.querySelectorAll('[data-fc-req][data-fc-field="shiftId"]');
  if (!n.length) return t;
  const r = [], o = {}, i = dt();
  return n.forEach(function(s) {
    var u = +s.getAttribute("data-fc-req"), a = s.value;
    !a || o[a] || (o[a] = !0, r.push(a), ["STSO", "LTSO", "TSO"].forEach(function(f) {
      var l = e.querySelector('[data-fc-req="' + u + '"][data-fc-field="' + f + '-min"]'), d = e.querySelector('[data-fc-req="' + u + '"][data-fc-field="' + f + '-max"]'), v = l ? O(l.value) : 0, p = d ? O(d.value) : v;
      p < v && (p = v), i[f][a] = { min: v, max: p };
    }));
  }), t.requirements = i, t.requirementShiftIds = r, t;
}
function fe() {
  return Y();
}
function ot(t) {
  Y();
  const e = R(), n = c.state && c.state.shifts || [], r = at(e);
  var o = t;
  if (!o) {
    for (var i = 0; i < n.length; i++)
      if (r.indexOf(String(n[i].id)) < 0) {
        o = n[i].id;
        break;
      }
  }
  return o ? (o = String(o), r.indexOf(o) >= 0 || (e.requirementShiftIds = r.concat([o]), ["STSO", "LTSO", "TSO"].forEach(function(s) {
    ne(s, o, 0, 0, e);
  }), H(), z()), e) : (c.updateStatus && c.updateStatus("All shifts are already listed, or no shifts are defined."), e);
}
function ue() {
  return ot();
}
function z() {
  const t = c.$("fc-preview");
  if (!t) return;
  const e = R(), n = Ct(), o = at(e).map(function(u) {
    var a = c.getShift ? c.getShift(u) : null, f = K("STSO", u, e), l = K("LTSO", u, e), d = K("TSO", u, e);
    return (a ? (a.name || u) + " " + a.start + "–" + a.end : u) + " STSO " + f.min + "–" + f.max + " LTSO " + l.min + "–" + l.max + " TSO " + d.min + "–" + d.max;
  }).join(" | ");
  var i = (e.lastDiagnostics || []).map(oe).join(" · "), s = Array.isArray(e.bands) && e.bands.length ? " · " + e.bands.length + " unmapped legacy band(s) retained" : "";
  t.textContent = "BAG STSO " + e.poolStsoBagM + "/" + e.poolStsoBagF + " LTSO " + e.poolLtsoBagM + "/" + e.poolLtsoBagF + " TSO " + e.poolTsoBagM + "/" + e.poolTsoBagF + " · DFO STSO " + e.poolStsoDfoM + "/" + e.poolStsoDfoF + " LTSO " + e.poolLtsoDfoM + "/" + e.poolLtsoDfoF + " TSO " + e.poolTsoDfoM + "/" + e.poolTsoDfoF + " PT " + O(e.poolTsoDfoPt) + " · AM " + (c.slotLabel ? c.slotLabel(n.am) : "") + " PM " + (c.slotLabel ? c.slotLabel(n.pm) : "") + " " + (o || "no shift requirements") + (i ? " · " + i : "") + s;
}
function wt() {
  return [{ start: "04:00", end: "20:30", min: 1 }];
}
function X() {
  return Array.isArray(c.state.extraPositions) || (c.state.extraPositions = []), c.state.extraPositions.forEach(function(t, e) {
    t.id || (t.id = "extra-" + (e + 1)), t.name || (t.name = "Position"), t.m = O(t.m), t.f = O(t.f), (!Array.isArray(t.bands) || !t.bands.length) && (t.bands = wt());
  }), c.state.extraPositions;
}
function Q() {
  const t = X();
  return t.forEach(function(e) {
    const n = c.$('[data-extra-name="' + e.id + '"]'), r = c.$('[data-extra-m="' + e.id + '"]'), o = c.$('[data-extra-f="' + e.id + '"]');
    n && (e.name = String(n.value || e.name).trim() || e.name), r && (e.m = O(r.value)), o && (e.f = O(o.value)), Array.isArray(e.bands) || (e.bands = wt());
    for (var i = 0; i < e.bands.length; i++) {
      var s = e.bands[i] || {};
      ["start", "end", "min"].forEach(function(u) {
        var a = c.$('[data-extra-band="' + e.id + '"][data-extra-bi="' + i + '"][data-extra-bf="' + u + '"]');
        a && (u === "min" ? s[u] = O(a.value) : s[u] = a.value || s[u]);
      }), e.bands[i] = s;
    }
  }), t;
}
function U() {
  const t = c.$("extra-pos-list");
  if (!t) return;
  const e = X();
  t.innerHTML = e.map(function(n) {
    var r = (n.bands || []).map(function(o, i) {
      return '<tr><td><input type="time" data-extra-band="' + n.id + '" data-extra-bi="' + i + '" data-extra-bf="start" value="' + (o.start || "04:00") + '" step="900"></td><td><input type="time" data-extra-band="' + n.id + '" data-extra-bi="' + i + '" data-extra-bf="end" value="' + (o.end || "20:30") + '" step="900"></td><td><input type="number" min="0" max="99" data-extra-band="' + n.id + '" data-extra-bi="' + i + '" data-extra-bf="min" value="' + (o.min != null ? o.min : 0) + '" style="width:3.5rem"></td><td><button type="button" class="btn btn-red btn-sm" data-extra-band-remove="' + n.id + '" data-extra-bi="' + i + '">✕</button></td></tr>';
    }).join("");
    return '<div class="extra-pos-card" data-extra-card="' + n.id + '"><div class="fte-sex-row extra-pos-head"><label>Name <input type="text" data-extra-name="' + n.id + '" value="' + String(n.name || "").replace(/"/g, "&quot;") + '" style="width:7rem"></label><label>Male <input type="number" min="0" data-extra-m="' + n.id + '" value="' + O(n.m) + '" style="width:4.5rem"></label><label>Female <input type="number" min="0" data-extra-f="' + n.id + '" value="' + O(n.f) + '" style="width:4.5rem"></label><button type="button" class="btn btn-red btn-sm" data-extra-remove="' + n.id + '">Remove</button><button type="button" class="btn btn-sm" data-extra-add-band="' + n.id + '">+ Band</button></div><div class="lines-scroll extra-pos-bands"><table class="data-table"><thead><tr><th>Start</th><th>End</th><th>Min</th><th></th></tr></thead><tbody>' + r + "</tbody></table></div></div>";
  }).join("");
}
function le(t) {
  Q();
  var e = X();
  e.push({ id: "extra-" + Date.now() + "-" + (e.length + 1), name: t || "MSTI", m: 0, f: 0, bands: wt() }), U();
}
function Pe() {
  var t = [], e = X(), n = c.state.shifts || [], r = n[0] || { id: "", name: "Shift", start: "04:00", end: "20:30", paid: 8, rdoHard: [] };
  return e.forEach(function(o, i) {
    var s = O(o.m) + O(o.f);
    if (!s) return;
    (!o.bands || !o.bands.length) && c.state.issues.push((o.name || "Position") + ": no coverage bands.");
    var u = 3e4 + i * 1e3, a = 0;
    function f(l, d) {
      for (var v = 0; v < d; v++) {
        for (var p = n[a % Math.max(1, n.length)] || r, B = (+p.paid || 8) >= 10 ? 4 : 5, q = 7 - B, k = Array.isArray(p.rdoHard) ? p.rdoHard.map(Number).filter(function(L) {
          return L >= 0 && L <= 6;
        }) : [], $ = k.length ? k.slice(0, q) : c.consecutiveRdos ? c.consecutiveRdos(q, (u + a) % 7) : [0, 6]; $.length < q; )
          for (var P = 0; P < 7 && $.length < q; P++) $.indexOf(P) < 0 && $.push(P);
        t.push({
          id: u + a + 1,
          lineCode: String(o.name || "POS") + " " + String(a + 1).padStart(2, "0"),
          shiftId: p.id,
          shiftName: p.name,
          shiftLabel: c.shiftLabel ? c.shiftLabel(p) : (p.start || "") + "-" + (p.end || ""),
          empClass: o.name || "EXTRA",
          position: o.name || "EXTRA",
          isLtso: !1,
          isStso: !1,
          isExtra: !0,
          extraPositionId: o.id,
          sex: l,
          function: "",
          rdoDays: $,
          rdoHard: k.length > 0,
          paid: p.paid || 8
        }), a++;
      }
    }
    f("M", O(o.m)), f("F", O(o.f));
  }), t;
}
function de() {
  var t = c.$("fc-add-band");
  if (!(c._funcCoverageBound && t && t._fcBound) && c.$("fc-bands-tbody")) {
    c._funcCoverageBound = !0, c.addFcShiftRequirement = ot, c.addFcBand = ot, c.renderFunctionShiftsTable = H, R(), X(), vt(), H(), z(), U();
    var e;
    e = c.$("btn-open-func-coverage"), e && e.addEventListener("click", function() {
      jt();
    }), e = c.$("func-coverage-close"), e && e.addEventListener("click", function() {
      mt();
    }), e = c.$("fc-cancel"), e && e.addEventListener("click", function() {
      mt();
    }), e = c.$("fc-save"), e && e.addEventListener("click", function() {
      Y(), pt(), H(), z(), c.updateStatus && c.updateStatus("Function coverage settings saved.");
    }), e = c.$("fc-add-band"), e && !e._fcBound && !e._spBound && (e._fcBound = !0, e.addEventListener("click", function(n) {
      n.preventDefault(), ot();
    })), c._funcDocBound || (c._funcDocBound = !0, document.addEventListener("click", function(n) {
      var r = n.target;
      if (r && r.getAttribute && r.getAttribute("data-fc-remove") != null) {
        Y();
        var o = +r.getAttribute("data-fc-remove"), i = R(), s = at(i);
        if (o >= 0 && o < s.length) {
          var u = s.splice(o, 1)[0];
          i.requirementShiftIds = s, ["STSO", "LTSO", "TSO"].forEach(function(a) {
            i.requirements[a] && delete i.requirements[a][u];
          });
        }
        H(), z();
      }
    }), document.addEventListener("change", function(n) {
      var r = n.target;
      r && (r.getAttribute && r.getAttribute("data-fc-req") != null || r.id && r.id.indexOf("fc-") === 0) && (Y(), r.getAttribute("data-fc-field") === "shiftId" && H(), z());
    })), e = c.$("btn-add-position"), e && !e._extraBound && (e._extraBound = !0, e.addEventListener("click", function(n) {
      n.preventDefault(), le("MSTI");
    })), c._extraDocBound || (c._extraDocBound = !0, document.addEventListener("click", function(n) {
      var r = n.target;
      if (!(!r || !r.getAttribute)) {
        var o = r.getAttribute("data-extra-remove");
        if (o != null) {
          Q(), c.state.extraPositions = X().filter(function(B) {
            return B.id !== o;
          }), U();
          return;
        }
        var i = r.getAttribute("data-extra-add-band");
        if (i != null) {
          Q();
          for (var s = X(), u = null, a = 0; a < s.length; a++) s[a].id === i && (u = s[a]);
          u && (Array.isArray(u.bands) || (u.bands = []), u.bands.push({ start: "12:00", end: "16:00", min: 0 })), U();
          return;
        }
        var f = r.getAttribute("data-extra-band-remove"), l = r.getAttribute("data-extra-bi");
        if (f != null && l != null) {
          Q();
          for (var d = X(), v = null, p = 0; p < d.length; p++) d[p].id === f && (v = d[p]);
          v && Array.isArray(v.bands) && v.bands.splice(+l, 1), U();
        }
      }
    }), document.addEventListener("change", function(n) {
      var r = n.target;
      !r || !r.getAttribute || (r.getAttribute("data-extra-name") != null || r.getAttribute("data-extra-m") != null || r.getAttribute("data-extra-f") != null || r.getAttribute("data-extra-band") != null) && Q();
    }));
  }
}
const Ne = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addExtraPosition: le,
  addFcBand: ue,
  addFcShiftRequirement: ot,
  bindBandsApi: ae,
  bindFunctionCoverageUi: de,
  buildExtraPositionLines: Pe,
  closeFunctionCoverageModal: mt,
  ensureExtraPositions: X,
  fillFunctionCoverageForm: vt,
  openFunctionCoverageModal: jt,
  readExtraPositionsFromDom: Q,
  readFunctionBandsFromDom: fe,
  readFunctionCoverageFromDom: Y,
  renderExtraPositions: U,
  renderFunctionBandsTable: se,
  renderFunctionShiftsTable: H,
  syncFunctionModeUi: pt,
  updateFunctionCoveragePreview: z
}, Symbol.toStringTag, { value: "Module" }));
let g = null;
function ce(t) {
  g = t;
}
function tt(t, e) {
  var n = g.state.schedule[t.id] || g.state.schedule[String(t.id)];
  return n ? n[e] === "WORK" : !1;
}
function w(t) {
  return (!t.functionEligible || typeof t.functionEligible != "object") && (t.functionEligible = { dfo: !1, bag: !1, pax: !1 }), t.functionEligible;
}
function Re(t, e, n) {
  var r = g.state.lines || [];
  return r.filter(function(o) {
    if (o.isExtra || o.extraPositionId) return !1;
    var i = w(o);
    return lt(o) === t && o.sex === e && !i.bag && !i.dfo;
  });
}
function ke(t, e) {
  return t.slice().sort(function(n, r) {
    return e && e.bias === "male" && n.sex !== r.sex ? n.sex === "M" ? -1 : 1 : e && e.bias === "female" && n.sex !== r.sex ? n.sex === "F" ? -1 : 1 : ft(n) - ft(r) || String(n.id).localeCompare(String(r.id));
  });
}
function Zt(t) {
  var e = g.state.functionRotation && g.state.functionRotation[String(t)];
  if (!e) return 0;
  for (var n = 0, r = 0; r < e.length; r++) e[r] === "BAG" && n++;
  return n;
}
function Ie(t, e, n, r) {
  if (!n || n <= 0) return { total: 0 };
  r = r || R();
  var o = Re(t, e).slice();
  o.sort(function(u, a) {
    return ft(u) - ft(a) || String(u.id).localeCompare(String(a.id));
  });
  for (var i = 0, s = 0; s < o.length && i < n; s++)
    w(o[s]).bag = !0, i++;
  return { total: i };
}
function _e(t, e, n, r) {
  return { am: 0, pm: 0, total: 0 };
}
function qt() {
  g.renderCoverageBars && g.renderCoverageBars(), g.renderReports && g.renderReports(), typeof window < "u" && window.dispatchEvent(new CustomEvent("lines:request-render")), !g.__USE_SVELTE_LINES && g.renderLines && g.renderLines();
}
function rt(t, e, n) {
  var r = String(t);
  for (g.state.functionRotation || (g.state.functionRotation = {}), g.state.functionRotation[r] || (g.state.functionRotation[r] = []); g.state.functionRotation[r].length <= e; ) g.state.functionRotation[r].push(null);
  return g.state.functionRotation[r][e] = n, !0;
}
function ge(t, e) {
  var n = g.state.functionRotation && g.state.functionRotation[String(t)];
  if (!n) return null;
  var r = n[e];
  return r == null || r === "" ? null : r;
}
function $e(t) {
  var e = g.getShift ? g.getShift(t) : null;
  if (!e) return String(t);
  var n = e.name || t;
  return String(n).replace(":", "");
}
function je(t, e) {
  return t.slice().sort(function(n, r) {
    var o = Zt(n.id), i = Zt(r.id);
    if (o !== i) return o - i;
    var s = ke([n, r], e);
    return s[0] !== n ? 1 : s[0] !== r && n !== r ? -1 : String(n.id).localeCompare(String(r.id));
  });
}
function St(t) {
  t = t || R();
  var e = [], n = {}, r = ["STSO", "LTSO", "TSO"];
  return r.forEach(function(o) {
    var i = t.requirements && t.requirements[o] || {};
    Object.keys(i).forEach(function(s) {
      var u = K(o, s, t);
      if (!(u.min <= 0 && u.max <= 0)) {
        n[o + "|" + s] = { min: u.min, max: u.max };
        var a = ut(o, s), f = a.filter(function(v) {
          var p = w(v);
          return p.dfo && !p.bag;
        }), l = a.length < u.min || f.length < u.min ? "SHORT" : "OK", d = g.getShift ? g.getShift(s) : null;
        e.push({
          role: o,
          shiftId: s,
          shiftLabel: $e(s),
          shiftStart: d ? d.start : null,
          shiftEnd: d ? d.end : null,
          missingShift: !d,
          eligible: a.length,
          requiredMin: u.min,
          requiredMax: u.max,
          assigned: Math.min(u.max, Math.max(u.min, 0), a.length),
          status: l
        });
      }
    });
  }), { diagnostics: e, configured: n };
}
function me(t, e) {
  g.readFunctionCoverageFromDom && g.readFunctionCoverageFromDom(), t = t || R(), e = e || (g.state && g.state.weekCount ? g.state.weekCount * 7 : 7);
  var n = g.state && g.state.lines || [];
  if (!n.length)
    return g.updateStatus && g.updateStatus("Generate lines first."), { diagnostics: [], shortfalls: ["No lines generated."] };
  n.forEach(function(a) {
    if (!(a.isExtra || a.extraPositionId)) {
      var f = w(a);
      if (!f.bag && f.dfo)
        for (var l = 0; l < e; l++)
          tt(a, l) && rt(a.id, l, null);
    }
  });
  var r = ht(t, e);
  n.forEach(function(a) {
    if (!(a.isExtra || a.extraPositionId)) {
      var f = w(a);
      if (!f.bag && f.dfo)
        for (var l = 0; l < e; l++)
          tt(a, l) && (ge(a.id, l) || rt(a.id, l, "DFO"));
    }
  });
  var o = St(t), i = o.diagnostics || [];
  r && r.length && i.forEach(function(a) {
    for (var f = 0; f < r.length; f++)
      r[f].role !== a.role || r[f].shiftId !== a.shiftId || (a.assigned = r[f].assigned, r[f].status === "SHORT" && (a.status = "SHORT"));
  });
  var s = [];
  i.forEach(function(a) {
    if (a.status === "SHORT") {
      var f = a.shiftStart || a.shiftLabel || a.shiftId, l = a.role + " " + f + " shift: " + a.assigned + " / " + a.requiredMin;
      s.push(l);
    }
  }), qt();
  var u = "Resolved baggage days.";
  return s.length && (u += " Shortfalls: " + s.join("; ")), g.updateStatus && g.updateStatus(u), s.length && typeof window < "u" && window.alert && window.alert(`Resolved baggage days with shortfalls:
` + s.join(`
`)), { diagnostics: i, shortfalls: s };
}
function ht(t, e) {
  t = t || R(), e = e || 0;
  for (var n = ["STSO", "LTSO", "TSO"], r = [], o = 0; o < e; o++)
    for (var i = 0; i < n.length; i++)
      for (var s = n[i], u = t.requirements && t.requirements[s] || {}, a = Object.keys(u), f = 0; f < a.length; f++) {
        var l = a[f], d = K(s, l, t);
        if (!(d.min <= 0 && d.max <= 0)) {
          var v = ut(s, l).filter(function(L) {
            var W = w(L);
            return tt(L, o) && !W.bag && W.dfo;
          });
          v = je(v, t);
          var p = Math.min(d.max, Math.max(d.min, 0));
          p = Math.min(p, v.length);
          for (var B = 0; B < p; B++) rt(v[B].id, o, "BAG");
          if (o === 0) {
            var q = ut(s, l), k = q.filter(function(L) {
              var W = w(L);
              return W.dfo && !W.bag;
            }), $ = k.filter(function(L) {
              return tt(L, 0);
            }), P = k.length < d.min || $.length < d.min ? "SHORT" : "OK";
            r.push({
              role: s,
              shiftId: l,
              requiredMin: d.min,
              requiredMax: d.max,
              eligible: q.length,
              assigned: p,
              status: P
            });
          }
        }
      }
  return r;
}
function pe(t) {
  t = t || {}, g.readFunctionBandsFromDom && g.readFunctionBandsFromDom();
  var e = R();
  if (g.state.issues || (g.state.issues = []), _t(e, g.state.issues), g.state.functionRotation = {}, (g.state.lines || []).forEach(function(f) {
    f.isExtra || f.extraPositionId || (f.function = "", f.functionEligible = { dfo: !1, bag: !1, pax: !1 });
  }), !g.state.lines || !g.state.lines.length) {
    e.lastDiagnostics = [], qt(), !t.fromGenerate && g.updateStatus && g.updateStatus("Generate lines first.");
    return;
  }
  var n = Rt(e), r = St(e);
  e.lastDiagnostics = r.diagnostics || [];
  var o = (g.state.weekCount || 1) * 7;
  (g.state.lines || []).forEach(function(f) {
    if (w(f).bag) {
      f.function = "BAG";
      for (var l = 0; l < o; l++) tt(f, l) && rt(f.id, l, "BAG");
    }
  }), (g.state.lines || []).forEach(function(f) {
    w(f).bag || w(f).dfo && (f.function = "DFO");
  });
  var i = ht(e, o);
  i && i.length && (r.diagnostics || []).forEach(function(f) {
    for (var l = 0; l < i.length; l++)
      i[l].role !== f.role || i[l].shiftId !== f.shiftId || (f.assigned = i[l].assigned, i[l].status === "SHORT" && (f.status = "SHORT"));
  }), (g.state.lines || []).forEach(function(f) {
    if (!(f.isExtra || f.extraPositionId) && !w(f).bag) {
      if (w(f).dfo) {
        for (var l = 0; l < o; l++)
          tt(f, l) && (ge(f.id, l) || rt(f.id, l, "DFO"));
        return;
      }
      w(f).pax = !0, f.function = "PAX";
      for (var d = 0; d < o; d++) tt(f, d) && rt(f.id, d, "PAX");
    }
  });
  var s = [];
  (r.diagnostics || []).forEach(function(f) {
    if (f.status === "SHORT") {
      var l = f.shiftStart || f.shiftLabel || f.shiftId, d = f.role + " " + l + " shift: " + f.assigned + " / " + f.requiredMin;
      s.push(d), g.state.issues.push(d);
    }
  }), s.length && g.renderIssues && g.renderIssues(), qt();
  var u = "BAG " + (n.bag.stso.total + n.bag.ltso.total + n.bag.tso.total) + " · DFO " + (n.stso.total + n.ltso.total + n.tso.total) + " · leftover PAX";
  s.length && (u += " · SHORT " + s.length);
  var a = g.$ && g.$("cert-assign-hint");
  return a && (a.textContent = u), !t.fromGenerate && g.updateStatus && g.updateStatus(u), !t.fromGenerate && g.closeFunctionCoverageModal && g.closeFunctionCoverageModal(), { diagnostics: r.diagnostics, shortfalls: s, poolStats: n };
}
const ze = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  applyShiftFunctionRequirements: St,
  bindAssignApi: ce,
  generateFunctionAssignments: pe,
  markBag: Ie,
  markDfo: _e,
  resolveBagDuties: me,
  rotateShiftBagDuties: ht
}, Symbol.toStringTag, { value: "Module" }));
let _ = null;
function ve(t) {
  _ = t;
}
function we(t, e) {
  var n = Jt(t.id, e);
  return n || (t.function === "BAG" || t.function === "DFO" || t.function === "PAX" ? t.function : null);
}
function Gt(t, e, n) {
  if (n = n || {}, !_ || !_.state) return 0;
  var r = 0;
  return (_.state.lines || []).forEach(function(o) {
    if (o) {
      if (!n.includeExtra) {
        if (o.isExtra || o.extraPositionId) return;
      }
      typeof _.getShift == "function" && !_.getShift(o.shiftId) || n.role && lt(o) !== n.role || Qt(o, t, e) && (n.duty && we(o, t) !== n.duty || r++);
    }
  }), r;
}
function Se(t) {
  if (t = t || {}, !_ || !_.state) return { slots: [], cells: [] };
  for (var e = _.timeToMin ? _.timeToMin(_.state.open || "03:30") : 0, n = _.timeToMin ? _.timeToMin(_.state.close || "23:00") : 24 * 60, r = Math.floor(e / 30) * 30, o = Math.ceil(n / 30) * 30, i = [], s = r; s < o; s += 30) i.push(s);
  for (var u = t.days != null ? t.days : (_.state.weekCount || 1) * 7, a = t.roles || ["STSO", "LTSO", "TSO"], f = t.duties || ["BAG", "DFO", "PAX"], l = [], d = 0; d < u; d++)
    for (var v = 0; v < i.length; v++)
      for (var p = i[v], B = 0; B < a.length; B++)
        for (var q = 0; q < f.length; q++) {
          var k = Gt(d, p, { role: a[B], duty: f[q] });
          (k > 0 || t.includeZeros) && l.push({
            dayIndex: d,
            slotMin: p,
            role: a[B],
            function: f[q],
            count: k
          });
        }
  return { slots: i, cells: l, days: u };
}
const Ue = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  bindCoverageCalcApi: ve,
  computeAssignedCoverage: Se,
  countAssignedAtSlot: Gt
}, Symbol.toStringTag, { value: "Module" }));
function Ge(t) {
  return t = t || (typeof window < "u" ? window.Scheduler : null), t ? (he(t), re(t), Yt(t), ve(t), ae(t), ce(t), t.fteCapsByRoleSex = It, t.ensureFunctionCoverage = R, t.getFunctionMode = ie, t.syncFunctionModeUi = pt, t.fillFunctionCoverageForm = vt, t.computeShiftAnchors = Ct, t.phaseOfStart = At, t.isAmSide = Fe, t.lineStartMin = ft, t.lineRoleKey = lt, t.isOpsFunctionRole = be, t.lineIsDfoTagged = Te, t.getRotationDuty = Jt, t.lineCoversSlot = Qt, t.bandForMinute = Me, t.openFunctionCoverageModal = jt, t.closeFunctionCoverageModal = mt, t.renderFunctionBandsTable = se, t.renderFunctionShiftsTable = H, t.readFunctionBandsFromDom = fe, t.readFunctionCoverageFromDom = Y, t.updateFunctionCoveragePreview = z, t.capFunctionPoolsToFte = _t, t.buildCertifiedPools = Rt, t.generateFunctionAssignments = pe, t.applyShiftFunctionRequirements = St, t.rotateShiftBagDuties = ht, t.resolveBagDuties = me, t.getConfiguredFunctionShifts = ee, t.getShiftRequirement = K, t.getEligibleLinesForShift = ut, t.addFcShiftRequirement = ot, t.addFcBand = ue, t.computeAssignedCoverage = Se, t.countAssignedAtSlot = Gt, t.migrateFunctionCoverageConfig = Pt, t.ensureExtraPositions = X, t.readExtraPositionsFromDom = Q, t.clearLineFunctions = xe, t.initFunctionCoverage = Ge, de(), t) : null;
}
export {
  le as addExtraPosition,
  ue as addFcBand,
  ot as addFcShiftRequirement,
  St as applyShiftFunctionRequirements,
  ze as assign,
  it as bagPoolTotal,
  Me as bandForMinute,
  Ne as bands,
  ce as bindAssignApi,
  ae as bindBandsApi,
  ve as bindCoverageCalcApi,
  he as bindDutyApi,
  de as bindFunctionCoverageUi,
  re as bindPoolsApi,
  Yt as bindShiftsApi,
  Rt as buildCertifiedPools,
  Pe as buildExtraPositionLines,
  _t as capFunctionPoolsToFte,
  xe as clearLineFunctions,
  mt as closeFunctionCoverageModal,
  Se as computeAssignedCoverage,
  Ct as computeShiftAnchors,
  Gt as countAssignedAtSlot,
  Ue as coverage,
  kt as dfoPoolTotal,
  X as ensureExtraPositions,
  R as ensureFunctionCoverage,
  vt as fillFunctionCoverageForm,
  It as fteCapsByRoleSex,
  pe as generateFunctionAssignments,
  ee as getConfiguredFunctionShifts,
  ut as getEligibleLinesForShift,
  ie as getFunctionMode,
  Jt as getRotationDuty,
  K as getShiftRequirement,
  Ge as initFunctionCoverage,
  Fe as isAmSide,
  be as isOpsFunctionRole,
  Qt as lineCoversSlot,
  Te as lineIsDfoTagged,
  lt as lineRoleKey,
  ft as lineStartMin,
  Ie as markBag,
  _e as markDfo,
  Xe as migrate,
  Pt as migrateFunctionCoverageConfig,
  jt as openFunctionCoverageModal,
  At as phaseOfStart,
  Ke as pools,
  Q as readExtraPositionsFromDom,
  fe as readFunctionBandsFromDom,
  Y as readFunctionCoverageFromDom,
  U as renderExtraPositions,
  se as renderFunctionBandsTable,
  H as renderFunctionShiftsTable,
  me as resolveBagDuties,
  ht as rotateShiftBagDuties,
  He as shifts,
  pt as syncFunctionModeUi,
  z as updateFunctionCoveragePreview
};
