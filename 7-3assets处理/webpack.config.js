const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackSpritesmith =  require('webpack-spritesmith');
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
    rules:[
      {
        test: /\.jsx?$/,
        use:[{
          loader: 'babel-loader',
          options: {
            presets:[
              '@babel/preset-env',
              '@babel/preset-react'
            ]
          }
        }]
      },
      {
        test: /\.(sc|c|sa)ss$/,
        loader:[
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]-[hash:base64:5]'
            }
          },
          'postcss-loader',
          'sass-loader',
        ]
      },
      {
        test: /\.(jpg|gif|jpeg|svg)$/,
        use: [
          // {
          //   loader: 'file-loader',
          //   options: {
          //     outputPath: 'images',
          //     publicPath: '../images'
          //   }
          // }
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
      },
      {
        test: /\.png$/,
        use: ['file-loader']
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'template.html'
    }),
    new WebpackSpritesmith({
      src:{
        cwd: __dirname + '/assets/img',//需要合并的图片位置
        glob: '*.png'//图片名字
      },
      target: {
        image: __dirname + '/dist/images/sprite.png',
        css: __dirname + '/dist/css/sprite.css' 
      },
      apiOptions: {
        cssImageRef: './sprite.png' //cssImageRef为必选项
      },
       //配置spritesmith选项，非必选
      spritesmithOptions: {
        algorithm: 'top-down',//设置图标的排列方式
        padding: 4 //每张小图的补白,避免雪碧图中边界部分的bug
      }
    }),
    new MiniCssExtractPlugin({
      filename:'css/[name].css',
    })
  ]
}