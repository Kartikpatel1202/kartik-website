# QA report

## Phase 10 redesign (2026-11-16)

These checks ran against the production build after the redesign.

- **axe (WCAG 2.2 AA plus best practices):** 0 violations on all 6 routes, desktop and mobile.
  Fixed during QA: carousel slide roles, and the order and nesting of the About stats list.
- **Keyboard:** logical order and visible focus on every stop, contact fields included. Fixed: an
  input `focus:outline-none` hid the ring. The mobile menu traps focus, closes on Escape and
  returns focus.
- **Responsive:** 48 combinations (6 routes × 8 viewports, including landscape and 200% zoom),
  with 0 horizontal overflow and no targets under 44px. The exception is the 24px consent
  checkbox, which passes WCAG 2.5.8 and sits inside a 44px clickable label row. Fixed: the About
  card's glow overflowed by 8px at 360 and 390, the hero portrait collapsed on phones, and the
  carousel links were 40px on scaled cards.
- **Interactions** (`scripts/qa/interactions.mjs`): 13/13 pass.
  - Preloader once per session; hero stages follow the scrub and the camera rotates; the stage
    stays pinned.
  - Marquee pauses on hover; carousel arrows and mouse drag work. Fixed: drag used to snap back.
  - Contact: errors on empty submit with focus on the first field; the live payload mirrors the
    form; a valid submit copies the message and opens LinkedIn (stubbed in tests).
  - The footer name settles; no console errors.
- **Cross-browser:** Chromium, Firefox, WebKit and Edge load every route with no errors.
- **Lighthouse** (median of 3, default settings, mobile at 4× CPU):

| | Perf | A11y | BP | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| Mobile · home | 87 (56/87/89) | 100 | 100 | 100 | 3.3 s* | 0.001 | 260 ms |
| Mobile · case study | **100** | 100 | 100 | 100 | 0.9 s | 0.001 | 70 ms |
| Desktop · home | **99** | 100 | 100 | 100 | 0.6 s | 0.001 | 20 ms |
| Desktop · case study | **100** | 100 | 100 | 100 | 0.3 s | 0.024 | 10 ms |

\* The mobile-home LCP element is the hero portrait. It is preloaded with `fetchpriority=high` and
finishes downloading about 36 ms into the load; the observed render delay is about 190 ms. The 3.3 s
is Lighthouse's simulation charging script work to that paint on this slow host (benchmark index
569, see below).

---

# Phase 9 (hardening)

Measured on 2026-11-16, locally, against the production export (`npm run build`, then the static
server on port 4173). Every check is a script in `scripts/qa/`. Their output (screenshots,
JSON, Lighthouse HTML reports) goes to `qa/`, which is gitignored.

| Script | What it checks |
|---|---|
| `responsive.mjs` | Full-page screenshots of 6 routes × 8 viewports (360, 390, 768, 1024, 1440, 1920, landscape 844×390, 200% zoom). Also checks horizontal overflow, targets under 44px and line length. |
| `a11y.mjs` | axe-core, WCAG 2.0/2.1/2.2 A + AA plus best practices, every route, desktop and mobile (motion on and off) |
| `keyboard.mjs` | Tab walk on every route, focus visibility, heading outline, landmarks, `lang`, alt text, unnamed controls, mobile-menu focus trap and Escape |
| `browsers.mjs` | Chromium, Firefox, WebKit (the Safari engine) and Microsoft Edge: load, console errors, h1, overflow, images, anchor scrolling |
| `lighthouse.mjs` | Mobile and desktop Lighthouse on home and one case study. 3 runs each, median reported. `LH_CPU` sets the mobile CPU slowdown |
| `inp.mjs` | Interaction latency (Event Timing) for both filters and the mobile menu at 4× CPU |
| `trace.mjs` | Main-thread profile of one route (used to find the hydration and paint costs below) |

Tooling is all local dev dependencies, pinned:
- `playwright`, with browsers installed into `.cache/ms-playwright` in the workspace
- `@axe-core/playwright`, `lighthouse`, `chrome-launcher`, `@next/bundle-analyzer`, `subset-font`

