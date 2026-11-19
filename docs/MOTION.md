# Motion

Every animation on the site, with its timing, trigger and owner. Tokens come from DESIGN.md §B5
(`src/lib/motion.ts` for Motion/GSAP, CSS variables in `src/app/globals.css`).

**Tokens:** fast 150ms · base 300ms · slow 600ms · ease-out `cubic-bezier(0.16, 1, 0.3, 1)` ·
ease-in-out `cubic-bezier(0.65, 0, 0.35, 1)` · spring `{ stiffness 300, damping 30, mass 0.6 }` ·
stagger 40ms (tight) / 60ms (base) · reveal rise 12 / 24 / 40px.

**Rules:** transform and opacity only (blur only on glyph-sized elements) · nothing loops forever ·
every primitive is static under `prefers-reduced-motion: reduce` · no animation moves layout
(measured CLS 0 on load and while hovering).

## Phase 10 redesign (current)

The redesign follows the user's reference video. Where this section and the older sections below
disagree, this section wins. The canvas hero, the role cycler, the split-text name, the scroll
cue, the skills filter, the featured-project rows and their parallax were removed.

| Animation | Timing | Trigger | Implementation |
|---|---|---|---|
| **Preloader.** "Initializing system", name, % counter and progress bar, then the panel slides up. | Counter eases toward real signals (fonts ready 45%, hero portrait decoded 75%, window load 100%); shown at least 0.9s, at most 2.6s; slide-up 750ms. Once per browser session; skipped before paint under reduced motion. CSS and timer failsafe at 4.5s. | First load | `Preloader.tsx` (rAF), CSS |
| **Hero scrub timeline** (signature 1). The section is pinned for 3 viewports; scroll progress picks the stage. The headline, label and text cross-fade (500ms, 0.4em rise from an 8px blur), and a 3-segment timeline bar fills. | Scrubbed: stages at progress thirds | Scroll | `ScrubStage.tsx` (rAF on scroll) + CSS |
| **Portrait camera.** The cut-out portrait turns (rotateY 0° → −9° → 8° → 0°), scales (1 → 1.12) and shifts, while a separate key-light layer moves. Transform only. | Smoothstep between 4 keyframes | Scroll | CSS variables from `ScrubStage` |
| **Hero intro after the preloader.** Greeting, then headline (transform only, as the LCP text), stage text and CTAs. | 0 / 120 / 300 / 450ms, 600ms each | `html.intro-go` | CSS keyframes |
| **Technology marquee.** Two rows of chips, opposite directions. | ~3.2s per chip per loop | Continuous, by design: the user asked for the reference's marquee | CSS; pauses on hover; static wrapped grid under reduced motion |
| **Roadmap cards.** Slight 8° perspective tilt (xl); a card lifts 8px and its glow brightens on hover. | 500ms | Hover | CSS |
| **Projects carousel.** Snap scrolling; the centred card is raised (scale 1 vs 0.92, glow). Arrows smooth-scroll; mouse drag. | 500ms card state; native smooth scroll | Scroll, drag, arrows | `ProjectCarousel.tsx` + CSS |
| **About portrait card.** Pointer tilt (max 6°) and border spotlight. | 160ms follow / 700ms settle | Hover | `TiltFrame` + shared spotlight |
| **Live payload.** The terminal mirrors the form as you type. | Instant | Input | React state |
| **Footer name decode** (signature 3, "delight"). Letters cycle through random glyphs and lock in left to right. | 1.1s, once | Enters view | `ScrambleText.tsx` (rAF); static under reduced motion |
| **Nav active pill** (signature 2 is now the hero scrub). | Spring | Active section | Motion `layoutId` |

Kept from earlier phases: reveals, stagger, magnetic buttons, button sheen, drawn underlines, card
spotlights, the custom cursor, the build-log timeline draw, case-study diagram draw and page fade.

## Signature moments (Phase 8, superseded)

