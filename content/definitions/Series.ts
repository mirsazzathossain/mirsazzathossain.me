import { defineNestedType } from "contentlayer/source-files";

export const Series = defineNestedType(() => ({
  name: "Series",
  fields: {
    title: {
      type: "string",
      description: "The title of the series",
      required: true,
    },
    order: {
      type: "number",
      description: "The order of the series",
      required: true,
    },
  },
}));
