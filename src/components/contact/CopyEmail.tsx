"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { sectionCopy } from "@/content/sections";
import { cn } from "@/lib/utils";

type Status = "idle" | "copied" | "failed";

const RESET_AFTER_MS = 2000;

/**
 * One-click copy for the email address: a small icon button with a "Copied!" tooltip for sighted
 * users and a polite live-region announcement for screen readers.
 */
export function CopyEmail({ address }: { address: string }) {
  const copy = sectionCopy.contact.email;
  const [status, setStatus] = useState<Status>("idle");
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const onCopy = async () => {
    window.clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(address);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
    timer.current = window.setTimeout(() => setStatus("idle"), RESET_AFTER_MS);
  };

  return (
    <span className="relative inline-flex">
      <button
        type="button"
        onClick={onCopy}
        className="grid size-11 place-items-center rounded-xl border border-border bg-bg-0/70 text-text-secondary transition-colors duration-150 hover:border-text-muted hover:text-text-primary"
      >
        <Icon name={status === "copied" ? "check" : "copy"} size={16} />
        <span className="sr-only">{copy.copy}</span>
      </button>
      {/* Visual tooltip; the live region below carries the same news to screen readers. */}
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded-md border border-border-strong bg-bg-2 px-2 py-1 font-mono text-[0.6875rem] whitespace-nowrap shadow-2 transition-[opacity,transform] duration-200",
          status === "idle" ? "translate-y-1 opacity-0" : "translate-y-0 opacity-100",
          status === "failed" ? "text-warn" : "text-text-primary",
        )}
      >
        {status === "failed" ? copy.copyFailed : copy.copied}
      </span>
      <span aria-live="polite" className="sr-only">
        {status === "copied" ? copy.copiedAnnouncement : status === "failed" ? copy.copyFailed : ""}
      </span>
    </span>
  );
}
