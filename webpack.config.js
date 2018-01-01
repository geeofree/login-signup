const path  = require('path')
const merge = require('webpack-merge')
const webpack = require('webpack')
const ExtractHTML = require('html-webpack-plugin')

const srcPath = path.join(__dirname, 'src')
const pubPath = path.join(__dirname, 'public')

const vendorPath = path.join(srcPath, 'vendors')
const sassPath   = path.join(srcPath, 'sass')
const srcJsPath  = path.join(srcPath, 'js')

const VENDORS     = require(vendorPath)
const DEV_CONFIG  = require('./webpack.config.DEV.js')
const PROD_CONFIG = require('./webpack.config.PROD.js')

const ENV = process.env.NODE_ENV

const BASE_CONFIG = {
  entry: {
    app: srcJsPath,
    vendor: VENDORS,
  },

  output: {
    path: pubPath,
  },

  resolve: {
    modules: [srcJsPath, 'node_modules'],
    alias: {
      sass: sassPath,
    },
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
    }),

    new ExtractHTML({
      inject: true,
      filename: 'index.html',
      template: 'src/index.html',
    }),
  ],
}

if(ENV === 'DEV') module.exports = merge(BASE_CONFIG, DEV_CONFIG)
if(ENV === 'PROD') module.exports = merge(BASE_CONFIG, PROD_CONFIG)