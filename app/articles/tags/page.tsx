import { Container } from "components/Container";
import { server } from "config";
import { allArticles, Article, Tag } from "contentlayer/generated";
import type { Metadata } from "next";
import Link from "next/link";

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
  const articles = await getSortedArticles();
  // get all the unique tags
  const tags = articles.reduce((acc: any, article: Article) => {
    article.tags?.forEach((tag: Tag) => {
      if (!acc[tag.title]) {
        acc[tag.title] = 1;
      }
    });
    return acc;
  }, {});

  return {
    title: "Article Tags",
    description:
      "This page contains all the tags of articles available on this website.",
    keywords: [...Object.keys(tags)],
    openGraph: {
      type: "website",
      title: "Article Tags - Mir Sazzat Hossain",
      description:
        "This page contains all the tags of articles available on this website.",
      url: `${server}/articles/tags`,
      siteName: "Mir Sazzat Hossain - Innovative Researcher and Skilled Mentor",
      images: [
        {
          url: `${server}/images/og-image.png`,
          alt: "Mir Sazzat Hossain - Innovative Researcher and Skilled Mentor",
          width: 1200,
          height: 630,
        },
      ],
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      site: "@mir_sazzat",
      creator: "@mir_sazzat",
      title: "Article Tags - Mir Sazzat Hossain",
      description:
        "This page contains all the tags of articles available on this website.",
      images: [
        {
          url: `${server}/images/og-image.png`,
          alt: "Mir Sazzat Hossain - Innovative Researcher and Skilled Mentor",
          width: 1200,
          height: 630,
        },
      ],
    },
    alternates: {
      canonical: `${server}/articles/tags`,
      types: {
        "application/rss+xml": `${server}/feed.xml`,
      },
    },
  };
}

export default async function Tags(): Promise<JSX.Element> {
  const articles = await getSortedArticles();

  // Tags with number of articles
  const tags = articles.reduce((acc: any, article: Article) => {
    article.tags?.forEach((tag: Tag) => {
      if (acc[tag.title]) {
        acc[tag.title] += 1;
      } else {
        acc[tag.title] = 1;
      }
    });
    return acc;
  }, {});

  return (
    <Container className="mt-16 sm:mt-32">
      <div className="flex flex-col items-start justify-start divide-y divide-gray-200 dark:divide-gray-700 md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0">
        <div className="space-x-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-4xl sm:leading-10 md:border-r-2 md:px-6 md:text-6xl md:leading-14">
            Tags
          </h1>
        </div>
        <div className="flex max-w-lg flex-wrap">
          {Object.keys(tags).map((tag, index) => (
            <div key={index} className="mt-2 mb-2 mr-5">
              <Link
                className="mr-3 text-sm font-medium uppercase text-teal-500 hover:text-teal-600 dark:hover:text-teal-400"
                href={`articles/tags/${tag
                  .toLowerCase()
                  .trim()
                  .replace(/[^\w\s-]/g, "")
                  .replace(/[\s_-]+/g, "-")
                  .replace(/^-+|-+$/g, "")}`}
              >
                {tag}
              </Link>
              <Link
                className="-ml-2 text-sm font-semibold uppercase text-zinc-500 dark:text-zinc-400"
                href={`articles/tags/${tag
                  .toLowerCase()
                  .trim()
                  .replace(/[^\w\s-]/g, "")
                  .replace(/[\s_-]+/g, "-")
                  .replace(/^-+|-+$/g, "")}`}
              >
                {" "}
                ({tags[tag]})
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
