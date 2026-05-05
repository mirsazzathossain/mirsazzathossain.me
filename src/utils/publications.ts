export type PublicationAuthor = {
  name: string;
};

export type ScholarStats = {
  paper_count?: number;
  total_citations?: number;
  h_index?: number;
  h_index_5y?: number;
  i10_index?: number;
  cites_per_year?: Record<string, number>;
  updated?: string;
};

export type Publication = {
  id?: string;
  type?: string;
  status?: string;
  featured?: boolean;
  award?: string;
  title?: string;
  authors?: PublicationAuthor[];
  year?: string | number;
  month?: string | number;
  venue?: string;
  venue_short?: string;
  venue_citation?: string;
  rank?: string;
  volume?: string;
  issue?: string;
  pages?: string;
  doi?: string;
  pdf?: string;
  url?: string;
  code?: string;
  slides?: string;
  poster?: string;
  video?: string;
  supplement?: string;
  figure?: string;
  keywords?: string | string[];
  abstract?: string;
  bibtex?: string;
  citation_count?: number | string;
  citation_updated?: string;
};

export type PublicationKind =
  | "Conference"
  | "Journal"
  | "Preprint"
  | "Workshop";
export type PublicationFilter = PublicationKind | "All";

export const PUBLICATION_FILTERS: PublicationFilter[] = [
  "All",
  "Conference",
  "Journal",
  "Preprint",
  "Workshop",
];

export function getPublicationType(publication: Publication): PublicationKind {
  const status = publication.status?.toLowerCase() ?? "";
  const type = publication.type?.toLowerCase() ?? "";

  if (status === "preprint") return "Preprint";
  if (status === "under_review") return "Preprint";
  const venueText =
    `${publication.venue ?? ""} ${publication.venue_short ?? ""}`.toLowerCase();
  if (venueText.includes("workshop")) return "Workshop";
  if (venueText.includes("arxiv")) return "Preprint";
  if (type === "workshop") return "Workshop";
  if (type === "preprint") return "Preprint";
  if (type === "conference" || type === "inproceedings") return "Conference";

  const text = [publication.venue, publication.venue_short, publication.type]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  if (text.includes("workshop") || text.includes("dlia")) return "Workshop";
  if (text.includes("arxiv")) return "Preprint";
  if (
    publication.type === "inproceedings" ||
    text.includes("conference") ||
    text.includes("proceedings") ||
    text.includes("icip") ||
    text.includes("ijcnn") ||
    text.includes("ijcai") ||
    text.includes("wacv") ||
    text.includes("findings")
  ) {
    return "Conference";
  }

  return "Journal";
}

export function getVenueShort(publication: Publication): string {
  if (publication.venue_short) return publication.venue_short;

  const venue =
    publication.venue ||
    publication.booktitle ||
    publication.journal ||
    "Preprint";
  const text = venue.toLowerCase();

  if (text.includes("icip")) return `ICIP ${publication.year ?? ""}`.trim();
  if (text.includes("ijcnn")) return `IJCNN ${publication.year ?? ""}`.trim();
  if (text.includes("ijcai")) return `IJCAI ${publication.year ?? ""}`.trim();
  if (text.includes("astronomy & astrophysics")) return "A&A";
  if (text.includes("procedia")) return "Procedia";

  return venue;
}

export function getVenueLong(publication: Publication): string {
  if (publication.venue_citation) return publication.venue_citation;

  const venue =
    publication.venue ||
    (publication.booktitle && publication.booktitle !== "To appear"
      ? publication.booktitle
      : publication.journal || publication.booktitle || "");

  const parts: string[] = [];
  if (venue) parts.push(venue);
  if (publication.pages && publication.pages !== "To appear") {
    parts.push(`pp. ${publication.pages}`);
  }

  return parts.join(" — ") || "Preprint";
}

export function getPublicationRank(publication: Publication): string | null {
  if (publication.rank) return publication.rank;
  return null;
}

