const groq = require('groq')
const { toHTML } = require('@portabletext/to-html')
const client = require('../utils/sanityClient')
const serializers = require('../utils/serializers')

const generateDoc = async (doc) => {
  try {
    return {
      ...doc,
      intro: doc.ourDescription ? toHTML(doc.ourDescription[0], { components: serializers }) : '', 
      ourDescription: doc.ourDescription ? toHTML(doc.ourDescription.slice(1), { components: serializers }) : '',
      theirDescription: toHTML(doc.theirDescription, { components: serializers })
    }
  } catch (err) {
    // eslint-disable-next-line
    console.error(err)
  }
}

const getBrands = async () => {
  const filter = groq`*[_type == "brand"]`
  const projection = groq`{
    "id": _id,
    name,
    "slug": slug.current,
    logo {
      "ref": asset._ref,
      alt
    },
    website,
    primary,
    seo {
      title, 
      description
    },
    banner {
      "ref": asset._ref,
      alt
    },
    review,
    oneLiner,
    ourDescription,
    theirDescription,
    showProducts
  }`

  const order = ''
  const query = [filter, projection, order].join(' ')
  const docs = await client.fetch(query).catch((err) => {
    // eslint-disable-next-line
    console.error(err)
  })
  const prepareDocs = await Promise.all(
    docs.map(async (doc) => {
      const brand = await generateDoc(doc)
      return brand
    })
  )
  return prepareDocs
}

module.exports = getBrands
