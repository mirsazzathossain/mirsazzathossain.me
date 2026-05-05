import { PublicationItem } from "@/components/publications/PublicationItem";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { sortPublicationsByDate, type Publication } from "@/utils/publications";

export function HomePublications({
  publications,
}: {
  publications: Publication[];
}) {
  const sorted = sortPublicationsByDate(publications);
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
