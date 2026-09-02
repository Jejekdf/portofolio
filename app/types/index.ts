export type SectionId = "hero" | "projects" | "certificates" | "skills" | "contact";

export interface Project {
  id: string;
  title: string;
  scope?: string;
  description: string;
  tags: string[];
  github: string;
  demo?: string;
  featured?: boolean;
  metrics?: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialUrl: string;
  image?: string;
  skills: string[];
  competencies?: string[];
}

export interface ContactFormState {
  status: "idle" | "loading" | "success" | "error";
  message: string;
}
