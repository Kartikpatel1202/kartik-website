import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { ArchitectureDiagram } from "@/components/projects/ArchitectureDiagram";
import { CodeWindow } from "@/components/projects/CodeWindow";
import { ProjectImage } from "@/components/projects/ProjectImage";
import { ProjectLinks } from "@/components/projects/ProjectLinks";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Tag } from "@/components/ui/Tag";
import {
  getFeaturedProjectBySlug,
  getFeaturedProjects,
  getRepo,
  getSkillGroups,
  profile,
  sectionCopy,
} from "@/content";
import { projectImages } from "@/content/projectImages.generated";
import { absoluteUrl } from "@/lib/site";
import { cn } from "@/lib/utils";
import type { FeaturedProject, ProjectShot } from "@/types/content";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getFeaturedProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const project = getFeaturedProjectBySlug((await params).slug);
  if (!project) return {};
  const path = `/projects/${project.slug}/`;
  return {
    title: project.shortTitle,
    description: project.oneLiner,
    alternates: { canonical: path },
    openGraph: { title: project.title, description: project.oneLiner, type: "article", url: path },
    twitter: { card: "summary_large_image", title: project.title, description: project.oneLiner },
  };
}

const copy = sectionCopy.caseStudy;

/** Case study: hero, then Overview → Problem → Approach → Features → Highlights → Next → Links. */
export default async function ProjectPage({ params }: PageProps) {
  const project = getFeaturedProjectBySlug((await params).slug);
  if (!project) notFound();

  const all = getFeaturedProjects();
  const position = all.findIndex((p) => p.slug === project.slug);
  const previous = all[(position - 1 + all.length) % all.length];
  const next = all[(position + 1) % all.length];

  // SoftwareSourceCode (a CreativeWork subtype): the case study describes a public repository.
  const languages = new Set(
    getSkillGroups()
      .find((group) => group.id === "languages")
      ?.skills.map((skill) => skill.name),
  );
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: project.title,
    description: project.oneLiner,
    url: absoluteUrl(`/projects/${project.slug}/`),
    dateCreated: String(project.year),
    author: { "@type": "Person", name: profile.name, url: absoluteUrl("/") },
    codeRepository: getRepo(project.repo).url,
    programmingLanguage: project.stack.filter((tech) => languages.has(tech)),
    keywords: project.stack.join(", "),
  };

  return (
    <main id="main">
      <JsonLd data={jsonLd} />
      <article aria-labelledby="case-title">
        <CaseHero project={project} />

        <Container className="flex flex-col gap-20 pb-24 lg:gap-28">
          <CaseSection id="overview" title={copy.headings.overview}>
            <div className="flex flex-col gap-4 text-body-lg text-text-secondary">
              {project.overview.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <dl className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {project.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="flex flex-col-reverse gap-1 rounded-lg border border-border bg-bg-1/60 p-5"
                >
                  <dt className="text-small text-text-muted">{metric.label}</dt>
                  <dd className="font-mono text-h3 text-text-primary">{metric.value}</dd>
                </div>
              ))}
            </dl>
          </CaseSection>

          <CaseSection id="problem" title={copy.headings.problem}>
            <p className="max-w-prose font-display text-h4 leading-snug font-semibold tracking-[-0.02em] text-text-primary">
              {project.problem}
            </p>
          </CaseSection>

          <CaseSection id="approach" title={copy.headings.approach} wide>
            <p className="mb-10 max-w-prose text-body-lg text-text-secondary">{project.solution}</p>
            <ArchitectureDiagram
              architecture={project.architecture}
              projectName={project.shortTitle}
            />
          </CaseSection>

          <CaseSection id="features" title={copy.headings.features}>
            <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {project.features.map((feature) => (
                <li key={feature} className="flex gap-3 text-text-secondary">
                  <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" />
                  {feature}
                </li>
              ))}
            </ul>
            {project.shots.length > 0 && <ShotGallery shots={project.shots} />}
          </CaseSection>

          <CaseSection id="highlights" title={copy.headings.highlights}>
            <ul className="flex flex-col divide-y divide-border border-y border-border">
              {project.highlights.map((note) => (
                <li key={note.text} className="grid gap-2 py-5 sm:grid-cols-[10rem_1fr] sm:gap-6">
                  <span className="font-mono text-eyebrow text-accent-2 uppercase sm:pt-1">
                    {note.area}
                  </span>
                  <span className="text-text-primary">{note.text}</span>
                </li>
              ))}
            </ul>
            {project.excerpts.length > 0 && (
              <div className="mt-12 flex flex-col gap-5">
                <h3 className="text-h5">{copy.headings.source}</h3>
                {project.excerpts.map((excerpt) => (
                  <CodeWindow key={excerpt.href} excerpt={excerpt} />
                ))}
              </div>
            )}
          </CaseSection>

          <CaseSection id="next" title={copy.headings.next}>
            <div className="grid gap-6 md:grid-cols-2">
              <ul className="flex flex-col gap-3">
                {project.improvements.map((item) => (
                  <li key={item} className="flex gap-3 text-text-secondary">
                    <Icon name="arrow-right" size={18} className="mt-1 shrink-0 text-accent" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="rounded-lg border border-warn/30 bg-warn/5 p-6">
                <h3 className="mb-3 text-h6 text-warn">{copy.headings.limits}</h3>
                <ul className="flex list-disc flex-col gap-2 pl-5 text-small text-text-secondary marker:text-warn">
                  {project.limitations.map((limit) => (
                    <li key={limit}>{limit}</li>
                  ))}
                </ul>
              </div>
            </div>
          </CaseSection>

          <CaseSection id="links" title={copy.headings.links}>
            <ProjectLinks project={project} showCaseStudy={false} size="lg" />
          </CaseSection>

          <nav
            aria-label={copy.pagerLabel}
            className="flex flex-col gap-6 border-t border-border pt-10"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              {previous && (
                <PagerLink project={previous} label={copy.previous} direction="previous" />
              )}
              {next && <PagerLink project={next} label={copy.next} direction="next" />}
            </div>
            <Link
              href="/#projects"
              className="inline-flex min-h-11 items-center gap-2 self-start rounded-sm text-text-secondary hover:text-text-primary"
            >
              <Icon name="arrow-right" size={18} className="rotate-180" />
              {copy.back}
            </Link>
          </nav>
        </Container>
      </article>
    </main>
  );
}

function CaseHero({ project }: { project: FeaturedProject }) {
  const visual = project.visual.kind === "image" ? project.visual.shot : undefined;

  return (
    <header className="pt-32 pb-16 sm:pt-40 lg:pb-24">
      <Container className="flex flex-col gap-10">
        <Link
          href="/#projects"
          className="inline-flex min-h-11 items-center gap-2 self-start rounded-sm font-mono text-eyebrow text-text-muted uppercase hover:text-text-primary"
        >
          <Icon name="arrow-right" size={16} className="rotate-180" />
          {copy.back}
        </Link>

        <div className="flex max-w-4xl flex-col gap-5">
          <p className="flex flex-wrap items-center gap-3 font-mono text-eyebrow text-text-muted uppercase">
            <span className="text-accent">{copy.eyebrow}</span>
            <span aria-hidden className="h-px w-8 bg-border-strong" />
            {project.year}
            {project.tags.map((tag) => (
              <Tag key={tag} variant="accent" size="sm" className="normal-case">
                {tag}
              </Tag>
            ))}
          </p>
          <h1
            id="case-title"
            className="text-chrome font-display text-h1 font-extrabold tracking-[-0.04em] text-balance"
          >
            {project.title}
          </h1>
          <p className="max-w-prose text-body-lg text-text-secondary">{project.oneLiner}</p>
          {project.context && (
            <p className="max-w-prose text-small text-text-muted">{project.context}</p>
          )}
        </div>

        <dl className="grid gap-6 border-y border-border py-6 sm:grid-cols-[auto_auto_1fr] sm:gap-10">
          {project.role && (
            <div className="flex flex-col gap-1">
              <dt className="font-mono text-eyebrow text-text-muted uppercase">{copy.roleLabel}</dt>
              <dd className="text-text-primary">{project.role}</dd>
            </div>
          )}
          <div className="flex flex-col gap-1">
            <dt className="font-mono text-eyebrow text-text-muted uppercase">
              {copy.timelineLabel}
            </dt>
            <dd className="text-text-primary">{project.timeline}</dd>
          </div>
          <div className={cn("flex flex-col gap-2", !project.role && "sm:col-span-2")}>
            <dt className="font-mono text-eyebrow text-text-muted uppercase">{copy.stackLabel}</dt>
            <dd>
              <ul className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <li key={tech}>
                    <Tag size="sm">{tech}</Tag>
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>

        <ProjectLinks project={project} showCaseStudy={false} />

        {visual && (
          <Reveal distance="lg">
            <figure className="flex flex-col gap-3">
              <div className="overflow-hidden rounded-xl border border-border-strong shadow-2">
                <ProjectImage
                  id={visual.image}
                  alt={visual.alt}
                  sizes="(min-width: 75rem) 1152px, 94vw"
                  className="aspect-[16/9]"
                  preload
                />
              </div>
              <figcaption className="text-small text-text-muted">{visual.caption}</figcaption>
            </figure>
          </Reveal>
        )}
      </Container>
    </header>
  );
}

interface CaseSectionProps {
  id: string;
  title: string;
  children: ReactNode;
  /** Let the body use the full container width below the heading (for diagrams). */
  wide?: boolean;
}

function CaseSection({ id, title, children, wide = false }: CaseSectionProps) {
  const headingId = `${id}-title`;
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn("grid grid-cols-1 gap-6 [&>*]:min-w-0", !wide && "lg:grid-cols-12 lg:gap-10")}
    >
      <Reveal className={cn(!wide && "lg:col-span-3")}>
        <h2
          id={headingId}
          className="font-display text-h3 font-extrabold tracking-[-0.03em] lg:sticky lg:top-28"
        >
          {title}
        </h2>
      </Reveal>
      <Reveal className={cn(!wide && "lg:col-span-9")}>{children}</Reveal>
    </section>
  );
}

