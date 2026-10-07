import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Randi Maulana — Fullstack Software Engineer",
  description:
    "Portfolio of Randi Maulana. Fullstack Software Engineer building scalable web applications, APIs, and database architectures with Next.js 16, React 19, TypeScript, PHP, Laravel, and PostgreSQL.",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}>
      <body className="min-h-dvh flex flex-col bg-[#090d0a] text-[#f4f1eb] font-sans overflow-x-hidden relative">
        {/* Cinematic Film Texture Overlay */}
        <div
          className="fixed inset-0 pointer-events-none z-50 cinematic-film-grain"
          aria-hidden="true"
        />
        {children}
      </body>
    </html>
  );
}
