// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// Document schemas
import author from './documents/author'
import category from './documents/category'
import route from './documents/route'
import place from './documents/place'
import siteSettings from './documents/siteSettings'

// Object types
import bodyPortableText from './objects/bodyPortableText'
import basicPortableText from './objects/basicPortableText'
import bioPortableText from './objects/bioPortableText'
import excerptPortableText from './objects/excerptPortableText'
import mainImage from './objects/mainImage'
import logoImage from './objects/logoImage'
import authorReference from './objects/authorReference'
import placeReference from './objects/placeReference'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    siteSettings,
    route,
    category,
    author,
    mainImage,
    logoImage,
    place,
    placeReference,
    authorReference,
    bodyPortableText,
    basicPortableText,
    bioPortableText,
    excerptPortableText,
  ]),
})
