const Image = require('@11ty/eleventy-img')
const path = require('path')

const imageShortcode = async (src, alt, sizes, formats, loading, decoding) => {
  const metadata = await Image(src, {
    widths: [300, 600],
    formats: formats || ['avif', 'png'],
    outputDir: path.join('_site', 'img'),
  })

  const imageAttributes = {
    alt,
    sizes: sizes || '(min-width: 30em) 50vw, 100vw',
    loading: loading || 'lazy',
    decoding: decoding || 'async',
  }

  // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
  return Image.generateHTML(metadata, imageAttributes)
}

module.exports = imageShortcode
