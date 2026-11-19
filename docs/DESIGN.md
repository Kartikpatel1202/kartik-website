# DESIGN.md — Kartik Patel portfolio

> **Phase 10 redesign (2026-11-16).** The site was re-styled to follow a reference video supplied
> by the user. That direction replaces the "Decision Trace" look described below wherever they
> differ:
> - **Palette:** monochrome near-black with a violet tint (`bg-0 #0c0b0f`, `bg-1 #131117`,
>   `bg-2 #1c1922`). White is the accent (white pill buttons), lavender `#c9bff0` is the
>   secondary, and green `#4ade80` marks status.
> - **Type:** heavy Geist Sans (800) for display text with a "chrome" white-to-grey gradient,
>   Geist Mono for `// label` eyebrows. Instrument Serif was removed.
> - **Page flow:** preloader → pinned, scroll-scrubbed portrait hero (three stages) → system
>   profile → technology marquee → engineering roadmap → projects carousel → build log →
>   education → live-dispatch contact → footer with a giant decoding name.
> - **Nav:** full-width bar with a "Kartik." wordmark, centred links and a "Hire Me" pill.
>
> Tokens are in `src/app/globals.css`, home copy in `src/content/home.ts`, and motion in
> `docs/MOTION.md`. Everything below is the original Phase 2 plan, kept for history.

Status: **proposal, awaiting approval** (Phase 2, 2026-11-15). Content facts come only from `docs/CONTENT.md`.

---

## A. Creative direction

### Concept 1 — "Decision Trace" ✅ chosen
- **Idea:** The page reads like one auditable pipeline run. A single hairline trace is drawn down the page as you scroll, and it lights a node at each section. The idea comes from how Kartik's systems work: intake → evaluation → checkpoint → decision, with every step logged.
- **Signature element:**
  - A scroll-scrubbed SVG trace on a fixed left rail.
  - It starts in the hero from a faint **signal field**: a 2D-canvas dot grid whose points brighten near the cursor.
  - On first load, a row of points converges into the trace's origin node once.
  - Each section's node switches from *pending* (hollow) to *passed* (filled amber) when its section is in view.
  - The trace ends at Contact in a final "decision" node.
- **Mood:** precise, calm, accountable, nocturnal, engineered.
- **Accent palette:** signal amber `#F2B55B` (primary: active states, the trace, CTAs) and verified teal `#5CCFC0` (secondary: "verified" or passed states, links in prose), on near-black graphite.
- **Typography:** Instrument Serif (display; used sparingly for the name and section titles), Geist Sans (body and UI) and Geist Mono (trace labels, metrics, eyebrows).
- **Why it fits:** His standout work is about controlled AI systems: the LLM talks while deterministic code decides, there are approval checkpoints, and decisions are auditable. The trace makes that philosophy the site's structure rather than a slogan.

### Concept 2 — "Blueprint at Night"
- **Idea:** The site is an architecture drawing. A hairline engineering grid covers the page, and every project is presented as an interactive system diagram whose boxes and connectors draw in as you scroll.
- **Signature:** Data-driven SVG architecture diagrams. Hovering a component reveals what it does and which library implements it.
- **Mood:** technical, drafted, exact.
- **Palette:** cyan `#67D3E0` and warm white `#F3EEE4` on ink `#0A0D12`.
- **Typography:** IBM Plex Sans + IBM Plex Mono.
- **Fit:** Kartik's READMEs are architecture-heavy, which suits interviewers. The weakness is that it is dense for a 10-second recruiter scan, and diagram-first sites can feel like documentation.

### Concept 3 — "Signal / Noise"
- **Idea:** The hero is a field of visual noise that resolves into Kartik's name and headline around the cursor, as a denoising metaphor for ML. The rest of the site stays quiet and editorial.
- **Signature:** A WebGL noise-to-signal shader that reacts to the pointer.
- **Mood:** experimental, scientific, quiet.
- **Palette:** phosphor `#C8F169` and paper white on charcoal.
- **Typography:** Söhne-like grotesk (Inter Tight) + JetBrains Mono.
- **Fit:** It signals AI strongly. The weakness is that the shader dominates the impression, it risks reading as a demo reel rather than engineering, and WebGL costs performance on low-end phones.

