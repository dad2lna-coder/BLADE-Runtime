var tn = Object.defineProperty;
var nn = (t, e, n) => e in t ? tn(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var Ct = (t, e, n) => nn(t, typeof e != "symbol" ? e + "" : e, n);
function qe() {
}
function Yt(t) {
  return t();
}
function Dt() {
  return /* @__PURE__ */ Object.create(null);
}
function ot(t) {
  t.forEach(Yt);
}
function Zt(t) {
  return typeof t == "function";
}
function ln(t, e) {
  return t != t ? e == e : t !== e || t && typeof t == "object" || typeof t == "function";
}
function on(t) {
  return Object.keys(t).length === 0;
}
function St(t) {
  return t ?? "";
}
function i(t, e) {
  t.appendChild(e);
}
function _e(t, e, n) {
  t.insertBefore(e, n || null);
}
function ue(t) {
  t.parentNode && t.parentNode.removeChild(t);
}
function it(t, e) {
  for (let n = 0; n < t.length; n += 1)
    t[n] && t[n].d(e);
}
function r(t) {
  return document.createElement(t);
}
function le(t) {
  return document.createTextNode(t);
}
function O() {
  return le(" ");
}
function G(t, e, n, o) {
  return t.addEventListener(e, n, o), () => t.removeEventListener(e, n, o);
}
function a(t, e, n) {
  n == null ? t.removeAttribute(e) : t.getAttribute(e) !== n && t.setAttribute(e, n);
}
function an(t) {
  return Array.from(t.childNodes);
}
function Xe(t, e) {
  e = "" + e, t.data !== e && (t.data = /** @type {string} */
  e);
}
function T(t, e) {
  t.value = e ?? "";
}
function x(t, e, n, o) {
  n == null ? t.style.removeProperty(e) : t.style.setProperty(e, n, "");
}
function U(t, e, n) {
  for (let o = 0; o < t.options.length; o += 1) {
    const c = t.options[o];
    if (c.__value === e) {
      c.selected = !0;
      return;
    }
  }
  (!n || e !== void 0) && (t.selectedIndex = -1);
}
function pt(t) {
  const e = t.querySelector(":checked");
  return e && e.__value;
}
let At;
function mt(t) {
  At = t;
}
const ct = [], Tt = [];
let dt = [];
const Ot = [], rn = /* @__PURE__ */ Promise.resolve();
let Ft = !1;
function sn() {
  Ft || (Ft = !0, rn.then(xt));
}
function je(t) {
  dt.push(t);
}
const Rt = /* @__PURE__ */ new Set();
let ft = 0;
function xt() {
  if (ft !== 0)
    return;
  const t = At;
  do {
    try {
      for (; ft < ct.length; ) {
        const e = ct[ft];
        ft++, mt(e), un(e.$$);
      }
    } catch (e) {
      throw ct.length = 0, ft = 0, e;
    }
    for (mt(null), ct.length = 0, ft = 0; Tt.length; ) Tt.pop()();
    for (let e = 0; e < dt.length; e += 1) {
      const n = dt[e];
      Rt.has(n) || (Rt.add(n), n());
    }
    dt.length = 0;
  } while (ct.length);
  for (; Ot.length; )
    Ot.pop()();
  Ft = !1, Rt.clear(), mt(t);
}
function un(t) {
  if (t.fragment !== null) {
    t.update(), ot(t.before_update);
    const e = t.dirty;
    t.dirty = [-1], t.fragment && t.fragment.p(t.ctx, e), t.after_update.forEach(je);
  }
}
function fn(t) {
  const e = [], n = [];
  dt.forEach((o) => t.indexOf(o) === -1 ? e.push(o) : n.push(o)), n.forEach((o) => o()), dt = e;
}
const cn = /* @__PURE__ */ new Set();
function $t(t, e) {
  t && t.i && (cn.delete(t), t.i(e));
}
function ie(t) {
  return t?.length !== void 0 ? t : Array.from(t);
}
function dn(t, e) {
  t.d(1), e.delete(t.key);
}
function _n(t, e, n, o, c, l, s, p, _, u, b, C) {
  let L = t.length, V = l.length, N = L;
  const I = {};
  for (; N--; ) I[t[N].key] = N;
  const k = [], d = /* @__PURE__ */ new Map(), v = /* @__PURE__ */ new Map(), m = [];
  for (N = V; N--; ) {
    const w = C(c, l, N), M = n(w);
    let S = s.get(M);
    S ? m.push(() => S.p(w, e)) : (S = u(M, w), S.c()), d.set(M, k[N] = S), M in I && v.set(M, Math.abs(N - I[M]));
  }
  const y = /* @__PURE__ */ new Set(), B = /* @__PURE__ */ new Set();
  function K(w) {
    $t(w, 1), w.m(p, b), s.set(w.key, w), b = w.first, V--;
  }
  for (; L && V; ) {
    const w = k[V - 1], M = t[L - 1], S = w.key, P = M.key;
    w === M ? (b = w.first, L--, V--) : d.has(P) ? !s.has(S) || y.has(S) ? K(w) : B.has(P) ? L-- : v.get(S) > v.get(P) ? (B.add(S), K(w)) : (y.add(P), L--) : (_(M, s), L--);
  }
  for (; L--; ) {
    const w = t[L];
    d.has(w.key) || _(w, s);
  }
  for (; V; ) K(k[V - 1]);
  return ot(m), k;
}
function hn(t, e, n) {
  const { fragment: o, after_update: c } = t.$$;
  o && o.m(e, n), je(() => {
    const l = t.$$.on_mount.map(Yt).filter(Zt);
    t.$$.on_destroy ? t.$$.on_destroy.push(...l) : ot(l), t.$$.on_mount = [];
  }), c.forEach(je);
}
function vn(t, e) {
  const n = t.$$;
  n.fragment !== null && (fn(n.after_update), ot(n.on_destroy), n.fragment && n.fragment.d(e), n.on_destroy = n.fragment = null, n.ctx = []);
}
function gn(t, e) {
  t.$$.dirty[0] === -1 && (ct.push(t), sn(), t.$$.dirty.fill(0)), t.$$.dirty[e / 31 | 0] |= 1 << e % 31;
}
function pn(t, e, n, o, c, l, s = null, p = [-1]) {
  const _ = At;
  mt(t);
  const u = t.$$ = {
    fragment: null,
    ctx: [],
    // state
    props: l,
    update: qe,
    not_equal: c,
    bound: Dt(),
    // lifecycle
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(e.context || (_ ? _.$$.context : [])),
    // everything else
    callbacks: Dt(),
    dirty: p,
    skip_bound: !1,
    root: e.target || _.$$.root
  };
  s && s(u.root);
  let b = !1;
  if (u.ctx = n ? n(t, e.props || {}, (C, L, ...V) => {
    const N = V.length ? V[0] : L;
    return u.ctx && c(u.ctx[C], u.ctx[C] = N) && (!u.skip_bound && u.bound[C] && u.bound[C](N), b && gn(t, C)), L;
  }) : [], u.update(), b = !0, ot(u.before_update), u.fragment = o ? o(u.ctx) : !1, e.target) {
    if (e.hydrate) {
      const C = an(e.target);
      u.fragment && u.fragment.l(C), C.forEach(ue);
    } else
      u.fragment && u.fragment.c();
    e.intro && $t(t.$$.fragment), hn(t, e.target, e.anchor), xt();
  }
  mt(_);
}
class mn {
  constructor() {
    /**
     * ### PRIVATE API
     *
     * Do not use, may change at any time
     *
     * @type {any}
     */
    Ct(this, "$$");
    /**
     * ### PRIVATE API
     *
     * Do not use, may change at any time
     *
     * @type {any}
     */
    Ct(this, "$$set");
  }
  /** @returns {void} */
  $destroy() {
    vn(this, 1), this.$destroy = qe;
  }
  /**
   * @template {Extract<keyof Events, string>} K
   * @param {K} type
   * @param {((e: Events[K]) => void) | null | undefined} callback
   * @returns {() => void}
   */
  $on(e, n) {
    if (!Zt(n))
      return qe;
    const o = this.$$.callbacks[e] || (this.$$.callbacks[e] = []);
    return o.push(n), () => {
      const c = o.indexOf(n);
      c !== -1 && o.splice(c, 1);
    };
  }
  /**
   * @param {Partial<Props>} props
   * @returns {void}
   */
  $set(e) {
    this.$$set && !on(e) && (this.$$.skip_bound = !0, this.$$set(e), this.$$.skip_bound = !1);
  }
}
const yn = "4";
typeof window < "u" && (window.__svelte || (window.__svelte = { v: /* @__PURE__ */ new Set() })).v.add(yn);
function Lt() {
  return {
    rdo: "#000000",
    bag: "#F4B4B4",
    dfo: "#FFF3A8",
    pax: "#A0C4FF",
    header: "#1F4E79"
  };
}
function wn(t, e) {
  if (!t) return e;
  var n = String(t).replace("#", "").trim();
  return n.length === 3 && (n = n[0] + n[0] + n[1] + n[1] + n[2] + n[2]), n.length !== 6 || /[^0-9a-fA-F]/.test(n) ? e : "#" + n.toUpperCase();
}
function bn(t) {
  var e = wn(t, "#FFFFFF") || "#FFFFFF", n = e.slice(1), o = parseInt(n.slice(0, 2), 16), c = parseInt(n.slice(2, 4), 16), l = parseInt(n.slice(4, 6), 16), s = (0.299 * o + 0.587 * c + 0.114 * l) / 255;
  return s < 0.45 ? "#FFFFFF" : "#111111";
}
function kt(t, e, n) {
  const o = t.slice();
  return o[47] = e[n], o;
}
function Bt(t, e, n) {
  const o = t.slice();
  return o[50] = e[n], o;
}
function Et(t, e, n) {
  const o = t.slice();
  return o[53] = e[n], o;
}
function Vt(t, e, n) {
  const o = t.slice();
  return o[56] = e[n], o;
}
function It(t, e, n) {
  const o = t.slice();
  return o[59] = e[n], o;
}
function Pt(t, e, n) {
  const o = t.slice();
  return o[62] = e[n], o;
}
function Mt(t, e, n) {
  const o = t.slice();
  return o[59] = e[n], o;
}
function Nt(t, e, n) {
  const o = t.slice();
  return o[62] = e[n], o;
}
function Cn(t) {
  let e;
  return {
    c() {
      e = r("div"), e.textContent = "Classic Lines mode active", a(e, "class", "muted");
    },
    m(n, o) {
      _e(n, e, o);
    },
    p: qe,
    d(n) {
      n && ue(e);
    }
  };
}
function Rn(t) {
  let e, n, o, c, l, s, p, _, u, b, C, L, V, N, I, k, d, v, m, y, B, K, w, M, S, P, Se, z, ye, he, J, oe, ve, ze, Fe, Te, X, ae, ge, we, We, re, H, me, F, fe, Oe, Ae, Je, h, A, se, pe, be, Le, De, _t, Qe, Ye, $, ke, Ce, Be, Ee, ht, Ze, xe, Ve, at, $e, et, Ie, rt, tt, st, Pe, nt, Ke, vt, Me, ut, lt, Ne, Q, yt, Ue, ee = [], Y = /* @__PURE__ */ new Map(), gt, wt, He = ie(
    /*teamOptions*/
    t[9]
  ), j = [];
  for (let R = 0; R < He.length; R += 1)
    j[R] = Gt(Nt(t, He, R));
  let q = ie(
    /*shiftOptions*/
    t[8]
  ), te = [];
  for (let R = 0; R < q.length; R += 1)
    te[R] = Xt(Mt(t, q, R));
  let ce = ie(
    /*rows*/
    t[6]
  );
  const Z = (R) => (
    /*row*/
    R[47].id
  );
  for (let R = 0; R < ce.length; R += 1) {
    let W = kt(t, ce, R), D = Z(W);
    Y.set(D, ee[R] = zt(D, W));
  }
  let ne = null;
  return ce.length || (ne = Wt()), {
    c() {
      e = r("div"), n = r("div"), o = r("label"), c = le(`Search
          `), l = r("input"), s = O(), p = r("label"), _ = le(`Role
          `), u = r("select"), b = r("option"), b.textContent = "All", C = r("option"), C.textContent = "STSO", L = r("option"), L.textContent = "LTSO", V = r("option"), V.textContent = "TSO (FT/PT)", N = O(), I = r("label"), k = le(`Team
          `), d = r("select"), v = r("option"), v.textContent = "All", m = r("option"), m.textContent = "Unassigned";
      for (let R = 0; R < j.length; R += 1)
        j[R].c();
      y = O(), B = r("label"), K = le(`Shift
          `), w = r("select"), M = r("option"), M.textContent = "All shifts";
      for (let R = 0; R < te.length; R += 1)
        te[R].c();
      S = O(), P = r("label"), Se = le(`Duty
          `), z = r("select"), ye = r("option"), ye.textContent = "All duties", he = r("option"), he.textContent = "BAG", J = r("option"), J.textContent = "PAX", oe = r("option"), oe.textContent = "DFO", ve = r("option"), ve.textContent = "OFF / RDO", ze = O(), Fe = r("label"), Te = le(`Sex
          `), X = r("select"), ae = r("option"), ae.textContent = "All", ge = r("option"), ge.textContent = "M", we = r("option"), we.textContent = "F", We = O(), re = r("div"), H = r("table"), me = r("thead"), F = r("tr"), fe = r("th"), fe.textContent = `Team${/*sortIndicator*/
      t[18]("team")}`, Oe = O(), Ae = r("th"), Ae.textContent = `Line${/*sortIndicator*/
      t[18]("line")}`, Je = O(), h = r("th"), h.textContent = `Shift${/*sortIndicator*/
      t[18]("shift")}`, A = O(), se = r("th"), se.textContent = `Start${/*sortIndicator*/
      t[18]("start")}`, pe = O(), be = r("th"), be.textContent = "End", Le = O(), De = r("th"), De.textContent = `Position${/*sortIndicator*/
      t[18]("role")}`, _t = O(), Qe = r("th"), Qe.textContent = "Emp", Ye = O(), $ = r("th"), $.textContent = "Sex", ke = O(), Ce = r("th"), Ce.textContent = "Duty / Func", Be = O(), Ee = r("th"), Ee.textContent = "Cert pool", ht = O(), Ze = r("th"), Ze.textContent = "RDOs", xe = O(), Ve = r("th"), Ve.textContent = "Paid", at = O(), $e = r("th"), $e.textContent = "Sun", et = O(), Ie = r("th"), Ie.textContent = "Mon", rt = O(), tt = r("th"), tt.textContent = "Tue", st = O(), Pe = r("th"), Pe.textContent = "Wed", nt = O(), Ke = r("th"), Ke.textContent = "Thu", vt = O(), Me = r("th"), Me.textContent = "Fri", ut = O(), lt = r("th"), lt.textContent = "Sat", Ne = O(), Q = r("th"), Q.textContent = "Hours", yt = O(), Ue = r("tbody");
      for (let R = 0; R < ee.length; R += 1)
        ee[R].c();
      ne && ne.c(), a(l, "type", "text"), a(l, "class", "filter-input search-input svelte-10754o0"), a(l, "placeholder", "Search line code..."), a(o, "class", "svelte-10754o0"), b.__value = "ALL", T(b, b.__value), C.__value = "STSO", T(C, C.__value), L.__value = "LTSO", T(L, L.__value), V.__value = "TSO", T(V, V.__value), a(u, "class", "filter-select svelte-10754o0"), /*filterRole*/
      t[0] === void 0 && je(() => (
        /*select0_change_handler*/
        t[26].call(u)
      )), a(p, "class", "svelte-10754o0"), v.__value = "", T(v, v.__value), m.__value = "__none__", T(m, m.__value), a(d, "class", "filter-select svelte-10754o0"), /*filterTeam*/
      t[2] === void 0 && je(() => (
        /*select1_change_handler*/
        t[27].call(d)
      )), a(I, "class", "svelte-10754o0"), M.__value = "", T(M, M.__value), a(w, "class", "filter-select svelte-10754o0"), /*filterShift*/
      t[1] === void 0 && je(() => (
        /*select2_change_handler*/
        t[28].call(w)
      )), a(B, "class", "svelte-10754o0"), ye.__value = "", T(ye, ye.__value), he.__value = "BAG", T(he, he.__value), J.__value = "PAX", T(J, J.__value), oe.__value = "DFO", T(oe, oe.__value), ve.__value = "OFF", T(ve, ve.__value), a(z, "class", "filter-select svelte-10754o0"), /*filterDuty*/
      t[4] === void 0 && je(() => (
        /*select3_change_handler*/
        t[29].call(z)
      )), a(P, "class", "svelte-10754o0"), ae.__value = "", T(ae, ae.__value), ge.__value = "M", T(ge, ge.__value), we.__value = "F", T(we, we.__value), a(X, "class", "filter-select svelte-10754o0"), /*filterSex*/
      t[3] === void 0 && je(() => (
        /*select4_change_handler*/
        t[30].call(X)
      )), a(Fe, "class", "svelte-10754o0"), a(n, "class", "filter-controls svelte-10754o0"), a(e, "class", "lines-table-header-controls svelte-10754o0"), a(fe, "class", "sortable svelte-10754o0"), a(Ae, "class", "sortable svelte-10754o0"), a(h, "class", "sortable svelte-10754o0"), a(se, "class", "sortable svelte-10754o0"), a(be, "class", "svelte-10754o0"), a(De, "class", "sortable svelte-10754o0"), a(Qe, "class", "svelte-10754o0"), a($, "class", "svelte-10754o0"), a(Ce, "class", "svelte-10754o0"), a(Ee, "class", "svelte-10754o0"), a(Ze, "class", "svelte-10754o0"), a(Ve, "class", "svelte-10754o0"), a($e, "class", "svelte-10754o0"), a(Ie, "class", "svelte-10754o0"), a(tt, "class", "svelte-10754o0"), a(Pe, "class", "svelte-10754o0"), a(Ke, "class", "svelte-10754o0"), a(Me, "class", "svelte-10754o0"), a(lt, "class", "svelte-10754o0"), a(Q, "class", "svelte-10754o0"), a(H, "class", "data-table lines-editable svelte-10754o0"), x(H, "width", "max-content"), x(H, "min-width", "1100px"), a(re, "class", "lines-virtual-root svelte-10754o0"), x(re, "height", "calc(100% - 46px)"), x(re, "overflow", "auto"), x(re, "position", "relative");
    },
    m(R, W) {
      _e(R, e, W), i(e, n), i(n, o), i(o, c), i(o, l), T(
        l,
        /*searchCode*/
        t[5]
      ), i(n, s), i(n, p), i(p, _), i(p, u), i(u, b), i(u, C), i(u, L), i(u, V), U(
        u,
        /*filterRole*/
        t[0],
        !0
      ), i(n, N), i(n, I), i(I, k), i(I, d), i(d, v), i(d, m);
      for (let D = 0; D < j.length; D += 1)
        j[D] && j[D].m(d, null);
      U(
        d,
        /*filterTeam*/
        t[2],
        !0
      ), i(n, y), i(n, B), i(B, K), i(B, w), i(w, M);
      for (let D = 0; D < te.length; D += 1)
        te[D] && te[D].m(w, null);
      U(
        w,
        /*filterShift*/
        t[1],
        !0
      ), i(n, S), i(n, P), i(P, Se), i(P, z), i(z, ye), i(z, he), i(z, J), i(z, oe), i(z, ve), U(
        z,
        /*filterDuty*/
        t[4],
        !0
      ), i(n, ze), i(n, Fe), i(Fe, Te), i(Fe, X), i(X, ae), i(X, ge), i(X, we), U(
        X,
        /*filterSex*/
        t[3],
        !0
      ), _e(R, We, W), _e(R, re, W), i(re, H), i(H, me), i(me, F), i(F, fe), i(F, Oe), i(F, Ae), i(F, Je), i(F, h), i(F, A), i(F, se), i(F, pe), i(F, be), i(F, Le), i(F, De), i(F, _t), i(F, Qe), i(F, Ye), i(F, $), i(F, ke), i(F, Ce), i(F, Be), i(F, Ee), i(F, ht), i(F, Ze), i(F, xe), i(F, Ve), i(F, at), i(F, $e), i(F, et), i(F, Ie), i(F, rt), i(F, tt), i(F, st), i(F, Pe), i(F, nt), i(F, Ke), i(F, vt), i(F, Me), i(F, ut), i(F, lt), i(F, Ne), i(F, Q), i(H, yt), i(H, Ue);
      for (let D = 0; D < ee.length; D += 1)
        ee[D] && ee[D].m(Ue, null);
      ne && ne.m(Ue, null), gt || (wt = [
        G(
          l,
          "input",
          /*input_input_handler*/
          t[25]
        ),
        G(
          l,
          "input",
          /*handleFilterChange*/
          t[17]
        ),
        G(
          u,
          "change",
          /*select0_change_handler*/
          t[26]
        ),
        G(
          u,
          "change",
          /*handleFilterChange*/
          t[17]
        ),
        G(
          d,
          "change",
          /*select1_change_handler*/
          t[27]
        ),
        G(
          d,
          "change",
          /*handleFilterChange*/
          t[17]
        ),
        G(
          w,
          "change",
          /*select2_change_handler*/
          t[28]
        ),
        G(
          w,
          "change",
          /*handleFilterChange*/
          t[17]
        ),
        G(
          z,
          "change",
          /*select3_change_handler*/
          t[29]
        ),
        G(
          z,
          "change",
          /*handleFilterChange*/
          t[17]
        ),
        G(
          X,
          "change",
          /*select4_change_handler*/
          t[30]
        ),
        G(
          X,
          "change",
          /*handleFilterChange*/
          t[17]
        ),
        G(
          fe,
          "click",
          /*click_handler*/
          t[31]
        ),
        G(
          Ae,
          "click",
          /*click_handler_1*/
          t[32]
        ),
        G(
          h,
          "click",
          /*click_handler_2*/
          t[33]
        ),
        G(
          se,
          "click",
          /*click_handler_3*/
          t[34]
        ),
        G(
          De,
          "click",
          /*click_handler_4*/
          t[35]
        )
      ], gt = !0);
    },
    p(R, W) {
      if (W[0] & /*searchCode*/
      32 && l.value !== /*searchCode*/
      R[5] && T(
        l,
        /*searchCode*/
        R[5]
      ), W[0] & /*filterRole*/
      1 && U(
        u,
        /*filterRole*/
        R[0]
      ), W[0] & /*teamOptions*/
      512) {
        He = ie(
          /*teamOptions*/
          R[9]
        );
        let D;
        for (D = 0; D < He.length; D += 1) {
          const Ge = Nt(R, He, D);
          j[D] ? j[D].p(Ge, W) : (j[D] = Gt(Ge), j[D].c(), j[D].m(d, null));
        }
        for (; D < j.length; D += 1)
          j[D].d(1);
        j.length = He.length;
      }
      if (W[0] & /*filterTeam, teamOptions*/
      516 && U(
        d,
        /*filterTeam*/
        R[2]
      ), W[0] & /*shiftOptions*/
      256) {
        q = ie(
          /*shiftOptions*/
          R[8]
        );
        let D;
        for (D = 0; D < q.length; D += 1) {
          const Ge = Mt(R, q, D);
          te[D] ? te[D].p(Ge, W) : (te[D] = Xt(Ge), te[D].c(), te[D].m(w, null));
        }
        for (; D < te.length; D += 1)
          te[D].d(1);
        te.length = q.length;
      }
      W[0] & /*filterShift, shiftOptions*/
      258 && U(
        w,
        /*filterShift*/
        R[1]
      ), W[0] & /*filterDuty*/
      16 && U(
        z,
        /*filterDuty*/
        R[4]
      ), W[0] & /*filterSex*/
      8 && U(
        X,
        /*filterSex*/
        R[3]
      ), W[0] & /*rows, dayStyle, emitDay, emitEdit, BASE_EMPS, BASE_POSITIONS, shiftOptions, teamOptions*/
      64320 && (ce = ie(
        /*rows*/
        R[6]
      ), ee = _n(ee, W, Z, 1, R, ce, Y, Ue, dn, zt, null, kt), !ce.length && ne ? ne.p(R, W) : ce.length ? ne && (ne.d(1), ne = null) : (ne = Wt(), ne.c(), ne.m(Ue, null)));
    },
    d(R) {
      R && (ue(e), ue(We), ue(re)), it(j, R), it(te, R);
      for (let W = 0; W < ee.length; W += 1)
        ee[W].d();
      ne && ne.d(), gt = !1, ot(wt);
    }
  };
}
function Gt(t) {
  let e, n = (
    /*team*/
    (t[62].name ?? /*team*/
    t[62].id) + ""
  ), o, c;
  return {
    c() {
      e = r("option"), o = le(n), e.__value = c = /*team*/
      t[62].id, T(e, e.__value);
    },
    m(l, s) {
      _e(l, e, s), i(e, o);
    },
    p(l, s) {
      s[0] & /*teamOptions*/
      512 && n !== (n = /*team*/
      (l[62].name ?? /*team*/
      l[62].id) + "") && Xe(o, n), s[0] & /*teamOptions*/
      512 && c !== (c = /*team*/
      l[62].id) && (e.__value = c, T(e, e.__value));
    },
    d(l) {
      l && ue(e);
    }
  };
}
function Xt(t) {
  let e, n = bt(
    /*shift*/
    t[59]
  ) + "", o, c;
  return {
    c() {
      e = r("option"), o = le(n), e.__value = c = /*shift*/
      t[59].id, T(e, e.__value);
    },
    m(l, s) {
      _e(l, e, s), i(e, o);
    },
    p(l, s) {
      s[0] & /*shiftOptions*/
      256 && n !== (n = bt(
        /*shift*/
        l[59]
      ) + "") && Xe(o, n), s[0] & /*shiftOptions*/
      256 && c !== (c = /*shift*/
      l[59].id) && (e.__value = c, T(e, e.__value));
    },
    d(l) {
      l && ue(e);
    }
  };
}
function Wt(t) {
  let e;
  return {
    c() {
      e = r("tr"), e.innerHTML = '<td colspan="20" class="muted svelte-10754o0" style="padding: 1.5rem; text-align: center;">No matching lines found.</td>';
    },
    m(n, o) {
      _e(n, e, o);
    },
    p: qe,
    d(n) {
      n && ue(e);
    }
  };
}
function Kt(t) {
  let e, n = (
    /*team*/
    (t[62].name ?? /*team*/
    t[62].id) + ""
  ), o, c;
  return {
    c() {
      e = r("option"), o = le(n), e.__value = c = /*team*/
      t[62].id, T(e, e.__value);
    },
    m(l, s) {
      _e(l, e, s), i(e, o);
    },
    p(l, s) {
      s[0] & /*teamOptions*/
      512 && n !== (n = /*team*/
      (l[62].name ?? /*team*/
      l[62].id) + "") && Xe(o, n), s[0] & /*teamOptions*/
      512 && c !== (c = /*team*/
      l[62].id) && (e.__value = c, T(e, e.__value));
    },
    d(l) {
      l && ue(e);
    }
  };
}
function Ut(t) {
  let e, n = bt(
    /*shift*/
    t[59]
  ) + "", o, c;
  return {
    c() {
      e = r("option"), o = le(n), e.__value = c = /*shift*/
      t[59].id, T(e, e.__value);
    },
    m(l, s) {
      _e(l, e, s), i(e, o);
    },
    p(l, s) {
      s[0] & /*shiftOptions*/
      256 && n !== (n = bt(
        /*shift*/
        l[59]
      ) + "") && Xe(o, n), s[0] & /*shiftOptions*/
      256 && c !== (c = /*shift*/
      l[59].id) && (e.__value = c, T(e, e.__value));
    },
    d(l) {
      l && ue(e);
    }
  };
}
function Ht(t) {
  let e, n = (
    /*pos*/
    t[56] + ""
  ), o, c;
  return {
    c() {
      e = r("option"), o = le(n), e.__value = c = /*pos*/
      t[56], T(e, e.__value);
    },
    m(l, s) {
      _e(l, e, s), i(e, o);
    },
    p(l, s) {
      s[0] & /*rows*/
      64 && n !== (n = /*pos*/
      l[56] + "") && Xe(o, n), s[0] & /*rows, teamOptions*/
      576 && c !== (c = /*pos*/
      l[56]) && (e.__value = c, T(e, e.__value));
    },
    d(l) {
      l && ue(e);
    }
  };
}
function jt(t) {
  let e, n = (
    /*emp*/
    t[53] + ""
  ), o;
  return {
    c() {
      e = r("option"), o = le(n), e.__value = /*emp*/
      t[53], T(e, e.__value);
    },
    m(c, l) {
      _e(c, e, l), i(e, o);
    },
    p: qe,
    d(c) {
      c && ue(e);
    }
  };
}
function qt(t) {
  let e, n = (
    /*row*/
    (t[47]?.days?.[
      /*i*/
      t[50]
    ] ?? "") + ""
  ), o, c, l, s, p, _;
  function u() {
    return (
      /*click_handler_5*/
      t[46](
        /*row*/
        t[47],
        /*i*/
        t[50]
      )
    );
  }
  return {
    c() {
      e = r("td"), o = le(n), a(e, "class", c = St(Qt(
        /*row*/
        t[47]?.dayDuties?.[
          /*i*/
          t[50]
        ] ?? /*row*/
        t[47]?.days?.[
          /*i*/
          t[50]
        ]
      )) + " svelte-10754o0"), a(e, "style", l = /*dayStyle*/
      t[13](
        /*row*/
        t[47]?.dayDuties?.[
          /*i*/
          t[50]
        ] ?? /*row*/
        t[47]?.days?.[
          /*i*/
          t[50]
        ]
      )), a(e, "data-line-id", s = /*row*/
      t[47]?.id), a(
        e,
        "data-day-index",
        /*i*/
        t[50]
      ), a(e, "title", "Click to cycle duty (PAX -> BAG -> DFO -> OFF)");
    },
    m(b, C) {
      _e(b, e, C), i(e, o), p || (_ = G(e, "click", u), p = !0);
    },
    p(b, C) {
      t = b, C[0] & /*rows*/
      64 && n !== (n = /*row*/
      (t[47]?.days?.[
        /*i*/
        t[50]
      ] ?? "") + "") && Xe(o, n), C[0] & /*rows, teamOptions*/
      576 && c !== (c = St(Qt(
        /*row*/
        t[47]?.dayDuties?.[
          /*i*/
          t[50]
        ] ?? /*row*/
        t[47]?.days?.[
          /*i*/
          t[50]
        ]
      )) + " svelte-10754o0") && a(e, "class", c), C[0] & /*rows, teamOptions*/
      576 && l !== (l = /*dayStyle*/
      t[13](
        /*row*/
        t[47]?.dayDuties?.[
          /*i*/
          t[50]
        ] ?? /*row*/
        t[47]?.days?.[
          /*i*/
          t[50]
        ]
      )) && a(e, "style", l), C[0] & /*rows, teamOptions*/
      576 && s !== (s = /*row*/
      t[47]?.id) && a(e, "data-line-id", s);
    },
    d(b) {
      b && ue(e), p = !1, _();
    }
  };
}
function zt(t, e) {
  let n, o, c, l, s, p, _, u, b, C, L, V, N, I, k, d, v, m, y, B, K, w, M, S, P, Se, z, ye, he, J, oe, ve, ze, Fe, Te, X, ae, ge, we, We, re, H, me, F, fe, Oe, Ae, Je, h, A, se, pe, be, Le, De, _t, Qe, Ye, $, ke, Ce, Be, Ee, ht, Ze, xe, Ve = (
    /*row*/
    (e[47]?.rdos ?? "—") + ""
  ), at, $e, et, Ie = (
    /*row*/
    (e[47]?.paid ?? "") + ""
  ), rt, tt, st, Pe, nt = (
    /*row*/
    (e[47]?.hours ?? "") + ""
  ), Ke, vt, Me, ut, lt, Ne = ie(
    /*teamOptions*/
    e[9]
  ), Q = [];
  for (let g = 0; g < Ne.length; g += 1)
    Q[g] = Kt(Pt(e, Ne, g));
  function yt(...g) {
    return (
      /*change_handler*/
      e[36](
        /*row*/
        e[47],
        ...g
      )
    );
  }
  function Ue(...g) {
    return (
      /*change_handler_1*/
      e[37](
        /*row*/
        e[47],
        ...g
      )
    );
  }
  let ee = ie(
    /*shiftOptions*/
    e[8]
  ), Y = [];
  for (let g = 0; g < ee.length; g += 1)
    Y[g] = Ut(It(e, ee, g));
  function gt(...g) {
    return (
      /*change_handler_2*/
      e[38](
        /*row*/
        e[47],
        ...g
      )
    );
  }
  function wt(...g) {
    return (
      /*change_handler_3*/
      e[39](
        /*row*/
        e[47],
        ...g
      )
    );
  }
  function He(...g) {
    return (
      /*change_handler_4*/
      e[40](
        /*row*/
        e[47],
        ...g
      )
    );
  }
  let j = ie(Jt(
    /*BASE_POSITIONS*/
    e[11],
    /*row*/
    e[47]?.position
  )), q = [];
  for (let g = 0; g < j.length; g += 1)
    q[g] = Ht(Vt(e, j, g));
  function te(...g) {
    return (
      /*change_handler_5*/
      e[41](
        /*row*/
        e[47],
        ...g
      )
    );
  }
  let ce = ie(
    /*BASE_EMPS*/
    e[12]
  ), Z = [];
  for (let g = 0; g < ce.length; g += 1)
    Z[g] = jt(Et(e, ce, g));
  function ne(...g) {
    return (
      /*change_handler_6*/
      e[42](
        /*row*/
        e[47],
        ...g
      )
    );
  }
  function R(...g) {
    return (
      /*change_handler_7*/
      e[43](
        /*row*/
        e[47],
        ...g
      )
    );
  }
  function W(...g) {
    return (
      /*change_handler_8*/
      e[44](
        /*row*/
        e[47],
        ...g
      )
    );
  }
  function D(...g) {
    return (
      /*change_handler_9*/
      e[45](
        /*row*/
        e[47],
        ...g
      )
    );
  }
  let Ge = ie([0, 1, 2, 3, 4, 5, 6]), Re = [];
  for (let g = 0; g < 7; g += 1)
    Re[g] = qt(Bt(e, Ge, g));
  return {
    key: t,
    first: null,
    c() {
      n = r("tr"), o = r("td"), c = r("select"), l = r("option"), l.textContent = "—";
      for (let g = 0; g < Q.length; g += 1)
        Q[g].c();
      _ = O(), u = r("td"), b = r("input"), V = O(), N = r("td"), I = r("select"), k = r("option"), k.textContent = "—";
      for (let g = 0; g < Y.length; g += 1)
        Y[g].c();
      m = O(), y = r("td"), B = r("input"), M = O(), S = r("td"), P = r("input"), ye = O(), he = r("td"), J = r("select"), oe = r("option"), oe.textContent = "—";
      for (let g = 0; g < q.length; g += 1)
        q[g].c();
      Fe = O(), Te = r("td"), X = r("select"), ae = r("option"), ae.textContent = "—";
      for (let g = 0; g < Z.length; g += 1)
        Z[g].c();
      We = O(), re = r("td"), H = r("select"), me = r("option"), me.textContent = "—", F = r("option"), F.textContent = "M", fe = r("option"), fe.textContent = "F", Je = O(), h = r("td"), A = r("select"), se = r("option"), se.textContent = "—", pe = r("option"), pe.textContent = "DFO", be = r("option"), be.textContent = "BAG", Le = r("option"), Le.textContent = "PAX", Qe = O(), Ye = r("td"), $ = r("select"), ke = r("option"), ke.textContent = "—", Ce = r("option"), Ce.textContent = "A", Be = r("option"), Be.textContent = "B", Ze = O(), xe = r("td"), at = le(Ve), $e = O(), et = r("td"), rt = le(Ie), tt = O();
      for (let g = 0; g < 7; g += 1)
        Re[g].c();
      st = O(), Pe = r("td"), Ke = le(nt), vt = O(), l.__value = "", T(l, l.__value), a(c, "class", "line-edit svelte-10754o0"), a(c, "data-field", "team"), a(c, "data-line-id", s = /*row*/
      e[47]?.id), a(o, "class", "svelte-10754o0"), a(b, "type", "text"), a(b, "class", "line-edit line-code-input svelte-10754o0"), a(b, "data-field", "lineCode"), a(b, "data-line-id", C = /*row*/
      e[47]?.id), b.value = L = /*row*/
      e[47]?.line ?? "", a(u, "class", "svelte-10754o0"), k.__value = "", T(k, k.__value), a(I, "class", "line-edit svelte-10754o0"), a(I, "data-field", "shift"), a(I, "data-line-id", d = /*row*/
      e[47]?.id), a(N, "class", "svelte-10754o0"), a(B, "type", "time"), a(B, "class", "line-edit line-time-input svelte-10754o0"), a(B, "data-field", "start"), a(B, "data-line-id", K = /*row*/
      e[47]?.id), B.value = w = /*row*/
      e[47]?.start ?? "", a(y, "class", "svelte-10754o0"), a(P, "type", "time"), a(P, "class", "line-edit line-time-input svelte-10754o0"), a(P, "data-field", "end"), a(P, "data-line-id", Se = /*row*/
      e[47]?.id), P.value = z = /*row*/
      e[47]?.end ?? "", a(S, "class", "svelte-10754o0"), oe.__value = "", T(oe, oe.__value), a(J, "class", "line-edit svelte-10754o0"), a(J, "data-field", "position"), a(J, "data-line-id", ve = /*row*/
      e[47]?.id), a(he, "class", "svelte-10754o0"), ae.__value = "", T(ae, ae.__value), a(X, "class", "line-edit svelte-10754o0"), a(X, "data-field", "emp"), a(X, "data-line-id", ge = /*row*/
      e[47]?.id), a(Te, "class", "svelte-10754o0"), me.__value = "", T(me, me.__value), F.__value = "M", T(F, F.__value), fe.__value = "F", T(fe, fe.__value), a(H, "class", "line-edit svelte-10754o0"), a(H, "data-field", "sex"), a(H, "data-line-id", Oe = /*row*/
      e[47]?.id), a(re, "class", "svelte-10754o0"), se.__value = "", T(se, se.__value), pe.__value = "DFO", T(pe, pe.__value), be.__value = "BAG", T(be, be.__value), Le.__value = "PAX", T(Le, Le.__value), a(A, "class", "line-edit svelte-10754o0"), a(A, "data-field", "function"), a(A, "data-line-id", De = /*row*/
      e[47]?.id), a(h, "class", "svelte-10754o0"), ke.__value = "", T(ke, ke.__value), Ce.__value = "A", T(Ce, Ce.__value), Be.__value = "B", T(Be, Be.__value), a($, "class", "line-edit svelte-10754o0"), a($, "data-field", "certPool"), a($, "data-line-id", Ee = /*row*/
      e[47]?.id), a(Ye, "class", "svelte-10754o0"), a(xe, "class", "line-rdo-cell svelte-10754o0"), a(et, "class", "svelte-10754o0"), a(Pe, "class", "line-hours svelte-10754o0"), a(n, "data-line-row", Me = /*row*/
      e[47]?.id), this.first = n;
    },
    m(g, E) {
      _e(g, n, E), i(n, o), i(o, c), i(c, l);
      for (let f = 0; f < Q.length; f += 1)
        Q[f] && Q[f].m(c, null);
      U(
        c,
        /*row*/
        e[47]?.teamId ?? ""
      ), i(n, _), i(n, u), i(u, b), i(n, V), i(n, N), i(N, I), i(I, k);
      for (let f = 0; f < Y.length; f += 1)
        Y[f] && Y[f].m(I, null);
      U(
        I,
        /*row*/
        e[47]?.shiftId ?? ""
      ), i(n, m), i(n, y), i(y, B), i(n, M), i(n, S), i(S, P), i(n, ye), i(n, he), i(he, J), i(J, oe);
      for (let f = 0; f < q.length; f += 1)
        q[f] && q[f].m(J, null);
      U(
        J,
        /*row*/
        e[47]?.position ?? ""
      ), i(n, Fe), i(n, Te), i(Te, X), i(X, ae);
      for (let f = 0; f < Z.length; f += 1)
        Z[f] && Z[f].m(X, null);
      U(
        X,
        /*row*/
        e[47]?.emp ?? ""
      ), i(n, We), i(n, re), i(re, H), i(H, me), i(H, F), i(H, fe), U(
        H,
        /*row*/
        e[47]?.sex ?? ""
      ), i(n, Je), i(n, h), i(h, A), i(A, se), i(A, pe), i(A, be), i(A, Le), U(
        A,
        /*row*/
        e[47]?.function ?? ""
      ), i(n, Qe), i(n, Ye), i(Ye, $), i($, ke), i($, Ce), i($, Be), U(
        $,
        /*row*/
        e[47]?.certPool ?? ""
      ), i(n, Ze), i(n, xe), i(xe, at), i(n, $e), i(n, et), i(et, rt), i(n, tt);
      for (let f = 0; f < 7; f += 1)
        Re[f] && Re[f].m(n, null);
      i(n, st), i(n, Pe), i(Pe, Ke), i(n, vt), ut || (lt = [
        G(c, "change", yt),
        G(b, "change", Ue),
        G(I, "change", gt),
        G(B, "change", wt),
        G(P, "change", He),
        G(J, "change", te),
        G(X, "change", ne),
        G(H, "change", R),
        G(A, "change", W),
        G($, "change", D)
      ], ut = !0);
    },
    p(g, E) {
      if (e = g, E[0] & /*teamOptions*/
      512) {
        Ne = ie(
          /*teamOptions*/
          e[9]
        );
        let f;
        for (f = 0; f < Ne.length; f += 1) {
          const de = Pt(e, Ne, f);
          Q[f] ? Q[f].p(de, E) : (Q[f] = Kt(de), Q[f].c(), Q[f].m(c, null));
        }
        for (; f < Q.length; f += 1)
          Q[f].d(1);
        Q.length = Ne.length;
      }
      if (E[0] & /*rows, teamOptions*/
      576 && s !== (s = /*row*/
      e[47]?.id) && a(c, "data-line-id", s), E[0] & /*rows, teamOptions*/
      576 && p !== (p = /*row*/
      e[47]?.teamId ?? "") && U(
        c,
        /*row*/
        e[47]?.teamId ?? ""
      ), E[0] & /*rows, teamOptions*/
      576 && C !== (C = /*row*/
      e[47]?.id) && a(b, "data-line-id", C), E[0] & /*rows, teamOptions*/
      576 && L !== (L = /*row*/
      e[47]?.line ?? "") && b.value !== L && (b.value = L), E[0] & /*shiftOptions*/
      256) {
        ee = ie(
          /*shiftOptions*/
          e[8]
        );
        let f;
        for (f = 0; f < ee.length; f += 1) {
          const de = It(e, ee, f);
          Y[f] ? Y[f].p(de, E) : (Y[f] = Ut(de), Y[f].c(), Y[f].m(I, null));
        }
        for (; f < Y.length; f += 1)
          Y[f].d(1);
        Y.length = ee.length;
      }
      if (E[0] & /*rows, teamOptions*/
      576 && d !== (d = /*row*/
      e[47]?.id) && a(I, "data-line-id", d), E[0] & /*rows, teamOptions*/
      576 && v !== (v = /*row*/
      e[47]?.shiftId ?? "") && U(
        I,
        /*row*/
        e[47]?.shiftId ?? ""
      ), E[0] & /*rows, teamOptions*/
      576 && K !== (K = /*row*/
      e[47]?.id) && a(B, "data-line-id", K), E[0] & /*rows, teamOptions*/
      576 && w !== (w = /*row*/
      e[47]?.start ?? "") && B.value !== w && (B.value = w), E[0] & /*rows, teamOptions*/
      576 && Se !== (Se = /*row*/
      e[47]?.id) && a(P, "data-line-id", Se), E[0] & /*rows, teamOptions*/
      576 && z !== (z = /*row*/
      e[47]?.end ?? "") && P.value !== z && (P.value = z), E[0] & /*BASE_POSITIONS, rows*/
      2112) {
        j = ie(Jt(
          /*BASE_POSITIONS*/
          e[11],
          /*row*/
          e[47]?.position
        ));
        let f;
        for (f = 0; f < j.length; f += 1) {
          const de = Vt(e, j, f);
          q[f] ? q[f].p(de, E) : (q[f] = Ht(de), q[f].c(), q[f].m(J, null));
        }
        for (; f < q.length; f += 1)
          q[f].d(1);
        q.length = j.length;
      }
      if (E[0] & /*rows, teamOptions*/
      576 && ve !== (ve = /*row*/
      e[47]?.id) && a(J, "data-line-id", ve), E[0] & /*rows, teamOptions*/
      576 && ze !== (ze = /*row*/
      e[47]?.position ?? "") && U(
        J,
        /*row*/
        e[47]?.position ?? ""
      ), E[0] & /*BASE_EMPS*/
      4096) {
        ce = ie(
          /*BASE_EMPS*/
          e[12]
        );
        let f;
        for (f = 0; f < ce.length; f += 1) {
          const de = Et(e, ce, f);
          Z[f] ? Z[f].p(de, E) : (Z[f] = jt(de), Z[f].c(), Z[f].m(X, null));
        }
        for (; f < Z.length; f += 1)
          Z[f].d(1);
        Z.length = ce.length;
      }
      if (E[0] & /*rows, teamOptions*/
      576 && ge !== (ge = /*row*/
      e[47]?.id) && a(X, "data-line-id", ge), E[0] & /*rows, teamOptions*/
      576 && we !== (we = /*row*/
      e[47]?.emp ?? "") && U(
        X,
        /*row*/
        e[47]?.emp ?? ""
      ), E[0] & /*rows, teamOptions*/
      576 && Oe !== (Oe = /*row*/
      e[47]?.id) && a(H, "data-line-id", Oe), E[0] & /*rows, teamOptions*/
      576 && Ae !== (Ae = /*row*/
      e[47]?.sex ?? "") && U(
        H,
        /*row*/
        e[47]?.sex ?? ""
      ), E[0] & /*rows, teamOptions*/
      576 && De !== (De = /*row*/
      e[47]?.id) && a(A, "data-line-id", De), E[0] & /*rows, teamOptions*/
      576 && _t !== (_t = /*row*/
      e[47]?.function ?? "") && U(
        A,
        /*row*/
        e[47]?.function ?? ""
      ), E[0] & /*rows, teamOptions*/
      576 && Ee !== (Ee = /*row*/
      e[47]?.id) && a($, "data-line-id", Ee), E[0] & /*rows, teamOptions*/
      576 && ht !== (ht = /*row*/
      e[47]?.certPool ?? "") && U(
        $,
        /*row*/
        e[47]?.certPool ?? ""
      ), E[0] & /*rows*/
      64 && Ve !== (Ve = /*row*/
      (e[47]?.rdos ?? "—") + "") && Xe(at, Ve), E[0] & /*rows*/
      64 && Ie !== (Ie = /*row*/
      (e[47]?.paid ?? "") + "") && Xe(rt, Ie), E[0] & /*rows, dayStyle, emitDay*/
      41024) {
        Ge = ie([0, 1, 2, 3, 4, 5, 6]);
        let f;
        for (f = 0; f < 7; f += 1) {
          const de = Bt(e, Ge, f);
          Re[f] ? Re[f].p(de, E) : (Re[f] = qt(de), Re[f].c(), Re[f].m(n, st));
        }
        for (; f < 7; f += 1)
          Re[f].d(1);
      }
      E[0] & /*rows*/
      64 && nt !== (nt = /*row*/
      (e[47]?.hours ?? "") + "") && Xe(Ke, nt), E[0] & /*rows, teamOptions*/
      576 && Me !== (Me = /*row*/
      e[47]?.id) && a(n, "data-line-row", Me);
    },
    d(g) {
      g && ue(n), it(Q, g), it(Y, g), it(q, g), it(Z, g), it(Re, g), ut = !1, ot(lt);
    }
  };
}
function Fn(t) {
  let e;
  function n(l, s) {
    return (
      /*mode*/
      l[7] === "svelte" ? Rn : Cn
    );
  }
  let o = n(t), c = o(t);
  return {
    c() {
      e = r("div"), c.c(), a(e, "class", "lines-table-root svelte-10754o0"), x(e, "min-height", "min(70vh, 720px)"), x(e, "height", "min(70vh, 720px)"), x(e, "width", "100%"), x(
        e,
        "--export-rdo",
        /*exportStyle*/
        t[10]?.rdo || "#000000"
      ), x(
        e,
        "--export-bag",
        /*exportStyle*/
        t[10]?.bag || "#F4B4B4"
      ), x(
        e,
        "--export-dfo",
        /*exportStyle*/
        t[10]?.dfo || "#FFF3A8"
      ), x(
        e,
        "--export-pax",
        /*exportStyle*/
        t[10]?.pax || "#A0C4FF"
      ), x(
        e,
        "--export-header",
        /*exportStyle*/
        t[10]?.header || "#1F4E79"
      );
    },
    m(l, s) {
      _e(l, e, s), c.m(e, null);
    },
    p(l, s) {
      o === (o = n(l)) && c ? c.p(l, s) : (c.d(1), c = o(l), c && (c.c(), c.m(e, null))), s[0] & /*exportStyle*/
      1024 && x(
        e,
        "--export-rdo",
        /*exportStyle*/
        l[10]?.rdo || "#000000"
      ), s[0] & /*exportStyle*/
      1024 && x(
        e,
        "--export-bag",
        /*exportStyle*/
        l[10]?.bag || "#F4B4B4"
      ), s[0] & /*exportStyle*/
      1024 && x(
        e,
        "--export-dfo",
        /*exportStyle*/
        l[10]?.dfo || "#FFF3A8"
      ), s[0] & /*exportStyle*/
      1024 && x(
        e,
        "--export-pax",
        /*exportStyle*/
        l[10]?.pax || "#A0C4FF"
      ), s[0] & /*exportStyle*/
      1024 && x(
        e,
        "--export-header",
        /*exportStyle*/
        l[10]?.header || "#1F4E79"
      );
    },
    i: qe,
    o: qe,
    d(l) {
      l && ue(e), c.d();
    }
  };
}
function Jt(t, e) {
  const n = e == null ? "" : String(e);
  return !n || t.indexOf(n) >= 0 ? t : t.concat([n]);
}
function bt(t) {
  if (!t) return "";
  const e = t.name || t.id || "";
  return t.start && t.end ? (e ? e + " " : "") + "(" + t.start + "–" + t.end + ")" : t.start ? e ? e + " " + t.start : t.start : e;
}
function en(t) {
  const e = String(t || "").toUpperCase();
  return e === "RDO" || e === "—" || e === "-" || e === "OFF" ? "rdo" : e === "BAG" || e === "BAGS" ? "bag" : e === "DFO" ? "dfo" : e === "PAX" ? "pax" : null;
}
function Qt(t) {
  const e = en(t);
  return e === "rdo" ? "cell-toggle cell-rdo" : e === "bag" ? "cell-toggle cell-function-duty cell-bag" : e === "dfo" ? "cell-toggle cell-function-duty cell-dfo" : e === "pax" ? "cell-toggle cell-function-duty cell-pax" : "cell-toggle cell-work";
}
function An(t, e, n) {
  let { rows: o = [] } = e, { mode: c = "svelte" } = e, { shiftOptions: l = [] } = e, { teamOptions: s = [] } = e, { exportStyle: p = Lt() } = e, { onInlineEdit: _ = null } = e, { onDayToggle: u = null } = e, { onSort: b = null } = e, { onFilter: C = null } = e, { currentSortBy: L = "role" } = e, { currentSortDir: V = "asc" } = e, { filterRole: N = "ALL" } = e, { filterShift: I = "" } = e, { filterTeam: k = "" } = e, { filterSex: d = "" } = e, { filterDuty: v = "" } = e, { searchCode: m = "" } = e;
  const y = ["TSO", "LTSO", "STSO"], B = ["FT", "PT"];
  function K(h) {
    const A = en(h);
    if (!A) return;
    const pe = (p || Lt())[A];
    if (pe)
      return "background:" + pe + ";color:" + bn(pe) + ";";
  }
  function w(h, A, se) {
    _?.({ lineId: h, field: A, value: se });
  }
  function M(h, A) {
    u?.({ lineId: h, dayIndex: A });
  }
  function S(h) {
    let A = "asc";
    L === h && (A = V === "asc" ? "desc" : "asc"), b?.({ sortBy: h, sortDir: A });
  }
  function P() {
    C?.({
      filterRole: N,
      filterShift: I,
      filterTeam: k,
      filterSex: d,
      filterDuty: v,
      searchCode: m
    });
  }
  function Se(h) {
    return L !== h ? "" : V === "asc" ? " ▲" : " ▼";
  }
  function z() {
    m = this.value, n(5, m);
  }
  function ye() {
    N = pt(this), n(0, N);
  }
  function he() {
    k = pt(this), n(2, k), n(9, s);
  }
  function J() {
    I = pt(this), n(1, I), n(8, l);
  }
  function oe() {
    v = pt(this), n(4, v);
  }
  function ve() {
    d = pt(this), n(3, d);
  }
  const ze = () => S("team"), Fe = () => S("line"), Te = () => S("shift"), X = () => S("start"), ae = () => S("role"), ge = (h, A) => w(h?.id, "team", A.target.value), we = (h, A) => w(h?.id, "lineCode", A.target.value), We = (h, A) => w(h?.id, "shift", A.target.value), re = (h, A) => w(h?.id, "start", A.target.value), H = (h, A) => w(h?.id, "end", A.target.value), me = (h, A) => w(h?.id, "position", A.target.value), F = (h, A) => w(h?.id, "emp", A.target.value), fe = (h, A) => w(h?.id, "sex", A.target.value), Oe = (h, A) => w(h?.id, "function", A.target.value), Ae = (h, A) => w(h?.id, "certPool", A.target.value), Je = (h, A) => M(h?.id, A);
  return t.$$set = (h) => {
    "rows" in h && n(6, o = h.rows), "mode" in h && n(7, c = h.mode), "shiftOptions" in h && n(8, l = h.shiftOptions), "teamOptions" in h && n(9, s = h.teamOptions), "exportStyle" in h && n(10, p = h.exportStyle), "onInlineEdit" in h && n(19, _ = h.onInlineEdit), "onDayToggle" in h && n(20, u = h.onDayToggle), "onSort" in h && n(21, b = h.onSort), "onFilter" in h && n(22, C = h.onFilter), "currentSortBy" in h && n(23, L = h.currentSortBy), "currentSortDir" in h && n(24, V = h.currentSortDir), "filterRole" in h && n(0, N = h.filterRole), "filterShift" in h && n(1, I = h.filterShift), "filterTeam" in h && n(2, k = h.filterTeam), "filterSex" in h && n(3, d = h.filterSex), "filterDuty" in h && n(4, v = h.filterDuty), "searchCode" in h && n(5, m = h.searchCode);
  }, [
    N,
    I,
    k,
    d,
    v,
    m,
    o,
    c,
    l,
    s,
    p,
    y,
    B,
    K,
    w,
    M,
    S,
    P,
    Se,
    _,
    u,
    b,
    C,
    L,
    V,
    z,
    ye,
    he,
    J,
    oe,
    ve,
    ze,
    Fe,
    Te,
    X,
    ae,
    ge,
    we,
    We,
    re,
    H,
    me,
    F,
    fe,
    Oe,
    Ae,
    Je
  ];
}
class Dn extends mn {
  constructor(e) {
    super(), pn(
      this,
      e,
      An,
      Fn,
      ln,
      {
        rows: 6,
        mode: 7,
        shiftOptions: 8,
        teamOptions: 9,
        exportStyle: 10,
        onInlineEdit: 19,
        onDayToggle: 20,
        onSort: 21,
        onFilter: 22,
        currentSortBy: 23,
        currentSortDir: 24,
        filterRole: 0,
        filterShift: 1,
        filterTeam: 2,
        filterSex: 3,
        filterDuty: 4,
        searchCode: 5
      },
      null,
      [-1, -1, -1]
    );
  }
}
function Sn(t) {
  if (t = t || window.Scheduler, !t) return;
  function e(l) {
    var s = String(l || "").trim();
    if (!s) return "";
    var p = s.match(/^(\d+)$/);
    return p && Number(p[1]) < 10 ? "0" + p[1] : s;
  }
  function n(l, s) {
    var p = (l.rdoDays || []).map(Number).filter(function(u) {
      return Number.isInteger(u) && u >= 0 && u <= 6;
    }), _ = p.length ? p.map(function(u) {
      return s && s[u] != null ? s[u] : String(u);
    }).join(",") : "—";
    return l.rdoHard && (_ += " (hard)"), _;
  }
  function o(l, s, p) {
    return p || "WORK";
  }
  function c(l, s) {
    return s === "BAG" || s === "PAX" ? s : l.function === "BAG" ? "BAG" : l.function === "DFO" || l.function === "PAX" ? "PAX" : s === "BAG" || s === "PAX" ? s : null;
  }
  t.lineToRowModel = function(l, s, p) {
    if (p = p || {}, !l || !s) return null;
    for (var _ = p.dayNames || ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], u = typeof p.teamResolver == "function" ? p.teamResolver(l.id) : null, b = typeof p.shiftResolver == "function" ? p.shiftResolver(l.shiftId) : null, C = l.shiftName || b && b.name || "", L = b && b.start ? b.start : "", V = b && b.end ? b.end : "", N = l.shiftLabel || (L && V ? L + "–" + V : L || "WORK"), I = !!(l.isExtra || l.extraPositionId), k = I ? l.position || l.extraName || "TSO" : l.isStso || l.empClass === "STSO" ? "STSO" : l.isLtso || l.empClass === "LTSO" ? "LTSO" : "TSO", d = I ? l.empClass === "PT" ? "PT" : "FT" : k === "STSO" || k === "LTSO" ? "FT" : l.empClass === "PT" ? "PT" : "FT", v = l.paid || 0, m = Array.isArray(s) ? s : s[l.id] || s[String(l.id)] || [], y = [], B = [], K = 0, w = 0; w < 7; w++) {
      var M = m[w];
      if (M === "WORK") {
        K += v;
        var S = typeof p.rotationDutyResolver == "function" ? p.rotationDutyResolver(l.id, w) : null, P = o(l, S, N);
        y.push(P), B.push(c(l, S));
      } else
        y.push("RDO"), B.push("RDO");
    }
    return {
      id: l.id,
      teamId: u && u.id || "",
      shiftId: l.shiftId || "",
      team: e(u && (u.name || u.id) || ""),
      line: l.lineCode || "",
      shift: C,
      start: L,
      end: V,
      position: k,
      emp: d,
      sex: l.sex === "F" || l.sex === "M" ? l.sex : "",
      function: l.function || "",
      certPool: l.certPool || "",
      rdos: n(l, _),
      paid: v,
      days: y,
      dayDuties: B,
      hours: K
    };
  }, t.getRowModels = function(l, s, p) {
    return !Array.isArray(l) || !s || typeof s != "object" ? [] : l.map(function(_) {
      return t.lineToRowModel(_, s, p);
    }).filter(Boolean);
  }, t.getLineRowModels = function(l) {
    var s = t.state && Array.isArray(t.state.lines) ? t.state.lines : [], p = t.state && t.state.schedule || {}, _ = Object.assign({}, l || {});
    return !_.teamResolver && typeof t.teamMetaForLine == "function" && (_.teamResolver = t.teamMetaForLine), !_.shiftResolver && typeof t.getShift == "function" && (_.shiftResolver = t.getShift), !_.rotationDutyResolver && typeof t.getRotationDuty == "function" && (_.rotationDutyResolver = t.getRotationDuty), t.getRowModels(s, p, _);
  };
}
function Tn(t) {
  if (t = t || window.Scheduler, !t) return;
  function e(p, _) {
    var u = t.getRotationDuty ? t.getRotationDuty(p.id, _) : null;
    return u || p.function || null;
  }
  t.dutyFor = e;
  function n(p) {
    if (p.shiftLabel) return p.shiftLabel;
    var _ = t.getShift ? t.getShift(p.shiftId) : null;
    return _ && _.start && _.end ? _.start + "–" + _.end : _ && _.start ? _.start : "WORK";
  }
  function o(p) {
    if (!(!p || p.function !== "BAG")) {
      t.state.functionRotation || (t.state.functionRotation = {});
      var _ = String(p.id);
      t.state.functionRotation[_] || (t.state.functionRotation[_] = []);
      for (var u = t.state.schedule && (t.state.schedule[p.id] || t.state.schedule[_]) || [], b = Math.max(u.length, (t.state.weekCount || 1) * 7), C = 0; C < b; C++) {
        for (; t.state.functionRotation[_].length <= C; ) t.state.functionRotation[_].push(null);
        u[C] === "WORK" && (t.state.functionRotation[_][C] = "BAG");
      }
    }
  }
  function c(p) {
    if (!(!p || p.function !== "DFO")) {
      t.state.functionRotation || (t.state.functionRotation = {});
      var _ = String(p.id);
      t.state.functionRotation[_] || (t.state.functionRotation[_] = []);
      for (var u = t.state.schedule && (t.state.schedule[p.id] || t.state.schedule[_]) || [], b = Math.max(u.length, (t.state.weekCount || 1) * 7), C = 0; C < b; C++) {
        for (; t.state.functionRotation[_].length <= C; ) t.state.functionRotation[_].push(null);
        u[C] === "WORK" && (t.state.functionRotation[_][C] = "DFO");
      }
    }
  }
  function l() {
    var p = document.getElementById("lines-tbody"), _ = p || document.querySelector(".lines-virtual-root");
    _ && p && _.querySelectorAll("td.cell-toggle").forEach(function(u) {
      var b = t.findLineById ? t.findLineById(u.getAttribute("data-line-id")) : null, C = +u.getAttribute("data-day");
      if (!(!b || isNaN(C))) {
        var L = (t.state.schedule[b.id] || t.state.schedule[String(b.id)] || [])[C] || "RDO";
        if (u.style.background = "", u.style.color = "", L !== "WORK") {
          u.className = "cell-rdo cell-toggle", u.textContent = "RDO", u.style.background = "#000", u.style.color = "#fff", u.style.opacity = "1";
          return;
        }
        var V = e(b, C), N = V === "BAG" || V === "BAGS", I = V === "DFO", k = "";
        N ? k = " cell-function-duty cell-bag" : I && (k = " cell-function-duty cell-dfo"), u.className = "cell-work cell-toggle" + k, u.textContent = n(b);
      }
    });
  }
  t.paintLineColors = l;
  function s(p) {
    var _ = t[p];
    if (!(typeof _ != "function" || _._lineColorsWrapped)) {
      var u = function() {
        if (t.__USE_SVELTE_LINES) return _.apply(this, arguments);
        var b = _.apply(this, arguments);
        return setTimeout(l, 0), b;
      };
      u._lineColorsWrapped = !0, t[p] = u;
    }
  }
  s("renderLines"), s("renderAll"), s("generateFunctionAssignments"), t._lineColorsBound || (t._lineColorsBound = !0, document.addEventListener("change", function(p) {
    var _ = p.target;
    if (!(!_ || _.getAttribute("data-field") !== "function")) {
      var u = t.findLineById ? t.findLineById(_.getAttribute("data-line-id")) : null;
      u && (u.function = _.value === "DFO" || _.value === "PAX" || _.value === "BAG" ? _.value : "", u.function === "BAG" && o(u), u.function === "DFO" && c(u), t.renderLines ? t.renderLines() : l());
    }
  }));
}
function Ln(t) {
  const e = t || window.Scheduler;
  if (!e) return;
  Sn(e), Tn(e);
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
  function o() {
    return {
      teamResolver: typeof e.teamMetaForLine == "function" ? e.teamMetaForLine : null,
      shiftResolver: typeof e.getShift == "function" ? e.getShift : null,
      rotationDutyResolver: typeof e.getRotationDuty == "function" ? e.getRotationDuty : c
    };
  }
  function c(d, v) {
    const m = String(d), y = e.state && e.state.functionRotation, B = y && (y[m] || y[d]);
    if (!Array.isArray(B)) return null;
    const K = B[v];
    return K === "BAG" ? "BAG" : K === "PAX" || K === "DFO" ? "PAX" : null;
  }
  function l(d, v, m) {
    var y = String(d);
    for (e.state.functionRotation || (e.state.functionRotation = {}), e.state.functionRotation[y] || (e.state.functionRotation[y] = []); e.state.functionRotation[y].length <= v; ) e.state.functionRotation[y].push(null);
    e.state.functionRotation[y][v] = m;
  }
  function s(d) {
    if (!d) return !1;
    if (d.function === "DFO") return !0;
    const v = d.functionEligible;
    return !!(v && (v.dfo === !0 || v.DFO === !0));
  }
  function p() {
    const d = e.state && Array.isArray(e.state.lines) ? e.state.lines : [], v = typeof e.sortLinesForView == "function" && typeof e.filterLinesForView == "function" ? e.sortLinesForView(e.filterLinesForView(d)) : d, m = e.state && e.state.schedule || {}, y = typeof e.getRowModels == "function" ? e.getRowModels(v, m, o()) : typeof e.getLineRowModels == "function" ? e.getLineRowModels(o()) : [];
    return Array.isArray(y) ? y : [];
  }
  function _() {
    return e.teams && Array.isArray(e.teams.teams) ? e.teams.teams : [];
  }
  function u() {
    return e.state && Array.isArray(e.state.shifts) ? e.state.shifts : [];
  }
  function b() {
    return typeof e.getExportStyle == "function" ? e.getExportStyle() : e.state && e.state.exportStyle || null;
  }
  function C(d) {
    if (!d || typeof d.$set != "function") return;
    const v = p();
    typeof e.applyExportCssVars == "function" && e.applyExportCssVars(), d.$set({
      rows: Array.isArray(v) ? v : [],
      shiftOptions: u(),
      teamOptions: _(),
      exportStyle: b(),
      currentSortBy: e.linesView && e.linesView.sortBy || "role",
      currentSortDir: e.linesView && e.linesView.sortDir || "asc",
      filterRole: e.linesView && e.linesView.filterRole || "ALL",
      filterShift: e.linesView && e.linesView.filterShift || "",
      filterTeam: e.linesView && e.linesView.filterTeam || "",
      filterSex: e.linesView && e.linesView.filterSex || "",
      filterDuty: e.linesView && e.linesView.filterDuty || "",
      searchCode: e.linesView && e.linesView.searchCode || ""
    });
  }
  function L(d) {
    if (!d) return;
    const v = e.findLineById ? e.findLineById(d.lineId) : null;
    if (!v) return;
    const m = d.field, y = d.value;
    if (m === "lineCode")
      v.lineCode = String(y || "").trim() || v.lineCode;
    else if (m === "sex")
      v.sex = y === "F" ? "F" : "M";
    else if (m === "function")
      v.function = y === "DFO" || y === "PAX" || y === "BAG" ? y : "";
    else if (m === "certPool") {
      var B = String(y || "").trim().toUpperCase();
      v.certPool = B === "A" || B === "B" ? B : "";
    } else if (m === "emp")
      e.applyLineEmp && e.applyLineEmp(v, y);
    else if (m === "position") {
      var K = !!(v.isExtra || v.extraPositionId), w = String(y ?? "").trim();
      K ? (w && (v.position = w, v.extraName = w), v.isStso = !1, v.isLtso = !1) : e.applyLineEmp && e.applyLineEmp(v, w);
    } else if (m === "shift")
      e.applyLineShift && e.applyLineShift(v, y);
    else if (m === "team")
      e.setLineTeam && e.setLineTeam(d.lineId, y);
    else if (m === "start" || m === "end") {
      var M = String(y || "").trim();
      if (e.isValidTimeText && !e.isValidTimeText(M)) return;
      var S = e.getShift ? e.getShift(v.shiftId) : null;
      if (!S) {
        var P = v.shiftId || "SHIFT_" + v.id;
        v.shiftId = P, e.state.shifts || (e.state.shifts = []), S = e.getShift ? e.getShift(P) : null, S || (S = { id: P, name: P, start: "08:00", end: "16:30", paid: v.paid || 8 }, e.state.shifts.push(S));
      }
      m === "start" && (S.start = M), m === "end" && (S.end = M), v.shiftLabel = (S.start || "") + "-" + (S.end || "");
    }
    e.updateStatus && e.updateStatus("Updated " + (v.lineCode || d.lineId)), k(), (m === "emp" || m === "position" || m === "shift" || m === "start" || m === "end") && e.renderCoverageBars && e.renderCoverageBars(), m === "team" && e.renderTeams && e.renderTeams(), window.dispatchEvent(new CustomEvent("lines:coverage-refresh"));
  }
  function V(d) {
    if (!d) return;
    const v = e.findLineById ? e.findLineById(d.lineId) : null, m = Number(d.dayIndex);
    if (!v || !Number.isInteger(m) || m < 0 || m > 6) return;
    const y = String(v.id);
    e.state.schedule || (e.state.schedule = {});
    var B = e.state.schedule[y] || e.state.schedule[v.id];
    for (Array.isArray(B) || (B = []), e.state.schedule[y] = B; e.state.schedule[y].length < 7; ) e.state.schedule[y].push("RDO");
    e.state.functionRotation || (e.state.functionRotation = {}), !e.state.functionRotation[y] && e.state.functionRotation[v.id] && (e.state.functionRotation[y] = e.state.functionRotation[v.id]);
    const K = e.state.schedule[y][m] || "RDO", w = v.function === "BAG", M = s(v);
    if (K !== "WORK")
      e.state.schedule[y][m] = "WORK", w ? l(y, m, "BAG") : M ? l(y, m, "PAX") : l(y, m, null);
    else if (w)
      e.state.schedule[y][m] = "RDO", l(y, m, null);
    else if (M) {
      var S = typeof e.getRotationDuty == "function" ? e.getRotationDuty(v.id, m) : c(v.id, m), P = S === "DFO" || S === "PAX" || !S ? "PAX" : S;
      P === "PAX" ? l(y, m, "BAG") : (e.state.schedule[y][m] = "RDO", l(y, m, null));
    } else
      e.state.schedule[y][m] = "RDO", l(y, m, null);
    e.syncRdoDaysFromSchedule && e.syncRdoDaysFromSchedule(v), k(), e.renderCoverageBars && e.renderCoverageBars(), window.dispatchEvent(new CustomEvent("lines:coverage-refresh"));
  }
  function N(d) {
    d && (e.linesView || (e.linesView = {}), d.sortBy && (e.linesView.sortBy = d.sortBy), d.sortDir && (e.linesView.sortDir = d.sortDir), k());
  }
  function I(d) {
    d && (e.linesView || (e.linesView = {}), d.filterRole !== void 0 && (e.linesView.filterRole = d.filterRole), d.filterShift !== void 0 && (e.linesView.filterShift = d.filterShift), d.filterTeam !== void 0 && (e.linesView.filterTeam = d.filterTeam), d.filterSex !== void 0 && (e.linesView.filterSex = d.filterSex), d.filterDuty !== void 0 && (e.linesView.filterDuty = d.filterDuty), d.searchCode !== void 0 && (e.linesView.searchCode = d.searchCode), k());
  }
  const k = () => {
    try {
      const d = n._linesTableApp;
      if (d)
        C(d);
      else {
        n.childNodes.length && (n.innerHTML = "");
        const v = p();
        typeof e.applyExportCssVars == "function" && e.applyExportCssVars(), n._linesTableApp = new Dn({
          target: n,
          props: {
            rows: Array.isArray(v) ? v : [],
            shiftOptions: u(),
            teamOptions: _(),
            exportStyle: b(),
            currentSortBy: e.linesView && e.linesView.sortBy || "role",
            currentSortDir: e.linesView && e.linesView.sortDir || "asc",
            filterRole: e.linesView && e.linesView.filterRole || "ALL",
            filterShift: e.linesView && e.linesView.filterShift || "",
            filterTeam: e.linesView && e.linesView.filterTeam || "",
            filterSex: e.linesView && e.linesView.filterSex || "",
            filterDuty: e.linesView && e.linesView.filterDuty || "",
            searchCode: e.linesView && e.linesView.searchCode || "",
            onInlineEdit: L,
            onDayToggle: V,
            onSort: N,
            onFilter: I
          }
        });
      }
    } catch (d) {
      console.error("lines-table: refresh failed", d);
    }
  };
  k(), e.bindLinesUI && e.bindLinesUI(), document.addEventListener("click", (d) => {
    const v = d.target.closest?.(".tab-btn");
    v && v.dataset.tab === "lines" && k();
  }), ["lines:request-render", "lines:filter-change", "lines:sort-change", "lines:coverage-refresh"].forEach((d) => {
    window.addEventListener(d, k);
  }), n.refresh = k;
}
export {
  Ln as initLinesTable
};
