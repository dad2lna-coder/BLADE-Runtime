var mn = Object.defineProperty;
var wn = (t, e, n) => e in t ? mn(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var kt = (t, e, n) => wn(t, typeof e != "symbol" ? e + "" : e, n);
function it() {
}
function hn(t) {
  return t();
}
function Mt() {
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
function Gt(t) {
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
function G(t, e, n, a) {
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
function Y(t, e, n, a) {
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
const Xt = [], Fn = /* @__PURE__ */ Promise.resolve();
let xt = !1;
function An() {
  xt || (xt = !0, Fn.then(gn));
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
  for (; Xt.length; )
    Xt.pop()();
  xt = !1, Vt.clear(), St(t);
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
const zn = /* @__PURE__ */ new Set();
function pn(t, e) {
  t && t.i && (zn.delete(t), t.i(e));
}
function we(t) {
  return t?.length !== void 0 ? t : Array.from(t);
}
function In(t, e) {
  t.d(1), e.delete(t.key);
}
function En(t, e, n, a, f, l, r, g, _, c, D, R) {
  let A = t.length, C = l.length, N = A;
  const P = {};
  for (; N--; ) P[t[N].key] = N;
  const z = [], x = /* @__PURE__ */ new Map(), V = /* @__PURE__ */ new Map(), v = [];
  for (N = C; N--; ) {
    const w = R(f, l, N), I = n(w);
    let L = r.get(I);
    L ? v.push(() => L.p(w, e)) : (L = c(I, w), L.c()), x.set(I, z[N] = L), I in P && V.set(I, Math.abs(N - P[I]));
  }
  const p = /* @__PURE__ */ new Set(), h = /* @__PURE__ */ new Set();
  function m(w) {
    pn(w, 1), w.m(g, D), r.set(w.key, w), D = w.first, C--;
  }
  for (; A && C; ) {
    const w = z[C - 1], I = t[A - 1], L = w.key, B = I.key;
    w === I ? (D = w.first, A--, C--) : x.has(B) ? !r.has(L) || p.has(L) ? m(w) : h.has(B) ? A-- : V.get(L) > V.get(B) ? (h.add(L), m(w)) : (p.add(B), A--) : (_(I, r), A--);
  }
  for (; A--; ) {
    const w = t[A];
    x.has(w.key) || _(w, r);
  }
  for (; C; ) m(z[C - 1]);
  return ot(v), z;
}
function Bn(t, e, n) {
  const { fragment: a, after_update: f } = t.$$;
  a && a.m(e, n), et(() => {
    const l = t.$$.on_mount.map(hn).filter(vn);
    t.$$.on_destroy ? t.$$.on_destroy.push(...l) : ot(l), t.$$.on_mount = [];
  }), f.forEach(et);
}
function Ln(t, e) {
  const n = t.$$;
  n.fragment !== null && (On(n.after_update), ot(n.on_destroy), n.fragment && n.fragment.d(e), n.on_destroy = n.fragment = null, n.ctx = []);
}
function kn(t, e) {
  t.$$.dirty[0] === -1 && (Tt.push(t), An(), t.$$.dirty.fill(0)), t.$$.dirty[e / 31 | 0] |= 1 << e % 31;
}
function Vn(t, e, n, a, f, l, r = null, g = [-1]) {
  const _ = Ot;
  St(t);
  const c = t.$$ = {
    fragment: null,
    ctx: [],
    // state
    props: l,
    update: it,
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
  r && r(c.root);
  let D = !1;
  if (c.ctx = n ? n(t, e.props || {}, (R, A, ...C) => {
    const N = C.length ? C[0] : A;
    return c.ctx && f(c.ctx[R], c.ctx[R] = N) && (!c.skip_bound && c.bound[R] && c.bound[R](N), D && kn(t, R)), A;
  }) : [], c.update(), D = !0, ot(c.before_update), c.fragment = a ? a(c.ctx) : !1, e.target) {
    if (e.hydrate) {
      const R = bn(e.target);
      c.fragment && c.fragment.l(R), R.forEach(se);
    } else
      c.fragment && c.fragment.c();
    e.intro && pn(t.$$.fragment), Bn(t, e.target, e.anchor), gn();
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
    Ln(this, 1), this.$destroy = it;
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
    p: it,
    d(n) {
      n && se(e);
    }
  };
}
function Xn(t) {
  let e, n, a, f, l, r, g, _, c, D, R, A, C, N, P, z, x, V, v, p, h, m, w, I, L, B, X, M, te, De, U, ne, j, Ve, Ue, re, fe, K, _e, Ee, Te, Be, J, he, ve, ge, je, We, at, le, q, pe, ye, Le, ue, me, He, F, Ke, qe, Z, Ne, be, xe, Pe, st, Ye, Je, u, O, $, ke, Qe, _t, rt, ht, Ze, ft, tt, ut, nt, Ct, Me, ie, vt, zt, Ge, oe, gt, It, pt, $e, ee, Et, Xe, ae, yt, Bt, Ae, Ft, Se = [], Oe = /* @__PURE__ */ new Map(), y, k, d, Q = we(
    /*teamOptions*/
    t[9]
  ), Re = [];
  for (let T = 0; T < Q.length; T += 1)
    Re[T] = Zt(Qt(t, Q, T));
  let mt = we(
    /*shiftOptions*/
    t[8]
  ), Ce = [];
  for (let T = 0; T < mt.length; T += 1)
    Ce[T] = $t(Jt(t, mt, T));
  let ze = (
    /*offsetY*/
    t[13] > 0 && en(t)
  ), ct = we(
    /*visibleRows*/
    t[14]
  );
  const Pt = (T) => (
    /*row*/
    T[67].id
  );
  for (let T = 0; T < ct.length; T += 1) {
    let H = Ht(t, ct, T), E = Pt(H);
    Oe.set(E, Se[T] = fn(E, H));
  }
  let Fe = null;
  ct.length || (Fe = tn());
  let Ie = (
    /*paddingBottom*/
    t[12] > 0 && un(t)
  );
  return {
    c() {
      e = s("div"), n = s("div"), a = s("label"), f = ce(`Search
          `), l = s("input"), r = S(), g = s("label"), _ = ce(`Role
          `), c = s("select"), D = s("option"), D.textContent = "All", R = s("option"), R.textContent = "STSO", A = s("option"), A.textContent = "LTSO", C = s("option"), C.textContent = "TSO (FT/PT)", N = S(), P = s("label"), z = ce(`Team
          `), x = s("select"), V = s("option"), V.textContent = "All", v = s("option"), v.textContent = "Unassigned";
      for (let T = 0; T < Re.length; T += 1)
        Re[T].c();
      p = S(), h = s("label"), m = ce(`Shift
          `), w = s("select"), I = s("option"), I.textContent = "All shifts";
      for (let T = 0; T < Ce.length; T += 1)
        Ce[T].c();
      L = S(), B = s("label"), X = ce(`Duty
          `), M = s("select"), te = s("option"), te.textContent = "All duties", De = s("option"), De.textContent = "BAG", U = s("option"), U.textContent = "PAX", ne = s("option"), ne.textContent = "DFO", j = s("option"), j.textContent = "TRAINING", Ve = s("option"), Ve.textContent = "OFF / RDO", Ue = S(), re = s("label"), fe = ce(`On Day
          `), K = s("select"), _e = s("option"), _e.textContent = "Any day", Ee = s("option"), Ee.textContent = "Sun", Te = s("option"), Te.textContent = "Mon", Be = s("option"), Be.textContent = "Tue", J = s("option"), J.textContent = "Wed", he = s("option"), he.textContent = "Thu", ve = s("option"), ve.textContent = "Fri", ge = s("option"), ge.textContent = "Sat", je = S(), We = s("label"), at = ce(`Sex
          `), le = s("select"), q = s("option"), q.textContent = "All", pe = s("option"), pe.textContent = "M", ye = s("option"), ye.textContent = "F", Le = S(), ue = s("div"), me = s("table"), He = s("thead"), F = s("tr"), Ke = s("th"), Ke.textContent = `Team${/*sortIndicator*/
      t[23]("team")}`, qe = S(), Z = s("th"), Z.textContent = `Line${/*sortIndicator*/
      t[23]("line")}`, Ne = S(), be = s("th"), be.textContent = `Shift${/*sortIndicator*/
      t[23]("shift")}`, xe = S(), Pe = s("th"), Pe.textContent = `Start${/*sortIndicator*/
      t[23]("start")}`, st = S(), Ye = s("th"), Ye.textContent = "End", Je = S(), u = s("th"), u.textContent = `Position${/*sortIndicator*/
      t[23]("role")}`, O = S(), $ = s("th"), $.textContent = "Emp", ke = S(), Qe = s("th"), Qe.textContent = "Sex", _t = S(), rt = s("th"), rt.textContent = "Duty", ht = S(), Ze = s("th"), Ze.textContent = "Cert", ft = S(), tt = s("th"), tt.textContent = "RDOs", ut = S(), nt = s("th"), nt.textContent = "Paid", Ct = S(), Me = s("th"), Me.textContent = "Sun", ie = S(), vt = s("th"), vt.textContent = "Mon", zt = S(), Ge = s("th"), Ge.textContent = "Tue", oe = S(), gt = s("th"), gt.textContent = "Wed", It = S(), pt = s("th"), pt.textContent = "Thu", $e = S(), ee = s("th"), ee.textContent = "Fri", Et = S(), Xe = s("th"), Xe.textContent = "Sat", ae = S(), yt = s("th"), yt.textContent = "Hrs", Bt = S(), Ae = s("tbody"), ze && ze.c(), Ft = S();
      for (let T = 0; T < Se.length; T += 1)
        Se[T].c();
      Fe && Fe.c(), y = S(), Ie && Ie.c(), o(l, "type", "text"), o(l, "class", "filter-input search-input svelte-5zofx6"), o(l, "placeholder", "Search line code..."), o(a, "class", "svelte-5zofx6"), D.__value = "ALL", b(D, D.__value), R.__value = "STSO", b(R, R.__value), A.__value = "LTSO", b(A, A.__value), C.__value = "TSO", b(C, C.__value), o(c, "class", "filter-select svelte-5zofx6"), /*filterRole*/
      t[0] === void 0 && et(() => (
        /*select0_change_handler*/
        t[41].call(c)
      )), o(g, "class", "svelte-5zofx6"), V.__value = "", b(V, V.__value), v.__value = "__none__", b(v, v.__value), o(x, "class", "filter-select svelte-5zofx6"), /*filterTeam*/
      t[2] === void 0 && et(() => (
        /*select1_change_handler*/
        t[42].call(x)
      )), o(P, "class", "svelte-5zofx6"), I.__value = "", b(I, I.__value), o(w, "class", "filter-select svelte-5zofx6"), /*filterShift*/
      t[1] === void 0 && et(() => (
        /*select2_change_handler*/
        t[43].call(w)
      )), o(h, "class", "svelte-5zofx6"), te.__value = "", b(te, te.__value), De.__value = "BAG", b(De, De.__value), U.__value = "PAX", b(U, U.__value), ne.__value = "DFO", b(ne, ne.__value), j.__value = "TRAINING", b(j, j.__value), Ve.__value = "OFF", b(Ve, Ve.__value), o(M, "class", "filter-select svelte-5zofx6"), /*filterDuty*/
      t[4] === void 0 && et(() => (
        /*select3_change_handler*/
        t[44].call(M)
      )), o(B, "class", "svelte-5zofx6"), _e.__value = "", b(_e, _e.__value), Ee.__value = "0", b(Ee, Ee.__value), Te.__value = "1", b(Te, Te.__value), Be.__value = "2", b(Be, Be.__value), J.__value = "3", b(J, J.__value), he.__value = "4", b(he, he.__value), ve.__value = "5", b(ve, ve.__value), ge.__value = "6", b(ge, ge.__value), o(K, "class", "filter-select svelte-5zofx6"), /*filterDay*/
      t[5] === void 0 && et(() => (
        /*select4_change_handler*/
        t[45].call(K)
      )), o(re, "class", "svelte-5zofx6"), q.__value = "", b(q, q.__value), pe.__value = "M", b(pe, pe.__value), ye.__value = "F", b(ye, ye.__value), o(le, "class", "filter-select svelte-5zofx6"), /*filterSex*/
      t[3] === void 0 && et(() => (
        /*select5_change_handler*/
        t[46].call(le)
      )), o(We, "class", "svelte-5zofx6"), o(n, "class", "filter-controls svelte-5zofx6"), o(e, "class", "lines-table-header-controls svelte-5zofx6"), o(Ke, "class", "sortable col-team svelte-5zofx6"), o(Z, "class", "sortable col-line svelte-5zofx6"), o(be, "class", "sortable col-shift svelte-5zofx6"), o(Pe, "class", "sortable col-time svelte-5zofx6"), o(Ye, "class", "col-time svelte-5zofx6"), o(u, "class", "sortable col-pos svelte-5zofx6"), o($, "class", "col-sm svelte-5zofx6"), o(Qe, "class", "col-sm svelte-5zofx6"), o(rt, "class", "col-duty svelte-5zofx6"), o(Ze, "class", "col-sm svelte-5zofx6"), o(tt, "class", "col-rdos svelte-5zofx6"), o(nt, "class", "col-sm svelte-5zofx6"), o(Me, "class", "col-day svelte-5zofx6"), o(vt, "class", "col-day svelte-5zofx6"), o(Ge, "class", "col-day svelte-5zofx6"), o(gt, "class", "col-day svelte-5zofx6"), o(pt, "class", "col-day svelte-5zofx6"), o(ee, "class", "col-day svelte-5zofx6"), o(Xe, "class", "col-day svelte-5zofx6"), o(yt, "class", "col-sm svelte-5zofx6"), o(F, "class", "svelte-5zofx6"), o(me, "class", "data-table lines-editable svelte-5zofx6"), o(ue, "class", "lines-virtual-root svelte-5zofx6");
    },
    m(T, H) {
      de(T, e, H), i(e, n), i(n, a), i(a, f), i(a, l), b(
        l,
        /*searchCode*/
        t[6]
      ), i(n, r), i(n, g), i(g, _), i(g, c), i(c, D), i(c, R), i(c, A), i(c, C), W(
        c,
        /*filterRole*/
        t[0],
        !0
      ), i(n, N), i(n, P), i(P, z), i(P, x), i(x, V), i(x, v);
      for (let E = 0; E < Re.length; E += 1)
        Re[E] && Re[E].m(x, null);
      W(
        x,
        /*filterTeam*/
        t[2],
        !0
      ), i(n, p), i(n, h), i(h, m), i(h, w), i(w, I);
      for (let E = 0; E < Ce.length; E += 1)
        Ce[E] && Ce[E].m(w, null);
      W(
        w,
        /*filterShift*/
        t[1],
        !0
      ), i(n, L), i(n, B), i(B, X), i(B, M), i(M, te), i(M, De), i(M, U), i(M, ne), i(M, j), i(M, Ve), W(
        M,
        /*filterDuty*/
        t[4],
        !0
      ), i(n, Ue), i(n, re), i(re, fe), i(re, K), i(K, _e), i(K, Ee), i(K, Te), i(K, Be), i(K, J), i(K, he), i(K, ve), i(K, ge), W(
        K,
        /*filterDay*/
        t[5],
        !0
      ), i(n, je), i(n, We), i(We, at), i(We, le), i(le, q), i(le, pe), i(le, ye), W(
        le,
        /*filterSex*/
        t[3],
        !0
      ), de(T, Le, H), de(T, ue, H), i(ue, me), i(me, He), i(He, F), i(F, Ke), i(F, qe), i(F, Z), i(F, Ne), i(F, be), i(F, xe), i(F, Pe), i(F, st), i(F, Ye), i(F, Je), i(F, u), i(F, O), i(F, $), i(F, ke), i(F, Qe), i(F, _t), i(F, rt), i(F, ht), i(F, Ze), i(F, ft), i(F, tt), i(F, ut), i(F, nt), i(F, Ct), i(F, Me), i(F, ie), i(F, vt), i(F, zt), i(F, Ge), i(F, oe), i(F, gt), i(F, It), i(F, pt), i(F, $e), i(F, ee), i(F, Et), i(F, Xe), i(F, ae), i(F, yt), i(me, Bt), i(me, Ae), ze && ze.m(Ae, null), i(Ae, Ft);
      for (let E = 0; E < Se.length; E += 1)
        Se[E] && Se[E].m(Ae, null);
      Fe && Fe.m(Ae, null), i(Ae, y), Ie && Ie.m(Ae, null), t[65](ue), k || (d = [
        G(
          l,
          "input",
          /*input_input_handler*/
          t[40]
        ),
        G(
          l,
          "input",
          /*handleFilterChange*/
          t[22]
        ),
        G(
          c,
          "change",
          /*select0_change_handler*/
          t[41]
        ),
        G(
          c,
          "change",
          /*handleFilterChange*/
          t[22]
        ),
        G(
          x,
          "change",
          /*select1_change_handler*/
          t[42]
        ),
        G(
          x,
          "change",
          /*handleFilterChange*/
          t[22]
        ),
        G(
          w,
          "change",
          /*select2_change_handler*/
          t[43]
        ),
        G(
          w,
          "change",
          /*handleFilterChange*/
          t[22]
        ),
        G(
          M,
          "change",
          /*select3_change_handler*/
          t[44]
        ),
        G(
          M,
          "change",
          /*handleFilterChange*/
          t[22]
        ),
        G(
          K,
          "change",
          /*select4_change_handler*/
          t[45]
        ),
        G(
          K,
          "change",
          /*handleFilterChange*/
          t[22]
        ),
        G(
          le,
          "change",
          /*select5_change_handler*/
          t[46]
        ),
        G(
          le,
          "change",
          /*handleFilterChange*/
          t[22]
        ),
        G(
          Ke,
          "click",
          /*click_handler*/
          t[47]
        ),
        G(
          Z,
          "click",
          /*click_handler_1*/
          t[48]
        ),
        G(
          be,
          "click",
          /*click_handler_2*/
          t[49]
        ),
        G(
          Pe,
          "click",
          /*click_handler_3*/
          t[50]
        ),
        G(
          u,
          "click",
          /*click_handler_4*/
          t[51]
        ),
        G(
          ue,
          "scroll",
          /*handleScroll*/
          t[24]
        )
      ], k = !0);
    },
    p(T, H) {
      if (H[0] & /*searchCode*/
      64 && l.value !== /*searchCode*/
      T[6] && b(
        l,
        /*searchCode*/
        T[6]
      ), H[0] & /*filterRole*/
      1 && W(
        c,
        /*filterRole*/
        T[0]
      ), H[0] & /*teamOptions*/
      512) {
        Q = we(
          /*teamOptions*/
          T[9]
        );
        let E;
        for (E = 0; E < Q.length; E += 1) {
          const At = Qt(T, Q, E);
          Re[E] ? Re[E].p(At, H) : (Re[E] = Zt(At), Re[E].c(), Re[E].m(x, null));
        }
        for (; E < Re.length; E += 1)
          Re[E].d(1);
        Re.length = Q.length;
      }
      if (H[0] & /*filterTeam, teamOptions*/
      516 && W(
        x,
        /*filterTeam*/
        T[2]
      ), H[0] & /*shiftOptions*/
      256) {
        mt = we(
          /*shiftOptions*/
          T[8]
        );
        let E;
        for (E = 0; E < mt.length; E += 1) {
          const At = Jt(T, mt, E);
          Ce[E] ? Ce[E].p(At, H) : (Ce[E] = $t(At), Ce[E].c(), Ce[E].m(w, null));
        }
        for (; E < Ce.length; E += 1)
          Ce[E].d(1);
        Ce.length = mt.length;
      }
      H[0] & /*filterShift, shiftOptions*/
      258 && W(
        w,
        /*filterShift*/
        T[1]
      ), H[0] & /*filterDuty*/
      16 && W(
        M,
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
      T[13] > 0 ? ze ? ze.p(T, H) : (ze = en(T), ze.c(), ze.m(Ae, Ft)) : ze && (ze.d(1), ze = null), H[0] & /*visibleRows, dayStyle, emitDayTime, emitDayDuty, emitEdit, BASE_EMPS, BASE_POSITIONS, shiftOptions, teamOptions*/
      2081536 && (ct = we(
        /*visibleRows*/
        T[14]
      ), Se = En(Se, H, Pt, 1, T, ct, Oe, Ae, In, fn, y, Ht), !ct.length && Fe ? Fe.p(T, H) : ct.length ? Fe && (Fe.d(1), Fe = null) : (Fe = tn(), Fe.c(), Fe.m(Ae, y))), /*paddingBottom*/
      T[12] > 0 ? Ie ? Ie.p(T, H) : (Ie = un(T), Ie.c(), Ie.m(Ae, null)) : Ie && (Ie.d(1), Ie = null);
    },
    d(T) {
      T && (se(e), se(Le), se(ue)), dt(Re, T), dt(Ce, T), ze && ze.d();
      for (let H = 0; H < Se.length; H += 1)
        Se[H].d();
      Fe && Fe.d(), Ie && Ie.d(), t[65](null), k = !1, ot(d);
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
      512 && f !== (f = /*team*/
      l[82].id) && (e.__value = f, b(e, e.__value));
    },
    d(l) {
      l && se(e);
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
      t[79].id, b(e, e.__value);
    },
    m(l, r) {
      de(l, e, r), i(e, a);
    },
    p(l, r) {
      r[0] & /*shiftOptions*/
      256 && n !== (n = Lt(
        /*shift*/
        l[79]
      ) + "") && lt(a, n), r[0] & /*shiftOptions*/
      256 && f !== (f = /*shift*/
      l[79].id) && (e.__value = f, b(e, e.__value));
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
      e = s("tr"), n = s("td"), o(n, "colspan", "20"), Y(n, "padding", "0"), Y(n, "border", "none"), o(n, "class", "svelte-5zofx6"), Y(
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
      8192 && Y(
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
      e = s("tr"), e.innerHTML = '<td colspan="20" class="muted svelte-5zofx6" style="padding: 1.5rem; text-align: center;">No matching lines found.</td>', o(e, "class", "svelte-5zofx6");
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
  ), a, f;
  return {
    c() {
      e = s("option"), a = ce(n), e.__value = f = /*team*/
      t[82].id, b(e, e.__value), o(e, "class", "svelte-5zofx6");
    },
    m(l, r) {
      de(l, e, r), i(e, a);
    },
    p(l, r) {
      r[0] & /*teamOptions*/
      512 && n !== (n = /*team*/
      (l[82].name ?? /*team*/
      l[82].id) + "") && lt(a, n), r[0] & /*teamOptions*/
      512 && f !== (f = /*team*/
      l[82].id) && (e.__value = f, b(e, e.__value));
    },
    d(l) {
      l && se(e);
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
      t[79].id, b(e, e.__value), o(e, "class", "svelte-5zofx6");
    },
    m(l, r) {
      de(l, e, r), i(e, a);
    },
    p(l, r) {
      r[0] & /*shiftOptions*/
      256 && n !== (n = Lt(
        /*shift*/
        l[79]
      ) + "") && lt(a, n), r[0] & /*shiftOptions*/
      256 && f !== (f = /*shift*/
      l[79].id) && (e.__value = f, b(e, e.__value));
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
  ), a, f;
  return {
    c() {
      e = s("option"), a = ce(n), e.__value = f = /*pos*/
      t[76], b(e, e.__value), o(e, "class", "svelte-5zofx6");
    },
    m(l, r) {
      de(l, e, r), i(e, a);
    },
    p(l, r) {
      r[0] & /*visibleRows*/
      16384 && n !== (n = /*pos*/
      l[76] + "") && lt(a, n), r[0] & /*visibleRows, teamOptions*/
      16896 && f !== (f = /*pos*/
      l[76]) && (e.__value = f, b(e, e.__value));
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
      t[73], b(e, e.__value), o(e, "class", "svelte-5zofx6");
    },
    m(f, l) {
      de(f, e, l), i(e, a);
    },
    p: it,
    d(f) {
      f && se(e);
    }
  };
}
function sn(t) {
  let e, n, a, f, l, r, g, _, c, D;
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
      e = s("div"), n = s("input"), f = S(), l = s("span"), l.textContent = "–", r = S(), g = s("input"), o(n, "type", "time"), o(n, "class", "day-time-input svelte-5zofx6"), n.value = a = /*row*/
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
    m(C, N) {
      de(C, e, N), i(e, n), i(e, f), i(e, l), i(e, r), i(e, g), c || (D = [
        G(n, "change", R),
        G(g, "change", A)
      ], c = !0);
    },
    p(C, N) {
      t = C, N[0] & /*visibleRows, teamOptions*/
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
    d(C) {
      C && se(e), c = !1, ot(D);
    }
  };
}
function rn(t) {
  let e, n, a, f, l, r, g, _, c, D, R, A, C, N;
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
  let z = (
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
      e = s("td"), n = s("div"), a = s("select"), f = s("option"), f.textContent = "PAX", l = s("option"), l.textContent = "BAG", r = s("option"), r.textContent = "DFO", g = s("option"), g.textContent = "Training", _ = s("option"), _.textContent = "OFF", D = S(), z && z.c(), f.__value = "PAX", b(f, f.__value), o(f, "class", "svelte-5zofx6"), l.__value = "BAG", b(l, l.__value), o(l, "class", "svelte-5zofx6"), r.__value = "DFO", b(r, r.__value), o(r, "class", "svelte-5zofx6"), g.__value = "TRAINING", b(g, g.__value), o(g, "class", "svelte-5zofx6"), _.__value = "OFF", b(_, _.__value), o(_, "class", "svelte-5zofx6"), o(a, "class", "day-duty-select svelte-5zofx6"), o(n, "class", "day-cell-inner svelte-5zofx6"), o(e, "class", R = Gt(_n(
        /*row*/
        t[67]?.dayDuties?.[
          /*i*/
          t[70]
        ] ?? /*row*/
        t[67]?.days?.[
          /*i*/
          t[70]
        ]
      )) + " svelte-5zofx6"), o(e, "style", A = /*dayStyle*/
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
      ), i(n, D), z && z.m(n, null), C || (N = G(a, "change", P), C = !0);
    },
    p(x, V) {
      t = x, V[0] & /*visibleRows, teamOptions*/
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
      ] !== "RDO" ? z ? z.p(t, V) : (z = sn(t), z.c(), z.m(n, null)) : z && (z.d(1), z = null), V[0] & /*visibleRows, teamOptions*/
      16896 && R !== (R = Gt(_n(
        /*row*/
        t[67]?.dayDuties?.[
          /*i*/
          t[70]
        ] ?? /*row*/
        t[67]?.days?.[
          /*i*/
          t[70]
        ]
      )) + " svelte-5zofx6") && o(e, "class", R), V[0] & /*visibleRows, teamOptions*/
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
    d(x) {
      x && se(e), z && z.d(), C = !1, N();
    }
  };
}
function fn(t, e) {
  let n, a, f, l, r, g, _, c, D, R, A, C, N, P, z, x, V, v, p, h, m, w, I, L, B, X, M, te, De, U, ne, j, Ve, Ue, re, fe, K, _e, Ee, Te, Be, J, he, ve, ge, je, We, at, le, q, pe, ye, Le, ue, me, He, F, Ke, qe, Z, Ne, be, xe, Pe, st, Ye, Je, u = (
    /*row*/
    (e[67]?.rdos ?? "—") + ""
  ), O, $, ke, Qe = (
    /*row*/
    (e[67]?.paid ?? "") + ""
  ), _t, rt, ht, Ze, ft = (
    /*row*/
    (e[67]?.hours ?? "") + ""
  ), tt, ut, nt, Ct, Me = we(
    /*teamOptions*/
    e[9]
  ), ie = [];
  for (let y = 0; y < Me.length; y += 1)
    ie[y] = nn(Yt(e, Me, y));
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
  function zt(...y) {
    return (
      /*change_handler_1*/
      e[53](
        /*row*/
        e[67],
        ...y
      )
    );
  }
  let Ge = we(
    /*shiftOptions*/
    e[8]
  ), oe = [];
  for (let y = 0; y < Ge.length; y += 1)
    oe[y] = ln(qt(e, Ge, y));
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
  function It(...y) {
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
    ee[y] = on(jt(e, $e, y));
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
  let Xe = we(
    /*BASE_EMPS*/
    e[16]
  ), ae = [];
  for (let y = 0; y < Xe.length; y += 1)
    ae[y] = an(Ut(e, Xe, y));
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
  function Bt(...y) {
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
    Oe[y] = rn(Kt(e, Se, y));
  return {
    key: t,
    first: null,
    c() {
      n = s("tr"), a = s("td"), f = s("select"), l = s("option"), l.textContent = "—";
      for (let y = 0; y < ie.length; y += 1)
        ie[y].c();
      _ = S(), c = s("td"), D = s("input"), C = S(), N = s("td"), P = s("select"), z = s("option"), z.textContent = "—";
      for (let y = 0; y < oe.length; y += 1)
        oe[y].c();
      v = S(), p = s("td"), h = s("input"), I = S(), L = s("td"), B = s("input"), te = S(), De = s("td"), U = s("select"), ne = s("option"), ne.textContent = "—";
      for (let y = 0; y < ee.length; y += 1)
        ee[y].c();
      Ue = S(), re = s("td"), fe = s("select"), K = s("option"), K.textContent = "—";
      for (let y = 0; y < ae.length; y += 1)
        ae[y].c();
      Te = S(), Be = s("td"), J = s("select"), he = s("option"), he.textContent = "—", ve = s("option"), ve.textContent = "M", ge = s("option"), ge.textContent = "F", at = S(), le = s("td"), q = s("select"), pe = s("option"), pe.textContent = "—", ye = s("option"), ye.textContent = "DFO", Le = s("option"), Le.textContent = "BAG", ue = s("option"), ue.textContent = "PAX", me = s("option"), me.textContent = "TRAINING", Ke = S(), qe = s("td"), Z = s("select"), Ne = s("option"), Ne.textContent = "—", be = s("option"), be.textContent = "A", xe = s("option"), xe.textContent = "B", Ye = S(), Je = s("td"), O = ce(u), $ = S(), ke = s("td"), _t = ce(Qe), rt = S();
      for (let y = 0; y < 7; y += 1)
        Oe[y].c();
      ht = S(), Ze = s("td"), tt = ce(ft), l.__value = "", b(l, l.__value), o(l, "class", "svelte-5zofx6"), o(f, "class", "line-edit svelte-5zofx6"), o(f, "data-field", "team"), o(f, "data-line-id", r = /*row*/
      e[67]?.id), o(a, "class", "svelte-5zofx6"), o(D, "type", "text"), o(D, "class", "line-edit line-code-input svelte-5zofx6"), o(D, "data-field", "lineCode"), o(D, "data-line-id", R = /*row*/
      e[67]?.id), D.value = A = /*row*/
      e[67]?.line ?? "", o(c, "class", "svelte-5zofx6"), z.__value = "", b(z, z.__value), o(z, "class", "svelte-5zofx6"), o(P, "class", "line-edit svelte-5zofx6"), o(P, "data-field", "shift"), o(P, "data-line-id", x = /*row*/
      e[67]?.id), o(N, "class", "svelte-5zofx6"), o(h, "type", "time"), o(h, "class", "line-edit line-time-input svelte-5zofx6"), o(h, "data-field", "start"), o(h, "data-line-id", m = /*row*/
      e[67]?.id), h.value = w = /*row*/
      e[67]?.start ?? "", o(p, "class", "svelte-5zofx6"), o(B, "type", "time"), o(B, "class", "line-edit line-time-input svelte-5zofx6"), o(B, "data-field", "end"), o(B, "data-line-id", X = /*row*/
      e[67]?.id), B.value = M = /*row*/
      e[67]?.end ?? "", o(L, "class", "svelte-5zofx6"), ne.__value = "", b(ne, ne.__value), o(ne, "class", "svelte-5zofx6"), o(U, "class", "line-edit svelte-5zofx6"), o(U, "data-field", "position"), o(U, "data-line-id", j = /*row*/
      e[67]?.id), o(De, "class", "svelte-5zofx6"), K.__value = "", b(K, K.__value), o(K, "class", "svelte-5zofx6"), o(fe, "class", "line-edit svelte-5zofx6"), o(fe, "data-field", "emp"), o(fe, "data-line-id", _e = /*row*/
      e[67]?.id), o(re, "class", "svelte-5zofx6"), he.__value = "", b(he, he.__value), o(he, "class", "svelte-5zofx6"), ve.__value = "M", b(ve, ve.__value), o(ve, "class", "svelte-5zofx6"), ge.__value = "F", b(ge, ge.__value), o(ge, "class", "svelte-5zofx6"), o(J, "class", "line-edit svelte-5zofx6"), o(J, "data-field", "sex"), o(J, "data-line-id", je = /*row*/
      e[67]?.id), o(Be, "class", "svelte-5zofx6"), pe.__value = "", b(pe, pe.__value), o(pe, "class", "svelte-5zofx6"), ye.__value = "DFO", b(ye, ye.__value), o(ye, "class", "svelte-5zofx6"), Le.__value = "BAG", b(Le, Le.__value), o(Le, "class", "svelte-5zofx6"), ue.__value = "PAX", b(ue, ue.__value), o(ue, "class", "svelte-5zofx6"), me.__value = "TRAINING", b(me, me.__value), o(me, "class", "svelte-5zofx6"), o(q, "class", "line-edit svelte-5zofx6"), o(q, "data-field", "function"), o(q, "data-line-id", He = /*row*/
      e[67]?.id), o(le, "class", "svelte-5zofx6"), Ne.__value = "", b(Ne, Ne.__value), o(Ne, "class", "svelte-5zofx6"), be.__value = "A", b(be, be.__value), o(be, "class", "svelte-5zofx6"), xe.__value = "B", b(xe, xe.__value), o(xe, "class", "svelte-5zofx6"), o(Z, "class", "line-edit svelte-5zofx6"), o(Z, "data-field", "certPool"), o(Z, "data-line-id", Pe = /*row*/
      e[67]?.id), o(qe, "class", "svelte-5zofx6"), o(Je, "class", "line-rdo-cell svelte-5zofx6"), o(ke, "class", "line-center svelte-5zofx6"), o(Ze, "class", "line-hours svelte-5zofx6"), o(n, "data-line-row", ut = /*row*/
      e[67]?.id), Y(n, "height", bt + "px"), o(n, "class", "svelte-5zofx6"), this.first = n;
    },
    m(y, k) {
      de(y, n, k), i(n, a), i(a, f), i(f, l);
      for (let d = 0; d < ie.length; d += 1)
        ie[d] && ie[d].m(f, null);
      W(
        f,
        /*row*/
        e[67]?.teamId ?? ""
      ), i(n, _), i(n, c), i(c, D), i(n, C), i(n, N), i(N, P), i(P, z);
      for (let d = 0; d < oe.length; d += 1)
        oe[d] && oe[d].m(P, null);
      W(
        P,
        /*row*/
        e[67]?.shiftId ?? ""
      ), i(n, v), i(n, p), i(p, h), i(n, I), i(n, L), i(L, B), i(n, te), i(n, De), i(De, U), i(U, ne);
      for (let d = 0; d < ee.length; d += 1)
        ee[d] && ee[d].m(U, null);
      W(
        U,
        /*row*/
        e[67]?.position ?? ""
      ), i(n, Ue), i(n, re), i(re, fe), i(fe, K);
      for (let d = 0; d < ae.length; d += 1)
        ae[d] && ae[d].m(fe, null);
      W(
        fe,
        /*row*/
        e[67]?.emp ?? ""
      ), i(n, Te), i(n, Be), i(Be, J), i(J, he), i(J, ve), i(J, ge), W(
        J,
        /*row*/
        e[67]?.sex ?? ""
      ), i(n, at), i(n, le), i(le, q), i(q, pe), i(q, ye), i(q, Le), i(q, ue), i(q, me), W(
        q,
        /*row*/
        e[67]?.function ?? ""
      ), i(n, Ke), i(n, qe), i(qe, Z), i(Z, Ne), i(Z, be), i(Z, xe), W(
        Z,
        /*row*/
        e[67]?.certPool ?? ""
      ), i(n, Ye), i(n, Je), i(Je, O), i(n, $), i(n, ke), i(ke, _t), i(n, rt);
      for (let d = 0; d < 7; d += 1)
        Oe[d] && Oe[d].m(n, null);
      i(n, ht), i(n, Ze), i(Ze, tt), nt || (Ct = [
        G(f, "change", vt),
        G(D, "change", zt),
        G(P, "change", gt),
        G(h, "change", It),
        G(B, "change", pt),
        G(U, "change", Et),
        G(fe, "change", yt),
        G(J, "change", Bt),
        G(q, "change", Ae),
        G(Z, "change", Ft)
      ], nt = !0);
    },
    p(y, k) {
      if (e = y, k[0] & /*teamOptions*/
      512) {
        Me = we(
          /*teamOptions*/
          e[9]
        );
        let d;
        for (d = 0; d < Me.length; d += 1) {
          const Q = Yt(e, Me, d);
          ie[d] ? ie[d].p(Q, k) : (ie[d] = nn(Q), ie[d].c(), ie[d].m(f, null));
        }
        for (; d < ie.length; d += 1)
          ie[d].d(1);
        ie.length = Me.length;
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
      16896 && R !== (R = /*row*/
      e[67]?.id) && o(D, "data-line-id", R), k[0] & /*visibleRows, teamOptions*/
      16896 && A !== (A = /*row*/
      e[67]?.line ?? "") && D.value !== A && (D.value = A), k[0] & /*shiftOptions*/
      256) {
        Ge = we(
          /*shiftOptions*/
          e[8]
        );
        let d;
        for (d = 0; d < Ge.length; d += 1) {
          const Q = qt(e, Ge, d);
          oe[d] ? oe[d].p(Q, k) : (oe[d] = ln(Q), oe[d].c(), oe[d].m(P, null));
        }
        for (; d < oe.length; d += 1)
          oe[d].d(1);
        oe.length = Ge.length;
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
      e[67]?.id) && o(B, "data-line-id", X), k[0] & /*visibleRows, teamOptions*/
      16896 && M !== (M = /*row*/
      e[67]?.end ?? "") && B.value !== M && (B.value = M), k[0] & /*BASE_POSITIONS, visibleRows*/
      49152) {
        $e = we(dn(
          /*BASE_POSITIONS*/
          e[15],
          /*row*/
          e[67]?.position
        ));
        let d;
        for (d = 0; d < $e.length; d += 1) {
          const Q = jt(e, $e, d);
          ee[d] ? ee[d].p(Q, k) : (ee[d] = on(Q), ee[d].c(), ee[d].m(U, null));
        }
        for (; d < ee.length; d += 1)
          ee[d].d(1);
        ee.length = $e.length;
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
        Xe = we(
          /*BASE_EMPS*/
          e[16]
        );
        let d;
        for (d = 0; d < Xe.length; d += 1) {
          const Q = Ut(e, Xe, d);
          ae[d] ? ae[d].p(Q, k) : (ae[d] = an(Q), ae[d].c(), ae[d].m(fe, null));
        }
        for (; d < ae.length; d += 1)
          ae[d].d(1);
        ae.length = Xe.length;
      }
      if (k[0] & /*visibleRows, teamOptions*/
      16896 && _e !== (_e = /*row*/
      e[67]?.id) && o(fe, "data-line-id", _e), k[0] & /*visibleRows, teamOptions*/
      16896 && Ee !== (Ee = /*row*/
      e[67]?.emp ?? "") && W(
        fe,
        /*row*/
        e[67]?.emp ?? ""
      ), k[0] & /*visibleRows, teamOptions*/
      16896 && je !== (je = /*row*/
      e[67]?.id) && o(J, "data-line-id", je), k[0] & /*visibleRows, teamOptions*/
      16896 && We !== (We = /*row*/
      e[67]?.sex ?? "") && W(
        J,
        /*row*/
        e[67]?.sex ?? ""
      ), k[0] & /*visibleRows, teamOptions*/
      16896 && He !== (He = /*row*/
      e[67]?.id) && o(q, "data-line-id", He), k[0] & /*visibleRows, teamOptions*/
      16896 && F !== (F = /*row*/
      e[67]?.function ?? "") && W(
        q,
        /*row*/
        e[67]?.function ?? ""
      ), k[0] & /*visibleRows, teamOptions*/
      16896 && Pe !== (Pe = /*row*/
      e[67]?.id) && o(Z, "data-line-id", Pe), k[0] & /*visibleRows, teamOptions*/
      16896 && st !== (st = /*row*/
      e[67]?.certPool ?? "") && W(
        Z,
        /*row*/
        e[67]?.certPool ?? ""
      ), k[0] & /*visibleRows*/
      16384 && u !== (u = /*row*/
      (e[67]?.rdos ?? "—") + "") && lt(O, u), k[0] & /*visibleRows*/
      16384 && Qe !== (Qe = /*row*/
      (e[67]?.paid ?? "") + "") && lt(_t, Qe), k[0] & /*visibleRows, dayStyle, emitDayTime, emitDayDuty*/
      1720320) {
        Se = we([0, 1, 2, 3, 4, 5, 6]);
        let d;
        for (d = 0; d < 7; d += 1) {
          const Q = Kt(e, Se, d);
          Oe[d] ? Oe[d].p(Q, k) : (Oe[d] = rn(Q), Oe[d].c(), Oe[d].m(n, ht));
        }
        for (; d < 7; d += 1)
          Oe[d].d(1);
      }
      k[0] & /*visibleRows*/
      16384 && ft !== (ft = /*row*/
      (e[67]?.hours ?? "") + "") && lt(tt, ft), k[0] & /*visibleRows, teamOptions*/
      16896 && ut !== (ut = /*row*/
      e[67]?.id) && o(n, "data-line-row", ut);
    },
    d(y) {
      y && se(n), dt(ie, y), dt(oe, y), dt(ee, y), dt(ae, y), dt(Oe, y), nt = !1, ot(Ct);
    }
  };
}
function un(t) {
  let e, n;
  return {
    c() {
      e = s("tr"), n = s("td"), o(n, "colspan", "20"), Y(n, "padding", "0"), Y(n, "border", "none"), o(n, "class", "svelte-5zofx6"), Y(
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
      4096 && Y(
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
      e = s("div"), f.c(), o(e, "class", "lines-table-root svelte-5zofx6"), Y(e, "min-height", "min(70vh, 720px)"), Y(e, "height", "min(70vh, 720px)"), Y(e, "width", "100%"), Y(
        e,
        "--export-rdo",
        /*exportStyle*/
        t[10]?.rdo || "#000000"
      ), Y(
        e,
        "--export-bag",
        /*exportStyle*/
        t[10]?.bag || "#F4B4B4"
      ), Y(
        e,
        "--export-dfo",
        /*exportStyle*/
        t[10]?.dfo || "#FFF3A8"
      ), Y(
        e,
        "--export-pax",
        /*exportStyle*/
        t[10]?.pax || "#A0C4FF"
      ), Y(
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
      1024 && Y(
        e,
        "--export-rdo",
        /*exportStyle*/
        l[10]?.rdo || "#000000"
      ), r[0] & /*exportStyle*/
      1024 && Y(
        e,
        "--export-bag",
        /*exportStyle*/
        l[10]?.bag || "#F4B4B4"
      ), r[0] & /*exportStyle*/
      1024 && Y(
        e,
        "--export-dfo",
        /*exportStyle*/
        l[10]?.dfo || "#FFF3A8"
      ), r[0] & /*exportStyle*/
      1024 && Y(
        e,
        "--export-pax",
        /*exportStyle*/
        l[10]?.pax || "#A0C4FF"
      ), r[0] & /*exportStyle*/
      1024 && Y(
        e,
        "--export-header",
        /*exportStyle*/
        l[10]?.header || "#1F4E79"
      );
    },
    i: it,
    o: it,
    d(l) {
      l && se(e), f.d();
    }
  };
}
const bt = 42, cn = 8;
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
  let a, f, l, r, g, _, c, { rows: D = [] } = e, { mode: R = "svelte" } = e, { shiftOptions: A = [] } = e, { teamOptions: C = [] } = e, { exportStyle: N = Wt() } = e, { onInlineEdit: P = null } = e, { onDayToggle: z = null } = e, { onDayDutyEdit: x = null } = e, { onDayTimeEdit: V = null } = e, { onSort: v = null } = e, { onFilter: p = null } = e, { currentSortBy: h = "role" } = e, { currentSortDir: m = "asc" } = e, { filterRole: w = "ALL" } = e, { filterShift: I = "" } = e, { filterTeam: L = "" } = e, { filterSex: B = "" } = e, { filterDuty: X = "" } = e, { filterDay: M = "" } = e, { searchCode: te = "" } = e;
  const De = ["TSO", "LTSO", "STSO"], U = ["FT", "PT"];
  function ne(u) {
    const O = yn(u);
    if (!O) return;
    const ke = (N || Wt())[O];
    if (ke)
      return "background:" + ke + ";color:" + Mn(ke) + ";";
  }
  function j(u, O, $) {
    P?.({ lineId: u, field: O, value: $ });
  }
  function Ve(u, O, $) {
    x?.({ lineId: u, dayIndex: O, duty: $ });
  }
  function Ue(u, O, $, ke) {
    V?.({ lineId: u, dayIndex: O, field: $, value: ke });
  }
  function re(u) {
    let O = "asc";
    h === u && (O = m === "asc" ? "desc" : "asc"), v?.({ sortBy: u, sortDir: O });
  }
  function fe() {
    p?.({
      filterRole: w,
      filterShift: I,
      filterTeam: L,
      filterSex: B,
      filterDuty: X,
      filterDay: M,
      searchCode: te
    });
  }
  function K(u) {
    return h !== u ? "" : m === "asc" ? " ▲" : " ▼";
  }
  let _e = 0, Ee = 600, Te;
  function Be(u) {
    n(34, _e = u.target.scrollTop);
  }
  Cn(() => {
    Te && n(35, Ee = Te.clientHeight || 600);
  });
  function J() {
    te = this.value, n(6, te);
  }
  function he() {
    w = wt(this), n(0, w);
  }
  function ve() {
    L = wt(this), n(2, L), n(9, C);
  }
  function ge() {
    I = wt(this), n(1, I), n(8, A);
  }
  function je() {
    X = wt(this), n(4, X);
  }
  function We() {
    M = wt(this), n(5, M);
  }
  function at() {
    B = wt(this), n(3, B);
  }
  const le = () => re("team"), q = () => re("line"), pe = () => re("shift"), ye = () => re("start"), Le = () => re("role"), ue = (u, O) => j(u?.id, "team", O.target.value), me = (u, O) => j(u?.id, "lineCode", O.target.value), He = (u, O) => j(u?.id, "shift", O.target.value), F = (u, O) => j(u?.id, "start", O.target.value), Ke = (u, O) => j(u?.id, "end", O.target.value), qe = (u, O) => j(u?.id, "position", O.target.value), Z = (u, O) => j(u?.id, "emp", O.target.value), Ne = (u, O) => j(u?.id, "sex", O.target.value), be = (u, O) => j(u?.id, "function", O.target.value), xe = (u, O) => j(u?.id, "certPool", O.target.value), Pe = (u, O, $) => Ve(u?.id, O, $.target.value), st = (u, O, $) => Ue(u?.id, O, "start", $.target.value), Ye = (u, O, $) => Ue(u?.id, O, "end", $.target.value);
  function Je(u) {
    Nt[u ? "unshift" : "push"](() => {
      Te = u, n(11, Te);
    });
  }
  return t.$$set = (u) => {
    "rows" in u && n(25, D = u.rows), "mode" in u && n(7, R = u.mode), "shiftOptions" in u && n(8, A = u.shiftOptions), "teamOptions" in u && n(9, C = u.teamOptions), "exportStyle" in u && n(10, N = u.exportStyle), "onInlineEdit" in u && n(26, P = u.onInlineEdit), "onDayToggle" in u && n(27, z = u.onDayToggle), "onDayDutyEdit" in u && n(28, x = u.onDayDutyEdit), "onDayTimeEdit" in u && n(29, V = u.onDayTimeEdit), "onSort" in u && n(30, v = u.onSort), "onFilter" in u && n(31, p = u.onFilter), "currentSortBy" in u && n(32, h = u.currentSortBy), "currentSortDir" in u && n(33, m = u.currentSortDir), "filterRole" in u && n(0, w = u.filterRole), "filterShift" in u && n(1, I = u.filterShift), "filterTeam" in u && n(2, L = u.filterTeam), "filterSex" in u && n(3, B = u.filterSex), "filterDuty" in u && n(4, X = u.filterDuty), "filterDay" in u && n(5, M = u.filterDay), "searchCode" in u && n(6, te = u.searchCode);
  }, t.$$.update = () => {
    t.$$.dirty[0] & /*rows*/
    33554432 && n(39, a = D.length), t.$$.dirty[1] & /*totalRows*/
    256 && n(37, f = a * bt), t.$$.dirty[1] & /*scrollTop*/
    8 && n(38, l = Math.max(0, Math.floor(_e / bt) - cn)), t.$$.dirty[1] & /*totalRows, scrollTop, viewportHeight*/
    280 && n(36, r = Math.min(a, Math.ceil((_e + Ee) / bt) + cn)), t.$$.dirty[0] & /*rows*/
    33554432 | t.$$.dirty[1] & /*startIndex, endIndex*/
    160 && n(14, g = D.slice(l, r)), t.$$.dirty[1] & /*startIndex*/
    128 && n(13, _ = l * bt), t.$$.dirty[1] & /*totalHeight, endIndex*/
    96 && n(12, c = Math.max(0, f - r * bt));
  }, [
    w,
    I,
    L,
    B,
    X,
    M,
    te,
    R,
    A,
    C,
    N,
    Te,
    c,
    _,
    g,
    De,
    U,
    ne,
    j,
    Ve,
    Ue,
    re,
    fe,
    K,
    Be,
    D,
    P,
    z,
    x,
    V,
    v,
    p,
    h,
    m,
    _e,
    Ee,
    r,
    f,
    l,
    a,
    J,
    he,
    ve,
    ge,
    je,
    We,
    at,
    le,
    q,
    pe,
    ye,
    Le,
    ue,
    me,
    He,
    F,
    Ke,
    qe,
    Z,
    Ne,
    be,
    xe,
    Pe,
    st,
    Ye,
    Je
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
  function f(l, r) {
    return r === "TRAINING" ? "TRAINING" : r === "BAG" || r === "PAX" || r === "DFO" ? r : l.isTraining || l.trainingClass || l.empClass === "ESTI" || l.empClass === "MSTI" || l.extraName === "ESTI" || l.extraName === "MSTI" ? "TRAINING" : l.function === "BAG" ? "BAG" : l.function === "DFO" || l.function === "PAX" ? "PAX" : r === "BAG" || r === "PAX" ? r : null;
  }
  t.lineToRowModel = function(l, r, g) {
    if (g = g || {}, !l || !r) return null;
    for (var _ = g.dayNames || ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], c = typeof g.teamResolver == "function" ? g.teamResolver(l.id) : null, D = typeof g.shiftResolver == "function" ? g.shiftResolver(l.shiftId) : null, R = l.shiftName || D && D.name || "", A = l.startTime || (D && D.start ? D.start : ""), C = l.endTime || (D && D.end ? D.end : ""), N = l.shiftLabel || (A && C ? A + "–" + C : A || "WORK"), P = !!(l.isExtra || l.extraPositionId), z = P ? l.position || l.extraName || "TSO" : l.isStso || l.empClass === "STSO" ? "STSO" : l.isLtso || l.empClass === "LTSO" ? "LTSO" : "TSO", x = P ? l.empClass === "PT" ? "PT" : "FT" : z === "STSO" || z === "LTSO" ? "FT" : l.empClass === "PT" ? "PT" : "FT", V = l.paid || 0, v = Array.isArray(r) ? r : r[l.id] || r[String(l.id)] || [], p = [], h = [], m = [], w = [], I = 0, L = 0; L < 7; L++) {
      var B = l.dayTimes && l.dayTimes[String(L)], X = typeof g.effectiveTimesResolver == "function" ? g.effectiveTimesResolver(l.shiftId, L) : null, M = B && B.start || l.startTime || X && X.start || A, te = B && B.end || l.endTime || X && X.end || C;
      m.push(M), w.push(te);
      var De = v[L];
      if (De === "WORK") {
        I += V;
        var U = typeof g.rotationDutyResolver == "function" ? g.rotationDutyResolver(l.id, L) : null, ne = a(l, U, N);
        p.push(ne), h.push(f(l, U) || "PAX");
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
      position: z,
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
      hours: I
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
  function f(g) {
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
        var C = e(D, R), N = C === "BAG" || C === "BAGS", P = C === "DFO", z = "";
        N ? z = " cell-function-duty cell-bag" : P && (z = " cell-function-duty cell-dfo"), c.className = "cell-work cell-toggle" + z, c.textContent = n(D);
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
      c && (c.function = _.value === "DFO" || _.value === "PAX" || _.value === "BAG" ? _.value : "", c.function === "BAG" && a(c), c.function === "DFO" && f(c), t.renderLines ? t.renderLines() : l());
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
    const I = w[p];
    return I === "BAG" ? "BAG" : I === "DFO" ? "DFO" : I === "PAX" ? "PAX" : I === "TRAINING" ? "TRAINING" : null;
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
      var I = !!(p.isExtra || p.extraPositionId), L = String(m ?? "").trim();
      I ? (L && (p.position = L, p.extraName = L), p.isStso = !1, p.isLtso = !1) : e.applyLineEmp && e.applyLineEmp(p, L);
    } else if (h === "shift")
      e.applyLineShift && e.applyLineShift(p, m);
    else if (h === "team")
      e.setLineTeam && e.setLineTeam(v.lineId, m);
    else if (h === "start" || h === "end") {
      var B = String(m || "").trim();
      if (e.isValidTimeText && !e.isValidTimeText(B)) return;
      h === "start" && (p.startTime = B), h === "end" && (p.endTime = B);
      var X = e.getShift ? e.getShift(p.shiftId) : null, M = p.startTime || (X ? X.start : ""), te = p.endTime || (X ? X.end : "");
      p.shiftLabel = (M || "") + "-" + (te || "");
    }
    e.updateStatus && e.updateStatus("Updated " + (p.lineCode || v.lineId)), V(), (h === "emp" || h === "position" || h === "shift" || h === "start" || h === "end") && e.renderCoverageBars && e.renderCoverageBars(), h === "team" && e.renderTeams && e.renderTeams(), window.dispatchEvent(new CustomEvent("lines:coverage-refresh"));
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
    const I = e.state.schedule[m][h] || "RDO", L = p.function === "BAG", B = r(p);
    if (I !== "WORK")
      e.state.schedule[m][h] = "WORK", L ? l(m, h, "BAG") : B ? l(m, h, "PAX") : l(m, h, null);
    else if (L)
      e.state.schedule[m][h] = "RDO", l(m, h, null);
    else if (B) {
      var X = typeof e.getRotationDuty == "function" ? e.getRotationDuty(p.id, h) : f(p.id, h), M = X === "DFO" || X === "PAX" || !X ? "PAX" : X;
      M === "PAX" ? l(m, h, "BAG") : (e.state.schedule[m][h] = "RDO", l(m, h, null));
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
      var I = e.getShift ? e.getShift(p.shiftId) : null, L = p.startTime || (I ? I.start : "08:00"), B = p.endTime || (I ? I.end : "16:30");
      p.dayTimes || (p.dayTimes = {});
      var X = String(h), M = p.dayTimes[X] || { start: L, end: B };
      m === "start" ? p.dayTimes[X] = { start: w, end: M.end } : m === "end" && (p.dayTimes[X] = { start: M.start, end: w }), V(), e.renderCoverageBars && e.renderCoverageBars(), window.dispatchEvent(new CustomEvent("lines:coverage-refresh"));
    }
  }
  function z(v) {
    v && (e.linesView || (e.linesView = {}), v.sortBy && (e.linesView.sortBy = v.sortBy), v.sortDir && (e.linesView.sortDir = v.sortDir), V());
  }
  function x(v) {
    v && (e.linesView || (e.linesView = {}), v.filterRole !== void 0 && (e.linesView.filterRole = v.filterRole), v.filterShift !== void 0 && (e.linesView.filterShift = v.filterShift), v.filterTeam !== void 0 && (e.linesView.filterTeam = v.filterTeam), v.filterSex !== void 0 && (e.linesView.filterSex = v.filterSex), v.filterDuty !== void 0 && (e.linesView.filterDuty = v.filterDuty), v.filterDay !== void 0 && (e.linesView.filterDay = v.filterDay), v.searchCode !== void 0 && (e.linesView.searchCode = v.searchCode), V());
  }
  const V = () => {
    try {
      const v = n._linesTableApp;
      if (v)
        R(v);
      else {
        n.childNodes.length && (n.innerHTML = "");
        const p = g();
        typeof e.applyExportCssVars == "function" && e.applyExportCssVars(), n._linesTableApp = new Kn({
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
            onDayDutyEdit: N,
            onDayTimeEdit: P,
            onSort: z,
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
