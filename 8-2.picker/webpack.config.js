const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: {
    'index': './index.js',
    // 'home': './src/home.js',
  },
  output:{
    filename:'[name].js',
    path:path.resolve(__dirname, 'dist'),
    // publicPath: 'file:///Users/wangwei/Desktop/webpack/8-1.webpack%E5%AE%98%E7%BD%91/dist/',
    // library: 'jquery',
    // libraryTarget: 'var'//出口文件以libraryTarget形式赋值给library
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    },
    {
      test: /\.s?css$/,
      use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
    },
    {
      test: /\.(jpg|gif|jpeg|svg)$/,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 1080,
            fallback: 'file-loader',
            outputPath: 'images',
            publicPath: '../images'
          }
        }
      ]
    },]
  },
  plugins:[
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      chunks:['index']
    }),
    new HtmlWebpackPlugin({
      filename: 'home.html',
      chunks:['home']
    }),
  ]
}