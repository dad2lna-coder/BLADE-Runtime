function lineByMemberId(S, id) {
  var lines = (S.state && S.state.lines) || [];
  var i;
  for (i = 0; i < lines.length; i++) {
    if (lines[i].id === id || String(lines[i].id) === String(id)) return lines[i];
  }
  return null;
}

function roleOf(S, line) {
  return S.lineRoleKey ? S.lineRoleKey(line) : "TSO";
}

function shiftIntervalMins(S, shiftId, dow) {
  var times;
  if (S.getEffectiveShiftTimes) times = S.getEffectiveShiftTimes(shiftId, dow);
  else {
    var sh = S.getShift ? S.getShift(shiftId) : null;
    times = sh ? { start: sh.start, end: sh.end } : null;
  }
  if (!times) return null;
  var a = S.timeToMin(times.start);
  var b = S.timeToMin(times.end);
  if (a == null || b == null || isNaN(a) || isNaN(b)) return null;
  if (b <= a) b += 1440;
  return { a: a, b: b };
}

function overlapHours(intA, intB) {
  if (!intA || !intB) return 0;
  var lo = Math.max(intA.a, intB.a);
  var hi = Math.min(intA.b, intB.b);
  if (hi <= lo) return 0;
  return (hi - lo) / 60;
}

export function teamSupervisorLine(S, team) {
  var members = (team && team.members) || [];
  var first = null;
  var i, line, role;
  for (i = 0; i < members.length; i++) {
    line = lineByMemberId(S, members[i]);
    if (!line) continue;
    if (!first) first = line;
    role = roleOf(S, line);
    if (role === "STSO") return line;
  }
  return first;
}

export function lineScheduledHours(S, line) {
  if (!line) return 0;
  var days = ((S.state && S.state.weekCount) || 1) * 7;
  var sched = (S.state && S.state.schedule && S.state.schedule[line.id]) || [];
  var hours = 0;
  var off, dow, iv;
  for (off = 0; off < days; off++) {
    if (sched[off] !== "WORK") continue;
    dow = off % 7;
    iv = shiftIntervalMins(S, line.shiftId, dow);
    if (!iv) continue;
    hours += (iv.b - iv.a) / 60;
  }
  return hours;
}

export function lineOverlapHoursWith(S, line, supervisorLine) {
  if (!line || !supervisorLine) return 0;
  var days = ((S.state && S.state.weekCount) || 1) * 7;
  var schedA = (S.state && S.state.schedule && S.state.schedule[line.id]) || [];
  var schedB = (S.state && S.state.schedule && S.state.schedule[supervisorLine.id]) || [];
  var hours = 0;
  var off, dow;
  for (off = 0; off < days; off++) {
    if (schedA[off] !== "WORK" || schedB[off] !== "WORK") continue;
    dow = off % 7;
    hours += overlapHours(shiftIntervalMins(S, line.shiftId, dow), shiftIntervalMins(S, supervisorLine.shiftId, dow));
  }
  return hours;
}

export function computeTeamCohesion(S, team) {
  var name = (team && (team.name || team.id)) || "Team";
  var members = (team && team.members) || [];
  var stso = 0, ltso = 0, tso = 0;
  var i, line, role;
  for (i = 0; i < members.length; i++) {
    line = lineByMemberId(S, members[i]);
    if (!line) continue;
    role = roleOf(S, line);
    if (role === "STSO") stso++;
    else if (role === "LTSO") ltso++;
    else tso++;
  }
  var supervisor = S.teamSupervisorLine(team);
  var cohesionPct = null;
  if (supervisor && members.length) {
    var ratios = [];
    for (i = 0; i < members.length; i++) {
      line = lineByMemberId(S, members[i]);
      if (!line) continue;
      if (line.id === supervisor.id) continue;
      var den = S.lineScheduledHours(line);
      if (!den) continue;
      ratios.push(S.lineOverlapHoursWith(line, supervisor) / den);
    }
    if (ratios.length) {
      var sum = 0;
      for (i = 0; i < ratios.length; i++) sum += ratios[i];
      cohesionPct = (sum / ratios.length) * 100;
    }
  }
  return { name: name, stso: stso, ltso: ltso, tso: tso, cohesionPct: cohesionPct };
}

export function renderTeamCohesionReport(S) {
  var el = S.$("report-cohesion");
  if (!el) return;
  var teams = (S.teams && S.teams.teams) || [];
  if (!teams.length) {
    el.innerHTML = "<p class=\"muted\">No teams yet.</p>";
    return;
  }
  var html =
    "<div class=\"lines-scroll\"><table class=\"data-table\"><thead><tr>" +
    "<th>Team name</th><th>STSO count</th><th>LTSO count</th><th>TSO count</th><th>Cohesion %</th>" +
    "</tr></thead><tbody>";
  teams.forEach(function (team) {
    var row = S.computeTeamCohesion(team);
    var pct;
    if (row.cohesionPct == null) pct = "\u2014";
    else if (Math.abs(row.cohesionPct - Math.round(row.cohesionPct)) < 0.05) pct = String(Math.round(row.cohesionPct));
    else pct = row.cohesionPct.toFixed(1);
    html +=
      "<tr><td>" +
      String(row.name).replace(/[&<>]/g, function (c) {
        return { "&": "&", "<": "<", ">": ">" }[c];
      }) +
      "</td><td>" +
      row.stso +
      "</td><td>" +
      row.ltso +
      "</td><td>" +
      row.tso +
      "</td><td>" +
      pct +
      "</td></tr>";
  });
  html += "</tbody></table></div>";
  el.innerHTML = html;
}

export function attachCohesion(S) {
  if (!S) return;
  S.teamSupervisorLine = function (team) { return teamSupervisorLine(S, team); };
  S.lineScheduledHours = function (line) { return lineScheduledHours(S, line); };
  S.lineOverlapHoursWith = function (line, supervisorLine) { return lineOverlapHoursWith(S, line, supervisorLine); };
  S.computeTeamCohesion = function (team) { return computeTeamCohesion(S, team); };
  S.renderTeamCohesionReport = function () { return renderTeamCohesionReport(S); };
}
