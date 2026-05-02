import { useEffect, useState } from "react";
import { ChevronDownIcon, CloseIcon } from "./Icons";

type Props = {
  links: { href: string; label: string }[];
  className?: string;
};

export default function MobileNavigation({
  links,
  className,
}: Props): JSX.Element {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <div className={className}>
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="dialog"
        className="group flex items-center rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur-sm dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10 dark:hover:ring-white/20"
        onClick={() => setOpen(true)}
      >
        Menu
        <ChevronDownIcon className="ml-3 h-auto w-2 stroke-zinc-500 group-hover:stroke-zinc-700 dark:group-hover:stroke-zinc-400" />
      </button>

      {open && (
        <>
          <button
            type="button"
            aria-label="Close menu overlay"
            className="fixed inset-0 z-50 bg-zinc-800/40 backdrop-blur-xs transition-opacity dark:bg-black/80"
            onClick={() => setOpen(false)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-nav-heading"
            className="fixed inset-x-4 top-8 z-50 origin-top rounded-3xl bg-white p-8 ring-1 ring-zinc-900/5 transition-transform dark:bg-zinc-900 dark:ring-zinc-800"
          >
            <div className="flex flex-row-reverse items-center justify-between">
              <button
                type="button"
                aria-label="Close menu"
                className="-m-1 p-1"
                onClick={() => setOpen(false)}
              >
                <CloseIcon className="h-6 w-6 text-zinc-500 dark:text-zinc-400" />
              </button>
              <h2
                id="mobile-nav-heading"
                className="text-sm font-medium text-zinc-600 dark:text-zinc-400"
              >
                Navigation
              </h2>
            </div>
            <nav className="mt-6">
              <ul className="-my-2 divide-y divide-zinc-100 text-base text-zinc-800 dark:divide-zinc-100/5 dark:text-zinc-300">
                {links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="block py-2"
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </>
      )}
    </div>
  );
}
