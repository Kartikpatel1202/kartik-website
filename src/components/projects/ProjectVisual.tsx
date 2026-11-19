import type { CSSProperties, ReactNode } from "react";

/**
 * Artwork for the top of each project card in the 3D carousel: a duotone gradient and a small
 * animated SVG motif that hints at what the project does (a risk chart for the fraud platform, an
 * agent's step flow, an ECG line for the heart-risk model...). Purely decorative.
 *
 * The motifs animate only on the centred card (see `.pv-*` in globals.css); under reduced motion
 * they rest on their final frame.
 */

type Motif =
  "chart" | "flow" | "signal" | "shield" | "wave" | "scatter" | "mesh" | "bars" | "pulse" | "orbit";

interface Look {
  motif: Motif;
  /** Gradient stops: deep → bright. */
  from: string;
  to: string;
}

const LOOKS: Record<string, Look> = {
  "razorshield-ai": { motif: "chart", from: "#431407", to: "#f97316" },
  "taskpilot-ai": { motif: "flow", from: "#083344", to: "#14b8a6" },
  airtelsync: { motif: "signal", from: "#4c0519", to: "#f43f5e" },
  "agentic-ai-safety": { motif: "shield", from: "#2e1065", to: "#8b5cf6" },
  lingo: { motif: "wave", from: "#052e16", to: "#22c55e" },
  "semantic-search": { motif: "scatter", from: "#172554", to: "#3b82f6" },
  "zero-trust-messaging": { motif: "mesh", from: "#082f49", to: "#06b6d4" },
  "nutrition-tracker": { motif: "bars", from: "#451a03", to: "#f59e0b" },
  "heart-disease-risk": { motif: "pulse", from: "#450a0a", to: "#ef4444" },
  "space-shooter": { motif: "orbit", from: "#1e1b4b", to: "#6366f1" },
};

const FALLBACKS: Look[] = [
  { motif: "wave", from: "#1e1b4b", to: "#a78bfa" },
  { motif: "scatter", from: "#0c4a6e", to: "#38bdf8" },
];

const STROKE = "rgb(255 255 255 / 0.9)";
const FAINT = "rgb(255 255 255 / 0.35)";

/** A sine path across `width`, used twice side by side so it can scroll seamlessly. */
function sine(width: number, y: number, amp: number, period: number) {
  let d = `M0 ${y}`;
  for (let x = 0; x <= width; x += 8) {
    d += ` L${x} ${(y + Math.sin((x / period) * Math.PI * 2) * amp).toFixed(1)}`;
  }
  return d;
}

const i = (n: number) => ({ "--i": n }) as CSSProperties;

