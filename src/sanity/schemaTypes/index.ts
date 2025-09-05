import { defineField, defineType, type SchemaTypeDefinition } from 'sanity'
import { pageMeta } from '../pageMeta'

const IndexDocument = defineType({
  type: "document",
  name: "index",
  title: "Index",
  fields: [
    defineField({
      type: "string",
      name: "title",
      title: "Title",
    }),
    defineField({
      name: "elements",
      title: "Elements",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "imageBlock" }, {type: "textBlock"}],
        },
      ],
    }),
    defineField({
      name: "pageMeta",
      type: "pageMeta",
    })
  ]
})

export const ImageType = defineType({
  type: "document",
  name: "imageBlock",
  title: "Image",
  fields: [
    defineField({
      type: "image",
      name: "image",
      title: "Image",
    }),
    defineField({
      type: "string",
      name: "alt",
      title: "Alt",
    }),
    defineField({
      type: "text",
      name: "caption",
      title: "Caption",
    })
  ]
})

export const TextType = defineType({
  type: "document",
  name: "textBlock",
  title: "Text",
  fields: [
    defineField({
      type: "string",
      name: "title",
      title: "Title",
    }),
    defineField({
      type: "array",
      name: "text",
      of: [{ type: "block" }],
      title: "Text",
    })
  ]
})

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [IndexDocument, TextType, ImageType, pageMeta],
}
