const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    'index': './index.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [{
      test: /\.tpl$/,
      use: ['w-loader']
    }]
  },
  plugins:[
    new HtmlWebpackPlugin({
      filename: 'index.html'
    })
  ]
}