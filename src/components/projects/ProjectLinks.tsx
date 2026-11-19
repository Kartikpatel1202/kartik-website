import { Button, type ButtonSize } from "@/components/ui/Button";
import { VisuallyHidden } from "@/components/ui/VisuallyHidden";
import { getRepo, sectionCopy } from "@/content";
import { cn } from "@/lib/utils";
import type { FeaturedProject } from "@/types/content";

interface ProjectLinksProps {
  project: FeaturedProject;
  /** Hide the case-study link (used on the case-study page itself). */
  showCaseStudy?: boolean;
  size?: ButtonSize;
  className?: string;
}

/**
 * Case study, GitHub and live-demo links. Each has a descriptive accessible name
 * ("View RazorShield AI source on GitHub") while keeping the short visible label in it.
 * Links that do not exist are not rendered.
 */
export function ProjectLinks({
  project,
  showCaseStudy = true,
  size = "md",
  className,
}: ProjectLinksProps) {
  const { links } = sectionCopy.projects;
  const name = project.shortTitle;

  return (
    <ul className={cn("flex flex-wrap gap-3", className)}>
      {showCaseStudy && (
        <li>
          <Button href={`/projects/${project.slug}/`} size={size} trailingIcon="arrow-right">
            <VisuallyHidden>{links.caseStudy.srPrefix(name)}</VisuallyHidden>
            {links.caseStudy.label}
          </Button>
        </li>
      )}
      <li>
        <Button href={getRepo(project.repo).url} variant="ghost" size={size} leadingIcon="github">
          <VisuallyHidden>{links.source.srPrefix(name)}</VisuallyHidden>
          {links.source.label}
        </Button>
      </li>
      {project.live && (
        <li>
          <Button href={project.live} variant="ghost" size={size}>
            <VisuallyHidden>{links.live.srPrefix(name)}</VisuallyHidden>
            {links.live.label}
          </Button>
        </li>
      )}
    </ul>
  );
}
