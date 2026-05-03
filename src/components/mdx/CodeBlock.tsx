/** Rehype/MDX can pass lowercase HTML attrs; React expects camelCase. */
function propsForReactDom(props: Record<string, unknown>) {
  const { tabindex, ...rest } = props;
  const out: Record<string, unknown> = { ...rest };
  if (tabindex !== undefined) out.tabIndex = tabindex;
  return out;
}

export default function CodeBlock({ children, ...props }: any): JSX.Element {
  const domProps = propsForReactDom(props);

  return (
    <div className="block-code group relative my-4">
      <button
        type="button"
        data-copy-code
        className="copy-code-button not-prose absolute right-2 top-2 z-10 inline-flex items-center gap-1 rounded border border-rule bg-bg-2 px-2 py-1 font-mono text-[10.5px] leading-none text-ink-3 transition-colors hover:border-link/35 hover:bg-accent-soft hover:text-link"
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
        className="m-0 overflow-x-auto whitespace-pre rounded-[var(--r)] border border-rule bg-bg-2 p-[12px_60px_12px_14px] font-mono text-[12.5px] leading-[1.55] text-ink"
      >
        {children}
      </pre>
    </div>
  );
}
