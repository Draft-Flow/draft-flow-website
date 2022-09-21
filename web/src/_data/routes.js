const { toHTML } = require('@portabletext/to-html')
const groq = require('groq')
const toGeoJSON = require('@mapbox/togeojson')
const mapboxgl = require('mapbox-gl')
const { DOMParser } = require('xmldom')
const turfLineString = require('@turf/helpers').lineString

const client = require('../utils/sanityClient')
const serializers = require('../utils/serializers')
const overlayDrafts = require('../utils/overlayDrafts')
const routeMeta = require('../utils/routeMeta')

const hasToken = !!client.config().token

const generateRoute = async (route) => {
  try {
    let geoJSON = null
    let bounds = null
    // If a GPX file has been added
    //   - convert the GPX (xml) to geoJSON
    //   - create a bounding box for centering the map
    const response = await fetch(route.gpx)
    const xmlString = await response.text()
    const xml = new DOMParser().parseFromString(xmlString)
    geoJSON = toGeoJSON.gpx(xml)

    // Remove the unused coordTimes to reduce filesize
    delete geoJSON.features[0].properties.coordTimes

    const { coordinates } = geoJSON.features[0].geometry
    const llBounds = new mapboxgl.LngLatBounds(coordinates[0], coordinates[0])

    // eslint-disable-next-line
    for (const coord of coordinates) {
      llBounds.extend(coord)
    }

    bounds = llBounds.toArray()

    const {elevation, elevationGain, elevationLoss, totalDistance} = routeMeta(geoJSON.features[0].geometry.coordinates)

    let lineString = null
    if (geoJSON) {
      lineString = turfLineString(geoJSON.features[0].geometry.coordinates, {
        name: route.title,
        path: route.slug.current,
        rating: route.category.title,
        distance: totalDistance
      })
    }

    return {
      ...route,
      geoJSON,
      bounds,
      lineString,
      elevation,
      elevationGain: elevationGain
        ? Number(elevationGain.toFixed(0))
        : elevationGain,
      elevationLoss: elevationLoss
        ? Number(elevationLoss.toFixed(0))
        : elevationLoss,
      totalDistance: totalDistance
        ? Number(totalDistance.toFixed(1))
        : totalDistance,
      body: toHTML(route.body, { components: serializers }),
    }
  } catch (err) {
    // eslint-disable-next-line
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
    excerpt,
    "category": category->{_id,title,slug, description},
    "gpx": gpxRoute.asset->url,
    time,
    osgridref,
    oslandrangermap,
    "startFinish": startFinish->{
      _id,
      name,
      location, 
      slug,
      "type": type[0].placeType->{title, icon}
    },
    sameFinish,
    "finish": finish->{
      _id,
      name,
      location, 
      "type": type[0].placeType->{title, icon}
    },
    "parking": parking->{
      _id,
      name,
      location, 
      "type": type[0].placeType->{title, icon}
    },
    "railway": railway->{
      _id,
      name,
      location, 
      "type": type[0].placeType->{title, icon}
    },
    "bikeServices": bikehire[].place->{
      _id,
      name,
      location, 
      website,
      "types": type[].placeType->{title, icon}
    },
    "places": places[].place->{
      _id,
      name,
      location, 
      "types": type[].placeType->{title, icon}
    },
    body[]{
      ...,
      children[]{
        ...
      }
    },
    "authors": authors[].author->,
    terrain,
    keyPoints,
    facilities
  }`
  const order = '| order(publishedAt asc)'
  const query = [filter, projection, order].join(' ')
  // eslint-disable-next-line
  const docs = await client.fetch(query).catch((err) => console.error(err))
  const reducedDocs = overlayDrafts(hasToken, docs)
  const prepareRoutes = await Promise.all(
    reducedDocs.map(async (doc) => {
      const route = await generateRoute(doc)
      return route
    })
  )
  return prepareRoutes
}

module.exports = getRoutes
