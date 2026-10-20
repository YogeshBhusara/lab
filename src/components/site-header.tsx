import Link from "next/link";

const links = [
  { href: "/#index", label: "Index" },
  { href: "/add", label: "Add an experiment" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-[#10120f]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-4">
        <Link href="/" className="group flex items-baseline gap-3">
          <span className="font-serif text-[1.7rem] leading-none tracking-tight text-[#f4efe4] italic">
            Lab
          </span>
          <span className="hidden font-mono text-[11px] tracking-[0.18em] text-[#f4efe4]/55 uppercase sm:inline">
            Yogesh Bhusara
          </span>
        </Link>
        <nav className="flex items-center gap-5 text-sm text-[#f4efe4]/75">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="underline-offset-4 transition hover:text-[#e7ff6a] hover:underline"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
