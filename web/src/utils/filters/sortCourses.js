const sortCourses = (array) => {
  const sortedArray = [...array]
  sortedArray.sort((a, b) => new Date(a.dates[0].startDate ) - new Date(b.dates[0].startDate ))

  return sortedArray
}

module.exports = sortCourses
