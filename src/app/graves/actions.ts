"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient, hasSupabaseConfig } from "@/lib/supabase/server";
import { graveSchema, makeSlug } from "@/lib/validation";

export type ActionState = { error?: string; fieldErrors?: Record<string, string[]> };

export async function createGrave(_: ActionState, formData: FormData): Promise<ActionState> {
  if (!hasSupabaseConfig()) return { error: "Supabase is not configured. Add the environment variables from .env.example to publish a grave." };
  const parsed = graveSchema.safeParse({
    name: formData.get("name"), github_url: formData.get("github_url"), live_url: formData.get("live_url"),
    description: formData.get("description"), tech_stack: formData.getAll("tech_stack"),
    stop_reason: formData.get("stop_reason"), lessons_learned: formData.get("lessons_learned"),
    revivable: formData.get("revivable") === "on",
  });
  if (!parsed.success) return { fieldErrors: parsed.error.flatten().fieldErrors };
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Please sign in before creating a grave." };
  let screenshot_url: string | null = null;
  const image = formData.get("screenshot");
  if (image instanceof File && image.size) {
    if (!image.type.startsWith("image/") || image.size > 5_000_000) return { error: "Upload an image under 5 MB." };
    const path = `${user.id}/${crypto.randomUUID()}-${image.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
    const { error } = await supabase.storage.from("grave-screenshots").upload(path, image);
    if (error) return { error: `Image upload failed: ${error.message}` };
    screenshot_url = supabase.storage.from("grave-screenshots").getPublicUrl(path).data.publicUrl;
  }
  const slug = makeSlug(parsed.data.name);
  const { error } = await supabase.from("graves").insert({ ...parsed.data, live_url: parsed.data.live_url ?? null, screenshot_url, slug, owner_id: user.id });
  if (error) return { error: error.message };
  revalidatePath("/");
  redirect(`/graves/${slug}`);
}
