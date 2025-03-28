const slugify = require('slugify') 

// eslint-disable-next-line
const options = { lower: true, remove: /[*+~.()'"?!:@\/]/g }

const slugifyFilter = (url) => (slugify(url, options))

module.exports = {
  options,
  slugifyFilter
} 
