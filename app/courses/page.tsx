import SimpleLayout from "components/SimpleLayout";
import CoursesPlaceholder from "components/skeleton/CoursesPlaceholder";
import { Suspense } from "react";
import ListCourses from "./ListCourses";

export default function Courses() {
  return (
    <SimpleLayout
      title="Snippets of Code I Find Useful"
      intro="I've been writing code for a long time. Here are some of the snippets I've found useful and reusable."
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
