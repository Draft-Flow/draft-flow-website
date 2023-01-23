// First, we must import the schema creator
// eslint-disable-next-line
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
// eslint-disable-next-line
import schemaTypes from 'all:part:@sanity/base/schema-type'

// Document schemas
import route from './documents/route'
import siteSettings from './documents/siteSettings'
import staticPages from './documents/staticPages'

// Object types
import bodyPortableText from './objects/bodyPortableText'
import basicPortableText from './objects/basicPortableText'
import bioPortableText from './objects/bioPortableText'
import excerptPortableText from './objects/excerptPortableText'
import seo from './objects/seo'
import social from './objects/social'
import linkBlock from './objects/linkblock'
import mainImage from './objects/mainImage'
import logoImage from './objects/logoImage'
import youtube from './objects/youtube'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    siteSettings,
    staticPages,
    route,
    seo,
    social,
    linkBlock,
    mainImage,
    logoImage,
    youtube,
    bodyPortableText,
    basicPortableText,
    bioPortableText,
    excerptPortableText,
  ]),
})
