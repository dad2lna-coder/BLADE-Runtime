export function coverageSlots(S) {
  var openMin = S.timeToMin(S.state.open);
  var closeMin = S.timeToMin(S.state.close);
  var start = Math.floor(openMin / 30) * 30;
  var end = Math.ceil(closeMin / 30) * 30;
  var slots = [];
  for (var m = start; m < end; m += 30) slots.push(m);
  return slots;
}

export function slotLabel(mins) {
  var h = Math.floor(mins / 60);
  var mm = mins % 60;
  return String(h).padStart(2, "0") + ":" + String(mm).padStart(2, "0");
}
