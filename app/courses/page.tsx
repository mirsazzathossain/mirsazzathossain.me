import SimpleLayout from "components/SimpleLayout";
import CoursesPlaceholder from "components/skeleton/CoursesPlaceholder";
import { Suspense } from "react";
import ListCourses from "./ListCourses";

export default function Courses(): JSX.Element {
  return (
    <SimpleLayout
      title="Courses that I've instructed as a RA or TA at IUB"
      intro="During my time at IUB, I've worked as a teaching assistant and research assistant for a few different courses. These are the courses I've instructed."
    >
      <div className="mt-16 sm:mt-20">
        <Suspense fallback={<CoursesPlaceholder />}>
          {/* @ts-expect-error Server Component */}
          <ListCourses />
        </Suspense>
      </div>
    </SimpleLayout>
  );
}
