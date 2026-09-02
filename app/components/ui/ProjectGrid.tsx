"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import type { Project } from "@/app/types";

const PROJECTS: (Project & { scope: string; featured?: boolean })[] = [
  {
    id: "courtgrid",
    title: "Courtgrid",
    scope: "Sports Venue Management Platform",
    description:
      "Enterprise multi-tenant booking engine handling atomic slot reservations, live schedule visualization, Stripe checkout, and Upstash Redis rate limiting. Prevents double-booking with PostgreSQL database transactions.",
    tags: ["Next.js 16", "React 19", "TypeScript", "Prisma ORM", "PostgreSQL", "Supabase", "Stripe", "Upstash Redis", "Tailwind CSS"],
    github: "https://github.com/Jejekdf/Courtgrid",
    demo: "https://courtgrid-one.vercel.app",
    featured: true,
  },
  {
    id: "gemini-flash-api",
    title: "Gemini Flash API Gateway",
    scope: "High-Throughput AI Proxy",
    description:
      "High-performance API gateway integration wrapping Google Gemini Flash models with Multer multipart payload processing, structured prompt pipelines, and resilient error telemetry.",
    tags: ["Node.js", "Express 5", "Google GenAI SDK", "Multer", "JavaScript"],
    github: "https://github.com/Jejekdf/Gemini_Flash_API",
  },
  {
    id: "employee-management-system",
    title: "Employee Management System",
    scope: "Enterprise HR Portal",
    description:
      "Comprehensive workplace administration system built with Laravel 12 and Filament v3, featuring role-based access control, departmental hierarchy records, and automated Excel reporting.",
    tags: ["PHP 8.2+", "Laravel 12", "Filament v3", "MySQL", "Tailwind CSS"],
    github: "https://github.com/Jejekdf/employee-management-system",
  },
  {
    id: "my-notes",
    title: "My Notes Workspace",
    scope: "Cross-Platform Mobile Notes",
    description:
      "Cross-platform mobile note-taking application built with Flutter and Dart, featuring local SQLite persistence, dynamic staggered grid layouts, and fast offline documentation management.",
    tags: ["Flutter", "Dart", "SQLite", "Mobile App"],
    github: "https://github.com/Jejekdf/My_Notes",
  },
  {
    id: "r-sec-smart-alarm",
    title: "R-Sec Smart Alarm",
    scope: "IoT Embedded Security",
    description:
      "Embedded hardware security firmware running on ESP32 microcontrollers, monitoring real-time intrusion sensors with immediate buzzer triggers, I2C LCD telemetry, and Blynk IoT Cloud sync.",
    tags: ["ESP32", "C++", "Arduino", "Blynk IoT Cloud", "I2C Bus", "Hardware"],
    github: "https://github.com/Jejekdf/r-sec-smart-alarm",
  },
];

const CINEMATIC_EASE = [0.16, 1, 0.3, 1] as const;

const sectionVariant: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: CINEMATIC_EASE } },
};

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.08, ease: CINEMATIC_EASE },
  }),
};

