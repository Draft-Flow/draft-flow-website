const imageUrl = require('./imageUrl')
const { getFileAsset } = require('@sanity/asset-utils')

const { sanity } = require('../client-config')

// Learn more on https://www.sanity.io/docs/guides/introduction-to-portable-text
module.exports = {
  types: {
    authorReference: ({ value }) =>
      `<a href="/architects/${value.slug.current}">${value.name}</a>`,
    supporterReference: ({ value }) =>
      `<a href="/supporters/${value.slug.current}">${value.name}</a>`,
    mainImage: ({ value }) =>
      `<figure class="image">
        <img src="${imageUrl(value.asset._ref).width(1000).url()}" alt="${value.alt}" title="${value.caption}" async />
        <figcaption>${value.caption}</figcaption>
      </figure>`,
    file: ({ value }) => {
      const fileURL = getFileAsset(value.asset, sanity).url
      return `<div class="file-wrapper"><a href="${fileURL}?dl=" download>${ value.name }</a></div>`
    }
  },
}
