/**
 * Content model. Every record traces back to docs/CONTENT.md via `sources`.
 * `status: "todo"` marks facts awaiting Kartik's confirmation: they are kept in the data
 * for completeness but filtered out of the rendered site by the selectors in src/content/index.ts.
 */

import type { ProjectImageId } from "@/content/projectImages.generated";

/** Verification state of a fact. Only "confirmed" content is rendered. */
export type ContentStatus = "confirmed" | "todo";

/** Citation keys as used in docs/CONTENT.md, e.g. "GitHub profile", "repo: TaskPilot-AI". */
export type Source = string;

interface Traceable {
  status: ContentStatus;
  sources: readonly Source[];
}

export type SocialPlatform = "github" | "linkedin" | "instagram" | "email";

export interface SocialLink extends Traceable {
  platform: SocialPlatform;
  label: string;
  href: string;
  /** Short handle shown next to the icon, e.g. "Kartikpatel1202". */
  handle: string;
}

export interface Profile extends Traceable {
  name: string;
  /** IANA time zone for the contact section's local-time display. */
  timeZone: string;
  /** Short role line shown as the hero eyebrow. */
  role: string;
  headline: string;
  positioning: string;
  location: string;
  /** Compact location for tight UI (hero eyebrow). */
  locationShort: string;
  /** Public phone number: `display` as shown, `href` as a tel: link. */
  phone?: { display: string; href: string };
  institution: string;
  bio: string;
  about: readonly string[];
  interests: readonly string[];
  focus: readonly string[];
  avatarUrl: string;
  /** Path to a self-hosted résumé PDF in /public. Absent until Kartik supplies one. */
  resumeUrl?: string;
}

/** A role phrase for the hero's cycling role line. */
export interface Role extends Traceable {
  label: string;
}

/** A build principle shown in About, each proven by a project. */
export interface Principle extends Traceable {
  title: string;
  detail: string;
  /** Slug of the project that demonstrates it. */
  proofSlug: string;
}

/** Kartik's public GitHub repositories (exact repo names). */
export type RepoId =
  | "AgenticAiSafety"
  | "Airtel-Sync"
  | "BECO_DATA_ANALYST_ASSIGNMENT"
  | "Customer-Churn-Predictor"
  | "ExpenseTracker"
  | "RazorShield-AI-Autonomous-Payment-Risk-Fraud-Intelligence-Platform"
  | "TaskPilot-AI"
  | "Weather-Data-Analysis-and-Prediction"
  | "Zero-Trust-Application-Security-System"
  | "ai-healthcare-decision-support-system"
  | "duolingo-web-app"
  | "kartik-portfolio"
  | "nutrition-tracker"
  | "space-shooter"
  | "trademarkia-semantic-search";

export interface Repo {
  id: RepoId;
  /** Display name used across the site. */
  name: string;
  url: string;
  /** Stargazer count at the last GitHub API snapshot. */
  stars: number;
}

export interface Skill extends Traceable {
  name: string;
  /** Repositories where the skill is evidenced (manifests, source or README). */
  repos: readonly RepoId[];
}

/** Depth tier derived only from how many repositories evidence a skill. */
export type SkillTier = "daily" | "comfortable" | "exploring";

export type SkillGroupId = "languages" | "frontend" | "backend" | "databases" | "ai-ml" | "devops";

export interface SkillGroup {
  id: SkillGroupId;
  label: string;
  skills: readonly Skill[];
}

export interface Experience extends Traceable {
  id: string;
  role: string;
  organisation: string;
  /** Display period, e.g. "June 2026 – Present". */
  period: string;
  /** ISO start date (YYYY-MM) for the machine-readable <time>. */
  startDate: string;
  location: string;
  description: string;
  tags: readonly string[];
  /** Optional related link (opens in a new tab). */
  link?: { href: string; label: string };
  /** Card icon: a job, or academic research (used when there is no logo). */
  kind: "work" | "research";
  /** Organisation mark (square, background baked in) from scripts/project-images.mjs. */
  logo?: ProjectImageId;
}

export interface ProjectMetric {
  value: string;
  label: string;
}

/** Role of a component in an architecture diagram; drives its colour and legend entry. */
export type ArchitectureKind = "client" | "api" | "service" | "ai" | "data" | "external";

