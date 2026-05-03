import React from "react";
import {
  CodeIcon,
  CopyIcon,
  ExternalLinkIcon,
  FileIcon,
  PosterIcon,
  SlidesIcon,
  VideoIcon,
} from "@/components/Icons";
import {
  buildBibtex,
  getCitationCount,
  getPublicationType,
  getVenueLong,
  getVenueShort,
  normalizeDoi,
  parsePublicationAuthors,
  type Publication,
} from "@/utils/publications";

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
                <SideLink href={publication.url} label="Paper PDF" icon={<FileIcon className="h-[11px] w-[11px]" />} />
              )}
              {publication.code && (
                <SideLink href={publication.code} label="Code" icon={<CodeIcon className="h-[11px] w-[11px]" />} />
              )}
              {publication.slides && (
                <SideLink href={publication.slides} label="Slides" icon={<SlidesIcon className="h-[11px] w-[11px]" />} />
              )}
              {publication.poster && (
                <SideLink href={publication.poster} label="Poster" icon={<PosterIcon className="h-[11px] w-[11px]" />} />
              )}
              {publication.video && (
                <SideLink href={publication.video} label="Talk video" icon={<VideoIcon className="h-[11px] w-[11px]" />} />
              )}
              {publication.doi && (
                <SideLink href={normalizeDoi(publication.doi)} label="DOI" icon={<ExternalLinkIcon className="h-2.5 w-2.5" />} />
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
      <CopyIcon className="h-[11px] w-[11px]" />
      <span data-copy-label>Copy</span>
    </button>
  );
}

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

function formatAuthors(authorList: string | undefined): React.ReactNode {
  const authors = parsePublicationAuthors(authorList);
  return authors.map((author, index) => {
    return (
      <React.Fragment key={`${author.name}-${index}`}>
        {author.isHighlighted ? (
          <span className="font-semibold text-ink">
            {author.name}
            <sup className="ml-0.5 font-mono text-[9px] text-link">1</sup>
          </span>
        ) : (
          author.name
        )}
        {index < authors.length - 1 ? ", " : ""}
      </React.Fragment>
    );
  });
}
