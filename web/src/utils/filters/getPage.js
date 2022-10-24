const getPage = (pages, pageID) => pages.find((page) => page._id === pageID)

module.exports = getPage
