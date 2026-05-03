export type Publication = {
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

export type PublicationKind = "Conference" | "Journal" | "Preprint" | "Workshop";
export type PublicationFilter = PublicationKind | "All";

export const PUBLICATION_FILTERS: PublicationFilter[] = [
  "All",
  "Conference",
  "Journal",
  "Preprint",
  "Workshop",
];

export function getPublicationType(publication: Publication): PublicationKind {
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

export function getVenueShort(publication: Publication): string {
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

export function getVenueLong(publication: Publication): string {
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

export function getPublicationRank(publication: Publication): string | null {
  const venue = `${publication.journal ?? ""} ${publication.booktitle ?? ""}`.toLowerCase();

  if (venue.includes("ijcai")) return "CORE A*";
  if (venue.includes("icip")) return "CORE B";
  if (venue.includes("ijcnn")) return "CORE C";
  if (venue.includes("astronomy & astrophysics")) return "Q1";

  return null;
}

export function hasCitationCount(publication: Publication): boolean {
  return (
    publication.citation_count !== undefined ||
    publication.citations !== undefined ||
    publication.citationCount !== undefined
  );
}

export function getCitationCount(publication: Publication): number {
  const value =
    publication.citation_count ??
    publication.citations ??
    publication.citationCount ??
    0;
  const parsed = Number(value);

  return Number.isFinite(parsed) ? parsed : 0;
}

export function buildBibtex(publication: Publication): string {
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

export function normalizeDoi(doi: string): string {
  return doi.startsWith("http") ? doi : `https://doi.org/${doi}`;
}

export function parsePublicationAuthors(authorList: string | undefined): Array<{
  name: string;
  isHighlighted: boolean;
}> {
  if (!authorList) return [];

  return authorList.split(" and ").map((author) => {
    const name = author
      .trim()
      .replace(/\s+/g, " ")
      .replace(/\s*,\s*$/, "");

    return {
      name,
      isHighlighted: name.includes("M.S.") && name.includes("Hossain"),
    };
  });
}

export function getPublicationChartHeightClass(count: number, maxCount: number): string {
  const ratio = maxCount > 0 ? count / maxCount : 0;

  if (ratio >= 0.9) return "h-full";
  if (ratio >= 0.75) return "h-3/4";
  if (ratio >= 0.6) return "h-3/5";
  if (ratio >= 0.5) return "h-1/2";
  if (ratio >= 0.33) return "h-1/3";
  if (ratio >= 0.25) return "h-1/4";
  return "h-[12%]";
}
