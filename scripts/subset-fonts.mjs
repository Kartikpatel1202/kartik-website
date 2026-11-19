/**
 * Subsets the self-hosted fonts to the characters this site can render: Basic Latin, Latin-1,
 * general punctuation (dashes, quotes, ellipsis), ₹ and €, arrows and a few maths symbols.
 * Variable axes are kept. Output goes to src/fonts/ and is loaded by src/lib/fonts.ts.
 *
 *   node scripts/subset-fonts.mjs
 */
import { readFile, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import subsetFont from "subset-font";

const root = path.resolve(import.meta.dirname, "..");
const outDir = path.join(root, "src/fonts");

const ranges = [
  [0x20, 0x7e],
  [0xa0, 0xff],
  [0x2010, 0x2027],
  [0x2030, 0x205e],
  [0x20ac, 0x20ac],
  [0x20b9, 0x20b9],
  [0x2190, 0x2199],
  [0x2212, 0x2212],
  [0x2248, 0x2248],
  [0x2260, 0x2265],
];
const text = ranges
  .flatMap(([from, to]) =>
    Array.from({ length: to - from + 1 }, (_, i) => String.fromCodePoint(from + i)),
  )
  .join("");

const fonts = [
  ["node_modules/geist/dist/fonts/geist-sans/Geist-Variable.woff2", "geist-sans-latin.woff2"],
  ["node_modules/geist/dist/fonts/geist-mono/GeistMono-Variable.woff2", "geist-mono-latin.woff2"],
];

await mkdir(outDir, { recursive: true });
for (const [source, target] of fonts) {
  const input = await readFile(path.join(root, source));
  const output = await subsetFont(input, text, { targetFormat: "woff2" });
  await writeFile(path.join(outDir, target), output);
  console.log(
    `${target}: ${(input.length / 1024).toFixed(1)} KB → ${(output.length / 1024).toFixed(1)} KB`,
  );
}
