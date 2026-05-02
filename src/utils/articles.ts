import { getCollection, type CollectionEntry } from "astro:content";
import { slugify } from "./slugify";

export type ArticleEntry = CollectionEntry<"articles">;
export type SnippetEntry = CollectionEntry<"snippets">;

export async function getSortedPublishedArticles(): Promise<ArticleEntry[]> {
  const articles = await getCollection("articles", ({ data }) => {
    return data.status === "published";
  });

  return articles.sort((a, b) => {
    const da = a.data.publishedAt
      ? new Date(a.data.publishedAt).getTime()
      : 0;
    const db = b.data.publishedAt
      ? new Date(b.data.publishedAt).getTime()
      : 0;
    return db - da;
  });
}

export function categoryHref(title: string): string {
  return `/articles/categories/${slugify(title)}`;
}

export function tagHref(title: string): string {
  return `/articles/tags/${slugify(title)}`;
}

export function getNextAndPrevArticles(
  article: ArticleEntry,
  articles: ArticleEntry[],
): {
  previousArticle: ArticleEntry | undefined;
  nextArticle: ArticleEntry | undefined;
} {
  let previousArticle: ArticleEntry | undefined;
  let nextArticle: ArticleEntry | undefined;

  if (article.data.series) {
    const seriesArticles = articles.filter(
      (a) => a.data.series?.title === article.data.series?.title,
    );

    const sortedSeriesArticles = seriesArticles.sort((a, b) => {
      const oa = a.data.series?.order ?? 0;
      const ob = b.data.series?.order ?? 0;
      return oa - ob;
    });

    const currentArticleIndex = sortedSeriesArticles.findIndex(
      (a) => a.id === article.id,
    );
    if (currentArticleIndex > 0) {
      previousArticle = sortedSeriesArticles[currentArticleIndex - 1];
    }
    if (currentArticleIndex < sortedSeriesArticles.length - 1) {
      nextArticle = sortedSeriesArticles[currentArticleIndex + 1];
    }
  }

  if (!previousArticle) {
    const currentArticleIndex = articles.findIndex((a) => a.id === article.id);
    if (currentArticleIndex > 0) {
      previousArticle = articles[currentArticleIndex - 1];
    }
  }

  if (!nextArticle) {
    const currentArticleIndex = articles.findIndex((a) => a.id === article.id);
    if (currentArticleIndex < articles.length - 1) {
      nextArticle = articles[currentArticleIndex + 1];
    }
  }

  return { previousArticle, nextArticle };
}

export function getRelatedArticles(
  article: ArticleEntry,
  articles: ArticleEntry[],
): ArticleEntry[] {
  return articles
    .filter((a) => {
      if (a.id === article.id) return false;
      if (
        a.data.categories.some((c) =>
          article.data.categories.some((ac) => ac.title === c.title),
        )
      )
        return true;
      if (
        (a.data.tags ?? []).some((t) =>
          (article.data.tags ?? []).some((at) => at.title === t.title),
        )
      )
        return true;
      if (a.data.series?.title === article.data.series?.title) return true;
      return false;
    })
    .slice(0, 2);
}
