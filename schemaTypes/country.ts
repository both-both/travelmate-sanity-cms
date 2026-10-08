import {defineField, defineType} from 'sanity'

export const country = defineType({
  name: 'country',
  title: 'Country',
  type: 'document',

  fields: [
    defineField({
      name: 'code',
      title: 'Landekode',
      type: 'string',
      description: 'ISO-kode med to bogstaver, fx DK',
      validation: (rule) => rule.required().length(2).uppercase(),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'image',
      title: 'Billede',
      type: 'image',
      options: {hotspot: true},
    }),
  ],

  preview: {
    select: {title: 'slug.current', subtitle: 'code', media: 'image'},
  },
})
