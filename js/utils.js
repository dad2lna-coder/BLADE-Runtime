//js/utils.js - BLADE Runtime Core Utilities
//Provides the S (Scheduler) singleton and core helper functions used throughout the application.
//Adapted to delegate to runtime contracts where available.

(function () {
  "use strict";

  // Ensure Scheduler exists as global singleton
  window.Scheduler = window.Scheduler || {};
  var S = window.Scheduler;

  // DOM helper: get element by ID
  S.$ = function (id) {
    return document.getElementById(id);
  };

  // Set input value by ID
  S.setInputValue = function (id, value) {
    var el = S.$(id);
    if (el) el.value = value;
  };

  // Convert "HH:MM" string to minutes
  S.timeToMin = function (t) {
    if (!t || typeof t !== "string") return 0;
    var p = t.split(":");
    return (+p[0] || 0) * 60 + (+p[1] || 0);
  };

  // Convert minutes to "HH:MM" string
  S.minToTime = function (m) {
    var normalized = ((m % 1440) + 1440) % 1440;
    var h = Math.floor(normalized / 60);
    var mm = normalized % 60;
    return String(h).padStart(2, "0") + ":" + String(mm).padStart(2, "0");
  };

  // Validate "HH:MM" format
  S.isValidTimeText = function (value) {
    return typeof value === "string" && /^\d{2}:\d{2}$/.test(value);
  };

  // Safe number conversion with fallback and optional min/max clamping
  S.safeNumber = function (value, fallback, min, max) {
    var n = Number(value);
    if (!Number.isFinite(n)) n = fallback;
    if (typeof min === "number") n = Math.max(min, n);
    if (typeof max === "number") n = Math.min(max, n);
    return n;
  };

  // Parse start date string into a Date object
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

  // Format date as "yyyy-MM-dd" input string
  S.toDateInputValue = function (d) {
    var date = S.parseStartDate(d);
    var dd = String(date.getDate()).padStart(2, "0");
    var mm = String(date.getMonth() + 1).padStart(2, "0");
    var yyyy = date.getFullYear();
    return yyyy + "-" + mm + "-" + dd;
  };

  // Date manipulation helper (simplified, no Luxon dependency)
  S.dj = function (val) {
    var date = S.parseStartDate(val);
    return {
      startOf: function () {
        return date.toISOString().slice(0, 10);
      },
      format: function (fmt) {
        var map = { "YYYY-MM-DD": "yyyy-MM-dd" };
        return date.toFormat(map[fmt] || fmt);
      },
      add: function (n) {
        var d = new Date(date);
        d.setDate(d.getDate() + n);
        return d;
      },
      day: function () {
        var dayNames = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ];
        return dayNames[date.getDay()];
      },
      toISODate: function () {
        return date.toISOString().slice(0, 10);
      },
      toJSDate: function () {
        return date;
      }
    };
  };

  // Update status display element
  S.updateStatus = function (msg) {
    var el = S.$("status");
    if (el) el.textContent = msg;
  };

  // Core state object initialization
  S.state = S.state || {
    lines: [],
    schedule: {},
    extraPositions: [],
    issues: [],
    shifts: [],
    functionCoverage: { mode: "none" }
  };

  // Shift sequence counter
  S.shiftSeq = S.shiftSeq || 1;

  // Compatibility: delegate to runtime contracts if available
  if (typeof S.runtime !== "undefined" && S.runtime.getContracts) {
    var contracts = S.runtime.getContracts();

    // Override time helpers to use contracts where possible
    S.timeToMin = function (t) {
      if (contracts.ScheduleState && typeof contracts.ScheduleState.timeToMin === "function") {
        return contracts.ScheduleState.timeToMin(t);
      }
      if (!t || typeof t !== "string") return 0;
      var p = t.split(":");
      return (+p[0] || 0) * 60 + (+p[1] || 0);
    };

    S.minToTime = function (m) {
      if (contracts.ScheduleState && typeof contracts.ScheduleState.minToTime === "function") {
        return contracts.ScheduleState.minToTime(m);
      }
      var normalized = ((m % 1440) + 1440) % 1440;
      var h = Math.floor(normalized / 60);
      var mm = normalized % 60;
      return String(h).padStart(2, "0") + ":" + String(mm).padStart(2, "0");
    };
  }

})();