export function hasCitationCount(publication: Publication): boolean {
  return publication.citation_count !== undefined;
}

export function getCitationCount(publication: Publication): number {
  const parsed = Number(publication.citation_count ?? 0);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function getAuthors(
  publication: Publication,
): Array<PublicationAuthor & { isHighlighted: boolean }> {
  if (publication.authors && publication.authors.length > 0) {
    return publication.authors.map((a) => ({
      ...a,
      name: a.name,
      isHighlighted:
        (a.name.includes("M.S.") && a.name.includes("Hossain")) ||
        a.name.includes("Mir Sazzat"),
    }));
  }
  return [];
}

export function buildBibtex(publication: Publication): string {
  if (publication.bibtex) return publication.bibtex;

  const kind =
    publication.type === "inproceedings" ? "inproceedings" : "article";
  const id = publication.id || `hossain${publication.year}`;
  const venueField = kind === "inproceedings" ? "booktitle" : "journal";
  const venue =
    publication.venue || publication.booktitle || publication.journal || "";
  const authorStr = publication.authors?.map((a) => a.name).join(" and ") ?? "";

  return `@${kind}{${id},
  title     = {${publication.title ?? ""}},
  author    = {${authorStr}},
  ${venueField} = {${venue}},
  year      = {${publication.year ?? ""}}
}`;
}

export function normalizeDoi(doi: string): string {
  return doi.startsWith("http") ? doi : `https://doi.org/${doi}`;
}

export function getPublicationKeywords(publication: Publication): string[] {
  if (!publication.keywords) return [];
  if (Array.isArray(publication.keywords)) return publication.keywords;
  return publication.keywords
    .split(/[;,]/)
    .map((k) => k.trim())
    .filter(Boolean);
}

export function getPublicationChartHeightClass(
  count: number,
  maxCount: number,
): string {
  const ratio = maxCount > 0 ? count / maxCount : 0;

  if (ratio >= 0.9) return "h-full";
  if (ratio >= 0.75) return "h-3/4";
  if (ratio >= 0.6) return "h-3/5";
  if (ratio >= 0.5) return "h-1/2";
  if (ratio >= 0.33) return "h-1/3";
  if (ratio >= 0.25) return "h-1/4";
  return "h-[12%]";
}

export function sortPublicationsByDate(
  publications: Publication[],
): Publication[] {
  return [...publications].sort((a, b) => {
    const yearDiff = Number(b.year ?? 0) - Number(a.year ?? 0);
    if (yearDiff !== 0) return yearDiff;

    const monthDiff = getSortableMonth(b) - getSortableMonth(a);
    if (monthDiff !== 0) return monthDiff;

    return String(a.title ?? "").localeCompare(String(b.title ?? ""));
  });
}

function getSortableMonth(publication: Publication): number {
  return publication.month === undefined || publication.month === null
    ? 0
    : Number(publication.month);
}

export function mergePublicationOverrides(
  publications: Publication[],
  overrides: Partial<Publication>[],
): Publication[] {
  const publicationIds = new Set(publications.map((publication) => publication.id));
  const overrideMap = new Map(
    overrides
      .filter((override) => override.id)
      .map((override) => [override.id, override]),
  );
  const mergedPublications = publications.map((pub) => {
    const override = overrideMap.get(pub.id);
    return override ? { ...pub, ...override } : pub;
  });

  const localPublications = overrides.filter(
    (override): override is Publication =>
      Boolean(override.id) && !publicationIds.has(override.id),
  );

  return [...mergedPublications, ...localPublications];
}

// Legacy support — kept only for the Astro page that still passes booktitle/journal
export type LegacyPublication = Publication & {
  author?: string;
  journal?: string;
  booktitle?: string;
  note?: string;
  raw?: string;
  citations?: number | string;
  citationCount?: number | string;
  issn?: string;
  location?: string;
};
