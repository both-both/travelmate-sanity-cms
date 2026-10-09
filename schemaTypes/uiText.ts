import {defineField, defineType} from 'sanity'

// Laver et objekt med en tekstlinje pr. felt, fx group('nav', 'Navigation', ['home', 'countries'])
const group = (name: string, title: string, keys: string[]) =>
  defineField({
    name,
    title,
    type: 'object',
    options: {collapsible: true, collapsed: true},
    fields: keys.map((key) => defineField({name: key, type: 'string'})),
  })

export const uiText = defineType({
  name: 'uiText',
  title: 'UI-tekster',
  type: 'document',

  fields: [
    defineField({
      name: 'language',
      title: 'Sprog',
      type: 'reference',
      to: [{type: 'language'}],
      validation: (rule) => rule.required(),
    }),
    group('nav', 'Navigation', ['home', 'countries', 'cities', 'places', 'about']),
    group('header', 'Header', ['language']),
    group('hero', 'Hero', ['title', 'text']),
    group('search', 'Søgning', ['placeholder', 'button', 'title', 'empty', 'noResults']),
    group('home', 'Forside', [
      'popularCountries',
      'popularCities',
      'featuredPlaces',
      'allCountries',
      'allCities',
      'allPlaces',
    ]),
    group('status', 'Status', [
      'loading',
      'noResults',
      'countryNotFound',
      'cityNotFound',
      'placeNotFound',
    ]),
    group('detail', 'Detaljesider', [
      'backToCountries',
      'backToCities',
      'backToPlaces',
      'citiesIn',
      'placesIn',
      'country',
      'city',
      'address',
      'coordinates',
      'website',
      'map',
    ]),
  ],

  preview: {
    select: {title: 'language.name'},
  },
})
