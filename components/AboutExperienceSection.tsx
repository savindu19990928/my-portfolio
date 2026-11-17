import {
  EXPERIENCE_ITEMS,
  LANGUAGES,
  PERSONAL_INFO,
  SOFT_SKILLS,
} from "@/data/portfolio";

export function AboutExperienceSection() {
  return (
    <section
      id="about"
      className="border-b border-[var(--border-subtle)] bg-[var(--bg-surface)] py-20 sm:py-24"
    >
      <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-12">
          {/* About Me + Soft Skills & Languages */}
          <div className="lg:col-span-6">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent-emerald-ink)]">
              About Me
            </p>
            <h2 className="mt-2.5 text-balance text-3xl font-bold tracking-[-0.025em] text-[var(--text-primary)] sm:text-4xl">
              Engineering practical, secure software from architecture to deployment.
            </h2>

            <div className="mt-6 space-y-4 max-w-[62ch] text-base leading-[1.7] text-[var(--text-secondary)]">
              {PERSONAL_INFO.aboutParagraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>

            {/* Subtle Soft Skills & Languages Cards */}
            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-12">
              <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] p-5 sm:col-span-8">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-primary)]">
                  Working Approach &amp; Soft Skills
                </h3>
                <ul className="mt-3.5 space-y-2.5 text-[15px] leading-relaxed text-[var(--text-secondary)]">
                  {SOFT_SKILLS.map((skill) => (
                    <li key={skill} className="flex items-start gap-2.5">
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-emerald)]"
                        aria-hidden="true"
                      />
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] p-5 sm:col-span-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-primary)]">
                  Languages
                </h3>
                <dl className="mt-3.5 space-y-3">
                  {LANGUAGES.map((item) => (
                    <div
                      key={item.language}
                      className="border-b border-[var(--border-subtle)] pb-2.5 last:border-b-0 last:pb-0"
                    >
                      <dt className="text-[15px] font-semibold text-[var(--text-primary)]">
                        {item.language}
                      </dt>
                      <dd className="mt-0.5 font-mono text-xs text-[var(--accent-emerald-ink)]">
                        {item.level}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>

          {/* Experience Timeline */}
          <div id="experience" className="scroll-mt-24 lg:col-span-6">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent-gold-ink)]">
              Experience
            </p>
            <h2 className="mt-2.5 text-balance text-3xl font-bold tracking-[-0.025em] text-[var(--text-primary)] sm:text-4xl">
              Professional Timeline
            </h2>
            <p className="mt-3 max-w-[54ch] text-base leading-relaxed text-[var(--text-secondary)]">
              Hands-on experience across commercial client delivery and dedicated backend systems engineering.
            </p>

            <ol className="relative mt-8 space-y-6 before:absolute before:left-[15px] before:top-3 before:bottom-3 before:w-[2px] before:bg-[var(--border-subtle)]">
              {EXPERIENCE_ITEMS.map((exp) => {
                const isEmerald = exp.accent === "emerald";
                return (
                  <li key={exp.id} className="relative pl-11">
                    <span
                      aria-hidden="true"
                      className={`absolute left-[7px] top-6 flex h-[18px] w-[18px] items-center justify-center rounded-full border-2 bg-[var(--bg-surface)] ${
                        isEmerald
                          ? "border-[var(--accent-emerald)]"
                          : "border-[var(--accent-gold)]"
                      }`}
                    >
                      <span
                        className={`h-2 w-2 rounded-full ${
                          isEmerald
                            ? "bg-[var(--accent-emerald)]"
                            : "bg-[var(--accent-gold)]"
                        }`}
                      />
                    </span>

                    <article className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] p-6 transition-colors duration-150 hover:border-[var(--border-strong)]">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <h3 className="text-xl font-bold tracking-[-0.015em] text-[var(--text-primary)]">
                            {exp.role}
                          </h3>
                          {exp.company ? (
                            <p className="mt-0.5 text-[15px] font-semibold text-[var(--accent-gold-ink)]">
                              {exp.company}
                            </p>
                          ) : null}
                        </div>
                        <span
                          className={`inline-flex items-center rounded-lg border px-3 py-1 font-mono text-xs font-semibold ${
                            isEmerald
                              ? "border-[var(--accent-emerald-border)] bg-[var(--accent-emerald-soft)] text-[var(--accent-emerald-ink)]"
                              : "border-[var(--accent-gold-border)] bg-[var(--accent-gold-soft)] text-[var(--accent-gold-ink)]"
                          }`}
                        >
                          {exp.period}
                        </span>
                      </div>

                      <ul className="mt-4 space-y-2.5 text-[15px] leading-relaxed text-[var(--text-secondary)]">
                        {exp.highlights.map((point) => (
                          <li key={point} className="flex items-start gap-2.5">
                            <span
                              className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${
                                isEmerald
                                  ? "bg-[var(--accent-emerald)]"
                                  : "bg-[var(--accent-gold)]"
                              }`}
                              aria-hidden="true"
                            />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </article>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
