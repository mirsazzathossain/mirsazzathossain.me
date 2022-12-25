import CourseCard from "components/CourseCard";
import { promises as fs } from "fs";

// get courses from local file
async function getListCourses(): Promise<Course[]> {
  const res = await fs.readFile("content/courses.json", "utf-8");
  const courses: Course[] = JSON.parse(res);
  return courses;
}

export default async function ListCourses(): Promise<JSX.Element> {
  const courses: Course[] = await getListCourses();
  return (
    <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 my-2 w-full mt-4">
      {courses.map((course: Course, index) => (
        <CourseCard key={index} course={course} />
      ))}
    </div>
  );
}
