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
    "id": _id,
    seo {
      title, 
      description
    },
    "slug": ${generateProductSlug()},
    category->{
      title,
      "id": _id,
      "slug": slug.current,
      parent->{
        title,
        "id": _id,
        "slug": slug.current
      }
    },
    oneLiner,
    banner {
      "ref": asset._ref,
      alt
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
    content,
    options[] {
      name,
      skus[] {
        name,
        partNumber,
        price,
      },
      images[] {
        "ref": asset._ref
      }
    }
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
