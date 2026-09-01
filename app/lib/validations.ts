import { z } from "zod";

// Comprehensive blocklist of disposable / burner / temporary email domains
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
  "tempail.com",
  "mytempemail.com",
  "mohmal.im",
  "getairmail.com",
  "inboxbear.com",
]);

// Common domain typos mapped to correct suggestions
const DOMAIN_TYPO_MAP: Record<string, string> = {
  "gmai.com": "gmail.com",
  "gamil.com": "gmail.com",
  "gmial.com": "gmail.com",
  "gmaill.com": "gmail.com",
  "yaho.com": "yahoo.com",
  "yahooo.com": "yahoo.com",
  "hotmial.com": "hotmail.com",
  "hotmaill.com": "hotmail.com",
  "outlok.com": "outlook.com",
};

export const contactSchema = z.object({
  // 1. Name Field Validation
  name: z
    .string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters long." })
    .max(80, { message: "Name cannot exceed 80 characters." })
    .regex(/^[a-zA-Z\s'.-]+$/, {
      message: "Name can only contain letters, spaces, hyphens, and apostrophes.",
    })
    .refine((val) => !/^(.)\1{3,}$/i.test(val), {
      message: "Please enter a valid realistic name.",
    }),

  // 2. Email Field Validation with SuperRefine
  email: z
    .string()
    .trim()
    .toLowerCase()
    .max(254, { message: "Email address cannot exceed 254 characters." })
    .email({ message: "Please enter a valid email address format (e.g. name@domain.com)." })
    .superRefine((email, ctx) => {
      const parts = email.split("@");
      if (parts.length !== 2) return;

      const [localPart, domain] = parts;

      // Local part checks
      if (localPart.length === 0 || localPart.length > 64) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Email prefix before '@' must be between 1 and 64 characters.",
        });
      }

      // Check for common domain typos
      if (DOMAIN_TYPO_MAP[domain]) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Did you mean '${localPart}@${DOMAIN_TYPO_MAP[domain]}'?`,
        });
      }

      // Block disposable email domains
      if (DISPOSABLE_EMAIL_DOMAINS.has(domain)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Disposable and temporary email addresses are not accepted. Please provide a real personal or work email.",
        });
      }

      // Domain format and TLD structure (e.g., domain.com, sub.domain.co.id)
      if (!/^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*\.[a-z]{2,}$/i.test(domain)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Email domain must contain a valid top-level domain (e.g. .com, .id, .dev).",
        });
      }
    }),

  // 3. Optional Subject
  subject: z
    .string()
    .trim()
    .max(150, { message: "Subject cannot exceed 150 characters." })
    .optional()
    .default("Portfolio Inquiry"),

  // 4. Message Field Validation
  message: z
    .string()
    .trim()
    .min(15, { message: "Please provide a message of at least 15 characters." })
    .max(2000, { message: "Message cannot exceed 2,000 characters." })
    .superRefine((msg, ctx) => {
      // Must contain at least 3 distinct words
      const words = msg.split(/\s+/).filter((w) => w.length > 1);
      if (words.length < 3) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please write at least 3 words describing your inquiry or project.",
        });
      }

      // Anti-Spam: Block excessive URL links in a single message
      const linkMatches = msg.match(/https?:\/\/[^\s]+/gi) || [];
      if (linkMatches.length > 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Messages with more than 2 links are blocked to prevent spam.",
        });
      }
    }),

  // 5. Bot Trap Honeypot
  honeypot: z
    .string()
    .max(0, { message: "Bot activity detected." })
    .optional()
    .default(""),
});

export type ContactInput = z.infer<typeof contactSchema>;
