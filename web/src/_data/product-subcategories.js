const groq = require('groq')
const { toHTML } = require('@portabletext/to-html')
const serializers = require('../utils/serializers')
const client = require('../utils/sanityClient')

const generateDoc = async (doc) => {
  try {
  return {
    ...doc,
    body: toHTML(doc.description, { components: serializers })
  }
  } catch (err) {
    // eslint-disable-next-line
    console.error(err)
  }
}

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
    description
  }`

  const order = ''
  const query = [filter, projection, order].join(' ')
  const docs = await client.fetch(query).catch((err) => {
    // eslint-disable-next-line
    console.error(err)
  })
  
  const prepareDocs = await Promise.all(
    docs.map(async (doc) => {
      const preparedDoc = await generateDoc(doc)
      return preparedDoc
    })
  )
  
  return prepareDocs
}

module.exports = getProductSubCategories
