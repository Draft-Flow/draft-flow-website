const fs = require('fs')

const jsBundle = (code, name, defer ) => {
  const tmp = `tmp/${name}.js`
  const lines = code.split('\n')
  const stripped = lines.slice(2, -2)
  fs.writeFileSync(tmp, stripped.join('\n'))

  const bundles = require('esbuild').buildSync({
    entryPoints: [tmp],
    entryNames: '[name]-[hash]',
    outdir: 'static/bundles/',
    metafile: true,
    minify: true,
    bundle: true,
    write: false,
  })

  try {
    bundles.outputFiles.forEach(bundle => {
      if (!fs.existsSync(bundle.path)) {
        fs.writeFileSync(bundle.path, bundle.contents)
        console.log('Created ', bundle.path)
      }
    })
  } catch(err) {
    console.log(err)
  }

  const tags = Object.keys(bundles.metafile.outputs).map(file => {
    const ext = file.split('.').pop()
    if (ext === 'css') {
      return `<link rel="stylesheet" href="/${file}" >`
    }

    return `<script src="/${file}" ${defer ? 'defer' : ''}></script>`
  })

  return tags.join('\n')
}

module.exports = jsBundle