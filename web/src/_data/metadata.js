const groq = require('groq')
const client = require('../utils/sanityClient')

const DEFAULT_METADATA = {
  description:
    'Draft & Flow is a community-centred cycle workshop providing repairs, services and route information.'
}

const getMetaData = async () => {
  try {
    const data = await client.fetch(groq`
    *[_type == "siteSettings"] {
      ...
    }[0]
  `)
    return { ...DEFAULT_METADATA, ...(data || {}) }
  } catch (err) {
    // eslint-disable-next-line
    console.error(err)
    return DEFAULT_METADATA
  }
}

module.exports = getMetaData
