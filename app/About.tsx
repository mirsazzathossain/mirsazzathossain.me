"use client";
import { Container } from "components/Container";
import { DownloadFileIcon } from "components/Icons";
import {
  GitHubIcon,
  GoogleScholarIcon,
  LinkedInIcon,
  TwitterIcon,
} from "components/SocialIcons";
import Link from "next/link";
import useSWR from "swr";
import fetcher from "utils/fetcher";

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

export default function About() {
  const { data, error } = useSWR("/api/about", fetcher);
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  const about = data;
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
        <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
          {about.description}
        </p>
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
                  : null
              }
            />
          ))}
          <SocialLink
            href={about.resume}
            title="Download Resume"
            icon={DownloadFileIcon}
            download
          />
        </div>
      </div>
    </Container>
  );
}
