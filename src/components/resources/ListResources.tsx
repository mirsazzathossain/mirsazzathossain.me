"use client";

import { useState, useMemo } from "react";
import ResourceCard from "@/components/resources/ResourceCard";
import { SearchField } from "@/components/ui/SearchField";

export default function ListResources({
  resources,
  page,
}: {
  resources: Resource[];
  page: ResourcePageData;
}): JSX.Element {
  const [q, setQ] = useState("");

  const filteredResources = useMemo(() => {
    const needle = q.toLowerCase();
    if (!needle) return resources;
    return resources.filter(
      (r) =>
        r.title.toLowerCase().includes(needle) ||
        r.description.toLowerCase().includes(needle) ||
        r.category.toLowerCase().includes(needle),
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
      <div className="border-rule mb-[24px] border-b pb-4">
        <SearchField
          value={q}
          onChange={setQ}
          placeholder={page.searchPlaceholder}
          label={page.searchLabel}
        />
      </div>

      {filteredResources.length === 0 && (
        <div className="text-ink-3 mt-4 text-[14px]">{page.emptyText}</div>
      )}
      {Object.keys(categorizedResources).map((category) => (
        <section key={category} className="mb-[30px]">
          <h2 className="border-ink text-ink m-[0_0_14px] inline-block border-b-2 pb-1.5 font-serif text-[18px] font-semibold">
            {category}
          </h2>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,260px),1fr))] gap-3">
            {categorizedResources[category].map((resource: Resource) => (
              <ResourceCard key={resource.url} resource={resource} />
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
