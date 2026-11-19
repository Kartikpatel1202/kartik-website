import type { ElementType, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  /** Adds hover/focus-within affordances and the pointer border spotlight (cards with a link). */
  interactive?: boolean;
  radius?: "lg" | "xl";
}

/** Frosted surface (blur + hairline + noise) with a solid fallback when backdrop-filter is unsupported. */
export function GlassCard({
  as: Tag = "div",
  interactive = false,
  radius = "lg",
  className,
  ...rest
}: GlassCardProps) {
  return (
    <Tag
      data-spotlight={interactive ? "" : undefined}
      className={cn(
        "glass",
        radius === "xl" ? "rounded-xl" : "rounded-lg",
        interactive &&
          "transition-[border-color,background-color,box-shadow] duration-300 ease-out-expo focus-within:border-border-strong hover:border-border-strong hover:bg-surface-hover hover:shadow-2",
        className,
      )}
      {...rest}
    />
  );
}
