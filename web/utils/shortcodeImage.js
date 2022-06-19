const Image = require("@11ty/eleventy-img");
const path = require("path");

async function imageShortcode(src, alt, sizes) {
  let metadata = await Image(src, {
    widths: [300, 600],
    formats: ["avif", "png"],
    outputDir: path.join("_site", "img")
  });

  let imageAttributes = {
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
  };

  // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
  return Image.generateHTML(metadata, imageAttributes);
}

module.exports = imageShortcode


