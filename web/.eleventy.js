const { format } = require('date-fns');
const util = require('util');
const CleanCSS = require('clean-css');
const fse = require('fs-extra')
const { toHTML } = require('@portabletext/to-html')

const imageShortcode = require('./utils/shortcodeImage')
const urlFor = require('./utils/imageUrl');
const jsBundle = require('./utils/jsBundle')
const minifyHTML = require('./utils/minifyHTML')

module.exports = function(eleventyConfig) {
  // Pass through static copy
  // https://www.11ty.dev/docs/copy/
  eleventyConfig.addPassthroughCopy('static')

  eleventyConfig.on('eleventy.after', async () => {
    const srcDir = `./static`;
    const destDir = `./_site/static`;
    fse.copySync(srcDir, destDir)
  });

  eleventyConfig.addFilter("debug", function(value) {
    return util.inspect(value, {compact: false})
  });

  // Generate img tags with next-gen image formats
  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
  
  // https://www.11ty.io/docs/quicktips/inline-css/
  eleventyConfig.addFilter("cssmin", function(code) {
    return new CleanCSS({}).minify(code).styles;
  });

  // Bundle ES modules into a browser bundle
  eleventyConfig.addPairedShortcode("jsbundle", jsBundle)
 
  // Convert Sanity image assets into URLs 
  eleventyConfig.addShortcode('imageUrlFor', (image, width="600") => {
    return urlFor(image)
      .width(width)
  })

  // Convert Sanity block content into HTML
  eleventyConfig.addFilter('blocksToHTML', function(value) {
    return toHTML(value)
  });

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter('htmlDateString', (dateObj, format) => {
    return format(dateObj, format || 'yyyy-LL-dd');
  });

  // If production, minify HTML output
  if (process.env.ELEVENTY_ENV == "production") {
    eleventyConfig.addTransform("htmlmin", minifyHTML);
  }

  return {
    templateFormats: [
      "md",
      "njk",
      "html",
      "liquid"
    ],

    // If your site lives in a different subdirectory, change this.
    // Leading or trailing slashes are all normalized away, so don’t worry about it.
    // If you don’t have a subdirectory, use "" or "/" (they do the same thing)
    // This is only used for URLs (it does not affect your file structure)
    pathPrefix: "/",

    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    passthroughFileCopy: true,
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  };
}