const slugify = require('slugify'); 

const options = { lower: true, remove: /[*+~.()'"?!:@\/]/g };

const slugifyFilter = (url) => (slugify(url, options));

module.exports = {
  options,
  slugifyFilter
} 
