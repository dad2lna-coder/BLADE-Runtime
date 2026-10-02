var yn = Object.defineProperty;
var wn = (t, e, n) => e in t ? yn(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var kt = (t, e, n) => wn(t, typeof e != "symbol" ? e + "" : e, n);
function it() {
}
function hn(t) {
  return t();
}
function Gt() {
  return /* @__PURE__ */ Object.create(null);
}
function at(t) {
  t.forEach(hn);
}
function vn(t) {
  return typeof t == "function";
}
function Dn(t, e) {
  return t != t ? e == e : t !== e || t && typeof t == "object" || typeof t == "function";
}
function Tn(t) {
  return Object.keys(t).length === 0;
}
function Xt(t) {
  return t ?? "";
}
function i(t, e) {
  t.appendChild(e);
}
function he(t, e, n) {
  t.insertBefore(e, n || null);
}
function ue(t) {
  t.parentNode && t.parentNode.removeChild(t);
}
function ct(t, e) {
  for (let n = 0; n < t.length; n += 1)
    t[n] && t[n].d(e);
}
function o(t) {
  return document.createElement(t);
}
function _e(t) {
  return document.createTextNode(t);
}
function S() {
  return _e(" ");
}
function X(t, e, n, s) {
  return t.addEventListener(e, n, s), () => t.removeEventListener(e, n, s);
}
function a(t, e, n) {
  n == null ? t.removeAttribute(e) : t.getAttribute(e) !== n && t.setAttribute(e, n);
}
function bn(t) {
  return Array.from(t.childNodes);
}
function lt(t, e) {
  e = "" + e, t.data !== e && (t.data = /** @type {string} */
  e);
}
function b(t, e) {
  t.value = e ?? "";
}
function J(t, e, n, s) {
  n == null ? t.style.removeProperty(e) : t.style.setProperty(e, n, "");
}
function H(t, e, n) {
  for (let s = 0; s < t.options.length; s += 1) {
    const r = t.options[s];
    if (r.__value === e) {
      r.selected = !0;
      return;
    }
  }
  (!n || e !== void 0) && (t.selectedIndex = -1);
}
function wt(t) {
  const e = t.querySelector(":checked");
  return e && e.__value;
}
let Ot;
function St(t) {
  Ot = t;
}
function Rn() {
  if (!Ot) throw new Error("Function called outside component initialization");
  return Ot;
}
function Cn(t) {
  Rn().$$.on_mount.push(t);
}
const Tt = [], Nt = [];
let Rt = [];
const Wt = [], Fn = /* @__PURE__ */ Promise.resolve();
let Pt = !1;
function An() {
  Pt || (Pt = !0, Fn.then(gn));
}
function et(t) {
  Rt.push(t);
}
const Vt = /* @__PURE__ */ new Set();
let Dt = 0;
function gn() {
  if (Dt !== 0)
    return;
  const t = Ot;
  do {
    try {
      for (; Dt < Tt.length; ) {
        const e = Tt[Dt];
        Dt++, St(e), Sn(e.$$);
      }
    } catch (e) {
      throw Tt.length = 0, Dt = 0, e;
    }
    for (St(null), Tt.length = 0, Dt = 0; Nt.length; ) Nt.pop()();
    for (let e = 0; e < Rt.length; e += 1) {
      const n = Rt[e];
      Vt.has(n) || (Vt.add(n), n());
    }
    Rt.length = 0;
  } while (Tt.length);
  for (; Wt.length; )
    Wt.pop()();
  Pt = !1, Vt.clear(), St(t);
}
function Sn(t) {
  if (t.fragment !== null) {
    t.update(), at(t.before_update);
    const e = t.dirty;
    t.dirty = [-1], t.fragment && t.fragment.p(t.ctx, e), t.after_update.forEach(et);
  }
}
function On(t) {
  const e = [], n = [];
  Rt.forEach((s) => t.indexOf(s) === -1 ? e.push(s) : n.push(s)), n.forEach((s) => s()), Rt = e;
}
const zn = /* @__PURE__ */ new Set();
function pn(t, e) {
  t && t.i && (zn.delete(t), t.i(e));
}
function De(t) {
  return t?.length !== void 0 ? t : Array.from(t);
}
function In(t, e) {
  t.d(1), e.delete(t.key);
}
function En(t, e, n, s, r, l, u, g, _, d, D, R) {
  let A = t.length, C = l.length, N = A;
  const G = {};
  for (; N--; ) G[t[N].key] = N;
  const L = [], k = /* @__PURE__ */ new Map(), P = /* @__PURE__ */ new Map(), h = [];
  for (N = C; N--; ) {
    const w = R(r, l, N), I = n(w);
    let M = u.get(I);
    M ? h.push(() => M.p(w, e)) : (M = d(I, w), M.c()), k.set(I, L[N] = M), I in G && P.set(I, Math.abs(N - G[I]));
  }
  const p = /* @__PURE__ */ new Set(), v = /* @__PURE__ */ new Set();
  function y(w) {
    pn(w, 1), w.m(g, D), u.set(w.key, w), D = w.first, C--;
  }
  for (; A && C; ) {
    const w = L[C - 1], I = t[A - 1], M = w.key, O = I.key;
    w === I ? (D = w.first, A--, C--) : k.has(O) ? !u.has(M) || p.has(M) ? y(w) : v.has(O) ? A-- : P.get(M) > P.get(O) ? (v.add(M), y(w)) : (p.add(O), A--) : (_(I, u), A--);
  }
  for (; A--; ) {
    const w = t[A];
    k.has(w.key) || _(w, u);
  }
  for (; C; ) y(L[C - 1]);
  return at(h), L;
}
function Ln(t, e, n) {
  const { fragment: s, after_update: r } = t.$$;
  s && s.m(e, n), et(() => {
    const l = t.$$.on_mount.map(hn).filter(vn);
    t.$$.on_destroy ? t.$$.on_destroy.push(...l) : at(l), t.$$.on_mount = [];
  }), r.forEach(et);
}
function Bn(t, e) {
  const n = t.$$;
  n.fragment !== null && (On(n.after_update), at(n.on_destroy), n.fragment && n.fragment.d(e), n.on_destroy = n.fragment = null, n.ctx = []);
}
function kn(t, e) {
  t.$$.dirty[0] === -1 && (Tt.push(t), An(), t.$$.dirty.fill(0)), t.$$.dirty[e / 31 | 0] |= 1 << e % 31;
}
function Vn(t, e, n, s, r, l, u = null, g = [-1]) {
  const _ = Ot;
  St(t);
  const d = t.$$ = {
    fragment: null,
    ctx: [],
    // state
    props: l,
    update: it,
    not_equal: r,
    bound: Gt(),
    // lifecycle
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(e.context || (_ ? _.$$.context : [])),
    // everything else
    callbacks: Gt(),
    dirty: g,
    skip_bound: !1,
    root: e.target || _.$$.root
  };
  u && u(d.root);
  let D = !1;
  if (d.ctx = n ? n(t, e.props || {}, (R, A, ...C) => {
    const N = C.length ? C[0] : A;
    return d.ctx && r(d.ctx[R], d.ctx[R] = N) && (!d.skip_bound && d.bound[R] && d.bound[R](N), D && kn(t, R)), A;
  }) : [], d.update(), D = !0, at(d.before_update), d.fragment = s ? s(d.ctx) : !1, e.target) {
    if (e.hydrate) {
      const R = bn(e.target);
      d.fragment && d.fragment.l(R), R.forEach(ue);
    } else
      d.fragment && d.fragment.c();
    e.intro && pn(t.$$.fragment), Ln(t, e.target, e.anchor), gn();
  }
  St(_);
}
class Nn {
  constructor() {
    /**
     * ### PRIVATE API
     *
     * Do not use, may change at any time
     *
     * @type {any}
     */
    kt(this, "$$");
    /**
     * ### PRIVATE API
     *
     * Do not use, may change at any time
     *
     * @type {any}
     */
    kt(this, "$$set");
  }
  /** @returns {void} */
  $destroy() {
    Bn(this, 1), this.$destroy = it;
  }
  /**
   * @template {Extract<keyof Events, string>} K
   * @param {K} type
   * @param {((e: Events[K]) => void) | null | undefined} callback
   * @returns {() => void}
   */
  $on(e, n) {
    if (!vn(n))
      return it;
    const s = this.$$.callbacks[e] || (this.$$.callbacks[e] = []);
    return s.push(n), () => {
      const r = s.indexOf(n);
      r !== -1 && s.splice(r, 1);
    };
  }
  /**
   * @param {Partial<Props>} props
   * @returns {void}
   */
  $set(e) {
    this.$$set && !Tn(e) && (this.$$.skip_bound = !0, this.$$set(e), this.$$.skip_bound = !1);
  }
}
const Pn = "4";
typeof window < "u" && (window.__svelte || (window.__svelte = { v: /* @__PURE__ */ new Set() })).v.add(Pn);
function Ht() {
  return {
    rdo: "#000000",
    bag: "#F4B4B4",
    dfo: "#FFF3A8",
    pax: "#A0C4FF",
    training: "#D8B4F8",
    header: "#1F4E79"
  };
}
function Mn(t, e) {
  if (!t) return e;
  var n = String(t).replace("#", "").trim();
  return n.length === 3 && (n = n[0] + n[0] + n[1] + n[1] + n[2] + n[2]), n.length !== 6 || /[^0-9a-fA-F]/.test(n) ? e : "#" + n.toUpperCase();
}
function Gn(t) {
  var e = Mn(t, "#FFFFFF") || "#FFFFFF", n = e.slice(1), s = parseInt(n.slice(0, 2), 16), r = parseInt(n.slice(2, 4), 16), l = parseInt(n.slice(4, 6), 16), u = (0.299 * s + 0.587 * r + 0.114 * l) / 255;
  return u < 0.45 ? "#FFFFFF" : "#111111";
}
function Kt(t, e, n) {
  const s = t.slice();
  return s[67] = e[n], s;
}
function Ut(t, e, n) {
  const s = t.slice();
  return s[70] = e[n], s;
}
function jt(t, e, n) {
  const s = t.slice();
  return s[73] = e[n], s;
}
function qt(t, e, n) {
  const s = t.slice();
  return s[76] = e[n], s;
}
function Yt(t, e, n) {
  const s = t.slice();
  return s[79] = e[n], s;
}
function Jt(t, e, n) {
  const s = t.slice();
  return s[82] = e[n], s;
}
function Qt(t, e, n) {
  const s = t.slice();
  return s[79] = e[n], s;
}
function Zt(t, e, n) {
  const s = t.slice();
  return s[82] = e[n], s;
}
function Xn(t) {
  let e;
  return {
    c() {
      e = o("div"), e.textContent = "Classic Lines mode active", a(e, "class", "muted");
    },
    m(n, s) {
      he(n, e, s);
    },
    p: it,
    d(n) {
      n && ue(e);
    }
  };
}
function Wn(t) {
  let e, n, s, r, l, u, g, _, d, D, R, A, C, N, G, L, k, P, h, p, v, y, w, I, M, O, W, V, te, Te, q, ne, j, Ve, je, fe, de, U, le, be, ie, Le, Q, ve, ge, pe, qe, He, st, ae, Y, me, ye, Be, ce, we, Ke, F, Ue, Ye, x, Ne, Re, Pe, Me, ot, Je, Qe, f, z, $, ke, Ze, _t, rt, ht, xe, ut, tt, ft, nt, Ct, Ge, se, vt, zt, Xe, oe, gt, It, pt, $e, ee, Et, We, re, mt, Lt, Se, Ft, Oe = [], ze = /* @__PURE__ */ new Map(), m, B, c, Z = De(
    /*teamOptions*/
    t[9]
  ), Ce = [];
  for (let T = 0; T < Z.length; T += 1)
    Ce[T] = xt(Zt(t, Z, T));
  let yt = De(
    /*shiftOptions*/
    t[8]
  ), Fe = [];
  for (let T = 0; T < yt.length; T += 1)
    Fe[T] = $t(Qt(t, yt, T));
  let Ie = (
    /*offsetY*/
    t[13] > 0 && en(t)
  ), dt = De(
    /*visibleRows*/
    t[14]
  );
  const Mt = (T) => (
    /*row*/
    T[67].id
  );
  for (let T = 0; T < dt.length; T += 1) {
    let K = Kt(t, dt, T), E = Mt(K);
    ze.set(E, Oe[T] = un(E, K));
  }
  let Ae = null;
  dt.length || (Ae = tn());
  let Ee = (
    /*paddingBottom*/
    t[12] > 0 && fn(t)
  );
  return {
    c() {
      e = o("div"), n = o("div"), s = o("label"), r = _e(`Search
          `), l = o("input"), u = S(), g = o("label"), _ = _e(`Role
          `), d = o("select"), D = o("option"), D.textContent = "All", R = o("option"), R.textContent = "STSO", A = o("option"), A.textContent = "LTSO", C = o("option"), C.textContent = "TSO (FT/PT)", N = S(), G = o("label"), L = _e(`Team
          `), k = o("select"), P = o("option"), P.textContent = "All", h = o("option"), h.textContent = "Unassigned";
      for (let T = 0; T < Ce.length; T += 1)
        Ce[T].c();
      p = S(), v = o("label"), y = _e(`Shift
          `), w = o("select"), I = o("option"), I.textContent = "All shifts";
      for (let T = 0; T < Fe.length; T += 1)
        Fe[T].c();
      M = S(), O = o("label"), W = _e(`Duty
          `), V = o("select"), te = o("option"), te.textContent = "All duties", Te = o("option"), Te.textContent = "BAG", q = o("option"), q.textContent = "PAX", ne = o("option"), ne.textContent = "DFO", j = o("option"), j.textContent = "TRAINING", Ve = o("option"), Ve.textContent = "OFF / RDO", je = S(), fe = o("label"), de = _e(`On Day
          `), U = o("select"), le = o("option"), le.textContent = "Any day", be = o("option"), be.textContent = "Sun", ie = o("option"), ie.textContent = "Mon", Le = o("option"), Le.textContent = "Tue", Q = o("option"), Q.textContent = "Wed", ve = o("option"), ve.textContent = "Thu", ge = o("option"), ge.textContent = "Fri", pe = o("option"), pe.textContent = "Sat", qe = S(), He = o("label"), st = _e(`Sex
          `), ae = o("select"), Y = o("option"), Y.textContent = "All", me = o("option"), me.textContent = "M", ye = o("option"), ye.textContent = "F", Be = S(), ce = o("div"), we = o("table"), Ke = o("thead"), F = o("tr"), Ue = o("th"), Ue.textContent = `Team${/*sortIndicator*/
      t[23]("team")}`, Ye = S(), x = o("th"), x.textContent = `Line${/*sortIndicator*/
      t[23]("line")}`, Ne = S(), Re = o("th"), Re.textContent = `Shift${/*sortIndicator*/
      t[23]("shift")}`, Pe = S(), Me = o("th"), Me.textContent = `Start${/*sortIndicator*/
      t[23]("start")}`, ot = S(), Je = o("th"), Je.textContent = "End", Qe = S(), f = o("th"), f.textContent = `Position${/*sortIndicator*/
      t[23]("role")}`, z = S(), $ = o("th"), $.textContent = "Emp", ke = S(), Ze = o("th"), Ze.textContent = "Sex", _t = S(), rt = o("th"), rt.textContent = "Duty", ht = S(), xe = o("th"), xe.textContent = "Cert", ut = S(), tt = o("th"), tt.textContent = "RDOs", ft = S(), nt = o("th"), nt.textContent = "Paid", Ct = S(), Ge = o("th"), Ge.textContent = "Sun", se = S(), vt = o("th"), vt.textContent = "Mon", zt = S(), Xe = o("th"), Xe.textContent = "Tue", oe = S(), gt = o("th"), gt.textContent = "Wed", It = S(), pt = o("th"), pt.textContent = "Thu", $e = S(), ee = o("th"), ee.textContent = "Fri", Et = S(), We = o("th"), We.textContent = "Sat", re = S(), mt = o("th"), mt.textContent = "Hrs", Lt = S(), Se = o("tbody"), Ie && Ie.c(), Ft = S();
      for (let T = 0; T < Oe.length; T += 1)
        Oe[T].c();
      Ae && Ae.c(), m = S(), Ee && Ee.c(), a(l, "type", "text"), a(l, "class", "filter-input search-input svelte-a7gd0z"), a(l, "placeholder", "Search line code..."), a(s, "class", "svelte-a7gd0z"), D.__value = "ALL", b(D, D.__value), R.__value = "STSO", b(R, R.__value), A.__value = "LTSO", b(A, A.__value), C.__value = "TSO", b(C, C.__value), a(d, "class", "filter-select svelte-a7gd0z"), /*filterRole*/
      t[0] === void 0 && et(() => (
        /*select0_change_handler*/
        t[41].call(d)
      )), a(g, "class", "svelte-a7gd0z"), P.__value = "", b(P, P.__value), h.__value = "__none__", b(h, h.__value), a(k, "class", "filter-select svelte-a7gd0z"), /*filterTeam*/
      t[2] === void 0 && et(() => (
        /*select1_change_handler*/
        t[42].call(k)
      )), a(G, "class", "svelte-a7gd0z"), I.__value = "", b(I, I.__value), a(w, "class", "filter-select svelte-a7gd0z"), /*filterShift*/
      t[1] === void 0 && et(() => (
        /*select2_change_handler*/
        t[43].call(w)
      )), a(v, "class", "svelte-a7gd0z"), te.__value = "", b(te, te.__value), Te.__value = "BAG", b(Te, Te.__value), q.__value = "PAX", b(q, q.__value), ne.__value = "DFO", b(ne, ne.__value), j.__value = "TRAINING", b(j, j.__value), Ve.__value = "OFF", b(Ve, Ve.__value), a(V, "class", "filter-select svelte-a7gd0z"), /*filterDuty*/
      t[4] === void 0 && et(() => (
        /*select3_change_handler*/
        t[44].call(V)
      )), a(O, "class", "svelte-a7gd0z"), le.__value = "", b(le, le.__value), be.__value = "0", b(be, be.__value), ie.__value = "1", b(ie, ie.__value), Le.__value = "2", b(Le, Le.__value), Q.__value = "3", b(Q, Q.__value), ve.__value = "4", b(ve, ve.__value), ge.__value = "5", b(ge, ge.__value), pe.__value = "6", b(pe, pe.__value), a(U, "class", "filter-select svelte-a7gd0z"), /*filterDay*/
      t[5] === void 0 && et(() => (
        /*select4_change_handler*/
        t[45].call(U)
      )), a(fe, "class", "svelte-a7gd0z"), Y.__value = "", b(Y, Y.__value), me.__value = "M", b(me, me.__value), ye.__value = "F", b(ye, ye.__value), a(ae, "class", "filter-select svelte-a7gd0z"), /*filterSex*/
      t[3] === void 0 && et(() => (
        /*select5_change_handler*/
        t[46].call(ae)
      )), a(He, "class", "svelte-a7gd0z"), a(n, "class", "filter-controls svelte-a7gd0z"), a(e, "class", "lines-table-header-controls svelte-a7gd0z"), a(Ue, "class", "sortable col-team svelte-a7gd0z"), a(x, "class", "sortable col-line svelte-a7gd0z"), a(Re, "class", "sortable col-shift svelte-a7gd0z"), a(Me, "class", "sortable col-time svelte-a7gd0z"), a(Je, "class", "col-time svelte-a7gd0z"), a(f, "class", "sortable col-pos svelte-a7gd0z"), a($, "class", "col-sm svelte-a7gd0z"), a(Ze, "class", "col-sm svelte-a7gd0z"), a(rt, "class", "col-duty svelte-a7gd0z"), a(xe, "class", "col-sm svelte-a7gd0z"), a(tt, "class", "col-rdos svelte-a7gd0z"), a(nt, "class", "col-sm svelte-a7gd0z"), a(Ge, "class", "col-day svelte-a7gd0z"), a(vt, "class", "col-day svelte-a7gd0z"), a(Xe, "class", "col-day svelte-a7gd0z"), a(gt, "class", "col-day svelte-a7gd0z"), a(pt, "class", "col-day svelte-a7gd0z"), a(ee, "class", "col-day svelte-a7gd0z"), a(We, "class", "col-day svelte-a7gd0z"), a(mt, "class", "col-sm svelte-a7gd0z"), a(F, "class", "svelte-a7gd0z"), a(we, "class", "data-table lines-editable svelte-a7gd0z"), a(ce, "class", "lines-virtual-root svelte-a7gd0z");
    },
    m(T, K) {
      he(T, e, K), i(e, n), i(n, s), i(s, r), i(s, l), b(
        l,
        /*searchCode*/
        t[6]
      ), i(n, u), i(n, g), i(g, _), i(g, d), i(d, D), i(d, R), i(d, A), i(d, C), H(
        d,
        /*filterRole*/
        t[0],
        !0
      ), i(n, N), i(n, G), i(G, L), i(G, k), i(k, P), i(k, h);
      for (let E = 0; E < Ce.length; E += 1)
        Ce[E] && Ce[E].m(k, null);
      H(
        k,
        /*filterTeam*/
        t[2],
        !0
      ), i(n, p), i(n, v), i(v, y), i(v, w), i(w, I);
      for (let E = 0; E < Fe.length; E += 1)
        Fe[E] && Fe[E].m(w, null);
      H(
        w,
        /*filterShift*/
        t[1],
        !0
      ), i(n, M), i(n, O), i(O, W), i(O, V), i(V, te), i(V, Te), i(V, q), i(V, ne), i(V, j), i(V, Ve), H(
        V,
        /*filterDuty*/
        t[4],
        !0
      ), i(n, je), i(n, fe), i(fe, de), i(fe, U), i(U, le), i(U, be), i(U, ie), i(U, Le), i(U, Q), i(U, ve), i(U, ge), i(U, pe), H(
        U,
        /*filterDay*/
        t[5],
        !0
      ), i(n, qe), i(n, He), i(He, st), i(He, ae), i(ae, Y), i(ae, me), i(ae, ye), H(
        ae,
        /*filterSex*/
        t[3],
        !0
      ), he(T, Be, K), he(T, ce, K), i(ce, we), i(we, Ke), i(Ke, F), i(F, Ue), i(F, Ye), i(F, x), i(F, Ne), i(F, Re), i(F, Pe), i(F, Me), i(F, ot), i(F, Je), i(F, Qe), i(F, f), i(F, z), i(F, $), i(F, ke), i(F, Ze), i(F, _t), i(F, rt), i(F, ht), i(F, xe), i(F, ut), i(F, tt), i(F, ft), i(F, nt), i(F, Ct), i(F, Ge), i(F, se), i(F, vt), i(F, zt), i(F, Xe), i(F, oe), i(F, gt), i(F, It), i(F, pt), i(F, $e), i(F, ee), i(F, Et), i(F, We), i(F, re), i(F, mt), i(we, Lt), i(we, Se), Ie && Ie.m(Se, null), i(Se, Ft);
      for (let E = 0; E < Oe.length; E += 1)
        Oe[E] && Oe[E].m(Se, null);
      Ae && Ae.m(Se, null), i(Se, m), Ee && Ee.m(Se, null), t[65](ce), B || (c = [
        X(
          l,
          "input",
          /*input_input_handler*/
          t[40]
        ),
        X(
          l,
          "input",
          /*handleFilterChange*/
          t[22]
        ),
        X(
          d,
          "change",
          /*select0_change_handler*/
          t[41]
        ),
        X(
          d,
          "change",
          /*handleFilterChange*/
          t[22]
        ),
        X(
          k,
          "change",
          /*select1_change_handler*/
          t[42]
        ),
        X(
          k,
          "change",
          /*handleFilterChange*/
          t[22]
        ),
        X(
          w,
          "change",
          /*select2_change_handler*/
          t[43]
        ),
        X(
          w,
          "change",
          /*handleFilterChange*/
          t[22]
        ),
        X(
          V,
          "change",
          /*select3_change_handler*/
          t[44]
        ),
        X(
          V,
          "change",
          /*handleFilterChange*/
          t[22]
        ),
        X(
          U,
          "change",
          /*select4_change_handler*/
          t[45]
        ),
        X(
          U,
          "change",
          /*handleFilterChange*/
          t[22]
        ),
        X(
          ae,
          "change",
          /*select5_change_handler*/
          t[46]
        ),
        X(
          ae,
          "change",
          /*handleFilterChange*/
          t[22]
        ),
        X(
          Ue,
          "click",
          /*click_handler*/
          t[47]
        ),
        X(
          x,
          "click",
          /*click_handler_1*/
          t[48]
        ),
        X(
          Re,
          "click",
          /*click_handler_2*/
          t[49]
        ),
        X(
          Me,
          "click",
          /*click_handler_3*/
          t[50]
        ),
        X(
          f,
          "click",
          /*click_handler_4*/
          t[51]
        ),
        X(
          ce,
          "scroll",
          /*handleScroll*/
          t[24]
        )
      ], B = !0);
    },
    p(T, K) {
      if (K[0] & /*searchCode*/
      64 && l.value !== /*searchCode*/
      T[6] && b(
        l,
        /*searchCode*/
        T[6]
      ), K[0] & /*filterRole*/
      1 && H(
        d,
        /*filterRole*/
        T[0]
      ), K[0] & /*teamOptions*/
      512) {
        Z = De(
          /*teamOptions*/
          T[9]
        );
        let E;
        for (E = 0; E < Z.length; E += 1) {
          const At = Zt(T, Z, E);
          Ce[E] ? Ce[E].p(At, K) : (Ce[E] = xt(At), Ce[E].c(), Ce[E].m(k, null));
        }
        for (; E < Ce.length; E += 1)
          Ce[E].d(1);
        Ce.length = Z.length;
      }
      if (K[0] & /*filterTeam, teamOptions*/
      516 && H(
        k,
        /*filterTeam*/
        T[2]
      ), K[0] & /*shiftOptions*/
      256) {
        yt = De(
          /*shiftOptions*/
          T[8]
        );
        let E;
        for (E = 0; E < yt.length; E += 1) {
          const At = Qt(T, yt, E);
          Fe[E] ? Fe[E].p(At, K) : (Fe[E] = $t(At), Fe[E].c(), Fe[E].m(w, null));
        }
        for (; E < Fe.length; E += 1)
          Fe[E].d(1);
        Fe.length = yt.length;
      }
      K[0] & /*filterShift, shiftOptions*/
      258 && H(
        w,
        /*filterShift*/
        T[1]
      ), K[0] & /*filterDuty*/
      16 && H(
        V,
        /*filterDuty*/
        T[4]
      ), K[0] & /*filterDay*/
      32 && H(
        U,
        /*filterDay*/
        T[5]
      ), K[0] & /*filterSex*/
      8 && H(
        ae,
        /*filterSex*/
        T[3]
      ), /*offsetY*/
      T[13] > 0 ? Ie ? Ie.p(T, K) : (Ie = en(T), Ie.c(), Ie.m(Se, Ft)) : Ie && (Ie.d(1), Ie = null), K[0] & /*visibleRows, dayStyle, emitDayTime, emitDayDuty, emitEdit, BASE_EMPS, BASE_POSITIONS, shiftOptions, teamOptions*/
      2081536 && (dt = De(
        /*visibleRows*/
        T[14]
      ), Oe = En(Oe, K, Mt, 1, T, dt, ze, Se, In, un, m, Kt), !dt.length && Ae ? Ae.p(T, K) : dt.length ? Ae && (Ae.d(1), Ae = null) : (Ae = tn(), Ae.c(), Ae.m(Se, m))), /*paddingBottom*/
      T[12] > 0 ? Ee ? Ee.p(T, K) : (Ee = fn(T), Ee.c(), Ee.m(Se, null)) : Ee && (Ee.d(1), Ee = null);
    },
    d(T) {
      T && (ue(e), ue(Be), ue(ce)), ct(Ce, T), ct(Fe, T), Ie && Ie.d();
      for (let K = 0; K < Oe.length; K += 1)
        Oe[K].d();
      Ae && Ae.d(), Ee && Ee.d(), t[65](null), B = !1, at(c);
    }
  };
}
function xt(t) {
  let e, n = (
    /*team*/
    (t[82].name ?? /*team*/
    t[82].id) + ""
  ), s, r;
  return {
    c() {
      e = o("option"), s = _e(n), e.__value = r = /*team*/
      t[82].id, b(e, e.__value);
    },
    m(l, u) {
      he(l, e, u), i(e, s);
    },
    p(l, u) {
      u[0] & /*teamOptions*/
      512 && n !== (n = /*team*/
      (l[82].name ?? /*team*/
      l[82].id) + "") && lt(s, n), u[0] & /*teamOptions*/
      512 && r !== (r = /*team*/
      l[82].id) && (e.__value = r, b(e, e.__value));
    },
    d(l) {
      l && ue(e);
    }
  };
}
function $t(t) {
  let e, n = Bt(
    /*shift*/
    t[79]
  ) + "", s, r;
  return {
    c() {
      e = o("option"), s = _e(n), e.__value = r = /*shift*/
      t[79].id, b(e, e.__value);
    },
    m(l, u) {
      he(l, e, u), i(e, s);
    },
    p(l, u) {
      u[0] & /*shiftOptions*/
      256 && n !== (n = Bt(
        /*shift*/
        l[79]
      ) + "") && lt(s, n), u[0] & /*shiftOptions*/
      256 && r !== (r = /*shift*/
      l[79].id) && (e.__value = r, b(e, e.__value));
    },
    d(l) {
      l && ue(e);
    }
  };
}
function en(t) {
  let e, n;
  return {
    c() {
      e = o("tr"), n = o("td"), a(n, "colspan", "20"), a(n, "class", "spacer-cell svelte-a7gd0z"), J(
        n,
        "height",
        /*offsetY*/
        t[13] + "px"
      ), a(e, "class", "spacer-row svelte-a7gd0z"), J(
        e,
        "height",
        /*offsetY*/
        t[13] + "px"
      );
    },
    m(s, r) {
      he(s, e, r), i(e, n);
    },
    p(s, r) {
      r[0] & /*offsetY*/
      8192 && J(
        n,
        "height",
        /*offsetY*/
        s[13] + "px"
      ), r[0] & /*offsetY*/
      8192 && J(
        e,
        "height",
        /*offsetY*/
        s[13] + "px"
      );
    },
    d(s) {
      s && ue(e);
    }
  };
}
function tn(t) {
  let e;
  return {
    c() {
      e = o("tr"), e.innerHTML = '<td colspan="20" class="muted svelte-a7gd0z" style="padding: 1.5rem; text-align: center;">No matching lines found.</td>', a(e, "class", "svelte-a7gd0z");
    },
    m(n, s) {
      he(n, e, s);
    },
    p: it,
    d(n) {
      n && ue(e);
    }
  };
}
function nn(t) {
  let e, n = (
    /*team*/
    (t[82].name ?? /*team*/
    t[82].id) + ""
  ), s, r;
  return {
    c() {
      e = o("option"), s = _e(n), e.__value = r = /*team*/
      t[82].id, b(e, e.__value), a(e, "class", "svelte-a7gd0z");
    },
    m(l, u) {
      he(l, e, u), i(e, s);
    },
    p(l, u) {
      u[0] & /*teamOptions*/
      512 && n !== (n = /*team*/
      (l[82].name ?? /*team*/
      l[82].id) + "") && lt(s, n), u[0] & /*teamOptions*/
      512 && r !== (r = /*team*/
      l[82].id) && (e.__value = r, b(e, e.__value));
    },
    d(l) {
      l && ue(e);
    }
  };
}
function ln(t) {
  let e, n = Bt(
    /*shift*/
    t[79]
  ) + "", s, r;
  return {
    c() {
      e = o("option"), s = _e(n), e.__value = r = /*shift*/
      t[79].id, b(e, e.__value), a(e, "class", "svelte-a7gd0z");
    },
    m(l, u) {
      he(l, e, u), i(e, s);
    },
    p(l, u) {
      u[0] & /*shiftOptions*/
      256 && n !== (n = Bt(
        /*shift*/
        l[79]
      ) + "") && lt(s, n), u[0] & /*shiftOptions*/
      256 && r !== (r = /*shift*/
      l[79].id) && (e.__value = r, b(e, e.__value));
    },
    d(l) {
      l && ue(e);
    }
  };
}
function an(t) {
  let e, n = (
    /*pos*/
    t[76] + ""
  ), s, r;
  return {
    c() {
      e = o("option"), s = _e(n), e.__value = r = /*pos*/
      t[76], b(e, e.__value), a(e, "class", "svelte-a7gd0z");
    },
    m(l, u) {
      he(l, e, u), i(e, s);
    },
    p(l, u) {
      u[0] & /*visibleRows*/
      16384 && n !== (n = /*pos*/
      l[76] + "") && lt(s, n), u[0] & /*visibleRows, teamOptions*/
      16896 && r !== (r = /*pos*/
      l[76]) && (e.__value = r, b(e, e.__value));
    },
    d(l) {
      l && ue(e);
    }
  };
}
function sn(t) {
  let e, n = (
    /*emp*/
    t[73] + ""
  ), s;
  return {
    c() {
      e = o("option"), s = _e(n), e.__value = /*emp*/
      t[73], b(e, e.__value), a(e, "class", "svelte-a7gd0z");
    },
    m(r, l) {
      he(r, e, l), i(e, s);
    },
    p: it,
    d(r) {
      r && ue(e);
    }
  };
}
function on(t) {
  let e, n, s, r, l, u, g, _, d, D;
  function R(...C) {
    return (
      /*change_handler_11*/
      t[63](
        /*row*/
        t[67],
        /*i*/
        t[70],
        ...C
      )
    );
  }
  function A(...C) {
    return (
      /*change_handler_12*/
      t[64](
        /*row*/
        t[67],
        /*i*/
        t[70],
        ...C
      )
    );
  }
  return {
    c() {
      e = o("div"), n = o("input"), r = S(), l = o("span"), l.textContent = "–", u = S(), g = o("input"), a(n, "type", "time"), a(n, "class", "day-time-input svelte-a7gd0z"), n.value = s = /*row*/
      t[67]?.dayStarts?.[
        /*i*/
        t[70]
      ] || /*row*/
      t[67]?.start || "", a(l, "class", "day-time-sep svelte-a7gd0z"), a(g, "type", "time"), a(g, "class", "day-time-input svelte-a7gd0z"), g.value = _ = /*row*/
      t[67]?.dayEnds?.[
        /*i*/
        t[70]
      ] || /*row*/
      t[67]?.end || "", a(e, "class", "day-times-wrap svelte-a7gd0z");
    },
    m(C, N) {
      he(C, e, N), i(e, n), i(e, r), i(e, l), i(e, u), i(e, g), d || (D = [
        X(n, "change", R),
        X(g, "change", A)
      ], d = !0);
    },
    p(C, N) {
      t = C, N[0] & /*visibleRows, teamOptions*/
      16896 && s !== (s = /*row*/
      t[67]?.dayStarts?.[
        /*i*/
        t[70]
      ] || /*row*/
      t[67]?.start || "") && n.value !== s && (n.value = s), N[0] & /*visibleRows, teamOptions*/
      16896 && _ !== (_ = /*row*/
      t[67]?.dayEnds?.[
        /*i*/
        t[70]
      ] || /*row*/
      t[67]?.end || "") && g.value !== _ && (g.value = _);
    },
    d(C) {
      C && ue(e), d = !1, at(D);
    }
  };
}
function rn(t) {
  let e, n, s, r, l, u, g, _, d, D, R, A, C, N;
  function G(...k) {
    return (
      /*change_handler_10*/
      t[62](
        /*row*/
        t[67],
        /*i*/
        t[70],
        ...k
      )
    );
  }
  let L = (
    /*row*/
    t[67]?.dayDuties?.[
      /*i*/
      t[70]
    ] !== "OFF" && /*row*/
    t[67]?.days?.[
      /*i*/
      t[70]
    ] !== "RDO" && on(t)
  );
  return {
    c() {
      e = o("td"), n = o("div"), s = o("select"), r = o("option"), r.textContent = "PAX", l = o("option"), l.textContent = "BAG", u = o("option"), u.textContent = "DFO", g = o("option"), g.textContent = "Training", _ = o("option"), _.textContent = "OFF", D = S(), L && L.c(), r.__value = "PAX", b(r, r.__value), a(r, "class", "svelte-a7gd0z"), l.__value = "BAG", b(l, l.__value), a(l, "class", "svelte-a7gd0z"), u.__value = "DFO", b(u, u.__value), a(u, "class", "svelte-a7gd0z"), g.__value = "TRAINING", b(g, g.__value), a(g, "class", "svelte-a7gd0z"), _.__value = "OFF", b(_, _.__value), a(_, "class", "svelte-a7gd0z"), a(s, "class", "day-duty-select svelte-a7gd0z"), a(n, "class", "day-cell-inner svelte-a7gd0z"), a(e, "class", R = Xt(_n(
        /*row*/
        t[67]?.dayDuties?.[
          /*i*/
          t[70]
        ] ?? /*row*/
        t[67]?.days?.[
          /*i*/
          t[70]
        ]
      )) + " svelte-a7gd0z"), a(e, "style", A = /*dayStyle*/
      t[17](
        /*row*/
        t[67]?.dayDuties?.[
          /*i*/
          t[70]
        ] ?? /*row*/
        t[67]?.days?.[
          /*i*/
          t[70]
        ]
      ));
    },
    m(k, P) {
      he(k, e, P), i(e, n), i(n, s), i(s, r), i(s, l), i(s, u), i(s, g), i(s, _), H(
        s,
        /*row*/
        t[67]?.dayDuties?.[
          /*i*/
          t[70]
        ] === "OFF" || /*row*/
        t[67]?.days?.[
          /*i*/
          t[70]
        ] === "RDO" ? "OFF" : (
          /*row*/
          t[67]?.dayDuties?.[
            /*i*/
            t[70]
          ] || "PAX"
        )
      ), i(n, D), L && L.m(n, null), C || (N = X(s, "change", G), C = !0);
    },
    p(k, P) {
      t = k, P[0] & /*visibleRows, teamOptions*/
      16896 && d !== (d = /*row*/
      t[67]?.dayDuties?.[
        /*i*/
        t[70]
      ] === "OFF" || /*row*/
      t[67]?.days?.[
        /*i*/
        t[70]
      ] === "RDO" ? "OFF" : (
        /*row*/
        t[67]?.dayDuties?.[
          /*i*/
          t[70]
        ] || "PAX"
      )) && H(
        s,
        /*row*/
        t[67]?.dayDuties?.[
          /*i*/
          t[70]
        ] === "OFF" || /*row*/
        t[67]?.days?.[
          /*i*/
          t[70]
        ] === "RDO" ? "OFF" : (
          /*row*/
          t[67]?.dayDuties?.[
            /*i*/
            t[70]
          ] || "PAX"
        )
      ), /*row*/
      t[67]?.dayDuties?.[
        /*i*/
        t[70]
      ] !== "OFF" && /*row*/
      t[67]?.days?.[
        /*i*/
        t[70]
      ] !== "RDO" ? L ? L.p(t, P) : (L = on(t), L.c(), L.m(n, null)) : L && (L.d(1), L = null), P[0] & /*visibleRows, teamOptions*/
      16896 && R !== (R = Xt(_n(
        /*row*/
        t[67]?.dayDuties?.[
          /*i*/
          t[70]
        ] ?? /*row*/
        t[67]?.days?.[
          /*i*/
          t[70]
        ]
      )) + " svelte-a7gd0z") && a(e, "class", R), P[0] & /*visibleRows, teamOptions*/
      16896 && A !== (A = /*dayStyle*/
      t[17](
        /*row*/
        t[67]?.dayDuties?.[
          /*i*/
          t[70]
        ] ?? /*row*/
        t[67]?.days?.[
          /*i*/
          t[70]
        ]
      )) && a(e, "style", A);
    },
    d(k) {
      k && ue(e), L && L.d(), C = !1, N();
    }
  };
}
function un(t, e) {
  let n, s, r, l, u, g, _, d, D, R, A, C, N, G, L, k, P, h, p, v, y, w, I, M, O, W, V, te, Te, q, ne, j, Ve, je, fe, de, U, le, be, ie, Le, Q, ve, ge, pe, qe, He, st, ae, Y, me, ye, Be, ce, we, Ke, F, Ue, Ye, x, Ne, Re, Pe, Me, ot, Je, Qe, f = (
    /*row*/
    (e[67]?.rdos ?? "—") + ""
  ), z, $, ke, Ze = (
    /*row*/
    (e[67]?.paid ?? "") + ""
  ), _t, rt, ht, xe, ut = (
    /*row*/
    (e[67]?.hours ?? "") + ""
  ), tt, ft, nt, Ct, Ge = De(
    /*teamOptions*/
    e[9]
  ), se = [];
  for (let m = 0; m < Ge.length; m += 1)
    se[m] = nn(Jt(e, Ge, m));
  function vt(...m) {
    return (
      /*change_handler*/
      e[52](
        /*row*/
        e[67],
        ...m
      )
    );
  }
  function zt(...m) {
    return (
      /*change_handler_1*/
      e[53](
        /*row*/
        e[67],
        ...m
      )
    );
  }
  let Xe = De(
    /*shiftOptions*/
    e[8]
  ), oe = [];
  for (let m = 0; m < Xe.length; m += 1)
    oe[m] = ln(Yt(e, Xe, m));
  function gt(...m) {
    return (
      /*change_handler_2*/
      e[54](
        /*row*/
        e[67],
        ...m
      )
    );
  }
  function It(...m) {
    return (
      /*change_handler_3*/
      e[55](
        /*row*/
        e[67],
        ...m
      )
    );
  }
  function pt(...m) {
    return (
      /*change_handler_4*/
      e[56](
        /*row*/
        e[67],
        ...m
      )
    );
  }
  let $e = De(cn(
    /*BASE_POSITIONS*/
    e[15],
    /*row*/
    e[67]?.position
  )), ee = [];
  for (let m = 0; m < $e.length; m += 1)
    ee[m] = an(qt(e, $e, m));
  function Et(...m) {
    return (
      /*change_handler_5*/
      e[57](
        /*row*/
        e[67],
        ...m
      )
    );
  }
  let We = De(
    /*BASE_EMPS*/
    e[16]
  ), re = [];
  for (let m = 0; m < We.length; m += 1)
    re[m] = sn(jt(e, We, m));
  function mt(...m) {
    return (
      /*change_handler_6*/
      e[58](
        /*row*/
        e[67],
        ...m
      )
    );
  }
  function Lt(...m) {
    return (
      /*change_handler_7*/
      e[59](
        /*row*/
        e[67],
        ...m
      )
    );
  }
  function Se(...m) {
    return (
      /*change_handler_8*/
      e[60](
        /*row*/
        e[67],
        ...m
      )
    );
  }
  function Ft(...m) {
    return (
      /*change_handler_9*/
      e[61](
        /*row*/
        e[67],
        ...m
      )
    );
  }
  let Oe = De([0, 1, 2, 3, 4, 5, 6]), ze = [];
  for (let m = 0; m < 7; m += 1)
    ze[m] = rn(Ut(e, Oe, m));
  return {
    key: t,
    first: null,
    c() {
      n = o("tr"), s = o("td"), r = o("select"), l = o("option"), l.textContent = "—";
      for (let m = 0; m < se.length; m += 1)
        se[m].c();
      _ = S(), d = o("td"), D = o("input"), C = S(), N = o("td"), G = o("select"), L = o("option"), L.textContent = "—";
      for (let m = 0; m < oe.length; m += 1)
        oe[m].c();
      h = S(), p = o("td"), v = o("input"), I = S(), M = o("td"), O = o("input"), te = S(), Te = o("td"), q = o("select"), ne = o("option"), ne.textContent = "—";
      for (let m = 0; m < ee.length; m += 1)
        ee[m].c();
      je = S(), fe = o("td"), de = o("select"), U = o("option"), U.textContent = "—";
      for (let m = 0; m < re.length; m += 1)
        re[m].c();
      ie = S(), Le = o("td"), Q = o("select"), ve = o("option"), ve.textContent = "—", ge = o("option"), ge.textContent = "M", pe = o("option"), pe.textContent = "F", st = S(), ae = o("td"), Y = o("select"), me = o("option"), me.textContent = "—", ye = o("option"), ye.textContent = "DFO", Be = o("option"), Be.textContent = "BAG", ce = o("option"), ce.textContent = "PAX", we = o("option"), we.textContent = "TRAINING", Ue = S(), Ye = o("td"), x = o("select"), Ne = o("option"), Ne.textContent = "—", Re = o("option"), Re.textContent = "A", Pe = o("option"), Pe.textContent = "B", Je = S(), Qe = o("td"), z = _e(f), $ = S(), ke = o("td"), _t = _e(Ze), rt = S();
      for (let m = 0; m < 7; m += 1)
        ze[m].c();
      ht = S(), xe = o("td"), tt = _e(ut), l.__value = "", b(l, l.__value), a(l, "class", "svelte-a7gd0z"), a(r, "class", "line-edit svelte-a7gd0z"), a(r, "data-field", "team"), a(r, "data-line-id", u = /*row*/
      e[67]?.id), a(s, "class", "svelte-a7gd0z"), a(D, "type", "text"), a(D, "class", "line-edit line-code-input svelte-a7gd0z"), a(D, "data-field", "lineCode"), a(D, "data-line-id", R = /*row*/
      e[67]?.id), D.value = A = /*row*/
      e[67]?.line ?? "", a(d, "class", "svelte-a7gd0z"), L.__value = "", b(L, L.__value), a(L, "class", "svelte-a7gd0z"), a(G, "class", "line-edit svelte-a7gd0z"), a(G, "data-field", "shift"), a(G, "data-line-id", k = /*row*/
      e[67]?.id), a(N, "class", "svelte-a7gd0z"), a(v, "type", "time"), a(v, "class", "line-edit line-time-input svelte-a7gd0z"), a(v, "data-field", "start"), a(v, "data-line-id", y = /*row*/
      e[67]?.id), v.value = w = /*row*/
      e[67]?.start ?? "", a(p, "class", "svelte-a7gd0z"), a(O, "type", "time"), a(O, "class", "line-edit line-time-input svelte-a7gd0z"), a(O, "data-field", "end"), a(O, "data-line-id", W = /*row*/
      e[67]?.id), O.value = V = /*row*/
      e[67]?.end ?? "", a(M, "class", "svelte-a7gd0z"), ne.__value = "", b(ne, ne.__value), a(ne, "class", "svelte-a7gd0z"), a(q, "class", "line-edit svelte-a7gd0z"), a(q, "data-field", "position"), a(q, "data-line-id", j = /*row*/
      e[67]?.id), a(Te, "class", "svelte-a7gd0z"), U.__value = "", b(U, U.__value), a(U, "class", "svelte-a7gd0z"), a(de, "class", "line-edit svelte-a7gd0z"), a(de, "data-field", "emp"), a(de, "data-line-id", le = /*row*/
      e[67]?.id), a(fe, "class", "svelte-a7gd0z"), ve.__value = "", b(ve, ve.__value), a(ve, "class", "svelte-a7gd0z"), ge.__value = "M", b(ge, ge.__value), a(ge, "class", "svelte-a7gd0z"), pe.__value = "F", b(pe, pe.__value), a(pe, "class", "svelte-a7gd0z"), a(Q, "class", "line-edit svelte-a7gd0z"), a(Q, "data-field", "sex"), a(Q, "data-line-id", qe = /*row*/
      e[67]?.id), a(Le, "class", "svelte-a7gd0z"), me.__value = "", b(me, me.__value), a(me, "class", "svelte-a7gd0z"), ye.__value = "DFO", b(ye, ye.__value), a(ye, "class", "svelte-a7gd0z"), Be.__value = "BAG", b(Be, Be.__value), a(Be, "class", "svelte-a7gd0z"), ce.__value = "PAX", b(ce, ce.__value), a(ce, "class", "svelte-a7gd0z"), we.__value = "TRAINING", b(we, we.__value), a(we, "class", "svelte-a7gd0z"), a(Y, "class", "line-edit svelte-a7gd0z"), a(Y, "data-field", "function"), a(Y, "data-line-id", Ke = /*row*/
      e[67]?.id), a(ae, "class", "svelte-a7gd0z"), Ne.__value = "", b(Ne, Ne.__value), a(Ne, "class", "svelte-a7gd0z"), Re.__value = "A", b(Re, Re.__value), a(Re, "class", "svelte-a7gd0z"), Pe.__value = "B", b(Pe, Pe.__value), a(Pe, "class", "svelte-a7gd0z"), a(x, "class", "line-edit svelte-a7gd0z"), a(x, "data-field", "certPool"), a(x, "data-line-id", Me = /*row*/
      e[67]?.id), a(Ye, "class", "svelte-a7gd0z"), a(Qe, "class", "line-rdo-cell svelte-a7gd0z"), a(ke, "class", "line-center svelte-a7gd0z"), a(xe, "class", "line-hours svelte-a7gd0z"), a(n, "data-line-row", ft = /*row*/
      e[67]?.id), J(n, "height", bt + "px"), a(n, "class", "svelte-a7gd0z"), this.first = n;
    },
    m(m, B) {
      he(m, n, B), i(n, s), i(s, r), i(r, l);
      for (let c = 0; c < se.length; c += 1)
        se[c] && se[c].m(r, null);
      H(
        r,
        /*row*/
        e[67]?.teamId ?? ""
      ), i(n, _), i(n, d), i(d, D), i(n, C), i(n, N), i(N, G), i(G, L);
      for (let c = 0; c < oe.length; c += 1)
        oe[c] && oe[c].m(G, null);
      H(
        G,
        /*row*/
        e[67]?.shiftId ?? ""
      ), i(n, h), i(n, p), i(p, v), i(n, I), i(n, M), i(M, O), i(n, te), i(n, Te), i(Te, q), i(q, ne);
      for (let c = 0; c < ee.length; c += 1)
        ee[c] && ee[c].m(q, null);
      H(
        q,
        /*row*/
        e[67]?.position ?? ""
      ), i(n, je), i(n, fe), i(fe, de), i(de, U);
      for (let c = 0; c < re.length; c += 1)
        re[c] && re[c].m(de, null);
      H(
        de,
        /*row*/
        e[67]?.emp ?? ""
      ), i(n, ie), i(n, Le), i(Le, Q), i(Q, ve), i(Q, ge), i(Q, pe), H(
        Q,
        /*row*/
        e[67]?.sex ?? ""
      ), i(n, st), i(n, ae), i(ae, Y), i(Y, me), i(Y, ye), i(Y, Be), i(Y, ce), i(Y, we), H(
        Y,
        /*row*/
        e[67]?.function ?? ""
      ), i(n, Ue), i(n, Ye), i(Ye, x), i(x, Ne), i(x, Re), i(x, Pe), H(
        x,
        /*row*/
        e[67]?.certPool ?? ""
      ), i(n, Je), i(n, Qe), i(Qe, z), i(n, $), i(n, ke), i(ke, _t), i(n, rt);
      for (let c = 0; c < 7; c += 1)
        ze[c] && ze[c].m(n, null);
      i(n, ht), i(n, xe), i(xe, tt), nt || (Ct = [
        X(r, "change", vt),
        X(D, "change", zt),
        X(G, "change", gt),
        X(v, "change", It),
        X(O, "change", pt),
        X(q, "change", Et),
        X(de, "change", mt),
        X(Q, "change", Lt),
        X(Y, "change", Se),
        X(x, "change", Ft)
      ], nt = !0);
    },
    p(m, B) {
      if (e = m, B[0] & /*teamOptions*/
      512) {
        Ge = De(
          /*teamOptions*/
          e[9]
        );
        let c;
        for (c = 0; c < Ge.length; c += 1) {
          const Z = Jt(e, Ge, c);
          se[c] ? se[c].p(Z, B) : (se[c] = nn(Z), se[c].c(), se[c].m(r, null));
        }
        for (; c < se.length; c += 1)
          se[c].d(1);
        se.length = Ge.length;
      }
      if (B[0] & /*visibleRows, teamOptions*/
      16896 && u !== (u = /*row*/
      e[67]?.id) && a(r, "data-line-id", u), B[0] & /*visibleRows, teamOptions*/
      16896 && g !== (g = /*row*/
      e[67]?.teamId ?? "") && H(
        r,
        /*row*/
        e[67]?.teamId ?? ""
      ), B[0] & /*visibleRows, teamOptions*/
      16896 && R !== (R = /*row*/
      e[67]?.id) && a(D, "data-line-id", R), B[0] & /*visibleRows, teamOptions*/
      16896 && A !== (A = /*row*/
      e[67]?.line ?? "") && D.value !== A && (D.value = A), B[0] & /*shiftOptions*/
      256) {
        Xe = De(
          /*shiftOptions*/
          e[8]
        );
        let c;
        for (c = 0; c < Xe.length; c += 1) {
          const Z = Yt(e, Xe, c);
          oe[c] ? oe[c].p(Z, B) : (oe[c] = ln(Z), oe[c].c(), oe[c].m(G, null));
        }
        for (; c < oe.length; c += 1)
          oe[c].d(1);
        oe.length = Xe.length;
      }
      if (B[0] & /*visibleRows, teamOptions*/
      16896 && k !== (k = /*row*/
      e[67]?.id) && a(G, "data-line-id", k), B[0] & /*visibleRows, teamOptions*/
      16896 && P !== (P = /*row*/
      e[67]?.shiftId ?? "") && H(
        G,
        /*row*/
        e[67]?.shiftId ?? ""
      ), B[0] & /*visibleRows, teamOptions*/
      16896 && y !== (y = /*row*/
      e[67]?.id) && a(v, "data-line-id", y), B[0] & /*visibleRows, teamOptions*/
      16896 && w !== (w = /*row*/
      e[67]?.start ?? "") && v.value !== w && (v.value = w), B[0] & /*visibleRows, teamOptions*/
      16896 && W !== (W = /*row*/
      e[67]?.id) && a(O, "data-line-id", W), B[0] & /*visibleRows, teamOptions*/
      16896 && V !== (V = /*row*/
      e[67]?.end ?? "") && O.value !== V && (O.value = V), B[0] & /*BASE_POSITIONS, visibleRows*/
      49152) {
        $e = De(cn(
          /*BASE_POSITIONS*/
          e[15],
          /*row*/
          e[67]?.position
        ));
        let c;
        for (c = 0; c < $e.length; c += 1) {
          const Z = qt(e, $e, c);
          ee[c] ? ee[c].p(Z, B) : (ee[c] = an(Z), ee[c].c(), ee[c].m(q, null));
        }
        for (; c < ee.length; c += 1)
          ee[c].d(1);
        ee.length = $e.length;
      }
      if (B[0] & /*visibleRows, teamOptions*/
      16896 && j !== (j = /*row*/
      e[67]?.id) && a(q, "data-line-id", j), B[0] & /*visibleRows, teamOptions*/
      16896 && Ve !== (Ve = /*row*/
      e[67]?.position ?? "") && H(
        q,
        /*row*/
        e[67]?.position ?? ""
      ), B[0] & /*BASE_EMPS*/
      65536) {
        We = De(
          /*BASE_EMPS*/
          e[16]
        );
        let c;
        for (c = 0; c < We.length; c += 1) {
          const Z = jt(e, We, c);
          re[c] ? re[c].p(Z, B) : (re[c] = sn(Z), re[c].c(), re[c].m(de, null));
        }
        for (; c < re.length; c += 1)
          re[c].d(1);
        re.length = We.length;
      }
      if (B[0] & /*visibleRows, teamOptions*/
      16896 && le !== (le = /*row*/
      e[67]?.id) && a(de, "data-line-id", le), B[0] & /*visibleRows, teamOptions*/
      16896 && be !== (be = /*row*/
      e[67]?.emp ?? "") && H(
        de,
        /*row*/
        e[67]?.emp ?? ""
      ), B[0] & /*visibleRows, teamOptions*/
      16896 && qe !== (qe = /*row*/
      e[67]?.id) && a(Q, "data-line-id", qe), B[0] & /*visibleRows, teamOptions*/
      16896 && He !== (He = /*row*/
      e[67]?.sex ?? "") && H(
        Q,
        /*row*/
        e[67]?.sex ?? ""
      ), B[0] & /*visibleRows, teamOptions*/
      16896 && Ke !== (Ke = /*row*/
      e[67]?.id) && a(Y, "data-line-id", Ke), B[0] & /*visibleRows, teamOptions*/
      16896 && F !== (F = /*row*/
      e[67]?.function ?? "") && H(
        Y,
        /*row*/
        e[67]?.function ?? ""
      ), B[0] & /*visibleRows, teamOptions*/
      16896 && Me !== (Me = /*row*/
      e[67]?.id) && a(x, "data-line-id", Me), B[0] & /*visibleRows, teamOptions*/
      16896 && ot !== (ot = /*row*/
      e[67]?.certPool ?? "") && H(
        x,
        /*row*/
        e[67]?.certPool ?? ""
      ), B[0] & /*visibleRows*/
      16384 && f !== (f = /*row*/
      (e[67]?.rdos ?? "—") + "") && lt(z, f), B[0] & /*visibleRows*/
      16384 && Ze !== (Ze = /*row*/
      (e[67]?.paid ?? "") + "") && lt(_t, Ze), B[0] & /*visibleRows, dayStyle, emitDayTime, emitDayDuty*/
      1720320) {
        Oe = De([0, 1, 2, 3, 4, 5, 6]);
        let c;
        for (c = 0; c < 7; c += 1) {
          const Z = Ut(e, Oe, c);
          ze[c] ? ze[c].p(Z, B) : (ze[c] = rn(Z), ze[c].c(), ze[c].m(n, ht));
        }
        for (; c < 7; c += 1)
          ze[c].d(1);
      }
      B[0] & /*visibleRows*/
      16384 && ut !== (ut = /*row*/
      (e[67]?.hours ?? "") + "") && lt(tt, ut), B[0] & /*visibleRows, teamOptions*/
      16896 && ft !== (ft = /*row*/
      e[67]?.id) && a(n, "data-line-row", ft);
    },
    d(m) {
      m && ue(n), ct(se, m), ct(oe, m), ct(ee, m), ct(re, m), ct(ze, m), nt = !1, at(Ct);
    }
  };
}
function fn(t) {
  let e, n;
  return {
    c() {
      e = o("tr"), n = o("td"), a(n, "colspan", "20"), a(n, "class", "spacer-cell svelte-a7gd0z"), J(
        n,
        "height",
        /*paddingBottom*/
        t[12] + "px"
      ), a(e, "class", "spacer-row svelte-a7gd0z"), J(
        e,
        "height",
        /*paddingBottom*/
        t[12] + "px"
      );
    },
    m(s, r) {
      he(s, e, r), i(e, n);
    },
    p(s, r) {
      r[0] & /*paddingBottom*/
      4096 && J(
        n,
        "height",
        /*paddingBottom*/
        s[12] + "px"
      ), r[0] & /*paddingBottom*/
      4096 && J(
        e,
        "height",
        /*paddingBottom*/
        s[12] + "px"
      );
    },
    d(s) {
      s && ue(e);
    }
  };
}
function Hn(t) {
  let e;
  function n(l, u) {
    return (
      /*mode*/
      l[7] === "svelte" ? Wn : Xn
    );
  }
  let s = n(t), r = s(t);
  return {
    c() {
      e = o("div"), r.c(), a(e, "class", "lines-table-root svelte-a7gd0z"), J(e, "min-height", "min(70vh, 720px)"), J(e, "height", "min(70vh, 720px)"), J(e, "width", "100%"), J(
        e,
        "--export-rdo",
        /*exportStyle*/
        t[10]?.rdo || "#000000"
      ), J(
        e,
        "--export-bag",
        /*exportStyle*/
        t[10]?.bag || "#F4B4B4"
      ), J(
        e,
        "--export-dfo",
        /*exportStyle*/
        t[10]?.dfo || "#FFF3A8"
      ), J(
        e,
        "--export-pax",
        /*exportStyle*/
        t[10]?.pax || "#A0C4FF"
      ), J(
        e,
        "--export-header",
        /*exportStyle*/
        t[10]?.header || "#1F4E79"
      );
    },
    m(l, u) {
      he(l, e, u), r.m(e, null);
    },
    p(l, u) {
      s === (s = n(l)) && r ? r.p(l, u) : (r.d(1), r = s(l), r && (r.c(), r.m(e, null))), u[0] & /*exportStyle*/
      1024 && J(
        e,
        "--export-rdo",
        /*exportStyle*/
        l[10]?.rdo || "#000000"
      ), u[0] & /*exportStyle*/
      1024 && J(
        e,
        "--export-bag",
        /*exportStyle*/
        l[10]?.bag || "#F4B4B4"
      ), u[0] & /*exportStyle*/
      1024 && J(
        e,
        "--export-dfo",
        /*exportStyle*/
        l[10]?.dfo || "#FFF3A8"
      ), u[0] & /*exportStyle*/
      1024 && J(
        e,
        "--export-pax",
        /*exportStyle*/
        l[10]?.pax || "#A0C4FF"
      ), u[0] & /*exportStyle*/
      1024 && J(
        e,
        "--export-header",
        /*exportStyle*/
        l[10]?.header || "#1F4E79"
      );
    },
    i: it,
    o: it,
    d(l) {
      l && ue(e), r.d();
    }
  };
}
const bt = 42, dn = 8;
function cn(t, e) {
  const n = e == null ? "" : String(e);
  return !n || t.indexOf(n) >= 0 ? t : t.concat([n]);
}
function Bt(t) {
  if (!t) return "";
  const e = t.name || t.id || "";
  if (t.segments && Array.isArray(t.segments) && t.segments.length === 2) {
    const n = t.segments[0].start + "–" + t.segments[0].end + " / " + t.segments[1].start + "–" + t.segments[1].end;
    return (e ? e + " " : "") + "(" + n + ")";
  }
  return t.start && t.end ? (e ? e + " " : "") + "(" + t.start + "–" + t.end + ")" : t.start ? e ? e + " " + t.start : t.start : e;
}
function mn(t) {
  const e = String(t || "").toUpperCase();
  return e === "RDO" || e === "—" || e === "-" || e === "OFF" ? "rdo" : e === "BAG" || e === "BAGS" ? "bag" : e === "DFO" ? "dfo" : e === "PAX" ? "pax" : e === "TRAINING" ? "training" : null;
}
function _n(t) {
  const e = mn(t);
  return e === "rdo" ? "cell-day-col cell-rdo" : e === "bag" ? "cell-day-col cell-function-duty cell-bag" : e === "dfo" ? "cell-day-col cell-function-duty cell-dfo" : e === "pax" ? "cell-day-col cell-function-duty cell-pax" : e === "training" ? "cell-day-col cell-function-duty cell-training" : "cell-day-col cell-work";
}
function Kn(t, e, n) {
  let s, r, l, u, g, _, d, { rows: D = [] } = e, { mode: R = "svelte" } = e, { shiftOptions: A = [] } = e, { teamOptions: C = [] } = e, { exportStyle: N = Ht() } = e, { onInlineEdit: G = null } = e, { onDayToggle: L = null } = e, { onDayDutyEdit: k = null } = e, { onDayTimeEdit: P = null } = e, { onSort: h = null } = e, { onFilter: p = null } = e, { currentSortBy: v = "role" } = e, { currentSortDir: y = "asc" } = e, { filterRole: w = "ALL" } = e, { filterShift: I = "" } = e, { filterTeam: M = "" } = e, { filterSex: O = "" } = e, { filterDuty: W = "" } = e, { filterDay: V = "" } = e, { searchCode: te = "" } = e;
  const Te = ["TSO", "LTSO", "STSO"], q = ["FT", "PT"];
  function ne(f) {
    const z = mn(f);
    if (!z) return;
    const ke = (N || Ht())[z];
    if (ke)
      return "background:" + ke + ";color:" + Gn(ke) + ";";
  }
  function j(f, z, $) {
    G?.({ lineId: f, field: z, value: $ });
  }
  function Ve(f, z, $) {
    k?.({ lineId: f, dayIndex: z, duty: $ });
  }
  function je(f, z, $, ke) {
    P?.({ lineId: f, dayIndex: z, field: $, value: ke });
  }
  function fe(f) {
    let z = "asc";
    v === f && (z = y === "asc" ? "desc" : "asc"), h?.({ sortBy: f, sortDir: z });
  }
  function de() {
    p?.({
      filterRole: w,
      filterShift: I,
      filterTeam: M,
      filterSex: O,
      filterDuty: W,
      filterDay: V,
      searchCode: te
    });
  }
  function U(f) {
    return v !== f ? "" : y === "asc" ? " ▲" : " ▼";
  }
  let le = 0, be = 600, ie;
  function Le(f) {
    n(34, le = f.target.scrollTop);
  }
  Cn(() => {
    ie && n(35, be = ie.clientHeight || 600);
  });
  function Q() {
    te = this.value, n(6, te);
  }
  function ve() {
    w = wt(this), n(0, w);
  }
  function ge() {
    M = wt(this), n(2, M), n(9, C);
  }
  function pe() {
    I = wt(this), n(1, I), n(8, A);
  }
  function qe() {
    W = wt(this), n(4, W);
  }
  function He() {
    V = wt(this), n(5, V);
  }
  function st() {
    O = wt(this), n(3, O);
  }
  const ae = () => fe("team"), Y = () => fe("line"), me = () => fe("shift"), ye = () => fe("start"), Be = () => fe("role"), ce = (f, z) => j(f?.id, "team", z.target.value), we = (f, z) => j(f?.id, "lineCode", z.target.value), Ke = (f, z) => j(f?.id, "shift", z.target.value), F = (f, z) => j(f?.id, "start", z.target.value), Ue = (f, z) => j(f?.id, "end", z.target.value), Ye = (f, z) => j(f?.id, "position", z.target.value), x = (f, z) => j(f?.id, "emp", z.target.value), Ne = (f, z) => j(f?.id, "sex", z.target.value), Re = (f, z) => j(f?.id, "function", z.target.value), Pe = (f, z) => j(f?.id, "certPool", z.target.value), Me = (f, z, $) => Ve(f?.id, z, $.target.value), ot = (f, z, $) => je(f?.id, z, "start", $.target.value), Je = (f, z, $) => je(f?.id, z, "end", $.target.value);
  function Qe(f) {
    Nt[f ? "unshift" : "push"](() => {
      ie = f, n(11, ie), n(37, r), n(34, le), n(35, be), n(39, s), n(25, D);
    });
  }
  return t.$$set = (f) => {
    "rows" in f && n(25, D = f.rows), "mode" in f && n(7, R = f.mode), "shiftOptions" in f && n(8, A = f.shiftOptions), "teamOptions" in f && n(9, C = f.teamOptions), "exportStyle" in f && n(10, N = f.exportStyle), "onInlineEdit" in f && n(26, G = f.onInlineEdit), "onDayToggle" in f && n(27, L = f.onDayToggle), "onDayDutyEdit" in f && n(28, k = f.onDayDutyEdit), "onDayTimeEdit" in f && n(29, P = f.onDayTimeEdit), "onSort" in f && n(30, h = f.onSort), "onFilter" in f && n(31, p = f.onFilter), "currentSortBy" in f && n(32, v = f.currentSortBy), "currentSortDir" in f && n(33, y = f.currentSortDir), "filterRole" in f && n(0, w = f.filterRole), "filterShift" in f && n(1, I = f.filterShift), "filterTeam" in f && n(2, M = f.filterTeam), "filterSex" in f && n(3, O = f.filterSex), "filterDuty" in f && n(4, W = f.filterDuty), "filterDay" in f && n(5, V = f.filterDay), "searchCode" in f && n(6, te = f.searchCode);
  }, t.$$.update = () => {
    t.$$.dirty[0] & /*rows*/
    33554432 && n(39, s = D.length), t.$$.dirty[1] & /*totalRows*/
    256 && n(37, r = s * bt), t.$$.dirty[0] & /*scrollContainer*/
    2048 | t.$$.dirty[1] & /*totalHeight, scrollTop, viewportHeight*/
    88 && ie && r >= 0 && le > r && (n(11, ie.scrollTop = Math.max(0, r - be), ie), n(34, le = ie.scrollTop)), t.$$.dirty[1] & /*scrollTop*/
    8 && n(38, l = Math.max(0, Math.floor(le / bt) - dn)), t.$$.dirty[1] & /*totalRows, scrollTop, viewportHeight*/
    280 && n(36, u = Math.min(s, Math.ceil((le + be) / bt) + dn)), t.$$.dirty[0] & /*rows*/
    33554432 | t.$$.dirty[1] & /*startIndex, endIndex*/
    160 && n(14, g = D.slice(l, u)), t.$$.dirty[1] & /*startIndex*/
    128 && n(13, _ = l * bt), t.$$.dirty[1] & /*totalHeight, endIndex*/
    96 && n(12, d = Math.max(0, r - u * bt));
  }, [
    w,
    I,
    M,
    O,
    W,
    V,
    te,
    R,
    A,
    C,
    N,
    ie,
    d,
    _,
    g,
    Te,
    q,
    ne,
    j,
    Ve,
    je,
    fe,
    de,
    U,
    Le,
    D,
    G,
    L,
    k,
    P,
    h,
    p,
    v,
    y,
    le,
    be,
    u,
    r,
    l,
    s,
    Q,
    ve,
    ge,
    pe,
    qe,
    He,
    st,
    ae,
    Y,
    me,
    ye,
    Be,
    ce,
    we,
    Ke,
    F,
    Ue,
    Ye,
    x,
    Ne,
    Re,
    Pe,
    Me,
    ot,
    Je,
    Qe
  ];
}
class Un extends Nn {
  constructor(e) {
    super(), Vn(
      this,
      e,
      Kn,
      Hn,
      Dn,
      {
        rows: 25,
        mode: 7,
        shiftOptions: 8,
        teamOptions: 9,
        exportStyle: 10,
        onInlineEdit: 26,
        onDayToggle: 27,
        onDayDutyEdit: 28,
        onDayTimeEdit: 29,
        onSort: 30,
        onFilter: 31,
        currentSortBy: 32,
        currentSortDir: 33,
        filterRole: 0,
        filterShift: 1,
        filterTeam: 2,
        filterSex: 3,
        filterDuty: 4,
        filterDay: 5,
        searchCode: 6
      },
      null,
      [-1, -1, -1]
    );
  }
}
function jn(t) {
  if (t = t || window.Scheduler, !t) return;
  function e(l) {
    var u = String(l || "").trim();
    if (!u) return "";
    var g = u.match(/^(\d+)$/);
    return g && Number(g[1]) < 10 ? "0" + g[1] : u;
  }
  function n(l, u) {
    var g = (l.rdoDays || []).map(Number).filter(function(d) {
      return Number.isInteger(d) && d >= 0 && d <= 6;
    }), _ = g.length ? g.map(function(d) {
      return u && u[d] != null ? u[d] : String(d);
    }).join(",") : "—";
    return l.rdoHard && (_ += " (hard)"), _;
  }
  function s(l, u, g) {
    return g || "WORK";
  }
  function r(l, u) {
    return u === "TRAINING" ? "TRAINING" : u === "BAG" || u === "PAX" || u === "DFO" ? u : l.isTraining || l.trainingClass || l.empClass === "ESTI" || l.empClass === "MSTI" || l.extraName === "ESTI" || l.extraName === "MSTI" ? "TRAINING" : l.function === "BAG" ? "BAG" : l.function === "DFO" || l.function === "PAX" ? "PAX" : u === "BAG" || u === "PAX" ? u : null;
  }
  t.lineToRowModel = function(l, u, g) {
    if (g = g || {}, !l || !u) return null;
    for (var _ = g.dayNames || ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], d = typeof g.teamResolver == "function" ? g.teamResolver(l.id) : null, D = typeof g.shiftResolver == "function" ? g.shiftResolver(l.shiftId) : null, R = l.shiftName || D && D.name || "", A = l.startTime || (D && D.start ? D.start : ""), C = l.endTime || (D && D.end ? D.end : ""), N = D && D.segments && D.segments.length === 2 ? D.segments[0].start + "–" + D.segments[0].end + " / " + D.segments[1].start + "–" + D.segments[1].end : A && C ? A + "–" + C : A || "WORK", G = l.shiftLabel || N, L = !!(l.isExtra || l.extraPositionId), k = L ? l.position || l.extraName || "TSO" : l.isStso || l.empClass === "STSO" ? "STSO" : l.isLtso || l.empClass === "LTSO" ? "LTSO" : "TSO", P = L ? l.empClass === "PT" ? "PT" : "FT" : k === "STSO" || k === "LTSO" ? "FT" : l.empClass === "PT" ? "PT" : "FT", h = l.paid || 0, p = Array.isArray(u) ? u : u[l.id] || u[String(l.id)] || [], v = [], y = [], w = [], I = [], M = 0, O = 0; O < 7; O++) {
      var W = l.dayTimes && l.dayTimes[String(O)], V = typeof g.effectiveTimesResolver == "function" ? g.effectiveTimesResolver(l.shiftId, O) : null, te = W && W.start || l.startTime || V && V.start || A, Te = W && W.end || l.endTime || V && V.end || C;
      w.push(te), I.push(Te);
      var q = p[O];
      if (q === "WORK") {
        M += h;
        var ne = typeof g.rotationDutyResolver == "function" ? g.rotationDutyResolver(l.id, O) : null, j = s(l, ne, G);
        v.push(j), y.push(r(l, ne) || "PAX");
      } else
        v.push("RDO"), y.push("OFF");
    }
    return {
      id: l.id,
      teamId: d && d.id || "",
      shiftId: l.shiftId || "",
      team: e(d && (d.name || d.id) || ""),
      line: l.lineCode || "",
      shift: R,
      start: A,
      end: C,
      position: k,
      emp: P,
      sex: l.sex === "F" || l.sex === "M" ? l.sex : "",
      function: l.function || "",
      certPool: l.certPool || "",
      rdos: n(l, _),
      paid: h,
      days: v,
      dayDuties: y,
      dayStarts: w,
      dayEnds: I,
      hours: M
    };
  }, t.getRowModels = function(l, u, g) {
    return !Array.isArray(l) || !u || typeof u != "object" ? [] : l.map(function(_) {
      return t.lineToRowModel(_, u, g);
    }).filter(Boolean);
  }, t.getLineRowModels = function(l) {
    var u = t.state && Array.isArray(t.state.lines) ? t.state.lines : [], g = t.state && t.state.schedule || {}, _ = Object.assign({}, l || {});
    return !_.teamResolver && typeof t.teamMetaForLine == "function" && (_.teamResolver = t.teamMetaForLine), !_.shiftResolver && typeof t.getShift == "function" && (_.shiftResolver = t.getShift), !_.rotationDutyResolver && typeof t.getRotationDuty == "function" && (_.rotationDutyResolver = t.getRotationDuty), !_.effectiveTimesResolver && typeof t.getEffectiveShiftTimes == "function" && (_.effectiveTimesResolver = t.getEffectiveShiftTimes), t.getRowModels(u, g, _);
  };
}
function qn(t) {
  if (t = t || window.Scheduler, !t) return;
  function e(g, _) {
    var d = t.getRotationDuty ? t.getRotationDuty(g.id, _) : null;
    return d || g.function || null;
  }
  t.dutyFor = e;
  function n(g) {
    if (g.shiftLabel) return g.shiftLabel;
    var _ = t.getShift ? t.getShift(g.shiftId) : null;
    return _ && _.start && _.end ? _.start + "–" + _.end : _ && _.start ? _.start : "WORK";
  }
  function s(g) {
    if (!(!g || g.function !== "BAG")) {
      t.state.functionRotation || (t.state.functionRotation = {});
      var _ = String(g.id);
      t.state.functionRotation[_] || (t.state.functionRotation[_] = []);
      for (var d = t.state.schedule && (t.state.schedule[g.id] || t.state.schedule[_]) || [], D = Math.max(d.length, (t.state.weekCount || 1) * 7), R = 0; R < D; R++) {
        for (; t.state.functionRotation[_].length <= R; ) t.state.functionRotation[_].push(null);
        d[R] === "WORK" && (t.state.functionRotation[_][R] = "BAG");
      }
    }
  }
  function r(g) {
    if (!(!g || g.function !== "DFO")) {
      t.state.functionRotation || (t.state.functionRotation = {});
      var _ = String(g.id);
      t.state.functionRotation[_] || (t.state.functionRotation[_] = []);
      for (var d = t.state.schedule && (t.state.schedule[g.id] || t.state.schedule[_]) || [], D = Math.max(d.length, (t.state.weekCount || 1) * 7), R = 0; R < D; R++) {
        for (; t.state.functionRotation[_].length <= R; ) t.state.functionRotation[_].push(null);
        d[R] === "WORK" && (t.state.functionRotation[_][R] = "DFO");
      }
    }
  }
  function l() {
    var g = document.getElementById("lines-tbody"), _ = g || document.querySelector(".lines-virtual-root");
    _ && g && _.querySelectorAll("td.cell-toggle").forEach(function(d) {
      var D = t.findLineById ? t.findLineById(d.getAttribute("data-line-id")) : null, R = +d.getAttribute("data-day");
      if (!(!D || isNaN(R))) {
        var A = (t.state.schedule[D.id] || t.state.schedule[String(D.id)] || [])[R] || "RDO";
        if (d.style.background = "", d.style.color = "", A !== "WORK") {
          d.className = "cell-rdo cell-toggle", d.textContent = "RDO", d.style.background = "#000", d.style.color = "#fff", d.style.opacity = "1";
          return;
        }
        var C = e(D, R), N = C === "BAG" || C === "BAGS", G = C === "DFO", L = "";
        N ? L = " cell-function-duty cell-bag" : G && (L = " cell-function-duty cell-dfo"), d.className = "cell-work cell-toggle" + L, d.textContent = n(D);
      }
    });
  }
  t.paintLineColors = l;
  function u(g) {
    var _ = t[g];
    if (!(typeof _ != "function" || _._lineColorsWrapped)) {
      var d = function() {
        if (t.__USE_SVELTE_LINES) return _.apply(this, arguments);
        var D = _.apply(this, arguments);
        return setTimeout(l, 0), D;
      };
      d._lineColorsWrapped = !0, t[g] = d;
    }
  }
  u("renderLines"), u("renderAll"), u("generateFunctionAssignments"), t._lineColorsBound || (t._lineColorsBound = !0, document.addEventListener("change", function(g) {
    var _ = g.target;
    if (!(!_ || _.getAttribute("data-field") !== "function")) {
      var d = t.findLineById ? t.findLineById(_.getAttribute("data-line-id")) : null;
      d && (d.function = _.value === "DFO" || _.value === "PAX" || _.value === "BAG" ? _.value : "", d.function === "BAG" && s(d), d.function === "DFO" && r(d), t.renderLines ? t.renderLines() : l());
    }
  }));
}
function Jn(t) {
  const e = t || window.Scheduler;
  if (!e) return;
  jn(e), qn(e);
  const n = document.getElementById("lines-table-root");
  if (!n) {
    console.warn("lines-table: #lines-table-root not found");
    return;
  }
  if (e.__USE_SVELTE_LINES === !1) {
    n.innerHTML = "", n.style.display = "none", e.renderLines && e.renderLines();
    return;
  }
  if (n._linesTableMounted) return;
  n._linesTableMounted = !0;
  function s() {
    return {
      teamResolver: typeof e.teamMetaForLine == "function" ? e.teamMetaForLine : null,
      shiftResolver: typeof e.getShift == "function" ? e.getShift : null,
      rotationDutyResolver: typeof e.getRotationDuty == "function" ? e.getRotationDuty : r,
      effectiveTimesResolver: typeof e.getEffectiveShiftTimes == "function" ? e.getEffectiveShiftTimes : null
    };
  }
  function r(h, p) {
    const v = String(h), y = e.state && e.state.functionRotation, w = y && (y[v] || y[h]);
    if (!Array.isArray(w)) return null;
    const I = w[p];
    return I === "BAG" ? "BAG" : I === "DFO" ? "DFO" : I === "PAX" ? "PAX" : I === "TRAINING" ? "TRAINING" : null;
  }
  function l(h, p, v) {
    var y = String(h);
    for (e.state.functionRotation || (e.state.functionRotation = {}), e.state.functionRotation[y] || (e.state.functionRotation[y] = []); e.state.functionRotation[y].length <= p; ) e.state.functionRotation[y].push(null);
    e.state.functionRotation[y][p] = v;
  }
  function u(h) {
    if (!h) return !1;
    if (h.function === "DFO") return !0;
    const p = h.functionEligible;
    return !!(p && (p.dfo === !0 || p.DFO === !0));
  }
  function g() {
    const h = e.state && Array.isArray(e.state.lines) ? e.state.lines : [], p = typeof e.sortLinesForView == "function" && typeof e.filterLinesForView == "function" ? e.sortLinesForView(e.filterLinesForView(h)) : h, v = e.state && e.state.schedule || {}, y = typeof e.getRowModels == "function" ? e.getRowModels(p, v, s()) : typeof e.getLineRowModels == "function" ? e.getLineRowModels(s()) : [];
    return Array.isArray(y) ? y : [];
  }
  function _() {
    return e.teams && Array.isArray(e.teams.teams) ? e.teams.teams : [];
  }
  function d() {
    return e.state && Array.isArray(e.state.shifts) ? e.state.shifts : [];
  }
  function D() {
    return typeof e.getExportStyle == "function" ? e.getExportStyle() : e.state && e.state.exportStyle || null;
  }
  function R(h) {
    if (!h || typeof h.$set != "function") return;
    const p = g();
    typeof e.applyExportCssVars == "function" && e.applyExportCssVars(), h.$set({
      rows: Array.isArray(p) ? p : [],
      shiftOptions: d(),
      teamOptions: _(),
      exportStyle: D(),
      currentSortBy: e.linesView && e.linesView.sortBy || "role",
      currentSortDir: e.linesView && e.linesView.sortDir || "asc",
      filterRole: e.linesView && e.linesView.filterRole || "ALL",
      filterShift: e.linesView && e.linesView.filterShift || "",
      filterTeam: e.linesView && e.linesView.filterTeam || "",
      filterSex: e.linesView && e.linesView.filterSex || "",
      filterDuty: e.linesView && e.linesView.filterDuty || "",
      filterDay: e.linesView && e.linesView.filterDay || "",
      searchCode: e.linesView && e.linesView.searchCode || ""
    });
  }
  function A(h) {
    if (!h) return;
    const p = e.findLineById ? e.findLineById(h.lineId) : null;
    if (!p) return;
    const v = h.field, y = h.value;
    if (v === "lineCode")
      p.lineCode = String(y || "").trim() || p.lineCode;
    else if (v === "sex")
      p.sex = y === "F" ? "F" : "M";
    else if (v === "function")
      p.function = y === "DFO" || y === "PAX" || y === "BAG" || y === "TRAINING" ? y : "";
    else if (v === "certPool") {
      var w = String(y || "").trim().toUpperCase();
      p.certPool = w === "A" || w === "B" ? w : "";
    } else if (v === "emp")
      e.applyLineEmp && e.applyLineEmp(p, y);
    else if (v === "position") {
      var I = !!(p.isExtra || p.extraPositionId), M = String(y ?? "").trim();
      I ? (M && (p.position = M, p.extraName = M), p.isStso = !1, p.isLtso = !1) : e.applyLineEmp && e.applyLineEmp(p, M);
    } else if (v === "shift")
      e.applyLineShift && e.applyLineShift(p, y);
    else if (v === "team")
      e.setLineTeam && e.setLineTeam(h.lineId, y);
    else if (v === "start" || v === "end") {
      var O = String(y || "").trim();
      if (e.isValidTimeText && !e.isValidTimeText(O)) return;
      v === "start" && (p.startTime = O), v === "end" && (p.endTime = O);
      var W = e.getShift ? e.getShift(p.shiftId) : null, V = p.startTime || (W ? W.start : ""), te = p.endTime || (W ? W.end : "");
      p.shiftLabel = (V || "") + "-" + (te || "");
    }
    e.updateStatus && e.updateStatus("Updated " + (p.lineCode || h.lineId)), P(), (v === "emp" || v === "position" || v === "shift" || v === "start" || v === "end") && e.renderCoverageBars && e.renderCoverageBars(), v === "team" && e.renderTeams && e.renderTeams(), window.dispatchEvent(new CustomEvent("lines:coverage-refresh"));
  }
  function C(h) {
    if (!h) return;
    const p = e.findLineById ? e.findLineById(h.lineId) : null, v = Number(h.dayIndex);
    if (!p || !Number.isInteger(v) || v < 0 || v > 6) return;
    const y = String(p.id);
    e.state.schedule || (e.state.schedule = {});
    var w = e.state.schedule[y] || e.state.schedule[p.id];
    for (Array.isArray(w) || (w = []), e.state.schedule[y] = w; e.state.schedule[y].length < 7; ) e.state.schedule[y].push("RDO");
    e.state.functionRotation || (e.state.functionRotation = {}), !e.state.functionRotation[y] && e.state.functionRotation[p.id] && (e.state.functionRotation[y] = e.state.functionRotation[p.id]);
    const I = e.state.schedule[y][v] || "RDO", M = p.function === "BAG", O = u(p);
    if (I !== "WORK")
      e.state.schedule[y][v] = "WORK", M ? l(y, v, "BAG") : O ? l(y, v, "PAX") : l(y, v, null);
    else if (M)
      e.state.schedule[y][v] = "RDO", l(y, v, null);
    else if (O) {
      var W = typeof e.getRotationDuty == "function" ? e.getRotationDuty(p.id, v) : r(p.id, v), V = W === "DFO" || W === "PAX" || !W ? "PAX" : W;
      V === "PAX" ? l(y, v, "BAG") : (e.state.schedule[y][v] = "RDO", l(y, v, null));
    } else
      e.state.schedule[y][v] = "RDO", l(y, v, null);
    e.syncRdoDaysFromSchedule && e.syncRdoDaysFromSchedule(p), P(), e.renderCoverageBars && e.renderCoverageBars(), window.dispatchEvent(new CustomEvent("lines:coverage-refresh"));
  }
  function N(h) {
    if (!h) return;
    const p = e.findLineById ? e.findLineById(h.lineId) : null, v = Number(h.dayIndex), y = String(h.duty || "").toUpperCase();
    if (!p || !Number.isInteger(v) || v < 0 || v > 6) return;
    const w = String(p.id);
    e.state.schedule || (e.state.schedule = {}), Array.isArray(e.state.schedule[w]) || (e.state.schedule[w] = Array(7).fill("RDO")), y === "OFF" || y === "RDO" || y === "" ? (e.state.schedule[w][v] = "RDO", l(w, v, null)) : (e.state.schedule[w][v] = "WORK", y === "BAG" ? l(w, v, "BAG") : y === "DFO" ? l(w, v, "DFO") : y === "TRAINING" ? l(w, v, "TRAINING") : l(w, v, "PAX")), e.syncRdoDaysFromSchedule && e.syncRdoDaysFromSchedule(p), P(), e.renderCoverageBars && e.renderCoverageBars(), window.dispatchEvent(new CustomEvent("lines:coverage-refresh"));
  }
  function G(h) {
    if (!h) return;
    const p = e.findLineById ? e.findLineById(h.lineId) : null, v = Number(h.dayIndex), y = h.field, w = String(h.value || "").trim();
    if (!(!p || !Number.isInteger(v) || v < 0 || v > 6) && !(e.isValidTimeText && !e.isValidTimeText(w))) {
      var I = e.getShift ? e.getShift(p.shiftId) : null, M = p.startTime || (I ? I.start : "08:00"), O = p.endTime || (I ? I.end : "16:30");
      p.dayTimes || (p.dayTimes = {});
      var W = String(v), V = p.dayTimes[W] || { start: M, end: O };
      y === "start" ? p.dayTimes[W] = { start: w, end: V.end } : y === "end" && (p.dayTimes[W] = { start: V.start, end: w }), P(), e.renderCoverageBars && e.renderCoverageBars(), window.dispatchEvent(new CustomEvent("lines:coverage-refresh"));
    }
  }
  function L(h) {
    h && (e.linesView || (e.linesView = {}), h.sortBy && (e.linesView.sortBy = h.sortBy), h.sortDir && (e.linesView.sortDir = h.sortDir), P());
  }
  function k(h) {
    h && (e.linesView || (e.linesView = {}), h.filterRole !== void 0 && (e.linesView.filterRole = h.filterRole), h.filterShift !== void 0 && (e.linesView.filterShift = h.filterShift), h.filterTeam !== void 0 && (e.linesView.filterTeam = h.filterTeam), h.filterSex !== void 0 && (e.linesView.filterSex = h.filterSex), h.filterDuty !== void 0 && (e.linesView.filterDuty = h.filterDuty), h.filterDay !== void 0 && (e.linesView.filterDay = h.filterDay), h.searchCode !== void 0 && (e.linesView.searchCode = h.searchCode), P());
  }
  const P = () => {
    try {
      const h = n._linesTableApp;
      if (h)
        R(h);
      else {
        n.childNodes.length && (n.innerHTML = "");
        const p = g();
        typeof e.applyExportCssVars == "function" && e.applyExportCssVars(), n._linesTableApp = new Un({
          target: n,
          props: {
            rows: Array.isArray(p) ? p : [],
            shiftOptions: d(),
            teamOptions: _(),
            exportStyle: D(),
            currentSortBy: e.linesView && e.linesView.sortBy || "role",
            currentSortDir: e.linesView && e.linesView.sortDir || "asc",
            filterRole: e.linesView && e.linesView.filterRole || "ALL",
            filterShift: e.linesView && e.linesView.filterShift || "",
            filterTeam: e.linesView && e.linesView.filterTeam || "",
            filterSex: e.linesView && e.linesView.filterSex || "",
            filterDuty: e.linesView && e.linesView.filterDuty || "",
            filterDay: e.linesView && e.linesView.filterDay || "",
            searchCode: e.linesView && e.linesView.searchCode || "",
            onInlineEdit: A,
            onDayToggle: C,
            onDayDutyEdit: N,
            onDayTimeEdit: G,
            onSort: L,
            onFilter: k
          }
        });
      }
    } catch (h) {
      console.error("lines-table: refresh failed", h);
    }
  };
  P(), e.bindLinesUI && e.bindLinesUI(), document.addEventListener("click", (h) => {
    const p = h.target.closest?.(".tab-btn");
    p && p.dataset.tab === "lines" && P();
  }), ["lines:request-render", "lines:filter-change", "lines:sort-change", "lines:coverage-refresh"].forEach((h) => {
    window.addEventListener(h, P);
  }), n.refresh = P;
}
export {
  Jn as initLinesTable
};
