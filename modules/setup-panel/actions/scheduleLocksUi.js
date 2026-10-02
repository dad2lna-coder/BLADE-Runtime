/** Schedule Locks modal UI actions. */

export function openLockSchedulesModal(S) {
  var modal = document.getElementById("lock-schedules-modal");
  if (!modal) return;

  var classSelect = document.getElementById("lock-rule-class");
  if (classSelect) {
    var avail = S.getAvailableClasses ? S.getAvailableClasses() : [];
    var optsHtml = '<option value="ALL">All Classes</option>' + avail.map(function (c) {
      return '<option value="' + c.key + '">' + String(c.label).replace(/"/g, "&quot;") + '</option>';
    }).join("");
    classSelect.innerHTML = optsHtml;
  }

  var shiftSelect = document.getElementById("lock-rule-shift");
  if (shiftSelect) {
    var shifts = (S.state && S.state.shifts) || [];
    var shiftOpts = '<option value="">All Shifts</option>' + shifts.map(function (s) {
      var label = S.shiftLabel ? S.shiftLabel(s) : (s.start + "–" + s.end);
      return '<option value="' + s.id + '">' + String(s.name || s.id).replace(/"/g, "&quot;") + ' (' + label + ')</option>';
    }).join("");
    shiftSelect.innerHTML = shiftOpts;
  }

  renderLockRulesList(S);
  modal.style.display = "flex";
  modal.setAttribute("aria-hidden", "false");
}

export function closeLockSchedulesModal() {
  var modal = document.getElementById("lock-schedules-modal");
  if (modal) {
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
  }
}

export function renderLockRulesList(S) {
  var container = document.getElementById("lock-rules-list");
  if (!container) return;

  var rules = (S.state && S.state.scheduleLocks) || [];
  if (!rules.length) {
    container.innerHTML = '<p class="muted" style="margin:0">No lock rules defined. All generated lines move freely.</p>';
    return;
  }

  var lines = (S.state && S.state.lines) || [];
  var shifts = (S.state && S.state.shifts) || [];
  var classes = S.getAvailableClasses ? S.getAvailableClasses() : [];

  function classLabel(key) {
    if (!key || key === "ALL") return "All Classes";
    var match = classes.find(function (c) { return c.key === key; });
    return match ? match.label : key;
  }

  function shiftLabelText(shiftId) {
    if (!shiftId) return "Any Shift";
    var s = shifts.find(function (x) { return x.id === shiftId; });
    if (!s) return "Shift " + shiftId + " (deleted)";
    var lbl = S.shiftLabel ? S.shiftLabel(s) : (s.start + "–" + s.end);
    return (s.name || s.id) + " (" + lbl + ")";
  }

  function sexLabel(sex) {
    if (!sex || sex === "ALL") return "All";
    return sex === "M" ? "Male (M)" : "Female (F)";
  }

  container.innerHTML = rules.map(function (r) {
    var matchingN = lines.filter(function (l) { return S.lineMatchesLockRule ? S.lineMatchesLockRule(l, r) : false; }).length;
    var matchText = matchingN > 0 ? "<strong>" + matchingN + " matching line" + (matchingN > 1 ? "s" : "") + "</strong>" : '<span class="muted">(0 matching lines)</span>';

    return '<div style="display:flex;align-items:center;justify-space-between;padding:0.5rem 0.75rem;background:var(--bg-subtle,#f8f9fa);border:1px solid #ddd;border-radius:4px;gap:0.75rem">' +
      '<div style="flex:1;font-size:0.88rem">' +
        '<div><strong>Class:</strong> ' + classLabel(r.classKey) + ' &middot; <strong>Gender:</strong> ' + sexLabel(r.sex) + ' &middot; <strong>Shift:</strong> ' + shiftLabelText(r.shiftId) + '</div>' +
        '<div style="font-size:0.8rem;margin-top:0.2rem">' + matchText + '</div>' +
      '</div>' +
      '<button type="button" class="btn btn-sm btn-red btn-del-lock-rule" data-rule-id="' + r.id + '">Remove</button>' +
    '</div>';
  }).join("");

  container.querySelectorAll(".btn-del-lock-rule").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var ruleId = btn.getAttribute("data-rule-id");
      if (S.state && S.state.scheduleLocks) {
        S.state.scheduleLocks = S.state.scheduleLocks.filter(function (x) { return x.id !== ruleId; });
      }
      renderLockRulesList(S);
    });
  });
}

export function addLockRule(S) {
  var classSelect = document.getElementById("lock-rule-class");
  var sexSelect = document.getElementById("lock-rule-sex");
  var shiftSelect = document.getElementById("lock-rule-shift");

  var classKey = classSelect ? classSelect.value : "ALL";
  var sex = sexSelect ? sexSelect.value : "ALL";
  var shiftId = (shiftSelect && shiftSelect.value) ? shiftSelect.value : null;

  var rule = {
    id: "LOCK_" + Date.now() + "_" + Math.floor(Math.random() * 10000),
    classKey: classKey,
    sex: sex,
    shiftId: shiftId
  };

  S.state.scheduleLocks = S.state.scheduleLocks || [];
  S.state.scheduleLocks.push(rule);
  renderLockRulesList(S);
}

export function attachScheduleLocksUi(S) {
  if (!S) return;
  S.openLockSchedulesModal = function () { openLockSchedulesModal(S); };
  S.closeLockSchedulesModal = closeLockSchedulesModal;
  S.renderLockRulesList = function () { renderLockRulesList(S); };

  if (typeof document === "undefined") return;

  function bindEvents() {
    var openBtn = document.getElementById("btn-lock-schedules");
    if (openBtn && !openBtn._lockedBound) {
      openBtn._lockedBound = true;
      openBtn.addEventListener("click", function () { S.openLockSchedulesModal(); });
    }
    var closeBtn = document.getElementById("lock-schedules-close");
    if (closeBtn && !closeBtn._lockedBound) {
      closeBtn._lockedBound = true;
      closeBtn.addEventListener("click", S.closeLockSchedulesModal);
    }
    var doneBtn = document.getElementById("btn-lock-schedules-done");
    if (doneBtn && !doneBtn._lockedBound) {
      doneBtn._lockedBound = true;
      doneBtn.addEventListener("click", S.closeLockSchedulesModal);
    }
    var addBtn = document.getElementById("btn-add-lock-rule");
    if (addBtn && !addBtn._lockedBound) {
      addBtn._lockedBound = true;
      addBtn.addEventListener("click", function () { addLockRule(S); });
    }
    var clearBtn = document.getElementById("btn-clear-lock-rules");
    if (clearBtn && !clearBtn._lockedBound) {
      clearBtn._lockedBound = true;
      clearBtn.addEventListener("click", function () {
        if (S.state) S.state.scheduleLocks = [];
        renderLockRulesList(S);
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bindEvents);
  } else {
    bindEvents();
  }
}
