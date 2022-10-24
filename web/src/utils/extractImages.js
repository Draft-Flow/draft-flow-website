const extractImages = (blocks) => {
  let images = []
  if (blocks) {
    images = blocks.filter((block) => block._type === 'mainImage')
  }

  if (images.length) {
    return images.map(({ alt, asset, caption, location }) => ({
      alt,
      asset,
      caption,
      location,
    }))
  }

  return images
}

module.exports = extractImages