### Decision
**Decision Trace** is the strongest because its signature element encodes Kartik's actual engineering philosophy (checkpoints, verification, audit trails) instead of decorating around it. The interaction also helps navigation: the trace shows where you are and how much is left, so the motion orients the reader rather than distracting them. Visually it is a single hairline and a 2D canvas, so it is cheap enough to hold Lighthouse ≥ 90 on mobile and degrades to a static line with reduced motion. Concept 2's architecture diagrams are reused, in restrained form, inside the case-study pages.

---

## B. Design system

### B1. Color tokens

| Token | Hex / value | Use |
|---|---|---|
| `bg-0` | `#07080A` | Page background |
| `bg-1` | `#0D0F13` | Alternate section band, footer |
| `bg-2` | `#14171D` | Raised panels, code/metric wells |
| `surface` | `rgba(255,255,255,0.035)` (≈ `#181B21` on bg-1) | Glass cards |
| `surface-hover` | `rgba(255,255,255,0.06)` | Card hover |
| `border` | `#262A33` | Hairlines, card borders (decorative) |
| `border-strong` | `#3A3F4A` | Dividers, inactive trace |
| `text-primary` | `#EDEEF1` | Headings, body |
| `text-secondary` | `#A8AEBA` | Supporting copy |
| `text-muted` | `#858C99` | Meta, captions, dates |
| `accent` (signal amber) | `#F2B55B` | Trace, primary CTA, focus ring, active node |
| `accent-2` (verified teal) | `#5CCFC0` | Passed/verified states, inline links |
| `success` | `#6BD49A` | "Copied", positive metrics |
| `warn` | `#F08A6C` | Honest-limitation notes ("not run on live sites") |
| `on-accent` | `#07080A` | Text on amber/teal buttons |

Accent glows are derived from the hex values: `accent/12` and `accent-2/10` alpha.

**Contrast ratios (WCAG 2.x).** AA needs 4.5 for body text, 3.0 for large text and UI.

| Foreground \ Background | bg-0 | bg-1 | bg-2 | surface |
|---|---|---|---|---|
| text-primary `#EDEEF1` | 17.27 | 16.53 | 15.47 | 14.87 |
| text-secondary `#A8AEBA` | 9.00 | 8.61 | 8.06 | 7.74 |
| text-muted `#858C99` | 5.92 | 5.67 | 5.31 | 5.10 |
| accent `#F2B55B` | 11.01 | 10.54 | 9.86 | 9.47 |
| accent-2 `#5CCFC0` | 10.63 | 10.18 | 9.52 | 9.15 |
| success `#6BD49A` | 10.98 | 10.51 | 9.84 | 9.45 |
| warn `#F08A6C` | 8.16 | 7.82 | 7.31 | 7.03 |
| on-accent on amber / teal | 11.01 / 10.63 | — | — | — |

- Every text token passes **AA for body text** on every background. The lowest is muted on surface at 5.10.
- `border` and `border-strong` are decorative only and never the sole indicator of state.
- Focus rings use `accent`: 2px plus a 2px offset at ≥ 9.4:1, which meets WCAG 2.2 *Focus Appearance*.

### B2. Typography

| Role | Family | Loading |
|---|---|---|
| Display | **Instrument Serif** (400, 400 italic) | `@fontsource/instrument-serif` via `next/font/local`; Latin subset, `display: swap` |
| Body / UI | **Geist Sans** (variable) | `geist` package (local files via `next/font/local`) |
| Mono | **Geist Mono** (variable) | `geist` package |

This is two families plus a mono. All font files are bundled locally, so the build makes no network calls to Google Fonts. This matters on this machine, where some hosts fail TLS checks.

