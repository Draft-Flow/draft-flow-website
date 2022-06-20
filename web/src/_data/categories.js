const groq = require('groq')
const client = require('../utils/sanityClient')

const getCategories = async () => (
  client.fetch(groq`
    *[_type == "category"] {
      title,
      slug,
      description,
      "routes": *[_type == "route" && references(^._id)]{
        title,
        "slug": slug.current,
      }
    }
  `)
)

module.exports = getCategories
