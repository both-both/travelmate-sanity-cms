import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2025-08-15'})

// Kopieret fra TravelMate/src/data/translations.ts
const texts: Record<string, Record<string, string>> = {
  en: {
    'nav.home': 'Home',
    'nav.countries': 'Countries',
    'nav.cities': 'Cities',
    'nav.places': 'Places',
    'nav.about': 'About',

    'header.language': 'Choose language',

    'hero.title': 'Explore the World with TravelMate',
    'hero.text':
      'Discover amazing places, cities and countries. Your next adventure is just a click away.',

    'search.placeholder': 'Find your next destination',
    'search.button': 'Search',
    'search.title': 'Search results',
    'search.empty': 'Enter a search term in the search field.',
    'search.noResults': 'No results for',

    'home.popularCountries': 'Popular Countries',
    'home.popularCities': 'Popular Cities',
    'home.featuredPlaces': 'Featured Places',
    'home.allCountries': 'View all countries',
    'home.allCities': 'View all cities',
    'home.allPlaces': 'View all places',

    'status.loading': 'Loading...',
    'status.noResults': 'No results found.',
    'status.countryNotFound': 'Country not found.',
    'status.cityNotFound': 'City not found.',
    'status.placeNotFound': 'Place not found.',

    'detail.backToCountries': 'Back to countries',
    'detail.backToCities': 'Back to cities',
    'detail.backToPlaces': 'Back to places',
    'detail.citiesIn': 'Cities in',
    'detail.placesIn': 'Popular places in',
    'detail.country': 'Country',
    'detail.city': 'City',
    'detail.address': 'Address',
    'detail.coordinates': 'Coordinates',
    'detail.website': 'Website',
    'detail.map': 'Find on the map',
  },
  da: {
    'nav.home': 'Forside',
    'nav.countries': 'Lande',
    'nav.cities': 'Byer',
    'nav.places': 'Seværdigheder',
    'nav.about': 'Om',

    'header.language': 'Vælg sprog',

    'hero.title': 'Udforsk verden med TravelMate',
    'hero.text': 'Find fantastiske steder, byer og lande. Dit næste eventyr er kun et klik væk.',

    'search.placeholder': 'Find din næste destination',
    'search.button': 'Søg',
    'search.title': 'Søgeresultater',
    'search.empty': 'Indtast et søgeord i søgefeltet.',
    'search.noResults': 'Ingen resultater for',

    'home.popularCountries': 'Populære lande',
    'home.popularCities': 'Populære byer',
    'home.featuredPlaces': 'Udvalgte seværdigheder',
    'home.allCountries': 'Se alle lande',
    'home.allCities': 'Se alle byer',
    'home.allPlaces': 'Se alle seværdigheder',

    'status.loading': 'Indlæser...',
    'status.noResults': 'Ingen resultater fundet.',
    'status.countryNotFound': 'Landet blev ikke fundet.',
    'status.cityNotFound': 'Byen blev ikke fundet.',
    'status.placeNotFound': 'Seværdigheden blev ikke fundet.',

    'detail.backToCountries': 'Tilbage til lande',
    'detail.backToCities': 'Tilbage til byer',
    'detail.backToPlaces': 'Tilbage til seværdigheder',
    'detail.citiesIn': 'Byer i',
    'detail.placesIn': 'Populære seværdigheder i',
    'detail.country': 'Land',
    'detail.city': 'By',
    'detail.address': 'Adresse',
    'detail.coordinates': 'Koordinater',
    'detail.website': 'Hjemmeside',
    'detail.map': 'Find på kortet',
  },
  es: {
    'nav.home': 'Inicio',
    'nav.countries': 'Países',
    'nav.cities': 'Ciudades',
    'nav.places': 'Lugares',
    'nav.about': 'Acerca de',

    'header.language': 'Elegir idioma',

    'hero.title': 'Explora el mundo con TravelMate',
    'hero.text':
      'Descubre lugares, ciudades y países increíbles. Tu próxima aventura está a un clic.',

    'search.placeholder': 'Encuentra tu próximo destino',
    'search.button': 'Buscar',
    'search.title': 'Resultados de búsqueda',
    'search.empty': 'Escribe una palabra en el campo de búsqueda.',
    'search.noResults': 'No hay resultados para',

    'home.popularCountries': 'Países populares',
    'home.popularCities': 'Ciudades populares',
    'home.featuredPlaces': 'Lugares destacados',
    'home.allCountries': 'Ver todos los países',
    'home.allCities': 'Ver todas las ciudades',
    'home.allPlaces': 'Ver todos los lugares',

    'status.loading': 'Cargando...',
    'status.noResults': 'No se encontraron resultados.',
    'status.countryNotFound': 'País no encontrado.',
    'status.cityNotFound': 'Ciudad no encontrada.',
    'status.placeNotFound': 'Lugar no encontrado.',

    'detail.backToCountries': 'Volver a países',
    'detail.backToCities': 'Volver a ciudades',
    'detail.backToPlaces': 'Volver a lugares',
    'detail.citiesIn': 'Ciudades en',
    'detail.placesIn': 'Lugares populares en',
    'detail.country': 'País',
    'detail.city': 'Ciudad',
    'detail.address': 'Dirección',
    'detail.coordinates': 'Coordenadas',
    'detail.website': 'Sitio web',
    'detail.map': 'Buscar en el mapa',
  },
}

// Laver "nav.home": "Home" om til { nav: { home: "Home" } }
const toNested = (flat: Record<string, string>) => {
  const nested: Record<string, Record<string, string>> = {}

  for (const [key, value] of Object.entries(flat)) {
    const [group, field] = key.split('.')
    nested[group] = {...nested[group], [field]: value}
  }

  return nested
}

const run = async () => {
  const languages = await client.fetch<{_id: string; code: string}[]>(
    `*[_type == "language" && !(_id in path("drafts.**"))]{_id, code}`,
  )

  const transaction = client.transaction()

  for (const language of languages) {
    const flat = texts[language.code]
    if (!flat) continue

    transaction.createOrReplace({
      _id: `uiText-${language.code}`,
      _type: 'uiText',
      language: {_type: 'reference', _ref: language._id},
      ...toNested(flat),
    })
  }

  const result = await transaction.commit()
  console.log(`${result.results.length} uiText-dokumenter oprettet/opdateret`)
}

run()
