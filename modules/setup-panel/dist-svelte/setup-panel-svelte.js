var Nt = Object.defineProperty;
var Dt = (e, l, a) => l in e ? Nt(e, l, { enumerable: !0, configurable: !0, writable: !0, value: a }) : e[l] = a;
var Ue = (e, l, a) => Dt(e, typeof l != "symbol" ? l + "" : l, a);
function Fe() {
}
function Ot(e) {
  return e();
}
function xt() {
  return /* @__PURE__ */ Object.create(null);
}
function Me(e) {
  e.forEach(Ot);
}
function jt(e) {
  return typeof e == "function";
}
function At(e, l) {
  return e != e ? l == l : e !== l || e && typeof e == "object" || typeof e == "function";
}
function Bt(e) {
  return Object.keys(e).length === 0;
}
function t(e, l) {
  e.appendChild(l);
}
function Rt(e, l, a) {
  e.insertBefore(l, a || null);
}
function It(e) {
  e.parentNode && e.parentNode.removeChild(e);
}
function i(e) {
  return document.createElement(e);
}
function y(e) {
  return document.createTextNode(e);
}
function f() {
  return y(" ");
}
function g(e, l, a, u) {
  return e.addEventListener(l, a, u), () => e.removeEventListener(l, a, u);
}
function n(e, l, a) {
  a == null ? e.removeAttribute(l) : e.getAttribute(l) !== a && e.setAttribute(l, a);
}
function Gt(e) {
  return Array.from(e.childNodes);
}
function r(e, l, a, u) {
  a == null ? e.style.removeProperty(l) : e.style.setProperty(l, a, "");
}
function Ct(e, l, a) {
  e.classList.toggle(l, !!a);
}
let ze;
function $e(e) {
  ze = e;
}
const oe = [], Lt = [];
let de = [];
const Tt = [], Ht = /* @__PURE__ */ Promise.resolve();
let We = !1;
function St() {
  We || (We = !0, Ht.then(Pt));
}
function qe(e) {
  de.push(e);
}
const Ve = /* @__PURE__ */ new Set();
let se = 0;
function Pt() {
  if (se !== 0)
    return;
  const e = ze;
  do {
    try {
      for (; se < oe.length; ) {
        const l = oe[se];
        se++, $e(l), Xt(l.$$);
      }
    } catch (l) {
      throw oe.length = 0, se = 0, l;
    }
    for ($e(null), oe.length = 0, se = 0; Lt.length; ) Lt.pop()();
    for (let l = 0; l < de.length; l += 1) {
      const a = de[l];
      Ve.has(a) || (Ve.add(a), a());
    }
    de.length = 0;
  } while (oe.length);
  for (; Tt.length; )
    Tt.pop()();
  We = !1, Ve.clear(), $e(e);
}
function Xt(e) {
  if (e.fragment !== null) {
    e.update(), Me(e.before_update);
    const l = e.dirty;
    e.dirty = [-1], e.fragment && e.fragment.p(e.ctx, l), e.after_update.forEach(qe);
  }
}
function Ut(e) {
  const l = [], a = [];
  de.forEach((u) => e.indexOf(u) === -1 ? l.push(u) : a.push(u)), a.forEach((u) => u()), de = l;
}
const Vt = /* @__PURE__ */ new Set();
function Wt(e, l) {
  e && e.i && (Vt.delete(e), e.i(l));
}
function qt(e, l, a) {
  const { fragment: u, after_update: h } = e.$$;
  u && u.m(l, a), qe(() => {
    const p = e.$$.on_mount.map(Ot).filter(jt);
    e.$$.on_destroy ? e.$$.on_destroy.push(...p) : Me(p), e.$$.on_mount = [];
  }), h.forEach(qe);
}
function zt(e, l) {
  const a = e.$$;
  a.fragment !== null && (Ut(a.after_update), Me(a.on_destroy), a.fragment && a.fragment.d(l), a.on_destroy = a.fragment = null, a.ctx = []);
}
function Jt(e, l) {
  e.$$.dirty[0] === -1 && (oe.push(e), St(), e.$$.dirty.fill(0)), e.$$.dirty[l / 31 | 0] |= 1 << l % 31;
}
function Kt(e, l, a, u, h, p, c = null, $ = [-1]) {
  const _ = ze;
  $e(e);
  const d = e.$$ = {
    fragment: null,
    ctx: [],
    // state
    props: p,
    update: Fe,
    not_equal: h,
    bound: xt(),
    // lifecycle
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(l.context || (_ ? _.$$.context : [])),
    // everything else
    callbacks: xt(),
    dirty: $,
    skip_bound: !1,
    root: l.target || _.$$.root
  };
  c && c(d.root);
  let F = !1;
  if (d.ctx = a ? a(e, l.props || {}, (v, z, ...w) => {
    const C = w.length ? w[0] : z;
    return d.ctx && h(d.ctx[v], d.ctx[v] = C) && (!d.skip_bound && d.bound[v] && d.bound[v](C), F && Jt(e, v)), z;
  }) : [], d.update(), F = !0, Me(d.before_update), d.fragment = u ? u(d.ctx) : !1, l.target) {
    if (l.hydrate) {
      const v = Gt(l.target);
      d.fragment && d.fragment.l(v), v.forEach(It);
    } else
      d.fragment && d.fragment.c();
    l.intro && Wt(e.$$.fragment), qt(e, l.target, l.anchor), Pt();
  }
  $e(_);
}
class Qt {
  constructor() {
    /**
     * ### PRIVATE API
     *
     * Do not use, may change at any time
     *
     * @type {any}
     */
    Ue(this, "$$");
    /**
     * ### PRIVATE API
     *
     * Do not use, may change at any time
     *
     * @type {any}
     */
    Ue(this, "$$set");
  }
  /** @returns {void} */
  $destroy() {
    zt(this, 1), this.$destroy = Fe;
  }
  /**
   * @template {Extract<keyof Events, string>} K
   * @param {K} type
   * @param {((e: Events[K]) => void) | null | undefined} callback
   * @returns {() => void}
   */
  $on(l, a) {
    if (!jt(a))
      return Fe;
    const u = this.$$.callbacks[l] || (this.$$.callbacks[l] = []);
    return u.push(a), () => {
      const h = u.indexOf(a);
      h !== -1 && u.splice(h, 1);
    };
  }
  /**
   * @param {Partial<Props>} props
   * @returns {void}
   */
  $set(l) {
    this.$$set && !Bt(l) && (this.$$.skip_bound = !0, this.$$set(l), this.$$.skip_bound = !1);
  }
}
const Yt = "4";
typeof window < "u" && (window.__svelte || (window.__svelte = { v: /* @__PURE__ */ new Set() })).v.add(Yt);
function Zt(e) {
  let l, a, u, h, p, c, $, _, d, F, v, z, w, C, xe, ee, Ce, E, J, Le, L, te, Te, o, V, Oe, s, W, fe, T, ce, Je, je, Ke, O, pe, Qe, K, Ye, j, Ie, Ze, I, ve, et, Pe, tt, P, me, lt, N, Ne, nt, M, ge, at, De, rt, x, be, it, Q, st, D, Ae, ut, A, _e, ot, Be, dt, B, he, ft, Y, ct, R, Re, pt, G, we, vt, Ge, mt, H, ye, gt, Z, bt, le, _t, S, He, ht, X, Ee, wt, Se, yt, U, ke, Et, k, ne, kt, ae, $t, re, Ft, ie, Xe, Mt;
  return {
    c() {
      l = i("div"), a = i("div"), u = i("div"), u.textContent = "Schedule period", h = f(), p = i("div"), c = i("label"), $ = y("Schedule start "), _ = i("input"), F = f(), v = i("label"), z = y("Weeks "), w = i("input"), xe = f(), ee = i("label"), Ce = y("Generate seed "), E = i("input"), Le = f(), L = i("details"), te = i("summary"), te.textContent = "FTE", Te = f(), o = i("div"), V = i("div"), V.textContent = "FT TSO", Oe = f(), s = i("div"), W = i("label"), fe = y("Male "), T = i("input"), Je = f(), je = i("label"), Ke = y("Female "), O = i("input"), Qe = f(), K = i("div"), K.textContent = "PT TSO", Ye = f(), j = i("div"), Ie = i("label"), Ze = y("Male "), I = i("input"), et = f(), Pe = i("label"), tt = y("Female "), P = i("input"), lt = f(), N = i("div"), Ne = i("label"), nt = y("Hours/day "), M = i("input"), at = f(), De = i("label"), rt = y("Days/week "), x = i("input"), it = f(), Q = i("div"), Q.textContent = "LTSO", st = f(), D = i("div"), Ae = i("label"), ut = y("Male "), A = i("input"), ot = f(), Be = i("label"), dt = y("Female "), B = i("input"), ft = f(), Y = i("div"), Y.textContent = "STSO", ct = f(), R = i("div"), Re = i("label"), pt = y("Male "), G = i("input"), vt = f(), Ge = i("label"), mt = y("Female "), H = i("input"), gt = f(), Z = i("div"), Z.textContent = "Training dept", bt = f(), le = i("p"), le.textContent = "ESTI and MSTI are training classes — no sex, not ops FTE.", _t = f(), S = i("div"), He = i("label"), ht = y("ESTI "), X = i("input"), wt = f(), Se = i("label"), yt = y("MSTI "), U = i("input"), Et = f(), k = i("div"), ne = i("button"), ne.textContent = "[GEN] GENERATE", kt = f(), ae = i("button"), ae.textContent = "[EXP] EXPORT", $t = f(), re = i("button"), re.textContent = "[IMP] IMPORT", Ft = f(), ie = i("button"), ie.textContent = "[CLR] CLEAR", n(u, "class", "section-title"), n(_, "type", "date"), n(_, "id", "svelte-cfg-start"), _.value = d = /*period*/
      e[1].startDate || "", n(w, "type", "number"), n(w, "id", "svelte-cfg-weeks"), n(w, "min", "1"), n(w, "max", "8"), w.value = C = /*period*/
      e[1].weeks || 1, r(w, "width", "4.5rem"), n(E, "type", "text"), n(E, "id", "svelte-cfg-generate-seed"), n(E, "placeholder", "random"), E.value = J = /*period*/
      e[1].generateSeed || "random", r(E, "width", "6.5rem"), n(E, "title", "Leave as 'random' or enter a number for reproducible scheduling"), n(p, "class", "period-row"), r(p, "display", "flex"), r(p, "flex-wrap", "wrap"), r(p, "gap", "1rem"), r(p, "align-items", "center"), n(a, "class", "card"), n(te, "class", "section-title"), n(V, "class", "fte-role"), r(V, "text-align", "center"), r(V, "font-weight", "700"), r(V, "margin", "0.85rem 0 0.35rem"), n(T, "type", "number"), n(T, "id", "svelte-cfg-ft-m"), n(T, "min", "0"), T.value = ce = /*fte*/
      e[0].ftM || 10, r(T, "width", "4.5rem"), n(O, "type", "number"), n(O, "id", "svelte-cfg-ft-f"), n(O, "min", "0"), O.value = pe = /*fte*/
      e[0].ftF || 10, r(O, "width", "4.5rem"), n(s, "class", "fte-sex-row"), r(s, "display", "flex"), r(s, "justify-content", "center"), r(s, "gap", "2rem"), r(s, "flex-wrap", "wrap"), n(K, "class", "fte-role"), r(K, "text-align", "center"), r(K, "font-weight", "700"), r(K, "margin", "0.85rem 0 0.35rem"), n(I, "type", "number"), n(I, "id", "svelte-cfg-pt-m"), n(I, "min", "0"), I.value = ve = /*fte*/
      e[0].ptM || 4, r(I, "width", "4.5rem"), n(P, "type", "number"), n(P, "id", "svelte-cfg-pt-f"), n(P, "min", "0"), P.value = me = /*fte*/
      e[0].ptF || 4, r(P, "width", "4.5rem"), n(j, "class", "fte-sex-row"), r(j, "display", "flex"), r(j, "justify-content", "center"), r(j, "gap", "2rem"), r(j, "flex-wrap", "wrap"), n(M, "type", "number"), n(M, "id", "svelte-cfg-pt-hours"), n(M, "min", "1"), n(M, "max", "12"), M.value = ge = /*fte*/
      e[0].ptHours || 4, r(M, "width", "4.5rem"), n(x, "type", "number"), n(x, "id", "svelte-cfg-pt-days"), n(x, "min", "1"), n(x, "max", "6"), x.value = be = /*fte*/
      e[0].ptDays || 3, r(x, "width", "4.5rem"), n(N, "class", "fte-sex-row"), r(N, "display", "flex"), r(N, "justify-content", "center"), r(N, "gap", "2rem"), r(N, "flex-wrap", "wrap"), n(Q, "class", "fte-role"), r(Q, "text-align", "center"), r(Q, "font-weight", "700"), r(Q, "margin", "0.85rem 0 0.35rem"), n(A, "type", "number"), n(A, "id", "svelte-cfg-ltso-m"), n(A, "min", "0"), A.value = _e = /*fte*/
      e[0].ltsoM || 1, r(A, "width", "4.5rem"), n(B, "type", "number"), n(B, "id", "svelte-cfg-ltso-f"), n(B, "min", "0"), B.value = he = /*fte*/
      e[0].ltsoF || 1, r(B, "width", "4.5rem"), n(D, "class", "fte-sex-row"), r(D, "display", "flex"), r(D, "justify-content", "center"), r(D, "gap", "2rem"), r(D, "flex-wrap", "wrap"), n(Y, "class", "fte-role"), r(Y, "text-align", "center"), r(Y, "font-weight", "700"), r(Y, "margin", "0.85rem 0 0.35rem"), n(G, "type", "number"), n(G, "id", "svelte-cfg-stso-m"), n(G, "min", "0"), G.value = we = /*fte*/
      e[0].stsoM || 2, r(G, "width", "4.5rem"), n(H, "type", "number"), n(H, "id", "svelte-cfg-stso-f"), n(H, "min", "0"), H.value = ye = /*fte*/
      e[0].stsoF || 2, r(H, "width", "4.5rem"), n(R, "class", "fte-sex-row"), r(R, "display", "flex"), r(R, "justify-content", "center"), r(R, "gap", "2rem"), r(R, "flex-wrap", "wrap"), n(Z, "class", "fte-role"), r(Z, "text-align", "center"), r(Z, "font-weight", "700"), r(Z, "margin", "0.85rem 0 0.35rem"), n(le, "class", "muted"), r(le, "margin", "0 0 0.35rem"), r(le, "text-align", "center"), n(X, "type", "number"), n(X, "id", "svelte-cfg-esti"), n(X, "min", "0"), X.value = Ee = /*fte*/
      e[0].esti || 0, r(X, "width", "4.5rem"), n(U, "type", "number"), n(U, "id", "svelte-cfg-msti"), n(U, "min", "0"), U.value = ke = /*fte*/
      e[0].msti || 0, r(U, "width", "4.5rem"), n(S, "class", "fte-sex-row"), r(S, "display", "flex"), r(S, "justify-content", "center"), r(S, "gap", "2rem"), r(S, "flex-wrap", "wrap"), n(o, "class", "fte-block"), n(L, "class", "card setup-fold"), n(L, "id", "svelte-card-fte"), L.open = !0, n(ne, "type", "button"), n(ne, "class", "btn btn-amber"), n(ae, "type", "button"), n(ae, "class", "btn"), n(re, "type", "button"), n(re, "class", "btn"), n(ie, "type", "button"), n(ie, "class", "btn btn-red"), n(k, "class", "toolbar"), r(k, "margin-top", "0.75rem"), r(k, "gap", "0.5rem"), r(k, "flex-wrap", "wrap"), n(l, "id", "setup-svelte-root"), n(l, "class", "setup-svelte-form"), Ct(l, "hidden", !/*disabled*/
      e[2]);
    },
    m(m, b) {
      Rt(m, l, b), t(l, a), t(a, u), t(a, h), t(a, p), t(p, c), t(c, $), t(c, _), t(p, F), t(p, v), t(v, z), t(v, w), t(p, xe), t(p, ee), t(ee, Ce), t(ee, E), t(l, Le), t(l, L), t(L, te), t(L, Te), t(L, o), t(o, V), t(o, Oe), t(o, s), t(s, W), t(W, fe), t(W, T), t(s, Je), t(s, je), t(je, Ke), t(je, O), t(o, Qe), t(o, K), t(o, Ye), t(o, j), t(j, Ie), t(Ie, Ze), t(Ie, I), t(j, et), t(j, Pe), t(Pe, tt), t(Pe, P), t(o, lt), t(o, N), t(N, Ne), t(Ne, nt), t(Ne, M), t(N, at), t(N, De), t(De, rt), t(De, x), t(o, it), t(o, Q), t(o, st), t(o, D), t(D, Ae), t(Ae, ut), t(Ae, A), t(D, ot), t(D, Be), t(Be, dt), t(Be, B), t(o, ft), t(o, Y), t(o, ct), t(o, R), t(R, Re), t(Re, pt), t(Re, G), t(R, vt), t(R, Ge), t(Ge, mt), t(Ge, H), t(o, gt), t(o, Z), t(o, bt), t(o, le), t(o, _t), t(o, S), t(S, He), t(He, ht), t(He, X), t(S, wt), t(S, Se), t(Se, yt), t(Se, U), t(l, Et), t(l, k), t(k, ne), t(k, kt), t(k, ae), t(k, $t), t(k, re), t(k, Ft), t(k, ie), Xe || (Mt = [
        g(
          _,
          "change",
          /*change_handler*/
          e[5]
        ),
        g(
          w,
          "change",
          /*change_handler_1*/
          e[6]
        ),
        g(
          E,
          "change",
          /*change_handler_2*/
          e[7]
        ),
        g(
          T,
          "blur",
          /*blur_handler*/
          e[8]
        ),
        g(
          O,
          "blur",
          /*blur_handler_1*/
          e[9]
        ),
        g(
          I,
          "blur",
          /*blur_handler_2*/
          e[10]
        ),
        g(
          P,
          "blur",
          /*blur_handler_3*/
          e[11]
        ),
        g(
          M,
          "blur",
          /*blur_handler_4*/
          e[12]
        ),
        g(
          x,
          "blur",
          /*blur_handler_5*/
          e[13]
        ),
        g(
          A,
          "blur",
          /*blur_handler_6*/
          e[14]
        ),
        g(
          B,
          "blur",
          /*blur_handler_7*/
          e[15]
        ),
        g(
          G,
          "blur",
          /*blur_handler_8*/
          e[16]
        ),
        g(
          H,
          "blur",
          /*blur_handler_9*/
          e[17]
        ),
        g(
          X,
          "blur",
          /*blur_handler_10*/
          e[18]
        ),
        g(
          U,
          "blur",
          /*blur_handler_11*/
          e[19]
        ),
        g(
          ne,
          "click",
          /*click_handler*/
          e[20]
        ),
        g(
          ae,
          "click",
          /*click_handler_1*/
          e[21]
        ),
        g(
          re,
          "click",
          /*click_handler_2*/
          e[22]
        ),
        g(
          ie,
          "click",
          /*click_handler_3*/
          e[23]
        )
      ], Xe = !0);
    },
    p(m, [b]) {
      b & /*period*/
      2 && d !== (d = /*period*/
      m[1].startDate || "") && (_.value = d), b & /*period*/
      2 && C !== (C = /*period*/
      m[1].weeks || 1) && w.value !== C && (w.value = C), b & /*period*/
      2 && J !== (J = /*period*/
      m[1].generateSeed || "random") && E.value !== J && (E.value = J), b & /*fte*/
      1 && ce !== (ce = /*fte*/
      m[0].ftM || 10) && T.value !== ce && (T.value = ce), b & /*fte*/
      1 && pe !== (pe = /*fte*/
      m[0].ftF || 10) && O.value !== pe && (O.value = pe), b & /*fte*/
      1 && ve !== (ve = /*fte*/
      m[0].ptM || 4) && I.value !== ve && (I.value = ve), b & /*fte*/
      1 && me !== (me = /*fte*/
      m[0].ptF || 4) && P.value !== me && (P.value = me), b & /*fte*/
      1 && ge !== (ge = /*fte*/
      m[0].ptHours || 4) && M.value !== ge && (M.value = ge), b & /*fte*/
      1 && be !== (be = /*fte*/
      m[0].ptDays || 3) && x.value !== be && (x.value = be), b & /*fte*/
      1 && _e !== (_e = /*fte*/
      m[0].ltsoM || 1) && A.value !== _e && (A.value = _e), b & /*fte*/
      1 && he !== (he = /*fte*/
      m[0].ltsoF || 1) && B.value !== he && (B.value = he), b & /*fte*/
      1 && we !== (we = /*fte*/
      m[0].stsoM || 2) && G.value !== we && (G.value = we), b & /*fte*/
      1 && ye !== (ye = /*fte*/
      m[0].stsoF || 2) && H.value !== ye && (H.value = ye), b & /*fte*/
      1 && Ee !== (Ee = /*fte*/
      m[0].esti || 0) && X.value !== Ee && (X.value = Ee), b & /*fte*/
      1 && ke !== (ke = /*fte*/
      m[0].msti || 0) && U.value !== ke && (U.value = ke), b & /*disabled*/
      4 && Ct(l, "hidden", !/*disabled*/
      m[2]);
    },
    i: Fe,
    o: Fe,
    d(m) {
      m && It(l), Xe = !1, Me(Mt);
    }
  };
}
function ue(e, l = {}) {
  window.dispatchEvent(new CustomEvent(e, { detail: l }));
}
function el(e, l, a) {
  let { fte: u = {} } = l, { period: h = {} } = l, { disabled: p = !1 } = l;
  function c(s, W) {
    const fe = Number(W);
    isNaN(fe) || ue("setup:fte-change", { ...u, [s]: fe });
  }
  function $(s, W) {
    ue("setup:period-change", { ...h, [s]: W });
  }
  const _ = (s) => {
    $("startDate", s.target.value);
  }, d = (s) => {
    $("weeks", s.target.value);
  }, F = (s) => {
    $("generateSeed", s.target.value);
  }, v = (s) => c("ftM", s.target.value), z = (s) => c("ftF", s.target.value), w = (s) => c("ptM", s.target.value), C = (s) => c("ptF", s.target.value), xe = (s) => c("ptHours", s.target.value), ee = (s) => c("ptDays", s.target.value), Ce = (s) => c("ltsoM", s.target.value), E = (s) => c("ltsoF", s.target.value), J = (s) => c("stsoM", s.target.value), Le = (s) => c("stsoF", s.target.value), L = (s) => c("esti", s.target.value), te = (s) => c("msti", s.target.value), Te = () => ue("setup:generate"), o = () => ue("setup:export"), V = () => ue("setup:import"), Oe = () => ue("setup:clear");
  return e.$$set = (s) => {
    "fte" in s && a(0, u = s.fte), "period" in s && a(1, h = s.period), "disabled" in s && a(2, p = s.disabled);
  }, [
    u,
    h,
    p,
    c,
    $,
    _,
    d,
    F,
    v,
    z,
    w,
    C,
    xe,
    ee,
    Ce,
    E,
    J,
    Le,
    L,
    te,
    Te,
    o,
    V,
    Oe
  ];
}
class tl extends Qt {
  constructor(l) {
    super(), Kt(this, l, el, Zt, At, { fte: 0, period: 1, disabled: 2 });
  }
}
let q = null;
function nl(e) {
  const l = "setup-svelte-root";
  let a = document.getElementById(l);
  if (!a) {
    a = document.createElement("div"), a.id = l;
    const v = document.getElementById("tab-setup");
    v && v.prepend(a);
  }
  a.style.display = "block";
  const u = a.closest("#tab-setup");
  u && u.classList.add("setup-svelte-active"), q && q.$destroy();
  const h = e && e.state && e.state.fte ? e.state.fte : {}, p = e && e.state ? {
    startDate: e.state.startDate || "",
    weeks: e.state.weeks || 1,
    generateSeed: e.state.generateSeed || "random"
  } : {};
  q = new tl({
    target: a,
    props: {
      fte: h,
      period: p,
      disabled: !0
    }
  });
  function c(v) {
    e && e.state && (e.state.fte = { ...e.state.fte || {}, ...v.detail });
  }
  function $(v) {
    e && e.state && Object.assign(e.state, v.detail);
  }
  function _() {
    e && e.generate && e.generate();
  }
  function d() {
    e && e.exportBoard && e.exportBoard();
  }
  function F() {
    e && e.clear && e.clear();
  }
  window.addEventListener("setup:fte-change", c), window.addEventListener("setup:period-change", $), window.addEventListener("setup:generate", _), window.addEventListener("setup:export", d), window.addEventListener("setup:clear", F), window.addEventListener("setup:import", F), q.$on("destroy", () => {
    window.removeEventListener("setup:fte-change", c), window.removeEventListener("setup:period-change", $), window.removeEventListener("setup:generate", _), window.removeEventListener("setup:export", d), window.removeEventListener("setup:clear", F), q = null;
  });
}
function al() {
  q && (q.$destroy(), q = null);
}
export {
  al as destroySetupSvelte,
  nl as initSetupSvelte
};
