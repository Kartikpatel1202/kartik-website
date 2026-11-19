"use client";

import { LazyMotion, MotionConfig } from "motion/react";
import dynamic from "next/dynamic";
import type { ReactNode } from "react";
import { onIdle } from "@/lib/idle";
import { PointerEffects } from "./PointerEffects";
import { RevealObserver } from "./RevealObserver";
import { SmoothScroll } from "./SmoothScroll";

// Decorative and desktop-only: never part of the first-load bundle.
const Cursor = dynamic(() => import("./Cursor").then((mod) => mod.Cursor), { ssr: false });

// Motion's animation features (~100 KB) load once the browser is idle: nothing Motion animates
// is visible during first load, and m.* components render statically until then.
const loadFeatures = () =>
  new Promise<void>((resolve) => onIdle(resolve)).then(() =>
    import("./motionFeatures").then((mod) => mod.default),
  );

/**
 * Client-side motion context. Motion honours prefers-reduced-motion; its features load lazily
 * (components use the lightweight `m.*`; `strict` forbids the heavy `motion.*`). Lenis drives scrolling;
 * RevealObserver drives every <Reveal>; PointerEffects and the lazily loaded Cursor add
 * the site-wide pointer feedback.
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">
        <SmoothScroll>
          {children}
          <RevealObserver />
          <PointerEffects />
          <Cursor />
        </SmoothScroll>
      </MotionConfig>
    </LazyMotion>
  );
}
