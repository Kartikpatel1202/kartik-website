"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

/** Distance between particle centres, in CSS pixels (wider on small screens: fewer particles). */
const GAP_DESKTOP = 4;
const GAP_MOBILE = 5;
/** Pointer influence radius (CSS px) and push strength. */
const RADIUS = 70;
const PUSH = 2.4;
/** Spring toward the target and velocity damping per frame. */
const SPRING = 0.075;
const DAMPING = 0.82;
/** Below this total motion the simulation sleeps until the pointer or scroll wakes it. */
const REST_ENERGY = 0.02;

interface Particles {
  count: number;
  /** Home (photo) and scattered positions, current position and velocity, in CSS px. */
  hx: Float32Array;
  hy: Float32Array;
  sx: Float32Array;
  sy: Float32Array;
  x: Float32Array;
  y: Float32Array;
  vx: Float32Array;
  vy: Float32Array;
  /** Packed RGBA (little-endian ABGR) colour per particle. */
  color: Uint32Array;
}

const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;
const clamp01 = (t: number) => Math.min(1, Math.max(0, t));

/** Samples the image on a grid and returns one particle per non-transparent cell. */
function sample(image: HTMLImageElement, width: number, height: number, gap: number): Particles {
  const cols = Math.floor(width / gap);
  const rows = Math.floor(height / gap);
  const canvas = document.createElement("canvas");
  canvas.width = cols;
  canvas.height = rows;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("2D canvas unavailable");
  // object-cover, like the <img> it replaces.
  const scale = Math.max(cols / image.naturalWidth, rows / image.naturalHeight);
  const dw = image.naturalWidth * scale;
  const dh = image.naturalHeight * scale;
  ctx.drawImage(image, (cols - dw) / 2, (rows - dh) / 2, dw, dh);
  const pixels = new Uint32Array(ctx.getImageData(0, 0, cols, rows).data.buffer);

  const max = cols * rows;
  const p: Particles = {
    count: 0,
    hx: new Float32Array(max),
    hy: new Float32Array(max),
    sx: new Float32Array(max),
    sy: new Float32Array(max),
    x: new Float32Array(max),
    y: new Float32Array(max),
    vx: new Float32Array(max),
    vy: new Float32Array(max),
    color: new Uint32Array(max),
  };
  const offset = gap / 2;
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const rgba = pixels[row * cols + col] ?? 0;
      if (rgba >>> 24 < 32) continue; // skip transparent cells
      const i = p.count++;
      p.hx[i] = col * gap + offset;
      p.hy[i] = row * gap + offset;
      // Scattered start: thrown out from the centre, well past the frame.
      const angle = Math.random() * Math.PI * 2;
      const distance = (0.35 + Math.random() * 0.9) * Math.max(width, height);
      const sx = width / 2 + Math.cos(angle) * distance;
      const sy = height / 2 + Math.sin(angle) * distance;
      p.sx[i] = p.x[i] = sx;
      p.sy[i] = p.y[i] = sy;
      p.color[i] = rgba | 0xff000000;
    }
  }
  return p;
}

interface ParticlePortraitProps {
  /** Same-origin image to sample (a pre-generated WebP). */
  src: string;
  /** The real <img>: shown without JS, under reduced motion, and until the particles are ready. */
  children: ReactNode;
}

/**
 * The About portrait as a field of particles on one canvas. The particles fly in from all sides
 * and settle into the photo as the card scrolls into view; the pointer pushes them aside and they
 * spring back when it leaves. Rendering writes straight into an ImageData buffer (one put per
 * frame), only runs while the card is on screen, and sleeps once everything has settled.
 * Under reduced motion (or without JS) the plain photo is shown instead.
 */
