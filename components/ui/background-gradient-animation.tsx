"use client";

import { useCallback, useEffect, useRef } from "react";

export default function BackgroundGradientAnimation({
  children,
}: {
  children?: React.ReactNode;
}) {
  const containerRef  = useRef<HTMLDivElement>(null);
  const cursorBlobRef = useRef<HTMLDivElement>(null);
  const rafRef        = useRef<number>(0);

  // Target position (set by mouse); stays at centre when mouse is outside.
  const targetRef = useRef({ x: 0.5, y: 0.5 });
  // Smoothed position that lags behind the target every frame.
  const smoothRef = useRef({ x: 0.5, y: 0.5 });
  // Whether the mouse is currently inside the hero container.
  const activeRef = useRef(false);

  useEffect(() => {
    const tick = () => {
      // If mouse left the hero, ease back to centre; otherwise follow mouse.
      const tx = activeRef.current ? targetRef.current.x : 0.5;
      const ty = activeRef.current ? targetRef.current.y : 0.5;

      smoothRef.current.x += (tx - smoothRef.current.x) * 0.05;
      smoothRef.current.y += (ty - smoothRef.current.y) * 0.05;

      if (cursorBlobRef.current) {
        cursorBlobRef.current.style.left = `${smoothRef.current.x * 100}%`;
        cursorBlobRef.current.style.top  = `${smoothRef.current.y * 100}%`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // Track position relative to the hero container only.
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      targetRef.current = {
        x: (e.clientX - rect.left)  / rect.width,
        y: (e.clientY - rect.top)   / rect.height,
      };
      activeRef.current = true;
    },
    []
  );

  // Ease back to centre when the mouse leaves the hero area.
  const handleMouseLeave = useCallback(() => {
    activeRef.current = false;
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen overflow-hidden bg-white"
    >
      {/* ── Static drifting blobs ─────────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        aria-hidden="true"
      >
        <div
          className="blob-drift-1 absolute rounded-full blur-[120px]"
          style={{
            background: "#00b8b8",
            opacity: 0.28,
            width: "65%",
            height: "65%",
            top: "-5%",
            left: "-5%",
          }}
        />
        <div
          className="blob-drift-2 absolute rounded-full blur-[120px]"
          style={{
            background: "#7ed957",
            opacity: 0.22,
            width: "55%",
            height: "55%",
            bottom: "-5%",
            right: "-5%",
          }}
        />
      </div>

      {/* ── Cursor-following glow ─────────────────────────────────────── */}
      <div
        ref={cursorBlobRef}
        className="absolute pointer-events-none z-0"
        aria-hidden="true"
        style={{
          width: "42%",
          height: "42%",
          transform: "translate(-50%, -50%)",
          top: "50%",
          left: "50%",
        }}
      >
        <div
          className="w-full h-full rounded-full blur-[90px]"
          style={{ background: "#00b8b8", opacity: 0.18 }}
        />
      </div>

      {/* ── Hero content — above every background layer ───────────────── */}
      <div className="relative z-10">{children}</div>

      {/* ── Bottom fade to white — smooths the hero-to-section join ─────
           pointer-events-none so buttons above it remain fully clickable. */}
      <div
        className="absolute inset-x-0 bottom-0 pointer-events-none z-20"
        style={{
          height: "180px",
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.55) 50%, #ffffff 100%)",
        }}
        aria-hidden="true"
      />
    </div>
  );
}
