const Image = require('@11ty/eleventy-img')
const urlFor = require('../imageUrl')

const cardImageShortcode = async (
  image,
  alt = '',
  sizes = '(min-width: 30em) 50vw, 100vw',
  classes = null
) => {
  if (alt === undefined) {
    // You bet we throw an error on missing alt (alt="" works okay)
    throw new Error(`Missing \`alt\` on myImage from: ${image.asset._ref}`)
  }

  const {_ref: ref } = image.asset
  // eslint-disable-next-line
  const [type, id, dimensions] = ref.split(['-'])
  const [imageX, imageY] = dimensions.split('x')

  const width = 1200
  const cropWidth = Math.floor(.5 * imageX)
  const left = image.hotspot && image.hotspot.x < 0.5 ? Math.floor(image.hotspot.x * imageX) - Math.floor(cropWidth/2) : cropWidth

  const imageURL = urlFor(ref)
    .rect(left, 0, cropWidth, imageY)
    .dpr(2)
    .width(width)
    .url()

  const metadata = await Image(imageURL, {
    widths: [300, 600],
    formats: ['avif', 'jpeg'],
    outputDir: './_site/img/',
    urlPath: '/img/',
    cacheOptions: {
      duration: '1d',
    },
  })

  return `<picture class="flex h-full">
    ${Object.values(metadata)
      .map(
        (imageFormat) =>
          `<source type="${imageFormat[0].sourceType}" srcset="${imageFormat
            .map((entry) => entry.srcset)
            .join(', ')}" sizes="${sizes}">`
      )
      .join('\n')}
      <img
        src="${metadata.jpeg[0].url}"
        width="${cropWidth}"
        height="${imageY}"
        ${classes !== null ? `class="${classes}"` : ''}
        alt="${alt}"
        loading="lazy"
        decoding="async">
    </picture>`
}

module.exports = cardImageShortcode