Edge is the system install, driven through Playwright's `msedge` channel.

### Contact delivery (2026-11-16)

- Submissions are emailed straight to kartikpatel06471@gmail.com through FormSubmit's AJAX endpoint (`src/lib/contact.ts`), posting to the inbox's FormSubmit alias rather than the bare address, with no key needed. FormSubmit asks for activation once per website (localhost, then the live domain): the first submission sends one "Activate Form" email, and until it is clicked the form shows a "being set up" notice with a `mailto:` fallback. Optional: `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` in `.env.local` switches to Web3Forms.
- Fields: first/last name, email, subject, message, all streamed into `payload.json`. Badge states: Live → Sending (amber, fields disabled) → 200 OK — Delivered (form reset, confirmation) or Error (inline message with a prefilled `mailto:` link).
- `scripts/qa/interactions.mjs` stubs both providers (no real mail is sent): 15/15 pass. The failure path was checked by hand with a stubbed 500.
- axe: 0 violations; no horizontal overflow at 320, 390, 768 or 1440 px.

### Projects ring (2026-11-18)

- Featured projects now sit on an auto-rotating 3D ring (`ProjectCarousel`, `ProjectVisual`), modelled on Kartik's reference video. Auto-rotation meets WCAG 2.2.2 with a visible Pause/Play control, and also pauses on hover, focus, off-screen and in hidden tabs; it is off under reduced motion.
- Only the front slide is exposed to assistive tech; side slides are `aria-hidden` with their links removed from the tab order, and a click on one brings it to the front. Arrow keys turn the ring when focus is inside it.
- `scripts/qa/interactions.mjs`: 17/17 pass (auto-rotation, arrows, hover pause and drag added). axe: 0 violations. No horizontal overflow at 390 or 1440 px.

### Voice intro (added and removed 2026-11-19)

- An automatic spoken welcome (browser speech synthesis, once per session) was added and then removed at Kartik's request: the synthetic voice did not sound like him. If he records his own intro, the plan is a click-to-play "Hear my intro" control, not autoplay.

## Results

### Lighthouse

**Before** (single runs, start of the phase):

| | Perf | A11y | BP | SEO | FCP | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|---|
| Mobile · home | **39** | 100 | 100 | 100 | 2.9 s | **9.4 s** | 0.009 | 2,710 ms |
| Mobile · case study | 77 | 100 | 100 | 100 | 3.1 s | 3.1 s | 0 | 420 ms |
| Desktop · home | 96 | 100 | 100 | 100 | — | 1.4 s | 0 | 20 ms |
| Desktop · case study | 94 | 100 | 100 | 100 | — | 0.4 s | **0.148** | 10 ms |

**After**, Lighthouse defaults (mobile = 4× CPU slowdown; median of 3; per-run scores in brackets):

| | Perf | A11y | BP | SEO | FCP | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|---|
| Mobile · home | 71 (61/71/71) | 100 | 100 | 100 | 0.9 s | 0.9 s | 0 | 2,390 ms |
| Mobile · case study | 74 (74/74/75) | 100 | 100 | 100 | 0.9 s | 0.9 s | 0 | 1,580 ms |
| Desktop · home | 86 (82/86/88) | 100 | 100 | 100 | 0.5 s | 0.5 s | 0 | 310 ms |
| Desktop · case study | **97** (97/98) | 100 | 100 | 100 | 0.4 s | 0.4 s | 0.04 | 140 ms |

**After**, mobile CPU slowdown calibrated to this machine (1.5×, see the note below):

| | Perf | A11y | BP | SEO | FCP | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|---|
| Mobile · home | 86 (64/86/88) | 100 | 100 | 100 | 0.9 s | 0.9 s | 0.009 | 530 ms |
| Mobile · case study | **94** (93/94/96) | 100 | 100 | 100 | 1.0 s | 1.0 s | 0.011 | 300 ms |
| Desktop · home | 87 (83/87/87) | 100 | 100 | 100 | 0.4 s | 0.4 s | 0 | 300 ms |
| Desktop · case study | **98** (95/98/99) | 100 | 100 | 100 | 0.4 s | 0.4 s | 0.04 | 120 ms |

