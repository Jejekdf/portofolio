"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useAppStore } from "@/app/lib/store";
import type { SectionId } from "@/app/types";

const NAV_ITEMS: { label: string; id: SectionId }[] = [
  { label: "About", id: "hero" },
  { label: "Projects", id: "projects" },
  { label: "Credentials", id: "certificates" },
  { label: "Stack", id: "skills" },
  { label: "Contact", id: "contact" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const activeSection = useAppStore((s) => s.activeSection);

  const scrollTo = (id: SectionId) => {
    setIsOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#090d0a]/80 backdrop-blur-md border-b border-[#1e2a20]/60 pt-[env(safe-area-inset-top)] transition-all">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 h-14 sm:h-16 flex items-center justify-between">
          {/* Monogram Brand Mark - No redundant name */}
          <button
            onClick={() => scrollTo("hero")}
            className="group flex items-center gap-2.5 cursor-pointer"
            aria-label="Scroll to top"
          >
            <span className="font-mono text-xs font-bold tracking-widest text-[#090d0a] bg-[#c5a880] px-2 py-0.5 group-hover:bg-[#f4f1eb] transition-colors duration-150">
              RM
            </span>
            <span className="hidden sm:inline-block font-mono text-[11px] text-[#9e988f] tracking-wider uppercase group-hover:text-[#f4f1eb] transition-colors duration-150">
              Fullstack Engineer
            </span>
          </button>

          {/* Minimalist Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 sm:gap-2">
            {NAV_ITEMS.map(({ label, id }) => {
              const isActive = activeSection === id;
              return (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className={`px-3 py-1.5 font-mono text-xs tracking-wider uppercase transition-colors duration-150 cursor-pointer ${
                    isActive
                      ? "text-[#c5a880] font-semibold"
                      : "text-[#9e988f] hover:text-[#f4f1eb]"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </nav>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open navigation"}
            className="md:hidden min-w-[44px] min-h-[44px] flex items-center justify-center text-[#9e988f] hover:text-[#f4f1eb] transition-colors duration-150 cursor-pointer"
          >
            {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="fixed top-14 left-0 right-0 z-40 md:hidden border-b border-[#1e2a20] bg-[#090d0a]/95 backdrop-blur-lg px-6 py-6 flex flex-col gap-3"
          >
            {NAV_ITEMS.map(({ label, id }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="w-full text-left py-3 min-h-[44px] flex items-center font-mono text-sm tracking-widest uppercase text-[#9e988f] hover:text-[#c5a880] transition-colors duration-150 cursor-pointer"
              >
                {label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
