"use client";

import { useState, useMemo } from "react";
import { DiamondIcon } from "@/components/Icons";
import { SearchField } from "@/components/ui/SearchField";
import type { SnippetEntry } from "@/utils/articles";
import { getSnippetLanguageMeta } from "@/utils/snippets";

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
        <SearchField
          value={q}
          onChange={setQ}
          placeholder="Search snippets…"
          label="Search snippets"
        />
      </div>

      <div className="grid gap-[18px] [grid-template-columns:repeat(auto-fill,minmax(320px,1fr))]">
        {filtered.map((s) => {
          const meta = getSnippetLanguageMeta(s.data.language);
          return (
            <a
              key={s.id}
              href={`/snippets/${s.id}`}
              className="relative flex flex-col gap-2 rounded-[14px] border border-rule bg-bg p-[22px_22px_20px] no-underline transition-[border-color,box-shadow,transform] duration-[180ms] hover:-translate-y-0.5 hover:border-link/45 hover:shadow-lg hover:no-underline"
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
                    <DiamondIcon className="h-[22px] w-[22px]" />
                    <span
                      className={`absolute inset-0 flex items-center justify-center font-mono text-[8.5px] font-bold tracking-[-0.04em] ${meta.glyphClassName}`}
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
                <span className="rounded-full border border-link/25 bg-accent-soft px-3 py-[3px] text-[11.5px] font-medium text-link">
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
