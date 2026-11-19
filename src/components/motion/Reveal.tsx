import type { CSSProperties, ElementType, ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  /** Rise distance token: 12 / 24 / 40px; "x" slides in from the right instead. */
  distance?: "sm" | "md" | "lg" | "x";
  /** Delay in ms. Prefer <Stagger> over hand-written delays for lists. */
  delay?: number;
  /** Adds a slight blur. Use only on small, text-sized elements (filter is expensive on large ones). */
  blur?: boolean;
  className?: string;
}

/**
 * Fades and rises its content once, when 20% of it is visible (or it fills 20% of the viewport,
 * for elements taller than the screen).
 *
 * A server component: it only marks the element. One shared observer (<RevealObserver>, mounted
 * in Providers) reveals every marked element, so the page hydrates one client island for all
 * reveals instead of one per element. Content is hidden only when the `js` class is present on
 * <html> (set before paint) and motion is allowed, so it is visible without JavaScript and static
 * under reduced motion.
 */
export function Reveal({
  children,
  as: Tag = "div",
  distance = "md",
  delay = 0,
  blur = false,
  className,
}: RevealProps) {
  return (
    <Tag
      data-reveal={distance}
      data-reveal-blur={blur || undefined}
      className={className}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
