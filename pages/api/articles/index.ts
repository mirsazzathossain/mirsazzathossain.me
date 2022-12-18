import { allArticles, Article } from "contentlayer/generated";

async function getAllArticles(): Promise<any> {
  const articles = await allArticles;
  const publishedArticles = articles.filter(
    (article: Article) => article.status === "published"
  );
  const sortedArticles = publishedArticles.sort((a: Article, b: Article) => {
    return (
      new Date(b.publishedAt as string).getTime() -
      new Date(a.publishedAt as string).getTime()
    );
  });

  return JSON.parse(JSON.stringify(sortedArticles));
}

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: any, res: any): Promise<any> => {
  const articles = await getAllArticles();
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=60, stale-while-revalidate=30"
  );
  return res.status(200).json(articles);
};
