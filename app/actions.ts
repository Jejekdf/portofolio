"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { contactSchema } from "@/app/lib/validations";

// In-memory rate limiting map: { ip: [timestamp] }
const rateLimitMap = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000; // 10 minutes window
  const maxRequests = 5; // max 5 submissions per 10 minutes per IP

  const timestamps = (rateLimitMap.get(ip) ?? []).filter(
    (t) => now - t < windowMs
  );

  if (timestamps.length >= maxRequests) return true;

  rateLimitMap.set(ip, [...timestamps, now]);
  return false;
}

// Sanitize user inputs to prevent HTML/XSS injection into emails
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function sendContactEmail(
  _prevState: { status: string; message: string },
  formData: FormData
) {
  // 1. Silent Honeypot Bot Trap
  if (formData.get("honeypot")) {
    return { status: "error", message: "Bot detected." };
  }

  // 2. Strict Zod Schema Validation
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject") || undefined,
    message: formData.get("message"),
    honeypot: formData.get("honeypot") || undefined,
  });

  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? "Invalid form input.";
    return { status: "error", message: firstError };
  }

  const { name, email, message } = parsed.data;

  // 3. Client IP Rate Limiting
  const headerList = await headers();
  const clientIp =
    headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headerList.get("x-real-ip") ||
    "anonymous";

  if (isRateLimited(clientIp)) {
    return {
      status: "error",
      message: "Too many messages sent. Please wait a few minutes before trying again.",
    };
  }

  // 4. Secure Resend Dispatch
  const apiKey = process.env.RESEND_API_KEY;
  const recipientEmail = process.env.CONTACT_TO_EMAIL || "maulanarandi531@gmail.com";
  const fromEmail = process.env.CONTACT_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>";

  if (!apiKey) {
    console.warn("⚠️ RESEND_API_KEY is not set. Logged to console in Dev Mode:", {
      name,
      email,
      message,
    });
    return {
      status: "success",
      message: "Message received! (Dev Mode: configure RESEND_API_KEY on Vercel)",
    };
  }

  try {
    const resend = new Resend(apiKey);
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message);

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [recipientEmail],
      replyTo: email,
      subject: `[Portfolio Message] from ${safeName}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #111827; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px;">
          <h2 style="font-size: 18px; font-weight: 700; margin-top: 0; color: #111827; border-bottom: 1px solid #e5e7eb; padding-bottom: 12px;">
            New Portfolio Message
          </h2>
          <div style="margin: 16px 0;">
            <p style="margin: 4px 0; font-size: 14px;"><strong>From:</strong> ${safeName} &lt;<a href="mailto:${safeEmail}" style="color: #2563eb;">${safeEmail}</a>&gt;</p>
            <p style="margin: 4px 0; font-size: 14px;"><strong>IP:</strong> ${clientIp}</p>
            <p style="margin: 4px 0; font-size: 14px;"><strong>Date:</strong> ${new Date().toUTCString()}</p>
          </div>
          <div style="margin-top: 20px; padding: 16px; background-color: #f9fafb; border-radius: 6px; border-left: 3px solid #c5a880;">
            <p style="margin: 0; font-size: 14px; line-height: 1.6; white-space: pre-wrap; color: #374151;">${safeMessage}</p>
          </div>
          <p style="margin-top: 24px; font-size: 12px; color: #9ca3af; text-align: center;">
            Sent from your portfolio contact form • Click reply to respond directly to ${safeName}.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend API error:", error);
      return { status: "error", message: "Failed to send message. Please email directly." };
    }

    return { status: "success", message: "Message sent! I will get back to you shortly." };
  } catch (err: unknown) {
    console.error("Unexpected error in sendContactEmail:", err);
    return { status: "error", message: "An unexpected error occurred. Please email directly." };
  }
}
