import { server } from "config";
import { allArticles, Article } from "contentlayer/generated";

// Get the article data for the given slug
function getArticle(slug: string, articles: Article[]): Article | undefined {
  return articles.find((a: Article) => a.slug === slug);
}

// Get sorted articles from the contentlayer
async function getSortedArticles(): Promise<Article[]> {
  let articles = await allArticles;

  articles = articles.filter(
    (article: Article) => article.status === "published"
  );

  return articles.sort((a: Article, b: Article) => {
    if (a.publishedAt && b.publishedAt) {
      return (
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
    }
    return 0;
  });
}

export default async function Head({
  params,
}: {
  params: { slug: string };
}): Promise<JSX.Element> {
  const { slug } = params;
  const articles = await getSortedArticles();
  const article = getArticle(slug, articles);
  if (!article)
    return (
      <>
        <title>Not Found</title>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta name="description" content="Not Found" />
      </>
    );
  return (
    <>
      <title>{article.title}</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="description" content={article.description} />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={article.title} />
      <meta property="og:description" content={article.description} />
      <meta property="og:url" content={`${server}/articles/${slug}`} />
      <meta property="og:site_name" content="Mir Sazzat Hossain" />
      <meta name="author" content="Mir Sazzat Hossain" />
      <meta
        property="og:image"
        content={`${server}/images/${article.covers[0].url}`}
      />
      <meta
        property="og:image:secure_url"
        content={`${server}/images/${article.covers[0].url}`}
      />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:alt" content={article.covers[0].alt} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@mir_sazzat" />
      <meta name="twitter:creator" content="@mir_sazzat" />
      <meta name="twitter:title" content={article.title} />
      <meta name="twitter:description" content={article.description} />
      <meta
        name="twitter:image"
        content={`${server}/images/${article.covers[0].url}`}
      />
      <meta name="twitter:image:alt" content={article.covers[0].alt} />
      <meta name="twitter:image:width" content="1200" />
      <meta name="twitter:image:height" content="630" />
      <link rel="canonical" href={`${server}/articles/${slug}`} />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />
    </>
  );
}
