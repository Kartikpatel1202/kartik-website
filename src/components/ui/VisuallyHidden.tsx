import type { HTMLAttributes } from "react";

/** Text available to screen readers but not shown visually. */
export function VisuallyHidden({ children, ...rest }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className="sr-only" {...rest}>
      {children}
    </span>
  );
}
