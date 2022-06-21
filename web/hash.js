const fs = require('fs')
const md5 = require('md5')

const assets = ['/css/styles.css']

const dataFile = 'src/_data/hash.json'

const production = process.env.NODE_ENV !== 'development'

const jsonValue = {}

assets.forEach((asset) => {
  if (production) {
    const file = `_site${asset}`
    const fileHash = md5(fs.readFileSync(file)).substring(0, 15)

    const assetNameArray = asset.split('.')
    assetNameArray.splice(assetNameArray.length - 1, 0, fileHash)
    const hashedAsset = assetNameArray.join('.')

    fs.renameSync(file, `_site/${hashedAsset}`)
    jsonValue[asset] = hashedAsset
  } else {
    jsonValue[asset] = asset
  }
})

fs.writeFileSync(dataFile, JSON.stringify(jsonValue))
