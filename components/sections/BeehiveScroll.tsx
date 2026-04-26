"use client";

import { useEffect, useRef } from "react";

const FRAME_COUNT = 76;

export default function BeehiveScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const imagesRef    = useRef<HTMLImageElement[]>([]);
  const rafRef       = useRef<number>(0);
  const lastFrameRef = useRef<number>(-1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // ── Retina / HiDPI setup ───────────────────────────────────────────────
    // Read the actual CSS display size (set by Tailwind classes on the element).
    // Multiply by devicePixelRatio so the canvas has one physical pixel per
    // screen pixel — eliminates the softness on 2x/3x retina screens.
    const dpr  = window.devicePixelRatio || 1;
    const cssW = canvas.clientWidth;
    const cssH = canvas.clientHeight;

    canvas.width  = cssW * dpr;
    canvas.height = cssH * dpr;

    // Scale the context so all draw calls use CSS-pixel coordinates.
    ctx.scale(dpr, dpr);

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    // ── Render ────────────────────────────────────────────────────────────
    const render = (index: number) => {
      const img = imagesRef.current[index];
      if (!img?.complete || !img.naturalWidth) return;

      // Clear to transparent (CSS pixel space, because context is scaled).
      ctx.clearRect(0, 0, cssW, cssH);

      // Object-contain: scale the frame to fit cssW × cssH without stretching.
      // Transparent areas show the page gradient underneath.
      const scale = Math.min(cssW / img.naturalWidth, cssH / img.naturalHeight);
      const dx    = (cssW - img.naturalWidth  * scale) / 2;
      const dy    = (cssH - img.naturalHeight * scale) / 2;
      ctx.drawImage(img, dx, dy, img.naturalWidth * scale, img.naturalHeight * scale);
    };

    // ── Preload frames ────────────────────────────────────────────────────
    const images: HTMLImageElement[] = [];
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new window.Image();
      if (i === 0) img.onload = () => render(0);
      img.src = `https://res.cloudinary.com/dvmmlp3e5/image/upload/frame_${i + 1}.webp`;
      images.push(img);
    }
    imagesRef.current = images;

    // ── Scroll handler ────────────────────────────────────────────────────
    const onScroll = () => {
      const el = containerRef.current;
      if (!el) return;

      const { top }    = el.getBoundingClientRect();
      const scrollable = el.offsetHeight - window.innerHeight;
      const progress   = Math.max(0, Math.min(1, -top / scrollable));
      const frame      = Math.min(FRAME_COUNT - 1, Math.floor(progress * FRAME_COUNT));

      if (frame === lastFrameRef.current) return;
      lastFrameRef.current = frame;

      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => render(frame));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      style={{ height: "500vh" }}
      className="relative"
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center bg-transparent">
        {/*
          CSS classes set the display size; useEffect reads clientWidth/clientHeight
          and sets canvas.width/height = display × dpr for sharp physical pixels.
          No width/height attrs here — JS owns them after mount.
        */}
        <canvas
          ref={canvasRef}
          className="block w-[300px] h-[300px] md:w-[440px] md:h-[440px] lg:w-[460px] lg:h-[460px]"
        />
      </div>
    </section>
  );
}
