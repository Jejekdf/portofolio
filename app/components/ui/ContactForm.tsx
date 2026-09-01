"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { Mail, ArrowUpRight } from "lucide-react";
import { sendContactEmail } from "@/app/actions";

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

type FormStatus = "idle" | "loading" | "success" | "error";

const sectionVariant: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const email = "maulanarandi531@gmail.com";
  const linkedinUrl = "https://www.linkedin.com/in/randi-maulana-dev";
  const githubUrl = "https://github.com/Jejekdf";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const formData = new FormData(form);
    const result = await sendContactEmail({ status: "", message: "" }, formData);
    setStatus(result.status === "success" ? "success" : "error");
    if (result.status === "success") form.reset();
  }

  const directChannels = [
    { href: `mailto:${email}`, icon: <Mail className="size-4" />, label: email },
    { href: linkedinUrl, icon: <LinkedinIcon className="size-4" />, label: "LinkedIn Profile" },
    { href: githubUrl, icon: <GithubIcon className="size-4" />, label: "GitHub Profile" },
  ];

  return (
    <motion.section
      id="contact"
      className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 py-16 sm:py-24"
      aria-label="Contact"
      variants={sectionVariant}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
    >
      {/* Editorial Section Header */}
      <div className="flex items-baseline justify-between border-b border-[#1e2a20] pb-4 mb-12">
        <h2 className="font-mono text-xs sm:text-sm font-bold tracking-[0.25em] uppercase text-[#f4f1eb]">
          Get in Touch
        </h2>
        <span className="font-mono text-[10px] text-[#9e988f] tracking-widest uppercase">
          Open to Opportunities
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left Column: Direct Communication Channels */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-8">
          <div className="flex flex-col gap-4">
            <h3 className="text-2xl sm:text-3xl font-bold text-[#f4f1eb] tracking-tight text-balance">
              Let&apos;s build something exceptional together.
            </h3>
            <p className="text-sm sm:text-base text-[#9e988f] leading-relaxed text-pretty font-light">
              Available for fullstack software engineering positions, architecture consulting, and high-impact freelance projects.
            </p>
          </div>

          {/* Minimal Direct Links */}
          <div className="flex flex-col divide-y divide-[#1e2a20]">
            {directChannels.map(({ href, icon, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                className="group py-3.5 min-h-[44px] flex items-center justify-between text-[#9e988f] hover:text-[#c5a880] transition-colors duration-150"
              >
                <div className="flex items-center gap-3">
                  {icon}
                  <span className="font-mono text-xs sm:text-sm text-[#f4f1eb] group-hover:text-[#c5a880] transition-colors duration-150">
                    {label}
                  </span>
                </div>
                <ArrowUpRight className="size-4 text-[#9e988f] group-hover:text-[#c5a880] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-150" />
              </a>
            ))}
          </div>
        </div>

        {/* Right Column: Minimalist Underline Form (Zero Box Prison) */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="font-mono text-[11px] uppercase tracking-widest text-[#9e988f]">
              Your Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="e.g. Alex Morgan"
              className="w-full bg-transparent border-b border-[#1e2a20] focus:border-[#c5a880] pb-3 text-base text-[#f4f1eb] placeholder:text-[#9e988f]/30 focus:outline-none transition-colors duration-150"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-mono text-[11px] uppercase tracking-widest text-[#9e988f]">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="e.g. alex@company.com"
              className="w-full bg-transparent border-b border-[#1e2a20] focus:border-[#c5a880] pb-3 text-base text-[#f4f1eb] placeholder:text-[#9e988f]/30 focus:outline-none transition-colors duration-150"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="font-mono text-[11px] uppercase tracking-widest text-[#9e988f]">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              placeholder="Tell me about your project scope or engineering role..."
              className="w-full bg-transparent border-b border-[#1e2a20] focus:border-[#c5a880] pb-3 text-base text-[#f4f1eb] placeholder:text-[#9e988f]/30 focus:outline-none transition-colors duration-150 resize-none"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
            <button
              type="submit"
              disabled={status === "loading"}
              className="px-8 py-3.5 min-h-[44px] bg-[#c5a880] text-[#090d0a] font-mono text-xs font-bold uppercase tracking-widest hover:bg-[#f4f1eb] transition-colors duration-150 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer self-start"
            >
              {status === "loading" ? "Sending..." : "Send Message"}
            </button>

            {status === "success" && (
              <p className="font-mono text-xs text-[#c5a880]">
                Message sent successfully. I will get back to you shortly.
              </p>
            )}
            {status === "error" && (
              <p className="font-mono text-xs text-red-400">
                Failed to send. Please reach out directly via email.
              </p>
            )}
          </div>
        </form>
      </div>
    </motion.section>
  );
}
