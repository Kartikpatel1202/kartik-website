import { getRoles, getSkillViews, profile, skillTiers } from "@/content";

// TODO: confirm with Kartik — no domain chosen yet. Set SITE_URL (see .env.example) at build time
// before any release; until then canonical URLs, the sitemap and JSON-LD point at localhost.
export const siteUrl = (process.env.SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");

export const siteTitle = `${profile.name} · ${profile.role}`;

export const siteDescription = profile.positioning;

/** Meta keywords: name, verified roles and the "daily driver" skills (5+ repos), all from content. */
const dailyMin = skillTiers.find((tier) => tier.id === "daily")?.min ?? 5;
export const siteKeywords = [
  profile.name,
  profile.role,
  ...getRoles().map((role) => role.label),
  ...getSkillViews()
    .filter((skill) => skill.repoCount >= dailyMin)
    .map((skill) => skill.name),
];

/** Builds an absolute URL for canonical links, sitemaps and JSON-LD. */
export function absoluteUrl(path = "/"): string {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
