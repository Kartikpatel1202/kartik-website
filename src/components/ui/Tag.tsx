import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type TagVariant = "neutral" | "accent" | "verified" | "warn";

interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: TagVariant;
  size?: "sm" | "md";
}

const variants: Record<TagVariant, string> = {
  neutral: "border-border bg-bg-2 text-text-secondary",
  accent: "border-accent/30 bg-accent/10 text-accent",
  verified: "border-accent-2/30 bg-accent-2/10 text-accent-2",
  warn: "border-warn/30 bg-warn/10 text-warn",
};

/** Small label for technologies, skills and project status. */
export function Tag({ variant = "neutral", size = "md", className, children, ...rest }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border font-mono leading-none",
        size === "sm" ? "px-2.5 py-1 text-[0.75rem]" : "px-3 py-1.5 text-small",
        variants[variant],
        className,
      )}
      {...rest}
    >
      {variant === "verified" && <span aria-hidden className="size-1.5 rounded-full bg-accent-2" />}
      {children}
    </span>
  );
}
