const groq = require('groq')
const client = require('../utils/sanityClient')

const DEFAULT_METADATA = {
  description:
    'Draft & Flow is a community-centred cycle workshop providing repairs, services and route information.'
}

const getMetaData = async () => {
  const data = await client
    .fetch(groq`
    *[_type == "siteSettings"] {
      ...
    }[0]
  `)
    .catch(() => ({}))

  return { ...DEFAULT_METADATA, ...(data || {}) }
}

module.exports = getMetaData
