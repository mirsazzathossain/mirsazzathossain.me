import { defineDocumentType } from "contentlayer/source-files";
import { Image } from "./Image";

export const Snippets = defineDocumentType(() => ({
  name: "Snippet",
  filePathPattern: "snippets/*.mdx",
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      description: "The title of the snippet",
      required: true,
    },
    description: {
      type: "string",
      description: "The description of the snippet",
      required: true,
    },
    language: {
      type: "string",
      description: "The language of the snippet",
      required: true,
    },
    logo: {
      type: "nested",
      of: Image,
      description: "The logo of the snippet",
      required: true,
    },
  },
  computedFields: {
    slug: {
      type: "string",
      description: "The slug of the snippet",
      required: true,
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, ""),
    },
  },
}));
