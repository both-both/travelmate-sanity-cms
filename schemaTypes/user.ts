import {defineField, defineType} from 'sanity'

export const user = defineType({
  name: 'user',
  title: 'User',
  type: 'document',

  fields: [
    defineField({
      name: 'user',
      type: 'string',
    }),

    defineField({
      name: 'email',
      type: 'email',
    }),

    defineField({
      name: 'Profilpicture',
      type: 'image',
    }),

    defineField({
      name: 'Description',
      type: 'text',
    }),
  ],
})
