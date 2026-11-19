// Imported only by server components: the icon data never reaches the client bundle.
import {
  siDocker,
  siFastapi,
  siGit,
  siGithubactions,
  siJavascript,
  siJsonwebtokens,
  siMongodb,
  siNextdotjs,
  siNodedotjs,
  siPandas,
  siPostgresql,
  siPwa,
  siPydantic,
  siPytest,
  siPython,
  siReact,
  siReactquery,
  siRuff,
  siScikitlearn,
  siSqlalchemy,
  siSqlite,
  siStreamlit,
  siSupabase,
  siTailwindcss,
  siTypescript,
  siVite,
  siVitest,
  siZod,
  type SimpleIcon,
} from "simple-icons";

/** Official logos (simple-icons, CC0) for skills that have one. Others get a typographic mark. */
const logos: Readonly<Record<string, SimpleIcon>> = {
  Python: siPython,
  TypeScript: siTypescript,
  JavaScript: siJavascript,
  React: siReact,
  "Tailwind CSS": siTailwindcss,
  Vite: siVite,
  "Next.js": siNextdotjs,
  Zod: siZod,
  "TanStack Query": siReactquery,
  "PWA & i18n": siPwa,
  FastAPI: siFastapi,
  Pydantic: siPydantic,
  SQLAlchemy: siSqlalchemy,
  "JWT auth": siJsonwebtokens,
  "Node.js & Express": siNodedotjs,
  SQLite: siSqlite,
  PostgreSQL: siPostgresql,
  Supabase: siSupabase,
  MongoDB: siMongodb,
  "scikit-learn": siScikitlearn,
  pandas: siPandas,
  Streamlit: siStreamlit,
  Git: siGit,
  pytest: siPytest,
  "ruff & mypy": siRuff,
  Docker: siDocker,
  Vitest: siVitest,
  "GitHub Actions": siGithubactions,
};

const SURFACE = "#14171d"; // bg-2, the tile background
const NEUTRAL = "#a8aeba"; // text-secondary, for brands too dark to read on the surface

function luminance(hex: string): number {
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(hex.slice(i + 1, i + 3), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  }) as [number, number, number];
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x) as [number, number];
  return (hi + 0.05) / (lo + 0.05);
}

/** Public URL of the sprite that holds every skill logo (src/app/skill-logos.svg/route.ts). */
export const SKILL_SPRITE_URL = "/skill-logos.svg";

export interface SkillLogo {
  /** Symbol id inside the sprite. */
  id: string;
  /** Brand colour, or a neutral fallback when the brand colour is under 3:1 on the tile. */
  color: string;
}

/** Sprite symbol id and display colour for a skill, if it has an official logo. */
export function getSkillLogo(skillName: string): SkillLogo | undefined {
  const icon = logos[skillName];
  if (!icon) return undefined;
  const brand = `#${icon.hex}`;
  return { id: icon.slug, color: contrast(brand, SURFACE) >= 3 ? brand : NEUTRAL };
}

/**
 * One SVG sprite with a <symbol> per logo. Served as a static, cacheable file and referenced with
 * <use>, so the path data is downloaded once instead of being inlined twice in the page (HTML +
 * React payload): about 60 KB less HTML on the home page.
 */
export function buildSkillSprite(): string {
  const symbols = Object.values(logos)
    .map(
      (icon) => `<symbol id="${icon.slug}" viewBox="0 0 24 24"><path d="${icon.path}"/></symbol>`,
    )
    .join("");
  return `<svg xmlns="http://www.w3.org/2000/svg">${symbols}</svg>`;
}
