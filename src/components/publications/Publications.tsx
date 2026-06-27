"use client";
import { PublicationItem } from "@/components/publications/PublicationItem";
import { Pagination } from "@/components/ui/Pagination";
import { SearchField } from "@/components/ui/SearchField";
import {
  getPublicationKeywords,
  getPublicationType,
  PUBLICATION_FILTERS,
  sortPublicationsByDate,
  type Publication,
  type PublicationFilter,
  type ScholarStats,
} from "@/utils/publications";
import { useMemo, useState } from "react";

const PUBLICATIONS_PER_PAGE = 30;

export default function Publications({
  publications,
  stats,
}: {
  publications: Publication[];
  stats?: ScholarStats;
}): JSX.Element {
  const [type, setType] = useState<PublicationFilter>("All");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const sortedPublications = useMemo(() => sortPublicationsByDate(publications), [publications]);

  const filters = useMemo<PublicationFilter[]>(() => {
    const present = new Set(sortedPublications.map(getPublicationType));
    return PUBLICATION_FILTERS.filter((filter) => filter === "All" || present.has(filter));
  }, [sortedPublications]);

  const latestPublicationIds = useMemo(
    () =>
      new Set(
        sortedPublications
          .slice(0, 3)
          .map((publication) => publication.id)
          .filter(Boolean),
      ),
    [sortedPublications],
  );

  const filteredPublications = useMemo(() => {
    const needle = query.trim().toLowerCase();

    return sortedPublications.filter((publication) => {
      const matchesType = type === "All" || getPublicationType(publication) === type;
      const haystack = [
        publication.title,
        publication.venue,
        publication.venue_short,
        ...(publication.authors?.map((author) => author.name) ?? []),
        ...getPublicationKeywords(publication),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return matchesType && (!needle || haystack.includes(needle));
    });
  }, [query, sortedPublications, type]);

  const totalPages = Math.max(1, Math.ceil(filteredPublications.length / PUBLICATIONS_PER_PAGE));

  const groupedPublications = useMemo(() => {
    const groups = new Map<string, Publication[]>();
    const start = (page - 1) * PUBLICATIONS_PER_PAGE;

    filteredPublications.slice(start, start + PUBLICATIONS_PER_PAGE).forEach((publication) => {
      const year = String(publication.year ?? "Undated");
      groups.set(year, [...(groups.get(year) ?? []), publication]);
    });

    return [...groups.entries()].sort(([a], [b]) => Number(b) - Number(a));
  }, [filteredPublications, page]);

  const paperYearCounts = useMemo(() => {
    const counts = new Map<string, number>();
    sortedPublications.forEach((publication) => {
      const year = String(publication.year ?? "Undated");
      counts.set(year, (counts.get(year) ?? 0) + 1);
    });

    return [...counts.entries()].sort(([a], [b]) => Number(a) - Number(b));
  }, [sortedPublications]);

  const chartCounts = useMemo(() => {
    const citesPerYear = stats?.cites_per_year ?? {};
    const entries = Object.entries(citesPerYear)
      .map(([year, count]) => [year, Number(count)] as const)
      .filter(([, count]) => Number.isFinite(count));

    return entries.length ? entries.sort(([a], [b]) => Number(a) - Number(b)) : paperYearCounts;
  }, [paperYearCounts, stats?.cites_per_year]);

  const maxYearCount = Math.max(1, ...chartCounts.map(([, count]) => count));
  const paperTotal = sortedPublications.length;
  const citationTotal = Number(stats?.total_citations ?? 0);
  const h5Index = Number(stats?.h_index_5y ?? stats?.h_index ?? 0);
  const i10Index = Number(stats?.i10_index ?? 0);

  const safePage = Math.min(page, totalPages);

  return (
    <div>
      <header className="mb-8 max-w-[720px]">
        <p className="text-ink-3 m-0 mb-1.5 font-mono text-[11px] tracking-[0.14em] uppercase">
          Research
        </p>
        <h1 className="text-ink m-0 font-serif text-[clamp(28px,4.5vw,42px)] leading-[1.05] font-semibold tracking-[-0.02em]">
          Publications
        </h1>
        <p className="text-ink-2 mt-3 mb-0 max-w-[60ch] text-[15px]">
          Peer-reviewed papers, workshop contributions, and preprints across computer vision, domain
          adaptation, and astrophysical machine learning.
        </p>
      </header>

      <section className="border-rule bg-bg-2 mb-[26px] grid grid-cols-1 gap-7 rounded-[10px] border p-[18px_22px] md:grid-cols-[1fr_1.4fr]">
        <div className="grid grid-cols-2 content-center gap-3.5 sm:grid-cols-4">
          <StatBlock value={paperTotal} label="Papers" />
          <StatBlock value={citationTotal} label="Citations" />
          <StatBlock value={h5Index} label="h5-index" />
          <StatBlock value={i10Index} label="i10-index" />
        </div>

        <div className="grid h-20 grid-cols-[repeat(auto-fit,minmax(28px,1fr))] items-end gap-[5px] pt-3.5">
          {chartCounts.map(([year, count]) => (
            <div key={year} className="flex h-full flex-col items-center gap-[3px]">
              <span className="text-ink-2 font-mono text-[9.5px] leading-none">{count}</span>
              <div className="flex w-full flex-1 items-end overflow-hidden">
                <div
                  className="bg-link min-h-[3px] w-full rounded-t-[3px] opacity-85"
                  style={{ height: `${Math.max(4, (count / maxYearCount) * 100)}%` }}
                  aria-hidden="true"
                />
              </div>
              <span className="text-ink-3 font-mono text-[9.5px] leading-none">
                {year.slice(-2)}
              </span>
            </div>
          ))}
        </div>
      </section>

      <div className="border-rule mb-[24px] flex flex-wrap items-start justify-between gap-4 border-b pb-4">
        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2.5">
          <span className="text-ink-3 font-mono text-[10.5px] tracking-[0.1em] uppercase">
            Type
          </span>
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => {
                setType(filter);
                setPage(1);
              }}
              className={
                type === filter
                  ? "border-ink bg-ink text-bg cursor-pointer rounded border px-[9px] py-[3px] font-mono text-[11px] transition-colors"
                  : "border-rule bg-bg text-ink-2 hover:border-ink-3 cursor-pointer rounded border px-[9px] py-[3px] font-mono text-[11px] transition-colors"
              }
            >
              {filter}
            </button>
          ))}
        </div>

        <SearchField
          value={query}
          onChange={(q) => {
            setQuery(q);
            setPage(1);
          }}
          placeholder="Search title, author, venue..."
          label="Search publications"
        />
      </div>

      {groupedPublications.map(([year, items]) => (
        <section key={year} className="mb-10">
          <div className="border-rule mb-4 flex flex-wrap items-baseline justify-between gap-3 border-b pb-2">
            <h2 className="text-ink-3 m-0 font-mono text-[11px] font-semibold tracking-[0.16em] uppercase">
              {year}
            </h2>
            <span className="text-ink-3 font-mono text-[11.5px]">
              {items.length} {items.length === 1 ? "paper" : "papers"}
            </span>
          </div>
          <div className="flex flex-col">
            {items.map((publication) => (
              <PublicationItem
                key={publication.id ?? publication.title}
                publication={publication}
                isNew={latestPublicationIds.has(publication.id ?? "")}
              />
            ))}
          </div>
        </section>
      ))}

      {filteredPublications.length === 0 && (
        <div className="border-rule bg-bg-2 text-ink-3 rounded-[10px] border border-dashed p-8 text-center font-serif text-[15px]">
          No papers match your filters.
        </div>
      )}

      {filteredPublications.length > PUBLICATIONS_PER_PAGE && (
        <Pagination
          page={safePage}
          totalPages={totalPages}
          onPageChange={setPage}
          label="Publications pagination"
          className="mt-2"
        />
      )}
    </div>
  );
}

function StatBlock({ value, label }: { value: number; label: string }): JSX.Element {
  return (
    <div>
      <span className="text-ink block font-serif text-[28px] leading-none">{value}</span>
      <span className="text-ink-3 mt-1 block font-mono text-[10.5px] tracking-[0.08em] uppercase">
        {label}
      </span>
    </div>
  );
}
