"use client";

import { motion, type Variants } from "framer-motion";
import { ExternalLink } from "lucide-react";
import type { Certificate } from "@/app/types";

const CERTIFICATES: Certificate[] = [
  {
    id: "codepolitan-fullstack",
    title: "Fullstack Web Development & Software Engineering",
    issuer: "CodePolitan",
    issueDate: "Verified Credential",
    credentialUrl: "https://www.linkedin.com/in/randi-maulana-dev",
    skills: ["Fullstack", "Web Development", "JavaScript", "Database"],
  },
  {
    id: "bnsp-network-admin",
    title: "Certified Network Administrator",
    issuer: "BNSP",
    issueDate: "No. 17230227",
    credentialUrl: "https://www.linkedin.com/in/randi-maulana-dev",
    skills: ["Network Administration", "Infrastructure", "Systems"],
  },
  {
    id: "huawei-hcia",
    title: "Huawei Certified ICT Associate (HCIA)",
    issuer: "Huawei",
    issueDate: "Verified Credential",
    credentialUrl: "https://www.linkedin.com/in/randi-maulana-dev",
    skills: ["Datacom", "Networking Protocols", "Cloud Infrastructure"],
  },
  {
    id: "ibm-granite",
    title: "Granite Foundation Models & Enterprise AI",
    issuer: "IBM",
    issueDate: "Verified Credential",
    credentialUrl: "https://www.linkedin.com/in/randi-maulana-dev",
    skills: ["GenAI Architecture", "Enterprise AI", "LLM Workflows"],
  },
  {
    id: "code-generation-ai",
    title: "AI Code Generation & Developer Workflows",
    issuer: "Professional Competency",
    issueDate: "Verified Credential",
    credentialUrl: "https://www.linkedin.com/in/randi-maulana-dev",
    skills: ["AI Workflows", "Prompt Architecture", "Code Generation"],
  },
  {
    id: "maju-bareng-ai",
    title: "Maju Bareng AI Program",
    issuer: "Google",
    issueDate: "Verified Credential",
    credentialUrl: "https://www.linkedin.com/in/randi-maulana-dev",
    skills: ["Artificial Intelligence", "Machine Learning", "Google Cloud"],
  },
];

const sectionVariant: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const rowVariant: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.06, ease: "easeOut" },
  }),
};

export function CertificateGrid() {
  return (
    <motion.section
      id="certificates"
      className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 py-16 sm:py-24"
      aria-label="Certificates"
      variants={sectionVariant}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
    >
      {/* Editorial Section Header */}
      <div className="flex items-baseline justify-between border-b border-[#1e2a20] pb-4 mb-8">
        <h2 className="font-mono text-xs sm:text-sm font-bold tracking-[0.25em] uppercase text-[#f4f1eb]">
          Credentials &amp; Certifications
        </h2>
        <span className="font-mono text-2xs text-[#9e988f] tracking-widest uppercase">
          {CERTIFICATES.length} Verified
        </span>
      </div>

      {/* Editorial Table Header */}
      <div className="hidden sm:grid grid-cols-12 gap-4 pb-3 border-b border-[#1e2a20]/60 text-[#9e988f]/60 font-mono text-2xs tracking-widest uppercase">
        <span className="col-span-2">Issuer</span>
        <span className="col-span-5">Credential Title</span>
        <span className="col-span-4">Domain Focus</span>
        <span className="col-span-1 text-right">Link</span>
      </div>

      {/* Rows */}
      <div className="divide-y divide-[#1e2a20]/60">
        {CERTIFICATES.map((cert, i) => (
          <motion.div
            key={cert.id}
            custom={i}
            variants={rowVariant}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-20px" }}
            className="group py-5 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-start hover:text-[#f4f1eb] transition-colors duration-150"
          >
            <div className="sm:col-span-2">
              <span className="font-mono text-xs text-[#c5a880] font-semibold tracking-wide">
                {cert.issuer}
              </span>
              {cert.issueDate !== "Verified Credential" && (
                <p className="font-mono text-2xs text-[#9e988f]/60 mt-0.5">{cert.issueDate}</p>
              )}
            </div>

            <div className="sm:col-span-5">
              <p className="text-sm sm:text-base text-[#f4f1eb] leading-snug group-hover:text-[#c5a880] transition-colors duration-150">
                {cert.title}
              </p>
            </div>

            <div className="sm:col-span-4">
              <p className="font-mono text-xs-sub text-[#9e988f] leading-relaxed">
                {cert.skills.join(" · ")}
              </p>
            </div>

            <div className="sm:col-span-1 flex items-start sm:justify-end">
              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${cert.title} credential from ${cert.issuer}`}
                className="min-h-11 min-w-11 inline-flex items-center justify-start sm:justify-end text-[#c5a880] hover:text-[#f4f1eb] transition-colors duration-150"
                title="View Credential"
              >
                <ExternalLink className="size-4 sm:size-3.5" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
