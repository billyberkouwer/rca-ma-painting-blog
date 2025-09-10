import { defineField, defineType } from "sanity";

export const postsSchema = defineType({
    name: "posts",
    title: "Posts",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
        }),
        defineField({
            name: "textContent",
            title: "Text Content",
            type: "array",
            of: [{ type: "block" }],
        }),
        defineField({
            name: "imageArray",
            type: "imageArray",
        }),
    ],
})