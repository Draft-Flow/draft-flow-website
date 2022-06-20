const groq = require('groq')
const client = require('../utils/sanityClient')
module.exports =  async function() {
  return await client.fetch(groq`
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
}