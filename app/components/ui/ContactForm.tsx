"use client";

import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Mail, ArrowUpRight, AlertCircle, CheckCircle2, Loader2, Sparkles } from "lucide-react";
import { sendContactEmail } from "@/app/actions";
import { contactSchema } from "@/app/lib/validations";

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

interface FieldErrors {
  name?: string;
  email?: string;
  message?: string;
}

const sectionVariant: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [globalMessage, setGlobalMessage] = useState<string>("");
  const [formDataState, setFormDataState] = useState({ name: "", email: "", message: "" });

  const email = "maulanarandi531@gmail.com";
  const linkedinUrl = "https://www.linkedin.com/in/randi-maulana-dev";
  const githubUrl = "https://github.com/Jejekdf";

  // Real-time field clearing when user types
  const handleInputChange = (field: keyof typeof formDataState, value: string) => {
    setFormDataState((prev) => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setGlobalMessage("");
    setFieldErrors({});

    // 1. Client-Side Instant Zod Pre-Validation
    const clientValidation = contactSchema.safeParse({
      name: formDataState.name,
      email: formDataState.email,
      message: formDataState.message,
    });

    if (!clientValidation.success) {
      const errors: FieldErrors = {};
      for (const issue of clientValidation.error.issues) {
        const field = issue.path[0] as keyof FieldErrors;
        if (field && !errors[field]) {
          errors[field] = issue.message;
        }
      }
      setFieldErrors(errors);
      setStatus("error");
      return;
    }

    // 2. Server-Side Execution with DNS MX & Rate Limiting
    setStatus("loading");
    const form = e.currentTarget;
    const data = new FormData(form);

    const result = await sendContactEmail({ status: "idle", message: "" }, data);

    if (result.status === "success") {
      setStatus("success");
      setGlobalMessage(result.message);
      setFormDataState({ name: "", email: "", message: "" });
      form.reset();
    } else {
      setStatus("error");
      setGlobalMessage(result.message);
      if (result.fieldErrors) {
        setFieldErrors(result.fieldErrors);
      }
    }
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
        <span className="font-mono text-2xs text-[#9e988f] tracking-widest uppercase">
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
                className="group py-3.5 min-h-11 flex items-center justify-between text-[#9e988f] hover:text-[#c5a880] transition-colors duration-150"
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

        {/* Right Column: Editorial Contact Form */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-8">
            {/* Name Field */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label htmlFor="name" className="font-mono text-xs-sub uppercase tracking-widest text-[#9e988f]">
                  Your Name
                </label>
                <span className="font-mono text-2xs text-[#9e988f]/40">Required</span>
              </div>
              <input
                id="name"
                name="name"
                type="text"
                value={formDataState.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="e.g. Alex Morgan"
                className={`w-full bg-transparent border-b pb-3 text-base text-[#f4f1eb] placeholder:text-[#9e988f]/30 focus:outline-none transition-colors duration-150 ${
                  fieldErrors.name
                    ? "border-red-400/80 focus:border-red-400"
                    : "border-[#1e2a20] focus:border-[#c5a880]"
                }`}
              />
              <AnimatePresence>
                {fieldErrors.name && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="font-mono text-xs text-red-400 mt-1 flex items-center gap-1.5"
                  >
                    <AlertCircle className="size-3.5 shrink-0" />
                    <span>{fieldErrors.name}</span>
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Email Field */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label htmlFor="email" className="font-mono text-xs-sub uppercase tracking-widest text-[#9e988f]">
                  Email Address
                </label>
                <span className="font-mono text-2xs text-[#9e988f]/40">Real Mailbox Verified</span>
              </div>
              <input
                id="email"
                name="email"
                type="email"
                value={formDataState.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="e.g. alex@company.com"
                className={`w-full bg-transparent border-b pb-3 text-base text-[#f4f1eb] placeholder:text-[#9e988f]/30 focus:outline-none transition-colors duration-150 ${
                  fieldErrors.email
                    ? "border-red-400/80 focus:border-red-400"
                    : "border-[#1e2a20] focus:border-[#c5a880]"
                }`}
              />
              <AnimatePresence>
                {fieldErrors.email && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="flex flex-col gap-1 mt-1"
                  >
                    <p className="font-mono text-xs text-red-400 flex items-center gap-1.5">
                      <AlertCircle className="size-3.5 shrink-0" />
                      <span>{fieldErrors.email}</span>
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Message Field */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label htmlFor="message" className="font-mono text-xs-sub uppercase tracking-widest text-[#9e988f]">
                  Message
                </label>
                <span className="font-mono text-2xs text-[#9e988f]/40">Min 3 words / 15 chars</span>
              </div>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formDataState.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                placeholder="Tell me about your project scope or engineering role..."
                className={`w-full bg-transparent border-b pb-3 text-base text-[#f4f1eb] placeholder:text-[#9e988f]/30 focus:outline-none transition-colors duration-150 resize-none ${
                  fieldErrors.message
                    ? "border-red-400/80 focus:border-red-400"
                    : "border-[#1e2a20] focus:border-[#c5a880]"
                }`}
              />
              <AnimatePresence>
                {fieldErrors.message && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="font-mono text-xs text-red-400 mt-1 flex items-center gap-1.5"
                  >
                    <AlertCircle className="size-3.5 shrink-0" />
                    <span>{fieldErrors.message}</span>
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Honeypot hidden input */}
            <input type="text" name="honeypot" className="hidden" tabIndex={-1} autoComplete="off" />

            {/* Submission CTAs and Status */}
            <div className="flex flex-col gap-4 pt-2">
              <div className="flex items-center gap-4">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="inline-flex items-center gap-2 px-8 py-3.5 min-h-11 bg-[#c5a880] text-[#090d0a] font-mono text-xs font-bold uppercase tracking-widest hover:bg-[#f4f1eb] transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer self-start"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="size-3.5 animate-spin" />
                      <span>Verifying &amp; Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <ArrowUpRight className="size-3.5" />
                    </>
                  )}
                </button>
              </div>

              {/* Status Banners */}
              <AnimatePresence>
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="p-4 border border-[#c5a880]/30 bg-[#c5a880]/10 flex items-start gap-3"
                  >
                    <CheckCircle2 className="size-4 text-[#c5a880] shrink-0 mt-0.5" />
                    <div className="flex flex-col gap-0.5">
                      <p className="font-mono text-xs font-bold uppercase tracking-wider text-[#c5a880]">
                        Message Delivered Successfully
                      </p>
                      <p className="font-mono text-xs text-[#9e988f] leading-relaxed">
                        {globalMessage || "Thank you for reaching out! I will get back to you shortly."}
                      </p>
                    </div>
                  </motion.div>
                )}

                {status === "error" && globalMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="p-4 border border-red-500/30 bg-red-500/10 flex items-start gap-3"
                  >
                    <AlertCircle className="size-4 text-red-400 shrink-0 mt-0.5" />
                    <div className="flex flex-col gap-0.5">
                      <p className="font-mono text-xs font-bold uppercase tracking-wider text-red-400">
                        Verification Notice
                      </p>
                      <p className="font-mono text-xs text-red-300 leading-relaxed">
                        {globalMessage}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </form>
        </div>
      </div>
    </motion.section>
  );
}
