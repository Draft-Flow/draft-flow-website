const urlFor = require('../imageUrl')

const bannerURL = (ref, width = '600') => {
  if (!ref) {
    return null
  }
  return urlFor(ref).blur(2).saturation(-100).width(width).url()
}

module.exports = bannerURL
