export interface DistributionLayout {
  root: string;
  manifest: string;
  configDir: string;
  dataDir: string;
  modulesDir: string;
}

export function layoutFromRoot(root: string): DistributionLayout {
  return {
    root,
    manifest: `${root}/manifest.json`,
    configDir: `${root}/config`,
    dataDir: `${root}/data`,
    modulesDir: `${root}/modules`,
  };
}

export type UpdateLane = "data" | "config" | "runtime";

export function classifyPath(path: string): UpdateLane {
  if (path.includes("/data/")) return "data";
  if (path.includes("/config/") || path.includes("/modules/")) return "config";
  return "runtime";
}
