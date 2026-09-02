"use client";
import { useActionState, useState } from "react";
import { createGrave, type ActionState } from "@/app/graves/actions";
import { TECHNOLOGIES } from "@/lib/types";

const initialState: ActionState = {};
function FieldError({ errors }: { errors?: string[] }) { return errors?.[0] ? <p className="mt-1 text-sm text-red-700">{errors[0]}</p> : null; }

export function GraveForm() {
  const [state, action, pending] = useActionState(createGrave, initialState);
  const [selected, setSelected] = useState<string[]>([]);
  function toggle(tech: string) { setSelected((current) => current.includes(tech) ? current.filter((item) => item !== tech) : current.length < 8 ? [...current, tech] : current); }
  const input = "mt-2 w-full border border-[#11130f] bg-white px-3 py-3 outline-none focus:ring-2 focus:ring-[#73815c]";
  return <form action={action} className="space-y-7">
    {state.error && <p role="alert" className="border border-red-700 bg-red-50 p-4 text-red-800">{state.error}</p>}
    <div><label htmlFor="name" className="font-bold">Project name <span className="text-red-700">*</span></label><input id="name" name="name" required className={input} placeholder="My awesome project" /><FieldError errors={state.fieldErrors?.name} /></div>
    <div><label htmlFor="github_url" className="font-bold">GitHub URL <span className="text-red-700">*</span></label><input id="github_url" name="github_url" required type="url" className={input} placeholder="https://github.com/..." /><FieldError errors={state.fieldErrors?.github_url} /></div>
    <div><label htmlFor="live_url" className="font-bold">Live URL <span className="font-normal text-[#65675f]">optional</span></label><input id="live_url" name="live_url" type="url" className={input} placeholder="https://myproject.vercel.app" /><FieldError errors={state.fieldErrors?.live_url} /></div>
    <div><label htmlFor="description" className="font-bold">Description <span className="text-red-700">*</span></label><textarea id="description" name="description" required className={input} rows={4} placeholder="What did it do? What problem did it solve?" /><FieldError errors={state.fieldErrors?.description} /></div>
    <fieldset><legend className="font-bold">Tech stack <span className="text-red-700">*</span> <span className="font-normal text-[#65675f]">({selected.length}/8)</span></legend><div className="mt-3 flex flex-wrap gap-2">{TECHNOLOGIES.map((tech) => <label key={tech} className={`cursor-pointer rounded-full border px-3 py-2 text-sm ${selected.includes(tech) ? "border-[#11130f] bg-[#d6f56c] font-bold" : "border-[#bfc1b5] bg-white"}`}><input type="checkbox" name="tech_stack" value={tech} checked={selected.includes(tech)} onChange={() => toggle(tech)} className="sr-only" />{tech}</label>)}</div><FieldError errors={state.fieldErrors?.tech_stack} /></fieldset>
    <div><label htmlFor="stop_reason" className="font-bold">Why did development stop?</label><textarea id="stop_reason" name="stop_reason" className={input} rows={3} placeholder="Scope creep, lost momentum, a better tool…" /></div>
    <div><label htmlFor="lessons_learned" className="font-bold">What did you learn?</label><textarea id="lessons_learned" name="lessons_learned" className={input} rows={3} placeholder="The lesson worth preserving." /></div>
    <div><label htmlFor="screenshot" className="font-bold">Screenshot <span className="font-normal text-[#65675f]">optional, max 5 MB</span></label><input id="screenshot" name="screenshot" type="file" accept="image/*" className="mt-2 block w-full text-sm" /></div>
    <label className="flex gap-3 border border-[#11130f] bg-[#d6f56c] p-4"><input name="revivable" type="checkbox" className="mt-1 size-4" /><span><strong>Open to revival</strong><br /><span className="text-sm">Another developer is welcome to pick up this work.</span></span></label>
    <button disabled={pending} className="button-primary w-full px-5 py-4 font-bold disabled:opacity-60">{pending ? "Burying project…" : "Create this grave"}</button>
  </form>;
}
