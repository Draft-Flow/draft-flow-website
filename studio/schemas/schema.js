// Document schemas
import refurbBike from './documents/refurb-bikes'
import route from './documents/route'
import siteSettings from './documents/siteSettings'
import staticPages from './documents/staticPages'
import newsArticle from './documents/newsArticle'
import brands from './documents/brands'
import events from './documents/events'
import shop from './documents/products'
import routeCategories from './documents/routeCategories'

// Object types
import category from './objects/category'
import bodyPortableText from './objects/bodyPortableText'
import basicPortableText from './objects/basicPortableText'
import bioPortableText from './objects/bioPortableText'
import excerptPortableText from './objects/excerptPortableText'
import seo from './objects/seo'
import bike from './objects/bike'
import path from './objects/path'
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
  events,
  staticPages,
  newsArticle,
  refurbBike,
  route,
  brands,
  shop,
  routeCategories,
  seo,
  bike,
  path,
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
