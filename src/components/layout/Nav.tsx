"use client";

import * as m from "motion/react-m";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useSmoothScroll } from "@/components/motion/SmoothScroll";
import { Icon } from "@/components/ui/Icon";
import { contactSectionId, navCopy, navItems, profile } from "@/content";
import { useActiveSection } from "@/lib/hooks/useActiveSection";
import { spring } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { MobileMenu } from "./MobileMenu";
import { NavLink } from "./NavLink";

const sectionIds = navItems.map((item) => item.id);
const SCROLLED_AT = 24; // px: the bar gains its glass background

/**
 * Full-width top bar (Phase 10; wordmark removed 2026-11-16): centred section links with a
 * sliding active pill, then the résumé link and a "Hire Me" pill. Transparent over the hero, glass once scrolled. Below lg the
 * links move into the overlay menu.
 */
export function Nav() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const active = useActiveSection(onHome ? sectionIds : []);
  const { lock, unlock } = useSmoothScroll();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setScrolled(window.scrollY > SCROLLED_AT));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Layout effect: the lock is released before any queued anchor scroll runs.
  useLayoutEffect(() => {
    if (!menuOpen) return;
    lock();
    return unlock;
  }, [menuOpen, lock, unlock]);

  const closeMenu = (restoreFocus: boolean) => {
    setMenuOpen(false);
    if (restoreFocus) toggleRef.current?.focus();
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 border-b transition-[background-color,border-color] duration-300",
          scrolled
            ? "border-border/80 bg-bg-0/80 backdrop-blur-xl"
            : "border-transparent bg-transparent",
        )}
      >
        <nav
          aria-label={navCopy.primaryLabel}
          className="mx-auto flex h-16 w-full max-w-wide items-center gap-4 gutter-x"
        >
          <ul className="mx-auto hidden items-center lg:flex">
            {navItems.map((item) => {
              const isActive = onHome && active === item.id;
              return (
                <li key={item.id} className="relative">
                  {isActive && (
                    <m.span
                      layoutId="nav-active"
                      transition={spring}
                      aria-hidden
                      className="absolute inset-x-0.5 inset-y-1.5 rounded-full bg-surface-hover"
                    />
                  )}
                  <NavLink
                    sectionId={item.id}
                    onHome={onHome}
                    aria-current={isActive ? "location" : undefined}
                    className={cn(
                      "relative flex min-h-11 items-center rounded-full px-3 text-[0.8125rem] font-medium transition-colors duration-150",
                      isActive
                        ? "text-text-primary"
                        : "text-text-secondary hover:text-text-primary",
                    )}
                  >
                    {item.label}
                  </NavLink>
                </li>
              );
            })}
          </ul>

          <div className="hidden items-center gap-2 lg:flex">
            {profile.resumeUrl && (
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-11 items-center gap-2 rounded-full px-4 text-[0.8125rem] font-semibold text-text-secondary transition-colors duration-150 hover:text-text-primary"
              >
                <Icon name="file-text" size={16} />
                {navCopy.resume}
                <span className="sr-only">{navCopy.resumeSr}</span>
              </a>
            )}
            <NavLink
              sectionId={contactSectionId}
              onHome={onHome}
              className="flex min-h-11 items-center rounded-full border border-border-strong bg-bg-1/80 px-5 text-[0.8125rem] font-semibold text-text-primary transition-[background-color,border-color] duration-150 hover:border-text-muted hover:bg-surface-hover"
            >
              {navCopy.hire}
            </NavLink>
          </div>

          <button
            ref={toggleRef}
            type="button"
            className="ml-auto grid size-11 place-items-center rounded-full text-text-primary lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(true)}
          >
            <Icon name="menu" size={22} />
            <span className="sr-only">{navCopy.openMenu}</span>
          </button>
        </nav>
      </header>

      <MobileMenu open={menuOpen} onHome={onHome} onClose={closeMenu} />
    </>
  );
}
