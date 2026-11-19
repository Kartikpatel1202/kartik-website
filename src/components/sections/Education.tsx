import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getEducation, sectionCopy } from "@/content";
import { imageProps } from "@/lib/images";
import { cn } from "@/lib/utils";

const copy = sectionCopy.education;

/**
 * Education: a sticky header on the left and the degree plus school results as stacked cards on
 * the right (university first, highlighted). Each card shows the institution's crest, years and a
 * score badge.
 */
export function Education() {
  const education = getEducation();
  if (education.length === 0) return null;

  return (
    <section id="education" aria-labelledby="education-title" className="section-y">
      <Container className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-4">
          <SectionHeader
            eyebrow={copy.eyebrow}
            id="education-title"
            title={copy.title}
            align="left"
            className="lg:sticky lg:top-28"
          />
        </Reveal>

        <ol className="flex flex-col gap-4 lg:col-span-8">
          {education.map((item, i) => (
            <Reveal as="li" key={item.id} delay={i * 60}>
              <article
                data-spotlight=""
                className="flex items-start gap-4 rounded-3xl border border-border bg-bg-1/80 p-5 transition-colors duration-300 hover:border-border-strong hover:bg-bg-1 sm:items-center sm:p-6"
              >
                {item.logo ? (
                  // Decorative: the institution is named right beside it.
                  <span
                    className={cn(
                      "size-14 shrink-0 overflow-hidden rounded-2xl border shadow-1",
                      item.primary ? "border-accent-2/40" : "border-border-strong",
                    )}
                  >
                    <Image
                      {...imageProps(item.logo)}
                      alt=""
                      sizes="56px"
                      className="size-full object-cover"
                    />
                  </span>
                ) : (
                  <span
                    aria-hidden
                    className={cn(
                      "grid size-14 shrink-0 place-items-center rounded-2xl border",
                      item.primary
                        ? "border-accent-2/40 bg-accent-2/10 text-accent-2"
                        : "border-border-strong bg-bg-2 text-text-secondary",
                    )}
                  >
                    <Icon name="graduation" size={22} />
                  </span>
                )}
                <div className="flex min-w-0 flex-1 flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                  <div className="flex min-w-0 flex-col gap-1">
                    <h3 className="font-display text-h5 font-extrabold tracking-[-0.02em] text-text-primary">
                      {item.degree}
                    </h3>
                    <p className="font-medium text-accent-2">{item.institution}</p>
                    {item.start && (
                      <p className="font-mono text-[0.75rem] text-text-muted">
                        <span className="sr-only">{copy.yearsLabel}: </span>
                        {item.start} – {item.end}
                      </p>
                    )}
                  </div>
                  {item.score && (
                    <p className="mt-2 self-start rounded-full border border-accent-2/35 bg-accent-2/10 px-3 py-1 font-mono text-[0.8125rem] font-semibold whitespace-nowrap text-accent-2 sm:mt-0 sm:self-center">
                      <span className="sr-only">{copy.scoreLabel}: </span>
                      {item.score}
                    </p>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
