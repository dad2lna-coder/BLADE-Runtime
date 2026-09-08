export type Sex = "M" | "F" | "X";
export type DutyStatus = "FT" | "PT";

export type RoleKind =
  | "TSO"
  | "LTSO"
  | "STSO"
  | "ESTI"
  | "MSTI"
  | "TSM"
  | "OTHER";

export type PositionScope = "lane" | "mod" | "site";

export interface PositionFamily {
  fam: string;
  label: string;
  scope: PositionScope;
  seats: number;
  qual?: string;
}

export const DEFAULT_POSITION_FAMILIES: PositionFamily[] = [
  { fam: "T", label: "TDC", scope: "lane", seats: 1 },
  { fam: "D", label: "Divest", scope: "lane", seats: 1 },
  { fam: "SO", label: "Body Scanner", scope: "mod", seats: 1, qual: "AIT" },
  { fam: "CT", label: "CT / advanced imaging", scope: "lane", seats: 1, qual: "Z" },
  { fam: "KCM", label: "KCM", scope: "site", seats: 1 },
  { fam: "EXIT", label: "Exit Lane", scope: "site", seats: 1 },
];

export interface Person {
  id: string;
  name?: string;
  role: RoleKind;
  sex: Sex;
  status: DutyStatus;
  qualifications?: string[];
}
