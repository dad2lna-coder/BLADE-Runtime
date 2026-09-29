var mn = Object.defineProperty;
var wn = (t, e, n) => e in t ? mn(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var kt = (t, e, n) => wn(t, typeof e != "symbol" ? e + "" : e, n);
function lt() {
}
function hn(t) {
  return t();
}
function Mt() {
  return /* @__PURE__ */ Object.create(null);
}
function it(t) {
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
function Gt(t) {
  return t ?? "";
}
function i(t, e) {
  t.appendChild(e);
}
function de(t, e, n) {
  t.insertBefore(e, n || null);
}
function oe(t) {
  t.parentNode && t.parentNode.removeChild(t);
}
function ct(t, e) {
  for (let n = 0; n < t.length; n += 1)
    t[n] && t[n].d(e);
}
function s(t) {
  return document.createElement(t);
}
function ce(t) {
  return document.createTextNode(t);
}
function O() {
  return ce(" ");
}
function M(t, e, n, a) {
  return t.addEventListener(e, n, a), () => t.removeEventListener(e, n, a);
}
function o(t, e, n) {
  n == null ? t.removeAttribute(e) : t.getAttribute(e) !== n && t.setAttribute(e, n);
}
function Cn(t) {
  return Array.from(t.childNodes);
}
function nt(t, e) {
  e = "" + e, t.data !== e && (t.data = /** @type {string} */
  e);
}
function C(t, e) {
  t.value = e ?? "";
}
function Q(t, e, n, a) {
  n == null ? t.style.removeProperty(e) : t.style.setProperty(e, n, "");
}
function W(t, e, n) {
  for (let a = 0; a < t.options.length; a += 1) {
    const f = t.options[a];
    if (f.__value === e) {
      f.selected = !0;
      return;
    }
  }
  (!n || e !== void 0) && (t.selectedIndex = -1);
}
function wt(t) {
  const e = t.querySelector(":checked");
  return e && e.__value;
}
let St;
function At(t) {
  St = t;
}
function bn() {
  if (!St) throw new Error("Function called outside component initialization");
  return St;
}
function Fn(t) {
  bn().$$.on_mount.push(t);
}
const Tt = [], Nt = [];
let bt = [];
const Xt = [], Rn = /* @__PURE__ */ Promise.resolve();
let xt = !1;
function An() {
  xt || (xt = !0, Rn.then(gn));
}
function Ze(t) {
  bt.push(t);
}
const Vt = /* @__PURE__ */ new Set();
let Dt = 0;
function gn() {
  if (Dt !== 0)
    return;
  const t = St;
  do {
    try {
      for (; Dt < Tt.length; ) {
        const e = Tt[Dt];
        Dt++, At(e), Sn(e.$$);
      }
    } catch (e) {
      throw Tt.length = 0, Dt = 0, e;
    }
    for (At(null), Tt.length = 0, Dt = 0; Nt.length; ) Nt.pop()();
    for (let e = 0; e < bt.length; e += 1) {
      const n = bt[e];
      Vt.has(n) || (Vt.add(n), n());
    }
    bt.length = 0;
  } while (Tt.length);
  for (; Xt.length; )
    Xt.pop()();
  xt = !1, Vt.clear(), At(t);
}
function Sn(t) {
  if (t.fragment !== null) {
    t.update(), it(t.before_update);
    const e = t.dirty;
    t.dirty = [-1], t.fragment && t.fragment.p(t.ctx, e), t.after_update.forEach(Ze);
  }
}
function On(t) {
  const e = [], n = [];
  bt.forEach((a) => t.indexOf(a) === -1 ? e.push(a) : n.push(a)), n.forEach((a) => a()), bt = e;
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
function En(t, e, n, a, f, l, r, g, _, u, D, b) {
  let S = t.length, R = l.length, N = S;
  const P = {};
  for (; N--; ) P[t[N].key] = N;
  const I = [], x = /* @__PURE__ */ new Map(), V = /* @__PURE__ */ new Map(), v = [];
  for (N = R; N--; ) {
    const w = b(f, l, N), F = n(w);
    let E = r.get(F);
    E ? v.push(() => E.p(w, e)) : (E = u(F, w), E.c()), x.set(F, I[N] = E), F in P && V.set(F, Math.abs(N - P[F]));
  }
  const p = /* @__PURE__ */ new Set(), h = /* @__PURE__ */ new Set();
  function m(w) {
    pn(w, 1), w.m(g, D), r.set(w.key, w), D = w.first, R--;
  }
  for (; S && R; ) {
    const w = I[R - 1], F = t[S - 1], E = w.key, z = F.key;
    w === F ? (D = w.first, S--, R--) : x.has(z) ? !r.has(E) || p.has(E) ? m(w) : h.has(z) ? S-- : V.get(E) > V.get(z) ? (h.add(E), m(w)) : (p.add(z), S--) : (_(F, r), S--);
  }
  for (; S--; ) {
    const w = t[S];
    x.has(w.key) || _(w, r);
  }
  for (; R; ) m(I[R - 1]);
  return it(v), I;
}
function Bn(t, e, n) {
  const { fragment: a, after_update: f } = t.$$;
  a && a.m(e, n), Ze(() => {
    const l = t.$$.on_mount.map(hn).filter(vn);
    t.$$.on_destroy ? t.$$.on_destroy.push(...l) : it(l), t.$$.on_mount = [];
  }), f.forEach(Ze);
}
function Ln(t, e) {
  const n = t.$$;
  n.fragment !== null && (On(n.after_update), it(n.on_destroy), n.fragment && n.fragment.d(e), n.on_destroy = n.fragment = null, n.ctx = []);
}
function kn(t, e) {
  t.$$.dirty[0] === -1 && (Tt.push(t), An(), t.$$.dirty.fill(0)), t.$$.dirty[e / 31 | 0] |= 1 << e % 31;
}
function Vn(t, e, n, a, f, l, r = null, g = [-1]) {
  const _ = St;
  At(t);
  const u = t.$$ = {
    fragment: null,
    ctx: [],
    // state
    props: l,
    update: lt,
    not_equal: f,
    bound: Mt(),
    // lifecycle
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(e.context || (_ ? _.$$.context : [])),
    // everything else
    callbacks: Mt(),
    dirty: g,
    skip_bound: !1,
    root: e.target || _.$$.root
  };
  r && r(u.root);
  let D = !1;
  if (u.ctx = n ? n(t, e.props || {}, (b, S, ...R) => {
    const N = R.length ? R[0] : S;
    return u.ctx && f(u.ctx[b], u.ctx[b] = N) && (!u.skip_bound && u.bound[b] && u.bound[b](N), D && kn(t, b)), S;
  }) : [], u.update(), D = !0, it(u.before_update), u.fragment = a ? a(u.ctx) : !1, e.target) {
    if (e.hydrate) {
      const b = Cn(e.target);
      u.fragment && u.fragment.l(b), b.forEach(oe);
    } else
      u.fragment && u.fragment.c();
    e.intro && pn(t.$$.fragment), Bn(t, e.target, e.anchor), gn();
  }
  At(_);
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
    Ln(this, 1), this.$destroy = lt;
  }
  /**
   * @template {Extract<keyof Events, string>} K
   * @param {K} type
   * @param {((e: Events[K]) => void) | null | undefined} callback
   * @returns {() => void}
   */
  $on(e, n) {
    if (!vn(n))
      return lt;
    const a = this.$$.callbacks[e] || (this.$$.callbacks[e] = []);
    return a.push(n), () => {
      const f = a.indexOf(n);
      f !== -1 && a.splice(f, 1);
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
const xn = "4";
typeof window < "u" && (window.__svelte || (window.__svelte = { v: /* @__PURE__ */ new Set() })).v.add(xn);
function Wt() {
  return {
    rdo: "#000000",
    bag: "#F4B4B4",
    dfo: "#FFF3A8",
    pax: "#A0C4FF",
    training: "#D8B4F8",
    header: "#1F4E79"
  };
}
function Pn(t, e) {
  if (!t) return e;
  var n = String(t).replace("#", "").trim();
  return n.length === 3 && (n = n[0] + n[0] + n[1] + n[1] + n[2] + n[2]), n.length !== 6 || /[^0-9a-fA-F]/.test(n) ? e : "#" + n.toUpperCase();
}
function Mn(t) {
  var e = Pn(t, "#FFFFFF") || "#FFFFFF", n = e.slice(1), a = parseInt(n.slice(0, 2), 16), f = parseInt(n.slice(2, 4), 16), l = parseInt(n.slice(4, 6), 16), r = (0.299 * a + 0.587 * f + 0.114 * l) / 255;
  return r < 0.45 ? "#FFFFFF" : "#111111";
}
function Ht(t, e, n) {
  const a = t.slice();
  return a[67] = e[n], a;
}
function Kt(t, e, n) {
  const a = t.slice();
  return a[70] = e[n], a;
}
function Ut(t, e, n) {
  const a = t.slice();
  return a[73] = e[n], a;
}
function jt(t, e, n) {
  const a = t.slice();
  return a[76] = e[n], a;
}
function qt(t, e, n) {
  const a = t.slice();
  return a[79] = e[n], a;
}
function Yt(t, e, n) {
  const a = t.slice();
  return a[82] = e[n], a;
}
function Jt(t, e, n) {
  const a = t.slice();
  return a[79] = e[n], a;
}
function Qt(t, e, n) {
  const a = t.slice();
  return a[82] = e[n], a;
}
function Gn(t) {
  let e;
  return {
    c() {
      e = s("div"), e.textContent = "Classic Lines mode active", o(e, "class", "muted");
    },
    m(n, a) {
      de(n, e, a);
    },
    p: lt,
    d(n) {
      n && oe(e);
    }
  };
}
function Xn(t) {
  let e, n, a, f, l, r, g, _, u, D, b, S, R, N, P, I, x, V, v, p, h, m, w, F, E, z, X, G, ne, _e, U, he, j, Ve, We, ae, se, K, ve, Ie, Te, Ee, Z, ge, pe, ye, He, Ge, ot, le, q, me, we, Be, re, Le, $e, A, Ne, fe, Ce, xe, be, Ke, Xe, at, Pe, Ue, c, B, Y, ke, et, Ft, tt, st, je, dt, qe, _t, rt, Ye, $, Ot, ht, Je, ee, zt, vt, It, Me, ie, gt, Qe, te, Et, pt, Bt, Se, ft, J = [], y = /* @__PURE__ */ new Map(), k, d, ue, yt = De(
    /*teamOptions*/
    t[9]
  ), Fe = [];
  for (let T = 0; T < yt.length; T += 1)
    Fe[T] = Zt(Qt(t, yt, T));
  let mt = De(
    /*shiftOptions*/
    t[8]
  ), Re = [];
  for (let T = 0; T < mt.length; T += 1)
    Re[T] = $t(Jt(t, mt, T));
  let Oe = (
    /*offsetY*/
    t[13] > 0 && en(t)
  ), ut = De(
    /*visibleRows*/
    t[14]
  );
  const Pt = (T) => (
    /*row*/
    T[67].id
  );
  for (let T = 0; T < ut.length; T += 1) {
    let H = Ht(t, ut, T), L = Pt(H);
    y.set(L, J[T] = fn(L, H));
  }
  let Ae = null;
  ut.length || (Ae = tn());
  let ze = (
    /*paddingBottom*/
    t[12] > 0 && un(t)
  );
  return {
    c() {
      e = s("div"), n = s("div"), a = s("label"), f = ce(`Search
          `), l = s("input"), r = O(), g = s("label"), _ = ce(`Role
          `), u = s("select"), D = s("option"), D.textContent = "All", b = s("option"), b.textContent = "STSO", S = s("option"), S.textContent = "LTSO", R = s("option"), R.textContent = "TSO (FT/PT)", N = O(), P = s("label"), I = ce(`Team
          `), x = s("select"), V = s("option"), V.textContent = "All", v = s("option"), v.textContent = "Unassigned";
      for (let T = 0; T < Fe.length; T += 1)
        Fe[T].c();
      p = O(), h = s("label"), m = ce(`Shift
          `), w = s("select"), F = s("option"), F.textContent = "All shifts";
      for (let T = 0; T < Re.length; T += 1)
        Re[T].c();
      E = O(), z = s("label"), X = ce(`Duty
          `), G = s("select"), ne = s("option"), ne.textContent = "All duties", _e = s("option"), _e.textContent = "BAG", U = s("option"), U.textContent = "PAX", he = s("option"), he.textContent = "DFO", j = s("option"), j.textContent = "TRAINING", Ve = s("option"), Ve.textContent = "OFF / RDO", We = O(), ae = s("label"), se = ce(`On Day
          `), K = s("select"), ve = s("option"), ve.textContent = "Any day", Ie = s("option"), Ie.textContent = "Sun", Te = s("option"), Te.textContent = "Mon", Ee = s("option"), Ee.textContent = "Tue", Z = s("option"), Z.textContent = "Wed", ge = s("option"), ge.textContent = "Thu", pe = s("option"), pe.textContent = "Fri", ye = s("option"), ye.textContent = "Sat", He = O(), Ge = s("label"), ot = ce(`Sex
          `), le = s("select"), q = s("option"), q.textContent = "All", me = s("option"), me.textContent = "M", we = s("option"), we.textContent = "F", Be = O(), re = s("div"), Le = s("table"), $e = s("thead"), A = s("tr"), Ne = s("th"), Ne.textContent = `Team${/*sortIndicator*/
      t[23]("team")}`, fe = O(), Ce = s("th"), Ce.textContent = `Line${/*sortIndicator*/
      t[23]("line")}`, xe = O(), be = s("th"), be.textContent = `Shift${/*sortIndicator*/
      t[23]("shift")}`, Ke = O(), Xe = s("th"), Xe.textContent = `Start${/*sortIndicator*/
      t[23]("start")}`, at = O(), Pe = s("th"), Pe.textContent = "End", Ue = O(), c = s("th"), c.textContent = `Position${/*sortIndicator*/
      t[23]("role")}`, B = O(), Y = s("th"), Y.textContent = "Emp", ke = O(), et = s("th"), et.textContent = "Sex", Ft = O(), tt = s("th"), tt.textContent = "Duty", st = O(), je = s("th"), je.textContent = "Cert", dt = O(), qe = s("th"), qe.textContent = "RDOs", _t = O(), rt = s("th"), rt.textContent = "Paid", Ye = O(), $ = s("th"), $.textContent = "Sun", Ot = O(), ht = s("th"), ht.textContent = "Mon", Je = O(), ee = s("th"), ee.textContent = "Tue", zt = O(), vt = s("th"), vt.textContent = "Wed", It = O(), Me = s("th"), Me.textContent = "Thu", ie = O(), gt = s("th"), gt.textContent = "Fri", Qe = O(), te = s("th"), te.textContent = "Sat", Et = O(), pt = s("th"), pt.textContent = "Hrs", Bt = O(), Se = s("tbody"), Oe && Oe.c(), ft = O();
      for (let T = 0; T < J.length; T += 1)
        J[T].c();
      Ae && Ae.c(), k = O(), ze && ze.c(), o(l, "type", "text"), o(l, "class", "filter-input search-input svelte-5zofx6"), o(l, "placeholder", "Search line code..."), o(a, "class", "svelte-5zofx6"), D.__value = "ALL", C(D, D.__value), b.__value = "STSO", C(b, b.__value), S.__value = "LTSO", C(S, S.__value), R.__value = "TSO", C(R, R.__value), o(u, "class", "filter-select svelte-5zofx6"), /*filterRole*/
      t[0] === void 0 && Ze(() => (
        /*select0_change_handler*/
        t[41].call(u)
      )), o(g, "class", "svelte-5zofx6"), V.__value = "", C(V, V.__value), v.__value = "__none__", C(v, v.__value), o(x, "class", "filter-select svelte-5zofx6"), /*filterTeam*/
      t[2] === void 0 && Ze(() => (
        /*select1_change_handler*/
        t[42].call(x)
      )), o(P, "class", "svelte-5zofx6"), F.__value = "", C(F, F.__value), o(w, "class", "filter-select svelte-5zofx6"), /*filterShift*/
      t[1] === void 0 && Ze(() => (
        /*select2_change_handler*/
        t[43].call(w)
      )), o(h, "class", "svelte-5zofx6"), ne.__value = "", C(ne, ne.__value), _e.__value = "BAG", C(_e, _e.__value), U.__value = "PAX", C(U, U.__value), he.__value = "DFO", C(he, he.__value), j.__value = "TRAINING", C(j, j.__value), Ve.__value = "OFF", C(Ve, Ve.__value), o(G, "class", "filter-select svelte-5zofx6"), /*filterDuty*/
      t[4] === void 0 && Ze(() => (
        /*select3_change_handler*/
        t[44].call(G)
      )), o(z, "class", "svelte-5zofx6"), ve.__value = "", C(ve, ve.__value), Ie.__value = "0", C(Ie, Ie.__value), Te.__value = "1", C(Te, Te.__value), Ee.__value = "2", C(Ee, Ee.__value), Z.__value = "3", C(Z, Z.__value), ge.__value = "4", C(ge, ge.__value), pe.__value = "5", C(pe, pe.__value), ye.__value = "6", C(ye, ye.__value), o(K, "class", "filter-select svelte-5zofx6"), /*filterDay*/
      t[5] === void 0 && Ze(() => (
        /*select4_change_handler*/
        t[45].call(K)
      )), o(ae, "class", "svelte-5zofx6"), q.__value = "", C(q, q.__value), me.__value = "M", C(me, me.__value), we.__value = "F", C(we, we.__value), o(le, "class", "filter-select svelte-5zofx6"), /*filterSex*/
      t[3] === void 0 && Ze(() => (
        /*select5_change_handler*/
        t[46].call(le)
      )), o(Ge, "class", "svelte-5zofx6"), o(n, "class", "filter-controls svelte-5zofx6"), o(e, "class", "lines-table-header-controls svelte-5zofx6"), o(Ne, "class", "sortable col-team svelte-5zofx6"), o(Ce, "class", "sortable col-line svelte-5zofx6"), o(be, "class", "sortable col-shift svelte-5zofx6"), o(Xe, "class", "sortable col-time svelte-5zofx6"), o(Pe, "class", "col-time svelte-5zofx6"), o(c, "class", "sortable col-pos svelte-5zofx6"), o(Y, "class", "col-sm svelte-5zofx6"), o(et, "class", "col-sm svelte-5zofx6"), o(tt, "class", "col-duty svelte-5zofx6"), o(je, "class", "col-sm svelte-5zofx6"), o(qe, "class", "col-rdos svelte-5zofx6"), o(rt, "class", "col-sm svelte-5zofx6"), o($, "class", "col-day svelte-5zofx6"), o(ht, "class", "col-day svelte-5zofx6"), o(ee, "class", "col-day svelte-5zofx6"), o(vt, "class", "col-day svelte-5zofx6"), o(Me, "class", "col-day svelte-5zofx6"), o(gt, "class", "col-day svelte-5zofx6"), o(te, "class", "col-day svelte-5zofx6"), o(pt, "class", "col-sm svelte-5zofx6"), o(A, "class", "svelte-5zofx6"), o(Le, "class", "data-table lines-editable svelte-5zofx6"), o(re, "class", "lines-virtual-root svelte-5zofx6");
    },
    m(T, H) {
      de(T, e, H), i(e, n), i(n, a), i(a, f), i(a, l), C(
        l,
        /*searchCode*/
        t[6]
      ), i(n, r), i(n, g), i(g, _), i(g, u), i(u, D), i(u, b), i(u, S), i(u, R), W(
        u,
        /*filterRole*/
        t[0],
        !0
      ), i(n, N), i(n, P), i(P, I), i(P, x), i(x, V), i(x, v);
      for (let L = 0; L < Fe.length; L += 1)
        Fe[L] && Fe[L].m(x, null);
      W(
        x,
        /*filterTeam*/
        t[2],
        !0
      ), i(n, p), i(n, h), i(h, m), i(h, w), i(w, F);
      for (let L = 0; L < Re.length; L += 1)
        Re[L] && Re[L].m(w, null);
      W(
        w,
        /*filterShift*/
        t[1],
        !0
      ), i(n, E), i(n, z), i(z, X), i(z, G), i(G, ne), i(G, _e), i(G, U), i(G, he), i(G, j), i(G, Ve), W(
        G,
        /*filterDuty*/
        t[4],
        !0
      ), i(n, We), i(n, ae), i(ae, se), i(ae, K), i(K, ve), i(K, Ie), i(K, Te), i(K, Ee), i(K, Z), i(K, ge), i(K, pe), i(K, ye), W(
        K,
        /*filterDay*/
        t[5],
        !0
      ), i(n, He), i(n, Ge), i(Ge, ot), i(Ge, le), i(le, q), i(le, me), i(le, we), W(
        le,
        /*filterSex*/
        t[3],
        !0
      ), de(T, Be, H), de(T, re, H), i(re, Le), i(Le, $e), i($e, A), i(A, Ne), i(A, fe), i(A, Ce), i(A, xe), i(A, be), i(A, Ke), i(A, Xe), i(A, at), i(A, Pe), i(A, Ue), i(A, c), i(A, B), i(A, Y), i(A, ke), i(A, et), i(A, Ft), i(A, tt), i(A, st), i(A, je), i(A, dt), i(A, qe), i(A, _t), i(A, rt), i(A, Ye), i(A, $), i(A, Ot), i(A, ht), i(A, Je), i(A, ee), i(A, zt), i(A, vt), i(A, It), i(A, Me), i(A, ie), i(A, gt), i(A, Qe), i(A, te), i(A, Et), i(A, pt), i(Le, Bt), i(Le, Se), Oe && Oe.m(Se, null), i(Se, ft);
      for (let L = 0; L < J.length; L += 1)
        J[L] && J[L].m(Se, null);
      Ae && Ae.m(Se, null), i(Se, k), ze && ze.m(Se, null), t[65](re), d || (ue = [
        M(
          l,
          "input",
          /*input_input_handler*/
          t[40]
        ),
        M(
          l,
          "input",
          /*handleFilterChange*/
          t[22]
        ),
        M(
          u,
          "change",
          /*select0_change_handler*/
          t[41]
        ),
        M(
          u,
          "change",
          /*handleFilterChange*/
          t[22]
        ),
        M(
          x,
          "change",
          /*select1_change_handler*/
          t[42]
        ),
        M(
          x,
          "change",
          /*handleFilterChange*/
          t[22]
        ),
        M(
          w,
          "change",
          /*select2_change_handler*/
          t[43]
        ),
        M(
          w,
          "change",
          /*handleFilterChange*/
          t[22]
        ),
        M(
          G,
          "change",
          /*select3_change_handler*/
          t[44]
        ),
        M(
          G,
          "change",
          /*handleFilterChange*/
          t[22]
        ),
        M(
          K,
          "change",
          /*select4_change_handler*/
          t[45]
        ),
        M(
          K,
          "change",
          /*handleFilterChange*/
          t[22]
        ),
        M(
          le,
          "change",
          /*select5_change_handler*/
          t[46]
        ),
        M(
          le,
          "change",
          /*handleFilterChange*/
          t[22]
        ),
        M(
          Ne,
          "click",
          /*click_handler*/
          t[47]
        ),
        M(
          Ce,
          "click",
          /*click_handler_1*/
          t[48]
        ),
        M(
          be,
          "click",
          /*click_handler_2*/
          t[49]
        ),
        M(
          Xe,
          "click",
          /*click_handler_3*/
          t[50]
        ),
        M(
          c,
          "click",
          /*click_handler_4*/
          t[51]
        ),
        M(
          re,
          "scroll",
          /*handleScroll*/
          t[24]
        )
      ], d = !0);
    },
    p(T, H) {
      if (H[0] & /*searchCode*/
      64 && l.value !== /*searchCode*/
      T[6] && C(
        l,
        /*searchCode*/
        T[6]
      ), H[0] & /*filterRole*/
      1 && W(
        u,
        /*filterRole*/
        T[0]
      ), H[0] & /*teamOptions*/
      512) {
        yt = De(
          /*teamOptions*/
          T[9]
        );
        let L;
        for (L = 0; L < yt.length; L += 1) {
          const Rt = Qt(T, yt, L);
          Fe[L] ? Fe[L].p(Rt, H) : (Fe[L] = Zt(Rt), Fe[L].c(), Fe[L].m(x, null));
        }
        for (; L < Fe.length; L += 1)
          Fe[L].d(1);
        Fe.length = yt.length;
      }
      if (H[0] & /*filterTeam, teamOptions*/
      516 && W(
        x,
        /*filterTeam*/
        T[2]
      ), H[0] & /*shiftOptions*/
      256) {
        mt = De(
          /*shiftOptions*/
          T[8]
        );
        let L;
        for (L = 0; L < mt.length; L += 1) {
          const Rt = Jt(T, mt, L);
          Re[L] ? Re[L].p(Rt, H) : (Re[L] = $t(Rt), Re[L].c(), Re[L].m(w, null));
        }
        for (; L < Re.length; L += 1)
          Re[L].d(1);
        Re.length = mt.length;
      }
      H[0] & /*filterShift, shiftOptions*/
      258 && W(
        w,
        /*filterShift*/
        T[1]
      ), H[0] & /*filterDuty*/
      16 && W(
        G,
        /*filterDuty*/
        T[4]
      ), H[0] & /*filterDay*/
      32 && W(
        K,
        /*filterDay*/
        T[5]
      ), H[0] & /*filterSex*/
      8 && W(
        le,
        /*filterSex*/
        T[3]
      ), /*offsetY*/
      T[13] > 0 ? Oe ? Oe.p(T, H) : (Oe = en(T), Oe.c(), Oe.m(Se, ft)) : Oe && (Oe.d(1), Oe = null), H[0] & /*visibleRows, dayStyle, emitDayTime, emitDayDuty, emitEdit, BASE_EMPS, BASE_POSITIONS, shiftOptions, teamOptions*/
      2081536 && (ut = De(
        /*visibleRows*/
        T[14]
      ), J = En(J, H, Pt, 1, T, ut, y, Se, In, fn, k, Ht), !ut.length && Ae ? Ae.p(T, H) : ut.length ? Ae && (Ae.d(1), Ae = null) : (Ae = tn(), Ae.c(), Ae.m(Se, k))), /*paddingBottom*/
      T[12] > 0 ? ze ? ze.p(T, H) : (ze = un(T), ze.c(), ze.m(Se, null)) : ze && (ze.d(1), ze = null);
    },
    d(T) {
      T && (oe(e), oe(Be), oe(re)), ct(Fe, T), ct(Re, T), Oe && Oe.d();
      for (let H = 0; H < J.length; H += 1)
        J[H].d();
      Ae && Ae.d(), ze && ze.d(), t[65](null), d = !1, it(ue);
    }
  };
}
function Zt(t) {
  let e, n = (
    /*team*/
    (t[82].name ?? /*team*/
    t[82].id) + ""
  ), a, f;
  return {
    c() {
      e = s("option"), a = ce(n), e.__value = f = /*team*/
      t[82].id, C(e, e.__value);
    },
    m(l, r) {
      de(l, e, r), i(e, a);
    },
    p(l, r) {
      r[0] & /*teamOptions*/
      512 && n !== (n = /*team*/
      (l[82].name ?? /*team*/
      l[82].id) + "") && nt(a, n), r[0] & /*teamOptions*/
      512 && f !== (f = /*team*/
      l[82].id) && (e.__value = f, C(e, e.__value));
    },
    d(l) {
      l && oe(e);
    }
  };
}
function $t(t) {
  let e, n = Lt(
    /*shift*/
    t[79]
  ) + "", a, f;
  return {
    c() {
      e = s("option"), a = ce(n), e.__value = f = /*shift*/
      t[79].id, C(e, e.__value);
    },
    m(l, r) {
      de(l, e, r), i(e, a);
    },
    p(l, r) {
      r[0] & /*shiftOptions*/
      256 && n !== (n = Lt(
        /*shift*/
        l[79]
      ) + "") && nt(a, n), r[0] & /*shiftOptions*/
      256 && f !== (f = /*shift*/
      l[79].id) && (e.__value = f, C(e, e.__value));
    },
    d(l) {
      l && oe(e);
    }
  };
}
function en(t) {
  let e, n;
  return {
    c() {
      e = s("tr"), n = s("td"), o(n, "colspan", "20"), Q(n, "padding", "0"), Q(n, "border", "none"), o(n, "class", "svelte-5zofx6"), Q(
        e,
        "height",
        /*offsetY*/
        t[13] + "px"
      ), o(e, "class", "svelte-5zofx6");
    },
    m(a, f) {
      de(a, e, f), i(e, n);
    },
    p(a, f) {
      f[0] & /*offsetY*/
      8192 && Q(
        e,
        "height",
        /*offsetY*/
        a[13] + "px"
      );
    },
    d(a) {
      a && oe(e);
    }
  };
}
function tn(t) {
  let e;
  return {
    c() {
      e = s("tr"), e.innerHTML = '<td colspan="20" class="muted svelte-5zofx6" style="padding: 1.5rem; text-align: center;">No matching lines found.</td>', o(e, "class", "svelte-5zofx6");
    },
    m(n, a) {
      de(n, e, a);
    },
    p: lt,
    d(n) {
      n && oe(e);
    }
  };
}
function nn(t) {
  let e, n = (
    /*team*/
    (t[82].name ?? /*team*/
    t[82].id) + ""
  ), a, f;
  return {
    c() {
      e = s("option"), a = ce(n), e.__value = f = /*team*/
      t[82].id, C(e, e.__value), o(e, "class", "svelte-5zofx6");
    },
    m(l, r) {
      de(l, e, r), i(e, a);
    },
    p(l, r) {
      r[0] & /*teamOptions*/
      512 && n !== (n = /*team*/
      (l[82].name ?? /*team*/
      l[82].id) + "") && nt(a, n), r[0] & /*teamOptions*/
      512 && f !== (f = /*team*/
      l[82].id) && (e.__value = f, C(e, e.__value));
    },
    d(l) {
      l && oe(e);
    }
  };
}
function ln(t) {
  let e, n = Lt(
    /*shift*/
    t[79]
  ) + "", a, f;
  return {
    c() {
      e = s("option"), a = ce(n), e.__value = f = /*shift*/
      t[79].id, C(e, e.__value), o(e, "class", "svelte-5zofx6");
    },
    m(l, r) {
      de(l, e, r), i(e, a);
    },
    p(l, r) {
      r[0] & /*shiftOptions*/
      256 && n !== (n = Lt(
        /*shift*/
        l[79]
      ) + "") && nt(a, n), r[0] & /*shiftOptions*/
      256 && f !== (f = /*shift*/
      l[79].id) && (e.__value = f, C(e, e.__value));
    },
    d(l) {
      l && oe(e);
    }
  };
}
function on(t) {
  let e, n = (
    /*pos*/
    t[76] + ""
  ), a, f;
  return {
    c() {
      e = s("option"), a = ce(n), e.__value = f = /*pos*/
      t[76], C(e, e.__value), o(e, "class", "svelte-5zofx6");
    },
    m(l, r) {
      de(l, e, r), i(e, a);
    },
    p(l, r) {
      r[0] & /*visibleRows*/
      16384 && n !== (n = /*pos*/
      l[76] + "") && nt(a, n), r[0] & /*visibleRows, teamOptions*/
      16896 && f !== (f = /*pos*/
      l[76]) && (e.__value = f, C(e, e.__value));
    },
    d(l) {
      l && oe(e);
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
      t[73], C(e, e.__value), o(e, "class", "svelte-5zofx6");
    },
    m(f, l) {
      de(f, e, l), i(e, a);
    },
    p: lt,
    d(f) {
      f && oe(e);
    }
  };
}
function sn(t) {
  let e, n, a, f, l, r, g, _, u, D;
  function b(...R) {
    return (
      /*change_handler_11*/
      t[63](
        /*row*/
        t[67],
        /*i*/
        t[70],
        ...R
      )
    );
  }
  function S(...R) {
    return (
      /*change_handler_12*/
      t[64](
        /*row*/
        t[67],
        /*i*/
        t[70],
        ...R
      )
    );
  }
  return {
    c() {
      e = s("div"), n = s("input"), f = O(), l = s("span"), l.textContent = "–", r = O(), g = s("input"), o(n, "type", "time"), o(n, "class", "day-time-input svelte-5zofx6"), n.value = a = /*row*/
      t[67]?.dayStarts?.[
        /*i*/
        t[70]
      ] || /*row*/
      t[67]?.start || "", o(l, "class", "day-time-sep svelte-5zofx6"), o(g, "type", "time"), o(g, "class", "day-time-input svelte-5zofx6"), g.value = _ = /*row*/
      t[67]?.dayEnds?.[
        /*i*/
        t[70]
      ] || /*row*/
      t[67]?.end || "", o(e, "class", "day-times-wrap svelte-5zofx6");
    },
    m(R, N) {
      de(R, e, N), i(e, n), i(e, f), i(e, l), i(e, r), i(e, g), u || (D = [
        M(n, "change", b),
        M(g, "change", S)
      ], u = !0);
    },
    p(R, N) {
      t = R, N[0] & /*visibleRows, teamOptions*/
      16896 && a !== (a = /*row*/
      t[67]?.dayStarts?.[
        /*i*/
        t[70]
      ] || /*row*/
      t[67]?.start || "") && n.value !== a && (n.value = a), N[0] & /*visibleRows, teamOptions*/
      16896 && _ !== (_ = /*row*/
      t[67]?.dayEnds?.[
        /*i*/
        t[70]
      ] || /*row*/
      t[67]?.end || "") && g.value !== _ && (g.value = _);
    },
    d(R) {
      R && oe(e), u = !1, it(D);
    }
  };
}
function rn(t) {
  let e, n, a, f, l, r, g, _, u, D, b, S, R, N;
  function P(...x) {
    return (
      /*change_handler_10*/
      t[62](
        /*row*/
        t[67],
        /*i*/
        t[70],
        ...x
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
      e = s("td"), n = s("div"), a = s("select"), f = s("option"), f.textContent = "PAX", l = s("option"), l.textContent = "BAG", r = s("option"), r.textContent = "DFO", g = s("option"), g.textContent = "Training", _ = s("option"), _.textContent = "OFF", D = O(), I && I.c(), f.__value = "PAX", C(f, f.__value), o(f, "class", "svelte-5zofx6"), l.__value = "BAG", C(l, l.__value), o(l, "class", "svelte-5zofx6"), r.__value = "DFO", C(r, r.__value), o(r, "class", "svelte-5zofx6"), g.__value = "TRAINING", C(g, g.__value), o(g, "class", "svelte-5zofx6"), _.__value = "OFF", C(_, _.__value), o(_, "class", "svelte-5zofx6"), o(a, "class", "day-duty-select svelte-5zofx6"), o(n, "class", "day-cell-inner svelte-5zofx6"), o(e, "class", b = Gt(_n(
        /*row*/
        t[67]?.dayDuties?.[
          /*i*/
          t[70]
        ] ?? /*row*/
        t[67]?.days?.[
          /*i*/
          t[70]
        ]
      )) + " svelte-5zofx6"), o(e, "style", S = /*dayStyle*/
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
    m(x, V) {
      de(x, e, V), i(e, n), i(n, a), i(a, f), i(a, l), i(a, r), i(a, g), i(a, _), W(
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
      ), i(n, D), I && I.m(n, null), R || (N = M(a, "change", P), R = !0);
    },
    p(x, V) {
      t = x, V[0] & /*visibleRows, teamOptions*/
      16896 && u !== (u = /*row*/
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
      )) && W(
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
      ] !== "RDO" ? I ? I.p(t, V) : (I = sn(t), I.c(), I.m(n, null)) : I && (I.d(1), I = null), V[0] & /*visibleRows, teamOptions*/
      16896 && b !== (b = Gt(_n(
        /*row*/
        t[67]?.dayDuties?.[
          /*i*/
          t[70]
        ] ?? /*row*/
        t[67]?.days?.[
          /*i*/
          t[70]
        ]
      )) + " svelte-5zofx6") && o(e, "class", b), V[0] & /*visibleRows, teamOptions*/
      16896 && S !== (S = /*dayStyle*/
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
      )) && o(e, "style", S);
    },
    d(x) {
      x && oe(e), I && I.d(), R = !1, N();
    }
  };
}
function fn(t, e) {
  let n, a, f, l, r, g, _, u, D, b, S, R, N, P, I, x, V, v, p, h, m, w, F, E, z, X, G, ne, _e, U, he, j, Ve, We, ae, se, K, ve, Ie, Te, Ee, Z, ge, pe, ye, He, Ge, ot, le, q, me, we, Be, re, Le, $e, A, Ne, fe, Ce, xe, be, Ke, Xe, at, Pe, Ue = (
    /*row*/
    (e[67]?.rdos ?? "—") + ""
  ), c, B, Y, ke = (
    /*row*/
    (e[67]?.paid ?? "") + ""
  ), et, Ft, tt, st, je = (
    /*row*/
    (e[67]?.hours ?? "") + ""
  ), dt, qe, _t, rt, Ye = De(
    /*teamOptions*/
    e[9]
  ), $ = [];
  for (let y = 0; y < Ye.length; y += 1)
    $[y] = nn(Yt(e, Ye, y));
  function Ot(...y) {
    return (
      /*change_handler*/
      e[52](
        /*row*/
        e[67],
        ...y
      )
    );
  }
  function ht(...y) {
    return (
      /*change_handler_1*/
      e[53](
        /*row*/
        e[67],
        ...y
      )
    );
  }
  let Je = De(
    /*shiftOptions*/
    e[8]
  ), ee = [];
  for (let y = 0; y < Je.length; y += 1)
    ee[y] = ln(qt(e, Je, y));
  function zt(...y) {
    return (
      /*change_handler_2*/
      e[54](
        /*row*/
        e[67],
        ...y
      )
    );
  }
  function vt(...y) {
    return (
      /*change_handler_3*/
      e[55](
        /*row*/
        e[67],
        ...y
      )
    );
  }
  function It(...y) {
    return (
      /*change_handler_4*/
      e[56](
        /*row*/
        e[67],
        ...y
      )
    );
  }
  let Me = De(dn(
    /*BASE_POSITIONS*/
    e[15],
    /*row*/
    e[67]?.position
  )), ie = [];
  for (let y = 0; y < Me.length; y += 1)
    ie[y] = on(jt(e, Me, y));
  function gt(...y) {
    return (
      /*change_handler_5*/
      e[57](
        /*row*/
        e[67],
        ...y
      )
    );
  }
  let Qe = De(
    /*BASE_EMPS*/
    e[16]
  ), te = [];
  for (let y = 0; y < Qe.length; y += 1)
    te[y] = an(Ut(e, Qe, y));
  function Et(...y) {
    return (
      /*change_handler_6*/
      e[58](
        /*row*/
        e[67],
        ...y
      )
    );
  }
  function pt(...y) {
    return (
      /*change_handler_7*/
      e[59](
        /*row*/
        e[67],
        ...y
      )
    );
  }
  function Bt(...y) {
    return (
      /*change_handler_8*/
      e[60](
        /*row*/
        e[67],
        ...y
      )
    );
  }
  function Se(...y) {
    return (
      /*change_handler_9*/
      e[61](
        /*row*/
        e[67],
        ...y
      )
    );
  }
  let ft = De([0, 1, 2, 3, 4, 5, 6]), J = [];
  for (let y = 0; y < 7; y += 1)
    J[y] = rn(Kt(e, ft, y));
  return {
    key: t,
    first: null,
    c() {
      n = s("tr"), a = s("td"), f = s("select"), l = s("option"), l.textContent = "—";
      for (let y = 0; y < $.length; y += 1)
        $[y].c();
      _ = O(), u = s("td"), D = s("input"), R = O(), N = s("td"), P = s("select"), I = s("option"), I.textContent = "—";
      for (let y = 0; y < ee.length; y += 1)
        ee[y].c();
      v = O(), p = s("td"), h = s("input"), F = O(), E = s("td"), z = s("input"), ne = O(), _e = s("td"), U = s("select"), he = s("option"), he.textContent = "—";
      for (let y = 0; y < ie.length; y += 1)
        ie[y].c();
      We = O(), ae = s("td"), se = s("select"), K = s("option"), K.textContent = "—";
      for (let y = 0; y < te.length; y += 1)
        te[y].c();
      Te = O(), Ee = s("td"), Z = s("select"), ge = s("option"), ge.textContent = "—", pe = s("option"), pe.textContent = "M", ye = s("option"), ye.textContent = "F", ot = O(), le = s("td"), q = s("select"), me = s("option"), me.textContent = "—", we = s("option"), we.textContent = "DFO", Be = s("option"), Be.textContent = "BAG", re = s("option"), re.textContent = "PAX", A = O(), Ne = s("td"), fe = s("select"), Ce = s("option"), Ce.textContent = "—", xe = s("option"), xe.textContent = "A", be = s("option"), be.textContent = "B", at = O(), Pe = s("td"), c = ce(Ue), B = O(), Y = s("td"), et = ce(ke), Ft = O();
      for (let y = 0; y < 7; y += 1)
        J[y].c();
      tt = O(), st = s("td"), dt = ce(je), l.__value = "", C(l, l.__value), o(l, "class", "svelte-5zofx6"), o(f, "class", "line-edit svelte-5zofx6"), o(f, "data-field", "team"), o(f, "data-line-id", r = /*row*/
      e[67]?.id), o(a, "class", "svelte-5zofx6"), o(D, "type", "text"), o(D, "class", "line-edit line-code-input svelte-5zofx6"), o(D, "data-field", "lineCode"), o(D, "data-line-id", b = /*row*/
      e[67]?.id), D.value = S = /*row*/
      e[67]?.line ?? "", o(u, "class", "svelte-5zofx6"), I.__value = "", C(I, I.__value), o(I, "class", "svelte-5zofx6"), o(P, "class", "line-edit svelte-5zofx6"), o(P, "data-field", "shift"), o(P, "data-line-id", x = /*row*/
      e[67]?.id), o(N, "class", "svelte-5zofx6"), o(h, "type", "time"), o(h, "class", "line-edit line-time-input svelte-5zofx6"), o(h, "data-field", "start"), o(h, "data-line-id", m = /*row*/
      e[67]?.id), h.value = w = /*row*/
      e[67]?.start ?? "", o(p, "class", "svelte-5zofx6"), o(z, "type", "time"), o(z, "class", "line-edit line-time-input svelte-5zofx6"), o(z, "data-field", "end"), o(z, "data-line-id", X = /*row*/
      e[67]?.id), z.value = G = /*row*/
      e[67]?.end ?? "", o(E, "class", "svelte-5zofx6"), he.__value = "", C(he, he.__value), o(he, "class", "svelte-5zofx6"), o(U, "class", "line-edit svelte-5zofx6"), o(U, "data-field", "position"), o(U, "data-line-id", j = /*row*/
      e[67]?.id), o(_e, "class", "svelte-5zofx6"), K.__value = "", C(K, K.__value), o(K, "class", "svelte-5zofx6"), o(se, "class", "line-edit svelte-5zofx6"), o(se, "data-field", "emp"), o(se, "data-line-id", ve = /*row*/
      e[67]?.id), o(ae, "class", "svelte-5zofx6"), ge.__value = "", C(ge, ge.__value), o(ge, "class", "svelte-5zofx6"), pe.__value = "M", C(pe, pe.__value), o(pe, "class", "svelte-5zofx6"), ye.__value = "F", C(ye, ye.__value), o(ye, "class", "svelte-5zofx6"), o(Z, "class", "line-edit svelte-5zofx6"), o(Z, "data-field", "sex"), o(Z, "data-line-id", He = /*row*/
      e[67]?.id), o(Ee, "class", "svelte-5zofx6"), me.__value = "", C(me, me.__value), o(me, "class", "svelte-5zofx6"), we.__value = "DFO", C(we, we.__value), o(we, "class", "svelte-5zofx6"), Be.__value = "BAG", C(Be, Be.__value), o(Be, "class", "svelte-5zofx6"), re.__value = "PAX", C(re, re.__value), o(re, "class", "svelte-5zofx6"), o(q, "class", "line-edit svelte-5zofx6"), o(q, "data-field", "function"), o(q, "data-line-id", Le = /*row*/
      e[67]?.id), o(le, "class", "svelte-5zofx6"), Ce.__value = "", C(Ce, Ce.__value), o(Ce, "class", "svelte-5zofx6"), xe.__value = "A", C(xe, xe.__value), o(xe, "class", "svelte-5zofx6"), be.__value = "B", C(be, be.__value), o(be, "class", "svelte-5zofx6"), o(fe, "class", "line-edit svelte-5zofx6"), o(fe, "data-field", "certPool"), o(fe, "data-line-id", Ke = /*row*/
      e[67]?.id), o(Ne, "class", "svelte-5zofx6"), o(Pe, "class", "line-rdo-cell svelte-5zofx6"), o(Y, "class", "line-center svelte-5zofx6"), o(st, "class", "line-hours svelte-5zofx6"), o(n, "data-line-row", qe = /*row*/
      e[67]?.id), Q(n, "height", Ct + "px"), o(n, "class", "svelte-5zofx6"), this.first = n;
    },
    m(y, k) {
      de(y, n, k), i(n, a), i(a, f), i(f, l);
      for (let d = 0; d < $.length; d += 1)
        $[d] && $[d].m(f, null);
      W(
        f,
        /*row*/
        e[67]?.teamId ?? ""
      ), i(n, _), i(n, u), i(u, D), i(n, R), i(n, N), i(N, P), i(P, I);
      for (let d = 0; d < ee.length; d += 1)
        ee[d] && ee[d].m(P, null);
      W(
        P,
        /*row*/
        e[67]?.shiftId ?? ""
      ), i(n, v), i(n, p), i(p, h), i(n, F), i(n, E), i(E, z), i(n, ne), i(n, _e), i(_e, U), i(U, he);
      for (let d = 0; d < ie.length; d += 1)
        ie[d] && ie[d].m(U, null);
      W(
        U,
        /*row*/
        e[67]?.position ?? ""
      ), i(n, We), i(n, ae), i(ae, se), i(se, K);
      for (let d = 0; d < te.length; d += 1)
        te[d] && te[d].m(se, null);
      W(
        se,
        /*row*/
        e[67]?.emp ?? ""
      ), i(n, Te), i(n, Ee), i(Ee, Z), i(Z, ge), i(Z, pe), i(Z, ye), W(
        Z,
        /*row*/
        e[67]?.sex ?? ""
      ), i(n, ot), i(n, le), i(le, q), i(q, me), i(q, we), i(q, Be), i(q, re), W(
        q,
        /*row*/
        e[67]?.function ?? ""
      ), i(n, A), i(n, Ne), i(Ne, fe), i(fe, Ce), i(fe, xe), i(fe, be), W(
        fe,
        /*row*/
        e[67]?.certPool ?? ""
      ), i(n, at), i(n, Pe), i(Pe, c), i(n, B), i(n, Y), i(Y, et), i(n, Ft);
      for (let d = 0; d < 7; d += 1)
        J[d] && J[d].m(n, null);
      i(n, tt), i(n, st), i(st, dt), _t || (rt = [
        M(f, "change", Ot),
        M(D, "change", ht),
        M(P, "change", zt),
        M(h, "change", vt),
        M(z, "change", It),
        M(U, "change", gt),
        M(se, "change", Et),
        M(Z, "change", pt),
        M(q, "change", Bt),
        M(fe, "change", Se)
      ], _t = !0);
    },
    p(y, k) {
      if (e = y, k[0] & /*teamOptions*/
      512) {
        Ye = De(
          /*teamOptions*/
          e[9]
        );
        let d;
        for (d = 0; d < Ye.length; d += 1) {
          const ue = Yt(e, Ye, d);
          $[d] ? $[d].p(ue, k) : ($[d] = nn(ue), $[d].c(), $[d].m(f, null));
        }
        for (; d < $.length; d += 1)
          $[d].d(1);
        $.length = Ye.length;
      }
      if (k[0] & /*visibleRows, teamOptions*/
      16896 && r !== (r = /*row*/
      e[67]?.id) && o(f, "data-line-id", r), k[0] & /*visibleRows, teamOptions*/
      16896 && g !== (g = /*row*/
      e[67]?.teamId ?? "") && W(
        f,
        /*row*/
        e[67]?.teamId ?? ""
      ), k[0] & /*visibleRows, teamOptions*/
      16896 && b !== (b = /*row*/
      e[67]?.id) && o(D, "data-line-id", b), k[0] & /*visibleRows, teamOptions*/
      16896 && S !== (S = /*row*/
      e[67]?.line ?? "") && D.value !== S && (D.value = S), k[0] & /*shiftOptions*/
      256) {
        Je = De(
          /*shiftOptions*/
          e[8]
        );
        let d;
        for (d = 0; d < Je.length; d += 1) {
          const ue = qt(e, Je, d);
          ee[d] ? ee[d].p(ue, k) : (ee[d] = ln(ue), ee[d].c(), ee[d].m(P, null));
        }
        for (; d < ee.length; d += 1)
          ee[d].d(1);
        ee.length = Je.length;
      }
      if (k[0] & /*visibleRows, teamOptions*/
      16896 && x !== (x = /*row*/
      e[67]?.id) && o(P, "data-line-id", x), k[0] & /*visibleRows, teamOptions*/
      16896 && V !== (V = /*row*/
      e[67]?.shiftId ?? "") && W(
        P,
        /*row*/
        e[67]?.shiftId ?? ""
      ), k[0] & /*visibleRows, teamOptions*/
      16896 && m !== (m = /*row*/
      e[67]?.id) && o(h, "data-line-id", m), k[0] & /*visibleRows, teamOptions*/
      16896 && w !== (w = /*row*/
      e[67]?.start ?? "") && h.value !== w && (h.value = w), k[0] & /*visibleRows, teamOptions*/
      16896 && X !== (X = /*row*/
      e[67]?.id) && o(z, "data-line-id", X), k[0] & /*visibleRows, teamOptions*/
      16896 && G !== (G = /*row*/
      e[67]?.end ?? "") && z.value !== G && (z.value = G), k[0] & /*BASE_POSITIONS, visibleRows*/
      49152) {
        Me = De(dn(
          /*BASE_POSITIONS*/
          e[15],
          /*row*/
          e[67]?.position
        ));
        let d;
        for (d = 0; d < Me.length; d += 1) {
          const ue = jt(e, Me, d);
          ie[d] ? ie[d].p(ue, k) : (ie[d] = on(ue), ie[d].c(), ie[d].m(U, null));
        }
        for (; d < ie.length; d += 1)
          ie[d].d(1);
        ie.length = Me.length;
      }
      if (k[0] & /*visibleRows, teamOptions*/
      16896 && j !== (j = /*row*/
      e[67]?.id) && o(U, "data-line-id", j), k[0] & /*visibleRows, teamOptions*/
      16896 && Ve !== (Ve = /*row*/
      e[67]?.position ?? "") && W(
        U,
        /*row*/
        e[67]?.position ?? ""
      ), k[0] & /*BASE_EMPS*/
      65536) {
        Qe = De(
          /*BASE_EMPS*/
          e[16]
        );
        let d;
        for (d = 0; d < Qe.length; d += 1) {
          const ue = Ut(e, Qe, d);
          te[d] ? te[d].p(ue, k) : (te[d] = an(ue), te[d].c(), te[d].m(se, null));
        }
        for (; d < te.length; d += 1)
          te[d].d(1);
        te.length = Qe.length;
      }
      if (k[0] & /*visibleRows, teamOptions*/
      16896 && ve !== (ve = /*row*/
      e[67]?.id) && o(se, "data-line-id", ve), k[0] & /*visibleRows, teamOptions*/
      16896 && Ie !== (Ie = /*row*/
      e[67]?.emp ?? "") && W(
        se,
        /*row*/
        e[67]?.emp ?? ""
      ), k[0] & /*visibleRows, teamOptions*/
      16896 && He !== (He = /*row*/
      e[67]?.id) && o(Z, "data-line-id", He), k[0] & /*visibleRows, teamOptions*/
      16896 && Ge !== (Ge = /*row*/
      e[67]?.sex ?? "") && W(
        Z,
        /*row*/
        e[67]?.sex ?? ""
      ), k[0] & /*visibleRows, teamOptions*/
      16896 && Le !== (Le = /*row*/
      e[67]?.id) && o(q, "data-line-id", Le), k[0] & /*visibleRows, teamOptions*/
      16896 && $e !== ($e = /*row*/
      e[67]?.function ?? "") && W(
        q,
        /*row*/
        e[67]?.function ?? ""
      ), k[0] & /*visibleRows, teamOptions*/
      16896 && Ke !== (Ke = /*row*/
      e[67]?.id) && o(fe, "data-line-id", Ke), k[0] & /*visibleRows, teamOptions*/
      16896 && Xe !== (Xe = /*row*/
      e[67]?.certPool ?? "") && W(
        fe,
        /*row*/
        e[67]?.certPool ?? ""
      ), k[0] & /*visibleRows*/
      16384 && Ue !== (Ue = /*row*/
      (e[67]?.rdos ?? "—") + "") && nt(c, Ue), k[0] & /*visibleRows*/
      16384 && ke !== (ke = /*row*/
      (e[67]?.paid ?? "") + "") && nt(et, ke), k[0] & /*visibleRows, dayStyle, emitDayTime, emitDayDuty*/
      1720320) {
        ft = De([0, 1, 2, 3, 4, 5, 6]);
        let d;
        for (d = 0; d < 7; d += 1) {
          const ue = Kt(e, ft, d);
          J[d] ? J[d].p(ue, k) : (J[d] = rn(ue), J[d].c(), J[d].m(n, tt));
        }
        for (; d < 7; d += 1)
          J[d].d(1);
      }
      k[0] & /*visibleRows*/
      16384 && je !== (je = /*row*/
      (e[67]?.hours ?? "") + "") && nt(dt, je), k[0] & /*visibleRows, teamOptions*/
      16896 && qe !== (qe = /*row*/
      e[67]?.id) && o(n, "data-line-row", qe);
    },
    d(y) {
      y && oe(n), ct($, y), ct(ee, y), ct(ie, y), ct(te, y), ct(J, y), _t = !1, it(rt);
    }
  };
}
function un(t) {
  let e, n;
  return {
    c() {
      e = s("tr"), n = s("td"), o(n, "colspan", "20"), Q(n, "padding", "0"), Q(n, "border", "none"), o(n, "class", "svelte-5zofx6"), Q(
        e,
        "height",
        /*paddingBottom*/
        t[12] + "px"
      ), o(e, "class", "svelte-5zofx6");
    },
    m(a, f) {
      de(a, e, f), i(e, n);
    },
    p(a, f) {
      f[0] & /*paddingBottom*/
      4096 && Q(
        e,
        "height",
        /*paddingBottom*/
        a[12] + "px"
      );
    },
    d(a) {
      a && oe(e);
    }
  };
}
function Wn(t) {
  let e;
  function n(l, r) {
    return (
      /*mode*/
      l[7] === "svelte" ? Xn : Gn
    );
  }
  let a = n(t), f = a(t);
  return {
    c() {
      e = s("div"), f.c(), o(e, "class", "lines-table-root svelte-5zofx6"), Q(e, "min-height", "min(70vh, 720px)"), Q(e, "height", "min(70vh, 720px)"), Q(e, "width", "100%"), Q(
        e,
        "--export-rdo",
        /*exportStyle*/
        t[10]?.rdo || "#000000"
      ), Q(
        e,
        "--export-bag",
        /*exportStyle*/
        t[10]?.bag || "#F4B4B4"
      ), Q(
        e,
        "--export-dfo",
        /*exportStyle*/
        t[10]?.dfo || "#FFF3A8"
      ), Q(
        e,
        "--export-pax",
        /*exportStyle*/
        t[10]?.pax || "#A0C4FF"
      ), Q(
        e,
        "--export-header",
        /*exportStyle*/
        t[10]?.header || "#1F4E79"
      );
    },
    m(l, r) {
      de(l, e, r), f.m(e, null);
    },
    p(l, r) {
      a === (a = n(l)) && f ? f.p(l, r) : (f.d(1), f = a(l), f && (f.c(), f.m(e, null))), r[0] & /*exportStyle*/
      1024 && Q(
        e,
        "--export-rdo",
        /*exportStyle*/
        l[10]?.rdo || "#000000"
      ), r[0] & /*exportStyle*/
      1024 && Q(
        e,
        "--export-bag",
        /*exportStyle*/
        l[10]?.bag || "#F4B4B4"
      ), r[0] & /*exportStyle*/
      1024 && Q(
        e,
        "--export-dfo",
        /*exportStyle*/
        l[10]?.dfo || "#FFF3A8"
      ), r[0] & /*exportStyle*/
      1024 && Q(
        e,
        "--export-pax",
        /*exportStyle*/
        l[10]?.pax || "#A0C4FF"
      ), r[0] & /*exportStyle*/
      1024 && Q(
        e,
        "--export-header",
        /*exportStyle*/
        l[10]?.header || "#1F4E79"
      );
    },
    i: lt,
    o: lt,
    d(l) {
      l && oe(e), f.d();
    }
  };
}
const Ct = 42, cn = 8;
function dn(t, e) {
  const n = e == null ? "" : String(e);
  return !n || t.indexOf(n) >= 0 ? t : t.concat([n]);
}
function Lt(t) {
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
function Hn(t, e, n) {
  let a, f, l, r, g, _, u, { rows: D = [] } = e, { mode: b = "svelte" } = e, { shiftOptions: S = [] } = e, { teamOptions: R = [] } = e, { exportStyle: N = Wt() } = e, { onInlineEdit: P = null } = e, { onDayToggle: I = null } = e, { onDayDutyEdit: x = null } = e, { onDayTimeEdit: V = null } = e, { onSort: v = null } = e, { onFilter: p = null } = e, { currentSortBy: h = "role" } = e, { currentSortDir: m = "asc" } = e, { filterRole: w = "ALL" } = e, { filterShift: F = "" } = e, { filterTeam: E = "" } = e, { filterSex: z = "" } = e, { filterDuty: X = "" } = e, { filterDay: G = "" } = e, { searchCode: ne = "" } = e;
  const _e = ["TSO", "LTSO", "STSO"], U = ["FT", "PT"];
  function he(c) {
    const B = yn(c);
    if (!B) return;
    const ke = (N || Wt())[B];
    if (ke)
      return "background:" + ke + ";color:" + Mn(ke) + ";";
  }
  function j(c, B, Y) {
    P?.({ lineId: c, field: B, value: Y });
  }
  function Ve(c, B, Y) {
    x?.({ lineId: c, dayIndex: B, duty: Y });
  }
  function We(c, B, Y, ke) {
    V?.({ lineId: c, dayIndex: B, field: Y, value: ke });
  }
  function ae(c) {
    let B = "asc";
    h === c && (B = m === "asc" ? "desc" : "asc"), v?.({ sortBy: c, sortDir: B });
  }
  function se() {
    p?.({
      filterRole: w,
      filterShift: F,
      filterTeam: E,
      filterSex: z,
      filterDuty: X,
      filterDay: G,
      searchCode: ne
    });
  }
  function K(c) {
    return h !== c ? "" : m === "asc" ? " ▲" : " ▼";
  }
  let ve = 0, Ie = 600, Te;
  function Ee(c) {
    n(34, ve = c.target.scrollTop);
  }
  Fn(() => {
    Te && n(35, Ie = Te.clientHeight || 600);
  });
  function Z() {
    ne = this.value, n(6, ne);
  }
  function ge() {
    w = wt(this), n(0, w);
  }
  function pe() {
    E = wt(this), n(2, E), n(9, R);
  }
  function ye() {
    F = wt(this), n(1, F), n(8, S);
  }
  function He() {
    X = wt(this), n(4, X);
  }
  function Ge() {
    G = wt(this), n(5, G);
  }
  function ot() {
    z = wt(this), n(3, z);
  }
  const le = () => ae("team"), q = () => ae("line"), me = () => ae("shift"), we = () => ae("start"), Be = () => ae("role"), re = (c, B) => j(c?.id, "team", B.target.value), Le = (c, B) => j(c?.id, "lineCode", B.target.value), $e = (c, B) => j(c?.id, "shift", B.target.value), A = (c, B) => j(c?.id, "start", B.target.value), Ne = (c, B) => j(c?.id, "end", B.target.value), fe = (c, B) => j(c?.id, "position", B.target.value), Ce = (c, B) => j(c?.id, "emp", B.target.value), xe = (c, B) => j(c?.id, "sex", B.target.value), be = (c, B) => j(c?.id, "function", B.target.value), Ke = (c, B) => j(c?.id, "certPool", B.target.value), Xe = (c, B, Y) => Ve(c?.id, B, Y.target.value), at = (c, B, Y) => We(c?.id, B, "start", Y.target.value), Pe = (c, B, Y) => We(c?.id, B, "end", Y.target.value);
  function Ue(c) {
    Nt[c ? "unshift" : "push"](() => {
      Te = c, n(11, Te);
    });
  }
  return t.$$set = (c) => {
    "rows" in c && n(25, D = c.rows), "mode" in c && n(7, b = c.mode), "shiftOptions" in c && n(8, S = c.shiftOptions), "teamOptions" in c && n(9, R = c.teamOptions), "exportStyle" in c && n(10, N = c.exportStyle), "onInlineEdit" in c && n(26, P = c.onInlineEdit), "onDayToggle" in c && n(27, I = c.onDayToggle), "onDayDutyEdit" in c && n(28, x = c.onDayDutyEdit), "onDayTimeEdit" in c && n(29, V = c.onDayTimeEdit), "onSort" in c && n(30, v = c.onSort), "onFilter" in c && n(31, p = c.onFilter), "currentSortBy" in c && n(32, h = c.currentSortBy), "currentSortDir" in c && n(33, m = c.currentSortDir), "filterRole" in c && n(0, w = c.filterRole), "filterShift" in c && n(1, F = c.filterShift), "filterTeam" in c && n(2, E = c.filterTeam), "filterSex" in c && n(3, z = c.filterSex), "filterDuty" in c && n(4, X = c.filterDuty), "filterDay" in c && n(5, G = c.filterDay), "searchCode" in c && n(6, ne = c.searchCode);
  }, t.$$.update = () => {
    t.$$.dirty[0] & /*rows*/
    33554432 && n(39, a = D.length), t.$$.dirty[1] & /*totalRows*/
    256 && n(37, f = a * Ct), t.$$.dirty[1] & /*scrollTop*/
    8 && n(38, l = Math.max(0, Math.floor(ve / Ct) - cn)), t.$$.dirty[1] & /*totalRows, scrollTop, viewportHeight*/
    280 && n(36, r = Math.min(a, Math.ceil((ve + Ie) / Ct) + cn)), t.$$.dirty[0] & /*rows*/
    33554432 | t.$$.dirty[1] & /*startIndex, endIndex*/
    160 && n(14, g = D.slice(l, r)), t.$$.dirty[1] & /*startIndex*/
    128 && n(13, _ = l * Ct), t.$$.dirty[1] & /*totalHeight, endIndex*/
    96 && n(12, u = Math.max(0, f - r * Ct));
  }, [
    w,
    F,
    E,
    z,
    X,
    G,
    ne,
    b,
    S,
    R,
    N,
    Te,
    u,
    _,
    g,
    _e,
    U,
    he,
    j,
    Ve,
    We,
    ae,
    se,
    K,
    Ee,
    D,
    P,
    I,
    x,
    V,
    v,
    p,
    h,
    m,
    ve,
    Ie,
    r,
    f,
    l,
    a,
    Z,
    ge,
    pe,
    ye,
    He,
    Ge,
    ot,
    le,
    q,
    me,
    we,
    Be,
    re,
    Le,
    $e,
    A,
    Ne,
    fe,
    Ce,
    xe,
    be,
    Ke,
    Xe,
    at,
    Pe,
    Ue
  ];
}
class Kn extends Nn {
  constructor(e) {
    super(), Vn(
      this,
      e,
      Hn,
      Wn,
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
function Un(t) {
  if (t = t || window.Scheduler, !t) return;
  function e(l) {
    var r = String(l || "").trim();
    if (!r) return "";
    var g = r.match(/^(\d+)$/);
    return g && Number(g[1]) < 10 ? "0" + g[1] : r;
  }
  function n(l, r) {
    var g = (l.rdoDays || []).map(Number).filter(function(u) {
      return Number.isInteger(u) && u >= 0 && u <= 6;
    }), _ = g.length ? g.map(function(u) {
      return r && r[u] != null ? r[u] : String(u);
    }).join(",") : "—";
    return l.rdoHard && (_ += " (hard)"), _;
  }
  function a(l, r, g) {
    return g || "WORK";
  }
  function f(l, r) {
    return r === "TRAINING" ? "TRAINING" : r === "BAG" || r === "PAX" || r === "DFO" ? r : l.isTraining || l.trainingClass || l.empClass === "ESTI" || l.empClass === "MSTI" || l.extraName === "ESTI" || l.extraName === "MSTI" ? "TRAINING" : l.function === "BAG" ? "BAG" : l.function === "DFO" || l.function === "PAX" ? "PAX" : r === "BAG" || r === "PAX" ? r : null;
  }
  t.lineToRowModel = function(l, r, g) {
    if (g = g || {}, !l || !r) return null;
    for (var _ = g.dayNames || ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], u = typeof g.teamResolver == "function" ? g.teamResolver(l.id) : null, D = typeof g.shiftResolver == "function" ? g.shiftResolver(l.shiftId) : null, b = l.shiftName || D && D.name || "", S = l.startTime || (D && D.start ? D.start : ""), R = l.endTime || (D && D.end ? D.end : ""), N = l.shiftLabel || (S && R ? S + "–" + R : S || "WORK"), P = !!(l.isExtra || l.extraPositionId), I = P ? l.position || l.extraName || "TSO" : l.isStso || l.empClass === "STSO" ? "STSO" : l.isLtso || l.empClass === "LTSO" ? "LTSO" : "TSO", x = P ? l.empClass === "PT" ? "PT" : "FT" : I === "STSO" || I === "LTSO" ? "FT" : l.empClass === "PT" ? "PT" : "FT", V = l.paid || 0, v = Array.isArray(r) ? r : r[l.id] || r[String(l.id)] || [], p = [], h = [], m = [], w = [], F = 0, E = 0; E < 7; E++) {
      var z = typeof g.effectiveTimesResolver == "function" ? g.effectiveTimesResolver(l.shiftId, E) : null, X = l.startTime || z && z.start || S, G = l.endTime || z && z.end || R;
      m.push(X), w.push(G);
      var ne = v[E];
      if (ne === "WORK") {
        F += V;
        var _e = typeof g.rotationDutyResolver == "function" ? g.rotationDutyResolver(l.id, E) : null, U = a(l, _e, N);
        p.push(U), h.push(f(l, _e) || "PAX");
      } else
        p.push("RDO"), h.push("OFF");
    }
    return {
      id: l.id,
      teamId: u && u.id || "",
      shiftId: l.shiftId || "",
      team: e(u && (u.name || u.id) || ""),
      line: l.lineCode || "",
      shift: b,
      start: S,
      end: R,
      position: I,
      emp: x,
      sex: l.sex === "F" || l.sex === "M" ? l.sex : "",
      function: l.function || "",
      certPool: l.certPool || "",
      rdos: n(l, _),
      paid: V,
      days: p,
      dayDuties: h,
      dayStarts: m,
      dayEnds: w,
      hours: F
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
function jn(t) {
  if (t = t || window.Scheduler, !t) return;
  function e(g, _) {
    var u = t.getRotationDuty ? t.getRotationDuty(g.id, _) : null;
    return u || g.function || null;
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
      for (var u = t.state.schedule && (t.state.schedule[g.id] || t.state.schedule[_]) || [], D = Math.max(u.length, (t.state.weekCount || 1) * 7), b = 0; b < D; b++) {
        for (; t.state.functionRotation[_].length <= b; ) t.state.functionRotation[_].push(null);
        u[b] === "WORK" && (t.state.functionRotation[_][b] = "BAG");
      }
    }
  }
  function f(g) {
    if (!(!g || g.function !== "DFO")) {
      t.state.functionRotation || (t.state.functionRotation = {});
      var _ = String(g.id);
      t.state.functionRotation[_] || (t.state.functionRotation[_] = []);
      for (var u = t.state.schedule && (t.state.schedule[g.id] || t.state.schedule[_]) || [], D = Math.max(u.length, (t.state.weekCount || 1) * 7), b = 0; b < D; b++) {
        for (; t.state.functionRotation[_].length <= b; ) t.state.functionRotation[_].push(null);
        u[b] === "WORK" && (t.state.functionRotation[_][b] = "DFO");
      }
    }
  }
  function l() {
    var g = document.getElementById("lines-tbody"), _ = g || document.querySelector(".lines-virtual-root");
    _ && g && _.querySelectorAll("td.cell-toggle").forEach(function(u) {
      var D = t.findLineById ? t.findLineById(u.getAttribute("data-line-id")) : null, b = +u.getAttribute("data-day");
      if (!(!D || isNaN(b))) {
        var S = (t.state.schedule[D.id] || t.state.schedule[String(D.id)] || [])[b] || "RDO";
        if (u.style.background = "", u.style.color = "", S !== "WORK") {
          u.className = "cell-rdo cell-toggle", u.textContent = "RDO", u.style.background = "#000", u.style.color = "#fff", u.style.opacity = "1";
          return;
        }
        var R = e(D, b), N = R === "BAG" || R === "BAGS", P = R === "DFO", I = "";
        N ? I = " cell-function-duty cell-bag" : P && (I = " cell-function-duty cell-dfo"), u.className = "cell-work cell-toggle" + I, u.textContent = n(D);
      }
    });
  }
  t.paintLineColors = l;
  function r(g) {
    var _ = t[g];
    if (!(typeof _ != "function" || _._lineColorsWrapped)) {
      var u = function() {
        if (t.__USE_SVELTE_LINES) return _.apply(this, arguments);
        var D = _.apply(this, arguments);
        return setTimeout(l, 0), D;
      };
      u._lineColorsWrapped = !0, t[g] = u;
    }
  }
  r("renderLines"), r("renderAll"), r("generateFunctionAssignments"), t._lineColorsBound || (t._lineColorsBound = !0, document.addEventListener("change", function(g) {
    var _ = g.target;
    if (!(!_ || _.getAttribute("data-field") !== "function")) {
      var u = t.findLineById ? t.findLineById(_.getAttribute("data-line-id")) : null;
      u && (u.function = _.value === "DFO" || _.value === "PAX" || _.value === "BAG" ? _.value : "", u.function === "BAG" && a(u), u.function === "DFO" && f(u), t.renderLines ? t.renderLines() : l());
    }
  }));
}
function Yn(t) {
  const e = t || window.Scheduler;
  if (!e) return;
  Un(e), jn(e);
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
      rotationDutyResolver: typeof e.getRotationDuty == "function" ? e.getRotationDuty : f,
      effectiveTimesResolver: typeof e.getEffectiveShiftTimes == "function" ? e.getEffectiveShiftTimes : null
    };
  }
  function f(v, p) {
    const h = String(v), m = e.state && e.state.functionRotation, w = m && (m[h] || m[v]);
    if (!Array.isArray(w)) return null;
    const F = w[p];
    return F === "BAG" ? "BAG" : F === "DFO" ? "DFO" : F === "PAX" ? "PAX" : F === "TRAINING" ? "TRAINING" : null;
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
  function u() {
    return e.state && Array.isArray(e.state.shifts) ? e.state.shifts : [];
  }
  function D() {
    return typeof e.getExportStyle == "function" ? e.getExportStyle() : e.state && e.state.exportStyle || null;
  }
  function b(v) {
    if (!v || typeof v.$set != "function") return;
    const p = g();
    typeof e.applyExportCssVars == "function" && e.applyExportCssVars(), v.$set({
      rows: Array.isArray(p) ? p : [],
      shiftOptions: u(),
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
  function S(v) {
    if (!v) return;
    const p = e.findLineById ? e.findLineById(v.lineId) : null;
    if (!p) return;
    const h = v.field, m = v.value;
    if (h === "lineCode")
      p.lineCode = String(m || "").trim() || p.lineCode;
    else if (h === "sex")
      p.sex = m === "F" ? "F" : "M";
    else if (h === "function")
      p.function = m === "DFO" || m === "PAX" || m === "BAG" ? m : "";
    else if (h === "certPool") {
      var w = String(m || "").trim().toUpperCase();
      p.certPool = w === "A" || w === "B" ? w : "";
    } else if (h === "emp")
      e.applyLineEmp && e.applyLineEmp(p, m);
    else if (h === "position") {
      var F = !!(p.isExtra || p.extraPositionId), E = String(m ?? "").trim();
      F ? (E && (p.position = E, p.extraName = E), p.isStso = !1, p.isLtso = !1) : e.applyLineEmp && e.applyLineEmp(p, E);
    } else if (h === "shift")
      e.applyLineShift && e.applyLineShift(p, m);
    else if (h === "team")
      e.setLineTeam && e.setLineTeam(v.lineId, m);
    else if (h === "start" || h === "end") {
      var z = String(m || "").trim();
      if (e.isValidTimeText && !e.isValidTimeText(z)) return;
      h === "start" && (p.startTime = z), h === "end" && (p.endTime = z);
      var X = e.getShift ? e.getShift(p.shiftId) : null, G = p.startTime || (X ? X.start : ""), ne = p.endTime || (X ? X.end : "");
      p.shiftLabel = (G || "") + "-" + (ne || "");
    }
    e.updateStatus && e.updateStatus("Updated " + (p.lineCode || v.lineId)), V(), (h === "emp" || h === "position" || h === "shift" || h === "start" || h === "end") && e.renderCoverageBars && e.renderCoverageBars(), h === "team" && e.renderTeams && e.renderTeams(), window.dispatchEvent(new CustomEvent("lines:coverage-refresh"));
  }
  function R(v) {
    if (!v) return;
    const p = e.findLineById ? e.findLineById(v.lineId) : null, h = Number(v.dayIndex);
    if (!p || !Number.isInteger(h) || h < 0 || h > 6) return;
    const m = String(p.id);
    e.state.schedule || (e.state.schedule = {});
    var w = e.state.schedule[m] || e.state.schedule[p.id];
    for (Array.isArray(w) || (w = []), e.state.schedule[m] = w; e.state.schedule[m].length < 7; ) e.state.schedule[m].push("RDO");
    e.state.functionRotation || (e.state.functionRotation = {}), !e.state.functionRotation[m] && e.state.functionRotation[p.id] && (e.state.functionRotation[m] = e.state.functionRotation[p.id]);
    const F = e.state.schedule[m][h] || "RDO", E = p.function === "BAG", z = r(p);
    if (F !== "WORK")
      e.state.schedule[m][h] = "WORK", E ? l(m, h, "BAG") : z ? l(m, h, "PAX") : l(m, h, null);
    else if (E)
      e.state.schedule[m][h] = "RDO", l(m, h, null);
    else if (z) {
      var X = typeof e.getRotationDuty == "function" ? e.getRotationDuty(p.id, h) : f(p.id, h), G = X === "DFO" || X === "PAX" || !X ? "PAX" : X;
      G === "PAX" ? l(m, h, "BAG") : (e.state.schedule[m][h] = "RDO", l(m, h, null));
    } else
      e.state.schedule[m][h] = "RDO", l(m, h, null);
    e.syncRdoDaysFromSchedule && e.syncRdoDaysFromSchedule(p), V(), e.renderCoverageBars && e.renderCoverageBars(), window.dispatchEvent(new CustomEvent("lines:coverage-refresh"));
  }
  function N(v) {
    if (!v) return;
    const p = e.findLineById ? e.findLineById(v.lineId) : null, h = Number(v.dayIndex), m = String(v.duty || "").toUpperCase();
    if (!p || !Number.isInteger(h) || h < 0 || h > 6) return;
    const w = String(p.id);
    e.state.schedule || (e.state.schedule = {}), Array.isArray(e.state.schedule[w]) || (e.state.schedule[w] = Array(7).fill("RDO")), m === "OFF" || m === "RDO" || m === "" ? (e.state.schedule[w][h] = "RDO", l(w, h, null)) : (e.state.schedule[w][h] = "WORK", m === "BAG" ? l(w, h, "BAG") : m === "DFO" ? l(w, h, "DFO") : m === "TRAINING" ? l(w, h, "TRAINING") : l(w, h, "PAX")), e.syncRdoDaysFromSchedule && e.syncRdoDaysFromSchedule(p), V(), e.renderCoverageBars && e.renderCoverageBars(), window.dispatchEvent(new CustomEvent("lines:coverage-refresh"));
  }
  function P(v) {
    if (!v) return;
    const p = e.findLineById ? e.findLineById(v.lineId) : null, h = Number(v.dayIndex), m = v.field, w = String(v.value || "").trim();
    if (!(!p || !Number.isInteger(h) || h < 0 || h > 6) && !(e.isValidTimeText && !e.isValidTimeText(w))) {
      var F = e.getShift ? e.getShift(p.shiftId) : null;
      if (!F) {
        var E = p.shiftId || "SHIFT_" + p.id;
        p.shiftId = E, e.state.shifts || (e.state.shifts = []), F = e.getShift ? e.getShift(E) : null, F || (F = { id: E, name: E, start: "08:00", end: "16:30", paid: p.paid || 8 }, e.state.shifts.push(F));
      }
      F.dayTimes || (F.dayTimes = {});
      var z = String(h), X = F.dayTimes[z] || { start: F.start || "08:00", end: F.end || "16:30" };
      m === "start" ? F.dayTimes[z] = { start: w, end: X.end } : m === "end" && (F.dayTimes[z] = { start: X.start, end: w }), V(), e.renderCoverageBars && e.renderCoverageBars(), window.dispatchEvent(new CustomEvent("lines:coverage-refresh"));
    }
  }
  function I(v) {
    v && (e.linesView || (e.linesView = {}), v.sortBy && (e.linesView.sortBy = v.sortBy), v.sortDir && (e.linesView.sortDir = v.sortDir), V());
  }
  function x(v) {
    v && (e.linesView || (e.linesView = {}), v.filterRole !== void 0 && (e.linesView.filterRole = v.filterRole), v.filterShift !== void 0 && (e.linesView.filterShift = v.filterShift), v.filterTeam !== void 0 && (e.linesView.filterTeam = v.filterTeam), v.filterSex !== void 0 && (e.linesView.filterSex = v.filterSex), v.filterDuty !== void 0 && (e.linesView.filterDuty = v.filterDuty), v.filterDay !== void 0 && (e.linesView.filterDay = v.filterDay), v.searchCode !== void 0 && (e.linesView.searchCode = v.searchCode), V());
  }
  const V = () => {
    try {
      const v = n._linesTableApp;
      if (v)
        b(v);
      else {
        n.childNodes.length && (n.innerHTML = "");
        const p = g();
        typeof e.applyExportCssVars == "function" && e.applyExportCssVars(), n._linesTableApp = new Kn({
          target: n,
          props: {
            rows: Array.isArray(p) ? p : [],
            shiftOptions: u(),
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
            onInlineEdit: S,
            onDayToggle: R,
            onDayDutyEdit: N,
            onDayTimeEdit: P,
            onSort: I,
            onFilter: x
          }
        });
      }
    } catch (v) {
      console.error("lines-table: refresh failed", v);
    }
  };
  V(), e.bindLinesUI && e.bindLinesUI(), document.addEventListener("click", (v) => {
    const p = v.target.closest?.(".tab-btn");
    p && p.dataset.tab === "lines" && V();
  }), ["lines:request-render", "lines:filter-change", "lines:sort-change", "lines:coverage-refresh"].forEach((v) => {
    window.addEventListener(v, V);
  }), n.refresh = V;
}
export {
  Yn as initLinesTable
};
