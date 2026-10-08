import {defineField, defineType} from 'sanity'

export const cityInfo = defineType({
  name: 'cityInfo',
  title: 'City info',
  type: 'document',

  fields: [
    defineField({
      name: 'city',
      title: 'By',
      type: 'reference',
      to: [{type: 'city'}],
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'language',
      title: 'Sprog',
      type: 'reference',
      to: [{type: 'language'}],
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'name',
      title: 'Navn',
      type: 'string',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'description',
      title: 'Beskrivelse',
      type: 'text',
    }),
  ],

  preview: {
    select: {title: 'name', subtitle: 'language.name'},
  },
})
