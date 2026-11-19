"use client";

import { useSyncExternalStore } from "react";

const TICK_MS = 30_000;

function subscribe(onChange: () => void) {
  const timer = window.setInterval(onChange, TICK_MS);
  return () => window.clearInterval(timer);
}

/**
 * Kartik's current local time, refreshed every 30 s. Rendered only on the client (the static
 * HTML would otherwise carry the build time), so the server snapshot is an empty string.
 */
export function LocalTime({ timeZone }: { timeZone: string }) {
  const time = useSyncExternalStore(
    subscribe,
    () =>
      new Intl.DateTimeFormat("en-GB", {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
      }).format(Date.now()),
    () => "",
  );

  return (
    <time suppressHydrationWarning className="font-mono text-text-primary tabular-nums">
      {time || "--:--"}
    </time>
  );
}
