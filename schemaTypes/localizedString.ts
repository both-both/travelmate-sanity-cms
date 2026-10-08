import {defineField, defineType} from 'sanity'

export const localizedString = defineType({
  name: 'localizedString',
  title: 'Tekst på flere sprog',
  type: 'object',
  fields: [
    defineField({name: 'da', title: 'Dansk', type: 'string'}),
    defineField({name: 'en', title: 'English', type: 'string'}),
    defineField({name: 'es', title: 'Español', type: 'string'}),
  ],
})
