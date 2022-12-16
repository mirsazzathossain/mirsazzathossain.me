"use client";
import { Container } from "components/Container";
import ExperienceCard from "components/ExperienceCard";
import { ChevronDownIcon, ChevronUpIcon } from "components/Icons";
import { useRef, useState } from "react";

export default function Experiences({
  experiences,
}: {
  experiences: any;
}): JSX.Element {
  let [isExpanded, setIsExpanded] = useState(false);
  const parentRef = useRef();

  return (
    <>
      {experiences.length > 0 && (
        <Container className="mt-9">
          <div className="max-w-3xl">
            <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-6 text-zinc-800 dark:text-zinc-100">
              Experiences
            </h3>

            {experiences.slice(0, 2).map((experience: any, index: any) => (
              <ExperienceCard key={index} props={experience} />
            ))}
            {experiences.slice(2).map((experience: any, index: any) => (
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
                <ExperienceCard key={index} props={experience} />
              </div>
            ))}
            {experiences.length > 2 && (
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
