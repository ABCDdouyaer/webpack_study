const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');//css模块资源压缩优化
let NODE_ENV = true ? 'production' : 'development';
module.exports = {
  mode: NODE_ENV,
  entry: {
    'index': './index.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [{
       test: /\.j(s|sx)$/,
       use:[{
         loader: 'babel-loader',
         options: {
          presets:['@babel/preset-env', '@babel/preset-react']
        }
       }]
    },
    {
      test: /\.(sc|sa|c)ss$/,
      exclude: /node_modules/,
      use:[
        NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: true,//css-modules将class转为hash
            localIdentName: '[name]-[hash:base64:5]'
          }
        },
        'postcss-loader',
        'sass-loader'
      ]
    },
    {
      test: /\.(jpg|gif|png|jpeg)$/,
      // use: ['file-loader']//都会产出静态图片
      use:[{//大于200k的为静态图 小于的为base64
        loader:'url-loader',
        options:{
          limit: 1024*1,
          outputPath: 'img/',
           //只有图片前面加前缀url
          publicPath: 'file:///Users/wangwei/Desktop/webpack/6-1基础配置/dist/img'
        }
      }],
    },]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    })
  ],
  optimization:{
    //对生成的CSS文件进行代码压缩 mode='production'时生效
    minimizer:[
       new OptimizeCssAssetsPlugin()
    ]
  }

}