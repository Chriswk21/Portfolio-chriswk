'use client';

import { useState, type FormEvent } from 'react';
import { profile } from '@/lib/data';

const reasons = ['Internship', 'Freelance project', 'Full-time role', 'Just saying hi'];

/**
 * No backend: the form composes a pre-filled email in the visitor's mail app.
 * Nothing is sent or stored by this site.
 */
export function Contact() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (k: string) => String(data.get(k) ?? '').trim();

    const subject = `${get('reason')} — ${get('name')}`;
    const body = `${get('message')}\n\n— ${get('name')}\n${get('email')}`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  const field =
    'w-full border-0 border-b border-paper/25 bg-transparent py-2 text-[15px] text-paper placeholder:text-paper/35 transition-[border-color] duration-150 focus:border-paper focus:outline-none';
  const label = 'block font-mono text-[10px] uppercase tracking-widest text-paper/50';

  return (
    <section id="contact" className="mx-auto max-w-[1200px] px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[620px] bg-ink p-6 text-paper sm:p-10">
        <p className="font-mono text-[10px] uppercase tracking-widest text-paper/50">(Leave your details)</p>
        <h2 className="display mt-3 text-[clamp(2.25rem,6vw,3.5rem)] font-medium uppercase">Let&apos;s build it</h2>
        <p className="mt-4 text-[13px] text-paper/60">
          Or just write:{' '}
          <a href={`mailto:${profile.email}`} className="border-b border-paper/40 pb-0.5 text-paper transition-[border-color] duration-150 hover:border-paper">
            {profile.email}
          </a>
        </p>

        <form onSubmit={onSubmit} className="mt-10 grid grid-cols-1 gap-x-8 gap-y-7 sm:grid-cols-2">
          <div>
            <label htmlFor="c-name" className={label}>Name</label>
            <input id="c-name" name="name" required autoComplete="name" placeholder="Your full name" className={field} />
          </div>
          <div>
            <label htmlFor="c-email" className={label}>Email</label>
            <input id="c-email" name="email" type="email" required autoComplete="email" placeholder="name@company.com" className={field} />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="c-reason" className={label}>Reason</label>
            <select id="c-reason" name="reason" defaultValue={reasons[0]} className={`${field} cursor-pointer`}>
              {reasons.map((r) => (
                <option key={r} value={r} className="bg-ink">
                  {r}
                </option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="c-message" className={label}>Message</label>
            <textarea id="c-message" name="message" required rows={3} placeholder="A few words" className={`${field} resize-none`} />
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 sm:col-span-2">
            <button
              type="submit"
              className="group inline-flex items-center gap-2 bg-paper px-4 py-2.5 text-[13px] text-ink transition-[background-color,color,transform] duration-150 hover:bg-accent hover:text-paper motion-safe:active:scale-[0.97]"
            >
              Send details
              <span aria-hidden className="transition-transform duration-200 ease-[var(--ease-out)] motion-safe:[@media(hover:hover)]:group-hover:translate-x-0.5">
                →
              </span>
            </button>
            <p className="text-[11px] text-paper/50" aria-live="polite">
              {sent ? 'Your mail app should be open now.' : 'Opens your mail app. Nothing is stored here.'}
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
