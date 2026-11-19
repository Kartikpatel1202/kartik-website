"use client";

import { useSyncExternalStore } from "react";
import { useSmoothScroll } from "@/components/motion/SmoothScroll";
import { Icon } from "@/components/ui/Icon";

const noop = () => () => {};

/**
 * The current year, read in the browser so a static build never shows a stale year.
 * Falls back to the build year in the static HTML.
 */
export function CurrentYear({ buildYear }: { buildYear: number }) {
  const year = useSyncExternalStore(
    noop,
    () => new Date().getFullYear(),
    () => buildYear,
  );
  return <>{year}</>;
}

/** Smooth-scrolls to the top of the page and moves focus to the main landmark. */
export function BackToTop({ label }: { label: string }) {
  const { scrollToId } = useSmoothScroll();

  return (
    <button
      type="button"
      onClick={() => scrollToId("main")}
      className="group flex min-h-11 items-center gap-2 rounded-full border border-border-strong px-4 text-small text-text-secondary transition-colors duration-150 hover:border-text-muted hover:text-text-primary"
    >
      {label}
      <Icon
        name="arrow-up"
        size={16}
        className="transition-transform duration-300 ease-out-expo group-hover:-translate-y-0.5"
      />
    </button>
  );
}
