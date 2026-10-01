'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { intro } from '@/lib/data';
import { InView } from './motion';

/**
 * Scroll-linked reading cue: words darken from grey to ink as the paragraph
 * passes through the viewport. Opacity only (Tier 3 — no movement), so it is
 * kept as-is under reduced motion.
 */
function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
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
      <InView className="mb-10 flex items-center gap-4">
        <span className="rv font-mono text-[10px] uppercase tracking-widest text-mute">(About)</span>
        <span aria-hidden className="rv-line h-px flex-1 bg-line" style={{ '--d': '150ms' } as React.CSSProperties} />
      </InView>

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
    </section>
  );
}
