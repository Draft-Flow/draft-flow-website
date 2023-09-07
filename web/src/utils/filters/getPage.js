const getPage = (pages, pageID) => pages.find((page) => page.title === pageID)

module.exports = getPage
