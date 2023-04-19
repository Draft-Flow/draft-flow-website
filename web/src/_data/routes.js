const groq = require('groq')
const toGeoJSON = require('@mapbox/togeojson')
const mapboxgl = require('mapbox-gl')
const { DOMParser } = require('xmldom')
const turfLineString = require('@turf/helpers').lineString
const { toHTML } = require('@portabletext/to-html')
const client = require('../utils/sanityClient')
const serializers = require('../utils/serializers')
//const routeMeta = require('./utils/routeMeta')

const generateDoc = async (route) => {
  try {
    // let bounds
    // let llBounds = null
    // let paths = []
    
    // if (route && !!route.paths?.length) {
    //   paths = await Promise.all(route.paths.map(async (path) => {
    //     const response = await fetch(path.gpx)
    //     const xmlString = await response.text()
    //     const xml = new DOMParser().parseFromString(xmlString)
    //     const geoJSON = toGeoJSON.gpx(xml)

    //     // Remove the unused coordTimes to reduce filesize
    //     delete geoJSON.features[0].properties.coordTimes

    //     const { coordinates } = geoJSON.features[0].geometry
        
    //     if (!llBounds) {
    //       llBounds = new mapboxgl.LngLatBounds(coordinates[0], coordinates[0])
    //     }
        
    //     // eslint-disable-next-line
    //     for (const coord of coordinates) {
    //       llBounds.extend(coord)
    //     }
    //     console.log('getting meta', path.title)
    //     const { elevation, elevationGain, elevationLoss, totalDistance } =
    //       routeMeta(coordinates)

    //     let lineString = null
    //     if (geoJSON) {
    //       lineString = turfLineString(coordinates, {
    //         name: path.title,
    //         distance: totalDistance,
    //         ascent: elevationGain,
    //       })
    //     }

    //     return {
    //       elevation,
    //       elevationGain,
    //       elevationLoss,
    //       totalDistance,
    //       geoJSON,
    //       lineString,
    //     }
    //   }))

    //   bounds = llBounds.toArray()
    // }

    return ({
      ...route,
      // paths,
      // bounds,
      excerpt: route.excerpt ? toHTML(route.excerpt[0], { components: serializers }) : '', 
      body: route.body ? toHTML(route.body.slice(1), { components: serializers }) : '',
    })
  } catch (err) {
    // eslint-disable-next-line
    console.error(err)
  }
}

const getRoutes = async () => {
  const filter = groq`*[_type == "route"]`
  const projection = groq`{
    "id": _id,
    title,
    "slug": slug.current,
    website,
    mainImage {
      "ref": asset._ref,
      alt
    },
    paths[] {
      title,
      description,
      "gpx": gpxRoute.asset->url,
    },
    excerpt,
    body,
  }`

  const order = ''
  const query = [filter, projection, order].join(' ')
  const docs = await client.fetch(query).catch((err) => {
    // eslint-disable-next-line
    console.error(err)
  })
  const prepareDocs = await Promise.all(
    docs.map(async (doc) => {
      const route = await generateDoc(doc)
      return route
    })
  )
  
  return prepareDocs
}

module.exports = getRoutes
