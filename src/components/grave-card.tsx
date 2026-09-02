import Link from "next/link";
import Image from "next/image";
import type { Grave } from "@/lib/types";

export function GraveCard({ grave }: { grave: Grave }) {
  return <Link href={`/graves/${grave.slug}`} className="grave-card block border border-[#11130f] bg-[#f8f7f0] p-5">
    <div className="mb-5 flex aspect-[16/8] items-center justify-center bg-[#1d211b] text-5xl" aria-label={`${grave.name} screenshot`}>
      {grave.screenshot_url ? <Image src={grave.screenshot_url} alt={`${grave.name} screenshot`} width={640} height={320} className="h-full w-full object-cover" /> : "⚰"}
    </div>
    <div className="mb-3 flex items-start justify-between gap-3">
      <h2 className="text-xl font-black">{grave.name}</h2>
      <span className={`shrink-0 text-xs font-bold ${grave.revivable ? "text-[#4f6d32]" : "text-[#7d625b]"}`}>{grave.revivable ? "REVIVABLE" : "MEMORIAL"}</span>
    </div>
    <p className="mb-4 line-clamp-2 text-sm leading-6 text-[#55584f]">{grave.description}</p>
    <div className="flex flex-wrap gap-2">{grave.tech_stack.slice(0, 4).map((tech) => <span key={tech} className="tag">{tech}</span>)}</div>
  </Link>;
}
