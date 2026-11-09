import readingTime from "@/utils/reading-time";
import { slugify } from "@/utils/slugify";
import type { ArticleEntry } from "@/utils/articles";

export function ArticleListItem({
  article,
  dateStyle = "long",
  showTaxonomy = true,
  ...dataAttrs
}: {
  article: ArticleEntry;
  dateStyle?: "short" | "long";
  showTaxonomy?: boolean;
} & { [key: `data-${string}`]: string | undefined }) {
  const published = formatPublishedDate(article, dateStyle);
  const rt = readingTime(article.body ?? "");

  return (
    <li className="border-rule-2 border-b py-6 first:pt-0 last:border-b-0" {...dataAttrs}>
      <div className="text-ink-3 mb-1.5 flex items-center gap-2 font-mono text-[11px] tracking-[0.04em]">
        <span>{published}</span>
        <span aria-hidden="true">·</span>
        <span>{rt.text}</span>
      </div>
      <h2 className="m-0 mb-1.5 font-serif text-[22px] leading-[1.25] font-semibold tracking-[-0.015em]">
        <a
          href={`/articles/${article.id}`}
          className="text-ink hover:text-link transition-colors hover:no-underline"
        >
          {article.data.title}
        </a>
      </h2>
      <p className="text-ink-2 m-0 mb-2.5 line-clamp-2 max-w-[70ch] text-[13.5px] leading-[1.6]">
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
          className="border-link/25 bg-accent-soft text-link hover:border-link/40 rounded border px-[7px] py-[2px] font-mono text-[10.5px] whitespace-nowrap transition-colors hover:no-underline"
        >
          {category.title}
        </a>
      ))}
      {article.data.tags?.slice(0, 3).map((tag) => (
        <a
          key={`tag-${tag.title}`}
          href={`/articles/tags/${slugify(tag.title)}`}
          className="border-rule bg-bg-2 text-ink-2 hover:border-link/35 hover:bg-accent-soft hover:text-link max-w-full rounded border px-[7px] py-[2px] font-mono text-[10.5px] transition-colors hover:no-underline sm:whitespace-nowrap"
        >
          {tag.title}
        </a>
      ))}
    </div>
  );
}

function formatPublishedDate(article: ArticleEntry, dateStyle: "short" | "long"): string {
  if (!article.data.publishedAt) return "";

  return new Date(article.data.publishedAt).toLocaleDateString("en-US", {
    month: dateStyle === "short" ? "short" : "long",
    day: "numeric",
    year: "numeric",
  });
}
