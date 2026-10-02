let x = null;
function bn(t) {
  x = t;
}
function lt(t) {
  return t ? t.isExtra || t.extraPositionId ? t.empClass || t.position || "EXTRA" : t.isStso || t.empClass === "STSO" ? "STSO" : t.isLtso || t.empClass === "LTSO" ? "LTSO" : "TSO" : "TSO";
}
function Tn(t) {
  var n = lt(t);
  return n === "STSO" || n === "LTSO" || n === "TSO";
}
function Fn(t) {
  return !t || t.isExtra || t.extraPositionId ? !1 : t.function === "DFO" || !!(t.functionEligible && t.functionEligible.dfo);
}
function Jt(t, n) {
  var e = x.state.functionRotation || {}, r = e[String(t)] || e[t];
  if (r) {
    var o = r[n];
    return o == null || o === "" ? null : o;
  }
  var i = null;
  if (x.state && Array.isArray(x.state.lines)) {
    for (var s = 0; s < x.state.lines.length; s++)
      if (String(x.state.lines[s].id) === String(t)) {
        i = x.state.lines[s];
        break;
      }
  }
  return i && (i.function === "BAG" || i.function === "DFO" || i.function === "PAX") ? i.function : null;
}
function ft(t) {
  var n = x.getShift(t.shiftId);
  return n ? x.timeToMin(n.start) : 0;
}
function At(t, n, e) {
  return e = e ?? 15, n = n || Ct(), t <= n.am - e && t < 11 * 60 ? "Opening" : t >= n.pm + e && t >= 11 * 60 + 15 ? "Closing" : t < n.pm ? "AM" : "PM";
}
function Mn(t, n, e) {
  return At(t, n, e) === "Opening" || At(t, n, e) === "AM";
}
function Qt(t, n, e) {
  var r = x.state.schedule[t.id] || x.state.schedule[String(t.id)];
  if (!r || r[n] !== "WORK") return !1;
  var o = n % 7, i = x.state && x.state.startDate;
  i && (o = x.weekdaySun0 && x.addDays ? x.weekdaySun0(x.addDays(i, n)) : x.dj ? x.dj(i).add(n).day() : n % 7);
  var s = x.getEffectiveShiftTimes ? x.getEffectiveShiftTimes(t.shiftId, o) : null;
  if (!s) {
    var u = x.getShift(t.shiftId);
    if (!u) return !1;
    s = { start: u.start, end: u.end };
  }
  var a = x.timeToMin(s.start), f = x.timeToMin(s.end);
  return f <= a ? e >= a || e < f : e >= a && e < f;
}
function xn(t, n) {
  if (n = n || x.ensureFunctionCoverage && x.ensureFunctionCoverage().bands || [], !Array.isArray(n) || !n.length) return null;
  for (var e = 0; e < n.length; e++) {
    var r = n[e], o = x.timeToMin(r.start), i = x.timeToMin(r.end);
    i <= o && (i += 1440);
    var s = t;
    if (i > 1440 && s < o && (s += 1440), s >= o && s < i) return r;
  }
  return null;
}
function Ct() {
  var t = {};
  (x.state.lines || []).forEach(function(s) {
    var u = x.getShift(s.shiftId);
    if (u) {
      var a = x.timeToMin(u.start);
      t[a] = (t[a] || 0) + 1;
    }
  });
  var n = Object.keys(t).map(function(s) {
    return { min: +s, n: t[s] };
  }).sort(function(s, u) {
    return s.min - u.min;
  });
  if (!n.length) return { am: 8 * 60, pm: 14 * 60 };
  var e = n[0].min, r = 0;
  n.forEach(function(s) {
    s.min < 11 * 60 && s.n > r && (r = s.n, e = s.min);
  });
  var o = n[n.length - 1].min, i = 0;
  return n.forEach(function(s) {
    s.min >= 11 * 60 + 15 && s.n > i && (i = s.n, o = s.min);
  }), i === 0 && n.forEach(function(s) {
    s.min >= 12 * 60 && s.n > i && (i = s.n, o = s.min);
  }), { am: e, pm: o };
}
function On() {
  (x.state.lines || []).forEach(function(t) {
    t.function = "", t.functionEligible = { dfo: !1, bag: !1, pax: !1 };
  }), x.state.functionRotation = {};
}
let E = null;
function Yt(t) {
  E = t;
}
function O(t) {
  return Math.max(0, Math.floor(+t || 0));
}
function dt() {
  return { STSO: {}, LTSO: {}, TSO: {} };
}
function tn(t) {
  var n = dt();
  return !t || typeof t != "object" || ["STSO", "LTSO", "TSO"].forEach(function(e) {
    var r = t[e];
    !r || typeof r != "object" || Object.keys(r).forEach(function(o) {
      if (o) {
        var i = r[o] || {}, s = O(i.min), u = i.max == null ? s : O(i.max);
        u < s && (u = s), n[e][String(o)] = { min: s, max: u };
      }
    });
  }), n;
}
function at(t) {
  var n = [], e = {};
  t && Array.isArray(t.requirementShiftIds) && t.requirementShiftIds.forEach(function(o) {
    var i = String(o || "");
    !i || e[i] || (e[i] = !0, n.push(i));
  });
  var r = t && t.requirements || {};
  return ["STSO", "LTSO", "TSO"].forEach(function(o) {
    var i = r[o] || {};
    Object.keys(i).forEach(function(s) {
      var u = String(s || "");
      !u || e[u] || (e[u] = !0, n.push(u));
    });
  }), n;
}
function nn(t) {
  return t = t || E && E.state && E.state.functionCoverage || {}, !E || typeof E.getShift != "function" ? [] : at(t).map(function(n) {
    return E.getShift(n);
  }).filter(Boolean);
}
function K(t, n, e) {
  e = e || E && E.state && E.state.functionCoverage || {};
  var r = e.requirements && e.requirements[t] && e.requirements[t][n];
  if (!r) return { min: 0, max: 0 };
  var o = O(r.min), i = r.max == null ? o : O(r.max);
  return i < o && (i = o), { min: o, max: i };
}
function en(t, n, e, r, o) {
  if (o = o || E && E.state && E.state.functionCoverage, !o) return null;
  o.requirements || (o.requirements = dt()), o.requirements[t] || (o.requirements[t] = {});
  var i = O(e), s = r == null ? i : O(r);
  return s < i && (s = i), o.requirements[t][String(n)] = { min: i, max: s }, o.requirements[t][String(n)];
}
function ut(t, n, e) {
  if (e = e || {}, !E || !E.state) return [];
  var r = E.state.lines || [];
  return r.filter(function(o) {
    return !(!o || o.isExtra || o.extraPositionId || !o.shiftId || String(o.shiftId) !== String(n) || typeof E.getShift == "function" && !E.getShift(o.shiftId) || lt(o) !== t || e.sex && o.sex !== e.sex);
  });
}
function Dn() {
  var t = E && E.state && E.state.shifts || [], n = null, e = null;
  return t.forEach(function(r) {
    if (!(!r || !r.id)) {
      var o = E.timeToMin ? E.timeToMin(r.start) : 0;
      (!n || o < E.timeToMin(n.start)) && (n = r), (!e || o > E.timeToMin(e.start)) && (e = r);
    }
  }), { open: n, close: e };
}
function yn(t, n) {
  return !!(t && n && String(t.shiftId) === String(n.id));
}
function on(t) {
  if (!t) return "";
  var n = (t.requiredMin != null ? t.requiredMin : 0) + "-" + (t.requiredMax != null ? t.requiredMax : 0);
  return t.role + " / Shift " + (t.shiftLabel || t.shiftId) + " Eligible: " + t.eligible + " Required: " + n + " Assigned: " + t.assigned + " Status: " + (t.status || "OK");
}
const Xn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  bindShiftsApi: Yt,
  configuredShiftIdsFromRequirements: at,
  emptyRequirements: dt,
  formatRequirementDiagnostic: on,
  getConfiguredFunctionShifts: nn,
  getEligibleLinesForShift: ut,
  getShiftRequirement: K,
  lineOnShift: yn,
  normalizeRequirements: tn,
  num0: O,
  openingAndClosingShifts: Dn,
  setShiftRequirement: en
}, Symbol.toStringTag, { value: "Module" }));
function En(t, n) {
  var e = n.toLowerCase(), r = t[e + "Min"] != null ? O(t[e + "Min"]) : O(t[e]), o = t[e + "Max"] != null ? O(t[e + "Max"]) : r;
  return o < r && (o = r), { min: r, max: o };
}
function Bt(t, n, e) {
  e.push(n), t && Array.isArray(t) && t.indexOf(n) < 0 && t.push(n);
}
function Pt(t, n) {
  n = n || {};
  var e = Array.isArray(n.shifts) ? n.shifts : [], r = n.issues, o = {
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
    var f = e.filter(function(d) {
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
        var v = En(a, d);
        t.requirements[d][l.id] = { min: v.min, max: v.max };
      }
    }), Array.isArray(t.requirementShiftIds) || (t.requirementShiftIds = []), t.requirementShiftIds.indexOf(l.id) < 0 && t.requirementShiftIds.push(l.id), o.mapped++;
  }), u.length ? t.bands = u : delete t.bands, o.migrated = o.mapped > 0, o;
}
const Kn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  migrateFunctionCoverageConfig: Pt
}, Symbol.toStringTag, { value: "Module" }));
let T = null;
function Ln(t) {
  T = t;
}
function Vt(t) {
  var n = T.getShift ? T.getShift(t) : null;
  return n && T.timeToMin && n.start != null ? T.timeToMin(n.start) : 1e9;
}
function Rt(t, n) {
  n && (T = n), t = t || (T && T.ensureFunctionCoverage ? T.ensureFunctionCoverage() : {});
  var e = T.state.lines || [];
  e.forEach(function(m) {
    m.isExtra || m.extraPositionId || (m.functionEligible = { dfo: !1, bag: !1, pax: !1 }, m.function = "");
  });
  var r = T.computeShiftAnchors(), o = t.phaseThresholdMin || 15;
  function i(m) {
    return (!m.functionEligible || typeof m.functionEligible != "object") && (m.functionEligible = { dfo: !1, bag: !1, pax: !1 }), m.functionEligible;
  }
  function s(m, M) {
    return e.filter(function(F) {
      if (F.isExtra || F.extraPositionId) return !1;
      var A = i(F);
      return T.lineRoleKey(F) === m && F.sex === M && !A.bag && !A.dfo;
    });
  }
  function u(m, M, F) {
    if (!F || F <= 0) return { total: 0 };
    var A = s(m, M).slice();
    A.sort(function(j, V) {
      return T.lineStartMin(j) - T.lineStartMin(V) || String(j.id).localeCompare(String(V.id));
    });
    for (var S = 0, y = 0; y < A.length && S < F; y++)
      i(A[y]).bag = !0, S++;
    return { total: S };
  }
  function a(m) {
    return m ? m.isPt === !0 ? !0 : String(m.empClass || "").trim().toUpperCase() === "PT" : !1;
  }
  function f(m) {
    return Math.max(0, Math.floor(+m || 0));
  }
  function l() {
    var m = f(t.poolTsoDfoPt), M = [];
    e.forEach(function(y) {
      if (!(!y || y.isExtra || y.extraPositionId) && T.lineRoleKey(y) === "TSO" && a(y)) {
        var j = i(y);
        j.bag || !j.dfo || M.push(y);
      }
    }), M.sort(function(y, j) {
      var V = T.lineStartMin(j) - T.lineStartMin(y);
      return V || String(j.id).localeCompare(String(y.id));
    });
    for (var F = 0; M.length > m; ) {
      var A = M.shift();
      i(A).dfo = !1, F++;
    }
    if (F && T.state) {
      T.state.issues || (T.state.issues = []);
      var S = "PT DFO capped to " + m;
      T.state.issues.indexOf(S) < 0 && T.state.issues.push(S);
    }
    return F;
  }
  function d(m) {
    var M = 0, F = 0;
    m.forEach(function(S) {
      M += S.am || 0, F += S.pm || 0;
    });
    var A = 0;
    return e.forEach(function(S) {
      if (!(!S || S.isExtra || S.extraPositionId) && T.lineRoleKey(S) === "TSO") {
        var y = S.functionEligible;
        y && y.dfo && !y.bag && A++;
      }
    }), { total: A, am: M, pm: F };
  }
  var v = f(t.poolTsoDfoPt);
  function p() {
    var m = 0;
    return e.forEach(function(M) {
      if (!(!M || M.isExtra || M.extraPositionId) && T.lineRoleKey(M) === "TSO" && a(M)) {
        var F = M.functionEligible;
        F && F.dfo && !F.bag && m++;
      }
    }), m;
  }
  function B(m) {
    var M = i(m);
    return M.bag || M.dfo ? !1 : a(m) ? v <= 0 ? !1 : (M.dfo = !0, v--, !0) : (M.dfo = !0, !0);
  }
  function q() {
    var m = f(t.poolTsoDfoPt);
    ["M", "F"].forEach(function(M) {
      for (; p() < m; ) {
        var F = s("TSO", M).filter(a), A = e.filter(function(S) {
          if (!S || S.isExtra || S.extraPositionId || T.lineRoleKey(S) !== "TSO" || S.sex !== M || a(S)) return !1;
          var y = i(S);
          return y.dfo && !y.bag;
        });
        if (!F.length || !A.length) break;
        F.sort(k), A.sort(function(S, y) {
          var j = T.lineStartMin(y) - T.lineStartMin(S);
          return j || String(y.id).localeCompare(String(S.id));
        }), i(A[0]).dfo = !1, i(F[0]).dfo = !0, v > 0 && v--;
      }
    });
  }
  function k(m, M) {
    var F = a(m) ? 1 : 0, A = a(M) ? 1 : 0;
    return F !== A ? F - A : T.lineStartMin(m) - T.lineStartMin(M) || String(m.id).localeCompare(String(M.id));
  }
  function $(m, M, F) {
    if (!F || F <= 0) return { am: 0, pm: 0, total: 0 };
    var A = s(m, M).slice(), S = [], y = {}, j = !1, V = t.requirements && t.requirements[m] || {};
    Object.keys(V).forEach(function(h) {
      var D = K(m, h, t);
      if (!(D.min <= 0 && D.max <= 0) && !(typeof T.getShift == "function" && !T.getShift(h))) {
        var C = String(h);
        y[C] || (y[C] = !0, S.push(C), j = !0);
      }
    }), S.length || A.forEach(function(h) {
      if (!(!h || h.shiftId == null || h.shiftId === "")) {
        var D = String(h.shiftId);
        y[D] || (y[D] = !0, S.push(D));
      }
    }), S.sort(function(h, D) {
      var C = Vt(h) - Vt(D);
      return C || String(h).localeCompare(String(D));
    });
    var Z = {};
    S.forEach(function(h) {
      Z[h] = [];
    }), A.forEach(function(h) {
      var D = h.shiftId != null ? String(h.shiftId) : "";
      Z[D] && Z[D].push(h);
    });
    function Ht(h) {
      h.sort(function(D, C) {
        return m === "TSO" ? k(D, C) : T.lineStartMin(D) - T.lineStartMin(C) || String(D.id).localeCompare(String(C.id));
      });
    }
    S.forEach(function(h) {
      Ht(Z[h]);
    });
    var Xt = Math.min(F, A.length), Kt = S.map(function(h) {
      return j ? Math.max(K(m, h, t).min, 1) : 1;
    }), ct = 0;
    Kt.forEach(function(h) {
      ct += h;
    }), ct || (ct = 1);
    var N = [], gt = [], Nt = 0;
    S.forEach(function(h, D) {
      var C = Xt * Kt[D] / ct, et = Math.floor(C);
      N[D] = et, Nt += et, gt.push({ i: D, frac: C - et });
    }), gt.sort(function(h, D) {
      return D.frac !== h.frac ? D.frac - h.frac : h.i - D.i;
    });
    for (var nt = Xt - Nt, bt = 0; bt < gt.length && nt > 0; bt++)
      N[gt[bt].i]++, nt--;
    for (nt = 0, S.forEach(function(h, D) {
      var C = Z[h].length;
      N[D] > C && (nt += N[D] - C, N[D] = C);
    }); nt > 0; ) {
      for (var Tt = -1, zt = -1, st = 0; st < S.length; st++) {
        var Ft = Z[S[st]].length - N[st];
        Ft <= 0 || Ft > zt && (zt = Ft, Tt = st);
      }
      if (Tt < 0) break;
      N[Tt]++, nt--;
    }
    var J = [];
    if (S.forEach(function(h, D) {
      for (var C = Z[h], et = N[D], yt = 0; yt < C.length && J.length < F && et > 0; yt++) {
        var Et = C[yt], Lt = i(Et);
        if (!(Lt.bag || Lt.dfo)) {
          if (m === "TSO") {
            if (!B(Et)) continue;
          } else
            Lt.dfo = !0;
          J.push(Et), et--;
        }
      }
    }), J.length < F) {
      var Mt = s(m, M).slice();
      Ht(Mt);
      for (var xt = 0; xt < Mt.length && J.length < F; xt++) {
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
    return J.forEach(function(h) {
      T.isAmSide(T.lineStartMin(h), r, o) ? Ut++ : Wt++;
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
function rn(t) {
  G = t, Ln(t);
}
function b(t) {
  return Math.max(0, Math.floor(+t || 0));
}
function it(t) {
  return b(t.poolStsoBagM) + b(t.poolStsoBagF) + b(t.poolLtsoBagM) + b(t.poolLtsoBagF) + b(t.poolTsoBagM) + b(t.poolTsoBagF);
}
function kt(t) {
  return b(t.poolStsoDfoM) + b(t.poolStsoDfoF) + b(t.poolLtsoDfoM) + b(t.poolLtsoDfoF) + b(t.poolTsoDfoM) + b(t.poolTsoDfoF);
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
  ].forEach(function(n) {
    t[n] == null && (t[n] = 0);
  }), t.poolStsoDfo == null && (t.poolStsoDfo = b(t.poolStsoDfoM) + b(t.poolStsoDfoF)), t.poolLtsoDfo == null && (t.poolLtsoDfo = b(t.poolLtsoDfoM) + b(t.poolLtsoDfoF)), t.poolTsoDfo == null && (t.poolTsoDfo = b(t.poolTsoDfoM) + b(t.poolTsoDfoF)), t.poolBag == null && (t.poolBag = it(t)), !t.poolStsoDfoM && !t.poolStsoDfoF && t.poolStsoDfo && (t.poolStsoDfoM = t.poolStsoDfo), !t.poolLtsoDfoM && !t.poolLtsoDfoF && t.poolLtsoDfo && (t.poolLtsoDfoM = t.poolLtsoDfo), !t.poolTsoDfoM && !t.poolTsoDfoF && t.poolTsoDfo && (t.poolTsoDfoM = t.poolTsoDfo), !t.poolTsoBagM && !t.poolTsoBagF && t.poolBag && (t.poolTsoBagM = t.poolBag), t.amPmSplit == null && (t.amPmSplit = !0), t.phaseThresholdMin == null && (t.phaseThresholdMin = 15), t.bias == null && (t.bias = "none"), G.state.functionRotation || (G.state.functionRotation = {}), Array.isArray(t.bands) && t.bands.length && !t._bandMigrationAttempted && (t._bandMigrationAttempted = !0, Pt(t, {
    shifts: G.state && G.state.shifts || [],
    issues: G.state && G.state.issues
  })), t.requirements = tn(t.requirements), Array.isArray(t.requirementShiftIds) || (t.requirementShiftIds = []), t.requirementShiftIds.length || ["STSO", "LTSO", "TSO"].forEach(function(n) {
    Object.keys(t.requirements[n] || {}).forEach(function(e) {
      t.requirementShiftIds.indexOf(e) < 0 && t.requirementShiftIds.push(e);
    });
  }), delete t.stsoIsDfo, delete t.poolDfo, delete t.poolPax, $t(t), t;
}
function an() {
  return $t(R());
}
function _t() {
  var t = G.state || {};
  return {
    STSO: { M: b(t.stsoM), F: b(t.stsoF) },
    LTSO: { M: b(t.ltsoM), F: b(t.ltsoF) },
    TSO: { M: b(t.ftM) + b(t.ptM), F: b(t.ftF) + b(t.ptF) }
  };
}
function It(t, n) {
  t = t || R();
  var e = _t();
  function r(o, i, s, u, a) {
    var f = e[o].M, l = e[o].F, d = b(t[i]), v = b(t[s]), p = b(t[u]), B = b(t[a]);
    d > f && (n && n.push("BAG " + o + " M pool " + d + " exceeds FTE " + f + " — capped."), d = f), v > l && (n && n.push("BAG " + o + " F pool " + v + " exceeds FTE " + l + " — capped."), v = l);
    var q = Math.max(0, f - d), k = Math.max(0, l - v);
    p > q && (n && n.push("DFO " + o + " M pool " + p + " exceeds remaining FTE " + q + " after BAG — capped."), p = q), B > k && (n && n.push("DFO " + o + " F pool " + B + " exceeds remaining FTE " + k + " after BAG — capped."), B = k), t[i] = d, t[s] = v, t[u] = p, t[a] = B;
  }
  return r("STSO", "poolStsoBagM", "poolStsoBagF", "poolStsoDfoM", "poolStsoDfoF"), r("LTSO", "poolLtsoBagM", "poolLtsoBagF", "poolLtsoDfoM", "poolLtsoDfoF"), r("TSO", "poolTsoBagM", "poolTsoBagF", "poolTsoDfoM", "poolTsoDfoF"), $t(t), t;
}
function $t(t) {
  var n = it(t) > 0, e = kt(t) > 0;
  return t.poolBag = it(t), t.poolStsoDfo = b(t.poolStsoDfoM) + b(t.poolStsoDfoF), t.poolLtsoDfo = b(t.poolLtsoDfoM) + b(t.poolLtsoDfoF), t.poolTsoDfo = b(t.poolTsoDfoM) + b(t.poolTsoDfoF), t.mode = n && e ? "both" : n ? "bag" : e ? "dfo" : "none", t;
}
const Nn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  bagPoolTotal: it,
  bindPoolsApi: rn,
  buildCertifiedPools: Rt,
  capFunctionPoolsToFte: It,
  dfoPoolTotal: kt,
  ensureFunctionCoverage: R,
  fteCapsByRoleSex: _t,
  getFunctionMode: an
}, Symbol.toStringTag, { value: "Module" }));
let c = null;
function sn(t) {
  c = t;
}
function _(t, n) {
  const e = c.$(t);
  e && (e.value = n);
}
function Bn(t, n) {
  const e = c.$(t);
  e && (e.checked = !!n);
}
function An(t) {
  const n = c.$(t);
  return n ? O(n.value) : null;
}
function pt() {
  const t = R();
  _("fc-pool-bag-stso-m", t.poolStsoBagM), _("fc-pool-bag-stso-f", t.poolStsoBagF), _("fc-pool-bag-ltso-m", t.poolLtsoBagM), _("fc-pool-bag-ltso-f", t.poolLtsoBagF), _("fc-pool-bag-tso-m", t.poolTsoBagM), _("fc-pool-bag-tso-f", t.poolTsoBagF), _("fc-pool-dfo-stso-m", t.poolStsoDfoM), _("fc-pool-dfo-stso-f", t.poolStsoDfoF), _("fc-pool-dfo-ltso-m", t.poolLtsoDfoM), _("fc-pool-dfo-ltso-f", t.poolLtsoDfoF), _("fc-pool-dfo-tso-m", t.poolTsoDfoM), _("fc-pool-dfo-tso-f", t.poolTsoDfoF), _("fc-pool-dfo-pt", t.poolTsoDfoPt);
  const n = c.$("fc-bands-wrap"), e = c.$("fc-add-band");
  n && (n.style.display = ""), e && (e.style.display = "");
}
function vt() {
  const t = R();
  _("fc-phase-thr", t.phaseThresholdMin), Bn("fc-ampm-split", t.amPmSplit), _("fc-bias", t.bias || "none"), pt(), H(), z(), U && U();
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
function qn(t) {
  var n = it(t) > 0, e = kt(t) > 0;
  return t.poolBag = it(t), t.poolStsoDfo = O(t.poolStsoDfoM) + O(t.poolStsoDfoF), t.poolLtsoDfo = O(t.poolLtsoDfoM) + O(t.poolLtsoDfoF), t.poolTsoDfo = O(t.poolTsoDfoM) + O(t.poolTsoDfoF), t.mode = n && e ? "both" : n ? "bag" : e ? "dfo" : "none", t.mode;
}
function Cn(t) {
  return String(t.name || t.id || "") + " (" + (t.start || "?") + "–" + (t.end || "?") + ")";
}
function H() {
  const t = c.$("fc-bands-tbody");
  if (!t) return;
  const n = t.closest("table"), e = n && n.querySelector("thead");
  e && (e.innerHTML = "<tr><th>Shift</th><th>Start</th><th>End</th><th>STSO min</th><th>STSO max</th><th>LTSO min</th><th>LTSO max</th><th>TSO min</th><th>TSO max</th><th></th></tr>");
  const r = R(), o = c.state.shifts || [], i = at(r);
  t.innerHTML = i.map(function(s, u) {
    const a = c.getShift ? c.getShift(s) : null, f = a ? a.start : "—", l = a ? a.end : "—";
    function d(p, B) {
      var q = K(p, s, r);
      return '<td><input type="number" min="0" max="99" data-fc-req="' + u + '" data-fc-field="' + p + "-" + B + '" value="' + q[B] + '" style="width:3.5rem"></td>';
    }
    var v = o.map(function(p) {
      return '<option value="' + String(p.id).replace(/"/g, "") + '"' + (String(p.id) === String(s) ? " selected" : "") + ">" + Cn(p).replace(/</g, "<") + "</option>";
    }).join("");
    return a || (v = '<option value="' + String(s).replace(/"/g, "") + '" selected>' + String(s).replace(/</g, "<") + " (missing)</option>" + v), '<tr><td><select data-fc-req="' + u + '" data-fc-field="shiftId">' + v + '</select></td><td class="muted">' + f + '</td><td class="muted">' + l + "</td>" + d("STSO", "min") + d("STSO", "max") + d("LTSO", "min") + d("LTSO", "max") + d("TSO", "min") + d("TSO", "max") + '<td><button type="button" class="btn btn-red btn-sm" data-fc-remove="' + u + '">✕</button></td></tr>';
  }).join("");
}
function fn() {
  return H();
}
function Pn(t) {
  function n(s, u) {
    var a = An(s);
    a != null && (t[u] = a);
  }
  n("fc-pool-bag-stso-m", "poolStsoBagM"), n("fc-pool-bag-stso-f", "poolStsoBagF"), n("fc-pool-bag-ltso-m", "poolLtsoBagM"), n("fc-pool-bag-ltso-f", "poolLtsoBagF"), n("fc-pool-bag-tso-m", "poolTsoBagM"), n("fc-pool-bag-tso-f", "poolTsoBagF"), n("fc-pool-dfo-stso-m", "poolStsoDfoM"), n("fc-pool-dfo-stso-f", "poolStsoDfoF"), n("fc-pool-dfo-ltso-m", "poolLtsoDfoM"), n("fc-pool-dfo-ltso-f", "poolLtsoDfoF"), n("fc-pool-dfo-tso-m", "poolTsoDfoM"), n("fc-pool-dfo-tso-f", "poolTsoDfoF"), n("fc-pool-dfo-pt", "poolTsoDfoPt"), qn(t);
  const e = c.$("fc-phase-thr"), r = c.$("fc-ampm-split");
  e && (t.phaseThresholdMin = O(e.value || 15)), r && (t.amPmSplit = !!r.checked);
  const o = c.$("fc-bias");
  if (o) {
    var i = o.value;
    i === "male" || i === "female" || i === "none" ? t.bias = i : t.bias = "none";
  }
}
function Y() {
  const t = R();
  Pn(t);
  const n = c.$("fc-bands-tbody");
  if (!n) return t;
  const e = n.querySelectorAll('[data-fc-req][data-fc-field="shiftId"]');
  if (!e.length) return t;
  const r = [], o = {}, i = dt();
  return e.forEach(function(s) {
    var u = +s.getAttribute("data-fc-req"), a = s.value;
    !a || o[a] || (o[a] = !0, r.push(a), ["STSO", "LTSO", "TSO"].forEach(function(f) {
      var l = n.querySelector('[data-fc-req="' + u + '"][data-fc-field="' + f + '-min"]'), d = n.querySelector('[data-fc-req="' + u + '"][data-fc-field="' + f + '-max"]'), v = l ? O(l.value) : 0, p = d ? O(d.value) : v;
      p < v && (p = v), i[f][a] = { min: v, max: p };
    }));
  }), t.requirements = i, t.requirementShiftIds = r, t;
}
function un() {
  return Y();
}
function ot(t) {
  Y();
  const n = R(), e = c.state && c.state.shifts || [], r = at(n);
  var o = t;
  if (!o) {
    for (var i = 0; i < e.length; i++)
      if (r.indexOf(String(e[i].id)) < 0) {
        o = e[i].id;
        break;
      }
  }
  return o ? (o = String(o), r.indexOf(o) >= 0 || (n.requirementShiftIds = r.concat([o]), ["STSO", "LTSO", "TSO"].forEach(function(s) {
    en(s, o, 0, 0, n);
  }), H(), z()), n) : (c.updateStatus && c.updateStatus("All shifts are already listed, or no shifts are defined."), n);
}
function ln() {
  return ot();
}
function z() {
  const t = c.$("fc-preview");
  if (!t) return;
  const n = R(), e = Ct(), o = at(n).map(function(u) {
    var a = c.getShift ? c.getShift(u) : null, f = K("STSO", u, n), l = K("LTSO", u, n), d = K("TSO", u, n);
    return (a ? (a.name || u) + " " + a.start + "–" + a.end : u) + " STSO " + f.min + "–" + f.max + " LTSO " + l.min + "–" + l.max + " TSO " + d.min + "–" + d.max;
  }).join(" | ");
  var i = (n.lastDiagnostics || []).map(on).join(" · "), s = Array.isArray(n.bands) && n.bands.length ? " · " + n.bands.length + " unmapped legacy band(s) retained" : "";
  t.textContent = "BAG STSO " + n.poolStsoBagM + "/" + n.poolStsoBagF + " LTSO " + n.poolLtsoBagM + "/" + n.poolLtsoBagF + " TSO " + n.poolTsoBagM + "/" + n.poolTsoBagF + " · DFO STSO " + n.poolStsoDfoM + "/" + n.poolStsoDfoF + " LTSO " + n.poolLtsoDfoM + "/" + n.poolLtsoDfoF + " TSO " + n.poolTsoDfoM + "/" + n.poolTsoDfoF + " PT " + O(n.poolTsoDfoPt) + " · AM " + (c.slotLabel ? c.slotLabel(e.am) : "") + " PM " + (c.slotLabel ? c.slotLabel(e.pm) : "") + " " + (o || "no shift requirements") + (i ? " · " + i : "") + s;
}
function wt() {
  return [{ start: "04:00", end: "20:30", min: 1 }];
}
function X() {
  return Array.isArray(c.state.extraPositions) || (c.state.extraPositions = []), c.state.extraPositions.forEach(function(t, n) {
    t.id || (t.id = "extra-" + (n + 1)), t.name || (t.name = "Position"), t.m = O(t.m), t.f = O(t.f), (!Array.isArray(t.bands) || !t.bands.length) && (t.bands = wt());
  }), c.state.extraPositions;
}
function Q() {
  const t = X();
  return t.forEach(function(n) {
    const e = c.$('[data-extra-name="' + n.id + '"]'), r = c.$('[data-extra-m="' + n.id + '"]'), o = c.$('[data-extra-f="' + n.id + '"]');
    e && (n.name = String(e.value || n.name).trim() || n.name), r && (n.m = O(r.value)), o && (n.f = O(o.value)), Array.isArray(n.bands) || (n.bands = wt());
    for (var i = 0; i < n.bands.length; i++) {
      var s = n.bands[i] || {};
      ["start", "end", "min"].forEach(function(u) {
        var a = c.$('[data-extra-band="' + n.id + '"][data-extra-bi="' + i + '"][data-extra-bf="' + u + '"]');
        a && (u === "min" ? s[u] = O(a.value) : s[u] = a.value || s[u]);
      }), n.bands[i] = s;
    }
  }), t;
}
function U() {
  const t = c.$("extra-pos-list");
  if (!t) return;
  const n = X();
  t.innerHTML = n.map(function(e) {
    var r = (e.bands || []).map(function(o, i) {
      return '<tr><td><input type="time" data-extra-band="' + e.id + '" data-extra-bi="' + i + '" data-extra-bf="start" value="' + (o.start || "04:00") + '" step="900"></td><td><input type="time" data-extra-band="' + e.id + '" data-extra-bi="' + i + '" data-extra-bf="end" value="' + (o.end || "20:30") + '" step="900"></td><td><input type="number" min="0" max="99" data-extra-band="' + e.id + '" data-extra-bi="' + i + '" data-extra-bf="min" value="' + (o.min != null ? o.min : 0) + '" style="width:3.5rem"></td><td><button type="button" class="btn btn-red btn-sm" data-extra-band-remove="' + e.id + '" data-extra-bi="' + i + '">✕</button></td></tr>';
    }).join("");
    return '<div class="extra-pos-card" data-extra-card="' + e.id + '"><div class="fte-sex-row extra-pos-head"><label>Name <input type="text" data-extra-name="' + e.id + '" value="' + String(e.name || "").replace(/"/g, "&quot;") + '" style="width:7rem"></label><label>Male <input type="number" min="0" data-extra-m="' + e.id + '" value="' + O(e.m) + '" style="width:4.5rem"></label><label>Female <input type="number" min="0" data-extra-f="' + e.id + '" value="' + O(e.f) + '" style="width:4.5rem"></label><button type="button" class="btn btn-red btn-sm" data-extra-remove="' + e.id + '">Remove</button><button type="button" class="btn btn-sm" data-extra-add-band="' + e.id + '">+ Band</button></div><div class="lines-scroll extra-pos-bands"><table class="data-table"><thead><tr><th>Start</th><th>End</th><th>Min</th><th></th></tr></thead><tbody>' + r + "</tbody></table></div></div>";
  }).join("");
}
function dn(t) {
  Q();
  var n = X();
  n.push({ id: "extra-" + Date.now() + "-" + (n.length + 1), name: t || "MSTI", m: 0, f: 0, bands: wt() }), U();
}
function Rn() {
  var t = [], n = X(), e = c.state.shifts || [], r = e[0] || { id: "", name: "Shift", start: "04:00", end: "20:30", paid: 8, rdoHard: [] };
  return n.forEach(function(o, i) {
    var s = O(o.m) + O(o.f);
    if (!s) return;
    (!o.bands || !o.bands.length) && c.state.issues.push((o.name || "Position") + ": no coverage bands.");
    var u = 3e4 + i * 1e3, a = 0;
    function f(l, d) {
      for (var v = 0; v < d; v++) {
        for (var p = e[a % Math.max(1, e.length)] || r, B = (+p.paid || 8) >= 10 ? 4 : 5, q = 7 - B, k = Array.isArray(p.rdoHard) ? p.rdoHard.map(Number).filter(function(L) {
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
function cn() {
  var t = c.$("fc-add-band");
  if (!(c._funcCoverageBound && t && t._fcBound) && c.$("fc-bands-tbody")) {
    c._funcCoverageBound = !0, c.addFcShiftRequirement = ot, c.addFcBand = ot, c.renderFunctionShiftsTable = H, R(), X(), vt(), H(), z(), U();
    var n;
    n = c.$("btn-open-func-coverage"), n && n.addEventListener("click", function() {
      jt();
    }), n = c.$("func-coverage-close"), n && n.addEventListener("click", function() {
      mt();
    }), n = c.$("fc-cancel"), n && n.addEventListener("click", function() {
      mt();
    }), n = c.$("fc-save"), n && n.addEventListener("click", function() {
      Y(), pt(), H(), z(), c.updateStatus && c.updateStatus("Function coverage settings saved.");
    }), n = c.$("fc-add-band"), n && !n._fcBound && !n._spBound && (n._fcBound = !0, n.addEventListener("click", function(e) {
      e.preventDefault(), ot();
    })), c._funcDocBound || (c._funcDocBound = !0, document.addEventListener("click", function(e) {
      var r = e.target;
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
    }), document.addEventListener("change", function(e) {
      var r = e.target;
      r && (r.getAttribute && r.getAttribute("data-fc-req") != null || r.id && r.id.indexOf("fc-") === 0) && (Y(), r.getAttribute("data-fc-field") === "shiftId" && H(), z());
    })), n = c.$("btn-add-position"), n && !n._extraBound && (n._extraBound = !0, n.addEventListener("click", function(e) {
      e.preventDefault(), dn("MSTI");
    })), c._extraDocBound || (c._extraDocBound = !0, document.addEventListener("click", function(e) {
      var r = e.target;
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
    }), document.addEventListener("change", function(e) {
      var r = e.target;
      !r || !r.getAttribute || (r.getAttribute("data-extra-name") != null || r.getAttribute("data-extra-m") != null || r.getAttribute("data-extra-f") != null || r.getAttribute("data-extra-band") != null) && Q();
    }));
  }
}
const zn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addExtraPosition: dn,
  addFcBand: ln,
  addFcShiftRequirement: ot,
  bindBandsApi: sn,
  bindFunctionCoverageUi: cn,
  buildExtraPositionLines: Rn,
  closeFunctionCoverageModal: mt,
  ensureExtraPositions: X,
  fillFunctionCoverageForm: vt,
  openFunctionCoverageModal: jt,
  readExtraPositionsFromDom: Q,
  readFunctionBandsFromDom: un,
  readFunctionCoverageFromDom: Y,
  renderExtraPositions: U,
  renderFunctionBandsTable: fn,
  renderFunctionShiftsTable: H,
  syncFunctionModeUi: pt,
  updateFunctionCoveragePreview: z
}, Symbol.toStringTag, { value: "Module" }));
let g = null;
function gn(t) {
  g = t;
}
function tt(t, n) {
  var e = g.state.schedule[t.id] || g.state.schedule[String(t.id)];
  return e ? e[n] === "WORK" : !1;
}
function w(t) {
  return (!t.functionEligible || typeof t.functionEligible != "object") && (t.functionEligible = { dfo: !1, bag: !1, pax: !1 }), t.functionEligible;
}
function kn(t, n, e) {
  var r = g.state.lines || [];
  return r.filter(function(o) {
    if (o.isExtra || o.extraPositionId) return !1;
    var i = w(o);
    return lt(o) === t && o.sex === n && !i.bag && !i.dfo;
  });
}
function _n(t, n) {
  return t.slice().sort(function(e, r) {
    return n && n.bias === "male" && e.sex !== r.sex ? e.sex === "M" ? -1 : 1 : n && n.bias === "female" && e.sex !== r.sex ? e.sex === "F" ? -1 : 1 : ft(e) - ft(r) || String(e.id).localeCompare(String(r.id));
  });
}
function Zt(t) {
  var n = g.state.functionRotation && g.state.functionRotation[String(t)];
  if (!n) return 0;
  for (var e = 0, r = 0; r < n.length; r++) n[r] === "BAG" && e++;
  return e;
}
function In(t, n, e, r) {
  if (!e || e <= 0) return { total: 0 };
  r = r || R();
  var o = kn(t, n).slice();
  o.sort(function(u, a) {
    return ft(u) - ft(a) || String(u.id).localeCompare(String(a.id));
  });
  for (var i = 0, s = 0; s < o.length && i < e; s++)
    w(o[s]).bag = !0, i++;
  return { total: i };
}
function $n(t, n, e, r) {
  return { am: 0, pm: 0, total: 0 };
}
function qt() {
  g.renderCoverageBars && g.renderCoverageBars(), g.renderReports && g.renderReports(), typeof window < "u" && window.dispatchEvent(new CustomEvent("lines:request-render")), !g.__USE_SVELTE_LINES && g.renderLines && g.renderLines();
}
function rt(t, n, e) {
  var r = String(t);
  for (g.state.functionRotation || (g.state.functionRotation = {}), g.state.functionRotation[r] || (g.state.functionRotation[r] = []); g.state.functionRotation[r].length <= n; ) g.state.functionRotation[r].push(null);
  return g.state.functionRotation[r][n] = e, !0;
}
function mn(t, n) {
  var e = g.state.functionRotation && g.state.functionRotation[String(t)];
  if (!e) return null;
  var r = e[n];
  return r == null || r === "" ? null : r;
}
function jn(t) {
  var n = g.getShift ? g.getShift(t) : null;
  if (!n) return String(t);
  var e = n.name || t;
  return String(e).replace(":", "");
}
function wn(t, n) {
  return t.slice().sort(function(e, r) {
    var o = Zt(e.id), i = Zt(r.id);
    if (o !== i) return o - i;
    var s = _n([e, r], n);
    return s[0] !== e ? 1 : s[0] !== r && e !== r ? -1 : String(e.id).localeCompare(String(r.id));
  });
}
function St(t) {
  t = t || R();
  var n = [], e = {}, r = ["STSO", "LTSO", "TSO"];
  return r.forEach(function(o) {
    var i = t.requirements && t.requirements[o] || {};
    Object.keys(i).forEach(function(s) {
      var u = K(o, s, t);
      if (!(u.min <= 0 && u.max <= 0)) {
        e[o + "|" + s] = { min: u.min, max: u.max };
        var a = ut(o, s), f = a.filter(function(v) {
          var p = w(v);
          return p.dfo && !p.bag;
        }), l = a.length < u.min || f.length < u.min ? "SHORT" : "OK", d = g.getShift ? g.getShift(s) : null;
        n.push({
          role: o,
          shiftId: s,
          shiftLabel: jn(s),
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
  }), { diagnostics: n, configured: e };
}
function pn(t, n) {
  g.readFunctionCoverageFromDom && g.readFunctionCoverageFromDom(), t = t || R(), n = n || (g.state && g.state.weekCount ? g.state.weekCount * 7 : 7);
  var e = g.state && g.state.lines || [];
  if (!e.length)
    return g.updateStatus && g.updateStatus("Generate lines first."), { diagnostics: [], shortfalls: ["No lines generated."] };
  e.forEach(function(a) {
    if (!(a.isExtra || a.extraPositionId)) {
      var f = w(a);
      if (!f.bag && f.dfo)
        for (var l = 0; l < n; l++)
          tt(a, l) && rt(a.id, l, null);
    }
  });
  var r = ht(t, n);
  e.forEach(function(a) {
    if (!(a.isExtra || a.extraPositionId)) {
      var f = w(a);
      if (!f.bag && f.dfo)
        for (var l = 0; l < n; l++)
          tt(a, l) && (mn(a.id, l) || rt(a.id, l, "DFO"));
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
function ht(t, n) {
  t = t || R(), n = n || 0;
  for (var e = ["STSO", "LTSO", "TSO"], r = [], o = 0; o < n; o++)
    for (var i = 0; i < e.length; i++)
      for (var s = e[i], u = t.requirements && t.requirements[s] || {}, a = Object.keys(u), f = 0; f < a.length; f++) {
        var l = a[f], d = K(s, l, t);
        if (!(d.min <= 0 && d.max <= 0)) {
          var v = ut(s, l).filter(function(L) {
            var W = w(L);
            return tt(L, o) && !W.bag && W.dfo;
          });
          v = wn(v, t);
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
function vn(t) {
  t = t || {}, g.readFunctionBandsFromDom && g.readFunctionBandsFromDom();
  var n = R();
  if (g.state.issues || (g.state.issues = []), It(n, g.state.issues), g.state.functionRotation = {}, (g.state.lines || []).forEach(function(f) {
    f.isExtra || f.extraPositionId || (f.function = "", f.functionEligible = { dfo: !1, bag: !1, pax: !1 });
  }), !g.state.lines || !g.state.lines.length) {
    n.lastDiagnostics = [], qt(), !t.fromGenerate && g.updateStatus && g.updateStatus("Generate lines first.");
    return;
  }
  var e = Rt(n), r = St(n);
  n.lastDiagnostics = r.diagnostics || [];
  var o = (g.state.weekCount || 1) * 7;
  (g.state.lines || []).forEach(function(f) {
    if (w(f).bag) {
      f.function = "BAG";
      for (var l = 0; l < o; l++) tt(f, l) && rt(f.id, l, "BAG");
    }
  }), (g.state.lines || []).forEach(function(f) {
    w(f).bag || w(f).dfo && (f.function = "DFO");
  });
  var i = ht(n, o);
  i && i.length && (r.diagnostics || []).forEach(function(f) {
    for (var l = 0; l < i.length; l++)
      i[l].role !== f.role || i[l].shiftId !== f.shiftId || (f.assigned = i[l].assigned, i[l].status === "SHORT" && (f.status = "SHORT"));
  }), (g.state.lines || []).forEach(function(f) {
    if (!(f.isExtra || f.extraPositionId) && !w(f).bag) {
      if (w(f).dfo) {
        for (var l = 0; l < o; l++)
          tt(f, l) && (mn(f.id, l) || rt(f.id, l, "DFO"));
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
  var u = "BAG " + (e.bag.stso.total + e.bag.ltso.total + e.bag.tso.total) + " · DFO " + (e.stso.total + e.ltso.total + e.tso.total) + " · leftover PAX";
  s.length && (u += " · SHORT " + s.length);
  var a = g.$ && g.$("cert-assign-hint");
  return a && (a.textContent = u), !t.fromGenerate && g.updateStatus && g.updateStatus(u), !t.fromGenerate && g.closeFunctionCoverageModal && g.closeFunctionCoverageModal(), { diagnostics: r.diagnostics, shortfalls: s, poolStats: e };
}
const Un = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  applyShiftFunctionRequirements: St,
  bindAssignApi: gn,
  generateFunctionAssignments: vn,
  markBag: In,
  markDfo: $n,
  resolveBagDuties: pn,
  rotateShiftBagDuties: ht
}, Symbol.toStringTag, { value: "Module" }));
let I = null;
function Sn(t) {
  I = t;
}
function Gn(t, n) {
  var e = Jt(t.id, n);
  return e || (t.function === "BAG" || t.function === "DFO" || t.function === "PAX" ? t.function : null);
}
function Gt(t, n, e) {
  if (e = e || {}, !I || !I.state) return 0;
  var r = 0;
  return (I.state.lines || []).forEach(function(o) {
    if (o) {
      if (!e.includeExtra) {
        if (o.isExtra || o.extraPositionId) return;
      }
      typeof I.getShift == "function" && !I.getShift(o.shiftId) || e.role && lt(o) !== e.role || Qt(o, t, n) && (e.duty && Gn(o, t) !== e.duty || r++);
    }
  }), r;
}
function hn(t) {
  if (t = t || {}, !I || !I.state) return { slots: [], cells: [] };
  for (var n = I.timeToMin ? I.timeToMin(I.state.open || "03:30") : 0, e = I.timeToMin ? I.timeToMin(I.state.close || "23:00") : 24 * 60, r = Math.floor(n / 30) * 30, o = Math.ceil(e / 30) * 30, i = [], s = r; s < o; s += 30) i.push(s);
  for (var u = t.days != null ? t.days : (I.state.weekCount || 1) * 7, a = t.roles || ["STSO", "LTSO", "TSO"], f = t.duties || ["BAG", "DFO", "PAX"], l = [], d = 0; d < u; d++)
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
const Wn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  bindCoverageCalcApi: Sn,
  computeAssignedCoverage: hn,
  countAssignedAtSlot: Gt
}, Symbol.toStringTag, { value: "Module" }));
function Hn(t) {
  return t = t || (typeof window < "u" ? window.Scheduler : null), t ? (bn(t), rn(t), Yt(t), Sn(t), sn(t), gn(t), t.fteCapsByRoleSex = _t, t.ensureFunctionCoverage = R, t.getFunctionMode = an, t.syncFunctionModeUi = pt, t.fillFunctionCoverageForm = vt, t.computeShiftAnchors = Ct, t.phaseOfStart = At, t.isAmSide = Mn, t.lineStartMin = ft, t.lineRoleKey = lt, t.isOpsFunctionRole = Tn, t.lineIsDfoTagged = Fn, t.getRotationDuty = Jt, t.lineCoversSlot = Qt, t.bandForMinute = xn, t.openFunctionCoverageModal = jt, t.closeFunctionCoverageModal = mt, t.renderFunctionBandsTable = fn, t.renderFunctionShiftsTable = H, t.readFunctionBandsFromDom = un, t.readFunctionCoverageFromDom = Y, t.updateFunctionCoveragePreview = z, t.capFunctionPoolsToFte = It, t.buildCertifiedPools = Rt, t.generateFunctionAssignments = vn, t.applyShiftFunctionRequirements = St, t.rotateShiftBagDuties = ht, t.resolveBagDuties = pn, t.getConfiguredFunctionShifts = nn, t.getShiftRequirement = K, t.getEligibleLinesForShift = ut, t.addFcShiftRequirement = ot, t.addFcBand = ln, t.computeAssignedCoverage = hn, t.countAssignedAtSlot = Gt, t.migrateFunctionCoverageConfig = Pt, t.ensureExtraPositions = X, t.readExtraPositionsFromDom = Q, t.clearLineFunctions = On, t.initFunctionCoverage = Hn, cn(), t) : null;
}
export {
  dn as addExtraPosition,
  ln as addFcBand,
  ot as addFcShiftRequirement,
  St as applyShiftFunctionRequirements,
  Un as assign,
  it as bagPoolTotal,
  xn as bandForMinute,
  zn as bands,
  gn as bindAssignApi,
  sn as bindBandsApi,
  Sn as bindCoverageCalcApi,
  bn as bindDutyApi,
  cn as bindFunctionCoverageUi,
  rn as bindPoolsApi,
  Yt as bindShiftsApi,
  Rt as buildCertifiedPools,
  Rn as buildExtraPositionLines,
  It as capFunctionPoolsToFte,
  On as clearLineFunctions,
  mt as closeFunctionCoverageModal,
  hn as computeAssignedCoverage,
  Ct as computeShiftAnchors,
  Gt as countAssignedAtSlot,
  Wn as coverage,
  kt as dfoPoolTotal,
  X as ensureExtraPositions,
  R as ensureFunctionCoverage,
  vt as fillFunctionCoverageForm,
  _t as fteCapsByRoleSex,
  vn as generateFunctionAssignments,
  nn as getConfiguredFunctionShifts,
  ut as getEligibleLinesForShift,
  an as getFunctionMode,
  Jt as getRotationDuty,
  K as getShiftRequirement,
  Hn as initFunctionCoverage,
  Mn as isAmSide,
  Tn as isOpsFunctionRole,
  Qt as lineCoversSlot,
  Fn as lineIsDfoTagged,
  lt as lineRoleKey,
  ft as lineStartMin,
  In as markBag,
  $n as markDfo,
  Kn as migrate,
  Pt as migrateFunctionCoverageConfig,
  jt as openFunctionCoverageModal,
  At as phaseOfStart,
  Nn as pools,
  Q as readExtraPositionsFromDom,
  un as readFunctionBandsFromDom,
  Y as readFunctionCoverageFromDom,
  U as renderExtraPositions,
  fn as renderFunctionBandsTable,
  H as renderFunctionShiftsTable,
  pn as resolveBagDuties,
  ht as rotateShiftBagDuties,
  Xn as shifts,
  pt as syncFunctionModeUi,
  z as updateFunctionCoveragePreview
};
