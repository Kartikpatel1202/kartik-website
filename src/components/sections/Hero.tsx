import Image from "next/image";
import type { CSSProperties } from "react";
import { ScrubStage } from "@/components/hero/ScrubStage";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { contactSectionId, getRoles, homeCopy, navCopy, profile } from "@/content";
import { imageProps } from "@/lib/images";
import { cn } from "@/lib/utils";

const copy = homeCopy.hero;
const intro = (ms: number) => ({ "--intro-delay": `${ms}ms` }) as CSSProperties;

/**
 * Signature moment 1 (Phase 10): a pinned, scroll-scrubbed hero. The section is three viewports
 * tall; its stage stays fixed while scrolling advances a timeline through three stages. Each
 * stage swaps the headline, label and text while the cut-out portrait turns and the key light
 * moves (ScrubStage writes the variables; CSS applies them as transforms).
 *
 * Server-rendered with stage 1 active, so it reads fully without JavaScript. The visual stack is
 * hidden from assistive technology, which gets one h1 and every stage's text once, in order.
 */
export function Hero() {
  const stages = copy.stages;
  const roles = getRoles().map((role) => role.label.toLowerCase());

  return (
    <section id="hero" aria-labelledby="hero-title" data-stage="0" className="relative h-[300svh]">
      <h1 id="hero-title" className="sr-only">
        {profile.name}: {roles.slice(0, 2).join(" and ")}
      </h1>
      <ul className="sr-only">
        {stages.map((stage) => (
          <li key={stage.label}>
            {stage.headline.join(" ")}. {stage.text}
          </li>
        ))}
      </ul>

      <ScrubStage stageCount={stages.length} className="sticky top-0 isolate h-svh overflow-hidden">
        {/* Studio backdrop and a key light that the timeline moves (transform only). */}
        <div aria-hidden className="studio-light absolute inset-0 -z-20" />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 [transform:translate3d(var(--lx,0),var(--ly,0),0)]"
          style={{
            background:
              "radial-gradient(ellipse 24% 40% at 58% 30%, rgb(255 255 255 / 0.45), transparent 70%)",
          }}
        />

        {/* Portrait: cut-out, bottom-anchored, turned by the timeline. */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-16 left-1/2 aspect-[866/1100] h-[52svh] -translate-x-1/2 [perspective:1400px] sm:top-auto sm:bottom-0 sm:h-[88svh] lg:left-[58%]"
        >
          <div className="h-full origin-bottom [transform:translate3d(var(--x,0),var(--y,0),0)_rotateY(var(--rot,0deg))_scale(var(--scale,1))] [transform-style:preserve-3d]">
            <Image
              {...imageProps("portrait/hero")}
              alt=""
              data-hero-portrait=""
              preload
              fetchPriority="high"
              // The portrait's width follows the viewport height (aspect 866:1100).
              sizes="(min-width: 40rem) 70vh, 58vh"
              placeholder="empty"
              className="h-full w-full object-contain object-bottom drop-shadow-[0_30px_60px_rgb(0_0_0/0.45)]"
            />
          </div>
        </div>

        {/* Floor shadow and fades that keep text readable over the light. */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-[72%] bg-linear-to-t from-bg-0 via-bg-0/85 to-transparent sm:h-[38%] sm:via-bg-0/70"
        />
        <div
          aria-hidden
          className="absolute inset-y-0 left-0 w-[46%] bg-linear-to-r from-bg-0/70 via-bg-0/25 to-transparent max-lg:hidden"
        />

        <div className="relative mx-auto flex h-full w-full max-w-wide flex-col justify-end gap-7 gutter-x pt-24 pb-8 lg:justify-center lg:pb-0">
          {/* Left: greeting and the stage headline (visual; the h1 above carries the text). */}
          <div aria-hidden className="flex max-w-[44rem] flex-col gap-5">
            <p
              className="intro font-mono text-[0.75rem] tracking-[0.2em] text-text-primary uppercase"
              style={intro(0)}
            >
              {copy.greeting}{" "}
              <span className="underline decoration-text-primary/60 decoration-2 underline-offset-[6px]">
                {profile.name}
              </span>
            </p>
            <div className="intro-lcp grid" style={intro(120)}>
              {stages.map((stage, i) => (
                <p
                  key={stage.label}
                  data-stage-index={i}
                  data-active={i === 0 ? "" : undefined}
                  className="scrub-stage text-chrome font-display text-[clamp(2.75rem,1.4rem+5.6vw,6.5rem)] leading-[0.88] font-extrabold tracking-[-0.045em] uppercase [grid-area:1/1]"
                >
                  {stage.headline[0]}
                  <br />
                  {stage.headline[1]}
                </p>
              ))}
            </div>
          </div>

          {/* Right on desktop, under the headline on mobile: stage label and text. */}
          <div
            aria-hidden
            className="intro grid max-w-sm before:pointer-events-none before:absolute before:-inset-10 before:-z-10 before:rounded-full before:bg-bg-0/70 before:blur-2xl lg:absolute lg:top-1/2 lg:right-[var(--gutter)] lg:max-w-[24rem] lg:-translate-y-1/2"
            style={intro(300)}
          >
            {stages.map((stage, i) => (
              <div
                key={stage.label}
                data-stage-index={i}
                data-active={i === 0 ? "" : undefined}
                className="scrub-stage flex flex-col gap-3 [grid-area:1/1]"
              >
                <p className="flex items-center gap-3 font-mono text-[0.6875rem] tracking-[0.18em] text-text-primary uppercase">
                  <span aria-hidden className="h-px w-6 bg-text-primary/70" />
                  {stage.label}
                </p>
                <p className="text-[0.8125rem] leading-relaxed text-text-secondary sm:text-small lg:text-[0.9375rem]">
                  {stage.text}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom bar: scrub timeline on the left, calls to action on the right. */}
          <div className="flex flex-col-reverse gap-6 sm:flex-row sm:items-end sm:justify-between lg:absolute lg:inset-x-[var(--gutter)] lg:bottom-8">
            <div aria-hidden className="intro flex flex-col gap-3" style={intro(450)}>
              <p className="flex items-center gap-2 font-mono text-[0.6875rem] tracking-[0.18em] text-text-secondary uppercase">
                <Icon name="arrow-up" size={14} className="rotate-180" />
                {copy.scrubHint}
              </p>
              <div className="flex w-56 items-center gap-1.5">
                {stages.map((stage, i) => (
                  <span
                    key={stage.label}
                    className="relative h-0.5 flex-1 overflow-hidden rounded-full bg-text-primary/20"
                  >
                    <span
                      className={cn(
                        "absolute inset-0 origin-left rounded-full bg-text-primary",
                        "[transform:scaleX(clamp(0,calc(var(--p,0)*var(--n)-var(--i)),1))]",
                      )}
                      style={{ "--n": stages.length, "--i": i } as CSSProperties}
                    />
                  </span>
                ))}
              </div>
            </div>
            <div className="intro flex flex-wrap gap-3" style={intro(450)}>
              <Button href="#projects" size="md">
                {copy.primaryCta}
              </Button>
              <Button href={`#${contactSectionId}`} variant="ghost" size="md">
                {copy.secondaryCta}
              </Button>
              {profile.resumeUrl && (
                <Button href={profile.resumeUrl} variant="ghost" size="md" leadingIcon="file-text">
                  {navCopy.resume}
                </Button>
              )}
            </div>
          </div>
        </div>
      </ScrubStage>
    </section>
  );
}
