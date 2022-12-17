import { defineNestedType } from "contentlayer/source-files";

export const Image = defineNestedType(() => ({
  name: "Image",
  fields: {
    url: {
      type: "string",
      description: "The URL of the image",
      required: true,
    },
    alt: {
      type: "string",
      description: "The alt text of the image",
      required: true,
    },
  },
}));
