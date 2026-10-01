'use client';

import { useRef, type CSSProperties, type ElementType, type ReactNode } from 'react';
import { useInView } from 'framer-motion';
import { d } from '@/lib/stagger';

/**
 * Adds `.is-in` to its wrapper the first time it scrolls into view.
 * Descendants with .rv / .rv-mask / .rv-line / .rv-wipe animate from that
 * (see globals.css). Motion lives in CSS; this only flips a class.
 */
export function InView({
  as: Tag = 'div',
  className = '',
  margin = '0px 0px -12% 0px',
  children,
  ...rest
}: {
  as?: ElementType;
  className?: string;
  margin?: string;
  children: ReactNode;
  id?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: margin as `${number}px` });
  return (
    <Tag ref={ref} className={`${className} ${inView ? 'is-in' : ''}`} {...rest}>
      {children}
    </Tag>
  );
}


/**
 * Heading whose words rise out of a mask one after another.
 * Screen readers get the plain text once.
 */
export function MaskText({ text, step = 60, base = 0 }: { text: string; step?: number; base?: number }) {
  const words = text.split(' ');
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {words.map((w, i) => (
          <span key={i}>
            <span className="rv-mask">
              <span style={d(i, step, base)}>{w}</span>
            </span>
            {i < words.length - 1 ? ' ' : ''}
          </span>
        ))}
      </span>
    </>
  );
}

/** Button/link label that rolls up on hover (parent needs `group`). */
export function Roll({ children }: { children: string }) {
  return (
    <span className="roll">
      <span>{children}</span>
      <span aria-hidden>{children}</span>
    </span>
  );
}
