"use client";

import { useEffect, useRef, useState } from "react";
import { NAV_ITEMS, PERSONAL_INFO } from "@/data/portfolio";
import { BrandLogo } from "./BrandLogo";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const [activeId, setActiveId] = useState<string>("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const manualTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const manualLockedRef = useRef(false);

  useEffect(() => {
    const updateActiveFromScroll = () => {
      if (manualLockedRef.current) return;

      const anchorLine = 160;
      let current = "home";

      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        // On desktop, About & Experience share a two-column section; prefer About during scroll
        if (item.id === "experience") {
          const aboutEl = document.getElementById("about");
          if (aboutEl) {
            const aboutRect = aboutEl.getBoundingClientRect();
            if (Math.abs(aboutRect.top - rect.top) < 80) continue;
          }
        }
        if (rect.top <= anchorLine) {
          current = item.id;
        }
      }

      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 40) {
        current = "contact";
      }

      setActiveId(current);
    };

    updateActiveFromScroll();
    window.addEventListener("scroll", updateActiveFromScroll, { passive: true });
    return () => window.removeEventListener("scroll", updateActiveFromScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  const handleNavClick = (id: string) => {
    manualLockedRef.current = true;
    if (manualTimerRef.current) clearTimeout(manualTimerRef.current);
    manualTimerRef.current = setTimeout(() => {
      manualLockedRef.current = false;
    }, 900);
    setActiveId(id);
    setMobileOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-[var(--border-subtle)] bg-[var(--bg-nav)] backdrop-blur-md">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-[var(--accent-emerald)] focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-[var(--accent-emerald-on-fill)]"
      >
        Skip to content
      </a>

      <div className="mx-auto flex h-[72px] w-full max-w-[1280px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-10">
        <BrandLogo size="sm" />

        <nav aria-label="Primary" className="hidden lg:flex lg:items-center lg:gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = activeId === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => handleNavClick(item.id)}
                aria-current={isActive ? "location" : undefined}
                className={`relative inline-flex h-11 items-center rounded-lg px-3.5 text-[15px] font-medium whitespace-nowrap transition-colors duration-150 ${
                  isActive
                    ? "text-[var(--text-primary)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                {item.label}
                {isActive ? (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-3.5 bottom-1.5 h-[2px] rounded-full bg-[var(--accent-emerald)]"
                  />
                ) : null}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2.5">
          <a
            href={PERSONAL_INFO.cvUrl}
            download={PERSONAL_INFO.cvFileName}
            className="hidden sm:inline-flex h-11 items-center gap-2 rounded-xl bg-[var(--accent-emerald)] px-4 text-[14px] font-semibold text-[var(--accent-emerald-on-fill)] whitespace-nowrap transition-all duration-150 hover:brightness-105 active:scale-[0.98]"
          >
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
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span>Download CV</span>
          </a>

          <ThemeToggle />

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation-panel"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-primary)] transition-colors hover:border-[var(--border-strong)] lg:hidden"
          >
            {mobileOpen ? (
              <svg
                width="20"
                height="20"
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
            ) : (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div
          id="mobile-navigation-panel"
          className="border-t border-[var(--border-subtle)] bg-[var(--bg-canvas)] px-5 pb-6 pt-4 sm:px-8 lg:hidden"
        >
          <nav aria-label="Mobile" className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeId === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  aria-current={isActive ? "location" : undefined}
                  className={`flex min-h-[48px] items-center justify-between rounded-xl px-4 text-base font-medium transition-colors ${
                    isActive
                      ? "bg-[var(--accent-emerald-soft)] text-[var(--accent-emerald-ink)]"
                      : "text-[var(--text-primary)] hover:bg-[var(--bg-surface)]"
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive ? (
                    <span className="h-2 w-2 rounded-full bg-[var(--accent-emerald)]" aria-hidden="true" />
                  ) : null}
                </a>
              );
            })}
          </nav>

          <div className="mt-4 border-t border-[var(--border-subtle)] pt-4 sm:hidden">
            <a
              href={PERSONAL_INFO.cvUrl}
              download={PERSONAL_INFO.cvFileName}
              onClick={() => setMobileOpen(false)}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[var(--accent-emerald)] px-4 text-base font-semibold text-[var(--accent-emerald-on-fill)]"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
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
        </div>
      ) : null}
    </header>
  );
}
