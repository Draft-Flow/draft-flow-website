const groq = require('groq')
const { toHTML } = require('@portabletext/to-html')
const client = require('../utils/sanityClient')
const serializers = require('../utils/serializers')
const generateProductSlug = require('./utils/generateProductSlug')

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
    "slug": ${generateProductSlug()},
    category->{
      title,
      "slug": slug.current,
      parent->{
        title,
        "slug": slug.current
      }
    },
    brand->{
      name,
      website,
      "slug": slug.current,
      logo {
        "ref": asset._ref,
        alt
      }
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
