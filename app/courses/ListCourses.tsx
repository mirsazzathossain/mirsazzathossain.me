import CourseCard from "components/CourseCard";
import { server } from "config";
import fs, { promises as ps } from "fs";

// get courses from local file
async function getListCourses(): Promise<Course[]> {
  if (fs.existsSync("public/content/courses.json")) {
    const res = await ps.readFile("public/content/courses.json", "utf-8");
    const courses: Course[] = JSON.parse(res);
    return courses;
  }

  const courses = fetch(`${server}/content/courses.json`)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });

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
