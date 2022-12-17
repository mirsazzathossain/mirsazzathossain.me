import { defineNestedType } from "contentlayer/source-files";

export const Category = defineNestedType(() => ({
  name: "Category",
  fields: {
    title: {
      type: "string",
      description: "The title of the category",
      required: true,
    },
  },
}));
