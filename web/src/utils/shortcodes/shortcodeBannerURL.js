const urlFor = require('../imageUrl')

const bannerURL = (src, width = '600') => {
  if (!src) {
    return null
  }
  return urlFor(src).blur(2).saturation(-100).width(width).url()
}

module.exports = bannerURL
