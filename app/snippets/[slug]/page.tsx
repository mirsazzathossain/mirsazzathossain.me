import { Container } from "components/Container";
import { server } from "config";
import { Snippet } from "contentlayer/generated";
import { notFound } from "next/navigation";
import SnippetPage from "./Snippet";

export async function generateStaticParams(): Promise<any> {
  const snippets = await fetch(`${server}/api/snippets`).then((res) =>
    res.json()
  );

  return snippets.map((snippet: Snippet) => ({ slug: snippet.slug }));
}

export default async function Page({
  params,
}: {
  params: { slug: string };
}): Promise<JSX.Element> {
  const { slug } = params;
  let snippet = await fetch(`${server}/api/snippets/${slug}`, {
    next: { revalidate: 60 },
  }).then((res) => res.json());

  if (!snippet) return notFound();

  return (
    <Container className="mt-16 lg:mt-32">
      <SnippetPage snippet={snippet} />
    </Container>
  );
}
