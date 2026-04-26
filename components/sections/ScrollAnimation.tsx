"use client";

import { useEffect, useRef } from "react";

const FRAME_COUNT = 76;

export default function ScrollAnimation() {
  const containerRef  = useRef<HTMLDivElement>(null);
  const canvasRef     = useRef<HTMLCanvasElement>(null);
  const imagesRef     = useRef<HTMLImageElement[]>([]);
  const rafRef        = useRef<number>(0);
  const lastFrameRef  = useRef<number>(-1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Draw a specific frame index onto the canvas.
    // Sizes the canvas to the image's natural resolution on first call
    // so CSS can then scale it to fit the viewport.
    const render = (index: number) => {
      const img = imagesRef.current[index];
      if (!img?.complete || !img.naturalWidth) return;

      if (canvas.width !== img.naturalWidth) {
        canvas.width  = img.naturalWidth;
        canvas.height = img.naturalHeight;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };

    // Preload all frames.
    // Draw frame 0 as soon as it is ready so the canvas is not blank.
    const images: HTMLImageElement[] = [];
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new window.Image();
      if (i === 0) img.onload = () => render(0);
      img.src = `/cleaned-frames/frame_${i + 1}.png`;
      images.push(img);
    }
    imagesRef.current = images;

    // Map scroll progress within the tall container to a frame index.
    const onScroll = () => {
      const el = containerRef.current;
      if (!el) return;

      const { top }  = el.getBoundingClientRect();
      const scrollable = el.offsetHeight - window.innerHeight;
      // progress: 0 when the section first pins, 1 when user has scrolled
      // all the way through the sticky zone.
      const progress = Math.max(0, Math.min(1, -top / scrollable));
      const frame    = Math.min(FRAME_COUNT - 1, Math.floor(progress * FRAME_COUNT));

      if (frame === lastFrameRef.current) return; // skip unchanged frames
      lastFrameRef.current = frame;

      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => render(frame));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // resolve initial position (e.g. hard reload mid-page)

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    /*
      The tall outer div is the scroll track — it determines how long the
      animation lasts. 500vh gives ~66px of scroll per frame at a 900px
      viewport, which feels deliberate without being sluggish.
    */
    <section
      ref={containerRef}
      style={{ height: "500vh" }}
      className="relative"
    >
      {/* Sticky inner: locks to the top and fills the viewport while
          the user is scrolling through the section above. */}
      <div className="sticky top-0 h-screen w-full bg-black flex items-center justify-center overflow-hidden">
        {/*
          canvas.width / canvas.height are set to the image's natural
          resolution (via the render function). CSS max-h-screen + w-auto
          then scales it down to fit the viewport without stretching.
        */}
        <canvas
          ref={canvasRef}
          className="max-h-screen w-auto block"
        />
      </div>
    </section>
  );
}
