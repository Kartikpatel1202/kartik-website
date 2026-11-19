import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Button, type ButtonSize, type ButtonVariant } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { GlassCard } from "@/components/ui/GlassCard";
import { Icon, iconNames } from "@/components/ui/Icon";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Tag, type TagVariant } from "@/components/ui/Tag";
import { VisuallyHidden } from "@/components/ui/VisuallyHidden";
import { HooksDemo } from "./HooksDemo";

// Dev-only design-system preview. The `.dev.tsx` extension means this route exists only in
// `next dev` (see next.config.ts) — it is never part of the production export or sitemap.

export const metadata: Metadata = {
  title: "Kitchen sink",
  robots: { index: false, follow: false },
};

const colors: { token: string; hex: string; note: string }[] = [
  { token: "bg-0", hex: "#07080A", note: "page" },
  { token: "bg-1", hex: "#0D0F13", note: "band" },
  { token: "bg-2", hex: "#14171D", note: "raised" },
  { token: "surface", hex: "rgba(255,255,255,.035)", note: "glass" },
  { token: "border", hex: "#262A33", note: "decorative" },
  { token: "border-strong", hex: "#3A3F4A", note: "divider" },
  { token: "text-primary", hex: "#EDEEF1", note: "17.27 on bg-0" },
  { token: "text-secondary", hex: "#A8AEBA", note: "9.00 on bg-0" },
  { token: "text-muted", hex: "#858C99", note: "5.92 on bg-0 · 5.10 on surface" },
  { token: "accent", hex: "#F2B55B", note: "11.01 on bg-0" },
  { token: "accent-2", hex: "#5CCFC0", note: "10.63 on bg-0" },
  { token: "success", hex: "#6BD49A", note: "10.98 on bg-0" },
  { token: "warn", hex: "#F08A6C", note: "8.16 on bg-0" },
];

const typeSteps = [
  ["display", "font-display text-display font-extrabold"],
  ["h1", "font-display text-h1 font-extrabold"],
  ["h2", "font-display text-h2 font-extrabold"],
  ["h3", "text-h3"],
  ["h4", "text-h4"],
  ["h5", "text-h5"],
  ["h6", "text-h6"],
  ["body-lg", "text-body-lg font-normal"],
  ["body", "text-body font-normal"],
  ["small", "text-small font-normal"],
  ["eyebrow", "font-mono text-eyebrow uppercase"],
] as const;

const spacing = [1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32, 40];
const radii = ["rounded-sm", "rounded-md", "rounded-lg", "rounded-xl", "rounded-full"];
const shadows = ["shadow-1", "shadow-2", "shadow-glow-accent", "shadow-glow-accent-2"];
const easings = [
  ["ease-out-expo", "cubic-bezier(0.16, 1, 0.3, 1)"],
  ["ease-in-out", "cubic-bezier(0.65, 0, 0.35, 1)"],
  ["spring (Motion)", "stiffness 300 · damping 30 · mass 0.6"],
] as const;

const buttonVariants: ButtonVariant[] = ["primary", "ghost", "link"];
const buttonSizes: ButtonSize[] = ["sm", "md", "lg"];
const tagVariants: TagVariant[] = ["neutral", "accent", "verified", "warn"];

const sectionIds = ["colors", "type", "spacing", "surfaces", "motion", "components"];

