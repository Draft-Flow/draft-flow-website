const groq = require('groq')
const client = require('../utils/sanityClient')

const getCategories = async () => {
  const filter = groq`*[_type == "category"]`
  const projection = groq`{
    title,
    slug,
    orderRank,
    excerpt,
    description,
    "color":color.hex,
    "routes": *[_type == "route" && references(^._id)]{
      title,
      "slug": slug.current,
    }
  }`

  const order = '| order(orderRank asc)'
  const query = [filter, projection, order].join(' ')
  const docs = await client.fetch(query).catch((err) => console.error(err))
  return docs
}

module.exports = getCategories
