import { ArrowRightIcon } from "@/components/ui/Icon";

export default function CourseCard({
  course,
}: {
  course: Course;
}): JSX.Element {
  return (
    /* .course */
    <a
      href={course.link.href}
      style={{ padding: "18px 18px 16px", gap: 10, borderRadius: 10 }}
      className="flex flex-col border border-rule bg-bg transition-[border-color,transform] duration-150 hover:border-ink-3 hover:-translate-y-[2px] hover:no-underline"
    >
      {/* .course__top */}
      <div style={{ gap: 12 }} className="flex items-center">
        <img
          src={`/images/${course.logo.src}`}
          alt={course.logo.alt}
          width={36}
          height={36}
          className="object-contain"
        />

        {/* .course__top-text */}
        <div style={{ gap: 2 }} className="flex flex-col min-w-0 flex-1">
          {/* .course__code */}
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              fontWeight: 600,
              color: "var(--ink)",
            }}
          >
            {course.code}
          </span>
          {/* .course__role */}
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 9.5,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--ink-3)",
            }}
          >
            {course.role}
          </span>
        </div>
      </div>

      {/* .course__title */}
      <h3
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: 16,
          lineHeight: 1.3,
          margin: "2px 0 0",
          color: "var(--ink)",
        }}
      >
        {course.title}
      </h3>

      {/* .course__inst */}
      <p style={{ fontSize: 12, color: "var(--ink-3)", margin: 0 }}>
        {course.inst}
      </p>

      {/* .course__desc */}
      <p
        style={{
          fontSize: 12.5,
          color: "var(--ink-2)",
          margin: 0,
          lineHeight: 1.55,
          flex: 1,
        }}
      >
        {course.description}
      </p>

      {/* .course__foot */}
      <div
        style={{ paddingTop: 10, borderTop: "1px solid var(--rule-2)" }}
        className="flex justify-between items-center"
      >
        {/* .course__term */}
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "var(--ink-3)",
          }}
        >
          {course.term}
        </span>
        {/* .course__cta */}
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11.5,
            color: "var(--link)",
          }}
          className="inline-flex items-center gap-[4px]"
        >
          View materials
          <ArrowRightIcon width={10} height={10} strokeWidth={2.5} />
        </span>
      </div>
    </a>
  );
}
