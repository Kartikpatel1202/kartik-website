/**
 * Works around a Next.js 16.4.6 static-export bug on Windows (runs as `postbuild`).
 *
 * The export names per-segment prefetch files with
 * `__next${segmentPath.replace(/\//g, ".")}.txt`, but on Windows `segmentPath` uses backslashes,
 * so files land in nested folders (`__next.projects/$d$slug/__PAGE__.txt`) while the router
 * requests the dotted name (`__next.projects.$d$slug.__PAGE__.txt`). Every link prefetch then
 * 404s (navigation still works, via the full payload). This moves such files to the dotted name.
 * On macOS/Linux builds the files are already correct and nothing is changed.
 */
import { readdir, rename, rm, stat } from "node:fs/promises";
import path from "node:path";

const outDir = path.resolve(import.meta.dirname, "../out");
let moved = 0;

/** Flattens a nested `__next.*` folder into dotted file names in its parent directory. */
async function flatten(dir, prefix, parent) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    const name = `${prefix}.${entry.name}`;
    if (entry.isDirectory()) await flatten(full, name, parent);
    else {
      await rename(full, path.join(parent, name));
      moved++;
    }
  }
}

async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (!entry.isDirectory()) continue;
    if (entry.name.startsWith("__next.")) {
      await flatten(full, entry.name, dir);
      await rm(full, { recursive: true, force: true });
    } else if (entry.name !== "_next") {
      await walk(full);
    }
  }
}

if (await stat(outDir).catch(() => null)) {
  await walk(outDir);
  if (moved) console.log(`fix-segment-files: renamed ${moved} prefetch segment file(s) in /out`);
}
