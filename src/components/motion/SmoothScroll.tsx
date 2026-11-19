"use client";

import Lenis from "lenis";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from "react";
import { loadGsap } from "@/lib/gsap";
import { onIdle } from "@/lib/idle";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

interface SmoothScrollApi {
  /** Scrolls to a section by id, honouring the fixed-nav offset, then updates the hash and focus. */
  scrollToId: (id: string) => boolean;
  /** Freezes page scroll (e.g. while the mobile menu is open). */
  lock: () => void;
  unlock: () => void;
}

const SmoothScrollContext = createContext<SmoothScrollApi | null>(null);

/** Access the shared scroll API. */
export function useSmoothScroll(): SmoothScrollApi {
  const api = useContext(SmoothScrollContext);
  if (!api) throw new Error("useSmoothScroll must be used inside <SmoothScroll>");
  return api;
}

/**
 * Lenis smooth scrolling (fine pointers, motion allowed; synced with GSAP) plus anchor handling for
 * every <a href="#id"> on the site. With reduced motion or touch, native scrolling is used.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  const finePointer = useMediaQuery("(pointer: fine)");
  const lenisRef = useRef<Lenis | null>(null);

  // Lenis runs on GSAP's ticker and feeds ScrollTrigger on every scroll, so scrubbed animations
  // and smooth scrolling share one clock. Native scrolling works until GSAP's chunk arrives.
  useEffect(() => {
    if (reduced || !finePointer) return;
    let cancelled = false;
    let teardown = () => {};

    // Wait for an idle moment so GSAP never competes with first paint and hydration.
    const start = () =>
      void loadGsap().then(({ gsap, ScrollTrigger }) => {
        if (cancelled) return;
        const lenis = new Lenis({ autoRaf: false, lerp: 0.12, anchors: false });
        const tick = (time: number) => lenis.raf(time * 1000);
        lenis.on("scroll", ScrollTrigger.update);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);
        lenisRef.current = lenis;
        teardown = () => {
          gsap.ticker.remove(tick);
          lenis.destroy();
          lenisRef.current = null;
        };
      });
    const cancelIdle = onIdle(start, 3000);

    return () => {
      cancelled = true;
      cancelIdle();
      teardown();
    };
  }, [reduced, finePointer]);

  const scrollToId = useCallback((id: string) => {
    const target = document.getElementById(id);
    if (!target) return false;
    const offset = parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(target, { offset: -offset, force: true });
    } else {
      const instant = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      target.scrollIntoView({ behavior: instant ? "auto" : "smooth", block: "start" });
    }
    if (window.location.hash !== `#${id}`) window.history.pushState(null, "", `#${id}`);
    // Move focus to the section so keyboard and screen-reader users land where they scrolled.
    if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
    return true;
  }, []);

  const lock = useCallback(() => {
    lenisRef.current?.stop();
    document.documentElement.style.overflow = "hidden";
  }, []);

  const unlock = useCallback(() => {
    document.documentElement.style.overflow = "";
    lenisRef.current?.start();
  }, []);

  // Intercept same-page hash links site-wide (nav, hero CTAs, footer, mobile menu).
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as Element | null)?.closest?.("a[href*='#']");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      const url = new URL(anchor.href);
      if (url.origin !== location.origin || url.pathname !== location.pathname || !url.hash) return;
      const id = decodeURIComponent(url.hash.slice(1));
      if (!document.getElementById(id)) return;
      event.preventDefault();
      // Next frame: lets a closing overlay release the scroll lock first.
      requestAnimationFrame(() => scrollToId(id));
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [scrollToId]);

  const api = useMemo(() => ({ scrollToId, lock, unlock }), [scrollToId, lock, unlock]);

  return <SmoothScrollContext.Provider value={api}>{children}</SmoothScrollContext.Provider>;
}