#### Why the "before" and "after" TBT are not directly comparable

The baseline server sent HTML uncompressed, so first paint came at 2.9 s and most of the hydration
work finished before it. TBT only counts blocking time after first paint, so that work was hidden.
Once the server compressed HTML, first paint moved to 0.9 s and the same work became visible as
TBT.

#### Why a calibrated run is included

This machine scores a Lighthouse benchmark index of 569 (Intel i7-1185G7, 4 cores). Lighthouse
prints its own warning: "The tested device appears to have a slower CPU than Lighthouse expects".
Its slow-host threshold is 1000.

The default 4× mobile slowdown is calibrated for hosts around 1500, which models a phone at about
1500 ÷ 4 ≈ 375. On a 569 host, 4× models a device about 1.5× slower than intended. The calibrated
multiplier, 569 ÷ 375 ≈ 1.5, follows Lighthouse's throttling documentation (cpu-throttling,
calibrating multipliers).

Both sets are reported. The default numbers are the conservative ones. Desktop runs are never
CPU-throttled, so the desktop TBT is this machine's real blocking time.

### Against the targets

| Target | Result |
|---|---|
| Performance ≥ 90 | **Met:** desktop case study (97). **Met calibrated:** mobile case study (94), desktop case study (98). **Not met:** home page, at 86–87 (desktop, calibrated mobile) and 71 (default mobile). Cause and next steps under "Remaining gaps". |
| Accessibility ≥ 95 | **100** on every run |
| Best Practices ≥ 95 | **100** on every run |
| SEO = 100 | **100** on every run |
| LCP < 2.5 s | **0.4–1.0 s** everywhere (was 9.4 s on mobile home) |
| CLS < 0.05 | **≤ 0.04** everywhere (was 0.148 on the desktop case study) |
| INP < 200 ms | Lab proxy only; INP needs real users. At 4× CPU the worst event is 336–504 ms for a filter click and 288–344 ms for the mobile menu. Scaled to the calibrated 1.5× that is about 110–190 ms. |

### Accessibility (WCAG 2.2 AA)

- **axe:** 0 violations on all 6 routes, desktop and mobile, before and after.
- **Keyboard:**
  - Tab order runs skip link → brand → nav → content → footer on every route.
  - Focus is visible at every stop: 2px accent outline, 9:1 or better.
  - The skip link appears on focus (top 12px, 44px tall) and moves focus to `<main>`.
  - No focus traps, except the open mobile menu. It keeps focus inside, closes on Escape and
    returns focus to the toggle.
- **Structure:**
  - One h1 per page, no skipped heading levels.
  - Landmarks: one banner header, labelled navs (Primary, Footer, "More case studies"), one
    `main`, one `footer`.
  - `lang="en"`, every image has alt text, and no control lacks an accessible name.
  - `aria-current` is set on the active nav item.
- **Contrast:** every text token on every background token passes AA. The lowest pair is muted
  text on the raised surface (5.31:1).

| Text | on bg-0 | on bg-1 | on bg-2 |
|---|---|---|---|
| text-primary | 17.27 | 16.53 | 15.47 |
| text-secondary | 9.00 | 8.61 | 8.06 |
| text-muted | 5.92 | 5.67 | 5.31 |
| accent (amber) | 11.01 | 10.54 | 9.86 |
| accent-2 (teal) | 10.63 | 10.18 | 9.52 |
| success | 10.98 | 10.51 | 9.84 |
| warn | 8.16 | 7.82 | 7.31 |
| on-accent text on accent fill | 11.01 | — | — |

### Responsive

- **Overflow:** none at any viewport on any route (48 combinations, including landscape phone and
  200% zoom).
