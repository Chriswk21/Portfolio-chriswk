import { profile } from "@/lib/data";

const links = [
  { label: "Work", href: "#work" },
  { label: "Skillset", href: "#skillset" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  return (
    <header className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-6 md:px-10">
      <a href="#top" className="text-[13px] font-semibold tracking-tight">
        {profile.shortName}
        <sup className="ml-0.5 text-[9px]">®</sup>
      </a>
      <nav aria-label="Primary" className="flex items-center gap-5 text-[13px] md:gap-8">
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="text-ink/70 transition-[color] duration-150 hover:text-ink"
          >
            {l.label}
          </a>
        ))}
        <a
          href={profile.cvPath}
          download
          className="hidden border border-ink px-3 py-1.5 transition-[background-color,color] duration-150 hover:bg-ink hover:text-paper sm:inline-block"
        >
          CV ↓
        </a>
      </nav>
    </header>
  );
}
