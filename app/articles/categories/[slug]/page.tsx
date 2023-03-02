import SearchArticles from "app/articles/SearchArticles";
import SimpleLayout from "components/SimpleLayout";
import { server } from "config";
import { allArticles, Article, Category } from "contentlayer/generated";
import type { Metadata } from "next";
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

// Dynamic metadata for the page
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  return {
    title: `Articles categorized as ${params.slug}`,
    description: `This page contains all the articles ${
      params?.slug ? `categorized as ${params.slug}` : ""
    } available on this website.`,
    openGraph: {
      type: "website",
      title: `Articles categorized as ${params.slug} - Mir Sazzat Hossain`,
      description: `This page contains all the articles ${
        params?.slug ? `categorized as ${params.slug}` : ""
      } available on this website.`,
      url: `${server}/articles/categories/${params.slug}`,
      siteName: "Mir Sazzat Hossain - Innovative Researcher and Skilled Mentor",
      images: [
        {
          url: `${server}/images/cover.jpg`,
          width: 1200,
          height: 630,
          alt: `Articles categorized as ${params.slug}`,
        },
      ],
      locals: ["en_US"],
    },
    twitter: {
      card: "summary_large_image",
      site: "@mir_sazzat",
      creator: "@mir_sazzat",
      title: `Articles categorized as ${params.slug} - Mir Sazzat Hossain`,
      description: `This page contains all the articles ${
        params?.slug ? `categorized as ${params.slug}` : ""
      } available on this website.`,
      images: [
        {
          url: `${server}/images/cover.jpg`,
          width: 1200,
          height: 630,
          alt: `Articles categorized as ${params.slug}`,
        },
      ],
    },
    alternates: {
      canonical: `${server}/articles/categories/${params.slug}`,
      types: {
        "application/rss+xml": `${server}/feed.xml`,
      },
    },
  };
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

  // Filter articles by category title
  if (params?.slug) {
    articles = articles.filter((article: Article) =>
      article.categories.some(
        (category) =>
          category.title
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, "")
            .replace(/[\s_-]+/g, "-")
            .replace(/^-+|-+$/g, "") === params.slug
      )
    );
  }

  if (!articles || articles.length === 0) {
    return notFound();
  }

  // Find category title from slug
  const catTitle = articles[0].categories.find(
    (category: Category) =>
      category.title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "") === params?.slug
  )?.title;

  return (
    <SimpleLayout
      title={params?.slug ? `Articles categorized as ${catTitle}` : "Articles"}
    >
      <SearchArticles articles={articles} page={page} />
    </SimpleLayout>
  );
}
