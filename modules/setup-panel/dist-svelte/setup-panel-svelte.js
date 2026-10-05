var Nt = Object.defineProperty;
var Pt = (e, l, a) => l in e ? Nt(e, l, { enumerable: !0, configurable: !0, writable: !0, value: a }) : e[l] = a;
var Xe = (e, l, a) => Pt(e, typeof l != "symbol" ? l + "" : l, a);
function Ce() {
}
function It(e) {
  return e();
}
function Ct() {
  return /* @__PURE__ */ Object.create(null);
}
function Le(e) {
  e.forEach(It);
}
function Ot(e) {
  return typeof e == "function";
}
function At(e, l) {
  return e != e ? l == l : e !== l || e && typeof e == "object" || typeof e == "function";
}
function Rt(e) {
  return Object.keys(e).length === 0;
}
function t(e, l) {
  e.appendChild(l);
}
function Bt(e, l, a) {
  e.insertBefore(l, a || null);
}
function jt(e) {
  e.parentNode && e.parentNode.removeChild(e);
}
function i(e) {
  return document.createElement(e);
}
function E(e) {
  return document.createTextNode(e);
}
function c() {
  return E(" ");
}
function b(e, l, a, u) {
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
function Lt(e, l, a) {
  e.classList.toggle(l, !!a);
}
let qe;
function $e(e) {
  qe = e;
}
const fe = [], Mt = [];
let ce = [];
const Tt = [], Ht = /* @__PURE__ */ Promise.resolve();
let Ve = !1;
function Jt() {
  Ve || (Ve = !0, Ht.then(Dt));
}
function We(e) {
  ce.push(e);
}
const Ue = /* @__PURE__ */ new Set();
let oe = 0;
function Dt() {
  if (oe !== 0)
    return;
  const e = qe;
  do {
    try {
      for (; oe < fe.length; ) {
        const l = fe[oe];
        oe++, $e(l), St(l.$$);
      }
    } catch (l) {
      throw fe.length = 0, oe = 0, l;
    }
    for ($e(null), fe.length = 0, oe = 0; Mt.length; ) Mt.pop()();
    for (let l = 0; l < ce.length; l += 1) {
      const a = ce[l];
      Ue.has(a) || (Ue.add(a), a());
    }
    ce.length = 0;
  } while (fe.length);
  for (; Tt.length; )
    Tt.pop()();
  Ve = !1, Ue.clear(), $e(e);
}
function St(e) {
  if (e.fragment !== null) {
    e.update(), Le(e.before_update);
    const l = e.dirty;
    e.dirty = [-1], e.fragment && e.fragment.p(e.ctx, l), e.after_update.forEach(We);
  }
}
function Xt(e) {
  const l = [], a = [];
  ce.forEach((u) => e.indexOf(u) === -1 ? l.push(u) : a.push(u)), a.forEach((u) => u()), ce = l;
}
const Ut = /* @__PURE__ */ new Set();
function Vt(e, l) {
  e && e.i && (Ut.delete(e), e.i(l));
}
function Wt(e, l, a) {
  const { fragment: u, after_update: y } = e.$$;
  u && u.m(l, a), We(() => {
    const v = e.$$.on_mount.map(It).filter(Ot);
    e.$$.on_destroy ? e.$$.on_destroy.push(...v) : Le(v), e.$$.on_mount = [];
  }), y.forEach(We);
}
function qt(e, l) {
  const a = e.$$;
  a.fragment !== null && (Xt(a.after_update), Le(a.on_destroy), a.fragment && a.fragment.d(l), a.on_destroy = a.fragment = null, a.ctx = []);
}
function zt(e, l) {
  e.$$.dirty[0] === -1 && (fe.push(e), Jt(), e.$$.dirty.fill(0)), e.$$.dirty[l / 31 | 0] |= 1 << l % 31;
}
function Kt(e, l, a, u, y, v, p = null, $ = [-1]) {
  const w = qe;
  $e(e);
  const d = e.$$ = {
    fragment: null,
    ctx: [],
    // state
    props: v,
    update: Ce,
    not_equal: y,
    bound: Ct(),
    // lifecycle
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(l.context || (w ? w.$$.context : [])),
    // everything else
    callbacks: Ct(),
    dirty: $,
    skip_bound: !1,
    root: l.target || w.$$.root
  };
  p && p(d.root);
  let M = !1;
  if (d.ctx = a ? a(e, l.props || {}, (_, f, ...g) => {
    const k = g.length ? g[0] : f;
    return d.ctx && y(d.ctx[_], d.ctx[_] = k) && (!d.skip_bound && d.bound[_] && d.bound[_](k), M && zt(e, _)), f;
  }) : [], d.update(), M = !0, Le(d.before_update), d.fragment = u ? u(d.ctx) : !1, l.target) {
    if (l.hydrate) {
      const _ = Gt(l.target);
      d.fragment && d.fragment.l(_), _.forEach(jt);
    } else
      d.fragment && d.fragment.c();
    l.intro && Vt(e.$$.fragment), Wt(e, l.target, l.anchor), Dt();
  }
  $e(w);
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
    Xe(this, "$$");
    /**
     * ### PRIVATE API
     *
     * Do not use, may change at any time
     *
     * @type {any}
     */
    Xe(this, "$$set");
  }
  /** @returns {void} */
  $destroy() {
    qt(this, 1), this.$destroy = Ce;
  }
  /**
   * @template {Extract<keyof Events, string>} K
   * @param {K} type
   * @param {((e: Events[K]) => void) | null | undefined} callback
   * @returns {() => void}
   */
  $on(l, a) {
    if (!Ot(a))
      return Ce;
    const u = this.$$.callbacks[l] || (this.$$.callbacks[l] = []);
    return u.push(a), () => {
      const y = u.indexOf(a);
      y !== -1 && u.splice(y, 1);
    };
  }
  /**
   * @param {Partial<Props>} props
   * @returns {void}
   */
  $set(l) {
    this.$$set && !Rt(l) && (this.$$.skip_bound = !0, this.$$set(l), this.$$.skip_bound = !1);
  }
}
const Yt = "4";
typeof window < "u" && (window.__svelte || (window.__svelte = { v: /* @__PURE__ */ new Set() })).v.add(Yt);
function Zt(e) {
  let l, a, u, y, v, p, $, w, d, M, _, f, g, k, Q, W, q, F, Y, Me, T, ne, Te, o, V, Ie, s, z, pe, I, ve, ze, Oe, Ke, O, me, Qe, Z, Ye, j, je, Ze, D, ge, et, De, tt, N, be, lt, P, Ne, nt, C, _e, at, Pe, rt, L, he, it, ee, st, A, Ae, ut, R, we, ot, Re, dt, B, ye, ft, te, ct, G, Be, pt, H, Ee, vt, Ge, mt, J, ke, gt, le, bt, ae, _t, S, He, ht, X, Fe, wt, Je, yt, U, xe, Et, x, re, kt, ie, Ft, se, xt, ue, Se, $t;
  return {
    c() {
      l = i("div"), a = i("div"), u = i("div"), u.textContent = "Schedule period", y = c(), v = i("div"), p = i("label"), $ = E("Schedule start "), w = i("input"), M = c(), _ = i("label"), f = E("Weeks "), g = i("input"), Q = c(), W = i("label"), q = E("Generate seed "), F = i("input"), Me = c(), T = i("details"), ne = i("summary"), ne.textContent = "FTE", Te = c(), o = i("div"), V = i("div"), V.textContent = "FT TSO", Ie = c(), s = i("div"), z = i("label"), pe = E("Male "), I = i("input"), ze = c(), Oe = i("label"), Ke = E("Female "), O = i("input"), Qe = c(), Z = i("div"), Z.textContent = "PT TSO", Ye = c(), j = i("div"), je = i("label"), Ze = E("Male "), D = i("input"), et = c(), De = i("label"), tt = E("Female "), N = i("input"), lt = c(), P = i("div"), Ne = i("label"), nt = E("Hours/day "), C = i("input"), at = c(), Pe = i("label"), rt = E("Days/week "), L = i("input"), it = c(), ee = i("div"), ee.textContent = "LTSO", st = c(), A = i("div"), Ae = i("label"), ut = E("Male "), R = i("input"), ot = c(), Re = i("label"), dt = E("Female "), B = i("input"), ft = c(), te = i("div"), te.textContent = "STSO", ct = c(), G = i("div"), Be = i("label"), pt = E("Male "), H = i("input"), vt = c(), Ge = i("label"), mt = E("Female "), J = i("input"), gt = c(), le = i("div"), le.textContent = "Training dept", bt = c(), ae = i("p"), ae.textContent = "ESTI and MSTI are training classes — no sex, not ops FTE.", _t = c(), S = i("div"), He = i("label"), ht = E("ESTI "), X = i("input"), wt = c(), Je = i("label"), yt = E("MSTI "), U = i("input"), Et = c(), x = i("div"), re = i("button"), re.textContent = "[GEN] GENERATE", kt = c(), ie = i("button"), ie.textContent = "[EXP] EXPORT", Ft = c(), se = i("button"), se.textContent = "[IMP] IMPORT", xt = c(), ue = i("button"), ue.textContent = "[CLR] CLEAR", n(u, "class", "section-title"), n(w, "type", "date"), n(w, "id", "svelte-cfg-start"), w.value = d = /*period*/
      e[1].startDate || "", n(g, "type", "number"), n(g, "id", "svelte-cfg-weeks"), n(g, "min", "1"), n(g, "max", "8"), g.value = k = /*period*/
      e[1].weeks || 1, r(g, "width", "4.5rem"), n(F, "type", "text"), n(F, "id", "svelte-cfg-generate-seed"), n(F, "placeholder", "random"), F.value = Y = /*period*/
      e[1].generateSeed || "random", r(F, "width", "6.5rem"), n(F, "title", "Leave as 'random' or enter a number for reproducible scheduling"), n(v, "class", "period-row"), r(v, "display", "flex"), r(v, "flex-wrap", "wrap"), r(v, "gap", "1rem"), r(v, "align-items", "center"), n(a, "class", "card"), n(ne, "class", "section-title"), n(V, "class", "fte-role"), r(V, "text-align", "center"), r(V, "font-weight", "700"), r(V, "margin", "0.85rem 0 0.35rem"), n(I, "type", "number"), n(I, "id", "svelte-cfg-ft-m"), n(I, "min", "0"), I.value = ve = /*fte*/
      e[0].ftM || 10, r(I, "width", "4.5rem"), n(O, "type", "number"), n(O, "id", "svelte-cfg-ft-f"), n(O, "min", "0"), O.value = me = /*fte*/
      e[0].ftF || 10, r(O, "width", "4.5rem"), n(s, "class", "fte-sex-row"), r(s, "display", "flex"), r(s, "justify-content", "center"), r(s, "gap", "2rem"), r(s, "flex-wrap", "wrap"), n(Z, "class", "fte-role"), r(Z, "text-align", "center"), r(Z, "font-weight", "700"), r(Z, "margin", "0.85rem 0 0.35rem"), n(D, "type", "number"), n(D, "id", "svelte-cfg-pt-m"), n(D, "min", "0"), D.value = ge = /*fte*/
      e[0].ptM || 4, r(D, "width", "4.5rem"), n(N, "type", "number"), n(N, "id", "svelte-cfg-pt-f"), n(N, "min", "0"), N.value = be = /*fte*/
      e[0].ptF || 4, r(N, "width", "4.5rem"), n(j, "class", "fte-sex-row"), r(j, "display", "flex"), r(j, "justify-content", "center"), r(j, "gap", "2rem"), r(j, "flex-wrap", "wrap"), n(C, "type", "number"), n(C, "id", "svelte-cfg-pt-hours"), n(C, "min", "1"), n(C, "max", "12"), C.value = _e = /*fte*/
      e[0].ptHours || 4, r(C, "width", "4.5rem"), n(L, "type", "number"), n(L, "id", "svelte-cfg-pt-days"), n(L, "min", "1"), n(L, "max", "6"), L.value = he = /*fte*/
      e[0].ptDays || 3, r(L, "width", "4.5rem"), n(P, "class", "fte-sex-row"), r(P, "display", "flex"), r(P, "justify-content", "center"), r(P, "gap", "2rem"), r(P, "flex-wrap", "wrap"), n(ee, "class", "fte-role"), r(ee, "text-align", "center"), r(ee, "font-weight", "700"), r(ee, "margin", "0.85rem 0 0.35rem"), n(R, "type", "number"), n(R, "id", "svelte-cfg-ltso-m"), n(R, "min", "0"), R.value = we = /*fte*/
      e[0].ltsoM || 1, r(R, "width", "4.5rem"), n(B, "type", "number"), n(B, "id", "svelte-cfg-ltso-f"), n(B, "min", "0"), B.value = ye = /*fte*/
      e[0].ltsoF || 1, r(B, "width", "4.5rem"), n(A, "class", "fte-sex-row"), r(A, "display", "flex"), r(A, "justify-content", "center"), r(A, "gap", "2rem"), r(A, "flex-wrap", "wrap"), n(te, "class", "fte-role"), r(te, "text-align", "center"), r(te, "font-weight", "700"), r(te, "margin", "0.85rem 0 0.35rem"), n(H, "type", "number"), n(H, "id", "svelte-cfg-stso-m"), n(H, "min", "0"), H.value = Ee = /*fte*/
      e[0].stsoM || 2, r(H, "width", "4.5rem"), n(J, "type", "number"), n(J, "id", "svelte-cfg-stso-f"), n(J, "min", "0"), J.value = ke = /*fte*/
      e[0].stsoF || 2, r(J, "width", "4.5rem"), n(G, "class", "fte-sex-row"), r(G, "display", "flex"), r(G, "justify-content", "center"), r(G, "gap", "2rem"), r(G, "flex-wrap", "wrap"), n(le, "class", "fte-role"), r(le, "text-align", "center"), r(le, "font-weight", "700"), r(le, "margin", "0.85rem 0 0.35rem"), n(ae, "class", "muted"), r(ae, "margin", "0 0 0.35rem"), r(ae, "text-align", "center"), n(X, "type", "number"), n(X, "id", "svelte-cfg-esti"), n(X, "min", "0"), X.value = Fe = /*fte*/
      e[0].esti || 0, r(X, "width", "4.5rem"), n(U, "type", "number"), n(U, "id", "svelte-cfg-msti"), n(U, "min", "0"), U.value = xe = /*fte*/
      e[0].msti || 0, r(U, "width", "4.5rem"), n(S, "class", "fte-sex-row"), r(S, "display", "flex"), r(S, "justify-content", "center"), r(S, "gap", "2rem"), r(S, "flex-wrap", "wrap"), n(o, "class", "fte-block"), n(T, "class", "card setup-fold"), n(T, "id", "svelte-card-fte"), T.open = !0, n(re, "type", "button"), n(re, "class", "btn btn-amber"), n(ie, "type", "button"), n(ie, "class", "btn"), n(se, "type", "button"), n(se, "class", "btn"), n(ue, "type", "button"), n(ue, "class", "btn btn-red"), n(x, "class", "toolbar"), r(x, "margin-top", "0.75rem"), r(x, "gap", "0.5rem"), r(x, "flex-wrap", "wrap"), n(l, "id", "setup-svelte-root"), n(l, "class", "setup-svelte-form"), Lt(l, "hidden", !/*disabled*/
      e[2]);
    },
    m(m, h) {
      Bt(m, l, h), t(l, a), t(a, u), t(a, y), t(a, v), t(v, p), t(p, $), t(p, w), t(v, M), t(v, _), t(_, f), t(_, g), t(v, Q), t(v, W), t(W, q), t(W, F), t(l, Me), t(l, T), t(T, ne), t(T, Te), t(T, o), t(o, V), t(o, Ie), t(o, s), t(s, z), t(z, pe), t(z, I), t(s, ze), t(s, Oe), t(Oe, Ke), t(Oe, O), t(o, Qe), t(o, Z), t(o, Ye), t(o, j), t(j, je), t(je, Ze), t(je, D), t(j, et), t(j, De), t(De, tt), t(De, N), t(o, lt), t(o, P), t(P, Ne), t(Ne, nt), t(Ne, C), t(P, at), t(P, Pe), t(Pe, rt), t(Pe, L), t(o, it), t(o, ee), t(o, st), t(o, A), t(A, Ae), t(Ae, ut), t(Ae, R), t(A, ot), t(A, Re), t(Re, dt), t(Re, B), t(o, ft), t(o, te), t(o, ct), t(o, G), t(G, Be), t(Be, pt), t(Be, H), t(G, vt), t(G, Ge), t(Ge, mt), t(Ge, J), t(o, gt), t(o, le), t(o, bt), t(o, ae), t(o, _t), t(o, S), t(S, He), t(He, ht), t(He, X), t(S, wt), t(S, Je), t(Je, yt), t(Je, U), t(l, Et), t(l, x), t(x, re), t(x, kt), t(x, ie), t(x, Ft), t(x, se), t(x, xt), t(x, ue), Se || ($t = [
        b(
          w,
          "change",
          /*change_handler*/
          e[5]
        ),
        b(
          g,
          "change",
          /*change_handler_1*/
          e[6]
        ),
        b(
          F,
          "change",
          /*change_handler_2*/
          e[7]
        ),
        b(
          I,
          "blur",
          /*blur_handler*/
          e[8]
        ),
        b(
          O,
          "blur",
          /*blur_handler_1*/
          e[9]
        ),
        b(
          D,
          "blur",
          /*blur_handler_2*/
          e[10]
        ),
        b(
          N,
          "blur",
          /*blur_handler_3*/
          e[11]
        ),
        b(
          C,
          "blur",
          /*blur_handler_4*/
          e[12]
        ),
        b(
          L,
          "blur",
          /*blur_handler_5*/
          e[13]
        ),
        b(
          R,
          "blur",
          /*blur_handler_6*/
          e[14]
        ),
        b(
          B,
          "blur",
          /*blur_handler_7*/
          e[15]
        ),
        b(
          H,
          "blur",
          /*blur_handler_8*/
          e[16]
        ),
        b(
          J,
          "blur",
          /*blur_handler_9*/
          e[17]
        ),
        b(
          X,
          "blur",
          /*blur_handler_10*/
          e[18]
        ),
        b(
          U,
          "blur",
          /*blur_handler_11*/
          e[19]
        ),
        b(
          re,
          "click",
          /*click_handler*/
          e[20]
        ),
        b(
          ie,
          "click",
          /*click_handler_1*/
          e[21]
        ),
        b(
          se,
          "click",
          /*click_handler_2*/
          e[22]
        ),
        b(
          ue,
          "click",
          /*click_handler_3*/
          e[23]
        )
      ], Se = !0);
    },
    p(m, [h]) {
      h & /*period*/
      2 && d !== (d = /*period*/
      m[1].startDate || "") && (w.value = d), h & /*period*/
      2 && k !== (k = /*period*/
      m[1].weeks || 1) && g.value !== k && (g.value = k), h & /*period*/
      2 && Y !== (Y = /*period*/
      m[1].generateSeed || "random") && F.value !== Y && (F.value = Y), h & /*fte*/
      1 && ve !== (ve = /*fte*/
      m[0].ftM || 10) && I.value !== ve && (I.value = ve), h & /*fte*/
      1 && me !== (me = /*fte*/
      m[0].ftF || 10) && O.value !== me && (O.value = me), h & /*fte*/
      1 && ge !== (ge = /*fte*/
      m[0].ptM || 4) && D.value !== ge && (D.value = ge), h & /*fte*/
      1 && be !== (be = /*fte*/
      m[0].ptF || 4) && N.value !== be && (N.value = be), h & /*fte*/
      1 && _e !== (_e = /*fte*/
      m[0].ptHours || 4) && C.value !== _e && (C.value = _e), h & /*fte*/
      1 && he !== (he = /*fte*/
      m[0].ptDays || 3) && L.value !== he && (L.value = he), h & /*fte*/
      1 && we !== (we = /*fte*/
      m[0].ltsoM || 1) && R.value !== we && (R.value = we), h & /*fte*/
      1 && ye !== (ye = /*fte*/
      m[0].ltsoF || 1) && B.value !== ye && (B.value = ye), h & /*fte*/
      1 && Ee !== (Ee = /*fte*/
      m[0].stsoM || 2) && H.value !== Ee && (H.value = Ee), h & /*fte*/
      1 && ke !== (ke = /*fte*/
      m[0].stsoF || 2) && J.value !== ke && (J.value = ke), h & /*fte*/
      1 && Fe !== (Fe = /*fte*/
      m[0].esti || 0) && X.value !== Fe && (X.value = Fe), h & /*fte*/
      1 && xe !== (xe = /*fte*/
      m[0].msti || 0) && U.value !== xe && (U.value = xe), h & /*disabled*/
      4 && Lt(l, "hidden", !/*disabled*/
      m[2]);
    },
    i: Ce,
    o: Ce,
    d(m) {
      m && jt(l), Se = !1, Le($t);
    }
  };
}
function de(e, l = {}) {
  window.dispatchEvent(new CustomEvent(e, { detail: l }));
}
function el(e, l, a) {
  let { fte: u = {} } = l, { period: y = {} } = l, { disabled: v = !1 } = l;
  function p(s, z) {
    const pe = Number(z);
    isNaN(pe) || de("setup:fte-change", { ...u, [s]: pe });
  }
  function $(s, z) {
    de("setup:period-change", { ...y, [s]: z });
  }
  const w = (s) => {
    $("startDate", s.target.value);
  }, d = (s) => {
    $("weeks", s.target.value);
  }, M = (s) => {
    $("generateSeed", s.target.value);
  }, _ = (s) => p("ftM", s.target.value), f = (s) => p("ftF", s.target.value), g = (s) => p("ptM", s.target.value), k = (s) => p("ptF", s.target.value), Q = (s) => p("ptHours", s.target.value), W = (s) => p("ptDays", s.target.value), q = (s) => p("ltsoM", s.target.value), F = (s) => p("ltsoF", s.target.value), Y = (s) => p("stsoM", s.target.value), Me = (s) => p("stsoF", s.target.value), T = (s) => p("esti", s.target.value), ne = (s) => p("msti", s.target.value), Te = () => de("setup:generate"), o = () => de("setup:export"), V = () => de("setup:import"), Ie = () => de("setup:clear");
  return e.$$set = (s) => {
    "fte" in s && a(0, u = s.fte), "period" in s && a(1, y = s.period), "disabled" in s && a(2, v = s.disabled);
  }, [
    u,
    y,
    v,
    p,
    $,
    w,
    d,
    M,
    _,
    f,
    g,
    k,
    Q,
    W,
    q,
    F,
    Y,
    Me,
    T,
    ne,
    Te,
    o,
    V,
    Ie
  ];
}
class tl extends Qt {
  constructor(l) {
    super(), Kt(this, l, el, Zt, At, { fte: 0, period: 1, disabled: 2 });
  }
}
let K = null;
function nl(e) {
  const l = "setup-svelte-root";
  let a = document.getElementById(l);
  if (!a) {
    a = document.createElement("div"), a.id = l;
    const f = document.getElementById("tab-setup");
    f && f.prepend(a);
  }
  a.style.display = "block";
  const u = a.closest("#tab-setup");
  u && u.classList.add("setup-svelte-active"), K && K.$destroy();
  const y = e && e.state && e.state.fte ? e.state.fte : {}, v = e && e.state ? {
    startDate: e.state.startDate || "",
    weeks: e.state.weeks || 1,
    generateSeed: e.state.generateSeed || "random"
  } : {};
  K = new tl({
    target: a,
    props: {
      fte: y,
      period: v,
      disabled: !0
    }
  });
  function p(f) {
    e && e.applyFte && e.applyFte(f.detail);
  }
  function $(f) {
    e && e.state && (f.detail.startDate !== void 0 && (e.state.startDate = f.detail.startDate), f.detail.weeks !== void 0 && (e.state.weekCount = f.detail.weeks), f.detail.generateSeed !== void 0 && (e.state.generateSeed = f.detail.generateSeed));
  }
  function w() {
    e && e.generate && e.generate();
  }
  function d() {
    e && e.exportBoardExcel && e.exportBoardExcel();
  }
  function M() {
    e && e.clearAll && e.clearAll();
  }
  function _() {
    if (!(!e || !e.importJsonFile)) {
      var f = document.createElement("input");
      f.type = "file", f.accept = "application/json,.json", f.onchange = function(g) {
        var k = g.target.files && g.target.files[0];
        if (k) {
          var Q = new FileReader();
          Q.onload = function(W) {
            try {
              e.applyPayload(JSON.parse(W.target.result));
            } catch (q) {
              e.updateStatus && e.updateStatus("Import failed."), e.state.issues = ["Import failed: " + (q && q.message ? q.message : "Invalid JSON")], e.renderIssues && e.renderIssues();
            }
          }, Q.readAsText(k), f.remove();
        }
      }, document.body.appendChild(f), f.click();
    }
  }
  window.addEventListener("setup:fte-change", p), window.addEventListener("setup:period-change", $), window.addEventListener("setup:generate", w), window.addEventListener("setup:export", d), window.addEventListener("setup:clear", M), window.addEventListener("setup:import", _), K.$on("destroy", () => {
    window.removeEventListener("setup:fte-change", p), window.removeEventListener("setup:period-change", $), window.removeEventListener("setup:generate", w), window.removeEventListener("setup:export", d), window.removeEventListener("setup:clear", M), window.removeEventListener("setup:import", _), K = null;
  });
}
function al() {
  K && (K.$destroy(), K = null);
}
export {
  al as destroySetupSvelte,
  nl as initSetupSvelte
};
