import { cn } from "@/lib/cn";

function NavItem({
  href,
  children,
  currentPath,
}: {
  href: string;
  children: React.ReactNode;
  currentPath: string;
}): JSX.Element {
  const isActive = currentPath === href;

  return (
    <li>
      <a
        href={href}
        className={cn(
          "relative block px-3 py-2 transition",
          isActive
            ? "text-teal-500 dark:text-teal-400"
            : "hover:text-teal-500 dark:hover:text-teal-400",
        )}
      >
        {children}
        {isActive && (
          <span className="absolute inset-x-1 -bottom-px h-px bg-linear-to-r from-teal-500/0 via-teal-500/40 to-teal-500/0 dark:from-teal-400/0 dark:via-teal-400/40 dark:to-teal-400/0" />
        )}
      </a>
    </li>
  );
}

type Props = {
  links: { href: string; label: string }[];
  className?: string;
  currentPath: string;
};

export default function DesktopNavigation({
  links,
  className,
  currentPath,
}: Props): JSX.Element {
  return (
    <nav className={className}>
      <ul className="flex rounded-full bg-white/90 px-3 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur-sm dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10">
        {links.map(({ href, label }, index) => (
          <NavItem key={index} href={href} currentPath={currentPath}>
            {label}
          </NavItem>
        ))}
      </ul>
    </nav>
  );
}
