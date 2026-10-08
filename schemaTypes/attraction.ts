import {defineField, defineType} from 'sanity'

export const attraction = defineType({
  name: 'attraction',
  title: 'Attraction',
  type: 'document',

  fields: [
    defineField({
      name: 'name',
      title: 'Seværdighed',
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
      name: 'city',
      title: 'By',
      type: 'reference',
      to: [{type: 'city'}],
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
    defineField({
      name: 'location',
      title: 'Placering',
      type: 'geopoint',
    }),
    defineField({
      name: 'address',
      title: 'Adresse',
      type: 'string',
    }),
    defineField({
      name: 'website',
      title: 'Hjemmeside',
      type: 'url',
    }),
  ],
  preview: {
    select: {title: 'name.da', subtitle: 'address', media: 'image'},
  },
})
