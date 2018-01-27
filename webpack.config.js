const config = module.exports = Object.assign({}, require('./webpack.core.config'))
const fs = require('fs')
const srcFolder = './src/'

config.entry = fs.readdirSync(srcFolder).reduce(function (files, file) { // @todo move to src
  const match = /^(.*).js/.exec(file)
  if (match) {
    files[match[1]] = srcFolder + file
  }
  return files
}, {})
