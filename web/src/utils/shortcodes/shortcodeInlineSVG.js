const Image = require('@11ty/eleventy-img')

const inlineSVG = async (src, classes) => {
  const metadata = await Image(src, {
    formats: ['svg'],
    dryRun: true,
  })

  let svgString = metadata.svg[0].buffer.toString()

  if (classes) { 
    svgString = svgString.replace(/<svg /g, `<svg class="${classes}" `)
  }

  return svgString
}

module.exports = inlineSVG
