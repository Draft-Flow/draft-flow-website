 const generateProductSlug = () => `select(
  defined(category->parent) => category->parent->slug.current + "/" + category->slug.current + "/" + slug.current,
  category->slug.current + "/" + slug.current
)`

module.exports = generateProductSlug
