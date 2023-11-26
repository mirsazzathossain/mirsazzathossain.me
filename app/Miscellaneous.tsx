"use client";
import { Container } from "components/Container";
import Image from "next/image";

export default function Miscellaneous(): JSX.Element {
  return (
    <>
      <Container className="mt-9">
        <div className="max-w-3xl">
          <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-6 text-zinc-800 dark:text-zinc-100">
            Awards & Honors
          </h3>

          <ul className="list-disc list-outside ml-6">
            <li className="mb-2">
              <a
                className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-100"
                href="https://www.mirsazzathossain.me/files/vc-list.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Awarded placement on the Vice Chancellor&apos;s List at
                Independent University, Bangladesh (IUB) three times in Spring
                2021, Autumn 2020, and Summer 2020 for consistently maintaining
                a GPA of 3.50 or above across three consecutive semesters each
                time.
              </a>
            </li>
            <li className="mb-2">
              <a
                className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-100"
                href="https://www.mirsazzathossain.me/files/deans-merit-list.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Recognized on the Dean&apos;s Merit List at IUB in Spring 2020
                for achieving a CGPA of 3.50 or more for two successive
                semesters.
              </a>
            </li>
            <li className="mb-2">
              <a
                className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-100"
                href="https://www.mirsazzathossain.me/files/deans-list.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Earned a spot on the Dean&apos;s List at IUB in Autumn 2019 for
                achieving a high academic standard with a CGPA of 3.50 or more
                in a semester.
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <Container className="mt-9">
        <div className="max-w-3xl">
          <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-6 text-zinc-800 dark:text-zinc-100">
            Extracurricular Activities
          </h3>

          <ul className="list-disc list-outside ml-6">
            <li className="mb-2">
              <a
                className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-100"
                href="https://www.mirsazzathossain.me/files/icpc-asia-dhaka-2019.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Represented IUB in the{" "}
                <span className="font-semibold">
                  2019 International Collegiate Programming Contest (ICPC)
                </span>{" "}
                Asia Dhaka Regional Contest.
              </a>
            </li>
            <li className="mb-2">
              <a
                className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-100"
                href="https://www.mirsazzathossain.me/files/intra-iub-tech-fest-2019.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="font-semibold">Winner</span> of the Intra IUB
                Tech Fest Programming Contest, Summer 2019.
              </a>
            </li>
            <li className="mb-2">
              <a
                className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-100"
                href="https://www.mirsazzathossain.me/files/acm-week-code-debugging-2019.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="font-semibold">Winner</span> of the 2019 Intra
                IUB ACM Week Code Debugging Contest.
              </a>
            </li>
            <li className="mb-2">
              <a
                className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-100"
                href="https://www.mirsazzathossain.me/files/extracurricular.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Actively participated in various workshops, programming
                challenges, and Olympiads.
              </a>
            </li>
          </ul>
        </div>
      </Container>
    </>
  );
}
