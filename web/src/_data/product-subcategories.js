const groq = require('groq')
const client = require('../utils/sanityClient')

const getProductSubCategories = async () => {
  const filter = groq`*[_type == "category" && defined(parent)]`
  const projection = groq`{
    title,
    "categoryID": _id,
    "slug": parent->slug.current + "/" + slug.current,
    "parent": select(defined(parent) => {
      "title": parent->title,
      "categoryID": parent->_id,
      "slug": parent->slug.current,
    }),
    banner {
      "ref": asset._ref,
      alt
    },
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
