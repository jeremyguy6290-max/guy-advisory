"use client";

import { useEffect, useRef } from "react";

const FRAME_COUNT = 76;

const inv = (start: number, end: number, v: number) =>
  Math.max(0, Math.min(1, (v - start) / (end - start)));

export default function BeehiveScroll() {
  const containerRef  = useRef<HTMLDivElement>(null);
  const canvasRef     = useRef<HTMLCanvasElement>(null);
  const mobileTextRef = useRef<HTMLDivElement>(null);
  const leftRef       = useRef<HTMLDivElement>(null);
  const rightRef      = useRef<HTMLDivElement>(null);
  const leftTextRef   = useRef<HTMLParagraphElement>(null);
  const rightTextRef  = useRef<HTMLParagraphElement>(null);
  const bgRef         = useRef<HTMLDivElement>(null);
  const imagesRef     = useRef<HTMLImageElement[]>([]);
  const rafRef        = useRef<number>(0);
  const lastFrameRef  = useRef<number>(-1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // ── Retina / HiDPI ────────────────────────────────────────────────────
    const dpr  = window.devicePixelRatio || 1;
    const cssW = canvas.clientWidth;
    const cssH = canvas.clientHeight;
    canvas.width  = cssW * dpr;
    canvas.height = cssH * dpr;
    ctx.scale(dpr, dpr);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    // ── Render frame ──────────────────────────────────────────────────────
    const render = (index: number) => {
      const img = imagesRef.current[index];
      if (!img?.complete || !img.naturalWidth) return;
      ctx.clearRect(0, 0, cssW, cssH);
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

      // ── Text: fade in over first 12% ──────────────────────────────────
      const fadeProg = inv(0, 0.12, progress);
      const blurPx   = (1 - fadeProg) * 6;

      // Mobile text: simple opacity fade, no blur or parallax
      if (mobileTextRef.current)
        mobileTextRef.current.style.opacity = fadeProg.toFixed(3);

      // Desktop left/right: fade + blur + parallax
      if (leftRef.current) {
        leftRef.current.style.opacity   = fadeProg.toFixed(3);
        leftRef.current.style.filter    = `blur(${blurPx.toFixed(1)}px)`;
        leftRef.current.style.transform = `translateY(${(progress * 30).toFixed(1)}px)`;
      }
      if (rightRef.current) {
        rightRef.current.style.opacity   = fadeProg.toFixed(3);
        rightRef.current.style.filter    = `blur(${blurPx.toFixed(1)}px)`;
        rightRef.current.style.transform = `translateY(${(progress * -30).toFixed(1)}px)`;
      }

      // ── Background gradient phases ─────────────────────────────────────
      const greenRise      = inv(0,    0.40, progress);
      const greenFall      = inv(0.55, 0.80, progress);
      const greenIntensity = greenRise * (1 - greenFall);

      const tealRise      = inv(0.35, 0.70, progress);
      const tealFall      = inv(0.82, 1.00, progress);
      const tealIntensity = tealRise * (1 - tealFall);

      if (bgRef.current) {
        const gOp = (greenIntensity * 0.88).toFixed(3);
        const tOp = (tealIntensity  * 0.92).toFixed(3);
        bgRef.current.style.background = [
          `radial-gradient(ellipse 160% 140% at 50% 50%, rgba(132,204,22,${gOp}), transparent 65%)`,
          `radial-gradient(ellipse 160% 140% at 50% 50%, rgba(14,165,164,${tOp}), transparent 65%)`,
        ].join(", ");
      }

      // ── Desktop text colour: navy → white as colours peak ─────────────
      const colorDrive = Math.min(1, Math.max(greenIntensity, tealIntensity) * 1.3);
      const r = Math.round(15 + 240 * colorDrive);
      const g = Math.round(76 + 179 * colorDrive);
      const b = Math.round(92 + 163 * colorDrive);
      const shadowOp = (colorDrive * 0.4).toFixed(2);
      const shadow   = colorDrive > 0.05 ? `0 1px 12px rgba(0,0,0,${shadowOp})` : "none";

      if (leftTextRef.current) {
        leftTextRef.current.style.color      = `rgb(${r},${g},${b})`;
        leftTextRef.current.style.textShadow = shadow;
      }
      if (rightTextRef.current) {
        rightTextRef.current.style.color      = `rgba(${r},${g},${b},0.82)`;
        rightTextRef.current.style.textShadow = shadow;
      }

      // ── Frame: only re-draw when index changes ─────────────────────────
      const frame = Math.min(FRAME_COUNT - 1, Math.floor(progress * FRAME_COUNT));
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
    /*
      Mobile:  150vh — short enough to feel purposeful (50vh scroll track)
      Desktop: 220vh — longer track to appreciate text fade + full rotation
    */
    <section
      ref={containerRef}
      className="relative h-[150vh] lg:h-[220vh]"
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

        {/* Full-screen animated gradient — z-0 */}
        <div
          ref={bgRef}
          className="absolute inset-0 z-0 pointer-events-none"
        />

        {/*
          Content wrapper
          ─ Mobile  (<lg): flex-col, text above canvas, both centered
          ─ Desktop (≥lg): 3-col grid [left text | canvas | right text]

          display:none items (hidden/lg:hidden) are excluded from both
          flex and grid layout, so each breakpoint sees exactly the right
          elements in exactly the right order.
        */}
        <div className="
          relative z-10 w-full
          flex flex-col items-center gap-6 px-6
          lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-12 lg:max-w-7xl lg:mx-auto lg:px-12
        ">

          {/* ── Mobile text — lg:hidden, first in DOM so it sits above canvas ── */}
          <div
            ref={mobileTextRef}
            className="lg:hidden w-full text-center"
            style={{ opacity: 0, willChange: "opacity" }}
          >
            <span className="block text-xs tracking-[0.2em] uppercase text-[#0ea5a4] font-medium mb-3">
              Government Relations
            </span>
            <h2 className="text-2xl font-bold uppercase leading-tight tracking-wider text-[#0f4c5c] mb-3">
              Where decisions<br />are made.
            </h2>
            <p className="text-sm text-[#0f4c5c]/70 leading-relaxed max-w-[300px] mx-auto">
              Guy Advisory helps organisations navigate government, build trust
              and turn complex conversations into clear outcomes.
            </p>
          </div>

          {/* ── Desktop LEFT text — hidden on mobile ── */}
          <div
            ref={leftRef}
            className="hidden lg:block relative z-20 text-right"
            style={{ opacity: 0, willChange: "transform, opacity, filter" }}
          >
            <p
              ref={leftTextRef}
              className="text-2xl xl:text-3xl 2xl:text-4xl font-bold uppercase leading-tight tracking-wider"
              style={{ color: "#0f4c5c" }}
            >
              Inside the room<br />where decisions<br />are made.
            </p>
          </div>

          {/* ── Canvas — always rendered, size is responsive ── */}
          <canvas
            ref={canvasRef}
            className="relative z-10 block w-[280px] h-[280px] lg:w-[460px] lg:h-[460px]"
          />

          {/* ── Desktop RIGHT text — hidden on mobile ── */}
          <div
            ref={rightRef}
            className="hidden lg:block relative z-20 text-left"
            style={{ opacity: 0, willChange: "transform, opacity, filter" }}
          >
            <p
              ref={rightTextRef}
              className="text-base xl:text-lg leading-relaxed max-w-[220px] xl:max-w-[260px]"
              style={{ color: "rgba(15,76,92,0.82)" }}
            >
              We help organisations navigate government,
              shape conversations, and turn influence
              into real-world outcomes.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
