/** Motion tokens for Motion (JS) animations. Mirrors DESIGN.md §B5 and the CSS variables. */

type Bezier = [number, number, number, number];

export const duration = { fast: 0.15, base: 0.3, slow: 0.6 } as const;

export const easeOutExpo: Bezier = [0.16, 1, 0.3, 1];
export const easeInOut: Bezier = [0.65, 0, 0.35, 1];

export const spring = { type: "spring", stiffness: 300, damping: 30, mass: 0.6 } as const;

export const stagger = { tight: 0.04, base: 0.06 } as const;
