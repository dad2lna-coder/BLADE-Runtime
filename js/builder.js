window.Blade = window.Blade || {};
(function (B) {
  "use strict";
  var field = B.seedAirfield();
  var sel = { kind: "airport" };
  function $(id) { return document.getElementById(id); }
  function uid(prefix) { return prefix + "-" + Math.random().toString(36).slice(2, 6).toUpperCase(); }
  function termById(id) { return field.terminals.filter(function (t) { return t.id === id; })[0]; }
  function cpById(id) { return field.checkpoints.filter(function (c) { return c.id === id; })[0]; }
  function bagById(id) { return field.bagSites.filter(function (b) { return b.id === id; })[0]; }
  function setStatus(msg) {
    var el = $("status-chip"); if (el) el.textContent = msg;
    var foot = $("foot-status"); if (foot) foot.textContent = msg;
  }
  function render() {
    $("meta-airport").textContent = field.airport;
    var sum = B.seatSummary(field);
    $("meta-seats").textContent = sum.paxLanes + " PAX / " + sum.ait + " AIT / " + sum.bagUnits + " BAG";
    $("nav").innerHTML = renderNav();
    $("editor").innerHTML = renderEditor();
    $("payload").value = JSON.stringify(field, null, 2);
    var v = B.validate(field);
    $("notes").innerHTML =
      v.errors.map(function (e) { return '<div class="err">' + e + "</div>"; }).join("") +
      v.warnings.map(function (w) { return '<div class="warn">' + w + "</div>"; }).join("") +
      (v.errors.length ? "" : '<div class="ok">Payload can be published.</div>');
  }
  function renderNav() {
    var html = '<div class="nav-item' + (sel.kind === "airport" ? " active" : "") + '" data-act="sel" data-kind="airport"><span>Airport</span><small>' + field.airport + "</small></div>";
    html += "<h3>Terminals</h3>";
    field.terminals.forEach(function (t) {
      html += '<div class="nav-item' + (sel.kind === "terminal" && sel.id === t.id ? " active" : "") + '" data-act="sel" data-kind="terminal" data-id="' + t.id + '"><span>' + t.name + "</span><small>" + t.open + "-" + t.close + "</small></div>";
      B.cpsFor(field, t.id).forEach(function (cp) {
        html += '<div class="nav-item child' + (sel.kind === "checkpoint" && sel.id === cp.id ? " active" : "") + '" data-act="sel" data-kind="checkpoint" data-id="' + cp.id + '"><span>' + cp.name + "</span><small>" + cp.mods.length + " MS</small></div>";
      });
    });
    html += '<div class="row" style="margin:.4rem 0 .8rem"><button class="btn" data-act="add-term">+ Terminal</button></div>';
    html += "<h3>Baggage rooms</h3>";
    field.bagSites.forEach(function (b) {
      html += '<div class="nav-item' + (sel.kind === "bag" && sel.id === b.id ? " active" : "") + '" data-act="sel" data-kind="bag" data-id="' + b.id + '"><span>' + b.name + "</span><small>" + b.kind + (b.present ? "" : " OFF") + "</small></div>";
    });
    html += '<div class="row" style="margin-top:.4rem"><button class="btn" data-act="add-bag">+ Bag site</button></div>';
    return html;
  }
  function renderEditor() {
    if (sel.kind === "airport") return renderAirport();
    if (sel.kind === "terminal") return renderTerminal(termById(sel.id));
    if (sel.kind === "checkpoint") return renderCheckpoint(cpById(sel.id));
    if (sel.kind === "bag") return renderBag(bagById(sel.id));
    return "<p class='hint'>Select something in the tree.</p>";
  }
  function renderAirport() {
    return "<h2>Airport</h2><div class='stack'>" +
      '<label>Code <input data-field="airport" value="' + field.airport + '"></label>' +
      '<label>Open <input type="time" step="900" data-field="open" value="' + field.open + '"></label>' +
      '<label>Close <input type="time" step="900" data-field="close" value="' + field.close + '"></label>' +
      "<p class='hint'>Builder publishes seats only. Peaks belong in demand.json.</p></div>";
  }
  function renderTerminal(t) {
    if (!t) return "<p class='err'>Missing terminal.</p>";
    var cost = t.baseTsoCost || { STD: 6, PRE: 5, MIX: 6 };
    var cps = B.cpsFor(field, t.id);
    return "<h2>Terminal</h2><div class='stack'>" +
      '<label>ID <input data-term="' + t.id + '" data-k="id" value="' + t.id + '"></label>' +
      '<label>Name <input data-term="' + t.id + '" data-k="name" value="' + t.name + '"></label>' +
      '<div class="row"><label>Open <input type="time" step="900" data-term="' + t.id + '" data-k="open" value="' + t.open + '"></label>' +
      '<label>Close <input type="time" step="900" data-term="' + t.id + '" data-k="close" value="' + t.close + '"></label></div>' +
      "<h3>Base TSO cost / lane</h3><div class='row'>" +
      '<label>STD <input type="number" data-cost="' + t.id + '" data-k="STD" value="' + cost.STD + '"></label>' +
      '<label>PRE <input type="number" data-cost="' + t.id + '" data-k="PRE" value="' + cost.PRE + '"></label>' +
      '<label>MIX <input type="number" data-cost="' + t.id + '" data-k="MIX" value="' + cost.MIX + '"></label></div>' +
      '<div class="row"><button class="btn" data-act="add-cp" data-id="' + t.id + '">+ Checkpoint</button>' +
      '<button class="btn btn-red" data-act="del-term" data-id="' + t.id + '">Remove terminal</button></div>' +
      "<h3>Checkpoints (" + cps.length + ")</h3>" +
      cps.map(function (c) {
        return '<div class="nav-item" data-act="sel" data-kind="checkpoint" data-id="' + c.id + '">' + c.name + "<small>" + c.mods.length + " modsets</small></div>";
      }).join("") + "</div>";
  }
  function renderCheckpoint(cp) {
    if (!cp) return "<p class='err'>Missing checkpoint.</p>";
    var kcmOn = !!cp.kcm;
    var mods = (cp.mods || []).map(function (m, i) { return renderMod(cp, m, i); }).join("");
    return "<h2>Checkpoint</h2><div class='stack'>" +
      '<label>ID <input data-cp="' + cp.id + '" data-k="id" value="' + cp.id + '"></label>' +
      '<label>Name <input data-cp="' + cp.id + '" data-k="name" value="' + cp.name + '"></label>' +
      '<label>Terminal tag <select data-cp="' + cp.id + '" data-k="terminalId">' +
      field.terminals.map(function (t) {
        return '<option value="' + t.id + '"' + (t.id === cp.terminalId ? " selected" : "") + '>' + t.name + "</option>";
      }).join("") + "</select></label>" +
      '<div class="row"><label>Open <input type="time" step="900" data-cp="' + cp.id + '" data-k="open" value="' + cp.open + '"></label>' +
      '<label>Close <input type="time" step="900" data-cp="' + cp.id + '" data-k="close" value="' + cp.close + '"></label></div>' +
      '<div class="kcm-box"><label><input type="checkbox" data-act="toggle-kcm" data-id="' + cp.id + '"' + (kcmOn ? " checked" : "") + '> This location has a KCM position</label>' +
      (kcmOn
        ? '<div class="row" style="margin-top:.4rem"><label>KCM open <input type="time" step="900" data-kcm="' + cp.id + '" data-k="open" value="' + cp.kcm.open + '"></label>' +
          '<label>KCM close <input type="time" step="900" data-kcm="' + cp.id + '" data-k="close" value="' + cp.kcm.close + '"></label></div>'
        : "<p class='hint'>Hours are independent of the checkpoint window.</p>") +
      "</div>" + mods +
      '<button class="btn" data-act="add-mod" data-id="' + cp.id + '">+ Modset</button> ' +
      '<button class="btn btn-red" data-act="del-cp" data-id="' + cp.id + '">Remove checkpoint</button></div>';
  }
  function renderMod(cp, m, i) {
    var lanes = (m.lanes || []).map(function (l, li) {
      return '<div class="lane"><input type="number" min="1" data-lane-n="' + cp.id + '" data-mi="' + i + '" data-li="' + li + '" value="' + l.n + '">' +
        '<label style="display:flex;align-items:center;gap:.35rem;text-transform:none"><input type="checkbox" data-lane-ct="' + cp.id + '" data-mi="' + i + '" data-li="' + li + '"' + (l.ct ? " checked" : "") + '> CT / Z-qual</label>' +
        '<button class="btn btn-red" data-act="del-lane" data-id="' + cp.id + '" data-mi="' + i + '" data-li="' + li + '">Remove</button></div>';
    }).join("");
    return '<div class="mod-card"><h3>Modset ' + (i + 1) + "</h3><div class='row'>" +
      '<label>Open <input type="time" step="900" data-mod="' + cp.id + '" data-mi="' + i + '" data-k="open" value="' + (m.open || cp.open) + '"></label>' +
      '<label>Close <input type="time" step="900" data-mod="' + cp.id + '" data-mi="' + i + '" data-k="close" value="' + (m.close || cp.close) + '"></label>' +
      '<label>Program <select data-mod="' + cp.id + '" data-mi="' + i + '" data-k="program">' +
      ["STD", "PRE", "MIX"].map(function (p) { return "<option" + (m.program === p ? " selected" : "") + ">" + p + "</option>"; }).join("") +
      '</select></label><label>Scanner positions <input type="number" min="0" max="2" data-mod="' + cp.id + '" data-mi="' + i + '" data-k="ait" value="' + (m.ait == null ? 1 : m.ait) + '"></label></div>' +
      "<p class='hint'>AIT is explicit. A one-lane modset can still have its own scanner.</p>" + lanes +
      '<div class="row" style="margin-top:.4rem"><button class="btn" data-act="add-lane" data-id="' + cp.id + '" data-mi="' + i + '">+ Lane</button>' +
      '<button class="btn btn-red" data-act="del-mod" data-id="' + cp.id + '" data-mi="' + i + '">Remove modset</button></div></div>';
  }
  function renderBag(b) {
    if (!b) return "<p class='err'>Missing bag site.</p>";
    var units = (b.units || []).map(function (u, i) {
      return '<div class="row"><label>Unit # <input type="number" data-unit="' + b.id + '" data-i="' + i + '" value="' + u.n + '"></label>' +
        '<button class="btn btn-red" data-act="del-unit" data-id="' + b.id + '" data-i="' + i + '">Remove</button></div>';
    }).join("");
    return "<h2>Baggage site</h2><div class='stack'>" +
      '<label>ID <input data-bag="' + b.id + '" data-k="id" value="' + b.id + '"></label>' +
      '<label>Name <input data-bag="' + b.id + '" data-k="name" value="' + b.name + '"></label>' +
      '<label>Kind <select data-bag="' + b.id + '" data-k="kind">' +
      ["CBRA", "OS", "OSRA"].map(function (k) { return "<option" + (b.kind === k ? " selected" : "") + ">" + k + "</option>"; }).join("") + "</select></label>" +
      '<label>Terminal tag <select data-bag="' + b.id + '" data-k="terminalId"><option value="">(none)</option>' +
      field.terminals.map(function (t) {
        return '<option value="' + t.id + '"' + (t.id === b.terminalId ? " selected" : "") + '>' + t.name + "</option>";
      }).join("") + "</select></label>" +
      '<label><input type="checkbox" data-act="bag-present" data-id="' + b.id + '"' + (b.present ? " checked" : "") + '> Present (OSRA stays in payload when off)</label>' +
      '<label><input type="checkbox" data-act="bag-lead" data-id="' + b.id + '"' + (b.lead ? " checked" : "") + '> Room lead seat</label>' +
      '<div class="row"><label>Open <input type="time" step="900" data-bag="' + b.id + '" data-k="open" value="' + b.open + '"></label>' +
      '<label>Close <input type="time" step="900" data-bag="' + b.id + '" data-k="close" value="' + b.close + '"></label></div>' +
      "<h3>Physical units</h3>" + units +
      '<button class="btn" data-act="add-unit" data-id="' + b.id + '">+ Unit</button> ' +
      '<button class="btn btn-red" data-act="del-bag" data-id="' + b.id + '">Remove site</button>' +
      "<p class='hint'>How many units exist. Which are open at 06:00 lives in demand.json.</p></div>";
  }
  function onClick(e) {
    var t = e.target.closest("[data-act]");
    if (!t) return;
    var act = t.getAttribute("data-act");
    var id = t.getAttribute("data-id");
    var mi = t.getAttribute("data-mi");
    var li = t.getAttribute("data-li");
    if (act === "sel") sel = { kind: t.getAttribute("data-kind"), id: id };
    else if (act === "add-term") {
      var n = field.terminals.length + 1;
      var tid = String.fromCharCode(64 + Math.min(n, 26));
      field.terminals.push({ id: tid, name: "Terminal " + tid, open: field.open, close: field.close, baseTsoCost: { STD: 6, PRE: 5, MIX: 6 } });
      sel = { kind: "terminal", id: tid };
    } else if (act === "del-term") {
      field.terminals = field.terminals.filter(function (x) { return x.id !== id; });
      field.checkpoints = field.checkpoints.filter(function (c) { return c.terminalId !== id; });
      sel = { kind: "airport" };
    } else if (act === "add-cp") {
      var cp = { id: uid("CP"), name: "Checkpoint", terminalId: id, open: (termById(id) || field).open, close: (termById(id) || field).close, kcm: null,
        mods: [{ open: field.open, close: field.close, program: "STD", ait: 1, lanes: [{ n: 1, ct: 0 }] }] };
      field.checkpoints.push(cp); sel = { kind: "checkpoint", id: cp.id };
    } else if (act === "del-cp") {
      field.checkpoints = field.checkpoints.filter(function (c) { return c.id !== id; }); sel = { kind: "airport" };
    } else if (act === "add-mod") {
      var c = cpById(id); c.mods.push({ open: c.open, close: c.close, program: "STD", ait: 1, lanes: [{ n: B.nextLaneN(c), ct: 0 }] });
    } else if (act === "del-mod") {
      var c2 = cpById(id); if (c2.mods.length <= 1) { setStatus("BLOCKED — need at least one modset"); return; } c2.mods.splice(+mi, 1);
    } else if (act === "add-lane") {
      var c3 = cpById(id); c3.mods[+mi].lanes.push({ n: B.nextLaneN(c3), ct: 0 });
    } else if (act === "del-lane") {
      var c4 = cpById(id); if (c4.mods[+mi].lanes.length <= 1) { setStatus("BLOCKED — modset needs a lane"); return; } c4.mods[+mi].lanes.splice(+li, 1);
    } else if (act === "toggle-kcm") {
      var c5 = cpById(id); c5.kcm = c5.kcm ? null : { open: "05:00", close: "19:00" };
    } else if (act === "add-bag") {
      var b = { id: uid("BAG"), name: "Bag site", kind: "CBRA", present: true, terminalId: field.terminals[0] ? field.terminals[0].id : "", open: field.open, close: field.close, units: [{ n: 1 }], lead: 0 };
      field.bagSites.push(b); sel = { kind: "bag", id: b.id };
    } else if (act === "del-bag") {
      field.bagSites = field.bagSites.filter(function (x) { return x.id !== id; }); sel = { kind: "airport" };
    } else if (act === "add-unit") {
      var bg = bagById(id); var max = 0; bg.units.forEach(function (u) { if (u.n > max) max = u.n; }); bg.units.push({ n: max + 1 });
    } else if (act === "del-unit") {
      var bg2 = bagById(id); if (bg2.units.length <= 1) { setStatus("BLOCKED — site needs a unit"); return; } bg2.units.splice(+t.getAttribute("data-i"), 1);
    } else if (act === "bag-present") bagById(id).present = t.checked;
    else if (act === "bag-lead") bagById(id).lead = t.checked ? 1 : 0;
    else if (act === "export") { download(); return; }
    else if (act === "apply-json") { applyJson(); return; }
    render();
  }
  function onChange(e) {
    var el = e.target;
    if (el.hasAttribute("data-field")) field[el.getAttribute("data-field")] = el.value;
    else if (el.hasAttribute("data-term")) {
      var t = termById(el.getAttribute("data-term")); var k = el.getAttribute("data-k"); var old = t.id; t[k] = el.value;
      if (k === "id" && old !== t.id) {
        field.checkpoints.forEach(function (c) { if (c.terminalId === old) c.terminalId = t.id; });
        field.bagSites.forEach(function (b) { if (b.terminalId === old) b.terminalId = t.id; });
        sel.id = t.id;
      }
    } else if (el.hasAttribute("data-cost")) {
      var t2 = termById(el.getAttribute("data-cost")); if (!t2.baseTsoCost) t2.baseTsoCost = { STD: 6, PRE: 5, MIX: 6 };
      t2.baseTsoCost[el.getAttribute("data-k")] = +el.value || 0;
    } else if (el.hasAttribute("data-cp")) {
      var c = cpById(el.getAttribute("data-cp")); var ck = el.getAttribute("data-k"); var oldId = c.id; c[ck] = el.value; if (ck === "id") sel.id = c.id;
    } else if (el.hasAttribute("data-kcm")) {
      var c2 = cpById(el.getAttribute("data-kcm")); if (c2.kcm) c2.kcm[el.getAttribute("data-k")] = el.value;
    } else if (el.hasAttribute("data-mod")) {
      var c3 = cpById(el.getAttribute("data-mod")); var m = c3.mods[+el.getAttribute("data-mi")]; var mk = el.getAttribute("data-k");
      m[mk] = mk === "ait" ? Math.max(0, Math.min(2, +el.value || 0)) : el.value;
    } else if (el.hasAttribute("data-lane-n")) {
      cpById(el.getAttribute("data-lane-n")).mods[+el.getAttribute("data-mi")].lanes[+el.getAttribute("data-li")].n = +el.value || 1;
    } else if (el.hasAttribute("data-lane-ct")) {
      cpById(el.getAttribute("data-lane-ct")).mods[+el.getAttribute("data-mi")].lanes[+el.getAttribute("data-li")].ct = el.checked ? 1 : 0;
    } else if (el.hasAttribute("data-bag")) {
      var b = bagById(el.getAttribute("data-bag")); var bk = el.getAttribute("data-k"); b[bk] = el.value; if (bk === "id") sel.id = b.id;
    } else if (el.hasAttribute("data-unit")) {
      bagById(el.getAttribute("data-unit")).units[+el.getAttribute("data-i")].n = +el.value || 1;
    } else return;
    render();
  }
  function download() {
    var v = B.validate(field);
    if (v.errors.length) { setStatus("FIX ERRORS BEFORE EXPORT"); render(); return; }
    var blob = new Blob([JSON.stringify(field, null, 2)], { type: "application/json" });
    var a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "airfield.json"; a.click();
    setStatus("EXPORTED airfield.json");
  }
  function applyJson() {
    try {
      var next = JSON.parse($("payload").value);
      if (!next || next.schema !== "blade.airfield.v2") throw new Error("Need schema blade.airfield.v2");
      if (!Array.isArray(next.terminals) || !Array.isArray(next.checkpoints)) throw new Error("Missing terminals/checkpoints");
      if (!Array.isArray(next.bagSites)) next.bagSites = [];
      field = next; sel = { kind: "airport" }; setStatus("LOADED PAYLOAD"); render();
    } catch (err) { setStatus("BAD JSON — " + err.message); }
  }
  function onFile(e) {
    var file = e.target.files && e.target.files[0]; if (!file) return;
    var reader = new FileReader();
    reader.onload = function () { $("payload").value = String(reader.result || ""); applyJson(); };
    reader.readAsText(file);
  }
  B.bootBuilder = function () {
    document.body.addEventListener("click", onClick);
    document.body.addEventListener("change", onChange);
    var file = $("file-in"); if (file) file.addEventListener("change", onFile);
    render(); setStatus("AIRFIELD BUILDER READY");
  };
})(window.Blade);
