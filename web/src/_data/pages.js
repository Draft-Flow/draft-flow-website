const groq = require('groq')
const client = require('../utils/sanityClient')

const getStaticPages = async () => {
  const filter = groq`*[_id in path('staticPages.**')]`
  const projection = groq`{
    ...
  }`

  const order = '| order(publishedAt asc)'
  const query = [filter, projection, order].join(' ')
  const docs = await client.fetch(query).catch((err) => console.error(err))
  return docs
}

module.exports = getStaticPages
