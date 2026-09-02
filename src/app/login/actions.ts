"use server";
import { redirect } from "next/navigation";
import { createClient, hasSupabaseConfig } from "@/lib/supabase/server";

export async function signIn(formData: FormData) {
  if (!hasSupabaseConfig()) return;
  const supabase = await createClient();
  await supabase.auth.signInWithPassword({ email: String(formData.get("email")), password: String(formData.get("password")) });
  redirect("/graves/new");
}

export async function signUp(formData: FormData) {
  if (!hasSupabaseConfig()) return;
  const supabase = await createClient();
  await supabase.auth.signUp({ email: String(formData.get("email")), password: String(formData.get("password")) });
  redirect("/login?message=Check your inbox to confirm your account.");
}
