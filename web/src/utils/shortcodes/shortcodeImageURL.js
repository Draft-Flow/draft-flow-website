const urlFor = require('../imageUrl')

const shortcodeImageURL = (image, width = '600') => {
  if (!image) {
    return null
  }
  return urlFor(image).width(width).url()
}

 module.exports = shortcodeImageURL
