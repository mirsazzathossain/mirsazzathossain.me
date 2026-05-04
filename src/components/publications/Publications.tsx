"use client";
import { PublicationItem } from "@/components/publications/PublicationItem";
import { Pagination } from "@/components/ui/Pagination";
import { SearchField } from "@/components/ui/SearchField";
import {
  getCitationCount,
  getPublicationChartHeightClass,
  getPublicationKeywords,
  getPublicationType,
  PUBLICATION_FILTERS,
  type Publication,
  type PublicationFilter,
  type ScholarStats,
} from "@/utils/publications";
import { useEffect, useMemo, useState } from "react";

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

  const sortedPublications = useMemo(
    () =>
      [...publications].sort((a, b) => {
        const yearDiff = Number(b.year ?? 0) - Number(a.year ?? 0);
        if (yearDiff !== 0) return yearDiff;
        return Number(b.month ?? 0) - Number(a.month ?? 0);
      }),
    [publications]
  );

  const filters = useMemo<PublicationFilter[]>(() => {
    const present = new Set(sortedPublications.map(getPublicationType));
    return PUBLICATION_FILTERS.filter(
      (filter) => filter === "All" || present.has(filter)
    );
  }, [sortedPublications]);

  const latestPublicationIds = useMemo(
    () =>
      new Set(
        sortedPublications
          .slice(0, 3)
          .map((publication) => publication.id)
          .filter(Boolean)
      ),
    [sortedPublications]
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

  const totalPages = Math.max(
    1,
    Math.ceil(filteredPublications.length / PUBLICATIONS_PER_PAGE)
  );

  const groupedPublications = useMemo(() => {
    const groups = new Map<string, Publication[]>();
    const start = (page - 1) * PUBLICATIONS_PER_PAGE;

    filteredPublications
      .slice(start, start + PUBLICATIONS_PER_PAGE)
      .forEach((publication) => {
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

    return entries.length
      ? entries.sort(([a], [b]) => Number(a) - Number(b))
      : paperYearCounts;
  }, [paperYearCounts, stats?.cites_per_year]);

  const maxYearCount = Math.max(1, ...chartCounts.map(([, count]) => count));
  const paperTotal = Number(stats?.paper_count ?? sortedPublications.length);
  const citationTotal = Number(stats?.total_citations ?? 0);
  const h5Index = Number(stats?.h_index_5y ?? stats?.h_index ?? 0);
  const i10Index = Number(stats?.i10_index ?? 0);

  useEffect(() => {
    setPage(1);
  }, [query, type]);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  return (
    <div>
      <header className="mb-8 max-w-[720px]">
        <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-3 m-0 mb-1.5">
          Research
        </p>
        <h1 className="font-serif text-[clamp(28px,4.5vw,42px)] leading-[1.05] tracking-[-0.02em] text-ink font-semibold m-0">
          Publications
        </h1>
        <p className="mt-3 mb-0 text-[15px] text-ink-2 max-w-[60ch]">
          Peer-reviewed papers, workshop contributions, and preprints across
          computer vision, domain adaptation, and astrophysical machine
          learning.
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-7 p-[18px_22px] border border-rule rounded-[10px] bg-bg-2 mb-[26px]">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 content-center">
          <StatBlock value={paperTotal} label="Papers" />
          <StatBlock value={citationTotal} label="Citations" />
          <StatBlock value={h5Index} label="h5-index" />
          <StatBlock value={i10Index} label="i10-index" />
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(28px,1fr))] gap-[5px] items-end h-20 pt-3.5">
          {chartCounts.map(([year, count]) => (
            <div
              key={year}
              className="flex flex-col items-center gap-[3px] h-full justify-end"
            >
              <span className="font-mono text-[9.5px] text-ink-2 leading-none">
                {count}
              </span>
              <div
                className={`w-full min-h-[3px] bg-link rounded-t-[3px] opacity-85 ${getPublicationChartHeightClass(
                  count,
                  maxYearCount
                )}`}
                aria-hidden="true"
              />
              <span className="font-mono text-[9.5px] text-ink-3 leading-none">
                {year.slice(-2)}
              </span>
            </div>
          ))}
        </div>
      </section>

      <div className="flex items-start justify-between gap-4 flex-wrap mb-[24px] pb-4 border-b border-rule">
        <div className="flex min-w-0 flex-1 items-center gap-2.5 flex-wrap">
          <span className="font-mono text-[10.5px] tracking-[0.1em] uppercase text-ink-3">
            Type
          </span>
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setType(filter)}
              className={
                type === filter
                  ? "font-mono text-[11px] py-[3px] px-[9px] rounded border border-ink bg-ink text-bg cursor-pointer transition-colors"
                  : "font-mono text-[11px] py-[3px] px-[9px] rounded border border-rule bg-bg text-ink-2 cursor-pointer transition-colors hover:border-ink-3"
              }
            >
              {filter}
            </button>
          ))}
        </div>

        <SearchField
          value={query}
          onChange={setQuery}
          placeholder="Search title, author, venue..."
          label="Search publications"
        />
      </div>

      {groupedPublications.map(([year, items]) => (
        <section key={year} className="mb-10">
          <div className="flex items-baseline justify-between pb-2 border-b border-rule mb-4 gap-3 flex-wrap">
            <h2 className="font-mono text-[11px] tracking-[0.16em] uppercase text-ink-3 font-semibold m-0">
              {year}
            </h2>
            <span className="font-mono text-[11.5px] text-ink-3">
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
        <div className="border border-dashed border-rule rounded-[10px] bg-bg-2 p-8 text-center font-serif text-[15px] text-ink-3">
          No papers match your filters.
        </div>
      )}

      {filteredPublications.length > PUBLICATIONS_PER_PAGE && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
          label="Publications pagination"
          className="mt-2"
        />
      )}
    </div>
  );
}

function StatBlock({
  value,
  label,
}: {
  value: number;
  label: string;
}): JSX.Element {
  return (
    <div>
      <span className="block font-serif text-[28px] leading-none text-ink">
        {value}
      </span>
      <span className="block text-[10.5px] font-mono tracking-[0.08em] uppercase text-ink-3 mt-1">
        {label}
      </span>
    </div>
  );
}
