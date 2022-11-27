import { Container } from "components/Container";
import {
  GitHubIcon,
  GoogleScholarIcon,
  LinkedInIcon,
  TwitterIcon,
} from "components/SocialIcons";
import Link from "next/link";

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
  return (
    <Container className="mt-9">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
          Mir Sazzat Hossain
        </h1>
        <h2 className="text-gray-600 dark:text-gray-400 tracking-tighter mb-4">
          Research Assistant at{" "}
          <Link
            className="font-semibold"
            href="http://ccds.ai/"
            target={"_blank"}
          >
            Center for Computational & Data Sciences
          </Link>
        </h2>
        <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
          I'm a recent college graduate with a solid foundation in computer
          science as well as competence in exploratory data analysis, machine
          learning, computer vision, and statistics. I am currently employed as
          a Research Assistant at IUB's Center for Computational and Data
          Sciences (CCDS).
          <br />
          Aspects of my research include computer vision, group theory, manifold
          learning, and geometric machine learning. Due to my enthusiasm for
          learning new data science topics, data visualization, and conducting
          research, I value making significant contributions and having an
          impact that aids in others' learning.
        </p>
        <div className="mt-6 flex gap-6">
          <SocialLink
            href="https://twitter.com/mir_sazzat"
            aria-label="Follow on Twitter"
            icon={TwitterIcon}
          />
          <SocialLink
            href="https://scholar.google.com/"
            aria-label="Follow on Google Scholar"
            icon={GoogleScholarIcon}
          />
          <SocialLink
            href="https://github.com/mirsazzathossain"
            aria-label="Follow on GitHub"
            icon={GitHubIcon}
          />
          <SocialLink
            href="https://linkedin.com/in/mirsazzathossain"
            aria-label="Follow on LinkedIn"
            icon={LinkedInIcon}
          />
        </div>
      </div>
    </Container>
  );
}
