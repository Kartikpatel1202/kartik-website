/**
 * Public content API. Components import from here, never from the raw data files, so that
 * anything still marked `status: "todo"` is filtered out of the rendered site.
 */
import { certifications } from "./certifications";
import { education } from "./education";
import { experience } from "./experience";
import { contactSectionId, navCopy, navItems } from "./navigation";
import { principles, profile, roles, socialLinks } from "./profile";
import { projects } from "./projects";
import { homeCopy } from "./home";
import { githubProfileUrl, repos } from "./repos";
import { skillGroups } from "./skills";
import type {
  ContentStatus,
  FeaturedProject,
  RepoId,
  SkillGroup,
  SkillGroupId,
  SkillTier,
} from "@/types/content";

const isConfirmed = <T extends { status: ContentStatus }>(item: T): boolean =>
  item.status === "confirmed";

export { sectionCopy } from "./sections";
export { homeCopy } from "./home";

export { profile, navItems, navCopy, contactSectionId, githubProfileUrl };

export const getRoles = () => roles.filter(isConfirmed);

export const getPrinciples = () => principles.filter(isConfirmed);

export const getSocialLinks = () => socialLinks.filter(isConfirmed);

export const getSkillGroups = (): SkillGroup[] =>
  skillGroups
    .map((group) => ({ ...group, skills: group.skills.filter(isConfirmed) }))
    .filter((group) => group.skills.length > 0);

/** Tier thresholds, by number of public repositories that evidence a skill. */
export const skillTiers: readonly { id: SkillTier; label: string; rule: string; min: number }[] = [
  { id: "daily", label: "Daily drivers", rule: "5+ repositories", min: 5 },
  { id: "comfortable", label: "Comfortable", rule: "2–4 repositories", min: 2 },
  { id: "exploring", label: "Exploring", rule: "1 repository", min: 1 },
];

export interface SkillView {
  name: string;
  group: SkillGroupId;
  tier: SkillTier;
  repoCount: number;
  repoNames: string[];
}

/** Flattened, confirmed skills with their evidence-derived tier, sorted by evidence. */
export const getSkillViews = (): SkillView[] =>
  getSkillGroups()
    .flatMap((group) =>
      group.skills.map((skill) => {
        const repoCount = skill.repos.length;
        const tier = skillTiers.find((t) => repoCount >= t.min)?.id ?? "exploring";
        return {
          name: skill.name,
          group: group.id,
          tier,
          repoCount,
          repoNames: skill.repos.map((id) => repos[id].name),
        };
      }),
    )
    .sort((a, b) => b.repoCount - a.repoCount || a.name.localeCompare(b.name));

/** Roadmap tracks with their evidence: the distinct public repositories behind their skills. */
export const getRoadmapTracks = () => {
  const byName = new Map(
    getSkillGroups().flatMap((g) => g.skills.map((s) => [s.name, s] as const)),
  );
  return homeCopy.roadmap.tracks.map((track) => {
    const evidence = new Set(track.skills.flatMap((name) => byName.get(name)?.repos ?? []));
    return { ...track, repoCount: evidence.size };
  });
};

export const getExperience = () => experience.filter(isConfirmed);

export const getProjects = () => projects.filter(isConfirmed);

export const getFeaturedProjects = (): FeaturedProject[] =>
  getProjects().filter((p): p is FeaturedProject => p.featured);

export const getFeaturedProjectBySlug = (slug: string): FeaturedProject | undefined =>
  getFeaturedProjects().find((p) => p.slug === slug);

export const getRepo = (id: RepoId) => repos[id];

export const getCertifications = () => certifications.filter(isConfirmed);

export const getEducation = () => education.filter(isConfirmed);
