"use client";
import { Card } from "components/Card";
import { LinkIcon } from "components/Icons";
import Image from "next/image";
import React from "react";

export default function ProjectCard({
  project,
}: {
  project: Project;
}): JSX.Element {
  const [isImageLoading, setImageLoading] = React.useState(true);
  return (
    <Card>
      <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
        <Image
          src={`/images/${project.logo.src}`}
          alt={project.logo.alt}
          height={32}
          width={32}
          onLoad={() => setImageLoading(false)}
          className={`${
            isImageLoading
              ? "blur-sm transition ease-in duration-100"
              : "blue-none transition ease-in duration-100"
          } h-8 w-8`}
        />
      </div>
      <h2 className="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
        <Card.Link href={project.link.href}>{project.title}</Card.Link>
      </h2>
      <Card.Description>{project.description}</Card.Description>
      <p className="relative z-10 mt-6 flex text-sm font-medium text-zinc-400 transition group-hover:text-teal-500 dark:text-zinc-200">
        <LinkIcon className="h-6 w-6 flex-none" />
        <span className="ml-2">{project.link.label}</span>
      </p>
    </Card>
  );
}
