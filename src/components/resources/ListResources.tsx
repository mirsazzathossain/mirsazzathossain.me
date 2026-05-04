"use client";

import { useState, useMemo } from "react";
import ResourceCard from "@/components/resources/ResourceCard";
import { SearchField } from "@/components/ui/SearchField";

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
        <SearchField
          value={q}
          onChange={setQ}
          placeholder="Search resources…"
          label="Search resources"
        />
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
