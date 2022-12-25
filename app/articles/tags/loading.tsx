import { Container } from "components/Container";

export default function loading(): JSX.Element {
  return (
    <Container className="mt-16 sm:mt-32 animate-pulse">
      <div className="flex flex-col items-start justify-start divide-y divide-gray-200 dark:divide-gray-700 md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0">
        <div className="space-x-2 pt-6 pb-8 md:space-y-5">
          <div className="h-8 w-32 bg-gray-300 dark:bg-gray-600 rounded-full" />
        </div>
        <div className="flex max-w-lg flex-wrap">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="mt-2 mb-2 mr-5">
              <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
