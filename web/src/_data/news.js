const groq = require('groq')
const { toHTML } = require('@portabletext/to-html')
const serializers = require('../utils/serializers')

const client = require('../utils/sanityClient')

const generateDoc = async (doc) => {
  try {
  return {
    ...doc,
    content: doc.content ? toHTML(doc.content, { components: serializers }) : null, 
    firstImage: doc.firstImage?.imageUrl || doc.banner?.ref || null,
    cta: doc.cta ? ({
      ...doc.cta,
      text: doc.cta.text ? toHTML(doc.cta.text, { components: serializers }) : null
    }) : null
  }
  } catch (err) {
    // eslint-disable-next-line
    console.error(err)
  }
}

const getNews = async () => {
  const filter = groq`*[_type == "news" && !(_id in path("drafts.**"))]`
  const projection = groq`{
    title,
    "slug": slug.current,
    "id": _id,
    seo {
      title, 
      description
    },
    cta,
    banner {
      "ref": asset._ref,
      alt
    },
    bannerText {
      title,
      subtitle
    },
    content,
    "firstImage": content[]{
      ...,
      "imageUrl": asset->url
    }[_type == "mainImage"][0],
    "updatedAt": _updatedAt,
    "createdAt": _createdAt
  }`

  const order = '| order(createdAt desc)'
  const query = [filter, projection, order].join(' ')
  const docs = await client.fetch(query).catch((err) => {
    // eslint-disable-next-line
    console.error(err)
  })
  const prepareDocs = await Promise.all(
    docs.map(async (doc) => {
      const refurb = await generateDoc(doc)
      return refurb
    })
  )
  
  return prepareDocs
}

module.exports = getNews
