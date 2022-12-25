import CourseCard from "components/CourseCard";
import { server } from "config";

export default async function ListCourses(): Promise<JSX.Element> {
  const courses: Course[] = await fetch(`${server}/api/courses`).then((res) =>
    res.json()
  );
  return (
    <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 my-2 w-full mt-4">
      {courses.map((course: Course, index) => (
        <CourseCard key={index} course={course} />
      ))}
    </div>
  );
}
