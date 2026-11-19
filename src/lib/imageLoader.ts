/**
 * next/image loader for the static export (wired via `images.loaderFile` in next.config.ts).
 *
 * Images are pre-optimised by scripts/project-images.mjs into fixed widths, and ProjectImage
 * passes `src` as "/images/projects/<slug>/<name>.webp?w=640,960,1440,1917". This loader returns
 * the smallest generated file at least as wide as the width next/image asks for (or the largest
 * one), so every srcset entry points at a real file and no image server is needed.
 */
export default function imageLoader({ src, width }: { src: string; width: number }): string {
  const [pathname = src, query = ""] = src.split("?");
  const widths = new URLSearchParams(query)
    .get("w")
    ?.split(",")
    .map(Number)
    .filter(Number.isFinite)
    .sort((a, b) => a - b);
  if (!widths?.length) return src;
  const chosen = widths.find((w) => w >= width) ?? widths[widths.length - 1];
  return pathname.replace(/\.webp$/, `-${chosen}.webp`);
}
