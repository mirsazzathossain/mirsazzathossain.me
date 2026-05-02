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
      className="text-ink-3 hover:text-ink transition-colors"
    >
      {children}
    </a>
  );
}

export default function Footer(): JSX.Element {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 flex-wrap">
      <div className="flex gap-4 font-medium flex-wrap justify-center">
        {navigations.map((navigation) => (
          <NavLink key={navigation.href} href={navigation.href}>
            {navigation.label}
          </NavLink>
        ))}
      </div>
      <div className="text-center sm:text-right">
        <span>© {new Date().getFullYear()} Mir Sazzat Hossain · all rights reserved.</span>
      </div>
    </div>
  );
}
