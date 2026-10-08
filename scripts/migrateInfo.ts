import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2025-08-15'})

// Hovedtype og den Info-type, dens oversættelser skal flyttes til
const types = [
  {type: 'country', infoType: 'countryInfo'},
  {type: 'city', infoType: 'cityInfo'},
  {type: 'attraction', infoType: 'attractionInfo'},
]

type Localized = Record<string, string | undefined>

const run = async () => {
  const languages = await client.fetch<{_id: string; code: string}[]>(
    `*[_type == "language" && !(_id in path("drafts.**"))]{_id, code}`,
  )

  const transaction = client.transaction()

  for (const {type, infoType} of types) {
    const docs = await client.fetch<{_id: string; name: Localized; description?: Localized}[]>(
      `*[_type == $type && !(_id in path("drafts.**"))]{_id, name, description}`,
      {type},
    )

    for (const doc of docs) {
      for (const language of languages) {
        transaction.createOrReplace({
          _id: `${infoType}-${doc._id}-${language.code}`,
          _type: infoType,
          [type]: {_type: 'reference', _ref: doc._id},
          language: {_type: 'reference', _ref: language._id},
          name: doc.name[language.code],
          description: doc.description?.[language.code],
        })
      }
    }
  }

  const result = await transaction.commit()
  console.log(`${result.results.length} Info-dokumenter oprettet/opdateret`)
}

run()
