import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  /** Short section marker, shown in a pill with a dot. */
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  /** id for the heading, so the section can use aria-labelledby. */
  id?: string;
  as?: "h1" | "h2";
  align?: "center" | "left";
  className?: string;
}

/** Section opener: a label pill, a heavy chrome-gradient title and an optional lead. */
export function SectionHeader({
  eyebrow,
  title,
  lead,
  id,
  as: Heading = "h2",
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex max-w-3xl flex-col gap-5",
        align === "center" ? "mx-auto items-center text-center" : "items-start",
        className,
      )}
    >
      <p className="inline-flex items-center gap-2 rounded-full border border-border bg-bg-1/70 px-3.5 py-1.5 font-mono text-[0.6875rem] tracking-[0.14em] text-text-secondary uppercase">
        <span aria-hidden className="size-1.5 rounded-full bg-text-secondary" />
        {eyebrow}
      </p>
      <Heading
        id={id}
        className={cn(
          "text-chrome font-display font-extrabold tracking-[-0.035em]",
          Heading === "h1" ? "text-h1" : "text-h2",
        )}
      >
        {title}
      </Heading>
      {lead && <p className="max-w-prose text-body-lg text-text-secondary">{lead}</p>}
    </div>
  );
}
