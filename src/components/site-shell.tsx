import Link from "next/link";

export function Header() {
  return <header className="border-b border-black/15 bg-[#efeee5]">
    <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
      <Link href="/" className="text-xl font-black tracking-tight">DIGITAL <span className="text-[#73815c]">GRAVEYARD</span></Link>
      <div className="flex items-center gap-4 text-sm font-bold">
        <Link href="/graves/new" className="rounded-full bg-[#11130f] px-4 py-2 text-[#d6f56c]">Bury a project +</Link>
      </div>
    </nav>
  </header>;
}

export function Footer() {
  return <footer className="border-t border-black/15 px-5 py-10 text-center text-sm text-[#65675f]">
    Built for projects that deserved another chapter. <span className="font-bold text-[#11130f]">Powered by Codyza</span>
  </footer>;
}
