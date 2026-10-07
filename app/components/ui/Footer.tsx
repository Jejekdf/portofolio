"use client";

import { ArrowUp } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full px-5 sm:px-8 md:px-12 lg:px-16 2xl:px-24 pt-12 pb-[max(2.5rem,env(safe-area-inset-bottom))] border-t border-[#1e2a20]/60 mt-16">
      <div className="max-w-3xl mx-auto flex flex-col items-center justify-center text-center gap-6">
        <button
          onClick={scrollToTop}
          className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0d120e] border border-[#1e2a20] text-xs text-[#9e988f] hover:text-[#f4f1eb] hover:border-[#c5a880]/50 transition-colors duration-150 cursor-pointer min-h-11 sm:min-h-9"
          aria-label="Scroll back to top"
        >
          <span>Back to top</span>
          <ArrowUp className="size-3.5 transition-transform duration-150 group-hover:-translate-y-0.5" />
        </button>

        <nav aria-label="Footer Navigation" className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-[#9e988f]">
          <a
            href="https://github.com/Jejekdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#f4f1eb] transition-colors duration-150 py-2.5 px-2 inline-flex items-center min-h-11"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/randi-maulana-dev"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#f4f1eb] transition-colors duration-150 py-2.5 px-2 inline-flex items-center min-h-11"
          >
            LinkedIn
          </a>
          <a
            href="mailto:maulanarandi531@gmail.com"
            className="hover:text-[#f4f1eb] transition-colors duration-150 py-2.5 px-2 inline-flex items-center min-h-11"
          >
            Email
          </a>
        </nav>

        <div className="flex flex-col items-center gap-1.5">
          <p className="text-xs text-[#9e988f]/80 text-pretty">
            Designed &amp; developed by Randi Maulana
          </p>
          <p className="text-xs text-[#9e988f]/50">
            &copy; {currentYear} Randi Maulana. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