**Fluid scale.** Each step grows linearly from a 360px to a 1440px viewport and is capped above that, so the 1920px layout uses the max sizes inside a wider container.

| Step | Family | Size (clamp) | Line-height | Tracking |
|---|---|---|---|---|
| display (hero name) | Instrument Serif | `clamp(3rem, 1.5rem + 6.667vw, 7.5rem)` | 0.95 | -0.02em |
| h1 | Instrument Serif | `clamp(2.5rem, 1.667rem + 3.704vw, 5rem)` | 1.0 | -0.02em |
| h2 (section titles) | Instrument Serif | `clamp(2rem, 1.5rem + 2.222vw, 3.5rem)` | 1.05 | -0.015em |
| h3 (card titles) | Geist Sans 600 | `clamp(1.5rem, 1.25rem + 1.111vw, 2.25rem)` | 1.15 | -0.015em |
| h4 | Geist Sans 600 | `clamp(1.25rem, 1.125rem + 0.556vw, 1.625rem)` | 1.25 | -0.01em |
| h5 | Geist Sans 600 | `clamp(1.125rem, 1.083rem + 0.185vw, 1.25rem)` | 1.35 | -0.005em |
| h6 | Geist Sans 600 | `clamp(1rem, 0.979rem + 0.093vw, 1.0625rem)` | 1.4 | 0 |
| body-lg (lead) | Geist Sans 400 | `clamp(1.0625rem, 1rem + 0.278vw, 1.25rem)` | 1.6 | 0 |
| body | Geist Sans 400 | `clamp(1rem, 0.979rem + 0.093vw, 1.0625rem)` | 1.65 | 0 |
| small | Geist Sans 400 | `0.875rem` | 1.5 | 0.005em |
| eyebrow / trace label | Geist Mono 500, uppercase | `clamp(0.75rem, 0.729rem + 0.093vw, 0.8125rem)` | 1.4 | 0.12em |
| metric | Geist Mono 500, tabular-nums | inherits the step it sits in | 1.2 | 0 |

- Body measure is capped at 68ch.
- Serif display is never used below h2. Small sizes stay in Geist so they remain legible.

### B3. Spacing, layout, grid
- **Spacing scale (4px base):** `0, 1=4, 2=8, 3=12, 4=16, 5=20, 6=24, 8=32, 10=40, 12=48, 16=64, 20=80, 24=96, 32=128, 40=160` px. This is Tailwind's default numeric scale, so no remapping is needed.
- **Container:** `max-width: 1200px` content, `1360px` wide variant for the Projects showcase. The side gutter is `clamp(16px, 4vw, 48px)`.
  - At 1920px the container stays centred and the trace rail sits in the left margin.
- **Section rhythm:** `padding-block: clamp(80px, 6rem + 4vw, 160px)`. Heading-to-content gap is `clamp(32px, 4vw, 64px)`.
- **Grid:** 12 columns with a 24px gutter at ≥1024px; 8 columns with 20px at 768–1023px; 4 columns with 16px below 768px.
- **Breakpoints (Tailwind):** `sm 480`, `md 768`, `lg 1024`, `xl 1440`, `2xl 1920`. Layouts are checked at 360 / 768 / 1024 / 1440 / 1920.
- **Trace rail:** absolutely positioned 32px left of the container at ≥1024px. Below 1024px it collapses into a 2px progress line along the top edge, and the node numbers move into the section eyebrows.

### B4. Radius, shadow, glow, glass

| Token | Value |
|---|---|
| `radius-sm` | 6px (tags, inputs) |
| `radius-md` | 10px (buttons) |
| `radius-lg` | 16px (cards) |
| `radius-xl` | 24px (featured project panels) |
| `radius-full` | 9999px (chips, nodes) |
| `shadow-1` | `0 1px 0 0 rgba(255,255,255,0.04) inset, 0 1px 2px rgba(0,0,0,0.4)` |
| `shadow-2` | `0 1px 0 0 rgba(255,255,255,0.05) inset, 0 12px 32px -12px rgba(0,0,0,0.6)` |
| `glow-accent` | `0 0 0 1px rgba(242,181,91,0.35), 0 0 24px -4px rgba(242,181,91,0.35)` (active trace node, focused CTA) |
| `glow-accent-2` | `0 0 24px -6px rgba(92,207,192,0.30)` (verified chips on hover) |