function ShotGallery({ shots }: { shots: readonly ProjectShot[] }) {
  const portrait = shots.every((s) => projectImages[s.image].height > projectImages[s.image].width);

  return (
    <ul className={cn("mt-12 grid gap-8", portrait ? "sm:grid-cols-3 sm:gap-5" : "grid-cols-1")}>
      {shots.map((shot) => (
        <li key={shot.image}>
          <figure
            className={cn("flex flex-col gap-3", portrait && "mx-auto max-w-72 sm:max-w-none")}
          >
            <ProjectImage
              id={shot.image}
              alt={shot.alt}
              sizes={portrait ? "(min-width: 40rem) 280px, 80vw" : "(min-width: 75rem) 864px, 94vw"}
              className={cn(
                "rounded-lg border border-border-strong",
                portrait ? "aspect-[9/16]" : "aspect-[16/8]",
              )}
            />
            <figcaption className="text-small text-text-muted">{shot.caption}</figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}

interface PagerLinkProps {
  project: FeaturedProject;
  label: string;
  direction: "previous" | "next";
}

function PagerLink({ project, label, direction }: PagerLinkProps) {
  return (
    <Link
      href={`/projects/${project.slug}/`}
      data-spotlight=""
      className={cn(
        "group flex flex-col gap-2 rounded-lg border border-border p-5 transition-colors duration-300 hover:border-border-strong hover:bg-surface-hover",
        direction === "next" && "sm:items-end sm:text-right",
      )}
    >
      <span className="font-mono text-eyebrow text-text-muted uppercase">{label}</span>
      <span className="flex items-center gap-2 text-h5 text-text-primary">
        {direction === "previous" && <Icon name="arrow-right" size={18} className="rotate-180" />}
        {project.shortTitle}
        {direction === "next" && <Icon name="arrow-right" size={18} />}
      </span>
    </Link>
  );
}
