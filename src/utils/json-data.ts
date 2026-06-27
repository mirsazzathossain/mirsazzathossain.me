import { readFile } from "node:fs/promises";
import path from "node:path";

const dataDir = path.join(process.cwd(), "src", "data");

/** Load JSON shipped with the site (under `src/data/`, not exposed as static URLs). */
export async function readSiteJson<T>(filename: string): Promise<T> {
  const filePath = path.join(dataDir, filename);
  const raw = await readFile(filePath, "utf-8");
  try {
    return JSON.parse(raw) as T;
  } catch {
    throw new Error(`Failed to parse JSON from ${filename}`);
  }
}
