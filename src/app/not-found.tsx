import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { sectionCopy } from "@/content";

const copy = sectionCopy.notFound;

export const metadata: Metadata = {
  title: copy.metaTitle,
  robots: { index: false },
};

/** On-brand 404: the ambient background (from the layout) and a trace that stops short. */
export default function NotFound() {
  return (
    <main id="main" className="flex min-h-svh items-center pt-28 pb-20">
      <Container className="flex flex-col items-start gap-10">
        {/* A trace that runs out: solid, then dashed, ending in an empty node. */}
        <svg aria-hidden width="220" height="16" viewBox="0 0 220 16" className="max-w-full">
          <circle cx="8" cy="8" r="5" fill="var(--color-accent)" />
          <path d="M16 8 H108" stroke="var(--color-accent)" strokeWidth="1.5" />
          <path
            d="M108 8 H200"
            stroke="var(--color-border-strong)"
            strokeWidth="1.5"
            strokeDasharray="4 6"
          />
          <circle
            cx="210"
            cy="8"
            r="5"
            fill="none"
            stroke="var(--color-text-muted)"
            strokeWidth="1.5"
          />
        </svg>

        <div className="flex max-w-3xl flex-col gap-5">
          <p className="flex items-center gap-3 font-mono text-eyebrow text-text-muted uppercase">
            <span className="text-accent">{copy.index}</span>
            <span aria-hidden className="h-px w-8 bg-border-strong" />
            {copy.eyebrow}
          </p>
          <h1 className="text-chrome font-display text-h1 font-extrabold tracking-[-0.04em] text-balance">
            {copy.title}
          </h1>
          <p className="max-w-prose text-body-lg text-text-secondary">{copy.lead}</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button href="/" trailingIcon="arrow-right">
            {copy.home}
          </Button>
          <Button href="/#projects" variant="ghost">
            {copy.work}
          </Button>
        </div>
      </Container>
    </main>
  );
}
