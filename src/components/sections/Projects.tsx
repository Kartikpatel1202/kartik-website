import { ProjectCarousel, type CarouselProject } from "@/components/projects/ProjectCarousel";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getProjects, getRepo, githubProfileUrl, homeCopy, sectionCopy } from "@/content";

const copy = homeCopy.projects;

/**
 * "Featured engineering projects" (Phase 10): every confirmed project on one auto-rotating 3D ring,
 * featured systems first (each opens its case study), then the smaller builds (code only).
 */
export function Projects() {
  const projects = getProjects();
  const total = projects.length;

  const cards: CarouselProject[] = projects.map((project) => ({
    slug: project.slug,
    title: project.shortTitle,
    category: project.category,
    description: project.oneLiner,
    stack: project.stack,
    tags: project.tags,
    repoUrl: getRepo(project.repo).url,
    ...(project.featured && { caseStudy: `/projects/${project.slug}/` }),
  }));

  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="relative overflow-x-clip section-y"
    >
      <Container className="flex flex-col gap-6">
        <Reveal>
          <SectionHeader
            eyebrow={copy.eyebrow}
            id="projects-title"
            title={copy.title}
            lead={copy.lead}
          />
        </Reveal>
      </Container>

      <Reveal className="mt-12">
        <ProjectCarousel
          projects={cards}
          copy={{
            carouselLabel: copy.carouselLabel,
            previous: copy.previous,
            next: copy.next,
            pause: copy.pause,
            play: copy.play,
            goTo: cards.map((card, i) => copy.goTo(i + 1, card.title)),
            code: copy.code,
            caseStudy: copy.caseStudy,
            newTab: sectionCopy.common.newTab,
            projectLabels: cards.map((_, i) => copy.projectLabel(i + 1)),
            positionLabels: cards.map((_, i) => copy.position(i + 1, total)),
            codeSrSuffixes: cards.map((card) => copy.codeSr(card.title)),
            caseStudySrPrefixes: cards.map((card) => copy.caseStudySr(card.title)),
          }}
        />
      </Reveal>

      <Reveal className="mt-10 flex justify-center">
        <Button href={`${githubProfileUrl}?tab=repositories`} variant="ghost" leadingIcon="github">
          {copy.seeAll}
        </Button>
      </Reveal>
    </section>
  );
}
