const brandShuffle = (array, limit = array.length) => {
  const shuffledArray = [...array]
  const primary = shuffledArray.filter((item) => item.primary === true)
  const nonPrimary = shuffledArray.filter((item) => item.primary === false)

  primary.sort(() =>  0.5 - Math.random())
  nonPrimary.sort(() => 0.5 - Math.random())

  // Returns array items up to limit
  const shuffledBrands = [...primary, ...nonPrimary.slice(0, limit - primary.length)]

  return shuffledBrands
}

module.exports = brandShuffle
