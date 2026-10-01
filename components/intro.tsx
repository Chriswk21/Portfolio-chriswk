'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { education, experience, intro, volunteering } from '@/lib/data';

/**
 * Scroll-linked reading cue: words darken from grey to ink as the paragraph
 * passes through the viewport. Opacity only (Tier 3 — no movement), so it is
 * kept as-is under reduced motion.
 */
function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <motion.span style={{ opacity }} className="inline">
      {children}{' '}
    </motion.span>
  );
}

export function Intro() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] });
  const words = intro.split(' ');

  return (
    <section className="mx-auto max-w-[1200px] px-6 py-24 md:px-10 md:py-36">
      <p
        ref={ref}
        className="max-w-[22ch] text-[clamp(1.5rem,3.4vw,2.6rem)] font-medium leading-[1.15] tracking-[-0.02em] sm:max-w-[28ch]"
      >
        <span className="sr-only">{intro}</span>
        <span aria-hidden>
          {words.map((w, i) => (
            <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
              {w}
            </Word>
          ))}
        </span>
      </p>

      <Timeline id="experience" label="Experience" items={experience} className="mt-24" />
      <Timeline id="volunteering" label="Volunteering" items={volunteering} className="mt-16" />
      <Timeline id="education" label="Education" items={education} className="mt-16" />
    </section>
  );
}

type Entry = { role: string; org: string; kind: string; period: string; note: string };

function Timeline({ id, label, items, className = '' }: { id: string; label: string; items: Entry[]; className?: string }) {
  return (
    <div id={id} className={`border-t border-line ${className}`}>
      <h2 className="py-4 font-mono text-[10px] uppercase tracking-widest text-mute">({label})</h2>
      <ul>
        {items.map((e) => (
          <li key={e.role} className="grid grid-cols-1 gap-2 border-t border-line py-6 md:grid-cols-12 md:gap-8">
            <div className="font-mono text-[11px] text-mute md:col-span-3">{e.period}</div>
            <div className="md:col-span-5">
              <div className="text-lg font-medium leading-tight">{e.role}</div>
              <div className="mt-1 text-[13px] text-ink/60">
                {e.org} · {e.kind}
              </div>
            </div>
            <p className="text-[13px] leading-relaxed text-ink/70 md:col-span-4">{e.note}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
