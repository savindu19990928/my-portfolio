import Image from "next/image";
import { CERTIFICATION_ITEMS, EDUCATION_ITEMS } from "@/data/portfolio";

function dotColor(accent: "emerald" | "gold" | "coral") {
  if (accent === "gold") return "bg-[var(--accent-gold)]";
  if (accent === "coral") return "bg-[var(--accent-coral)]";
  return "bg-[var(--accent-emerald)]";
}

function borderColor(accent: "emerald" | "gold" | "coral") {
  if (accent === "gold") return "border-[var(--accent-gold)]";
  if (accent === "coral") return "border-[var(--accent-coral)]";
  return "border-[var(--accent-emerald)]";
}

export function EducationSection() {
  return (
    <section
      id="education"
      className="border-b border-[var(--border-subtle)] bg-[var(--bg-canvas)] py-20 sm:py-24"
    >
      <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-10">
        <div>
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent-coral-ink)]">
            Education &amp; Certifications
          </p>
          <h2 className="mt-2.5 text-balance text-3xl font-bold tracking-[-0.025em] text-[var(--text-primary)] sm:text-4xl">
            Academic Background &amp; Verified Credentials
          </h2>
          <p className="mt-3 max-w-[58ch] text-base leading-relaxed text-[var(--text-secondary)]">
            Formal software engineering study alongside industry-recognized cybersecurity and backend engineering certifications.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Education Timeline */}
          <div className="lg:col-span-6">
            <h3 className="text-lg font-bold tracking-[-0.01em] text-[var(--text-primary)]">
              Education
            </h3>
            <ol className="relative mt-6 space-y-5 before:absolute before:left-[15px] before:top-3 before:bottom-3 before:w-[2px] before:bg-[var(--border-subtle)]">
              {EDUCATION_ITEMS.map((item) => (
                <li key={item.id} className="relative pl-11">
                  <span
                    aria-hidden="true"
                    className={`absolute left-[7px] top-6 flex h-[18px] w-[18px] items-center justify-center rounded-full border-2 bg-[var(--bg-canvas)] ${borderColor(
                      item.accent
                    )}`}
                  >
                    <span className={`h-2 w-2 rounded-full ${dotColor(item.accent)}`} />
                  </span>

                  <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 transition-colors hover:border-[var(--border-strong)]">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="text-lg font-bold text-[var(--text-primary)]">
                        {item.institution}
                      </h4>
                      {item.period ? (
                        <span className="rounded-md border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-2.5 py-0.5 font-mono text-xs text-[var(--text-secondary)]">
                          {item.period}
                        </span>
                      ) : null}
                    </div>
                    {item.detail ? (
                      <p className="mt-1.5 text-[15px] text-[var(--text-secondary)]">
                        {item.detail}
                      </p>
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Certifications */}
          <div className="lg:col-span-6">
            <h3 className="text-lg font-bold tracking-[-0.01em] text-[var(--text-primary)]">
              Certifications
            </h3>
            <ul className="mt-6 space-y-5">
              {CERTIFICATION_ITEMS.map((cert) => (
                <li key={cert.id}>
                  <div className="flex items-start gap-4 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 transition-colors hover:border-[var(--border-strong)]">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-black/10 bg-[var(--bg-tile-icon)] p-2">
                      {cert.icon ? (
                        <Image
                          src={cert.icon}
                          alt=""
                          width={24}
                          height={24}
                          unoptimized
                          className="h-6 w-6 object-contain"
                        />
                      ) : (
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#C6282A"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                          <path d="m9 12 2 2 4-4" />
                        </svg>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h4 className="text-base font-bold leading-snug text-[var(--text-primary)] sm:text-[17px]">
                        {cert.title}
                      </h4>
                      {cert.provider ? (
                        <p className="mt-1 font-mono text-xs font-medium text-[var(--text-secondary)]">
                          Issued by {cert.provider}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
