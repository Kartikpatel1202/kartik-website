import type { NavItem } from "@/types/content";

/**
 * Primary navigation, in page order (Phase 10 redesign). "Expertise" is the engineering roadmap,
 * "Skills" the technical stack, "Experience" the work history,
 * "Certifications" the credentials list. "Contact" also has the nav's "Hire Me" pill.
 */
export const navItems: readonly NavItem[] = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "expertise", label: "Expertise" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

/** Section id targeted by the "Hire Me" pill and the hero's secondary CTA. */
export const contactSectionId = "contact";

/** Nav labels that are not section links. */
export const navCopy = {
  hire: "Hire Me",
  resume: "Resume",
  resumeSr: " (opens in a new tab)",
  openMenu: "Open menu",
  primaryLabel: "Primary",
};