**Glass recipe (GlassCard):**
- background: `rgba(255,255,255,0.035)`
- `backdrop-filter: blur(12px) saturate(120%)`
- border: `1px solid rgba(255,255,255,0.08)`
- inset top highlight: `shadow-1`
- noise: a 2–3% opacity tiled noise as an inline SVG data-URI on `::before` (≈ 400 bytes, no image request)
- **Fallback:** `@supports not (backdrop-filter: blur(1px))` uses solid `bg-2` (`#14171D`) with the same border, so text contrast is identical either way.
- Glass is used only where something sits over the signal field or another layer: the Nav and featured panels. Plain sections use flat `bg-1` and `bg-2`.

### B5. Motion tokens

| Token | Value |
|---|---|
| `dur-fast` | 150ms (hover, press, focus) |
| `dur-base` | 300ms (reveals, disclosure) |
| `dur-slow` | 600ms (section entrance, page transition) |
| `dur-trace` | scrubbed to scroll; intro converge is 1200ms once |
| `ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` (expo-out: entrances) |
| `ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` (state changes, layout) |
| `ease-spring` | Motion spring `{ stiffness: 300, damping: 30, mass: 0.6 }` (nav pill, filter pills). Magnetic spring-back is a CSS overshoot curve; the cursor ring uses lerp 0.18 (Phase 8). |
| `stagger-tight` | 40ms (chips, list items) |
| `stagger-base` | 60ms (cards, lists; revised from 80ms in Phase 8 for `<Stagger>`) |
| `reveal-sm` / `md` / `lg` | 12px / 24px / 40px translateY, opacity 0 → 1 |

Motion rules (full inventory with timings: docs/MOTION.md):
- Reveals run **once** per element.
- Nothing loops forever. The only continuous motion is the signal field reacting to the pointer, which rests when the pointer is idle and pauses off-screen via `IntersectionObserver` and `visibilitychange`.

**Reduced-motion policy (`prefers-reduced-motion: reduce`):**
- Lenis is disabled and native scrolling is used.
- Reveals become opacity-only over 150ms, or appear instantly.
- The trace is rendered fully drawn and static; nodes still change state from passed to active, as a colour change only.
- The signal field is replaced by a static SVG of the dot grid with no canvas and no pointer tracking.
- The intro converge animation is skipped.
- Magnetic and cursor effects are off.
- Page transitions become a cross-fade only.

Lenis and the cursor follower are also disabled on coarse pointers (touch).

### B6. Component inventory

| Component | Variants / props | Notes |
|---|---|---|
| `Button` | `primary` (amber fill, on-accent text), `ghost` (border, transparent), `magnetic` (wrapper adding spring pull within 80px, fine pointer only); `as="a"` or button; optional leading/trailing icon | Min target 44×44, visible focus ring, `aria-*` passthrough |
| `Tag` / `Chip` | `neutral`, `accent`, `verified` (teal dot), `size sm/md` | Used for stack, skills, status ("fixture-verified", "team project") |
| `SectionHeader` | `index` ("02"), `eyebrow`, `title`, `lead?` | Registers the section with the trace (id and label) |
| `GlassCard` | `as`, `interactive?` | Glass recipe with fallback; hover lifts the border to `border-strong` |
| `ProjectCard` | `featured` (large split panel: text, metrics, image) or `compact` (grid card) | Whole-card link to the case study or repo; metrics in mono |
| `TimelineItem` | role, org, dates, location, bullets, `status` | Disclosure for bullets (`<details>`-style, keyboard-accessible) |
| `SkillTile` | name, group, evidence[] | Hover or focus reveals "Used in: RazorShield, TaskPilot…" and highlights linked projects |
| `Nav` | sticky glass bar; mobile sheet | Active section synced with the trace; skip link precedes it |
| `Cursor` | dot follower + context label ("Open", "Copy") | Fine pointer only, `aria-hidden`; **never hides the system cursor** |
| `Footer` | links, build note, back-to-top | Last trace node sits above it |
| `DecisionTrace` / `TraceNode` | rail + nodes | GSAP ScrollTrigger; static under reduced motion |
| `SignalField` | canvas + static SVG fallback | Lazy-loaded after hydration on idle |
| `Container`, `Icon`, `Reveal` | layout, inline SVG icons, once-only reveal wrapper | No icon library dependency |

