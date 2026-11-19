"use client";

import { useMediaQuery } from "./useMediaQuery";

/** True when the user prefers reduced motion. Defaults to `true` on the server (safest). */
export function useReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)", true);
}
