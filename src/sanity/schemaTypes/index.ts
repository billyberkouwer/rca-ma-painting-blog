import { defineField, defineType, type SchemaTypeDefinition } from 'sanity'
import { pageMeta } from '../pageMeta'
import { postsSchema } from './posts'
import { aboutSchema } from './about'

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
          to: [{ type: "imageBlock" }, { type: "textBlock" }],
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
      type: "array",
      of: [{ type: "block" }],
      name: "caption",
      title: "Caption",
    })
  ]
})

export const ImageArrayType = defineType({
  type: "object",
  name: "imageArray",
  title: "Image Collection",
  fields: [
    defineField({
      type: "array",
      name: "images",
      title: "Images",
      of: [{ type: "image" }],
    }),
    defineField({
      type: "string",
      name: "alt",
      title: "Alt",
    }),
    defineField({
      type: "array",
      of: [{ type: "block" }],
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
  types: [IndexDocument, TextType, ImageType, ImageArrayType, pageMeta, postsSchema, aboutSchema],
}
