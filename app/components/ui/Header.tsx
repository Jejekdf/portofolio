"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import type { SectionId } from "@/app/types";

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
          {/* Monogram Brand Mark */}
          <button
            onClick={() => scrollTo("hero")}
            className="group flex items-center gap-2 cursor-pointer"
            aria-label="Scroll to top"
          >
            <span className="font-mono text-xs font-bold tracking-widest text-[#090d0a] bg-[#c5a880] px-2.5 py-1 group-hover:bg-[#f4f1eb] transition-colors duration-150">
              RM
            </span>
          </button>

          {/* Minimalist Desktop Nav (No bullets/dots) */}
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

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 min-w-11 min-h-11 flex items-center justify-center text-[#9e988f] hover:text-[#f4f1eb] transition-colors cursor-pointer"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer (No bullets/dots) */}
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
