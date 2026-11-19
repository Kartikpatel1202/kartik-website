import type { CSSProperties } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { sectionCopy } from "@/content";
import { cn } from "@/lib/utils";
import type { Architecture, ArchitectureKind, ArchitectureNode } from "@/types/content";

const COL_W = 206;
const NODE_W = 180;
const NODE_H = 62;
const GAP_Y = 22;
const PAD = 12;

/** Stroke, fill and legend dot per kind. AI components carry the accent: they are the story. */
const kindStyle: Record<
  ArchitectureKind,
  { stroke: string; fill: string; dot: string; dashed?: boolean }
> = {
  client: { stroke: "var(--color-accent-2)", fill: "rgb(201 191 240 / 0.07)", dot: "bg-accent-2" },
  api: {
    stroke: "var(--color-text-secondary)",
    fill: "var(--color-bg-2)",
    dot: "bg-text-secondary",
  },
  service: {
    stroke: "var(--color-border-strong)",
    fill: "var(--color-bg-2)",
    dot: "bg-border-strong",
  },
  ai: { stroke: "var(--color-accent)", fill: "rgb(243 242 245 / 0.08)", dot: "bg-accent" },
  data: { stroke: "var(--color-success)", fill: "rgb(107 212 154 / 0.06)", dot: "bg-success" },
  external: {
    stroke: "var(--color-text-muted)",
    fill: "transparent",
    dot: "bg-text-muted",
    dashed: true,
  },
};

interface Placed extends ArchitectureNode {
  x: number;
  y: number;
}

/** Left-to-right layered layout: one column per tier, nodes centred vertically in their column. */
function layout(nodes: readonly ArchitectureNode[]) {
  const tiers = Math.max(...nodes.map((n) => n.tier)) + 1;
  const byTier = Array.from({ length: tiers }, (_, t) => nodes.filter((n) => n.tier === t));
  const rows = Math.max(...byTier.map((col) => col.length));
  const height = rows * NODE_H + (rows - 1) * GAP_Y;

  const placed = new Map<string, Placed>();
  byTier.forEach((col, t) => {
    const colHeight = col.length * NODE_H + (col.length - 1) * GAP_Y;
    const top = (height - colHeight) / 2;
    col.forEach((node, i) => {
      placed.set(node.id, { ...node, x: PAD + t * COL_W, y: PAD + top + i * (NODE_H + GAP_Y) });
    });
  });

  return {
    placed,
    width: PAD * 2 + (tiers - 1) * COL_W + NODE_W,
    height: PAD * 2 + height,
  };
}

interface ArchitectureDiagramProps {
  architecture: Architecture;
  projectName: string;
}

/**
 * Data-driven SVG system diagram (lg and up), plus the same components as an ordered list that is
 * always present: the list carries the detail, and is the whole diagram on small screens.
 * Connectors draw in when the figure scrolls into view.
 */
export function ArchitectureDiagram({ architecture, projectName }: ArchitectureDiagramProps) {
  const copy = sectionCopy.caseStudy;
  const { placed, width, height } = layout(architecture.nodes);
  const titleId = `diagram-title-${projectName.replace(/\W+/g, "-").toLowerCase()}`;
  const descId = `${titleId}-desc`;
  const kinds = [...new Set(architecture.nodes.map((n) => n.kind))];
  const ordered = [...architecture.nodes].sort((a, b) => a.tier - b.tier);

  return (
    <figure className="flex flex-col gap-8">
      <Reveal className="hidden overflow-hidden rounded-xl border border-border bg-bg-1/70 p-6 lg:block xl:p-8">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-labelledby={`${titleId} ${descId}`}
          className="mx-auto block h-auto w-full"
          // Never scale up past 1:1, so short diagrams keep the same type size as long ones.
          style={{ maxWidth: width }}
        >
          <title id={titleId}>{copy.diagramTitle(projectName)}</title>
          <desc id={descId}>{architecture.summary}</desc>

          <g fill="none" stroke="var(--color-border-strong)" strokeWidth={1.5}>
            {architecture.edges.map((edge, i) => {
              const from = placed.get(edge.from);
              const to = placed.get(edge.to);
              if (!from || !to) return null;
              const x1 = from.x + NODE_W;
              const y1 = from.y + NODE_H / 2;
              const x2 = to.x - 4;
              const y2 = to.y + NODE_H / 2;
              const mid = (x1 + x2) / 2;
              const style = { "--edge-delay": `${200 + i * 90}ms` } as CSSProperties;
              return (
                <g key={`${edge.from}-${edge.to}`} style={style}>
                  <path
                    className="diagram-edge"
                    pathLength={1}
                    d={`M ${x1} ${y1} C ${mid} ${y1}, ${mid} ${y2}, ${x2} ${y2}`}
                  />
                  <path
                    className="diagram-arrow"
                    d={`M ${x2 - 6} ${y2 - 4} L ${x2} ${y2} L ${x2 - 6} ${y2 + 4}`}
                  />
                </g>
              );
            })}
          </g>

          {[...placed.values()].map((node) => {
            const s = kindStyle[node.kind];
            return (
              <g key={node.id} transform={`translate(${node.x} ${node.y})`}>
                <rect
                  width={NODE_W}
                  height={NODE_H}
                  rx={10}
                  fill={s.fill}
                  stroke={s.stroke}
                  strokeWidth={1.25}
                  strokeDasharray={s.dashed ? "4 4" : undefined}
                />
                <text
                  x={14}
                  y={27}
                  fill="var(--color-text-primary)"
                  className="font-sans"
                  fontSize={16}
                  fontWeight={500}
                >
                  {node.label}
                </text>
                <text
                  x={14}
                  y={47}
                  fill="var(--color-text-muted)"
                  className="font-mono"
                  fontSize={11.5}
                  letterSpacing={0.6}
                >
                  {copy.kindLabels[node.kind].toUpperCase()}
                </text>
              </g>
            );
          })}
        </svg>

        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border pt-4">
          <span className="font-mono text-eyebrow text-text-muted uppercase">
            {copy.legendLabel}
          </span>
          {kinds.map((kind) => (
            <span key={kind} className="flex items-center gap-2 text-small text-text-secondary">
              <span aria-hidden className={cn("size-2 rounded-full", kindStyle[kind].dot)} />
              {copy.kindLabels[kind]}
            </span>
          ))}
        </div>
      </Reveal>

      <figcaption className="flex flex-col gap-4">
        <span className="font-mono text-eyebrow text-text-muted uppercase">
          {copy.componentsLabel}
        </span>
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {ordered.map((node, i) => (
            <li
              key={node.id}
              className="relative flex gap-4 rounded-lg border border-border bg-bg-1/60 p-4"
            >
              <span className="font-mono text-eyebrow text-text-muted">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex flex-col gap-1">
                <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span className="font-medium text-text-primary">{node.label}</span>
                  <span className="flex items-center gap-1.5 font-mono text-[0.6875rem] text-text-muted uppercase">
                    <span
                      aria-hidden
                      className={cn("size-1.5 rounded-full", kindStyle[node.kind].dot)}
                    />
                    {copy.kindLabels[node.kind]}
                  </span>
                </span>
                <span className="text-small text-text-secondary">{node.detail}</span>
              </span>
            </li>
          ))}
        </ol>
      </figcaption>
    </figure>
  );
}
