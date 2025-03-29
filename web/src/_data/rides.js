const groq = require('groq')
const { toHTML } = require('@portabletext/to-html')
const client = require('../utils/sanityClient')
const serializers = require('../utils/serializers')

const generateDoc = async (doc) => {
  try {
    return {
      ...doc,
      dates: doc.dates ?? [],
      permalink: `/rides/${doc.slug}/`,
      content: doc.content ? toHTML(doc.content, { components: serializers }) : '', 
    }
  } catch (err) {
    // eslint-disable-next-line
    console.error(err)
  }
}

const getRides = async () => {
  const query = groq`// *[_type == "events"]{
//     "id": _id,
//     title,
//     "slug": slug.current,
//     content,
//     price,
//     dates []{
//       available,
//       startDate,
//       endDate
//     }
//   }

// *[_type == "events" && _id == "2352a03f-67b2-47c0-873f-ec1813a9b064"] {
//   "id": "_id",
//   title,
//   price
// }


*[_type == "rides" &&  !(_id in path("drafts.**"))] {
    "id": _id,
    title,
    "slug": slug.current,
    intro,
    content,
    "dates": {
      "future": dates [startDate > now()] | order(startDate asc) {
        title,
        description,
        startDate,
        endDate,
        location {
          lat,
          lng
        }
      },
      "past": dates [startDate < now()] | order(startDate desc) {
        title,
        description,
        startDate,
        endDate,
        location {
          lat,
          lng
        }
      }
    },
  }
`
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

module.exports = getRides
