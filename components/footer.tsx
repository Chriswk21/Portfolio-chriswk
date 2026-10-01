import { profile } from '@/lib/data';
import { InView } from './motion';
import { d } from '@/lib/stagger';

/**
 * Closing moment: the wordmark rises letter by letter out of a mask when the
 * footer enters, then the tagline and links fade up. Links draw an underline
 * on hover.
 */
export function Footer() {
  const links = [
    { label: profile.email, href: `mailto:${profile.email}` },
    ...profile.socials,
    { label: 'CV', href: profile.cvPath },
  ];
  const letters = profile.shortName.split('');

  return (
    <footer className="overflow-hidden bg-ink text-paper">
      <InView className="mx-auto max-w-[1200px] px-6 pb-10 pt-20 md:px-10 md:pt-28" margin="0px 0px -5% 0px">
        <p className="text-[clamp(3rem,14.5vw,11rem)] font-medium leading-none tracking-[-0.05em]">
          <span className="sr-only">{profile.shortName}</span>
          <span aria-hidden>
            {letters.map((ch, i) => (
              <span key={i} className="rv-mask">
                <span style={d(i, 45)}>{ch}</span>
              </span>
            ))}
            <span className="rv-mask align-super text-[0.3em]">
              <span style={d(letters.length, 45)}>®</span>
            </span>
          </span>
        </p>

        <span aria-hidden className="rv-line mt-10 block h-px bg-paper/20" style={d(0, 0, 400)} />

        <div className="mt-10 flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <p className="rv max-w-xs text-xl font-medium uppercase leading-tight tracking-[-0.01em]" style={d(0, 0, 500)}>
            Between the algorithm and the people using it.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-3 text-[12px] uppercase tracking-wide md:justify-end">
            {links.map((l, i) => {
              const external = l.href.startsWith('http');
              return (
                <li key={l.label} className="rv" style={d(i, 50, 560)}>
                  <a
                    href={l.href}
                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    {...(l.label === 'CV' ? { download: true } : {})}
                    className="ulink text-paper/80 transition-[color] duration-150 hover:text-paper"
                  >
                    {l.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="rv mt-16 flex items-center justify-between text-[11px] text-paper/40" style={d(0, 0, 700)}>
          <p>
            © {new Date().getFullYear()} Chris William Kurniawan. {profile.location}.
          </p>
          <a href="#top" className="group inline-flex items-center gap-2 text-paper/60 transition-[color] duration-150 hover:text-paper">
            Back to top
            <span
              aria-hidden
              className="transition-transform duration-300 ease-[var(--ease-out)] motion-safe:[@media(hover:hover)]:group-hover:-translate-y-1"
            >
              ↑
            </span>
          </a>
        </div>
      </InView>
    </footer>
  );
}
