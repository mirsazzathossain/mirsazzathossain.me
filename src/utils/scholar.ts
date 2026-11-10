import { getPublicationType, type Publication } from "@/utils/publications";

/** Statuses that must not get scholarly metadata or be indexed. */
export const PENDING_STATUSES = new Set(["under_review", "submitted", "in_preparation"]);

export function isPendingPublication(publication: Publication): boolean {
  return PENDING_STATUSES.has(publication.status ?? "");
}

const ACCENTS: Record<string, string> = {
  '\\"a': "ä",
  '\\"o': "ö",
  '\\"u': "ü",
  "\\'a": "á",
  "\\'e": "é",
  "\\'i": "í",
  "\\'o": "ó",
  "\\'u": "ú",
  "\\`a": "à",
  "\\`e": "è",
  "\\~n": "ñ",
  "\\c{c}": "ç",
};

function cleanLatex(text: string): string {
  let out = text;
  for (const [latex, char] of Object.entries(ACCENTS)) {
    out = out.split(`{${latex}}`).join(char).split(latex).join(char);
  }
  return out.replace(/[{}]/g, "").replace(/\s+/g, " ").trim();
}

/** Reads one `field = {...}` (or "...") value from a BibTeX entry, allowing nested braces. */
export function bibtexField(bibtex: string | undefined, field: string): string | undefined {
  if (!bibtex) return undefined;
  const match = new RegExp(`\\b${field}\\s*=\\s*`, "i").exec(bibtex);
  if (!match) return undefined;
  let i = match.index + match[0].length;
  const open = bibtex[i];
  if (open === '"') {
    const end = bibtex.indexOf('"', i + 1);
    return end > i ? cleanLatex(bibtex.slice(i + 1, end)) : undefined;
  }
  if (open !== "{") {
    const end = bibtex.slice(i).search(/[,\n}]/);
    return cleanLatex(bibtex.slice(i, end === -1 ? undefined : i + end));
  }
  let depth = 0;
  const start = i + 1;
  for (; i < bibtex.length; i++) {
    if (bibtex[i] === "{") depth++;
    else if (bibtex[i] === "}" && --depth === 0) return cleanLatex(bibtex.slice(start, i));
  }
  return undefined;
}

/** Author names in order, as "First Last", from `authors[]` or the BibTeX record. */
export function publicationAuthors(publication: Publication): string[] {
  if (publication.authors?.length) return publication.authors.map((a) => a.name.trim());
  const raw = bibtexField(publication.bibtex, "author");
  if (!raw) return [];
  return raw
    .split(/\s+and\s+/i)
    .map((name) => name.trim())
    .filter((name) => name && !/^others$/i.test(name) && !/et al\.?$/i.test(name))
    .map((name) => {
      const [last, first] = name.split(/\s*,\s*/);
      return first ? `${first} ${last}` : name;
    });
}

export function publicationVenue(publication: Publication): string | undefined {
  return (
    publication.venue ||
    publication.booktitle ||
    publication.journal ||
    bibtexField(publication.bibtex, "booktitle") ||
    bibtexField(publication.bibtex, "journal") ||
    undefined
  );
}

function bareDoi(publication: Publication): string | undefined {
  const doi = publication.doi || bibtexField(publication.bibtex, "doi");
  return doi?.replace(/^https?:\/\/(dx\.)?doi\.org\//i, "").trim() || undefined;
}

function publicationDate(publication: Publication): string | undefined {
  const year = publication.year || bibtexField(publication.bibtex, "year");
  if (!year) return undefined;
  const month = Number(publication.month);
  return month >= 1 && month <= 12 ? `${year}/${String(month).padStart(2, "0")}` : `${year}`;
}

/** Highwire Press tags read by Google Scholar. Empty for pending or author-less records. */
export function citationMeta(publication: Publication, pageUrl: string): [string, string][] {
  const authors = publicationAuthors(publication);
  if (isPendingPublication(publication) || !publication.title || authors.length === 0) return [];

  const tags: [string, string][] = [["citation_title", publication.title]];
  for (const author of authors) tags.push(["citation_author", author]);

  const date = publicationDate(publication);
  if (date) tags.push(["citation_publication_date", date]);

  const kind = getPublicationType(publication);
  const venue = publicationVenue(publication);
  if (venue && !/arxiv/i.test(venue)) {
    tags.push([kind === "Journal" ? "citation_journal_title" : "citation_conference_title", venue]);
  }

  const volume = publication.volume || bibtexField(publication.bibtex, "volume");
  if (volume) tags.push(["citation_volume", volume]);

  const pages = publication.pages || bibtexField(publication.bibtex, "pages");
  if (pages && !/appear/i.test(pages)) {
    const [first, last] = pages.split(/\s*[-–—]+\s*/);
    if (first) tags.push(["citation_firstpage", first]);
    if (last) tags.push(["citation_lastpage", last]);
  }

  const doi = bareDoi(publication);
  if (doi) tags.push(["citation_doi", doi]);

  tags.push(["citation_abstract_html_url", pageUrl]);
  return tags;
}

/** ScholarlyArticle node; null for pending or author-less records. */
export function scholarlyArticleNode(
  publication: Publication,
  pageUrl: string,
  personId: string,
  description: string,
) {
  const authors = publicationAuthors(publication);
  if (isPendingPublication(publication) || !publication.title || authors.length === 0) return null;

  const venue = publicationVenue(publication);
  const doi = bareDoi(publication);
  const date = publicationDate(publication)?.replace("/", "-");
  const sameAs = [doi && `https://doi.org/${doi}`, publication.url].filter(Boolean) as string[];

  return {
    "@type": "ScholarlyArticle",
    "@id": `${pageUrl}#article`,
    headline: publication.title,
    name: publication.title,
    url: pageUrl,
    description,
    ...(publication.abstract && { abstract: publication.abstract }),
    author: authors.map((name) =>
      /mir sazzat|^m\.? ?s\.? hossain$/i.test(name)
        ? { "@id": personId, name }
        : { "@type": "Person", name },
    ),
    ...(date && { datePublished: date }),
    ...(venue &&
      !/arxiv/i.test(venue) && {
        isPartOf: {
          "@type": getPublicationType(publication) === "Journal" ? "Periodical" : "CreativeWork",
          name: venue,
        },
      }),
    ...(doi && {
      identifier: { "@type": "PropertyValue", propertyID: "DOI", value: doi },
    }),
    ...(sameAs.length && { sameAs }),
    inLanguage: "en",
  };
}

/** Short meta description: first sentence of the abstract plus venue and year. */
export function publicationDescription(publication: Publication): string {
  const venue = publication.venue_short || publicationVenue(publication) || "";
  const year = publication.year || bibtexField(publication.bibtex, "year") || "";
  const suffix = venue.includes(String(year)) ? venue : [venue, year].filter(Boolean).join(" ");
  const tail = suffix ? ` (${suffix})` : "";
  const abstract = publication.abstract?.replace(/\s+/g, " ").trim();
  if (!abstract) {
    return `${publication.title ?? "Paper"}, a paper by Mir Sazzat Hossain and co-authors${tail}.`;
  }
  const room = 158 - tail.length;
  let lead = abstract.split(/(?<=[.!?])\s/)[0];
  if (lead.length > room) {
    lead = lead.slice(0, room - 1);
    lead = `${lead.slice(0, lead.lastIndexOf(" ")).replace(/[,;:\s]+$/, "")}…`;
  }
  return `${lead}${tail}`;
}
