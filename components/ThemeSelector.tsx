import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

function IconBase({
  children,
  ...props
}: {
  children: React.ReactNode;
  [key: string]: any;
}): JSX.Element {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" {...props}>
      {children}
    </svg>
  );
}

function LightIcon(
  props: JSX.IntrinsicAttributes & { [key: string]: any }
): JSX.Element {
  return (
    <IconBase {...props}>
      <path d="M8 12.25A4.25 4.25 0 0 1 12.25 8v0a4.25 4.25 0 0 1 4.25 4.25v0a4.25 4.25 0 0 1-4.25 4.25v0A4.25 4.25 0 0 1 8 12.25v0Z"></path>
      <path
        d="M12.25 3v1.5M21.5 12.25H20M18.791 18.791l-1.06-1.06M18.791 5.709l-1.06 1.06M12.25 20v1.5M4.5 12.25H3M6.77 6.77 5.709 5.709M6.77 17.73l-1.061 1.061"
        fill="none"
      ></path>
    </IconBase>
  );
}

function DarkIcon(
  props: JSX.IntrinsicAttributes & { [key: string]: any }
): JSX.Element {
  return (
    <IconBase {...props}>
      <path
        d="M17.25 16.22a6.937 6.937 0 0 1-9.47-9.47 7.451 7.451 0 1 0 9.47 9.47ZM12.75 7C17 7 17 2.75 17 2.75S17 7 21.25 7C17 7 17 11.25 17 11.25S17 7 12.75 7Z"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
    </IconBase>
  );
}
export default function ThemeSelector(): JSX.Element | null {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;
  const currentTheme = theme === "system" ? systemTheme : theme;
  function toggleTheme() {
    setTheme(currentTheme === "dark" ? "light" : "dark");
  }
  return (
    <div className="pointer-events-auto">
      <button
        type="button"
        aria-label="Toggle dark mode"
        className="group rounded-full bg-white/90 px-3 py-2 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition dark:bg-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20"
        onClick={toggleTheme}
      >
        <LightIcon
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="h-6 w-6 fill-zinc-100 stroke-zinc-500 transition group-hover:fill-zinc-200 group-hover:stroke-zinc-700 dark:hidden [@media(prefers-color-scheme:dark)]:fill-teal-50 [@media(prefers-color-scheme:dark)]:stroke-teal-500 [@media(prefers-color-scheme:dark)]:group-hover:fill-teal-50 [@media(prefers-color-scheme:dark)]:group-hover:stroke-teal-600"
        />

        <DarkIcon className="hidden h-6 w-6 fill-zinc-700 stroke-zinc-500 transition dark:block [@media(prefers-color-scheme:dark)]:group-hover:stroke-zinc-400 [@media_not_(prefers-color-scheme:dark)]:fill-teal-400/10 [@media_not_(prefers-color-scheme:dark)]:stroke-teal-500" />
      </button>
    </div>
  );
}
