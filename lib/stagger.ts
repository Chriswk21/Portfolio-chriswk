import type { CSSProperties } from 'react';

/** Stagger helper: style={d(i)} sets the --d delay used by the reveal classes. Safe on server and client. */
export const d = (i: number, step = 70, base = 0) => ({ '--d': `${base + i * step}ms` }) as CSSProperties;
