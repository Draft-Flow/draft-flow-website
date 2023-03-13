// Document schemas
import route from './documents/route'
import siteSettings from './documents/siteSettings'
import staticPages from './documents/staticPages'
import brands from './documents/brands'
import shop from './documents/shop'

// Object types
import category from './objects/category'
import bodyPortableText from './objects/bodyPortableText'
import basicPortableText from './objects/basicPortableText'
import bioPortableText from './objects/bioPortableText'
import excerptPortableText from './objects/excerptPortableText'
import seo from './objects/seo'
import review from './objects/review'
import social from './objects/social'
import linkBlock from './objects/linkblock'
import mainImage from './objects/mainImage'
import basicImage from './objects/basicImage'
import logoImage from './objects/logoImage'

import productOptions from './objects/productOptions'
import sku from './objects/sku'

// Then we give our schema to the builder and provide the result to Sanity
export default [
  siteSettings,
  staticPages,
  route,
  brands,
  shop,
  seo,
  review,
  social,
  linkBlock,
  mainImage,
  basicImage,
  logoImage,
  category,
  bodyPortableText,
  basicPortableText,
  bioPortableText,
  excerptPortableText,
  productOptions,
  sku,
]