---

## C. Information architecture

Nav order: Work · About · Skills · Experience · Credentials · Contact. Projects come first in the nav because recruiters and managers go there first, but the page order below follows the brief.

Trace nodes run: 00 Hero → 01 About → 02 Skills → 03 Experience → 04 Projects → 05 Achievements → 06 Education → 07 Contact.

### Hero (node 00)
- **Goal:** Identity and positioning in one glance, with a path to the work.
- **5-second takeaway:** "Kartik Patel, software developer who builds full-stack products with AI at the core, VIT Chennai."
- **Desktop:**
  - Left 7 columns: mono eyebrow (role), name in display serif, positioning line (body-lg), CTAs "View work" (primary, magnetic) and "Contact" (ghost), and a meta row (Chennai · VIT Chennai · GitHub/LinkedIn icons).
  - Right 5 columns: the signal field, which bleeds behind the whole hero at low opacity and is densest on the right.
  - The trace origin node sits at the bottom-left.
- **Mobile:** single column. The name wraps to two lines, CTAs are full-width stacked, and the signal field becomes a static, shorter band behind the eyebrow.
- **Key interaction:** points in the signal field brighten near the cursor. On load, one row converges into the trace origin once.

### About (node 01)
- **Goal:** Who he is and how he builds.
- **5-second takeaway:** "He builds AI systems where the model talks and deterministic code decides, and he tests them."
- **Desktop:**
  - Left 5 columns: SectionHeader plus two short paragraphs from §2 of CONTENT.md.
  - Right 7 columns: three "build principles" as numbered rows in mono and sans, each linked to the project that proves it (Airtel-Sync, TaskPilot, RazorShield).
- **Mobile:** paragraphs first, then the principles stacked.
- **Key interaction:** each principle row reveals its proof project on hover or focus, with a link to that case study.

### Skills (node 02)
- **Goal:** Breadth with evidence, not a logo wall.
- **5-second takeaway:** "Python/TypeScript, FastAPI/Next.js, LLM agents and ML, and every skill is backed by a repo."
- **Desktop:** six groups (Languages, Frontend, Backend, Databases, AI/ML, DevOps & Tools) as columns of SkillTiles in a 3×2 grid. Group labels are mono eyebrows.
- **Mobile:** groups become horizontally scrollable chip rows with scroll-snap, or an accordion if the overflow hurts at 360px. This will be tested in Phase 4.
- **Key interaction:** focusing or hovering a skill shows its evidence ("Used in …"). Skills that are claims only, such as Java and AWS, show a "certification" marker instead.

### Experience (node 03)
- **Goal:** Real-world roles and their recency.
- **5-second takeaway:** "Currently SDE Intern at Successive Digital, with prior AI and research internships."
- **Desktop:** a vertical timeline aligned to the trace, with each TimelineItem branching off it. Left column: dates (mono). Right: role, org and bullets.
- **Mobile:** dates sit above the role, and the timeline line moves to the left edge.
- **Key interaction:** bullet lists expand and collapse. The current role is expanded by default.

