"use client";

import * as m from "motion/react-m";
import { useEffect, type ReactNode } from "react";
import { duration, easeInOut } from "@/lib/motion";

// The first render (server HTML + hydration) must be visible immediately: no-JS users and LCP
// depend on it. Only client-side navigations after that fade in.
let hasMounted = false;

/** Page-level fade between routes (/ ↔ /projects/[slug]). Opacity only, so safe under reduced motion. */
export default function Template({ children }: { children: ReactNode }) {
  const isFirstRender = !hasMounted;

  useEffect(() => {
    hasMounted = true;
  }, []);

  return (
    <m.div
      initial={isFirstRender ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: duration.base, ease: easeInOut }}
    >
      {children}
    </m.div>
  );
}
