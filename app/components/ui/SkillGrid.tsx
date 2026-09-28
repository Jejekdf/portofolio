"use client";

import { motion, type Variants } from "framer-motion";
import { Code2, Server, Database, BrainCircuit } from "lucide-react";

interface SkillCategory {
  category: string;
  scope: string;
  icon: typeof Code2;
  items: string[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "Frontend Architecture",
    scope: "High-performance reactive interfaces",
    icon: Code2,
    items: ["Next.js 16", "React 19", "TypeScript", "Three.js", "Tailwind CSS", "Framer Motion"],
  },
  {
    category: "Backend Architecture",
    scope: "Resilient APIs and business logic",
    icon: Server,
    items: ["PHP", "Laravel", "Node.js", "REST APIs", "Server Actions", "WebSockets"],
  },
  {
    category: "Database & Cloud",
    scope: "Data modeling and deployment",
    icon: Database,
    items: ["PostgreSQL", "MySQL", "Supabase", "Prisma ORM", "Redis", "Vercel"],
  },
  {
    category: "AI & Workflows",
    scope: "LLM pipelines and tooling",
    icon: BrainCircuit,
    items: ["Google GenAI SDK", "Prompt Pipelines", "Git", "Resend API", "Linux", "Postman"],
  },
];

const CINEMATIC_EASE = [0.16, 1, 0.3, 1] as const;

const sectionVariant: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: CINEMATIC_EASE } },
};

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: CINEMATIC_EASE },
  }),
};

export function SkillGrid() {
  return (
    <motion.section
      id="skills"
      className="w-full px-5 sm:px-8 md:px-12 lg:px-16 2xl:px-24 py-16 sm:py-24"
      aria-label="Skills"
      variants={sectionVariant}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
    >
      {/* Editorial Scene Header */}
      <div className="flex items-baseline justify-between border-b border-[#1e2a20] pb-4 mb-10">
        <div>
          <span className="font-mono text-xs text-[#c5a880] font-semibold tracking-[0.25em] uppercase">
            Technical Stack
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-tight text-[#f4f1eb] mt-1 text-balance">
            Capabilities Matrix
          </h2>
          <p className="font-mono text-xs sm:text-sm text-[#9e988f] mt-1">
            Core engineering domains and technologies
          </p>
        </div>
        <span className="font-mono text-xs sm:text-sm text-[#c5a880] tracking-widest uppercase">
          4 Domains
        </span>
      </div>

      {/* 4-Quadrant Architecture Cards Grid (Expands to 4-cols on laptop & desktop) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {SKILL_CATEGORIES.map(({ category, scope, icon: Icon, items }, i) => (
          <motion.div
            key={category}
            custom={i}
            variants={cardVariant}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-30px" }}
            className="group relative p-6 sm:p-7 rounded-2xl bg-[#0d120e]/80 border border-[#1e2a20] hover:border-[#c5a880]/50 transition-all duration-300 backdrop-blur-md flex flex-col justify-between gap-6"
          >
            {/* Top Category Info */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="size-10 rounded-xl bg-[#1e2a20]/60 border border-[#1e2a20] flex items-center justify-center text-[#c5a880] group-hover:scale-110 group-hover:border-[#c5a880]/40 transition-all duration-300">
                  <Icon className="size-5" />
                </div>
                <span className="font-mono text-xs text-[#9e988f]/50 uppercase tracking-wider">
                  0{i + 1}
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <h3 className="font-mono text-base sm:text-lg font-bold text-[#f4f1eb] group-hover:text-[#c5a880] transition-colors duration-150 uppercase tracking-wide">
                  {category}
                </h3>
                <p className="font-mono text-xs text-[#9e988f] leading-relaxed">
                  {scope}
                </p>
              </div>
            </div>

            {/* Skills Pills Matrix */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-[#1e2a20]/60">
              {items.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center px-3 py-1 rounded-full border border-[#1e2a20] bg-[#1e2a20]/30 font-mono text-xs text-[#f4f1eb] group-hover:border-[#c5a880]/30 transition-colors duration-150"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
