const groq = require('groq')
const client = require('../utils/sanityClient')

const getProductSubCategories = async () => {
  const filter = groq`*[_type == "category" && defined(parent)]`
  const projection = groq`{
    title,
    "slug": parent->slug.current + "/" + slug.current,
    "parent": select(defined(parent) => {
      "title": parent->title,
      "slug": parent->slug.current
    })
  }`

  const order = ''
  const query = [filter, projection, order].join(' ')
  const docs = await client.fetch(query).catch((err) => {
    // eslint-disable-next-line
    console.error(err)
  })
  
  return docs
}

module.exports = getProductSubCategories
