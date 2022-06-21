const { toHTML } = require('@portabletext/to-html')
const groq = require('groq')

const client = require('../utils/sanityClient')
const serializers = require('../utils/serializers')
const overlayDrafts = require('../utils/overlayDrafts')

const hasToken = !!client.config().token

const generateAuthor = async (author) => {
  try {
    return {
      ...author,
      body: toHTML(author.bio, { serializers, ...client.config() }),
    }
  } catch (err) {
    // eslint-disable-next-line
    console.error(err)
  }
}

const getAuthors = async () => {
  // Learn more: https://www.sanity.io/docs/data-store/how-queries-work
  const filter = groq`*[_type == "author" && defined(slug)]`
  const projection = groq`{
    _id,
    name,
    slug,
    image,
    bio[]{
      ...,
      children[]{
        ...,
        // Join inline reference
        _type == "authorReference" => {
          // check /studio/documents/authors.js for more fields
          "name": @.author->name,
          "slug": @.author->slug
        }
      }
    },
    "routes": *[_type == "route" && author._ref in authors[]->author._id ]{
      title,
      "slug": slug.current,
    }
  }`
  const order = '| order(name asc)'
  const query = [filter, projection, order].join(' ')
  // eslint-disable-next-line
  const docs = await client.fetch(query).catch((err) => console.error(err))
  const reducedDocs = overlayDrafts(hasToken, docs)
  const prepareAuthors = await Promise.all(
    reducedDocs.map(async (doc) => {
      const author = await generateAuthor(doc)
      return author
    })
  )
  return prepareAuthors
}

module.exports = getAuthors
