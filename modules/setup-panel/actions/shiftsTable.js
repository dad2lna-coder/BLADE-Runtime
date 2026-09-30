/** Setup-tab shifts table + day-times modal. */
export function attachShiftsTable(S) {
  if (!S) return;

  S.rdoChecksHtml = function (selected) {
    var set = new Set((selected || []).map(Number));
    return (S.DAYS || []).map(function (label, d) {
      return (
        '<label class="rdo-chk" title="' + label + '">' +
        '<input type="checkbox" data-rdo="' + d + '"' + (set.has(d) ? " checked" : "") + " />" +
        "<span>" + label.charAt(0) + "</span></label>"
      );
    }).join("");
  };

  S.readShiftsFromDom = function () {
    var rows = document.querySelectorAll("#shifts-tbody tr[data-shift-id]");
    if (!rows.length) return S.state.shifts;
    var next = [];
    rows.forEach(function (tr) {
      var id = tr.getAttribute("data-shift-id");
      var existing = S.getShift ? S.getShift(id) : null;
      var name = (tr.querySelector("[data-f=name]") && tr.querySelector("[data-f=name]").value.trim()) || id;
      var start = (tr.querySelector("[data-f=start]") && tr.querySelector("[data-f=start]").value) || "05:00";
      var end = (tr.querySelector("[data-f=end]") && tr.querySelector("[data-f=end]").value) || "13:30";
      var paid = +(tr.querySelector("[data-f=paid]") && tr.querySelector("[data-f=paid]").value);
      if (!paid || paid <= 0) {
        var mins = S.timeToMin(end) - S.timeToMin(start);
        paid = Math.max(1, Math.round((mins / 60) * 2) / 2);
      }
      var force = Math.max(0, Math.floor(+(tr.querySelector("[data-f=force]") && tr.querySelector("[data-f=force]").value) || 0));
      var ltsoForce = Math.max(0, Math.floor(+(tr.querySelector("[data-f=ltsoForce]") && tr.querySelector("[data-f=ltsoForce]").value) || 0));
      var stsoForce = Math.max(0, Math.floor(+(tr.querySelector("[data-f=stsoForce]") && tr.querySelector("[data-f=stsoForce]").value) || 0));
      var rdoHard = [];
      for (var d = 0; d < 7; d++) {
        var cb = tr.querySelector('[data-rdo="' + d + '"]');
        if (cb && cb.checked) rdoHard.push(d);
      }
      var dayTimes = existing && existing.dayTimes ? existing.dayTimes : null;
      var phaseEl = tr.querySelector("[data-f=phase]");
      var phase = (phaseEl && phaseEl.value) || (existing && existing.phase) || "auto";
      var cgEl = tr.querySelector("[data-f=crewGroupId]");
      var crewGroupId = (cgEl && cgEl.value) || (existing && existing.crewGroupId) || "";
      next.push({
        id: id, name: name, start: start, end: end, paid: paid,
        force: force, ltsoForce: ltsoForce, stsoForce: stsoForce, rdoHard: rdoHard,
        dayTimes: dayTimes, phase: phase, crewGroupId: crewGroupId
      });
    });
    S.state.shifts = next;
    return next;
  };

  S.renderCrewGroupsUI = function () {
    var container = document.getElementById("crew-groups-list");
    if (!container) return;
    var groups = S.state.shiftCrewGroups || [];
    var shifts = S.state.shifts || [];
    if (!groups.length) {
      container.innerHTML = '<p class="muted" style="margin:0">No crew groups defined. Shifts default to individual shift bands.</p>';
      return;
    }
    container.innerHTML = groups.map(function (cg) {
      var memberCheckboxes = shifts.map(function (s) {
        var isChecked = (s.crewGroupId === cg.id) || (cg.shiftIds && cg.shiftIds.indexOf(s.id) !== -1);
        return '<label style="display:inline-flex;align-items:center;gap:0.25rem;margin-right:0.75rem;font-size:0.85rem">' +
          '<input type="checkbox" class="cg-shift-cb" data-cg-id="' + cg.id + '" data-shift-id="' + s.id + '"' + (isChecked ? ' checked' : '') + ' />' +
          (s.name || s.id) + '</label>';
      }).join('');

      return '<div class="card" style="margin:0;padding:0.5rem 0.75rem;background:var(--bg-subtle, #f8f9fa)">' +
        '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:0.35rem">' +
          '<strong>' + (cg.name || cg.id) + '</strong>' +
          '<button type="button" class="btn btn-red btn-cg-del" data-cg-id="' + cg.id + '" style="padding:0.1rem 0.4rem;font-size:0.75rem">Delete group</button>' +
        '</div>' +
        '<div>' + memberCheckboxes + '</div>' +
      '</div>';
    }).join('');

    container.querySelectorAll('.btn-cg-del').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var cgId = btn.getAttribute('data-cg-id');
        S.state.shiftCrewGroups = (S.state.shiftCrewGroups || []).filter(function (g) { return g.id !== cgId; });
        (S.state.shifts || []).forEach(function (s) {
          if (s.crewGroupId === cgId) s.crewGroupId = '';
        });
        S.renderCrewGroupsUI();
        S.renderShiftsTable();
      });
    });

    container.querySelectorAll('.cg-shift-cb').forEach(function (cb) {
      cb.addEventListener('change', function () {
        var cgId = cb.getAttribute('data-cg-id');
        var sId = cb.getAttribute('data-shift-id');
        var shift = (S.state.shifts || []).find(function (s) { return s.id === sId; });
        if (shift) {
          if (cb.checked) {
            shift.crewGroupId = cgId;
          } else if (shift.crewGroupId === cgId) {
            shift.crewGroupId = '';
          }
        }
        var group = (S.state.shiftCrewGroups || []).find(function (g) { return g.id === cgId; });
        if (group) {
          group.shiftIds = (S.state.shifts || [])
            .filter(function (s) { return s.crewGroupId === cgId; })
            .map(function (s) { return s.id; });
        }
        S.renderShiftsTable();
      });
    });
  };

  S.renderShiftsTable = function () {
    var tbody = document.getElementById("shifts-tbody");
    if (!tbody) return;
    var groups = S.state.shiftCrewGroups || [];
    tbody.innerHTML = (S.state.shifts || []).map(function (s) {
      var hasDyn = S.shiftHasDayOverrides && S.shiftHasDayOverrides(s.id);
      var daysCls = hasDyn ? "btn btn-amber" : "btn";
      var daysTitle = hasDyn ? "Has per-day time overrides" : "Set different start/end per day of week";

      var cgOptions = '<option value="">(None / Solo)</option>' + groups.map(function (g) {
        var sel = (s.crewGroupId === g.id) ? ' selected' : '';
        return '<option value="' + g.id + '"' + sel + '>' + (g.name || g.id) + '</option>';
      }).join('');

      return (
        '<tr data-shift-id="' + s.id + '">' +
        '<td><input type="text" data-f="name" value="' + String(s.name).replace(/"/g, "&quot;") + '" style="width:5.5rem" /></td>' +
        '<td><input type="time" data-f="start" value="' + s.start + '" /></td>' +
        '<td><input type="time" data-f="end" value="' + s.end + '" /></td>' +
        '<td><select data-f="phase">' +
          '<option value="auto"' + ((s.phase || "auto") === "auto" ? " selected" : "") + '>Auto</option>' +
          '<option value="opening"' + (s.phase === "opening" ? " selected" : "") + '>Opening</option>' +
          '<option value="am"' + (s.phase === "am" ? " selected" : "") + '>AM</option>' +
          '<option value="pm"' + (s.phase === "pm" ? " selected" : "") + '>PM</option>' +
          '<option value="closing"' + (s.phase === "closing" ? " selected" : "") + '>Closing</option>' +
        '</select></td>' +
        '<td><input type="number" data-f="paid" min="1" step="0.5" value="' + s.paid + '" style="width:4rem" /></td>' +
        '<td><input type="number" data-f="force" min="0" value="' + (s.force || 0) + '" style="width:4rem" title="TSO force" /></td>' +
        '<td><input type="number" data-f="ltsoForce" min="0" value="' + (s.ltsoForce || 0) + '" style="width:4rem" title="LTSO force" /></td>' +
        '<td><input type="number" data-f="stsoForce" min="0" value="' + (s.stsoForce || 0) + '" style="width:4rem" title="STSO force" /></td>' +
        '<td><div class="rdo-row">' + S.rdoChecksHtml(s.rdoHard) + "</div></td>" +
        '<td style="white-space:nowrap">' +
          '<button type="button" class="' + daysCls + '" data-day-times="' + s.id + '" title="' + daysTitle + '">Day times…</button> ' +
          '<button type="button" class="btn btn-red" data-remove="' + s.id + '">✕</button>' +
        '</td>' +
        '<td><select data-f="crewGroupId">' + cgOptions + '</select></td>' +
        '</tr>'
      );
    }).join("");

    tbody.querySelectorAll("select[data-f=crewGroupId]").forEach(function (sel) {
      sel.addEventListener("change", function () {
        S.readShiftsFromDom();
        S.renderCrewGroupsUI();
      });
    });

    tbody.querySelectorAll("[data-remove]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        S.readShiftsFromDom();
        var id = btn.getAttribute("data-remove");
        S.state.shifts = S.state.shifts.filter(function (s) { return s.id !== id; });
        S.renderShiftsTable();
      });
    });
    tbody.querySelectorAll("[data-day-times]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        S.readShiftsFromDom();
        S.openShiftDayTimesModal(btn.getAttribute("data-day-times"));
      });
    });
  };

  S.addShift = function () {
    if (!S.state) return;
    S.readShiftsFromDom();
    S.shiftSeq = S.shiftSeq || ((S.state.shifts || []).length + 1);
    var id = "S" + S.shiftSeq++;
    S.state.shifts = S.state.shifts || [];
    S.state.shifts.push({
      id: id, name: "Shift", start: "08:00", end: "16:30", paid: 8,
      force: 0, ltsoForce: 0, stsoForce: 0, rdoHard: []
    });
    S.renderShiftsTable();
  };

  S._editingDayTimesShiftId = null;

  S.openShiftDayTimesModal = function (shiftId) {
    var s = S.getShift(shiftId);
    if (!s) return;
    S._editingDayTimesShiftId = shiftId;
    var modal = document.getElementById("shift-day-times-modal");
    var title = document.getElementById("shift-day-times-title");
    if (title) title.textContent = "Day times for " + (s.name || s.id) + " (base " + s.start + "\u2013" + s.end + ")";
    var tbody = document.getElementById("shift-day-times-tbody");
    if (!tbody) return;
    var days = S.DAYS || ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var dt = s.dayTimes || {};
    tbody.innerHTML = days.map(function (name, i) {
      var ov = dt[String(i)];
      var useOverride = !!(ov && ov.start && ov.end);
      var startVal = useOverride ? ov.start : s.start;
      var endVal = useOverride ? ov.end : s.end;
      return "<tr data-dow=\"" + i + "\">" +
        "<td><strong>" + name + "</strong></td>" +
        "<td><label class=\"rdo-chk\" style=\"flex-direction:row;gap:0.35rem\">" +
        "<input type=\"checkbox\" data-sdt=\"use\" " + (useOverride ? "checked" : "") + "> Override</label></td>" +
        "<td><input type=\"time\" data-sdt=\"start\" value=\"" + startVal + "\" step=\"900\" " + (useOverride ? "" : "disabled") + "></td>" +
        "<td><input type=\"time\" data-sdt=\"end\" value=\"" + endVal + "\" step=\"900\" " + (useOverride ? "" : "disabled") + "></td>" +
        "<td class=\"muted\" data-sdt=\"dur\"></td></tr>";
    }).join("");
    S.updateShiftDayTimesDurations();
    if (modal) { modal.style.display = "block"; modal.setAttribute("aria-hidden", "false"); }
  };

  S.closeShiftDayTimesModal = function () {
    var modal = document.getElementById("shift-day-times-modal");
    if (modal) { modal.style.display = "none"; modal.setAttribute("aria-hidden", "true"); }
    S._editingDayTimesShiftId = null;
  };

  S.updateShiftDayTimesDurations = function () {
    document.querySelectorAll("#shift-day-times-tbody tr[data-dow]").forEach(function (tr) {
      var use = tr.querySelector("[data-sdt=use]");
      var startEl = tr.querySelector("[data-sdt=start]");
      var endEl = tr.querySelector("[data-sdt=end]");
      var durEl = tr.querySelector("[data-sdt=dur]");
      if (!use || !startEl || !endEl || !durEl) return;
      startEl.disabled = !use.checked;
      endEl.disabled = !use.checked;
      if (!use.checked) { durEl.textContent = "base"; durEl.style.color = "var(--muted)"; return; }
      var o = S.timeToMin(startEl.value);
      var c = S.timeToMin(endEl.value);
      if (c <= o) { durEl.textContent = "Invalid"; durEl.style.color = "var(--red)"; }
      else {
        var mins = c - o;
        var h = Math.floor(mins / 60);
        var m = mins % 60;
        durEl.textContent = h + "h" + (m ? " " + m + "m" : "");
        durEl.style.color = "";
      }
    });
  };

  S.saveShiftDayTimes = function () {
    var s = S.getShift(S._editingDayTimesShiftId);
    if (!s) { S.closeShiftDayTimesModal(); return; }
    var dayTimes = {};
    document.querySelectorAll("#shift-day-times-tbody tr[data-dow]").forEach(function (tr) {
      var i = tr.getAttribute("data-dow");
      var use = tr.querySelector("[data-sdt=use]");
      var startEl = tr.querySelector("[data-sdt=start]");
      var endEl = tr.querySelector("[data-sdt=end]");
      if (!use || !use.checked || !startEl || !endEl) return;
      if (!S.isValidTimeText(startEl.value) || !S.isValidTimeText(endEl.value)) return;
      if (S.timeToMin(endEl.value) <= S.timeToMin(startEl.value)) return;
      if (startEl.value === s.start && endEl.value === s.end) return;
      dayTimes[String(i)] = { start: startEl.value, end: endEl.value };
    });
    s.dayTimes = Object.keys(dayTimes).length ? dayTimes : null;
    S.closeShiftDayTimesModal();
    S.renderShiftsTable();
    if (S.updateStatus) S.updateStatus("Updated day times for " + (s.name || s.id));
    if (S.renderAll) S.renderAll();
  };

  S.openRdoMatrixModal = function () {
    var modal = document.getElementById("rdo-matrix-modal");
    if (modal) { modal.style.display = "flex"; modal.setAttribute("aria-hidden", "false"); }
    S.renderRdoMatrixModal();
  };

  S.closeRdoMatrixModal = function () {
    var modal = document.getElementById("rdo-matrix-modal");
    if (modal) { modal.style.display = "none"; modal.setAttribute("aria-hidden", "true"); }
  };

  S.renderRdoMatrixModal = function () {
    var selectEl = document.getElementById("rdo-matrix-pos-select");
    var tableWrap = document.getElementById("rdo-matrix-table-wrap");
    if (!tableWrap) return;

    var lines = (S.state && S.state.lines) || [];
    if (!lines.length) {
      tableWrap.innerHTML = '<p class="muted">No generated schedule lines available. Click <strong>GENERATE</strong> first.</p>';
      return;
    }

    // Dynamic position options
    var posOptions = ["STSO", "LTSO", "TSO", "FT TSO", "PT TSO"];
    lines.forEach(function (l) {
      var name = l.extraName || l.position || l.empClass;
      if (name && posOptions.indexOf(name) === -1 && name !== "FT" && name !== "PT") {
        posOptions.push(name);
      }
    });

    var currentFilter = selectEl ? selectEl.value : "";
    if (!currentFilter) currentFilter = "STSO";

    if (selectEl) {
      selectEl.innerHTML = posOptions.map(function (opt) {
        var sel = opt === currentFilter ? " selected" : "";
        return '<option value="' + opt + '"' + sel + '>' + opt + '</option>';
      }).join("");
    }

    function lineMatches(l, filter) {
      var f = (filter || "STSO").toUpperCase();
      if (f === "STSO") return l.isStso || l.position === "STSO" || l.empClass === "STSO";
      if (f === "LTSO") return l.isLtso || l.position === "LTSO" || l.empClass === "LTSO";
      if (f === "TSO") return (l.position === "TSO" || l.empClass === "FT" || l.empClass === "PT") && !l.isExtra && !l.isTraining;
      if (f === "FT TSO" || f === "FT") return l.empClass === "FT" && !l.isExtra && !l.isTraining;
      if (f === "PT TSO" || f === "PT") return l.empClass === "PT" && !l.isExtra && !l.isTraining;
      var lPos = (l.position || l.extraName || l.empClass || "").toUpperCase();
      return lPos === f;
    }

    var matchingLines = lines.filter(function (l) { return lineMatches(l, currentFilter); });
    if (!matchingLines.length) {
      tableWrap.innerHTML = '<p class="muted">No lines found for position class <strong>' + currentFilter + '</strong>.</p>';
      return;
    }

    var days = S.DAYS || ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    function formatRdoPattern(rdoDays) {
      if (!rdoDays || !rdoDays.length) return "None";
      var sorted = rdoDays.slice().map(Number).sort(function (a, b) { return a - b; });
      return sorted.map(function (d) { return days[d] || d; }).join("-");
    }

    // Collect all active RDO patterns across matching lines
    var rdoPatternsMap = {};
    matchingLines.forEach(function (l) {
      var pat = formatRdoPattern(l.rdoDays);
      rdoPatternsMap[pat] = true;
    });
    var rdoPatterns = Object.keys(rdoPatternsMap).sort();

    // Group matching lines by Shift Name
    var shiftsMap = {};
    matchingLines.forEach(function (l) {
      var shiftName = l.shiftName || l.shiftLabel || l.shiftId || "Shift";
      if (!shiftsMap[shiftName]) shiftsMap[shiftName] = [];
      shiftsMap[shiftName].push(l);
    });

    var rowsHtml = [];
    Object.keys(shiftsMap).forEach(function (shiftName) {
      var sLines = shiftsMap[shiftName];
      ["M", "F"].forEach(function (sex) {
        var sexLines = sLines.filter(function (l) { return (l.sex || "").toUpperCase() === sex; });
        var countsByPattern = {};
        sexLines.forEach(function (l) {
          var pat = formatRdoPattern(l.rdoDays);
          countsByPattern[pat] = (countsByPattern[pat] || 0) + 1;
        });

        var cellCts = rdoPatterns.map(function (pat) {
          var ct = countsByPattern[pat] || 0;
          return '<td style="text-align:center;' + (ct > 0 ? "font-weight:bold" : "opacity:0.4") + '">' + ct + '</td>';
        }).join("");

        rowsHtml.push(
          '<tr>' +
          '<td><strong>' + shiftName + '</strong></td>' +
          '<td><span class="badge" style="background:' + (sex === "M" ? "#007bff" : "#e83e8c") + ';color:#fff;padding:0.15rem 0.4rem;border-radius:3px">' + sex + '</span></td>' +
          cellCts +
          '</tr>'
        );
      });
    });

    var headerCells = rdoPatterns.map(function (pat) {
      return '<th style="text-align:center">' + pat + '</th>';
    }).join("");

    tableWrap.innerHTML =
      '<table class="data-table" style="width:100%;border-collapse:collapse">' +
      '<thead><tr><th>Shift</th><th>Sex</th>' + headerCells + '</tr></thead>' +
      '<tbody>' + rowsHtml.join("") + '</tbody>' +
      '</table>';
  };

  S.initShiftDayTimes = function () {
    if (S._sdtBound) return;
    S._sdtBound = true;
    var closeBtn = document.getElementById("shift-day-times-close");
    if (closeBtn) closeBtn.addEventListener("click", S.closeShiftDayTimesModal);
    var cancelBtn = document.getElementById("btn-sdt-cancel");
    if (cancelBtn) cancelBtn.addEventListener("click", S.closeShiftDayTimesModal);
    var saveBtn = document.getElementById("btn-sdt-save");
    if (saveBtn) saveBtn.addEventListener("click", S.saveShiftDayTimes);
    var clearBtn = document.getElementById("btn-sdt-clear");
    if (clearBtn) {
      clearBtn.addEventListener("click", function () {
        var s = S.getShift(S._editingDayTimesShiftId);
        document.querySelectorAll("#shift-day-times-tbody tr[data-dow]").forEach(function (tr) {
          var use = tr.querySelector("[data-sdt=use]");
          var startEl = tr.querySelector("[data-sdt=start]");
          var endEl = tr.querySelector("[data-sdt=end]");
          if (use) use.checked = false;
          if (startEl && s) startEl.value = s.start;
          if (endEl && s) endEl.value = s.end;
        });
        S.updateShiftDayTimesDurations();
      });
    }
    document.addEventListener("change", function (e) {
      if (!e.target) return;
      var attr = e.target.getAttribute("data-sdt");
      if (attr !== "use" && attr !== "start" && attr !== "end") return;
      if (attr === "use") {
        var tr = e.target.closest("tr");
        var s = S.getShift(S._editingDayTimesShiftId);
        if (tr && s && !e.target.checked) {
          var startEl = tr.querySelector("[data-sdt=start]");
          var endEl = tr.querySelector("[data-sdt=end]");
          if (startEl) startEl.value = s.start;
          if (endEl) endEl.value = s.end;
        }
      }
      S.updateShiftDayTimesDurations();
    });
    var modal = document.getElementById("shift-day-times-modal");
    if (modal) modal.addEventListener("click", function (e) {
      if (e.target === modal) S.closeShiftDayTimesModal();
    });
  };
}
