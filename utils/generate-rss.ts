import { allArticles } from "contentlayer/generated";
import { Feed } from "feed";
import fs from "fs";

export default async function generateRss(): Promise<void> {
  const site_url = `${process.env.SITE_URL || "https://mirsazzathossain.me"}`;

  const articles = await allArticles;

  const sortedArticles = articles.sort(
    (a, b) =>
      Number(new Date(b.publishedAt as string)) -
      Number(new Date(a.publishedAt as string))
  );

  const author = {
    name: "Mir Sazzat Hossain",
    email: "mirsazzathossain@gmail.com",
    link: "https://mirsazzathossain.me",
  };

  const feedOptions = {
    title: "RSS Feed - Mir Sazzat Hossain",
    description: "Mir Sazzat Hossain's personal blog",
    id: site_url,
    link: site_url,
    image: `${site_url}/images/og-image.png`,
    favicon: `${site_url}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}, Ibas`,
    generator: "Feed for Node.js",
    feedLinks: {
      rss2: `${site_url}/rss.xml`,
      json: `${site_url}/rss.json`,
      atom: `${site_url}/atom.xml`,
    },
    author,
  };
  const feed = new Feed(feedOptions);

  sortedArticles.forEach((article) => {
    feed.addItem({
      title: article.title,
      id: `${site_url}/articles/${article.slug}`,
      link: `${site_url}/articles/${article.slug}`,
      description: article.description,
      content: article.description,
      author: [author],
      contributor: [author],
      date: new Date(article.publishedAt?.toString() || ""),
    });
  });

  fs.writeFileSync("./public/rss.xml", feed.rss2());
  fs.writeFileSync("./public/atom.xml", feed.atom1());
  fs.writeFileSync("./public/rss.json", feed.json1());
}
