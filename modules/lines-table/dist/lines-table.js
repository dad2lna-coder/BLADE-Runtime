var yn = Object.defineProperty;
var mn = (t, e, n) => e in t ? yn(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var It = (t, e, n) => mn(t, typeof e != "symbol" ? e + "" : e, n);
function lt() {
}
function hn(t) {
  return t();
}
function Gt() {
  return /* @__PURE__ */ Object.create(null);
}
function it(t) {
  t.forEach(hn);
}
function _n(t) {
  return typeof t == "function";
}
function kn(t, e) {
  return t != t ? e == e : t !== e || t && typeof t == "object" || typeof t == "function";
}
function wn(t) {
  return Object.keys(t).length === 0;
}
function Xt(t) {
  return t ?? "";
}
function l(t, e) {
  t.appendChild(e);
}
function re(t, e, n) {
  t.insertBefore(e, n || null);
}
function oe(t) {
  t.parentNode && t.parentNode.removeChild(t);
}
function dt(t, e) {
  for (let n = 0; n < t.length; n += 1)
    t[n] && t[n].d(e);
}
function a(t) {
  return document.createElement(t);
}
function ae(t) {
  return document.createTextNode(t);
}
function E() {
  return ae(" ");
}
function G(t, e, n, s) {
  return t.addEventListener(e, n, s), () => t.removeEventListener(e, n, s);
}
function o(t, e, n) {
  n == null ? t.removeAttribute(e) : t.getAttribute(e) !== n && t.setAttribute(e, n);
}
function Dn(t) {
  return Array.from(t.childNodes);
}
function nt(t, e) {
  e = "" + e, t.data !== e && (t.data = /** @type {string} */
  e);
}
function b(t, e) {
  t.value = e ?? "";
}
function J(t, e, n, s) {
  n == null ? t.style.removeProperty(e) : t.style.setProperty(e, n, "");
}
function U(t, e, n) {
  for (let s = 0; s < t.options.length; s += 1) {
    const f = t.options[s];
    if (f.__value === e) {
      f.selected = !0;
      return;
    }
  }
  (!n || e !== void 0) && (t.selectedIndex = -1);
}
function mt(t) {
  const e = t.querySelector(":checked");
  return e && e.__value;
}
let At;
function Rt(t) {
  At = t;
}
function bn() {
  if (!At) throw new Error("Function called outside component initialization");
  return At;
}
function Fn(t) {
  bn().$$.on_mount.push(t);
}
const wt = [], Pt = [];
let bt = [];
const Wt = [], Cn = /* @__PURE__ */ Promise.resolve();
let Mt = !1;
function Tn() {
  Mt || (Mt = !0, Cn.then(vn));
}
function xe(t) {
  bt.push(t);
}
const Vt = /* @__PURE__ */ new Set();
let kt = 0;
function vn() {
  if (kt !== 0)
    return;
  const t = At;
  do {
    try {
      for (; kt < wt.length; ) {
        const e = wt[kt];
        kt++, Rt(e), Rn(e.$$);
      }
    } catch (e) {
      throw wt.length = 0, kt = 0, e;
    }
    for (Rt(null), wt.length = 0, kt = 0; Pt.length; ) Pt.pop()();
    for (let e = 0; e < bt.length; e += 1) {
      const n = bt[e];
      Vt.has(n) || (Vt.add(n), n());
    }
    bt.length = 0;
  } while (wt.length);
  for (; Wt.length; )
    Wt.pop()();
  Mt = !1, Vt.clear(), Rt(t);
}
function Rn(t) {
  if (t.fragment !== null) {
    t.update(), it(t.before_update);
    const e = t.dirty;
    t.dirty = [-1], t.fragment && t.fragment.p(t.ctx, e), t.after_update.forEach(xe);
  }
}
function An(t) {
  const e = [], n = [];
  bt.forEach((s) => t.indexOf(s) === -1 ? e.push(s) : n.push(s)), n.forEach((s) => s()), bt = e;
}
const On = /* @__PURE__ */ new Set();
function gn(t, e) {
  t && t.i && (On.delete(t), t.i(e));
}
function ye(t) {
  return t?.length !== void 0 ? t : Array.from(t);
}
function Sn(t, e) {
  t.d(1), e.delete(t.key);
}
function En(t, e, n, s, f, i, r, v, g, u, w, F) {
  let O = t.length, T = i.length, P = O;
  const R = {};
  for (; P--; ) R[t[P].key] = P;
  const M = [], N = /* @__PURE__ */ new Map(), X = /* @__PURE__ */ new Map(), h = [];
  for (P = T; P--; ) {
    const k = F(f, i, P), C = n(k);
    let B = r.get(C);
    B ? h.push(() => B.p(k, e)) : (B = u(C, k), B.c()), N.set(C, M[P] = B), C in R && X.set(C, Math.abs(P - R[C]));
  }
  const p = /* @__PURE__ */ new Set(), _ = /* @__PURE__ */ new Set();
  function m(k) {
    gn(k, 1), k.m(v, w), r.set(k.key, k), w = k.first, T--;
  }
  for (; O && T; ) {
    const k = M[T - 1], C = t[O - 1], B = k.key, L = C.key;
    k === C ? (w = k.first, O--, T--) : N.has(L) ? !r.has(B) || p.has(B) ? m(k) : _.has(L) ? O-- : X.get(B) > X.get(L) ? (_.add(B), m(k)) : (p.add(L), O--) : (g(C, r), O--);
  }
  for (; O--; ) {
    const k = t[O];
    N.has(k.key) || g(k, r);
  }
  for (; T; ) m(M[T - 1]);
  return it(h), M;
}
function Ln(t, e, n) {
  const { fragment: s, after_update: f } = t.$$;
  s && s.m(e, n), xe(() => {
    const i = t.$$.on_mount.map(hn).filter(_n);
    t.$$.on_destroy ? t.$$.on_destroy.push(...i) : it(i), t.$$.on_mount = [];
  }), f.forEach(xe);
}
function Bn(t, e) {
  const n = t.$$;
  n.fragment !== null && (An(n.after_update), it(n.on_destroy), n.fragment && n.fragment.d(e), n.on_destroy = n.fragment = null, n.ctx = []);
}
function In(t, e) {
  t.$$.dirty[0] === -1 && (wt.push(t), Tn(), t.$$.dirty.fill(0)), t.$$.dirty[e / 31 | 0] |= 1 << e % 31;
}
function Vn(t, e, n, s, f, i, r = null, v = [-1]) {
  const g = At;
  Rt(t);
  const u = t.$$ = {
    fragment: null,
    ctx: [],
    // state
    props: i,
    update: lt,
    not_equal: f,
    bound: Gt(),
    // lifecycle
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(e.context || (g ? g.$$.context : [])),
    // everything else
    callbacks: Gt(),
    dirty: v,
    skip_bound: !1,
    root: e.target || g.$$.root
  };
  r && r(u.root);
  let w = !1;
  if (u.ctx = n ? n(t, e.props || {}, (F, O, ...T) => {
    const P = T.length ? T[0] : O;
    return u.ctx && f(u.ctx[F], u.ctx[F] = P) && (!u.skip_bound && u.bound[F] && u.bound[F](P), w && In(t, F)), O;
  }) : [], u.update(), w = !0, it(u.before_update), u.fragment = s ? s(u.ctx) : !1, e.target) {
    if (e.hydrate) {
      const F = Dn(e.target);
      u.fragment && u.fragment.l(F), F.forEach(oe);
    } else
      u.fragment && u.fragment.c();
    e.intro && gn(t.$$.fragment), Ln(t, e.target, e.anchor), vn();
  }
  Rt(g);
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
    It(this, "$$");
    /**
     * ### PRIVATE API
     *
     * Do not use, may change at any time
     *
     * @type {any}
     */
    It(this, "$$set");
  }
  /** @returns {void} */
  $destroy() {
    Bn(this, 1), this.$destroy = lt;
  }
  /**
   * @template {Extract<keyof Events, string>} K
   * @param {K} type
   * @param {((e: Events[K]) => void) | null | undefined} callback
   * @returns {() => void}
   */
  $on(e, n) {
    if (!_n(n))
      return lt;
    const s = this.$$.callbacks[e] || (this.$$.callbacks[e] = []);
    return s.push(n), () => {
      const f = s.indexOf(n);
      f !== -1 && s.splice(f, 1);
    };
  }
  /**
   * @param {Partial<Props>} props
   * @returns {void}
   */
  $set(e) {
    this.$$set && !wn(e) && (this.$$.skip_bound = !0, this.$$set(e), this.$$.skip_bound = !1);
  }
}
const Mn = "4";
typeof window < "u" && (window.__svelte || (window.__svelte = { v: /* @__PURE__ */ new Set() })).v.add(Mn);
function Ht() {
  return {
    rdo: "#000000",
    bag: "#F4B4B4",
    dfo: "#FFF3A8",
    pax: "#A0C4FF",
    header: "#1F4E79"
  };
}
function Nn(t, e) {
  if (!t) return e;
  var n = String(t).replace("#", "").trim();
  return n.length === 3 && (n = n[0] + n[0] + n[1] + n[1] + n[2] + n[2]), n.length !== 6 || /[^0-9a-fA-F]/.test(n) ? e : "#" + n.toUpperCase();
}
function Gn(t) {
  var e = Nn(t, "#FFFFFF") || "#FFFFFF", n = e.slice(1), s = parseInt(n.slice(0, 2), 16), f = parseInt(n.slice(2, 4), 16), i = parseInt(n.slice(4, 6), 16), r = (0.299 * s + 0.587 * f + 0.114 * i) / 255;
  return r < 0.45 ? "#FFFFFF" : "#111111";
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
function zt(t, e, n) {
  const s = t.slice();
  return s[79] = e[n], s;
}
function Yt(t, e, n) {
  const s = t.slice();
  return s[82] = e[n], s;
}
function Jt(t, e, n) {
  const s = t.slice();
  return s[79] = e[n], s;
}
function Qt(t, e, n) {
  const s = t.slice();
  return s[82] = e[n], s;
}
function Xn(t) {
  let e;
  return {
    c() {
      e = a("div"), e.textContent = "Classic Lines mode active", o(e, "class", "muted");
    },
    m(n, s) {
      re(n, e, s);
    },
    p: lt,
    d(n) {
      n && oe(e);
    }
  };
}
function Wn(t) {
  let e, n, s, f, i, r, v, g, u, w, F, O, T, P, R, M, N, X, h, p, _, m, k, C, B, L, K, W, te, fe, q, ue, z, $e, Ve, Ce, H, de, ce, Ee, me, Le, Q, he, _e, Pe, Me, ot, ve, Be, Y, ge, Ie, se, pe, je, A, qe, ze, x, Ne, ke, Ge, Xe, st, Ye, Je, We, c, S, $, we, ct, at, ht, Qe, rt, et, ft, tt, Ft, He, ne, _t, Ot, Ke, le, vt, St, gt, Ze, ee, Et, Ue, ie, pt, Lt, Te, Ct, Re = [], Ae = /* @__PURE__ */ new Map(), y, V, d, Z = ye(
    /*teamOptions*/
    t[9]
  ), De = [];
  for (let D = 0; D < Z.length; D += 1)
    De[D] = Zt(Qt(t, Z, D));
  let yt = ye(
    /*shiftOptions*/
    t[8]
  ), be = [];
  for (let D = 0; D < yt.length; D += 1)
    be[D] = xt(Jt(t, yt, D));
  let Oe = (
    /*offsetY*/
    t[13] > 0 && $t(t)
  ), ut = ye(
    /*visibleRows*/
    t[14]
  );
  const Nt = (D) => (
    /*row*/
    D[67].id
  );
  for (let D = 0; D < ut.length; D += 1) {
    let j = Kt(t, ut, D), I = Nt(j);
    Ae.set(I, Re[D] = rn(I, j));
  }
  let Fe = null;
  ut.length || (Fe = en());
  let Se = (
    /*paddingBottom*/
    t[12] > 0 && fn(t)
  );
  return {
    c() {
      e = a("div"), n = a("div"), s = a("label"), f = ae(`Search
          `), i = a("input"), r = E(), v = a("label"), g = ae(`Role
          `), u = a("select"), w = a("option"), w.textContent = "All", F = a("option"), F.textContent = "STSO", O = a("option"), O.textContent = "LTSO", T = a("option"), T.textContent = "TSO (FT/PT)", P = E(), R = a("label"), M = ae(`Team
          `), N = a("select"), X = a("option"), X.textContent = "All", h = a("option"), h.textContent = "Unassigned";
      for (let D = 0; D < De.length; D += 1)
        De[D].c();
      p = E(), _ = a("label"), m = ae(`Shift
          `), k = a("select"), C = a("option"), C.textContent = "All shifts";
      for (let D = 0; D < be.length; D += 1)
        be[D].c();
      B = E(), L = a("label"), K = ae(`Duty
          `), W = a("select"), te = a("option"), te.textContent = "All duties", fe = a("option"), fe.textContent = "BAG", q = a("option"), q.textContent = "PAX", ue = a("option"), ue.textContent = "DFO", z = a("option"), z.textContent = "OFF / RDO", $e = E(), Ve = a("label"), Ce = ae(`On Day
          `), H = a("select"), de = a("option"), de.textContent = "Any day", ce = a("option"), ce.textContent = "Sun", Ee = a("option"), Ee.textContent = "Mon", me = a("option"), me.textContent = "Tue", Le = a("option"), Le.textContent = "Wed", Q = a("option"), Q.textContent = "Thu", he = a("option"), he.textContent = "Fri", _e = a("option"), _e.textContent = "Sat", Pe = E(), Me = a("label"), ot = ae(`Sex
          `), ve = a("select"), Be = a("option"), Be.textContent = "All", Y = a("option"), Y.textContent = "M", ge = a("option"), ge.textContent = "F", Ie = E(), se = a("div"), pe = a("table"), je = a("thead"), A = a("tr"), qe = a("th"), qe.textContent = `Team${/*sortIndicator*/
      t[23]("team")}`, ze = E(), x = a("th"), x.textContent = `Line${/*sortIndicator*/
      t[23]("line")}`, Ne = E(), ke = a("th"), ke.textContent = `Shift${/*sortIndicator*/
      t[23]("shift")}`, Ge = E(), Xe = a("th"), Xe.textContent = `Start${/*sortIndicator*/
      t[23]("start")}`, st = E(), Ye = a("th"), Ye.textContent = "End", Je = E(), We = a("th"), We.textContent = `Position${/*sortIndicator*/
      t[23]("role")}`, c = E(), S = a("th"), S.textContent = "Emp", $ = E(), we = a("th"), we.textContent = "Sex", ct = E(), at = a("th"), at.textContent = "Duty", ht = E(), Qe = a("th"), Qe.textContent = "Cert", rt = E(), et = a("th"), et.textContent = "RDOs", ft = E(), tt = a("th"), tt.textContent = "Paid", Ft = E(), He = a("th"), He.textContent = "Sun", ne = E(), _t = a("th"), _t.textContent = "Mon", Ot = E(), Ke = a("th"), Ke.textContent = "Tue", le = E(), vt = a("th"), vt.textContent = "Wed", St = E(), gt = a("th"), gt.textContent = "Thu", Ze = E(), ee = a("th"), ee.textContent = "Fri", Et = E(), Ue = a("th"), Ue.textContent = "Sat", ie = E(), pt = a("th"), pt.textContent = "Hrs", Lt = E(), Te = a("tbody"), Oe && Oe.c(), Ct = E();
      for (let D = 0; D < Re.length; D += 1)
        Re[D].c();
      Fe && Fe.c(), y = E(), Se && Se.c(), o(i, "type", "text"), o(i, "class", "filter-input search-input svelte-1f0dkhk"), o(i, "placeholder", "Search line code..."), o(s, "class", "svelte-1f0dkhk"), w.__value = "ALL", b(w, w.__value), F.__value = "STSO", b(F, F.__value), O.__value = "LTSO", b(O, O.__value), T.__value = "TSO", b(T, T.__value), o(u, "class", "filter-select svelte-1f0dkhk"), /*filterRole*/
      t[0] === void 0 && xe(() => (
        /*select0_change_handler*/
        t[41].call(u)
      )), o(v, "class", "svelte-1f0dkhk"), X.__value = "", b(X, X.__value), h.__value = "__none__", b(h, h.__value), o(N, "class", "filter-select svelte-1f0dkhk"), /*filterTeam*/
      t[2] === void 0 && xe(() => (
        /*select1_change_handler*/
        t[42].call(N)
      )), o(R, "class", "svelte-1f0dkhk"), C.__value = "", b(C, C.__value), o(k, "class", "filter-select svelte-1f0dkhk"), /*filterShift*/
      t[1] === void 0 && xe(() => (
        /*select2_change_handler*/
        t[43].call(k)
      )), o(_, "class", "svelte-1f0dkhk"), te.__value = "", b(te, te.__value), fe.__value = "BAG", b(fe, fe.__value), q.__value = "PAX", b(q, q.__value), ue.__value = "DFO", b(ue, ue.__value), z.__value = "OFF", b(z, z.__value), o(W, "class", "filter-select svelte-1f0dkhk"), /*filterDuty*/
      t[4] === void 0 && xe(() => (
        /*select3_change_handler*/
        t[44].call(W)
      )), o(L, "class", "svelte-1f0dkhk"), de.__value = "", b(de, de.__value), ce.__value = "0", b(ce, ce.__value), Ee.__value = "1", b(Ee, Ee.__value), me.__value = "2", b(me, me.__value), Le.__value = "3", b(Le, Le.__value), Q.__value = "4", b(Q, Q.__value), he.__value = "5", b(he, he.__value), _e.__value = "6", b(_e, _e.__value), o(H, "class", "filter-select svelte-1f0dkhk"), /*filterDay*/
      t[5] === void 0 && xe(() => (
        /*select4_change_handler*/
        t[45].call(H)
      )), o(Ve, "class", "svelte-1f0dkhk"), Be.__value = "", b(Be, Be.__value), Y.__value = "M", b(Y, Y.__value), ge.__value = "F", b(ge, ge.__value), o(ve, "class", "filter-select svelte-1f0dkhk"), /*filterSex*/
      t[3] === void 0 && xe(() => (
        /*select5_change_handler*/
        t[46].call(ve)
      )), o(Me, "class", "svelte-1f0dkhk"), o(n, "class", "filter-controls svelte-1f0dkhk"), o(e, "class", "lines-table-header-controls svelte-1f0dkhk"), o(qe, "class", "sortable col-team svelte-1f0dkhk"), o(x, "class", "sortable col-line svelte-1f0dkhk"), o(ke, "class", "sortable col-shift svelte-1f0dkhk"), o(Xe, "class", "sortable col-time svelte-1f0dkhk"), o(Ye, "class", "col-time svelte-1f0dkhk"), o(We, "class", "sortable col-pos svelte-1f0dkhk"), o(S, "class", "col-sm svelte-1f0dkhk"), o(we, "class", "col-sm svelte-1f0dkhk"), o(at, "class", "col-duty svelte-1f0dkhk"), o(Qe, "class", "col-sm svelte-1f0dkhk"), o(et, "class", "col-rdos svelte-1f0dkhk"), o(tt, "class", "col-sm svelte-1f0dkhk"), o(He, "class", "col-day svelte-1f0dkhk"), o(_t, "class", "col-day svelte-1f0dkhk"), o(Ke, "class", "col-day svelte-1f0dkhk"), o(vt, "class", "col-day svelte-1f0dkhk"), o(gt, "class", "col-day svelte-1f0dkhk"), o(ee, "class", "col-day svelte-1f0dkhk"), o(Ue, "class", "col-day svelte-1f0dkhk"), o(pt, "class", "col-sm svelte-1f0dkhk"), o(A, "class", "svelte-1f0dkhk"), o(pe, "class", "data-table lines-editable svelte-1f0dkhk"), o(se, "class", "lines-virtual-root svelte-1f0dkhk");
    },
    m(D, j) {
      re(D, e, j), l(e, n), l(n, s), l(s, f), l(s, i), b(
        i,
        /*searchCode*/
        t[6]
      ), l(n, r), l(n, v), l(v, g), l(v, u), l(u, w), l(u, F), l(u, O), l(u, T), U(
        u,
        /*filterRole*/
        t[0],
        !0
      ), l(n, P), l(n, R), l(R, M), l(R, N), l(N, X), l(N, h);
      for (let I = 0; I < De.length; I += 1)
        De[I] && De[I].m(N, null);
      U(
        N,
        /*filterTeam*/
        t[2],
        !0
      ), l(n, p), l(n, _), l(_, m), l(_, k), l(k, C);
      for (let I = 0; I < be.length; I += 1)
        be[I] && be[I].m(k, null);
      U(
        k,
        /*filterShift*/
        t[1],
        !0
      ), l(n, B), l(n, L), l(L, K), l(L, W), l(W, te), l(W, fe), l(W, q), l(W, ue), l(W, z), U(
        W,
        /*filterDuty*/
        t[4],
        !0
      ), l(n, $e), l(n, Ve), l(Ve, Ce), l(Ve, H), l(H, de), l(H, ce), l(H, Ee), l(H, me), l(H, Le), l(H, Q), l(H, he), l(H, _e), U(
        H,
        /*filterDay*/
        t[5],
        !0
      ), l(n, Pe), l(n, Me), l(Me, ot), l(Me, ve), l(ve, Be), l(ve, Y), l(ve, ge), U(
        ve,
        /*filterSex*/
        t[3],
        !0
      ), re(D, Ie, j), re(D, se, j), l(se, pe), l(pe, je), l(je, A), l(A, qe), l(A, ze), l(A, x), l(A, Ne), l(A, ke), l(A, Ge), l(A, Xe), l(A, st), l(A, Ye), l(A, Je), l(A, We), l(A, c), l(A, S), l(A, $), l(A, we), l(A, ct), l(A, at), l(A, ht), l(A, Qe), l(A, rt), l(A, et), l(A, ft), l(A, tt), l(A, Ft), l(A, He), l(A, ne), l(A, _t), l(A, Ot), l(A, Ke), l(A, le), l(A, vt), l(A, St), l(A, gt), l(A, Ze), l(A, ee), l(A, Et), l(A, Ue), l(A, ie), l(A, pt), l(pe, Lt), l(pe, Te), Oe && Oe.m(Te, null), l(Te, Ct);
      for (let I = 0; I < Re.length; I += 1)
        Re[I] && Re[I].m(Te, null);
      Fe && Fe.m(Te, null), l(Te, y), Se && Se.m(Te, null), t[65](se), V || (d = [
        G(
          i,
          "input",
          /*input_input_handler*/
          t[40]
        ),
        G(
          i,
          "input",
          /*handleFilterChange*/
          t[22]
        ),
        G(
          u,
          "change",
          /*select0_change_handler*/
          t[41]
        ),
        G(
          u,
          "change",
          /*handleFilterChange*/
          t[22]
        ),
        G(
          N,
          "change",
          /*select1_change_handler*/
          t[42]
        ),
        G(
          N,
          "change",
          /*handleFilterChange*/
          t[22]
        ),
        G(
          k,
          "change",
          /*select2_change_handler*/
          t[43]
        ),
        G(
          k,
          "change",
          /*handleFilterChange*/
          t[22]
        ),
        G(
          W,
          "change",
          /*select3_change_handler*/
          t[44]
        ),
        G(
          W,
          "change",
          /*handleFilterChange*/
          t[22]
        ),
        G(
          H,
          "change",
          /*select4_change_handler*/
          t[45]
        ),
        G(
          H,
          "change",
          /*handleFilterChange*/
          t[22]
        ),
        G(
          ve,
          "change",
          /*select5_change_handler*/
          t[46]
        ),
        G(
          ve,
          "change",
          /*handleFilterChange*/
          t[22]
        ),
        G(
          qe,
          "click",
          /*click_handler*/
          t[47]
        ),
        G(
          x,
          "click",
          /*click_handler_1*/
          t[48]
        ),
        G(
          ke,
          "click",
          /*click_handler_2*/
          t[49]
        ),
        G(
          Xe,
          "click",
          /*click_handler_3*/
          t[50]
        ),
        G(
          We,
          "click",
          /*click_handler_4*/
          t[51]
        ),
        G(
          se,
          "scroll",
          /*handleScroll*/
          t[24]
        )
      ], V = !0);
    },
    p(D, j) {
      if (j[0] & /*searchCode*/
      64 && i.value !== /*searchCode*/
      D[6] && b(
        i,
        /*searchCode*/
        D[6]
      ), j[0] & /*filterRole*/
      1 && U(
        u,
        /*filterRole*/
        D[0]
      ), j[0] & /*teamOptions*/
      512) {
        Z = ye(
          /*teamOptions*/
          D[9]
        );
        let I;
        for (I = 0; I < Z.length; I += 1) {
          const Tt = Qt(D, Z, I);
          De[I] ? De[I].p(Tt, j) : (De[I] = Zt(Tt), De[I].c(), De[I].m(N, null));
        }
        for (; I < De.length; I += 1)
          De[I].d(1);
        De.length = Z.length;
      }
      if (j[0] & /*filterTeam, teamOptions*/
      516 && U(
        N,
        /*filterTeam*/
        D[2]
      ), j[0] & /*shiftOptions*/
      256) {
        yt = ye(
          /*shiftOptions*/
          D[8]
        );
        let I;
        for (I = 0; I < yt.length; I += 1) {
          const Tt = Jt(D, yt, I);
          be[I] ? be[I].p(Tt, j) : (be[I] = xt(Tt), be[I].c(), be[I].m(k, null));
        }
        for (; I < be.length; I += 1)
          be[I].d(1);
        be.length = yt.length;
      }
      j[0] & /*filterShift, shiftOptions*/
      258 && U(
        k,
        /*filterShift*/
        D[1]
      ), j[0] & /*filterDuty*/
      16 && U(
        W,
        /*filterDuty*/
        D[4]
      ), j[0] & /*filterDay*/
      32 && U(
        H,
        /*filterDay*/
        D[5]
      ), j[0] & /*filterSex*/
      8 && U(
        ve,
        /*filterSex*/
        D[3]
      ), /*offsetY*/
      D[13] > 0 ? Oe ? Oe.p(D, j) : (Oe = $t(D), Oe.c(), Oe.m(Te, Ct)) : Oe && (Oe.d(1), Oe = null), j[0] & /*visibleRows, dayStyle, emitDayTime, emitDayDuty, emitEdit, BASE_EMPS, BASE_POSITIONS, shiftOptions, teamOptions*/
      2081536 && (ut = ye(
        /*visibleRows*/
        D[14]
      ), Re = En(Re, j, Nt, 1, D, ut, Ae, Te, Sn, rn, y, Kt), !ut.length && Fe ? Fe.p(D, j) : ut.length ? Fe && (Fe.d(1), Fe = null) : (Fe = en(), Fe.c(), Fe.m(Te, y))), /*paddingBottom*/
      D[12] > 0 ? Se ? Se.p(D, j) : (Se = fn(D), Se.c(), Se.m(Te, null)) : Se && (Se.d(1), Se = null);
    },
    d(D) {
      D && (oe(e), oe(Ie), oe(se)), dt(De, D), dt(be, D), Oe && Oe.d();
      for (let j = 0; j < Re.length; j += 1)
        Re[j].d();
      Fe && Fe.d(), Se && Se.d(), t[65](null), V = !1, it(d);
    }
  };
}
function Zt(t) {
  let e, n = (
    /*team*/
    (t[82].name ?? /*team*/
    t[82].id) + ""
  ), s, f;
  return {
    c() {
      e = a("option"), s = ae(n), e.__value = f = /*team*/
      t[82].id, b(e, e.__value);
    },
    m(i, r) {
      re(i, e, r), l(e, s);
    },
    p(i, r) {
      r[0] & /*teamOptions*/
      512 && n !== (n = /*team*/
      (i[82].name ?? /*team*/
      i[82].id) + "") && nt(s, n), r[0] & /*teamOptions*/
      512 && f !== (f = /*team*/
      i[82].id) && (e.__value = f, b(e, e.__value));
    },
    d(i) {
      i && oe(e);
    }
  };
}
function xt(t) {
  let e, n = Bt(
    /*shift*/
    t[79]
  ) + "", s, f;
  return {
    c() {
      e = a("option"), s = ae(n), e.__value = f = /*shift*/
      t[79].id, b(e, e.__value);
    },
    m(i, r) {
      re(i, e, r), l(e, s);
    },
    p(i, r) {
      r[0] & /*shiftOptions*/
      256 && n !== (n = Bt(
        /*shift*/
        i[79]
      ) + "") && nt(s, n), r[0] & /*shiftOptions*/
      256 && f !== (f = /*shift*/
      i[79].id) && (e.__value = f, b(e, e.__value));
    },
    d(i) {
      i && oe(e);
    }
  };
}
function $t(t) {
  let e, n;
  return {
    c() {
      e = a("tr"), n = a("td"), o(n, "colspan", "20"), J(n, "padding", "0"), J(n, "border", "none"), o(n, "class", "svelte-1f0dkhk"), J(
        e,
        "height",
        /*offsetY*/
        t[13] + "px"
      ), o(e, "class", "svelte-1f0dkhk");
    },
    m(s, f) {
      re(s, e, f), l(e, n);
    },
    p(s, f) {
      f[0] & /*offsetY*/
      8192 && J(
        e,
        "height",
        /*offsetY*/
        s[13] + "px"
      );
    },
    d(s) {
      s && oe(e);
    }
  };
}
function en(t) {
  let e;
  return {
    c() {
      e = a("tr"), e.innerHTML = '<td colspan="20" class="muted svelte-1f0dkhk" style="padding: 1.5rem; text-align: center;">No matching lines found.</td>', o(e, "class", "svelte-1f0dkhk");
    },
    m(n, s) {
      re(n, e, s);
    },
    p: lt,
    d(n) {
      n && oe(e);
    }
  };
}
function tn(t) {
  let e, n = (
    /*team*/
    (t[82].name ?? /*team*/
    t[82].id) + ""
  ), s, f;
  return {
    c() {
      e = a("option"), s = ae(n), e.__value = f = /*team*/
      t[82].id, b(e, e.__value), o(e, "class", "svelte-1f0dkhk");
    },
    m(i, r) {
      re(i, e, r), l(e, s);
    },
    p(i, r) {
      r[0] & /*teamOptions*/
      512 && n !== (n = /*team*/
      (i[82].name ?? /*team*/
      i[82].id) + "") && nt(s, n), r[0] & /*teamOptions*/
      512 && f !== (f = /*team*/
      i[82].id) && (e.__value = f, b(e, e.__value));
    },
    d(i) {
      i && oe(e);
    }
  };
}
function nn(t) {
  let e, n = Bt(
    /*shift*/
    t[79]
  ) + "", s, f;
  return {
    c() {
      e = a("option"), s = ae(n), e.__value = f = /*shift*/
      t[79].id, b(e, e.__value), o(e, "class", "svelte-1f0dkhk");
    },
    m(i, r) {
      re(i, e, r), l(e, s);
    },
    p(i, r) {
      r[0] & /*shiftOptions*/
      256 && n !== (n = Bt(
        /*shift*/
        i[79]
      ) + "") && nt(s, n), r[0] & /*shiftOptions*/
      256 && f !== (f = /*shift*/
      i[79].id) && (e.__value = f, b(e, e.__value));
    },
    d(i) {
      i && oe(e);
    }
  };
}
function ln(t) {
  let e, n = (
    /*pos*/
    t[76] + ""
  ), s, f;
  return {
    c() {
      e = a("option"), s = ae(n), e.__value = f = /*pos*/
      t[76], b(e, e.__value), o(e, "class", "svelte-1f0dkhk");
    },
    m(i, r) {
      re(i, e, r), l(e, s);
    },
    p(i, r) {
      r[0] & /*visibleRows*/
      16384 && n !== (n = /*pos*/
      i[76] + "") && nt(s, n), r[0] & /*visibleRows, teamOptions*/
      16896 && f !== (f = /*pos*/
      i[76]) && (e.__value = f, b(e, e.__value));
    },
    d(i) {
      i && oe(e);
    }
  };
}
function on(t) {
  let e, n = (
    /*emp*/
    t[73] + ""
  ), s;
  return {
    c() {
      e = a("option"), s = ae(n), e.__value = /*emp*/
      t[73], b(e, e.__value), o(e, "class", "svelte-1f0dkhk");
    },
    m(f, i) {
      re(f, e, i), l(e, s);
    },
    p: lt,
    d(f) {
      f && oe(e);
    }
  };
}
function sn(t) {
  let e, n, s, f, i, r, v, g, u, w;
  function F(...T) {
    return (
      /*change_handler_11*/
      t[63](
        /*row*/
        t[67],
        /*i*/
        t[70],
        ...T
      )
    );
  }
  function O(...T) {
    return (
      /*change_handler_12*/
      t[64](
        /*row*/
        t[67],
        /*i*/
        t[70],
        ...T
      )
    );
  }
  return {
    c() {
      e = a("div"), n = a("input"), f = E(), i = a("span"), i.textContent = "–", r = E(), v = a("input"), o(n, "type", "time"), o(n, "class", "day-time-input svelte-1f0dkhk"), n.value = s = /*row*/
      t[67]?.dayStarts?.[
        /*i*/
        t[70]
      ] || /*row*/
      t[67]?.start || "", o(i, "class", "day-time-sep svelte-1f0dkhk"), o(v, "type", "time"), o(v, "class", "day-time-input svelte-1f0dkhk"), v.value = g = /*row*/
      t[67]?.dayEnds?.[
        /*i*/
        t[70]
      ] || /*row*/
      t[67]?.end || "", o(e, "class", "day-times-wrap svelte-1f0dkhk");
    },
    m(T, P) {
      re(T, e, P), l(e, n), l(e, f), l(e, i), l(e, r), l(e, v), u || (w = [
        G(n, "change", F),
        G(v, "change", O)
      ], u = !0);
    },
    p(T, P) {
      t = T, P[0] & /*visibleRows, teamOptions*/
      16896 && s !== (s = /*row*/
      t[67]?.dayStarts?.[
        /*i*/
        t[70]
      ] || /*row*/
      t[67]?.start || "") && n.value !== s && (n.value = s), P[0] & /*visibleRows, teamOptions*/
      16896 && g !== (g = /*row*/
      t[67]?.dayEnds?.[
        /*i*/
        t[70]
      ] || /*row*/
      t[67]?.end || "") && v.value !== g && (v.value = g);
    },
    d(T) {
      T && oe(e), u = !1, it(w);
    }
  };
}
function an(t) {
  let e, n, s, f, i, r, v, g, u, w, F, O, T;
  function P(...M) {
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
  let R = (
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
      e = a("td"), n = a("div"), s = a("select"), f = a("option"), f.textContent = "PAX", i = a("option"), i.textContent = "BAG", r = a("option"), r.textContent = "DFO", v = a("option"), v.textContent = "OFF", u = E(), R && R.c(), f.__value = "PAX", b(f, f.__value), o(f, "class", "svelte-1f0dkhk"), i.__value = "BAG", b(i, i.__value), o(i, "class", "svelte-1f0dkhk"), r.__value = "DFO", b(r, r.__value), o(r, "class", "svelte-1f0dkhk"), v.__value = "OFF", b(v, v.__value), o(v, "class", "svelte-1f0dkhk"), o(s, "class", "day-duty-select svelte-1f0dkhk"), o(n, "class", "day-cell-inner svelte-1f0dkhk"), o(e, "class", w = Xt(cn(
        /*row*/
        t[67]?.dayDuties?.[
          /*i*/
          t[70]
        ] ?? /*row*/
        t[67]?.days?.[
          /*i*/
          t[70]
        ]
      )) + " svelte-1f0dkhk"), o(e, "style", F = /*dayStyle*/
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
      re(M, e, N), l(e, n), l(n, s), l(s, f), l(s, i), l(s, r), l(s, v), U(
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
      ), l(n, u), R && R.m(n, null), O || (T = G(s, "change", P), O = !0);
    },
    p(M, N) {
      t = M, N[0] & /*visibleRows, teamOptions*/
      16896 && g !== (g = /*row*/
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
      )) && U(
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
      ] !== "RDO" ? R ? R.p(t, N) : (R = sn(t), R.c(), R.m(n, null)) : R && (R.d(1), R = null), N[0] & /*visibleRows, teamOptions*/
      16896 && w !== (w = Xt(cn(
        /*row*/
        t[67]?.dayDuties?.[
          /*i*/
          t[70]
        ] ?? /*row*/
        t[67]?.days?.[
          /*i*/
          t[70]
        ]
      )) + " svelte-1f0dkhk") && o(e, "class", w), N[0] & /*visibleRows, teamOptions*/
      16896 && F !== (F = /*dayStyle*/
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
      )) && o(e, "style", F);
    },
    d(M) {
      M && oe(e), R && R.d(), O = !1, T();
    }
  };
}
function rn(t, e) {
  let n, s, f, i, r, v, g, u, w, F, O, T, P, R, M, N, X, h, p, _, m, k, C, B, L, K, W, te, fe, q, ue, z, $e, Ve, Ce, H, de, ce, Ee, me, Le, Q, he, _e, Pe, Me, ot, ve, Be, Y, ge, Ie, se, pe, je, A, qe, ze, x, Ne, ke, Ge, Xe, st, Ye, Je, We = (
    /*row*/
    (e[67]?.rdos ?? "—") + ""
  ), c, S, $, we = (
    /*row*/
    (e[67]?.paid ?? "") + ""
  ), ct, at, ht, Qe, rt = (
    /*row*/
    (e[67]?.hours ?? "") + ""
  ), et, ft, tt, Ft, He = ye(
    /*teamOptions*/
    e[9]
  ), ne = [];
  for (let y = 0; y < He.length; y += 1)
    ne[y] = tn(Yt(e, He, y));
  function _t(...y) {
    return (
      /*change_handler*/
      e[52](
        /*row*/
        e[67],
        ...y
      )
    );
  }
  function Ot(...y) {
    return (
      /*change_handler_1*/
      e[53](
        /*row*/
        e[67],
        ...y
      )
    );
  }
  let Ke = ye(
    /*shiftOptions*/
    e[8]
  ), le = [];
  for (let y = 0; y < Ke.length; y += 1)
    le[y] = nn(zt(e, Ke, y));
  function vt(...y) {
    return (
      /*change_handler_2*/
      e[54](
        /*row*/
        e[67],
        ...y
      )
    );
  }
  function St(...y) {
    return (
      /*change_handler_3*/
      e[55](
        /*row*/
        e[67],
        ...y
      )
    );
  }
  function gt(...y) {
    return (
      /*change_handler_4*/
      e[56](
        /*row*/
        e[67],
        ...y
      )
    );
  }
  let Ze = ye(dn(
    /*BASE_POSITIONS*/
    e[15],
    /*row*/
    e[67]?.position
  )), ee = [];
  for (let y = 0; y < Ze.length; y += 1)
    ee[y] = ln(qt(e, Ze, y));
  function Et(...y) {
    return (
      /*change_handler_5*/
      e[57](
        /*row*/
        e[67],
        ...y
      )
    );
  }
  let Ue = ye(
    /*BASE_EMPS*/
    e[16]
  ), ie = [];
  for (let y = 0; y < Ue.length; y += 1)
    ie[y] = on(jt(e, Ue, y));
  function pt(...y) {
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
  function Te(...y) {
    return (
      /*change_handler_8*/
      e[60](
        /*row*/
        e[67],
        ...y
      )
    );
  }
  function Ct(...y) {
    return (
      /*change_handler_9*/
      e[61](
        /*row*/
        e[67],
        ...y
      )
    );
  }
  let Re = ye([0, 1, 2, 3, 4, 5, 6]), Ae = [];
  for (let y = 0; y < 7; y += 1)
    Ae[y] = an(Ut(e, Re, y));
  return {
    key: t,
    first: null,
    c() {
      n = a("tr"), s = a("td"), f = a("select"), i = a("option"), i.textContent = "—";
      for (let y = 0; y < ne.length; y += 1)
        ne[y].c();
      g = E(), u = a("td"), w = a("input"), T = E(), P = a("td"), R = a("select"), M = a("option"), M.textContent = "—";
      for (let y = 0; y < le.length; y += 1)
        le[y].c();
      h = E(), p = a("td"), _ = a("input"), C = E(), B = a("td"), L = a("input"), te = E(), fe = a("td"), q = a("select"), ue = a("option"), ue.textContent = "—";
      for (let y = 0; y < ee.length; y += 1)
        ee[y].c();
      Ve = E(), Ce = a("td"), H = a("select"), de = a("option"), de.textContent = "—";
      for (let y = 0; y < ie.length; y += 1)
        ie[y].c();
      me = E(), Le = a("td"), Q = a("select"), he = a("option"), he.textContent = "—", _e = a("option"), _e.textContent = "M", Pe = a("option"), Pe.textContent = "F", ve = E(), Be = a("td"), Y = a("select"), ge = a("option"), ge.textContent = "—", Ie = a("option"), Ie.textContent = "DFO", se = a("option"), se.textContent = "BAG", pe = a("option"), pe.textContent = "PAX", qe = E(), ze = a("td"), x = a("select"), Ne = a("option"), Ne.textContent = "—", ke = a("option"), ke.textContent = "A", Ge = a("option"), Ge.textContent = "B", Ye = E(), Je = a("td"), c = ae(We), S = E(), $ = a("td"), ct = ae(we), at = E();
      for (let y = 0; y < 7; y += 1)
        Ae[y].c();
      ht = E(), Qe = a("td"), et = ae(rt), i.__value = "", b(i, i.__value), o(i, "class", "svelte-1f0dkhk"), o(f, "class", "line-edit svelte-1f0dkhk"), o(f, "data-field", "team"), o(f, "data-line-id", r = /*row*/
      e[67]?.id), o(s, "class", "svelte-1f0dkhk"), o(w, "type", "text"), o(w, "class", "line-edit line-code-input svelte-1f0dkhk"), o(w, "data-field", "lineCode"), o(w, "data-line-id", F = /*row*/
      e[67]?.id), w.value = O = /*row*/
      e[67]?.line ?? "", o(u, "class", "svelte-1f0dkhk"), M.__value = "", b(M, M.__value), o(M, "class", "svelte-1f0dkhk"), o(R, "class", "line-edit svelte-1f0dkhk"), o(R, "data-field", "shift"), o(R, "data-line-id", N = /*row*/
      e[67]?.id), o(P, "class", "svelte-1f0dkhk"), o(_, "type", "time"), o(_, "class", "line-edit line-time-input svelte-1f0dkhk"), o(_, "data-field", "start"), o(_, "data-line-id", m = /*row*/
      e[67]?.id), _.value = k = /*row*/
      e[67]?.start ?? "", o(p, "class", "svelte-1f0dkhk"), o(L, "type", "time"), o(L, "class", "line-edit line-time-input svelte-1f0dkhk"), o(L, "data-field", "end"), o(L, "data-line-id", K = /*row*/
      e[67]?.id), L.value = W = /*row*/
      e[67]?.end ?? "", o(B, "class", "svelte-1f0dkhk"), ue.__value = "", b(ue, ue.__value), o(ue, "class", "svelte-1f0dkhk"), o(q, "class", "line-edit svelte-1f0dkhk"), o(q, "data-field", "position"), o(q, "data-line-id", z = /*row*/
      e[67]?.id), o(fe, "class", "svelte-1f0dkhk"), de.__value = "", b(de, de.__value), o(de, "class", "svelte-1f0dkhk"), o(H, "class", "line-edit svelte-1f0dkhk"), o(H, "data-field", "emp"), o(H, "data-line-id", ce = /*row*/
      e[67]?.id), o(Ce, "class", "svelte-1f0dkhk"), he.__value = "", b(he, he.__value), o(he, "class", "svelte-1f0dkhk"), _e.__value = "M", b(_e, _e.__value), o(_e, "class", "svelte-1f0dkhk"), Pe.__value = "F", b(Pe, Pe.__value), o(Pe, "class", "svelte-1f0dkhk"), o(Q, "class", "line-edit svelte-1f0dkhk"), o(Q, "data-field", "sex"), o(Q, "data-line-id", Me = /*row*/
      e[67]?.id), o(Le, "class", "svelte-1f0dkhk"), ge.__value = "", b(ge, ge.__value), o(ge, "class", "svelte-1f0dkhk"), Ie.__value = "DFO", b(Ie, Ie.__value), o(Ie, "class", "svelte-1f0dkhk"), se.__value = "BAG", b(se, se.__value), o(se, "class", "svelte-1f0dkhk"), pe.__value = "PAX", b(pe, pe.__value), o(pe, "class", "svelte-1f0dkhk"), o(Y, "class", "line-edit svelte-1f0dkhk"), o(Y, "data-field", "function"), o(Y, "data-line-id", je = /*row*/
      e[67]?.id), o(Be, "class", "svelte-1f0dkhk"), Ne.__value = "", b(Ne, Ne.__value), o(Ne, "class", "svelte-1f0dkhk"), ke.__value = "A", b(ke, ke.__value), o(ke, "class", "svelte-1f0dkhk"), Ge.__value = "B", b(Ge, Ge.__value), o(Ge, "class", "svelte-1f0dkhk"), o(x, "class", "line-edit svelte-1f0dkhk"), o(x, "data-field", "certPool"), o(x, "data-line-id", Xe = /*row*/
      e[67]?.id), o(ze, "class", "svelte-1f0dkhk"), o(Je, "class", "line-rdo-cell svelte-1f0dkhk"), o($, "class", "line-center svelte-1f0dkhk"), o(Qe, "class", "line-hours svelte-1f0dkhk"), o(n, "data-line-row", ft = /*row*/
      e[67]?.id), J(n, "height", Dt + "px"), o(n, "class", "svelte-1f0dkhk"), this.first = n;
    },
    m(y, V) {
      re(y, n, V), l(n, s), l(s, f), l(f, i);
      for (let d = 0; d < ne.length; d += 1)
        ne[d] && ne[d].m(f, null);
      U(
        f,
        /*row*/
        e[67]?.teamId ?? ""
      ), l(n, g), l(n, u), l(u, w), l(n, T), l(n, P), l(P, R), l(R, M);
      for (let d = 0; d < le.length; d += 1)
        le[d] && le[d].m(R, null);
      U(
        R,
        /*row*/
        e[67]?.shiftId ?? ""
      ), l(n, h), l(n, p), l(p, _), l(n, C), l(n, B), l(B, L), l(n, te), l(n, fe), l(fe, q), l(q, ue);
      for (let d = 0; d < ee.length; d += 1)
        ee[d] && ee[d].m(q, null);
      U(
        q,
        /*row*/
        e[67]?.position ?? ""
      ), l(n, Ve), l(n, Ce), l(Ce, H), l(H, de);
      for (let d = 0; d < ie.length; d += 1)
        ie[d] && ie[d].m(H, null);
      U(
        H,
        /*row*/
        e[67]?.emp ?? ""
      ), l(n, me), l(n, Le), l(Le, Q), l(Q, he), l(Q, _e), l(Q, Pe), U(
        Q,
        /*row*/
        e[67]?.sex ?? ""
      ), l(n, ve), l(n, Be), l(Be, Y), l(Y, ge), l(Y, Ie), l(Y, se), l(Y, pe), U(
        Y,
        /*row*/
        e[67]?.function ?? ""
      ), l(n, qe), l(n, ze), l(ze, x), l(x, Ne), l(x, ke), l(x, Ge), U(
        x,
        /*row*/
        e[67]?.certPool ?? ""
      ), l(n, Ye), l(n, Je), l(Je, c), l(n, S), l(n, $), l($, ct), l(n, at);
      for (let d = 0; d < 7; d += 1)
        Ae[d] && Ae[d].m(n, null);
      l(n, ht), l(n, Qe), l(Qe, et), tt || (Ft = [
        G(f, "change", _t),
        G(w, "change", Ot),
        G(R, "change", vt),
        G(_, "change", St),
        G(L, "change", gt),
        G(q, "change", Et),
        G(H, "change", pt),
        G(Q, "change", Lt),
        G(Y, "change", Te),
        G(x, "change", Ct)
      ], tt = !0);
    },
    p(y, V) {
      if (e = y, V[0] & /*teamOptions*/
      512) {
        He = ye(
          /*teamOptions*/
          e[9]
        );
        let d;
        for (d = 0; d < He.length; d += 1) {
          const Z = Yt(e, He, d);
          ne[d] ? ne[d].p(Z, V) : (ne[d] = tn(Z), ne[d].c(), ne[d].m(f, null));
        }
        for (; d < ne.length; d += 1)
          ne[d].d(1);
        ne.length = He.length;
      }
      if (V[0] & /*visibleRows, teamOptions*/
      16896 && r !== (r = /*row*/
      e[67]?.id) && o(f, "data-line-id", r), V[0] & /*visibleRows, teamOptions*/
      16896 && v !== (v = /*row*/
      e[67]?.teamId ?? "") && U(
        f,
        /*row*/
        e[67]?.teamId ?? ""
      ), V[0] & /*visibleRows, teamOptions*/
      16896 && F !== (F = /*row*/
      e[67]?.id) && o(w, "data-line-id", F), V[0] & /*visibleRows, teamOptions*/
      16896 && O !== (O = /*row*/
      e[67]?.line ?? "") && w.value !== O && (w.value = O), V[0] & /*shiftOptions*/
      256) {
        Ke = ye(
          /*shiftOptions*/
          e[8]
        );
        let d;
        for (d = 0; d < Ke.length; d += 1) {
          const Z = zt(e, Ke, d);
          le[d] ? le[d].p(Z, V) : (le[d] = nn(Z), le[d].c(), le[d].m(R, null));
        }
        for (; d < le.length; d += 1)
          le[d].d(1);
        le.length = Ke.length;
      }
      if (V[0] & /*visibleRows, teamOptions*/
      16896 && N !== (N = /*row*/
      e[67]?.id) && o(R, "data-line-id", N), V[0] & /*visibleRows, teamOptions*/
      16896 && X !== (X = /*row*/
      e[67]?.shiftId ?? "") && U(
        R,
        /*row*/
        e[67]?.shiftId ?? ""
      ), V[0] & /*visibleRows, teamOptions*/
      16896 && m !== (m = /*row*/
      e[67]?.id) && o(_, "data-line-id", m), V[0] & /*visibleRows, teamOptions*/
      16896 && k !== (k = /*row*/
      e[67]?.start ?? "") && _.value !== k && (_.value = k), V[0] & /*visibleRows, teamOptions*/
      16896 && K !== (K = /*row*/
      e[67]?.id) && o(L, "data-line-id", K), V[0] & /*visibleRows, teamOptions*/
      16896 && W !== (W = /*row*/
      e[67]?.end ?? "") && L.value !== W && (L.value = W), V[0] & /*BASE_POSITIONS, visibleRows*/
      49152) {
        Ze = ye(dn(
          /*BASE_POSITIONS*/
          e[15],
          /*row*/
          e[67]?.position
        ));
        let d;
        for (d = 0; d < Ze.length; d += 1) {
          const Z = qt(e, Ze, d);
          ee[d] ? ee[d].p(Z, V) : (ee[d] = ln(Z), ee[d].c(), ee[d].m(q, null));
        }
        for (; d < ee.length; d += 1)
          ee[d].d(1);
        ee.length = Ze.length;
      }
      if (V[0] & /*visibleRows, teamOptions*/
      16896 && z !== (z = /*row*/
      e[67]?.id) && o(q, "data-line-id", z), V[0] & /*visibleRows, teamOptions*/
      16896 && $e !== ($e = /*row*/
      e[67]?.position ?? "") && U(
        q,
        /*row*/
        e[67]?.position ?? ""
      ), V[0] & /*BASE_EMPS*/
      65536) {
        Ue = ye(
          /*BASE_EMPS*/
          e[16]
        );
        let d;
        for (d = 0; d < Ue.length; d += 1) {
          const Z = jt(e, Ue, d);
          ie[d] ? ie[d].p(Z, V) : (ie[d] = on(Z), ie[d].c(), ie[d].m(H, null));
        }
        for (; d < ie.length; d += 1)
          ie[d].d(1);
        ie.length = Ue.length;
      }
      if (V[0] & /*visibleRows, teamOptions*/
      16896 && ce !== (ce = /*row*/
      e[67]?.id) && o(H, "data-line-id", ce), V[0] & /*visibleRows, teamOptions*/
      16896 && Ee !== (Ee = /*row*/
      e[67]?.emp ?? "") && U(
        H,
        /*row*/
        e[67]?.emp ?? ""
      ), V[0] & /*visibleRows, teamOptions*/
      16896 && Me !== (Me = /*row*/
      e[67]?.id) && o(Q, "data-line-id", Me), V[0] & /*visibleRows, teamOptions*/
      16896 && ot !== (ot = /*row*/
      e[67]?.sex ?? "") && U(
        Q,
        /*row*/
        e[67]?.sex ?? ""
      ), V[0] & /*visibleRows, teamOptions*/
      16896 && je !== (je = /*row*/
      e[67]?.id) && o(Y, "data-line-id", je), V[0] & /*visibleRows, teamOptions*/
      16896 && A !== (A = /*row*/
      e[67]?.function ?? "") && U(
        Y,
        /*row*/
        e[67]?.function ?? ""
      ), V[0] & /*visibleRows, teamOptions*/
      16896 && Xe !== (Xe = /*row*/
      e[67]?.id) && o(x, "data-line-id", Xe), V[0] & /*visibleRows, teamOptions*/
      16896 && st !== (st = /*row*/
      e[67]?.certPool ?? "") && U(
        x,
        /*row*/
        e[67]?.certPool ?? ""
      ), V[0] & /*visibleRows*/
      16384 && We !== (We = /*row*/
      (e[67]?.rdos ?? "—") + "") && nt(c, We), V[0] & /*visibleRows*/
      16384 && we !== (we = /*row*/
      (e[67]?.paid ?? "") + "") && nt(ct, we), V[0] & /*visibleRows, dayStyle, emitDayTime, emitDayDuty*/
      1720320) {
        Re = ye([0, 1, 2, 3, 4, 5, 6]);
        let d;
        for (d = 0; d < 7; d += 1) {
          const Z = Ut(e, Re, d);
          Ae[d] ? Ae[d].p(Z, V) : (Ae[d] = an(Z), Ae[d].c(), Ae[d].m(n, ht));
        }
        for (; d < 7; d += 1)
          Ae[d].d(1);
      }
      V[0] & /*visibleRows*/
      16384 && rt !== (rt = /*row*/
      (e[67]?.hours ?? "") + "") && nt(et, rt), V[0] & /*visibleRows, teamOptions*/
      16896 && ft !== (ft = /*row*/
      e[67]?.id) && o(n, "data-line-row", ft);
    },
    d(y) {
      y && oe(n), dt(ne, y), dt(le, y), dt(ee, y), dt(ie, y), dt(Ae, y), tt = !1, it(Ft);
    }
  };
}
function fn(t) {
  let e, n;
  return {
    c() {
      e = a("tr"), n = a("td"), o(n, "colspan", "20"), J(n, "padding", "0"), J(n, "border", "none"), o(n, "class", "svelte-1f0dkhk"), J(
        e,
        "height",
        /*paddingBottom*/
        t[12] + "px"
      ), o(e, "class", "svelte-1f0dkhk");
    },
    m(s, f) {
      re(s, e, f), l(e, n);
    },
    p(s, f) {
      f[0] & /*paddingBottom*/
      4096 && J(
        e,
        "height",
        /*paddingBottom*/
        s[12] + "px"
      );
    },
    d(s) {
      s && oe(e);
    }
  };
}
function Hn(t) {
  let e;
  function n(i, r) {
    return (
      /*mode*/
      i[7] === "svelte" ? Wn : Xn
    );
  }
  let s = n(t), f = s(t);
  return {
    c() {
      e = a("div"), f.c(), o(e, "class", "lines-table-root svelte-1f0dkhk"), J(e, "min-height", "min(70vh, 720px)"), J(e, "height", "min(70vh, 720px)"), J(e, "width", "100%"), J(
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
    m(i, r) {
      re(i, e, r), f.m(e, null);
    },
    p(i, r) {
      s === (s = n(i)) && f ? f.p(i, r) : (f.d(1), f = s(i), f && (f.c(), f.m(e, null))), r[0] & /*exportStyle*/
      1024 && J(
        e,
        "--export-rdo",
        /*exportStyle*/
        i[10]?.rdo || "#000000"
      ), r[0] & /*exportStyle*/
      1024 && J(
        e,
        "--export-bag",
        /*exportStyle*/
        i[10]?.bag || "#F4B4B4"
      ), r[0] & /*exportStyle*/
      1024 && J(
        e,
        "--export-dfo",
        /*exportStyle*/
        i[10]?.dfo || "#FFF3A8"
      ), r[0] & /*exportStyle*/
      1024 && J(
        e,
        "--export-pax",
        /*exportStyle*/
        i[10]?.pax || "#A0C4FF"
      ), r[0] & /*exportStyle*/
      1024 && J(
        e,
        "--export-header",
        /*exportStyle*/
        i[10]?.header || "#1F4E79"
      );
    },
    i: lt,
    o: lt,
    d(i) {
      i && oe(e), f.d();
    }
  };
}
const Dt = 42, un = 8;
function dn(t, e) {
  const n = e == null ? "" : String(e);
  return !n || t.indexOf(n) >= 0 ? t : t.concat([n]);
}
function Bt(t) {
  if (!t) return "";
  const e = t.name || t.id || "";
  return t.start && t.end ? (e ? e + " " : "") + "(" + t.start + "–" + t.end + ")" : t.start ? e ? e + " " + t.start : t.start : e;
}
function pn(t) {
  const e = String(t || "").toUpperCase();
  return e === "RDO" || e === "—" || e === "-" || e === "OFF" ? "rdo" : e === "BAG" || e === "BAGS" ? "bag" : e === "DFO" ? "dfo" : e === "PAX" ? "pax" : null;
}
function cn(t) {
  const e = pn(t);
  return e === "rdo" ? "cell-day-col cell-rdo" : e === "bag" ? "cell-day-col cell-function-duty cell-bag" : e === "dfo" ? "cell-day-col cell-function-duty cell-dfo" : e === "pax" ? "cell-day-col cell-function-duty cell-pax" : "cell-day-col cell-work";
}
function Kn(t, e, n) {
  let s, f, i, r, v, g, u, { rows: w = [] } = e, { mode: F = "svelte" } = e, { shiftOptions: O = [] } = e, { teamOptions: T = [] } = e, { exportStyle: P = Ht() } = e, { onInlineEdit: R = null } = e, { onDayToggle: M = null } = e, { onDayDutyEdit: N = null } = e, { onDayTimeEdit: X = null } = e, { onSort: h = null } = e, { onFilter: p = null } = e, { currentSortBy: _ = "role" } = e, { currentSortDir: m = "asc" } = e, { filterRole: k = "ALL" } = e, { filterShift: C = "" } = e, { filterTeam: B = "" } = e, { filterSex: L = "" } = e, { filterDuty: K = "" } = e, { filterDay: W = "" } = e, { searchCode: te = "" } = e;
  const fe = ["TSO", "LTSO", "STSO"], q = ["FT", "PT"];
  function ue(c) {
    const S = pn(c);
    if (!S) return;
    const we = (P || Ht())[S];
    if (we)
      return "background:" + we + ";color:" + Gn(we) + ";";
  }
  function z(c, S, $) {
    R?.({ lineId: c, field: S, value: $ });
  }
  function $e(c, S, $) {
    N?.({ lineId: c, dayIndex: S, duty: $ });
  }
  function Ve(c, S, $, we) {
    X?.({ lineId: c, dayIndex: S, field: $, value: we });
  }
  function Ce(c) {
    let S = "asc";
    _ === c && (S = m === "asc" ? "desc" : "asc"), h?.({ sortBy: c, sortDir: S });
  }
  function H() {
    p?.({
      filterRole: k,
      filterShift: C,
      filterTeam: B,
      filterSex: L,
      filterDuty: K,
      filterDay: W,
      searchCode: te
    });
  }
  function de(c) {
    return _ !== c ? "" : m === "asc" ? " ▲" : " ▼";
  }
  let ce = 0, Ee = 600, me;
  function Le(c) {
    n(34, ce = c.target.scrollTop);
  }
  Fn(() => {
    me && n(35, Ee = me.clientHeight || 600);
  });
  function Q() {
    te = this.value, n(6, te);
  }
  function he() {
    k = mt(this), n(0, k);
  }
  function _e() {
    B = mt(this), n(2, B), n(9, T);
  }
  function Pe() {
    C = mt(this), n(1, C), n(8, O);
  }
  function Me() {
    K = mt(this), n(4, K);
  }
  function ot() {
    W = mt(this), n(5, W);
  }
  function ve() {
    L = mt(this), n(3, L);
  }
  const Be = () => Ce("team"), Y = () => Ce("line"), ge = () => Ce("shift"), Ie = () => Ce("start"), se = () => Ce("role"), pe = (c, S) => z(c?.id, "team", S.target.value), je = (c, S) => z(c?.id, "lineCode", S.target.value), A = (c, S) => z(c?.id, "shift", S.target.value), qe = (c, S) => z(c?.id, "start", S.target.value), ze = (c, S) => z(c?.id, "end", S.target.value), x = (c, S) => z(c?.id, "position", S.target.value), Ne = (c, S) => z(c?.id, "emp", S.target.value), ke = (c, S) => z(c?.id, "sex", S.target.value), Ge = (c, S) => z(c?.id, "function", S.target.value), Xe = (c, S) => z(c?.id, "certPool", S.target.value), st = (c, S, $) => $e(c?.id, S, $.target.value), Ye = (c, S, $) => Ve(c?.id, S, "start", $.target.value), Je = (c, S, $) => Ve(c?.id, S, "end", $.target.value);
  function We(c) {
    Pt[c ? "unshift" : "push"](() => {
      me = c, n(11, me);
    });
  }
  return t.$$set = (c) => {
    "rows" in c && n(25, w = c.rows), "mode" in c && n(7, F = c.mode), "shiftOptions" in c && n(8, O = c.shiftOptions), "teamOptions" in c && n(9, T = c.teamOptions), "exportStyle" in c && n(10, P = c.exportStyle), "onInlineEdit" in c && n(26, R = c.onInlineEdit), "onDayToggle" in c && n(27, M = c.onDayToggle), "onDayDutyEdit" in c && n(28, N = c.onDayDutyEdit), "onDayTimeEdit" in c && n(29, X = c.onDayTimeEdit), "onSort" in c && n(30, h = c.onSort), "onFilter" in c && n(31, p = c.onFilter), "currentSortBy" in c && n(32, _ = c.currentSortBy), "currentSortDir" in c && n(33, m = c.currentSortDir), "filterRole" in c && n(0, k = c.filterRole), "filterShift" in c && n(1, C = c.filterShift), "filterTeam" in c && n(2, B = c.filterTeam), "filterSex" in c && n(3, L = c.filterSex), "filterDuty" in c && n(4, K = c.filterDuty), "filterDay" in c && n(5, W = c.filterDay), "searchCode" in c && n(6, te = c.searchCode);
  }, t.$$.update = () => {
    t.$$.dirty[0] & /*rows*/
    33554432 && n(39, s = w.length), t.$$.dirty[1] & /*totalRows*/
    256 && n(37, f = s * Dt), t.$$.dirty[1] & /*scrollTop*/
    8 && n(38, i = Math.max(0, Math.floor(ce / Dt) - un)), t.$$.dirty[1] & /*totalRows, scrollTop, viewportHeight*/
    280 && n(36, r = Math.min(s, Math.ceil((ce + Ee) / Dt) + un)), t.$$.dirty[0] & /*rows*/
    33554432 | t.$$.dirty[1] & /*startIndex, endIndex*/
    160 && n(14, v = w.slice(i, r)), t.$$.dirty[1] & /*startIndex*/
    128 && n(13, g = i * Dt), t.$$.dirty[1] & /*totalHeight, endIndex*/
    96 && n(12, u = Math.max(0, f - r * Dt));
  }, [
    k,
    C,
    B,
    L,
    K,
    W,
    te,
    F,
    O,
    T,
    P,
    me,
    u,
    g,
    v,
    fe,
    q,
    ue,
    z,
    $e,
    Ve,
    Ce,
    H,
    de,
    Le,
    w,
    R,
    M,
    N,
    X,
    h,
    p,
    _,
    m,
    ce,
    Ee,
    r,
    f,
    i,
    s,
    Q,
    he,
    _e,
    Pe,
    Me,
    ot,
    ve,
    Be,
    Y,
    ge,
    Ie,
    se,
    pe,
    je,
    A,
    qe,
    ze,
    x,
    Ne,
    ke,
    Ge,
    Xe,
    st,
    Ye,
    Je,
    We
  ];
}
class Un extends Pn {
  constructor(e) {
    super(), Vn(
      this,
      e,
      Kn,
      Hn,
      kn,
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
  function e(i) {
    var r = String(i || "").trim();
    if (!r) return "";
    var v = r.match(/^(\d+)$/);
    return v && Number(v[1]) < 10 ? "0" + v[1] : r;
  }
  function n(i, r) {
    var v = (i.rdoDays || []).map(Number).filter(function(u) {
      return Number.isInteger(u) && u >= 0 && u <= 6;
    }), g = v.length ? v.map(function(u) {
      return r && r[u] != null ? r[u] : String(u);
    }).join(",") : "—";
    return i.rdoHard && (g += " (hard)"), g;
  }
  function s(i, r, v) {
    return v || "WORK";
  }
  function f(i, r) {
    return r === "BAG" || r === "PAX" ? r : i.function === "BAG" ? "BAG" : i.function === "DFO" || i.function === "PAX" ? "PAX" : r === "BAG" || r === "PAX" ? r : null;
  }
  t.lineToRowModel = function(i, r, v) {
    if (v = v || {}, !i || !r) return null;
    for (var g = v.dayNames || ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], u = typeof v.teamResolver == "function" ? v.teamResolver(i.id) : null, w = typeof v.shiftResolver == "function" ? v.shiftResolver(i.shiftId) : null, F = i.shiftName || w && w.name || "", O = i.startTime || (w && w.start ? w.start : ""), T = i.endTime || (w && w.end ? w.end : ""), P = i.shiftLabel || (O && T ? O + "–" + T : O || "WORK"), R = !!(i.isExtra || i.extraPositionId), M = R ? i.position || i.extraName || "TSO" : i.isStso || i.empClass === "STSO" ? "STSO" : i.isLtso || i.empClass === "LTSO" ? "LTSO" : "TSO", N = R ? i.empClass === "PT" ? "PT" : "FT" : M === "STSO" || M === "LTSO" ? "FT" : i.empClass === "PT" ? "PT" : "FT", X = i.paid || 0, h = Array.isArray(r) ? r : r[i.id] || r[String(i.id)] || [], p = [], _ = [], m = [], k = [], C = 0, B = 0; B < 7; B++) {
      var L = typeof v.effectiveTimesResolver == "function" ? v.effectiveTimesResolver(i.shiftId, B) : null, K = i.startTime || L && L.start || O, W = i.endTime || L && L.end || T;
      m.push(K), k.push(W);
      var te = h[B];
      if (te === "WORK") {
        C += X;
        var fe = typeof v.rotationDutyResolver == "function" ? v.rotationDutyResolver(i.id, B) : null, q = s(i, fe, P);
        p.push(q), _.push(f(i, fe) || "PAX");
      } else
        p.push("RDO"), _.push("OFF");
    }
    return {
      id: i.id,
      teamId: u && u.id || "",
      shiftId: i.shiftId || "",
      team: e(u && (u.name || u.id) || ""),
      line: i.lineCode || "",
      shift: F,
      start: O,
      end: T,
      position: M,
      emp: N,
      sex: i.sex === "F" || i.sex === "M" ? i.sex : "",
      function: i.function || "",
      certPool: i.certPool || "",
      rdos: n(i, g),
      paid: X,
      days: p,
      dayDuties: _,
      dayStarts: m,
      dayEnds: k,
      hours: C
    };
  }, t.getRowModels = function(i, r, v) {
    return !Array.isArray(i) || !r || typeof r != "object" ? [] : i.map(function(g) {
      return t.lineToRowModel(g, r, v);
    }).filter(Boolean);
  }, t.getLineRowModels = function(i) {
    var r = t.state && Array.isArray(t.state.lines) ? t.state.lines : [], v = t.state && t.state.schedule || {}, g = Object.assign({}, i || {});
    return !g.teamResolver && typeof t.teamMetaForLine == "function" && (g.teamResolver = t.teamMetaForLine), !g.shiftResolver && typeof t.getShift == "function" && (g.shiftResolver = t.getShift), !g.rotationDutyResolver && typeof t.getRotationDuty == "function" && (g.rotationDutyResolver = t.getRotationDuty), !g.effectiveTimesResolver && typeof t.getEffectiveShiftTimes == "function" && (g.effectiveTimesResolver = t.getEffectiveShiftTimes), t.getRowModels(r, v, g);
  };
}
function qn(t) {
  if (t = t || window.Scheduler, !t) return;
  function e(v, g) {
    var u = t.getRotationDuty ? t.getRotationDuty(v.id, g) : null;
    return u || v.function || null;
  }
  t.dutyFor = e;
  function n(v) {
    if (v.shiftLabel) return v.shiftLabel;
    var g = t.getShift ? t.getShift(v.shiftId) : null;
    return g && g.start && g.end ? g.start + "–" + g.end : g && g.start ? g.start : "WORK";
  }
  function s(v) {
    if (!(!v || v.function !== "BAG")) {
      t.state.functionRotation || (t.state.functionRotation = {});
      var g = String(v.id);
      t.state.functionRotation[g] || (t.state.functionRotation[g] = []);
      for (var u = t.state.schedule && (t.state.schedule[v.id] || t.state.schedule[g]) || [], w = Math.max(u.length, (t.state.weekCount || 1) * 7), F = 0; F < w; F++) {
        for (; t.state.functionRotation[g].length <= F; ) t.state.functionRotation[g].push(null);
        u[F] === "WORK" && (t.state.functionRotation[g][F] = "BAG");
      }
    }
  }
  function f(v) {
    if (!(!v || v.function !== "DFO")) {
      t.state.functionRotation || (t.state.functionRotation = {});
      var g = String(v.id);
      t.state.functionRotation[g] || (t.state.functionRotation[g] = []);
      for (var u = t.state.schedule && (t.state.schedule[v.id] || t.state.schedule[g]) || [], w = Math.max(u.length, (t.state.weekCount || 1) * 7), F = 0; F < w; F++) {
        for (; t.state.functionRotation[g].length <= F; ) t.state.functionRotation[g].push(null);
        u[F] === "WORK" && (t.state.functionRotation[g][F] = "DFO");
      }
    }
  }
  function i() {
    var v = document.getElementById("lines-tbody"), g = v || document.querySelector(".lines-virtual-root");
    g && v && g.querySelectorAll("td.cell-toggle").forEach(function(u) {
      var w = t.findLineById ? t.findLineById(u.getAttribute("data-line-id")) : null, F = +u.getAttribute("data-day");
      if (!(!w || isNaN(F))) {
        var O = (t.state.schedule[w.id] || t.state.schedule[String(w.id)] || [])[F] || "RDO";
        if (u.style.background = "", u.style.color = "", O !== "WORK") {
          u.className = "cell-rdo cell-toggle", u.textContent = "RDO", u.style.background = "#000", u.style.color = "#fff", u.style.opacity = "1";
          return;
        }
        var T = e(w, F), P = T === "BAG" || T === "BAGS", R = T === "DFO", M = "";
        P ? M = " cell-function-duty cell-bag" : R && (M = " cell-function-duty cell-dfo"), u.className = "cell-work cell-toggle" + M, u.textContent = n(w);
      }
    });
  }
  t.paintLineColors = i;
  function r(v) {
    var g = t[v];
    if (!(typeof g != "function" || g._lineColorsWrapped)) {
      var u = function() {
        if (t.__USE_SVELTE_LINES) return g.apply(this, arguments);
        var w = g.apply(this, arguments);
        return setTimeout(i, 0), w;
      };
      u._lineColorsWrapped = !0, t[v] = u;
    }
  }
  r("renderLines"), r("renderAll"), r("generateFunctionAssignments"), t._lineColorsBound || (t._lineColorsBound = !0, document.addEventListener("change", function(v) {
    var g = v.target;
    if (!(!g || g.getAttribute("data-field") !== "function")) {
      var u = t.findLineById ? t.findLineById(g.getAttribute("data-line-id")) : null;
      u && (u.function = g.value === "DFO" || g.value === "PAX" || g.value === "BAG" ? g.value : "", u.function === "BAG" && s(u), u.function === "DFO" && f(u), t.renderLines ? t.renderLines() : i());
    }
  }));
}
function Yn(t) {
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
      rotationDutyResolver: typeof e.getRotationDuty == "function" ? e.getRotationDuty : f,
      effectiveTimesResolver: typeof e.getEffectiveShiftTimes == "function" ? e.getEffectiveShiftTimes : null
    };
  }
  function f(h, p) {
    const _ = String(h), m = e.state && e.state.functionRotation, k = m && (m[_] || m[h]);
    if (!Array.isArray(k)) return null;
    const C = k[p];
    return C === "BAG" ? "BAG" : C === "DFO" ? "DFO" : C === "PAX" ? "PAX" : null;
  }
  function i(h, p, _) {
    var m = String(h);
    for (e.state.functionRotation || (e.state.functionRotation = {}), e.state.functionRotation[m] || (e.state.functionRotation[m] = []); e.state.functionRotation[m].length <= p; ) e.state.functionRotation[m].push(null);
    e.state.functionRotation[m][p] = _;
  }
  function r(h) {
    if (!h) return !1;
    if (h.function === "DFO") return !0;
    const p = h.functionEligible;
    return !!(p && (p.dfo === !0 || p.DFO === !0));
  }
  function v() {
    const h = e.state && Array.isArray(e.state.lines) ? e.state.lines : [], p = typeof e.sortLinesForView == "function" && typeof e.filterLinesForView == "function" ? e.sortLinesForView(e.filterLinesForView(h)) : h, _ = e.state && e.state.schedule || {}, m = typeof e.getRowModels == "function" ? e.getRowModels(p, _, s()) : typeof e.getLineRowModels == "function" ? e.getLineRowModels(s()) : [];
    return Array.isArray(m) ? m : [];
  }
  function g() {
    return e.teams && Array.isArray(e.teams.teams) ? e.teams.teams : [];
  }
  function u() {
    return e.state && Array.isArray(e.state.shifts) ? e.state.shifts : [];
  }
  function w() {
    return typeof e.getExportStyle == "function" ? e.getExportStyle() : e.state && e.state.exportStyle || null;
  }
  function F(h) {
    if (!h || typeof h.$set != "function") return;
    const p = v();
    typeof e.applyExportCssVars == "function" && e.applyExportCssVars(), h.$set({
      rows: Array.isArray(p) ? p : [],
      shiftOptions: u(),
      teamOptions: g(),
      exportStyle: w(),
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
  function O(h) {
    if (!h) return;
    const p = e.findLineById ? e.findLineById(h.lineId) : null;
    if (!p) return;
    const _ = h.field, m = h.value;
    if (_ === "lineCode")
      p.lineCode = String(m || "").trim() || p.lineCode;
    else if (_ === "sex")
      p.sex = m === "F" ? "F" : "M";
    else if (_ === "function")
      p.function = m === "DFO" || m === "PAX" || m === "BAG" ? m : "";
    else if (_ === "certPool") {
      var k = String(m || "").trim().toUpperCase();
      p.certPool = k === "A" || k === "B" ? k : "";
    } else if (_ === "emp")
      e.applyLineEmp && e.applyLineEmp(p, m);
    else if (_ === "position") {
      var C = !!(p.isExtra || p.extraPositionId), B = String(m ?? "").trim();
      C ? (B && (p.position = B, p.extraName = B), p.isStso = !1, p.isLtso = !1) : e.applyLineEmp && e.applyLineEmp(p, B);
    } else if (_ === "shift")
      e.applyLineShift && e.applyLineShift(p, m);
    else if (_ === "team")
      e.setLineTeam && e.setLineTeam(h.lineId, m);
    else if (_ === "start" || _ === "end") {
      var L = String(m || "").trim();
      if (e.isValidTimeText && !e.isValidTimeText(L)) return;
      _ === "start" && (p.startTime = L), _ === "end" && (p.endTime = L);
      var K = e.getShift ? e.getShift(p.shiftId) : null, W = p.startTime || (K ? K.start : ""), te = p.endTime || (K ? K.end : "");
      p.shiftLabel = (W || "") + "-" + (te || "");
    }
    e.updateStatus && e.updateStatus("Updated " + (p.lineCode || h.lineId)), X(), (_ === "emp" || _ === "position" || _ === "shift" || _ === "start" || _ === "end") && e.renderCoverageBars && e.renderCoverageBars(), _ === "team" && e.renderTeams && e.renderTeams(), window.dispatchEvent(new CustomEvent("lines:coverage-refresh"));
  }
  function T(h) {
    if (!h) return;
    const p = e.findLineById ? e.findLineById(h.lineId) : null, _ = Number(h.dayIndex);
    if (!p || !Number.isInteger(_) || _ < 0 || _ > 6) return;
    const m = String(p.id);
    e.state.schedule || (e.state.schedule = {});
    var k = e.state.schedule[m] || e.state.schedule[p.id];
    for (Array.isArray(k) || (k = []), e.state.schedule[m] = k; e.state.schedule[m].length < 7; ) e.state.schedule[m].push("RDO");
    e.state.functionRotation || (e.state.functionRotation = {}), !e.state.functionRotation[m] && e.state.functionRotation[p.id] && (e.state.functionRotation[m] = e.state.functionRotation[p.id]);
    const C = e.state.schedule[m][_] || "RDO", B = p.function === "BAG", L = r(p);
    if (C !== "WORK")
      e.state.schedule[m][_] = "WORK", B ? i(m, _, "BAG") : L ? i(m, _, "PAX") : i(m, _, null);
    else if (B)
      e.state.schedule[m][_] = "RDO", i(m, _, null);
    else if (L) {
      var K = typeof e.getRotationDuty == "function" ? e.getRotationDuty(p.id, _) : f(p.id, _), W = K === "DFO" || K === "PAX" || !K ? "PAX" : K;
      W === "PAX" ? i(m, _, "BAG") : (e.state.schedule[m][_] = "RDO", i(m, _, null));
    } else
      e.state.schedule[m][_] = "RDO", i(m, _, null);
    e.syncRdoDaysFromSchedule && e.syncRdoDaysFromSchedule(p), X(), e.renderCoverageBars && e.renderCoverageBars(), window.dispatchEvent(new CustomEvent("lines:coverage-refresh"));
  }
  function P(h) {
    if (!h) return;
    const p = e.findLineById ? e.findLineById(h.lineId) : null, _ = Number(h.dayIndex), m = String(h.duty || "").toUpperCase();
    if (!p || !Number.isInteger(_) || _ < 0 || _ > 6) return;
    const k = String(p.id);
    e.state.schedule || (e.state.schedule = {}), Array.isArray(e.state.schedule[k]) || (e.state.schedule[k] = Array(7).fill("RDO")), m === "OFF" || m === "RDO" || m === "" ? (e.state.schedule[k][_] = "RDO", i(k, _, null)) : (e.state.schedule[k][_] = "WORK", m === "BAG" ? i(k, _, "BAG") : m === "DFO" ? i(k, _, "DFO") : i(k, _, "PAX")), e.syncRdoDaysFromSchedule && e.syncRdoDaysFromSchedule(p), X(), e.renderCoverageBars && e.renderCoverageBars(), window.dispatchEvent(new CustomEvent("lines:coverage-refresh"));
  }
  function R(h) {
    if (!h) return;
    const p = e.findLineById ? e.findLineById(h.lineId) : null, _ = Number(h.dayIndex), m = h.field, k = String(h.value || "").trim();
    if (!(!p || !Number.isInteger(_) || _ < 0 || _ > 6) && !(e.isValidTimeText && !e.isValidTimeText(k))) {
      var C = e.getShift ? e.getShift(p.shiftId) : null;
      if (!C) {
        var B = p.shiftId || "SHIFT_" + p.id;
        p.shiftId = B, e.state.shifts || (e.state.shifts = []), C = e.getShift ? e.getShift(B) : null, C || (C = { id: B, name: B, start: "08:00", end: "16:30", paid: p.paid || 8 }, e.state.shifts.push(C));
      }
      C.dayTimes || (C.dayTimes = {});
      var L = String(_), K = C.dayTimes[L] || { start: C.start || "08:00", end: C.end || "16:30" };
      m === "start" ? C.dayTimes[L] = { start: k, end: K.end } : m === "end" && (C.dayTimes[L] = { start: K.start, end: k }), X(), e.renderCoverageBars && e.renderCoverageBars(), window.dispatchEvent(new CustomEvent("lines:coverage-refresh"));
    }
  }
  function M(h) {
    h && (e.linesView || (e.linesView = {}), h.sortBy && (e.linesView.sortBy = h.sortBy), h.sortDir && (e.linesView.sortDir = h.sortDir), X());
  }
  function N(h) {
    h && (e.linesView || (e.linesView = {}), h.filterRole !== void 0 && (e.linesView.filterRole = h.filterRole), h.filterShift !== void 0 && (e.linesView.filterShift = h.filterShift), h.filterTeam !== void 0 && (e.linesView.filterTeam = h.filterTeam), h.filterSex !== void 0 && (e.linesView.filterSex = h.filterSex), h.filterDuty !== void 0 && (e.linesView.filterDuty = h.filterDuty), h.filterDay !== void 0 && (e.linesView.filterDay = h.filterDay), h.searchCode !== void 0 && (e.linesView.searchCode = h.searchCode), X());
  }
  const X = () => {
    try {
      const h = n._linesTableApp;
      if (h)
        F(h);
      else {
        n.childNodes.length && (n.innerHTML = "");
        const p = v();
        typeof e.applyExportCssVars == "function" && e.applyExportCssVars(), n._linesTableApp = new Un({
          target: n,
          props: {
            rows: Array.isArray(p) ? p : [],
            shiftOptions: u(),
            teamOptions: g(),
            exportStyle: w(),
            currentSortBy: e.linesView && e.linesView.sortBy || "role",
            currentSortDir: e.linesView && e.linesView.sortDir || "asc",
            filterRole: e.linesView && e.linesView.filterRole || "ALL",
            filterShift: e.linesView && e.linesView.filterShift || "",
            filterTeam: e.linesView && e.linesView.filterTeam || "",
            filterSex: e.linesView && e.linesView.filterSex || "",
            filterDuty: e.linesView && e.linesView.filterDuty || "",
            filterDay: e.linesView && e.linesView.filterDay || "",
            searchCode: e.linesView && e.linesView.searchCode || "",
            onInlineEdit: O,
            onDayToggle: T,
            onDayDutyEdit: P,
            onDayTimeEdit: R,
            onSort: M,
            onFilter: N
          }
        });
      }
    } catch (h) {
      console.error("lines-table: refresh failed", h);
    }
  };
  X(), e.bindLinesUI && e.bindLinesUI(), document.addEventListener("click", (h) => {
    const p = h.target.closest?.(".tab-btn");
    p && p.dataset.tab === "lines" && X();
  }), ["lines:request-render", "lines:filter-change", "lines:sort-change", "lines:coverage-refresh"].forEach((h) => {
    window.addEventListener(h, X);
  }), n.refresh = X;
}
export {
  Yn as initLinesTable
};
