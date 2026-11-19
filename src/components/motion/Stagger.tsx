import { Children, type ElementType, type ReactNode } from "react";
import { Reveal } from "./Reveal";
import { stagger } from "@/lib/motion";

interface StaggerProps {
  children: ReactNode;
  /** Container element, e.g. "ul" or "ol". */
  as?: ElementType;
  /** Element each child is wrapped in, e.g. "li" inside a list. */
  itemAs?: ElementType;
  /** Gap between children in ms (default: the 60ms base stagger). */
  interval?: number;
  /** Delay before the first child, in ms. */
  delay?: number;
  distance?: "sm" | "md" | "lg";
  className?: string;
  itemClassName?: string;
}

/** Reveals its children one after another, `interval` ms apart. Each child is its own <Reveal>. */
export function Stagger({
  children,
  as: Tag = "div",
  itemAs = "div",
  interval = stagger.base * 1000,
  delay = 0,
  distance = "md",
  className,
  itemClassName,
}: StaggerProps) {
  return (
    <Tag className={className}>
      {Children.toArray(children).map((child, i) => (
        <Reveal
          key={i}
          as={itemAs}
          distance={distance}
          delay={delay + i * interval}
          className={itemClassName}
        >
          {child}
        </Reveal>
      ))}
    </Tag>
  );
}
