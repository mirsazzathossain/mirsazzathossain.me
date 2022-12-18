import SnipeetCard from "components/SnipeetCard";
import { server } from "config";
import { Snippet } from "contentlayer/generated";

export default async function ListSnippets(): Promise<JSX.Element> {
  const snippets = await fetch(`${server}/api/snippets`).then((res) =>
    res.json()
  );
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 my-2 w-full mt-4 max-w-3xl">
      {snippets.map((snippet: Snippet) => (
        <SnipeetCard key={snippet.slug} snippet={snippet} />
      ))}
    </div>
  );
}
