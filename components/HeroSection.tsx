import Image from "next/image";
import { PERSONAL_INFO } from "@/data/portfolio";
import { ArchitectureVisualizer } from "./ArchitectureVisualizer";

export function HeroSection() {
  return (
    <section
      id="home"
      className="eng-grid-bg relative border-b border-[var(--border-subtle)] pt-28 pb-16 sm:pt-32 sm:pb-24 lg:pt-36 lg:pb-24"
    >
      <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Left Column: Identity, Headline, Actions */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-3.5 py-1.5">
              <span className="flex items-center gap-1" aria-hidden="true">
                <span className="h-2 w-2 rounded-full bg-[var(--accent-emerald)]" />
                <span className="h-2 w-2 rounded-full bg-[var(--accent-gold)]" />
                <span className="h-2 w-2 rounded-full bg-[var(--accent-coral)]" />
              </span>
              <span className="font-mono text-xs font-medium tracking-wide text-[var(--text-secondary)]">
                {PERSONAL_INFO.professionalTitle}
              </span>
            </div>

            <p className="mt-6 text-lg font-semibold tracking-[-0.01em] text-[var(--accent-emerald-ink)] sm:text-xl">
              {PERSONAL_INFO.fullName}
            </p>

            <h1 className="mt-3 text-balance text-[2.15rem] font-extrabold leading-[1.1] tracking-[-0.03em] text-[var(--text-primary)] sm:text-[2.75rem] lg:text-[3.25rem]">
              {PERSONAL_INFO.heroHeadline}
            </h1>

            <p className="mt-5 max-w-[58ch] text-base leading-[1.7] text-[var(--text-secondary)] sm:text-[17px]">
              {PERSONAL_INFO.heroDescription}
            </p>

            {/* Primary CTA Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="inline-flex h-12 min-w-[152px] items-center justify-center gap-2 rounded-xl bg-[var(--accent-emerald)] px-5 text-[15px] font-semibold text-[var(--accent-emerald-on-fill)] transition-all duration-150 hover:brightness-105 active:scale-[0.98]"
              >
                <span>View My Work</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </a>

              <a
                href="#contact"
                className="inline-flex h-12 min-w-[144px] items-center justify-center gap-2 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface)] px-5 text-[15px] font-semibold text-[var(--text-primary)] transition-colors duration-150 hover:border-[var(--accent-emerald)] hover:bg-[var(--bg-elevated)] active:scale-[0.98]"
              >
                <span>Contact Me</span>
              </a>

              <a
                href={PERSONAL_INFO.cvUrl}
                download={PERSONAL_INFO.cvFileName}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-[var(--border-subtle)] bg-transparent px-4 text-[15px] font-semibold text-[var(--text-primary)] transition-colors duration-150 hover:border-[var(--border-strong)] hover:bg-[var(--bg-surface)] active:scale-[0.98]"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <span>Download CV</span>
              </a>
            </div>

            {/* Social Profile Links */}
            <div className="mt-7 flex flex-wrap items-center gap-3 border-t border-[var(--border-subtle)] pt-6">
              <a
                href={PERSONAL_INFO.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-4 py-2 text-sm font-medium text-[var(--text-primary)] transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--bg-elevated)]"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[var(--bg-tile-icon)] p-1">
                  <Image
                    src="/icons/github.svg"
                    alt=""
                    width={16}
                    height={16}
                    loading="eager"
                    unoptimized
                    className="h-4 w-4"
                  />
                </span>
                <span>GitHub</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="text-[var(--text-muted)]"
                >
                  <path d="M7 17 17 7" />
                  <path d="M7 7h10v10" />
                </svg>
              </a>

              <a
                href={PERSONAL_INFO.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-4 py-2 text-sm font-medium text-[var(--text-primary)] transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--bg-elevated)]"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[var(--bg-tile-icon)] p-1">
                  <Image
                    src="/icons/linkedin.svg"
                    alt=""
                    width={16}
                    height={16}
                    loading="eager"
                    unoptimized
                    className="h-4 w-4"
                  />
                </span>
                <span>LinkedIn</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="text-[var(--text-muted)]"
                >
                  <path d="M7 17 17 7" />
                  <path d="M7 7h10v10" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Backend / API / AI Architecture Console */}
          <div className="lg:col-span-6">
            <ArchitectureVisualizer />
          </div>
        </div>
      </div>
    </section>
  );
}
