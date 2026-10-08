import {defineField, defineType} from 'sanity'

export const localizedText = defineType({
  name: 'localizedText',
  title: 'Lang tekst på flere sprog',
  type: 'object',
  fields: [
    defineField({name: 'da', title: 'Dansk', type: 'text'}),
    defineField({name: 'en', title: 'English', type: 'text'}),
    defineField({name: 'es', title: 'Español', type: 'text'}),
  ],
})
