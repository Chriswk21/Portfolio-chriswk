import { facts, profile } from '@/lib/data';
import { Roll } from './motion';

/**
 * The page's one authored moment, all CSS (runs off the main thread while
 * the page is still loading, no hydration needed):
 *   1. name lines rise out of a mask
 *   2. copy, chips (staggered) and buttons fade up
 *   3. the dark panel wipes open top-to-bottom, then its facts stagger in
 * Reduced motion: every piece becomes a 200ms fade (globals.css).
 */
export function Hero({ photo }: { photo: string | null }) {
  const delay = (ms: number) => ({ animationDelay: `${ms}ms` });

  return (
    <section
      id="top"
      className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 px-6 pb-24 pt-8 md:grid-cols-12 md:gap-8 md:px-10 md:pb-32"
    >
      {/* Left: identity */}
      <div className="flex flex-col justify-end md:col-span-5 md:pb-6">
        <p className="anim-fade-up mb-6 font-mono text-[10px] uppercase tracking-widest text-mute" style={delay(0)}>
          (Software Engineer — {profile.location})
        </p>

        <h1 className="display text-[clamp(2.75rem,6.5vw,5.25rem)] font-medium">
          {profile.name.map((part, i) => (
            <span key={part} className="block overflow-hidden pb-[0.08em]">
              <span className="anim-rise block" style={delay(100 + i * 90)}>
                {part}
              </span>
            </span>
          ))}
        </h1>

        <p className="anim-fade-up mt-5 max-w-sm text-[15px] leading-snug" style={delay(380)}>
          {profile.tagline}
          <br />
          <span className="text-ink/60">{profile.subline}</span>
        </p>

        <ul className="mt-6 flex max-w-sm flex-wrap gap-1.5" aria-label="Focus areas">
          {profile.focus.map((f, i) => (
            <li
              key={f}
              className="anim-fade-up border border-line px-2.5 py-1 text-[11px] transition-[border-color,color] duration-150 hover:border-ink"
              style={delay(460 + i * 45)}
            >
              {f}
            </li>
          ))}
        </ul>

        <div className="anim-fade-up mt-8 flex flex-wrap gap-2" style={delay(720)}>
          <a
            href={profile.cvPath}
            download
            className="group inline-flex items-center gap-2 bg-ink px-4 py-2.5 text-[13px] text-paper transition-[background-color,transform] duration-200 hover:bg-accent motion-safe:active:scale-[0.97]"
          >
            <Roll>Download CV</Roll>
            <span
              aria-hidden
              className="transition-transform duration-300 ease-[var(--ease-out)] motion-safe:[@media(hover:hover)]:group-hover:translate-y-0.5"
            >
              ↓
            </span>
          </a>
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 border border-ink/30 px-4 py-2.5 text-[13px] transition-[border-color,transform] duration-200 hover:border-ink motion-safe:active:scale-[0.97]"
          >
            <Roll>Get in touch</Roll>
            <span
              aria-hidden
              className="transition-transform duration-300 ease-[var(--ease-out)] motion-safe:[@media(hover:hover)]:group-hover:translate-x-1"
            >
              →
            </span>
          </a>
        </div>
      </div>

      {/* Right: portrait, or a fact sheet until public/images/profile.jpg exists */}
      <div
        className="anim-wipe relative flex w-full flex-col overflow-hidden bg-ink md:col-span-7 md:min-h-[78vh] md:flex-row-reverse"
        style={delay(200)}
      >
        {/* Portrait sits inside the profile panel. The source is narrow (342px), so it
            gets a tall slot close to its native width instead of a full-bleed stretch. */}
        {photo && (
          <div className="relative aspect-[4/5] w-full shrink-0 overflow-hidden md:aspect-auto md:w-[46%]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo}
              alt="Portrait of Chris William Kurniawan"
              className="anim-settle absolute inset-0 h-full w-full object-cover object-[50%_22%] md:object-[50%_30%]"
              style={delay(200)}
            />
          </div>
        )}

        <div className="flex min-h-[420px] flex-1 flex-col justify-between p-6 text-paper md:min-h-0 md:p-10">
            <div className="flex items-start justify-between">
              <span className="anim-fade-up font-mono text-[11px] uppercase tracking-widest text-paper/50" style={delay(900)}>
                (Profile)
              </span>
              <span className="anim-fade-up font-mono text-[11px] uppercase tracking-widest text-paper/50" style={delay(960)}>
                B28
              </span>
            </div>

            <p
              aria-hidden
              className="anim-fade-up display hidden select-none text-[clamp(5rem,14vw,11rem)] font-medium text-paper/[0.07] sm:block"
              style={delay(1000)}
            >
              CS
            </p>

            <dl className={`grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8 ${photo ? 'md:grid-cols-1 md:gap-y-5' : ''}`}>
              {facts.map((f, i) => (
                <div key={f.label} className="anim-fade-up border-t border-line-dark pt-3" style={delay(1050 + i * 80)}>
                  <dt className="font-mono text-[10px] uppercase tracking-widest text-paper/50">{f.label}</dt>
                  <dd className="mt-1 text-lg">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
      </div>
    </section>
  );
}
