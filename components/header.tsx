'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion';
import { profile } from '@/lib/data';
import { Roll } from './motion';

const links = [
  { label: 'Work', id: 'work' },
  { label: 'Skillset', id: 'skillset' },
  { label: 'Background', id: 'background' },
  { label: 'Contact', id: 'contact' },
];

/**
 * Sticky header that steps out of the way while reading down and comes back
 * on scroll up (state indication: you can always get it back). A 2px accent
 * bar tracks page progress; a dot marks the section in view.
 */
export function Header() {
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 12);
    setHidden((h) => (y > 240 && y > prev + 4 ? true : y < prev - 4 ? false : h));
  });

  useEffect(() => {
    const els = links.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 bg-paper transition-[transform,border-color] duration-300 ease-[var(--ease-out)] motion-reduce:transition-[border-color] ${
        hidden ? '-translate-y-full motion-reduce:translate-y-0' : 'translate-y-0'
      } border-b ${scrolled ? 'border-line' : 'border-transparent'}`}
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-5 md:px-10">
        <a href="#top" className="group text-[13px] font-semibold tracking-tight">
          <Roll>{profile.shortName}</Roll>
          <sup className="ml-0.5 text-[9px]">®</sup>
        </a>

        <nav aria-label="Primary" className="flex items-center gap-4 text-[13px] md:gap-8">
          {links.map((l) => {
            const isActive = active === l.id;
            return (
              <a
                key={l.id}
                href={`#${l.id}`}
                aria-current={isActive ? 'true' : undefined}
                className={`group relative hidden items-center gap-1.5 transition-[color] duration-150 sm:inline-flex ${
                  isActive ? 'text-ink' : 'text-ink/55 hover:text-ink'
                }`}
              >
                <span
                  aria-hidden
                  className={`h-1.5 w-1.5 bg-accent transition-[transform,opacity] duration-300 ease-[var(--ease-out)] ${
                    isActive ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                  }`}
                />
                <Roll>{l.label}</Roll>
              </a>
            );
          })}
          <a
            href={profile.cvPath}
            download
            className="group inline-flex items-center gap-1.5 border border-ink px-3 py-1.5 transition-[background-color,color,transform] duration-150 hover:bg-ink hover:text-paper motion-safe:active:scale-[0.97]"
          >
            <Roll>Download CV</Roll>
            <span aria-hidden>↓</span>
          </a>
        </nav>
      </div>

      <motion.div
        aria-hidden
        className="absolute inset-x-0 bottom-[-1px] h-[2px] origin-left bg-accent"
        style={{ scaleX: progress }}
      />
    </header>
  );
}
