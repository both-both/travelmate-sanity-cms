import {defineField, defineType} from 'sanity'

export const countryInfo = defineType({
  name: 'countryInfo',
  title: 'Country info',
  type: 'document',

  fields: [
    defineField({
      name: 'country',
      title: 'Land',
      type: 'reference',
      to: [{type: 'country'}],
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
