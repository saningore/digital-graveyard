import type { Grave } from "@/lib/types";
import { createClient, hasSupabaseConfig } from "@/lib/supabase/server";

const sampleGraves: Grave[] = [
  { id: "1", slug: "night-owl-a1b2c", name: "Night Owl", github_url: "https://github.com/example/night-owl", live_url: null, description: "A distraction-free developer journal that grew into a lesson in knowing when to stop.", tech_stack: ["Next.js", "TypeScript", "Supabase"], stop_reason: "The scope outran the time available.", lessons_learned: "Ship the smallest useful version first.", revivable: true, screenshot_url: null, created_at: "2026-08-13T00:00:00Z" },
  { id: "2", slug: "moss-cms-d4e5f", name: "Moss CMS", github_url: "https://github.com/example/moss-cms", live_url: null, description: "A calm publishing platform for small collectives and local newsletters.", tech_stack: ["React", "Node.js", "PostgreSQL"], stop_reason: "Maintaining editor features was more work than expected.", lessons_learned: "Boring software is sometimes the best software.", revivable: false, screenshot_url: null, created_at: "2026-07-21T00:00:00Z" },
];

export async function getGraves(): Promise<Grave[]> {
  if (!hasSupabaseConfig()) return sampleGraves;
  const supabase = await createClient();
  const { data } = await supabase.from("graves").select("*").order("created_at", { ascending: false });
  return (data as Grave[] | null) ?? [];
}

export async function getGrave(slug: string): Promise<Grave | null> {
  if (!hasSupabaseConfig()) return sampleGraves.find((grave) => grave.slug === slug) ?? null;
  const supabase = await createClient();
  const { data } = await supabase.from("graves").select("*").eq("slug", slug).single();
  return data as Grave | null;
}
