const { toHTML } = require('@portabletext/to-html')
const groq = require('groq')
const toGeoJSON = require('@mapbox/togeojson')
const { DOMParser } = require('xmldom')

const client = require('../utils/sanityClient')
const serializers = require('../utils/serializers')
const overlayDrafts = require('../utils/overlayDrafts')
const routeMeta = require('../utils/routeMeta')

const hasToken = !!client.config().token

const generateAuthor = async (author) => {
  try {
    // TODO: DRY this up, very inefficient to regenerate for every author
    const authorRoutes = await Promise.all(
      author.routes.map(async (route) => {
        const response = await fetch(route.gpx)
        const xmlString = await response.text()
        const xml = new DOMParser().parseFromString(xmlString)
        const geoJSON = toGeoJSON.gpx(xml)

        const { coordinates } = geoJSON.features[0].geometry
        const { elevationGain, totalDistance } = routeMeta(coordinates)

        return {
          title: route.title,
          slug: route.slug,
          mainImage: route.mainImage,
          time: route.time,
          elevationGain: elevationGain
            ? Number(elevationGain.toFixed(0))
            : elevationGain,
          totalDistance: totalDistance
            ? Number(totalDistance.toFixed(1))
            : totalDistance,
        }
      })
    )

    return {
      ...author,
      routes: authorRoutes,
      body: toHTML(author.bio, { components: serializers, ...client.config() }),
    }
  } catch (err) {
    // eslint-disable-next-line
    console.error(err)
  }
}

const getAuthors = async () => {
  // Learn more: https://www.sanity.io/docs/data-store/how-queries-work
  const filter = groq`*[_type == "author" && defined(slug) && !(_id in path("drafts.**"))]`
  const projection = groq`{
    _id,
    name,
    nickname,
    slug,
    banner,
    image,
    quote,
    bio[]{
      ...,
      children[]{
        ...,
        // Join inline reference
        _type == "authorReference" => {
          // check /studio/documents/authors.js for more fields
          "name": @.author->name,
          "slug": @.author->slug
        }
      }
    },
    "routes": *[_type == "route" && references(^._id) ]{
      title,
      slug,
      mainImage,
      time,
      "gpx": gpxRoute.asset->url,
    }
  }`
  const order = '| order(name asc)'
  const query = [filter, projection, order].join(' ')
  // eslint-disable-next-line
  const docs = await client.fetch(query).catch((err) => console.error(err))
  const reducedDocs = overlayDrafts(hasToken, docs)
  const prepareAuthors = await Promise.all(
    reducedDocs.map(async (doc) => {
      const author = await generateAuthor(doc)
      return author
    })
  )
  return prepareAuthors
}

module.exports = getAuthors
