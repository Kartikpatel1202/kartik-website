import { ImageResponse } from "next/og";
import { getFeaturedProjectBySlug, getFeaturedProjects, profile, sectionCopy } from "@/content";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Project case study card with the project name and its technology stack";

export function generateStaticParams() {
  return getFeaturedProjects().map((project) => ({ slug: project.slug }));
}

/** Per-project social card: project name, one-line stack and the site's accent trace. */
export default async function ProjectOpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const project = getFeaturedProjectBySlug((await params).slug);
  const name = project?.shortTitle ?? profile.name;
  const stack = project?.stack.slice(0, 7) ?? [];

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 80,
        background: "#0c0b0f",
        color: "#edeef1",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20, color: "#858c99" }}>
        <div style={{ fontSize: 26, letterSpacing: 4, color: "#f3f2f5" }}>
          {sectionCopy.caseStudy.eyebrow.toUpperCase()}
        </div>
        <div style={{ width: 48, height: 2, background: "#3a3f4a" }} />
        <div style={{ fontSize: 26, letterSpacing: 4 }}>{profile.name.toUpperCase()}</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
        <div style={{ fontSize: 112, fontWeight: 600, letterSpacing: -3 }}>{name}</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
          {stack.map((tech) => (
            <div
              key={tech}
              style={{
                display: "flex",
                fontSize: 26,
                color: "#a8aeba",
                padding: "10px 20px",
                borderRadius: 9999,
                border: "2px solid #262a33",
                background: "#14171d",
              }}
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
      <div style={{ height: 2, width: "100%", background: "#262a33", display: "flex" }}>
        <div style={{ height: 2, width: "38%", background: "#f3f2f5" }} />
      </div>
    </div>,
    size,
  );
}
