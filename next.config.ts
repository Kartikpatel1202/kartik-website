import bundleAnalyzer from "@next/bundle-analyzer";
import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

// `npm run analyze` (a webpack build) writes interactive bundle reports to .next/analyze/.
// Keyed off the npm script name so it works in every shell, Windows cmd included.
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.npm_lifecycle_event === "analyze",
  openAnalyzer: false,
});

const nextConfig: NextConfig = {
  // Fully static site: `next build` writes plain HTML/CSS/JS to /out. No server needed.
  output: "export",
  trailingSlash: true,
  images: {
    // No image server in a static export: images are pre-sized by scripts/project-images.mjs and
    // this loader maps each srcset width to the nearest generated file.
    loader: "custom",
    loaderFile: "./src/lib/imageLoader.ts",
    deviceSizes: [390, 640, 780, 960, 1440, 1920],
    imageSizes: [200, 280],
  },
  // `*.dev.tsx` pages (e.g. /dev/kitchen-sink) exist only in `next dev`, never in a production build.
  pageExtensions: isDev ? ["dev.tsx", "tsx", "ts"] : ["tsx", "ts"],
  reactStrictMode: true,
  poweredByHeader: false,
};

export default withBundleAnalyzer(nextConfig);
