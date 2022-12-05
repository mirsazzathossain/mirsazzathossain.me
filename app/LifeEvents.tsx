"use client";
import { Container } from "components/Container";
import Event from "components/Event";
import { ChevronDownIcon } from "components/Icons";
import { useRef, useState } from "react";
import useSWR from "swr";
import fetcher from "utils/fetcher";

const Divider = () => {
  return (
    <div className="border border-zinc-100 dark:border-zinc-700/40 w-full my-8" />
  );
};

export default function LifeEvents() {
  let [isExpanded, setIsExpanded] = useState(false);
  const parentRef = useRef();

  const { data, error } = useSWR("/api/life-events", fetcher);
  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;
  const lifeEvents = data;
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
                <>
                  <Event key={index} year={year} events={lifeEvents[year]} />
                  {/* {index !== Object.keys(lifeEvents).length - 1 && <Divider />} */}
                </>
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
                  <Event year={year} events={lifeEvents[year]} />
                </div>
              ))}

            {Object.keys(lifeEvents).length > 3 && !isExpanded && (
              <div className="flex justify-center mt-4">
                <button
                  className="group flex items-center rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10 dark:hover:ring-white/20"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  Show more
                  <ChevronDownIcon className="ml-3 h-auto w-[10px] stroke-zinc-500 group-hover:stroke-zinc-700 dark:group-hover:stroke-zinc-400" />
                </button>
              </div>
            )}
          </div>
        </Container>
      )}
    </>
  );
}
