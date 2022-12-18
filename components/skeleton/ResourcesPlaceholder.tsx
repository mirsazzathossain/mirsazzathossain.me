export default function ResourcesPlaceholder() {
  return (
    <div className="max-w-3xl animate-pulse mt-24">
      {Array.from({ length: 2 }).map((_, i) => (
        <div key={i}>
          <div className="h-4 w-1/4 bg-gray-300 dark:bg-gray-600 rounded mt-12"></div>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 my-2 w-full mt-6">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="border border-grey-200 dark:border-zinc-800 rounded-xl p-4 w-full relative"
              >
                <div>
                  <div className="h-2 w-1/3 bg-gray-200 dark:bg-gray-700 rounded mt-2"></div>
                  <div className="h-3 w-1/2 bg-gray-300 dark:bg-gray-600 rounded mt-6"></div>
                  <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded mt-4"></div>
                  <div className="h-2 w-1/2 bg-gray-200 dark:bg-gray-700 rounded mt-2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
