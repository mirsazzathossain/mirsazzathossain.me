import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const imageSchema = z.object({
  url: z.string(),
  alt: z.string(),
});

const tagSchema = z.object({
  title: z.string(),
});

const categorySchema = z.object({
  title: z.string(),
});

const seriesSchema = z.object({
  title: z.string(),
  order: z.number(),
});

const authorSchema = z.object({
  name: z.string(),
  designation: z.string(),
  url: z.string().optional(),
  avatar: imageSchema,
});

const referenceSchema = z.object({
  text: z.string(),
  href: z.string().optional(),
});

const articles = defineCollection({
  loader: glob({
    base: "./src/content/articles",
    pattern: "**/*.mdx",
  }),
  schema: z.object({
    title: z.string(),
    publishedAt: z.coerce.date().optional(),
    description: z.string(),
    seoDescription: z.string(),
    status: z.enum(["draft", "published"]),
    series: seriesSchema.optional(),
    tags: z.array(tagSchema).optional(),
    categories: z.array(categorySchema),
    author: authorSchema,
    covers: z.array(imageSchema),
    references: z.array(referenceSchema).optional(),
  }),
});

const snippets = defineCollection({
  loader: glob({
    base: "./src/content/snippets",
    pattern: "**/*.mdx",
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    language: z.string(),
    logo: imageSchema,
  }),
});

export const collections = { articles, snippets };
