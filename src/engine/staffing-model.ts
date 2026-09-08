export type Role = "TSO" | "LTSO" | "STSO";
export type Sex = "M" | "F" | "X";
export type Status = "FT" | "PT";

export interface Person {
  id: string;
  name?: string;
  role: Role;
  sex: Sex;
  status: Status;
  qualifications?: string[];
}

export interface HeadcountCell {
  role: Role;
  sex: Sex;
  status: Status;
  count: number;
}

export interface ShiftWindow {
  id: string;
  name: string;
  start: string;
  end: string;
  phase?: string;
  paidHours?: number;
  hardRdos?: boolean[];
}

export interface CoverageBand {
  start: string;
  end: string;
  minTso: number;
  minLtso: number;
  minStso: number;
  function?: "DFO" | "BAG" | "PAX" | string;
}

export interface StaffingModel {
  airport: string;
  weeks: number;
  slotMinutes: number;
  people: Person[];
  genericHeadcount: HeadcountCell[];
  shifts: ShiftWindow[];
  coverage: CoverageBand[];
  source: "roster" | "generic-force" | "import" | "other";
}

export function emptyStaffingModel(airport = "DFW"): StaffingModel {
  return {
    airport,
    weeks: 1,
    slotMinutes: 30,
    people: [],
    genericHeadcount: [],
    shifts: [],
    coverage: [],
    source: "other",
  };
}
