"use client";

import { Header } from "@/app/components/ui/Header";
import { HeroSection } from "@/app/components/ui/HeroSection";
import { ProjectGrid } from "@/app/components/ui/ProjectGrid";
import { CertificateGrid } from "@/app/components/ui/CertificateGrid";
import { SkillGrid } from "@/app/components/ui/SkillGrid";
import { ContactForm } from "@/app/components/ui/ContactForm";
import { Footer } from "@/app/components/ui/Footer";
import { CinematicSpotlight } from "@/app/components/ui/CinematicSpotlight";
import { useScrollSpy } from "@/app/hooks/useScrollSpy";

export default function Home() {
  useScrollSpy();

  return (
    <>
      {/* Ambient Cursor Spotlight across the deep obsidian canvas */}
      <CinematicSpotlight />

      <Header />
      <main className="relative z-10">
        <HeroSection />
        <ProjectGrid />
        <CertificateGrid />
        <SkillGrid />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
