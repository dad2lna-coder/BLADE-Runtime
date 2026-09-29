//js/utils.js - BLADE Runtime Core Utilities
//Provides the S (Scheduler) singleton and core helper functions.
//Adapted to delegate to runtime contracts where available.

(function () {
  "use strict";

  window.Scheduler = window.Scheduler || {};
  var S = window.Scheduler;

  S.$ = function (id) {
    return document.getElementById(id);
  };

  S.setInputValue = function (id, value) {
    var el = S.$(id);
    if (el) el.value = value;
  };

  S.isValidTimeText = function (value) {
    return typeof value === "string" && /^\d{2}:\d{2}$/.test(value);
  };

  S.safeNumber = function (value, fallback, min, max) {
    var n = Number(value);
    if (!Number.isFinite(n)) n = fallback;
    if (typeof min === "number") n = Math.max(min, n);
    if (typeof max === "number") n = Math.min(max, n);
    return n;
  };

  S.parseStartDate = function (val) {
    if (!val) return new Date();
    if (typeof val === "string") {
      var iso = val.slice(0, 10);
      var parts = iso.split("-");
      if (parts.length === 3) {
        return new Date(
          parseInt(parts[0]),
          parseInt(parts[1]) - 1,
          parseInt(parts[2])
        );
      }
    }
    if (val && typeof val.toJSDate === "function") return val.toJSDate();
    if (val instanceof Date) return val;
    return new Date();
  };

  S.toDateInputValue = function (d) {
    var date = S.parseStartDate(d);
    var dd = String(date.getDate()).padStart(2, "0");
    var mm = String(date.getMonth() + 1).padStart(2, "0");
    var yyyy = date.getFullYear();
    return yyyy + "-" + mm + "-" + dd;
  };

  S.dj = function (val) {
    var date = S.parseStartDate(val);
    return {
      startOf: function () {
        return date.toISOString().slice(0, 10);
      },
      format: function (fmt) {
        var map = { "YYYY-MM-DD": "yyyy-MM-dd" };
        return date.toFormat ? date.toFormat(map[fmt] || fmt) : (date.toISOString ? date.toISOString().slice(0, 10) : "");
      },
      add: function (n) {
        var d = new Date(date);
        d.setDate(d.getDate() + n);
        return d;
      },
      day: function () {
        var dayNames = [
          "Sunday", "Monday", "Tuesday", "Wednesday",
          "Thursday", "Friday", "Saturday"
        ];
        return dayNames[date.getDay()];
      },
      toISODate: function () {
        return date.toISOString ? date.toISOString().slice(0, 10) : "";
      },
      toJSDate: function () {
        return date;
      }
    };
  };

  S.updateStatus = function (msg) {
    var el = S.$("status");
    if (el) el.textContent = msg;
  };

  S.state = S.state || {
    lines: [],
    schedule: {},
    extraPositions: [],
    issues: [],
    shifts: [],
    functionCoverage: { mode: "none" }
  };

  S.shiftSeq = S.shiftSeq || 1;

  // Adapter: delegate to runtime ScheduleState contract when available
  S.timeToMin = function (t) {
    if (S.runtime && S.runtime.getContracts) {
      var contracts = S.runtime.getContracts();
      if (contracts.ScheduleState && typeof contracts.ScheduleState.timeToMin === "function") {
        return contracts.ScheduleState.timeToMin(t);
      }
    }
    if (!t || typeof t !== "string") return 0;
    var p = t.split(":");
    return (+p[0] || 0) * 60 + (+p[1] || 0);
  };

  S.minToTime = function (m) {
    if (S.runtime && S.runtime.getContracts) {
      var contracts = S.runtime.getContracts();
      if (contracts.ScheduleState && typeof contracts.ScheduleState.minToTime === "function") {
        return contracts.ScheduleState.minToTime(m);
      }
    }
    var normalized = ((m % 1440) + 1440) % 1440;
    var h = Math.floor(normalized / 60);
    var mm = normalized % 60;
    return String(h).padStart(2, "0") + ":" + String(mm).padStart(2, "0");
  };

})();
