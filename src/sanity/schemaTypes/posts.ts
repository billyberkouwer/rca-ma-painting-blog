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
        defineField({
            name: "createdAt",
            title: "Created At",
            type: "datetime",
            description: "Custom creation date (optional). If not set, will use the document's creation date.",
        }),
        defineField({
            name: "pageMeta",
            title: "Page Meta",
            type: "pageMeta",
        })
    ],
})