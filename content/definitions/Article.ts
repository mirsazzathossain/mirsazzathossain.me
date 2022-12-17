import { defineDocumentType } from "contentlayer/source-files";
import readingTime from "reading-time";
import { Author } from "./Author";
import { Category } from "./Category";
import { Image } from "./Image";
import { Series } from "./Series";
import { Tag } from "./Tag";

export const Article = defineDocumentType(() => ({
  name: "Article",
  filePathPattern: "articles/*.mdx",
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      description: "The title of the post",
      required: true,
    },
    publishedAt: {
      type: "string",
      description: "The date the post was published",
    },
    description: {
      type: "string",
      description: "The description of the post",
      required: true,
    },
    seoDescription: {
      type: "string",
      description: "The SEO description of the post",
      required: true,
    },
    status: {
      type: "enum",
      options: ["draft", "published"],
      description: "The status of the post",
      required: true,
    },
    series: {
      type: "nested",
      of: Series,
      description: "The series the post belongs to",
    },
    tags: {
      type: "list",
      of: Tag,
      description: "The tags of the post",
    },
    categories: {
      type: "list",
      of: Category,
      description: "The categories of the post",
      required: true,
    },
    author: {
      type: "nested",
      of: Author,
      description: "The author of the post",
      required: true,
    },
    covers: {
      type: "list",
      of: Image,
      description: "The covers of the post",
      required: true,
    },
  },
  computedFields: {
    readingTime: {
      type: "json",
      resolve: (doc) => readingTime(doc.body.raw),
    },
    wordCount: {
      type: "number",
      resolve: (doc) => doc.body.raw.split(/\s+/gu).length,
    },
    slug: {
      type: "string",
      description: "The slug of the post",
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, ""),
    },
  },
}));
