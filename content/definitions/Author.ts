import { defineNestedType } from "contentlayer/source-files";

import { Image } from "./Image";

export const Author = defineNestedType(() => ({
  name: "Author",
  fields: {
    name: {
      type: "string",
      description: "The name of the author",
      required: true,
    },
    designation: {
      type: "string",
      description: "The designation of the author",
      required: true,
    },
    url: {
      type: "string",
      description: "The URL of the author website",
    },
    avatar: {
      type: "nested",
      of: Image,
      description: "The avatar of the author",
      default: {
        src: "/images/authors/default.png",
        alt: "Author",
      },
    },
  },
}));
