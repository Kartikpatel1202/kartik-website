import Image from "next/image";
import type { CSSProperties } from "react";
import { TimelineTrack } from "@/components/experience/TimelineTrack";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { VisuallyHidden } from "@/components/ui/VisuallyHidden";
import { getExperience, sectionCopy } from "@/content";
import { imageProps } from "@/lib/images";

const copy = sectionCopy.experience;

/**
 * Work history (replaces the "Building in public" log, 2026-11-16): three roles, each with its
 * organisation's logo, in reverse-chronological order on a scroll-drawn timeline with a glowing
 * head. Nodes ring as the line reaches them, cards slide in from the right and their tags follow in
 * sequence, and a light runs around a card's border on hover. Each card shows the role,
 * organisation, period and location, the description and technology tags; an optional external
 * link sits in the top-right corner and opens in a new tab.
 */
export function Experience() {
  const roles = getExperience();
  if (roles.length === 0) return null;

  return (
    <section id="experience" aria-labelledby="experience-title" className="section-y">
      <Container className="flex flex-col gap-14">
        <Reveal>
          <SectionHeader
            eyebrow={copy.eyebrow}
            id="experience-title"
            title={copy.title}
            lead={copy.lead}
          />
        </Reveal>

        <TimelineTrack>
          <ol className="flex flex-col gap-6">
            {roles.map((role, index) => (
              <li key={role.id} className="relative pl-9 sm:pl-12">
                {/* Node on the rail: lit by default; TimelineTrack dims it until the line arrives. */}
                <span
                  aria-hidden
                  data-timeline-node
                  className="group/node absolute top-8 left-0 grid size-[15px] place-items-center rounded-full border-2 border-accent bg-bg-0 transition-colors duration-300 data-[state=pending]:border-border-strong"
                >
                  <span className="size-1.5 rounded-full bg-accent transition-opacity duration-300 group-data-[state=pending]/node:opacity-0" />
                </span>

                <Reveal distance="x" delay={index * 80}>
                  <article
                    data-spotlight=""
                    className="glow-border group/card relative flex flex-col gap-5 rounded-3xl border border-border bg-bg-1/80 p-5 transition-[translate,background-color,border-color,box-shadow] duration-500 ease-out-expo hover:-translate-y-1 hover:border-border-strong hover:bg-bg-1 hover:shadow-2 sm:p-7"
                  >
                    <header className="flex items-start gap-4">
                      {role.logo ? (
                        // Decorative: the organisation is named right beside it.
                        <span className="size-14 shrink-0 overflow-hidden rounded-2xl border border-border-strong shadow-1 transition-[rotate,scale,border-color,box-shadow] duration-500 ease-out-expo group-hover/card:scale-110 group-hover/card:-rotate-6 group-hover/card:border-accent-2/50 group-hover/card:shadow-glow-accent">
                          <Image
                            {...imageProps(role.logo)}
                            alt=""
                            sizes="56px"
                            className="size-full object-cover"
                          />
                        </span>
                      ) : (
                        <span
                          aria-hidden
                          className="grid size-14 shrink-0 place-items-center rounded-2xl border border-border-strong bg-bg-2 text-accent-2 transition-[rotate,scale,border-color,box-shadow] duration-500 ease-out-expo group-hover/card:scale-110 group-hover/card:-rotate-6 group-hover/card:border-accent-2/50 group-hover/card:shadow-glow-accent"
                        >
                          <Icon
                            name={role.kind === "research" ? "graduation" : "briefcase"}
                            size={22}
                          />
                        </span>
                      )}
                      <div className="flex min-w-0 flex-1 flex-col gap-1">
                        <h3 className="font-display text-h5 font-extrabold tracking-[-0.02em] text-text-primary">
                          {role.role}
                        </h3>
                        <p className="font-medium text-accent-2">{role.organisation}</p>
                        <p className="font-mono text-[0.75rem] text-text-muted">
                          <time dateTime={role.startDate}>{role.period}</time>
                          <span aria-hidden> · </span>
                          <VisuallyHidden>, </VisuallyHidden>
                          {role.location}
                        </p>
                      </div>
                      {role.link && (
                        <a
                          href={role.link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="-mt-1 -mr-1 grid size-11 shrink-0 place-items-center rounded-full border border-transparent text-text-muted transition-colors duration-200 hover:border-border-strong hover:text-text-primary"
                        >
                          <Icon name="arrow-up-right" size={18} />
                          <VisuallyHidden>
                            {copy.linkSr(role.link.label)}
                            {sectionCopy.common.newTab}
                          </VisuallyHidden>
                        </a>
                      )}
                    </header>

                    <p className="max-w-prose text-small leading-relaxed text-text-secondary sm:text-body">
                      {role.description}
                    </p>

                    <ul aria-label={copy.tagsLabel} className="flex flex-wrap gap-2">
                      {role.tags.map((tag, i) => (
                        <li
                          key={tag}
                          style={{ "--i": i } as CSSProperties}
                          className="reveal-item rounded-lg border border-border bg-bg-2 px-2.5 py-1 font-mono text-[0.75rem] text-text-secondary transition-colors duration-200 hover:border-border-strong hover:text-text-primary"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              </li>
            ))}
          </ol>
        </TimelineTrack>
      </Container>
    </section>
  );
}
