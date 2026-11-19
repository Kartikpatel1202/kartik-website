"use client";

import { useEffect, useRef, useState } from "react";
import { homeCopy, profile } from "@/content";
import { PRELOAD_FLAG } from "@/lib/preload";

const MIN_MS = 900; // never flash: show for at least this long
const MAX_MS = 2600; // never block: finish by this time whatever is still loading
const EXIT_MS = 750; // slide-up duration (matches .preloader-exit in globals.css)

/**
 * "Initializing system" intro: name, role, a % counter and a progress bar driven by real loading
 * signals (web fonts ready, the hero portrait decoded, window load), smoothed and bounded between
 * 0.9s and 2.6s. Then it slides away and releases the hero intro (`html.intro-go`).
 *
 * Shown once per browser session. It is server-rendered so it covers the page from the first
 * frame, but only when JavaScript runs (`.js`), and an inline script in the layout skips it before
 * paint on repeat visits and under reduced motion (`.skip-preload`). A CSS failsafe hides it after
 * 4.5s even if this component never hydrates. Decorative: hidden from assistive technology, whose
 * users get the page immediately.
 */
export function Preloader() {
  const copy = homeCopy.preloader;
  const [first, ...rest] = profile.name.split(" ");
  const rootRef = useRef<HTMLDivElement>(null);
  const [percent, setPercent] = useState(0);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    const release = () => html.classList.add("intro-go");
    // Skipped before paint (repeat visit, reduced motion): CSS already hides it; just release.
    if (html.classList.contains("skip-preload")) {
      release();
      return;
    }

    const start = performance.now();
    let target = 8;
    let shown = 0;
    let frame = 0;
    let finished = false;

    const bump = (to: number) => (target = Math.max(target, to));
    void document.fonts?.ready.then(() => bump(45));
    const portrait = document.querySelector<HTMLImageElement>("img[data-hero-portrait]");
    if (!portrait || portrait.complete) bump(75);
    else
      void portrait.decode().then(
        () => bump(75),
        () => bump(75),
      );
    if (document.readyState === "complete") bump(100);
    else window.addEventListener("load", () => bump(100), { once: true });

    const tick = (now: number) => {
      const elapsed = now - start;
      if (elapsed > MAX_MS) target = 100;
      // Ease toward the target, but never reach 100 before the minimum display time.
      const ceiling = elapsed < MIN_MS ? 96 : 100;
      shown += (Math.min(target, ceiling) - shown) * 0.12;
      if (target === 100 && elapsed >= MIN_MS && shown > 99.5) shown = 100;
      setPercent(Math.round(shown));
      if (shown >= 100 && !finished) {
        finished = true;
        try {
          sessionStorage.setItem(PRELOAD_FLAG, "1");
        } catch {
          // Private mode or storage disabled: the intro simply shows again next time.
        }
        rootRef.current?.classList.add("preloader-exit");
        release();
        window.setTimeout(() => setGone(true), EXIT_MS);
        return;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    // Timers still run when animation frames are paused (e.g. a background tab): never hold the
    // hero intro longer than the CSS failsafe, which hides the overlay at the same time.
    const failsafe = window.setTimeout(release, MAX_MS + 1900);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(failsafe);
    };
  }, []);

  if (gone) return null;

  return (
    <div ref={rootRef} aria-hidden className="preloader">
      <div className="flex items-center justify-between font-mono text-[0.6875rem] tracking-[0.16em] text-text-muted uppercase">
        <span>{copy.status}</span>
        <span className="tabular-nums">{percent.toString().padStart(3, "0")}</span>
      </div>

      <div className="flex flex-col items-center gap-4 text-center">
        <p className="font-display text-[clamp(2.25rem,1.5rem+4vw,5rem)] leading-none font-extrabold tracking-[-0.04em] uppercase">
          <span className="text-text-primary">{first}</span>{" "}
          <span className="text-text-muted">{rest.join(" ")}</span>
        </p>
        <p className="font-mono text-[0.6875rem] tracking-[0.2em] text-text-secondary uppercase">
          {profile.headline}
        </p>
        <p className="text-chrome mt-4 font-display text-[clamp(3.5rem,2.5rem+5vw,7rem)] leading-none font-extrabold tracking-[-0.05em] tabular-nums">
          {percent}%
        </p>
      </div>

      <div className="mx-auto flex w-full max-w-xl flex-col gap-3">
        <div className="h-0.5 w-full overflow-hidden rounded-full bg-border">
          <div
            className="h-full origin-left rounded-full bg-text-primary"
            style={{ transform: `scaleX(${percent / 100})` }}
          />
        </div>
        <div className="flex justify-between font-mono text-[0.6875rem] tracking-[0.16em] text-text-muted uppercase">
          <span>{percent < 100 ? `${copy.progress}…` : copy.done}</span>
          <span className="tabular-nums">{percent}%</span>
        </div>
      </div>
    </div>
  );
}
