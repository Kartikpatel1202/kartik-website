import Image from "next/image";
import type { ProjectImageId } from "@/content/projectImages.generated";
import { imageProps } from "@/lib/images";
import { cn } from "@/lib/utils";

interface ProjectImageProps {
  id: ProjectImageId;
  alt: string;
  /** The `sizes` attribute: how wide the image renders at each breakpoint. */
  sizes: string;
  /** Classes for the frame (set the aspect ratio here). */
  className?: string;
  /** Classes for the <img> itself, e.g. object position. */
  imgClassName?: string;
  /** Fetch early with high priority. Only for the page's LCP image. */
  preload?: boolean;
}

/**
 * Responsive project screenshot through next/image. The files are pre-optimised WebP
 * (scripts/project-images.mjs); src/lib/imageLoader.ts maps each srcset width to the nearest
 * generated size. A 16px blurred placeholder fills the frame until the image paints.
 */
export function ProjectImage({
  id,
  alt,
  sizes,
  className,
  imgClassName,
  preload = false,
}: ProjectImageProps) {
  const picture = (
    <Image
      {...imageProps(id)}
      alt={alt}
      sizes={sizes}
      placeholder="blur"
      preload={preload}
      className={cn("size-full object-cover object-top", imgClassName)}
    />
  );

  return <div className={cn("relative overflow-hidden bg-bg-2", className)}>{picture}</div>;
}
