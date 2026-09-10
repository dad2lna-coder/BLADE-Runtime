import type { PoolEntry, Phase } from "../types";

export interface PhaseAnchors {
  am: number;
  pm: number;
}

/**
 * Find the AM anchor (the morning start time with the most people on it)
 * and the PM anchor (the afternoon/evening start time with the most people
 * on it), from a set of pool entries. This mirrors Blade's
 * `computeShiftAnchors`, so "Opening" / "Closing" classification stays
 * consistent between the Coverage tab and the Team Builder, and keeps
 * working if shift start times ever change (nothing here is a hardcoded
 * clock time).
 */
export function computeShiftAnchors(entries: PoolEntry[]): PhaseAnchors {
  const startCounts = new Map<number, number>();
  for (const p of entries) {
    startCounts.set(p.startMin, (startCounts.get(p.startMin) ?? 0) + 1);
  }
  const sorted = [...startCounts.entries()]
    .map(([min, n]) => ({ min, n }))
    .sort((a, b) => a.min - b.min);

  if (!sorted.length) return { am: 8 * 60, pm: 14 * 60 };

  let am = sorted[0].min;
  let amN = 0;
  for (const e of sorted) {
    if (e.min < 11 * 60 && e.n > amN) {
      amN = e.n;
      am = e.min;
    }
  }

  let pm = sorted[sorted.length - 1].min;
  let pmN = 0;
  for (const e of sorted) {
    if (e.min >= 11 * 60 + 15 && e.n > pmN) {
      pmN = e.n;
      pm = e.min;
    }
  }
  if (pmN === 0) {
    for (const e of sorted) {
      if (e.min >= 12 * 60 && e.n > pmN) {
        pmN = e.n;
        pm = e.min;
      }
    }
  }
  return { am, pm };
}

/** Classify a start time into Opening / AM / PM / Closing relative to the given anchors. */
export function phaseOfStart(
  startMin: number,
  anchors: PhaseAnchors,
  thresholdMin = 15
): Phase {
  if (startMin <= anchors.am - thresholdMin && startMin < 11 * 60) return "Opening";
  if (startMin >= anchors.pm + thresholdMin && startMin >= 11 * 60 + 15) return "Closing";
  if (startMin < anchors.pm) return "AM";
  return "PM";
}

export const PHASE_RANK: Record<Phase, number> = { Opening: 0, AM: 1, PM: 2, Closing: 3 };
