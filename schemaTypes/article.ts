import {defineField, defineType} from 'sanity'

export const article = defineType({
  name: 'article',
  title: 'Article',
  type: 'document',

  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),

    defineField({
      name: 'slug',
      type: 'slug',
    }),

    defineField({
      name: 'teaser',
      type: 'string',
    }),

    defineField({
      name: 'description',
      type: 'text',
    }),

    defineField({
      name: 'image',
      type: 'image',
    }),

    defineField({
      name: 'author',
      type: 'reference',
      to: [{type: 'user'}],
    }),
  ],
})
