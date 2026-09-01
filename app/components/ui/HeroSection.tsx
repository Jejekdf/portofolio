"use client";

import dynamic from "next/dynamic";
import { motion, type Variants } from "framer-motion";
import { Mail, ArrowUpRight, FileText } from "lucide-react";

function LinkedinIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function GithubIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

const HeroCanvas = dynamic(
  () => import("@/app/components/canvas/Scene").then((m) => m.Scene),
  { ssr: false }
);

const ParticleField = dynamic(
  () => import("@/app/components/canvas/ParticleField").then((m) => m.ParticleField),
  { ssr: false }
);

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.65, ease: "easeOut" } },
};

const nameVariant: Variants = {
  hidden: { opacity: 0, y: 35, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.85, ease: "easeOut" } },
};

export function HeroSection() {
  const email = "maulanarandi531@gmail.com";
  const linkedinUrl = "https://www.linkedin.com/in/randi-maulana-dev";
  const githubUrl = "https://github.com/Jejekdf";

  return (
    <section
      id="hero"
      className="relative max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 pt-28 sm:pt-36 pb-12 sm:pb-20 overflow-hidden"
      aria-label="About"
    >
      {/* Interactive Background Canvas (3D Spatial Backdrop + Particles) */}
      <div className="absolute inset-0 pointer-events-none -z-0">
        <ParticleField />
        <HeroCanvas />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-col gap-10 sm:gap-14"
      >
        {/* Top Status & Role Meta */}
        <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src="/profile.webp"
              alt="Profile photo"
              className="size-10 sm:size-11 object-cover rounded-full border border-[#1e2a20]"
              loading="eager"
            />
            <div className="flex flex-col">
              <span className="font-mono text-xs text-[#f4f1eb] font-medium tracking-wide">
                Fullstack Software Engineer
              </span>
              <span className="font-mono text-[10px] text-[#c5a880] tracking-wider uppercase">
                Available for Work
              </span>
            </div>
          </div>

          {/* Direct Social Links */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 min-h-[40px] sm:min-h-0 text-[#9e988f] hover:text-[#f4f1eb] font-mono text-xs tracking-wider transition-colors duration-150"
            >
              <GithubIcon className="size-3.5" />
              <span>GitHub</span>
            </a>
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 min-h-[40px] sm:min-h-0 text-[#9e988f] hover:text-[#f4f1eb] font-mono text-xs tracking-wider transition-colors duration-150"
            >
              <LinkedinIcon className="size-3.5" />
              <span>LinkedIn</span>
            </a>
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 min-h-[40px] sm:min-h-0 text-[#9e988f] hover:text-[#c5a880] font-mono text-xs tracking-wider transition-colors duration-150"
            >
              <Mail className="size-3.5" />
              <span>Email</span>
            </a>
          </div>
        </motion.div>

        {/* Singular Focal Signature Headline */}
        <div className="flex flex-col gap-6 max-w-4xl">
          <motion.h1
            variants={nameVariant}
            className="font-bold uppercase tracking-tight leading-[0.88] text-[#f4f1eb] text-balance"
            style={{ fontSize: "clamp(3rem, 10.5vw, 8.5rem)" }}
          >
            Randi<br />Maulana
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-base sm:text-lg lg:text-xl text-[#9e988f] max-w-2xl leading-relaxed text-pretty font-light"
          >
            Building robust web applications, high-concurrency backend APIs, and modern database architectures with Next.js 16, React 19, TypeScript, PHP, Laravel, and PostgreSQL.
          </motion.p>
        </div>

        {/* Action CTAs */}
        <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
          <button
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            className="inline-flex items-center gap-2 px-7 py-3.5 min-h-[44px] bg-[#c5a880] text-[#090d0a] font-mono text-xs font-bold uppercase tracking-widest hover:bg-[#f4f1eb] transition-colors duration-150 cursor-pointer"
          >
            Explore Projects
            <ArrowUpRight className="size-3.5" />
          </button>
          <a
            href="/CV_Randi.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 min-h-[44px] border border-[#1e2a20] text-[#f4f1eb] font-mono text-xs tracking-widest uppercase hover:border-[#c5a880] hover:text-[#c5a880] transition-colors duration-150"
          >
            <FileText className="size-3.5" />
            <span>Download CV</span>
          </a>
          <a
            href={`mailto:${email}`}
            className="inline-flex items-center gap-2 px-6 py-3.5 min-h-[44px] text-[#9e988f] font-mono text-xs tracking-widest uppercase hover:text-[#f4f1eb] transition-colors duration-150"
          >
            Get in Touch
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
