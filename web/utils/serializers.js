const imageUrl = require('./imageUrl')

// Learn more on https://www.sanity.io/docs/guides/introduction-to-portable-text
module.exports = {
  types: {
    authorReference: ({node}) => `[${node.name}](/authors/${node.slug.current})`,
    mainImage: ({node}) => `![${node.alt}](${imageUrl(node).width(600).url()})`,
  }
}