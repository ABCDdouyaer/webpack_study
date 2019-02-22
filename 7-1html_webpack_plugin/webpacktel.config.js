const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//分离css
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
  mode: 'development',
  entry: {
    'index': './index.js'
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist1')
  },
  module:{
    rules:[{
      test: /\.css$/,
      use:[MiniCssExtractPlugin.loader, 'css-loader']
    }]
  },
  plugins:[
    new HtmlWebpackPlugin({
      title: '模板插入法',//title设置
      template: 'template.html',//设置模板文件
      filename: 'tel.html',//设置输出的html文件名
      chunks: ['index']
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ]
}