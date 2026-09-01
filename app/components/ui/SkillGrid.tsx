"use client";

import { motion, type Variants } from "framer-motion";

const SKILL_MATRIX: { category: string; items: string[] }[] = [
  {
    category: "Frontend Architecture",
    items: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js • R3F"],
  },
  {
    category: "Backend & APIs",
    items: ["Node.js", "PHP", "Laravel", "REST APIs", "Server Actions", "Zod Validation"],
  },
  {
    category: "Database & Infrastructure",
    items: ["PostgreSQL", "MySQL", "Supabase", "Prisma ORM", "Redis", "Vercel"],
  },
  {
    category: "AI Engineering & Tooling",
    items: ["Gemini API", "Prompt Engineering", "Git", "Resend", "Linux", "Postman"],
  },
];

const sectionVariant: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const badgeVariant: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  show: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, delay: i * 0.03, ease: "easeOut" },
  }),
};

export function SkillGrid() {
  return (
    <motion.section
      id="skills"
      className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 py-16 sm:py-24"
      aria-label="Skills"
      variants={sectionVariant}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
    >
      {/* Editorial Section Header */}
      <div className="flex items-baseline justify-between border-b border-[#1e2a20] pb-4 mb-8">
        <h2 className="font-mono text-xs sm:text-sm font-bold tracking-[0.25em] uppercase text-[#f4f1eb]">
          Technical Capabilities
        </h2>
        <span className="font-mono text-[10px] text-[#9e988f] tracking-widest uppercase">
          Stack Matrix
        </span>
      </div>

      {/* Clean 4-Quadrant Grid without enclosing box borders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
        {SKILL_MATRIX.map((group, quadrant) => (
          <div key={group.category} className="flex flex-col gap-4">
            <span className="font-mono text-xs tracking-wider uppercase text-[#c5a880] font-semibold">
              {group.category}
            </span>

            <div className="flex flex-wrap gap-2">
              {group.items.map((item, i) => (
                <motion.span
                  key={item}
                  custom={i + quadrant * 6}
                  variants={badgeVariant}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="px-3 py-1.5 border border-[#1e2a20] bg-[#0c100d]/40 font-mono text-xs text-[#9e988f] tracking-wide hover:border-[#c5a880] hover:text-[#f4f1eb] transition-colors duration-150 cursor-default"
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
