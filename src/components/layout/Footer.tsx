import { BackToTop, CurrentYear } from "./FooterActions";
import { LocalTime } from "@/components/contact/LocalTime";
import { ScrambleText } from "@/components/motion/ScrambleText";
import { Container } from "@/components/ui/Container";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { homeCopy, navItems, profile, sectionCopy } from "@/content";

const firstName = profile.name.split(" ")[0] ?? profile.name;

/**
 * Site footer (Phase 10): a terminal sign-off and three status columns (focus, now, region with
 * live local time), the first name set huge as a decoding "scramble" word, then the navigation
 * repeated for long-page use, social icons, credits and back-to-top. Links are plain "/#id"
 * anchors: SmoothScroll handles them on the home page; elsewhere they navigate home.
 */
export function Footer() {
  const copy = sectionCopy.footer;
  const home = homeCopy.footer;

  return (
    <footer className="relative overflow-hidden border-t border-border bg-bg-0">
      <Container size="wide" className="flex flex-col gap-12 pt-16 pb-10">
        <div className="grid gap-10 font-mono text-[0.8125rem] lg:grid-cols-12">
          <div aria-hidden className="flex flex-col gap-1 text-text-muted lg:col-span-3">
            {home.terminal.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </div>
          <dl className="grid gap-8 sm:grid-cols-3 lg:col-span-9">
            <div className="flex flex-col gap-2">
              <dt className="text-text-muted">{home.columns.focus}</dt>
              {profile.focus.map((item) => (
                <dd key={item} className="text-text-primary">
                  {item}
                </dd>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              <dt className="text-text-muted">{home.columns.now}</dt>
              <dd className="flex items-center gap-2 text-success">
                <span aria-hidden className="size-1.5 rounded-full bg-success" />
                {home.nowLine}
              </dd>
              <dd>
                {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- plain hash link: SmoothScroll handles it on the home page */}
                <a
                  href="/#projects"
                  className="inline-flex min-h-11 items-center text-text-primary"
                >
                  <span className="link-draw">{home.viewWork}</span>
                </a>
              </dd>
            </div>
            <div className="flex flex-col gap-2">
              <dt className="text-text-muted">{home.columns.region}</dt>
              <dd className="text-text-primary">{profile.locationShort}</dd>
              <dd className="flex items-baseline gap-2 text-text-secondary">
                <LocalTime timeZone={profile.timeZone} />
                <span className="text-text-muted">{home.timeZone}</span>
              </dd>
            </div>
          </dl>
        </div>

        <p className="text-chrome -mx-1 font-display text-[clamp(4.5rem,20vw,19rem)] leading-[0.8] font-extrabold tracking-[-0.06em] uppercase select-none">
          <ScrambleText text={firstName} />
        </p>

        <div className="flex flex-col gap-8 border-t border-border pt-8">
          <nav aria-label={copy.navLabel}>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-1 sm:flex sm:flex-wrap sm:gap-x-2">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`/#${item.id}`}
                    className="flex min-h-11 items-center rounded-full text-small text-text-secondary transition-colors duration-150 hover:text-text-primary sm:px-3"
                  >
                    <span className="link-draw">{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <p className="flex flex-col gap-1 text-small text-text-muted sm:flex-row sm:gap-3">
              <span>
                © <CurrentYear buildYear={new Date().getFullYear()} /> {profile.name}
              </span>
              <span aria-hidden className="hidden sm:inline">
                ·
              </span>
              <span>{copy.credit(profile.name)}</span>
              <span aria-hidden className="hidden sm:inline">
                ·
              </span>
              <span>{copy.builtWith}</span>
            </p>
            <div className="flex items-center gap-3">
              <SocialLinks />
              <BackToTop label={copy.backToTop} />
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
