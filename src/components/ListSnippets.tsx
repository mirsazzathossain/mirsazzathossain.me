import { useState, useMemo } from "react";
import type { SnippetEntry } from "@/utils/articles";

const LANG_META: Record<string, { label: string; color: string; glyph: string }> = {
  python:     { label: "Python",     color: "#3572A5", glyph: "py"  },
  bash:       { label: "Bash",       color: "#4EAA25", glyph: "$_"  },
  shell:      { label: "Shell",      color: "#4EAA25", glyph: "$_"  },
  javascript: { label: "JavaScript", color: "#f1e05a", glyph: "JS"  },
  typescript: { label: "TypeScript", color: "#3178C6", glyph: "TS"  },
  latex:      { label: "LaTeX",      color: "#3D6117", glyph: "TeX" },
  yaml:       { label: "YAML",       color: "#cb171e", glyph: "Y"   },
  sql:        { label: "SQL",        color: "#e38c00", glyph: "SQL" },
  rust:       { label: "Rust",       color: "#dea584", glyph: "Rs"  },
  cpp:        { label: "C++",        color: "#f34b7d", glyph: "C++" },
  office:     { label: "Office",     color: "#D24726", glyph: "Off" },
};

function DiamondIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round">
      <path d="M5 7.2 12 3l7 4.2v9.6L12 21l-7-4.2Z" />
    </svg>
  );
}

export default function ListSnippets({ snippets }: { snippets: SnippetEntry[] }) {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return snippets;
    return snippets.filter((s) =>
      (s.data.title + " " + s.data.description + " " + s.data.language)
        .toLowerCase()
        .includes(needle)
    );
  }, [q, snippets]);

  return (
    <>
      <div className="mb-[22px]">
        <label className="inline-flex items-center gap-[7px] py-1.5 px-3 border border-rule rounded-full bg-bg min-w-full sm:min-w-[260px] lg:min-w-[320px] text-ink-3">
          <svg className="h-[13px] w-[13px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <span className="sr-only">Search snippets</span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search snippets…"
            className="w-full border-0 outline-none bg-transparent font-sans text-[13px] text-ink placeholder:text-ink-3"
          />
        </label>
      </div>

      <div className="grid gap-[18px] [grid-template-columns:repeat(auto-fill,minmax(320px,1fr))]">
        {filtered.map((s) => {
          const lang = (s.data.language || "").toLowerCase();
          const meta = LANG_META[lang] || { label: s.data.language, color: "#94a3b8", glyph: "</>" };
          return (
            <a
              key={s.id}
              href={`/snippets/${s.id}`}
              className="relative flex flex-col gap-2 rounded-[14px] border border-rule bg-bg p-[22px_22px_20px] no-underline transition-[border-color,box-shadow,transform] duration-[180ms] hover:-translate-y-0.5 hover:border-[color-mix(in_srgb,var(--link)_45%,var(--rule))] hover:shadow-[0_6px_22px_color-mix(in_srgb,var(--link)_12%,transparent)] hover:no-underline"
            >
              <span className="relative mb-1 inline-flex h-[38px] w-[38px] items-center justify-center text-ink-2">
                {s.data.logo?.url ? (
                  <img
                    src={`/images/${s.data.logo.url}`}
                    alt={s.data.logo.alt}
                    width={26}
                    height={26}
                    className="object-contain"
                  />
                ) : (
                  <>
                    <DiamondIcon size={22} />
                    <span
                      className="absolute inset-0 flex items-center justify-center font-mono text-[8.5px] font-bold tracking-[-0.04em]"
                      style={{ color: meta.color }}
                    >
                      {meta.glyph}
                    </span>
                  </>
                )}
              </span>
              <h3 className="m-0 font-sans text-[17px] font-bold leading-[1.3] tracking-[-0.014em] text-ink">
                {s.data.title}
              </h3>
              <p className="m-0 text-[13.5px] leading-[1.55] text-ink-2">
                {s.data.description}
              </p>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                <span className="rounded-full border border-[color-mix(in_srgb,var(--link)_25%,var(--rule))] bg-accent-soft px-3 py-[3px] text-[11.5px] font-medium text-link">
                  Snippet
                </span>
                <span className="rounded-full border border-rule bg-bg-2 px-3 py-[3px] text-[11.5px] font-medium text-ink-2">
                  {meta.label}
                </span>
              </div>
            </a>
          );
        })}
        {filtered.length === 0 && (
          <p className="col-span-full font-mono text-sm text-ink-3">
            No snippets match your search.
          </p>
        )}
      </div>
    </>
  );
}
