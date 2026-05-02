import { cn } from "@/lib/cn";

export default function ExperienceCard({
  classNames,
  props,
}: {
  classNames?: string;
  props: Experience;
}): JSX.Element {
  return (
    <div
      className={cn(
        "mb-4 hover:shadow-lg rounded-xl transition-all duration-200 relative border border-zinc-100 dark:border-zinc-700/40",
        classNames
      )}
    >
      <a href={props.companyURL} target={"_blank"} rel="noreferrer">
        <div className="flex items-start dark:bg-zinc-800/90 dark:border-zinc-700/40 rounded-sm p-4 relative">
          <div className="mt-2">
            <img
              src={props.companyLogo}
              alt={props.company + " logo"}
              width={50}
              height={45}
              className="h-7 w-8 ml-2 mr-12"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div>
            <h4 className="text-lg font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
              {props.title}
            </h4>
            <p className="text-xs text-zinc-400 dark:text-zinc-500 leading-5">
              {props.company} · {props.type} · {props.date}{" "}
            </p>
            <p className="text-xs text-zinc-400 dark:text-zinc-500 leading-5">
              {props.location}
            </p>{" "}
            <p className="leading-5 text-zinc-600 dark:text-zinc-400 mt-2 text-justify">
              {props.description}
            </p>
            <div className="pt-2 flex md:flex-row flex-wrap">
              {props.skills.map((skill, index) => (
                <p
                  key={index}
                  className="leading-5 dark:border dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 dark:bg-transparent rounded-md text-xs italic bg-gray-50  mr-2 px-1"
                >
                  {skill}
                </p>
              ))}
            </div>
          </div>
        </div>
      </a>
      <span className="absolute w-[50%] -bottom-px right-px h-px bg-linear-to-r from-teal-500/0 via-teal-500/40 to-teal-500/0 dark:from-teal-400/0 dark:via-teal-400/40 dark:to-teal-400/0"></span>
      <span className="absolute w-px -left-px top-[40%] h-[40%] bg-linear-to-b from-teal-500/0 via-teal-500/40 to-teal-500/0 dark:from-teal-400/0 dark:via-teal-400/40 dark:to-teal-400/0"></span>
    </div>
  );
}
