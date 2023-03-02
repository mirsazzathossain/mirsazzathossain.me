import { server } from "config";
import {
  allArticles,
  allSnippets,
  Article,
  Snippet,
} from "contentlayer/generated";
import { GetServerSidePropsContext } from "next";
import { getServerSideSitemap, ISitemapField } from "next-sitemap";

// get sorted articles and snippets from contentlayer
async function getSortedArticlesAndSnippets() {
  let articles = await allArticles;
  articles = articles.filter((article) => article.status === "published");

  articles.sort((a: Article, b: Article) => {
    if (a.publishedAt && b.publishedAt) {
      return (
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
    }
    return 0;
  });

  const snippets = await allSnippets;

  return { articles, snippets };
}

// get all tags and categories from articles
function getTagsAndCategories(articles: Article[]) {
  const tags = new Set<string>();
  const categories = new Set<string>();

  articles.forEach((article) => {
    article.tags?.forEach((tag: any) =>
      tags.add(
        tag.title
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, "")
          .replace(/[\s_-]+/g, "-")
          .replace(/^-+|-+$/g, "") || ""
      )
    );
    article.categories?.forEach((category: any) =>
      categories.add(
        category.title
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, "")
          .replace(/[\s_-]+/g, "-")
          .replace(/^-+|-+$/g, "") || ""
      )
    );
  });

  return { tags, categories };
}

export async function GET(ctx: GetServerSidePropsContext) {
  const { articles, snippets } = await getSortedArticlesAndSnippets();
  const { tags, categories } = getTagsAndCategories(articles);

  const fields = [
    ...articles.map((article: Article) => ({
      loc: `${server}/articles/${article.slug}`,
      lastmod: new Date(article.publishedAt as string).toISOString(),
      changefreq: "daily",
      priority: 0.7,
    })),
    ...snippets.map((snippet: Snippet) => ({
      loc: `${server}/snippets/${snippet.slug}`,
      lastmod: new Date().toISOString(),
      changefreq: "daily",
      priority: 0.7,
    })),
    {
      loc: `${server}/articles/categories`,
      lastmod: new Date().toISOString(),
      changefreq: "daily",
      priority: 0.7,
    },
    {
      loc: `${server}/articles/tags`,
      lastmod: new Date().toISOString(),
      changefreq: "daily",
      priority: 0.7,
    },
    ...Array.from(tags).map((tag) => ({
      loc: `${server}/articles/tags/${tag}`,
      lastmod: new Date().toISOString(),
      changefreq: "daily",
      priority: 0.7,
    })),
    ...Array.from(categories).map((category) => ({
      loc: `${server}/articles/categories/${category}`,
      lastmod: new Date().toISOString(),
      changefreq: "daily",
      priority: 0.7,
    })),
  ];

  return getServerSideSitemap(ctx, fields as ISitemapField[]);
}
