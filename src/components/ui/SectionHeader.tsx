import type { ReactNode } from "react";

export function SectionHeader({
  title,
  href,
  action,
}: {
  title: ReactNode;
  href?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex items-baseline justify-between pb-2 border-b border-rule mb-4 gap-3 flex-wrap">
      <h2 className="font-mono text-[11px] tracking-[0.16em] uppercase text-ink-3 font-semibold m-0">
        {title}
      </h2>
      {href && action && (
        <a
          className="font-mono text-[11.5px] text-link inline-flex items-center gap-1 whitespace-nowrap hover:underline hover:decoration-link/35 hover:underline-offset-[3px]"
          href={href}
        >
          {action}
          <span className="text-current transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </a>
      )}
    </div>
  );
}
