"use client";
import { useEffect } from "react";
import { useAppStore } from "@/app/lib/store";
import type { SectionId } from "@/app/types";

const SECTIONS: SectionId[] = ["hero", "projects", "certificates", "skills", "contact"];

export function useScrollSpy() {
  const setActiveSection = useAppStore((s) => s.setActiveSection);
  const setScrollProgress = useAppStore((s) => s.setScrollProgress);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? scrollTop / docHeight : 0);

      for (const id of [...SECTIONS].reverse()) {
        const el = document.getElementById(id);
        if (el && scrollTop >= el.offsetTop - window.innerHeight / 2) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [setActiveSection, setScrollProgress]);
}
