import { Container } from "components/Container";
import ArticleCardPlaceholder from "components/skeleton/ArticleCardPlaceholder";

export default function loading(): JSX.Element {
  return (
    <Container className="mt-16 sm:mt-32 animate-pulse">
      <header className="max-w-3xl pt-4">
        <div className="h-8 w-64 bg-gray-200 dark:bg-gray-700 rounded-full mb-6" />
      </header>
      <div className="relative max-w-3xl mb-12 sm:mb-16">
        <div className="h-8 w-full bg-gray-200 dark:bg-gray-700 rounded-full" />
      </div>
      <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        <div className="flex max-w-3xl flex-col space-y-16 -mt-6">
          {[...Array(4)].map((_, index) => (
            <ArticleCardPlaceholder key={index} />
          ))}
        </div>
      </div>
    </Container>
  );
}
