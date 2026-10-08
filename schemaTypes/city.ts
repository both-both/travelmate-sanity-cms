import {defineField, defineType} from 'sanity'

export const city = defineType({
  name: 'city',
  title: 'City',
  type: 'document',

  fields: [
    defineField({
      name: 'name',
      title: 'By',
      type: 'localizedString',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'name.en'},
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
      name: 'description',
      title: 'Beskrivelse',
      type: 'localizedText',
    }),

    defineField({
      name: 'image',
      title: 'Billede',
      type: 'image',
      options: {hotspot: true},
    }),
  ],
  preview: {
    select: {title: 'name.da', subtitle: 'country.name.da', media: 'image'},
  },
})
