import Image from "next/image";
import Link from "next/link";
import { ParticlePortrait } from "@/components/about/ParticlePortrait";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import { TiltFrame } from "@/components/projects/TiltFrame";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { getFeaturedProjectBySlug, getPrinciples, homeCopy, profile, sectionCopy } from "@/content";
import { projectImages } from "@/content/projectImages.generated";
import { imageProps } from "@/lib/images";

const copy = homeCopy.about;
/** Largest pre-generated portrait width: enough detail to sample one particle per 4px cell. */
const portraitSample = projectImages["portrait/card"].sources.at(-1)?.src ?? "";
const [firstName, ...restName] = profile.name.split(" ");

/**
 * "System profile" (Phase 10): a tilting portrait card with an "Open to opportunities" pill beside the
 * introduction and three headline stats, then the three working principles, each linked to the
 * case study that proves it.
 */
export function About() {
  const principles = getPrinciples();

  return (
    <section id="about" aria-labelledby="about-title" className="overflow-x-clip section-y">
      <Container size="wide" className="flex flex-col gap-20">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal distance="lg" className="mx-auto w-full max-w-sm lg:col-span-5 lg:max-w-none">
            <TiltFrame className="rounded-[2rem]">
              {/* Soft glow behind the card. */}
              <div
                aria-hidden
                className="absolute -inset-6 -z-10 rounded-[3rem] bg-[radial-gradient(closest-side,rgb(243_242_245/0.14),transparent)] blur-2xl"
              />
              {/* A glowing slab turning in 3D behind the card; its corners swing out past the
                  edges as it rotates. */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10 grid place-items-center [perspective:900px]"
              >
                <span className="block aspect-square w-[114%] portrait-orbit rounded-[4rem] bg-[linear-gradient(140deg,rgb(243_242_245/0.62),rgb(243_242_245/0.34))] blur-[14px]" />
              </div>
              <div
                data-spotlight=""
                className="relative overflow-hidden rounded-[2rem] border border-border-strong bg-bg-1 p-2.5 shadow-2"
              >
                <div className="relative overflow-hidden rounded-[1.5rem]">
                  <ParticlePortrait src={portraitSample}>
                    <Image
                      {...imageProps("portrait/card")}
                      alt={copy.portraitAlt}
                      sizes="(min-width: 64rem) 420px, 90vw"
                      placeholder="blur"
                      className="aspect-[4/5] h-auto w-full object-cover"
                    />
                  </ParticlePortrait>
                  {/* Availability pill over the bottom of the photo. */}
                  <p className="absolute inset-x-3 bottom-3 flex items-center gap-2.5 rounded-full border border-text-primary/10 bg-bg-0/75 px-4 py-2.5 font-mono text-[0.6875rem] tracking-[0.14em] text-text-primary uppercase shadow-2 backdrop-blur-md">
                    <span aria-hidden className="relative flex size-2 shrink-0">
                      <span className="absolute inset-0 animate-ping rounded-full bg-success/60" />
                      <span className="relative size-2 rounded-full bg-success" />
                    </span>
                    {copy.availability}
                    <span className="ml-auto text-text-muted">{copy.availabilityYear}</span>
                  </p>
                </div>
              </div>
            </TiltFrame>
          </Reveal>

          <div className="flex flex-col gap-8 lg:col-span-7">
            <Reveal className="flex flex-col items-start gap-5">
              <p className="inline-flex items-center gap-2 rounded-full border border-border bg-bg-1/70 px-3.5 py-1.5 font-mono text-[0.6875rem] tracking-[0.14em] text-text-secondary uppercase">
                <span aria-hidden className="size-1.5 rounded-full bg-text-secondary" />
                {copy.eyebrow}
              </p>
              <h2
                id="about-title"
                className="font-display text-h1 font-extrabold tracking-[-0.04em]"
              >
                <span className="text-chrome">{copy.greeting}</span>
                <br />
                <span className="text-chrome">{firstName}</span>{" "}
                <span className="text-text-muted">{restName.join(" ")}</span>
              </h2>
            </Reveal>

            <Stagger className="flex max-w-prose flex-col gap-4">
              {profile.about.slice(0, 2).map((paragraph, i) => (
                <p
                  key={paragraph.slice(0, 32)}
                  className={i === 0 ? "text-body-lg text-text-primary" : "text-text-secondary"}
                >
                  {paragraph}
                </p>
              ))}
            </Stagger>

            <dl className="grid gap-3 sm:grid-cols-3">
              {copy.stats.map((stat, i) => (
                <Reveal
                  key={stat.title}
                  delay={i * 60}
                  className="flex h-full flex-col gap-1 rounded-2xl border border-border bg-bg-1/70 px-5 py-4"
                >
                  <dt className="font-display text-h5 font-extrabold tracking-[-0.02em]">
                    {stat.title}
                  </dt>
                  <dd className="font-mono text-[0.6875rem] tracking-[0.12em] text-text-muted uppercase">
                    {stat.detail}
                  </dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>

        {principles.length > 0 && (
          <div className="flex flex-col gap-6">
            <Reveal>
              <h3 className="font-mono text-eyebrow text-text-muted uppercase">
                {sectionCopy.about.principlesHeading}
              </h3>
            </Reveal>
            <Stagger as="ol" itemAs="li" className="grid gap-4 md:grid-cols-3">
              {principles.map((principle, i) => {
                const proof = getFeaturedProjectBySlug(principle.proofSlug);
                return (
                  <article
                    key={principle.title}
                    data-spotlight=""
                    className="flex h-full flex-col gap-3 rounded-2xl border border-border bg-bg-1/60 p-6"
                  >
                    <span className="font-mono text-eyebrow text-text-muted">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h4 className="font-display text-h5 font-extrabold tracking-[-0.02em]">
                      {principle.title}
                    </h4>
                    <p className="text-small text-text-secondary">{principle.detail}</p>
                    {proof && (
                      <Link
                        href={`/projects/${proof.slug}/`}
                        className="mt-auto inline-flex min-h-11 items-center gap-2 self-start text-small text-accent-2"
                      >
                        <span className="link-draw">
                          {sectionCopy.about.proofPrefix} {proof.shortTitle}
                        </span>
                        <Icon name="arrow-right" size={16} />
                      </Link>
                    )}
                  </article>
                );
              })}
            </Stagger>
          </div>
        )}
      </Container>
    </section>
  );
}
