import Link from "next/link";
import { redirect } from "next/navigation";
import { GraveForm } from "@/components/grave-form";
import { createClient, hasSupabaseConfig } from "@/lib/supabase/server";

export default async function NewGravePage() {
  if (hasSupabaseConfig()) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect("/login");
  }
  return <div className="mx-auto max-w-2xl px-5 py-14">
    <Link href="/" className="text-sm font-bold underline">← Back to the archive</Link>
    <p className="mt-10 text-sm font-bold uppercase tracking-widest text-[#73815c]">Make a memorial</p>
    <h1 className="mt-2 text-4xl font-black tracking-tight">Give your project a proper resting place.</h1>
    <p className="mt-4 leading-7 text-[#55584f]">An ending is useful when its context survives. Archive your work so its ideas and lessons can outlive the code.</p>
    <div className="mt-10 border border-[#11130f] bg-[#f8f7f0] p-6 sm:p-8"><GraveForm /></div>
  </div>;
}
