// Document schemas
import route from './documents/route'
import siteSettings from './documents/siteSettings'
import staticPages from './documents/staticPages'
import brands from './documents/brands'
import shop from './documents/shop'

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

// Then we give our schema to the builder and provide the result to Sanity
export default [
  siteSettings,
  staticPages,
  route,
  brands,
  shop,
  seo,
  social,
  linkBlock,
  mainImage,
  logoImage,
  bodyPortableText,
  basicPortableText,
  bioPortableText,
  excerptPortableText,
]
