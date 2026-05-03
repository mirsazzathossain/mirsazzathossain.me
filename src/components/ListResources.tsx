"use client";

import { useState, useMemo } from "react";
import ResourceCard from "@/components/ResourceCard";

export default function ListResources({
  resources,
}: {
  resources: Resource[];
}): JSX.Element {
  const [q, setQ] = useState("");

  const filteredResources = useMemo(() => {
    const needle = q.toLowerCase();
    if (!needle) return resources;
    return resources.filter(r => 
      r.title.toLowerCase().includes(needle) || 
      r.description.toLowerCase().includes(needle) ||
      r.category.toLowerCase().includes(needle)
    );
  }, [q, resources]);

  const categorizedResources = filteredResources.reduce(
    (acc: Record<string, Resource[]>, resource: Resource) => {
      if (acc[resource.category]) {
        acc[resource.category].push(resource);
      } else {
        acc[resource.category] = [resource];
      }
      return acc;
    },
    {},
  );

  return (
    <>
      <div className="mb-[24px] pb-4 border-b border-rule">
        <label className="inline-flex items-center gap-[7px] py-1.5 px-3 border border-rule rounded-full bg-bg min-w-full sm:min-w-[260px] lg:min-w-[320px] text-ink-3">
          <svg className="h-[13px] w-[13px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <span className="sr-only">Search resources</span>
          <input 
            placeholder="Search resources…" 
            value={q} 
            onChange={(e) => setQ(e.target.value)} 
            className="w-full border-0 outline-none bg-transparent font-sans text-[13px] text-ink placeholder:text-ink-3"
          />
        </label>
      </div>

      {filteredResources.length === 0 && (
        <div className="text-[14px] text-ink-3 mt-4">
          No resources match your search.
        </div>
      )}
      {Object.keys(categorizedResources).map((category) => (
        <section key={category} className="mb-[30px]">
          <h2 className="font-serif text-[18px] pb-1.5 border-b-2 border-ink m-[0_0_14px] inline-block font-semibold text-ink">
            {category}
          </h2>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-3">
            {categorizedResources[category].map((resource: Resource) => (
              <ResourceCard key={resource.url} resource={resource} />
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
