import readingTime from "@/utils/reading-time";
import { slugify } from "@/utils/slugify";
import type { ArticleEntry } from "@/utils/articles";

export function ArticleListItem({
  article,
  dateStyle = "long",
  showTaxonomy = true,
}: {
  article: ArticleEntry;
  dateStyle?: "short" | "long";
  showTaxonomy?: boolean;
}) {
  const published = formatPublishedDate(article, dateStyle);
  const rt = readingTime(article.body);

  return (
    <li className="border-b border-rule-2 py-6 first:pt-0 last:border-b-0">
      <div className="mb-1.5 flex items-center gap-2 font-mono text-[11px] tracking-[0.04em] text-ink-3">
        <span>{published}</span>
        <span aria-hidden="true">·</span>
        <span>{rt.text}</span>
      </div>
      <h2 className="m-0 mb-1.5 font-serif text-[22px] font-semibold leading-[1.25] tracking-[-0.015em]">
        <a
          href={`/articles/${article.id}`}
          className="text-ink transition-colors hover:text-link hover:no-underline"
        >
          {article.data.title}
        </a>
      </h2>
      <p className="m-0 mb-2.5 line-clamp-2 max-w-[70ch] text-[13.5px] leading-[1.6] text-ink-2">
        {article.data.description}
      </p>
      {showTaxonomy && <ArticleTaxonomy article={article} />}
    </li>
  );
}

function ArticleTaxonomy({ article }: { article: ArticleEntry }) {
  return (
    <div className="flex flex-wrap gap-[5px]">
      {article.data.categories.slice(0, 1).map((category) => (
        <a
          key={`category-${category.title}`}
          href={`/articles/categories/${slugify(category.title)}`}
          className="whitespace-nowrap rounded border border-link/25 bg-accent-soft px-[7px] py-[2px] font-mono text-[10.5px] text-link transition-colors hover:border-link/40 hover:no-underline"
        >
          {category.title}
        </a>
      ))}
      {article.data.tags?.slice(0, 3).map((tag) => (
        <a
          key={`tag-${tag.title}`}
          href={`/articles/tags/${slugify(tag.title)}`}
          className="whitespace-nowrap rounded border border-rule bg-bg-2 px-[7px] py-[2px] font-mono text-[10.5px] text-ink-2 transition-colors hover:border-link/35 hover:bg-accent-soft hover:text-link hover:no-underline"
        >
          {tag.title}
        </a>
      ))}
    </div>
  );
}

function formatPublishedDate(
  article: ArticleEntry,
  dateStyle: "short" | "long"
): string {
  if (!article.data.publishedAt) return "";

  return new Date(article.data.publishedAt).toLocaleDateString("en-US", {
    month: dateStyle === "short" ? "short" : "long",
    day: "numeric",
    year: "numeric",
  });
}
