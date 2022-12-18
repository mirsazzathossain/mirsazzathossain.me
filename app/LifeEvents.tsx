"use client";
import { Container } from "components/Container";
import Event from "components/Event";
import { ChevronDownIcon, ChevronUpIcon } from "components/Icons";
import { useRef, useState } from "react";

const Divider = () => {
  return (
    <div className="border border-zinc-100 dark:border-zinc-700/40 w-full my-8" />
  );
};

export default function LifeEvents({ lifeEvents }: { lifeEvents: any }) {
  let [isExpanded, setIsExpanded] = useState(false);
  const parentRef = useRef();

  return (
    <>
      {Object.keys(lifeEvents).length > 0 && (
        <Container className="mt-9">
          <div className="max-w-3xl">
            <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-6 text-zinc-800 dark:text-zinc-100">
              Life Events
            </h3>

            {Object.keys(lifeEvents)
              .reverse()
              .slice(0, 3)
              .map((year: string, index: number) => (
                <div key={index}>
                  {index !== Object.keys(lifeEvents).length - 1 &&
                    index !== 0 && <Divider />}
                  <Event key={index} year={year} events={lifeEvents[year]} />
                </div>
              ))}

            {Object.keys(lifeEvents)
              .reverse()
              .slice(3)
              .map((year: string, index: number) => (
                <div
                  key={index}
                  ref={parentRef as any}
                  className="h-0 overflow-hidden transition-height ease-in-out duration-[400ms] "
                  style={{
                    height: isExpanded
                      ? (parentRef.current as any).scrollHeight
                      : 0,
                  }}
                >
                  {index !== Object.keys(lifeEvents).length - 1 && <Divider />}
                  <Event year={year} events={lifeEvents[year]} />
                </div>
              ))}

            {Object.keys(lifeEvents).length > 3 && !isExpanded && (
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