### Projects (node 04)
- **Goal:** Proof of depth, which is the main event of the page.
- **5-second takeaway:** "Four substantial systems with real numbers (tests, AUC, eval results) and honest limits."
- **Desktop:**
  - Four featured panels (radius-xl, glass). Each alternates text-left/image-right: title, one-liner, three metric chips, stack tags, a status tag (e.g. "Team project", "Fixture-verified"), and "Read case study →".
  - Below them, "Other projects" in a 3-column grid of 6 compact cards that link to GitHub.
- **Mobile:** panels stack as image → text, and the compact cards go to 1 column.
- **Key interaction:** the whole featured panel is a link with a magnetic CTA. On hover the screenshot shifts slightly (scale 1.02) and the cursor shows "Open".
- **Case studies:** **yes**. Each featured project gets `/projects/[slug]` with Overview, Problem, Approach, Architecture (a data-driven SVG diagram), Engineering highlights, Results & honest limits, Stack, Links, and Next project. The other projects link straight to GitHub.

### Achievements / Credentials (node 05)
- **Goal:** Third-party validation.
- **5-second takeaway:** "AWS Solutions Architect – Associate, Oracle Java SE 17 and OCI GenAI Professional."
- **Desktop:** a 3-column card grid with issuer, title, date and a "Verify ↗" link.
- **Mobile:** 1 column.
- **Key interaction:** "Verify" opens the credential. Cards without a verification link are rendered without it, never with a fake link.

### Education (node 06)
- **Goal:** Degree and standing.
- **5-second takeaway:** "B.Tech CSE, VIT Chennai, 2023–2027, CGPA 9.15."
- **Desktop:** one wide row: institution, degree, years and CGPA in mono. School results go in a smaller secondary row only if Kartik approves them.
- **Mobile:** the row stacks.
- **Key interaction:** none (static). This is deliberate.

### Contact (node 07, the "decision" node)
- **Goal:** Convert interest into an email.
- **5-second takeaway:** "Email Kartik; he is reachable on GitHub and LinkedIn."
- **Desktop:** a large serif line, then the email as a big copy button plus a mailto link, GitHub and LinkedIn, and the résumé download if supplied. The trace ends in a filled node beside it.
- **Mobile:** the same, stacked.
- **Key interaction:** "Copy email" gives feedback ("Copied", success colour, announced via an `aria-live` region). There is no form, so no server or third-party service is needed.

---

## D. Technical architecture

### Stack and rationale

| Choice | Why |
|---|---|
| **Next.js 16 (App Router) + `output: "export"`** | File-based routes for case studies via `generateStaticParams`; Metadata API, `sitemap.ts`, `robots.ts` and `opengraph-image` are all statically generated; RSC means content sections ship zero JS unless they are interactive. No server is needed. |
| **TypeScript 6.0 strict** | TS 7 (the Go port) is newest, but typescript-eslint still requires `<6.1`. 6.0.3 keeps lint and typecheck in one toolchain. Also `noUncheckedIndexedAccess` and `exactOptionalPropertyTypes`. |
| **Tailwind CSS v4** | CSS-first `@theme` maps the tokens above directly to utilities (`bg-bg-1`, `text-text-muted`, `ease-out-expo`). No config file, and small output. |
| **Motion (`motion/react`, formerly Framer Motion)** | Component-level, state-driven animation: reveals, disclosure, magnetic button, cursor follower, page transitions, `useReducedMotion`. |
| **GSAP + ScrollTrigger** | Only for scroll-**scrubbed** work: drawing the trace path and switching node states. It is the most robust tool for this, is free, and is loaded only in the client component that needs it. |
| **Lenis** | Smooth wheel scrolling, synced with ScrollTrigger. Disabled for reduced motion and touch. Anchor links go through `lenis.scrollTo` with focus management. |
| **2D canvas (not WebGL)** for the signal field | A dot grid needs no shaders. Canvas 2D is about 3 KB of code, has no GPU context cost, and works on low-end phones. It loads with `next/dynamic` (`ssr:false`) after `requestIdleCallback`, with a static SVG first paint. |
| **Content in typed TS** (`src/content/*.ts`) | Generated by hand from CONTENT.md. Each item carries `source` and `status: "confirmed" | "unconfirmed"` so provenance survives into code. |
| **Fonts via `geist` + `@fontsource/instrument-serif` through `next/font/local`** | Self-hosted, preloaded, and no layout shift. |
| **Inline SVG icons** | Avoids an icon library dependency for about 8 icons. |

