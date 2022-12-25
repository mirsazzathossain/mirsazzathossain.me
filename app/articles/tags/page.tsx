import { Container } from "components/Container";
import { server } from "config";
import { Article, Tag } from "contentlayer/generated";
import Link from "next/link";

export default async function Tags(): Promise<JSX.Element> {
  const articles = await fetch(`${server}/api/articles`).then((res) =>
    res.json()
  );

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
