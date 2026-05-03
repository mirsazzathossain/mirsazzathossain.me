"use client";

import { THEME_STORAGE_KEY } from "@/lib/colorscheme";
import { useEffect, useState } from "react";

function setDarkClass(isDark: boolean): void {
  document.documentElement.classList.toggle("dark", isDark);
}

export default function ThemeSelector(): JSX.Element {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Get current theme state
    const dark = document.documentElement.classList.contains("dark");
    setIsDark(dark);
    setMounted(true);
  }, []);

  function disableTransitionsTemporarily(): void {
    document.documentElement.classList.add("**:transition-none!");
    window.setTimeout(() => {
      document.documentElement.classList.remove("**:transition-none!");
    }, 0);
  }

  function toggleTheme(): void {
    disableTransitionsTemporarily();
    const next = !isDark;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next ? "dark" : "light");
    } catch {
      /* ignore */
    }
    setDarkClass(next);
    setIsDark(next);
    window.dispatchEvent(new Event("colorschemechange"));
  }

  return (
    <button
      type="button"
      aria-label="Toggle dark mode"
      className="w-[34px] h-[34px] inline-flex items-center justify-center border border-transparent rounded-[8px] bg-transparent text-ink-3 cursor-pointer transition-all duration-150 hover:bg-bg-2 hover:text-ink hover:border-rule"
      onClick={toggleTheme}
    >
      <svg
        className="w-[16px] h-[16px] hidden dark:block"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
      </svg>
      <svg
        className="w-[16px] h-[16px] block dark:hidden"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    </button>
  );
}
