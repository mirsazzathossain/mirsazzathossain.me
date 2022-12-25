export default function Head({
  params,
}: {
  params?: { slug: string };
}): JSX.Element {
  return (
    <>
      <title>
        Sazzat&apos;s Arena - Articles{" "}
        {params?.slug ? `categorized as ${params.slug}` : ""}
      </title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <link rel="icon" href="/favicon.ico" />
      <meta
        name="description"
        content={`This page contains all the articles ${
          params?.slug ? `categorized as ${params.slug}` : ""
        } available on Sazzat's Arena.`}
      />

      <meta
        property="og:title"
        content={`Sazzat's Arena - Articles ${
          params?.slug ? `categorized as ${params.slug}` : ""
        }`}
      />
      <meta
        property="og:description"
        content={`This page contains all the articles ${
          params?.slug ? `categorized as ${params.slug}` : ""
        } available on Sazzat's Arena.`}
      />
      <meta
        property="og:url"
        content={`https://mirsazzathossain.me/articles/categories/${
          params?.slug ? params.slug : ""
        }`}
      />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Sazzat's Arena" />
      <meta
        property="og:image"
        content="https://mirsazzathossain.me/images/og-image.png"
      />
      <meta property="og:image:alt" content="Sazzat's Arena" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
    </>
  );
}
