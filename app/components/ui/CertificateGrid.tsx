"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Eye, X, CheckCircle2 } from "lucide-react";
import type { Certificate } from "@/app/types";

const CERTIFICATES: Certificate[] = [
  {
    id: "bnsp-network-admin",
    title: "Certified Network Administrator",
    issuer: "BNSP Indonesia",
    issueDate: "2025",
    credentialUrl: "https://www.linkedin.com/in/randi-maulana-dev",
    image: "/certificates/bnsp-network-administrator.webp",
    skills: ["Network Administration", "Routing & Switching", "Network Security", "VLAN & Subnetting", "Troubleshooting"],
    competencies: [
      "Configuration and deployment of enterprise routing and switching infrastructures including VLAN Subnetting OSPF and BGP",
      "Perimeter network defense engineering covering Firewalls Access Control Lists ACL and NAT policies",
      "Data traffic diagnostics latency troubleshooting and IPv4 IPv6 dual stack addressing standards",
    ],
  },
  {
    id: "huawei-hcia",
    title: "HCIA Cloud Service",
    issuer: "Huawei Technologies",
    issueDate: "2025",
    credentialUrl: "https://www.linkedin.com/in/randi-maulana-dev",
    image: "/certificates/huawei-hcia-cloud.webp",
    skills: ["Cloud Infrastructure", "Virtual Private Cloud", "Compute & Storage", "Cloud Security", "Disaster Recovery"],
    competencies: [
      "Enterprise cloud compute distributed storage and software defined networking virtualization",
      "Deployment and administration of cloud services including Elastic Cloud Server ECS EVS and Virtual Private Cloud VPC",
      "Cloud operations and maintenance automated backup strategies disaster recovery and security governance",
    ],
  },
  {
    id: "ibm-granite",
    title: "Code Generation Using IBM Granite",
    issuer: "IBM SkillsBuild",
    issueDate: "2025",
    credentialUrl: "https://www.credly.com/badges/87919d39-44bf-4230-ba7a-cfdd4f3ce764",
    image: "/certificates/ibm-granite-ai.webp",
    skills: ["IBM Granite LLM", "AI Code Generation", "Prompt Engineering", "Code Refactoring", "Enterprise AI"],
    competencies: [
      "Implementation of IBM Granite foundational AI models for software engineering automation and source code synthesis",
      "Advanced prompt engineering for architectural module design refactoring and logical optimization",
      "Code quality benchmarking runtime performance evaluation and security validation of AI generated output",
    ],
  },
  {
    id: "hackerrank-software-engineer",
    title: "Software Engineer Role Certification",
    issuer: "HackerRank",
    issueDate: "2025",
    credentialUrl: "https://www.linkedin.com/in/randi-maulana-dev",
    image: "/certificates/hackerrank-software-engineer.webp",
    skills: ["Algorithms & Data Structures", "Problem Solving", "SQL Optimization", "Backend Logic", "Complexity Analysis"],
    competencies: [
      "Advanced algorithms and algorithmic complexity analysis across Big O space and time constraints",
      "Implementation of core data structures including Graphs Trees Hash Tables Dynamic Programming and Pointer mechanics",
      "Relational database SQL query optimization robust backend validation logic and clean code principles",
    ],
  },
  {
    id: "codepolitan-genai",
    title: "Fundamentals of Generative AI",
    issuer: "CodePolitan",
    issueDate: "2025",
    credentialUrl: "https://www.linkedin.com/in/randi-maulana-dev",
    image: "/certificates/codepolitan-fullstack.webp",
    skills: ["Generative AI", "Prompt Engineering", "Workflow Automation", "AI Tools"],
    competencies: [
      "Core foundations of generative AI architectures foundational models and prompting methodologies",
      "Practical implementation of modern AI tooling for software engineering workflows and developer productivity",
      "Accredited under the AI Opportunity Fund Asia Pacific supported by Google and Asian Development Bank",
    ],
  },
  {
    id: "cisco-js-essentials",
    title: "JavaScript Essentials 1",
    issuer: "Cisco Networking Academy",
    issueDate: "2025",
    credentialUrl: "https://www.linkedin.com/in/randi-maulana-dev",
    image: "/certificates/cisco-javascript-essentials.webp",
    skills: ["JavaScript ES6+", "OOP", "Async & Promises", "DOM Manipulation", "Event Loop"],
    competencies: [
      "Core JavaScript ES6 foundations including primitive types closures variable scoping and execution contexts",
      "Object Oriented Programming OOP prototypes DOM tree manipulation and interactive browser event handling",
      "Asynchronous operations management using Async Await Promises and the JavaScript microtask Event Loop",
    ],
  },
  {
    id: "cisco-cybersecurity",
    title: "Introduction to Cybersecurity",
    issuer: "Cisco Networking Academy",
    issueDate: "2025",
    credentialUrl: "https://www.linkedin.com/in/randi-maulana-dev",
    image: "/certificates/cisco-cybersecurity-intro.webp",
    skills: ["Cyber Threat Analysis", "CIA Triad", "Network Defense", "Data Protection", "Security Mitigation"],
    competencies: [
      "Cybersecurity threat vector analysis including Malware Phishing Social Engineering and DDoS mitigation",
      "Application of the core CIA Triad Confidentiality Integrity Availability across data systems",
      "Data protection fundamentals cryptography standards and vulnerability mitigation in web and network systems",
    ],
  },
  {
    id: "hacktiv8-maju-bareng-ai",
    title: "Maju Bareng AI Program",
    issuer: "Hacktiv8",
    issueDate: "2025",
    credentialUrl: "https://www.linkedin.com/in/randi-maulana-dev",
    image: "/certificates/hacktiv8-maju-bareng-ai.webp",
    skills: ["Generative AI", "AI Dev Tools", "AI API Integration", "Productivity", "Modern AI"],
    competencies: [
      "Application of generative AI models within modern software development lifecycle SDLC workflows",
      "Developer productivity acceleration utilizing AI assisted developer toolchains and prompt pipelines",
      "Integration of Large Language Model LLM APIs for intelligent web automation and dynamic application features",
    ],
  },
  {
    id: "ubsi-it-bootcamp",
    title: "IT Bootcamp Software Development For Industry",
    issuer: "Universitas Bina Sarana Informatika",
    issueDate: "2025",
    credentialUrl: "https://www.linkedin.com/in/randi-maulana-dev",
    image: "/certificates/komdigi-digital-talent.webp",
    skills: ["Laravel", "PHP", "MySQL", "Web Architecture", "MVC Pattern"],
    competencies: [
      "Intensive industry bootcamp covering the full software engineering lifecycle practical development and technical defense",
      "Designed and developed fullstack wedding reception web platform using Laravel PHP MVC MySQL database modeling guest reservation management and automated invitation workflows",
      "Delivered 7 hour practical software project implementation and live presentation evaluated by university faculty",
    ],
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
    transition: { duration: 0.5, delay: i * 0.05, ease: CINEMATIC_EASE },
  }),
};

