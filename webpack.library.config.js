const path = require('path')
const config = module.exports = Object.assign({}, require('./webpack.core.config'))
const srcFolder = './src/'

config.entry = {
  gbbsUpdater: path.resolve('.', srcFolder, 'gbbsUpdater')
}
config.output.libraryTarget = 'var'
config.output.library = 'gU'
