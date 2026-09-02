export type SectionId = "hero" | "projects" | "certificates" | "skills" | "contact";

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  github: string;
  demo?: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialUrl: string;
  image?: string;
  skills: string[];
}

export interface ContactFormState {
  status: "idle" | "loading" | "success" | "error";
  message: string;
}
