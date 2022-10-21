const Image = require("@11ty/eleventy-img");

const cardImageShortcode = async (src, alt = "", sizes = "100vw", classes = null) => {
  if(alt === undefined) {
    // You bet we throw an error on missing alt (alt="" works okay)
    throw new Error(`Missing \`alt\` on myImage from: ${src}`);
  }

  let metadata = await Image(src, {
    widths: [350, 700],
    formats: ["avif", "webp", "jpeg"],
    outputDir: "./_site/img/",
    urlPath: "/img/",
    cacheOptions: {
      duration: "1d"
    }
  });

  return `<picture class="flex h-full">
    ${Object.values(metadata).map(imageFormat => {
      return `  <source type="${imageFormat[0].sourceType}" srcset="${imageFormat.map(entry => entry.srcset).join(", ")}" sizes="${sizes}">`;
    }).join("\n")}
      <img
        src="${metadata.jpeg[0].url}"
        width="100%"
        height="auto"
        ${classes !== null ? `class="${classes}"` : ""}
        alt="${alt}"
        loading="lazy"
        decoding="async">
    </picture>`;
}

module.exports = cardImageShortcode
