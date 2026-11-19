"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type MouseEvent,
  type PointerEvent,
} from "react";
import { Icon } from "@/components/ui/Icon";
import { VisuallyHidden } from "@/components/ui/VisuallyHidden";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { cn } from "@/lib/utils";
import { ProjectVisual } from "./ProjectVisual";

export interface CarouselProject {
  slug: string;
  title: string;
  category: string;
  description: string;
  stack: readonly string[];
  tags: readonly string[];
  repoUrl: string;
  /** Case-study path for featured projects. */
  caseStudy?: string;
}

interface CarouselCopy {
  carouselLabel: string;
  previous: string;
  next: string;
  pause: string;
  play: string;
  goTo: string[];
  code: string;
  caseStudy: string;
  newTab: string;
  projectLabels: string[];
  positionLabels: string[];
  codeSrSuffixes: string[];
  caseStudySrPrefixes: string[];
}

/** Time each project stays at the front while auto-rotating. */
const AUTOPLAY_MS = 4200;
/** px of pointer travel before a press becomes a drag. */
const DRAG_THRESHOLD = 6;

/** Wraps any integer into 0..n-1. */
const mod = (value: number, n: number) => ((value % n) + n) % n;

/**
 * Featured projects as a 3D ring (Phase 10, reworked 2026-11-18 after Kartik's reference video).
 * Every card sits around a cylinder; the front card is full brightness with a light running round
 * its border and animated artwork, its neighbours turn away and dim. The ring auto-rotates (paused
 * while hovered, focused, off-screen, in a hidden tab, by the pause button, and always under
 * reduced motion), and can be turned with the arrows, the dots, the keyboard, a drag or a swipe,
 * or by clicking a side card. Announced as a carousel of labelled slides; only the front slide is
 * exposed to assistive tech, and its changes are announced while auto-rotation is off.
 */
