import { ArrowRightIcon } from "@/components/Icons";

export default function CourseCard({
  course,
}: {
  course: Course;
}): JSX.Element {
  return (
    <a
      href={course.link.href}
      className="flex flex-col gap-2.5 rounded-[10px] border border-rule bg-bg p-[18px_18px_16px] transition-[border-color,transform] duration-150 hover:-translate-y-[2px] hover:border-ink-3 hover:no-underline"
    >
      <div className="flex items-center gap-3">
        <img
          src={`/images/${course.logo.src}`}
          alt={course.logo.alt}
          width={36}
          height={36}
          className="object-contain"
        />

        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="font-mono text-xs font-semibold text-ink">
            {course.code}
          </span>
          <span className="font-mono text-[9.5px] uppercase tracking-[0.1em] text-ink-3">
            {course.role}
          </span>
        </div>
      </div>

      <h3 className="m-0 mt-0.5 font-serif text-base leading-[1.3] text-ink">
        {course.title}
      </h3>

      <p className="m-0 text-xs text-ink-3">{course.inst}</p>

      <p className="m-0 flex-1 text-[12.5px] leading-[1.55] text-ink-2">
        {course.description}
      </p>

      <div className="flex items-center justify-between border-t border-rule-2 pt-2.5">
        <span className="font-mono text-[11px] text-ink-3">
          {course.term}
        </span>
        <span className="inline-flex items-center gap-1 font-mono text-[11.5px] text-link">
          View materials
          <ArrowRightIcon width={10} height={10} strokeWidth={2.5} />
        </span>
      </div>
    </a>
  );
}
