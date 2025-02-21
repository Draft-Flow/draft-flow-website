const sortCourses = (array) => {
  const sortedArray = [...array]
  if (sortedArray.every(course => course.dates.length === 0)) {
    return []
  }

  sortedArray.sort((a, b) => {
    if (a.dates.length === 0 && b.dates.length === 0) {
      return 0
    }

    if (a.dates.length === 0) {
      return 1
    }
    if (b.dates.length === 0) {
      return -1
    }
    return new Date(a.dates[0].startDate ) - new Date(b.dates[0].startDate)
  })

  return sortedArray
}

module.exports = sortCourses
