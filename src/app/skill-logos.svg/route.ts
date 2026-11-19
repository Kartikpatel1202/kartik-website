import { buildSkillSprite } from "@/lib/skillLogos";

export const dynamic = "force-static";

/** Static SVG sprite of every skill logo, written to /out/skill-logos.svg at build time. */
export function GET() {
  return new Response(buildSkillSprite(), {
    headers: { "Content-Type": "image/svg+xml; charset=utf-8" },
  });
}
