import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactFragment,
  ReactPortal,
} from "react";
import { UrlObject } from "url";

export default function Navigation({
  links,
}: {
  links: {
    id: Key;
    title: string;
    href: string | UrlObject;
  }[];
}): JSX.Element {
  let router = useRouter();
  return (
    <nav className="pointer-events-auto hidden md:block">
      <ul className="flex rounded-full bg-white/90 px-3 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10">
        {links.map(
          (link: {
            id: Key | null | undefined;
            href: string | UrlObject;
            title:
              | string
              | number
              | boolean
              | ReactElement<any, string | JSXElementConstructor<any>>
              | ReactFragment
              | ReactPortal
              | null
              | undefined;
          }) => (
            <li key={link.id}>
              <Link
                href={link.href}
                className={clsx("relative block px-3 py-2 transition", {
                  "text-teal-500 dark:text-teal-400":
                    link.href === router.pathname,
                  "hover:text-teal-500 dark:hover:text-teal-400":
                    link.href !== router.pathname,
                })}
              >
                {link.title}

                {link.href === router.pathname && (
                  <span className="absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-teal-500/0 via-teal-500/40 to-teal-500/0 dark:from-teal-400/0 dark:via-teal-400/40 dark:to-teal-400/0" />
                )}
              </Link>
            </li>
          )
        )}
      </ul>
    </nav>
  );
}
