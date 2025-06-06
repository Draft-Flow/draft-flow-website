const fs = require('fs')
const path = require('path')
const esbuild = require('esbuild')

const jsBundle = (code, name, defer) => {
  if (!fs.existsSync(path.join(process.cwd(), 'tmp'))){
    fs.mkdirSync(path.join(process.cwd(), 'tmp'))
  }

  const inputDir = 'src/'
  const tmp = path.resolve(path.join(process.cwd(), 'tmp', `${name}.js`))
  const lines = code.split('\n')
  const stripped = lines.slice(2, -2)
  try {
    fs.writeFileSync(tmp, stripped.join('\n'), { flag: 'w' })
  } catch(err) {
    // eslint-disable-next-line
    console.log({err})
  }

  const bundles = esbuild.buildSync({
    entryPoints: [tmp],
    entryNames: '[name]',
    outdir: `${inputDir}static/bundles/`,
    metafile: true,
    minify: true,
    bundle: true,
    write: false,
  })

  try {
    bundles.outputFiles.forEach((bundle) => {
      fs.writeFileSync(bundle.path, bundle.contents, { flag: 'w' })
      // eslint-disable-next-line
      console.log('Created ', bundle.path)
    })
  } catch (err) {
    // eslint-disable-next-line
    console.log(err)
  }

  const tags = Object.keys(bundles.metafile.outputs).map((file) => {
    const ext = file.split('.').pop()
    if (ext === 'css') {
      return `<link rel="stylesheet" href="/${file.replace(inputDir, '')}" >`
    }

    return `<script src="/${file.replace(inputDir, '')}" ${
      defer ? 'defer' : ''
    }></script>`
  })

  return tags.join('\n')
}

module.exports = jsBundle
