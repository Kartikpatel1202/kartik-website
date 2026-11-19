import type { MetadataRoute } from "next";
import { profile } from "@/content";
import { siteDescription, siteTitle } from "@/lib/site";

export const dynamic = "force-static";

/** Web app manifest: name, colours and icons (any + maskable). */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteTitle,
    short_name: profile.name,
    description: siteDescription,
    start_url: "/",
    display: "browser",
    background_color: "#0c0b0f",
    theme_color: "#0c0b0f",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      {
        src: "/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
