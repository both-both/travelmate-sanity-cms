import {defineField, defineType} from 'sanity'

export const language = defineType({
  name: 'language',
  title: 'Sprog',
  type: 'document',

  fields: [
    defineField({
      name: 'name',
      title: 'Navn',
      type: 'string',
      description: 'Vælg sprog',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'code',
      title: 'Sprogkode',
      type: 'string',
      description: 'To bogstaver, fx da eller en',
      validation: (rule) => rule.required(),
    }),
  ],
})
