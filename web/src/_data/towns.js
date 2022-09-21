const { toHTML } = require('@portabletext/to-html')
const groq = require('groq')

const client = require('../utils/sanityClient')
const serializers = require('../utils/serializers')
const overlayDrafts = require('../utils/overlayDrafts')

const hasToken = !!client.config().token

const generateTown = async (town) => {
  try {
    return {
      ...town,
      description: toHTML(town.description, { components: serializers, ...client.config() }),
    }
  } catch (err) {
    // eslint-disable-next-line
    console.error(err)
  }
}

const getTowns = async () => {
  // Learn more: https://www.sanity.io/docs/data-store/how-queries-work
  const filter = groq`*[_type == "town" && defined(slug)]`
  const projection = groq`{
    _id,
    name,
    slug,
    banner,
    description[]{
      ...
    },
    "routes": *[_type == "route" && geo::distance(startFinish->location, ^.location) < 1500 ]{
      title,
      slug,
      mainImage,
      time
    },
    // "shops": *[_type == "place" && geo::distance(location, ^.location) < 1000 ]{
    //   name
    // }
  }`
  const order = '| order(name asc)'
  const query = [filter, projection, order].join(' ')
  // eslint-disable-next-line
  const docs = await client.fetch(query).catch((err) => console.error(err))
  const reducedDocs = overlayDrafts(hasToken, docs)
  const prepareTowns = await Promise.all(
    reducedDocs.map(async (doc) => {
      const town = await generateTown(doc)
      return town
    })
  )
  return prepareTowns
}

module.exports = getTowns
