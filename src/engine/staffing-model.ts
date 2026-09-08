import type { Person, RoleKind, Sex, DutyStatus } from "./roles";
import type { AirfieldPayload } from "./airfield";

export type { Person, RoleKind, Sex, DutyStatus };

export interface HeadcountCell {
  role: RoleKind;
  sex: Sex;
  status: DutyStatus;
  count: number;
}

export interface StaffingModel {
  airport: string;
  weeks: number;
  slotMinutes: number;
  people: Person[];
  genericHeadcount: HeadcountCell[];
  shifts: any[];
  coverage: any[];
  airfield: AirfieldPayload | null;
  source: "roster" | "generic-force" | "import" | "other";
}
