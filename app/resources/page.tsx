import SimpleLayout from "components/SimpleLayout";
import ResourcesPlaceholder from "components/skeleton/ResourcesPlaceholder";
import { Suspense } from "react";
import ListResources from "./ListResources";

export default function Resources(): JSX.Element {
  return (
    <SimpleLayout
      title="Snippets of Code I Find Useful"
      intro="I've been writing code for a long time. Here are some of the snippets I've found useful and reusable."
    >
      <div className="mt-16 sm:mt-20">
        <Suspense fallback={<ResourcesPlaceholder />}>
          {/* @ts-expect-error Server Component */}
          <ListResources />
        </Suspense>
      </div>
    </SimpleLayout>
  );
}
