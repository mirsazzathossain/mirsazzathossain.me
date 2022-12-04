"use client";
import { Container } from "components/Container";
import ExperienceCard from "components/ExperienceCard";
import { ChevronDownIcon, ChevronUpIcon } from "components/Icons";
import { useRef, useState } from "react";

export default function Experiences({
  experiences,
}: {
  experiences: Experience[];
}): JSX.Element {
  let [isExpanded, setIsExpanded] = useState(false);
  const parentRef = useRef();

  return (
    <Container className="mt-9">
      <div className="max-w-3xl">
        <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-6 text-zinc-800 dark:text-zinc-100">
          Experiences
        </h3>

        {experiences.slice(0, 2).map((experience, index) => (
          <ExperienceCard key={index} props={experience} />
        ))}
        {experiences.slice(2).map((experience, index) => (
          <div
            key={index}
            className={
              "h-0 overflow-hidden transition-height ease-in-out duration-[400ms] "
            }
            ref={parentRef as any}
            style={{
              height: isExpanded ? (parentRef.current as any).scrollHeight : 0,
            }}
          >
            <ExperienceCard key={index} props={experience} />
          </div>
        ))}
        <div className="flex justify-center">
          <button
            className="group flex items-center rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10 dark:hover:ring-white/20"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <>
                Show less
                <ChevronUpIcon className="ml-3 h-auto w-[10px] stroke-zinc-500 group-hover:stroke-zinc-700 dark:group-hover:stroke-zinc-400" />
              </>
            ) : (
              <>
                Show more
                <ChevronDownIcon className="ml-3 h-auto w-[10px] stroke-zinc-500 group-hover:stroke-zinc-700 dark:group-hover:stroke-zinc-400" />
              </>
            )}
          </button>
        </div>
      </div>
    </Container>
  );
}
