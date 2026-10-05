var Nt = Object.defineProperty;
var At = (e, t, a) => t in e ? Nt(e, t, { enumerable: !0, configurable: !0, writable: !0, value: a }) : e[t] = a;
var qe = (e, t, a) => At(e, typeof t != "symbol" ? t + "" : t, a);
function xe() {
}
function It(e) {
  return e();
}
function xt() {
  return /* @__PURE__ */ Object.create(null);
}
function $e(e) {
  e.forEach(It);
}
function Tt(e) {
  return typeof e == "function";
}
function Bt(e, t) {
  return e != e ? t == t : e !== t || e && typeof e == "object" || typeof e == "function";
}
function Rt(e) {
  return Object.keys(e).length === 0;
}
function l(e, t) {
  e.appendChild(t);
}
function Ht(e, t, a) {
  e.insertBefore(t, a || null);
}
function Ot(e) {
  e.parentNode && e.parentNode.removeChild(e);
}
function r(e) {
  return document.createElement(e);
}
function E(e) {
  return document.createTextNode(e);
}
function c() {
  return E(" ");
}
function g(e, t, a, o) {
  return e.addEventListener(t, a, o), () => e.removeEventListener(t, a, o);
}
function n(e, t, a) {
  a == null ? e.removeAttribute(t) : e.getAttribute(t) !== a && e.setAttribute(t, a);
}
function Wt(e) {
  return Array.from(e.childNodes);
}
function s(e, t, a, o) {
  a == null ? e.style.removeProperty(t) : e.style.setProperty(t, a, "");
}
function $t(e, t, a) {
  e.classList.toggle(t, !!a);
}
let Ke;
function Ce(e) {
  Ke = e;
}
const ce = [], Lt = [];
let pe = [];
const Dt = [], Gt = /* @__PURE__ */ Promise.resolve();
let Ve = !1;
function Jt() {
  Ve || (Ve = !0, Gt.then(jt));
}
function ze(e) {
  pe.push(e);
}
const Ue = /* @__PURE__ */ new Set();
let de = 0;
function jt() {
  if (de !== 0)
    return;
  const e = Ke;
  do {
    try {
      for (; de < ce.length; ) {
        const t = ce[de];
        de++, Ce(t), Xt(t.$$);
      }
    } catch (t) {
      throw ce.length = 0, de = 0, t;
    }
    for (Ce(null), ce.length = 0, de = 0; Lt.length; ) Lt.pop()();
    for (let t = 0; t < pe.length; t += 1) {
      const a = pe[t];
      Ue.has(a) || (Ue.add(a), a());
    }
    pe.length = 0;
  } while (ce.length);
  for (; Dt.length; )
    Dt.pop()();
  Ve = !1, Ue.clear(), Ce(e);
}
function Xt(e) {
  if (e.fragment !== null) {
    e.update(), $e(e.before_update);
    const t = e.dirty;
    e.dirty = [-1], e.fragment && e.fragment.p(e.ctx, t), e.after_update.forEach(ze);
  }
}
function qt(e) {
  const t = [], a = [];
  pe.forEach((o) => e.indexOf(o) === -1 ? t.push(o) : a.push(o)), a.forEach((o) => o()), pe = t;
}
const Ut = /* @__PURE__ */ new Set();
function Vt(e, t) {
  e && e.i && (Ut.delete(e), e.i(t));
}
function zt(e, t, a) {
  const { fragment: o, after_update: y } = e.$$;
  o && o.m(t, a), ze(() => {
    const v = e.$$.on_mount.map(It).filter(Tt);
    e.$$.on_destroy ? e.$$.on_destroy.push(...v) : $e(v), e.$$.on_mount = [];
  }), y.forEach(ze);
}
function Kt(e, t) {
  const a = e.$$;
  a.fragment !== null && (qt(a.after_update), $e(a.on_destroy), a.fragment && a.fragment.d(t), a.on_destroy = a.fragment = null, a.ctx = []);
}
function Qt(e, t) {
  e.$$.dirty[0] === -1 && (ce.push(e), Jt(), e.$$.dirty.fill(0)), e.$$.dirty[t / 31 | 0] |= 1 << t % 31;
}
function Yt(e, t, a, o, y, v, p = null, M = [-1]) {
  const h = Ke;
  Ce(e);
  const f = e.$$ = {
    fragment: null,
    ctx: [],
    // state
    props: v,
    update: xe,
    not_equal: y,
    bound: xt(),
    // lifecycle
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(t.context || (h ? h.$$.context : [])),
    // everything else
    callbacks: xt(),
    dirty: M,
    skip_bound: !1,
    root: t.target || h.$$.root
  };
  p && p(f.root);
  let $ = !1;
  if (f.ctx = a ? a(e, t.props || {}, (b, U, ...u) => {
    const k = u.length ? u[0] : U;
    return f.ctx && y(f.ctx[b], f.ctx[b] = k) && (!f.skip_bound && f.bound[b] && f.bound[b](k), $ && Qt(e, b)), U;
  }) : [], f.update(), $ = !0, $e(f.before_update), f.fragment = o ? o(f.ctx) : !1, t.target) {
    if (t.hydrate) {
      const b = Wt(t.target);
      f.fragment && f.fragment.l(b), b.forEach(Ot);
    } else
      f.fragment && f.fragment.c();
    t.intro && Vt(e.$$.fragment), zt(e, t.target, t.anchor), jt();
  }
  Ce(h);
}
class Zt {
  constructor() {
    /**
     * ### PRIVATE API
     *
     * Do not use, may change at any time
     *
     * @type {any}
     */
    qe(this, "$$");
    /**
     * ### PRIVATE API
     *
     * Do not use, may change at any time
     *
     * @type {any}
     */
    qe(this, "$$set");
  }
  /** @returns {void} */
  $destroy() {
    Kt(this, 1), this.$destroy = xe;
  }
  /**
   * @template {Extract<keyof Events, string>} K
   * @param {K} type
   * @param {((e: Events[K]) => void) | null | undefined} callback
   * @returns {() => void}
   */
  $on(t, a) {
    if (!Tt(a))
      return xe;
    const o = this.$$.callbacks[t] || (this.$$.callbacks[t] = []);
    return o.push(a), () => {
      const y = o.indexOf(a);
      y !== -1 && o.splice(y, 1);
    };
  }
  /**
   * @param {Partial<Props>} props
   * @returns {void}
   */
  $set(t) {
    this.$$set && !Rt(t) && (this.$$.skip_bound = !0, this.$$set(t), this.$$.skip_bound = !1);
  }
}
const St = "4";
typeof window < "u" && (window.__svelte || (window.__svelte = { v: /* @__PURE__ */ new Set() })).v.add(St);
function el(e) {
  let t, a, o, y, v, p, M, h, f, $, b, U, u, k, Y, V, ne, w, Z, Le, L, ae, De, d, z, Ie, i, K, ve, D, me, Qe, Te, Ye, I, ge, Ze, S, Se, T, Oe, et, O, be, tt, je, lt, j, _e, nt, N, Ne, at, C, he, st, Ae, rt, x, we, it, ee, ut, A, Be, ot, B, ye, dt, Re, ft, R, Ee, ct, te, pt, H, He, vt, W, ke, mt, We, gt, G, Fe, bt, le, _t, se, ht, J, Ge, wt, X, Me, yt, Je, Et, q, Pe, kt, F, re, Ft, ie, Mt, ue, Pt, oe, Xe, Ct;
  return {
    c() {
      t = r("div"), a = r("div"), o = r("div"), o.textContent = "Schedule period", y = c(), v = r("div"), p = r("label"), M = E("Schedule start "), h = r("input"), $ = c(), b = r("label"), U = E("Weeks "), u = r("input"), Y = c(), V = r("label"), ne = E("Generate seed "), w = r("input"), Le = c(), L = r("details"), ae = r("summary"), ae.textContent = "FTE", De = c(), d = r("div"), z = r("div"), z.textContent = "FT TSO", Ie = c(), i = r("div"), K = r("label"), ve = E("Male "), D = r("input"), Qe = c(), Te = r("label"), Ye = E("Female "), I = r("input"), Ze = c(), S = r("div"), S.textContent = "PT TSO", Se = c(), T = r("div"), Oe = r("label"), et = E("Male "), O = r("input"), tt = c(), je = r("label"), lt = E("Female "), j = r("input"), nt = c(), N = r("div"), Ne = r("label"), at = E("Hours/day "), C = r("input"), st = c(), Ae = r("label"), rt = E("Days/week "), x = r("input"), it = c(), ee = r("div"), ee.textContent = "LTSO", ut = c(), A = r("div"), Be = r("label"), ot = E("Male "), B = r("input"), dt = c(), Re = r("label"), ft = E("Female "), R = r("input"), ct = c(), te = r("div"), te.textContent = "STSO", pt = c(), H = r("div"), He = r("label"), vt = E("Male "), W = r("input"), mt = c(), We = r("label"), gt = E("Female "), G = r("input"), bt = c(), le = r("div"), le.textContent = "Training dept", _t = c(), se = r("p"), se.textContent = "ESTI and MSTI are training classes — no sex, not ops FTE.", ht = c(), J = r("div"), Ge = r("label"), wt = E("ESTI "), X = r("input"), yt = c(), Je = r("label"), Et = E("MSTI "), q = r("input"), kt = c(), F = r("div"), re = r("button"), re.textContent = "[GEN] GENERATE", Ft = c(), ie = r("button"), ie.textContent = "[EXP] EXPORT", Mt = c(), ue = r("button"), ue.textContent = "[IMP] IMPORT", Pt = c(), oe = r("button"), oe.textContent = "[CLR] CLEAR", n(o, "class", "section-title"), n(h, "type", "date"), n(h, "id", "svelte-cfg-start"), h.value = f = /*period*/
      e[1].startDate || "", n(u, "type", "number"), n(u, "id", "svelte-cfg-weeks"), n(u, "min", "1"), n(u, "max", "8"), u.value = k = /*period*/
      e[1].weeks || 1, s(u, "width", "4.5rem"), n(w, "type", "text"), n(w, "id", "svelte-cfg-generate-seed"), n(w, "placeholder", "random"), w.value = Z = /*period*/
      e[1].generateSeed || "random", s(w, "width", "6.5rem"), n(w, "title", "Leave as 'random' or enter a number for reproducible scheduling"), n(v, "class", "period-row"), s(v, "display", "flex"), s(v, "flex-wrap", "wrap"), s(v, "gap", "1rem"), s(v, "align-items", "center"), n(a, "class", "card"), n(ae, "class", "section-title"), n(z, "class", "fte-role"), s(z, "text-align", "center"), s(z, "font-weight", "700"), s(z, "margin", "0.85rem 0 0.35rem"), n(D, "type", "number"), n(D, "id", "svelte-cfg-ft-m"), n(D, "min", "0"), D.value = me = /*fte*/
      e[0].ftM || 10, s(D, "width", "4.5rem"), n(I, "type", "number"), n(I, "id", "svelte-cfg-ft-f"), n(I, "min", "0"), I.value = ge = /*fte*/
      e[0].ftF || 10, s(I, "width", "4.5rem"), n(i, "class", "fte-sex-row"), s(i, "display", "flex"), s(i, "justify-content", "center"), s(i, "gap", "2rem"), s(i, "flex-wrap", "wrap"), n(S, "class", "fte-role"), s(S, "text-align", "center"), s(S, "font-weight", "700"), s(S, "margin", "0.85rem 0 0.35rem"), n(O, "type", "number"), n(O, "id", "svelte-cfg-pt-m"), n(O, "min", "0"), O.value = be = /*fte*/
      e[0].ptM || 4, s(O, "width", "4.5rem"), n(j, "type", "number"), n(j, "id", "svelte-cfg-pt-f"), n(j, "min", "0"), j.value = _e = /*fte*/
      e[0].ptF || 4, s(j, "width", "4.5rem"), n(T, "class", "fte-sex-row"), s(T, "display", "flex"), s(T, "justify-content", "center"), s(T, "gap", "2rem"), s(T, "flex-wrap", "wrap"), n(C, "type", "number"), n(C, "id", "svelte-cfg-pt-hours"), n(C, "min", "1"), n(C, "max", "12"), C.value = he = /*fte*/
      e[0].ptHoursPerDay || 4, s(C, "width", "4.5rem"), n(x, "type", "number"), n(x, "id", "svelte-cfg-pt-days"), n(x, "min", "1"), n(x, "max", "6"), x.value = we = /*fte*/
      e[0].ptDaysPerWeek || 3, s(x, "width", "4.5rem"), n(N, "class", "fte-sex-row"), s(N, "display", "flex"), s(N, "justify-content", "center"), s(N, "gap", "2rem"), s(N, "flex-wrap", "wrap"), n(ee, "class", "fte-role"), s(ee, "text-align", "center"), s(ee, "font-weight", "700"), s(ee, "margin", "0.85rem 0 0.35rem"), n(B, "type", "number"), n(B, "id", "svelte-cfg-ltso-m"), n(B, "min", "0"), B.value = ye = /*fte*/
      e[0].ltsoM || 1, s(B, "width", "4.5rem"), n(R, "type", "number"), n(R, "id", "svelte-cfg-ltso-f"), n(R, "min", "0"), R.value = Ee = /*fte*/
      e[0].ltsoF || 1, s(R, "width", "4.5rem"), n(A, "class", "fte-sex-row"), s(A, "display", "flex"), s(A, "justify-content", "center"), s(A, "gap", "2rem"), s(A, "flex-wrap", "wrap"), n(te, "class", "fte-role"), s(te, "text-align", "center"), s(te, "font-weight", "700"), s(te, "margin", "0.85rem 0 0.35rem"), n(W, "type", "number"), n(W, "id", "svelte-cfg-stso-m"), n(W, "min", "0"), W.value = ke = /*fte*/
      e[0].stsoM || 2, s(W, "width", "4.5rem"), n(G, "type", "number"), n(G, "id", "svelte-cfg-stso-f"), n(G, "min", "0"), G.value = Fe = /*fte*/
      e[0].stsoF || 2, s(G, "width", "4.5rem"), n(H, "class", "fte-sex-row"), s(H, "display", "flex"), s(H, "justify-content", "center"), s(H, "gap", "2rem"), s(H, "flex-wrap", "wrap"), n(le, "class", "fte-role"), s(le, "text-align", "center"), s(le, "font-weight", "700"), s(le, "margin", "0.85rem 0 0.35rem"), n(se, "class", "muted"), s(se, "margin", "0 0 0.35rem"), s(se, "text-align", "center"), n(X, "type", "number"), n(X, "id", "svelte-cfg-esti"), n(X, "min", "0"), X.value = Me = /*fte*/
      e[0].esti || 0, s(X, "width", "4.5rem"), n(q, "type", "number"), n(q, "id", "svelte-cfg-msti"), n(q, "min", "0"), q.value = Pe = /*fte*/
      e[0].msti || 0, s(q, "width", "4.5rem"), n(J, "class", "fte-sex-row"), s(J, "display", "flex"), s(J, "justify-content", "center"), s(J, "gap", "2rem"), s(J, "flex-wrap", "wrap"), n(d, "class", "fte-block"), n(L, "class", "card setup-fold"), n(L, "id", "svelte-card-fte"), L.open = !0, n(re, "type", "button"), n(re, "class", "btn btn-amber"), n(ie, "type", "button"), n(ie, "class", "btn"), n(ue, "type", "button"), n(ue, "class", "btn"), n(oe, "type", "button"), n(oe, "class", "btn btn-red"), n(F, "class", "toolbar"), s(F, "margin-top", "0.75rem"), s(F, "gap", "0.5rem"), s(F, "flex-wrap", "wrap"), n(t, "id", "setup-svelte-root"), n(t, "class", "setup-svelte-form"), $t(t, "hidden", !/*disabled*/
      e[2]);
    },
    m(m, _) {
      Ht(m, t, _), l(t, a), l(a, o), l(a, y), l(a, v), l(v, p), l(p, M), l(p, h), l(v, $), l(v, b), l(b, U), l(b, u), l(v, Y), l(v, V), l(V, ne), l(V, w), l(t, Le), l(t, L), l(L, ae), l(L, De), l(L, d), l(d, z), l(d, Ie), l(d, i), l(i, K), l(K, ve), l(K, D), l(i, Qe), l(i, Te), l(Te, Ye), l(Te, I), l(d, Ze), l(d, S), l(d, Se), l(d, T), l(T, Oe), l(Oe, et), l(Oe, O), l(T, tt), l(T, je), l(je, lt), l(je, j), l(d, nt), l(d, N), l(N, Ne), l(Ne, at), l(Ne, C), l(N, st), l(N, Ae), l(Ae, rt), l(Ae, x), l(d, it), l(d, ee), l(d, ut), l(d, A), l(A, Be), l(Be, ot), l(Be, B), l(A, dt), l(A, Re), l(Re, ft), l(Re, R), l(d, ct), l(d, te), l(d, pt), l(d, H), l(H, He), l(He, vt), l(He, W), l(H, mt), l(H, We), l(We, gt), l(We, G), l(d, bt), l(d, le), l(d, _t), l(d, se), l(d, ht), l(d, J), l(J, Ge), l(Ge, wt), l(Ge, X), l(J, yt), l(J, Je), l(Je, Et), l(Je, q), l(t, kt), l(t, F), l(F, re), l(F, Ft), l(F, ie), l(F, Mt), l(F, ue), l(F, Pt), l(F, oe), Xe || (Ct = [
        g(
          h,
          "change",
          /*change_handler*/
          e[5]
        ),
        g(
          u,
          "change",
          /*change_handler_1*/
          e[6]
        ),
        g(
          w,
          "change",
          /*change_handler_2*/
          e[7]
        ),
        g(
          D,
          "blur",
          /*blur_handler*/
          e[8]
        ),
        g(
          I,
          "blur",
          /*blur_handler_1*/
          e[9]
        ),
        g(
          O,
          "blur",
          /*blur_handler_2*/
          e[10]
        ),
        g(
          j,
          "blur",
          /*blur_handler_3*/
          e[11]
        ),
        g(
          C,
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
          B,
          "blur",
          /*blur_handler_6*/
          e[14]
        ),
        g(
          R,
          "blur",
          /*blur_handler_7*/
          e[15]
        ),
        g(
          W,
          "blur",
          /*blur_handler_8*/
          e[16]
        ),
        g(
          G,
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
          q,
          "blur",
          /*blur_handler_11*/
          e[19]
        ),
        g(
          re,
          "click",
          /*click_handler*/
          e[20]
        ),
        g(
          ie,
          "click",
          /*click_handler_1*/
          e[21]
        ),
        g(
          ue,
          "click",
          /*click_handler_2*/
          e[22]
        ),
        g(
          oe,
          "click",
          /*click_handler_3*/
          e[23]
        )
      ], Xe = !0);
    },
    p(m, [_]) {
      _ & /*period*/
      2 && f !== (f = /*period*/
      m[1].startDate || "") && (h.value = f), _ & /*period*/
      2 && k !== (k = /*period*/
      m[1].weeks || 1) && u.value !== k && (u.value = k), _ & /*period*/
      2 && Z !== (Z = /*period*/
      m[1].generateSeed || "random") && w.value !== Z && (w.value = Z), _ & /*fte*/
      1 && me !== (me = /*fte*/
      m[0].ftM || 10) && D.value !== me && (D.value = me), _ & /*fte*/
      1 && ge !== (ge = /*fte*/
      m[0].ftF || 10) && I.value !== ge && (I.value = ge), _ & /*fte*/
      1 && be !== (be = /*fte*/
      m[0].ptM || 4) && O.value !== be && (O.value = be), _ & /*fte*/
      1 && _e !== (_e = /*fte*/
      m[0].ptF || 4) && j.value !== _e && (j.value = _e), _ & /*fte*/
      1 && he !== (he = /*fte*/
      m[0].ptHoursPerDay || 4) && C.value !== he && (C.value = he), _ & /*fte*/
      1 && we !== (we = /*fte*/
      m[0].ptDaysPerWeek || 3) && x.value !== we && (x.value = we), _ & /*fte*/
      1 && ye !== (ye = /*fte*/
      m[0].ltsoM || 1) && B.value !== ye && (B.value = ye), _ & /*fte*/
      1 && Ee !== (Ee = /*fte*/
      m[0].ltsoF || 1) && R.value !== Ee && (R.value = Ee), _ & /*fte*/
      1 && ke !== (ke = /*fte*/
      m[0].stsoM || 2) && W.value !== ke && (W.value = ke), _ & /*fte*/
      1 && Fe !== (Fe = /*fte*/
      m[0].stsoF || 2) && G.value !== Fe && (G.value = Fe), _ & /*fte*/
      1 && Me !== (Me = /*fte*/
      m[0].esti || 0) && X.value !== Me && (X.value = Me), _ & /*fte*/
      1 && Pe !== (Pe = /*fte*/
      m[0].msti || 0) && q.value !== Pe && (q.value = Pe), _ & /*disabled*/
      4 && $t(t, "hidden", !/*disabled*/
      m[2]);
    },
    i: xe,
    o: xe,
    d(m) {
      m && Ot(t), Xe = !1, $e(Ct);
    }
  };
}
function fe(e, t = {}) {
  window.dispatchEvent(new CustomEvent(e, { detail: t }));
}
function tl(e, t, a) {
  let { fte: o = {} } = t, { period: y = {} } = t, { disabled: v = !1 } = t;
  function p(i, K) {
    const ve = Number(K);
    isNaN(ve) || fe("setup:fte-change", { ...o, [i]: ve });
  }
  function M(i, K) {
    fe("setup:period-change", { ...y, [i]: K });
  }
  const h = (i) => {
    M("startDate", i.target.value);
  }, f = (i) => {
    M("weeks", i.target.value);
  }, $ = (i) => {
    M("generateSeed", i.target.value);
  }, b = (i) => p("ftM", i.target.value), U = (i) => p("ftF", i.target.value), u = (i) => p("ptM", i.target.value), k = (i) => p("ptF", i.target.value), Y = (i) => p("ptHoursPerDay", i.target.value), V = (i) => p("ptDaysPerWeek", i.target.value), ne = (i) => p("ltsoM", i.target.value), w = (i) => p("ltsoF", i.target.value), Z = (i) => p("stsoM", i.target.value), Le = (i) => p("stsoF", i.target.value), L = (i) => p("esti", i.target.value), ae = (i) => p("msti", i.target.value), De = () => fe("setup:generate"), d = () => fe("setup:export"), z = () => fe("setup:import"), Ie = () => fe("setup:clear");
  return e.$$set = (i) => {
    "fte" in i && a(0, o = i.fte), "period" in i && a(1, y = i.period), "disabled" in i && a(2, v = i.disabled);
  }, [
    o,
    y,
    v,
    p,
    M,
    h,
    f,
    $,
    b,
    U,
    u,
    k,
    Y,
    V,
    ne,
    w,
    Z,
    Le,
    L,
    ae,
    De,
    d,
    z,
    Ie
  ];
}
class ll extends Zt {
  constructor(t) {
    super(), Yt(this, t, tl, el, Bt, { fte: 0, period: 1, disabled: 2 });
  }
}
function P(e, t) {
  if (typeof document > "u") return t;
  const a = document.getElementById(e);
  return a && a.value != null && a.value !== "" ? a.value : t;
}
function nl(e) {
  return {
    ftM: +(P("cfg-ft-m", e.state && e.state.ftM) || 0),
    ftF: +(P("cfg-ft-f", e.state && e.state.ftF) || 0),
    ptM: +(P("cfg-pt-m", e.state && e.state.ptM) || 0),
    ptF: +(P("cfg-pt-f", e.state && e.state.ptF) || 0),
    ptHoursPerDay: +(P("cfg-pt-hours", e.state && e.state.ptHoursPerDay) || 4),
    ptDaysPerWeek: +(P("cfg-pt-days", e.state && e.state.ptDaysPerWeek) || 3),
    ltsoM: +(P("cfg-ltso-m", e.state && e.state.ltsoM) || 0),
    ltsoF: +(P("cfg-ltso-f", e.state && e.state.ltsoF) || 0),
    stsoM: +(P("cfg-stso-m", e.state && e.state.stsoM) || 0),
    stsoF: +(P("cfg-stso-f", e.state && e.state.stsoF) || 0),
    esti: +(P("cfg-esti", e.state && e.state.esti) || 0),
    msti: +(P("cfg-msti", e.state && e.state.msti) || 0)
  };
}
let Q = null;
function sl(e) {
  const t = "setup-svelte-root";
  let a = document.getElementById(t);
  if (!a) {
    a = document.createElement("div"), a.id = t;
    const u = document.getElementById("tab-setup");
    u && u.prepend(a);
  }
  a.style.display = "block";
  const o = a.closest("#tab-setup");
  o && o.classList.add("setup-svelte-active"), Q && Q.$destroy();
  const y = e && e.state ? nl(e) : {}, v = e && e.state ? {
    startDate: e.state.startDate || "",
    weeks: e.state.weekCount || 1,
    generateSeed: e.state.generateSeed || "random"
  } : {};
  Q = new ll({
    target: a,
    props: {
      fte: y,
      period: v,
      disabled: !0
    }
  });
  function p(u) {
    e && e.applyFte && e.applyFte(u.detail);
  }
  function M(u) {
    e && e.state && (u.detail.startDate !== void 0 && (e.state.startDate = u.detail.startDate), u.detail.weeks !== void 0 && (e.state.weekCount = u.detail.weeks), u.detail.generateSeed !== void 0 && (e.state.generateSeed = u.detail.generateSeed));
  }
  function h() {
    e && e.generate && e.generate();
  }
  function f() {
    e && e.exportBoardExcel && e.exportBoardExcel();
  }
  function $() {
    e && e.clearAll && e.clearAll();
  }
  function b() {
    if (!(!e || !e.importJsonFile)) {
      var u = document.createElement("input");
      u.type = "file", u.accept = "application/json,.json", u.onchange = function(k) {
        var Y = k.target.files && k.target.files[0];
        if (Y) {
          var V = new FileReader();
          V.onload = function(ne) {
            try {
              e.applyPayload(JSON.parse(ne.target.result));
            } catch (w) {
              e.updateStatus && e.updateStatus("Import failed."), e.state.issues = ["Import failed: " + (w && w.message ? w.message : "Invalid JSON")], e.renderIssues && e.renderIssues();
            }
          }, V.readAsText(Y), u.remove();
        }
      }, document.body.appendChild(u), u.click();
    }
  }
  if (typeof e.applyPayload == "function") {
    var U = e.applyPayload;
    e.applyPayload = function(u) {
      if (U(u), typeof window < "u") {
        const k = new CustomEvent("lines:request-render");
        window.dispatchEvent(k);
      }
    };
  }
  window.addEventListener("setup:fte-change", p), window.addEventListener("setup:period-change", M), window.addEventListener("setup:generate", h), window.addEventListener("setup:export", f), window.addEventListener("setup:clear", $), window.addEventListener("setup:import", b), Q.$on("destroy", () => {
    window.removeEventListener("setup:fte-change", p), window.removeEventListener("setup:period-change", M), window.removeEventListener("setup:generate", h), window.removeEventListener("setup:export", f), window.removeEventListener("setup:clear", $), window.removeEventListener("setup:import", b), Q = null;
  });
}
function rl() {
  Q && (Q.$destroy(), Q = null);
}
export {
  rl as destroySetupSvelte,
  sl as initSetupSvelte
};
