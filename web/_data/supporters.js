const { toHTML } = require('@portableText/to-html')
const groq = require('groq')

const client = require('../utils/sanityClient.js')
const serializers = require('../utils/serializers')
const overlayDrafts = require('../utils/overlayDrafts')
const hasToken = !!client.config().token

const generateSupporter = async (supporter) => {
  try {
    return {
      ...supporter,
      body: toHTML(supporter.description, { serializers, ...client.config() })
    }
  } catch (err) {
    console.error(err)
  }
}

const getSupporters = async () => {
  // Learn more: https://www.sanity.io/docs/data-store/how-queries-work
  const filter = groq`*[_type == "place" && defined(slug) && supporter.isSupporter == true && supporter.expiration > now()]`
  const projection = groq`{
    _id,
    name,
    slug,
    supporter {
      logo
    },
    website,
    description,
    "routes": *[_type == "route" && (references(startFinish._ref) || place._ref in stops[]->stop._id)]{
      title,
      "slug": slug.current,
    }
  }`
  const order = `| order(name asc)`
  const query = [filter, projection, order].join(' ')
  const docs = await client.fetch(query).catch(err => console.error(err))
  const reducedDocs = overlayDrafts(hasToken, docs)
  const prepareSupporters = await Promise.all(reducedDocs.map(async (doc) => {
    const supporter = await generateSupporter(doc)
    return supporter
  }))
  return prepareSupporters
}

module.exports = getSupporters