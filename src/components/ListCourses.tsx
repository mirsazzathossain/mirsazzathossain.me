import CourseCard from "@/components/CourseCard";

export default function ListCourses({
  courses,
}: {
  courses: Course[];
}): JSX.Element {
  return (
    <div className="my-2 mt-4 grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
      {courses.map((course: Course, index) => (
        <CourseCard key={index} course={course} />
      ))}
    </div>
  );
}
