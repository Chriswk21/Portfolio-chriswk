import { profile } from '@/lib/data';

export function Footer() {
  const links = [
    { label: profile.email, href: `mailto:${profile.email}` },
    ...profile.socials,
    { label: 'CV', href: profile.cvPath },
  ];

  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto max-w-[1200px] px-6 pb-10 pt-20 md:px-10 md:pt-28">
        <p aria-hidden className="text-[clamp(3rem,14.5vw,11rem)] font-medium leading-none tracking-[-0.05em]">
          {profile.shortName}
          <sup className="text-[0.3em] align-super">®</sup>
        </p>

        <div className="mt-14 flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <p className="max-w-xs text-xl font-medium uppercase leading-tight tracking-[-0.01em]">
            Between the algorithm and the people using it.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-3 text-[12px] uppercase tracking-wide md:justify-end">
            {links.map((l) => {
              const external = l.href.startsWith('http');
              return (
                <li key={l.label}>
                  <a
                    href={l.href}
                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    {...(l.label === 'CV' ? { download: true } : {})}
                    className="text-paper/80 transition-[color] duration-150 hover:text-paper"
                  >
                    {l.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <p className="mt-16 text-[11px] text-paper/40">
          © {new Date().getFullYear()} Chris William Kurniawan. {profile.location}.
        </p>
      </div>
    </footer>
  );
}
