export default function Head({
  params,
}: {
  params?: { slug: string };
}): JSX.Element {
  return (
    <>
      <title>
        Articles {params?.slug ? `categorized as ${params.slug}` : ""}
      </title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <meta
        name="description"
        content={`This page contains all the articles ${
          params?.slug ? `categorized as ${params.slug}` : ""
        } available on this website.`}
      />

      <meta
        property="og:title"
        content={`Articles ${
          params?.slug ? `categorized as ${params.slug}` : ""
        }`}
      />
      <meta
        property="og:description"
        content={`This page contains all the articles ${
          params?.slug ? `categorized as ${params.slug}` : ""
        } available on this website.`}
      />
      <meta
        property="og:url"
        content={`https://mirsazzathossain.me/articles/categories/${
          params?.slug ? params.slug : ""
        }`}
      />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Mir Sazzat Hossain" />
      <meta
        property="og:image"
        content="https://mirsazzathossain.me/images/og-image.png"
      />
      <meta property="og:image:alt" content="Mir Sazzat Hossain" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@mirsazzathossain" />
      <meta name="twitter:creator" content="@mirsazzathossain" />
      <meta
        name="twitter:title"
        content={`Articles ${
          params?.slug ? `categorized as ${params.slug}` : ""
        }`}
      />
      <meta
        name="twitter:description"
        content={`This page contains all the articles ${
          params?.slug ? `categorized as ${params.slug}` : ""
        } available on this website.`}
      />
      <meta
        name="twitter:image"
        content="https://mirsazzathossain.me/images/og-image.png"
      />
    </>
  );
}
