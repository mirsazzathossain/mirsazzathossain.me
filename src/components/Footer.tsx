const navigations = [
  { href: "/articles", label: "Articles" },
  { href: "/projects", label: "Projects" },
  { href: "/courses", label: "Courses" },
  { href: "/snippets", label: "Snippets" },
  { href: "/resources", label: "Resources" },
];

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="transition hover:text-teal-500 dark:hover:text-teal-400"
    >
      {children}
    </a>
  );
}

export default function Footer(): JSX.Element {
  return (
    <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
      <div className="flex gap-6 text-sm font-medium text-zinc-800 dark:text-zinc-200">
        {navigations.map((navigation) => (
          <NavLink key={navigation.href} href={navigation.href}>
            {navigation.label}
          </NavLink>
        ))}
      </div>
      <p className="text-sm text-zinc-400 dark:text-zinc-500">
        © {new Date().getFullYear()} all rights reserved.
      </p>
    </div>
  );
}
