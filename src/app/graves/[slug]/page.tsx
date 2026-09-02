import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getGrave } from "@/lib/graves";

export default async function GravePage({ params }: { params: Promise<{ slug: string }> }) {
  const grave = await getGrave((await params).slug);
  if (!grave) notFound();
  return <article className="mx-auto max-w-4xl px-5 py-14">
    <Link href="/" className="text-sm font-bold underline">← Return to archive</Link>
    <div className="mt-10 border border-[#11130f] bg-[#1d211b] p-8 text-center text-8xl">{grave.screenshot_url ? <Image src={grave.screenshot_url} alt={`${grave.name} screenshot`} width={1200} height={675} className="mx-auto max-h-[420px] w-full object-contain" /> : "⚰"}</div>
    <div className="mt-8 flex flex-wrap items-start justify-between gap-4"><div><p className="text-sm font-bold uppercase tracking-widest text-[#73815c]">Archived project</p><h1 className="mt-2 text-5xl font-black tracking-tight">{grave.name}</h1></div><span className={`rounded-full px-4 py-2 text-sm font-bold ${grave.revivable ? "bg-[#d6f56c]" : "bg-[#dedbd2]"}`}>{grave.revivable ? "Open to revival" : "Memorialized"}</span></div>
    <p className="mt-7 text-xl leading-8">{grave.description}</p>
    <div className="mt-8 flex flex-wrap gap-2">{grave.tech_stack.map((tech) => <span className="tag" key={tech}>{tech}</span>)}</div>
    <div className="mt-10 grid gap-6 md:grid-cols-2"><section className="border-t-2 border-[#11130f] pt-4"><h2 className="text-lg font-black">Why it stopped</h2><p className="mt-3 leading-7 text-[#55584f]">{grave.stop_reason || "Its creator left this chapter unfinished."}</p></section><section className="border-t-2 border-[#11130f] pt-4"><h2 className="text-lg font-black">What it taught</h2><p className="mt-3 leading-7 text-[#55584f]">{grave.lessons_learned || "Every project leaves a lesson for the next one."}</p></section></div>
    <div className="mt-10 flex flex-wrap gap-3"><a href={grave.github_url} target="_blank" rel="noreferrer" className="border border-[#11130f] px-5 py-3 font-bold">View source ↗</a>{grave.live_url && <a href={grave.live_url} target="_blank" rel="noreferrer" className="border border-[#11130f] px-5 py-3 font-bold">Visit live project ↗</a>}</div>
  </article>;
}