export function CertificateGrid() {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

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
      {/* Editorial Scene Header */}
      <div className="flex items-baseline justify-between border-b border-[#1e2a20] pb-4 mb-10">
        <div>
          <h2 className="font-mono text-xs sm:text-sm font-bold tracking-[0.25em] uppercase text-[#f4f1eb]">
            Verified Credentials
          </h2>
          <p className="font-mono text-2xs text-[#9e988f] mt-1">
            Industry accreditations and validated technical competencies
          </p>
        </div>
        <span className="font-mono text-2xs text-[#c5a880] tracking-widest uppercase">
          {CERTIFICATES.length} Verified
        </span>
      </div>

      {/* 3-Column Visual Certificate Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        {CERTIFICATES.map((cert, i) => (
          <motion.div
            key={cert.id}
            custom={i}
            variants={cardVariant}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-20px" }}
            className="group relative rounded-xl bg-[#0d120e]/80 border border-[#1e2a20] hover:border-[#c5a880]/50 transition-all duration-300 backdrop-blur-md overflow-hidden flex flex-col justify-between h-full"
          >
            {/* Visual Thumbnail Header */}
            {cert.image && (
              <div
                onClick={() => setSelectedCert(cert)}
                className="relative w-full aspect-[16/10] bg-[#090d0a] overflow-hidden cursor-pointer border-b border-[#1e2a20]/60 group-hover:opacity-90 transition-opacity shrink-0"
              >
                <Image
                  src={cert.image}
                  alt={`${cert.title} preview`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d120e] via-transparent to-transparent opacity-60 pointer-events-none" />
                <div className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-md bg-[#090d0a]/90 border border-[#1e2a20] text-[#c5a880] font-mono text-2xs uppercase tracking-wider inline-flex items-center gap-1 backdrop-blur-sm">
                  <Eye className="size-3" />
                  <span>View Details</span>
                </div>
              </div>
            )}

            {/* Card Body with responsive author display */}
            <div className="p-5 flex flex-col flex-1 justify-between gap-4">
              {/* Upper Block: Issuer + Title (Adaptable height without author truncation) */}
              <div className="flex flex-col gap-2">
                <div className="flex items-start justify-between gap-2 min-h-4">
                  <span className="font-mono text-2xs uppercase tracking-widest text-[#c5a880] font-bold leading-tight">
                    {cert.issuer}
                  </span>
                  <span className="font-mono text-2xs text-[#9e988f]/60 shrink-0">
                    {cert.issueDate}
                  </span>
                </div>

                <div className="h-10 flex items-center">
                  <h3
                    onClick={() => setSelectedCert(cert)}
                    className="font-mono text-sm font-bold text-[#f4f1eb] group-hover:text-[#c5a880] transition-colors duration-150 cursor-pointer leading-snug line-clamp-2"
                  >
                    {cert.title}
                  </h3>
                </div>
              </div>

              {/* Lower Block: Border and Skills Chips */}
              <div className="pt-3 border-t border-[#1e2a20]/60 mt-auto">
                <div className="flex flex-wrap gap-1.5 h-6 overflow-hidden items-center">
                  {cert.skills.slice(0, 2).map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center px-2 py-0.5 rounded border border-[#1e2a20] bg-[#1e2a20]/30 font-mono text-2xs text-[#9e988f] whitespace-nowrap"
                    >
                      {skill}
                    </span>
                  ))}
                  {cert.skills.length > 2 && (
                    <span className="font-mono text-2xs text-[#9e988f]/50 whitespace-nowrap">
                      +{cert.skills.length - 2} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Cinematic Modal Lightbox with Safe-Area Mobile Layout */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-3 sm:px-6 lg:px-10 pt-[calc(env(safe-area-inset-top)+1rem)] pb-[calc(env(safe-area-inset-bottom)+1rem)] overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
              className="fixed inset-0 bg-[#090d0a]/90 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative z-10 max-w-4xl w-full my-auto bg-[#0d120e] border border-[#1e2a20] shadow-2xl rounded-2xl overflow-hidden flex flex-col max-h-[90dvh]"
            >
              {/* Sticky Modal Header with Accessible 44px Close Button */}
              <div className="sticky top-0 z-30 flex items-start sm:items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-[#1e2a20] bg-[#090d0a]/95 backdrop-blur-md shrink-0 gap-3">
                <div className="flex flex-col gap-0.5 flex-1 min-w-0 pr-1">
                  <span className="font-mono text-2xs uppercase tracking-widest text-[#c5a880] font-bold leading-tight">
                    {selectedCert.issuer}
                  </span>
                  <h3 className="font-mono text-xs sm:text-base font-bold text-[#f4f1eb] leading-snug">
                    {selectedCert.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedCert(null)}
                  aria-label="Close modal"
                  className="size-11 min-w-11 min-h-11 flex items-center justify-center rounded-full bg-[#1e2a20]/80 border border-[#1e2a20] text-[#f4f1eb] hover:bg-[#c5a880] hover:text-[#090d0a] hover:border-[#c5a880] active:scale-95 transition-all duration-150 cursor-pointer shrink-0"
                >
                  <X className="size-5" />
                </button>
              </div>

              {/* Scrollable Modal Content */}
              <div className="flex-1 overflow-y-auto flex flex-col">
                {/* Certificate Image Canvas */}
                {selectedCert.image && (
                  <div className="relative w-full aspect-[16/10] bg-[#090d0a] border-b border-[#1e2a20]/60 p-2 sm:p-4 flex items-center justify-center">
                    <Image
                      src={selectedCert.image}
                      alt={`${selectedCert.title} - ${selectedCert.issuer}`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 896px"
                      priority
                      className="object-contain"
                    />
                  </div>
                )}

                {/* Comprehensive Competencies Learned (No (), -, or / symbols) */}
                <div className="p-5 sm:p-8 flex flex-col gap-6 bg-[#0d120e]">
                  <div className="flex flex-col gap-3">
                    <h4 className="font-mono text-xs uppercase tracking-widest text-[#f4f1eb] font-bold">
                      Core Learned Competencies
                    </h4>
                    {selectedCert.competencies && (
                      <div className="flex flex-col gap-2.5">
                        {selectedCert.competencies.map((comp, idx) => (
                          <div key={idx} className="flex items-start gap-2.5">
                            <CheckCircle2 className="size-4 text-[#c5a880] shrink-0 mt-0.5" />
                            <p className="text-xs sm:text-sm text-[#9e988f] leading-relaxed">
                              {comp}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Skills Pills Matrix */}
                  <div className="flex flex-col gap-2.5 pt-4 border-t border-[#1e2a20]">
                    <span className="font-mono text-2xs uppercase tracking-widest text-[#9e988f]">
                      Validated Domains
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedCert.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-1 rounded-full border border-[#1e2a20] bg-[#1e2a20]/40 font-mono text-2xs text-[#f4f1eb]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer with ESC text hidden on mobile */}
              <div className="px-5 sm:px-6 py-3 border-t border-[#1e2a20] bg-[#090d0a] flex items-center justify-between shrink-0">
                <span className="font-mono text-2xs text-[#9e988f]/60">
                  Year of Issue: {selectedCert.issueDate}
                </span>
                <span className="font-mono text-2xs text-[#9e988f]/40 hidden sm:inline-block">
                  Press ESC to dismiss
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
