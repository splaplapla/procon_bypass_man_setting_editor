import { compareVersions } from "compare-versions";

export function VersionCompare(v1: string, v2: string): boolean {
  const result = compareVersions(v1, v2);
  if (result == 1) {
    return true;
  } else {
    return false;
  }
}
