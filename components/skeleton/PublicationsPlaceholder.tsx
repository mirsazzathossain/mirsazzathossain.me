import { Container } from "components/Container";

export default function PublicationsPlaceholder() {
  return (
    <Container className="mt-10">
      <div className="max-w-3xl animate-pulse">
        <div className="h-[26px] bg-gray-300 rounded-full dark:bg-gray-600 w-[150px] mb-6 md:h-[32px] md:w-[200px]" />

        {[...Array(2)].map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40 mb-4"
          >
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-[150px] mb-7 mt-2" />
            <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-600 w-3/4 mb-4" />
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-600 w-1/2 mb-6" />

            <div className="space-y-4 mt-5">
              <div className="flex items-center space-x-2 w-full">
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-1/2"></div>
                <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-600 w-1/3"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-600 w-full"></div>
              </div>
              <div className="flex items-center w-1/2 space-x-2">
                <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-700 w-2/3"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-600 w-1/3"></div>
              </div>
            </div>

            <div className="space-y-4 mt-6 w-1/4 mb-2">
              <div className="flex items-center space-x-2 w-full">
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-1/2"></div>
                <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-600 w-1/2"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
