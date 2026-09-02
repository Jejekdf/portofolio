# Randi Maulana — Portfolio
> High-performance engineering portfolio built with Next.js 16, Three.js WebGL, and verified GitHub repositories.

A modern, performance-focused personal portfolio and software engineering showcase. Engineered for fast initial load times, high-contrast typography, and strict input validation, combining an interactive 3D WebGL hero focal sculpture with verified projects, industry credential curricula, and a 3-tier validated communication console.

## Installing / Getting started

A quick guide to set up the project locally for development.

```shell
git clone https://github.com/Jejekdf/portofolio.git
cd portofolio
npm install
```

The commands above clone the repository to your local machine, enter the project directory, and install all dependencies defined in `package.json`.

### Initial Configuration

To enable the contact form email dispatch functionality, configure your environment variables:

```shell
cp .env.example .env.local
```

Open `.env.local` and provide your Resend API credentials:

```env
RESEND_API_KEY=re_your_api_key_here
CONTACT_TO_EMAIL=maulanarandi531@gmail.com
CONTACT_FROM_EMAIL=Portfolio Contact <onboarding@resend.dev>
```

> **Note:** In development mode without an API key, form submissions are logged safely to the server console with simulated success.

## Developing

To start the local development server with Turbopack acceleration:

```shell
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application with hot module replacement.

### Building

To compile and verify the production bundle:

```shell
npx tsc --noEmit
npm run build
```

This runs strict TypeScript type-checking across the codebase, followed by the Next.js production compiler to generate optimized static pages and standalone assets.

### Deploying / Publishing

This project is optimized for zero-configuration deployment on [Vercel](https://vercel.com/):

```shell
npx vercel --prod
```

Alternatively, push to your connected `main` branch on GitHub to trigger automatic CI/CD builds and preview deployments.

## Features

* **Contained WebGL 3D Sculpture**: Native Three.js interactive ribbon canvas with responsive mouse parallax, smooth damping, and automated WebGL resource disposal.
* **Verified GitHub Architecture**: Real-world projects directly verified from source repository package managers (Next.js 16, Laravel 12, Express 5, Flutter, and ESP32 IoT).
* **Accreditation Lightbox**: HD certificate gallery featuring curriculum breakdowns for BNSP, Huawei HCIA, IBM Granite, and Cisco accreditations.
* **3-Tier Contact Verification**:
  * *Layer 1*: Zod schema validation for strict RFC compliance and valid TLD structures.
  * *Layer 2*: In-memory blocklist filtering disposable/temporary email addresses.
  * *Layer 3*: Server-side DNS MX record resolution (`dns.promises.resolveMx`) to verify mail server existence before dispatch.
* **Security Headers**: Strict Content-Type sniffing prevention (`nosniff`), clickjacking defense (`DENY`), and referrer isolation configured directly in `next.config.ts`.
* **Zero UI Library Slop**: Clean, hand-crafted Tailwind CSS components with standard 44px minimum tap targets and fluid typography scaling.

## Configuration

The application accepts the following environment variables:

#### `RESEND_API_KEY`
Type: `String`  
Default: `undefined`  
Your Resend API key for outbound contact emails.

#### `CONTACT_TO_EMAIL`
Type: `String`  
Default: `'maulanarandi531@gmail.com'`  
The recipient email address where portfolio inquiries are delivered.

#### `CONTACT_FROM_EMAIL`
Type: `String`  
Default: `'Portfolio Contact <onboarding@resend.dev>'`  
The verified sender identity in Resend.

## Contributing

Contributions, issues, and feature requests are welcome.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Links

- **Live Demo**: [https://portofolio-nu-lemon.vercel.app](https://portofolio-nu-lemon.vercel.app)
- **GitHub Repository**: [https://github.com/Jejekdf/portofolio](https://github.com/Jejekdf/portofolio)
- **LinkedIn Profile**: [https://www.linkedin.com/in/randi-maulana-dev](https://www.linkedin.com/in/randi-maulana-dev)
- **Issue Tracker**: [https://github.com/Jejekdf/portofolio/issues](https://github.com/Jejekdf/portofolio/issues)

## Licensing

This project is open source and available under the [MIT License](LICENSE).
