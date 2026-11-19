import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getRoadmapTracks, homeCopy } from "@/content";

const copy = homeCopy.roadmap;

/**
 * "Core execution roadmap" (Phase 10, nav: Expertise): four tracks as glassy cards in a slight
 * perspective, each with a glowing slab turning in 3D behind it, lifting toward the viewer on
 * hover. Every card states its evidence: how many public repositories use the skills it names.
 */
export function Roadmap() {
  const tracks = getRoadmapTracks();

  return (
    <section id="expertise" aria-labelledby="expertise-title" className="overflow-x-clip section-y">
      <Container size="wide" className="flex flex-col gap-16">
        <Reveal>
          <SectionHeader
            eyebrow={copy.eyebrow}
            id="expertise-title"
            title={copy.title}
            lead={copy.lead}
          />
        </Reveal>

        <div className="[perspective:1600px]">
          <Stagger
            as="ol"
            itemAs="li"
            className="grid gap-5 sm:grid-cols-2 xl:[transform:rotateX(8deg)] xl:grid-cols-4 xl:[transform-style:preserve-3d]"
          >
            {tracks.map((track, i) => (
              <div key={track.title} className="relative h-full">
                {/* A glowing slab turning in 3D behind the card (same motion as the About
                    portrait); each track starts at a different point of the turn. */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 grid place-items-center [perspective:900px]"
                >
                  <span
                    className="block aspect-square w-full portrait-orbit rounded-[3rem] bg-[linear-gradient(140deg,rgb(243_242_245/0.5),rgb(243_242_245/0.24))] blur-[14px]"
                    style={{ animationDelay: `${-i * 4}s` }}
                  />
                </div>
                <article
                  data-spotlight=""
                  className="group relative flex h-full flex-col gap-5 rounded-3xl border border-border-strong bg-bg-1/85 p-6 shadow-2 backdrop-blur-md transition-[transform,border-color] duration-500 ease-out-expo hover:-translate-y-2 hover:border-text-muted"
                >
                  {/* Light pooling behind the card. */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -top-10 left-1/2 -z-10 h-40 w-4/5 -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(243_242_245/0.22),transparent)] blur-2xl transition-opacity duration-500 group-hover:opacity-100 xl:opacity-70"
                  />
                  <div className="flex items-center justify-between font-mono text-[0.6875rem] tracking-[0.16em] text-text-muted uppercase">
                    <span>{copy.trackLabel(i + 1)}</span>
                    <span aria-hidden className="size-2 rounded-full border border-text-muted" />
                  </div>
                  <h3 className="text-chrome font-display text-h4 leading-tight font-extrabold tracking-[-0.03em]">
                    {track.title}
                  </h3>
                  <p className="text-small text-text-secondary">{track.text}</p>
                  <div className="mt-auto flex flex-col gap-3 border-t border-border pt-4">
                    <p className="font-mono text-[0.75rem] text-text-primary">
                      {track.skills.slice(0, 3).join(" · ")}
                    </p>
                    <p className="font-mono text-[0.6875rem] tracking-[0.12em] text-text-muted uppercase">
                      {copy.evidenceLabel(track.repoCount)}
                    </p>
                  </div>
                </article>
              </div>
            ))}
          </Stagger>
        </div>
      </Container>
    </section>
  );
}
