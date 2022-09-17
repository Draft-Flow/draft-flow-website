const htm = require('htm')
const vhtml = require('vhtml')

const html = htm.bind(vhtml)

const portableComponents = {
  types: {
    mainImage: ({value}) => {
      console.log(value)
      return html`<img src="${value.asset._ref}" />`
    },
  },
}

module.exports = portableComponents