| # | Moment | Timing | Trigger | Library |
|---|---|---|---|---|
| 1 | **Hero intro.** Eyebrow, then name characters, role, positioning, CTAs, proof strip. | Eyebrow 0ms; name characters from 80ms, 35ms apart, 600ms each (0.3em rise, transform only); role 450ms; positioning 550ms; CTAs 650ms; proof 750ms; each a 600ms, 12px rise. **Ends at 1.35s.** The canvas sweep (1.1s × 1.25) ends by about 1.4s. | Page load, once | CSS keyframes (`.split-unit`, `.intro`) + canvas |
| 2 | **Build-log timeline draw.** The amber line scales from 0 to 1 and each node lights as the line reaches it. | Scrubbed (scrub 0.6s) from "top 70%" to "bottom 65%"; nodes switch at "top 68%"; node colour 300ms | Scroll | GSAP ScrollTrigger |
| 3 | **Nav active pill.** The pill slides between links as sections change. | Spring | Active section change | Motion `layoutId` |

Phase 9 performance changes:
- The hero name and positioning paragraph rise with transform only (no fade, no blur), so the LCP text is painted in the first frame.
- Reveals run from one shared observer.
- Motion's features load on idle.
- GSAP loads when a scroll animation is about to be needed.

See docs/QA-REPORT.md.

## Orientation and reveal

| Animation | Timing | Trigger | Library |
|---|---|---|---|
| `<Reveal>`: fade + rise (12/24/40px), optional 4px blur on text-sized items | 600ms ease-out, once | 20% visible (or filling 20% of the viewport) | IntersectionObserver + CSS transition |
| `<Stagger>`: children revealed one after another | 60ms apart | As Reveal | Wraps Reveal |
| Page change fade (client navigation only) | 300ms ease-in-out, opacity | Route change | Motion |
| Scroll cue dot travels down its line | 1.8s × 3, starts at 1.6s, then rests; fades out after the first scroll | Load | CSS |
| Role cycler: each role shown once, rests on the first | 300ms swap (opacity + 0.45em), first at 1.8s, then every 2.4s | Load, once | Motion |
| Project screenshot parallax inside its frame | ±4% translateY, scrubbed | Scroll | GSAP (`<Parallax>`) |
| Architecture diagram connectors draw in | 900ms each, 90ms apart; arrowheads fade in 400ms after | Diagram revealed | CSS (stroke-dashoffset) |
| Nav hides on scroll down, returns on scroll up | 300ms ease-out | Scroll direction | CSS transition |
| Mobile menu: backdrop fade, then links rise 24px | 300ms; links 600ms, 60ms apart | Menu open | Motion |
| Smooth scrolling (Lenis, lerp 0.12) | Continuous while scrolling | Wheel / anchor links | Lenis on GSAP's ticker |

## Feedback