export interface ArchitectureNode {
  id: string;
  /** Short label drawn inside the diagram box (keep it under ~22 characters). */
  label: string;
  detail: string;
  kind: ArchitectureKind;
  /** Column in the left-to-right flow, starting at 0. */
  tier: number;
}

export interface ArchitectureEdge {
  from: string;
  to: string;
}

export interface Architecture {
  /** One-sentence summary of the request flow, used as the diagram's accessible description. */
  summary: string;
  nodes: readonly ArchitectureNode[];
  edges: readonly ArchitectureEdge[];
}

/** A screenshot from the project's own repository. */
export interface ProjectShot {
  image: ProjectImageId;
  alt: string;
  caption: string;
}

/** A short, verbatim excerpt of the project's source code, pinned to a commit. */
export interface CodeExcerpt {
  /** Path inside the repository. */
  file: string;
  startLine: number;
  code: string;
  /** GitHub permalink to the exact lines. */
  href: string;
  caption: string;
}

/** The visual shown beside a featured project on the homepage. */
export type ProjectVisual =
  | { kind: "image"; shot: ProjectShot; inset?: ProjectShot }
  | { kind: "code"; excerpt: CodeExcerpt };

export type EngineeringArea =
  | "Security"
  | "Testing"
  | "Data integrity"
  | "Correctness"
  | "Evaluation"
  | "Privacy"
  | "Trade-off";

export interface EngineeringNote {
  area: EngineeringArea;
  text: string;
}

export type ProjectTag =
  "Team project" | "Fixture-verified" | "Mock-provider results" | "Hackathon";

interface ProjectBase extends Traceable {
  slug: string;
  title: string;
  /** Short name for cards and navigation. */
  shortTitle: string;
  oneLiner: string;
  year: number;
  repo: RepoId;
  /** Short domain label shown on project cards, e.g. "Fintech & risk". */
  category: string;
  /** Live demo URL; only set once it has been verified to load. */
  live?: string;
  stack: readonly string[];
  tags: readonly ProjectTag[];
}

/** A project with a full case study at /projects/[slug]. */
export interface FeaturedProject extends ProjectBase {
  featured: true;
  /** Evidence-backed role, e.g. from commit authorship. Omitted when unconfirmed. */
  role?: string;
  /** Period of work, from the repository's commit history. */
  timeline: string;
  context?: string;
  /** Problem → solution, one sentence each, for the homepage. */
  teaser: { problem: string; solution: string };
  overview: readonly string[];
  problem: string;
  solution: string;
  architecture: Architecture;
  features: readonly string[];
  shots: readonly ProjectShot[];
  highlights: readonly EngineeringNote[];
  excerpts: readonly CodeExcerpt[];
  /** Exactly three headline numbers, shown as key highlights. */
  metrics: readonly [ProjectMetric, ProjectMetric, ProjectMetric];
  /** Honest limitations / caveats that must stay attached to the project. */
  limitations: readonly string[];
  /** Next steps, taken from the repository's own roadmap or limitations. */
  improvements: readonly string[];
  visual: ProjectVisual;
}

/** A smaller project shown in the "More projects" grid, linking straight to GitHub. */
export interface OtherProject extends ProjectBase {
  featured: false;
}

export type Project = FeaturedProject | OtherProject;

export interface Certification extends Traceable {
  id: string;
  title: string;
  issuer: string;
  /** Display date, e.g. "April 2026". */
  issued: string;
  /** ISO date (YYYY-MM) for the machine-readable <time>. */
  issuedDate: string;
  /** Link to the credential document (opens in a new tab). */
  verifyUrl: string;
  /** Issuer logo (square, white background) from scripts/project-images.mjs. */
  logo: ProjectImageId;
}

export interface Education extends Traceable {
  id: string;
  degree: string;
  institution: string;
  start?: string;
  end?: string;
  score?: string;
  /** Highlights the degree card (university) over school results. */
  primary?: boolean;
  /** Institution crest (square, background baked in) from scripts/project-images.mjs. */
  logo?: ProjectImageId;
}

export interface NavItem {
  /** Id of the home-page section this item scrolls to. */
  id: string;
  label: string;
}
