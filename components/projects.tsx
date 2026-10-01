'use client';

import { useState } from 'react';
import Image from 'next/image';
import { projects } from '@/lib/data';
import { InView, MaskText, Roll } from './motion';
import { d } from '@/lib/stagger';

/**
 * Selected Projects — an index list.
 * - On scroll in: heading words rise from a mask, rows fade up in sequence
 *   and their dividers draw left-to-right.
 * - Hover / focus / tap a row: title turns accent and nudges right, the
 *   details open, and the screenshot wipes down while settling from a zoom.
 * Hover motion is CSS transitions, so sweeping across rows retargets instead
 * of restarting. Reduced motion keeps colour + opacity only.
 */
export function Projects() {
  const [active, setActive] = useState(0);
  const total = String(projects.length).padStart(2, '0');

  return (
    <section id="work" className="mx-auto max-w-[1200px] scroll-mt-20 px-6 py-28 md:px-10 md:py-40">
      <InView className="flex items-end justify-between gap-6 pb-8">
        <h2 className="display text-[clamp(2.5rem,6vw,4.5rem)] font-medium">
          <MaskText text="Selected Projects" />
        </h2>
        <span className="rv mb-2 font-mono text-[11px] text-mute" style={d(2, 0, 200)}>
          ({total})
        </span>
      </InView>

      <InView as="ul" margin="0px 0px -8% 0px" className="relative">
        {projects.map((p, i) => {
          const isActive = active === i;
          const panelId = `project-panel-${i}`;

          return (
            <li
              key={p.title}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              className="rv relative"
              style={d(i, 80, 100)}
            >
              <span aria-hidden className="rv-line absolute inset-x-0 top-0 h-px bg-line" style={d(i, 80, 100)} />
              <div className="grid grid-cols-12 gap-x-6 py-5 md:py-6">
                {/* Title + details */}
                <div className="col-span-12 md:col-span-7">
                  <h3 className="flex items-start gap-4">
                    <span
                      className={`mt-2 w-7 shrink-0 font-mono text-[11px] transition-[color] duration-200 ${
                        isActive ? 'text-accent' : 'text-mute'
                      }`}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <button
                      type="button"
                      aria-expanded={isActive}
                      aria-controls={panelId}
                      onClick={() => setActive(i)}
                      className={`display text-left text-[clamp(2rem,4.6vw,3.4rem)] font-medium transition-[color,transform] duration-300 ease-[var(--ease-out)] motion-reduce:transition-[color] ${
                        isActive ? 'text-accent motion-safe:translate-x-2' : 'text-ink/30 hover:text-ink/60'
                      }`}
                    >
                      {p.title}
                    </button>
                  </h3>

                  <Collapse open={isActive} id={panelId}>
                    <div className="pl-11">
                      <p className="mt-4 max-w-md text-[14px] leading-relaxed text-ink/70">{p.summary}</p>
                      <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
                        {[
                          ['Type', p.type],
                          ['Stack', p.stack],
                          ['Year', p.year],
                          ['Platform', p.platform],
                        ].map(([k, v], j) => (
                          <div
                            key={k}
                            className={`transition-[opacity,transform] duration-300 ease-[var(--ease-out)] motion-reduce:transform-none ${
                              isActive ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
                            }`}
                            style={{ transitionDelay: isActive ? `${120 + j * 40}ms` : '0ms' }}
                          >
                            <dt className="font-mono text-[9px] uppercase tracking-widest text-mute">{k}</dt>
                            <dd className="mt-1 text-[12px] leading-snug">{v}</dd>
                          </div>
                        ))}
                      </dl>

                      {/* Mobile: image sits inside the panel */}
                      <div className="mt-6 md:hidden">
                        <Shot project={p} open={isActive} sizes="100vw" />
                      </div>
                    </div>
                  </Collapse>
                </div>

                {/* Link (hidden when the project has no public repo) */}
                <div className="col-span-12 mt-4 pl-11 md:col-span-2 md:mt-2 md:pl-0">
                  {p.href && (
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group inline-flex items-center gap-2 whitespace-nowrap border px-3 py-2 text-[12px] transition-[color,border-color,background-color,transform] duration-200 motion-safe:active:scale-[0.97] ${
                        isActive ? 'border-ink text-ink hover:bg-ink hover:text-paper' : 'border-line text-ink/40'
                      }`}
                    >
                      <Roll>View Project</Roll>
                      <span
                        aria-hidden
                        className="transition-transform duration-300 ease-[var(--ease-out)] motion-safe:[@media(hover:hover)]:group-hover:-translate-y-0.5 motion-safe:[@media(hover:hover)]:group-hover:translate-x-0.5"
                      >
                        ↗
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
        <span aria-hidden className="rv-line absolute inset-x-0 bottom-0 h-px bg-line" style={d(projects.length, 80, 100)} />
      </InView>
    </section>
  );
}

/** Height reveal via grid-rows 0fr → 1fr (the accordion exception for height). */
function Collapse({ open, id, children }: { open: boolean; id?: string; children: React.ReactNode }) {
  return (
    <div
      id={id}
      inert={!open}
      className={`grid transition-[grid-template-rows,opacity] duration-300 ease-[var(--ease-out)] motion-reduce:transition-[opacity] motion-reduce:duration-200 ${
        open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
      }`}
    >
      <div className="min-h-0 overflow-hidden">{children}</div>
    </div>
  );
}

/** Screenshot: clip-path wipe from the top + settle from 1.12 scale. */
function Shot({ project, open, sizes }: { project: (typeof projects)[number]; open: boolean; sizes: string }) {
  return (
    <div
      className={`relative aspect-[4/3] w-full overflow-hidden bg-line transition-[clip-path] duration-[600ms] ease-[var(--ease-in-out)] motion-reduce:transition-none ${
        open ? '[clip-path:inset(0_0_0_0)]' : '[clip-path:inset(0_0_100%_0)]'
      }`}
    >
      {project.image ? (
        <Image
          src={project.image}
          alt={`${project.title} screenshot`}
          fill
          sizes={sizes}
          className={`object-cover object-top transition-transform duration-[1000ms] ease-[var(--ease-out)] motion-reduce:transition-none ${
            open ? 'scale-100' : 'scale-[1.12]'
          }`}
        />
      ) : (
        <div className="flex h-full flex-col justify-between bg-ink p-4 text-paper">
          <span className="font-mono text-[9px] uppercase tracking-widest text-paper/50">{project.type}</span>
          <span className="text-2xl font-medium tracking-[-0.02em]">{project.title}</span>
        </div>
      )}
    </div>
  );
}
