"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ExternalLink, Eye, X } from "lucide-react";
import type { Certificate } from "@/app/types";

const CERTIFICATES: Certificate[] = [
  {
    id: "bnsp-network-admin",
    title: "Certified Network Administrator",
    issuer: "BNSP Indonesia",
    issueDate: "No. 17230227",
    credentialUrl: "https://www.linkedin.com/in/randi-maulana-dev",
    image: "/certificates/bnsp-network-administrator.webp",
    skills: ["Network Administration", "Routing & Switching", "System Infrastructure"],
  },
  {
    id: "huawei-hcia",
    title: "Huawei Certified ICT Associate (HCIA Cloud Service)",
    issuer: "Huawei / Komdigi",
    issueDate: "Verified Credential",
    credentialUrl: "https://www.linkedin.com/in/randi-maulana-dev",
    image: "/certificates/huawei-hcia-cloud.webp",
    skills: ["Cloud Computing", "Infrastructure Management", "Huawei Cloud"],
  },
  {
    id: "ibm-granite",
    title: "Code Generation & Optimization Using IBM Granite",
    issuer: "IBM SkillsBuild",
    issueDate: "Aug 21, 2025",
    credentialUrl: "https://www.credly.com/badges/87919d39-44bf-4230-ba7a-cfdd4f3ce764",
    image: "/certificates/ibm-granite-ai.webp",
    skills: ["IBM Granite LLM", "Code Generation", "Enterprise AI Architecture"],
  },
  {
    id: "hackerrank-software-engineer",
    title: "Software Engineer Role Certification",
    issuer: "HackerRank",
    issueDate: "Verified Skill Assessment",
    credentialUrl: "https://www.linkedin.com/in/randi-maulana-dev",
    image: "/certificates/hackerrank-software-engineer.webp",
    skills: ["Data Structures", "Algorithms", "Software Engineering Principles"],
  },
  {
    id: "codepolitan-fullstack",
    title: "Fullstack Web Development & Software Engineering",
    issuer: "CodePolitan",
    issueDate: "Aug 07, 2025",
    credentialUrl: "https://www.linkedin.com/in/randi-maulana-dev",
    image: "/certificates/codepolitan-fullstack.webp",
    skills: ["Fullstack Architecture", "Next.js", "PHP & Laravel", "Databases"],
  },
  {
    id: "cisco-js-essentials",
    title: "JavaScript Essentials 1",
    issuer: "Cisco Networking Academy",
    issueDate: "Sep 07, 2025",
    credentialUrl: "https://www.linkedin.com/in/randi-maulana-dev",
    image: "/certificates/cisco-javascript-essentials.webp",
    skills: ["JavaScript", "Modern ES6+", "DOM Manipulation", "Async/Await"],
  },
  {
    id: "cisco-cybersecurity",
    title: "Introduction to Cybersecurity",
    issuer: "Cisco Networking Academy",
    issueDate: "Nov 03, 2025",
    credentialUrl: "https://www.linkedin.com/in/randi-maulana-dev",
    image: "/certificates/cisco-cybersecurity-intro.webp",
    skills: ["Cyber Threat Intelligence", "Network Defense", "Security Policies"],
  },
  {
    id: "google-maju-bareng-ai",
    title: "Maju Bareng AI Program",
    issuer: "Google",
    issueDate: "Verified Credential",
    credentialUrl: "https://www.linkedin.com/in/randi-maulana-dev",
    image: "/certificates/google-maju-bareng-ai.webp",
    skills: ["Artificial Intelligence", "Google Cloud ML", "Generative AI"],
  },
  {
    id: "komdigi-digital-talent",
    title: "Digital Talent Scholarship - FGA",
    issuer: "Kementerian Komdigi",
    issueDate: "Verified Credential",
    credentialUrl: "https://www.linkedin.com/in/randi-maulana-dev",
    image: "/certificates/komdigi-digital-talent.webp",
    skills: ["Cloud Architecture", "Digital Infrastructure", "Technology Leadership"],
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
    transition: { duration: 0.4, delay: i * 0.05, ease: "easeOut" },
  }),
};

