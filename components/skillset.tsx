'use client';

import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { skills } from '@/lib/data';

/**
 * Skillset — each row slides in right-to-left as it enters the viewport,
 * with its divider drawing in from the right. IntersectionObserver only
 * toggles a class; the motion itself is CSS transitions (globals.css), so
 * reduced motion swaps it for a plain 200ms fade.
 */
function Row({ index, title, desc, tools }: { index: number; title: string; desc: string; tools: string }) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -12% 0px' });

  return (
    <li
      ref={ref}
      className={`slide-in relative ${inView ? 'is-in' : ''}`}
      style={{ transitionDelay: `${(index % 2) * 70}ms` }}
    >
      <span aria-hidden className="rule absolute inset-x-0 top-0 h-px bg-paper/25" />
      <div className="grid grid-cols-12 gap-x-6 gap-y-3 py-8 md:py-10">
        <span className="col-span-2 pt-2 font-mono text-[11px] text-paper/40 md:col-span-1">
          {String(index + 1).padStart(2, '0')}
        </span>
        <h3 className="col-span-10 text-[clamp(1.5rem,3vw,2.25rem)] font-medium leading-tight tracking-[-0.02em] md:col-span-6">
          {title}
        </h3>
        <div className="col-span-10 col-start-3 md:col-span-5 md:col-start-auto md:pt-2">
          <p className="text-[13px] leading-relaxed text-paper/70">{desc}</p>
          <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-paper/40">{tools}</p>
        </div>
      </div>
    </li>
  );
}

export function Skillset() {
  return (
    <section id="skillset" className="overflow-hidden bg-ink text-paper">
      <div className="mx-auto max-w-[1200px] px-6 py-28 md:px-10 md:py-40">
        <h2 className="display pb-10 text-[clamp(2.5rem,6vw,4.5rem)] font-medium">Skillset</h2>
        <ul className="border-b border-paper/25">
          {skills.map((s, i) => (
            <Row key={s.title} index={i} {...s} />
          ))}
        </ul>
      </div>
    </section>
  );
}
