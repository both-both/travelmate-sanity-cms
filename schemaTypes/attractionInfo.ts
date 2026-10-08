import {defineField, defineType} from 'sanity'

export const attractionInfo = defineType({
  name: 'attractionInfo',
  title: 'Attraction info',
  type: 'document',

  fields: [
    defineField({
      name: 'attraction',
      title: 'Seværdighed',
      type: 'reference',
      to: [{type: 'attraction'}],
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
