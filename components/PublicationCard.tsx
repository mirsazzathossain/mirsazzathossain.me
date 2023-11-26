import Link from "next/link";

export default function PublicationCard({
  publication,
}: {
  publication: any;
}): JSX.Element {
  return (
    <div className="group relative flex flex-col items-start rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 mb-4">
      <p className="text-xs text-zinc-400 dark:text-zinc-500 leading-5">
        {publication.author?.split(" and ").map((author: any, index: any) => (
          <span
            key={index}
            //   if author contains M.S. and Hossain, semi-bold the M.S. and Hossain
            className={`${
              author.includes("M.S.") && author.includes("Hossain")
                ? "font-semibold"
                : ""
            }`}
          >
            {author
              .trim()
              .split(",")
              .reverse()
              .map((name: any, authorIndex: number) => (
                <span key={name}>
                  {name.trim()}
                  {authorIndex !== author.trim().split(",").length - 1 && " "}
                </span>
              ))}
            {index < publication.author?.split(" and ").length - 2 && (
              <span>, </span>
            )}
            {index === publication.author?.split(" and ").length - 2 && (
              <span> and </span>
            )}
          </span>
        ))}
      </p>

      <h2 className="relative z-10 text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
        <Link href={publication.url ? publication.url : "#"}>
          {publication.title}
        </Link>
      </h2>
      <time
        className="relative z-10 order-first mb-2 flex items-center text-sm text-zinc-400 dark:text-zinc-500 pl-3.5"
        dateTime={new Date(
          publication.year,
          publication.month ? publication.month - 1 : 0,
          publication.day ? publication.day : 1
        ).toLocaleString("en-US", {
          month: "long",
          year: "numeric",
          day: "numeric",
        })}
      >
        <span
          className="absolute inset-y-0 left-0 flex items-center"
          aria-hidden="true"
        >
          <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500"></span>
        </span>
        {new Date(
          publication.year,
          publication.month ? publication.month - 1 : 0,
          publication.day ? publication.day : 1
        ).toLocaleString("en-US", {
          month: "long",
          year: "numeric",
          day: "numeric",
        })}
      </time>

      <p className="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        {publication.type === "article" && (
          <span>
            <span className="font-semibold italic">{publication.journal}</span>
            {publication.volume && (
              <span>
                ,{" "}
                <span className="font-semibold">
                  Volume {publication.volume}
                </span>
              </span>
            )}
            {publication.issue && <span>Issue {publication.issue}</span>}
            {publication.year && (
              <span>
                ,{" "}
                {new Date(
                  publication.year,
                  publication.month ? publication.month - 1 : 0
                ).toLocaleString("en-US", { year: "numeric", month: "long" })}
              </span>
            )}
            {publication.pages && <span>, Pages {publication.pages}</span>}
            {publication.issn && <span>, ISSN {publication.issn}</span>}
            {publication.note && <span>, ({publication.note})</span>}
            {publication.doi && (
              <span>
                ,{" "}
                <Link
                  href={`https://doi.org/${publication.doi}`}
                  target="_blank"
                >
                  DOI:{" "}
                  <span className="text-teal-500 break-all">
                    {publication.doi}
                  </span>
                </Link>
              </span>
            )}
          </span>
        )}
        {publication.type === "inproceedings" && (
          <span>
            <span className="font-semibold italic">
              {publication.booktitle}
            </span>
            {publication.year && (
              <span>
                ,{" "}
                {new Date(
                  publication.year,
                  publication.month ? publication.month - 1 : 0
                ).toLocaleString("en-US", {
                  year: "numeric",
                  month: "long",
                })}
              </span>
            )}
            {publication.pages && <span>, Pages {publication.pages}</span>}
            {publication.issn && <span>, ISSN {publication.issn}</span>}
            {publication.doi && (
              <span>
                ,{" "}
                <Link
                  href={`https://doi.org/${publication.doi}`}
                  target="_blank"
                >
                  DOI:{" "}
                  <span className="text-teal-500 break-all">
                    {publication.doi}
                  </span>
                </Link>
              </span>
            )}
          </span>
        )}
      </p>

      <div
        aria-hidden="true"
        className="relative z-10 mt-2 flex space-x-4 text-sm font-medium text-teal-500"
      >
        {publication.url && (
          <Link href={publication.url} target="_blank">
            [ Paper ]
          </Link>
        )}
        {publication.supplement && (
          <Link href={publication.supplement} target="_blank">
            [ Supplement ]
          </Link>
        )}
        {publication.code && (
          <Link
            href={publication.code ? publication.code : "#"}
            target="_blank"
          >
            [ Code ]
          </Link>
        )}
        {publication.slides && (
          <Link
            href={publication.slides ? publication.slides : "#"}
            target="_blank"
          >
            [ Slides ]
          </Link>
        )}
        {publication.video && (
          <Link
            href={publication.video ? publication.video : "#"}
            target="_blank"
          >
            [ Video ]
          </Link>
        )}
      </div>
    </div>
  );
}
