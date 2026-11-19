"use client";

import { useEffect } from "react";

const DEFAULT_STRENGTH = 0.3;
const DEFAULT_MAX = 12;

const readVar = (el: HTMLElement, name: string, fallback: number) =>
  parseFloat(el.style.getPropertyValue(name)) || fallback;

/**
 * One delegated, rAF-throttled pointer listener for the whole site (no per-component handlers):
 * - `[data-spotlight]`: writes --x / --y (px) so a CSS border spotlight follows the pointer.
 * - `[data-magnetic]`: writes --mag-x / --mag-y so the element leans toward the pointer
 *   (max 12px) and springs back via a CSS transition when the pointer leaves.
 * Mouse on fine pointers only. Magnetic is off under reduced motion; the spotlight is a colour
 * change, not motion, so it stays.
 */
export function PointerEffects() {
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let last: PointerEvent | null = null;
    let spot: HTMLElement | null = null;
    let mag: HTMLElement | null = null;

    const releaseSpot = () => {
      if (spot) delete spot.dataset.lit;
      spot = null;
    };
    const releaseMag = () => {
      if (!mag) return;
      mag.style.removeProperty("--mag-x");
      mag.style.removeProperty("--mag-y");
      delete mag.dataset.pulling;
      mag = null;
    };

    const apply = () => {
      frame = 0;
      const event = last;
      if (!event || !(event.target instanceof Element)) return;

      const nextSpot = event.target.closest<HTMLElement>("[data-spotlight]");
      if (spot !== nextSpot) releaseSpot();
      if (nextSpot) {
        const r = nextSpot.getBoundingClientRect();
        nextSpot.style.setProperty("--x", `${(event.clientX - r.left).toFixed(0)}px`);
        nextSpot.style.setProperty("--y", `${(event.clientY - r.top).toFixed(0)}px`);
        nextSpot.dataset.lit = "";
        spot = nextSpot;
      }

      const nextMag = reduce.matches ? null : event.target.closest<HTMLElement>("[data-magnetic]");
      if (mag !== nextMag) releaseMag();
      if (nextMag) {
        const r = nextMag.getBoundingClientRect();
        // Measure from the resting centre: subtract the offset already applied.
        const cx = r.left + r.width / 2 - readVar(nextMag, "--mag-x", 0);
        const cy = r.top + r.height / 2 - readVar(nextMag, "--mag-y", 0);
        const strength = readVar(nextMag, "--mag-strength", DEFAULT_STRENGTH);
        const max = readVar(nextMag, "--mag-max", DEFAULT_MAX);
        const clamp = (v: number) => Math.max(-max, Math.min(max, v * strength));
        nextMag.style.setProperty("--mag-x", `${clamp(event.clientX - cx).toFixed(1)}px`);
        nextMag.style.setProperty("--mag-y", `${clamp(event.clientY - cy).toFixed(1)}px`);
        nextMag.dataset.pulling = "";
        mag = nextMag;
      }
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || !fine.matches) return;
      last = event;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    const onLeave = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      releaseSpot();
      releaseMag();
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      onLeave();
    };
  }, []);

  return null;
}
