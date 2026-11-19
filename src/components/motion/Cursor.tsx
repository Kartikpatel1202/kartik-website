"use client";

import { useEffect, useRef } from "react";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

const LERP = 0.18;
const INTERACTIVE = "a, button, [role='button'], input, textarea, select, label, summary";

/**
 * Decorative cursor: a dot on the pointer and a ring that follows with a lag (lerp). The ring
 * grows over interactive elements and shows a short label over anything with `data-cursor`.
 * Fine pointers only, off under reduced motion, pointer-events: none and aria-hidden. The native
 * cursor stays visible. The follow loop runs only while the ring is catching up.
 */
export function Cursor() {
  const reduced = useReducedMotion();
  const finePointer = useMediaQuery("(hover: hover) and (pointer: fine)");
  const enabled = !reduced && finePointer;
  const rootRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!enabled || !root || !dot || !ring || !label) return;

    const target = { x: -100, y: -100 };
    const pos = { x: -100, y: -100 };
    let frame = 0;

    const step = () => {
      pos.x += (target.x - pos.x) * LERP;
      pos.y += (target.y - pos.y) * LERP;
      ring.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      const settled = Math.abs(target.x - pos.x) < 0.1 && Math.abs(target.y - pos.y) < 0.1;
      frame = settled ? 0 : requestAnimationFrame(step);
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      target.x = event.clientX;
      target.y = event.clientY;
      dot.style.transform = `translate3d(${target.x}px, ${target.y}px, 0)`;
      root.dataset.visible = "";
      if (!frame) frame = requestAnimationFrame(step);
    };

    const onOver = (event: PointerEvent) => {
      const el = event.target instanceof Element ? event.target : null;
      const labelled = el?.closest<HTMLElement>("[data-cursor]");
      if (labelled?.dataset.cursor) {
        label.textContent = labelled.dataset.cursor;
        root.dataset.state = "label";
      } else {
        root.dataset.state = el?.closest(INTERACTIVE) ? "link" : "";
      }
    };

    const onDown = () => (root.dataset.pressed = "");
    const onUp = () => delete root.dataset.pressed;
    const onLeave = () => delete root.dataset.visible;

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("pointerdown", onDown, { passive: true });
    document.addEventListener("pointerup", onUp, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div ref={rootRef} aria-hidden className="cursor-root">
      <div ref={ringRef} className="cursor-follow">
        <div className="cursor-ring" />
        <span ref={labelRef} className="cursor-label" />
      </div>
      <div ref={dotRef} className="cursor-follow">
        <div className="cursor-dot" />
      </div>
    </div>
  );
}
