const util = require('util')
const CleanCSS = require('clean-css')
const fse = require('fs-extra')
const { toHTML } = require('@portabletext/to-html')
const eleventyNavigationPlugin = require('@11ty/eleventy-navigation')
const getYouTubeId = require('get-youtube-id')
const markdownIt = require('markdown-it')

const imageURL = require('./src/utils/shortcodes/shortcodeImageURL')
const bannerImageURL = require('./src/utils/shortcodes/shortcodeBannerURL')
const imageShortcode = require('./src/utils/shortcodes/shortcodeImage')
const cardImageShortcode = require('./src/utils/shortcodes/shortcodeCardImage')
const bannerImageShortcode = require('./src/utils/shortcodes/shortcodeBannerImage')
const inlineSVGShortcode = require('./src/utils/shortcodes/shortcodeInlineSVG')
const crumbShortcode = require('./src/utils/shortcodes/shortcodeCrumbs')
const shuffleFilter = require('./src/utils/filters/shuffle')
const routesDataFilter = require('./src/utils/filters/routesData')
const getPageFilter = require('./src/utils/filters/getPage')
const urlFor = require('./src/utils/imageUrl')
const jsBundle = require('./src/utils/jsBundle')
const minifyHTML = require('./src/utils/minifyHTML')

const serializers = require('./src/utils/serializers')

const SRC = './src'
const INPUT = 'src/content'
const OUTPUT = '_site'

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventyNavigationPlugin)

  // Watch for changes on files to force refresh and see changes
  eleventyConfig.addWatchTarget('./src/assets/css/styles.css')
  eleventyConfig.addWatchTarget('./src/static/sw.js')
  eleventyConfig.addWatchTarget('./src/utils/**/*')

  // Pass through static copy
  // https://www.11ty.dev/docs/copy/
  eleventyConfig.addPassthroughCopy({ 'src/static/_redirects': './_redirects' })
  eleventyConfig.addPassthroughCopy({ 'src/static/sw.js': './sw.js' })
  eleventyConfig.addPassthroughCopy({ 'src/static/favicon/**/*': '.' })
  eleventyConfig.addPassthroughCopy('src/static/fonts/**/*')
  eleventyConfig.addPassthroughCopy('src/static/images/**/*')
  eleventyConfig.addPassthroughCopy({'src/static/apple-developer-merchantid-domain-association': './.well-known/apple-developer-merchantid-domain-association'})

  eleventyConfig.on('eleventy.after', async () => {
    const srcDir = `${SRC}/static/bundles`
    const destDir = `${OUTPUT}/static/bundles`
    fse.copySync(srcDir, destDir)
  })

  eleventyConfig.addFilter('debug', function (value) {
    return util.inspect(value, { compact: false })
  })

  // Generate img tags with next-gen image formats
  eleventyConfig.addNunjucksAsyncShortcode('image', imageShortcode)
  eleventyConfig.addNunjucksAsyncShortcode('cardImage', cardImageShortcode)
  eleventyConfig.addNunjucksAsyncShortcode('bannerImage', bannerImageShortcode)

  // Inline SVG
  eleventyConfig.addNunjucksAsyncShortcode('svgIcon', inlineSVGShortcode)

  // Breadcrumbs
  eleventyConfig.addShortcode('crumbs', crumbShortcode)
      
  // Display the current year
  eleventyConfig.addShortcode('year', () => `${new Date().getFullYear()}`)

  // Bundle ES modules into a browser bundle
  eleventyConfig.addPairedShortcode('jsbundle', jsBundle)

  // Convert Sanity image assets into URLs
  eleventyConfig.addShortcode('imageUrlFor', imageURL)

  // Get URL for banner image
  eleventyConfig.addShortcode('imageBannerUrlFor',  bannerImageURL)

  // Inspect content
  eleventyConfig.addFilter('console', function(value) {
    const str =  util.inspect(value);
    return `<div style="white-space: pre-wrap;">${unescape(str)}</div>;`
  });

   // Markdown filter
   eleventyConfig.addFilter('md', function (content = '') {
    return markdownIt({
      html: true ,
      breaks: true,
    }).render(content);
  });

  // Convert Sanity block content into HTML
  eleventyConfig.addFilter('blocksToHTML', (value) => {
    return toHTML(value, { components: serializers })
  })

  // Shuffle collection into random order
  eleventyConfig.addFilter('shuffle', shuffleFilter)

  // Extract route data
  // Shuffle collection into random order
  eleventyConfig.addFilter('routesData', routesDataFilter)

  // Minify CSS
  eleventyConfig.addFilter('cssmin', (code) => {
    return new CleanCSS({}).minify(code).styles
  })

   // Page Child Filter
   eleventyConfig.addFilter('childFilter', (collection, key) => {
    if (!key) return collection;
      const filtered = collection.filter(item => item.data.eleventyNavigation.parent == key)
      return filtered;
  })

  // Category Filter
  eleventyConfig.addFilter('categoryFilter', (collection, category) => {
    if (!category) return collection;
      const filtered = collection.filter(item => item.data.eleventyNavigation.parent == category)
      return filtered;
  })

  // Parent Category Filter
  eleventyConfig.addFilter('categoryParentFilter', (collection, category) => {
    if (!category) return collection;
      const filtered = collection.filter(item => item.data.mainCategory.key == category)
      return filtered;
  })

  // Brand Filter
  eleventyConfig.addFilter('brandFilter', (collection, brand) => {
    if (!brand) return collection;
      const filtered = collection.filter(item => item.data.brand.id == brand)
      return filtered;
  })

  // Get YouTube Video ID
  eleventyConfig.addFilter('videoID', (url) => getYouTubeId(url))

  // Get Available Items
  eleventyConfig.addFilter('available', (data) => data.filter(item => item.available === true ))
  eleventyConfig.addFilter('unavailable', (data) => data.filter(item => item.available === false ))

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
      includes: '../_includes',
      data: '../_data',
      output: OUTPUT,
    },
  }
}
