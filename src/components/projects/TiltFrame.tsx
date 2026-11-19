"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

const MAX_TILT_DEG = 6;

interface TiltFrameProps {
  children: ReactNode;
  className?: string;
}

/**
 * Pointer-driven 3D tilt (max 6°). Mouse only: touch and pen never tilt, and the frame stays flat
 * under reduced motion. Writes CSS variables in a rAF, so React never re-renders. The border
 * spotlight comes from the shared `data-spotlight` system (PointerEffects), not from here.
 */
export function TiltFrame({ children, className }: TiltFrameProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    let frame = 0;

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const rect = el.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const tilt = MAX_TILT_DEG * 2;
        el.style.setProperty("--rx", `${((0.5 - y) * tilt).toFixed(2)}deg`);
        el.style.setProperty("--ry", `${((x - 0.5) * tilt).toFixed(2)}deg`);
        el.dataset.active = "";
      });
    };

    const onLeave = () => {
      cancelAnimationFrame(frame);
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
      delete el.dataset.active;
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      onLeave();
    };
  }, [reduced]);

  return (
    <div ref={ref} className={cn("tilt-frame", className)}>
      {children}
    </div>
  );
}
