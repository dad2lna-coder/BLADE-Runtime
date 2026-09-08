export type Capability =
  | "read:roster"
  | "read:config"
  | "read:capacity"
  | "calculate:schedule"
  | "write:exports";

export interface ModuleDeclaration {
  id: string;
  name: string;
  version: string;
  capabilities: Capability[];
  provides?: string[];
  dependsOn?: string[];
}

export function isAllowed(requested: Capability[], granted: Capability[]): boolean {
  return requested.every((cap) => granted.includes(cap));
}
