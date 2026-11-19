import type { ElementType, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  size?: "prose" | "content" | "wide";
}

const sizes = {
  prose: "max-w-prose",
  content: "max-w-content",
  wide: "max-w-wide",
} as const;

/** Centred, gutter-padded layout wrapper using the approved container widths. */
export function Container({
  as: Tag = "div",
  size = "content",
  className,
  ...rest
}: ContainerProps) {
  return <Tag className={cn("mx-auto w-full gutter-x", sizes[size], className)} {...rest} />;
}
