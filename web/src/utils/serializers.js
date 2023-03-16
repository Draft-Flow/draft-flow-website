const { getFileAsset } = require('@sanity/asset-utils')

const { sanity } = require('../client-config')

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
      return `<div class="file-wrapper"><a href="${fileURL}?dl=" download>${value.name}</a></div>`
    },
  },
}
