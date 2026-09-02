import Link from "next/link";
import { GraveArchive } from "@/components/grave-archive";
import { getGraves } from "@/lib/graves";

export default async function Home() {
  const graves = await getGraves();
  return <>
    <section className="grid-noise border-b border-[#11130f] bg-[#d6f56c] px-5 py-20">
      <div className="mx-auto max-w-6xl">
        <p className="mb-5 text-sm font-bold uppercase tracking-[.2em]">A dignified end is still an ending</p>
        <h1 className="max-w-4xl text-5xl font-black leading-[.92] tracking-[-.06em] sm:text-7xl">Don’t delete the work that made you better.</h1>
        <p className="mt-7 max-w-xl text-lg leading-7">Digital Graveyard preserves abandoned projects, their hard-won lessons, and the possibility that someone else may bring them back to life.</p>
        <Link href="/graves/new" className="button-primary mt-8 inline-block px-6 py-4 font-bold">Create a grave →</Link>
      </div>
    </section>
    <section className="mx-auto max-w-6xl px-5 pt-14"><div className="mb-8 flex items-end justify-between"><div><p className="text-sm font-bold uppercase tracking-widest text-[#73815c]">Recent burials</p><h2 className="mt-2 text-3xl font-black">Every unfinished project has a story.</h2></div></div></section>
    <GraveArchive graves={graves} />
  </>;
}
