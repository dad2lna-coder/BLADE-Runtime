var mn = Object.defineProperty;
var wn = (t, e, n) => e in t ? mn(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var Vt = (t, e, n) => wn(t, typeof e != "symbol" ? e + "" : e, n);
function it() {
}
function hn(t) {
  return t();
}
function Xt() {
  return /* @__PURE__ */ Object.create(null);
}
function ot(t) {
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
function Wt(t) {
  return t ?? "";
}
function i(t, e) {
  t.appendChild(e);
}
function de(t, e, n) {
  t.insertBefore(e, n || null);
}
function se(t) {
  t.parentNode && t.parentNode.removeChild(t);
}
function dt(t, e) {
  for (let n = 0; n < t.length; n += 1)
    t[n] && t[n].d(e);
}
function s(t) {
  return document.createElement(t);
}
function ce(t) {
  return document.createTextNode(t);
}
function S() {
  return ce(" ");
}
function W(t, e, n, a) {
  return t.addEventListener(e, n, a), () => t.removeEventListener(e, n, a);
}
function o(t, e, n) {
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
function J(t, e, n, a) {
  n == null ? t.style.removeProperty(e) : t.style.setProperty(e, n, "");
}
function K(t, e, n) {
  for (let a = 0; a < t.options.length; a += 1) {
    const u = t.options[a];
    if (u.__value === e) {
      u.selected = !0;
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
const Tt = [], Pt = [];
let Rt = [];
const Ht = [], Fn = /* @__PURE__ */ Promise.resolve();
let Mt = !1;
function An() {
  Mt || (Mt = !0, Fn.then(gn));
}
function et(t) {
  Rt.push(t);
}
const Nt = /* @__PURE__ */ new Set();
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
    for (St(null), Tt.length = 0, Dt = 0; Pt.length; ) Pt.pop()();
    for (let e = 0; e < Rt.length; e += 1) {
      const n = Rt[e];
      Nt.has(n) || (Nt.add(n), n());
    }
    Rt.length = 0;
  } while (Tt.length);
  for (; Ht.length; )
    Ht.pop()();
  Mt = !1, Nt.clear(), St(t);
}
function Sn(t) {
  if (t.fragment !== null) {
    t.update(), ot(t.before_update);
    const e = t.dirty;
    t.dirty = [-1], t.fragment && t.fragment.p(t.ctx, e), t.after_update.forEach(et);
  }
}
function On(t) {
  const e = [], n = [];
  Rt.forEach((a) => t.indexOf(a) === -1 ? e.push(a) : n.push(a)), n.forEach((a) => a()), Rt = e;
}
const In = /* @__PURE__ */ new Set();
function pn(t, e) {
  t && t.i && (In.delete(t), t.i(e));
}
function we(t) {
  return t?.length !== void 0 ? t : Array.from(t);
}
function En(t, e) {
  t.d(1), e.delete(t.key);
}
function Bn(t, e, n, a, u, l, r, g, _, c, D, R) {
  let A = t.length, C = l.length, P = A;
  const G = {};
  for (; P--; ) G[t[P].key] = P;
  const I = [], M = /* @__PURE__ */ new Map(), N = /* @__PURE__ */ new Map(), v = [];
  for (P = C; P--; ) {
    const w = R(u, l, P), E = n(w);
    let k = r.get(E);
    k ? v.push(() => k.p(w, e)) : (k = c(E, w), k.c()), M.set(E, I[P] = k), E in G && N.set(E, Math.abs(P - G[E]));
  }
  const p = /* @__PURE__ */ new Set(), h = /* @__PURE__ */ new Set();
  function m(w) {
    pn(w, 1), w.m(g, D), r.set(w.key, w), D = w.first, C--;
  }
  for (; A && C; ) {
    const w = I[C - 1], E = t[A - 1], k = w.key, L = E.key;
    w === E ? (D = w.first, A--, C--) : M.has(L) ? !r.has(k) || p.has(k) ? m(w) : h.has(L) ? A-- : N.get(k) > N.get(L) ? (h.add(k), m(w)) : (p.add(L), A--) : (_(E, r), A--);
  }
  for (; A--; ) {
    const w = t[A];
    M.has(w.key) || _(w, r);
  }
  for (; C; ) m(I[C - 1]);
  return ot(v), I;
}
function Ln(t, e, n) {
  const { fragment: a, after_update: u } = t.$$;
  a && a.m(e, n), et(() => {
    const l = t.$$.on_mount.map(hn).filter(vn);
    t.$$.on_destroy ? t.$$.on_destroy.push(...l) : ot(l), t.$$.on_mount = [];
  }), u.forEach(et);
}
function kn(t, e) {
  const n = t.$$;
  n.fragment !== null && (On(n.after_update), ot(n.on_destroy), n.fragment && n.fragment.d(e), n.on_destroy = n.fragment = null, n.ctx = []);
}
function Vn(t, e) {
  t.$$.dirty[0] === -1 && (Tt.push(t), An(), t.$$.dirty.fill(0)), t.$$.dirty[e / 31 | 0] |= 1 << e % 31;
}
function Nn(t, e, n, a, u, l, r = null, g = [-1]) {
  const _ = Ot;
  St(t);
  const c = t.$$ = {
    fragment: null,
    ctx: [],
    // state
    props: l,
    update: it,
    not_equal: u,
    bound: Xt(),
    // lifecycle
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(e.context || (_ ? _.$$.context : [])),
    // everything else
    callbacks: Xt(),
    dirty: g,
    skip_bound: !1,
    root: e.target || _.$$.root
  };
  r && r(c.root);
  let D = !1;
  if (c.ctx = n ? n(t, e.props || {}, (R, A, ...C) => {
    const P = C.length ? C[0] : A;
    return c.ctx && u(c.ctx[R], c.ctx[R] = P) && (!c.skip_bound && c.bound[R] && c.bound[R](P), D && Vn(t, R)), A;
  }) : [], c.update(), D = !0, ot(c.before_update), c.fragment = a ? a(c.ctx) : !1, e.target) {
    if (e.hydrate) {
      const R = bn(e.target);
      c.fragment && c.fragment.l(R), R.forEach(se);
    } else
      c.fragment && c.fragment.c();
    e.intro && pn(t.$$.fragment), Ln(t, e.target, e.anchor), gn();
  }
  St(_);
}
class Pn {
  constructor() {
    /**
     * ### PRIVATE API
     *
     * Do not use, may change at any time
     *
     * @type {any}
     */
    Vt(this, "$$");
    /**
     * ### PRIVATE API
     *
     * Do not use, may change at any time
     *
     * @type {any}
     */
    Vt(this, "$$set");
  }
  /** @returns {void} */
  $destroy() {
    kn(this, 1), this.$destroy = it;
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
    const a = this.$$.callbacks[e] || (this.$$.callbacks[e] = []);
    return a.push(n), () => {
      const u = a.indexOf(n);
      u !== -1 && a.splice(u, 1);
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
const Mn = "4";
typeof window < "u" && (window.__svelte || (window.__svelte = { v: /* @__PURE__ */ new Set() })).v.add(Mn);
function Kt() {
  return {
    rdo: "#000000",
    bag: "#F4B4B4",
    dfo: "#FFF3A8",
    pax: "#A0C4FF",
    training: "#D8B4F8",
    header: "#1F4E79"
  };
}
function Gn(t, e) {
  if (!t) return e;
  var n = String(t).replace("#", "").trim();
  return n.length === 3 && (n = n[0] + n[0] + n[1] + n[1] + n[2] + n[2]), n.length !== 6 || /[^0-9a-fA-F]/.test(n) ? e : "#" + n.toUpperCase();
}
function Xn(t) {
  var e = Gn(t, "#FFFFFF") || "#FFFFFF", n = e.slice(1), a = parseInt(n.slice(0, 2), 16), u = parseInt(n.slice(2, 4), 16), l = parseInt(n.slice(4, 6), 16), r = (0.299 * a + 0.587 * u + 0.114 * l) / 255;
  return r < 0.45 ? "#FFFFFF" : "#111111";
}
function Ut(t, e, n) {
  const a = t.slice();
  return a[67] = e[n], a;
}
function jt(t, e, n) {
  const a = t.slice();
  return a[70] = e[n], a;
}
function qt(t, e, n) {
  const a = t.slice();
  return a[73] = e[n], a;
}
function zt(t, e, n) {
  const a = t.slice();
  return a[76] = e[n], a;
}
function Yt(t, e, n) {
  const a = t.slice();
  return a[79] = e[n], a;
}
function Jt(t, e, n) {
  const a = t.slice();
  return a[82] = e[n], a;
}
function Qt(t, e, n) {
  const a = t.slice();
  return a[79] = e[n], a;
}
function Zt(t, e, n) {
  const a = t.slice();
  return a[82] = e[n], a;
}
function Wn(t) {
  let e;
  return {
    c() {
      e = s("div"), e.textContent = "Classic Lines mode active", o(e, "class", "muted");
    },
    m(n, a) {
      de(n, e, a);
    },
    p: it,
    d(n) {
      n && se(e);
    }
  };
}
function Hn(t) {
  let e, n, a, u, l, r, g, _, c, D, R, A, C, P, G, I, M, N, v, p, h, m, w, E, k, L, H, X, te, De, q, ne, z, Ne, qe, re, ue, j, _e, Be, Te, Le, Q, he, ve, ge, ze, Ke, at, le, Y, pe, ye, ke, fe, me, Ue, F, je, Ye, x, Pe, be, Me, Ge, st, Je, Qe, f, O, $, Ve, Ze, _t, rt, ht, xe, ut, tt, ft, nt, Ct, Xe, ie, vt, It, We, oe, gt, Et, pt, $e, ee, Bt, He, ae, yt, Lt, Ae, Ft, Se = [], Oe = /* @__PURE__ */ new Map(), y, V, d, Z = we(
    /*teamOptions*/
    t[9]
  ), Re = [];
  for (let T = 0; T < Z.length; T += 1)
    Re[T] = xt(Zt(t, Z, T));
  let mt = we(
    /*shiftOptions*/
    t[8]
  ), Ce = [];
  for (let T = 0; T < mt.length; T += 1)
    Ce[T] = $t(Qt(t, mt, T));
  let Ie = (
    /*offsetY*/
    t[13] > 0 && en(t)
  ), ct = we(
    /*visibleRows*/
    t[14]
  );
  const Gt = (T) => (
    /*row*/
    T[67].id
  );
  for (let T = 0; T < ct.length; T += 1) {
    let U = Ut(t, ct, T), B = Gt(U);
    Oe.set(B, Se[T] = un(B, U));
  }
  let Fe = null;
  ct.length || (Fe = tn());
  let Ee = (
    /*paddingBottom*/
    t[12] > 0 && fn(t)
  );
  return {
    c() {
      e = s("div"), n = s("div"), a = s("label"), u = ce(`Search
          `), l = s("input"), r = S(), g = s("label"), _ = ce(`Role
          `), c = s("select"), D = s("option"), D.textContent = "All", R = s("option"), R.textContent = "STSO", A = s("option"), A.textContent = "LTSO", C = s("option"), C.textContent = "TSO (FT/PT)", P = S(), G = s("label"), I = ce(`Team
          `), M = s("select"), N = s("option"), N.textContent = "All", v = s("option"), v.textContent = "Unassigned";
      for (let T = 0; T < Re.length; T += 1)
        Re[T].c();
      p = S(), h = s("label"), m = ce(`Shift
          `), w = s("select"), E = s("option"), E.textContent = "All shifts";
      for (let T = 0; T < Ce.length; T += 1)
        Ce[T].c();
      k = S(), L = s("label"), H = ce(`Duty
          `), X = s("select"), te = s("option"), te.textContent = "All duties", De = s("option"), De.textContent = "BAG", q = s("option"), q.textContent = "PAX", ne = s("option"), ne.textContent = "DFO", z = s("option"), z.textContent = "TRAINING", Ne = s("option"), Ne.textContent = "OFF / RDO", qe = S(), re = s("label"), ue = ce(`On Day
          `), j = s("select"), _e = s("option"), _e.textContent = "Any day", Be = s("option"), Be.textContent = "Sun", Te = s("option"), Te.textContent = "Mon", Le = s("option"), Le.textContent = "Tue", Q = s("option"), Q.textContent = "Wed", he = s("option"), he.textContent = "Thu", ve = s("option"), ve.textContent = "Fri", ge = s("option"), ge.textContent = "Sat", ze = S(), Ke = s("label"), at = ce(`Sex
          `), le = s("select"), Y = s("option"), Y.textContent = "All", pe = s("option"), pe.textContent = "M", ye = s("option"), ye.textContent = "F", ke = S(), fe = s("div"), me = s("table"), Ue = s("thead"), F = s("tr"), je = s("th"), je.textContent = `Team${/*sortIndicator*/
      t[23]("team")}`, Ye = S(), x = s("th"), x.textContent = `Line${/*sortIndicator*/
      t[23]("line")}`, Pe = S(), be = s("th"), be.textContent = `Shift${/*sortIndicator*/
      t[23]("shift")}`, Me = S(), Ge = s("th"), Ge.textContent = `Start${/*sortIndicator*/
      t[23]("start")}`, st = S(), Je = s("th"), Je.textContent = "End", Qe = S(), f = s("th"), f.textContent = `Position${/*sortIndicator*/
      t[23]("role")}`, O = S(), $ = s("th"), $.textContent = "Emp", Ve = S(), Ze = s("th"), Ze.textContent = "Sex", _t = S(), rt = s("th"), rt.textContent = "Duty", ht = S(), xe = s("th"), xe.textContent = "Cert", ut = S(), tt = s("th"), tt.textContent = "RDOs", ft = S(), nt = s("th"), nt.textContent = "Paid", Ct = S(), Xe = s("th"), Xe.textContent = "Sun", ie = S(), vt = s("th"), vt.textContent = "Mon", It = S(), We = s("th"), We.textContent = "Tue", oe = S(), gt = s("th"), gt.textContent = "Wed", Et = S(), pt = s("th"), pt.textContent = "Thu", $e = S(), ee = s("th"), ee.textContent = "Fri", Bt = S(), He = s("th"), He.textContent = "Sat", ae = S(), yt = s("th"), yt.textContent = "Hrs", Lt = S(), Ae = s("tbody"), Ie && Ie.c(), Ft = S();
      for (let T = 0; T < Se.length; T += 1)
        Se[T].c();
      Fe && Fe.c(), y = S(), Ee && Ee.c(), o(l, "type", "text"), o(l, "class", "filter-input search-input svelte-24n97o"), o(l, "placeholder", "Search line code..."), o(a, "class", "svelte-24n97o"), D.__value = "ALL", b(D, D.__value), R.__value = "STSO", b(R, R.__value), A.__value = "LTSO", b(A, A.__value), C.__value = "TSO", b(C, C.__value), o(c, "class", "filter-select svelte-24n97o"), /*filterRole*/
      t[0] === void 0 && et(() => (
        /*select0_change_handler*/
        t[41].call(c)
      )), o(g, "class", "svelte-24n97o"), N.__value = "", b(N, N.__value), v.__value = "__none__", b(v, v.__value), o(M, "class", "filter-select svelte-24n97o"), /*filterTeam*/
      t[2] === void 0 && et(() => (
        /*select1_change_handler*/
        t[42].call(M)
      )), o(G, "class", "svelte-24n97o"), E.__value = "", b(E, E.__value), o(w, "class", "filter-select svelte-24n97o"), /*filterShift*/
      t[1] === void 0 && et(() => (
        /*select2_change_handler*/
        t[43].call(w)
      )), o(h, "class", "svelte-24n97o"), te.__value = "", b(te, te.__value), De.__value = "BAG", b(De, De.__value), q.__value = "PAX", b(q, q.__value), ne.__value = "DFO", b(ne, ne.__value), z.__value = "TRAINING", b(z, z.__value), Ne.__value = "OFF", b(Ne, Ne.__value), o(X, "class", "filter-select svelte-24n97o"), /*filterDuty*/
      t[4] === void 0 && et(() => (
        /*select3_change_handler*/
        t[44].call(X)
      )), o(L, "class", "svelte-24n97o"), _e.__value = "", b(_e, _e.__value), Be.__value = "0", b(Be, Be.__value), Te.__value = "1", b(Te, Te.__value), Le.__value = "2", b(Le, Le.__value), Q.__value = "3", b(Q, Q.__value), he.__value = "4", b(he, he.__value), ve.__value = "5", b(ve, ve.__value), ge.__value = "6", b(ge, ge.__value), o(j, "class", "filter-select svelte-24n97o"), /*filterDay*/
      t[5] === void 0 && et(() => (
        /*select4_change_handler*/
        t[45].call(j)
      )), o(re, "class", "svelte-24n97o"), Y.__value = "", b(Y, Y.__value), pe.__value = "M", b(pe, pe.__value), ye.__value = "F", b(ye, ye.__value), o(le, "class", "filter-select svelte-24n97o"), /*filterSex*/
      t[3] === void 0 && et(() => (
        /*select5_change_handler*/
        t[46].call(le)
      )), o(Ke, "class", "svelte-24n97o"), o(n, "class", "filter-controls svelte-24n97o"), o(e, "class", "lines-table-header-controls svelte-24n97o"), o(je, "class", "sortable col-team svelte-24n97o"), o(x, "class", "sortable col-line svelte-24n97o"), o(be, "class", "sortable col-shift svelte-24n97o"), o(Ge, "class", "sortable col-time svelte-24n97o"), o(Je, "class", "col-time svelte-24n97o"), o(f, "class", "sortable col-pos svelte-24n97o"), o($, "class", "col-sm svelte-24n97o"), o(Ze, "class", "col-sm svelte-24n97o"), o(rt, "class", "col-duty svelte-24n97o"), o(xe, "class", "col-sm svelte-24n97o"), o(tt, "class", "col-rdos svelte-24n97o"), o(nt, "class", "col-sm svelte-24n97o"), o(Xe, "class", "col-day svelte-24n97o"), o(vt, "class", "col-day svelte-24n97o"), o(We, "class", "col-day svelte-24n97o"), o(gt, "class", "col-day svelte-24n97o"), o(pt, "class", "col-day svelte-24n97o"), o(ee, "class", "col-day svelte-24n97o"), o(He, "class", "col-day svelte-24n97o"), o(yt, "class", "col-sm svelte-24n97o"), o(F, "class", "svelte-24n97o"), o(me, "class", "data-table lines-editable svelte-24n97o"), o(fe, "class", "lines-virtual-root svelte-24n97o");
    },
    m(T, U) {
      de(T, e, U), i(e, n), i(n, a), i(a, u), i(a, l), b(
        l,
        /*searchCode*/
        t[6]
      ), i(n, r), i(n, g), i(g, _), i(g, c), i(c, D), i(c, R), i(c, A), i(c, C), K(
        c,
        /*filterRole*/
        t[0],
        !0
      ), i(n, P), i(n, G), i(G, I), i(G, M), i(M, N), i(M, v);
      for (let B = 0; B < Re.length; B += 1)
        Re[B] && Re[B].m(M, null);
      K(
        M,
        /*filterTeam*/
        t[2],
        !0
      ), i(n, p), i(n, h), i(h, m), i(h, w), i(w, E);
      for (let B = 0; B < Ce.length; B += 1)
        Ce[B] && Ce[B].m(w, null);
      K(
        w,
        /*filterShift*/
        t[1],
        !0
      ), i(n, k), i(n, L), i(L, H), i(L, X), i(X, te), i(X, De), i(X, q), i(X, ne), i(X, z), i(X, Ne), K(
        X,
        /*filterDuty*/
        t[4],
        !0
      ), i(n, qe), i(n, re), i(re, ue), i(re, j), i(j, _e), i(j, Be), i(j, Te), i(j, Le), i(j, Q), i(j, he), i(j, ve), i(j, ge), K(
        j,
        /*filterDay*/
        t[5],
        !0
      ), i(n, ze), i(n, Ke), i(Ke, at), i(Ke, le), i(le, Y), i(le, pe), i(le, ye), K(
        le,
        /*filterSex*/
        t[3],
        !0
      ), de(T, ke, U), de(T, fe, U), i(fe, me), i(me, Ue), i(Ue, F), i(F, je), i(F, Ye), i(F, x), i(F, Pe), i(F, be), i(F, Me), i(F, Ge), i(F, st), i(F, Je), i(F, Qe), i(F, f), i(F, O), i(F, $), i(F, Ve), i(F, Ze), i(F, _t), i(F, rt), i(F, ht), i(F, xe), i(F, ut), i(F, tt), i(F, ft), i(F, nt), i(F, Ct), i(F, Xe), i(F, ie), i(F, vt), i(F, It), i(F, We), i(F, oe), i(F, gt), i(F, Et), i(F, pt), i(F, $e), i(F, ee), i(F, Bt), i(F, He), i(F, ae), i(F, yt), i(me, Lt), i(me, Ae), Ie && Ie.m(Ae, null), i(Ae, Ft);
      for (let B = 0; B < Se.length; B += 1)
        Se[B] && Se[B].m(Ae, null);
      Fe && Fe.m(Ae, null), i(Ae, y), Ee && Ee.m(Ae, null), t[65](fe), V || (d = [
        W(
          l,
          "input",
          /*input_input_handler*/
          t[40]
        ),
        W(
          l,
          "input",
          /*handleFilterChange*/
          t[22]
        ),
        W(
          c,
          "change",
          /*select0_change_handler*/
          t[41]
        ),
        W(
          c,
          "change",
          /*handleFilterChange*/
          t[22]
        ),
        W(
          M,
          "change",
          /*select1_change_handler*/
          t[42]
        ),
        W(
          M,
          "change",
          /*handleFilterChange*/
          t[22]
        ),
        W(
          w,
          "change",
          /*select2_change_handler*/
          t[43]
        ),
        W(
          w,
          "change",
          /*handleFilterChange*/
          t[22]
        ),
        W(
          X,
          "change",
          /*select3_change_handler*/
          t[44]
        ),
        W(
          X,
          "change",
          /*handleFilterChange*/
          t[22]
        ),
        W(
          j,
          "change",
          /*select4_change_handler*/
          t[45]
        ),
        W(
          j,
          "change",
          /*handleFilterChange*/
          t[22]
        ),
        W(
          le,
          "change",
          /*select5_change_handler*/
          t[46]
        ),
        W(
          le,
          "change",
          /*handleFilterChange*/
          t[22]
        ),
        W(
          je,
          "click",
          /*click_handler*/
          t[47]
        ),
        W(
          x,
          "click",
          /*click_handler_1*/
          t[48]
        ),
        W(
          be,
          "click",
          /*click_handler_2*/
          t[49]
        ),
        W(
          Ge,
          "click",
          /*click_handler_3*/
          t[50]
        ),
        W(
          f,
          "click",
          /*click_handler_4*/
          t[51]
        ),
        W(
          fe,
          "scroll",
          /*handleScroll*/
          t[24]
        )
      ], V = !0);
    },
    p(T, U) {
      if (U[0] & /*searchCode*/
      64 && l.value !== /*searchCode*/
      T[6] && b(
        l,
        /*searchCode*/
        T[6]
      ), U[0] & /*filterRole*/
      1 && K(
        c,
        /*filterRole*/
        T[0]
      ), U[0] & /*teamOptions*/
      512) {
        Z = we(
          /*teamOptions*/
          T[9]
        );
        let B;
        for (B = 0; B < Z.length; B += 1) {
          const At = Zt(T, Z, B);
          Re[B] ? Re[B].p(At, U) : (Re[B] = xt(At), Re[B].c(), Re[B].m(M, null));
        }
        for (; B < Re.length; B += 1)
          Re[B].d(1);
        Re.length = Z.length;
      }
      if (U[0] & /*filterTeam, teamOptions*/
      516 && K(
        M,
        /*filterTeam*/
        T[2]
      ), U[0] & /*shiftOptions*/
      256) {
        mt = we(
          /*shiftOptions*/
          T[8]
        );
        let B;
        for (B = 0; B < mt.length; B += 1) {
          const At = Qt(T, mt, B);
          Ce[B] ? Ce[B].p(At, U) : (Ce[B] = $t(At), Ce[B].c(), Ce[B].m(w, null));
        }
        for (; B < Ce.length; B += 1)
          Ce[B].d(1);
        Ce.length = mt.length;
      }
      U[0] & /*filterShift, shiftOptions*/
      258 && K(
        w,
        /*filterShift*/
        T[1]
      ), U[0] & /*filterDuty*/
      16 && K(
        X,
        /*filterDuty*/
        T[4]
      ), U[0] & /*filterDay*/
      32 && K(
        j,
        /*filterDay*/
        T[5]
      ), U[0] & /*filterSex*/
      8 && K(
        le,
        /*filterSex*/
        T[3]
      ), /*offsetY*/
      T[13] > 0 ? Ie ? Ie.p(T, U) : (Ie = en(T), Ie.c(), Ie.m(Ae, Ft)) : Ie && (Ie.d(1), Ie = null), U[0] & /*visibleRows, dayStyle, emitDayTime, emitDayDuty, emitEdit, BASE_EMPS, BASE_POSITIONS, shiftOptions, teamOptions*/
      2081536 && (ct = we(
        /*visibleRows*/
        T[14]
      ), Se = Bn(Se, U, Gt, 1, T, ct, Oe, Ae, En, un, y, Ut), !ct.length && Fe ? Fe.p(T, U) : ct.length ? Fe && (Fe.d(1), Fe = null) : (Fe = tn(), Fe.c(), Fe.m(Ae, y))), /*paddingBottom*/
      T[12] > 0 ? Ee ? Ee.p(T, U) : (Ee = fn(T), Ee.c(), Ee.m(Ae, null)) : Ee && (Ee.d(1), Ee = null);
    },
    d(T) {
      T && (se(e), se(ke), se(fe)), dt(Re, T), dt(Ce, T), Ie && Ie.d();
      for (let U = 0; U < Se.length; U += 1)
        Se[U].d();
      Fe && Fe.d(), Ee && Ee.d(), t[65](null), V = !1, ot(d);
    }
  };
}
function xt(t) {
  let e, n = (
    /*team*/
    (t[82].name ?? /*team*/
    t[82].id) + ""
  ), a, u;
  return {
    c() {
      e = s("option"), a = ce(n), e.__value = u = /*team*/
      t[82].id, b(e, e.__value);
    },
    m(l, r) {
      de(l, e, r), i(e, a);
    },
    p(l, r) {
      r[0] & /*teamOptions*/
      512 && n !== (n = /*team*/
      (l[82].name ?? /*team*/
      l[82].id) + "") && lt(a, n), r[0] & /*teamOptions*/
      512 && u !== (u = /*team*/
      l[82].id) && (e.__value = u, b(e, e.__value));
    },
    d(l) {
      l && se(e);
    }
  };
}
function $t(t) {
  let e, n = kt(
    /*shift*/
    t[79]
  ) + "", a, u;
  return {
    c() {
      e = s("option"), a = ce(n), e.__value = u = /*shift*/
      t[79].id, b(e, e.__value);
    },
    m(l, r) {
      de(l, e, r), i(e, a);
    },
    p(l, r) {
      r[0] & /*shiftOptions*/
      256 && n !== (n = kt(
        /*shift*/
        l[79]
      ) + "") && lt(a, n), r[0] & /*shiftOptions*/
      256 && u !== (u = /*shift*/
      l[79].id) && (e.__value = u, b(e, e.__value));
    },
    d(l) {
      l && se(e);
    }
  };
}
function en(t) {
  let e, n;
  return {
    c() {
      e = s("tr"), n = s("td"), o(n, "colspan", "20"), J(n, "padding", "0"), J(n, "border", "none"), o(n, "class", "svelte-24n97o"), J(
        e,
        "height",
        /*offsetY*/
        t[13] + "px"
      ), o(e, "class", "svelte-24n97o");
    },
    m(a, u) {
      de(a, e, u), i(e, n);
    },
    p(a, u) {
      u[0] & /*offsetY*/
      8192 && J(
        e,
        "height",
        /*offsetY*/
        a[13] + "px"
      );
    },
    d(a) {
      a && se(e);
    }
  };
}
function tn(t) {
  let e;
  return {
    c() {
      e = s("tr"), e.innerHTML = '<td colspan="20" class="muted svelte-24n97o" style="padding: 1.5rem; text-align: center;">No matching lines found.</td>', o(e, "class", "svelte-24n97o");
    },
    m(n, a) {
      de(n, e, a);
    },
    p: it,
    d(n) {
      n && se(e);
    }
  };
}
function nn(t) {
  let e, n = (
    /*team*/
    (t[82].name ?? /*team*/
    t[82].id) + ""
  ), a, u;
  return {
    c() {
      e = s("option"), a = ce(n), e.__value = u = /*team*/
      t[82].id, b(e, e.__value), o(e, "class", "svelte-24n97o");
    },
    m(l, r) {
      de(l, e, r), i(e, a);
    },
    p(l, r) {
      r[0] & /*teamOptions*/
      512 && n !== (n = /*team*/
      (l[82].name ?? /*team*/
      l[82].id) + "") && lt(a, n), r[0] & /*teamOptions*/
      512 && u !== (u = /*team*/
      l[82].id) && (e.__value = u, b(e, e.__value));
    },
    d(l) {
      l && se(e);
    }
  };
}
function ln(t) {
  let e, n = kt(
    /*shift*/
    t[79]
  ) + "", a, u;
  return {
    c() {
      e = s("option"), a = ce(n), e.__value = u = /*shift*/
      t[79].id, b(e, e.__value), o(e, "class", "svelte-24n97o");
    },
    m(l, r) {
      de(l, e, r), i(e, a);
    },
    p(l, r) {
      r[0] & /*shiftOptions*/
      256 && n !== (n = kt(
        /*shift*/
        l[79]
      ) + "") && lt(a, n), r[0] & /*shiftOptions*/
      256 && u !== (u = /*shift*/
      l[79].id) && (e.__value = u, b(e, e.__value));
    },
    d(l) {
      l && se(e);
    }
  };
}
function on(t) {
  let e, n = (
    /*pos*/
    t[76] + ""
  ), a, u;
  return {
    c() {
      e = s("option"), a = ce(n), e.__value = u = /*pos*/
      t[76], b(e, e.__value), o(e, "class", "svelte-24n97o");
    },
    m(l, r) {
      de(l, e, r), i(e, a);
    },
    p(l, r) {
      r[0] & /*visibleRows*/
      16384 && n !== (n = /*pos*/
      l[76] + "") && lt(a, n), r[0] & /*visibleRows, teamOptions*/
      16896 && u !== (u = /*pos*/
      l[76]) && (e.__value = u, b(e, e.__value));
    },
    d(l) {
      l && se(e);
    }
  };
}
function an(t) {
  let e, n = (
    /*emp*/
    t[73] + ""
  ), a;
  return {
    c() {
      e = s("option"), a = ce(n), e.__value = /*emp*/
      t[73], b(e, e.__value), o(e, "class", "svelte-24n97o");
    },
    m(u, l) {
      de(u, e, l), i(e, a);
    },
    p: it,
    d(u) {
      u && se(e);
    }
  };
}
function sn(t) {
  let e, n, a, u, l, r, g, _, c, D;
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
      e = s("div"), n = s("input"), u = S(), l = s("span"), l.textContent = "–", r = S(), g = s("input"), o(n, "type", "time"), o(n, "class", "day-time-input svelte-24n97o"), n.value = a = /*row*/
      t[67]?.dayStarts?.[
        /*i*/
        t[70]
      ] || /*row*/
      t[67]?.start || "", o(l, "class", "day-time-sep svelte-24n97o"), o(g, "type", "time"), o(g, "class", "day-time-input svelte-24n97o"), g.value = _ = /*row*/
      t[67]?.dayEnds?.[
        /*i*/
        t[70]
      ] || /*row*/
      t[67]?.end || "", o(e, "class", "day-times-wrap svelte-24n97o");
    },
    m(C, P) {
      de(C, e, P), i(e, n), i(e, u), i(e, l), i(e, r), i(e, g), c || (D = [
        W(n, "change", R),
        W(g, "change", A)
      ], c = !0);
    },
    p(C, P) {
      t = C, P[0] & /*visibleRows, teamOptions*/
      16896 && a !== (a = /*row*/
      t[67]?.dayStarts?.[
        /*i*/
        t[70]
      ] || /*row*/
      t[67]?.start || "") && n.value !== a && (n.value = a), P[0] & /*visibleRows, teamOptions*/
      16896 && _ !== (_ = /*row*/
      t[67]?.dayEnds?.[
        /*i*/
        t[70]
      ] || /*row*/
      t[67]?.end || "") && g.value !== _ && (g.value = _);
    },
    d(C) {
      C && se(e), c = !1, ot(D);
    }
  };
}
function rn(t) {
  let e, n, a, u, l, r, g, _, c, D, R, A, C, P;
  function G(...M) {
    return (
      /*change_handler_10*/
      t[62](
        /*row*/
        t[67],
        /*i*/
        t[70],
        ...M
      )
    );
  }
  let I = (
    /*row*/
    t[67]?.dayDuties?.[
      /*i*/
      t[70]
    ] !== "OFF" && /*row*/
    t[67]?.days?.[
      /*i*/
      t[70]
    ] !== "RDO" && sn(t)
  );
  return {
    c() {
      e = s("td"), n = s("div"), a = s("select"), u = s("option"), u.textContent = "PAX", l = s("option"), l.textContent = "BAG", r = s("option"), r.textContent = "DFO", g = s("option"), g.textContent = "Training", _ = s("option"), _.textContent = "OFF", D = S(), I && I.c(), u.__value = "PAX", b(u, u.__value), o(u, "class", "svelte-24n97o"), l.__value = "BAG", b(l, l.__value), o(l, "class", "svelte-24n97o"), r.__value = "DFO", b(r, r.__value), o(r, "class", "svelte-24n97o"), g.__value = "TRAINING", b(g, g.__value), o(g, "class", "svelte-24n97o"), _.__value = "OFF", b(_, _.__value), o(_, "class", "svelte-24n97o"), o(a, "class", "day-duty-select svelte-24n97o"), o(n, "class", "day-cell-inner svelte-24n97o"), o(e, "class", R = Wt(_n(
        /*row*/
        t[67]?.dayDuties?.[
          /*i*/
          t[70]
        ] ?? /*row*/
        t[67]?.days?.[
          /*i*/
          t[70]
        ]
      )) + " svelte-24n97o"), o(e, "style", A = /*dayStyle*/
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
    m(M, N) {
      de(M, e, N), i(e, n), i(n, a), i(a, u), i(a, l), i(a, r), i(a, g), i(a, _), K(
        a,
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
      ), i(n, D), I && I.m(n, null), C || (P = W(a, "change", G), C = !0);
    },
    p(M, N) {
      t = M, N[0] & /*visibleRows, teamOptions*/
      16896 && c !== (c = /*row*/
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
      )) && K(
        a,
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
      ] !== "RDO" ? I ? I.p(t, N) : (I = sn(t), I.c(), I.m(n, null)) : I && (I.d(1), I = null), N[0] & /*visibleRows, teamOptions*/
      16896 && R !== (R = Wt(_n(
        /*row*/
        t[67]?.dayDuties?.[
          /*i*/
          t[70]
        ] ?? /*row*/
        t[67]?.days?.[
          /*i*/
          t[70]
        ]
      )) + " svelte-24n97o") && o(e, "class", R), N[0] & /*visibleRows, teamOptions*/
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
      )) && o(e, "style", A);
    },
    d(M) {
      M && se(e), I && I.d(), C = !1, P();
    }
  };
}
function un(t, e) {
  let n, a, u, l, r, g, _, c, D, R, A, C, P, G, I, M, N, v, p, h, m, w, E, k, L, H, X, te, De, q, ne, z, Ne, qe, re, ue, j, _e, Be, Te, Le, Q, he, ve, ge, ze, Ke, at, le, Y, pe, ye, ke, fe, me, Ue, F, je, Ye, x, Pe, be, Me, Ge, st, Je, Qe, f = (
    /*row*/
    (e[67]?.rdos ?? "—") + ""
  ), O, $, Ve, Ze = (
    /*row*/
    (e[67]?.paid ?? "") + ""
  ), _t, rt, ht, xe, ut = (
    /*row*/
    (e[67]?.hours ?? "") + ""
  ), tt, ft, nt, Ct, Xe = we(
    /*teamOptions*/
    e[9]
  ), ie = [];
  for (let y = 0; y < Xe.length; y += 1)
    ie[y] = nn(Jt(e, Xe, y));
  function vt(...y) {
    return (
      /*change_handler*/
      e[52](
        /*row*/
        e[67],
        ...y
      )
    );
  }
  function It(...y) {
    return (
      /*change_handler_1*/
      e[53](
        /*row*/
        e[67],
        ...y
      )
    );
  }
  let We = we(
    /*shiftOptions*/
    e[8]
  ), oe = [];
  for (let y = 0; y < We.length; y += 1)
    oe[y] = ln(Yt(e, We, y));
  function gt(...y) {
    return (
      /*change_handler_2*/
      e[54](
        /*row*/
        e[67],
        ...y
      )
    );
  }
  function Et(...y) {
    return (
      /*change_handler_3*/
      e[55](
        /*row*/
        e[67],
        ...y
      )
    );
  }
  function pt(...y) {
    return (
      /*change_handler_4*/
      e[56](
        /*row*/
        e[67],
        ...y
      )
    );
  }
  let $e = we(dn(
    /*BASE_POSITIONS*/
    e[15],
    /*row*/
    e[67]?.position
  )), ee = [];
  for (let y = 0; y < $e.length; y += 1)
    ee[y] = on(zt(e, $e, y));
  function Bt(...y) {
    return (
      /*change_handler_5*/
      e[57](
        /*row*/
        e[67],
        ...y
      )
    );
  }
  let He = we(
    /*BASE_EMPS*/
    e[16]
  ), ae = [];
  for (let y = 0; y < He.length; y += 1)
    ae[y] = an(qt(e, He, y));
  function yt(...y) {
    return (
      /*change_handler_6*/
      e[58](
        /*row*/
        e[67],
        ...y
      )
    );
  }
  function Lt(...y) {
    return (
      /*change_handler_7*/
      e[59](
        /*row*/
        e[67],
        ...y
      )
    );
  }
  function Ae(...y) {
    return (
      /*change_handler_8*/
      e[60](
        /*row*/
        e[67],
        ...y
      )
    );
  }
  function Ft(...y) {
    return (
      /*change_handler_9*/
      e[61](
        /*row*/
        e[67],
        ...y
      )
    );
  }
  let Se = we([0, 1, 2, 3, 4, 5, 6]), Oe = [];
  for (let y = 0; y < 7; y += 1)
    Oe[y] = rn(jt(e, Se, y));
  return {
    key: t,
    first: null,
    c() {
      n = s("tr"), a = s("td"), u = s("select"), l = s("option"), l.textContent = "—";
      for (let y = 0; y < ie.length; y += 1)
        ie[y].c();
      _ = S(), c = s("td"), D = s("input"), C = S(), P = s("td"), G = s("select"), I = s("option"), I.textContent = "—";
      for (let y = 0; y < oe.length; y += 1)
        oe[y].c();
      v = S(), p = s("td"), h = s("input"), E = S(), k = s("td"), L = s("input"), te = S(), De = s("td"), q = s("select"), ne = s("option"), ne.textContent = "—";
      for (let y = 0; y < ee.length; y += 1)
        ee[y].c();
      qe = S(), re = s("td"), ue = s("select"), j = s("option"), j.textContent = "—";
      for (let y = 0; y < ae.length; y += 1)
        ae[y].c();
      Te = S(), Le = s("td"), Q = s("select"), he = s("option"), he.textContent = "—", ve = s("option"), ve.textContent = "M", ge = s("option"), ge.textContent = "F", at = S(), le = s("td"), Y = s("select"), pe = s("option"), pe.textContent = "—", ye = s("option"), ye.textContent = "DFO", ke = s("option"), ke.textContent = "BAG", fe = s("option"), fe.textContent = "PAX", me = s("option"), me.textContent = "TRAINING", je = S(), Ye = s("td"), x = s("select"), Pe = s("option"), Pe.textContent = "—", be = s("option"), be.textContent = "A", Me = s("option"), Me.textContent = "B", Je = S(), Qe = s("td"), O = ce(f), $ = S(), Ve = s("td"), _t = ce(Ze), rt = S();
      for (let y = 0; y < 7; y += 1)
        Oe[y].c();
      ht = S(), xe = s("td"), tt = ce(ut), l.__value = "", b(l, l.__value), o(l, "class", "svelte-24n97o"), o(u, "class", "line-edit svelte-24n97o"), o(u, "data-field", "team"), o(u, "data-line-id", r = /*row*/
      e[67]?.id), o(a, "class", "svelte-24n97o"), o(D, "type", "text"), o(D, "class", "line-edit line-code-input svelte-24n97o"), o(D, "data-field", "lineCode"), o(D, "data-line-id", R = /*row*/
      e[67]?.id), D.value = A = /*row*/
      e[67]?.line ?? "", o(c, "class", "svelte-24n97o"), I.__value = "", b(I, I.__value), o(I, "class", "svelte-24n97o"), o(G, "class", "line-edit svelte-24n97o"), o(G, "data-field", "shift"), o(G, "data-line-id", M = /*row*/
      e[67]?.id), o(P, "class", "svelte-24n97o"), o(h, "type", "time"), o(h, "class", "line-edit line-time-input svelte-24n97o"), o(h, "data-field", "start"), o(h, "data-line-id", m = /*row*/
      e[67]?.id), h.value = w = /*row*/
      e[67]?.start ?? "", o(p, "class", "svelte-24n97o"), o(L, "type", "time"), o(L, "class", "line-edit line-time-input svelte-24n97o"), o(L, "data-field", "end"), o(L, "data-line-id", H = /*row*/
      e[67]?.id), L.value = X = /*row*/
      e[67]?.end ?? "", o(k, "class", "svelte-24n97o"), ne.__value = "", b(ne, ne.__value), o(ne, "class", "svelte-24n97o"), o(q, "class", "line-edit svelte-24n97o"), o(q, "data-field", "position"), o(q, "data-line-id", z = /*row*/
      e[67]?.id), o(De, "class", "svelte-24n97o"), j.__value = "", b(j, j.__value), o(j, "class", "svelte-24n97o"), o(ue, "class", "line-edit svelte-24n97o"), o(ue, "data-field", "emp"), o(ue, "data-line-id", _e = /*row*/
      e[67]?.id), o(re, "class", "svelte-24n97o"), he.__value = "", b(he, he.__value), o(he, "class", "svelte-24n97o"), ve.__value = "M", b(ve, ve.__value), o(ve, "class", "svelte-24n97o"), ge.__value = "F", b(ge, ge.__value), o(ge, "class", "svelte-24n97o"), o(Q, "class", "line-edit svelte-24n97o"), o(Q, "data-field", "sex"), o(Q, "data-line-id", ze = /*row*/
      e[67]?.id), o(Le, "class", "svelte-24n97o"), pe.__value = "", b(pe, pe.__value), o(pe, "class", "svelte-24n97o"), ye.__value = "DFO", b(ye, ye.__value), o(ye, "class", "svelte-24n97o"), ke.__value = "BAG", b(ke, ke.__value), o(ke, "class", "svelte-24n97o"), fe.__value = "PAX", b(fe, fe.__value), o(fe, "class", "svelte-24n97o"), me.__value = "TRAINING", b(me, me.__value), o(me, "class", "svelte-24n97o"), o(Y, "class", "line-edit svelte-24n97o"), o(Y, "data-field", "function"), o(Y, "data-line-id", Ue = /*row*/
      e[67]?.id), o(le, "class", "svelte-24n97o"), Pe.__value = "", b(Pe, Pe.__value), o(Pe, "class", "svelte-24n97o"), be.__value = "A", b(be, be.__value), o(be, "class", "svelte-24n97o"), Me.__value = "B", b(Me, Me.__value), o(Me, "class", "svelte-24n97o"), o(x, "class", "line-edit svelte-24n97o"), o(x, "data-field", "certPool"), o(x, "data-line-id", Ge = /*row*/
      e[67]?.id), o(Ye, "class", "svelte-24n97o"), o(Qe, "class", "line-rdo-cell svelte-24n97o"), o(Ve, "class", "line-center svelte-24n97o"), o(xe, "class", "line-hours svelte-24n97o"), o(n, "data-line-row", ft = /*row*/
      e[67]?.id), J(n, "height", bt + "px"), o(n, "class", "svelte-24n97o"), this.first = n;
    },
    m(y, V) {
      de(y, n, V), i(n, a), i(a, u), i(u, l);
      for (let d = 0; d < ie.length; d += 1)
        ie[d] && ie[d].m(u, null);
      K(
        u,
        /*row*/
        e[67]?.teamId ?? ""
      ), i(n, _), i(n, c), i(c, D), i(n, C), i(n, P), i(P, G), i(G, I);
      for (let d = 0; d < oe.length; d += 1)
        oe[d] && oe[d].m(G, null);
      K(
        G,
        /*row*/
        e[67]?.shiftId ?? ""
      ), i(n, v), i(n, p), i(p, h), i(n, E), i(n, k), i(k, L), i(n, te), i(n, De), i(De, q), i(q, ne);
      for (let d = 0; d < ee.length; d += 1)
        ee[d] && ee[d].m(q, null);
      K(
        q,
        /*row*/
        e[67]?.position ?? ""
      ), i(n, qe), i(n, re), i(re, ue), i(ue, j);
      for (let d = 0; d < ae.length; d += 1)
        ae[d] && ae[d].m(ue, null);
      K(
        ue,
        /*row*/
        e[67]?.emp ?? ""
      ), i(n, Te), i(n, Le), i(Le, Q), i(Q, he), i(Q, ve), i(Q, ge), K(
        Q,
        /*row*/
        e[67]?.sex ?? ""
      ), i(n, at), i(n, le), i(le, Y), i(Y, pe), i(Y, ye), i(Y, ke), i(Y, fe), i(Y, me), K(
        Y,
        /*row*/
        e[67]?.function ?? ""
      ), i(n, je), i(n, Ye), i(Ye, x), i(x, Pe), i(x, be), i(x, Me), K(
        x,
        /*row*/
        e[67]?.certPool ?? ""
      ), i(n, Je), i(n, Qe), i(Qe, O), i(n, $), i(n, Ve), i(Ve, _t), i(n, rt);
      for (let d = 0; d < 7; d += 1)
        Oe[d] && Oe[d].m(n, null);
      i(n, ht), i(n, xe), i(xe, tt), nt || (Ct = [
        W(u, "change", vt),
        W(D, "change", It),
        W(G, "change", gt),
        W(h, "change", Et),
        W(L, "change", pt),
        W(q, "change", Bt),
        W(ue, "change", yt),
        W(Q, "change", Lt),
        W(Y, "change", Ae),
        W(x, "change", Ft)
      ], nt = !0);
    },
    p(y, V) {
      if (e = y, V[0] & /*teamOptions*/
      512) {
        Xe = we(
          /*teamOptions*/
          e[9]
        );
        let d;
        for (d = 0; d < Xe.length; d += 1) {
          const Z = Jt(e, Xe, d);
          ie[d] ? ie[d].p(Z, V) : (ie[d] = nn(Z), ie[d].c(), ie[d].m(u, null));
        }
        for (; d < ie.length; d += 1)
          ie[d].d(1);
        ie.length = Xe.length;
      }
      if (V[0] & /*visibleRows, teamOptions*/
      16896 && r !== (r = /*row*/
      e[67]?.id) && o(u, "data-line-id", r), V[0] & /*visibleRows, teamOptions*/
      16896 && g !== (g = /*row*/
      e[67]?.teamId ?? "") && K(
        u,
        /*row*/
        e[67]?.teamId ?? ""
      ), V[0] & /*visibleRows, teamOptions*/
      16896 && R !== (R = /*row*/
      e[67]?.id) && o(D, "data-line-id", R), V[0] & /*visibleRows, teamOptions*/
      16896 && A !== (A = /*row*/
      e[67]?.line ?? "") && D.value !== A && (D.value = A), V[0] & /*shiftOptions*/
      256) {
        We = we(
          /*shiftOptions*/
          e[8]
        );
        let d;
        for (d = 0; d < We.length; d += 1) {
          const Z = Yt(e, We, d);
          oe[d] ? oe[d].p(Z, V) : (oe[d] = ln(Z), oe[d].c(), oe[d].m(G, null));
        }
        for (; d < oe.length; d += 1)
          oe[d].d(1);
        oe.length = We.length;
      }
      if (V[0] & /*visibleRows, teamOptions*/
      16896 && M !== (M = /*row*/
      e[67]?.id) && o(G, "data-line-id", M), V[0] & /*visibleRows, teamOptions*/
      16896 && N !== (N = /*row*/
      e[67]?.shiftId ?? "") && K(
        G,
        /*row*/
        e[67]?.shiftId ?? ""
      ), V[0] & /*visibleRows, teamOptions*/
      16896 && m !== (m = /*row*/
      e[67]?.id) && o(h, "data-line-id", m), V[0] & /*visibleRows, teamOptions*/
      16896 && w !== (w = /*row*/
      e[67]?.start ?? "") && h.value !== w && (h.value = w), V[0] & /*visibleRows, teamOptions*/
      16896 && H !== (H = /*row*/
      e[67]?.id) && o(L, "data-line-id", H), V[0] & /*visibleRows, teamOptions*/
      16896 && X !== (X = /*row*/
      e[67]?.end ?? "") && L.value !== X && (L.value = X), V[0] & /*BASE_POSITIONS, visibleRows*/
      49152) {
        $e = we(dn(
          /*BASE_POSITIONS*/
          e[15],
          /*row*/
          e[67]?.position
        ));
        let d;
        for (d = 0; d < $e.length; d += 1) {
          const Z = zt(e, $e, d);
          ee[d] ? ee[d].p(Z, V) : (ee[d] = on(Z), ee[d].c(), ee[d].m(q, null));
        }
        for (; d < ee.length; d += 1)
          ee[d].d(1);
        ee.length = $e.length;
      }
      if (V[0] & /*visibleRows, teamOptions*/
      16896 && z !== (z = /*row*/
      e[67]?.id) && o(q, "data-line-id", z), V[0] & /*visibleRows, teamOptions*/
      16896 && Ne !== (Ne = /*row*/
      e[67]?.position ?? "") && K(
        q,
        /*row*/
        e[67]?.position ?? ""
      ), V[0] & /*BASE_EMPS*/
      65536) {
        He = we(
          /*BASE_EMPS*/
          e[16]
        );
        let d;
        for (d = 0; d < He.length; d += 1) {
          const Z = qt(e, He, d);
          ae[d] ? ae[d].p(Z, V) : (ae[d] = an(Z), ae[d].c(), ae[d].m(ue, null));
        }
        for (; d < ae.length; d += 1)
          ae[d].d(1);
        ae.length = He.length;
      }
      if (V[0] & /*visibleRows, teamOptions*/
      16896 && _e !== (_e = /*row*/
      e[67]?.id) && o(ue, "data-line-id", _e), V[0] & /*visibleRows, teamOptions*/
      16896 && Be !== (Be = /*row*/
      e[67]?.emp ?? "") && K(
        ue,
        /*row*/
        e[67]?.emp ?? ""
      ), V[0] & /*visibleRows, teamOptions*/
      16896 && ze !== (ze = /*row*/
      e[67]?.id) && o(Q, "data-line-id", ze), V[0] & /*visibleRows, teamOptions*/
      16896 && Ke !== (Ke = /*row*/
      e[67]?.sex ?? "") && K(
        Q,
        /*row*/
        e[67]?.sex ?? ""
      ), V[0] & /*visibleRows, teamOptions*/
      16896 && Ue !== (Ue = /*row*/
      e[67]?.id) && o(Y, "data-line-id", Ue), V[0] & /*visibleRows, teamOptions*/
      16896 && F !== (F = /*row*/
      e[67]?.function ?? "") && K(
        Y,
        /*row*/
        e[67]?.function ?? ""
      ), V[0] & /*visibleRows, teamOptions*/
      16896 && Ge !== (Ge = /*row*/
      e[67]?.id) && o(x, "data-line-id", Ge), V[0] & /*visibleRows, teamOptions*/
      16896 && st !== (st = /*row*/
      e[67]?.certPool ?? "") && K(
        x,
        /*row*/
        e[67]?.certPool ?? ""
      ), V[0] & /*visibleRows*/
      16384 && f !== (f = /*row*/
      (e[67]?.rdos ?? "—") + "") && lt(O, f), V[0] & /*visibleRows*/
      16384 && Ze !== (Ze = /*row*/
      (e[67]?.paid ?? "") + "") && lt(_t, Ze), V[0] & /*visibleRows, dayStyle, emitDayTime, emitDayDuty*/
      1720320) {
        Se = we([0, 1, 2, 3, 4, 5, 6]);
        let d;
        for (d = 0; d < 7; d += 1) {
          const Z = jt(e, Se, d);
          Oe[d] ? Oe[d].p(Z, V) : (Oe[d] = rn(Z), Oe[d].c(), Oe[d].m(n, ht));
        }
        for (; d < 7; d += 1)
          Oe[d].d(1);
      }
      V[0] & /*visibleRows*/
      16384 && ut !== (ut = /*row*/
      (e[67]?.hours ?? "") + "") && lt(tt, ut), V[0] & /*visibleRows, teamOptions*/
      16896 && ft !== (ft = /*row*/
      e[67]?.id) && o(n, "data-line-row", ft);
    },
    d(y) {
      y && se(n), dt(ie, y), dt(oe, y), dt(ee, y), dt(ae, y), dt(Oe, y), nt = !1, ot(Ct);
    }
  };
}
function fn(t) {
  let e, n;
  return {
    c() {
      e = s("tr"), n = s("td"), o(n, "colspan", "20"), J(n, "padding", "0"), J(n, "border", "none"), o(n, "class", "svelte-24n97o"), J(
        e,
        "height",
        /*paddingBottom*/
        t[12] + "px"
      ), o(e, "class", "svelte-24n97o");
    },
    m(a, u) {
      de(a, e, u), i(e, n);
    },
    p(a, u) {
      u[0] & /*paddingBottom*/
      4096 && J(
        e,
        "height",
        /*paddingBottom*/
        a[12] + "px"
      );
    },
    d(a) {
      a && se(e);
    }
  };
}
function Kn(t) {
  let e;
  function n(l, r) {
    return (
      /*mode*/
      l[7] === "svelte" ? Hn : Wn
    );
  }
  let a = n(t), u = a(t);
  return {
    c() {
      e = s("div"), u.c(), o(e, "class", "lines-table-root svelte-24n97o"), J(e, "min-height", "min(70vh, 720px)"), J(e, "height", "min(70vh, 720px)"), J(e, "width", "100%"), J(
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
    m(l, r) {
      de(l, e, r), u.m(e, null);
    },
    p(l, r) {
      a === (a = n(l)) && u ? u.p(l, r) : (u.d(1), u = a(l), u && (u.c(), u.m(e, null))), r[0] & /*exportStyle*/
      1024 && J(
        e,
        "--export-rdo",
        /*exportStyle*/
        l[10]?.rdo || "#000000"
      ), r[0] & /*exportStyle*/
      1024 && J(
        e,
        "--export-bag",
        /*exportStyle*/
        l[10]?.bag || "#F4B4B4"
      ), r[0] & /*exportStyle*/
      1024 && J(
        e,
        "--export-dfo",
        /*exportStyle*/
        l[10]?.dfo || "#FFF3A8"
      ), r[0] & /*exportStyle*/
      1024 && J(
        e,
        "--export-pax",
        /*exportStyle*/
        l[10]?.pax || "#A0C4FF"
      ), r[0] & /*exportStyle*/
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
      l && se(e), u.d();
    }
  };
}
const bt = 42, cn = 8;
function dn(t, e) {
  const n = e == null ? "" : String(e);
  return !n || t.indexOf(n) >= 0 ? t : t.concat([n]);
}
function kt(t) {
  if (!t) return "";
  const e = t.name || t.id || "";
  return t.start && t.end ? (e ? e + " " : "") + "(" + t.start + "–" + t.end + ")" : t.start ? e ? e + " " + t.start : t.start : e;
}
function yn(t) {
  const e = String(t || "").toUpperCase();
  return e === "RDO" || e === "—" || e === "-" || e === "OFF" ? "rdo" : e === "BAG" || e === "BAGS" ? "bag" : e === "DFO" ? "dfo" : e === "PAX" ? "pax" : e === "TRAINING" ? "training" : null;
}
function _n(t) {
  const e = yn(t);
  return e === "rdo" ? "cell-day-col cell-rdo" : e === "bag" ? "cell-day-col cell-function-duty cell-bag" : e === "dfo" ? "cell-day-col cell-function-duty cell-dfo" : e === "pax" ? "cell-day-col cell-function-duty cell-pax" : e === "training" ? "cell-day-col cell-function-duty cell-training" : "cell-day-col cell-work";
}
function Un(t, e, n) {
  let a, u, l, r, g, _, c, { rows: D = [] } = e, { mode: R = "svelte" } = e, { shiftOptions: A = [] } = e, { teamOptions: C = [] } = e, { exportStyle: P = Kt() } = e, { onInlineEdit: G = null } = e, { onDayToggle: I = null } = e, { onDayDutyEdit: M = null } = e, { onDayTimeEdit: N = null } = e, { onSort: v = null } = e, { onFilter: p = null } = e, { currentSortBy: h = "role" } = e, { currentSortDir: m = "asc" } = e, { filterRole: w = "ALL" } = e, { filterShift: E = "" } = e, { filterTeam: k = "" } = e, { filterSex: L = "" } = e, { filterDuty: H = "" } = e, { filterDay: X = "" } = e, { searchCode: te = "" } = e;
  const De = ["TSO", "LTSO", "STSO"], q = ["FT", "PT"];
  function ne(f) {
    const O = yn(f);
    if (!O) return;
    const Ve = (P || Kt())[O];
    if (Ve)
      return "background:" + Ve + ";color:" + Xn(Ve) + ";";
  }
  function z(f, O, $) {
    G?.({ lineId: f, field: O, value: $ });
  }
  function Ne(f, O, $) {
    M?.({ lineId: f, dayIndex: O, duty: $ });
  }
  function qe(f, O, $, Ve) {
    N?.({ lineId: f, dayIndex: O, field: $, value: Ve });
  }
  function re(f) {
    let O = "asc";
    h === f && (O = m === "asc" ? "desc" : "asc"), v?.({ sortBy: f, sortDir: O });
  }
  function ue() {
    p?.({
      filterRole: w,
      filterShift: E,
      filterTeam: k,
      filterSex: L,
      filterDuty: H,
      filterDay: X,
      searchCode: te
    });
  }
  function j(f) {
    return h !== f ? "" : m === "asc" ? " ▲" : " ▼";
  }
  let _e = 0, Be = 600, Te;
  function Le(f) {
    n(34, _e = f.target.scrollTop);
  }
  Cn(() => {
    Te && n(35, Be = Te.clientHeight || 600);
  });
  function Q() {
    te = this.value, n(6, te);
  }
  function he() {
    w = wt(this), n(0, w);
  }
  function ve() {
    k = wt(this), n(2, k), n(9, C);
  }
  function ge() {
    E = wt(this), n(1, E), n(8, A);
  }
  function ze() {
    H = wt(this), n(4, H);
  }
  function Ke() {
    X = wt(this), n(5, X);
  }
  function at() {
    L = wt(this), n(3, L);
  }
  const le = () => re("team"), Y = () => re("line"), pe = () => re("shift"), ye = () => re("start"), ke = () => re("role"), fe = (f, O) => z(f?.id, "team", O.target.value), me = (f, O) => z(f?.id, "lineCode", O.target.value), Ue = (f, O) => z(f?.id, "shift", O.target.value), F = (f, O) => z(f?.id, "start", O.target.value), je = (f, O) => z(f?.id, "end", O.target.value), Ye = (f, O) => z(f?.id, "position", O.target.value), x = (f, O) => z(f?.id, "emp", O.target.value), Pe = (f, O) => z(f?.id, "sex", O.target.value), be = (f, O) => z(f?.id, "function", O.target.value), Me = (f, O) => z(f?.id, "certPool", O.target.value), Ge = (f, O, $) => Ne(f?.id, O, $.target.value), st = (f, O, $) => qe(f?.id, O, "start", $.target.value), Je = (f, O, $) => qe(f?.id, O, "end", $.target.value);
  function Qe(f) {
    Pt[f ? "unshift" : "push"](() => {
      Te = f, n(11, Te);
    });
  }
  return t.$$set = (f) => {
    "rows" in f && n(25, D = f.rows), "mode" in f && n(7, R = f.mode), "shiftOptions" in f && n(8, A = f.shiftOptions), "teamOptions" in f && n(9, C = f.teamOptions), "exportStyle" in f && n(10, P = f.exportStyle), "onInlineEdit" in f && n(26, G = f.onInlineEdit), "onDayToggle" in f && n(27, I = f.onDayToggle), "onDayDutyEdit" in f && n(28, M = f.onDayDutyEdit), "onDayTimeEdit" in f && n(29, N = f.onDayTimeEdit), "onSort" in f && n(30, v = f.onSort), "onFilter" in f && n(31, p = f.onFilter), "currentSortBy" in f && n(32, h = f.currentSortBy), "currentSortDir" in f && n(33, m = f.currentSortDir), "filterRole" in f && n(0, w = f.filterRole), "filterShift" in f && n(1, E = f.filterShift), "filterTeam" in f && n(2, k = f.filterTeam), "filterSex" in f && n(3, L = f.filterSex), "filterDuty" in f && n(4, H = f.filterDuty), "filterDay" in f && n(5, X = f.filterDay), "searchCode" in f && n(6, te = f.searchCode);
  }, t.$$.update = () => {
    t.$$.dirty[0] & /*rows*/
    33554432 && n(39, a = D.length), t.$$.dirty[1] & /*totalRows*/
    256 && n(37, u = a * bt), t.$$.dirty[1] & /*scrollTop*/
    8 && n(38, l = Math.max(0, Math.floor(_e / bt) - cn)), t.$$.dirty[1] & /*totalRows, scrollTop, viewportHeight*/
    280 && n(36, r = Math.min(a, Math.ceil((_e + Be) / bt) + cn)), t.$$.dirty[0] & /*rows*/
    33554432 | t.$$.dirty[1] & /*startIndex, endIndex*/
    160 && n(14, g = D.slice(l, r)), t.$$.dirty[1] & /*startIndex*/
    128 && n(13, _ = l * bt), t.$$.dirty[1] & /*totalHeight, endIndex*/
    96 && n(12, c = Math.max(0, u - r * bt));
  }, [
    w,
    E,
    k,
    L,
    H,
    X,
    te,
    R,
    A,
    C,
    P,
    Te,
    c,
    _,
    g,
    De,
    q,
    ne,
    z,
    Ne,
    qe,
    re,
    ue,
    j,
    Le,
    D,
    G,
    I,
    M,
    N,
    v,
    p,
    h,
    m,
    _e,
    Be,
    r,
    u,
    l,
    a,
    Q,
    he,
    ve,
    ge,
    ze,
    Ke,
    at,
    le,
    Y,
    pe,
    ye,
    ke,
    fe,
    me,
    Ue,
    F,
    je,
    Ye,
    x,
    Pe,
    be,
    Me,
    Ge,
    st,
    Je,
    Qe
  ];
}
class jn extends Pn {
  constructor(e) {
    super(), Nn(
      this,
      e,
      Un,
      Kn,
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
function qn(t) {
  if (t = t || window.Scheduler, !t) return;
  function e(l) {
    var r = String(l || "").trim();
    if (!r) return "";
    var g = r.match(/^(\d+)$/);
    return g && Number(g[1]) < 10 ? "0" + g[1] : r;
  }
  function n(l, r) {
    var g = (l.rdoDays || []).map(Number).filter(function(c) {
      return Number.isInteger(c) && c >= 0 && c <= 6;
    }), _ = g.length ? g.map(function(c) {
      return r && r[c] != null ? r[c] : String(c);
    }).join(",") : "—";
    return l.rdoHard && (_ += " (hard)"), _;
  }
  function a(l, r, g) {
    return g || "WORK";
  }
  function u(l, r) {
    return r === "TRAINING" ? "TRAINING" : r === "BAG" || r === "PAX" || r === "DFO" ? r : l.isTraining || l.trainingClass || l.empClass === "ESTI" || l.empClass === "MSTI" || l.extraName === "ESTI" || l.extraName === "MSTI" ? "TRAINING" : l.function === "BAG" ? "BAG" : l.function === "DFO" || l.function === "PAX" ? "PAX" : r === "BAG" || r === "PAX" ? r : null;
  }
  t.lineToRowModel = function(l, r, g) {
    if (g = g || {}, !l || !r) return null;
    for (var _ = g.dayNames || ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], c = typeof g.teamResolver == "function" ? g.teamResolver(l.id) : null, D = typeof g.shiftResolver == "function" ? g.shiftResolver(l.shiftId) : null, R = l.shiftName || D && D.name || "", A = l.startTime || (D && D.start ? D.start : ""), C = l.endTime || (D && D.end ? D.end : ""), P = l.shiftLabel || (A && C ? A + "–" + C : A || "WORK"), G = !!(l.isExtra || l.extraPositionId), I = G ? l.position || l.extraName || "TSO" : l.isStso || l.empClass === "STSO" ? "STSO" : l.isLtso || l.empClass === "LTSO" ? "LTSO" : "TSO", M = G ? l.empClass === "PT" ? "PT" : "FT" : I === "STSO" || I === "LTSO" ? "FT" : l.empClass === "PT" ? "PT" : "FT", N = l.paid || 0, v = Array.isArray(r) ? r : r[l.id] || r[String(l.id)] || [], p = [], h = [], m = [], w = [], E = 0, k = 0; k < 7; k++) {
      var L = l.dayTimes && l.dayTimes[String(k)], H = typeof g.effectiveTimesResolver == "function" ? g.effectiveTimesResolver(l.shiftId, k) : null, X = L && L.start || l.startTime || H && H.start || A, te = L && L.end || l.endTime || H && H.end || C;
      m.push(X), w.push(te);
      var De = v[k];
      if (De === "WORK") {
        E += N;
        var q = typeof g.rotationDutyResolver == "function" ? g.rotationDutyResolver(l.id, k) : null, ne = a(l, q, P);
        p.push(ne), h.push(u(l, q) || "PAX");
      } else
        p.push("RDO"), h.push("OFF");
    }
    return {
      id: l.id,
      teamId: c && c.id || "",
      shiftId: l.shiftId || "",
      team: e(c && (c.name || c.id) || ""),
      line: l.lineCode || "",
      shift: R,
      start: A,
      end: C,
      position: I,
      emp: M,
      sex: l.sex === "F" || l.sex === "M" ? l.sex : "",
      function: l.function || "",
      certPool: l.certPool || "",
      rdos: n(l, _),
      paid: N,
      days: p,
      dayDuties: h,
      dayStarts: m,
      dayEnds: w,
      hours: E
    };
  }, t.getRowModels = function(l, r, g) {
    return !Array.isArray(l) || !r || typeof r != "object" ? [] : l.map(function(_) {
      return t.lineToRowModel(_, r, g);
    }).filter(Boolean);
  }, t.getLineRowModels = function(l) {
    var r = t.state && Array.isArray(t.state.lines) ? t.state.lines : [], g = t.state && t.state.schedule || {}, _ = Object.assign({}, l || {});
    return !_.teamResolver && typeof t.teamMetaForLine == "function" && (_.teamResolver = t.teamMetaForLine), !_.shiftResolver && typeof t.getShift == "function" && (_.shiftResolver = t.getShift), !_.rotationDutyResolver && typeof t.getRotationDuty == "function" && (_.rotationDutyResolver = t.getRotationDuty), !_.effectiveTimesResolver && typeof t.getEffectiveShiftTimes == "function" && (_.effectiveTimesResolver = t.getEffectiveShiftTimes), t.getRowModels(r, g, _);
  };
}
function zn(t) {
  if (t = t || window.Scheduler, !t) return;
  function e(g, _) {
    var c = t.getRotationDuty ? t.getRotationDuty(g.id, _) : null;
    return c || g.function || null;
  }
  t.dutyFor = e;
  function n(g) {
    if (g.shiftLabel) return g.shiftLabel;
    var _ = t.getShift ? t.getShift(g.shiftId) : null;
    return _ && _.start && _.end ? _.start + "–" + _.end : _ && _.start ? _.start : "WORK";
  }
  function a(g) {
    if (!(!g || g.function !== "BAG")) {
      t.state.functionRotation || (t.state.functionRotation = {});
      var _ = String(g.id);
      t.state.functionRotation[_] || (t.state.functionRotation[_] = []);
      for (var c = t.state.schedule && (t.state.schedule[g.id] || t.state.schedule[_]) || [], D = Math.max(c.length, (t.state.weekCount || 1) * 7), R = 0; R < D; R++) {
        for (; t.state.functionRotation[_].length <= R; ) t.state.functionRotation[_].push(null);
        c[R] === "WORK" && (t.state.functionRotation[_][R] = "BAG");
      }
    }
  }
  function u(g) {
    if (!(!g || g.function !== "DFO")) {
      t.state.functionRotation || (t.state.functionRotation = {});
      var _ = String(g.id);
      t.state.functionRotation[_] || (t.state.functionRotation[_] = []);
      for (var c = t.state.schedule && (t.state.schedule[g.id] || t.state.schedule[_]) || [], D = Math.max(c.length, (t.state.weekCount || 1) * 7), R = 0; R < D; R++) {
        for (; t.state.functionRotation[_].length <= R; ) t.state.functionRotation[_].push(null);
        c[R] === "WORK" && (t.state.functionRotation[_][R] = "DFO");
      }
    }
  }
  function l() {
    var g = document.getElementById("lines-tbody"), _ = g || document.querySelector(".lines-virtual-root");
    _ && g && _.querySelectorAll("td.cell-toggle").forEach(function(c) {
      var D = t.findLineById ? t.findLineById(c.getAttribute("data-line-id")) : null, R = +c.getAttribute("data-day");
      if (!(!D || isNaN(R))) {
        var A = (t.state.schedule[D.id] || t.state.schedule[String(D.id)] || [])[R] || "RDO";
        if (c.style.background = "", c.style.color = "", A !== "WORK") {
          c.className = "cell-rdo cell-toggle", c.textContent = "RDO", c.style.background = "#000", c.style.color = "#fff", c.style.opacity = "1";
          return;
        }
        var C = e(D, R), P = C === "BAG" || C === "BAGS", G = C === "DFO", I = "";
        P ? I = " cell-function-duty cell-bag" : G && (I = " cell-function-duty cell-dfo"), c.className = "cell-work cell-toggle" + I, c.textContent = n(D);
      }
    });
  }
  t.paintLineColors = l;
  function r(g) {
    var _ = t[g];
    if (!(typeof _ != "function" || _._lineColorsWrapped)) {
      var c = function() {
        if (t.__USE_SVELTE_LINES) return _.apply(this, arguments);
        var D = _.apply(this, arguments);
        return setTimeout(l, 0), D;
      };
      c._lineColorsWrapped = !0, t[g] = c;
    }
  }
  r("renderLines"), r("renderAll"), r("generateFunctionAssignments"), t._lineColorsBound || (t._lineColorsBound = !0, document.addEventListener("change", function(g) {
    var _ = g.target;
    if (!(!_ || _.getAttribute("data-field") !== "function")) {
      var c = t.findLineById ? t.findLineById(_.getAttribute("data-line-id")) : null;
      c && (c.function = _.value === "DFO" || _.value === "PAX" || _.value === "BAG" ? _.value : "", c.function === "BAG" && a(c), c.function === "DFO" && u(c), t.renderLines ? t.renderLines() : l());
    }
  }));
}
function Jn(t) {
  const e = t || window.Scheduler;
  if (!e) return;
  qn(e), zn(e);
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
  function a() {
    return {
      teamResolver: typeof e.teamMetaForLine == "function" ? e.teamMetaForLine : null,
      shiftResolver: typeof e.getShift == "function" ? e.getShift : null,
      rotationDutyResolver: typeof e.getRotationDuty == "function" ? e.getRotationDuty : u,
      effectiveTimesResolver: typeof e.getEffectiveShiftTimes == "function" ? e.getEffectiveShiftTimes : null
    };
  }
  function u(v, p) {
    const h = String(v), m = e.state && e.state.functionRotation, w = m && (m[h] || m[v]);
    if (!Array.isArray(w)) return null;
    const E = w[p];
    return E === "BAG" ? "BAG" : E === "DFO" ? "DFO" : E === "PAX" ? "PAX" : E === "TRAINING" ? "TRAINING" : null;
  }
  function l(v, p, h) {
    var m = String(v);
    for (e.state.functionRotation || (e.state.functionRotation = {}), e.state.functionRotation[m] || (e.state.functionRotation[m] = []); e.state.functionRotation[m].length <= p; ) e.state.functionRotation[m].push(null);
    e.state.functionRotation[m][p] = h;
  }
  function r(v) {
    if (!v) return !1;
    if (v.function === "DFO") return !0;
    const p = v.functionEligible;
    return !!(p && (p.dfo === !0 || p.DFO === !0));
  }
  function g() {
    const v = e.state && Array.isArray(e.state.lines) ? e.state.lines : [], p = typeof e.sortLinesForView == "function" && typeof e.filterLinesForView == "function" ? e.sortLinesForView(e.filterLinesForView(v)) : v, h = e.state && e.state.schedule || {}, m = typeof e.getRowModels == "function" ? e.getRowModels(p, h, a()) : typeof e.getLineRowModels == "function" ? e.getLineRowModels(a()) : [];
    return Array.isArray(m) ? m : [];
  }
  function _() {
    return e.teams && Array.isArray(e.teams.teams) ? e.teams.teams : [];
  }
  function c() {
    return e.state && Array.isArray(e.state.shifts) ? e.state.shifts : [];
  }
  function D() {
    return typeof e.getExportStyle == "function" ? e.getExportStyle() : e.state && e.state.exportStyle || null;
  }
  function R(v) {
    if (!v || typeof v.$set != "function") return;
    const p = g();
    typeof e.applyExportCssVars == "function" && e.applyExportCssVars(), v.$set({
      rows: Array.isArray(p) ? p : [],
      shiftOptions: c(),
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
  function A(v) {
    if (!v) return;
    const p = e.findLineById ? e.findLineById(v.lineId) : null;
    if (!p) return;
    const h = v.field, m = v.value;
    if (h === "lineCode")
      p.lineCode = String(m || "").trim() || p.lineCode;
    else if (h === "sex")
      p.sex = m === "F" ? "F" : "M";
    else if (h === "function")
      p.function = m === "DFO" || m === "PAX" || m === "BAG" || m === "TRAINING" ? m : "";
    else if (h === "certPool") {
      var w = String(m || "").trim().toUpperCase();
      p.certPool = w === "A" || w === "B" ? w : "";
    } else if (h === "emp")
      e.applyLineEmp && e.applyLineEmp(p, m);
    else if (h === "position") {
      var E = !!(p.isExtra || p.extraPositionId), k = String(m ?? "").trim();
      E ? (k && (p.position = k, p.extraName = k), p.isStso = !1, p.isLtso = !1) : e.applyLineEmp && e.applyLineEmp(p, k);
    } else if (h === "shift")
      e.applyLineShift && e.applyLineShift(p, m);
    else if (h === "team")
      e.setLineTeam && e.setLineTeam(v.lineId, m);
    else if (h === "start" || h === "end") {
      var L = String(m || "").trim();
      if (e.isValidTimeText && !e.isValidTimeText(L)) return;
      h === "start" && (p.startTime = L), h === "end" && (p.endTime = L);
      var H = e.getShift ? e.getShift(p.shiftId) : null, X = p.startTime || (H ? H.start : ""), te = p.endTime || (H ? H.end : "");
      p.shiftLabel = (X || "") + "-" + (te || "");
    }
    e.updateStatus && e.updateStatus("Updated " + (p.lineCode || v.lineId)), N(), (h === "emp" || h === "position" || h === "shift" || h === "start" || h === "end") && e.renderCoverageBars && e.renderCoverageBars(), h === "team" && e.renderTeams && e.renderTeams(), window.dispatchEvent(new CustomEvent("lines:coverage-refresh"));
  }
  function C(v) {
    if (!v) return;
    const p = e.findLineById ? e.findLineById(v.lineId) : null, h = Number(v.dayIndex);
    if (!p || !Number.isInteger(h) || h < 0 || h > 6) return;
    const m = String(p.id);
    e.state.schedule || (e.state.schedule = {});
    var w = e.state.schedule[m] || e.state.schedule[p.id];
    for (Array.isArray(w) || (w = []), e.state.schedule[m] = w; e.state.schedule[m].length < 7; ) e.state.schedule[m].push("RDO");
    e.state.functionRotation || (e.state.functionRotation = {}), !e.state.functionRotation[m] && e.state.functionRotation[p.id] && (e.state.functionRotation[m] = e.state.functionRotation[p.id]);
    const E = e.state.schedule[m][h] || "RDO", k = p.function === "BAG", L = r(p);
    if (E !== "WORK")
      e.state.schedule[m][h] = "WORK", k ? l(m, h, "BAG") : L ? l(m, h, "PAX") : l(m, h, null);
    else if (k)
      e.state.schedule[m][h] = "RDO", l(m, h, null);
    else if (L) {
      var H = typeof e.getRotationDuty == "function" ? e.getRotationDuty(p.id, h) : u(p.id, h), X = H === "DFO" || H === "PAX" || !H ? "PAX" : H;
      X === "PAX" ? l(m, h, "BAG") : (e.state.schedule[m][h] = "RDO", l(m, h, null));
    } else
      e.state.schedule[m][h] = "RDO", l(m, h, null);
    e.syncRdoDaysFromSchedule && e.syncRdoDaysFromSchedule(p), N(), e.renderCoverageBars && e.renderCoverageBars(), window.dispatchEvent(new CustomEvent("lines:coverage-refresh"));
  }
  function P(v) {
    if (!v) return;
    const p = e.findLineById ? e.findLineById(v.lineId) : null, h = Number(v.dayIndex), m = String(v.duty || "").toUpperCase();
    if (!p || !Number.isInteger(h) || h < 0 || h > 6) return;
    const w = String(p.id);
    e.state.schedule || (e.state.schedule = {}), Array.isArray(e.state.schedule[w]) || (e.state.schedule[w] = Array(7).fill("RDO")), m === "OFF" || m === "RDO" || m === "" ? (e.state.schedule[w][h] = "RDO", l(w, h, null)) : (e.state.schedule[w][h] = "WORK", m === "BAG" ? l(w, h, "BAG") : m === "DFO" ? l(w, h, "DFO") : m === "TRAINING" ? l(w, h, "TRAINING") : l(w, h, "PAX")), e.syncRdoDaysFromSchedule && e.syncRdoDaysFromSchedule(p), N(), e.renderCoverageBars && e.renderCoverageBars(), window.dispatchEvent(new CustomEvent("lines:coverage-refresh"));
  }
  function G(v) {
    if (!v) return;
    const p = e.findLineById ? e.findLineById(v.lineId) : null, h = Number(v.dayIndex), m = v.field, w = String(v.value || "").trim();
    if (!(!p || !Number.isInteger(h) || h < 0 || h > 6) && !(e.isValidTimeText && !e.isValidTimeText(w))) {
      var E = e.getShift ? e.getShift(p.shiftId) : null, k = p.startTime || (E ? E.start : "08:00"), L = p.endTime || (E ? E.end : "16:30");
      p.dayTimes || (p.dayTimes = {});
      var H = String(h), X = p.dayTimes[H] || { start: k, end: L };
      m === "start" ? p.dayTimes[H] = { start: w, end: X.end } : m === "end" && (p.dayTimes[H] = { start: X.start, end: w }), N(), e.renderCoverageBars && e.renderCoverageBars(), window.dispatchEvent(new CustomEvent("lines:coverage-refresh"));
    }
  }
  function I(v) {
    v && (e.linesView || (e.linesView = {}), v.sortBy && (e.linesView.sortBy = v.sortBy), v.sortDir && (e.linesView.sortDir = v.sortDir), N());
  }
  function M(v) {
    v && (e.linesView || (e.linesView = {}), v.filterRole !== void 0 && (e.linesView.filterRole = v.filterRole), v.filterShift !== void 0 && (e.linesView.filterShift = v.filterShift), v.filterTeam !== void 0 && (e.linesView.filterTeam = v.filterTeam), v.filterSex !== void 0 && (e.linesView.filterSex = v.filterSex), v.filterDuty !== void 0 && (e.linesView.filterDuty = v.filterDuty), v.filterDay !== void 0 && (e.linesView.filterDay = v.filterDay), v.searchCode !== void 0 && (e.linesView.searchCode = v.searchCode), N());
  }
  const N = () => {
    try {
      const v = n._linesTableApp;
      if (v)
        R(v);
      else {
        n.childNodes.length && (n.innerHTML = "");
        const p = g();
        typeof e.applyExportCssVars == "function" && e.applyExportCssVars(), n._linesTableApp = new jn({
          target: n,
          props: {
            rows: Array.isArray(p) ? p : [],
            shiftOptions: c(),
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
            onDayDutyEdit: P,
            onDayTimeEdit: G,
            onSort: I,
            onFilter: M
          }
        });
      }
    } catch (v) {
      console.error("lines-table: refresh failed", v);
    }
  };
  N(), e.bindLinesUI && e.bindLinesUI(), document.addEventListener("click", (v) => {
    const p = v.target.closest?.(".tab-btn");
    p && p.dataset.tab === "lines" && N();
  }), ["lines:request-render", "lines:filter-change", "lines:sort-change", "lines:coverage-refresh"].forEach((v) => {
    window.addEventListener(v, N);
  }), n.refresh = N;
}
export {
  Jn as initLinesTable
};
