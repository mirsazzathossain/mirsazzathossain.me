import { server } from "config";
import { Article } from "contentlayer/generated";
import { Feed } from "feed";
import fs from "fs";

const generateRss = async () => {
  const site_url = `${server}`;

  const allArticles = await fetch(`${site_url}/api/articles`).then((res) =>
    res.json()
  );

  const author = {
    name: "Mir Sazzat Hossain",
    email: "mirsazzathossain@gmail.com",
    link: "https://mirsazzathossain.me",
  };

  const feedOptions = {
    title: "Sazzat's Arena - RSS Feed",
    description: "Mir Sazzat Hossain's personal blog",
    id: site_url,
    link: site_url,
    image: `${site_url}/images/og-image.png`,
    favicon: `${site_url}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}, Ibas`,
    generator: "Sazzat's Arena",
    feedLinks: {
      rss2: `${server}/rss.xml`,
      json: `${server}/rss.json`,
      atom: `${server}/atom.xml`,
    },
    author,
  };
  const feed = new Feed(feedOptions);

  allArticles.forEach((article: Article) => {
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
};

generateRss();