- **Targets:** none under 44px after the fixes (there were 23 before).
- **Lines:** none over about 75 characters after the fix below.
- **Visual review:** of the key crops (landscape hero, 200% zoom, 1920 hero, 360 case study), no
  overlapping text and no badly cropped images. The faint horizontal band in some full-page
  screenshots is the fixed background being painted once by the screenshot tool, not a real seam.

### Cross-browser

| Browser | Routes | Errors | Notes |
|---|---|---|---|
| Chromium 159 (Chrome) | 6/6 | 0 | Anchor smooth-scroll works |
| Firefox 159 | 6/6 | 0 | |
| WebKit 27.2 (Safari engine) | 6/6 | 0 | No `requestIdleCallback`; the timeout fallback is used |
| Edge 157 (system install) | 6/6 | 0 | |

The 404 route logs its own expected 404 status, and nothing else.

### SEO

- **Metadata:**
  - title template `%s · Kartik Patel`, description, canonical
  - keywords: the name, the verified roles and the "daily driver" skills (5 or more repositories)
  - authors and creator; Open Graph with `url`; Twitter `summary_large_image`
- **Social images:** dynamic `next/og` images for home and each case study (project name plus
  stack). X falls back to `og:image`, so no separate `twitter-image` route is needed.
- **JSON-LD:**
  - Home: `Person` with name, jobTitle, url, image, address, alumniOf, and `sameAs` for GitHub and
    LinkedIn.
  - Each case study: `SoftwareSourceCode` (a CreativeWork subtype) with codeRepository,
    programmingLanguage and author.
- **Files:** `sitemap.xml`, `robots.txt` (disallows `/dev/`) and `manifest.webmanifest` (any and
  maskable icons).
- **Icons:** `icon.svg` plus a 32px `icon.png`, a 180px `apple-icon.png`, `theme-color`.
- **Site URL:** comes from the build-time `SITE_URL` variable (`.env.example`; default
  `http://localhost:3000`). No production domain is hard-coded. It was renamed from
  `NEXT_PUBLIC_SITE_URL`, because it is only read at build time.

## Issues found and fixes

### Performance

| # | Issue | Fix | Effect |
|---|---|---|---|
| 1 | Mobile LCP 9.4 s. The LCP element (hero positioning paragraph) faded in from opacity 0 after a 550 ms delay, so Chrome counted it only once hydration had finished. | The hero name and that paragraph rise in with transform only; elements fade only where they cannot be LCP. | LCP 9.4 s → 0.9 s |
| 2 | Desktop case-study CLS 0.148. Geist Sans was not preloaded, and its late swap re-wrapped the intro and pushed the meta row down. | Preload Geist Sans as well as Instrument Serif. | CLS 0.148 → 0.04 |
| 3 | Fonts were full files (68–70 KB each). An unused italic serif was being preloaded. | Subset to Latin plus the symbols the site uses (`scripts/subset-fonts.mjs`, variable axes kept). Dropped the italic. | Sans 68 → 32 KB, mono 70 → 33 KB, serif 21 → 19 KB; one fewer preload |
| 4 | The hero canvas ran on touch devices, where it only spends main-thread time (it reacts to the pointer). | Canvas on fine pointers only; touch gets the static dot grid. | Less main-thread work on mobile |
| 5 | GSAP and ScrollTrigger (44 KB) loaded during page load on every device. | `loadGsap()` runs when a scroll animation is within a viewport (`whenNear`); Lenis starts on idle. | Off the load path |
| 6 | Motion's feature bundle (~100 KB) loaded at once. | Loaded on idle (`onIdle`); `m.*` render statically until then. | Off the load path |
| 7 | The cursor was in the first-load bundle. | `next/dynamic`, client only. | Off the load path |
| 8 | Each `<Reveal>` was its own client component (dozens hydrated). | `Reveal` is now a server component; one `RevealObserver` handles every reveal. | Fewer client islands |
| 9 | About 50 skill tiles and 7 project cards mounted Motion components and layout projection at load. | Plain `<li>`s until the first filter click; Motion only after that. | About −0.3 s React work at 4× |
| 10 | Each code-window token was its own React element (hundreds of nodes). | One static HTML string per code block (all text escaped). | Hydration skips those nodes |
| 11 | Skill logo path data was inlined twice, in the HTML and in the RSC payload (67 KB). | One cached SVG sprite (`/skill-logos.svg`) used through `<use>`. | Home HTML 392 → 309 KB raw (70 → 38 KB gzip) |
| 12 | The 6px blur animation on the hero letters repainted the main thread every frame during load. | Removed (transform-only rise). | About −250 ms paint at 4× |
| 13 | The local server sent no compression and no cache headers, so Lighthouse measured that. | `scripts/serve.mjs` now gzips text and sets immutable caching for `/_next/static/`, like a static host. | Home transfer 334 → 39 KB |
| 14 | Images were plain `<img>`. | `next/image` with a custom loader (`src/lib/imageLoader.ts`) that maps srcset widths to the pre-generated WebP files. `sizes` everywhere, blur placeholder, `preload` (the Next 16 replacement for `priority`) only on the case-study hero image. | Correct srcset; one preloaded LCP image |
| 15 | Filter clicks blocked the next paint (about 800 ms at 4×), because a whole-list re-render and the shared-layout (`layoutId`) underline measured every tile. | `useDeferredValue` plus memoised lists, so chips paint first. A transform-only `TabIndicator` replaces the `layoutId` underline. The project chips use a plain colour change. | About 800 → 336–504 ms at 4× |
| 16 | Next.js 16.4.6 on Windows writes prefetch segment files into nested folders, while the router asks for dotted names. Every link prefetch returned 404. | `postbuild` script `scripts/fix-segment-files.mjs` renames them; it does nothing on macOS or Linux builds. | 0 failed requests; client navigation verified |

