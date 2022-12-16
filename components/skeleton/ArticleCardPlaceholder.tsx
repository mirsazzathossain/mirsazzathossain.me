export default function ArticleCardPlaceholder() {
  return (
    <div className="md:grid md:grid-cols-4 md:items-baseline mt-9">
      <div className="mt-1 md:block relative z-10 order-first mb-3 h-2 bg-gray-300 rounded-full dark:bg-gray-600 w-[120px]" />

      <div className="md:col-span-3 group relative flex flex-col items-stratch mb-9">
        <div className="h-3 bg-gray-300 rounded-full dark:bg-gray-600 w-1/2 mb-6" />

        <div className="space-y-4">
          <div className="flex items-center space-x-2 w-full">
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-[200px]"></div>
            <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-600 w-[250px]"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-600 w-full"></div>
          </div>
          <div className="flex items-center w-full space-x-2">
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
            <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-600 w-[240px]"></div>
          </div>
          <div className="flex items-center w-1/2 space-x-2">
            <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-700 w-1/3"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-600 w-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
