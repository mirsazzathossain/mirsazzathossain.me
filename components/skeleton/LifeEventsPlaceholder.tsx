import { Container } from "components/Container";

export default function LifeEventsPlaceholder() {
  return (
    <Container className="mt-9">
      <div className="max-w-3xl animate-pulse">
        <div className="h-[26px] bg-gray-300 rounded-full dark:bg-gray-600 w-[150px] md:h-[32px] md:w-[200px]" />

        {[...Array(3)].map((_, i) => (
          <>
            <div className="h-4 bg-gray-300 rounded-full dark:bg-gray-600 w-[100px] mb-8 mt-9" />

            {[...Array(2)].map((_, j) => (
              <>
                <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-600 w-[200px] mb-6 ml-4" />
                <div className="space-y-3 ml-8 mb-8">
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-600 w-full" />
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-600 w-1/2" />
                </div>
              </>
            ))}
          </>
        ))}
      </div>
    </Container>
  );
}
