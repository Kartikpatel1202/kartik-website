"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { loadGsap, whenNear } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

/**
 * Wraps a timeline list. The vertical line draws itself with scroll (GSAP ScrollTrigger, scrubbed)
 * with a glowing head at its tip, and each node lights up (and rings once) as the line reaches it. GSAP comes from the shared loader, only when motion is
 * allowed; without JS or with reduced motion the line is simply drawn and every node is lit.
 */
export function TimelineTrack({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);
  const headRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const line = lineRef.current;
    const head = headRef.current;
    if (!root || !line || !head) return;
    if (reduced) return;

    let cleanup = () => {};
    let cancelled = false;

    const stop = whenNear(
      root,
      () =>
        void loadGsap().then(({ gsap, ScrollTrigger }) => {
          if (cancelled) return;
          const nodes = Array.from(root.querySelectorAll<HTMLElement>("[data-timeline-node]"));

          const ctx = gsap.context(() => {
            const scrollTrigger = {
              trigger: root,
              start: "top 70%",
              end: "bottom 65%",
              scrub: 0.6,
            };
            gsap.fromTo(line, { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger });
            // The glowing head rides the tip of the line.
            gsap.set(head, { autoAlpha: 1 });
            gsap.fromTo(head, { top: "0%" }, { top: "100%", ease: "none", scrollTrigger });
            nodes.forEach((node) => {
              node.dataset.state = "pending";
              ScrollTrigger.create({
                trigger: node,
                start: "top 68%",
                onEnter: () => (node.dataset.state = "passed"),
                onLeaveBack: () => (node.dataset.state = "pending"),
              });
            });
          }, root);

          cleanup = () => {
            ctx.revert();
            nodes.forEach((node) => delete node.dataset.state);
          };
        }),
    );

    return () => {
      cancelled = true;
      stop();
      cleanup();
    };
  }, [reduced]);

  return (
    <div ref={rootRef} className="relative">
      <span aria-hidden className="absolute top-2 bottom-2 left-[7px] w-px bg-border" />
      <span
        ref={lineRef}
        aria-hidden
        className="absolute top-2 bottom-2 left-[7px] w-px origin-top bg-[linear-gradient(to_bottom,var(--color-accent-2),var(--color-accent))]"
      />
      {/* Glowing head at the tip of the drawn line; hidden until GSAP drives it. */}
      <span aria-hidden className="pointer-events-none absolute top-2 bottom-2 left-[7px] w-px">
        <span
          ref={headRef}
          className="invisible absolute left-1/2 size-2.5 -translate-1/2 rounded-full bg-text-primary opacity-0 shadow-[0_0_12px_3px_rgb(201_191_240/0.7),0_0_28px_8px_rgb(201_191_240/0.25)]"
        />
      </span>
      {children}
    </div>
  );
}
