import { create } from "zustand";
import type { SectionId } from "@/app/types";

interface AppState {
  activeSection: SectionId;
  scrollProgress: number;
  isCanvasReady: boolean;
  reducedMotion: boolean;
  hoveredProject: string | null;
  setActiveSection: (section: SectionId) => void;
  setScrollProgress: (progress: number) => void;
  setCanvasReady: (ready: boolean) => void;
  setReducedMotion: (reduced: boolean) => void;
  setHoveredProject: (id: string | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  activeSection: "hero",
  scrollProgress: 0,
  isCanvasReady: false,
  reducedMotion: false,
  hoveredProject: null,
  setActiveSection: (section) => set({ activeSection: section }),
  setScrollProgress: (progress) => set({ scrollProgress: progress }),
  setCanvasReady: (ready) => set({ isCanvasReady: ready }),
  setReducedMotion: (reduced) => set({ reducedMotion: reduced }),
  setHoveredProject: (id) => set({ hoveredProject: id }),
}));
