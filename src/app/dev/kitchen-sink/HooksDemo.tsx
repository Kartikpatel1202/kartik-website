"use client";

import { useActiveSection } from "@/lib/hooks/useActiveSection";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

/** Live readout of the shared hooks (dev only). */
export function HooksDemo({ sectionIds }: { sectionIds: readonly string[] }) {
  const reduced = useReducedMotion();
  const finePointer = useMediaQuery("(pointer: fine)");
  const desktop = useMediaQuery("(min-width: 64rem)");
  const active = useActiveSection(sectionIds);

  const rows: [string, string][] = [
    ["useReducedMotion()", String(reduced)],
    ['useMediaQuery("(pointer: fine)")', String(finePointer)],
    ['useMediaQuery("(min-width: 64rem)")', String(desktop)],
    ["useActiveSection(ids)", active ?? "none"],
  ];

  return (
    <dl
      aria-live="polite"
      className="fixed right-4 bottom-4 z-40 hidden w-80 flex-col gap-1 rounded-lg border border-border bg-bg-2/95 p-4 font-mono text-[0.75rem] shadow-2 lg:flex"
    >
      {rows.map(([k, v]) => (
        <div key={k} className="flex justify-between gap-3">
          <dt className="text-text-muted">{k}</dt>
          <dd className="text-accent-2">{v}</dd>
        </div>
      ))}
    </dl>
  );
}
