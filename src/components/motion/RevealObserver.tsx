"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

const THRESHOLD = 0.2;

/**
 * The single IntersectionObserver behind every <Reveal>. It marks an element `data-revealed` once
 * 20% of it is visible, or once it fills 20% of the viewport (for elements taller than the
 * screen). Re-scans on route change. Under reduced motion everything is marked at once (the CSS
 * never hides it anyway), so the content is simply static.
 */
export function RevealObserver() {
  const pathname = usePathname();
  const reduced = useReducedMotion();

  useEffect(() => {
    const pending = document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-revealed])");
    if (reduced) {
      pending.forEach((el) => el.setAttribute("data-revealed", ""));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const tallEnough = entry.intersectionRect.height >= window.innerHeight * THRESHOLD;
          if (entry.intersectionRatio < THRESHOLD && !tallEnough) continue;
          entry.target.setAttribute("data-revealed", "");
          observer.unobserve(entry.target);
        }
      },
      { threshold: [0, 0.1, THRESHOLD] },
    );
    pending.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname, reduced]);

  return null;
}
