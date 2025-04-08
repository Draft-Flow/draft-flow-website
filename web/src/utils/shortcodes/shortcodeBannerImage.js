const Image = require('@11ty/eleventy-img')

const bannerImageShortcode = async (
  src,
  alt = '',
  lazy = 'true'
) => {
  if (alt === undefined) {
    // You bet we throw an error on missing alt (alt="" works okay)
    throw new Error(`Missing \`alt\` on myImage from: ${src}`)
  }

  const metadata = await Image(src, {
    widths: [700, 1200, 2000],
    formats: ['avif', 'jpeg'],
    outputDir: './_site/img/',
    urlPath: '/img/',
    cacheOptions: {
      duration: '1d',
    },
  })

  return `<picture class="w-full h-full">
    ${Object.values(metadata)
      .map(
        (imageFormat) =>
          `<source type="${imageFormat[0].sourceType}" srcset="${imageFormat
            .map((entry) => entry.srcset)
            .join(', ')}" sizes="(max-width: 0px) 100vw">`
      )
      .join('\n')}
      <img
        src="${metadata.jpeg[0].url}"
        width="100%"
        height="auto"
        class="w-full h-full object-cover overflow-visible"
        alt="${alt}"
        loading="${lazy}"
        decoding="async"
        fetchPriority="high">
    </picture>`
}

module.exports = bannerImageShortcode
