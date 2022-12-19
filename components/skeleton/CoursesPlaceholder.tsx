import { ImageIcon } from "components/Icons";

export default function CoursesPlaceholder() {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 my-2 w-full mt-4 animate-pulse">
      {[...Array(2)].map((_, index) => (
        <div
          key={index}
          className="relative block overflow-hidden rounded-lg border border-gray-100 dark:border-zinc-700/40 p-8"
        >
          <div className="justify-between sm:flex w-full">
            <div className="w-full">
              <div className="h-4 w-2/3 bg-gray-300 dark:bg-gray-600 rounded-full mt-2"></div>
              <div className="h-3 w-1/2 bg-gray-300 dark:bg-gray-600 rounded-full mt-4"></div>
            </div>

            <div className="ml-3 hidden flex-shrink-0 sm:block">
              <ImageIcon className="h-14 w-14 text-gray-200 dark:text-gray-600" />
            </div>
          </div>
          <div className="mt-10 sm:pr-8 w-full">
            <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded mt-4"></div>
            <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded mt-4"></div>
            <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded mt-4"></div>
            <div className="h-2 w-1/2 bg-gray-200 dark:bg-gray-700 rounded mt-4"></div>
          </div>
          <div className="mt-10 w-full">
            <div className="h-2 w-2/3 bg-gray-200 dark:bg-gray-700 rounded mt-4"></div>
            <div className="h-2 w-2/3 bg-gray-300 dark:bg-gray-600 rounded mt-4"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
