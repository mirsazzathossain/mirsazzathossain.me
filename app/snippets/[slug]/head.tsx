import { server } from "config";
import { allSnippets, Snippet } from "contentlayer/generated";

// get snippets from the contentlayer
async function getSortedSnippets(): Promise<Snippet[]> {
  return await allSnippets;
}

export default async function Head({
  params,
}: {
  params: { slug: string };
}): Promise<JSX.Element> {
  const { slug } = params;
  let snippet = await getSortedSnippets().then((snippets) =>
    snippets.find((snippet) => snippet.slug === slug)
  );

  if (!snippet)
    return (
      <>
        <title>Not Found</title>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta name="description" content="Not Found" />
      </>
    );

  return (
    <>
      <title>{snippet.title}</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="description" content={snippet.description} />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={snippet.title} />
      <meta property="og:description" content={snippet.description} />
      <meta property="og:url" content={`${server}/snippets/${slug}`} />
      <meta property="og:site_name" content="Mir Sazzat Hossain" />
      <meta property="og:image" content={`${server}/images/og-image.png`} />
      <meta property="og:image:alt" content="Mir Sazzat Hossain" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@mir_sazzat" />
      <meta name="twitter:creator" content="@mir_sazzat" />
      <meta name="twitter:title" content={snippet.title} />
      <meta name="twitter:description" content={snippet.description} />
      <meta name="twitter:image" content={`${server}/images/og-image.png`} />
      <meta name="twitter:image:alt" content="Mir Sazzat Hossain" />
      <meta name="twitter:image:width" content="1200" />
      <meta name="twitter:image:height" content="630" />
      <link rel="canonical" href={`${server}/snippets/${slug}`} />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />
    </>
  );
}
