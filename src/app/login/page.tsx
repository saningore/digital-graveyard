import Link from "next/link";
import { signIn, signUp } from "./actions";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ message?: string }> }) {
  const message = (await searchParams).message;
  return <div className="mx-auto max-w-md px-5 py-20"><Link href="/" className="text-sm font-bold underline">← Back to archive</Link><h1 className="mt-10 text-4xl font-black">Welcome back.</h1><p className="mt-3 text-[#55584f]">Sign in to give a project its proper ending.</p>{message && <p className="mt-5 bg-[#d6f56c] p-3 text-sm">{message}</p>}<form className="mt-8 space-y-5 border border-[#11130f] bg-white p-6"><div><label htmlFor="email" className="font-bold">Email</label><input id="email" name="email" type="email" required className="mt-2 w-full border border-black px-3 py-3" /></div><div><label htmlFor="password" className="font-bold">Password</label><input id="password" name="password" type="password" required minLength={6} className="mt-2 w-full border border-black px-3 py-3" /></div><button formAction={signIn} className="w-full bg-[#11130f] py-3 font-bold text-[#d6f56c]">Sign in</button><button formAction={signUp} className="w-full border border-[#11130f] py-3 font-bold">Create account</button></form></div>;
}
