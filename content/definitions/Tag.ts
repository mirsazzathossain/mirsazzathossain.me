import { defineNestedType } from "contentlayer/source-files";

export const Tag = defineNestedType(() => ({
  name: "Tag",
  fields: {
    title: {
      type: "string",
      description: "The title of the tag",
      required: true,
    },
  },
}));
