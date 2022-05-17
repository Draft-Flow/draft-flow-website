const { format } = require('date-fns');
const util = require('util');
const urlFor = require('./utils/imageUrl');
const CleanCSS = require('clean-css');
const fs = require('fs')
const fse = require('fs-extra')

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy('static')
  eleventyConfig.on('eleventy.after', async () => {
    const srcDir = `./static`;
    const destDir = `./_site/static`;
    fse.copySync(srcDir, destDir)
  });

  eleventyConfig.addShortcode('imageUrlFor', (image, width="600") => {
    return urlFor(image)
      .width(width)
  })
  
  // https://www.11ty.io/docs/quicktips/inline-css/
  eleventyConfig.addFilter("cssmin", function(code) {
    return new CleanCSS({}).minify(code).styles;
  });

  eleventyConfig.addPairedShortcode("jsbundle", (code, name, defer ) => {
    const tmp = `tmp/${name}.js`
    const lines = code.split('\n')
    const stripped = lines.slice(2, -2)
    fs.writeFileSync(tmp, stripped.join('\n'))

    const bundles = require('esbuild').buildSync({
      entryPoints: [tmp],
      entryNames: '[name]-[hash]',
      outdir: 'static/bundles/',
      metafile: true,
      minify: true,
      bundle: true,
      write: false,
    })

    try {
      bundles.outputFiles.forEach(bundle => {
        if (!fs.existsSync(bundle.path)) {
          fs.writeFileSync(bundle.path, bundle.contents)
          console.log('Created ', bundle.path)
        }
      })
    } catch(err) {
      console.log(err)
    }

    const tags = Object.keys(bundles.metafile.outputs).map(file => {
      const ext = file.split('.').pop()
      if (ext === 'css') {
        return `<link rel="stylesheet" href="/${file}" >`
      }

      return `<script type="module" src="/${file}" ${defer ? 'defer' : ''}></script>`
    })

    return tags.join('\n')
  })
 
  eleventyConfig.addFilter("debug", function(value) {
    return util.inspect(value, {compact: false})
   });

   eleventyConfig.addFilter("readableDate", dateObj => {
    return new Date(dateObj).toDateString()
  });

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    return format(dateObj, 'yyyy-LL-dd');
  });

  let markdownIt = require("markdown-it");
  let markdownItAnchor = require("markdown-it-anchor");
  let options = {
    html: true,
    breaks: true,
    linkify: true
  };
  let opts = {
    permalink: true,
    permalinkClass: "direct-link",
    permalinkSymbol: "#"
  };

  eleventyConfig.setLibrary("md", markdownIt(options)
    .use(markdownItAnchor, opts)
  );

  eleventyConfig.addFilter("markdownify", function(value) {
    const md = new markdownIt(options)
    return md.render(value)
  })
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