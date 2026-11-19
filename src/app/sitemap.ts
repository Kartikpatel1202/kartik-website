import type { MetadataRoute } from "next";
import { getFeaturedProjects } from "@/content";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl("/"), changeFrequency: "monthly", priority: 1 },
    ...getFeaturedProjects().map((project) => ({
      url: absoluteUrl(`/projects/${project.slug}/`),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
