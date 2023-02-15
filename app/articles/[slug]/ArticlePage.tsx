"use client";
import Comments from "components/Comments";
import mdxComponents from "components/mdx/MdxComponent";
import SocialShare from "components/SocialShare";
import { Article } from "contentlayer/generated";
import { useMDXComponent } from "next-contentlayer/hooks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "../../../styles/katex.css";
import AuthorCard from "./AuthorCard";
import RelatedArticles from "./RelatedArticles";

function ArrowLeftIcon(props: React.ComponentProps<"svg">): JSX.Element {
  return (
    <svg
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

function ArrowRightIcon(props: React.ComponentProps<"svg">): JSX.Element {
  return (
    <svg
      {...props}
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function toLocaleDateString(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function ArticlePage({
  article,
  previousArticle,
  nextArticle,
  relatedArticles,
}: {
  article: Article;
  previousArticle?: Article;
  nextArticle?: Article;
  relatedArticles?: Article[];
}): JSX.Element {
  const router = useRouter();
  const Component = useMDXComponent(article.body.code);
  return (
    <div className="xl:relative">
      <div className="mx-auto max-w-2xl">
        <button
          type="button"
          aria-label="Go back"
          onClick={() => router.back()}
          className="group mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20 lg:absolute lg:-left-5 lg:mb-0 lg:-mt-2 xl:-top-1.5 xl:left-0 xl:mt-0"
        >
          <ArrowLeftIcon className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-zinc-400" />
        </button>

        <article>
          <header className="flex flex-col">
            <h1 className="mt-6 text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-4xl">
              {article.title}
            </h1>

            <time
              dateTime={toLocaleDateString(article.publishedAt as string)}
              className="order-first flex items-center text-base text-zinc-400 dark:text-zinc-500"
            >
              <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
              <span className="ml-3 truncate">
                {toLocaleDateString(article.publishedAt as string)}
                {` • `}
                {article.readingTime.text}
                {` • `}
                {article.categories?.map((category, index) => (
                  <Link
                    href={`/articles/categories/${slugify(category.title)}`}
                    key={category.title}
                    className="text-teal-500 hover:text-teal-600 dark:text-teal-400 dark:hover:text-teal-300 font-medium"
                  >
                    {category.title}
                    {index < article.categories.length - 1 ? `, ` : ``}
                  </Link>
                ))}
              </span>
            </time>
          </header>

          <div className="mt-8 prose dark:prose-invert">
            <Component components={mdxComponents as any} />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
            <div className="flex items-center md:col-span-2">
              {article.tags?.slice(0, 3).map((tag) => (
                <Link
                  href={`/articles/tags/${slugify(tag.title)}`}
                  key={tag.title}
                  className="inline-block py-1.5 px-3 mr-2 mb-2 rounded-md bg-gray-100 hover:bg-gray-200 text-sm text-gray-600 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-100 truncate"
                >
                  {tag.title}
                </Link>
              ))}
            </div>

            <div className="flex items-center justify-end">
              <SocialShare article={article} />
            </div>
          </div>

          <hr className="mt-8 mb-8 border-t border-zinc-200 dark:border-zinc-700" />
          <div className="my-2 grid grid-cols-2 gap-4">
            <Link
              className="flex items-center text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300"
              href={`/articles/${previousArticle?.slug}`}
            >
              <ArrowLeftIcon className="w-5 mr-2" />
              <p className="ml-2">Previous Article</p>
            </Link>

            <Link
              className="flex items-center justify-end text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300"
              href={`/articles/${nextArticle?.slug}`}
            >
              <span className="mr-2">Next Article</span>
              <ArrowRightIcon className="w-5 ml-2" />
            </Link>
          </div>
          <hr className="mt-8 mb-8 border-t border-zinc-200 dark:border-zinc-700" />

          <AuthorCard article={article} />
          <Comments />
          {relatedArticles && relatedArticles.length > 0 && (
            <RelatedArticles articles={relatedArticles} />
          )}
        </article>
      </div>
    </div>
  );
}
