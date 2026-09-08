export type Program = "STD" | "PRE" | "MIX";

export interface Terminal {
  id: string;
  name: string;
  open: string;
  close: string;
  baseTsoCost?: { STD: number; PRE: number; MIX: number };
}

export interface Lane {
  n: number;
  ct: 0 | 1;
}

export interface Modset {
  open?: string;
  close?: string;
  program: Program;
  ait: 0 | 1 | 2;
  lanes: Lane[];
}

export interface KcmHours {
  open: string;
  close: string;
}

export interface ExitTie {
  am: 0 | 1;
  pm: 0 | 1;
}

export interface Checkpoint {
  id: string;
  name: string;
  terminalId: string;
  open: string;
  close: string;
  mods: Modset[];
  kcm: KcmHours | null;
  exit?: ExitTie;
}

export interface AirfieldPayload {
  schema: "blade.airfield.v2";
  airport: string;
  open: string;
  close: string;
  volumePerHour?: { STD: number; PRE: number; MIX: number };
  terminals: Terminal[];
  checkpoints: Checkpoint[];
}
