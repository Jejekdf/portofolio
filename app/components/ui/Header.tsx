"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import type { SectionId } from "@/app/types";

function MonogramIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M8 23V9H14.5C16.9853 9 19 11.0147 19 13.5C19 15.9853 16.9853 18 14.5 18H8" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M13.5 18L18.5 23" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"/>
      <path d="M18.5 23L23.5 13.5V23" stroke="#F4F1EB" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.9"/>
    </svg>
  );
}

const NAV_ITEMS: { label: string; id: SectionId }[] = [
  { label: "About", id: "hero" },
  { label: "Projects", id: "projects" },
  { label: "Certificates", id: "certificates" },
  { label: "Skills", id: "skills" },
  { label: "Contact", id: "contact" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>("hero");

  useEffect(() => {
    function handleScroll() {
      const scrollPosition = window.scrollY + 120;
      for (const item of [...NAV_ITEMS].reverse()) {
        const element = document.getElementById(item.id);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(item.id);
          break;
        }
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: SectionId) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#090d0a]/80 backdrop-blur-md border-b border-[#1e2a20]/60 pt-[env(safe-area-inset-top)] transition-all">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 h-14 sm:h-16 flex items-center justify-between">
          {/* Architectural Geometric Monogram Brand Mark (44px tap target) */}
          <button
            onClick={() => scrollTo("hero")}
            className="group min-h-11 flex items-center gap-3 cursor-pointer select-none"
            aria-label="Randi Maulana - Back to top"
          >
            <div className="size-8 rounded-lg bg-[#0d120e] border border-[#1e2a20] flex items-center justify-center text-[#c5a880] group-hover:border-[#c5a880]/60 group-hover:shadow-[0_0_12px_rgba(197,168,128,0.2)] transition-all duration-200 shrink-0">
              <MonogramIcon className="size-4" />
            </div>
            <span className="font-mono text-xs font-semibold tracking-wider text-[#f4f1eb] group-hover:text-[#c5a880] transition-colors duration-150">
              Randi Maulana
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
                      ? "text-[#f4f1eb] font-bold border-b border-[#c5a880]"
                      : "text-[#9e988f] hover:text-[#f4f1eb]"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </nav>

          {/* Mobile Menu Button (44px tap target) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 min-w-11 min-h-11 flex items-center justify-center text-[#9e988f] hover:text-[#f4f1eb] transition-colors cursor-pointer"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#090d0a]/95 backdrop-blur-xl border-b border-[#1e2a20] px-5 py-6">
            <nav className="flex flex-col gap-4">
              {NAV_ITEMS.map(({ label, id }) => {
                const isActive = activeSection === id;
                return (
                  <button
                    key={id}
                    onClick={() => scrollTo(id)}
                    className={`text-left py-2 font-mono text-sm tracking-wider uppercase transition-colors cursor-pointer ${
                      isActive
                        ? "text-[#c5a880] font-bold"
                        : "text-[#9e988f] hover:text-[#f4f1eb]"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
