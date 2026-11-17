"use client";

import Image from "next/image";
import { useState } from "react";
import { SKILL_CATEGORIES, type SkillItem } from "@/data/portfolio";

function ConceptGlyph({ glyph }: { glyph?: SkillItem["glyph"] }) {
  const strokeProps = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#0D1216",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };

  if (glyph === "shield") {
    return (
      <svg {...strokeProps}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    );
  }
  if (glyph === "lock") {
    return (
      <svg {...strokeProps}>
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    );
  }
  if (glyph === "bug") {
    return (
      <svg {...strokeProps}>
        <path d="m8 2 1.88 1.88" />
        <path d="M14.12 3.88 16 2" />
        <path d="M9 7.13v-1a3.003 3.003 0 1 1 6 0v1" />
        <path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6" />
        <path d="M12 20v-9" />
        <path d="M6.53 9C4.6 8.8 3 7.1 3 5" />
        <path d="M6 13H2" />
        <path d="M3 21c0-2.1 1.7-3.9 3.8-4" />
        <path d="M20.97 5c0 2.1-1.6 3.8-3.5 4" />
        <path d="M22 13h-4" />
        <path d="M17.2 17c2.1.1 3.8 1.9 3.8 4" />
      </svg>
    );
  }
  return (
    <svg {...strokeProps}>
      <path d="M4 17l6-6-6-6" />
      <path d="M12 19h8" />
    </svg>
  );
}

function accentTopBorder(accent: "emerald" | "gold" | "coral") {
  if (accent === "gold") return "bg-[var(--accent-gold)]";
  if (accent === "coral") return "bg-[var(--accent-coral)]";
  return "bg-[var(--accent-emerald)]";
}

export function SkillsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const visibleCategories =
    selectedCategory === "all"
      ? SKILL_CATEGORIES
      : SKILL_CATEGORIES.filter((cat) => cat.id === selectedCategory);

  return (
    <section
      id="skills"
      className="border-b border-[var(--border-subtle)] bg-[var(--bg-canvas)] py-20 sm:py-24"
    >
      <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent-emerald-ink)]">
              Technical Skills
            </p>
            <h2 className="mt-2.5 text-balance text-3xl font-bold tracking-[-0.025em] text-[var(--text-primary)] sm:text-4xl">
              Core Technologies &amp; Engineering Stack
            </h2>
            <p className="mt-3 max-w-[58ch] text-base leading-relaxed text-[var(--text-secondary)]">
              Focused across backend services, relational and NoSQL databases, frontend frameworks, multi-cloud infrastructure, and application security.
            </p>
          </div>

          {/* Interactive Category Filter */}
          <div
            role="group"
            aria-label="Filter technical skills by category"
            className="flex flex-wrap gap-2"
          >
            <button
              type="button"
              onClick={() => setSelectedCategory("all")}
              aria-pressed={selectedCategory === "all"}
              className={`min-h-[40px] rounded-xl border px-3.5 py-2 text-sm font-semibold transition-colors ${
                selectedCategory === "all"
                  ? "border-[var(--accent-emerald)] bg-[var(--accent-emerald)] text-[var(--accent-emerald-on-fill)]"
                  : "border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
              }`}
            >
              All Categories
            </button>
            {SKILL_CATEGORIES.map((category) => {
              const isSelected = selectedCategory === category.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setSelectedCategory(category.id)}
                  aria-pressed={isSelected}
                  className={`min-h-[40px] rounded-xl border px-3.5 py-2 text-sm font-semibold transition-colors ${
                    isSelected
                      ? "border-[var(--accent-emerald)] bg-[var(--accent-emerald)] text-[var(--accent-emerald-on-fill)]"
                      : "border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  {category.shortLabel}
                </button>
              );
            })}
          </div>
        </div>

        <div
          className={`mt-10 grid grid-cols-1 gap-6 ${
            selectedCategory === "all" ? "md:grid-cols-2 lg:grid-cols-3" : "max-w-3xl"
          }`}
        >
          {visibleCategories.map((category) => (
            <article
              key={category.id}
              className="relative overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 shadow-[var(--shadow-card)] transition-colors duration-150 hover:border-[var(--border-strong)]"
            >
              <div
                className={`absolute inset-x-0 top-0 h-[3px] ${accentTopBorder(
                  category.accent
                )}`}
                aria-hidden="true"
              />

              <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg font-bold tracking-[-0.015em] text-[var(--text-primary)]">
                  {category.label}
                </h3>
                <span className="shrink-0 rounded-md border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-2 py-0.5 font-mono text-xs text-[var(--text-secondary)]">
                  {category.skills.length}
                </span>
              </div>

              <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                {category.description}
              </p>

              <ul className="mt-5 flex flex-wrap gap-2.5">
                {category.skills.map((skill) => (
                  <li key={skill.name}>
                    <span className="inline-flex min-h-[40px] items-center gap-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] px-3 py-1.5 text-[14px] font-medium text-[var(--text-primary)] transition-colors hover:border-[var(--border-strong)]">
                      <span
                        className={`flex shrink-0 items-center justify-center rounded-lg border border-black/10 bg-[var(--bg-tile-icon)] ${
                          skill.wide ? "h-7 w-12 px-1.5" : "h-7 w-7 p-1"
                        }`}
                      >
                        {skill.icon ? (
                          <Image
                            src={skill.icon}
                            alt=""
                            width={skill.wide ? 40 : 20}
                            height={20}
                            unoptimized
                            className={
                              skill.wide
                                ? "h-3 w-auto object-contain"
                                : "h-4 w-4 object-contain"
                            }
                          />
                        ) : (
                          <ConceptGlyph glyph={skill.glyph} />
                        )}
                      </span>
                      <span>{skill.name}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
