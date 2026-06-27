/** Rehype/MDX can pass lowercase HTML attrs; React expects camelCase. */
function propsForReactDom(props: Record<string, unknown>) {
  const { tabindex, ...rest } = props;
  const out: Record<string, unknown> = { ...rest };
  if (tabindex !== undefined) out.tabIndex = tabindex;
  return out;
}

export default function CodeBlock({
  children,
  ...props
}: React.HTMLAttributes<HTMLPreElement> & { children?: React.ReactNode }): JSX.Element {
  const domProps = propsForReactDom(props);

  return (
    <div className="block-code group relative my-4">
      <button
        type="button"
        data-copy-code
        className="copy-code-button not-prose border-rule bg-bg-2 text-ink-3 hover:border-link/35 hover:bg-accent-soft hover:text-link absolute top-2 right-2 z-10 inline-flex items-center gap-1 rounded border px-2 py-1 font-mono text-[10.5px] leading-none transition-colors"
        aria-label="Copy code"
      >
        <svg
          width="11"
          height="11"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="9" y="9" width="13" height="13" rx="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
        <span data-copy-label>Copy</span>
      </button>
      <pre
        {...domProps}
        className="border-rule bg-bg-2 text-ink m-0 overflow-x-auto rounded-[var(--r)] border p-[12px_60px_12px_14px] font-mono text-[12.5px] leading-[1.55] whitespace-pre"
      >
        {children}
      </pre>
    </div>
  );
}
