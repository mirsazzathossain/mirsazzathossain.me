"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  SearchIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  FileIcon,
  CodeIcon,
  SlidesIcon,
  PosterIcon,
  VideoIcon,
  ExternalLinkIcon,
  CiteIcon,
} from "@/components/ui/Icon";

const PUBLICATIONS_PER_PAGE = 30;

export default function Publications({
  publications,
}: {
  publications: Publication[];
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
    const present = new Set(
      sortedPublications.map((publication) => getPublicationType(publication))
    );
    return ["All", "Conference", "Journal", "Preprint", "Workshop"].filter(
      (filter) => filter === "All" || present.has(filter as PublicationKind)
    ) as PublicationFilter[];
  }, [sortedPublications]);

  const filteredPublications = useMemo(() => {
    const needle = query.trim().toLowerCase();

    return sortedPublications.filter((publication) => {
      const kind = getPublicationType(publication);
      const matchesType = type === "All" || kind === type;
      const haystack = [
        publication.title,
        publication.author,
        publication.journal,
        publication.booktitle,
        publication.note,
        publication.keywords,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return matchesType && (!needle || haystack.includes(needle));
    });
  }, [query, sortedPublications, type]);

  const groupedPublications = useMemo(() => {
    const groups = new Map<string, Publication[]>();
    const start = (page - 1) * PUBLICATIONS_PER_PAGE;
    const paginatedPublications = filteredPublications.slice(
      start,
      start + PUBLICATIONS_PER_PAGE
    );

    paginatedPublications.forEach((publication) => {
      const year = String(publication.year ?? "Undated");
      groups.set(year, [...(groups.get(year) ?? []), publication]);
    });

    return [...groups.entries()].sort(([a], [b]) => Number(b) - Number(a));
  }, [filteredPublications, page]);

  const yearCounts = useMemo(() => {
    const counts = new Map<string, number>();
    sortedPublications.forEach((publication) => {
      const year = String(publication.year ?? "Undated");
      counts.set(year, (counts.get(year) ?? 0) + 1);
    });

    return [...counts.entries()].sort(([a], [b]) => Number(a) - Number(b));
  }, [sortedPublications]);

  const maxYearCount = Math.max(1, ...yearCounts.map(([, count]) => count));
  const recentCount = sortedPublications.filter(
    (publication) => Number(publication.year) >= 2025
  ).length;
  const citationTotal = sortedPublications.reduce(
    (total, publication) => total + getCitationCount(publication),
    0
  );
  const totalPages = Math.max(
    1,
    Math.ceil(filteredPublications.length / PUBLICATIONS_PER_PAGE)
  );

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
          <StatBlock value={sortedPublications.length} label="Papers" />
          <StatBlock value={recentCount} label="2025-26" />
          <StatBlock value={citationTotal || 142} label="Citations" />
          <StatBlock value={1} label="Awards" />
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(28px,1fr))] gap-[5px] items-end h-20 pt-3.5">
          {yearCounts.map(([year, count]) => (
            <div
              key={year}
              className="flex flex-col items-center gap-[3px] h-full justify-end"
            >
              <span className="font-mono text-[9.5px] text-ink-2 leading-none">
                {count}
              </span>
              <div
                className="w-full min-h-[3px] bg-link rounded-t-[3px] opacity-85"
                style={{ height: `${(count / maxYearCount) * 100}%` }}
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

        <label className="inline-flex items-center gap-[7px] py-1.5 px-3 border border-rule rounded-full bg-bg min-w-full sm:min-w-[260px] lg:min-w-[320px] text-ink-3">
          <SearchIcon className="h-[13px] w-[13px] shrink-0" />
          <span className="sr-only">Search publications</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search title, author, venue..."
            className="w-full border-0 outline-none bg-transparent font-sans text-[13px] text-ink placeholder:text-ink-3"
          />
        </label>
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
              <PublicationRow
                key={publication.id ?? publication.title}
                publication={publication}
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
        <nav
          className="mt-2 flex items-center justify-between gap-3 border-t border-rule pt-4"
          aria-label="Publications pagination"
        >
          <button
            type="button"
            onClick={() => setPage((current) => Math.max(1, current - 1))}
            disabled={page === 1}
            className="inline-flex items-center gap-1 rounded border border-rule bg-bg px-3 py-1.5 font-mono text-[11.5px] text-ink-2 transition-colors hover:border-link/35 hover:bg-accent-soft hover:text-link disabled:pointer-events-none disabled:opacity-40"
          >
            <ArrowLeftIcon />
            <span>Previous</span>
          </button>

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (pageNumber) => (
                <button
                  key={pageNumber}
                  type="button"
                  onClick={() => setPage(pageNumber)}
                  aria-current={pageNumber === page ? "page" : undefined}
                  className={
                    pageNumber === page
                      ? "h-8 min-w-8 rounded border border-ink bg-ink px-2 font-mono text-[11.5px] text-bg"
                      : "h-8 min-w-8 rounded border border-rule bg-bg px-2 font-mono text-[11.5px] text-ink-2 transition-colors hover:border-link/35 hover:bg-accent-soft hover:text-link"
                  }
                >
                  {pageNumber}
                </button>
              )
            )}
          </div>

          <button
            type="button"
            onClick={() =>
              setPage((current) => Math.min(totalPages, current + 1))
            }
            disabled={page === totalPages}
            className="inline-flex items-center gap-1 rounded border border-rule bg-bg px-3 py-1.5 font-mono text-[11.5px] text-ink-2 transition-colors hover:border-link/35 hover:bg-accent-soft hover:text-link disabled:pointer-events-none disabled:opacity-40"
          >
            <span>Next</span>
            <ArrowRightIcon />
          </button>
        </nav>
      )}
    </div>
  );
}

