const Image = require('@11ty/eleventy-img')
const path = require('path')

const imageShortcode = async (
  src,
  alt,
  sizes,
  formats,
  loading,
  decoding,
  widths,
  classes,
  animated
) => {
  const metadata = await Image(src, {
    widths: widths || [300, 600],
    formats: animated ? ['webp', 'gif'] : formats || ['webp', 'png'],
    outputDir: path.join('_site', 'img'),
    sharpOptions: {
      animated: animated || false
    }
  })

  const imageAttributes = {
    alt: (alt ?? '').split('\n')[0].replace(/['"]/g, '\\$&'),
    sizes: sizes || '(min-width: 30em) 50vw, 100vw',
    loading: loading || 'lazy',
    decoding: decoding || 'async',
    class: classes || null,
  }

  // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
  return Image.generateHTML(metadata, imageAttributes)
}

module.exports = imageShortcode
