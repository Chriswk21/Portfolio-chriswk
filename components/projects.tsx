'use client';

import { useState } from 'react';
import Image from 'next/image';
import { projects } from '@/lib/data';

/**
 * Selected Projects — an index list. Hovering (or focusing / tapping) a row
 * makes it active: the title turns accent red, the details panel opens, and
 * the screenshot wipes in with clip-path while settling from a slight zoom.
 *
 * Everything is CSS transitions so moving quickly across rows retargets
 * smoothly instead of restarting (interruptible). Reduced motion keeps the
 * colour + opacity changes and drops the wipe/zoom/height movement.
 */
export function Projects() {
  const [active, setActive] = useState(0);

  return (
    <section id="work" className="mx-auto max-w-[1200px] px-6 pb-28 md:px-10 md:pb-40">
      <h2 className="display pb-6 text-[clamp(2.5rem,6vw,4.5rem)] font-medium">Selected Projects</h2>

      <ul className="border-b border-line">
        {projects.map((p, i) => {
          const isActive = active === i;
          const panelId = `project-panel-${i}`;

          return (
            <li
              key={p.title}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              className="border-t border-line"
            >
              <div className="grid grid-cols-12 gap-x-6 py-5 md:py-6">
                {/* Title + details */}
                <div className="col-span-12 md:col-span-7">
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isActive}
                      aria-controls={panelId}
                      onClick={() => setActive(i)}
                      className={`display text-left text-[clamp(2rem,4.6vw,3.4rem)] font-medium transition-[color] duration-200 ease-[var(--ease-out)] ${
                        isActive ? 'text-accent' : 'text-ink/35 hover:text-ink/60'
                      }`}
                    >
                      {p.title}
                    </button>
                  </h3>

                  <Collapse open={isActive} id={panelId}>
                    <p className="mt-4 max-w-md text-[14px] leading-relaxed text-ink/70">{p.summary}</p>
                    <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
                      {[
                        ['Type', p.type],
                        ['Stack', p.stack],
                        ['Year', p.year],
                        ['Platform', p.platform],
                      ].map(([k, v]) => (
                        <div key={k}>
                          <dt className="font-mono text-[9px] uppercase tracking-widest text-mute">{k}</dt>
                          <dd className="mt-1 text-[12px] leading-snug">{v}</dd>
                        </div>
                      ))}
                    </dl>

                    {/* Mobile: image sits inside the panel */}
                    <div className="mt-6 md:hidden">
                      <Shot project={p} open={isActive} sizes="100vw" />
                    </div>
                  </Collapse>
                </div>

                {/* Link (hidden when the project has no public repo) */}
                <div className="col-span-12 mt-4 md:col-span-2 md:mt-2">
                  {p.href && (
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group inline-flex items-center gap-2 whitespace-nowrap border px-3 py-2 text-[12px] transition-[color,border-color,background-color,transform] duration-200 motion-safe:active:scale-[0.97] ${
                      isActive
                        ? 'border-ink text-ink hover:bg-ink hover:text-paper'
                        : 'border-line text-ink/40'
                    }`}
                  >
                    View Project
                    <span aria-hidden className="transition-transform duration-200 ease-[var(--ease-out)] motion-safe:[@media(hover:hover)]:group-hover:translate-x-0.5">
                      →
                    </span>
                    <span className="sr-only">{p.title} on GitHub (opens in new tab)</span>
                  </a>
                  )}
                </div>

                {/* Desktop: image column */}
                <div className="hidden md:col-span-3 md:block">
                  <Collapse open={isActive}>
                    <Shot project={p} open={isActive} sizes="(min-width: 1200px) 280px, 25vw" />
                  </Collapse>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/** Height reveal via grid-rows 0fr → 1fr (the accordion exception for height). */
function Collapse({ open, id, children }: { open: boolean; id?: string; children: React.ReactNode }) {
  return (
    <div
      id={id}
      inert={!open}
      className={`grid transition-[grid-template-rows,opacity] duration-[400ms] ease-[var(--ease-out)] motion-reduce:transition-[opacity] motion-reduce:duration-200 ${
        open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
      }`}
    >
      <div className="min-h-0 overflow-hidden">{children}</div>
    </div>
  );
}

/** Screenshot: clip-path wipe from the top + settle from 1.08 scale. */
function Shot({ project, open, sizes }: { project: (typeof projects)[number]; open: boolean; sizes: string }) {
  return (
    <div
      className={`relative aspect-[4/3] w-full overflow-hidden bg-line transition-[clip-path] duration-[550ms] ease-[var(--ease-in-out)] motion-reduce:transition-none ${
        open ? '[clip-path:inset(0_0_0_0)]' : '[clip-path:inset(0_0_100%_0)]'
      }`}
    >
      {project.image ? (
        <Image
          src={project.image}
          alt={`${project.title} screenshot`}
          fill
          sizes={sizes}
          className={`object-cover object-top transition-transform duration-[900ms] ease-[var(--ease-out)] motion-reduce:transition-none ${
            open ? 'scale-100' : 'scale-[1.08]'
          }`}
        />
      ) : (
        // No screenshot yet: a plain type card in the same frame.
        <div className="flex h-full flex-col justify-between bg-ink p-4 text-paper">
          <span className="font-mono text-[9px] uppercase tracking-widest text-paper/50">{project.type}</span>
          <span className="text-2xl font-medium tracking-[-0.02em]">{project.title}</span>
        </div>
      )}
    </div>
  );
}
