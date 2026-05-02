"use client";

import { cn } from "@/lib/cn";
import { useLayoutEffect, useRef, useState, useEffect } from "react";
import Avatar from "./Avatar";
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

function clamp(value: number, a: number, b: number): number {
  const min = Math.min(a, b);
  const max = Math.max(a, b);
  return Math.min(Math.max(value, min), max);
}

function AvatarContainer({
  className,
  ...props
}: {
  className?: string;
  [key: string]: any;
}): JSX.Element {
  return (
    <div
      className={cn(
        className,
        "h-10 w-10 rounded-full bg-white/90 p-0.5 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur-sm dark:bg-zinc-800/90 dark:ring-white/10"
      )}
      {...props}
    />
  );
}

function normalizePathname(pathname: string): string {
  return (pathname.replace(/\/$/, "").replace(/\/index\.html$/i, "") || "/");
}

function readScrollY(): number {
  if (typeof window.scrollY === "number") {
    return window.scrollY;
  }
  return (
    document.documentElement.scrollTop ||
    document.body.scrollTop ||
    0
  );
}

export default function Header({
  pathname,
}: {
  pathname: string;
}): JSX.Element {
  const normalizedPathname = normalizePathname(pathname);
  const isHomePage = normalizedPathname === "/";

  const layoutVarsRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const isInitial = useRef(true);
  const rafRef = useRef(0);
  const avatarMetricsRef = useRef({ initialSbTop: 0, init: false });

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

  useLayoutEffect(() => {
    const upDelay = 64;

    function setProperty(
      root: HTMLElement,
      { property, value }: { property: string; value: string },
    ): void {
      root.style.setProperty(property, value);
    }

    function updateStyles(): void {
      const root = layoutVarsRef.current;
      const nav = headerRef.current;
      if (!root || !nav) {
        return;
      }

      function updateHeaderStyles(headerEl: HTMLDivElement): void {
        const { top, height } = headerEl.getBoundingClientRect();
        const scrollY = clamp(
          readScrollY(),
          0,
          document.documentElement.scrollHeight - window.innerHeight,
        );

        // Let's use the actual physical distance between avatars for the delay
        const sb = document.getElementById("sidebar-avatar");
        const nb = document.getElementById("navbar-avatar");
        let downDelay = 0;
        if (isHomePage && sb && nb) {
          // If initialized, use the metrics
          const metrics = avatarMetricsRef.current;
          const initialTop = metrics.init ? metrics.initialSbTop : sb.getBoundingClientRect().top + scrollY;
          downDelay = Math.max((initialTop as number) - nb.getBoundingClientRect().top, 0);
        }

        if (isInitial.current) {
          setProperty(root, {
            property: "--header-position",
            value: "sticky",
          });
        }

        setProperty(root, {
          property: "--content-offset",
          value: `0px`,
        });

        if (isInitial.current || scrollY < downDelay) {
          setProperty(root, {
            property: "--header-height",
            value: `${downDelay + height}px`,
          });
          setProperty(root, {
            property: "--header-mb",
            value: `${-downDelay}px`,
          });
        } else if (top + height < -upDelay) {
          const offset = Math.max(height, scrollY - upDelay);
          setProperty(root, {
            property: "--header-height",
            value: `${offset}px`,
          });
          setProperty(root, {
            property: "--header-mb",
            value: `${height - offset}px`,
          });
        } else if (top === 0) {
          setProperty(root, {
            property: "--header-height",
            value: `${scrollY + height}px`,
          });
          setProperty(root, {
            property: "--header-mb",
            value: `${-scrollY}px`,
          });
        }
      }

      function updateAvatarStyles(): void {
        if (!isHomePage || window.innerWidth < 1024) {
          const styleRoot = document.documentElement;
          setProperty(styleRoot, { property: "--flying-opacity", value: "0" });
          return;
        }

        const sb = document.getElementById("sidebar-avatar");
        const nb = document.getElementById("navbar-avatar");
        if (!sb || !nb) return;

        const sbRect = sb.getBoundingClientRect();
        const nbRect = nb.getBoundingClientRect();

        const metrics = avatarMetricsRef.current;
        if (!metrics.init || window.scrollY === 0) {
           metrics.initialSbTop = sbRect.top + window.scrollY;
           metrics.init = true;
        }

        // Calculate the physical distance from the sidebar avatar's top to the navbar avatar's top
        const distanceToNavbar = (metrics.initialSbTop as number) - nbRect.top;
        const transitionDistance = Math.max(distanceToNavbar, 1);
        const p = clamp(window.scrollY / transitionDistance, 0, 1);

        const endSize = 32;
        const size = 132 - p * (132 - endSize);
        
        // Keep it horizontally centered along the vertical axis
        const offsetForCenter = (132 - size) / 2;
        const x = sbRect.left + offsetForCenter;

        // The y position should just be the natural scroll position, clamped to not go above the navbar
        const naturalY = (metrics.initialSbTop as number) - window.scrollY;
        const y = Math.max(nbRect.top, naturalY);

        const styleRoot = document.documentElement;
        setProperty(styleRoot, { property: "--flying-x", value: `${x}px` });
        setProperty(styleRoot, { property: "--flying-y", value: `${y}px` });
        setProperty(styleRoot, { property: "--flying-size", value: `${size}px` });
        setProperty(styleRoot, { property: "--flying-opacity", value: `${p}` });
      }

      updateHeaderStyles(nav);
      updateAvatarStyles();
      isInitial.current = false;
    }

    function onScroll(): void {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateStyles);
    }
    
    function onResize(): void {
      avatarMetricsRef.current.init = false;
      updateStyles();
    }

    updateStyles();
    const ro =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => updateStyles())
        : null;
    if (ro && layoutVarsRef.current) {
      ro.observe(layoutVarsRef.current);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro?.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [isHomePage, pathname]);

  return (
    <div ref={layoutVarsRef}>
      {isHomePage && (
        <div 
          className="fixed z-50 pointer-events-none hidden lg:block"
          style={{
            left: "var(--flying-x, -9999px)",
            top: "var(--flying-y, -9999px)",
            width: "var(--flying-size, 0px)",
            height: "var(--flying-size, 0px)",
          }}
        >
          <div 
            className="absolute -inset-[3px] rounded-full bg-bg shadow-[0_1px_2px_rgba(15,23,42,0.04)] ring-1 ring-rule"
            style={{ opacity: "var(--flying-opacity, 0)" }}
          />
          <img
            src="/images/user.png"
            alt=""
            className="absolute inset-0 w-full h-full rounded-full object-cover"
            style={{
              boxShadow: "calc((1 - var(--flying-opacity, 0)) * 0px) calc((1 - var(--flying-opacity, 0)) * 6px) calc((1 - var(--flying-opacity, 0)) * 20px) rgba(15,23,42,0.10)"
            }}
          />
        </div>
      )}
      <header
        className="pointer-events-none relative z-40 flex flex-col"
        style={{
          height: "var(--header-height)",
          marginBottom: "var(--header-mb)",
        }}
      >
        <div
          ref={headerRef}
          className="top-0 z-10 pointer-events-auto bg-bg/80 backdrop-blur-[14px] backdrop-saturate-[180%] border-b border-rule"
          style={{
            position: "var(--header-position)" as any,
          }}
        >
          <div className="max-w-[1100px] mx-auto px-[clamp(20px,4vw,36px)] py-[14px] grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3">
            <a href="/" className="inline-flex items-center gap-[10px] justify-self-start min-w-0 hover:no-underline">
              <div className="w-[34px] h-[34px] flex items-center justify-center">
                {isHomePage ? (
                  <>
                    <AvatarContainer className="hidden lg:block opacity-0 pointer-events-none p-0 w-[32px] h-[32px] bg-transparent shadow-none ring-0">
                      <Avatar id="navbar-avatar" large={false} className="w-[32px] h-[32px] !bg-transparent" />
                    </AvatarContainer>
                    <AvatarContainer className="lg:hidden p-0 w-[32px] h-[32px] bg-bg shadow-[0_1px_2px_rgba(15,23,42,0.04)] ring-1 ring-rule">
                      <Avatar large={false} className="w-[32px] h-[32px] !bg-transparent" />
                    </AvatarContainer>
                  </>
                ) : (
                  <AvatarContainer className="p-0 w-[32px] h-[32px] bg-bg shadow-[0_1px_2px_rgba(15,23,42,0.04)] ring-1 ring-rule">
                    <Avatar large={false} className="w-[32px] h-[32px] !bg-transparent" />
                  </AvatarContainer>
                )}
              </div>
            </a>
            
            <div className="justify-self-center flex items-center">
              <nav className="hidden lg:flex items-center gap-[2px] p-[5px_6px] border border-rule rounded-full bg-bg shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
                {navigations.map(l => {
                  const isActive = normalizedPathname === l.href || (l.href !== "/" && normalizedPathname.startsWith(l.href));
                  return (
                    <a key={l.href} href={l.href} className={cn(
                      "text-[13px] font-medium px-[13px] py-[6px] rounded-full transition-colors whitespace-nowrap",
                      isActive ? "text-link bg-accent-soft" : "text-ink-2 hover:text-ink hover:bg-bg-2"
                    )}>
                      {l.label}
                    </a>
                  );
                })}
              </nav>
              <div className="flex lg:hidden items-center gap-1">
                <a href="/search" onClick={(e) => { e.preventDefault(); setSearchOpen(true); }} aria-label="Search" title="Search" className="inline-flex w-[34px] h-[34px] items-center justify-center border border-transparent rounded-[8px] bg-transparent text-ink-3 transition-all duration-150 hover:bg-bg-2 hover:text-ink hover:border-rule">
                  <svg className="w-[15px] h-[15px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                </a>
                <a href="/rss.xml" aria-label="RSS Feed" title="RSS Feed" className="inline-flex w-[34px] h-[34px] items-center justify-center border border-transparent rounded-[8px] bg-transparent text-ink-3 transition-all duration-150 hover:bg-bg-2 hover:text-ink hover:border-rule" target="_blank" rel="noreferrer">
                  <svg className="w-[15px] h-[15px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 11a9 9 0 0 1 9 9"/><path d="M4 4a16 16 0 0 1 16 16"/><circle cx="5" cy="19" r="1"/></svg>
                </a>
                <ThemeSelector />
              </div>
            </div>

            <div className="flex justify-end items-center gap-1 justify-self-end">
              <div className="hidden lg:flex items-center gap-1">
                <a href="/search" onClick={(e) => { e.preventDefault(); setSearchOpen(true); }} aria-label="Search" title="Search" className="inline-flex w-[34px] h-[34px] items-center justify-center border border-transparent rounded-[8px] bg-transparent text-ink-3 transition-all duration-150 hover:bg-bg-2 hover:text-ink hover:border-rule">
                  <svg className="w-[15px] h-[15px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                </a>
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
    </div>
  );
}
