import {
  allArticles,
  allSnippets,
  Article,
  Snippet,
} from "contentlayer/generated";
import { GetServerSideProps } from "next";
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { articles, snippets } = await getSortedArticlesAndSnippets();

  const fields = [
    ...articles.map((article: Article) => ({
      loc: `https://mirsazzathossain.me/articles/${article.slug}`,
      lastmod: new Date(article.publishedAt as string).toISOString(),
      changefreq: "daily",
      priority: 0.7,
    })),
    ...snippets.map((snippet: Snippet) => ({
      loc: `https://mirsazzathossain.me/snippets/${snippet.slug}`,
      lastmod: new Date().toISOString(),
      changefreq: "daily",
      priority: 0.7,
    })),
  ];

  return getServerSideSitemap(ctx, fields as ISitemapField[]);
};

// Default export to prevent next.js errors
export default function Sitemap() {}
