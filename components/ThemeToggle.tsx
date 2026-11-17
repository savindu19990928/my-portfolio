"use client";

import { useSyncExternalStore } from "react";

type Theme = "dark" | "light";

function applyThemeToDom(next: Theme) {
  const meta = document.querySelector('meta[name="color-scheme"]');
  if (meta) meta.setAttribute("content", next);
  document.documentElement.setAttribute("data-theme", next);
  try {
    localStorage.setItem("portfolio-theme", next);
  } catch {
    // Storage may be unavailable in restricted browsing contexts
  }
  window.dispatchEvent(new Event("portfolio-theme-change"));
}

function subscribeTheme(callback: () => void) {
  const onStorage = (e: StorageEvent) => {
    if (e.key === "portfolio-theme" && (e.newValue === "light" || e.newValue === "dark")) {
      const meta = document.querySelector('meta[name="color-scheme"]');
      if (meta) meta.setAttribute("content", e.newValue);
      document.documentElement.setAttribute("data-theme", e.newValue);
      callback();
    }
  };
  window.addEventListener("storage", onStorage);
  window.addEventListener("portfolio-theme-change", callback);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener("portfolio-theme-change", callback);
  };
}

function getThemeSnapshot(): Theme {
  if (typeof document === "undefined") return "light";
  return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
}

function getServerThemeSnapshot(): Theme {
  return "light";
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getServerThemeSnapshot
  );

  const isLight = theme === "light";

  const toggleTheme = () => {
    applyThemeToDom(isLight ? "dark" : "light");
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isLight ? "Switch to dark theme" : "Switch to light theme"}
      title={isLight ? "Switch to dark theme" : "Switch to light theme"}
      className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-primary)] transition-colors duration-150 hover:border-[var(--border-strong)] hover:bg-[var(--bg-elevated)] active:scale-[0.98]"
    >
      {isLight ? (
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
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      ) : (
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
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m6.34 17.66-1.41 1.41" />
          <path d="m19.07 4.93-1.41 1.41" />
        </svg>
      )}
    </button>
  );
}
