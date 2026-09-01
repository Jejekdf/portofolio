"use client";

import { motion, type Variants } from "framer-motion";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import type { Project } from "@/app/types";

const PROJECTS: (Project & { scope: string })[] = [
  {
    id: "courtgrid",
    title: "Courtgrid",
    scope: "Multi-tenant SaaS • Booking Platform",
    description: "Multi-tenant sports center management SaaS with automated slot reservations, sub-50ms Redis-cached availability queries, rate-limited booking endpoints, and Prisma multi-schema isolation.",
    tags: ["Next.js 16", "TypeScript", "Prisma", "Supabase", "Redis", "Tailwind CSS"],
    github: "https://github.com/Jejekdf/Courtgrid",
    demo: "https://courtgrid-one.vercel.app",
  },
  {
    id: "gemini-flash-api",
    title: "Gemini Flash API",
    scope: "AI Prompt Pipeline • Backend Integration",
    description: "High-throughput API gateway connecting to Google Gemini multimodal endpoints, featuring prompt pipelining, sub-second latency streaming, and strict Zod JSON schema validation.",
    tags: ["Google Gemini API", "Python", "Node.js", "REST APIs"],
    github: "https://github.com/Jejekdf/Gemini_Flash_API",
  },
  {
    id: "employee-management",
    title: "Employee Management System",
    scope: "Enterprise Portal • Role-based Access",
    description: "Enterprise operational portal managing employee lifecycle records, role-based access control (RBAC), and high-performance PostgreSQL aggregation queries for automated payroll workflows.",
    tags: ["JavaScript", "Fullstack", "PostgreSQL", "Tailwind CSS"],
    github: "https://github.com/Jejekdf/employee-management-system",
  },
  {
    id: "my-notes",
    title: "My Notes",
    scope: "Developer Workspace • Persistence Layer",
    description: "Fullstack developer workspace with full offline persistence, instant markdown indexing, and debounced database sync for uninterrupted daily engineering notes.",
    tags: ["React", "TypeScript", "Node.js", "Database"],
    github: "https://github.com/Jejekdf/My_Notes",
  },
];

const sectionVariant: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const rowVariant: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.08, ease: "easeOut" },
  }),
};

export function ProjectGrid() {
  return (
    <motion.section
      id="projects"
      className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 py-16 sm:py-24"
      aria-label="Projects"
      variants={sectionVariant}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
    >
      {/* Editorial Section Header */}
      <div className="flex items-baseline justify-between border-b border-[#1e2a20] pb-4 mb-8">
        <h2 className="font-mono text-xs sm:text-sm font-bold tracking-[0.25em] uppercase text-[#f4f1eb]">
          Featured Projects
        </h2>
        <span className="font-mono text-2xs text-[#9e988f] tracking-widest uppercase">
          {PROJECTS.length} Repositories
        </span>
      </div>

      {/* Open Editorial List Feed */}
      <div className="divide-y divide-[#1e2a20]">
        {PROJECTS.map((project, i) => (
          <motion.article
            key={project.id}
            custom={i}
            variants={rowVariant}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-30px" }}
            className="group py-8 sm:py-10 flex flex-col lg:flex-row lg:items-start justify-between gap-6 lg:gap-12 transition-colors duration-200"
          >
            {/* Project Title & Scope */}
            <div className="lg:w-72 shrink-0">
              <h3 className="font-mono text-base sm:text-lg font-bold text-[#f4f1eb] group-hover:text-[#c5a880] transition-colors duration-150 uppercase tracking-wide">
                {project.title}
              </h3>
              <p className="font-mono text-xs-sub text-[#c5a880] mt-1.5 leading-relaxed">
                {project.scope}
              </p>
            </div>

            {/* Description with Impact Metrics */}
            <p className="flex-1 text-sm sm:text-base text-[#9e988f] leading-relaxed text-pretty font-light">
              {project.description}
            </p>

            {/* Tech Tags & Action Links */}
            <div className="lg:w-60 shrink-0 flex flex-col gap-3">
              <p className="font-mono text-xs-sub text-[#9e988f]/80 leading-relaxed">
                {project.tags.join(" · ")}
              </p>

              <div className="flex items-center gap-4 pt-1">
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 min-h-11 sm:min-h-0 font-mono text-xs uppercase tracking-wider text-[#c5a880] hover:text-[#f4f1eb] font-semibold transition-colors duration-150"
                  >
                    <span>Live Demo</span>
                    <ArrowUpRight className="size-3.5" />
                  </a>
                )}
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 min-h-11 sm:min-h-0 font-mono text-xs uppercase tracking-wider text-[#9e988f] hover:text-[#f4f1eb] transition-colors duration-150"
                >
                  <span>Source Code</span>
                  <ExternalLink className="size-3" />
                </a>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </motion.section>
  );
}
