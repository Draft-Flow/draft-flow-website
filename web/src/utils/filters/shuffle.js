const shuffle = (array) => {
  const newArray = array
  let i
  let j
  let x
  for (i = newArray.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1))
    x = newArray[i]
    newArray[i] = newArray[j]
    newArray[j] = x
  }

  return newArray
}

module.exports = shuffle
