import ArticleCard from "components/ArticleCard";
import { Container } from "components/Container";
import { ChevronDownIcon } from "components/Icons";
import Link from "next/link";

export default function Articles({ articles }: { articles: any }) {
  return (
    <Container className="mt-9">
      <div className="max-w-3xl">
        <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-6 text-zinc-800 dark:text-zinc-100">
          Articles
        </h3>

        <div className="flex max-w-3xl flex-col space-y-16">
          {articles.slice(0, 4).map((article: any) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>

        {articles.length > 4 && (
          <div className="flex justify-center mt-10">
            <Link
              href="/articles"
              className="group flex items-center text-sm font-medium text-zinc-800 dark:text-zinc-200 hover:text-teal-500 dark:hover:text-teal-500"
            >
              Show more
              <ChevronDownIcon className="ml-3 h-auto w-[10px] stroke-zinc-500 group-hover:stroke-teal-500 dark:group-hover:stroke-teal-500" />
            </Link>
          </div>
        )}
      </div>
    </Container>
  );
}
