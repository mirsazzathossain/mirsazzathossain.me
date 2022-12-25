import { Article, Snippet } from "contentlayer/generated";
import { GetServerSideProps } from "next";
import { getServerSideSitemap } from "next-sitemap";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const articles = await fetch("https://mirsazzathossain.me/api/articles").then(
    (res) => res.json()
  );

  const snippets = await fetch("https://mirsazzathossain.me/api/snippets").then(
    (res) => res.json()
  );

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

  return getServerSideSitemap(ctx, fields);
};

// Default export to prevent next.js errors
export default function Sitemap() {}
