import { allArticles } from "contentlayer/generated";

async function getArticle(slug: string): Promise<any> {
  const res = await allArticles;
  const article = res.filter((s: any) => s.slug === slug);

  if (!article || article.length === 0) {
    return null;
  }

  return JSON.parse(JSON.stringify(article[0]));
}

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: any, res: any): Promise<any> => {
  const { slug } = req.query;
  const article = await getArticle(slug);

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=60, stale-while-revalidate=30"
  );

  return res.status(200).json(article);
};
