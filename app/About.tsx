import { Container } from "components/Container";
import { ResumeIcon } from "components/Icons";

import {
  DBLPIcon,
  GitHubIcon,
  GoogleScholarIcon,
  LinkedInIcon,
  SementicScholarIcon,
  TwitterIcon,
} from "components/SocialIcons";
import { server } from "config";
import fs, { promises as ps } from "fs";
import Link from "next/link";

// get about from local file
async function getAbout(): Promise<any> {
  if (fs.existsSync("public/content/about.json")) {
    const res = await ps.readFile("public/content/about.json", "utf-8");
    const about: any = JSON.parse(res);
    return about;
  }

  const about = fetch(`${server}/content/about.json`)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });

  return about;
}

function SocialLink({
  icon: Icon,
  ...props
}: {
  [key: string]: any;
}): JSX.Element {
  return (
    <Link href={""} className="group -m-1 p-1" target={"_blank"} {...props}>
      <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
    </Link>
  );
}

export default async function About() {
  const about = await getAbout();
  return (
    <Container className="mt-9">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
          {about.name}
        </h1>
        <h2 className="text-gray-600 dark:text-gray-400 tracking-tighter mb-4">
          {about.designation} at{" "}
          <Link
            className="font-semibold"
            href={about.company.url}
            target={"_blank"}
          >
            {about.company.name}
          </Link>
        </h2>
        <p
          className="mt-6 text-base text-zinc-600 dark:text-zinc-400"
          style={{ whiteSpace: "pre-line" }}
        >
          {about.description}
        </p>

        {about.note && (
          <p className="text-base text-zinc-600 dark:text-zinc-400">
            <b>*Note:</b> {about.note}
          </p>
        )}

        <div className="mt-6 flex gap-6">
          {about.socialLinks.map((socialLink: any, index: any) => (
            <SocialLink
              key={index}
              href={socialLink.url}
              icon={
                socialLink.name === "github"
                  ? GitHubIcon
                  : socialLink.name === "linkedin"
                  ? LinkedInIcon
                  : socialLink.name === "twitter"
                  ? TwitterIcon
                  : socialLink.name === "google-scholar"
                  ? GoogleScholarIcon
                  : socialLink.name === "semantic-scholar"
                  ? SementicScholarIcon
                  : socialLink.name === "dblp"
                  ? DBLPIcon
                  : null
              }
              title={
                socialLink.name === "github"
                  ? "GitHub Profile"
                  : socialLink.name === "linkedin"
                  ? "LinkedIn Profile"
                  : socialLink.name === "twitter"
                  ? "Twitter Profile"
                  : socialLink.name === "google-scholar"
                  ? "Google Scholar Profile"
                  : socialLink.name === "semantic-scholar"
                  ? "Semantic Scholar Profile"
                  : socialLink.name === "dblp"
                  ? "DBLP Profile"
                  : null
              }
            />
          ))}
          <SocialLink
            href={about.resume}
            title="Download Resume"
            icon={ResumeIcon}
            download
          />
        </div>
      </div>
    </Container>
  );
}
