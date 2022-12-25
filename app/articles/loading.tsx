import { MagnifyingGlassIcon } from "components/Icons";
import SimpleLayout from "components/SimpleLayout";
import ArticleCardPlaceholder from "components/skeleton/ArticleCardPlaceholder";

export default function loading(): JSX.Element {
  return (
    <SimpleLayout
      title="Writing on Machine Learning, Advance Math, and Programming"
      intro="All my articles are written with the goal of helping you learn something new. I hope you enjoy them!"
    >
      <div className="relative max-w-3xl mb-12 sm:mb-16">
        <input
          aria-label="Search articles"
          type="text"
          placeholder="Search articles"
          className="block w-full px-4 py-2 text-gray-900 bg-white border border-gray-200 rounded-md dark:border-gray-700 focus:ring-blue-500 focus:border-blue-500 dark:bg-zinc-800/90 dark:text-zinc-400"
        />

        <MagnifyingGlassIcon className="absolute w-5 h-5 text-gray-400 right-3 top-3 dark:text-gray-300" />
      </div>
      <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        <div className="flex max-w-3xl flex-col space-y-16 -mt-6">
          {[...Array(4)].map((_, index) => (
            <ArticleCardPlaceholder key={index} />
          ))}
        </div>
      </div>
    </SimpleLayout>
  );
}
