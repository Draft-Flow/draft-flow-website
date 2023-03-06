const groq = require('groq')
const { toHTML } = require('@portabletext/to-html')
const client = require('../utils/sanityClient')
const serializers = require('../utils/serializers')

const generateDoc = async (doc) => {
  try {
  return {
    ...doc,
    body: toHTML(doc.content, { components: serializers })
  }
  } catch (err) {
    // eslint-disable-next-line
    console.error(err)
  }
}

const getProducts = async () => {
  const filter = groq`*[_type == "shop"]`
  const projection = groq`{
    name,
    seo {
      title, 
      description
    },
    "slug": select(
      defined(category->parent) => category->parent->slug.current + "/" + category->slug.current + "/" + slug.current,
      category->slug.current + "/" + slug.current
    ),
    category->{
      title,
      "slug": slug.current,
      parent->{
        title,
        "slug": slug.current
      }
    },
    brand->{
      name
    },
    content
  }`

  const order = ''
  const query = [filter, projection, order].join(' ')
  const docs = await client.fetch(query).catch((err) => {
    // eslint-disable-next-line
    console.error(err)
  })
  const prepareDocs = await Promise.all(
    docs.map(async (doc) => {
      const route = await generateDoc(doc)
      return route
    })
  )
  
  return prepareDocs
}

module.exports = getProducts
