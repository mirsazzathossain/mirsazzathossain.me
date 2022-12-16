import { Container } from "components/Container";

export default function AboutPlaceholder() {
  return (
    <Container className="mt-9">
      <div className="max-w-3xl pt-[15px] animate-pulse">
        <div className="sm:h-[35px] bg-gray-300 rounded-full dark:bg-gray-600 sm:w-[400px] mb-4 h-[20px] w-[250px]" />
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[400px] mb-4"></div>

        <div className="space-y-5 max-w-3lg mt-10">
          <div className="flex items-center space-x-2 w-full">
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-[200px]"></div>
            <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-600 w-[150px]"></div>
            <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-600 w-[400px]"></div>
          </div>
          <div className="flex items-center w-full space-x-2">
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
            <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
            <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-600 w-[240px]"></div>
          </div>
          <div className="flex items-center w-2/3 space-x-2">
            <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-[300px]"></div>
            <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
          </div>

          <div className="flex items-center w-full space-x-2">
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
            <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
            <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-600 w-[240px]"></div>
          </div>
          <div className="flex items-center space-x-2 w-full">
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-[200px]"></div>
            <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
            <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-600 w-[400px]"></div>
          </div>
          <div className="flex items-center w-3/4 space-x-2">
            <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-[500px]"></div>
            <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
          </div>
        </div>
        <div className="mt-9 flex gap-6">
          <div className="group p-1 h-6 w-6 bg-gray-200 dark:bg-gray-700"></div>
          <div className="group p-1 h-6 w-6 bg-gray-200 dark:bg-gray-700"></div>
          <div className="group p-1 h-6 w-6 bg-gray-200 dark:bg-gray-700"></div>
          <div className="group p-1 h-6 w-6 bg-gray-200 dark:bg-gray-700"></div>
          <div className="group p-1 h-6 w-6 bg-gray-200 dark:bg-gray-700"></div>
        </div>
      </div>
    </Container>
  );
}
