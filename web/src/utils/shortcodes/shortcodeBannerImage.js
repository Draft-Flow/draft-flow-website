const Image = require("@11ty/eleventy-img");

const bannerImageShortcode = async (src, alt = "", sizes = "100vw", classes = null, priority = 'auto') => {
  if(alt === undefined) {
    // You bet we throw an error on missing alt (alt="" works okay)
    throw new Error(`Missing \`alt\` on myImage from: ${src}`);
  }

  let metadata = await Image(src, {
    widths: [700, 1200, 2000],
    formats: ["avif", "jpeg"],
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
        decoding="async"
        fetchPriority="${priority}">
    </picture>`;
}

module.exports = bannerImageShortcode
