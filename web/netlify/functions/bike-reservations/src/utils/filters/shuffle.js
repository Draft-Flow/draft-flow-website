const shuffle = (array, limit) => {
  const shuffledArray = [...array]
  shuffledArray.sort(() => {
    return 0.5 - Math.random()
  })

  // Returns array items up to limit
  return shuffledArray.slice(0, limit)
}

module.exports = shuffle
