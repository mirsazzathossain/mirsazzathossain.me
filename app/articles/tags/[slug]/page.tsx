import SearchArticles from "app/articles/SearchArticles";
import SimpleLayout from "components/SimpleLayout";
import { allArticles, Article, Tag } from "contentlayer/generated";
import { notFound } from "next/navigation";

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

export default async function Articles({
  params,
  searchParams,
}: {
  params?: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}): Promise<JSX.Element> {
  let articles = await getSortedArticles();
  const page = searchParams?.page ? parseInt(searchParams.page as string) : 1;

  // Filter articles by tag title
  if (params?.slug) {
    articles = articles.filter((article: Article) =>
      article.tags?.some(
        (tag: Tag) =>
          tag.title
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, "")
            .replace(/[\s_-]+/g, "-")
            .replace(/^-+|-+$/g, "") === params.slug
      )
    );
  }

  if (articles.length === 0) return notFound();

  // Find tag title from slug
  const tagTitle = articles[0]?.tags?.find(
    (tag: Tag) =>
      tag.title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "") === params?.slug
  )?.title;

  return (
    <SimpleLayout
      title={params?.slug ? `Articles tagged with ${tagTitle}` : "Articles"}
    >
      <SearchArticles articles={articles} page={page} />
    </SimpleLayout>
  );
}
