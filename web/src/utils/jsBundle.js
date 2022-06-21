const fs = require('fs')
const esbuild = require('esbuild')

const jsBundle = (code, name, defer) => {
  const inputDir = 'src/'
  const tmp = `tmp/${name}.js`
  const lines = code.split('\n')
  const stripped = lines.slice(2, -2)
  fs.writeFileSync(tmp, stripped.join('\n'))

  const bundles = esbuild.buildSync({
    entryPoints: [tmp],
    entryNames: '[name]-[hash]',
    outdir: `${inputDir}static/bundles/`,
    metafile: true,
    minify: true,
    bundle: true,
    write: false,
  })

  try {
    bundles.outputFiles.forEach((bundle) => {
      if (!fs.existsSync(bundle.path)) {
        fs.writeFileSync(bundle.path, bundle.contents)
        // eslint-disable-next-line
        console.log('Created ', bundle.path)
      }
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
