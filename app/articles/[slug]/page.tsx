import { Container } from "components/Container";
import { server } from "config";
import { Article } from "contentlayer/generated";
import { notFound } from "next/navigation";
import ArticlePage from "./ArticlePage";

export async function generateStaticParams(): Promise<any> {
  const articles = await fetch(`${server}/api/articles`).then((res) =>
    res.json()
  );

  return articles.map((article: Article) => ({ slug: article.slug }));
}

export default async function Page({
  params,
}: {
  params: { slug: string };
}): Promise<JSX.Element> {
  const { slug } = params;
  let article = await fetch(`${server}/api/articles/${slug}`, {
    next: { revalidate: 60 },
  }).then((res) => res.json());

  let articles = await fetch(`${server}/api/articles`).then((res) =>
    res.json()
  );

  if (!article) return notFound();

  let previousArticle: Article | undefined;
  let nextArticle: Article | undefined;
  if (article.series) {
    const seriesArticles = articles.filter(
      (a: Article) => a.series?.title === article.series?.title
    );

    const sortedSeriesArticles = seriesArticles.sort(
      (a: Article, b: Article) => {
        if (a.series?.order && b.series?.order) {
          return a.series?.order - b.series?.order;
        }
        return 0;
      }
    );

    const currentArticleIndex = sortedSeriesArticles.findIndex(
      (a: Article) => a.slug === article.slug
    );
    if (currentArticleIndex > 0) {
      previousArticle = sortedSeriesArticles[currentArticleIndex - 1];
    }
    if (currentArticleIndex < sortedSeriesArticles.length - 1) {
      nextArticle = sortedSeriesArticles[currentArticleIndex + 1];
    }
  }

  if (!previousArticle) {
    const currentArticleIndex = articles.findIndex(
      (a: Article) => a.slug === article.slug
    );
    if (currentArticleIndex > 0) {
      previousArticle = articles[currentArticleIndex - 1];
    }
  }

  if (!nextArticle) {
    const currentArticleIndex = articles.findIndex(
      (a: Article) => a.slug === article.slug
    );
    if (currentArticleIndex < articles.length - 1) {
      nextArticle = articles[currentArticleIndex + 1];
    }
  }

  const relatedArticles = articles
    .filter((a: Article) => {
      if (a.slug === article.slug) return false;
      if (a.categories.some((c) => article.categories.includes(c))) return true;
      if (a.tags?.some((t) => article.tags?.includes(t))) return true;
      if (a.series?.title === article.series?.title) return true;
      return false;
    })
    .slice(0, 2);

  return (
    <Container className="mt-16 lg:mt-32">
      <ArticlePage
        article={article}
        previousArticle={previousArticle}
        nextArticle={nextArticle}
        relatedArticles={relatedArticles}
      />
    </Container>
  );
}
