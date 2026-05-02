"use client";

import { cn } from "@/lib/cn";
import { useLayoutEffect, useRef } from "react";
import Avatar from "./Avatar";
import { Container } from "./Container";
import DesktopNavigation from "./DesktopNavigation";
import MobileNavigation from "./MobileNavigation";
import ThemeSelector from "./ThemeSelector";

const navigations = [
  { href: "/", label: "Home" },
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
  const avatarRef = useRef<HTMLDivElement | null>(null);
  const isInitial = useRef(true);
  const rafRef = useRef(0);

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

      const spacer = avatarRef.current;
      let rawDown = spacer?.offsetTop ?? 0;
      if (isHomePage && rawDown < 8 && spacer) {
        const headerBox = nav.getBoundingClientRect();
        const spacerBox = spacer.getBoundingClientRect();
        rawDown = Math.round(spacerBox.top - headerBox.top);
      }
      const downDelay = isHomePage ? Math.max(rawDown, 1) : rawDown;

      function updateHeaderStyles(headerEl: HTMLDivElement): void {
        const { top, height } = headerEl.getBoundingClientRect();
        const scrollY = clamp(
          readScrollY(),
          0,
          document.documentElement.scrollHeight - window.innerHeight,
        );

        if (isInitial.current) {
          setProperty(root, {
            property: "--header-position",
            value: "sticky",
          });
        }

        setProperty(root, {
          property: "--content-offset",
          value: `${downDelay}px`,
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

      function updateAvatarStyles(styleRoot: HTMLElement): void {
        if (!isHomePage) {
          return;
        }

        const fromScale = 1;
        const toScale = 36 / 64;
        const fromX = 0;
        const toX = 2 / 16;

        const dy = downDelay - readScrollY();

        let scale = (dy * (fromScale - toScale)) / downDelay + toScale;
        scale = clamp(scale, fromScale, toScale);

        let x = (dy * (fromX - toX)) / downDelay + toX;
        x = clamp(x, fromX, toX);

        setProperty(styleRoot, {
          property: "--avatar-image-transform",
          value: `translate3d(${x}rem, 0, 0) scale(${scale})`,
        });

        const borderScale = 1 / (toScale / scale);
        const borderX = (-toX + x) * borderScale;
        const borderTransform = `translate3d(${borderX}rem, 0, 0) scale(${borderScale})`;

        setProperty(styleRoot, {
          property: "--avatar-border-transform",
          value: borderTransform,
        });
        const nearEnd = Math.abs(scale - toScale) < 0.002;
        setProperty(styleRoot, {
          property: "--avatar-border-opacity",
          value: nearEnd ? "1" : "0",
        });
      }

      updateHeaderStyles(nav);
      updateAvatarStyles(root);
      isInitial.current = false;
    }

    function onScroll(): void {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateStyles);
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
    window.addEventListener("resize", updateStyles);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro?.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateStyles);
    };
  }, [isHomePage, pathname]);

  return (
    <div ref={layoutVarsRef}>
      <header
        className="pointer-events-none relative z-50 flex flex-col"
        style={{
          height: "var(--header-height)",
          marginBottom: "var(--header-mb)",
        }}
      >
        {isHomePage && (
          <>
            <div
              ref={avatarRef}
              className="order-last mt-[calc(--spacing(16)-(--spacing(3)))]"
            />
            <Container
              className="top-0 order-last -mb-3 pt-3"
              style={{ position: "var(--header-position)" }}
            >
              <div className="relative">
                <AvatarContainer
                  className="absolute left-0 top-3 origin-left transition-opacity"
                  style={{
                    opacity: "var(--avatar-border-opacity, 0)",
                    transform: "var(--avatar-border-transform)",
                  }}
                />
                <Avatar
                  large
                  className="block h-16 w-16 origin-left"
                  style={{ transform: "var(--avatar-image-transform)" }}
                />
              </div>
            </Container>
          </>
        )}
        <div
          ref={headerRef}
          className="top-0 z-10 pt-6"
          style={{
            position: "var(--header-position)" as any,
          }}
        >
          <Container>
            <div className="relative flex gap-4">
              <div className="flex flex-1">
                {!isHomePage && (
                  <AvatarContainer>
                    <Avatar />
                  </AvatarContainer>
                )}
              </div>
              <div className="flex flex-1 justify-end md:justify-center">
                <MobileNavigation
                  links={navigations}
                  className="pointer-events-auto md:hidden"
                />
                <DesktopNavigation
                  links={navigations}
                  currentPath={normalizedPathname}
                  className="pointer-events-auto hidden md:block"
                />
              </div>
              <div className="flex justify-end md:flex-1">
                <div className="pointer-events-auto">
                  <ThemeSelector />
                </div>
              </div>
            </div>
          </Container>
        </div>
      </header>
      {isHomePage && <div style={{ height: "var(--content-offset)" }} />}
    </div>
  );
}