export function CertificateGrid() {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  // Close modal on ESC key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setSelectedCert(null);
    }
    if (selectedCert) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [selectedCert]);

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
        <span className="col-span-3">Domain Focus</span>
        <span className="col-span-2 text-right">Actions</span>
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
              {cert.issueDate && (
                <p className="font-mono text-2xs text-[#9e988f]/60 mt-0.5">{cert.issueDate}</p>
              )}
            </div>

            <div className="sm:col-span-5">
              <button
                onClick={() => setSelectedCert(cert)}
                className="text-left text-sm sm:text-base text-[#f4f1eb] leading-snug group-hover:text-[#c5a880] transition-colors duration-150 cursor-pointer"
              >
                {cert.title}
              </button>
            </div>

            <div className="sm:col-span-3">
              <p className="font-mono text-xs-sub text-[#9e988f] leading-relaxed">
                {cert.skills.join(" · ")}
              </p>
            </div>

            <div className="sm:col-span-2 flex items-center justify-start sm:justify-end gap-3 pt-1 sm:pt-0">
              {cert.image && (
                <button
                  onClick={() => setSelectedCert(cert)}
                  className="inline-flex items-center gap-1 font-mono text-2xs uppercase tracking-wider text-[#9e988f] hover:text-[#c5a880] transition-colors duration-150 cursor-pointer"
                  title="View Certificate"
                >
                  <Eye className="size-3.5" />
                  <span className="hidden sm:inline">Preview</span>
                </button>
              )}
              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Verify ${cert.title} on official issuer website`}
                className="inline-flex items-center gap-1 font-mono text-2xs uppercase tracking-wider text-[#c5a880] hover:text-[#f4f1eb] transition-colors duration-150"
                title="Verify Credential"
              >
                <span className="hidden sm:inline">Verify</span>
                <ExternalLink className="size-3.5" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Cinematic Modal Lightbox Preview */}
      <AnimatePresence>
        {selectedCert && selectedCert.image && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
              className="absolute inset-0 bg-[#090d0a]/90 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative z-10 max-w-4xl w-full bg-[#0d120e] border border-[#1e2a20] shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#1e2a20] bg-[#090d0a]">
                <div className="flex flex-col gap-0.5">
                  <span className="font-mono text-2xs uppercase tracking-widest text-[#c5a880]">
                    {selectedCert.issuer}
                  </span>
                  <h3 className="font-mono text-sm font-bold text-[#f4f1eb]">
                    {selectedCert.title}
                  </h3>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href={selectedCert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#1e2a20] font-mono text-2xs uppercase tracking-wider text-[#c5a880] hover:text-[#f4f1eb] hover:border-[#c5a880] transition-colors duration-150"
                  >
                    <span>Verify</span>
                    <ExternalLink className="size-3" />
                  </a>
                  <button
                    onClick={() => setSelectedCert(null)}
                    aria-label="Close modal"
                    className="p-1.5 text-[#9e988f] hover:text-[#f4f1eb] transition-colors duration-150 cursor-pointer"
                  >
                    <X className="size-5" />
                  </button>
                </div>
              </div>

              {/* Certificate Image Canvas */}
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] bg-[#090d0a] flex items-center justify-center p-2 sm:p-4 overflow-hidden">
                <Image
                  src={selectedCert.image}
                  alt={`${selectedCert.title} - ${selectedCert.issuer}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 896px"
                  priority
                  className="object-contain"
                />
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-3 border-t border-[#1e2a20] bg-[#090d0a] flex items-center justify-between">
                <span className="font-mono text-2xs text-[#9e988f]/60">
                  Skills: {selectedCert.skills.join(" • ")}
                </span>
                <span className="font-mono text-2xs text-[#9e988f]/40">
                  Press ESC to close
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
