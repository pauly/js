'use strict'

const path = require('path')
const webpack = require('webpack')
// const JSCrush = require('webpack-jscrush')
const repo = require('./package.json')

let env = process.env.NODE_ENV || 'development'
if (process.env.CIRCLE_BRANCH === 'master') env = 'production'

const definePlugin = new webpack.DefinePlugin({
  'process.env': {
    'DEBUG': JSON.stringify(process.env.DEBUG),
    'NODE_ENV': JSON.stringify(env)
  }
})

// const jsCrushPlugin = JSCrush()
const bannerPlugin = new webpack.BannerPlugin(repo.name + ' v' + repo.version)

const uglifyPlugin = new webpack.optimize.UglifyJsPlugin({
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
    join_consts: true,
    drop_debugger: true,
    unsafe: true,
    hoist_consts: true,
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

const config = module.exports = {
  context: __dirname,

  entry: {},

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
    filename: '[name].js',
    // publicPath: '/dist/',
    path: path.resolve('./dist')
  },

  plugins: [definePlugin, bannerPlugin]
}

if (process.env.NODE_ENV === 'production') {
  // config.output.filename = '[name].min.js'
  config.plugins.unshift(uglifyPlugin)
}
