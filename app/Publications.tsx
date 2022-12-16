"use client";
import { Container } from "components/Container";
import { ChevronDownIcon, ChevronUpIcon } from "components/Icons";
import PublicationCard from "components/PublicationCard";
import ErrorSection from "components/skeleton/ErrorSection";
import PublicationsPlaceholder from "components/skeleton/PublicationsPlaceholder";
import { useRef, useState } from "react";
import useSWR from "swr";
import fetcher from "utils/fetcher";

export default function Publications(): JSX.Element {
  let [isExpanded, setIsExpanded] = useState(false);
  const parentRef = useRef();

  const { data, error } = useSWR("/api/publications", fetcher);
  if (error) return <ErrorSection />;
  if (!data) return <PublicationsPlaceholder />;
  const publications = data;

  return (
    <>
      {publications.length > 0 && (
        <Container className="mt-9">
          <div className="max-w-3xl">
            <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-6 text-zinc-800 dark:text-zinc-100">
              Publications
            </h3>

            {publications.slice(0, 2).map((publication: any, index: any) => (
              <PublicationCard key={index} publication={publication} />
            ))}

            {publications.slice(2).map((publication: any, index: any) => (
              <div
                key={index}
                className={
                  "h-0 overflow-hidden transition-height ease-in-out duration-[400ms] "
                }
                ref={parentRef as any}
                style={{
                  height: isExpanded
                    ? (parentRef.current as any).scrollHeight
                    : 0,
                }}
              >
                <PublicationCard key={index} publication={publication} />
              </div>
            ))}

            {publications.length > 2 && (
              <div className="flex justify-center">
                <button
                  className="group flex items-center text-sm font-medium text-zinc-800 dark:text-zinc-200 hover:text-teal-500 dark:hover:text-teal-500"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  {isExpanded ? (
                    <>
                      Show less
                      <ChevronUpIcon className="ml-3 h-auto w-[10px] stroke-zinc-500 group-hover:stroke-teal-500 dark:group-hover:stroke-teal-500" />
                    </>
                  ) : (
                    <>
                      Show more
                      <ChevronDownIcon className="ml-3 h-auto w-[10px] stroke-zinc-500 group-hover:stroke-teal-500 dark:group-hover:stroke-teal-500" />
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </Container>
      )}
    </>
  );
}
