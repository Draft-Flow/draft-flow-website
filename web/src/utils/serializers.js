const imageUrl = require('./imageUrl')

// Learn more on https://www.sanity.io/docs/guides/introduction-to-portable-text
module.exports = {
  types: {
    authorReference: ({ value }) =>
      `<a href="/architects/${value.slug.current}">${value.name}</a>`,
    supporterReference: ({ value }) =>
      `<a href="/supporters/${value.slug.current}">${value.name}</a>`,
    mainImage: ({ value }) =>
      `<img src="${imageUrl(value).width(1000).url()}" alt="${value.alt}" />`,
  },
}
