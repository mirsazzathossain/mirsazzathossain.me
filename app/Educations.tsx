"use client";
import { Container } from "components/Container";
import EducationCard from "components/EducationCard";
import { useRef, useState } from "react";

function ChevronDownIcon(props: React.SVGProps<SVGSVGElement>): JSX.Element {
  return (
    <svg viewBox="0 0 8 6" aria-hidden="true" {...props}>
      <path
        d="M1.75 1.75 4 4.25l2.25-2.5"
        fill="none"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronUpIcon(props: React.SVGProps<SVGSVGElement>): JSX.Element {
  return (
    <svg viewBox="0 0 8 6" aria-hidden="true" {...props}>
      <path
        d="M1.75 4.25 4 1.75l2.25 2.5"
        fill="none"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Experiences({
  educations,
}: {
  educations: Education[];
}): JSX.Element {
  let [isExpanded, setIsExpanded] = useState(false);
  const parentRef = useRef();

  return (
    <Container className="mt-9">
      <div className="max-w-3xl">
        <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-6 text-zinc-800 dark:text-zinc-100">
          Educations
        </h3>

        {educations.slice(0, 2).map((education, index) => (
          <EducationCard key={index} props={education} />
        ))}
        {educations.slice(2).map((education, index) => (
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
            <EducationCard key={index} props={education} />
          </div>
        ))}
        {educations.length > 2 && (
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
        )}
      </div>
    </Container>
  );
}
