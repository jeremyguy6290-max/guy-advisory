"use client";

import { useEffect, useRef } from "react";

const FRAME_COUNT = 76;

const inv = (start: number, end: number, v: number) =>
  Math.max(0, Math.min(1, (v - start) / (end - start)));

export default function BeehiveScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const leftRef      = useRef<HTMLDivElement>(null);
  const rightRef     = useRef<HTMLDivElement>(null);
  const leftTextRef  = useRef<HTMLParagraphElement>(null);
  const rightTextRef = useRef<HTMLParagraphElement>(null);
  const bgRef        = useRef<HTMLDivElement>(null);
  const imagesRef    = useRef<HTMLImageElement[]>([]);
  const rafRef       = useRef<number>(0);
  const lastFrameRef = useRef<number>(-1);

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

      // ── Text: fade in over first 12%, parallax drift ──────────────────
      const fadeProg = inv(0, 0.12, progress);
      const blurPx   = (1 - fadeProg) * 6;

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
      // Green bell curve: rises 0→40%, falls 55→80%
      const greenRise      = inv(0,    0.40, progress);
      const greenFall      = inv(0.55, 0.80, progress);
      const greenIntensity = greenRise * (1 - greenFall);

      // Teal bell curve: rises 35→70%, falls 82→100%
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

      // ── Text colour: navy → white as colours peak, returns at end ──────
      // colorDrive hits 1.0 at the height of the green/teal phase
      const colorDrive = Math.min(1, Math.max(greenIntensity, tealIntensity) * 1.3);
      // Navy rgb(15, 76, 92) → White rgb(255, 255, 255)
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

      // ── Frame: only re-draw when index changes ────────────────────────
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
      220vh total: 100vh sticky viewport + 120vh scroll track.
      Gives the user enough time to appreciate text fade-in,
      the full building rotation, and the colour shift.
    */
    <section
      ref={containerRef}
      style={{ height: "220vh" }}
      className="relative"
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

        {/* Full-screen animated gradient — z-0, never covers content */}
        <div
          ref={bgRef}
          className="absolute inset-0 z-0 pointer-events-none"
        />

        {/* Content grid — canvas z-10, text z-20 */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-[1fr_auto_1fr] items-center gap-6 lg:gap-12">

          {/* LEFT — fades in on scroll, drifts down */}
          <div
            ref={leftRef}
            className="relative z-20 hidden lg:block text-right"
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

          {/* Canvas */}
          <canvas
            ref={canvasRef}
            className="relative z-10 block w-[300px] h-[300px] md:w-[440px] md:h-[440px] lg:w-[460px] lg:h-[460px]"
          />

          {/* RIGHT — fades in on scroll, drifts up */}
          <div
            ref={rightRef}
            className="relative z-20 hidden lg:block text-left"
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
