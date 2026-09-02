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
      "Konfigurasi dan instalasi perangkat routing serta switching seperti VLAN, Subnetting, OSPF, dan BGP.",
      "Manajemen keamanan perimeter jaringan meliputi Firewall, Access Control List, dan NAT.",
      "Analisis trafik data, troubleshooting konektivitas, serta pengalamatan IPv4 dan IPv6.",
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
      "Arsitektur komputasi awan dan teknologi virtualisasi perangkat keras compute, storage, dan network.",
      "Pengelolaan infrastruktur cloud enterprise seperti Elastic Cloud Server, EVS, dan Virtual Private Cloud.",
      "Manajemen operasi cloud, strategi backup data, disaster recovery, dan tata kelola keamanan cloud.",
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
      "Implementasi model fondasi AI IBM Granite untuk otomatisasi rekayasa software dan sintesis kode sumber.",
      "Prompt Engineering tingkat lanjut untuk pembuatan arsitektur modul, refactoring, dan optimasi logika.",
      "Evaluasi kualitas, benchmarking performa, dan validasi keamanan terhadap output kode AI.",
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
      "Algoritma tingkat lanjut dan analisis kompleksitas ruang dan waktu.",
      "Struktur data esensial seperti Graphs, Trees, Hash Tables, Dynamic Programming, dan Pointer.",
      "Optimasi query database relasional SQL, validasi logika backend, dan arsitektur kode bersih.",
    ],
  },
  {
    id: "codepolitan-fullstack",
    title: "Fullstack Web & Software Engineering",
    issuer: "CodePolitan",
    issueDate: "2025",
    credentialUrl: "https://www.linkedin.com/in/randi-maulana-dev",
    image: "/certificates/codepolitan-fullstack.webp",
    skills: ["Fullstack Architecture", "Laravel & PHP", "RESTful API Design", "Relational Database", "Next.js"],
    competencies: [
      "Arsitektur web end-to-end, desain antarmuka frontend, dan integrasi backend API terdistribusi.",
      "Perancangan RESTful API, otentikasi token dan session, serta pemodelan database relasional.",
      "Implementasi framework PHP Laravel MVC, middleware, ORM Eloquent, dan reaktivitas Next.js.",
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
      "Fundamental inti JavaScript ES6+ seperti primitive types, scope, closures, dan execution context.",
      "Pemrograman Berorientasi Objek OOP, prototipe, manipulasi DOM, dan event handling interaktif.",
      "Penanganan operasi asinkron Async Await, Promises, dan mekanika antrean microtask Event Loop.",
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
      "Analisis vektor ancaman keamanan siber seperti Malware, Phishing, Social Engineering, dan DDoS.",
      "Penerapan pilar keamanan CIA Triad Confidentiality, Integrity, Availability dalam arsitektur data.",
      "Prinsip perlindungan data, dasar kriptografi, dan mitigasi kerentanan pada sistem jaringan dan web.",
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
      "Penerapan model AI Generatif dalam alur kerja rekayasa perangkat lunak modern.",
      "Peningkatan produktivitas developer menggunakan ekosistem AI Developer Tools dan prompt pipelines.",
      "Pemanfaatan API LLM untuk fitur interaktif cerdas dan otomatisasi alur kerja web modern.",
    ],
  },
  {
    id: "komdigi-digital-talent",
    title: "Digital Talent Scholarship",
    issuer: "Kementerian Komdigi",
    issueDate: "2025",
    credentialUrl: "https://www.linkedin.com/in/randi-maulana-dev",
    image: "/certificates/komdigi-digital-talent.webp",
    skills: ["Cloud Infrastructure", "Digital Systems", "Industry Standards", "System Integration", "Leadership"],
    competencies: [
      "Pelatihan intensif kompetensi digital dan standardisasi infrastruktur teknologi industri.",
      "Implementasi praktis rekayasa sistem cloud, jaringan terdistribusi, dan kolaborasi tim.",
      "Tata kelola standar industri teknologi informasi, etika profesional, dan kepemimpinan teknis.",
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

            {/* Card Body with strict pixel-perfect heights */}
            <div className="p-5 flex flex-col flex-1 justify-between gap-4">
              {/* Upper Block: Issuer + Title (Fixed 80px total height) */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between h-4">
                  <span className="font-mono text-2xs uppercase tracking-widest text-[#c5a880] font-bold truncate max-w-[200px]">
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

              {/* Lower Block: Border and Skills Chips (Fixed baseline) */}
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

      {/* Cinematic Modal Lightbox - Complete Details */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 overflow-y-auto">
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
              className="relative z-10 max-w-4xl w-full my-auto bg-[#0d120e] border border-[#1e2a20] shadow-2xl rounded-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#1e2a20] bg-[#090d0a] shrink-0">
                <div className="flex flex-col gap-0.5">
                  <span className="font-mono text-2xs uppercase tracking-widest text-[#c5a880] font-bold">
                    {selectedCert.issuer}
                  </span>
                  <h3 className="font-mono text-sm sm:text-base font-bold text-[#f4f1eb]">
                    {selectedCert.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedCert(null)}
                  aria-label="Close modal"
                  className="p-1.5 text-[#9e988f] hover:text-[#f4f1eb] transition-colors duration-150 cursor-pointer"
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

                {/* Comprehensive Competencies Learned */}
                <div className="p-6 sm:p-8 flex flex-col gap-6 bg-[#0d120e]">
                  <div className="flex flex-col gap-3">
                    <h4 className="font-mono text-xs uppercase tracking-widest text-[#f4f1eb] font-bold">
                      Kompetensi Materi Yang Dipelajari
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

              {/* Modal Footer */}
              <div className="px-6 py-3 border-t border-[#1e2a20] bg-[#090d0a] flex items-center justify-between shrink-0">
                <span className="font-mono text-2xs text-[#9e988f]/60">
                  Year of Issue: {selectedCert.issueDate}
                </span>
                <span className="font-mono text-2xs text-[#9e988f]/40">
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
