const imageUrl = require('@sanity/image-url')
const sanityClient = require('./sanityClient')

// Learn more: https://www.sanity.io/docs/asset-pipeline/image-urls
const builder = imageUrl(sanityClient)

const urlFor = (source) => {
  try {
    const imageURL = builder.image(source)
    return imageURL
  } catch (err) {
    console.log(err)
  }
}

module.exports = urlFor
