/** Management reports — deviation tables + gender balance analysis + cohesion */
import { attachDeviation } from "./deviation.js";
import { attachGenderBalance } from "./gender-balance.js";
import { attachCohesion } from "./cohesion.js";

export function initReportsMath(S) {
  S = S || window.Scheduler;
  if (!S) return;

  S.reportsView = S.reportsView || {
    which: "passenger", // passenger | baggage | total | dfoPool
    skewThreshold: 5,
    phaseThresholdMin: 30
  };

  attachDeviation(S);
  attachGenderBalance(S);
  attachCohesion(S);

  S.renderReports = function () {
    var which = S.reportsView.which || "passenger";
    var map = {
      passenger: ["report-main", "passenger", "Passenger coverage"],
      baggage: ["report-main", "baggage", "Baggage / DFO duty coverage"],
      total: ["report-main", "total", "Total coverage (everybody)"],
      dfoPool: ["report-main", "dfoPool", "DFO allocated pool (certified)"]
    };
    var cfg = map[which] || map.passenger;
    S.renderDeviationReport(cfg[0], cfg[1], cfg[2]);
    S.renderGenderBalanceReports();
    S.renderTeamCohesionReport();
  };

  S.initReports = function () {
    if (S._reportsBound) return;
    S._reportsBound = true;
    document.addEventListener("change", function (e) {
      var t = e.target;
      if (!t) return;
      if (t.name === "report-which") {
        S.reportsView.which = t.value;
        S.renderReports();
      }
      if (t.id === "report-skew-thr") {
        S.reportsView.skewThreshold = Math.max(1, +t.value || 5);
        S.renderReports();
      }
      if (t.id === "report-phase-thr") {
        S.reportsView.phaseThresholdMin = Math.max(0, +t.value || 30);
        S.renderReports();
      }
    });
  };
}
