import type { ReactNode } from "react";

export function AboutSectionTitle({
  children,
  first = false,
}: {
  children: ReactNode;
  first?: boolean;
}) {
  return (
    <h2
      className={`font-mono text-[11px] tracking-[0.16em] uppercase text-ink-3 pb-2 border-b border-rule mb-4${
        first ? "" : " mt-[30px]"
      }`}
    >
      {children}
    </h2>
  );
}