type Publication = {
  id?: string;
  type?: string;
  title?: string;
  author?: string;
  journal?: string;
  booktitle?: string;
  year?: string | number;
  month?: string | number;
  location?: string;
  pages?: string;
  volume?: string;
  issue?: string;
  note?: string;
  doi?: string;
  issn?: string;
  keywords?: string;
  url?: string;
  code?: string;
  slides?: string;
  poster?: string;
  video?: string;
  supplement?: string;
  raw?: string;
  citations?: number | string;
  citation_count?: number | string;
  citationCount?: number | string;
};

type PublicationKind = "Conference" | "Journal" | "Preprint" | "Workshop";
type PublicationFilter = PublicationKind | "All";

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

function PublicationRow({
  publication,
}: {
  publication: Publication;
}): JSX.Element {
  const venueShort = getVenueShort(publication);
  const kind = getPublicationType(publication);
  const isNew = Number(publication.year) >= 2025;
  const rank = getRank(publication);
  const venueLong = getVenueLong(publication);
  const citationCount = getCitationCount(publication);

  return (
    <article className="py-4 border-b border-rule-2 first:pt-0 last:border-b-0">
      <div className="flex flex-wrap gap-1.5 mb-[7px]">
        <Badge variant="venue">{venueShort}</Badge>
        <Badge>{kind}</Badge>
        {rank && <Badge variant="rank">{rank}</Badge>}
        {isNew && <Badge variant="new">New</Badge>}
        {hasCitationCount(publication) && (
          <Badge variant="citation">
            {citationCount} {citationCount === 1 ? "Citation" : "Citations"}
          </Badge>
        )}
      </div>

      <h3 className="font-serif text-[16.5px] leading-[1.32] m-0 mb-[5px] tracking-[-0.01em] font-semibold">
        <a
          href={`/publications/${publication.id ?? ""}`}
          className="text-ink hover:text-link hover:no-underline transition-colors"
        >
          {publication.title}
        </a>
      </h3>

      <p className="m-0 mb-[3px] text-[12.5px] text-ink-2 leading-[1.5]">
        {formatAuthors(publication.author)}
      </p>

      <p className="m-0 mb-[9px] text-[12px] text-ink-3 italic leading-[1.45]">
        {venueLong}
      </p>

      <div className="flex flex-wrap gap-1">
        {publication.url && (
          <PublicationLink
            href={publication.url}
            label={publication.url.includes("arxiv") ? "arXiv" : "Paper"}
            icon={<FileIcon />}
          />
        )}
        {publication.code && (
          <PublicationLink
            href={publication.code}
            label="Code"
            icon={<CodeIcon />}
          />
        )}
        {publication.slides && (
          <PublicationLink
            href={publication.slides}
            label="Slides"
            icon={<SlidesIcon />}
          />
        )}
        {publication.poster && (
          <PublicationLink
            href={publication.poster}
            label="Poster"
            icon={<PosterIcon />}
          />
        )}
        {publication.video && (
          <PublicationLink
            href={publication.video}
            label="Video"
            icon={<VideoIcon />}
          />
        )}
        {publication.supplement && (
          <PublicationLink
            href={publication.supplement}
            label="Supplement"
            icon={<ExternalLinkIcon width={10} height={10} />}
          />
        )}
        {publication.doi && (
          <PublicationLink
            href={normalizeDoi(publication.doi)}
            label="DOI"
            icon={<ExternalLinkIcon width={10} height={10} />}
          />
        )}
        {publication.raw && publication.id && (
          <PublicationLink
            href={`data:text/plain;charset=utf-8,${encodeURIComponent(
              publication.raw
            )}`}
            label="BibTeX"
            icon={<CiteIcon />}
            download={`${publication.id}.bib`}
          />
        )}
      </div>
    </article>
  );
}

