const path = require('path')
const webpack = require('webpack')

const ExtractText = require('extract-text-webpack-plugin')
const OutputCleaner = require('clean-webpack-plugin')
const BundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const ExtractCSS = new ExtractText('css/[name].[chunkhash].css')
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin
const NamedModulesPlugin = webpack.NamedModulesPlugin
const NamedChunksPlugin = webpack.NamedChunksPlugin
const DefinePlugin = webpack.DefinePlugin

module.exports = {
  output: {
    filename: 'js/[name].[chunkhash].js',
  },

  module: {
    rules: [
      {
        test: /\.sass$/,
        use: ExtractCSS.extract(['css-loader?url=false', 'postcss-loader', 'sass-loader']),
      },
    ],
  },

  plugins: [
    new OutputCleaner([
      'public/css',
      'public/js',
      'public/index.html',
    ]),

    ExtractCSS,

    new NamedModulesPlugin(),

    new DefinePlugin({
      'process.node.NODE_ENV': JSON.stringify('production'),
    }),

    new NamedChunksPlugin(chunk => {
      if(chunk.name) return chunk.name
      return chunk.mapModules(() => "module").join("_")
    }),

    new BundleAnalyzer(),
  ],
}