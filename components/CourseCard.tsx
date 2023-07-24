import Image from "next/image";
import Link from "next/link";

export default function CourseCard({
  course,
}: {
  course: Course;
}): JSX.Element {
  return (
    <Link
      href={course.link.href}
      className="relative block overflow-hidden rounded-lg border border-gray-100 dark:border-zinc-700/40 p-8 shadow-lg hover:shadow-sm"
      target="blank"
    >
      <span className="animate-background absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-[length:400%_400%] transition [animation-duration:_6s]"></span>

      <div className="justify-between sm:flex">
        <div>
          <h3 className="text-xl font-bold text-zinc-800 dark:text-zinc-100">
            {course.title}
          </h3>

          <p className="mt-1 text-xs font-medium text-zinc-800 dark:text-zinc-100">
            By {course.author}
          </p>
        </div>

        <div className="ml-3 hidden flex-shrink-0 sm:block">
          <Image
            alt={course.logo.alt}
            src={`/images/${course.logo.src}`}
            className="h-16 w-16 rounded-lg object-cover shadow-sm"
            width={64}
            height={64}
            priority
          />
        </div>
      </div>

      <div className="mt-4 sm:pr-8">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          {course.description}
        </p>
      </div>

      <dl className="mt-6 flex">
        <div className="flex flex-col-reverse">
          <dt className="text-sm font-medium text-zinc-800 dark:text-zinc-100">
            Published
          </dt>
          <dd className="text-xs text-zinc-600 dark:text-zinc-400">
            {new Date(course.publishedDate).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </dd>
        </div>

        <div className="ml-3 flex flex-col-reverse sm:ml-6">
          <dt className="text-sm font-medium text-zinc-800 dark:text-zinc-100">
            Course Duration
          </dt>
          <dd className="text-xs text-zinc-600 dark:text-zinc-400">
            {course.totalDuration}
          </dd>
        </div>
      </dl>
    </Link>
  );
}
