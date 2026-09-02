"use client";
import { useMemo, useState } from "react";
import { GraveCard } from "@/components/grave-card";
import type { Grave } from "@/lib/types";

export function GraveArchive({ graves }: { graves: Grave[] }) {
  const [query, setQuery] = useState("");
  const [revivableOnly, setRevivableOnly] = useState(false);
  const filtered = useMemo(() => graves.filter((grave) => {
    const searchable = `${grave.name} ${grave.description} ${grave.tech_stack.join(" ")}`.toLowerCase();
    return searchable.includes(query.toLowerCase()) && (!revivableOnly || grave.revivable);
  }), [graves, query, revivableOnly]);
  return <section className="mx-auto max-w-6xl px-5 pb-20">
    <div className="mb-8 flex flex-col gap-3 sm:flex-row">
      <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search names, stories, technologies…" className="w-full border border-[#11130f] bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-[#73815c]" />
      <label className="flex shrink-0 items-center gap-2 border border-[#11130f] bg-white px-4 py-3 text-sm font-bold"><input type="checkbox" checked={revivableOnly} onChange={(event) => setRevivableOnly(event.target.checked)} /> Open to revival</label>
    </div>
    <p className="mb-5 text-sm text-[#65675f]">{filtered.length} {filtered.length === 1 ? "project rests" : "projects rest"} here</p>
    {filtered.length ? <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{filtered.map((grave) => <GraveCard key={grave.id} grave={grave} />)}</div> : <div className="border border-dashed border-[#11130f] p-12 text-center"><p className="text-xl font-bold">No graves found.</p><p className="mt-2 text-[#65675f]">Try another search, or make room for the next unfinished idea.</p></div>}
  </section>;
}
