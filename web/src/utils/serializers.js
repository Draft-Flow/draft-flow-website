const { getFileAsset } = require('@sanity/asset-utils')

const { sanity } = require('../client-config')
const urlFor = require('./imageUrl') 

// Learn more on https://www.sanity.io/docs/guides/introduction-to-portable-text
module.exports = {
  types: {
    supporterReference: ({ value }) =>
      `<a href="/supporters/${value.slug.current}">${value.name}</a>`,
    youtube: ({ value }) =>
      `<div class="videoWrapper">
        <iframe width="560" height="315" src="${value.url}" title="YouTube video" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>`,
    file: ({ value }) => {
      const fileURL = getFileAsset(value.asset, sanity).url
      return `<div class="file-wrapper "><a href="${fileURL}?dl=" download>${value.name}</a></div>`
    },
    iframeEmbed: (props) => (
     `<iframe src="${props.value.url}" width="100%" height="580" frameborder="0" scrolling="no"></iframe>`
    ),
    mainImage: ({ value}) => {
      const imageUrl = urlFor(value.asset).width(1000).url()
      return `<img class="aspect-auto mb-4 mt-2 mx-auto max-h-96 p-1 md:p-2 border-double border-4 border-df-gray" src="${imageUrl}" alt="${value.alt}" loading="lazy" />`
    }
  },
}
