import { defineType } from "sanity";

const OGTYPES = ['website', 'article', 'blog', 'video', 'image']

export default defineType({
  name: "basic",
  type: "object",
  title: "Basic Social Share Info",
  fields: [
    {
      type: "string",
      title: "Page Title",
      name: "ogTitle",
      description:
        "Set the title Open Graph should use. In most situations, this should be different from the value of the title prop",
    },
    {
      type: "image",
      title: "Image",
      name: "image",
      description:
        "The image that should be used in social media previews. The ideal size for this image is 1200x630px. If you define this, you must define two other OG basic properties as well: title and type.",
      validation: (Rule) => Rule.required(),
    },
    {
      type: "string",
      name: "ogType",
      title: "OG Type",
      options: { list: OGTYPES },
      initialValue: OGTYPES[0],
    },
  ],
});
