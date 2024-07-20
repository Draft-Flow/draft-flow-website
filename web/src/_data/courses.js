const groq = require('groq')
const { toHTML } = require('@portabletext/to-html')
const client = require('../utils/sanityClient')
const serializers = require('../utils/serializers')

const generateDoc = async (doc) => {
  try {
    return {
      ...doc,
      permalink: `/courses/${doc.slug}/`,
      content: doc.content ? toHTML(doc.content, { components: serializers }) : '', 
    }
  } catch (err) {
    // eslint-disable-next-line
    console.error(err)
  }
}

const getCourses = async () => {
  const filter = groq`*[_type == "events"]`
  const projection = groq`{
    "id": _id,
    title,
    "slug": slug.current,
    intro,
    content,
    price,
    dates [startDate > now()] | order(startDate asc) {
      available,
      startDate,
      endDate
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
      const event = await generateDoc(doc)
      return event
    })
  )
  return prepareDocs
}

module.exports = getCourses
