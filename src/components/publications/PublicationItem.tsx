import React from "react";
import {
  CiteIcon,
  CodeIcon,
  ExternalLinkIcon,
  FileIcon,
  PosterIcon,
  SlidesIcon,
  VideoIcon,
} from "@/components/Icons";
import {
  buildBibtex,
  getCitationCount,
  getAuthors,
  getPublicationRank,
  getPublicationType,
  getVenueLong,
  getVenueShort,
  hasCitationCount,
  normalizeDoi,
  type Publication,
} from "@/utils/publications";

type PublicationItemProps = {
  publication: Publication;
  showCitations?: boolean;
  isNew?: boolean;
};

export function PublicationItem({
  publication,
  showCitations = true,
  isNew = false,
}: PublicationItemProps): JSX.Element {
  const citationCount = getCitationCount(publication);
  const rank = getPublicationRank(publication);

  return (
    <article className="min-h-[142px] py-4 border-b border-rule-2 first:pt-0 last:border-b-0">
      <div className="flex flex-wrap gap-1.5 mb-[7px]">
        <PublicationBadge variant="venue">
          {getVenueShort(publication)}
        </PublicationBadge>
        <PublicationBadge>{getPublicationType(publication)}</PublicationBadge>
        {publication.award && (
          <PublicationBadge variant="award">{publication.award}</PublicationBadge>
        )}
        {rank && <PublicationBadge variant="rank">{rank}</PublicationBadge>}
        {isNew && <PublicationBadge variant="new">New</PublicationBadge>}
        {publication.status === "accepted" && (
          <PublicationBadge variant="status">Accepted</PublicationBadge>
        )}
        {publication.status === "under_review" && (
          <PublicationBadge variant="status">Under Review</PublicationBadge>
        )}
        {publication.status === "in_preparation" && (
          <PublicationBadge variant="status">In Preparation</PublicationBadge>
        )}
        {publication.status === "submitted" && (
          <PublicationBadge variant="status">Submitted</PublicationBadge>
        )}
        {showCitations && hasCitationCount(publication) && citationCount > 0 && (
          <PublicationBadge variant="citation">
            {citationCount} {citationCount === 1 ? "Citation" : "Citations"}
          </PublicationBadge>
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

      <PublicationAuthors publication={publication} />

      <p className="m-0 mb-[9px] text-[12px] text-ink-3 italic leading-[1.45]">
        {getVenueLong(publication)}
      </p>

      <PublicationActions publication={publication} />
    </article>
  );
}

export function PublicationBadge({
  children,
  variant = "default",
}: {
  children: React.ReactNode;
  variant?: "default" | "venue" | "rank" | "new" | "citation" | "status" | "award";
}): JSX.Element {
  const variantClass = {
    default: "border-rule bg-bg-2 text-ink-2 font-medium",
    venue: "bg-accent-soft text-link border-link/25 font-medium",
    rank: "bg-blue-50 text-blue-800 border-blue-200 font-bold dark:bg-blue-950 dark:text-blue-300 dark:border-blue-900",
    new: "bg-emerald-50 text-emerald-800 border-emerald-200 font-medium dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-900",
    citation: "bg-bg text-ink-3 border-rule font-medium",
    status: "bg-amber-50 text-amber-800 border-amber-200 font-medium dark:bg-amber-950 dark:text-amber-300 dark:border-amber-900",
    award: "bg-amber-50 text-amber-900 border-amber-300 font-bold dark:bg-amber-950 dark:text-amber-200 dark:border-amber-800",
  }[variant];

  return (
    <span
      className={`font-mono text-[10px] tracking-[0.04em] py-[2px] px-[7px] rounded-[3px] border whitespace-nowrap ${variantClass}`}
    >
      {children}
    </span>
  );
}

function PublicationAuthors({
  publication,
}: {
  publication: Publication;
}): JSX.Element | null {
  const authors = getAuthors(publication);
  if (!authors.length) return null;

  return (
    <p className="m-0 mb-[3px] text-[12.5px] text-ink-2 leading-[1.5]">
      {authors.map((author, index) => (
        <React.Fragment key={`${author.name}-${index}`}>
          {author.isHighlighted ? (
            <span className="text-ink font-semibold">{author.name}</span>
          ) : (
            author.name
          )}
          {index < authors.length - 1 ? ", " : ""}
        </React.Fragment>
      ))}
    </p>
  );
}

function PublicationActions({
  publication,
}: {
  publication: Publication;
}): JSX.Element {
  const pdfHref = publication.pdf || publication.url;
  const pdfLabel = (pdfHref ?? "").includes("arxiv") ? "arXiv" : "PDF";
  const hasSecondarLink =
    publication.pdf && publication.url && publication.pdf !== publication.url;
  const bibtex = buildBibtex(publication);

  return (
    <div className="flex flex-wrap gap-1">
      {pdfHref && (
        <PublicationActionLink
          href={pdfHref}
          label={pdfLabel}
          icon={<FileIcon className="w-3 h-3" />}
        />
      )}
      {hasSecondarLink && (
        <PublicationActionLink
          href={publication.url!}
          label="Link"
          icon={<ExternalLinkIcon className="w-3 h-3" />}
        />
      )}
      {publication.code && (
        <PublicationActionLink
          href={publication.code}
          label="Code"
          icon={<CodeIcon className="w-3 h-3" />}
        />
      )}
      {publication.slides && (
        <PublicationActionLink
          href={publication.slides}
          label="Slides"
          icon={<SlidesIcon className="w-3 h-3" />}
        />
      )}
      {publication.poster && (
        <PublicationActionLink
          href={publication.poster}
          label="Poster"
          icon={<PosterIcon className="w-3 h-3" />}
        />
      )}
      {publication.video && (
        <PublicationActionLink
          href={publication.video}
          label="Video"
          icon={<VideoIcon className="w-3 h-3" />}
        />
      )}
      {publication.supplement && (
        <PublicationActionLink
          href={publication.supplement}
          label="Supplement"
          icon={<ExternalLinkIcon className="w-3 h-3" />}
        />
      )}
      {publication.doi && (
        <PublicationActionLink
          href={normalizeDoi(publication.doi)}
          label="DOI"
          icon={<ExternalLinkIcon className="w-3 h-3" />}
        />
      )}
      {publication.id && (
        <PublicationActionLink
          href={`data:text/plain;charset=utf-8,${encodeURIComponent(bibtex)}`}
          label="BibTeX"
          icon={<CiteIcon className="w-3 h-3" />}
          download={`${publication.id}.bib`}
        />
      )}
    </div>
  );
}

export function PublicationActionLink({
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
