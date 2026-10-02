# Randi Maulana — Portfolio

Personal software engineering portfolio showcasing fullstack web applications, system architectures, and interactive 3D WebGL experiences.

**Live Demo:** [http://rnm.biz.id](http://rnm.biz.id)

---

## Tech Stack

- **Framework:** Next.js 16 (App Router), React 19, TypeScript
- **Styling:** Tailwind CSS v4
- **3D Graphics & Animation:** Three.js, Framer Motion
- **Form & Email:** Next.js Server Actions, Zod, Resend API
- **Deployment:** Vercel

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm or pnpm

### Installation

```bash
git clone https://github.com/Jejekdf/portofolio.git
cd portofolio
npm install
```

### Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Configure your contact form delivery:

```env
RESEND_API_KEY=re_your_api_key_here
CONTACT_TO_EMAIL=maulanarandi531@gmail.com
CONTACT_FROM_EMAIL=Portfolio Contact <onboarding@resend.dev>
```

> In development mode, form submissions fallback to console logging if `RESEND_API_KEY` is not provided.

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Production Build

```bash
npm run build
```

---

## Architecture Highlights

- **Decoupled 3D Canvas:** Three.js WebGL canvas runs as an ambient background layer with responsive mouse parallax, throttled frameloop, and explicit GPU resource disposal on unmount.
- **Server Action Validation:** Contact form submission handles client and server validation via Zod schemas, in-memory IP rate limiting, and server-side DNS MX record checks before sending emails via Resend.
- **Accessible UI:** Responsive layout with semantic HTML, fluid typography, and 44px minimum touch targets.

---

## Project Structure

```text
portofolio/
├── app/
│   ├── components/
│   │   ├── canvas/          # Three.js 3D scene & background canvas
│   │   └── ui/              # Page sections (Hero, Projects, Skills, Contact, Footer)
│   ├── lib/                 # Zod validation schemas
│   ├── actions.ts           # Server Actions (Contact form dispatch & DNS check)
│   ├── globals.css          # Tailwind CSS styles & film grain overlay
│   ├── layout.tsx           # Root layout & metadata
│   └── page.tsx             # Single-page portfolio entry
├── public/                  # Static assets & icons
└── next.config.ts           # Security headers & Next.js config
```

---

## Author & License

Developed by **Randi Maulana** ([GitHub](https://github.com/Jejekdf) · [LinkedIn](https://www.linkedin.com/in/randi-maulana-dev)).

Distributed under the [MIT License](LICENSE).
