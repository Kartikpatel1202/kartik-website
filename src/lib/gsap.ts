import type { gsap as GsapType } from "gsap";
import type { ScrollTrigger as ScrollTriggerType } from "gsap/ScrollTrigger";

export interface GsapBundle {
  gsap: typeof GsapType;
  ScrollTrigger: typeof ScrollTriggerType;
}

let bundle: Promise<GsapBundle> | undefined;

/**
 * Loads GSAP + ScrollTrigger once, on demand (never in the first-load bundle), registers the
 * plugin exactly once and refreshes trigger positions after web fonts settle. Resize refreshes
 * are built into ScrollTrigger. Every caller shares the same promise.
 */
export function loadGsap(): Promise<GsapBundle> {
  bundle ??= Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
    ([{ gsap }, { ScrollTrigger }]) => {
      gsap.registerPlugin(ScrollTrigger);
      void document.fonts?.ready.then(() => ScrollTrigger.refresh());
      return { gsap, ScrollTrigger };
    },
  );
  return bundle;
}

/**
 * Runs `load` once `el` comes within one viewport of the screen, so GSAP is fetched and parsed
 * only when a scroll animation is about to be needed (it stays out of the load window and TBT).
 * Returns a cancel function.
 */
export function whenNear(el: Element, load: () => void): () => void {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry?.isIntersecting) return;
      observer.disconnect();
      load();
    },
    { rootMargin: "100% 0px" },
  );
  observer.observe(el);
  return () => observer.disconnect();
}
