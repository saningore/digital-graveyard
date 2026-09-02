export type Grave = {
  id: string;
  slug: string;
  name: string;
  github_url: string;
  live_url: string | null;
  description: string;
  tech_stack: string[];
  stop_reason: string | null;
  lessons_learned: string | null;
  revivable: boolean;
  screenshot_url: string | null;
  created_at: string;
  owner_id?: string;
};

export const TECHNOLOGIES = ["Next.js", "React", "TypeScript", "Python", "Node.js", "Tailwind CSS", "MongoDB", "Supabase", "PostgreSQL", "Prisma", "GraphQL", "REST API", "Docker", "AWS", "Vercel", "Cloudflare", "Gemini AI", "OpenAI", "Claude API", "React Native", "Vue.js", "Django", "FastAPI", "Rust", "Go"];
