"use client";

import { useEffect, useRef } from "react";

export function CinematicSpotlight() {
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = spotlightRef.current;
    if (!el) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      el.style.opacity = "0.7";
      el.style.background =
        "radial-gradient(800px circle at 50% 30%, rgba(197, 168, 128, 0.04), transparent 70%)";
      return;
    }

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let targetOpacity = 0;
    let currentOpacity = 0;
    let rafId = 0;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      targetOpacity = 1;
    };

    const onMouseLeave = () => {
      targetOpacity = 0;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);

    const update = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      currentOpacity += (targetOpacity - currentOpacity) * 0.08;

      el.style.opacity = currentOpacity.toFixed(3);
      el.style.background = `radial-gradient(750px circle at ${currentX.toFixed(1)}px ${currentY.toFixed(1)}px, rgba(197, 168, 128, 0.055) 0%, rgba(197, 168, 128, 0.015) 45%, transparent 75%)`;

      rafId = requestAnimationFrame(update);
    };

    rafId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <>
      {/* 1. Cinematic Peripheral Vignette (Anamorphic Edge Chiaroscuro) */}
      <div
        className="fixed inset-0 pointer-events-none z-1"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 55%, rgba(9, 13, 10, 0.55) 100%)",
        }}
        aria-hidden="true"
      />

      {/* 2. Responsive Organic Ambient Spotlight (Smooth Weighted Lerp) */}
      <div
        ref={spotlightRef}
        className="fixed inset-0 pointer-events-none z-1"
        aria-hidden="true"
      />
    </>
  );
}

