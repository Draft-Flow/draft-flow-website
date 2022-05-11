const BlocksToMarkdown = require('@sanity/block-content-to-markdown')
const groq = require('groq')
const toGeoJSON = require('@mapbox/togeojson')
const mapboxgl = require('mapbox-gl')
const DOMParser = require('xmldom').DOMParser

const client = require('../utils/sanityClient.js')
const serializers = require('../utils/serializers')
const overlayDrafts = require('../utils/overlayDrafts')
const hasToken = !!client.config().token

const generateRoute = async (route) => {
  try {
    let geoJSON = null
    let bounds = null
    // If a GPX file has been added
    //   - convert the GPX (xml) to geoJSON
    //   - create a bounding box for centering the map
    if (route.gpx) {
      const response = await fetch(route.gpx)
      const xmlString = await response.text()
      const xml = new DOMParser().parseFromString(xmlString)
      geoJSON = toGeoJSON.gpx(xml)

      const coordinates = geoJSON.features[0].geometry.coordinates;
      const llBounds = new mapboxgl.LngLatBounds(
        coordinates[0],
        coordinates[0]
      )
      
      for (const coord of coordinates) {
        llBounds.extend(coord);
      }

      bounds = llBounds.toArray()
    }


    return {
      ...route,
      geoJSON: geoJSON,
      bounds: bounds,
      body: BlocksToMarkdown(route.body, { serializers, ...client.config() })
    }
  } catch (err) {
    console.error(err)
  }
}

const getRoutes = async () => {
  // Learn more: https://www.sanity.io/docs/data-store/how-queries-work
  const filter = groq`*[_type == "route" && defined(slug) && publishedAt < now()]`
  const projection = groq`{
    _id,
    publishedAt,
    title,
    slug,
    mainImage,
    "excerpt": excerpt[0].children[0].text,
    "categories": categories[]->{_id,title},
    "gpx": gpxRoute.asset->url,
    body[]{
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
    "authors": authors[].author->
  }`
  const order = `| order(publishedAt asc)`
  const query = [filter, projection, order].join(' ')
  const docs = await client.fetch(query).catch(err => console.error(err))
  const reducedDocs = overlayDrafts(hasToken, docs)
  const prepareRoutes = await Promise.all(reducedDocs.map(async (doc) => {
    const route = await generateRoute(doc)
    return route
  }))
  return prepareRoutes
}

module.exports = getRoutes