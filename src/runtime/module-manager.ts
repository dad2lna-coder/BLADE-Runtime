import type { ModuleDeclaration, Capability } from "./capabilities";
import { isAllowed } from "./capabilities";

export interface LoadedModule {
  declaration: ModuleDeclaration;
  enabled: boolean;
  granted: Capability[];
}

export class ModuleManager {
  private loaded = new Map<string, LoadedModule>();

  register(
    declaration: ModuleDeclaration,
    granted: Capability[],
    enabled: boolean,
  ): { ok: true } | { ok: false; reason: string } {
    if (!isAllowed(declaration.capabilities, granted)) {
      return {
        ok: false,
        reason: `Module ${declaration.id} requested capabilities that are not granted`,
      };
    }
    this.loaded.set(declaration.id, { declaration, enabled, granted });
    return { ok: true };
  }

  enabled(): LoadedModule[] {
    return [...this.loaded.values()].filter((m) => m.enabled);
  }

  has(id: string): boolean {
    return this.loaded.get(id)?.enabled === true;
  }
}
