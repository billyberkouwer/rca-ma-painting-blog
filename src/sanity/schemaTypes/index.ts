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
      name: "pageMeta",
      type: "pageMeta",
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

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [IndexDocument, ImageArrayType, pageMeta, postsSchema, aboutSchema],
}
