import AboutPlaceholder from "components/skeleton/AboutPlaceholder";
import ArticlesPlaceholder from "components/skeleton/ArticlesPlaceholder";
import EducationsPlaceholder from "components/skeleton/EducationsPlaceholder";
import ExperiencesPlaceholder from "components/skeleton/ExperiencesPlaceholder";
import LifeEventsPlaceholder from "components/skeleton/LifeEventsPlaceholder";
import PublicationsPlaceholder from "components/skeleton/PublicationsPlaceholder";
import fs from "fs";
import { Suspense } from "react";
import generateRss from "utils/generate-rss";
import About from "./About";
import Server from "./Server";

export default async function Home(): Promise<JSX.Element> {
  if (fs.existsSync("public")) {
    await generateRss();
  }

  return (
    <>
      <div style={{ width: "100%", background: "#f3f4f6", textAlign: "center", padding: "10px 16px", fontSize: "0.9rem", color: "#374151" }}>
        This is the archived v1 site. The current site is at{" "}
        <a href="https://mirsazzathossain.me" style={{ color: "#1d4ed8", textDecoration: "underline" }}>
          mirsazzathossain.me
        </a>
      </div>

      <Suspense fallback={<AboutPlaceholder />}>
        {/* @ts-expect-error Server Component */}
        <About />
      </Suspense>

      {/* <Photos images={photos} /> */}

      <Suspense fallback={<EducationsPlaceholder />}>
        {/* @ts-expect-error Server Component */}
        <Server component="Educations" />
      </Suspense>

      <Suspense fallback={<ExperiencesPlaceholder />}>
        {/* @ts-expect-error Server Component */}
        <Server component="Experiences" />
      </Suspense>

      <Suspense fallback={<PublicationsPlaceholder />}>
        {/* @ts-expect-error Server Component */}
        <Server component="Publications" />
      </Suspense>

      {/* <Miscellaneous /> */}

      <Suspense fallback={<ArticlesPlaceholder />}>
        {/* @ts-expect-error Server Component */}
        <Server component="Articles" />
      </Suspense>

      {/* <Calendar /> */}

      <Suspense fallback={<LifeEventsPlaceholder />}>
        {/* @ts-expect-error Server Component */}
        <Server component="LifeEvents" />
      </Suspense>
    </>
  );
}