function motif(kind: Motif): ReactNode {
  switch (kind) {
    case "chart":
      return (
        <>
          <path
            d="M10 120 L60 108 L100 114 L140 92 L170 98 L200 40 L225 96 L260 82 L310 70 L310 160 L10 160 Z"
            fill="rgb(255 255 255 / 0.12)"
          />
          <path
            className="pv-draw"
            pathLength={1}
            d="M10 120 L60 108 L100 114 L140 92 L170 98 L200 40 L225 96 L260 82 L310 70"
            fill="none"
            stroke={STROKE}
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <circle className="pv-ring" cx="200" cy="40" r="10" fill="none" stroke={STROKE} />
          <circle cx="200" cy="40" r="4" fill="#fff" />
        </>
      );
    case "flow":
      return (
        <>
          <path d="M40 110 L120 60 L200 100 L280 50" fill="none" stroke={FAINT} strokeWidth="2" />
          <path
            className="pv-dash"
            d="M40 110 L120 60 L200 100 L280 50"
            fill="none"
            stroke={STROKE}
            strokeWidth="2.5"
          />
          {[
            [40, 110],
            [120, 60],
            [200, 100],
            [280, 50],
          ].map(([cx, cy], n) => (
            <g key={n}>
              <circle
                className="pv-ring"
                style={i(n)}
                cx={cx}
                cy={cy}
                r="14"
                fill="none"
                stroke={FAINT}
              />
              <circle cx={cx} cy={cy} r="7" fill="#fff" />
            </g>
          ))}
        </>
      );
    case "signal":
      return (
        <>
          {[0, 1, 2, 3].map((n) => (
            <circle
              key={n}
              className="pv-ring"
              style={i(n)}
              cx="160"
              cy="80"
              r={22 + n * 22}
              fill="none"
              stroke={n === 0 ? STROKE : FAINT}
              strokeWidth="2"
            />
          ))}
          <circle cx="160" cy="80" r="8" fill="#fff" />
        </>
      );
    case "shield":
      return (
        <>
          <path
            d="M160 22 L210 40 V82 C210 112 188 132 160 142 C132 132 110 112 110 82 V40 Z"
            fill="rgb(255 255 255 / 0.1)"
            stroke={STROKE}
            strokeWidth="2.5"
          />
          <path
            className="pv-draw"
            pathLength={1}
            d="M140 82 L154 96 L182 66"
            fill="none"
            stroke="#fff"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect className="pv-sweep" x="20" y="0" width="280" height="2" fill={FAINT} />
        </>
      );
    case "wave":
      return (
        <g className="pv-slide">
          <path d={sine(640, 70, 26, 160)} fill="none" stroke={STROKE} strokeWidth="2.5" />
          <path d={sine(640, 92, 16, 106.67)} fill="none" stroke={FAINT} strokeWidth="2" />
        </g>
      );
    case "scatter":
      return (
        <>
          {[
            [90, 60, 26],
            [200, 50, 22],
            [170, 115, 24],
          ].map(([cx, cy, r], c) => (
            <circle
              key={c}
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke={FAINT}
              strokeDasharray="3 4"
            />
          ))}
          {[
            [80, 52],
            [98, 66],
            [86, 72],
            [104, 50],
            [192, 42],
            [208, 58],
            [214, 40],
            [196, 60],
            [160, 108],
            [178, 122],
            [166, 124],
            [184, 104],
            [250, 96],
            [60, 116],
          ].map(([cx, cy], n) => (
            <circle key={n} className="pv-twinkle" style={i(n)} cx={cx} cy={cy} r="4" fill="#fff" />
          ))}
        </>
      );
    case "mesh": {
      const nodes = [
        [60, 50],
        [130, 30],
        [230, 40],
        [280, 100],
        [200, 130],
        [100, 120],
        [160, 82],
      ] as const;
      return (
        <>
          {nodes.slice(0, 6).map(([x, y], n) => (
            <line key={n} x1={x} y1={y} x2={160} y2={82} stroke={FAINT} strokeWidth="1.5" />
          ))}
          <path
            d="M60 50 L130 30 L230 40 L280 100 L200 130 L100 120 Z"
            fill="none"
            stroke={FAINT}
            strokeWidth="1.5"
          />
          {nodes.map(([cx, cy], n) => (
            <circle
              key={n}
              className="pv-twinkle"
              style={i(n)}
              cx={cx}
              cy={cy}
              r={n === 6 ? 10 : 5}
              fill="#fff"
            />
          ))}
        </>
      );
    }
    case "bars":
      return (
        <>
          {[64, 96, 52, 118, 84, 106, 72].map((h, n) => (
            <rect
              key={n}
              className="pv-grow"
              style={i(n)}
              x={38 + n * 36}
              y={140 - h}
              width="22"
              height={h}
              rx="4"
              fill={n === 3 ? "#fff" : "rgb(255 255 255 / 0.55)"}
            />
          ))}
        </>
      );
    case "pulse":
      return (
        <path
          className="pv-draw pv-loop"
          pathLength={1}
          d="M0 84 H90 L104 84 L114 52 L126 120 L140 30 L152 98 L162 84 H220 L232 84 L240 66 L250 96 L258 84 H320"
          fill="none"
          stroke={STROKE}
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
      );
    case "orbit":
      return (
        <>
          {[
            [40, 30],
            [280, 24],
            [250, 130],
            [70, 120],
            [120, 18],
            [300, 80],
            [20, 90],
          ].map(([cx, cy], n) => (
            <circle key={n} className="pv-twinkle" style={i(n)} cx={cx} cy={cy} r="2" fill="#fff" />
          ))}
          <ellipse cx="160" cy="80" rx="90" ry="34" fill="none" stroke={FAINT} />
          <circle cx="160" cy="80" r="18" fill="rgb(255 255 255 / 0.85)" />
          <g className="pv-orbit">
            <circle cx="250" cy="80" r="6" fill="#fff" />
          </g>
        </>
      );
  }
}

export function ProjectVisual({ slug, index }: { slug: string; index: number }) {
  const look = LOOKS[slug] ?? FALLBACKS[index % FALLBACKS.length] ?? FALLBACKS[0]!;
  return (
    <div
      aria-hidden
      className="pv relative h-40 overflow-hidden"
      style={{ background: `linear-gradient(135deg, ${look.from}, ${look.to})` }}
    >
      {/* Faint grid and a soft highlight for depth. */}
      <div className="absolute inset-0 bg-[linear-gradient(rgb(255_255_255/0.06)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.06)_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="absolute -top-16 -right-10 size-48 rounded-full bg-[radial-gradient(closest-side,rgb(255_255_255/0.28),transparent)]" />
      <svg
        viewBox="0 0 320 160"
        preserveAspectRatio="xMidYMid slice"
        className="relative size-full overflow-visible"
      >
        {motif(look.motif)}
      </svg>
      <div className="absolute inset-x-0 bottom-0 h-12 bg-[linear-gradient(to_top,var(--color-bg-1),transparent)]" />
    </div>
  );
}
