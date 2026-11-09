"use client";

import { useState, useMemo } from "react";
import { DiamondIcon } from "@/components/Icons";
import { SearchField } from "@/components/ui/SearchField";
import type { SnippetEntry } from "@/utils/articles";

export default function ListSnippets({ snippets }: { snippets: SnippetEntry[] }) {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return snippets;
    return snippets.filter((s) =>
      (s.data.title + " " + s.data.description + " " + s.data.language)
        .toLowerCase()
        .includes(needle),
    );
  }, [q, snippets]);

  return (
    <>
      <div className="mb-[22px]">
        <SearchField
          value={q}
          onChange={setQ}
          placeholder="Search snippets..."
          label="Search snippets"
        />
      </div>

      <div className="grid [grid-template-columns:repeat(auto-fill,minmax(min(100%,320px),1fr))] gap-[18px]">
        {filtered.map((s) => (
          <a
            key={s.id}
            href={`/snippets/${s.id}`}
            className="border-rule bg-bg hover:border-link/45 relative flex flex-col gap-2 rounded-[14px] border p-[22px_22px_20px] no-underline transition-[border-color,box-shadow,transform] duration-[180ms] hover:-translate-y-0.5 hover:no-underline hover:shadow-lg"
          >
            <span className="text-ink-2 relative mb-1 inline-flex h-[38px] w-[38px] items-center justify-center">
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
                  <span className="text-ink-3 absolute inset-0 flex items-center justify-center font-mono text-[8.5px] font-bold tracking-[-0.04em]">
                    {s.data.language.slice(0, 3)}
                  </span>
                </>
              )}
            </span>
            <h3 className="text-ink m-0 font-sans text-[17px] leading-[1.3] font-bold tracking-[-0.014em]">
              {s.data.title}
            </h3>
            <p className="text-ink-2 m-0 text-[13.5px] leading-[1.55]">{s.data.description}</p>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              <span className="border-link/25 bg-accent-soft text-link rounded-full border px-3 py-[3px] text-[11.5px] font-medium">
                {s.data.language}
              </span>
            </div>
          </a>
        ))}
        {filtered.length === 0 && (
          <p className="text-ink-3 col-span-full font-mono text-sm">
            No snippets match your search.
          </p>
        )}
      </div>
    </>
  );
}
