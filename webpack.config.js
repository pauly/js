'use strict'

var path = require('path')
var webpack = require('webpack')
// var JSCrush = require('webpack-jscrush')
var repo = require('./package.json')
var fs = require('fs')
var srcFolder = './'

let env = process.env.NODE_ENV || 'development'
if (process.env.CIRCLE_BRANCH === 'master') env = 'production'

var inputFiles = fs.readdirSync(srcFolder).reduce(function (files, file) { // @todo move to src
  const match = /^_(\w+).js/.exec(file)
  if (match) {
    files[match[1]] = srcFolder + file
  }
  return files
}, {})

var definePlugin = new webpack.DefinePlugin({
  'process.env': {
    'DEBUG': JSON.stringify(process.env.DEBUG),
    'NODE_ENV': JSON.stringify(env)
  }
})

// const jsCrushPlugin = JSCrush()
const bannerPlugin = new webpack.BannerPlugin(repo.name + ' v' + repo.version)

var uglifyPlugin = new webpack.optimize.UglifyJsPlugin({
  compress: {
    warnings: false,
    properties: true,
    sequences: true,
    dead_code: true,
    conditionals: true,
    comparisons: true,
    evaluate: true,
    booleans: true,
    unused: true,
    loops: true,
    hoist_funs: true,
    cascade: true,
    if_return: true,
    join_vars: true,
    drop_debugger: true,
    unsafe: true,
    hoist_vars: true,
    negate_iife: true
  },
  mangle: {
    toplevel: false,
    sort: false,
    eval: false,
    props: {
      regex: /^_/ // only mangle properties that start with underscore
    }
  },
  output: {
    space_colon: false,
    comments: false
  }
})

var config = module.exports = {
  context: __dirname,

  entry: inputFiles,

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: [
            'env'
          ]
        }
      },
      {
        test: /\.json/,
        loader: require.resolve('json-loader')
      }
    ]
  },

  output: {
    libraryTarget: 'var',
    library: process.env.npm_package_name,
    filename: '[name].js',
    // publicPath: '/dist/',
    path: path.resolve('./dist')
  },

  plugins: [definePlugin, bannerPlugin]
}

config.entry[process.env.npm_package_name] = path.resolve('.', srcFolder, '_gbbsUpdater')

if (process.env.NODE_ENV === 'production') {
  config.output.filename = '[name].min.js'
  config.plugins.unshift(uglifyPlugin)
}
