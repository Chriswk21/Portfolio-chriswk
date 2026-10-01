'use client';

import { useState } from 'react';
import { tools } from '@/lib/data';

function Row({ hidden }: { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {tools.map((t) => (
        <li key={t} className="flex items-center whitespace-nowrap text-[clamp(1.5rem,3.2vw,2.5rem)] font-medium tracking-[-0.02em]">
          <span className="px-6 md:px-10">{t}</span>
          <span aria-hidden className="h-1.5 w-1.5 bg-accent" />
        </li>
      ))}
    </ul>
  );
}

/**
 * Slow tool marquee. Auto-moving for >5s, so it ships with a visible pause
 * control (WCAG 2.2.2) and pauses on hover. Reduced motion: static, wrapped
 * list, duplicate track hidden.
 */
export function Marquee() {
  const [paused, setPaused] = useState(false);

  return (
    <section aria-label="Tools I work with" className="border-y border-line py-8">
      <div className="mx-auto mb-6 flex max-w-[1200px] items-center justify-between px-6 md:px-10">
        <span className="font-mono text-[10px] uppercase tracking-widest text-mute">(Tools I work with)</span>
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-pressed={paused}
          className="font-mono text-[10px] uppercase tracking-widest text-mute transition-[color] duration-150 hover:text-ink motion-reduce:hidden"
        >
          {paused ? 'Play' : 'Pause'}
        </button>
      </div>
      <div className="marquee overflow-hidden" data-paused={paused}>
        <div className="marquee-track">
          <Row />
          <Row hidden />
        </div>
      </div>
    </section>
  );
}
