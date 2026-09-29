var nn = Object.defineProperty;
var ln = (t, e, n) => e in t ? nn(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var Dt = (t, e, n) => ln(t, typeof e != "symbol" ? e + "" : e, n);
function Je() {
}
function Zt(t) {
  return t();
}
function Rt() {
  return /* @__PURE__ */ Object.create(null);
}
function Qe(t) {
  t.forEach(Zt);
}
function xt(t) {
  return typeof t == "function";
}
function sn(t, e) {
  return t != t ? e == e : t !== e || t && typeof t == "object" || typeof t == "function";
}
function an(t) {
  return Object.keys(t).length === 0;
}
function At(t) {
  return t ?? "";
}
function i(t, e) {
  t.appendChild(e);
}
function ce(t, e, n) {
  t.insertBefore(e, n || null);
}
function fe(t) {
  t.parentNode && t.parentNode.removeChild(t);
}
function at(t, e) {
  for (let n = 0; n < t.length; n += 1)
    t[n] && t[n].d(e);
}
function o(t) {
  return document.createElement(t);
}
function re(t) {
  return document.createTextNode(t);
}
function B() {
  return re(" ");
}
function K(t, e, n, a) {
  return t.addEventListener(e, n, a), () => t.removeEventListener(e, n, a);
}
function s(t, e, n) {
  n == null ? t.removeAttribute(e) : t.getAttribute(e) !== n && t.setAttribute(e, n);
}
function on(t) {
  return Array.from(t.childNodes);
}
function ze(t, e) {
  e = "" + e, t.data !== e && (t.data = /** @type {string} */
  e);
}
function E(t, e) {
  t.value = e ?? "";
}
function De(t, e, n, a) {
  n == null ? t.style.removeProperty(e) : t.style.setProperty(e, n, "");
}
function j(t, e, n) {
  for (let a = 0; a < t.options.length; a += 1) {
    const u = t.options[a];
    if (u.__value === e) {
      u.selected = !0;
      return;
    }
  }
  (!n || e !== void 0) && (t.selectedIndex = -1);
}
function yt(t) {
  const e = t.querySelector(":checked");
  return e && e.__value;
}
let Ct;
function pt(t) {
  Ct = t;
}
const ct = [], Tt = [];
let ht = [];
const St = [], rn = /* @__PURE__ */ Promise.resolve();
let bt = !1;
function fn() {
  bt || (bt = !0, rn.then($t));
}
function qe(t) {
  ht.push(t);
}
const Ft = /* @__PURE__ */ new Set();
let dt = 0;
function $t() {
  if (dt !== 0)
    return;
  const t = Ct;
  do {
    try {
      for (; dt < ct.length; ) {
        const e = ct[dt];
        dt++, pt(e), un(e.$$);
      }
    } catch (e) {
      throw ct.length = 0, dt = 0, e;
    }
    for (pt(null), ct.length = 0, dt = 0; Tt.length; ) Tt.pop()();
    for (let e = 0; e < ht.length; e += 1) {
      const n = ht[e];
      Ft.has(n) || (Ft.add(n), n());
    }
    ht.length = 0;
  } while (ct.length);
  for (; St.length; )
    St.pop()();
  bt = !1, Ft.clear(), pt(t);
}
function un(t) {
  if (t.fragment !== null) {
    t.update(), Qe(t.before_update);
    const e = t.dirty;
    t.dirty = [-1], t.fragment && t.fragment.p(t.ctx, e), t.after_update.forEach(qe);
  }
}
function dn(t) {
  const e = [], n = [];
  ht.forEach((a) => t.indexOf(a) === -1 ? e.push(a) : n.push(a)), n.forEach((a) => a()), ht = e;
}
const cn = /* @__PURE__ */ new Set();
function en(t, e) {
  t && t.i && (cn.delete(t), t.i(e));
}
function oe(t) {
  return t?.length !== void 0 ? t : Array.from(t);
}
function hn(t, e) {
  t.d(1), e.delete(t.key);
}
function _n(t, e, n, a, u, l, r, _, v, f, w, D) {
  let S = t.length, C = l.length, M = S;
  const R = {};
  for (; M--; ) R[t[M].key] = M;
  const V = [], P = /* @__PURE__ */ new Map(), X = /* @__PURE__ */ new Map(), g = [];
  for (M = C; M--; ) {
    const m = D(u, l, M), O = n(m);
    let A = r.get(O);
    A ? g.push(() => A.p(m, e)) : (A = f(O, m), A.c()), P.set(O, V[M] = A), O in R && X.set(O, Math.abs(M - R[O]));
  }
  const y = /* @__PURE__ */ new Set(), c = /* @__PURE__ */ new Set();
  function k(m) {
    en(m, 1), m.m(_, w), r.set(m.key, m), w = m.first, C--;
  }
  for (; S && C; ) {
    const m = V[C - 1], O = t[S - 1], A = m.key, I = O.key;
    m === O ? (w = m.first, S--, C--) : P.has(I) ? !r.has(A) || y.has(A) ? k(m) : c.has(I) ? S-- : X.get(A) > X.get(I) ? (c.add(A), k(m)) : (y.add(I), S--) : (v(O, r), S--);
  }
  for (; S--; ) {
    const m = t[S];
    P.has(m.key) || v(m, r);
  }
  for (; C; ) k(V[C - 1]);
  return Qe(g), V;
}
function vn(t, e, n) {
  const { fragment: a, after_update: u } = t.$$;
  a && a.m(e, n), qe(() => {
    const l = t.$$.on_mount.map(Zt).filter(xt);
    t.$$.on_destroy ? t.$$.on_destroy.push(...l) : Qe(l), t.$$.on_mount = [];
  }), u.forEach(qe);
}
function gn(t, e) {
  const n = t.$$;
  n.fragment !== null && (dn(n.after_update), Qe(n.on_destroy), n.fragment && n.fragment.d(e), n.on_destroy = n.fragment = null, n.ctx = []);
}
function yn(t, e) {
  t.$$.dirty[0] === -1 && (ct.push(t), fn(), t.$$.dirty.fill(0)), t.$$.dirty[e / 31 | 0] |= 1 << e % 31;
}
function pn(t, e, n, a, u, l, r = null, _ = [-1]) {
  const v = Ct;
  pt(t);
  const f = t.$$ = {
    fragment: null,
    ctx: [],
    // state
    props: l,
    update: Je,
    not_equal: u,
    bound: Rt(),
    // lifecycle
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(e.context || (v ? v.$$.context : [])),
    // everything else
    callbacks: Rt(),
    dirty: _,
    skip_bound: !1,
    root: e.target || v.$$.root
  };
  r && r(f.root);
  let w = !1;
  if (f.ctx = n ? n(t, e.props || {}, (D, S, ...C) => {
    const M = C.length ? C[0] : S;
    return f.ctx && u(f.ctx[D], f.ctx[D] = M) && (!f.skip_bound && f.bound[D] && f.bound[D](M), w && yn(t, D)), S;
  }) : [], f.update(), w = !0, Qe(f.before_update), f.fragment = a ? a(f.ctx) : !1, e.target) {
    if (e.hydrate) {
      const D = on(e.target);
      f.fragment && f.fragment.l(D), D.forEach(fe);
    } else
      f.fragment && f.fragment.c();
    e.intro && en(t.$$.fragment), vn(t, e.target, e.anchor), $t();
  }
  pt(v);
}
class kn {
  constructor() {
    /**
     * ### PRIVATE API
     *
     * Do not use, may change at any time
     *
     * @type {any}
     */
    Dt(this, "$$");
    /**
     * ### PRIVATE API
     *
     * Do not use, may change at any time
     *
     * @type {any}
     */
    Dt(this, "$$set");
  }
  /** @returns {void} */
  $destroy() {
    gn(this, 1), this.$destroy = Je;
  }
  /**
   * @template {Extract<keyof Events, string>} K
   * @param {K} type
   * @param {((e: Events[K]) => void) | null | undefined} callback
   * @returns {() => void}
   */
  $on(e, n) {
    if (!xt(n))
      return Je;
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
    this.$$set && !an(e) && (this.$$.skip_bound = !0, this.$$set(e), this.$$.skip_bound = !1);
  }
}
const mn = "4";
typeof window < "u" && (window.__svelte || (window.__svelte = { v: /* @__PURE__ */ new Set() })).v.add(mn);
function Ot() {
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
function Dn(t) {
  var e = wn(t, "#FFFFFF") || "#FFFFFF", n = e.slice(1), a = parseInt(n.slice(0, 2), 16), u = parseInt(n.slice(2, 4), 16), l = parseInt(n.slice(4, 6), 16), r = (0.299 * a + 0.587 * u + 0.114 * l) / 255;
  return r < 0.45 ? "#FFFFFF" : "#111111";
}
function Et(t, e, n) {
  const a = t.slice();
  return a[53] = e[n], a;
}
function Lt(t, e, n) {
  const a = t.slice();
  return a[56] = e[n], a;
}
function Bt(t, e, n) {
  const a = t.slice();
  return a[59] = e[n], a;
}
function It(t, e, n) {
  const a = t.slice();
  return a[62] = e[n], a;
}
function Vt(t, e, n) {
  const a = t.slice();
  return a[65] = e[n], a;
}
function Pt(t, e, n) {
  const a = t.slice();
  return a[68] = e[n], a;
}
function Mt(t, e, n) {
  const a = t.slice();
  return a[65] = e[n], a;
}
function Nt(t, e, n) {
  const a = t.slice();
  return a[68] = e[n], a;
}
function Fn(t) {
  let e;
  return {
    c() {
      e = o("div"), e.textContent = "Classic Lines mode active", s(e, "class", "muted");
    },
    m(n, a) {
      ce(n, e, a);
    },
    p: Je,
    d(n) {
      n && fe(e);
    }
  };
}
function bn(t) {
  let e, n, a, u, l, r, _, v, f, w, D, S, C, M, R, V, P, X, g, y, c, k, m, O, A, I, W, N, ge, ye, J, se, pe, Ye, Se, Be, U, ae, ke, Ae, Ke, Fe, Q, me, b, ue, Ie, Oe, Ze, be, Z, de, Ce, he, h, T, x, we, xe, te, Ee, Re, Le, Ve, _t, $e, et, Pe, ot, tt, nt, Me, rt, lt, ft, Ne, it, Ue, vt, Ge, ut, st, Xe, Y, kt, He, ne = [], $ = /* @__PURE__ */ new Map(), gt, mt, je = oe(
    /*teamOptions*/
    t[9]
  ), q = [];
  for (let F = 0; F < je.length; F += 1)
    q[F] = Gt(Nt(t, je, F));
  let z = oe(
    /*shiftOptions*/
    t[8]
  ), le = [];
  for (let F = 0; F < z.length; F += 1)
    le[F] = Xt(Mt(t, z, F));
  let _e = oe(
    /*rows*/
    t[6]
  );
  const ee = (F) => (
    /*row*/
    F[53].id
  );
  for (let F = 0; F < _e.length; F += 1) {
    let H = Et(t, _e, F), L = ee(H);
    $.set(L, ne[F] = Jt(L, H));
  }
  let ie = null;
  return _e.length || (ie = Wt()), {
    c() {
      e = o("div"), n = o("div"), a = o("label"), u = re(`Search
          `), l = o("input"), r = B(), _ = o("label"), v = re(`Role
          `), f = o("select"), w = o("option"), w.textContent = "All", D = o("option"), D.textContent = "STSO", S = o("option"), S.textContent = "LTSO", C = o("option"), C.textContent = "TSO (FT/PT)", M = B(), R = o("label"), V = re(`Team
          `), P = o("select"), X = o("option"), X.textContent = "All", g = o("option"), g.textContent = "Unassigned";
      for (let F = 0; F < q.length; F += 1)
        q[F].c();
      y = B(), c = o("label"), k = re(`Shift
          `), m = o("select"), O = o("option"), O.textContent = "All shifts";
      for (let F = 0; F < le.length; F += 1)
        le[F].c();
      A = B(), I = o("label"), W = re(`Duty
          `), N = o("select"), ge = o("option"), ge.textContent = "All duties", ye = o("option"), ye.textContent = "BAG", J = o("option"), J.textContent = "PAX", se = o("option"), se.textContent = "DFO", pe = o("option"), pe.textContent = "OFF / RDO", Ye = B(), Se = o("label"), Be = re(`Sex
          `), U = o("select"), ae = o("option"), ae.textContent = "All", ke = o("option"), ke.textContent = "M", Ae = o("option"), Ae.textContent = "F", Ke = B(), Fe = o("div"), Q = o("table"), me = o("thead"), b = o("tr"), ue = o("th"), ue.textContent = `Team${/*sortIndicator*/
      t[19]("team")}`, Ie = B(), Oe = o("th"), Oe.textContent = `Line${/*sortIndicator*/
      t[19]("line")}`, Ze = B(), be = o("th"), be.textContent = `Shift${/*sortIndicator*/
      t[19]("shift")}`, Z = B(), de = o("th"), de.textContent = `Start${/*sortIndicator*/
      t[19]("start")}`, Ce = B(), he = o("th"), he.textContent = "End", h = B(), T = o("th"), T.textContent = `Position${/*sortIndicator*/
      t[19]("role")}`, x = B(), we = o("th"), we.textContent = "Emp", xe = B(), te = o("th"), te.textContent = "Sex", Ee = B(), Re = o("th"), Re.textContent = "Duty", Le = B(), Ve = o("th"), Ve.textContent = "Cert", _t = B(), $e = o("th"), $e.textContent = "RDOs", et = B(), Pe = o("th"), Pe.textContent = "Paid", ot = B(), tt = o("th"), tt.textContent = "Sun", nt = B(), Me = o("th"), Me.textContent = "Mon", rt = B(), lt = o("th"), lt.textContent = "Tue", ft = B(), Ne = o("th"), Ne.textContent = "Wed", it = B(), Ue = o("th"), Ue.textContent = "Thu", vt = B(), Ge = o("th"), Ge.textContent = "Fri", ut = B(), st = o("th"), st.textContent = "Sat", Xe = B(), Y = o("th"), Y.textContent = "Hrs", kt = B(), He = o("tbody");
      for (let F = 0; F < ne.length; F += 1)
        ne[F].c();
      ie && ie.c(), s(l, "type", "text"), s(l, "class", "filter-input search-input svelte-1f0dkhk"), s(l, "placeholder", "Search line code..."), s(a, "class", "svelte-1f0dkhk"), w.__value = "ALL", E(w, w.__value), D.__value = "STSO", E(D, D.__value), S.__value = "LTSO", E(S, S.__value), C.__value = "TSO", E(C, C.__value), s(f, "class", "filter-select svelte-1f0dkhk"), /*filterRole*/
      t[0] === void 0 && qe(() => (
        /*select0_change_handler*/
        t[29].call(f)
      )), s(_, "class", "svelte-1f0dkhk"), X.__value = "", E(X, X.__value), g.__value = "__none__", E(g, g.__value), s(P, "class", "filter-select svelte-1f0dkhk"), /*filterTeam*/
      t[2] === void 0 && qe(() => (
        /*select1_change_handler*/
        t[30].call(P)
      )), s(R, "class", "svelte-1f0dkhk"), O.__value = "", E(O, O.__value), s(m, "class", "filter-select svelte-1f0dkhk"), /*filterShift*/
      t[1] === void 0 && qe(() => (
        /*select2_change_handler*/
        t[31].call(m)
      )), s(c, "class", "svelte-1f0dkhk"), ge.__value = "", E(ge, ge.__value), ye.__value = "BAG", E(ye, ye.__value), J.__value = "PAX", E(J, J.__value), se.__value = "DFO", E(se, se.__value), pe.__value = "OFF", E(pe, pe.__value), s(N, "class", "filter-select svelte-1f0dkhk"), /*filterDuty*/
      t[4] === void 0 && qe(() => (
        /*select3_change_handler*/
        t[32].call(N)
      )), s(I, "class", "svelte-1f0dkhk"), ae.__value = "", E(ae, ae.__value), ke.__value = "M", E(ke, ke.__value), Ae.__value = "F", E(Ae, Ae.__value), s(U, "class", "filter-select svelte-1f0dkhk"), /*filterSex*/
      t[3] === void 0 && qe(() => (
        /*select4_change_handler*/
        t[33].call(U)
      )), s(Se, "class", "svelte-1f0dkhk"), s(n, "class", "filter-controls svelte-1f0dkhk"), s(e, "class", "lines-table-header-controls svelte-1f0dkhk"), s(ue, "class", "sortable col-team svelte-1f0dkhk"), s(Oe, "class", "sortable col-line svelte-1f0dkhk"), s(be, "class", "sortable col-shift svelte-1f0dkhk"), s(de, "class", "sortable col-time svelte-1f0dkhk"), s(he, "class", "col-time svelte-1f0dkhk"), s(T, "class", "sortable col-pos svelte-1f0dkhk"), s(we, "class", "col-sm svelte-1f0dkhk"), s(te, "class", "col-sm svelte-1f0dkhk"), s(Re, "class", "col-duty svelte-1f0dkhk"), s(Ve, "class", "col-sm svelte-1f0dkhk"), s($e, "class", "col-rdos svelte-1f0dkhk"), s(Pe, "class", "col-sm svelte-1f0dkhk"), s(tt, "class", "col-day svelte-1f0dkhk"), s(Me, "class", "col-day svelte-1f0dkhk"), s(lt, "class", "col-day svelte-1f0dkhk"), s(Ne, "class", "col-day svelte-1f0dkhk"), s(Ue, "class", "col-day svelte-1f0dkhk"), s(Ge, "class", "col-day svelte-1f0dkhk"), s(st, "class", "col-day svelte-1f0dkhk"), s(Y, "class", "col-sm svelte-1f0dkhk"), s(b, "class", "svelte-1f0dkhk"), s(Q, "class", "data-table lines-editable svelte-1f0dkhk"), s(Fe, "class", "lines-virtual-root svelte-1f0dkhk");
    },
    m(F, H) {
      ce(F, e, H), i(e, n), i(n, a), i(a, u), i(a, l), E(
        l,
        /*searchCode*/
        t[5]
      ), i(n, r), i(n, _), i(_, v), i(_, f), i(f, w), i(f, D), i(f, S), i(f, C), j(
        f,
        /*filterRole*/
        t[0],
        !0
      ), i(n, M), i(n, R), i(R, V), i(R, P), i(P, X), i(P, g);
      for (let L = 0; L < q.length; L += 1)
        q[L] && q[L].m(P, null);
      j(
        P,
        /*filterTeam*/
        t[2],
        !0
      ), i(n, y), i(n, c), i(c, k), i(c, m), i(m, O);
      for (let L = 0; L < le.length; L += 1)
        le[L] && le[L].m(m, null);
      j(
        m,
        /*filterShift*/
        t[1],
        !0
      ), i(n, A), i(n, I), i(I, W), i(I, N), i(N, ge), i(N, ye), i(N, J), i(N, se), i(N, pe), j(
        N,
        /*filterDuty*/
        t[4],
        !0
      ), i(n, Ye), i(n, Se), i(Se, Be), i(Se, U), i(U, ae), i(U, ke), i(U, Ae), j(
        U,
        /*filterSex*/
        t[3],
        !0
      ), ce(F, Ke, H), ce(F, Fe, H), i(Fe, Q), i(Q, me), i(me, b), i(b, ue), i(b, Ie), i(b, Oe), i(b, Ze), i(b, be), i(b, Z), i(b, de), i(b, Ce), i(b, he), i(b, h), i(b, T), i(b, x), i(b, we), i(b, xe), i(b, te), i(b, Ee), i(b, Re), i(b, Le), i(b, Ve), i(b, _t), i(b, $e), i(b, et), i(b, Pe), i(b, ot), i(b, tt), i(b, nt), i(b, Me), i(b, rt), i(b, lt), i(b, ft), i(b, Ne), i(b, it), i(b, Ue), i(b, vt), i(b, Ge), i(b, ut), i(b, st), i(b, Xe), i(b, Y), i(Q, kt), i(Q, He);
      for (let L = 0; L < ne.length; L += 1)
        ne[L] && ne[L].m(He, null);
      ie && ie.m(He, null), gt || (mt = [
        K(
          l,
          "input",
          /*input_input_handler*/
          t[28]
        ),
        K(
          l,
          "input",
          /*handleFilterChange*/
          t[18]
        ),
        K(
          f,
          "change",
          /*select0_change_handler*/
          t[29]
        ),
        K(
          f,
          "change",
          /*handleFilterChange*/
          t[18]
        ),
        K(
          P,
          "change",
          /*select1_change_handler*/
          t[30]
        ),
        K(
          P,
          "change",
          /*handleFilterChange*/
          t[18]
        ),
        K(
          m,
          "change",
          /*select2_change_handler*/
          t[31]
        ),
        K(
          m,
          "change",
          /*handleFilterChange*/
          t[18]
        ),
        K(
          N,
          "change",
          /*select3_change_handler*/
          t[32]
        ),
        K(
          N,
          "change",
          /*handleFilterChange*/
          t[18]
        ),
        K(
          U,
          "change",
          /*select4_change_handler*/
          t[33]
        ),
        K(
          U,
          "change",
          /*handleFilterChange*/
          t[18]
        ),
        K(
          ue,
          "click",
          /*click_handler*/
          t[34]
        ),
        K(
          Oe,
          "click",
          /*click_handler_1*/
          t[35]
        ),
        K(
          be,
          "click",
          /*click_handler_2*/
          t[36]
        ),
        K(
          de,
          "click",
          /*click_handler_3*/
          t[37]
        ),
        K(
          T,
          "click",
          /*click_handler_4*/
          t[38]
        )
      ], gt = !0);
    },
    p(F, H) {
      if (H[0] & /*searchCode*/
      32 && l.value !== /*searchCode*/
      F[5] && E(
        l,
        /*searchCode*/
        F[5]
      ), H[0] & /*filterRole*/
      1 && j(
        f,
        /*filterRole*/
        F[0]
      ), H[0] & /*teamOptions*/
      512) {
        je = oe(
          /*teamOptions*/
          F[9]
        );
        let L;
        for (L = 0; L < je.length; L += 1) {
          const We = Nt(F, je, L);
          q[L] ? q[L].p(We, H) : (q[L] = Gt(We), q[L].c(), q[L].m(P, null));
        }
        for (; L < q.length; L += 1)
          q[L].d(1);
        q.length = je.length;
      }
      if (H[0] & /*filterTeam, teamOptions*/
      516 && j(
        P,
        /*filterTeam*/
        F[2]
      ), H[0] & /*shiftOptions*/
      256) {
        z = oe(
          /*shiftOptions*/
          F[8]
        );
        let L;
        for (L = 0; L < z.length; L += 1) {
          const We = Mt(F, z, L);
          le[L] ? le[L].p(We, H) : (le[L] = Xt(We), le[L].c(), le[L].m(m, null));
        }
        for (; L < le.length; L += 1)
          le[L].d(1);
        le.length = z.length;
      }
      H[0] & /*filterShift, shiftOptions*/
      258 && j(
        m,
        /*filterShift*/
        F[1]
      ), H[0] & /*filterDuty*/
      16 && j(
        N,
        /*filterDuty*/
        F[4]
      ), H[0] & /*filterSex*/
      8 && j(
        U,
        /*filterSex*/
        F[3]
      ), H[0] & /*rows, dayStyle, emitDayTime, emitDayDuty, emitEdit, BASE_EMPS, BASE_POSITIONS, shiftOptions, teamOptions*/
      129856 && (_e = oe(
        /*rows*/
        F[6]
      ), ne = _n(ne, H, ee, 1, F, _e, $, He, hn, Jt, null, Et), !_e.length && ie ? ie.p(F, H) : _e.length ? ie && (ie.d(1), ie = null) : (ie = Wt(), ie.c(), ie.m(He, null)));
    },
    d(F) {
      F && (fe(e), fe(Ke), fe(Fe)), at(q, F), at(le, F);
      for (let H = 0; H < ne.length; H += 1)
        ne[H].d();
      ie && ie.d(), gt = !1, Qe(mt);
    }
  };
}
function Gt(t) {
  let e, n = (
    /*team*/
    (t[68].name ?? /*team*/
    t[68].id) + ""
  ), a, u;
  return {
    c() {
      e = o("option"), a = re(n), e.__value = u = /*team*/
      t[68].id, E(e, e.__value);
    },
    m(l, r) {
      ce(l, e, r), i(e, a);
    },
    p(l, r) {
      r[0] & /*teamOptions*/
      512 && n !== (n = /*team*/
      (l[68].name ?? /*team*/
      l[68].id) + "") && ze(a, n), r[0] & /*teamOptions*/
      512 && u !== (u = /*team*/
      l[68].id) && (e.__value = u, E(e, e.__value));
    },
    d(l) {
      l && fe(e);
    }
  };
}
function Xt(t) {
  let e, n = wt(
    /*shift*/
    t[65]
  ) + "", a, u;
  return {
    c() {
      e = o("option"), a = re(n), e.__value = u = /*shift*/
      t[65].id, E(e, e.__value);
    },
    m(l, r) {
      ce(l, e, r), i(e, a);
    },
    p(l, r) {
      r[0] & /*shiftOptions*/
      256 && n !== (n = wt(
        /*shift*/
        l[65]
      ) + "") && ze(a, n), r[0] & /*shiftOptions*/
      256 && u !== (u = /*shift*/
      l[65].id) && (e.__value = u, E(e, e.__value));
    },
    d(l) {
      l && fe(e);
    }
  };
}
function Wt(t) {
  let e;
  return {
    c() {
      e = o("tr"), e.innerHTML = '<td colspan="20" class="muted svelte-1f0dkhk" style="padding: 1.5rem; text-align: center;">No matching lines found.</td>', s(e, "class", "svelte-1f0dkhk");
    },
    m(n, a) {
      ce(n, e, a);
    },
    p: Je,
    d(n) {
      n && fe(e);
    }
  };
}
function Kt(t) {
  let e, n = (
    /*team*/
    (t[68].name ?? /*team*/
    t[68].id) + ""
  ), a, u;
  return {
    c() {
      e = o("option"), a = re(n), e.__value = u = /*team*/
      t[68].id, E(e, e.__value), s(e, "class", "svelte-1f0dkhk");
    },
    m(l, r) {
      ce(l, e, r), i(e, a);
    },
    p(l, r) {
      r[0] & /*teamOptions*/
      512 && n !== (n = /*team*/
      (l[68].name ?? /*team*/
      l[68].id) + "") && ze(a, n), r[0] & /*teamOptions*/
      512 && u !== (u = /*team*/
      l[68].id) && (e.__value = u, E(e, e.__value));
    },
    d(l) {
      l && fe(e);
    }
  };
}
function Ut(t) {
  let e, n = wt(
    /*shift*/
    t[65]
  ) + "", a, u;
  return {
    c() {
      e = o("option"), a = re(n), e.__value = u = /*shift*/
      t[65].id, E(e, e.__value), s(e, "class", "svelte-1f0dkhk");
    },
    m(l, r) {
      ce(l, e, r), i(e, a);
    },
    p(l, r) {
      r[0] & /*shiftOptions*/
      256 && n !== (n = wt(
        /*shift*/
        l[65]
      ) + "") && ze(a, n), r[0] & /*shiftOptions*/
      256 && u !== (u = /*shift*/
      l[65].id) && (e.__value = u, E(e, e.__value));
    },
    d(l) {
      l && fe(e);
    }
  };
}
function Ht(t) {
  let e, n = (
    /*pos*/
    t[62] + ""
  ), a, u;
  return {
    c() {
      e = o("option"), a = re(n), e.__value = u = /*pos*/
      t[62], E(e, e.__value), s(e, "class", "svelte-1f0dkhk");
    },
    m(l, r) {
      ce(l, e, r), i(e, a);
    },
    p(l, r) {
      r[0] & /*rows*/
      64 && n !== (n = /*pos*/
      l[62] + "") && ze(a, n), r[0] & /*rows, teamOptions*/
      576 && u !== (u = /*pos*/
      l[62]) && (e.__value = u, E(e, e.__value));
    },
    d(l) {
      l && fe(e);
    }
  };
}
function jt(t) {
  let e, n = (
    /*emp*/
    t[59] + ""
  ), a;
  return {
    c() {
      e = o("option"), a = re(n), e.__value = /*emp*/
      t[59], E(e, e.__value), s(e, "class", "svelte-1f0dkhk");
    },
    m(u, l) {
      ce(u, e, l), i(e, a);
    },
    p: Je,
    d(u) {
      u && fe(e);
    }
  };
}
function qt(t) {
  let e, n, a, u, l, r, _, v, f, w;
  function D(...C) {
    return (
      /*change_handler_11*/
      t[50](
        /*row*/
        t[53],
        /*i*/
        t[56],
        ...C
      )
    );
  }
  function S(...C) {
    return (
      /*change_handler_12*/
      t[51](
        /*row*/
        t[53],
        /*i*/
        t[56],
        ...C
      )
    );
  }
  return {
    c() {
      e = o("div"), n = o("input"), u = B(), l = o("span"), l.textContent = "–", r = B(), _ = o("input"), s(n, "type", "time"), s(n, "class", "day-time-input svelte-1f0dkhk"), n.value = a = /*row*/
      t[53]?.dayStarts?.[
        /*i*/
        t[56]
      ] || /*row*/
      t[53]?.start || "", s(l, "class", "day-time-sep svelte-1f0dkhk"), s(_, "type", "time"), s(_, "class", "day-time-input svelte-1f0dkhk"), _.value = v = /*row*/
      t[53]?.dayEnds?.[
        /*i*/
        t[56]
      ] || /*row*/
      t[53]?.end || "", s(e, "class", "day-times-wrap svelte-1f0dkhk");
    },
    m(C, M) {
      ce(C, e, M), i(e, n), i(e, u), i(e, l), i(e, r), i(e, _), f || (w = [
        K(n, "change", D),
        K(_, "change", S)
      ], f = !0);
    },
    p(C, M) {
      t = C, M[0] & /*rows, teamOptions*/
      576 && a !== (a = /*row*/
      t[53]?.dayStarts?.[
        /*i*/
        t[56]
      ] || /*row*/
      t[53]?.start || "") && n.value !== a && (n.value = a), M[0] & /*rows, teamOptions*/
      576 && v !== (v = /*row*/
      t[53]?.dayEnds?.[
        /*i*/
        t[56]
      ] || /*row*/
      t[53]?.end || "") && _.value !== v && (_.value = v);
    },
    d(C) {
      C && fe(e), f = !1, Qe(w);
    }
  };
}
function zt(t) {
  let e, n, a, u, l, r, _, v, f, w, D, S, C;
  function M(...V) {
    return (
      /*change_handler_10*/
      t[49](
        /*row*/
        t[53],
        /*i*/
        t[56],
        ...V
      )
    );
  }
  let R = (
    /*row*/
    t[53]?.dayDuties?.[
      /*i*/
      t[56]
    ] !== "OFF" && /*row*/
    t[53]?.days?.[
      /*i*/
      t[56]
    ] !== "RDO" && qt(t)
  );
  return {
    c() {
      e = o("td"), n = o("div"), a = o("select"), u = o("option"), u.textContent = "PAX", l = o("option"), l.textContent = "BAG", r = o("option"), r.textContent = "DFO", _ = o("option"), _.textContent = "OFF", f = B(), R && R.c(), u.__value = "PAX", E(u, u.__value), s(u, "class", "svelte-1f0dkhk"), l.__value = "BAG", E(l, l.__value), s(l, "class", "svelte-1f0dkhk"), r.__value = "DFO", E(r, r.__value), s(r, "class", "svelte-1f0dkhk"), _.__value = "OFF", E(_, _.__value), s(_, "class", "svelte-1f0dkhk"), s(a, "class", "day-duty-select svelte-1f0dkhk"), s(n, "class", "day-cell-inner svelte-1f0dkhk"), s(e, "class", w = At(Yt(
        /*row*/
        t[53]?.dayDuties?.[
          /*i*/
          t[56]
        ] ?? /*row*/
        t[53]?.days?.[
          /*i*/
          t[56]
        ]
      )) + " svelte-1f0dkhk"), s(e, "style", D = /*dayStyle*/
      t[13](
        /*row*/
        t[53]?.dayDuties?.[
          /*i*/
          t[56]
        ] ?? /*row*/
        t[53]?.days?.[
          /*i*/
          t[56]
        ]
      ));
    },
    m(V, P) {
      ce(V, e, P), i(e, n), i(n, a), i(a, u), i(a, l), i(a, r), i(a, _), j(
        a,
        /*row*/
        t[53]?.dayDuties?.[
          /*i*/
          t[56]
        ] === "OFF" || /*row*/
        t[53]?.days?.[
          /*i*/
          t[56]
        ] === "RDO" ? "OFF" : (
          /*row*/
          t[53]?.dayDuties?.[
            /*i*/
            t[56]
          ] || "PAX"
        )
      ), i(n, f), R && R.m(n, null), S || (C = K(a, "change", M), S = !0);
    },
    p(V, P) {
      t = V, P[0] & /*rows, teamOptions*/
      576 && v !== (v = /*row*/
      t[53]?.dayDuties?.[
        /*i*/
        t[56]
      ] === "OFF" || /*row*/
      t[53]?.days?.[
        /*i*/
        t[56]
      ] === "RDO" ? "OFF" : (
        /*row*/
        t[53]?.dayDuties?.[
          /*i*/
          t[56]
        ] || "PAX"
      )) && j(
        a,
        /*row*/
        t[53]?.dayDuties?.[
          /*i*/
          t[56]
        ] === "OFF" || /*row*/
        t[53]?.days?.[
          /*i*/
          t[56]
        ] === "RDO" ? "OFF" : (
          /*row*/
          t[53]?.dayDuties?.[
            /*i*/
            t[56]
          ] || "PAX"
        )
      ), /*row*/
      t[53]?.dayDuties?.[
        /*i*/
        t[56]
      ] !== "OFF" && /*row*/
      t[53]?.days?.[
        /*i*/
        t[56]
      ] !== "RDO" ? R ? R.p(t, P) : (R = qt(t), R.c(), R.m(n, null)) : R && (R.d(1), R = null), P[0] & /*rows, teamOptions*/
      576 && w !== (w = At(Yt(
        /*row*/
        t[53]?.dayDuties?.[
          /*i*/
          t[56]
        ] ?? /*row*/
        t[53]?.days?.[
          /*i*/
          t[56]
        ]
      )) + " svelte-1f0dkhk") && s(e, "class", w), P[0] & /*rows, teamOptions*/
      576 && D !== (D = /*dayStyle*/
      t[13](
        /*row*/
        t[53]?.dayDuties?.[
          /*i*/
          t[56]
        ] ?? /*row*/
        t[53]?.days?.[
          /*i*/
          t[56]
        ]
      )) && s(e, "style", D);
    },
    d(V) {
      V && fe(e), R && R.d(), S = !1, C();
    }
  };
}
function Jt(t, e) {
  let n, a, u, l, r, _, v, f, w, D, S, C, M, R, V, P, X, g, y, c, k, m, O, A, I, W, N, ge, ye, J, se, pe, Ye, Se, Be, U, ae, ke, Ae, Ke, Fe, Q, me, b, ue, Ie, Oe, Ze, be, Z, de, Ce, he, h, T, x, we, xe, te, Ee, Re, Le, Ve, _t, $e, et, Pe = (
    /*row*/
    (e[53]?.rdos ?? "—") + ""
  ), ot, tt, nt, Me = (
    /*row*/
    (e[53]?.paid ?? "") + ""
  ), rt, lt, ft, Ne, it = (
    /*row*/
    (e[53]?.hours ?? "") + ""
  ), Ue, vt, Ge, ut, st, Xe = oe(
    /*teamOptions*/
    e[9]
  ), Y = [];
  for (let p = 0; p < Xe.length; p += 1)
    Y[p] = Kt(Pt(e, Xe, p));
  function kt(...p) {
    return (
      /*change_handler*/
      e[39](
        /*row*/
        e[53],
        ...p
      )
    );
  }
  function He(...p) {
    return (
      /*change_handler_1*/
      e[40](
        /*row*/
        e[53],
        ...p
      )
    );
  }
  let ne = oe(
    /*shiftOptions*/
    e[8]
  ), $ = [];
  for (let p = 0; p < ne.length; p += 1)
    $[p] = Ut(Vt(e, ne, p));
  function gt(...p) {
    return (
      /*change_handler_2*/
      e[41](
        /*row*/
        e[53],
        ...p
      )
    );
  }
  function mt(...p) {
    return (
      /*change_handler_3*/
      e[42](
        /*row*/
        e[53],
        ...p
      )
    );
  }
  function je(...p) {
    return (
      /*change_handler_4*/
      e[43](
        /*row*/
        e[53],
        ...p
      )
    );
  }
  let q = oe(Qt(
    /*BASE_POSITIONS*/
    e[11],
    /*row*/
    e[53]?.position
  )), z = [];
  for (let p = 0; p < q.length; p += 1)
    z[p] = Ht(It(e, q, p));
  function le(...p) {
    return (
      /*change_handler_5*/
      e[44](
        /*row*/
        e[53],
        ...p
      )
    );
  }
  let _e = oe(
    /*BASE_EMPS*/
    e[12]
  ), ee = [];
  for (let p = 0; p < _e.length; p += 1)
    ee[p] = jt(Bt(e, _e, p));
  function ie(...p) {
    return (
      /*change_handler_6*/
      e[45](
        /*row*/
        e[53],
        ...p
      )
    );
  }
  function F(...p) {
    return (
      /*change_handler_7*/
      e[46](
        /*row*/
        e[53],
        ...p
      )
    );
  }
  function H(...p) {
    return (
      /*change_handler_8*/
      e[47](
        /*row*/
        e[53],
        ...p
      )
    );
  }
  function L(...p) {
    return (
      /*change_handler_9*/
      e[48](
        /*row*/
        e[53],
        ...p
      )
    );
  }
  let We = oe([0, 1, 2, 3, 4, 5, 6]), Te = [];
  for (let p = 0; p < 7; p += 1)
    Te[p] = zt(Lt(e, We, p));
  return {
    key: t,
    first: null,
    c() {
      n = o("tr"), a = o("td"), u = o("select"), l = o("option"), l.textContent = "—";
      for (let p = 0; p < Y.length; p += 1)
        Y[p].c();
      v = B(), f = o("td"), w = o("input"), C = B(), M = o("td"), R = o("select"), V = o("option"), V.textContent = "—";
      for (let p = 0; p < $.length; p += 1)
        $[p].c();
      g = B(), y = o("td"), c = o("input"), O = B(), A = o("td"), I = o("input"), ge = B(), ye = o("td"), J = o("select"), se = o("option"), se.textContent = "—";
      for (let p = 0; p < z.length; p += 1)
        z[p].c();
      Se = B(), Be = o("td"), U = o("select"), ae = o("option"), ae.textContent = "—";
      for (let p = 0; p < ee.length; p += 1)
        ee[p].c();
      Ke = B(), Fe = o("td"), Q = o("select"), me = o("option"), me.textContent = "—", b = o("option"), b.textContent = "M", ue = o("option"), ue.textContent = "F", Ze = B(), be = o("td"), Z = o("select"), de = o("option"), de.textContent = "—", Ce = o("option"), Ce.textContent = "DFO", he = o("option"), he.textContent = "BAG", h = o("option"), h.textContent = "PAX", we = B(), xe = o("td"), te = o("select"), Ee = o("option"), Ee.textContent = "—", Re = o("option"), Re.textContent = "A", Le = o("option"), Le.textContent = "B", $e = B(), et = o("td"), ot = re(Pe), tt = B(), nt = o("td"), rt = re(Me), lt = B();
      for (let p = 0; p < 7; p += 1)
        Te[p].c();
      ft = B(), Ne = o("td"), Ue = re(it), vt = B(), l.__value = "", E(l, l.__value), s(l, "class", "svelte-1f0dkhk"), s(u, "class", "line-edit svelte-1f0dkhk"), s(u, "data-field", "team"), s(u, "data-line-id", r = /*row*/
      e[53]?.id), s(a, "class", "svelte-1f0dkhk"), s(w, "type", "text"), s(w, "class", "line-edit line-code-input svelte-1f0dkhk"), s(w, "data-field", "lineCode"), s(w, "data-line-id", D = /*row*/
      e[53]?.id), w.value = S = /*row*/
      e[53]?.line ?? "", s(f, "class", "svelte-1f0dkhk"), V.__value = "", E(V, V.__value), s(V, "class", "svelte-1f0dkhk"), s(R, "class", "line-edit svelte-1f0dkhk"), s(R, "data-field", "shift"), s(R, "data-line-id", P = /*row*/
      e[53]?.id), s(M, "class", "svelte-1f0dkhk"), s(c, "type", "time"), s(c, "class", "line-edit line-time-input svelte-1f0dkhk"), s(c, "data-field", "start"), s(c, "data-line-id", k = /*row*/
      e[53]?.id), c.value = m = /*row*/
      e[53]?.start ?? "", s(y, "class", "svelte-1f0dkhk"), s(I, "type", "time"), s(I, "class", "line-edit line-time-input svelte-1f0dkhk"), s(I, "data-field", "end"), s(I, "data-line-id", W = /*row*/
      e[53]?.id), I.value = N = /*row*/
      e[53]?.end ?? "", s(A, "class", "svelte-1f0dkhk"), se.__value = "", E(se, se.__value), s(se, "class", "svelte-1f0dkhk"), s(J, "class", "line-edit svelte-1f0dkhk"), s(J, "data-field", "position"), s(J, "data-line-id", pe = /*row*/
      e[53]?.id), s(ye, "class", "svelte-1f0dkhk"), ae.__value = "", E(ae, ae.__value), s(ae, "class", "svelte-1f0dkhk"), s(U, "class", "line-edit svelte-1f0dkhk"), s(U, "data-field", "emp"), s(U, "data-line-id", ke = /*row*/
      e[53]?.id), s(Be, "class", "svelte-1f0dkhk"), me.__value = "", E(me, me.__value), s(me, "class", "svelte-1f0dkhk"), b.__value = "M", E(b, b.__value), s(b, "class", "svelte-1f0dkhk"), ue.__value = "F", E(ue, ue.__value), s(ue, "class", "svelte-1f0dkhk"), s(Q, "class", "line-edit svelte-1f0dkhk"), s(Q, "data-field", "sex"), s(Q, "data-line-id", Ie = /*row*/
      e[53]?.id), s(Fe, "class", "svelte-1f0dkhk"), de.__value = "", E(de, de.__value), s(de, "class", "svelte-1f0dkhk"), Ce.__value = "DFO", E(Ce, Ce.__value), s(Ce, "class", "svelte-1f0dkhk"), he.__value = "BAG", E(he, he.__value), s(he, "class", "svelte-1f0dkhk"), h.__value = "PAX", E(h, h.__value), s(h, "class", "svelte-1f0dkhk"), s(Z, "class", "line-edit svelte-1f0dkhk"), s(Z, "data-field", "function"), s(Z, "data-line-id", T = /*row*/
      e[53]?.id), s(be, "class", "svelte-1f0dkhk"), Ee.__value = "", E(Ee, Ee.__value), s(Ee, "class", "svelte-1f0dkhk"), Re.__value = "A", E(Re, Re.__value), s(Re, "class", "svelte-1f0dkhk"), Le.__value = "B", E(Le, Le.__value), s(Le, "class", "svelte-1f0dkhk"), s(te, "class", "line-edit svelte-1f0dkhk"), s(te, "data-field", "certPool"), s(te, "data-line-id", Ve = /*row*/
      e[53]?.id), s(xe, "class", "svelte-1f0dkhk"), s(et, "class", "line-rdo-cell svelte-1f0dkhk"), s(nt, "class", "line-center svelte-1f0dkhk"), s(Ne, "class", "line-hours svelte-1f0dkhk"), s(n, "data-line-row", Ge = /*row*/
      e[53]?.id), s(n, "class", "svelte-1f0dkhk"), this.first = n;
    },
    m(p, G) {
      ce(p, n, G), i(n, a), i(a, u), i(u, l);
      for (let d = 0; d < Y.length; d += 1)
        Y[d] && Y[d].m(u, null);
      j(
        u,
        /*row*/
        e[53]?.teamId ?? ""
      ), i(n, v), i(n, f), i(f, w), i(n, C), i(n, M), i(M, R), i(R, V);
      for (let d = 0; d < $.length; d += 1)
        $[d] && $[d].m(R, null);
      j(
        R,
        /*row*/
        e[53]?.shiftId ?? ""
      ), i(n, g), i(n, y), i(y, c), i(n, O), i(n, A), i(A, I), i(n, ge), i(n, ye), i(ye, J), i(J, se);
      for (let d = 0; d < z.length; d += 1)
        z[d] && z[d].m(J, null);
      j(
        J,
        /*row*/
        e[53]?.position ?? ""
      ), i(n, Se), i(n, Be), i(Be, U), i(U, ae);
      for (let d = 0; d < ee.length; d += 1)
        ee[d] && ee[d].m(U, null);
      j(
        U,
        /*row*/
        e[53]?.emp ?? ""
      ), i(n, Ke), i(n, Fe), i(Fe, Q), i(Q, me), i(Q, b), i(Q, ue), j(
        Q,
        /*row*/
        e[53]?.sex ?? ""
      ), i(n, Ze), i(n, be), i(be, Z), i(Z, de), i(Z, Ce), i(Z, he), i(Z, h), j(
        Z,
        /*row*/
        e[53]?.function ?? ""
      ), i(n, we), i(n, xe), i(xe, te), i(te, Ee), i(te, Re), i(te, Le), j(
        te,
        /*row*/
        e[53]?.certPool ?? ""
      ), i(n, $e), i(n, et), i(et, ot), i(n, tt), i(n, nt), i(nt, rt), i(n, lt);
      for (let d = 0; d < 7; d += 1)
        Te[d] && Te[d].m(n, null);
      i(n, ft), i(n, Ne), i(Ne, Ue), i(n, vt), ut || (st = [
        K(u, "change", kt),
        K(w, "change", He),
        K(R, "change", gt),
        K(c, "change", mt),
        K(I, "change", je),
        K(J, "change", le),
        K(U, "change", ie),
        K(Q, "change", F),
        K(Z, "change", H),
        K(te, "change", L)
      ], ut = !0);
    },
    p(p, G) {
      if (e = p, G[0] & /*teamOptions*/
      512) {
        Xe = oe(
          /*teamOptions*/
          e[9]
        );
        let d;
        for (d = 0; d < Xe.length; d += 1) {
          const ve = Pt(e, Xe, d);
          Y[d] ? Y[d].p(ve, G) : (Y[d] = Kt(ve), Y[d].c(), Y[d].m(u, null));
        }
        for (; d < Y.length; d += 1)
          Y[d].d(1);
        Y.length = Xe.length;
      }
      if (G[0] & /*rows, teamOptions*/
      576 && r !== (r = /*row*/
      e[53]?.id) && s(u, "data-line-id", r), G[0] & /*rows, teamOptions*/
      576 && _ !== (_ = /*row*/
      e[53]?.teamId ?? "") && j(
        u,
        /*row*/
        e[53]?.teamId ?? ""
      ), G[0] & /*rows, teamOptions*/
      576 && D !== (D = /*row*/
      e[53]?.id) && s(w, "data-line-id", D), G[0] & /*rows, teamOptions*/
      576 && S !== (S = /*row*/
      e[53]?.line ?? "") && w.value !== S && (w.value = S), G[0] & /*shiftOptions*/
      256) {
        ne = oe(
          /*shiftOptions*/
          e[8]
        );
        let d;
        for (d = 0; d < ne.length; d += 1) {
          const ve = Vt(e, ne, d);
          $[d] ? $[d].p(ve, G) : ($[d] = Ut(ve), $[d].c(), $[d].m(R, null));
        }
        for (; d < $.length; d += 1)
          $[d].d(1);
        $.length = ne.length;
      }
      if (G[0] & /*rows, teamOptions*/
      576 && P !== (P = /*row*/
      e[53]?.id) && s(R, "data-line-id", P), G[0] & /*rows, teamOptions*/
      576 && X !== (X = /*row*/
      e[53]?.shiftId ?? "") && j(
        R,
        /*row*/
        e[53]?.shiftId ?? ""
      ), G[0] & /*rows, teamOptions*/
      576 && k !== (k = /*row*/
      e[53]?.id) && s(c, "data-line-id", k), G[0] & /*rows, teamOptions*/
      576 && m !== (m = /*row*/
      e[53]?.start ?? "") && c.value !== m && (c.value = m), G[0] & /*rows, teamOptions*/
      576 && W !== (W = /*row*/
      e[53]?.id) && s(I, "data-line-id", W), G[0] & /*rows, teamOptions*/
      576 && N !== (N = /*row*/
      e[53]?.end ?? "") && I.value !== N && (I.value = N), G[0] & /*BASE_POSITIONS, rows*/
      2112) {
        q = oe(Qt(
          /*BASE_POSITIONS*/
          e[11],
          /*row*/
          e[53]?.position
        ));
        let d;
        for (d = 0; d < q.length; d += 1) {
          const ve = It(e, q, d);
          z[d] ? z[d].p(ve, G) : (z[d] = Ht(ve), z[d].c(), z[d].m(J, null));
        }
        for (; d < z.length; d += 1)
          z[d].d(1);
        z.length = q.length;
      }
      if (G[0] & /*rows, teamOptions*/
      576 && pe !== (pe = /*row*/
      e[53]?.id) && s(J, "data-line-id", pe), G[0] & /*rows, teamOptions*/
      576 && Ye !== (Ye = /*row*/
      e[53]?.position ?? "") && j(
        J,
        /*row*/
        e[53]?.position ?? ""
      ), G[0] & /*BASE_EMPS*/
      4096) {
        _e = oe(
          /*BASE_EMPS*/
          e[12]
        );
        let d;
        for (d = 0; d < _e.length; d += 1) {
          const ve = Bt(e, _e, d);
          ee[d] ? ee[d].p(ve, G) : (ee[d] = jt(ve), ee[d].c(), ee[d].m(U, null));
        }
        for (; d < ee.length; d += 1)
          ee[d].d(1);
        ee.length = _e.length;
      }
      if (G[0] & /*rows, teamOptions*/
      576 && ke !== (ke = /*row*/
      e[53]?.id) && s(U, "data-line-id", ke), G[0] & /*rows, teamOptions*/
      576 && Ae !== (Ae = /*row*/
      e[53]?.emp ?? "") && j(
        U,
        /*row*/
        e[53]?.emp ?? ""
      ), G[0] & /*rows, teamOptions*/
      576 && Ie !== (Ie = /*row*/
      e[53]?.id) && s(Q, "data-line-id", Ie), G[0] & /*rows, teamOptions*/
      576 && Oe !== (Oe = /*row*/
      e[53]?.sex ?? "") && j(
        Q,
        /*row*/
        e[53]?.sex ?? ""
      ), G[0] & /*rows, teamOptions*/
      576 && T !== (T = /*row*/
      e[53]?.id) && s(Z, "data-line-id", T), G[0] & /*rows, teamOptions*/
      576 && x !== (x = /*row*/
      e[53]?.function ?? "") && j(
        Z,
        /*row*/
        e[53]?.function ?? ""
      ), G[0] & /*rows, teamOptions*/
      576 && Ve !== (Ve = /*row*/
      e[53]?.id) && s(te, "data-line-id", Ve), G[0] & /*rows, teamOptions*/
      576 && _t !== (_t = /*row*/
      e[53]?.certPool ?? "") && j(
        te,
        /*row*/
        e[53]?.certPool ?? ""
      ), G[0] & /*rows*/
      64 && Pe !== (Pe = /*row*/
      (e[53]?.rdos ?? "—") + "") && ze(ot, Pe), G[0] & /*rows*/
      64 && Me !== (Me = /*row*/
      (e[53]?.paid ?? "") + "") && ze(rt, Me), G[0] & /*rows, dayStyle, emitDayTime, emitDayDuty*/
      106560) {
        We = oe([0, 1, 2, 3, 4, 5, 6]);
        let d;
        for (d = 0; d < 7; d += 1) {
          const ve = Lt(e, We, d);
          Te[d] ? Te[d].p(ve, G) : (Te[d] = zt(ve), Te[d].c(), Te[d].m(n, ft));
        }
        for (; d < 7; d += 1)
          Te[d].d(1);
      }
      G[0] & /*rows*/
      64 && it !== (it = /*row*/
      (e[53]?.hours ?? "") + "") && ze(Ue, it), G[0] & /*rows, teamOptions*/
      576 && Ge !== (Ge = /*row*/
      e[53]?.id) && s(n, "data-line-row", Ge);
    },
    d(p) {
      p && fe(n), at(Y, p), at($, p), at(z, p), at(ee, p), at(Te, p), ut = !1, Qe(st);
    }
  };
}
function Cn(t) {
  let e;
  function n(l, r) {
    return (
      /*mode*/
      l[7] === "svelte" ? bn : Fn
    );
  }
  let a = n(t), u = a(t);
  return {
    c() {
      e = o("div"), u.c(), s(e, "class", "lines-table-root svelte-1f0dkhk"), De(e, "min-height", "min(70vh, 720px)"), De(e, "height", "min(70vh, 720px)"), De(e, "width", "100%"), De(
        e,
        "--export-rdo",
        /*exportStyle*/
        t[10]?.rdo || "#000000"
      ), De(
        e,
        "--export-bag",
        /*exportStyle*/
        t[10]?.bag || "#F4B4B4"
      ), De(
        e,
        "--export-dfo",
        /*exportStyle*/
        t[10]?.dfo || "#FFF3A8"
      ), De(
        e,
        "--export-pax",
        /*exportStyle*/
        t[10]?.pax || "#A0C4FF"
      ), De(
        e,
        "--export-header",
        /*exportStyle*/
        t[10]?.header || "#1F4E79"
      );
    },
    m(l, r) {
      ce(l, e, r), u.m(e, null);
    },
    p(l, r) {
      a === (a = n(l)) && u ? u.p(l, r) : (u.d(1), u = a(l), u && (u.c(), u.m(e, null))), r[0] & /*exportStyle*/
      1024 && De(
        e,
        "--export-rdo",
        /*exportStyle*/
        l[10]?.rdo || "#000000"
      ), r[0] & /*exportStyle*/
      1024 && De(
        e,
        "--export-bag",
        /*exportStyle*/
        l[10]?.bag || "#F4B4B4"
      ), r[0] & /*exportStyle*/
      1024 && De(
        e,
        "--export-dfo",
        /*exportStyle*/
        l[10]?.dfo || "#FFF3A8"
      ), r[0] & /*exportStyle*/
      1024 && De(
        e,
        "--export-pax",
        /*exportStyle*/
        l[10]?.pax || "#A0C4FF"
      ), r[0] & /*exportStyle*/
      1024 && De(
        e,
        "--export-header",
        /*exportStyle*/
        l[10]?.header || "#1F4E79"
      );
    },
    i: Je,
    o: Je,
    d(l) {
      l && fe(e), u.d();
    }
  };
}
function Qt(t, e) {
  const n = e == null ? "" : String(e);
  return !n || t.indexOf(n) >= 0 ? t : t.concat([n]);
}
function wt(t) {
  if (!t) return "";
  const e = t.name || t.id || "";
  return t.start && t.end ? (e ? e + " " : "") + "(" + t.start + "–" + t.end + ")" : t.start ? e ? e + " " + t.start : t.start : e;
}
function tn(t) {
  const e = String(t || "").toUpperCase();
  return e === "RDO" || e === "—" || e === "-" || e === "OFF" ? "rdo" : e === "BAG" || e === "BAGS" ? "bag" : e === "DFO" ? "dfo" : e === "PAX" ? "pax" : null;
}
function Yt(t) {
  const e = tn(t);
  return e === "rdo" ? "cell-day-col cell-rdo" : e === "bag" ? "cell-day-col cell-function-duty cell-bag" : e === "dfo" ? "cell-day-col cell-function-duty cell-dfo" : e === "pax" ? "cell-day-col cell-function-duty cell-pax" : "cell-day-col cell-work";
}
function Rn(t, e, n) {
  let { rows: a = [] } = e, { mode: u = "svelte" } = e, { shiftOptions: l = [] } = e, { teamOptions: r = [] } = e, { exportStyle: _ = Ot() } = e, { onInlineEdit: v = null } = e, { onDayToggle: f = null } = e, { onDayDutyEdit: w = null } = e, { onDayTimeEdit: D = null } = e, { onSort: S = null } = e, { onFilter: C = null } = e, { currentSortBy: M = "role" } = e, { currentSortDir: R = "asc" } = e, { filterRole: V = "ALL" } = e, { filterShift: P = "" } = e, { filterTeam: X = "" } = e, { filterSex: g = "" } = e, { filterDuty: y = "" } = e, { searchCode: c = "" } = e;
  const k = ["TSO", "LTSO", "STSO"], m = ["FT", "PT"];
  function O(h) {
    const T = tn(h);
    if (!T) return;
    const we = (_ || Ot())[T];
    if (we)
      return "background:" + we + ";color:" + Dn(we) + ";";
  }
  function A(h, T, x) {
    v?.({ lineId: h, field: T, value: x });
  }
  function I(h, T, x) {
    w?.({ lineId: h, dayIndex: T, duty: x });
  }
  function W(h, T, x, we) {
    D?.({ lineId: h, dayIndex: T, field: x, value: we });
  }
  function N(h) {
    let T = "asc";
    M === h && (T = R === "asc" ? "desc" : "asc"), S?.({ sortBy: h, sortDir: T });
  }
  function ge() {
    C?.({
      filterRole: V,
      filterShift: P,
      filterTeam: X,
      filterSex: g,
      filterDuty: y,
      searchCode: c
    });
  }
  function ye(h) {
    return M !== h ? "" : R === "asc" ? " ▲" : " ▼";
  }
  function J() {
    c = this.value, n(5, c);
  }
  function se() {
    V = yt(this), n(0, V);
  }
  function pe() {
    X = yt(this), n(2, X), n(9, r);
  }
  function Ye() {
    P = yt(this), n(1, P), n(8, l);
  }
  function Se() {
    y = yt(this), n(4, y);
  }
  function Be() {
    g = yt(this), n(3, g);
  }
  const U = () => N("team"), ae = () => N("line"), ke = () => N("shift"), Ae = () => N("start"), Ke = () => N("role"), Fe = (h, T) => A(h?.id, "team", T.target.value), Q = (h, T) => A(h?.id, "lineCode", T.target.value), me = (h, T) => A(h?.id, "shift", T.target.value), b = (h, T) => A(h?.id, "start", T.target.value), ue = (h, T) => A(h?.id, "end", T.target.value), Ie = (h, T) => A(h?.id, "position", T.target.value), Oe = (h, T) => A(h?.id, "emp", T.target.value), Ze = (h, T) => A(h?.id, "sex", T.target.value), be = (h, T) => A(h?.id, "function", T.target.value), Z = (h, T) => A(h?.id, "certPool", T.target.value), de = (h, T, x) => I(h?.id, T, x.target.value), Ce = (h, T, x) => W(h?.id, T, "start", x.target.value), he = (h, T, x) => W(h?.id, T, "end", x.target.value);
  return t.$$set = (h) => {
    "rows" in h && n(6, a = h.rows), "mode" in h && n(7, u = h.mode), "shiftOptions" in h && n(8, l = h.shiftOptions), "teamOptions" in h && n(9, r = h.teamOptions), "exportStyle" in h && n(10, _ = h.exportStyle), "onInlineEdit" in h && n(20, v = h.onInlineEdit), "onDayToggle" in h && n(21, f = h.onDayToggle), "onDayDutyEdit" in h && n(22, w = h.onDayDutyEdit), "onDayTimeEdit" in h && n(23, D = h.onDayTimeEdit), "onSort" in h && n(24, S = h.onSort), "onFilter" in h && n(25, C = h.onFilter), "currentSortBy" in h && n(26, M = h.currentSortBy), "currentSortDir" in h && n(27, R = h.currentSortDir), "filterRole" in h && n(0, V = h.filterRole), "filterShift" in h && n(1, P = h.filterShift), "filterTeam" in h && n(2, X = h.filterTeam), "filterSex" in h && n(3, g = h.filterSex), "filterDuty" in h && n(4, y = h.filterDuty), "searchCode" in h && n(5, c = h.searchCode);
  }, [
    V,
    P,
    X,
    g,
    y,
    c,
    a,
    u,
    l,
    r,
    _,
    k,
    m,
    O,
    A,
    I,
    W,
    N,
    ge,
    ye,
    v,
    f,
    w,
    D,
    S,
    C,
    M,
    R,
    J,
    se,
    pe,
    Ye,
    Se,
    Be,
    U,
    ae,
    ke,
    Ae,
    Ke,
    Fe,
    Q,
    me,
    b,
    ue,
    Ie,
    Oe,
    Ze,
    be,
    Z,
    de,
    Ce,
    he
  ];
}
class An extends kn {
  constructor(e) {
    super(), pn(
      this,
      e,
      Rn,
      Cn,
      sn,
      {
        rows: 6,
        mode: 7,
        shiftOptions: 8,
        teamOptions: 9,
        exportStyle: 10,
        onInlineEdit: 20,
        onDayToggle: 21,
        onDayDutyEdit: 22,
        onDayTimeEdit: 23,
        onSort: 24,
        onFilter: 25,
        currentSortBy: 26,
        currentSortDir: 27,
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
function Tn(t) {
  if (t = t || window.Scheduler, !t) return;
  function e(l) {
    var r = String(l || "").trim();
    if (!r) return "";
    var _ = r.match(/^(\d+)$/);
    return _ && Number(_[1]) < 10 ? "0" + _[1] : r;
  }
  function n(l, r) {
    var _ = (l.rdoDays || []).map(Number).filter(function(f) {
      return Number.isInteger(f) && f >= 0 && f <= 6;
    }), v = _.length ? _.map(function(f) {
      return r && r[f] != null ? r[f] : String(f);
    }).join(",") : "—";
    return l.rdoHard && (v += " (hard)"), v;
  }
  function a(l, r, _) {
    return _ || "WORK";
  }
  function u(l, r) {
    return r === "BAG" || r === "PAX" ? r : l.function === "BAG" ? "BAG" : l.function === "DFO" || l.function === "PAX" ? "PAX" : r === "BAG" || r === "PAX" ? r : null;
  }
  t.lineToRowModel = function(l, r, _) {
    if (_ = _ || {}, !l || !r) return null;
    for (var v = _.dayNames || ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], f = typeof _.teamResolver == "function" ? _.teamResolver(l.id) : null, w = typeof _.shiftResolver == "function" ? _.shiftResolver(l.shiftId) : null, D = l.shiftName || w && w.name || "", S = w && w.start ? w.start : "", C = w && w.end ? w.end : "", M = l.shiftLabel || (S && C ? S + "–" + C : S || "WORK"), R = !!(l.isExtra || l.extraPositionId), V = R ? l.position || l.extraName || "TSO" : l.isStso || l.empClass === "STSO" ? "STSO" : l.isLtso || l.empClass === "LTSO" ? "LTSO" : "TSO", P = R ? l.empClass === "PT" ? "PT" : "FT" : V === "STSO" || V === "LTSO" ? "FT" : l.empClass === "PT" ? "PT" : "FT", X = l.paid || 0, g = Array.isArray(r) ? r : r[l.id] || r[String(l.id)] || [], y = [], c = [], k = [], m = [], O = 0, A = 0; A < 7; A++) {
      var I = typeof _.effectiveTimesResolver == "function" ? _.effectiveTimesResolver(l.shiftId, A) : w ? { start: w.start, end: w.end } : { start: "", end: "" };
      k.push(I && I.start || S), m.push(I && I.end || C);
      var W = g[A];
      if (W === "WORK") {
        O += X;
        var N = typeof _.rotationDutyResolver == "function" ? _.rotationDutyResolver(l.id, A) : null, ge = a(l, N, M);
        y.push(ge), c.push(u(l, N) || "PAX");
      } else
        y.push("RDO"), c.push("OFF");
    }
    return {
      id: l.id,
      teamId: f && f.id || "",
      shiftId: l.shiftId || "",
      team: e(f && (f.name || f.id) || ""),
      line: l.lineCode || "",
      shift: D,
      start: S,
      end: C,
      position: V,
      emp: P,
      sex: l.sex === "F" || l.sex === "M" ? l.sex : "",
      function: l.function || "",
      certPool: l.certPool || "",
      rdos: n(l, v),
      paid: X,
      days: y,
      dayDuties: c,
      dayStarts: k,
      dayEnds: m,
      hours: O
    };
  }, t.getRowModels = function(l, r, _) {
    return !Array.isArray(l) || !r || typeof r != "object" ? [] : l.map(function(v) {
      return t.lineToRowModel(v, r, _);
    }).filter(Boolean);
  }, t.getLineRowModels = function(l) {
    var r = t.state && Array.isArray(t.state.lines) ? t.state.lines : [], _ = t.state && t.state.schedule || {}, v = Object.assign({}, l || {});
    return !v.teamResolver && typeof t.teamMetaForLine == "function" && (v.teamResolver = t.teamMetaForLine), !v.shiftResolver && typeof t.getShift == "function" && (v.shiftResolver = t.getShift), !v.rotationDutyResolver && typeof t.getRotationDuty == "function" && (v.rotationDutyResolver = t.getRotationDuty), !v.effectiveTimesResolver && typeof t.getEffectiveShiftTimes == "function" && (v.effectiveTimesResolver = t.getEffectiveShiftTimes), t.getRowModels(r, _, v);
  };
}
function Sn(t) {
  if (t = t || window.Scheduler, !t) return;
  function e(_, v) {
    var f = t.getRotationDuty ? t.getRotationDuty(_.id, v) : null;
    return f || _.function || null;
  }
  t.dutyFor = e;
  function n(_) {
    if (_.shiftLabel) return _.shiftLabel;
    var v = t.getShift ? t.getShift(_.shiftId) : null;
    return v && v.start && v.end ? v.start + "–" + v.end : v && v.start ? v.start : "WORK";
  }
  function a(_) {
    if (!(!_ || _.function !== "BAG")) {
      t.state.functionRotation || (t.state.functionRotation = {});
      var v = String(_.id);
      t.state.functionRotation[v] || (t.state.functionRotation[v] = []);
      for (var f = t.state.schedule && (t.state.schedule[_.id] || t.state.schedule[v]) || [], w = Math.max(f.length, (t.state.weekCount || 1) * 7), D = 0; D < w; D++) {
        for (; t.state.functionRotation[v].length <= D; ) t.state.functionRotation[v].push(null);
        f[D] === "WORK" && (t.state.functionRotation[v][D] = "BAG");
      }
    }
  }
  function u(_) {
    if (!(!_ || _.function !== "DFO")) {
      t.state.functionRotation || (t.state.functionRotation = {});
      var v = String(_.id);
      t.state.functionRotation[v] || (t.state.functionRotation[v] = []);
      for (var f = t.state.schedule && (t.state.schedule[_.id] || t.state.schedule[v]) || [], w = Math.max(f.length, (t.state.weekCount || 1) * 7), D = 0; D < w; D++) {
        for (; t.state.functionRotation[v].length <= D; ) t.state.functionRotation[v].push(null);
        f[D] === "WORK" && (t.state.functionRotation[v][D] = "DFO");
      }
    }
  }
  function l() {
    var _ = document.getElementById("lines-tbody"), v = _ || document.querySelector(".lines-virtual-root");
    v && _ && v.querySelectorAll("td.cell-toggle").forEach(function(f) {
      var w = t.findLineById ? t.findLineById(f.getAttribute("data-line-id")) : null, D = +f.getAttribute("data-day");
      if (!(!w || isNaN(D))) {
        var S = (t.state.schedule[w.id] || t.state.schedule[String(w.id)] || [])[D] || "RDO";
        if (f.style.background = "", f.style.color = "", S !== "WORK") {
          f.className = "cell-rdo cell-toggle", f.textContent = "RDO", f.style.background = "#000", f.style.color = "#fff", f.style.opacity = "1";
          return;
        }
        var C = e(w, D), M = C === "BAG" || C === "BAGS", R = C === "DFO", V = "";
        M ? V = " cell-function-duty cell-bag" : R && (V = " cell-function-duty cell-dfo"), f.className = "cell-work cell-toggle" + V, f.textContent = n(w);
      }
    });
  }
  t.paintLineColors = l;
  function r(_) {
    var v = t[_];
    if (!(typeof v != "function" || v._lineColorsWrapped)) {
      var f = function() {
        if (t.__USE_SVELTE_LINES) return v.apply(this, arguments);
        var w = v.apply(this, arguments);
        return setTimeout(l, 0), w;
      };
      f._lineColorsWrapped = !0, t[_] = f;
    }
  }
  r("renderLines"), r("renderAll"), r("generateFunctionAssignments"), t._lineColorsBound || (t._lineColorsBound = !0, document.addEventListener("change", function(_) {
    var v = _.target;
    if (!(!v || v.getAttribute("data-field") !== "function")) {
      var f = t.findLineById ? t.findLineById(v.getAttribute("data-line-id")) : null;
      f && (f.function = v.value === "DFO" || v.value === "PAX" || v.value === "BAG" ? v.value : "", f.function === "BAG" && a(f), f.function === "DFO" && u(f), t.renderLines ? t.renderLines() : l());
    }
  }));
}
function En(t) {
  const e = t || window.Scheduler;
  if (!e) return;
  Tn(e), Sn(e);
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
  function u(g, y) {
    const c = String(g), k = e.state && e.state.functionRotation, m = k && (k[c] || k[g]);
    if (!Array.isArray(m)) return null;
    const O = m[y];
    return O === "BAG" ? "BAG" : O === "DFO" ? "DFO" : O === "PAX" ? "PAX" : null;
  }
  function l(g, y, c) {
    var k = String(g);
    for (e.state.functionRotation || (e.state.functionRotation = {}), e.state.functionRotation[k] || (e.state.functionRotation[k] = []); e.state.functionRotation[k].length <= y; ) e.state.functionRotation[k].push(null);
    e.state.functionRotation[k][y] = c;
  }
  function r(g) {
    if (!g) return !1;
    if (g.function === "DFO") return !0;
    const y = g.functionEligible;
    return !!(y && (y.dfo === !0 || y.DFO === !0));
  }
  function _() {
    const g = e.state && Array.isArray(e.state.lines) ? e.state.lines : [], y = typeof e.sortLinesForView == "function" && typeof e.filterLinesForView == "function" ? e.sortLinesForView(e.filterLinesForView(g)) : g, c = e.state && e.state.schedule || {}, k = typeof e.getRowModels == "function" ? e.getRowModels(y, c, a()) : typeof e.getLineRowModels == "function" ? e.getLineRowModels(a()) : [];
    return Array.isArray(k) ? k : [];
  }
  function v() {
    return e.teams && Array.isArray(e.teams.teams) ? e.teams.teams : [];
  }
  function f() {
    return e.state && Array.isArray(e.state.shifts) ? e.state.shifts : [];
  }
  function w() {
    return typeof e.getExportStyle == "function" ? e.getExportStyle() : e.state && e.state.exportStyle || null;
  }
  function D(g) {
    if (!g || typeof g.$set != "function") return;
    const y = _();
    typeof e.applyExportCssVars == "function" && e.applyExportCssVars(), g.$set({
      rows: Array.isArray(y) ? y : [],
      shiftOptions: f(),
      teamOptions: v(),
      exportStyle: w(),
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
  function S(g) {
    if (!g) return;
    const y = e.findLineById ? e.findLineById(g.lineId) : null;
    if (!y) return;
    const c = g.field, k = g.value;
    if (c === "lineCode")
      y.lineCode = String(k || "").trim() || y.lineCode;
    else if (c === "sex")
      y.sex = k === "F" ? "F" : "M";
    else if (c === "function")
      y.function = k === "DFO" || k === "PAX" || k === "BAG" ? k : "";
    else if (c === "certPool") {
      var m = String(k || "").trim().toUpperCase();
      y.certPool = m === "A" || m === "B" ? m : "";
    } else if (c === "emp")
      e.applyLineEmp && e.applyLineEmp(y, k);
    else if (c === "position") {
      var O = !!(y.isExtra || y.extraPositionId), A = String(k ?? "").trim();
      O ? (A && (y.position = A, y.extraName = A), y.isStso = !1, y.isLtso = !1) : e.applyLineEmp && e.applyLineEmp(y, A);
    } else if (c === "shift")
      e.applyLineShift && e.applyLineShift(y, k);
    else if (c === "team")
      e.setLineTeam && e.setLineTeam(g.lineId, k);
    else if (c === "start" || c === "end") {
      var I = String(k || "").trim();
      if (e.isValidTimeText && !e.isValidTimeText(I)) return;
      var W = e.getShift ? e.getShift(y.shiftId) : null;
      if (!W) {
        var N = y.shiftId || "SHIFT_" + y.id;
        y.shiftId = N, e.state.shifts || (e.state.shifts = []), W = e.getShift ? e.getShift(N) : null, W || (W = { id: N, name: N, start: "08:00", end: "16:30", paid: y.paid || 8 }, e.state.shifts.push(W));
      }
      c === "start" && (W.start = I), c === "end" && (W.end = I), y.shiftLabel = (W.start || "") + "-" + (W.end || "");
    }
    e.updateStatus && e.updateStatus("Updated " + (y.lineCode || g.lineId)), X(), (c === "emp" || c === "position" || c === "shift" || c === "start" || c === "end") && e.renderCoverageBars && e.renderCoverageBars(), c === "team" && e.renderTeams && e.renderTeams(), window.dispatchEvent(new CustomEvent("lines:coverage-refresh"));
  }
  function C(g) {
    if (!g) return;
    const y = e.findLineById ? e.findLineById(g.lineId) : null, c = Number(g.dayIndex);
    if (!y || !Number.isInteger(c) || c < 0 || c > 6) return;
    const k = String(y.id);
    e.state.schedule || (e.state.schedule = {});
    var m = e.state.schedule[k] || e.state.schedule[y.id];
    for (Array.isArray(m) || (m = []), e.state.schedule[k] = m; e.state.schedule[k].length < 7; ) e.state.schedule[k].push("RDO");
    e.state.functionRotation || (e.state.functionRotation = {}), !e.state.functionRotation[k] && e.state.functionRotation[y.id] && (e.state.functionRotation[k] = e.state.functionRotation[y.id]);
    const O = e.state.schedule[k][c] || "RDO", A = y.function === "BAG", I = r(y);
    if (O !== "WORK")
      e.state.schedule[k][c] = "WORK", A ? l(k, c, "BAG") : I ? l(k, c, "PAX") : l(k, c, null);
    else if (A)
      e.state.schedule[k][c] = "RDO", l(k, c, null);
    else if (I) {
      var W = typeof e.getRotationDuty == "function" ? e.getRotationDuty(y.id, c) : u(y.id, c), N = W === "DFO" || W === "PAX" || !W ? "PAX" : W;
      N === "PAX" ? l(k, c, "BAG") : (e.state.schedule[k][c] = "RDO", l(k, c, null));
    } else
      e.state.schedule[k][c] = "RDO", l(k, c, null);
    e.syncRdoDaysFromSchedule && e.syncRdoDaysFromSchedule(y), X(), e.renderCoverageBars && e.renderCoverageBars(), window.dispatchEvent(new CustomEvent("lines:coverage-refresh"));
  }
  function M(g) {
    if (!g) return;
    const y = e.findLineById ? e.findLineById(g.lineId) : null, c = Number(g.dayIndex), k = String(g.duty || "").toUpperCase();
    if (!y || !Number.isInteger(c) || c < 0 || c > 6) return;
    const m = String(y.id);
    e.state.schedule || (e.state.schedule = {}), Array.isArray(e.state.schedule[m]) || (e.state.schedule[m] = Array(7).fill("RDO")), k === "OFF" || k === "RDO" || k === "" ? (e.state.schedule[m][c] = "RDO", l(m, c, null)) : (e.state.schedule[m][c] = "WORK", k === "BAG" ? l(m, c, "BAG") : k === "DFO" ? l(m, c, "DFO") : l(m, c, "PAX")), e.syncRdoDaysFromSchedule && e.syncRdoDaysFromSchedule(y), X(), e.renderCoverageBars && e.renderCoverageBars(), window.dispatchEvent(new CustomEvent("lines:coverage-refresh"));
  }
  function R(g) {
    if (!g) return;
    const y = e.findLineById ? e.findLineById(g.lineId) : null, c = Number(g.dayIndex), k = g.field, m = String(g.value || "").trim();
    if (!(!y || !Number.isInteger(c) || c < 0 || c > 6) && !(e.isValidTimeText && !e.isValidTimeText(m))) {
      var O = e.getShift ? e.getShift(y.shiftId) : null;
      if (!O) {
        var A = y.shiftId || "SHIFT_" + y.id;
        y.shiftId = A, e.state.shifts || (e.state.shifts = []), O = e.getShift ? e.getShift(A) : null, O || (O = { id: A, name: A, start: "08:00", end: "16:30", paid: y.paid || 8 }, e.state.shifts.push(O));
      }
      O.dayTimes || (O.dayTimes = {});
      var I = String(c), W = O.dayTimes[I] || { start: O.start || "08:00", end: O.end || "16:30" };
      k === "start" ? O.dayTimes[I] = { start: m, end: W.end } : k === "end" && (O.dayTimes[I] = { start: W.start, end: m }), X(), e.renderCoverageBars && e.renderCoverageBars(), window.dispatchEvent(new CustomEvent("lines:coverage-refresh"));
    }
  }
  function V(g) {
    g && (e.linesView || (e.linesView = {}), g.sortBy && (e.linesView.sortBy = g.sortBy), g.sortDir && (e.linesView.sortDir = g.sortDir), X());
  }
  function P(g) {
    g && (e.linesView || (e.linesView = {}), g.filterRole !== void 0 && (e.linesView.filterRole = g.filterRole), g.filterShift !== void 0 && (e.linesView.filterShift = g.filterShift), g.filterTeam !== void 0 && (e.linesView.filterTeam = g.filterTeam), g.filterSex !== void 0 && (e.linesView.filterSex = g.filterSex), g.filterDuty !== void 0 && (e.linesView.filterDuty = g.filterDuty), g.searchCode !== void 0 && (e.linesView.searchCode = g.searchCode), X());
  }
  const X = () => {
    try {
      const g = n._linesTableApp;
      if (g)
        D(g);
      else {
        n.childNodes.length && (n.innerHTML = "");
        const y = _();
        typeof e.applyExportCssVars == "function" && e.applyExportCssVars(), n._linesTableApp = new An({
          target: n,
          props: {
            rows: Array.isArray(y) ? y : [],
            shiftOptions: f(),
            teamOptions: v(),
            exportStyle: w(),
            currentSortBy: e.linesView && e.linesView.sortBy || "role",
            currentSortDir: e.linesView && e.linesView.sortDir || "asc",
            filterRole: e.linesView && e.linesView.filterRole || "ALL",
            filterShift: e.linesView && e.linesView.filterShift || "",
            filterTeam: e.linesView && e.linesView.filterTeam || "",
            filterSex: e.linesView && e.linesView.filterSex || "",
            filterDuty: e.linesView && e.linesView.filterDuty || "",
            searchCode: e.linesView && e.linesView.searchCode || "",
            onInlineEdit: S,
            onDayToggle: C,
            onDayDutyEdit: M,
            onDayTimeEdit: R,
            onSort: V,
            onFilter: P
          }
        });
      }
    } catch (g) {
      console.error("lines-table: refresh failed", g);
    }
  };
  X(), e.bindLinesUI && e.bindLinesUI(), document.addEventListener("click", (g) => {
    const y = g.target.closest?.(".tab-btn");
    y && y.dataset.tab === "lines" && X();
  }), ["lines:request-render", "lines:filter-change", "lines:sort-change", "lines:coverage-refresh"].forEach((g) => {
    window.addEventListener(g, X);
  }), n.refresh = X;
}
export {
  En as initLinesTable
};
