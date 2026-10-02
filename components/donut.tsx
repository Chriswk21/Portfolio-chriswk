'use client';

import { useEffect, useRef } from 'react';

/**
 * Spinning ASCII torus (after Andy Sloane's donut.c), drawn to a canvas
 * behind the contact card. Decorative only.
 *
 * - Idle: slow spin in faint ink.
 * - Hover (fine pointers): spin eases up, the torus tilts toward the cursor,
 *   characters darken and the brightest ones turn accent red. All values are
 *   eased per frame, so entering/leaving never jumps.
 * - Only animates while on screen and while the tab is visible.
 * - Reduced motion: one static frame, no loop.
 */
const CHARS = '.,-~:;=!*#$@';
const ACCENT = '212,42,42';

// ink: on the paper background. paper: faint, inside the dark card (mobile),
// kept low so the form on top stays readable.
const TONES = {
  ink: { rgb: '15,15,14', base: 0.08, baseHover: 0.12, lum: 0.16, lumHover: 0.1, accent: 0.6 },
  paper: { rgb: '239,237,233', base: 0.04, baseHover: 0.05, lum: 0.1, lumHover: 0.06, accent: 0.35 },
} as const;

export function Donut({
  hoverTarget,
  tone = 'ink',
}: {
  hoverTarget: React.RefObject<HTMLElement | null>;
  tone?: keyof typeof TONES;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = hoverTarget.current;
    if (!canvas || !host) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    let w = 0;
    let h = 0;
    let raf = 0;
    let running = false;
    let last = 0;

    // Animated state (eased toward targets each frame)
    let A = 1.0;
    let B = 0.6;
    let hover = 0;
    let hoverGoal = 0;
    let tiltX = 0;
    let tiltY = 0;
    let tiltGoalX = 0;
    let tiltGoalY = 0;
    let fade = 0; // fades the donut in the first time it is drawn

    // Cell size in CSS px; set on resize so the ring keeps ~60 columns of detail.
    let cw = 7;
    let ch = 11;

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas!.width = Math.round(w * dpr);
      canvas!.height = Math.round(h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      cw = Math.max(5, Math.round((Math.min(w, h) * 0.72) / 62));
      ch = Math.round(cw * 1.6);
      ctx!.font = `600 ${ch - 1}px ui-monospace, SFMono-Regular, Menlo, monospace`;
      ctx!.textBaseline = 'top';
    }

    function draw() {
      const cols = Math.ceil(w / cw);
      const rows = Math.ceil(h / ch);
      const n = cols * rows;
      const zbuf = new Float32Array(n);
      const lum = new Int8Array(n).fill(-1);

      const a = A + tiltY;
      const b = B + tiltX;
      const cA = Math.cos(a), sA = Math.sin(a);
      const cB = Math.cos(b), sB = Math.sin(b);

      const R1 = 1, R2 = 2, K2 = 5;
      // Big enough that the ring frames the card, small enough to read as a donut.
      // 0.75 of the box (as in donut.c) leaves room for perspective: the near
      // side of the ring projects larger than its radius when it tilts toward you.
      const size = Math.min(w, h) * (w >= 500 ? 0.76 : 0.72);
      const K1 = (size / 2) * K2 / (R1 + R2);
      const cx = w / 2;
      const cy = h / 2;

      for (let theta = 0; theta < 6.283; theta += 0.05) {
        const ct = Math.cos(theta), st = Math.sin(theta);
        for (let phi = 0; phi < 6.283; phi += 0.015) {
          const cp = Math.cos(phi), sp = Math.sin(phi);
          const circX = R2 + R1 * ct;
          const circY = R1 * st;

          const x = circX * (cB * cp + sA * sB * sp) - circY * cA * sB;
          const y = circX * (sB * cp - sA * cB * sp) + circY * cA * cB;
          const z = K2 + cA * circX * sp + circY * sA;
          const ooz = 1 / z;

          const col = Math.floor((cx + K1 * ooz * x) / cw);
          const row = Math.floor((cy - K1 * ooz * y) / ch);
          if (col < 0 || col >= cols || row < 0 || row >= rows) continue;

          const L = cp * ct * sB - cA * ct * sp - sA * st + cB * (cA * st - ct * sA * sp);
          const i = row * cols + col;
          if (L > 0 && ooz > zbuf[i]) {
            zbuf[i] = ooz;
            lum[i] = Math.min(11, Math.floor(L * 8));
          }
        }
      }

      ctx!.clearRect(0, 0, w, h);
      const T = TONES[tone];
      const base = (T.base + T.baseHover * hover) * fade;
      for (let i = 0; i < n; i++) {
        const l = lum[i];
        if (l < 0) continue;
        const bright = l >= 10;
        ctx!.fillStyle = bright && hover > 0.02
          ? `rgba(${ACCENT},${(0.15 + T.accent * hover) * fade})`
          : `rgba(${T.rgb},${base + (l / 11) * (T.lum + T.lumHover * hover) * fade})`;
        ctx!.fillText(CHARS[l], (i % cols) * cw, Math.floor(i / cols) * ch);
      }
    }

    function frame(t: number) {
      const dt = Math.min(0.05, (t - (last || t)) / 1000);
      last = t;

      // Ease toward targets (frame-rate independent)
      const k = 1 - Math.exp(-dt * 4);
      hover += (hoverGoal - hover) * k;
      tiltX += (tiltGoalX - tiltX) * k;
      tiltY += (tiltGoalY - tiltY) * k;
      fade += (1 - fade) * (1 - Math.exp(-dt * 2.5));

      const speed = 0.35 + 1.4 * hover;
      A += dt * speed * 0.8;
      B += dt * speed * 0.4;

      draw();
      if (running) raf = requestAnimationFrame(frame);
    }

    function start() {
      if (running || reduce) return;
      running = true;
      last = 0;
      raf = requestAnimationFrame(frame);
    }
    function stop() {
      running = false;
      cancelAnimationFrame(raf);
    }

    resize();
    if (reduce) {
      fade = 1;
      draw();
    }

    const ro = new ResizeObserver(() => {
      resize();
      if (!running) draw();
    });
    ro.observe(canvas);

    let onScreen = false;
    const io = new IntersectionObserver(([e]) => {
      onScreen = e.isIntersecting;
      if (onScreen && !document.hidden) start();
      else stop();
    });
    io.observe(canvas);

    const onVisibility = () => (document.hidden || !onScreen ? stop() : start());
    document.addEventListener('visibilitychange', onVisibility);

    const onEnter = () => (hoverGoal = 1);
    const onLeave = () => {
      hoverGoal = 0;
      tiltGoalX = 0;
      tiltGoalY = 0;
    };
    const onMove = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      tiltGoalX = ((e.clientX - r.left) / r.width - 0.5) * 0.5;
      tiltGoalY = ((e.clientY - r.top) / r.height - 0.5) * 0.5;
    };
    // Touch: a tap gives the same spin-up briefly, then it settles back.
    let tapTimer = 0;
    const onTap = () => {
      hoverGoal = 1;
      window.clearTimeout(tapTimer);
      tapTimer = window.setTimeout(() => (hoverGoal = 0), 1400);
    };

    if (canHover && !reduce) {
      host.addEventListener('pointerenter', onEnter);
      host.addEventListener('pointerleave', onLeave);
      host.addEventListener('pointermove', onMove);
    } else if (!reduce) {
      host.addEventListener('pointerdown', onTap, { passive: true });
    }

    return () => {
      stop();
      window.clearTimeout(tapTimer);
      host.removeEventListener('pointerdown', onTap);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      host.removeEventListener('pointerenter', onEnter);
      host.removeEventListener('pointerleave', onLeave);
      host.removeEventListener('pointermove', onMove);
    };
  }, [hoverTarget, tone]);

  return <canvas ref={canvasRef} aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" />;
}
