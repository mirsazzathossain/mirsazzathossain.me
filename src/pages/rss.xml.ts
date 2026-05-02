import type { APIRoute } from "astro";
import rss from "@astrojs/rss";
import { getSortedPublishedArticles } from "@/utils/articles";

export const GET: APIRoute = async (context) => {
  const articles = await getSortedPublishedArticles();
  const site = context.site?.href ?? "https://mirsazzathossain.me";

  return rss({
    title: "RSS Feed - Mir Sazzat Hossain",
    description: "Mir Sazzat Hossain's personal blog",
    site,
    items: articles.map((article) => ({
      title: article.data.title,
      pubDate: article.data.publishedAt ?? new Date(),
      description: article.data.description,
      link: `/articles/${article.id}/`,
    })),
    customData: `<language>en-us</language>`,
  });
};
