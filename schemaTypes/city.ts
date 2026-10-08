import {defineField, defineType} from 'sanity'

export const city = defineType({
  name: 'city',
  title: 'City',
  type: 'document',

  fields: [
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'country',
      title: 'Land',
      type: 'reference',
      to: [{type: 'country'}],
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
    select: {title: 'slug.current', media: 'image'},
  },
})
