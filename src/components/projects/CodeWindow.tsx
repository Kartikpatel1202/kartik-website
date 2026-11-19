import { Button } from "@/components/ui/Button";
import { sectionCopy } from "@/content";
import { highlightPython, type Token, type TokenKind } from "@/lib/highlight";
import { cn } from "@/lib/utils";
import type { CodeExcerpt } from "@/types/content";

const tokenClass: Record<TokenKind, string> = {
  plain: "",
  comment: "text-text-muted italic",
  string: "text-success",
  keyword: "text-accent",
  number: "text-accent-2",
  call: "text-text-primary",
};

const escapeHtml = (text: string) =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Highlighted lines as HTML. Every token is escaped; line numbers are hidden from screen readers. */
function renderLines(lines: Token[][], startLine: number): string {
  return lines
    .map((tokens, i) => {
      const code = tokens.length
        ? tokens
            .map((t) => {
              const cls = tokenClass[t.kind];
              return cls ? `<span class="${cls}">${escapeHtml(t.text)}</span>` : escapeHtml(t.text);
            })
            .join("")
        : " ";
      return `<span class="flex pr-6"><span aria-hidden="true" class="sticky left-0 w-12 shrink-0 bg-bg-1 pr-4 text-right text-text-muted select-none">${startLine + i}</span><span>${code}</span></span>`;
    })
    .join("");
}

interface CodeWindowProps {
  excerpt: CodeExcerpt;
  /** `frame`: chrome and code only (homepage visual). `full`: adds the caption and source link. */
  variant?: "frame" | "full";
  className?: string;
}

/** Editor-style window showing a verbatim, highlighted source excerpt with real line numbers. */
export function CodeWindow({ excerpt, variant = "full", className }: CodeWindowProps) {
  const lines = highlightPython(excerpt.code);
  const endLine = excerpt.startLine + lines.length - 1;
  const fileName = excerpt.file.split("/").at(-1);

  return (
    <figure
      className={cn(
        "overflow-hidden rounded-xl border border-border-strong bg-bg-1 shadow-2",
        className,
      )}
    >
      <div className="flex items-center gap-3 border-b border-border bg-bg-2/70 px-4 py-3">
        <span aria-hidden className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-border-strong" />
          <span className="size-2.5 rounded-full bg-border-strong" />
          <span className="size-2.5 rounded-full bg-border-strong" />
        </span>
        <p className="min-w-0 truncate font-mono text-[0.75rem] text-text-muted">
          <span className="text-text-secondary">{fileName}</span>
          <span className="max-sm:hidden"> · {excerpt.file}</span> · L{excerpt.startLine}–{endLine}
        </p>
      </div>
      <pre
        tabIndex={0}
        aria-label={sectionCopy.caseStudy.codeLabel(excerpt.file, excerpt.startLine, endLine)}
        className="overflow-x-auto py-4 font-mono text-[0.78rem] leading-6 text-text-secondary focus-visible:outline-offset-[-2px] sm:text-[0.8125rem]"
      >
        {/* One static HTML string instead of a React element per token: the code never changes,
            and this keeps a few hundred nodes out of hydration (Phase 9 performance). */}
        <code
          className="grid min-w-max"
          dangerouslySetInnerHTML={{ __html: renderLines(lines, excerpt.startLine) }}
        />
      </pre>
      {variant === "full" && (
        <figcaption className="flex flex-col gap-3 border-t border-border px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-small text-text-secondary">{excerpt.caption}</span>
          <Button href={excerpt.href} variant="link" className="shrink-0 text-small">
            {sectionCopy.caseStudy.codeLink}
          </Button>
        </figcaption>
      )}
    </figure>
  );
}
