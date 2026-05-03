import CourseCard from "@/components/CourseCard";

export default function ListCourses({ courses }: { courses: Course[] }): JSX.Element {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(290px,1fr))] gap-[14px]">
      {courses.map((course) => (
        <CourseCard key={course.slug} course={course} />
      ))}
    </div>
  );
}
