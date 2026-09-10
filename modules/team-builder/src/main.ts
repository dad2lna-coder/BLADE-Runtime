import TeamBuilder from "./lib/components/TeamBuilder.svelte";
import type { Line, Shift } from "./lib/types";

const shifts: Shift[] = [
  { id: "S1", name: "0330", start: "03:30", end: "12:00", paid: 8 },
  { id: "S2", name: "0400", start: "04:00", end: "12:30", paid: 8 },
  { id: "S3", name: "1230", start: "12:00", end: "20:30", paid: 8 },
  { id: "S4", name: "1430", start: "14:30", end: "23:00", paid: 8 }
];

function sampleLines(): Line[] {
  const lines: Line[] = [];
  let id = 1;

  // 4 STSO anchors, one per shift, alternating sex
  shifts.forEach((s, i) => {
    lines.push({
      id: id++,
      lineCode: `STSO-${s.name}`,
      shiftId: s.id,
      sex: i % 2 === 0 ? "M" : "F",
      empClass: "STSO",
      isStso: true,
      rdoDays: [0, 6]
    });
  });

  // 4 LTSO, mixed
  shifts.forEach((s, i) => {
    lines.push({
      id: id++,
      lineCode: `LTSO-${s.name}`,
      shiftId: s.id,
      sex: i % 2 === 0 ? "F" : "M",
      empClass: "LTSO",
      isLtso: true,
      rdoDays: [0, 6]
    });
  });

  // 40 TSO lines spread across shifts
  for (let i = 0; i < 40; i++) {
    const s = shifts[i % shifts.length];
    lines.push({
      id: id++,
      lineCode: `TSO-${String(i + 1).padStart(3, "0")}`,
      shiftId: s.id,
      sex: i % 3 === 0 ? "F" : "M",
      empClass: i % 5 === 0 ? "PT" : "FT",
      rdoDays: [i % 7, (i + 1) % 7]
    });
  }

  return lines;
}

const app = new TeamBuilder({
  target: document.getElementById("app")!,
  props: {
    lines: sampleLines(),
    shifts,
    weekCount: 1,
    phaseThresholdMin: 15,
    archStso: 1,
    archLtso: 1,
    archTso: 6
  }
});

app.$on("teamschange", (e: CustomEvent) => console.log("teamschange", e.detail));
app.$on("status", (e: CustomEvent) => console.log("status:", e.detail.message));
app.$on("rdoswap", (e: CustomEvent) => console.log("rdoswap", e.detail));

export default app;
