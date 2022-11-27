"use client";
import { Container } from "components/Container";
import ExperienceCard from "components/ExperienceCard";
import { useRef, useState } from "react";

const experiences = [
  {
    title: "Research Assistant",
    company: "Center for Computational & Data Sciences",
    companyURL: "http://ccds.ai/",
    companyLogo: "/images/ccds.png",
    location:
      "Plot 16, Aftabuddin Ahmed Road, Block B, Bashnudhara RA, Dhaka 1229, Bangladesh.",
    type: "Full-time",
    date: "Feb 2022 - Present",
    description:
      "I am currently employed as a Research Assistant at IUB's Center for Computational and Data Sciences (CCDS). My main role is to conduct research on computer vision, group theory, manifold learning, and geometric machine learning.",
    skills: [
      "Artificial Intelligence (AI)",
      "Machine Learning",
      "Artificial Neural Networks",
      "Data Science",
      "Image Processing",
      "Computer Vision",
      "Deep Learning",
    ],
  },

  {
    title: "Teaching Assistant",
    company: "Independent University, Bangladesh",
    companyURL: "https://iub.edu.bd/",
    companyLogo: "/images/iub.png",
    location:
      "Plot 16, Aftabuddin Ahmed Road, Block B, Bashnudhara RA, Dhaka 1229, Bangladesh.",
    type: "Part-time",
    date: "Sep 2021 - Jan 2022",
    description:
      "I have worked as a Teaching Assistant at IUB's Department of Computer Science and Engineering (CSE). My main role was to assist the course instructor in teaching the undergraduate course on Numerical Methods.",
    skills: [
      "Numerical Methods",
      "Numpy",
      "Teaching",
      "Management",
      "Leadership",
    ],
  },

  {
    title: "Undergraduate Research Assistant",
    company: "Independent University, Bangladesh",
    companyURL: "https://iub.edu.bd/",
    companyLogo: "/images/iub.png",
    location:
      "Plot 16, Aftabuddin Ahmed Road, Block B, Bashnudhara RA, Dhaka 1229, Bangladesh.",
    type: "Part-time",
    date: "Jan 2021 - Present",
    description:
      "I have worked as an Undergraduate Research Assistant at IUB's Department of Computer Science and Engineering (CSE). My main role was to assist the course instructor in teaching the undergraduate course on Numerical Methods.",
    skills: ["Numerical Methods", "Numpy", "Teaching", "Management"],
  },
];

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

export default function Experiences() {
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
