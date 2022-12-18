import SimpleLayout from "components/SimpleLayout";
import SnippetsPlaceholder from "components/skeleton/SnippetsPlaceholder";
import { Suspense } from "react";
import ListSnippets from "./ListSnippets";

export default function Snippets(): JSX.Element {
  return (
    <SimpleLayout
      title="Snippets of Code I Find Useful"
      intro="I've been writing code for a long time. Here are some of the snippets I've found useful and reusable."
    >
      <div className="mt-16 sm:mt-20">
        <Suspense fallback={<SnippetsPlaceholder />}>
          {/* @ts-expect-error Server Component */}
          <ListSnippets />
        </Suspense>
      </div>
    </SimpleLayout>
  );
}
