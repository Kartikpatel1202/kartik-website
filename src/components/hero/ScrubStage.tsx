"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

/** Portrait camera keyframes across the scrub (progress 0 → 1). Units: deg, scale, %, %. */
const KEYS = [
  { at: 0, rot: 0, scale: 1, x: 0, y: 0, lx: 0, ly: 0 },
  { at: 0.33, rot: -9, scale: 1.04, x: -3, y: 0, lx: -10, ly: 2 },
  { at: 0.66, rot: 8, scale: 1.07, x: 3, y: -1, lx: 9, ly: -2 },
  { at: 1, rot: 0, scale: 1.12, x: 0, y: -3, lx: 0, ly: -4 },
] as const;

const ease = (t: number) => t * t * (3 - 2 * t); // smoothstep between keyframes

function sample(p: number) {
  let i = 0;
  while (i < KEYS.length - 2 && p > KEYS[i + 1]!.at) i++;
  const a = KEYS[i]!;
  const b = KEYS[i + 1]!;
  const t = ease(Math.min(1, Math.max(0, (p - a.at) / (b.at - a.at))));
  const mix = (k: "rot" | "scale" | "x" | "y" | "lx" | "ly") => a[k] + (b[k] - a[k]) * t;
  return {
    rot: mix("rot"),
    scale: mix("scale"),
    x: mix("x"),
    y: mix("y"),
    lx: mix("lx"),
    ly: mix("ly"),
  };
}

interface ScrubStageProps {
  children: ReactNode;
  stageCount: number;
  className?: string;
}

/**
 * The pinned viewport of the hero "scrub timeline". Reads how far the tall parent section has been
 * scrolled (0 → 1) on every animation frame that has a scroll, and:
 * - marks the active stage (`data-active` on `[data-stage-index]`), so its headline, label and
 *   text cross-fade in;
 * - writes --p (timeline fill) and the portrait/light camera variables (--rot, --scale, --x, --y,
 *   --lx, --ly), which CSS applies as transforms only.
 * Works with Lenis and native scrolling alike (both fire window scroll events). Under reduced
 * motion the stages still follow the scroll, but nothing moves.
 */
export function ScrubStage({ children, stageCount, className }: ScrubStageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const stage = ref.current;
    const section = stage?.parentElement;
    if (!stage || !section) return;
    const items = section.querySelectorAll<HTMLElement>("[data-stage-index]");
    let frame = 0;
    let current = -1;

    const update = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const travel = Math.max(1, rect.height - window.innerHeight);
      const p = Math.min(1, Math.max(0, -rect.top / travel));
      const index = Math.min(stageCount - 1, Math.floor(p * stageCount));
      if (index !== current) {
        current = index;
        items.forEach((el) =>
          el.toggleAttribute("data-active", Number(el.dataset.stageIndex) === index),
        );
        section.dataset.stage = String(index);
      }
      section.style.setProperty("--p", p.toFixed(4));
      if (reduced) return;
      const k = sample(p);
      section.style.setProperty("--rot", `${k.rot.toFixed(2)}deg`);
      section.style.setProperty("--scale", k.scale.toFixed(4));
      section.style.setProperty("--x", `${k.x.toFixed(2)}%`);
      section.style.setProperty("--y", `${k.y.toFixed(2)}%`);
      section.style.setProperty("--lx", `${k.lx.toFixed(2)}%`);
      section.style.setProperty("--ly", `${k.ly.toFixed(2)}%`);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reduced, stageCount]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
