import { defineField, defineType } from "sanity";

export const aboutSchema = defineType({
  type: "document",
  name: "about",
  title: "About Page",
  fields: [
    defineField({
      type: "string",
      name: "title",
      title: "Title",
    }),
    defineField({
      name: "textContent",
      title: "Text Content",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "pageMeta",
      title: "Page Meta",
      type: "pageMeta",
    })
  ]
});
