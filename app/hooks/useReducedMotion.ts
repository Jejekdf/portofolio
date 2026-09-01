"use client";
import { useEffect, useState } from "react";
import { useAppStore } from "@/app/lib/store";

export function useReducedMotion(): boolean {
  const setReducedMotion = useAppStore((s) => s.setReducedMotion);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = (e: MediaQueryListEvent | MediaQueryList) => {
      setReduced(e.matches);
      setReducedMotion(e.matches);
    };
    update(mq);
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [setReducedMotion]);

  return reduced;
}
