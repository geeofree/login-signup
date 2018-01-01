const webpack = require('webpack')
const path = require('path')

const pubPath = path.join(__dirname, 'public')
const WebpackHMR = new webpack.HotModuleReplacementPlugin()

module.exports = {
  devtool: 'inline-source-map',

  output: {
    filename: 'js/[name].[hash].js',
  },

  module: {
    rules: [
      {
        test: /\.sass$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
    ],
  },

  devServer: {
    hot: true,
    port: 3000,
    contentBase: pubPath,
    stats: 'errors-only',
    historyApiFallback: true,
  },

  plugins: [
    WebpackHMR,
  ],
}