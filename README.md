# Randi Maulana — Portfolio

Personal engineering portfolio and project showcase. Built with Next.js 16 (App Router), React 19, TypeScript, Three.js, and Tailwind CSS.

---

## Overview

A performance-focused portfolio engineered for fast initial load times, high-contrast typography, and strict input validation. The interface combines custom WebGL background shaders with an editorial layout, zero third-party UI component libraries, and production-grade security headers.

Live Demo: [https://portofolio-nu-lemon.vercel.app](https://portofolio-nu-lemon.vercel.app) *(or your deployed Vercel domain)*

---

## Technical Highlights

- **Pure WebGL 3D Rendering**: Custom Three.js render loop using `THREE.Timer` (replacing deprecated `THREE.Clock`) with automatic memory disposal (`geometry.dispose()`, `material.dispose()`, `renderer.dispose()`) on unmount.
- **3-Tier Email Verification**:
  - *Layer 1*: Zod schema validation enforcing RFC compliance and valid TLDs.
  - *Layer 2*: In-memory blocklist filtering disposable/burner email providers (`mailinator.com`, `tempmail.com`, etc.).
  - *Layer 3*: Server-side DNS MX record resolution (`dns.promises.resolveMx`) to block non-existent mail exchange hosts before dispatching to Resend.
- **Form Security & Rate Limiting**: Next.js Server Actions with silent honeypot bot traps, client IP extraction via `x-forwarded-for`, and HTML entity escaping to prevent mail client injection.
- **Responsive Craft & Accessibility**: Input fields set to 16px (`text-base`) to prevent iOS Safari forced zoom, minimum 44px touch targets, fluid `clamp()` headline scaling with `text-balance`, and `prefers-reduced-motion` hardware detection.
- **HTTP Security Headers**: Strict Content-Type sniffing prevention (`nosniff`), clickjacking defense (`DENY`), and cross-origin referrer isolation configured directly in `next.config.ts`.

---

## Tech Stack

| Layer | Technologies |
|---|---|
| **Core Framework** | Next.js 16.3.3 (App Router, Turbopack) |
| **UI Library** | React 19.2.8, Tailwind CSS v4 |
| **Language** | TypeScript 5 (Strict Mode) |
| **3D Graphics** | Three.js 0.185.1 (Native WebGL) |
| **Motion** | Framer Motion |
| **State Management** | Zustand 5 |
| **Schema Validation** | Zod 4 |
| **Email Delivery** | Resend SDK |

---

## Project Structure

```
portofolio/
├── app/
│   ├── actions.ts              # Server Actions (Resend + DNS MX + Rate Limiter)
│   ├── layout.tsx              # Root Layout, fonts, and base metadata
│   ├── page.tsx                # Single-page layout composition
│   ├── icon.svg                # Vector monogram favicon
│   ├── components/
│   │   ├── canvas/             # Native Three.js canvas & particle fields
│   │   │   ├── Scene.tsx       # 3D sculpture with THREE.Timer & mouse lerp
│   │   │   └── ParticleField.tsx # Background point cloud & connection lines
│   │   └── ui/                 # Accessible editorial UI sections
│   │       ├── Header.tsx      # Monogram brand mark & mobile navigation
│   │       ├── HeroSection.tsx # Headline, CV download, and quick actions
│   │       ├── ProjectGrid.tsx # Project feed with live demos & source links
│   │       ├── CertificateGrid.tsx # Certification index
│   │       ├── SkillGrid.tsx   # Categorized technical competencies
│   │       ├── ContactForm.tsx # Editorial underline input form
│   │       └── Footer.tsx      # Minimal footer with safe-area padding
│   └── lib/
│       ├── store.ts            # Zustand client state store
│       ├── utils.ts            # ClassName merge utility (clsx + tailwind-merge)
│       └── validations.ts      # Zod schema & disposable domain blocklist
├── public/                     # Static assets, CV PDF, and brand marks
├── next.config.ts              # HTTP Security headers configuration
├── tsconfig.json               # TypeScript strict configuration
└── package.json                # Dependencies and scripts
```

---

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm 10.x or higher

### 1. Clone the Repository

```bash
git clone https://github.com/Jejekdf/portofolio.git
cd portofolio
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Copy the example environment file:

```bash
cp .env.example .env.local
```

Fill in your Resend credentials:

```env
# https://resend.com/api-keys
RESEND_API_KEY=re_your_api_key_here
CONTACT_TO_EMAIL=maulanarandi531@gmail.com
```

### 4. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the application.

---

## Verification & Build

```bash
# Type-check TypeScript files
npx tsc --noEmit

# Check for dependency vulnerabilities
npm audit

# Build optimized production bundle
npm run build
```

---

## License

This project is licensed under the MIT License.
