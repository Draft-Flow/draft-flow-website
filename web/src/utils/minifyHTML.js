const htmlmin = require('html-minifier')

const minifyHTML = (content, outputPath) => {
  // Eleventy 1.0+: use this.inputPath and this.outputPath instead
  if (outputPath && outputPath.endsWith('.html')) {
    const minified = htmlmin.minify(content, {
      useShortDoctype: true,
      removeComments: true,
      collapseWhitespace: true,
    })
    return minified
  }

  return content
}

module.exports = minifyHTML
