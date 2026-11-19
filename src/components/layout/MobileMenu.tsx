"use client";

import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { useEffect, useRef, type KeyboardEvent } from "react";
import { Icon } from "@/components/ui/Icon";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { navCopy, navItems, profile } from "@/content";
import { duration, easeOutExpo, stagger } from "@/lib/motion";
import { NavLink } from "./NavLink";

interface MobileMenuProps {
  open: boolean;
  onHome: boolean;
  /** `restoreFocus` is true when closed via Escape/close button (focus returns to the toggle). */
  onClose: (restoreFocus: boolean) => void;
}

const FOCUSABLE = "a[href], button:not([disabled])";

/** Full-screen menu for small screens: modal dialog with focus trap, Escape to close, staggered links. */
export function MobileMenu({ open, onHome, onClose }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const items = navItems;

  useEffect(() => {
    if (open) panelRef.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus();
  }, [open]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      onClose(true);
      return;
    }
    if (event.key !== "Tab" || !panelRef.current) return;
    const focusable = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (!first || !last) return;
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <m.div
          id="mobile-menu"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          onKeyDown={onKeyDown}
          className="fixed inset-0 z-50 flex flex-col bg-bg-0 px-6 pt-4 pb-10 lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: duration.base }}
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-small text-text-muted">{profile.name}</span>
            <button
              type="button"
              data-autofocus
              className="grid size-11 place-items-center rounded-full border border-border-strong"
              onClick={() => onClose(true)}
            >
              <Icon name="close" size={22} />
              <span className="sr-only">Close menu</span>
            </button>
          </div>

          <nav aria-label="Mobile" className="mt-8 flex-1 overflow-y-auto">
            <ul className="flex flex-col gap-1">
              {items.map((item, i) => (
                <m.li
                  key={item.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: duration.slow,
                    ease: easeOutExpo,
                    delay: 0.05 + i * stagger.base,
                  }}
                >
                  <NavLink
                    sectionId={item.id}
                    onHome={onHome}
                    onClick={() => onClose(false)}
                    className="flex min-h-12 items-baseline gap-4 font-display text-h3 font-extrabold tracking-[-0.03em] text-text-primary"
                  >
                    <span className="font-mono text-eyebrow text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {item.label}
                  </NavLink>
                </m.li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-6">
            {profile.resumeUrl && (
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-11 items-center gap-2 rounded-full border border-border-strong px-5 text-small font-semibold text-text-primary"
              >
                <Icon name="file-text" size={16} />
                {navCopy.resume}
                <span className="sr-only">{navCopy.resumeSr}</span>
              </a>
            )}
            <SocialLinks className="gap-3" linkClassName="border border-border-strong" />
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
