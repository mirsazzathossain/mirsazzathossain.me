import { Container } from "components/Container";
import { allSnippets, Snippet } from "contentlayer/generated";
import { notFound } from "next/navigation";
import SnippetPage from "./Snippet";

// get snippets from the contentlayer
async function getAllSnippets(): Promise<Snippet[]> {
  return await allSnippets;
}

export default async function Page({
  params,
}: {
  params: { slug: string };
}): Promise<JSX.Element> {
  const { slug } = params;
  let snippet = await getAllSnippets().then((snippets) =>
    snippets.find((snippet) => snippet.slug === slug)
  );

  if (!snippet) return notFound();

  return (
    <Container className="mt-16 lg:mt-32">
      <SnippetPage snippet={snippet} />
    </Container>
  );
}