**Boundary between the motion libraries:**
- **Motion** owns anything triggered by component state or by an element entering the viewport once: hover, focus, press, reveal, expand, page change.
- **GSAP** owns anything whose progress is a *function of scroll position*. Only the trace, and optionally case-study architecture diagrams drawing in.
- **Lenis** only changes how scroll position moves. It never animates elements.
- No element is animated by both Motion and GSAP.
- A single `MotionProvider` reads `prefers-reduced-motion` and `pointer: fine` once and exposes them to all three.

**Performance budget:**
- First-load JS for `/`: the Next 16 + React 19 framework baseline alone is about 165 KB gzip, so the original 130 KB target is not reachable on this stack. **Revised (Phase 4):** our own code adds ≤ 60 KB gzip on top of the framework (measured at about 52 KB: Lenis, lightweight `m` components, nav and hero). Motion features load lazily through `LazyMotion`; GSAP and the canvas are split out and deferred.
- LCP element is the hero name (text, with a preloaded font).
- CLS is under 0.02 (fonts use `size-adjust` fallbacks from `next/font`).
- Images are pre-sized WebP/AVIF in `public/`, because `next/image` optimization is unavailable under static export. They use `next/image` with `unoptimized` and explicit width and height.

**SEO:**
- Per-page metadata, canonical URLs, and Open Graph/Twitter cards.
- JSON-LD `Person` on `/` and `CreativeWork` on case studies.
- `sitemap.xml`, `robots.txt` and `manifest.webmanifest`.
- The site URL comes from the build-time `SITE_URL` variable (see `.env.example`; renamed from `NEXT_PUBLIC_SITE_URL` in Phase 9, since it is only read at build time). **There is no domain yet**, so it defaults to `http://localhost:3000` until he decides on one.

### Folder structure

```
D:\Kartik_Portfolio
├─ docs/
│  ├─ CONTENT.md
│  └─ DESIGN.md
├─ public/
│  ├─ images/projects/<slug>/{cover,shot-1,…}.{avif,webp}
│  ├─ og/default.png
│  └─ resume/                       # Kartik's PDF when supplied
├─ scripts/
│  └─ check-content.ts              # lists every `unconfirmed` item; run before release
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx                 # fonts, metadata base, MotionProvider, Nav, Footer, SkipLink
│  │  ├─ page.tsx                   # composes the 8 sections
│  │  ├─ globals.css                # @import tailwind; @theme tokens; base, focus, reduced-motion
│  │  ├─ not-found.tsx
│  │  ├─ icon.svg
│  │  ├─ opengraph-image.tsx        # static at build
│  │  ├─ sitemap.ts
│  │  ├─ robots.ts
│  │  ├─ manifest.ts
│  │  └─ projects/[slug]/
│  │     ├─ page.tsx                # case study; generateStaticParams from content
│  │     └─ opengraph-image.tsx
│  ├─ components/
│  │  ├─ primitives/  Button.tsx  MagneticButton.tsx  Tag.tsx  SectionHeader.tsx  GlassCard.tsx  Container.tsx  Icon.tsx
│  │  ├─ layout/      Nav.tsx  MobileNav.tsx  Footer.tsx  SkipLink.tsx
│  │  ├─ motion/      MotionProvider.tsx  SmoothScroll.tsx  Reveal.tsx  Cursor.tsx
│  │  ├─ trace/       DecisionTrace.tsx  TraceNode.tsx  useTraceSections.ts
│  │  ├─ hero/        SignalField.tsx  SignalFieldStatic.tsx
│  │  ├─ sections/    Hero.tsx  About.tsx  Skills.tsx  Experience.tsx  Projects.tsx  Achievements.tsx  Education.tsx  Contact.tsx
│  │  ├─ projects/    ProjectCard.tsx  MetricChip.tsx  CaseStudyHeader.tsx  ArchitectureDiagram.tsx  CaseStudySection.tsx  ProjectPager.tsx
│  │  ├─ experience/  TimelineItem.tsx
│  │  ├─ skills/      SkillTile.tsx  SkillGroup.tsx
│  │  └─ contact/     CopyEmailButton.tsx
│  ├─ content/
│  │  ├─ types.ts                   # Profile, Skill, Role, Project, Credential, Education, Source, Status
│  │  ├─ profile.ts  about.ts  skills.ts  experience.ts  projects.ts
│  │  ├─ credentials.ts  education.ts  contact.ts  navigation.ts
│  │  └─ index.ts
│  ├─ lib/
│  │  ├─ cn.ts                      # clsx wrapper
│  │  ├─ motion.ts                  # duration/easing/stagger tokens as TS constants
│  │  ├─ gsap.ts                    # registers ScrollTrigger once, client-only
│  │  ├─ site.ts                    # site URL, metadata helpers, JSON-LD builders
│  │  └─ hooks/  usePrefersReducedMotion.ts  useFinePointer.ts  useActiveSection.ts
│  └─ fonts.ts                      # next/font/local declarations
├─ eslint.config.mjs
├─ next.config.ts                   # output: "export", images.unoptimized, trailingSlash
├─ postcss.config.mjs
├─ prettier.config.mjs
├─ tsconfig.json
├─ lighthouserc.json                # Phase QA: assertions for the four targets
└─ package.json
```

