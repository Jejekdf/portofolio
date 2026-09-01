import { z } from "zod";

// Common disposable / burner email domains
const DISPOSABLE_EMAIL_DOMAINS = new Set([
  "mailinator.com",
  "10minutemail.com",
  "tempmail.com",
  "temp-mail.org",
  "guerrillamail.com",
  "guerrillamailblock.com",
  "trashmail.com",
  "yopmail.com",
  "sharklasers.com",
  "dispostable.com",
  "getnada.com",
  "mohmal.com",
  "burnermail.io",
  "fake.com",
  "test.com",
  "example.com",
  "asdf.com",
  "generator.email",
  "throwawaymail.com",
  "dropmail.me",
  "emailondeck.com",
  "crazymailing.com",
]);

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z
    .string()
    .trim()
    .email("Invalid email address format")
    .refine((email) => {
      const parts = email.split("@");
      if (parts.length !== 2) return false;
      const domain = parts[1].toLowerCase();
      return !DISPOSABLE_EMAIL_DOMAINS.has(domain);
    }, "Disposable or temporary email addresses are not allowed. Please use a valid personal or work email.")
    .refine((email) => {
      const parts = email.split("@");
      const domain = parts[1] || "";
      return /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(domain);
    }, "Email must contain a valid top-level domain (e.g. .com, .id, .org)"),
  subject: z.string().max(150).optional().default("Portfolio Inquiry"),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(2000),
  honeypot: z.string().max(0, "Bot detected").optional().default(""),
});

export type ContactInput = z.infer<typeof contactSchema>;
