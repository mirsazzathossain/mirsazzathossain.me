import React from "react";

export default function PublicationDetail({
  publication,
}: {
  publication: Publication;
}): JSX.Element {
  const venueShort = getVenueShort(publication);
  const kind = getPublicationType(publication);
  const venueLong = getVenueLong(publication);
  const keywords = publication.keywords
    ?.split(/[;,]/)
    .map((keyword) => keyword.trim())
    .filter(Boolean)
    .slice(0, 8);
  const citationCount = getCitationCount(publication);
  const bibtex = publication.raw || buildBibtex(publication);

  return (
    <article>
      <a
        href="/publications"
        className="mb-3.5 inline-block font-mono text-[12px] text-ink-3 transition-colors hover:text-link hover:no-underline"
      >
        &larr; All publications
      </a>

      <p className="mb-2 font-mono text-[11px] tracking-[0.14em] uppercase text-ink-3">
        {kind} - {venueShort} - {publication.year}
      </p>
      <h1 className="m-0 mb-3.5 max-w-[900px] font-serif text-[clamp(24px,3.5vw,32px)] font-semibold leading-[1.18] tracking-[-0.018em] text-ink">
        {publication.title}
      </h1>
      <p className="m-0 mb-1.5 max-w-[900px] text-[14px] leading-[1.55] text-ink-2">
        {formatAuthors(publication.author)}
      </p>
      <div className="mb-2.5 max-w-[900px] border-l-2 border-link/30 pl-3 text-[12.5px] leading-[1.55] text-ink-2">
        <span className="align-super font-mono text-[9px] text-link">1</span>
        <span className="ml-1">
          Center for Computational &amp; Data Sciences, Independent University,
          Bangladesh
        </span>
      </div>
      <p className="m-0 mb-[18px] max-w-[900px] text-[13px] italic text-ink-3">
        {venueLong}
      </p>

      <div className="grid min-w-0 grid-cols-1 items-start gap-9 lg:grid-cols-[minmax(0,1fr)_240px]">
        <div className="min-w-0">
          <div className="mb-[22px] flex aspect-video items-center justify-center rounded border border-dashed border-rule bg-[repeating-linear-gradient(45deg,var(--bg)_0_8px,var(--bg-3)_8px_16px)] font-mono text-[12px] text-ink-3">
            [ teaser figure / system diagram ]
          </div>

          <section className="my-[26px]">
            <h2 className="m-0 mb-2.5 border-b border-rule pb-1.5 font-mono text-[11px] font-semibold tracking-[0.14em] uppercase text-ink-3">
              Abstract
            </h2>
            <p className="m-0 max-w-[65ch] font-serif text-[16px] leading-[1.62] text-ink">
              {publication.abstract ||
                publication.note ||
                "Abstract will be added here once the final paper metadata is available."}
            </p>
          </section>

          {keywords && keywords.length > 0 && (
            <section className="my-[26px]">
              <h2 className="m-0 mb-2.5 border-b border-rule pb-1.5 font-mono text-[11px] font-semibold tracking-[0.14em] uppercase text-ink-3">
                Topics
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {keywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="rounded border border-rule bg-bg-2 px-[7px] py-[2px] font-mono text-[10.5px] text-ink-2"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </section>
          )}

          <section className="my-[26px]">
            <h2 className="m-0 mb-2.5 border-b border-rule pb-1.5 font-mono text-[11px] font-semibold tracking-[0.14em] uppercase text-ink-3">
              Cite
            </h2>
            <div className="block-code group relative my-4 min-w-0 max-w-full">
              <CopyButton />
              <pre className="m-0 max-w-full overflow-x-auto whitespace-pre rounded-[var(--r)] border border-rule bg-bg-2 p-[12px_60px_12px_14px] font-mono text-[12.5px] leading-[1.55] text-ink">
                {bibtex.trim()}
              </pre>
            </div>
          </section>
        </div>

        <aside className="grid min-w-0 gap-3.5 self-start lg:sticky lg:top-20">
          <div className="rounded border border-rule bg-bg-2 px-4 py-3.5">
            <h2 className="m-0 mb-2.5 font-mono text-[10.5px] font-semibold tracking-[0.12em] uppercase text-ink-3">
              Resources
            </h2>
            <div className="grid gap-1.5">
              {publication.url && (
                <SideLink href={publication.url} label="Paper PDF" icon={<FileIcon />} />
              )}
              {publication.code && (
                <SideLink href={publication.code} label="Code" icon={<CodeIcon />} />
              )}
              {publication.slides && (
                <SideLink href={publication.slides} label="Slides" icon={<SlidesIcon />} />
              )}
              {publication.poster && (
                <SideLink href={publication.poster} label="Poster" icon={<PosterIcon />} />
              )}
              {publication.video && (
                <SideLink href={publication.video} label="Talk video" icon={<VideoIcon />} />
              )}
              {publication.doi && (
                <SideLink href={normalizeDoi(publication.doi)} label="DOI" icon={<ExternalIcon />} />
              )}
            </div>
          </div>

          <div className="rounded border border-rule bg-bg-2 px-4 py-3.5">
            <h2 className="m-0 mb-2.5 font-mono text-[10.5px] font-semibold tracking-[0.12em] uppercase text-ink-3">
              Metadata
            </h2>
            <dl className="m-0 grid gap-1 text-[12.5px] leading-[1.7] text-ink-2">
              <MetaItem label="Venue" value={venueShort} />
              <MetaItem label="Year" value={String(publication.year ?? "")} />
              <MetaItem label="Type" value={kind} />
              {publication.pages && publication.pages !== "To appear" && (
                <MetaItem label="Pages" value={publication.pages} />
              )}
              {publication.volume && publication.volume !== "To appear" && (
                <MetaItem label="Volume" value={publication.volume} />
              )}
              {citationCount > 0 && (
                <MetaItem label="Citations" value={String(citationCount)} />
              )}
            </dl>
          </div>
        </aside>
      </div>
    </article>
  );
}

function CopyButton(): JSX.Element {
  return (
    <button
      type="button"
      className="absolute right-2 top-2 inline-flex items-center gap-1 rounded border border-rule bg-bg px-2 py-1 font-mono text-[10.5px] text-ink-3 transition-colors hover:border-link/35 hover:bg-accent-soft hover:text-link"
      data-copy-cite
      aria-label="Copy citation"
    >
      <CopyIcon />
      <span data-copy-label>Copy</span>
    </button>
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
  abstract?: string;
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

function SideLink({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}): JSX.Element {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="flex items-center justify-between gap-3 rounded border border-rule bg-bg px-2.5 py-2 font-mono text-[12px] text-ink transition-colors hover:border-link hover:text-link hover:no-underline"
    >
      <span>{label}</span>
      {icon}
    </a>
  );
}

function MetaItem({
  label,
  value,
}: {
  label: string;
  value: string;
}): JSX.Element {
  return (
    <div className="grid grid-cols-[72px_1fr] gap-2">
      <dt className="font-semibold text-ink">{label}</dt>
      <dd className="m-0 text-ink-2">{value}</dd>
    </div>
  );
}

function getPublicationType(publication: Publication): string {
  const text = [
    publication.type,
    publication.journal,
    publication.booktitle,
    publication.note,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  if (text.includes("workshop") || text.includes("inns-dlia")) return "Workshop";
  if (text.includes("preprint") || text.includes("under review")) return "Preprint";
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
  const venue =
    publication.booktitle && publication.booktitle !== "To appear"
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
        {isMe ? (
          <span className="font-semibold text-ink">
            {cleanAuthor}
            <sup className="ml-0.5 font-mono text-[9px] text-link">1</sup>
          </span>
        ) : (
          cleanAuthor
        )}
        {index < authors.length - 1 ? ", " : ""}
      </React.Fragment>
    );
  });
}

function buildBibtex(publication: Publication): string {
  const kind = publication.type === "inproceedings" ? "inproceedings" : "article";
  const id = publication.id || `hossain${publication.year}`;
  const venueField = kind === "inproceedings" ? "booktitle" : "journal";
  const venue = publication.booktitle || publication.journal || "";

  return `@${kind}{${id},
  title     = {${publication.title ?? ""}},
  author    = {${publication.author ?? ""}},
  ${venueField} = {${venue}},
  year      = {${publication.year ?? ""}}
}`;
}

function normalizeDoi(doi: string): string {
  return doi.startsWith("http") ? doi : `https://doi.org/${doi}`;
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

function FileIcon(): JSX.Element {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}

function CodeIcon(): JSX.Element {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function SlidesIcon(): JSX.Element {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
}

function PosterIcon(): JSX.Element {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
    </svg>
  );
}

function VideoIcon(): JSX.Element {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="23 7 16 12 23 17 23 7" />
      <rect x="1" y="5" width="15" height="14" rx="2" />
    </svg>
  );
}

function ExternalIcon(): JSX.Element {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function CopyIcon(): JSX.Element {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}
