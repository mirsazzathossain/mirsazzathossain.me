"use client";

import { cn } from "@/lib/cn";
import { useRef, useState, useEffect } from "react";
import MobileNavigation from "./MobileNavigation";
import ThemeSelector from "./ThemeSelector";
import SearchModal from "./SearchModal";

const navigations = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/#publications", label: "Publications" },
  { href: "/projects", label: "Projects" },
  { href: "/courses", label: "Courses" },
  { href: "/snippets", label: "Snippets" },
  { href: "/resources", label: "Resources" },
  { href: "/articles", label: "Posts" },
];

function normalizePathname(pathname: string): string {
  return pathname.replace(/\/$/, "").replace(/\/index\.html$/i, "") || "/";
}

export default function Header({ pathname }: { pathname: string }): JSX.Element {
  const normalizedPathname = normalizePathname(pathname);

  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((o) => !o);
      }
      if (e.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40">
        <div className="bg-bg/80 backdrop-blur-[14px] backdrop-saturate-[180%] border-b border-rule">
          <div className="max-w-[1100px] mx-auto px-[clamp(20px,4vw,36px)] py-[14px] grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3">

            {/* Brand */}
            <a href="/" className="inline-flex items-center justify-self-start hover:no-underline">
              <img
                src="/images/user.png"
                alt="Mir Sazzat Hossain"
                className="w-[34px] h-[34px] rounded-full object-cover ring-1 ring-rule shadow-[0_1px_2px_rgba(15,23,42,0.04)]"
              />
            </a>

            {/* Desktop nav pill */}
            <div className="justify-self-center flex items-center">
              <nav className="hidden lg:flex items-center gap-[2px] p-[5px_6px] border border-rule rounded-full bg-bg shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
                {navigations.map((l) => {
                  const isActive =
                    normalizedPathname === l.href ||
                    (l.href !== "/" && normalizedPathname.startsWith(l.href));
                  return (
                    <a
                      key={l.href}
                      href={l.href}
                      className={cn(
                        "text-[13px] font-medium px-[13px] py-[6px] rounded-full transition-colors whitespace-nowrap",
                        isActive
                          ? "text-link bg-accent-soft"
                          : "text-ink-2 hover:text-ink hover:bg-bg-2"
                      )}
                    >
                      {l.label}
                    </a>
                  );
                })}
              </nav>

              {/* Mobile: search + rss only */}
              <div className="flex lg:hidden items-center gap-1">
                <button
                  onClick={() => setSearchOpen(true)}
                  aria-label="Search"
                  title="Search"
                  className="inline-flex w-[34px] h-[34px] items-center justify-center border border-transparent rounded-[8px] bg-transparent text-ink-3 transition-all duration-150 hover:bg-bg-2 hover:text-ink hover:border-rule"
                >
                  <svg className="w-[15px] h-[15px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                </button>
                <a href="/rss.xml" aria-label="RSS Feed" title="RSS Feed" className="inline-flex w-[34px] h-[34px] items-center justify-center border border-transparent rounded-[8px] bg-transparent text-ink-3 transition-all duration-150 hover:bg-bg-2 hover:text-ink hover:border-rule" target="_blank" rel="noreferrer">
                  <svg className="w-[15px] h-[15px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 11a9 9 0 0 1 9 9"/><path d="M4 4a16 16 0 0 1 16 16"/><circle cx="5" cy="19" r="1"/></svg>
                </a>
                <ThemeSelector />
              </div>
            </div>

            {/* Desktop tools */}
            <div className="flex justify-end items-center gap-1 justify-self-end">
              <div className="hidden lg:flex items-center gap-1">
                <button
                  onClick={() => setSearchOpen(true)}
                  aria-label="Search"
                  title="Search (⌘K)"
                  className="inline-flex w-[34px] h-[34px] items-center justify-center border border-transparent rounded-[8px] bg-transparent text-ink-3 transition-all duration-150 hover:bg-bg-2 hover:text-ink hover:border-rule"
                >
                  <svg className="w-[15px] h-[15px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                </button>
                <a href="/rss.xml" aria-label="RSS Feed" title="RSS Feed" className="inline-flex w-[34px] h-[34px] items-center justify-center border border-transparent rounded-[8px] bg-transparent text-ink-3 transition-all duration-150 hover:bg-bg-2 hover:text-ink hover:border-rule" target="_blank" rel="noreferrer">
                  <svg className="w-[15px] h-[15px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 11a9 9 0 0 1 9 9"/><path d="M4 4a16 16 0 0 1 16 16"/><circle cx="5" cy="19" r="1"/></svg>
                </a>
                <ThemeSelector />
              </div>
              <MobileNavigation links={navigations} className="lg:hidden" />
            </div>

          </div>
        </div>
      </header>
      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
    </>
  );
}