export function ProjectGrid() {
  const featuredProject = PROJECTS.find((p) => p.featured) || PROJECTS[0];
  const sideProjects = PROJECTS.filter((p) => !p.featured);

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
      {/* Editorial Scene Header */}
      <div className="flex items-baseline justify-between border-b border-[#1e2a20] pb-4 mb-10">
        <div>
          <h2 className="font-mono text-xs sm:text-sm font-bold tracking-[0.25em] uppercase text-[#f4f1eb]">
            Featured Systems
          </h2>
          <p className="font-mono text-2xs text-[#9e988f] mt-1">
            Production web platforms, API gateways, and mobile IoT systems
          </p>
        </div>
        <span className="font-mono text-2xs text-[#c5a880] tracking-widest uppercase">
          {PROJECTS.length} Systems
        </span>
      </div>

      {/* Cinematic Bento Grid Layout */}
      <div className="flex flex-col gap-6">
        {/* 1. Primary Featured Hero Card */}
        <motion.article
          custom={0}
          variants={cardVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-30px" }}
          className="group relative p-6 sm:p-8 md:p-10 rounded-2xl bg-[#0d120e]/80 border border-[#1e2a20] hover:border-[#c5a880]/50 transition-all duration-300 backdrop-blur-md overflow-hidden"
        >
          {/* Ambient Radial Highlight */}
          <div
            className="absolute top-0 right-0 w-96 h-96 bg-[#c5a880]/5 rounded-full blur-3xl pointer-events-none group-hover:bg-[#c5a880]/10 transition-colors duration-500"
            aria-hidden="true"
          />

          <div className="relative z-10 flex flex-col gap-6">
            {/* Header Meta */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="font-mono text-xs text-[#c5a880] font-semibold tracking-wide">
                {featuredProject.scope}
              </span>
            </div>

            {/* Title & Description */}
            <div className="flex flex-col gap-3 max-w-3xl">
              <h3 className="font-mono text-2xl sm:text-3xl font-bold text-[#f4f1eb] group-hover:text-[#c5a880] transition-colors duration-200 uppercase tracking-wide">
                {featuredProject.title}
              </h3>
              <p className="text-sm sm:text-base text-[#9e988f] leading-relaxed text-pretty font-light">
                {featuredProject.description}
              </p>
            </div>

            {/* Tech Chips & Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-[#1e2a20]/60">
              <div className="flex flex-wrap items-center gap-1.5">
                {featuredProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 rounded-full border border-[#1e2a20] bg-[#1e2a20]/40 font-mono text-2xs text-[#9e988f] group-hover:border-[#c5a880]/30 group-hover:text-[#f4f1eb] transition-colors duration-150"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4">
                {featuredProject.demo && (
                  <a
                    href={featuredProject.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-[#c5a880] text-[#090d0a] font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#f4f1eb] transition-colors duration-150 shadow-md"
                  >
                    <span>Live Demo</span>
                    <ArrowUpRight className="size-3.5" />
                  </a>
                )}
                <a
                  href={featuredProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-[#1e2a20] font-mono text-xs uppercase tracking-wider text-[#9e988f] hover:text-[#f4f1eb] hover:border-[#c5a880] transition-colors duration-150"
                >
                  <span>Source Code</span>
                  <ExternalLink className="size-3.5" />
                </a>
              </div>
            </div>
          </div>
        </motion.article>

        {/* 2. Side-by-Side 2-Column Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sideProjects.map((project, idx) => (
            <motion.article
              key={project.id}
              custom={idx + 1}
              variants={cardVariant}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-30px" }}
              className="group relative p-6 sm:p-8 rounded-2xl bg-[#0d120e]/80 border border-[#1e2a20] hover:border-[#c5a880]/50 transition-all duration-300 backdrop-blur-md flex flex-col justify-between gap-6"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-2xs text-[#c5a880] font-medium uppercase tracking-wider">
                    {project.scope}
                  </span>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${project.title} source code on GitHub`}
                    className="text-[#9e988f] hover:text-[#c5a880] transition-colors duration-150"
                  >
                    <ExternalLink className="size-4" />
                  </a>
                </div>

                <div className="flex flex-col gap-1.5">
                  <h3 className="font-mono text-xl font-bold text-[#f4f1eb] group-hover:text-[#c5a880] transition-colors duration-200 uppercase tracking-wide">
                    {project.title}
                  </h3>
                </div>

                <p className="text-sm text-[#9e988f] leading-relaxed text-pretty font-light">
                  {project.description}
                </p>
              </div>

              <div className="flex flex-col gap-4 pt-4 border-t border-[#1e2a20]/60">
                <div className="flex flex-wrap items-center gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full border border-[#1e2a20] bg-[#1e2a20]/40 font-mono text-2xs text-[#9e988f] group-hover:border-[#c5a880]/30 group-hover:text-[#f4f1eb] transition-colors duration-150"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-end pt-1">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-mono text-2xs uppercase tracking-wider text-[#c5a880] hover:text-[#f4f1eb] transition-colors duration-150"
                  >
                    <span>View GitHub</span>
                    <ArrowUpRight className="size-3" />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
