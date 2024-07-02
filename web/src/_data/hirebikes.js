const groq = require('groq')
const { toHTML } = require('@portabletext/to-html')
const client = require('../utils/sanityClient')
const serializers = require('../utils/serializers')

const generateDoc = async (doc) => {
  try {
    return {
      ...doc,
      permalink: `/bikes/hire/${doc.slug}/index.html`,
      content: doc.content ? toHTML(doc.content, { components: serializers }) : '', 
    }
  } catch (err) {
    // eslint-disable-next-line
    console.error(err)
  }
}

const getHireBikes = async () => {
  const filter = groq`*[_type == "hireBikes"]`
  const projection = groq`{
    "id": _id,
    title,
    "slug": slug.current,
    intro,
    content,
    price,
    calendarID
  }`

  const order = ''
  const query = [filter, projection, order].join(' ')
  const docs = await client.fetch(query).catch((err) => {
    // eslint-disable-next-line
    console.error(err)
  })
  const prepareDocs = await Promise.all(
    docs.map(async (doc) => {
      const bike = await generateDoc(doc)
      return bike
    })
  )
  return prepareDocs
}

module.exports = getHireBikes
