'use client';

import { education, experience, volunteering } from '@/lib/data';
import { InView, MaskText } from './motion';
import { d } from '@/lib/stagger';

type Entry = { role: string; org: string; kind: string; period: string; note: string };

/**
 * Background — experience, volunteering, education. Each block reveals as it
 * scrolls in: label fades, divider draws, rows rise in sequence.
 */
export function Background() {
  return (
    <section id="background" className="mx-auto max-w-[1200px] scroll-mt-20 px-6 py-28 md:px-10 md:py-40">
      <InView className="pb-14">
        <h2 className="display text-[clamp(2.5rem,6vw,4.5rem)] font-medium">
          <MaskText text="Background" />
        </h2>
      </InView>

      <Timeline label="Experience" items={experience} />
      <Timeline label="Volunteering" items={volunteering} className="mt-16" />
      <Timeline label="Education" items={education} className="mt-16" />
    </section>
  );
}

function Timeline({ label, items, className = '' }: { label: string; items: Entry[]; className?: string }) {
  return (
    <InView className={`relative ${className}`}>
      <span aria-hidden className="rv-line absolute inset-x-0 top-0 h-px bg-ink/40" />
      <h3 className="rv py-4 font-mono text-[10px] uppercase tracking-widest text-mute" style={d(0, 0, 100)}>
        ({label})
      </h3>
      <ul>
        {items.map((e, i) => (
          <li key={e.role} className="group relative">
            <span aria-hidden className="rv-line absolute inset-x-0 top-0 h-px bg-line" style={d(i, 90, 150)} />
            <div className="rv grid grid-cols-1 gap-2 py-6 md:grid-cols-12 md:gap-8" style={d(i, 90, 200)}>
              <div className="font-mono text-[11px] text-mute transition-[color] duration-200 group-hover:text-accent md:col-span-3">
                {e.period}
              </div>
              <div className="md:col-span-5">
                <div className="text-lg font-medium leading-tight">{e.role}</div>
                <div className="mt-1 text-[13px] text-ink/60">
                  {e.org} · {e.kind}
                </div>
              </div>
              <p className="text-[13px] leading-relaxed text-ink/70 md:col-span-4">{e.note}</p>
            </div>
          </li>
        ))}
      </ul>
    </InView>
  );
}
