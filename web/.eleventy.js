const util = require('util')
const CleanCSS = require('clean-css')
const fse = require('fs-extra')
const { toHTML } = require('@portabletext/to-html')
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

const imageShortcode = require('./src/utils/shortcodes/shortcodeImage')
const inlineSVGShortcode = require('./src/utils/shortcodes/shortcodeInlineSVG')
const shuffleFilter = require('./src/utils/filters/shuffle')
const routesDataFilter = require('./src/utils/filters/routesData')
const getPageFilter = require('./src/utils/filters/getPage')
const urlFor = require('./src/utils/imageUrl')
const jsBundle = require('./src/utils/jsBundle')
const minifyHTML = require('./src/utils/minifyHTML')

const serializers = require('./src/utils/serializers')

const INPUT = 'src'
const OUTPUT = '_site'

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  // Pass through static copy
  // https://www.11ty.dev/docs/copy/
  eleventyConfig.addPassthroughCopy({ 'src/static/favicon/**/*': '.' })
  eleventyConfig.addPassthroughCopy('src/static/fonts/**/*')
  eleventyConfig.addPassthroughCopy('src/static/images/**/*')

  eleventyConfig.on('eleventy.after', async () => {
    const srcDir = `${INPUT}/static/bundles`
    const destDir = `${OUTPUT}/static/bundles`
    fse.copySync(srcDir, destDir)
  })

  eleventyConfig.addFilter('debug', function (value) {
    return util.inspect(value, { compact: false })
  })

  // Generate img tags with next-gen image formats
  eleventyConfig.addNunjucksAsyncShortcode('image', imageShortcode)

  // Inline SVG
  eleventyConfig.addNunjucksAsyncShortcode('svgIcon', inlineSVGShortcode)

  // Display the current year
  eleventyConfig.addShortcode('year', () => `${new Date().getFullYear()}`)

  // Bundle ES modules into a browser bundle
  eleventyConfig.addPairedShortcode('jsbundle', jsBundle)

  // Convert Sanity image assets into URLs
  eleventyConfig.addShortcode('imageUrlFor', (image, width = '600') => {
    return urlFor(image).width(width).url()
  })

  // Convert Sanity block content into HTML
  eleventyConfig.addFilter('blocksToHTML', (value) => {
    return toHTML(value, {components: serializers})
  })

  // Shuffle collection into random order
  eleventyConfig.addFilter('shuffle', shuffleFilter)

  // Extract route data
    // Shuffle collection into random order
    eleventyConfig.addFilter('routesData', routesDataFilter)

  // Get page
  eleventyConfig.addFilter('getPage', getPageFilter)

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter('htmlDateString', (dateObj, format) => {
    return format(dateObj, format || 'yyyy-LL-dd')
  })

  // If production, minify HTML output
  if (process.env.ELEVENTY_ENV == 'production') {
    eleventyConfig.addTransform('htmlmin', minifyHTML)
  }

  return {
    templateFormats: ['md', 'njk', 'html', 'liquid'],

    // If your site lives in a different subdirectory, change this.
    // Leading or trailing slashes are all normalized away, so don’t worry about it.
    // If you don’t have a subdirectory, use "" or "/" (they do the same thing)
    // This is only used for URLs (it does not affect your file structure)
    pathPrefix: '/',

    markdownTemplateEngine: 'liquid',
    htmlTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    passthroughFileCopy: true,
    showAllHosts: true,
    dir: {
      input: INPUT,
      includes: '_includes',
      data: '_data',
      output: OUTPUT,
    },
  }
}
