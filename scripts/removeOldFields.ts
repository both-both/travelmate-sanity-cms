import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2025-08-15'})

// Fjerner de gamle sprogfelter, som nu ligger i Info-dokumenterne
const run = async () => {
  const ids = await client.fetch<string[]>(
    `*[_type in ["country", "city", "attraction"] && (defined(name) || defined(description))]._id`,
  )

  const transaction = client.transaction()
  ids.forEach((id) => transaction.patch(id, (patch) => patch.unset(['name', 'description'])))

  await transaction.commit()
  console.log(`${ids.length} dokumenter ryddet`)
}

run()
