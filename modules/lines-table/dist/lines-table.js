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
function s(t) {
  return document.createElement(t);
}
function _e(t) {
  return document.createTextNode(t);
}
function S() {
  return _e(" ");
}
function X(t, e, n, o) {
  return t.addEventListener(e, n, o), () => t.removeEventListener(e, n, o);
}
function a(t, e, n) {
  n == null ? t.removeAttribute(e) : t.getAttribute(e) !== n && t.setAttribute(e, n);
}
function Rn(t) {
  return Array.from(t.childNodes);
}
function lt(t, e) {
  e = "" + e, t.data !== e && (t.data = /** @type {string} */
  e);
}
function R(t, e) {
  t.value = e ?? "";
}
function J(t, e, n, o) {
  n == null ? t.style.removeProperty(e) : t.style.setProperty(e, n, "");
}
function H(t, e, n) {
  for (let o = 0; o < t.options.length; o += 1) {
    const r = t.options[o];
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
function bn() {
  if (!Ot) throw new Error("Function called outside component initialization");
  return Ot;
}
function Cn(t) {
  bn().$$.on_mount.push(t);
}
const Tt = [], Nt = [];
let bt = [];
const Wt = [], Fn = /* @__PURE__ */ Promise.resolve();
let Pt = !1;
function An() {
  Pt || (Pt = !0, Fn.then(gn));
}
function et(t) {
  bt.push(t);
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
    for (let e = 0; e < bt.length; e += 1) {
      const n = bt[e];
      Vt.has(n) || (Vt.add(n), n());
    }
    bt.length = 0;
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
  bt.forEach((o) => t.indexOf(o) === -1 ? e.push(o) : n.push(o)), n.forEach((o) => o()), bt = e;
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
function En(t, e, n, o, r, l, u, g, _, d, D, b) {
  let A = t.length, C = l.length, N = A;
  const M = {};
  for (; N--; ) M[t[N].key] = N;
  const z = [], P = /* @__PURE__ */ new Map(), V = /* @__PURE__ */ new Map(), v = [];
  for (N = C; N--; ) {
    const w = b(r, l, N), I = n(w);
    let L = u.get(I);
    L ? v.push(() => L.p(w, e)) : (L = d(I, w), L.c()), P.set(I, z[N] = L), I in M && V.set(I, Math.abs(N - M[I]));
  }
  const p = /* @__PURE__ */ new Set(), h = /* @__PURE__ */ new Set();
  function y(w) {
    pn(w, 1), w.m(g, D), u.set(w.key, w), D = w.first, C--;
  }
  for (; A && C; ) {
    const w = z[C - 1], I = t[A - 1], L = w.key, B = I.key;
    w === I ? (D = w.first, A--, C--) : P.has(B) ? !u.has(L) || p.has(L) ? y(w) : h.has(B) ? A-- : V.get(L) > V.get(B) ? (h.add(L), y(w)) : (p.add(B), A--) : (_(I, u), A--);
  }
  for (; A--; ) {
    const w = t[A];
    P.has(w.key) || _(w, u);
  }
  for (; C; ) y(z[C - 1]);
  return at(v), z;
}
function Bn(t, e, n) {
  const { fragment: o, after_update: r } = t.$$;
  o && o.m(e, n), et(() => {
    const l = t.$$.on_mount.map(hn).filter(vn);
    t.$$.on_destroy ? t.$$.on_destroy.push(...l) : at(l), t.$$.on_mount = [];
  }), r.forEach(et);
}
function Ln(t, e) {
  const n = t.$$;
  n.fragment !== null && (On(n.after_update), at(n.on_destroy), n.fragment && n.fragment.d(e), n.on_destroy = n.fragment = null, n.ctx = []);
}
function kn(t, e) {
  t.$$.dirty[0] === -1 && (Tt.push(t), An(), t.$$.dirty.fill(0)), t.$$.dirty[e / 31 | 0] |= 1 << e % 31;
}
function Vn(t, e, n, o, r, l, u = null, g = [-1]) {
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
  if (d.ctx = n ? n(t, e.props || {}, (b, A, ...C) => {
    const N = C.length ? C[0] : A;
    return d.ctx && r(d.ctx[b], d.ctx[b] = N) && (!d.skip_bound && d.bound[b] && d.bound[b](N), D && kn(t, b)), A;
  }) : [], d.update(), D = !0, at(d.before_update), d.fragment = o ? o(d.ctx) : !1, e.target) {
    if (e.hydrate) {
      const b = Rn(e.target);
      d.fragment && d.fragment.l(b), b.forEach(ue);
    } else
      d.fragment && d.fragment.c();
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
    const o = this.$$.callbacks[e] || (this.$$.callbacks[e] = []);
    return o.push(n), () => {
      const r = o.indexOf(n);
      r !== -1 && o.splice(r, 1);
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
  var e = Mn(t, "#FFFFFF") || "#FFFFFF", n = e.slice(1), o = parseInt(n.slice(0, 2), 16), r = parseInt(n.slice(2, 4), 16), l = parseInt(n.slice(4, 6), 16), u = (0.299 * o + 0.587 * r + 0.114 * l) / 255;
  return u < 0.45 ? "#FFFFFF" : "#111111";
}
function Kt(t, e, n) {
  const o = t.slice();
  return o[67] = e[n], o;
}
function Ut(t, e, n) {
  const o = t.slice();
  return o[70] = e[n], o;
}
function jt(t, e, n) {
  const o = t.slice();
  return o[73] = e[n], o;
}
function qt(t, e, n) {
  const o = t.slice();
  return o[76] = e[n], o;
}
function Yt(t, e, n) {
  const o = t.slice();
  return o[79] = e[n], o;
}
function Jt(t, e, n) {
  const o = t.slice();
  return o[82] = e[n], o;
}
function Qt(t, e, n) {
  const o = t.slice();
  return o[79] = e[n], o;
}
function Zt(t, e, n) {
  const o = t.slice();
  return o[82] = e[n], o;
}
function Xn(t) {
  let e;
  return {
    c() {
      e = s("div"), e.textContent = "Classic Lines mode active", a(e, "class", "muted");
    },
    m(n, o) {
      he(n, e, o);
    },
    p: it,
    d(n) {
      n && ue(e);
    }
  };
}
function Wn(t) {
  let e, n, o, r, l, u, g, _, d, D, b, A, C, N, M, z, P, V, v, p, h, y, w, I, L, B, W, G, te, Te, j, ie, q, Ve, je, fe, de, U, ne, Re, le, Be, Q, ve, ge, pe, qe, He, ot, ae, Y, me, ye, Le, ce, we, Ke, F, Ue, Ye, x, Ne, be, Pe, Me, st, Je, Qe, f, O, $, ke, Ze, _t, rt, ht, xe, ut, tt, ft, nt, Ct, Ge, oe, vt, zt, Xe, se, gt, It, pt, $e, ee, Et, We, re, mt, Bt, Se, Ft, Oe = [], ze = /* @__PURE__ */ new Map(), m, k, c, Z = De(
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
      e = s("div"), n = s("div"), o = s("label"), r = _e(`Search
          `), l = s("input"), u = S(), g = s("label"), _ = _e(`Role
          `), d = s("select"), D = s("option"), D.textContent = "All", b = s("option"), b.textContent = "STSO", A = s("option"), A.textContent = "LTSO", C = s("option"), C.textContent = "TSO (FT/PT)", N = S(), M = s("label"), z = _e(`Team
          `), P = s("select"), V = s("option"), V.textContent = "All", v = s("option"), v.textContent = "Unassigned";
      for (let T = 0; T < Ce.length; T += 1)
        Ce[T].c();
      p = S(), h = s("label"), y = _e(`Shift
          `), w = s("select"), I = s("option"), I.textContent = "All shifts";
      for (let T = 0; T < Fe.length; T += 1)
        Fe[T].c();
      L = S(), B = s("label"), W = _e(`Duty
          `), G = s("select"), te = s("option"), te.textContent = "All duties", Te = s("option"), Te.textContent = "BAG", j = s("option"), j.textContent = "PAX", ie = s("option"), ie.textContent = "DFO", q = s("option"), q.textContent = "TRAINING", Ve = s("option"), Ve.textContent = "OFF / RDO", je = S(), fe = s("label"), de = _e(`On Day
          `), U = s("select"), ne = s("option"), ne.textContent = "Any day", Re = s("option"), Re.textContent = "Sun", le = s("option"), le.textContent = "Mon", Be = s("option"), Be.textContent = "Tue", Q = s("option"), Q.textContent = "Wed", ve = s("option"), ve.textContent = "Thu", ge = s("option"), ge.textContent = "Fri", pe = s("option"), pe.textContent = "Sat", qe = S(), He = s("label"), ot = _e(`Sex
          `), ae = s("select"), Y = s("option"), Y.textContent = "All", me = s("option"), me.textContent = "M", ye = s("option"), ye.textContent = "F", Le = S(), ce = s("div"), we = s("table"), Ke = s("thead"), F = s("tr"), Ue = s("th"), Ue.textContent = `Team${/*sortIndicator*/
      t[23]("team")}`, Ye = S(), x = s("th"), x.textContent = `Line${/*sortIndicator*/
      t[23]("line")}`, Ne = S(), be = s("th"), be.textContent = `Shift${/*sortIndicator*/
      t[23]("shift")}`, Pe = S(), Me = s("th"), Me.textContent = `Start${/*sortIndicator*/
      t[23]("start")}`, st = S(), Je = s("th"), Je.textContent = "End", Qe = S(), f = s("th"), f.textContent = `Position${/*sortIndicator*/
      t[23]("role")}`, O = S(), $ = s("th"), $.textContent = "Emp", ke = S(), Ze = s("th"), Ze.textContent = "Sex", _t = S(), rt = s("th"), rt.textContent = "Duty", ht = S(), xe = s("th"), xe.textContent = "Cert", ut = S(), tt = s("th"), tt.textContent = "RDOs", ft = S(), nt = s("th"), nt.textContent = "Paid", Ct = S(), Ge = s("th"), Ge.textContent = "Sun", oe = S(), vt = s("th"), vt.textContent = "Mon", zt = S(), Xe = s("th"), Xe.textContent = "Tue", se = S(), gt = s("th"), gt.textContent = "Wed", It = S(), pt = s("th"), pt.textContent = "Thu", $e = S(), ee = s("th"), ee.textContent = "Fri", Et = S(), We = s("th"), We.textContent = "Sat", re = S(), mt = s("th"), mt.textContent = "Hrs", Bt = S(), Se = s("tbody"), Ie && Ie.c(), Ft = S();
      for (let T = 0; T < Oe.length; T += 1)
        Oe[T].c();
      Ae && Ae.c(), m = S(), Ee && Ee.c(), a(l, "type", "text"), a(l, "class", "filter-input search-input svelte-a7gd0z"), a(l, "placeholder", "Search line code..."), a(o, "class", "svelte-a7gd0z"), D.__value = "ALL", R(D, D.__value), b.__value = "STSO", R(b, b.__value), A.__value = "LTSO", R(A, A.__value), C.__value = "TSO", R(C, C.__value), a(d, "class", "filter-select svelte-a7gd0z"), /*filterRole*/
      t[0] === void 0 && et(() => (
        /*select0_change_handler*/
        t[41].call(d)
      )), a(g, "class", "svelte-a7gd0z"), V.__value = "", R(V, V.__value), v.__value = "__none__", R(v, v.__value), a(P, "class", "filter-select svelte-a7gd0z"), /*filterTeam*/
      t[2] === void 0 && et(() => (
        /*select1_change_handler*/
        t[42].call(P)
      )), a(M, "class", "svelte-a7gd0z"), I.__value = "", R(I, I.__value), a(w, "class", "filter-select svelte-a7gd0z"), /*filterShift*/
      t[1] === void 0 && et(() => (
        /*select2_change_handler*/
        t[43].call(w)
      )), a(h, "class", "svelte-a7gd0z"), te.__value = "", R(te, te.__value), Te.__value = "BAG", R(Te, Te.__value), j.__value = "PAX", R(j, j.__value), ie.__value = "DFO", R(ie, ie.__value), q.__value = "TRAINING", R(q, q.__value), Ve.__value = "OFF", R(Ve, Ve.__value), a(G, "class", "filter-select svelte-a7gd0z"), /*filterDuty*/
      t[4] === void 0 && et(() => (
        /*select3_change_handler*/
        t[44].call(G)
      )), a(B, "class", "svelte-a7gd0z"), ne.__value = "", R(ne, ne.__value), Re.__value = "0", R(Re, Re.__value), le.__value = "1", R(le, le.__value), Be.__value = "2", R(Be, Be.__value), Q.__value = "3", R(Q, Q.__value), ve.__value = "4", R(ve, ve.__value), ge.__value = "5", R(ge, ge.__value), pe.__value = "6", R(pe, pe.__value), a(U, "class", "filter-select svelte-a7gd0z"), /*filterDay*/
      t[5] === void 0 && et(() => (
        /*select4_change_handler*/
        t[45].call(U)
      )), a(fe, "class", "svelte-a7gd0z"), Y.__value = "", R(Y, Y.__value), me.__value = "M", R(me, me.__value), ye.__value = "F", R(ye, ye.__value), a(ae, "class", "filter-select svelte-a7gd0z"), /*filterSex*/
      t[3] === void 0 && et(() => (
        /*select5_change_handler*/
        t[46].call(ae)
      )), a(He, "class", "svelte-a7gd0z"), a(n, "class", "filter-controls svelte-a7gd0z"), a(e, "class", "lines-table-header-controls svelte-a7gd0z"), a(Ue, "class", "sortable col-team svelte-a7gd0z"), a(x, "class", "sortable col-line svelte-a7gd0z"), a(be, "class", "sortable col-shift svelte-a7gd0z"), a(Me, "class", "sortable col-time svelte-a7gd0z"), a(Je, "class", "col-time svelte-a7gd0z"), a(f, "class", "sortable col-pos svelte-a7gd0z"), a($, "class", "col-sm svelte-a7gd0z"), a(Ze, "class", "col-sm svelte-a7gd0z"), a(rt, "class", "col-duty svelte-a7gd0z"), a(xe, "class", "col-sm svelte-a7gd0z"), a(tt, "class", "col-rdos svelte-a7gd0z"), a(nt, "class", "col-sm svelte-a7gd0z"), a(Ge, "class", "col-day svelte-a7gd0z"), a(vt, "class", "col-day svelte-a7gd0z"), a(Xe, "class", "col-day svelte-a7gd0z"), a(gt, "class", "col-day svelte-a7gd0z"), a(pt, "class", "col-day svelte-a7gd0z"), a(ee, "class", "col-day svelte-a7gd0z"), a(We, "class", "col-day svelte-a7gd0z"), a(mt, "class", "col-sm svelte-a7gd0z"), a(F, "class", "svelte-a7gd0z"), a(we, "class", "data-table lines-editable svelte-a7gd0z"), a(ce, "class", "lines-virtual-root svelte-a7gd0z");
    },
    m(T, K) {
      he(T, e, K), i(e, n), i(n, o), i(o, r), i(o, l), R(
        l,
        /*searchCode*/
        t[6]
      ), i(n, u), i(n, g), i(g, _), i(g, d), i(d, D), i(d, b), i(d, A), i(d, C), H(
        d,
        /*filterRole*/
        t[0],
        !0
      ), i(n, N), i(n, M), i(M, z), i(M, P), i(P, V), i(P, v);
      for (let E = 0; E < Ce.length; E += 1)
        Ce[E] && Ce[E].m(P, null);
      H(
        P,
        /*filterTeam*/
        t[2],
        !0
      ), i(n, p), i(n, h), i(h, y), i(h, w), i(w, I);
      for (let E = 0; E < Fe.length; E += 1)
        Fe[E] && Fe[E].m(w, null);
      H(
        w,
        /*filterShift*/
        t[1],
        !0
      ), i(n, L), i(n, B), i(B, W), i(B, G), i(G, te), i(G, Te), i(G, j), i(G, ie), i(G, q), i(G, Ve), H(
        G,
        /*filterDuty*/
        t[4],
        !0
      ), i(n, je), i(n, fe), i(fe, de), i(fe, U), i(U, ne), i(U, Re), i(U, le), i(U, Be), i(U, Q), i(U, ve), i(U, ge), i(U, pe), H(
        U,
        /*filterDay*/
        t[5],
        !0
      ), i(n, qe), i(n, He), i(He, ot), i(He, ae), i(ae, Y), i(ae, me), i(ae, ye), H(
        ae,
        /*filterSex*/
        t[3],
        !0
      ), he(T, Le, K), he(T, ce, K), i(ce, we), i(we, Ke), i(Ke, F), i(F, Ue), i(F, Ye), i(F, x), i(F, Ne), i(F, be), i(F, Pe), i(F, Me), i(F, st), i(F, Je), i(F, Qe), i(F, f), i(F, O), i(F, $), i(F, ke), i(F, Ze), i(F, _t), i(F, rt), i(F, ht), i(F, xe), i(F, ut), i(F, tt), i(F, ft), i(F, nt), i(F, Ct), i(F, Ge), i(F, oe), i(F, vt), i(F, zt), i(F, Xe), i(F, se), i(F, gt), i(F, It), i(F, pt), i(F, $e), i(F, ee), i(F, Et), i(F, We), i(F, re), i(F, mt), i(we, Bt), i(we, Se), Ie && Ie.m(Se, null), i(Se, Ft);
      for (let E = 0; E < Oe.length; E += 1)
        Oe[E] && Oe[E].m(Se, null);
      Ae && Ae.m(Se, null), i(Se, m), Ee && Ee.m(Se, null), t[65](ce), k || (c = [
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
          P,
          "change",
          /*select1_change_handler*/
          t[42]
        ),
        X(
          P,
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
          G,
          "change",
          /*select3_change_handler*/
          t[44]
        ),
        X(
          G,
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
          be,
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
      ], k = !0);
    },
    p(T, K) {
      if (K[0] & /*searchCode*/
      64 && l.value !== /*searchCode*/
      T[6] && R(
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
          Ce[E] ? Ce[E].p(At, K) : (Ce[E] = xt(At), Ce[E].c(), Ce[E].m(P, null));
        }
        for (; E < Ce.length; E += 1)
          Ce[E].d(1);
        Ce.length = Z.length;
      }
      if (K[0] & /*filterTeam, teamOptions*/
      516 && H(
        P,
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
        G,
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
      T && (ue(e), ue(Le), ue(ce)), ct(Ce, T), ct(Fe, T), Ie && Ie.d();
      for (let K = 0; K < Oe.length; K += 1)
        Oe[K].d();
      Ae && Ae.d(), Ee && Ee.d(), t[65](null), k = !1, at(c);
    }
  };
}
function xt(t) {
  let e, n = (
    /*team*/
    (t[82].name ?? /*team*/
    t[82].id) + ""
  ), o, r;
  return {
    c() {
      e = s("option"), o = _e(n), e.__value = r = /*team*/
      t[82].id, R(e, e.__value);
    },
    m(l, u) {
      he(l, e, u), i(e, o);
    },
    p(l, u) {
      u[0] & /*teamOptions*/
      512 && n !== (n = /*team*/
      (l[82].name ?? /*team*/
      l[82].id) + "") && lt(o, n), u[0] & /*teamOptions*/
      512 && r !== (r = /*team*/
      l[82].id) && (e.__value = r, R(e, e.__value));
    },
    d(l) {
      l && ue(e);
    }
  };
}
function $t(t) {
  let e, n = Lt(
    /*shift*/
    t[79]
  ) + "", o, r;
  return {
    c() {
      e = s("option"), o = _e(n), e.__value = r = /*shift*/
      t[79].id, R(e, e.__value);
    },
    m(l, u) {
      he(l, e, u), i(e, o);
    },
    p(l, u) {
      u[0] & /*shiftOptions*/
      256 && n !== (n = Lt(
        /*shift*/
        l[79]
      ) + "") && lt(o, n), u[0] & /*shiftOptions*/
      256 && r !== (r = /*shift*/
      l[79].id) && (e.__value = r, R(e, e.__value));
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
      e = s("tr"), n = s("td"), a(n, "colspan", "20"), a(n, "class", "spacer-cell svelte-a7gd0z"), J(
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
    m(o, r) {
      he(o, e, r), i(e, n);
    },
    p(o, r) {
      r[0] & /*offsetY*/
      8192 && J(
        n,
        "height",
        /*offsetY*/
        o[13] + "px"
      ), r[0] & /*offsetY*/
      8192 && J(
        e,
        "height",
        /*offsetY*/
        o[13] + "px"
      );
    },
    d(o) {
      o && ue(e);
    }
  };
}
function tn(t) {
  let e;
  return {
    c() {
      e = s("tr"), e.innerHTML = '<td colspan="20" class="muted svelte-a7gd0z" style="padding: 1.5rem; text-align: center;">No matching lines found.</td>', a(e, "class", "svelte-a7gd0z");
    },
    m(n, o) {
      he(n, e, o);
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
  ), o, r;
  return {
    c() {
      e = s("option"), o = _e(n), e.__value = r = /*team*/
      t[82].id, R(e, e.__value), a(e, "class", "svelte-a7gd0z");
    },
    m(l, u) {
      he(l, e, u), i(e, o);
    },
    p(l, u) {
      u[0] & /*teamOptions*/
      512 && n !== (n = /*team*/
      (l[82].name ?? /*team*/
      l[82].id) + "") && lt(o, n), u[0] & /*teamOptions*/
      512 && r !== (r = /*team*/
      l[82].id) && (e.__value = r, R(e, e.__value));
    },
    d(l) {
      l && ue(e);
    }
  };
}
function ln(t) {
  let e, n = Lt(
    /*shift*/
    t[79]
  ) + "", o, r;
  return {
    c() {
      e = s("option"), o = _e(n), e.__value = r = /*shift*/
      t[79].id, R(e, e.__value), a(e, "class", "svelte-a7gd0z");
    },
    m(l, u) {
      he(l, e, u), i(e, o);
    },
    p(l, u) {
      u[0] & /*shiftOptions*/
      256 && n !== (n = Lt(
        /*shift*/
        l[79]
      ) + "") && lt(o, n), u[0] & /*shiftOptions*/
      256 && r !== (r = /*shift*/
      l[79].id) && (e.__value = r, R(e, e.__value));
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
  ), o, r;
  return {
    c() {
      e = s("option"), o = _e(n), e.__value = r = /*pos*/
      t[76], R(e, e.__value), a(e, "class", "svelte-a7gd0z");
    },
    m(l, u) {
      he(l, e, u), i(e, o);
    },
    p(l, u) {
      u[0] & /*visibleRows*/
      16384 && n !== (n = /*pos*/
      l[76] + "") && lt(o, n), u[0] & /*visibleRows, teamOptions*/
      16896 && r !== (r = /*pos*/
      l[76]) && (e.__value = r, R(e, e.__value));
    },
    d(l) {
      l && ue(e);
    }
  };
}
function on(t) {
  let e, n = (
    /*emp*/
    t[73] + ""
  ), o;
  return {
    c() {
      e = s("option"), o = _e(n), e.__value = /*emp*/
      t[73], R(e, e.__value), a(e, "class", "svelte-a7gd0z");
    },
    m(r, l) {
      he(r, e, l), i(e, o);
    },
    p: it,
    d(r) {
      r && ue(e);
    }
  };
}
function sn(t) {
  let e, n, o, r, l, u, g, _, d, D;
  function b(...C) {
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
      e = s("div"), n = s("input"), r = S(), l = s("span"), l.textContent = "–", u = S(), g = s("input"), a(n, "type", "time"), a(n, "class", "day-time-input svelte-a7gd0z"), n.value = o = /*row*/
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
        X(n, "change", b),
        X(g, "change", A)
      ], d = !0);
    },
    p(C, N) {
      t = C, N[0] & /*visibleRows, teamOptions*/
      16896 && o !== (o = /*row*/
      t[67]?.dayStarts?.[
        /*i*/
        t[70]
      ] || /*row*/
      t[67]?.start || "") && n.value !== o && (n.value = o), N[0] & /*visibleRows, teamOptions*/
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
  let e, n, o, r, l, u, g, _, d, D, b, A, C, N;
  function M(...P) {
    return (
      /*change_handler_10*/
      t[62](
        /*row*/
        t[67],
        /*i*/
        t[70],
        ...P
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
      e = s("td"), n = s("div"), o = s("select"), r = s("option"), r.textContent = "PAX", l = s("option"), l.textContent = "BAG", u = s("option"), u.textContent = "DFO", g = s("option"), g.textContent = "Training", _ = s("option"), _.textContent = "OFF", D = S(), z && z.c(), r.__value = "PAX", R(r, r.__value), a(r, "class", "svelte-a7gd0z"), l.__value = "BAG", R(l, l.__value), a(l, "class", "svelte-a7gd0z"), u.__value = "DFO", R(u, u.__value), a(u, "class", "svelte-a7gd0z"), g.__value = "TRAINING", R(g, g.__value), a(g, "class", "svelte-a7gd0z"), _.__value = "OFF", R(_, _.__value), a(_, "class", "svelte-a7gd0z"), a(o, "class", "day-duty-select svelte-a7gd0z"), a(n, "class", "day-cell-inner svelte-a7gd0z"), a(e, "class", b = Xt(_n(
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
    m(P, V) {
      he(P, e, V), i(e, n), i(n, o), i(o, r), i(o, l), i(o, u), i(o, g), i(o, _), H(
        o,
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
      ), i(n, D), z && z.m(n, null), C || (N = X(o, "change", M), C = !0);
    },
    p(P, V) {
      t = P, V[0] & /*visibleRows, teamOptions*/
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
        o,
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
      16896 && b !== (b = Xt(_n(
        /*row*/
        t[67]?.dayDuties?.[
          /*i*/
          t[70]
        ] ?? /*row*/
        t[67]?.days?.[
          /*i*/
          t[70]
        ]
      )) + " svelte-a7gd0z") && a(e, "class", b), V[0] & /*visibleRows, teamOptions*/
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
    d(P) {
      P && ue(e), z && z.d(), C = !1, N();
    }
  };
}
function un(t, e) {
  let n, o, r, l, u, g, _, d, D, b, A, C, N, M, z, P, V, v, p, h, y, w, I, L, B, W, G, te, Te, j, ie, q, Ve, je, fe, de, U, ne, Re, le, Be, Q, ve, ge, pe, qe, He, ot, ae, Y, me, ye, Le, ce, we, Ke, F, Ue, Ye, x, Ne, be, Pe, Me, st, Je, Qe, f = (
    /*row*/
    (e[67]?.rdos ?? "—") + ""
  ), O, $, ke, Ze = (
    /*row*/
    (e[67]?.paid ?? "") + ""
  ), _t, rt, ht, xe, ut = (
    /*row*/
    (e[67]?.hours ?? "") + ""
  ), tt, ft, nt, Ct, Ge = De(
    /*teamOptions*/
    e[9]
  ), oe = [];
  for (let m = 0; m < Ge.length; m += 1)
    oe[m] = nn(Jt(e, Ge, m));
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
  ), se = [];
  for (let m = 0; m < Xe.length; m += 1)
    se[m] = ln(Yt(e, Xe, m));
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
    re[m] = on(jt(e, We, m));
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
  function Bt(...m) {
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
      n = s("tr"), o = s("td"), r = s("select"), l = s("option"), l.textContent = "—";
      for (let m = 0; m < oe.length; m += 1)
        oe[m].c();
      _ = S(), d = s("td"), D = s("input"), C = S(), N = s("td"), M = s("select"), z = s("option"), z.textContent = "—";
      for (let m = 0; m < se.length; m += 1)
        se[m].c();
      v = S(), p = s("td"), h = s("input"), I = S(), L = s("td"), B = s("input"), te = S(), Te = s("td"), j = s("select"), ie = s("option"), ie.textContent = "—";
      for (let m = 0; m < ee.length; m += 1)
        ee[m].c();
      je = S(), fe = s("td"), de = s("select"), U = s("option"), U.textContent = "—";
      for (let m = 0; m < re.length; m += 1)
        re[m].c();
      le = S(), Be = s("td"), Q = s("select"), ve = s("option"), ve.textContent = "—", ge = s("option"), ge.textContent = "M", pe = s("option"), pe.textContent = "F", ot = S(), ae = s("td"), Y = s("select"), me = s("option"), me.textContent = "—", ye = s("option"), ye.textContent = "DFO", Le = s("option"), Le.textContent = "BAG", ce = s("option"), ce.textContent = "PAX", we = s("option"), we.textContent = "TRAINING", Ue = S(), Ye = s("td"), x = s("select"), Ne = s("option"), Ne.textContent = "—", be = s("option"), be.textContent = "A", Pe = s("option"), Pe.textContent = "B", Je = S(), Qe = s("td"), O = _e(f), $ = S(), ke = s("td"), _t = _e(Ze), rt = S();
      for (let m = 0; m < 7; m += 1)
        ze[m].c();
      ht = S(), xe = s("td"), tt = _e(ut), l.__value = "", R(l, l.__value), a(l, "class", "svelte-a7gd0z"), a(r, "class", "line-edit svelte-a7gd0z"), a(r, "data-field", "team"), a(r, "data-line-id", u = /*row*/
      e[67]?.id), a(o, "class", "svelte-a7gd0z"), a(D, "type", "text"), a(D, "class", "line-edit line-code-input svelte-a7gd0z"), a(D, "data-field", "lineCode"), a(D, "data-line-id", b = /*row*/
      e[67]?.id), D.value = A = /*row*/
      e[67]?.line ?? "", a(d, "class", "svelte-a7gd0z"), z.__value = "", R(z, z.__value), a(z, "class", "svelte-a7gd0z"), a(M, "class", "line-edit svelte-a7gd0z"), a(M, "data-field", "shift"), a(M, "data-line-id", P = /*row*/
      e[67]?.id), a(N, "class", "svelte-a7gd0z"), a(h, "type", "time"), a(h, "class", "line-edit line-time-input svelte-a7gd0z"), a(h, "data-field", "start"), a(h, "data-line-id", y = /*row*/
      e[67]?.id), h.value = w = /*row*/
      e[67]?.start ?? "", a(p, "class", "svelte-a7gd0z"), a(B, "type", "time"), a(B, "class", "line-edit line-time-input svelte-a7gd0z"), a(B, "data-field", "end"), a(B, "data-line-id", W = /*row*/
      e[67]?.id), B.value = G = /*row*/
      e[67]?.end ?? "", a(L, "class", "svelte-a7gd0z"), ie.__value = "", R(ie, ie.__value), a(ie, "class", "svelte-a7gd0z"), a(j, "class", "line-edit svelte-a7gd0z"), a(j, "data-field", "position"), a(j, "data-line-id", q = /*row*/
      e[67]?.id), a(Te, "class", "svelte-a7gd0z"), U.__value = "", R(U, U.__value), a(U, "class", "svelte-a7gd0z"), a(de, "class", "line-edit svelte-a7gd0z"), a(de, "data-field", "emp"), a(de, "data-line-id", ne = /*row*/
      e[67]?.id), a(fe, "class", "svelte-a7gd0z"), ve.__value = "", R(ve, ve.__value), a(ve, "class", "svelte-a7gd0z"), ge.__value = "M", R(ge, ge.__value), a(ge, "class", "svelte-a7gd0z"), pe.__value = "F", R(pe, pe.__value), a(pe, "class", "svelte-a7gd0z"), a(Q, "class", "line-edit svelte-a7gd0z"), a(Q, "data-field", "sex"), a(Q, "data-line-id", qe = /*row*/
      e[67]?.id), a(Be, "class", "svelte-a7gd0z"), me.__value = "", R(me, me.__value), a(me, "class", "svelte-a7gd0z"), ye.__value = "DFO", R(ye, ye.__value), a(ye, "class", "svelte-a7gd0z"), Le.__value = "BAG", R(Le, Le.__value), a(Le, "class", "svelte-a7gd0z"), ce.__value = "PAX", R(ce, ce.__value), a(ce, "class", "svelte-a7gd0z"), we.__value = "TRAINING", R(we, we.__value), a(we, "class", "svelte-a7gd0z"), a(Y, "class", "line-edit svelte-a7gd0z"), a(Y, "data-field", "function"), a(Y, "data-line-id", Ke = /*row*/
      e[67]?.id), a(ae, "class", "svelte-a7gd0z"), Ne.__value = "", R(Ne, Ne.__value), a(Ne, "class", "svelte-a7gd0z"), be.__value = "A", R(be, be.__value), a(be, "class", "svelte-a7gd0z"), Pe.__value = "B", R(Pe, Pe.__value), a(Pe, "class", "svelte-a7gd0z"), a(x, "class", "line-edit svelte-a7gd0z"), a(x, "data-field", "certPool"), a(x, "data-line-id", Me = /*row*/
      e[67]?.id), a(Ye, "class", "svelte-a7gd0z"), a(Qe, "class", "line-rdo-cell svelte-a7gd0z"), a(ke, "class", "line-center svelte-a7gd0z"), a(xe, "class", "line-hours svelte-a7gd0z"), a(n, "data-line-row", ft = /*row*/
      e[67]?.id), J(n, "height", Rt + "px"), a(n, "class", "svelte-a7gd0z"), this.first = n;
    },
    m(m, k) {
      he(m, n, k), i(n, o), i(o, r), i(r, l);
      for (let c = 0; c < oe.length; c += 1)
        oe[c] && oe[c].m(r, null);
      H(
        r,
        /*row*/
        e[67]?.teamId ?? ""
      ), i(n, _), i(n, d), i(d, D), i(n, C), i(n, N), i(N, M), i(M, z);
      for (let c = 0; c < se.length; c += 1)
        se[c] && se[c].m(M, null);
      H(
        M,
        /*row*/
        e[67]?.shiftId ?? ""
      ), i(n, v), i(n, p), i(p, h), i(n, I), i(n, L), i(L, B), i(n, te), i(n, Te), i(Te, j), i(j, ie);
      for (let c = 0; c < ee.length; c += 1)
        ee[c] && ee[c].m(j, null);
      H(
        j,
        /*row*/
        e[67]?.position ?? ""
      ), i(n, je), i(n, fe), i(fe, de), i(de, U);
      for (let c = 0; c < re.length; c += 1)
        re[c] && re[c].m(de, null);
      H(
        de,
        /*row*/
        e[67]?.emp ?? ""
      ), i(n, le), i(n, Be), i(Be, Q), i(Q, ve), i(Q, ge), i(Q, pe), H(
        Q,
        /*row*/
        e[67]?.sex ?? ""
      ), i(n, ot), i(n, ae), i(ae, Y), i(Y, me), i(Y, ye), i(Y, Le), i(Y, ce), i(Y, we), H(
        Y,
        /*row*/
        e[67]?.function ?? ""
      ), i(n, Ue), i(n, Ye), i(Ye, x), i(x, Ne), i(x, be), i(x, Pe), H(
        x,
        /*row*/
        e[67]?.certPool ?? ""
      ), i(n, Je), i(n, Qe), i(Qe, O), i(n, $), i(n, ke), i(ke, _t), i(n, rt);
      for (let c = 0; c < 7; c += 1)
        ze[c] && ze[c].m(n, null);
      i(n, ht), i(n, xe), i(xe, tt), nt || (Ct = [
        X(r, "change", vt),
        X(D, "change", zt),
        X(M, "change", gt),
        X(h, "change", It),
        X(B, "change", pt),
        X(j, "change", Et),
        X(de, "change", mt),
        X(Q, "change", Bt),
        X(Y, "change", Se),
        X(x, "change", Ft)
      ], nt = !0);
    },
    p(m, k) {
      if (e = m, k[0] & /*teamOptions*/
      512) {
        Ge = De(
          /*teamOptions*/
          e[9]
        );
        let c;
        for (c = 0; c < Ge.length; c += 1) {
          const Z = Jt(e, Ge, c);
          oe[c] ? oe[c].p(Z, k) : (oe[c] = nn(Z), oe[c].c(), oe[c].m(r, null));
        }
        for (; c < oe.length; c += 1)
          oe[c].d(1);
        oe.length = Ge.length;
      }
      if (k[0] & /*visibleRows, teamOptions*/
      16896 && u !== (u = /*row*/
      e[67]?.id) && a(r, "data-line-id", u), k[0] & /*visibleRows, teamOptions*/
      16896 && g !== (g = /*row*/
      e[67]?.teamId ?? "") && H(
        r,
        /*row*/
        e[67]?.teamId ?? ""
      ), k[0] & /*visibleRows, teamOptions*/
      16896 && b !== (b = /*row*/
      e[67]?.id) && a(D, "data-line-id", b), k[0] & /*visibleRows, teamOptions*/
      16896 && A !== (A = /*row*/
      e[67]?.line ?? "") && D.value !== A && (D.value = A), k[0] & /*shiftOptions*/
      256) {
        Xe = De(
          /*shiftOptions*/
          e[8]
        );
        let c;
        for (c = 0; c < Xe.length; c += 1) {
          const Z = Yt(e, Xe, c);
          se[c] ? se[c].p(Z, k) : (se[c] = ln(Z), se[c].c(), se[c].m(M, null));
        }
        for (; c < se.length; c += 1)
          se[c].d(1);
        se.length = Xe.length;
      }
      if (k[0] & /*visibleRows, teamOptions*/
      16896 && P !== (P = /*row*/
      e[67]?.id) && a(M, "data-line-id", P), k[0] & /*visibleRows, teamOptions*/
      16896 && V !== (V = /*row*/
      e[67]?.shiftId ?? "") && H(
        M,
        /*row*/
        e[67]?.shiftId ?? ""
      ), k[0] & /*visibleRows, teamOptions*/
      16896 && y !== (y = /*row*/
      e[67]?.id) && a(h, "data-line-id", y), k[0] & /*visibleRows, teamOptions*/
      16896 && w !== (w = /*row*/
      e[67]?.start ?? "") && h.value !== w && (h.value = w), k[0] & /*visibleRows, teamOptions*/
      16896 && W !== (W = /*row*/
      e[67]?.id) && a(B, "data-line-id", W), k[0] & /*visibleRows, teamOptions*/
      16896 && G !== (G = /*row*/
      e[67]?.end ?? "") && B.value !== G && (B.value = G), k[0] & /*BASE_POSITIONS, visibleRows*/
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
          ee[c] ? ee[c].p(Z, k) : (ee[c] = an(Z), ee[c].c(), ee[c].m(j, null));
        }
        for (; c < ee.length; c += 1)
          ee[c].d(1);
        ee.length = $e.length;
      }
      if (k[0] & /*visibleRows, teamOptions*/
      16896 && q !== (q = /*row*/
      e[67]?.id) && a(j, "data-line-id", q), k[0] & /*visibleRows, teamOptions*/
      16896 && Ve !== (Ve = /*row*/
      e[67]?.position ?? "") && H(
        j,
        /*row*/
        e[67]?.position ?? ""
      ), k[0] & /*BASE_EMPS*/
      65536) {
        We = De(
          /*BASE_EMPS*/
          e[16]
        );
        let c;
        for (c = 0; c < We.length; c += 1) {
          const Z = jt(e, We, c);
          re[c] ? re[c].p(Z, k) : (re[c] = on(Z), re[c].c(), re[c].m(de, null));
        }
        for (; c < re.length; c += 1)
          re[c].d(1);
        re.length = We.length;
      }
      if (k[0] & /*visibleRows, teamOptions*/
      16896 && ne !== (ne = /*row*/
      e[67]?.id) && a(de, "data-line-id", ne), k[0] & /*visibleRows, teamOptions*/
      16896 && Re !== (Re = /*row*/
      e[67]?.emp ?? "") && H(
        de,
        /*row*/
        e[67]?.emp ?? ""
      ), k[0] & /*visibleRows, teamOptions*/
      16896 && qe !== (qe = /*row*/
      e[67]?.id) && a(Q, "data-line-id", qe), k[0] & /*visibleRows, teamOptions*/
      16896 && He !== (He = /*row*/
      e[67]?.sex ?? "") && H(
        Q,
        /*row*/
        e[67]?.sex ?? ""
      ), k[0] & /*visibleRows, teamOptions*/
      16896 && Ke !== (Ke = /*row*/
      e[67]?.id) && a(Y, "data-line-id", Ke), k[0] & /*visibleRows, teamOptions*/
      16896 && F !== (F = /*row*/
      e[67]?.function ?? "") && H(
        Y,
        /*row*/
        e[67]?.function ?? ""
      ), k[0] & /*visibleRows, teamOptions*/
      16896 && Me !== (Me = /*row*/
      e[67]?.id) && a(x, "data-line-id", Me), k[0] & /*visibleRows, teamOptions*/
      16896 && st !== (st = /*row*/
      e[67]?.certPool ?? "") && H(
        x,
        /*row*/
        e[67]?.certPool ?? ""
      ), k[0] & /*visibleRows*/
      16384 && f !== (f = /*row*/
      (e[67]?.rdos ?? "—") + "") && lt(O, f), k[0] & /*visibleRows*/
      16384 && Ze !== (Ze = /*row*/
      (e[67]?.paid ?? "") + "") && lt(_t, Ze), k[0] & /*visibleRows, dayStyle, emitDayTime, emitDayDuty*/
      1720320) {
        Oe = De([0, 1, 2, 3, 4, 5, 6]);
        let c;
        for (c = 0; c < 7; c += 1) {
          const Z = Ut(e, Oe, c);
          ze[c] ? ze[c].p(Z, k) : (ze[c] = rn(Z), ze[c].c(), ze[c].m(n, ht));
        }
        for (; c < 7; c += 1)
          ze[c].d(1);
      }
      k[0] & /*visibleRows*/
      16384 && ut !== (ut = /*row*/
      (e[67]?.hours ?? "") + "") && lt(tt, ut), k[0] & /*visibleRows, teamOptions*/
      16896 && ft !== (ft = /*row*/
      e[67]?.id) && a(n, "data-line-row", ft);
    },
    d(m) {
      m && ue(n), ct(oe, m), ct(se, m), ct(ee, m), ct(re, m), ct(ze, m), nt = !1, at(Ct);
    }
  };
}
function fn(t) {
  let e, n;
  return {
    c() {
      e = s("tr"), n = s("td"), a(n, "colspan", "20"), a(n, "class", "spacer-cell svelte-a7gd0z"), J(
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
    m(o, r) {
      he(o, e, r), i(e, n);
    },
    p(o, r) {
      r[0] & /*paddingBottom*/
      4096 && J(
        n,
        "height",
        /*paddingBottom*/
        o[12] + "px"
      ), r[0] & /*paddingBottom*/
      4096 && J(
        e,
        "height",
        /*paddingBottom*/
        o[12] + "px"
      );
    },
    d(o) {
      o && ue(e);
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
  let o = n(t), r = o(t);
  return {
    c() {
      e = s("div"), r.c(), a(e, "class", "lines-table-root svelte-a7gd0z"), J(e, "min-height", "min(70vh, 720px)"), J(e, "height", "min(70vh, 720px)"), J(e, "width", "100%"), J(
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
      o === (o = n(l)) && r ? r.p(l, u) : (r.d(1), r = o(l), r && (r.c(), r.m(e, null))), u[0] & /*exportStyle*/
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
const Rt = 42, dn = 8;
function cn(t, e) {
  const n = e == null ? "" : String(e);
  return !n || t.indexOf(n) >= 0 ? t : t.concat([n]);
}
function Lt(t) {
  if (!t) return "";
  const e = t.name || t.id || "";
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
  let o, r, l, u, g, _, d, { rows: D = [] } = e, { mode: b = "svelte" } = e, { shiftOptions: A = [] } = e, { teamOptions: C = [] } = e, { exportStyle: N = Ht() } = e, { onInlineEdit: M = null } = e, { onDayToggle: z = null } = e, { onDayDutyEdit: P = null } = e, { onDayTimeEdit: V = null } = e, { onSort: v = null } = e, { onFilter: p = null } = e, { currentSortBy: h = "role" } = e, { currentSortDir: y = "asc" } = e, { filterRole: w = "ALL" } = e, { filterShift: I = "" } = e, { filterTeam: L = "" } = e, { filterSex: B = "" } = e, { filterDuty: W = "" } = e, { filterDay: G = "" } = e, { searchCode: te = "" } = e;
  const Te = ["TSO", "LTSO", "STSO"], j = ["FT", "PT"];
  function ie(f) {
    const O = mn(f);
    if (!O) return;
    const ke = (N || Ht())[O];
    if (ke)
      return "background:" + ke + ";color:" + Gn(ke) + ";";
  }
  function q(f, O, $) {
    M?.({ lineId: f, field: O, value: $ });
  }
  function Ve(f, O, $) {
    P?.({ lineId: f, dayIndex: O, duty: $ });
  }
  function je(f, O, $, ke) {
    V?.({ lineId: f, dayIndex: O, field: $, value: ke });
  }
  function fe(f) {
    let O = "asc";
    h === f && (O = y === "asc" ? "desc" : "asc"), v?.({ sortBy: f, sortDir: O });
  }
  function de() {
    p?.({
      filterRole: w,
      filterShift: I,
      filterTeam: L,
      filterSex: B,
      filterDuty: W,
      filterDay: G,
      searchCode: te
    });
  }
  function U(f) {
    return h !== f ? "" : y === "asc" ? " ▲" : " ▼";
  }
  let ne = 0, Re = 600, le;
  function Be(f) {
    n(34, ne = f.target.scrollTop);
  }
  Cn(() => {
    le && n(35, Re = le.clientHeight || 600);
  });
  function Q() {
    te = this.value, n(6, te);
  }
  function ve() {
    w = wt(this), n(0, w);
  }
  function ge() {
    L = wt(this), n(2, L), n(9, C);
  }
  function pe() {
    I = wt(this), n(1, I), n(8, A);
  }
  function qe() {
    W = wt(this), n(4, W);
  }
  function He() {
    G = wt(this), n(5, G);
  }
  function ot() {
    B = wt(this), n(3, B);
  }
  const ae = () => fe("team"), Y = () => fe("line"), me = () => fe("shift"), ye = () => fe("start"), Le = () => fe("role"), ce = (f, O) => q(f?.id, "team", O.target.value), we = (f, O) => q(f?.id, "lineCode", O.target.value), Ke = (f, O) => q(f?.id, "shift", O.target.value), F = (f, O) => q(f?.id, "start", O.target.value), Ue = (f, O) => q(f?.id, "end", O.target.value), Ye = (f, O) => q(f?.id, "position", O.target.value), x = (f, O) => q(f?.id, "emp", O.target.value), Ne = (f, O) => q(f?.id, "sex", O.target.value), be = (f, O) => q(f?.id, "function", O.target.value), Pe = (f, O) => q(f?.id, "certPool", O.target.value), Me = (f, O, $) => Ve(f?.id, O, $.target.value), st = (f, O, $) => je(f?.id, O, "start", $.target.value), Je = (f, O, $) => je(f?.id, O, "end", $.target.value);
  function Qe(f) {
    Nt[f ? "unshift" : "push"](() => {
      le = f, n(11, le), n(37, r), n(34, ne), n(35, Re), n(39, o), n(25, D);
    });
  }
  return t.$$set = (f) => {
    "rows" in f && n(25, D = f.rows), "mode" in f && n(7, b = f.mode), "shiftOptions" in f && n(8, A = f.shiftOptions), "teamOptions" in f && n(9, C = f.teamOptions), "exportStyle" in f && n(10, N = f.exportStyle), "onInlineEdit" in f && n(26, M = f.onInlineEdit), "onDayToggle" in f && n(27, z = f.onDayToggle), "onDayDutyEdit" in f && n(28, P = f.onDayDutyEdit), "onDayTimeEdit" in f && n(29, V = f.onDayTimeEdit), "onSort" in f && n(30, v = f.onSort), "onFilter" in f && n(31, p = f.onFilter), "currentSortBy" in f && n(32, h = f.currentSortBy), "currentSortDir" in f && n(33, y = f.currentSortDir), "filterRole" in f && n(0, w = f.filterRole), "filterShift" in f && n(1, I = f.filterShift), "filterTeam" in f && n(2, L = f.filterTeam), "filterSex" in f && n(3, B = f.filterSex), "filterDuty" in f && n(4, W = f.filterDuty), "filterDay" in f && n(5, G = f.filterDay), "searchCode" in f && n(6, te = f.searchCode);
  }, t.$$.update = () => {
    t.$$.dirty[0] & /*rows*/
    33554432 && n(39, o = D.length), t.$$.dirty[1] & /*totalRows*/
    256 && n(37, r = o * Rt), t.$$.dirty[0] & /*scrollContainer*/
    2048 | t.$$.dirty[1] & /*totalHeight, scrollTop, viewportHeight*/
    88 && le && r >= 0 && ne > r && (n(11, le.scrollTop = Math.max(0, r - Re), le), n(34, ne = le.scrollTop)), t.$$.dirty[1] & /*scrollTop*/
    8 && n(38, l = Math.max(0, Math.floor(ne / Rt) - dn)), t.$$.dirty[1] & /*totalRows, scrollTop, viewportHeight*/
    280 && n(36, u = Math.min(o, Math.ceil((ne + Re) / Rt) + dn)), t.$$.dirty[0] & /*rows*/
    33554432 | t.$$.dirty[1] & /*startIndex, endIndex*/
    160 && n(14, g = D.slice(l, u)), t.$$.dirty[1] & /*startIndex*/
    128 && n(13, _ = l * Rt), t.$$.dirty[1] & /*totalHeight, endIndex*/
    96 && n(12, d = Math.max(0, r - u * Rt));
  }, [
    w,
    I,
    L,
    B,
    W,
    G,
    te,
    b,
    A,
    C,
    N,
    le,
    d,
    _,
    g,
    Te,
    j,
    ie,
    q,
    Ve,
    je,
    fe,
    de,
    U,
    Be,
    D,
    M,
    z,
    P,
    V,
    v,
    p,
    h,
    y,
    ne,
    Re,
    u,
    r,
    l,
    o,
    Q,
    ve,
    ge,
    pe,
    qe,
    He,
    ot,
    ae,
    Y,
    me,
    ye,
    Le,
    ce,
    we,
    Ke,
    F,
    Ue,
    Ye,
    x,
    Ne,
    be,
    Pe,
    Me,
    st,
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
  function o(l, u, g) {
    return g || "WORK";
  }
  function r(l, u) {
    return u === "TRAINING" ? "TRAINING" : u === "BAG" || u === "PAX" || u === "DFO" ? u : l.isTraining || l.trainingClass || l.empClass === "ESTI" || l.empClass === "MSTI" || l.extraName === "ESTI" || l.extraName === "MSTI" ? "TRAINING" : l.function === "BAG" ? "BAG" : l.function === "DFO" || l.function === "PAX" ? "PAX" : u === "BAG" || u === "PAX" ? u : null;
  }
  t.lineToRowModel = function(l, u, g) {
    if (g = g || {}, !l || !u) return null;
    for (var _ = g.dayNames || ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], d = typeof g.teamResolver == "function" ? g.teamResolver(l.id) : null, D = typeof g.shiftResolver == "function" ? g.shiftResolver(l.shiftId) : null, b = l.shiftName || D && D.name || "", A = l.startTime || (D && D.start ? D.start : ""), C = l.endTime || (D && D.end ? D.end : ""), N = l.shiftLabel || (A && C ? A + "–" + C : A || "WORK"), M = !!(l.isExtra || l.extraPositionId), z = M ? l.position || l.extraName || "TSO" : l.isStso || l.empClass === "STSO" ? "STSO" : l.isLtso || l.empClass === "LTSO" ? "LTSO" : "TSO", P = M ? l.empClass === "PT" ? "PT" : "FT" : z === "STSO" || z === "LTSO" ? "FT" : l.empClass === "PT" ? "PT" : "FT", V = l.paid || 0, v = Array.isArray(u) ? u : u[l.id] || u[String(l.id)] || [], p = [], h = [], y = [], w = [], I = 0, L = 0; L < 7; L++) {
      var B = l.dayTimes && l.dayTimes[String(L)], W = typeof g.effectiveTimesResolver == "function" ? g.effectiveTimesResolver(l.shiftId, L) : null, G = B && B.start || l.startTime || W && W.start || A, te = B && B.end || l.endTime || W && W.end || C;
      y.push(G), w.push(te);
      var Te = v[L];
      if (Te === "WORK") {
        I += V;
        var j = typeof g.rotationDutyResolver == "function" ? g.rotationDutyResolver(l.id, L) : null, ie = o(l, j, N);
        p.push(ie), h.push(r(l, j) || "PAX");
      } else
        p.push("RDO"), h.push("OFF");
    }
    return {
      id: l.id,
      teamId: d && d.id || "",
      shiftId: l.shiftId || "",
      team: e(d && (d.name || d.id) || ""),
      line: l.lineCode || "",
      shift: b,
      start: A,
      end: C,
      position: z,
      emp: P,
      sex: l.sex === "F" || l.sex === "M" ? l.sex : "",
      function: l.function || "",
      certPool: l.certPool || "",
      rdos: n(l, _),
      paid: V,
      days: p,
      dayDuties: h,
      dayStarts: y,
      dayEnds: w,
      hours: I
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
  function o(g) {
    if (!(!g || g.function !== "BAG")) {
      t.state.functionRotation || (t.state.functionRotation = {});
      var _ = String(g.id);
      t.state.functionRotation[_] || (t.state.functionRotation[_] = []);
      for (var d = t.state.schedule && (t.state.schedule[g.id] || t.state.schedule[_]) || [], D = Math.max(d.length, (t.state.weekCount || 1) * 7), b = 0; b < D; b++) {
        for (; t.state.functionRotation[_].length <= b; ) t.state.functionRotation[_].push(null);
        d[b] === "WORK" && (t.state.functionRotation[_][b] = "BAG");
      }
    }
  }
  function r(g) {
    if (!(!g || g.function !== "DFO")) {
      t.state.functionRotation || (t.state.functionRotation = {});
      var _ = String(g.id);
      t.state.functionRotation[_] || (t.state.functionRotation[_] = []);
      for (var d = t.state.schedule && (t.state.schedule[g.id] || t.state.schedule[_]) || [], D = Math.max(d.length, (t.state.weekCount || 1) * 7), b = 0; b < D; b++) {
        for (; t.state.functionRotation[_].length <= b; ) t.state.functionRotation[_].push(null);
        d[b] === "WORK" && (t.state.functionRotation[_][b] = "DFO");
      }
    }
  }
  function l() {
    var g = document.getElementById("lines-tbody"), _ = g || document.querySelector(".lines-virtual-root");
    _ && g && _.querySelectorAll("td.cell-toggle").forEach(function(d) {
      var D = t.findLineById ? t.findLineById(d.getAttribute("data-line-id")) : null, b = +d.getAttribute("data-day");
      if (!(!D || isNaN(b))) {
        var A = (t.state.schedule[D.id] || t.state.schedule[String(D.id)] || [])[b] || "RDO";
        if (d.style.background = "", d.style.color = "", A !== "WORK") {
          d.className = "cell-rdo cell-toggle", d.textContent = "RDO", d.style.background = "#000", d.style.color = "#fff", d.style.opacity = "1";
          return;
        }
        var C = e(D, b), N = C === "BAG" || C === "BAGS", M = C === "DFO", z = "";
        N ? z = " cell-function-duty cell-bag" : M && (z = " cell-function-duty cell-dfo"), d.className = "cell-work cell-toggle" + z, d.textContent = n(D);
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
      d && (d.function = _.value === "DFO" || _.value === "PAX" || _.value === "BAG" ? _.value : "", d.function === "BAG" && o(d), d.function === "DFO" && r(d), t.renderLines ? t.renderLines() : l());
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
  function o() {
    return {
      teamResolver: typeof e.teamMetaForLine == "function" ? e.teamMetaForLine : null,
      shiftResolver: typeof e.getShift == "function" ? e.getShift : null,
      rotationDutyResolver: typeof e.getRotationDuty == "function" ? e.getRotationDuty : r,
      effectiveTimesResolver: typeof e.getEffectiveShiftTimes == "function" ? e.getEffectiveShiftTimes : null
    };
  }
  function r(v, p) {
    const h = String(v), y = e.state && e.state.functionRotation, w = y && (y[h] || y[v]);
    if (!Array.isArray(w)) return null;
    const I = w[p];
    return I === "BAG" ? "BAG" : I === "DFO" ? "DFO" : I === "PAX" ? "PAX" : I === "TRAINING" ? "TRAINING" : null;
  }
  function l(v, p, h) {
    var y = String(v);
    for (e.state.functionRotation || (e.state.functionRotation = {}), e.state.functionRotation[y] || (e.state.functionRotation[y] = []); e.state.functionRotation[y].length <= p; ) e.state.functionRotation[y].push(null);
    e.state.functionRotation[y][p] = h;
  }
  function u(v) {
    if (!v) return !1;
    if (v.function === "DFO") return !0;
    const p = v.functionEligible;
    return !!(p && (p.dfo === !0 || p.DFO === !0));
  }
  function g() {
    const v = e.state && Array.isArray(e.state.lines) ? e.state.lines : [], p = typeof e.sortLinesForView == "function" && typeof e.filterLinesForView == "function" ? e.sortLinesForView(e.filterLinesForView(v)) : v, h = e.state && e.state.schedule || {}, y = typeof e.getRowModels == "function" ? e.getRowModels(p, h, o()) : typeof e.getLineRowModels == "function" ? e.getLineRowModels(o()) : [];
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
  function b(v) {
    if (!v || typeof v.$set != "function") return;
    const p = g();
    typeof e.applyExportCssVars == "function" && e.applyExportCssVars(), v.$set({
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
  function A(v) {
    if (!v) return;
    const p = e.findLineById ? e.findLineById(v.lineId) : null;
    if (!p) return;
    const h = v.field, y = v.value;
    if (h === "lineCode")
      p.lineCode = String(y || "").trim() || p.lineCode;
    else if (h === "sex")
      p.sex = y === "F" ? "F" : "M";
    else if (h === "function")
      p.function = y === "DFO" || y === "PAX" || y === "BAG" || y === "TRAINING" ? y : "";
    else if (h === "certPool") {
      var w = String(y || "").trim().toUpperCase();
      p.certPool = w === "A" || w === "B" ? w : "";
    } else if (h === "emp")
      e.applyLineEmp && e.applyLineEmp(p, y);
    else if (h === "position") {
      var I = !!(p.isExtra || p.extraPositionId), L = String(y ?? "").trim();
      I ? (L && (p.position = L, p.extraName = L), p.isStso = !1, p.isLtso = !1) : e.applyLineEmp && e.applyLineEmp(p, L);
    } else if (h === "shift")
      e.applyLineShift && e.applyLineShift(p, y);
    else if (h === "team")
      e.setLineTeam && e.setLineTeam(v.lineId, y);
    else if (h === "start" || h === "end") {
      var B = String(y || "").trim();
      if (e.isValidTimeText && !e.isValidTimeText(B)) return;
      h === "start" && (p.startTime = B), h === "end" && (p.endTime = B);
      var W = e.getShift ? e.getShift(p.shiftId) : null, G = p.startTime || (W ? W.start : ""), te = p.endTime || (W ? W.end : "");
      p.shiftLabel = (G || "") + "-" + (te || "");
    }
    e.updateStatus && e.updateStatus("Updated " + (p.lineCode || v.lineId)), V(), (h === "emp" || h === "position" || h === "shift" || h === "start" || h === "end") && e.renderCoverageBars && e.renderCoverageBars(), h === "team" && e.renderTeams && e.renderTeams(), window.dispatchEvent(new CustomEvent("lines:coverage-refresh"));
  }
  function C(v) {
    if (!v) return;
    const p = e.findLineById ? e.findLineById(v.lineId) : null, h = Number(v.dayIndex);
    if (!p || !Number.isInteger(h) || h < 0 || h > 6) return;
    const y = String(p.id);
    e.state.schedule || (e.state.schedule = {});
    var w = e.state.schedule[y] || e.state.schedule[p.id];
    for (Array.isArray(w) || (w = []), e.state.schedule[y] = w; e.state.schedule[y].length < 7; ) e.state.schedule[y].push("RDO");
    e.state.functionRotation || (e.state.functionRotation = {}), !e.state.functionRotation[y] && e.state.functionRotation[p.id] && (e.state.functionRotation[y] = e.state.functionRotation[p.id]);
    const I = e.state.schedule[y][h] || "RDO", L = p.function === "BAG", B = u(p);
    if (I !== "WORK")
      e.state.schedule[y][h] = "WORK", L ? l(y, h, "BAG") : B ? l(y, h, "PAX") : l(y, h, null);
    else if (L)
      e.state.schedule[y][h] = "RDO", l(y, h, null);
    else if (B) {
      var W = typeof e.getRotationDuty == "function" ? e.getRotationDuty(p.id, h) : r(p.id, h), G = W === "DFO" || W === "PAX" || !W ? "PAX" : W;
      G === "PAX" ? l(y, h, "BAG") : (e.state.schedule[y][h] = "RDO", l(y, h, null));
    } else
      e.state.schedule[y][h] = "RDO", l(y, h, null);
    e.syncRdoDaysFromSchedule && e.syncRdoDaysFromSchedule(p), V(), e.renderCoverageBars && e.renderCoverageBars(), window.dispatchEvent(new CustomEvent("lines:coverage-refresh"));
  }
  function N(v) {
    if (!v) return;
    const p = e.findLineById ? e.findLineById(v.lineId) : null, h = Number(v.dayIndex), y = String(v.duty || "").toUpperCase();
    if (!p || !Number.isInteger(h) || h < 0 || h > 6) return;
    const w = String(p.id);
    e.state.schedule || (e.state.schedule = {}), Array.isArray(e.state.schedule[w]) || (e.state.schedule[w] = Array(7).fill("RDO")), y === "OFF" || y === "RDO" || y === "" ? (e.state.schedule[w][h] = "RDO", l(w, h, null)) : (e.state.schedule[w][h] = "WORK", y === "BAG" ? l(w, h, "BAG") : y === "DFO" ? l(w, h, "DFO") : y === "TRAINING" ? l(w, h, "TRAINING") : l(w, h, "PAX")), e.syncRdoDaysFromSchedule && e.syncRdoDaysFromSchedule(p), V(), e.renderCoverageBars && e.renderCoverageBars(), window.dispatchEvent(new CustomEvent("lines:coverage-refresh"));
  }
  function M(v) {
    if (!v) return;
    const p = e.findLineById ? e.findLineById(v.lineId) : null, h = Number(v.dayIndex), y = v.field, w = String(v.value || "").trim();
    if (!(!p || !Number.isInteger(h) || h < 0 || h > 6) && !(e.isValidTimeText && !e.isValidTimeText(w))) {
      var I = e.getShift ? e.getShift(p.shiftId) : null, L = p.startTime || (I ? I.start : "08:00"), B = p.endTime || (I ? I.end : "16:30");
      p.dayTimes || (p.dayTimes = {});
      var W = String(h), G = p.dayTimes[W] || { start: L, end: B };
      y === "start" ? p.dayTimes[W] = { start: w, end: G.end } : y === "end" && (p.dayTimes[W] = { start: G.start, end: w }), V(), e.renderCoverageBars && e.renderCoverageBars(), window.dispatchEvent(new CustomEvent("lines:coverage-refresh"));
    }
  }
  function z(v) {
    v && (e.linesView || (e.linesView = {}), v.sortBy && (e.linesView.sortBy = v.sortBy), v.sortDir && (e.linesView.sortDir = v.sortDir), V());
  }
  function P(v) {
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
            onDayTimeEdit: M,
            onSort: z,
            onFilter: P
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
  Jn as initLinesTable
};
