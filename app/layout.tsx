import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Randi Maulana — Fullstack Software Engineer",
  description:
    "Portfolio of Randi Maulana. Fullstack Software Engineer building scalable web applications, APIs, and database architectures with Next.js 16, React 19, TypeScript, PHP, Laravel, and PostgreSQL.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <body className="min-h-dvh flex flex-col bg-[#090d0a] text-[#f4f1eb] font-sans overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
