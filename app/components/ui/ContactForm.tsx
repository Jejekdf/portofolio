"use client";

import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Mail, ArrowUpRight, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { sendContactEmail, type ContactActionResult } from "@/app/actions";
import { LinkedinIcon, GithubIcon } from "@/app/components/ui/Icons";

const CINEMATIC_EASE = [0.16, 1, 0.3, 1] as const;

const sectionVariant: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: CINEMATIC_EASE } },
};

interface FormState {
  name: string;
  email: string;
  message: string;
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormState>({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [globalMessage, setGlobalMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const email = "maulanarandi531@gmail.com";
  const linkedinUrl = "https://www.linkedin.com/in/randi-maulana-dev";
  const githubUrl = "https://github.com/Jejekdf";

  const handleBlur = (field: keyof FormState) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setGlobalMessage("");
    setFieldErrors({});

    const data = new FormData(e.currentTarget);
    const result: ContactActionResult = await sendContactEmail(
      { status: "idle", message: "" },
      data
    );

    if (result.status === "success") {
      setStatus("success");
      setGlobalMessage(result.message);
      setFormData({ name: "", email: "", message: "" });
      setTouched({});
    } else {
      setStatus("error");
      setGlobalMessage(result.message);
      if (result.fieldErrors) {
        setFieldErrors(result.fieldErrors as Record<string, string>);
      }
    }
  }

  const directChannels = [
    { title: "Direct Email", value: email, href: `mailto:${email}`, icon: <Mail className="size-4" /> },
    { title: "Professional Network", value: "LinkedIn Profile", href: linkedinUrl, icon: <LinkedinIcon className="size-4" /> },
    { title: "Source Repositories", value: "GitHub Profile", href: githubUrl, icon: <GithubIcon className="size-4" /> },
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
      <div className="flex items-baseline justify-between border-b border-[#1e2a20] pb-4 mb-10">
        <div>
          <h2 className="font-mono text-xs sm:text-sm font-bold tracking-[0.25em] uppercase text-[#f4f1eb]">
            Get In Touch
          </h2>
          <p className="font-mono text-2xs text-[#9e988f] mt-1">
            Available for fullstack engineering roles and consulting
          </p>
        </div>
        <span className="font-mono text-2xs text-[#c5a880] tracking-widest uppercase">
          Open to Work
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Direct Communication Cards */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="p-6 sm:p-8 rounded-2xl bg-[#0d120e]/80 border border-[#1e2a20] backdrop-blur-md flex flex-col gap-4">
            <h3 className="font-mono text-lg font-bold text-[#f4f1eb] uppercase tracking-wide">
              Direct Channels
            </h3>
            <p className="text-sm text-[#9e988f] leading-relaxed font-light">
              Feel free to reach out directly via email or professional profiles.
            </p>

            <div className="flex flex-col gap-3 pt-2">
              {directChannels.map(({ title, value, href, icon }) => (
                <a
                  key={title}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                  className="group p-3.5 min-h-11 rounded-xl bg-[#090d0a]/60 border border-[#1e2a20] hover:border-[#c5a880]/50 transition-all duration-200 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded-lg bg-[#1e2a20]/60 border border-[#1e2a20] flex items-center justify-center text-[#c5a880] group-hover:scale-105 transition-transform">
                      {icon}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-mono text-2xs uppercase tracking-wider text-[#9e988f]/70">
                        {title}
                      </span>
                      <span className="font-mono text-xs text-[#f4f1eb] group-hover:text-[#c5a880] transition-colors">
                        {value}
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="size-4 text-[#9e988f] group-hover:text-[#c5a880] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-150" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Best-Practice Structured Form */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            noValidate
            className="p-6 sm:p-8 rounded-2xl bg-[#0d120e]/80 border border-[#1e2a20] backdrop-blur-md flex flex-col gap-5 shadow-2xl"
          >
            {/* Name Field */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="name" className="font-mono text-2xs uppercase tracking-widest text-[#c5a880] font-bold">
                  Name
                </label>
                <span className="font-mono text-2xs text-[#9e988f]/40">Required</span>
              </div>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                onBlur={() => handleBlur("name")}
                placeholder="Your full name"
                required
                className={`w-full px-4 py-3 bg-[#090d0a]/80 border rounded-lg font-mono text-base sm:text-sm text-[#f4f1eb] placeholder:text-[#9e988f]/30 focus:outline-none transition-colors duration-150 ${
                  fieldErrors.name
                    ? "border-red-500/80 focus:border-red-500"
                    : touched.name && formData.name.length >= 2
                    ? "border-[#c5a880]/60 focus:border-[#c5a880]"
                    : "border-[#1e2a20] focus:border-[#c5a880]"
                }`}
              />
              {fieldErrors.name && (
                <span className="font-mono text-2xs text-red-400">
                  {fieldErrors.name}
                </span>
              )}
            </div>

            {/* Email Field */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="email" className="font-mono text-2xs uppercase tracking-widest text-[#c5a880] font-bold">
                  Email
                </label>
                <span className="font-mono text-2xs text-[#9e988f]/40">Required</span>
              </div>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={() => handleBlur("email")}
                placeholder="name@company.com"
                required
                className={`w-full px-4 py-3 bg-[#090d0a]/80 border rounded-lg font-mono text-base sm:text-sm text-[#f4f1eb] placeholder:text-[#9e988f]/30 focus:outline-none transition-colors duration-150 ${
                  fieldErrors.email
                    ? "border-red-500/80 focus:border-red-500"
                    : touched.email && formData.email.includes("@")
                    ? "border-[#c5a880]/60 focus:border-[#c5a880]"
                    : "border-[#1e2a20] focus:border-[#c5a880]"
                }`}
              />
              {fieldErrors.email && (
                <span className="font-mono text-2xs text-red-400">
                  {fieldErrors.email}
                </span>
              )}
            </div>

            {/* Message Field */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="message" className="font-mono text-2xs uppercase tracking-widest text-[#c5a880] font-bold">
                  Message
                </label>
                <span className="font-mono text-2xs text-[#9e988f]/40">Min 3 words</span>
              </div>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                onBlur={() => handleBlur("message")}
                placeholder="Project details, timeline, or engineering role"
                required
                className={`w-full px-4 py-3 bg-[#090d0a]/80 border rounded-lg font-mono text-base sm:text-sm text-[#f4f1eb] placeholder:text-[#9e988f]/30 focus:outline-none resize-none transition-colors duration-150 ${
                  fieldErrors.message
                    ? "border-red-500/80 focus:border-red-500"
                    : touched.message && formData.message.split(/\s+/).filter(Boolean).length >= 3
                    ? "border-[#c5a880]/60 focus:border-[#c5a880]"
                    : "border-[#1e2a20] focus:border-[#c5a880]"
                }`}
              />
              {fieldErrors.message && (
                <span className="font-mono text-2xs text-red-400">
                  {fieldErrors.message}
                </span>
              )}
            </div>

            {/* Honeypot hidden input */}
            <input type="text" name="honeypot" className="hidden" tabIndex={-1} autoComplete="off" />

            {/* Submit Button */}
            <div className="pt-2 flex flex-col gap-3">
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 min-h-11 bg-[#c5a880] text-[#090d0a] font-mono text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-[#f4f1eb] transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer self-start shadow-md"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="size-3.5 animate-spin" />
                    <span>Sending</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <ArrowUpRight className="size-3.5" />
                  </>
                )}
              </button>

              {/* Status Notifications */}
              <AnimatePresence>
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="p-4 rounded-lg border border-[#c5a880]/30 bg-[#c5a880]/10 flex items-start gap-3"
                  >
                    <CheckCircle2 className="size-4 text-[#c5a880] shrink-0 mt-0.5" />
                    <div className="flex flex-col gap-0.5">
                      <p className="font-mono text-xs font-bold uppercase tracking-wider text-[#c5a880]">
                        Message Sent
                      </p>
                      <p className="font-mono text-xs text-[#9e988f]">
                        {globalMessage || "Thank you for reaching out. I will respond shortly."}
                      </p>
                    </div>
                  </motion.div>
                )}

                {status === "error" && globalMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="p-4 rounded-lg border border-red-500/30 bg-red-500/10 flex items-start gap-3"
                  >
                    <AlertCircle className="size-4 text-red-400 shrink-0 mt-0.5" />
                    <div className="flex flex-col gap-0.5">
                      <p className="font-mono text-xs font-bold uppercase tracking-wider text-red-400">
                        Notice
                      </p>
                      <p className="font-mono text-xs text-red-300">
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
