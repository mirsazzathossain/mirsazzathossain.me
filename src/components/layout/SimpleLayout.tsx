

export default function SimpleLayout({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="mb-8">
      <header className="max-w-[720px] mb-8">
        {eyebrow && (
          <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-3 m-0 mb-1.5 font-semibold">
            {eyebrow}
          </p>
        )}
        <h1 className="font-serif text-[clamp(28px,4.5vw,42px)] leading-[1.05] tracking-[-0.02em] m-0 text-ink font-bold">
          {title}
        </h1>
        {intro && (
          <p className="mt-3 text-[15px] text-ink-2 max-w-[60ch] m-0">
            {intro}
          </p>
        )}
      </header>
      <div>{children}</div>
    </div>
  );
}
