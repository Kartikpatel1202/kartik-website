import localFont from "next/font/local";

// Subset to Latin + the punctuation, arrows and symbols the site uses (scripts/subset-fonts.mjs).
// Display headings use Geist Sans at heavy weights (Phase 10 redesign); the serif was removed.

/**
 * Body, UI and display face (variable weight, 100–900). Preloaded: it renders the hero headline
 * and the LCP text, and a late swap would re-wrap them (CLS).
 */
export const geistSans = localFont({
  src: "../fonts/geist-sans-latin.woff2",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
});

/** Mono face for eyebrows, trace labels and metrics. */
export const geistMono = localFont({
  src: "../fonts/geist-mono-latin.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
  preload: false,
  fallback: ["ui-monospace", "monospace"],
});
