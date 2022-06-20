const imageUrl = require('@sanity/image-url')
const sanityClient = require('./sanityClient')

// Learn more: https://www.sanity.io/docs/asset-pipeline/image-urls
const urlFor = (source) => imageUrl(sanityClient).image(source)

module.exports = urlFor
