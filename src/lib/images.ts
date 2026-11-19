import { projectImages, type ProjectImageId } from "@/content/projectImages.generated";

/**
 * next/image props for a pre-generated image (scripts/project-images.mjs). The `?w=` list tells
 * src/lib/imageLoader.ts which widths exist on disk.
 */
export function imageProps(id: ProjectImageId) {
  const image = projectImages[id];
  const widths = image.sources.map((s) => s.width).join(",");
  const base = image.sources[0].src.replace(/-\d+\.webp$/, ".webp");
  return {
    src: `${base}?w=${widths}`,
    width: image.width,
    height: image.height,
    blurDataURL: image.blur,
  };
}
