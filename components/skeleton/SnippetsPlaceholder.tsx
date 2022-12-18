import { ImageIcon } from "components/Icons";

export default function SnippetsPlaceholder() {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 my-2 w-full mt-4 max-w-3xl animate-pulse">
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className="border border-grey-200 dark:border-zinc-800 rounded-xl p-4 w-full relative"
        >
          <div>
            <ImageIcon className="h-8 w-8 text-gray-200 dark:text-gray-600" />
            <div className="h-3 w-1/2 bg-gray-300 dark:bg-gray-600 rounded mt-4"></div>
            <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded mt-3"></div>
            <div className="h-2 w-1/2 bg-gray-200 dark:bg-gray-700 rounded mt-2"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
