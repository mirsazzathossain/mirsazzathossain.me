"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { ArrowRightIcon, SearchIcon } from "@/components/Icons";

export default function SearchModal({
  onClose,
}: {
  onClose: () => void;
}) {
  const [q, setQ] = useState("");
  const [data, setData] = useState<any[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus the input when opened
    const t = setTimeout(() => inputRef.current?.focus(), 30);
    
    // Fetch search data
    fetch("/search.json")
      .then(res => res.json())
      .then(json => setData(json))
      .catch(console.error);

    return () => clearTimeout(t);
  }, []);

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return [];
    
    return data
      .filter((item) => item.keywords.includes(needle))
      .slice(0, 12);
  }, [q, data]);

  return (
    <div 
      className="fixed inset-0 z-[100] bg-ink/35 backdrop-blur-[4px] flex items-start justify-center pt-[12vh] px-5 pb-5 animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-[640px] bg-bg border border-rule rounded-[14px] shadow-2xl overflow-hidden flex flex-col max-h-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-[10px] p-[14px_16px] border-b border-rule">
          <SearchIcon className="h-4 w-4 shrink-0 text-ink-3" />
          <input 
            ref={inputRef}
            placeholder="Search publications, posts, snippets…" 
            value={q} 
            onChange={(e) => setQ(e.target.value)}
            className="flex-1 border-none outline-none bg-transparent font-inherit text-[15px] text-ink placeholder:text-ink-3"
          />
          <kbd className="font-mono text-[10px] text-ink-3 bg-bg-2 border border-rule px-1.5 py-0.5 rounded-[4px] uppercase tracking-wider">Esc</kbd>
        </div>
        
        <div className="max-h-[50vh] overflow-y-auto p-[6px] flex flex-col gap-1">
          {!q && (
            <p className="font-serif text-[13px] text-ink-3 p-[28px_16px] text-center m-0">
              Try "equivariant", "federated", "LiteSRNet", "SSH tunnel", "poisson"…
            </p>
          )}
          {q && results.length === 0 && (
            <p className="font-serif text-[13px] text-ink-3 p-[28px_16px] text-center m-0">
              No results.
            </p>
          )}
          {results.map((r, i) => (
            <a 
              key={i} 
              className="grid grid-cols-[88px_1fr_auto] gap-3 items-center p-[10px_12px] rounded-[8px] cursor-pointer hover:bg-bg-2 hover:no-underline text-left" 
              href={r.href}
              onClick={() => onClose()}
            >
              <span className="font-mono text-[9.5px] tracking-[0.1em] uppercase text-ink-3 py-[3px] px-[7px] border border-rule rounded-[3px] bg-bg-2 justify-self-start">
                {r.kind}
              </span>
              <div className="min-w-0">
                <div className="text-[13.5px] text-ink leading-[1.35] truncate">{r.title}</div>
                <div className="text-[11.5px] text-ink-3 mt-[2px] truncate">{r.sub}</div>
              </div>
              <ArrowRightIcon className="h-4 w-4 text-ink-3" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
