import { z } from "zod";

const url = z.string().trim().url("Enter a valid URL");

export const graveSchema = z.object({
  name: z.string().trim().min(2, "Project name must be at least 2 characters").max(100),
  github_url: url.refine((value) => new URL(value).hostname === "github.com", "Use a github.com URL"),
  live_url: z.string().trim().optional().transform((value) => value || undefined).pipe(url.optional()),
  description: z.string().trim().min(20, "Tell us a little more (20 characters minimum)").max(1000),
  tech_stack: z.array(z.string()).min(1, "Choose at least one technology").max(8, "Choose up to 8 technologies"),
  stop_reason: z.string().trim().max(1000).optional(),
  lessons_learned: z.string().trim().max(1000).optional(),
  revivable: z.boolean(),
});

export type GraveInput = z.infer<typeof graveSchema>;

export function makeSlug(name: string) {
  return `${name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}-${Math.random().toString(36).slice(2, 7)}`;
}
