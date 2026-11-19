import type { CSSProperties, ReactNode } from "react";

interface MagneticProps {
  children: ReactNode;
  /** Fraction of the pointer's offset from centre that the element follows. */
  strength?: number;
  /** Maximum travel in px. */
  max?: number;
}

/**
 * Pulls its child gently toward the pointer (max 12px) and springs back on leave. The pointer
 * maths lives in <PointerEffects> (one delegated, rAF-throttled listener for the whole site), so
 * this is a server component that only marks the element. Fine pointers only; static under
 * reduced motion.
 */
export function Magnetic({ children, strength = 0.3, max = 12 }: MagneticProps) {
  return (
    <span
      data-magnetic=""
      className="inline-flex"
      style={{ "--mag-strength": strength, "--mag-max": max } as CSSProperties}
    >
      {children}
    </span>
  );
}
