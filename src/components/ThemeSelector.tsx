"use client";

import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "./Icons";
import { THEME_STORAGE_KEY } from "@/lib/colorscheme";

function setDarkClass(isDark: boolean): void {
  document.documentElement.classList.toggle("dark", isDark);
}

export default function ThemeSelector(): JSX.Element {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  function disableTransitionsTemporarily(): void {
    document.documentElement.classList.add("**:transition-none!");
    window.setTimeout(() => {
      document.documentElement.classList.remove("**:transition-none!");
    }, 0);
  }

  function toggleTheme(): void {
    disableTransitionsTemporarily();
    const isDark = document.documentElement.classList.contains("dark");
    const next = !isDark;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next ? "dark" : "light");
    } catch {
      /* ignore */
    }
    setDarkClass(next);
    window.dispatchEvent(new Event("colorschemechange"));
  }

  if (!mounted) {
    return (
      <div
        className="h-10 w-10 rounded-full bg-white/90 px-3 py-2 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:bg-zinc-800/90 dark:ring-white/10"
        aria-hidden
      />
    );
  }

  return (
    <button
      type="button"
      aria-label="Toggle dark mode"
      className="group rounded-full bg-white/90 px-3 py-2 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur-sm transition dark:bg-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20"
      onClick={toggleTheme}
    >
      <SunIcon className="h-6 w-6 fill-zinc-100 stroke-zinc-500 transition group-hover:fill-zinc-200 group-hover:stroke-zinc-700 dark:hidden [@media(prefers-color-scheme:dark)]:fill-teal-50 [@media(prefers-color-scheme:dark)]:stroke-teal-500 [@media(prefers-color-scheme:dark)]:group-hover:fill-teal-50 [@media(prefers-color-scheme:dark)]:group-hover:stroke-teal-600" />
      <MoonIcon className="hidden h-6 w-6 fill-zinc-700 stroke-zinc-500 transition dark:block [@media(prefers-color-scheme:dark)]:group-hover:stroke-zinc-400 not-[@media_(prefers-color-scheme:dark)]:fill-teal-400/10 not-[@media_(prefers-color-scheme:dark)]:stroke-teal-500" />
    </button>
  );
}
