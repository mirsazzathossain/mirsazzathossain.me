import { Container } from "components/Container";
import { ImageIcon } from "components/Icons";

export default function AboutPlaceholder() {
  return (
    <Container className="mt-11">
      <div className="max-w-3xl animate-pulse">
        <div className="h-[26px] bg-gray-300 rounded-full dark:bg-gray-600 w-[150px] mb-6 md:h-[32px] md:w-[200px]" />

        <div className="mb-4 rounded-xl relative border border-zinc-100 dark:border-zinc-700/40">
          <div className="flex items-start dark:bg-zinc-800/90 dark:border-zinc-700/40 rounded p-6 w-full">
            <div>
              <ImageIcon className="h-6 w-6 ml-2 mr-6 text-gray-200 dark:text-gray-600" />
            </div>
            <div className="w-full items-stretch">
              <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-1/2 mb-4" />
              <div className="h-1.5 bg-gray-200 rounded-full dark:bg-gray-700 w-3/4 mb-3" />
              <div className="h-1.5 bg-gray-200 rounded-full dark:bg-gray-700 w-3/4" />

              <div className="space-y-3 mt-5">
                <div className="flex items-center space-x-2 w-full">
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-1/4"></div>
                  <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-600 w-1/4"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-600 w-2/4"></div>
                </div>
                <div className="flex items-center w-full space-x-2">
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                  <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-600 w-1/2"></div>
                </div>
                <div className="flex items-center w-full space-x-2">
                  <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-700 w-1/2"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-600 w-full"></div>
                  <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                </div>
                <div className="flex items-center w-1/2 space-x-2">
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-600 w-full"></div>
                  <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-700 w-1/2"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-600 w-full"></div>
                </div>
              </div>

              <div className="space-y-3 mt-5">
                <div className="flex items-center w-full space-x-4">
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-600 w-1/3"></div>
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-2/3"></div>
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-600 w-full"></div>
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-1/3"></div>
                </div>
                <div className="flex items-center w-1/2 space-x-4">
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-3/4"></div>
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
