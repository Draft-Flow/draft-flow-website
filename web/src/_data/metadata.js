const groq = require('groq')
const client = require('../utils/sanityClient')

const getMetaData = async () => (
  client.fetch(groq`
    *[_type == "siteSettings"] {
      ...
    }[0]
  `)
)

module.exports = getMetaData