| Animation | Timing | Trigger | Library |
|---|---|---|---|
| **Custom cursor:** 6px dot on the pointer; 34px ring follows (lerp 0.18). Ring 1.5× over interactive elements, 2.4× accent disc with a label ("View", "Open") over `data-cursor`, 0.85× on press | Ring scale 300ms; label 150ms; loop stops once the ring settles | Pointer | rAF (`Cursor.tsx`) |
| **Magnetic buttons** (primary and ghost): pull toward the pointer, max 12px | Follows in 120ms; springs back in 550ms with slight overshoot | Pointer over | CSS `translate` + delegated listener (`PointerEffects`) |
| **Primary-button sheen** sweeps once across | 700ms ease-out | Hover / focus-visible | CSS |
| **Link underline** draws from the left (over a faint resting line) | 300ms ease-out | Hover / focus-visible | CSS (`.link-draw`) |
| **Card border spotlight** follows the pointer (`--x`/`--y`) | Fades in 300ms | Pointer over `[data-spotlight]` | CSS + delegated rAF listener |
| **Project visual tilt** (max 6°) | Follows in 160ms, settles back in 700ms | Pointer over | rAF (`TiltFrame`) |
| Press feedback on every control | `scale: 0.97` (instant) | `:active` | CSS |
| Skill filter underline slides to the active tab (translateX + scaleX) | 300ms ease-out | Filter click | CSS (`TabIndicator`) |
| Project filter chips: active chip fills with accent | 150ms | Filter click | CSS |
| Skill tiles and project cards reflow, enter and exit (opacity + scale), from the second filter click onward. Before that they are plain list items. | 300ms | Filter click | Motion |
| Skill tile lift + brand tint; evidence tooltip rises 4px | 150ms | Hover / focus | CSS |
| Copy-email icon swap (copy → check) and status line | 300ms swap; status 150ms | Click | Motion |
| Button and link colour, border and shadow changes | 150ms | Hover / focus | CSS |
| Skip link slides in | 150ms | Focus | CSS |
| Signal field (hero canvas) reacts to the pointer, then sleeps | 60fps cap while changing; pauses off-screen and in hidden tabs | Pointer | Canvas 2D |
| About particle portrait: dots fly in and form the photo as it scrolls into view; the pointer pushes them aside, then they spring back | Scroll-linked assembly; spring physics while moving, sleeps when settled and off-screen | Scroll / pointer | Canvas 2D (`ParticlePortrait`), plain photo under reduced motion |
| Portrait and roadmap 3D slabs turning behind the cards | 16s per turn, continuous | Always | CSS keyframes |
| Projects 3D ring: cards around a cylinder, auto-rotates every 4.2s (pauses on hover, focus, off-screen, hidden tab, Pause button; off under reduced motion); spins two steps into place on reveal; side cards dim with distance; running border light and animated artwork (chart, flow, waves, bars, ECG...) on the front card | 1.1s turn; artwork 1.2–6s loops | Auto / arrows / dots / keys / drag / swipe / side-card click | React state + CSS 3D (`ring3d`, `pv-*`) |
| Work history: glowing head on the drawn timeline, node ring on arrival, cards slide in from the right, tags follow in sequence, border light and icon tilt on hover | Scrubbed; 900ms ring; 600ms reveals | Scroll / hover | GSAP ScrollTrigger + CSS |

## Removed in Phase 8

- **Ambient background glows** drifted forever (48s and 62s, infinite). They did not orient,
  reveal or give feedback, so they are now static.
- **CSS scroll-driven parallax**, replaced by the GSAP `<Parallax>` primitive. One parallax
  system, synced with Lenis.
- **TiltFrame's own spotlight**, replaced by the shared `[data-spotlight]` system.
- **Motion-spring `Magnetic`** (one React spring pair per element), replaced by one delegated
  listener and a CSS `translate` transition.
- **Duplicate GSAP loaders** (timeline and others): one `loadGsap()` registers ScrollTrigger once.
- **Large-element blur:** hero glyph blur reduced from 10px to 6px, then removed in Phase 9 (it repainted every frame during load). The role cycler no longer blurs.
- The unused `animate-reveal` CSS animation.

## Reduced motion

`prefers-reduced-motion: reduce` makes the site static.
- **Never hidden:** Reveal content and diagram connectors.
- **Off entirely:**
  - Lenis, GSAP (timeline line drawn, nodes lit, no parallax)
  - the cursor, magnetic pull, tilt and role cycling
  - the hero canvas, which shows a static dot grid
- **Collapsed:** CSS keyframes (hero intro, scroll cue) and transitions are cut to 1ms, so
  hover and focus state changes stay visible.
- **Kept:** the colour-only spotlight.

## Performance notes

- **GSAP:** loaded on demand by `loadGsap()`, never in the first-load bundle.
  - ScrollTrigger is registered once and refreshed after `document.fonts.ready`; ScrollTrigger
    handles resize refreshes itself.
  - Every trigger lives in a `gsap.context` that is reverted on unmount.
- **Lenis:**
  - It runs on `gsap.ticker` with lag smoothing off, and `lenis.on("scroll", ScrollTrigger.update)`
    keeps scrubbed animations in step.
  - Native scrolling works until GSAP's chunk arrives.
- **Pointer work:** the spotlight and magnetic effects share one rAF-throttled, delegated
  listener. The cursor loop runs only while the ring is catching up.
- **`will-change`:** used only on the two cursor layers, which move continuously while the pointer
  moves.
- **First-load JS:** about 217 KB gzip (framework about 165 KB).
