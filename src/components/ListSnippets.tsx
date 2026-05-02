import type { SnippetEntry } from "@/utils/articles";
import SnippetCard from "@/components/SnippetCard";

export default function ListSnippets({
  snippets,
}: {
  snippets: SnippetEntry[];
}): JSX.Element {
  return (
    <div className="my-2 mt-4 grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2">
      {snippets.map((snippet) => (
        <SnippetCard key={snippet.id} snippet={snippet} />
      ))}
    </div>
  );
}
