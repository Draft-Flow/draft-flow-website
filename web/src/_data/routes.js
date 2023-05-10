const groq = require('groq')
const toGeoJSON = require('@mapbox/togeojson')
const mapboxgl = require('mapbox-gl')
const { DOMParser } = require('xmldom')
const turfLineString = require('@turf/helpers').lineString
const turfMultiLineString = require('@turf/helpers').multiLineString
const turfSimplify = require('@turf/simplify')
const { toHTML } = require('@portabletext/to-html')
const client = require('../utils/sanityClient')
const serializers = require('../utils/serializers')
const generateRouteMeta = require('../utils/generateRouteMeta')
const { COLORS } = require('../utils/constants')

const generateRoute = async (route) => {
  try {
    let bounds
    let llBounds = null
    let paths = []
    const multiLineStringCoords = []
    let maxLength = null
    let maxLengthIDX = null
    
    if (route && !!route.paths?.length) {
      paths = await Promise.all(route.paths.map(async (path, idx) => {
        const response = await fetch(path.gpx)
        const xmlString = await response.text()
        const xml = new DOMParser().parseFromString(xmlString)
        const geoJSON = toGeoJSON.gpx(xml)

        // Remove the unused coordTimes to reduce filesize
        delete geoJSON.features[0].properties.coordTimes

        const { coordinates } = geoJSON.features[0].geometry
        multiLineStringCoords.push(coordinates)
        
        if (!llBounds) {
          llBounds = new mapboxgl.LngLatBounds(coordinates[0], coordinates[0])
        }
        
        // eslint-disable-next-line
        for (const coord of coordinates) {
          llBounds.extend(coord)
        }
        const { elevation, elevationGain, elevationLoss, totalDistance } =
        generateRouteMeta(coordinates)

        if (!maxLength || elevation.length > maxLength.length) {
          maxLength = elevation
          maxLengthIDX = idx
        }

        let lineString = null
        if (geoJSON) {
          lineString = turfLineString(coordinates, {
            name: path.title,
            slug: route.slug,
            distance: totalDistance,
            ascent: elevationGain,
            color: COLORS[idx % (COLORS.length - 1)],
            offset: idx
          })
        }

        return {
          elevation,
          elevationGain,
          elevationLoss,
          totalDistance,
          geoJSON,
          lineString,
          simpleLineString: turfSimplify(lineString, {tolerance: 0.0003, highQuality: false}),
        }
      }))

      bounds = llBounds.toArray()
    }

    const multiLineString = turfMultiLineString(multiLineStringCoords)

    let areaGeoJSON = null
    if (route.area) {
      const areaResponse = await fetch(route.area)
      areaGeoJSON = await areaResponse.json()
      areaGeoJSON.properties.name = route.title
      areaGeoJSON.properties.slug = route.slug
    }

    return ({
      ...route,
      area: areaGeoJSON,
      paths,
      multiLineString,
      maxLength,
      maxLengthIDX,
      bounds,
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
      "id": gpxRoute.asset->_id,
      title,
      description,
      "gpx": gpxRoute.asset->url,
      "category": category->{
        "color": color.hex,
        "slug": slug.current,
        title
      },
    },
    excerpt,
    "area": area.asset->url,
    body,
  }`

  const order = ''
  const query = [filter, projection, order].join(' ')
  const docs = await client.fetch(query).catch((err) => {
    // eslint-disable-next-line
    console.error(err)
  })
  
  const preparedRoutes = await Promise.all(
    docs.map(async (doc) => {
      const preparedRoute = await generateRoute(doc)
      return preparedRoute
    })
  )
  
  return preparedRoutes
}

module.exports = getRoutes