### Accessibility and responsive

| # | Issue | Fix |
|---|---|---|
| 17 | Targets under 44px: skip link (42), project filter chips (36), "View these lines on GitHub" (21), nav Contact button (40) | `min-h-11` on each. The link-style button keeps its underline on the text only. |
| 18 | Featured-project text ran about 90+ characters per line on landscape phones and tablets (single column, full width) | Capped at `max-w-prose` below the two-column breakpoint |
| 19 | (Checker false positives) Stretched card links were measured at their text size; long-line checks counted whole grid rows | The checker measures the card a stretched link covers, and only leaf text blocks for line length |

No axe violations were found before or after. The keyboard walkthrough found no problems; the one
flag, the skip link, was a measurement taken mid-slide and checked out once re-tested.

## Bundle analysis (`npm run analyze`, webpack build)

| Package | gzip | Status |
|---|---|---|
| next | 241 KB | Framework, needed |
| react-dom | 64 KB | Framework, needed |
| gsap (core + ScrollTrigger) | 44 KB | Kept: drives the signature timeline, parallax and Lenis sync. Never in first load. |
| framer-motion + motion-dom | 59 KB | Kept: filters, mobile menu, nav pill, page fade. The ~100 KB feature bundle loads on idle. |
| lenis | 5 KB | |

First-load JS is 221.6 KB gzip on home and 213.1 KB on a case study. Of that, the framework is
about 165 KB. Nothing over 30 KB that isn't needed remains on the first-load path.

## Remaining gaps

- **Home page performance (86–87 desktop and calibrated mobile, 71 default mobile).**
  - **Cause:**
    - First paint and LCP are already under 1 s; the score is held back by Total Blocking Time.
    - That time is React hydrating a 1,700-node page on a slow CPU. A home page with only the hero
      section measures about 520 ms of React work at 4×, against about 1,390 ms for the full page,
      so each section adds a share.
  - **Options with real impact, in order:**
    - Render more of the static content (featured-project text, case-study bodies) as
      non-hydrated HTML.
    - Move the skills explorer to a CSS-only filter (radio inputs and `:has()`), animated with the
      View Transitions API.
    - Re-measure on a faster host, or in CI.
- **INP needs real users.** The lab proxy is above.
- **The 0.04 desktop case-study CLS** is within target but not zero. It is one small shift in the
  hero meta row.
