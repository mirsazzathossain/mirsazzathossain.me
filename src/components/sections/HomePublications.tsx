import { PublicationItem } from "@/components/publications/PublicationItem";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { Publication } from "@/utils/publications";

export function HomePublications({
  publications,
}: {
  publications: Publication[];
}) {
  const sorted = [...publications].sort((a, b) => {
    const yearDiff = Number(b.year ?? 0) - Number(a.year ?? 0);
    if (yearDiff !== 0) return yearDiff;
    return Number(b.month ?? 0) - Number(a.month ?? 0);
  });
  const selected = sorted.filter((publication) => publication.featured);
  const featured = selected.length ? selected : sorted.slice(0, 4);
  const latestIds = new Set(
    sorted.slice(0, 3).map((publication) => publication.id).filter(Boolean)
  );

  return (
    <div className="mb-10">
      <SectionHeader
        title="Selected Publications"
        href="/publications"
        action="All publications"
      />

      <div className="flex flex-col">
        {featured.map((publication) => (
          <PublicationItem
            key={publication.id ?? publication.title}
            publication={publication}
            showCitations={false}
            isNew={latestIds.has(publication.id ?? "")}
          />
        ))}
      </div>
    </div>
  );
}