export function ParticlePortrait({ src, children }: ParticlePortraitProps) {
  const reduced = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (reduced || !wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particles | null = null;
    let frame = 0;
    let visible = false;
    let cssW = 0;
    let cssH = 0;
    let dpr = 1;
    let image: ImageData | null = null;
    let buffer: Uint32Array | null = null;
    const pointer = { x: -1e4, y: -1e4, active: false };
    let disposed = false;
    let gap = GAP_DESKTOP;

    /** 0 while the card is below the fold, 1 once its top passes 35% of the viewport. */
    const assembly = () => {
      const rect = wrap.getBoundingClientRect();
      const vh = window.innerHeight;
      return easeOutCubic(clamp01((vh - rect.top) / (vh * 0.65)));
    };

    const draw = () => {
      if (!particles || !image || !buffer) return;
      buffer.fill(0);
      const w = image.width;
      const h = image.height;
      const size = Math.max(1, Math.round(gap * dpr * 0.72));
      // Round the centre first, then offset: rounding "centre - size/2" flips between pixels when
      // size is odd, which makes a settled photo shimmer.
      const half = size >> 1;
      const { x, y, color } = particles;
      for (let i = 0; i < particles.count; i++) {
        const px = Math.round((x[i] ?? 0) * dpr) - half;
        const py = Math.round((y[i] ?? 0) * dpr) - half;
        if (px + size <= 0 || py + size <= 0 || px >= w || py >= h) continue;
        const c = color[i] ?? 0;
        const x0 = Math.max(0, px);
        const x1 = Math.min(w, px + size);
        const y1 = Math.min(h, py + size);
        for (let row = Math.max(0, py); row < y1; row++) buffer.fill(c, row * w + x0, row * w + x1);
      }
      ctx.putImageData(image, 0, 0);
    };

    const step = () => {
      frame = 0;
      if (!particles || !visible) return;
      const t = assembly();
      let energy = 0;
      const r2 = RADIUS * RADIUS;
      const { hx, hy, sx, sy, x, y, vx, vy } = particles;
      for (let i = 0; i < particles.count; i++) {
        const sxi = sx[i] ?? 0;
        const syi = sy[i] ?? 0;
        const tx = sxi + ((hx[i] ?? 0) - sxi) * t;
        const ty = syi + ((hy[i] ?? 0) - syi) * t;
        let xi = x[i] ?? 0;
        let yi = y[i] ?? 0;
        let vxi = (vx[i] ?? 0) + (tx - xi) * SPRING;
        let vyi = (vy[i] ?? 0) + (ty - yi) * SPRING;
        if (pointer.active) {
          const dx = xi - pointer.x;
          const dy = yi - pointer.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < r2 && d2 > 0.01) {
            const d = Math.sqrt(d2);
            const force = (1 - d / RADIUS) * PUSH * 2;
            vxi += (dx / d) * force;
            vyi += (dy / d) * force;
          }
        }
        vxi *= DAMPING;
        vyi *= DAMPING;
        xi += vxi;
        yi += vyi;
        x[i] = xi;
        y[i] = yi;
        vx[i] = vxi;
        vy[i] = vyi;
        energy += Math.abs(vxi) + Math.abs(vyi) + Math.abs(tx - xi) * 0.1;
      }
      draw();
      if (pointer.active || energy / particles.count > REST_ENERGY) wake();
    };

    const wake = () => {
      if (!frame && visible && particles) frame = requestAnimationFrame(step);
    };

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      cssW = rect.width;
      cssH = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(cssW * dpr);
      canvas.height = Math.round(cssH * dpr);
      image = ctx.createImageData(canvas.width, canvas.height);
      buffer = new Uint32Array(image.data.buffer);
    };

    const build = (img: HTMLImageElement) => {
      if (disposed) return;
      resize();
      if (!cssW || !cssH) return;
      gap = cssW < 360 ? GAP_MOBILE : GAP_DESKTOP;
      const previous = particles;
      particles = sample(img, cssW, cssH, gap);
      // On a rebuild (resize), start from where the photo already was, not scattered again.
      if (previous) {
        particles.x.set(particles.hx);
        particles.y.set(particles.hy);
      }
      setReady(true);
      wake();
    };

    const img = new Image();
    img.decoding = "async";
    img.src = src;
    img.onload = () => build(img);

    const local = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      // The card may be tilted or scaled: map the pointer into the canvas's own pixels.
      pointer.x = ((event.clientX - rect.left) / rect.width) * cssW;
      pointer.y = ((event.clientY - rect.top) / rect.height) * cssH;
    };
    const onMove = (event: PointerEvent) => {
      local(event);
      pointer.active = true;
      wake();
    };
    const onLeave = () => {
      pointer.active = false;
      pointer.x = pointer.y = -1e4;
      wake();
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? false;
      if (visible) wake();
    });
    io.observe(wrap);

    let resizeTimer = 0;
    const ro = new ResizeObserver(() => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => img.complete && img.naturalWidth && build(img), 150);
    });
    ro.observe(wrap);

    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerdown", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    canvas.addEventListener("pointercancel", onLeave);
    window.addEventListener("scroll", wake, { passive: true });

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      window.clearTimeout(resizeTimer);
      io.disconnect();
      ro.disconnect();
      img.onload = null;
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerdown", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("pointercancel", onLeave);
      window.removeEventListener("scroll", wake);
      setReady(false);
    };
  }, [reduced, src]);

  return (
    <div
      ref={wrapRef}
      data-state={ready ? "ready" : undefined}
      className="group/particles relative"
    >
      <div className="transition-opacity duration-500 group-data-[state=ready]/particles:opacity-0">
        {children}
      </div>
      {!reduced && (
        <canvas
          ref={canvasRef}
          aria-hidden
          className="absolute inset-0 size-full touch-pan-y opacity-0 transition-opacity duration-500 group-data-[state=ready]/particles:opacity-100"
        />
      )}
    </div>
  );
}
