"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  CLIENT_PROJECTS,
  PERSONAL_PROJECTS,
  type PersonalProject,
} from "@/data/portfolio";

type ProjectFilter = "All" | "Backend & APIs" | "Frontend" | "AI Skill Sets";

const FILTERS: ProjectFilter[] = ["All", "Backend & APIs", "Frontend", "AI Skill Sets"];

function categoryBadgeStyle(accent: "emerald" | "gold" | "coral") {
  if (accent === "gold") {
    return "border-[var(--accent-gold-border)] bg-[var(--accent-gold-soft)] text-[var(--accent-gold-ink)]";
  }
  if (accent === "coral") {
    return "border-[var(--accent-coral-border)] bg-[var(--accent-coral-soft)] text-[var(--accent-coral-ink)]";
  }
  return "border-[var(--accent-emerald-border)] bg-[var(--accent-emerald-soft)] text-[var(--accent-emerald-ink)]";
}

function accentBarColor(accent: "emerald" | "gold" | "coral") {
  if (accent === "gold") return "bg-[var(--accent-gold)]";
  if (accent === "coral") return "bg-[var(--accent-coral)]";
  return "bg-[var(--accent-emerald)]";
}

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("All");
  const [selectedProject, setSelectedProject] = useState<PersonalProject | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const filteredProjects =
    activeFilter === "All"
      ? PERSONAL_PROJECTS
      : PERSONAL_PROJECTS.filter((project) => project.category === activeFilter);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      dialog.returnValue = "";
      setSelectedProject(null);
    };

    // Light-dismiss fallback when closedby="any" is unsupported
    let pressedOutside = false;
    const isOutside = (e: PointerEvent) => {
      const r = dialog.getBoundingClientRect();
      return (
        e.clientX < r.left ||
        e.clientX > r.right ||
        e.clientY < r.top ||
        e.clientY > r.bottom
      );
    };

    const handlePointerDown = (e: PointerEvent) => {
      if (!("closedBy" in HTMLDialogElement.prototype)) {
        pressedOutside = isOutside(e);
      }
    };

    const handlePointerUp = (e: PointerEvent) => {
      if (!("closedBy" in HTMLDialogElement.prototype)) {
        if (pressedOutside && isOutside(e)) {
          dialog.close();
        }
        pressedOutside = false;
      }
    };

    dialog.addEventListener("close", handleClose);
    dialog.addEventListener("pointerdown", handlePointerDown);
    dialog.addEventListener("pointerup", handlePointerUp);

    return () => {
      dialog.removeEventListener("close", handleClose);
      dialog.removeEventListener("pointerdown", handlePointerDown);
      dialog.removeEventListener("pointerup", handlePointerUp);
    };
  }, []);

  const openProjectModal = (project: PersonalProject) => {
    setSelectedProject(project);
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) {
      dialog.showModal();
    }
  };

  const closeProjectModal = () => {
    const dialog = dialogRef.current;
    if (dialog && dialog.open) {
      dialog.close();
    }
  };

  return (
    <section
      id="projects"
      className="border-b border-[var(--border-subtle)] bg-[var(--bg-surface)] py-20 sm:py-24"
    >
      <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-10">
        {/* Category A: Personal & Technical Projects */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent-emerald-ink)]">
              Personal &amp; Technical Projects
            </p>
            <h2 className="mt-2.5 text-balance text-3xl font-bold tracking-[-0.025em] text-[var(--text-primary)] sm:text-4xl">
              APIs, Full-Stack Systems &amp; AI Tooling
            </h2>
            <p className="mt-3 max-w-[60ch] text-base leading-relaxed text-[var(--text-secondary)]">
              Independent backend engineering repositories, frontend applications, and reusable AI development skill sets.
            </p>
          </div>

          <div
            role="group"
            aria-label="Filter personal and technical projects"
            className="flex flex-wrap gap-2"
          >
            {FILTERS.map((filter) => {
              const active = activeFilter === filter;
              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  aria-pressed={active}
                  className={`min-h-[40px] rounded-xl border px-3.5 py-2 text-sm font-semibold transition-colors ${
                    active
                      ? "border-[var(--accent-emerald)] bg-[var(--accent-emerald)] text-[var(--accent-emerald-on-fill)]"
                      : "border-[var(--border-subtle)] bg-[var(--bg-canvas)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] shadow-[var(--shadow-card)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--border-strong)]"
            >
              <div>
                <div
                  className={`h-[3px] w-full ${accentBarColor(project.accent)}`}
                  aria-hidden="true"
                />

                <div className="p-6">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`inline-flex items-center rounded-md border px-2.5 py-0.5 font-mono text-[11px] font-semibold ${categoryBadgeStyle(
                        project.accent
                      )}`}
                    >
                      {project.category}
                    </span>
                    <button
                      type="button"
                      onClick={() => openProjectModal(project)}
                      aria-label={`Inspect details for ${project.title}`}
                      className="inline-flex min-h-[36px] items-center gap-1 rounded-lg px-2.5 py-1 font-mono text-xs font-medium text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-surface)] hover:text-[var(--text-primary)]"
                    >
                      <span>Details</span>
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M15 3h6v6" />
                        <path d="M10 14 21 3" />
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      </svg>
                    </button>
                  </div>

                  <h3 className="mt-3.5 text-xl font-bold leading-snug tracking-[-0.015em] text-[var(--text-primary)]">
                    {project.title}
                  </h3>

                  <p className="mt-2.5 text-[15px] leading-relaxed text-[var(--text-secondary)]">
                    {project.description}
                  </p>

                  {project.technologies.length > 0 ? (
                    <ul
                      aria-label={`Technologies used in ${project.title}`}
                      className="mt-4 flex flex-wrap gap-1.5"
                    >
                      {project.technologies.map((tech) => (
                        <li
                          key={tech}
                          className="rounded-md border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-2.5 py-1 font-mono text-xs text-[var(--text-secondary)]"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  {project.previewImage ? (
                    <div className="mt-4 overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]">
                      <Image
                        src={project.previewImage}
                        alt={project.previewAlt ?? `${project.title} preview`}
                        width={1200}
                        height={750}
                        className="aspect-[16/9] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 border-t border-[var(--border-subtle)] bg-[var(--bg-surface)]/50 px-6 py-4">
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-xl bg-[var(--accent-emerald)] px-4 py-2 text-sm font-semibold text-[var(--accent-emerald-on-fill)] transition-all hover:brightness-105"
                  >
                    <span>Live Website</span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M7 17 17 7" />
                      <path d="M7 7h10v10" />
                    </svg>
                  </a>
                ) : null}

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface)] px-4 py-2 text-sm font-semibold text-[var(--text-primary)] transition-colors hover:border-[var(--accent-emerald)] hover:bg-[var(--bg-elevated)]"
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded bg-[var(--bg-tile-icon)] p-0.5">
                    <Image
                      src="/icons/github.svg"
                      alt=""
                      width={14}
                      height={14}
                      unoptimized
                      className="h-3.5 w-3.5"
                    />
                  </span>
                  <span>GitHub</span>
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Category B: Real Client Website Development (Strictly Separate Section Block) */}
        <div
          id="client-projects"
          className="mt-20 border-t border-[var(--border-subtle)] pt-16 sm:mt-24 sm:pt-20"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--accent-gold-border)] bg-[var(--accent-gold-soft)] px-3 py-1">
                <span
                  className="h-2 w-2 rounded-full bg-[var(--accent-gold)]"
                  aria-hidden="true"
                />
                <span className="font-mono text-xs font-semibold uppercase tracking-[0.08em] text-[var(--accent-gold-ink)]">
                  Commercial Engagement
                </span>
              </div>
              <h2 className="mt-3 text-balance text-3xl font-bold tracking-[-0.025em] text-[var(--text-primary)] sm:text-4xl">
                Real Client Website Development
              </h2>
              <p className="mt-2.5 max-w-[60ch] text-base leading-relaxed text-[var(--text-secondary)]">
                Production business websites delivered for commercial clients, presented separately from personal engineering repositories.
              </p>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-7 lg:grid-cols-3">
            {CLIENT_PROJECTS.map((client) => (
              <article
                key={client.id}
                className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-canvas)] shadow-[var(--shadow-card)] transition-all duration-200 hover:-translate-y-0.5"
              >
                <div>
                  {/* Commercial Browser Frame Preview */}
                  <div className="border-b border-[var(--border-subtle)] bg-[var(--bg-elevated)]">
                    <div className="flex items-center justify-between gap-2 border-b border-[var(--border-subtle)] px-4 py-2.5">
                      <div className="flex items-center gap-1.5" aria-hidden="true">
                        <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent-coral)]" />
                        <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent-gold)]" />
                        <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent-emerald)]" />
                      </div>
                      <span className="truncate font-mono text-xs text-[var(--text-secondary)]">
                        {client.domain}
                      </span>
                      <span
                        className={`shrink-0 rounded border px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wide ${categoryBadgeStyle(
                          client.accent
                        )}`}
                      >
                        Client Project
                      </span>
                    </div>

                    <div className="relative aspect-[16/10] w-full overflow-hidden">
                      <Image
                        src={client.previewImage}
                        alt={client.previewAlt}
                        width={1200}
                        height={750}
                        className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                  </div>

                  <div className="p-6">
                    <div
                      className={`mb-3 h-[3px] w-12 rounded-full ${accentBarColor(
                        client.accent
                      )}`}
                      aria-hidden="true"
                    />
                    <h3 className="text-xl font-bold tracking-[-0.015em] text-[var(--text-primary)]">
                      {client.title}
                    </h3>
                    {client.description ? (
                      <p className="mt-2.5 text-[15px] leading-relaxed text-[var(--text-secondary)]">
                        {client.description}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="border-t border-[var(--border-subtle)] bg-[var(--bg-surface)]/50 px-6 py-4">
                  <a
                    href={client.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface)] px-4 py-2.5 text-sm font-semibold text-[var(--text-primary)] transition-colors hover:border-[var(--accent-emerald)] hover:bg-[var(--accent-emerald)] hover:text-[var(--accent-emerald-on-fill)]"
                  >
                    <span>Visit Website</span>
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M7 17 17 7" />
                      <path d="M7 7h10v10" />
                    </svg>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* Native Accessible Project Detail Modal (<dialog> opened with showModal()) */}
      <dialog
        ref={dialogRef}
        closedby="any"
        aria-labelledby="project-dialog-title"
        className="project-dialog"
      >
        {selectedProject ? (
          <div className="flex flex-col">
            <div className="flex items-start justify-between gap-4 border-b border-[var(--border-subtle)] p-6">
              <div>
                <span
                  className={`inline-flex items-center rounded-md border px-2.5 py-0.5 font-mono text-xs font-semibold ${categoryBadgeStyle(
                    selectedProject.accent
                  )}`}
                >
                  {selectedProject.category}
                </span>
                <h2
                  id="project-dialog-title"
                  className="mt-2.5 text-2xl font-bold tracking-[-0.02em] text-[var(--text-primary)]"
                >
                  {selectedProject.title}
                </h2>
              </div>

              <button
                type="button"
                autoFocus
                onClick={closeProjectModal}
                aria-label="Close project details"
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-[var(--text-primary)] transition-colors hover:border-[var(--border-strong)]"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>

            <div className="overflow-y-auto p-6 space-y-6">
              {selectedProject.previewImage ? (
                <div className="overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]">
                  <Image
                    src={selectedProject.previewImage}
                    alt={selectedProject.previewAlt ?? `${selectedProject.title} preview`}
                    width={1200}
                    height={750}
                    className="h-auto w-full object-cover"
                  />
                </div>
              ) : null}

              <div>
                <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">
                  Project Overview
                </h3>
                <p className="mt-2 text-base leading-relaxed text-[var(--text-secondary)]">
                  {selectedProject.description}
                </p>
              </div>

              <div>
                <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">
                  Engineering Scope
                </h3>
                <ul className="mt-2.5 space-y-2 text-[15px] leading-relaxed text-[var(--text-secondary)]">
                  {selectedProject.focusPoints.map((point) => (
                    <li key={point} className="flex items-start gap-2.5">
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-emerald)]"
                        aria-hidden="true"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {selectedProject.technologies.length > 0 ? (
                <div>
                  <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">
                    Technologies
                  </h3>
                  <ul className="mt-2.5 flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-3 py-1.5 font-mono text-xs font-medium text-[var(--text-primary)]"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>

            <div className="flex flex-wrap items-center justify-end gap-3 border-t border-[var(--border-subtle)] bg-[var(--bg-elevated)]/60 px-6 py-4">
              {selectedProject.liveUrl ? (
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[var(--accent-emerald)] px-5 py-2.5 text-sm font-semibold text-[var(--accent-emerald-on-fill)] transition-all hover:brightness-105"
                >
                  <span>Visit Live Website</span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M7 17 17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
                </a>
              ) : null}

              <a
                href={selectedProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface)] px-5 py-2.5 text-sm font-semibold text-[var(--text-primary)] transition-colors hover:border-[var(--accent-emerald)]"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded bg-[var(--bg-tile-icon)] p-0.5">
                  <Image
                    src="/icons/github.svg"
                    alt=""
                    width={14}
                    height={14}
                    unoptimized
                    className="h-3.5 w-3.5"
                  />
                </span>
                <span>View GitHub Repository</span>
              </a>
            </div>
          </div>
        ) : null}
      </dialog>
    </section>
  );
}
