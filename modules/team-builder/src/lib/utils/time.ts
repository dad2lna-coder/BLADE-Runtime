/** Parse "HH:MM" into minutes since midnight. Returns null if unparseable. */
export function timeToMin(t: string | null | undefined): number | null {
  const m = String(t ?? "").match(/^(\d{1,2}):(\d{2})/);
  if (!m) return null;
  return Number(m[1]) * 60 + Number(m[2]);
}

/** Format minutes since midnight back to "HH:MM". */
export function minToLabel(mins: number): string {
  const h = Math.floor(mins / 60);
  const mm = mins % 60;
  return String(h).padStart(2, "0") + ":" + String(mm).padStart(2, "0");
}

/** Zero-pad a sequence number for stable lexical sort ("01", "02", ...). */
export function padNum(n: number, width = 2): string {
  const s = String(n);
  return s.length >= width ? s : "0".repeat(width - s.length) + s;
}

export const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;
