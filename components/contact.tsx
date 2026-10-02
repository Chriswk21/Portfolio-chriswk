'use client';

import { useRef, useState, type FormEvent } from 'react';
import { profile } from '@/lib/data';
import { Donut } from './donut';
import { InView, MaskText, Roll } from './motion';
import { d } from '@/lib/stagger';

const reasons = ['Internship', 'Freelance project', 'Full-time role', 'Just saying hi'];

/**
 * No backend: the form composes a pre-filled email in the visitor's mail app.
 * Nothing is sent or stored by this site.
 *
 * Motion: the card wipes up into place, the heading rises from a mask, the
 * fields fade up in sequence, and each field's underline grows on focus.
 */
export function Contact() {
  const [sent, setSent] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (k: string) => String(data.get(k) ?? '').trim();

    const subject = `${get('reason')} — ${get('name')}`;
    const body = `${get('message')}\n\n— ${get('name')}\n${get('email')}`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  const input =
    'w-full border-0 bg-transparent py-2 text-[15px] text-paper placeholder:text-paper/35 focus:outline-none';
  const label = 'block font-mono text-[10px] uppercase tracking-widest text-paper/50';

  const field = ({ children, i, wide }: { children: React.ReactNode; i: number; wide?: boolean }) => (
    <div className={`field rv relative ${wide ? 'sm:col-span-2' : ''}`} style={d(i, 70, 500)}>
      {children}
      <span aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-paper/25" />
      <span aria-hidden className="field-line absolute inset-x-0 -bottom-px h-0.5 bg-accent" />
    </div>
  );

  return (
    <section ref={sectionRef} id="contact" className="scroll-mt-20 px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-6 md:grid-cols-12 md:gap-8">
      {/* Donut gets its own square so the whole ring is always visible */}
      <div className="relative hidden aspect-square w-full md:order-2 md:col-span-6 md:block lg:-mr-10 lg:w-[calc(100%+2.5rem)]">
        <Donut hoverTarget={sectionRef} />
      </div>
      <InView className="relative w-full md:col-span-6" margin="0px 0px -15% 0px">
        <div className="rv-wipe relative overflow-hidden bg-ink p-6 text-paper sm:p-10">
          {/* Mobile: the donut lives inside the card, faint, behind the form */}
          <div className="md:hidden">
            <Donut hoverTarget={sectionRef} tone="paper" />
          </div>
          <div className="relative">
          <p className="rv font-mono text-[10px] uppercase tracking-widest text-paper/50" style={d(0, 0, 350)}>
            (Leave your details)
          </p>
          <h2 className="display mt-3 text-[clamp(2.25rem,6vw,3.5rem)] font-medium uppercase">
            <MaskText text="Let's build it" base={400} />
          </h2>
          <p className="rv mt-4 text-[13px] text-paper/60" style={d(0, 0, 480)}>
            Or just write:{' '}
            <a href={`mailto:${profile.email}`} className="ulink text-paper">
              {profile.email}
            </a>
          </p>

          <form onSubmit={onSubmit} className="mt-10 grid grid-cols-1 gap-x-8 gap-y-7 sm:grid-cols-2">
            {field({
              i: 0,
              children: (
                <>
                  <label htmlFor="c-name" className={label}>Name</label>
                  <input id="c-name" name="name" required autoComplete="name" placeholder="Your full name" className={input} />
                </>
              ),
            })}
            {field({
              i: 1,
              children: (
                <>
                  <label htmlFor="c-email" className={label}>Email</label>
                  <input id="c-email" name="email" type="email" required autoComplete="email" placeholder="name@company.com" className={input} />
                </>
              ),
            })}
            {field({
              i: 2,
              wide: true,
              children: (
                <>
                  <label htmlFor="c-reason" className={label}>Reason</label>
                  <select id="c-reason" name="reason" defaultValue={reasons[0]} className={`${input} cursor-pointer`}>
                    {reasons.map((r) => (
                      <option key={r} value={r} className="bg-ink">
                        {r}
                      </option>
                    ))}
                  </select>
                </>
              ),
            })}
            {field({
              i: 3,
              wide: true,
              children: (
                <>
                  <label htmlFor="c-message" className={label}>Message</label>
                  <textarea id="c-message" name="message" required rows={3} placeholder="A few words" className={`${input} resize-none`} />
                </>
              ),
            })}

            <div className="rv flex flex-wrap items-center gap-x-6 gap-y-3 sm:col-span-2" style={d(4, 70, 500)}>
              <button
                type="submit"
                className="group inline-flex items-center gap-2 bg-paper px-4 py-2.5 text-[13px] text-ink transition-[background-color,color,transform] duration-200 hover:bg-accent hover:text-paper motion-safe:active:scale-[0.97]"
              >
                <Roll>Send details</Roll>
                <span
                  aria-hidden
                  className="transition-transform duration-300 ease-[var(--ease-out)] motion-safe:[@media(hover:hover)]:group-hover:translate-x-1"
                >
                  →
                </span>
              </button>
              <p className="text-[11px] text-paper/50" aria-live="polite">
                {sent ? 'Your mail app should be open now.' : 'Opens your mail app. Nothing is stored here.'}
              </p>
            </div>
          </form>
          </div>
        </div>
      </InView>
      </div>
    </section>
  );
}
