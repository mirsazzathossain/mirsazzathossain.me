import about from "@/data/about.json";

/** Shared schema.org nodes so every page points at one Person entity. */

export const SITE = "https://mirsazzathossain.me";
export const PERSON_ID = `${SITE}/#person`;
export const WEBSITE_ID = `${SITE}/#website`;

export const personRef = { "@id": PERSON_ID };

const sameAs = [...about.academicLinks, ...about.socialLinks]
  .map((link) => link.url)
  .filter((url) => !url.includes("discord.com"));

/** First sentence of the bio, used as the entity description. */
const bioSentence = about.description.split("\n\n")[0].split(/(?<=\.)\s/)[0];

export const personNode = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: about.name,
  alternateName: ["Mir Sazzat", "Sazzat Hossain"],
  givenName: "Mir Sazzat",
  familyName: "Hossain",
  url: `${SITE}/`,
  image: {
    "@type": "ImageObject",
    url: `${SITE}${about.photo}`,
    width: 264,
    height: 264,
  },
  description: bioSentence,
  email: `mailto:${about.email}`,
  jobTitle: about.designation,
  worksFor: {
    "@type": "Organization",
    name: about.company.name,
    url: about.company.url,
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Independent University, Bangladesh",
    url: "https://iub.edu.bd/",
    sameAs: "https://en.wikipedia.org/wiki/Independent_University,_Bangladesh",
  },
  address: { "@type": "PostalAddress", addressLocality: "Dhaka", addressCountry: "BD" },
  knowsAbout: [...about.researchInterests, "Natural Language Processing", "Large Language Models"],
  sameAs,
};

export const websiteNode = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: `${SITE}/`,
  name: about.name,
  alternateName: ["Mir Sazzat", "mirsazzathossain.me"],
  inLanguage: "en",
  publisher: personRef,
};

const SECTION_NAMES: Record<string, string> = {
  about: "About",
  articles: "Posts",
  categories: "Categories",
  tags: "Tags",
  courses: "Courses",
  cv: "CV",
  projects: "Projects",
  publications: "Publications",
  resources: "Resources",
  snippets: "Snippets",
};

/** BreadcrumbList from a canonical path; the last item uses the page's own name. */
export function breadcrumbNode(path: string, pageName?: string) {
  const parts = path.split("/").filter(Boolean);
  if (parts.length === 0) return null;
  const items = [{ name: "Home", url: `${SITE}/` }];
  parts.forEach((part, index) => {
    const url = `${SITE}/${parts.slice(0, index + 1).join("/")}`;
    const isLast = index === parts.length - 1;
    const name = /^\d+$/.test(part)
      ? `Page ${part}`
      : isLast && pageName
        ? pageName
        : (SECTION_NAMES[part] ?? part.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()));
    items.push({ name, url });
  });
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/** Meta description copy: at most `max` characters, cut at a word boundary. */
export function metaDescription(text: string, max = 160): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:.\s]+$/, "")}…`;
}