### Dependencies (pinned exact versions, checked on npm 2026-11-15)

**Runtime**

| Package | Version | Purpose |
|---|---|---|
| next | 16.4.6 | Framework |
| react / react-dom | 19.3.1 | UI |
| motion | 14.14.0 | Component animation |
| gsap | 3.15.1 | ScrollTrigger (trace) |
| @gsap/react | 2.1.2 | `useGSAP` cleanup hook |
| lenis | 1.3.27 | Smooth scroll |
| geist | 1.9.2 | Geist Sans and Mono font files |
| @fontsource/instrument-serif | 5.3.0 | Display font files |
| clsx | 2.1.1 | Class composition |

**Dev**

| Package | Version | Purpose |
|---|---|---|
| typescript | 6.0.3 | Typecheck (7.x blocked by typescript-eslint peer `<6.1`) |
| @types/react / @types/react-dom | 19.3.0 / 19.3.0 | Types |
| @types/node | 24.19.2 | Matches local Node 24 |
| tailwindcss / @tailwindcss/postcss | 4.3.5 / 4.3.5 | Styling |
| eslint | 9.39.5 | Lint (10.x blocked by eslint-plugin-react peer `^9.7`) |
| eslint-config-next | 16.4.6 | Next, React, hooks, jsx-a11y and TS rules |
| prettier / prettier-plugin-tailwindcss | 3.10.1 / 0.8.1 | Formatting and class order |
| @lhci/cli | 0.16.1 | Local Lighthouse CI runs (QA phase only; uses installed Chrome) |
| tsx | (pin at install) | Runs `scripts/check-content.ts` |

Everything is installed locally. There are no global installs.

### Open questions (defaults chosen if no answer)
1. **Unconfirmed content:** experience, certifications and education are Kartik's own claims and not yet confirmed. **Default:** render them, mark them `unconfirmed` in the data, and have `npm run check:content` list them so nothing ships unconfirmed without a conscious choice.
2. **Domain:** needed for canonical URLs, the sitemap and OG images. **Default:** a placeholder env var.
3. **Screenshots:** TaskPilot and AgenticAiSafety have none. **Default:** the featured panel uses a typographic or diagram cover (architecture SVG) until real shots exist.
4. **Lingo:** it closely mimics Duolingo's look. **Default:** describe it as "Duolingo-style" and use no Duolingo brand imagery in screenshots.
