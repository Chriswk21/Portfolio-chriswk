import { facts, profile } from '@/lib/data';

/**
 * The page's one authored moment: name lines rise out of a mask, then the
 * portrait panel wipes open top-to-bottom. Pure CSS (see globals.css), so it
 * stays smooth while the page is still loading and needs no hydration.
 * Reduced motion: every piece becomes a 200ms fade.
 */
export function Hero({ photo }: { photo: string | null }) {
  const delay = (ms: number) => ({ animationDelay: `${ms}ms` });

  return (
    <section
      id="top"
      className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 px-6 pb-24 pt-6 md:grid-cols-12 md:gap-8 md:px-10 md:pb-32"
    >
      {/* Left: identity */}
      <div className="flex flex-col justify-end md:col-span-5 md:pb-6">
        <h1 className="display text-[clamp(2.75rem,6.5vw,5.25rem)] font-medium">
          {profile.name.map((part, i) => (
            <span key={part} className="block overflow-hidden pb-[0.08em]">
              <span className="anim-rise block" style={delay(100 + i * 80)}>
                {part}
              </span>
            </span>
          ))}
        </h1>

        <p className="anim-fade-up mt-5 max-w-sm text-[15px] leading-snug" style={delay(350)}>
          {profile.tagline}
          <br />
          <span className="text-ink/60">{profile.subline}</span>
        </p>

        <ul className="anim-fade-up mt-6 flex max-w-sm flex-wrap gap-1.5" style={delay(430)} aria-label="Focus areas">
          {profile.focus.map((f) => (
            <li key={f} className="border border-line px-2.5 py-1 text-[11px]">
              {f}
            </li>
          ))}
        </ul>

        <div className="anim-fade-up mt-8 flex flex-wrap gap-2" style={delay(510)}>
          <a
            href={profile.cvPath}
            download
            className="group inline-flex items-center gap-2 bg-ink px-4 py-2.5 text-[13px] text-paper transition-[background-color,transform] duration-150 hover:bg-accent motion-safe:active:scale-[0.97]"
          >
            Download CV
            <span
              aria-hidden
              className="transition-transform duration-200 ease-[var(--ease-out)] motion-safe:[@media(hover:hover)]:group-hover:translate-y-0.5"
            >
              ↓
            </span>
          </a>
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 border border-ink/30 px-4 py-2.5 text-[13px] transition-[border-color,transform] duration-150 hover:border-ink motion-safe:active:scale-[0.97]"
          >
            Get in touch
            <span
              aria-hidden
              className="transition-transform duration-200 ease-[var(--ease-out)] motion-safe:[@media(hover:hover)]:group-hover:translate-x-0.5"
            >
              →
            </span>
          </a>
        </div>
      </div>

      {/* Right: portrait, or a fact sheet until public/images/profile.jpg exists */}
      <div
        className="anim-wipe relative aspect-[4/5] w-full overflow-hidden bg-ink md:col-span-7 md:aspect-auto md:min-h-[78vh]"
        style={delay(200)}
      >
        {photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photo} alt="Portrait of Chris William Kurniawan" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full flex-col justify-between p-6 text-paper md:p-10">
            <span className="font-mono text-[11px] uppercase tracking-widest text-paper/50">(Profile)</span>
            <dl className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
              {facts.map((f) => (
                <div key={f.label} className="border-t border-line-dark pt-3">
                  <dt className="font-mono text-[10px] uppercase tracking-widest text-paper/50">{f.label}</dt>
                  <dd className="mt-1 text-lg">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </div>
    </section>
  );
}