function Block({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-h`}
      className="flex flex-col gap-6 border-t border-border pt-12"
    >
      <h2 id={`${id}-h`} className="font-mono text-eyebrow text-accent uppercase">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function KitchenSinkPage() {
  return (
    <main id="main" className="section-y">
      <HooksDemo sectionIds={sectionIds} />
      <Container className="flex flex-col gap-16">
        <SectionHeader
          as="h1"
          eyebrow="Dev only · design system"
          title="Kitchen sink"
          lead="Every token and primitive from docs/DESIGN.md, rendered live. Not part of the production build."
        />

        <Block id="colors" title="Color tokens">
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {colors.map((c) => (
              <li key={c.token} className="flex flex-col gap-2">
                <span
                  className="h-16 rounded-md border border-border"
                  style={{ background: `var(--color-${c.token})` }}
                />
                <span className="font-mono text-small">{c.token}</span>
                <span className="font-mono text-[0.75rem] text-text-muted">
                  {c.hex} · {c.note}
                </span>
              </li>
            ))}
          </ul>
          <div className="grid gap-3 sm:grid-cols-3">
            {(["bg-bg-0", "bg-bg-1", "bg-bg-2"] as const).map((bg) => (
              <div key={bg} className={`${bg} rounded-lg border border-border p-5`}>
                <p className="font-mono text-[0.75rem] text-text-muted">{bg}</p>
                <p className="text-text-primary">Primary text</p>
                <p className="text-text-secondary">Secondary text</p>
                <p className="text-text-muted">Muted text</p>
                <p className="text-accent">
                  Accent · <span className="text-accent-2">Accent 2</span>
                </p>
              </div>
            ))}
          </div>
        </Block>

        <Block id="type" title="Typography (resize the window: sizes are fluid)">
          <ul className="flex flex-col gap-6">
            {typeSteps.map(([name, cls]) => (
              <li key={name} className="grid gap-2 md:grid-cols-[8rem_1fr] md:items-baseline">
                <span className="font-mono text-[0.75rem] text-text-muted">{name}</span>
                <span className={cls}>Decisions you can audit</span>
              </li>
            ))}
          </ul>
          <p className="max-w-prose text-text-secondary">
            Body measure is capped at 68ch. Metrics use mono tabular figures:{" "}
            <span className="font-mono text-accent tabular-nums">0.70 AUC · 12/12 · 761 tests</span>
          </p>
        </Block>

        <Block id="spacing" title="Spacing (4px base) · radius">
          <ul className="flex flex-col gap-2">
            {spacing.map((s) => (
              <li key={s} className="flex items-center gap-4">
                <span className="w-24 font-mono text-[0.75rem] text-text-muted">
                  {s} = {s * 4}px
                </span>
                <span className="h-3 rounded-sm bg-accent/70" style={{ width: `${s * 4}px` }} />
              </li>
            ))}
          </ul>
          <ul className="flex flex-wrap gap-4">
            {radii.map((r) => (
              <li
                key={r}
                className={`${r} flex size-24 items-end border border-border-strong bg-bg-2 p-2`}
              >
                <span className="font-mono text-[0.75rem] text-text-muted">{r}</span>
              </li>
            ))}
          </ul>
        </Block>

        <Block id="surfaces" title="Shadows, glows, glass">
          <ul className="flex flex-wrap gap-6">
            {shadows.map((s) => (
              <li key={s} className={`${s} flex size-32 items-end rounded-lg bg-bg-2 p-3`}>
                <span className="font-mono text-[0.75rem] text-text-muted">{s}</span>
              </li>
            ))}
          </ul>
          <div className="relative overflow-hidden rounded-xl border border-border p-8">
            <div
              aria-hidden
              className="absolute -top-10 left-10 size-48 rounded-full bg-accent/40 blur-2xl"
            />
            <div
              aria-hidden
              className="absolute right-10 bottom-0 size-40 rounded-full bg-accent-2/30 blur-2xl"
            />
            <div className="relative grid gap-6 md:grid-cols-2">
              <GlassCard className="p-6">
                <h3 className="text-h5">GlassCard</h3>
                <p className="mt-2 text-text-secondary">
                  Blur 12px, 3.5% white, hairline border, 3% noise.
                </p>
              </GlassCard>
              <GlassCard interactive radius="xl" className="p-6">
                <h3 className="text-h5">GlassCard interactive · xl</h3>
                <p className="mt-2 text-text-secondary">
                  Hover or focus a link inside: border and surface lift.
                </p>
                <Button href="#surfaces" variant="link" className="mt-3">
                  Focusable link
                </Button>
              </GlassCard>
            </div>
          </div>
        </Block>

        <Block id="motion" title="Motion tokens (hover each track)">
          <ul className="flex flex-col gap-4">
            {easings.map(([name, curve]) => (
              <li key={name} className="group flex flex-col gap-2">
                <span className="font-mono text-[0.75rem] text-text-muted">
                  {name} · {curve}
                </span>
                <span className="relative block h-8 rounded-full border border-border bg-bg-1">
                  <span
                    className={`absolute top-1 left-1 size-6 rounded-full bg-accent transition-transform duration-[600ms] group-hover:translate-x-[min(60vw,640px)] ${
                      name === "ease-in-out" ? "ease-in-out" : "ease-out-expo"
                    }`}
                  />
                </span>
              </li>
            ))}
          </ul>
          <p className="font-mono text-[0.75rem] text-text-muted">
            durations: fast 150ms · base 300ms · slow 600ms — stagger: 40 / 60ms — reveal: 12 / 24 /
            40px. Full inventory: docs/MOTION.md. With reduced motion, transitions collapse to 1ms.
          </p>
        </Block>

        <Block id="components" title="Primitives">
          <div className="flex flex-col gap-4">
            {buttonVariants.map((variant) => (
              <div key={variant} className="flex flex-wrap items-center gap-3">
                <span className="w-20 font-mono text-[0.75rem] text-text-muted">{variant}</span>
                {buttonSizes.map((size) => (
                  <Button key={size} variant={variant} size={size}>
                    {size}
                  </Button>
                ))}
                <Button variant={variant} trailingIcon="arrow-right">
                  With icon
                </Button>
                <Button variant={variant} disabled>
                  Disabled
                </Button>
              </div>
            ))}
            <div className="flex flex-wrap items-center gap-3">
              <span className="w-20 font-mono text-[0.75rem] text-text-muted">as link</span>
              <Button href="/" variant="ghost">
                Internal (Next Link)
              </Button>
              <Button
                href="https://github.com/Kartikpatel1202"
                variant="ghost"
                leadingIcon="github"
                trailingIcon="arrow-up-right"
              >
                External (new tab)
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {tagVariants.map((v) => (
              <Tag key={v} variant={v}>
                {v}
              </Tag>
            ))}
            <Tag size="sm">sm neutral</Tag>
            <Tag size="sm" variant="verified">
              sm verified
            </Tag>
          </div>

          <GlassCard className="p-8">
            <SectionHeader
              eyebrow="Projects"
              title="Systems with checkpoints"
              lead="SectionHeader: mono eyebrow with trace index, serif title, optional lead."
            />
          </GlassCard>

          <ul className="flex flex-wrap gap-5 text-text-secondary">
            {iconNames.map((name) => (
              <li key={name} className="flex flex-col items-center gap-2">
                <Icon name={name} size={24} />
                <span className="font-mono text-[0.75rem] text-text-muted">{name}</span>
              </li>
            ))}
          </ul>

          <p className="text-text-secondary">
            VisuallyHidden: this sentence ends with hidden text for screen readers.
            <VisuallyHidden> You found the visually hidden text.</VisuallyHidden>
          </p>

          <div className="flex flex-col gap-3">
            {(["prose", "content", "wide"] as const).map((size) => (
              <div key={size} className="-mx-[var(--gutter)]">
                <Container size={size}>
                  <div className="rounded-sm border border-dashed border-border-strong p-2 font-mono text-[0.75rem] text-text-muted">
                    Container {size}
                  </div>
                </Container>
              </div>
            ))}
          </div>
        </Block>
      </Container>
    </main>
  );
}
