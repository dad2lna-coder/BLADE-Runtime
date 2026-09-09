export interface OpenSlice {
  start: string;
  end: string;
  openUnits: number;
}

export interface PeakRaise {
  start: string;
  end: string;
  extraFte: number;
  note?: string;
}

export interface SiteDemand {
  siteId: string;
  kind: "checkpoint" | "modset" | "bag";
  open: OpenSlice[];
  peaks: PeakRaise[];
}

export interface DemandPayload {
  schema: "blade.demand.v1";
  airport: string;
  sites: SiteDemand[];
}
