import { ImageResponse } from "next/og";
import { profile } from "@/content";

export const dynamic = "force-static";
export const alt = `${profile.name}, ${profile.headline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Static social card generated at build time. */
export default function OpengraphImage() {
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
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 9999,
            border: "3px solid #f3f2f5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ width: 10, height: 10, borderRadius: 9999, background: "#f3f2f5" }} />
        </div>
        <div style={{ fontSize: 26, letterSpacing: 4, color: "#858c99" }}>
          {profile.role.toUpperCase()}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ fontSize: 104, fontWeight: 600, letterSpacing: -3 }}>{profile.name}</div>
        <div style={{ fontSize: 34, color: "#a8aeba", maxWidth: 980, lineHeight: 1.35 }}>
          {profile.headline}
        </div>
      </div>
      <div style={{ height: 2, width: "100%", background: "#262a33", display: "flex" }}>
        <div style={{ height: 2, width: "38%", background: "#f3f2f5" }} />
      </div>
    </div>,
    size,
  );
}
