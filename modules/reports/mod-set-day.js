function cfg(S) {
  return (S.getAirportConfig && S.getAirportConfig()) || { startTime: "03:30", endTime: "23:00", terminals: [] };
}

function lanesOf(ms) {
  var n = Number(ms && ms.lanes);
  return Number.isFinite(n) && n >= 0 ? n : 2;
}

export function listModSets(S) {
  var out = [];
  (cfg(S).terminals || []).forEach(function (term) {
    (term.checkpoints || []).forEach(function (cp) {
      (cp.modSets || []).forEach(function (ms, idx) {
        if (!ms.name) ms.name = "MS-" + (ms.id != null ? ms.id : idx + 1);
        out.push({
          id: ms.id, name: ms.name, lanes: lanesOf(ms), program: ms.program || "STD", startTime: ms.startTime,
          terminalId: term.id, terminal: term.name, checkpointId: cp.id, checkpoint: cp.name
        });
      });
    });
  });
  return out;
}

export function teamSexCounts(S, team) {
  var c = S.teamMemberCounts ? S.teamMemberCounts(team) : null;
  if (c) {
    var m = (c.STSO.M || 0) + (c.LTSO.M || 0) + (c.TSO.M || 0);
    var f = (c.STSO.F || 0) + (c.LTSO.F || 0) + (c.TSO.F || 0);
    return { m: m, f: f, t: m + f };
  }
  return { m: 0, f: 0, t: 0 };
}

function memberWorks(S, mid, day) {
  var sched = (S.state && S.state.schedule && (S.state.schedule[mid] || S.state.schedule[String(mid)])) || [];
  return sched[day] === "WORK";
}

export function teamWorksDay(S, team, day) {
  var members = (team && team.members) || [];
  if (!members.length) return false;
  var work = 0;
  members.forEach(function (mid) { if (memberWorks(S, mid, day)) work++; });
  return work >= Math.ceil(members.length / 2);
}

export function ensureTeamDayMap(S) {
  if (!S.state.teamDayMod) S.state.teamDayMod = {};
  return S.state.teamDayMod;
}

export function modSetForTeamDay(S, teamId, day) {
  var map = ensureTeamDayMap(S);
  var row = map[String(teamId)];
  if (!row) return null;
  return row[day] != null ? row[day] : null;
}

export function setTeamDayModSet(S, teamId, day, modSetId) {
  var map = ensureTeamDayMap(S);
  var key = String(teamId);
  if (!map[key]) map[key] = [null, null, null, null, null, null, null];
  map[key][day] = modSetId || null;
}

export function balanceDayPairings(S, day) {
  var teams = (S.teams && S.teams.teams) || [];
  var sets = listModSets(S);
  var byId = {};
  sets.forEach(function (s) { byId[String(s.id)] = s; });
  var byCp = {};
  teams.forEach(function (t) {
    var msId = modSetForTeamDay(S, t.id, day);
    if (msId == null) return;
    var rec = byId[String(msId)];
    if (!rec) return;
    var k = String(rec.checkpointId);
    if (!byCp[k]) byCp[k] = [];
    byCp[k].push(t);
  });
  Object.keys(byCp).forEach(function (k) {
    var group = byCp[k];
    if (group.length < 2) return;
    var sex = group.map(function (t) { return teamSexCounts(S, t); });
    var needy = null, donor = null;
    group.forEach(function (t, i) {
      if (sex[i].t && sex[i].f === 0) needy = t;
      if (sex[i].f > 0) donor = t;
    });
    if (!needy || !donor || needy === donor) return;
    var a = modSetForTeamDay(S, donor.id, day);
    var b = modSetForTeamDay(S, needy.id, day);
    setTeamDayModSet(S, donor.id, day, b);
    setTeamDayModSet(S, needy.id, day, a);
  });
}

export function assignCoverageByDay(S) {
  var sets = listModSets(S);
  var teams = (S.teams && S.teams.teams) ? S.teams.teams.slice() : [];
  if (!teams.length) return { message: "Form teams first." };
  if (!sets.length) return { message: "Name mod sets in Airfield first." };
  ensureTeamDayMap(S);
  sets = sets.slice().sort(function (a, b) {
    if (b.lanes !== a.lanes) return b.lanes - a.lanes;
    return String(a.name).localeCompare(String(b.name));
  });
  for (var day = 0; day < 7; day++) {
    var working = teams.filter(function (t) { return teamWorksDay(S, t, day); });
    var rot = day % Math.max(working.length, 1);
    var ordered = working.slice(rot).concat(working.slice(0, rot));
    teams.forEach(function (t) { setTeamDayModSet(S, t.id, day, null); });
    var used = {};
    sets.forEach(function (set) {
      var pick = null;
      for (var i = 0; i < ordered.length; i++) {
        if (used[ordered[i].id]) continue;
        pick = ordered[i];
        break;
      }
      if (!pick) return;
      used[pick.id] = true;
      setTeamDayModSet(S, pick.id, day, set.id);
    });
    balanceDayPairings(S, day);
  }
  if (S.paintLineColors) S.paintLineColors();
  if (S.renderLines) S.renderLines();
  var msg = "Daily coverage assigned. Teams move sets by day from who is working.";
  if (S.updateStatus) S.updateStatus(msg);
  if (S.renderCapacity) S.renderCapacity();
  return { message: msg };
}

export function attachModSetDay(S) {
  if (!S) return;
  S.listModSets = function () { return listModSets(S); };
  S.teamSexCounts = function (team) { return teamSexCounts(S, team); };
  S.teamWorksDay = function (team, day) { return teamWorksDay(S, team, day); };
  S.ensureTeamDayMap = function () { return ensureTeamDayMap(S); };
  S.modSetForTeamDay = function (teamId, day) { return modSetForTeamDay(S, teamId, day); };
  S.setTeamDayModSet = function (teamId, day, modSetId) { return setTeamDayModSet(S, teamId, day, modSetId); };
  S.assignCoverageByDay = function () { return assignCoverageByDay(S); };
  S.assignTeamsToModSets = S.assignCoverageByDay;
  S.balanceDayPairings = function (day) { return balanceDayPairings(S, day); };
}