export function ProjectCarousel({
  projects,
  copy,
}: {
  projects: CarouselProject[];
  copy: CarouselCopy;
}) {
  const n = projects.length;
  const reduced = useReducedMotion();
  const regionRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLUListElement>(null);
  /** Unbounded ring position; the front card is `position mod n`. */
  const [position, setPosition] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [inView, setInView] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);
  const drag = useRef({ down: false, moved: false, startX: 0, offset: 0 });
  const active = mod(position, n);

  const step = useCallback((delta: number) => setPosition((p) => p + delta), []);
  /** Turns the short way round to card `index`. */
  const goTo = useCallback(
    (index: number) => {
      setPosition((p) => {
        let delta = mod(index - mod(p, n), n);
        if (delta > n / 2) delta -= n;
        return p + delta;
      });
    },
    [n],
  );

  // Pause while off-screen or in a background tab.
  useEffect(() => {
    const region = regionRef.current;
    if (!region) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry?.isIntersecting ?? false), {
      threshold: 0.35,
    });
    io.observe(region);
    const onVisibility = () => setTabVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const autoplay = playing && !reduced && !hovered && !focused && inView && tabVisible;
  useEffect(() => {
    if (!autoplay) return;
    const timer = window.setTimeout(() => step(1), AUTOPLAY_MS);
    return () => window.clearTimeout(timer);
  }, [autoplay, position, step]);

  // Drag or swipe to turn the ring (one card per card-width of travel).
  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    drag.current = { down: true, moved: false, startX: event.clientX, offset: 0 };
  };
  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const ring = ringRef.current;
    const state = drag.current;
    if (!state.down || !ring) return;
    const dx = event.clientX - state.startX;
    if (!state.moved && Math.abs(dx) < DRAG_THRESHOLD) return;
    if (!state.moved) {
      state.moved = true;
      event.currentTarget.setPointerCapture(event.pointerId);
      ring.dataset.dragging = "";
    }
    // Layout width of one card (the 3D bounding box would span the whole ring).
    const cardWidth = ring.offsetWidth || 320;
    state.offset = -dx / cardWidth;
    ring.style.setProperty("--drag", state.offset.toFixed(3));
  };
  const endDrag = (event: PointerEvent<HTMLDivElement>) => {
    const ring = ringRef.current;
    const state = drag.current;
    if (!state.down || !ring) return;
    state.down = false;
    if (!state.moved) return;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    delete ring.dataset.dragging;
    ring.style.removeProperty("--drag");
    // Snap from where the drag left the ring, so the turn continues smoothly.
    setPosition((p) => Math.round(p + state.offset));
  };
  // A drag must not also click the link or card under the pointer.
  const onClickCapture = (event: MouseEvent) => {
    if (drag.current.moved) {
      event.preventDefault();
      event.stopPropagation();
      drag.current.moved = false;
    }
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") step(1);
    else if (event.key === "ArrowLeft") step(-1);
    else return;
    event.preventDefault();
  };

  return (
    <div
      ref={regionRef}
      role="region"
      aria-roledescription="carousel"
      aria-label={copy.carouselLabel}
      onKeyDown={onKeyDown}
      onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
      }}
      className="flex flex-col items-center gap-8"
    >
      <div
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
        className="relative h-[35rem] w-full touch-pan-y select-none [perspective:1500px] sm:h-[34rem]"
      >
        {/* Floor glow under the ring. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto h-24 w-[min(60rem,100%)] rounded-[50%] bg-[radial-gradient(closest-side,rgb(201_191_240/0.14),transparent)] blur-2xl"
        />
        <ul
          ref={ringRef}
          aria-live={autoplay ? "off" : "polite"}
          className="ring3d"
          style={{ "--n": n, "--pos": position } as CSSProperties}
        >
          {projects.map((project, i) => {
            const isActive = i === active;
            const distance = Math.min(mod(i - active, n), mod(active - i, n));
            return (
              <li
                key={project.slug}
                data-active={isActive || undefined}
                data-dist={isActive ? undefined : distance <= 2 ? String(distance) : "far"}
                aria-hidden={isActive ? undefined : true}
                style={{ "--i": i } as CSSProperties}
                // A click anywhere on a side card brings it to the front instead.
                onClickCapture={(event) => {
                  if (isActive) return;
                  event.preventDefault();
                  event.stopPropagation();
                  goTo(i);
                }}
                className={cn(!isActive && "cursor-pointer")}
              >
                <div
                  role="group"
                  aria-roledescription="slide"
                  aria-label={copy.positionLabels[i]}
                  data-active={isActive || undefined}
                  className={cn(
                    "glow-border flex h-[32rem] flex-col overflow-hidden rounded-3xl border bg-bg-1 shadow-2 transition-[border-color,box-shadow] duration-700 ease-out-expo",
                    isActive ? "border-text-muted shadow-glow-accent" : "border-border",
                  )}
                >
                  <ProjectVisual slug={project.slug} index={i} />
                  <div className="flex flex-1 flex-col gap-4 p-6 pt-3">
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-mono text-[0.6875rem] tracking-[0.16em] text-text-muted uppercase">
                        {copy.projectLabels[i]}
                      </span>
                      <span className="rounded-full border border-border-strong bg-bg-2 px-3 py-1 font-mono text-[0.6875rem] text-text-secondary">
                        {project.category}
                      </span>
                    </div>
                    <h3 className="text-chrome font-display text-h4 leading-tight font-extrabold tracking-[-0.03em]">
                      {project.title}
                    </h3>
                    <p className="line-clamp-3 text-small text-text-secondary">
                      {project.description}
                    </p>
                    <ul className="mt-auto flex flex-wrap gap-1.5">
                      {project.stack.slice(0, 3).map((tech) => (
                        <li
                          key={tech}
                          className="rounded-lg border border-border bg-bg-2 px-2.5 py-1 font-mono text-[0.6875rem] text-text-secondary"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center justify-between gap-3 border-t border-border pt-3">
                      {project.caseStudy ? (
                        <Link
                          href={project.caseStudy}
                          tabIndex={isActive ? undefined : -1}
                          className="group/link flex min-h-12 items-center gap-1.5 font-mono text-[0.75rem] font-semibold tracking-[0.12em] text-text-primary uppercase"
                        >
                          <VisuallyHidden>{copy.caseStudySrPrefixes[i]}</VisuallyHidden>
                          <span className="link-draw">{copy.caseStudy}</span>
                          <Icon
                            name="arrow-right"
                            size={14}
                            className="transition-[translate] duration-300 ease-out-expo group-hover/link:translate-x-1"
                          />
                        </Link>
                      ) : (
                        <span />
                      )}
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        tabIndex={isActive ? undefined : -1}
                        className="flex min-h-12 items-center gap-1.5 font-mono text-[0.75rem] font-semibold tracking-[0.12em] text-text-secondary uppercase hover:text-text-primary"
                      >
                        <span className="link-draw">{copy.code}</span>
                        <VisuallyHidden>
                          {copy.codeSrSuffixes[i]}
                          {copy.newTab}
                        </VisuallyHidden>
                        <Icon name="arrow-up-right" size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Controls: previous · dots · next, then pause/play and the position. */}
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-3 rounded-full border border-border bg-bg-1/80 p-1.5 backdrop-blur-md">
          <button
            type="button"
            onClick={() => step(-1)}
            className="grid size-11 place-items-center rounded-full text-text-primary transition-colors hover:bg-surface-hover"
          >
            <Icon name="arrow-right" size={18} className="rotate-180" />
            <span className="sr-only">{copy.previous}</span>
          </button>
          <div className="flex items-center">
            {projects.map((project, i) => (
              <button
                key={project.slug}
                type="button"
                onClick={() => goTo(i)}
                aria-current={i === active ? "true" : undefined}
                className="group/dot grid h-11 w-6 place-items-center"
              >
                <span
                  className={cn(
                    "block h-1.5 rounded-full transition-[width,background-color] duration-500 ease-out-expo",
                    i === active
                      ? "w-5 bg-text-primary"
                      : "w-1.5 bg-border-strong group-hover/dot:bg-text-muted",
                  )}
                />
                <span className="sr-only">{copy.goTo[i]}</span>
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => step(1)}
            className="grid size-11 place-items-center rounded-full text-text-primary transition-colors hover:bg-surface-hover"
          >
            <Icon name="arrow-right" size={18} />
            <span className="sr-only">{copy.next}</span>
          </button>
        </div>
        <div className="flex items-center gap-3">
          {!reduced && (
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              className="flex min-h-11 items-center gap-2 rounded-full px-3 font-mono text-[0.75rem] tracking-[0.12em] text-text-muted uppercase transition-colors hover:text-text-primary"
            >
              <Icon name={playing ? "pause" : "play"} size={14} />
              {playing ? copy.pause : copy.play}
            </button>
          )}
          <p className="min-w-16 text-center font-mono text-small text-text-secondary tabular-nums">
            {String(active + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
          </p>
        </div>
      </div>
    </div>
  );
}