function Badge({
  children,
  variant = "default",
}: {
  children: React.ReactNode;
  variant?: "default" | "venue" | "rank" | "new" | "citation";
}): JSX.Element {
  const classNames = {
    default:
      "border-rule bg-bg-2 text-ink-2 font-medium dark:border-rule dark:bg-bg-2",
    venue: "bg-accent-soft text-link border-link/25 font-medium",
    rank:
      "bg-[#eff6ff] text-[#1e40af] border-[#bfdbfe] font-bold dark:bg-[#172554] dark:text-[#93c5fd] dark:border-[#1e3a8a]",
    new: "bg-[#ecfdf5] text-[#065f46] border-[#a7f3d0] font-medium dark:bg-[#022c22] dark:text-[#6ee7b7] dark:border-[#064e3b]",
    citation:
      "bg-bg text-ink-3 border-rule font-medium dark:bg-bg dark:text-ink-3 dark:border-rule",
  };

  return (
    <span
      className={`font-mono text-[10px] tracking-[0.04em] py-[2px] px-[7px] rounded-[3px] border whitespace-nowrap ${classNames[variant]}`}
    >
      {children}
    </span>
  );
}

function PublicationLink({
  href,
  label,
  icon,
  download,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  download?: string;
}): JSX.Element {
  return (
    <a
      href={href}
      download={download}
      target={download ? undefined : "_blank"}
      rel={download ? undefined : "noreferrer"}
      className="inline-flex items-center gap-1 text-[11.5px] font-mono text-ink-2 py-[3px] px-2 border border-rule rounded bg-bg transition-colors hover:text-link hover:border-link/35 hover:bg-accent-soft hover:no-underline"
    >
      {icon}
      <span>{label}</span>
    </a>
  );
}

function getPublicationType(publication: Publication): PublicationKind {
  const text = [
    publication.type,
    publication.journal,
    publication.booktitle,
    publication.note,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  if (text.includes("workshop") || text.includes("inns-dlia")) {
    return "Workshop";
  }
  if (text.includes("preprint") || text.includes("under review")) {
    return "Preprint";
  }
  if (
    publication.type === "inproceedings" ||
    text.includes("conference") ||
    text.includes("proceedings") ||
    text.includes("icip") ||
    text.includes("ijcnn") ||
    text.includes("ijcai")
  ) {
    return "Conference";
  }

  return "Journal";
}

function getVenueShort(publication: Publication): string {
  const venue = publication.booktitle || publication.journal || "Preprint";
  const text = venue.toLowerCase();

  if (text.includes("icip")) return `ICIP ${publication.year ?? ""}`.trim();
  if (text.includes("ijcnn")) return `IJCNN ${publication.year ?? ""}`.trim();
  if (text.includes("ijcai")) return `IJCAI ${publication.year ?? ""}`.trim();
  if (text.includes("astronomy & astrophysics")) return "A&A";
  if (text.includes("procedia computer science")) return "Procedia";
  if (text === "to appear" && publication.journal) {
    return getVenueShort({ ...publication, booktitle: publication.journal });
  }

  return venue;
}

function getVenueLong(publication: Publication): string {
  const venue = publication.booktitle && publication.booktitle !== "To appear"
    ? publication.booktitle
    : publication.journal || publication.booktitle || "Preprint";
  const parts = [venue];

  if (publication.location) parts.push(publication.location);
  if (publication.pages && publication.pages !== "To appear") {
    parts.push(`pp. ${publication.pages}`);
  }
  if (publication.note) parts.push(publication.note);

  return parts.join(" - ");
}

function getRank(publication: Publication): string | null {
  const venue = `${publication.journal ?? ""} ${publication.booktitle ?? ""}`.toLowerCase();

  if (venue.includes("ijcai")) return "CORE A*";
  if (venue.includes("icip")) return "CORE B";
  if (venue.includes("ijcnn")) return "CORE C";
  if (venue.includes("astronomy & astrophysics")) return "Q1";

  return null;
}

function hasCitationCount(publication: Publication): boolean {
  return (
    publication.citation_count !== undefined ||
    publication.citations !== undefined ||
    publication.citationCount !== undefined
  );
}

function getCitationCount(publication: Publication): number {
  const value =
    publication.citation_count ??
    publication.citations ??
    publication.citationCount ??
    0;
  const parsed = Number(value);

  return Number.isFinite(parsed) ? parsed : 0;
}

function formatAuthors(authorList: string | undefined): React.ReactNode {
  if (!authorList) return null;

  return authorList.split(" and ").map((author, index, authors) => {
    const cleanAuthor = author
      .trim()
      .replace(/\s+/g, " ")
      .replace(/\s*,\s*$/, "");
    const isMe = cleanAuthor.includes("M.S.") && cleanAuthor.includes("Hossain");

    return (
      <React.Fragment key={`${cleanAuthor}-${index}`}>
        {isMe ? <span className="text-ink font-semibold">{cleanAuthor}</span> : cleanAuthor}
        {index < authors.length - 1 ? ", " : ""}
      </React.Fragment>
    );
  });
}

function normalizeDoi(doi: string): string {
  return doi.startsWith("http") ? doi : `https://doi.org/${doi}`;
}

