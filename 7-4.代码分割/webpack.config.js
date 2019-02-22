const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  mode: 'development',

  entry: {
    'index': './index.js',
    'home': './home.js'
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
        test: /\.(jpg|gif|jpeg|svg|png)$/,
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
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'template.html',
      chunks: ['index', 'vendors_home_index', 'manifest', 'common']
    }),
    new HtmlWebpackPlugin({
      filename: 'home.html',
      template: 'template.html',
      chunks: ['home', 'vendors_home_index', 'vendors_home', 'manifest', 'common']
    }),
    new MiniCssExtractPlugin({
      filename:'css/[name].css',
    }),
    new BundleAnalyzerPlugin({})
  ],

  optimization: {
    splitChunks: {
      // chunks(chunk){
      //   console.log(chunk.name)
      // },
      chunks: 'all',//声明需要优化的chunk同步异步和所有
      minSize: 30000,//模块的尺寸大于30kb
      maxSize: 0,//优先级 maxInitialRequest/maxAsyncRequests < maxSize < minSize
      minChunks: 1,//被引入的模块次数大于等于1
      maxAsyncRequests: 5,//按需加载的最大并行请求数
      maxInitialRequests: 3,//入口点的最大并行请求数
      automaticNameDelimiter: '_',//抽离的公共内容的文件命名分隔符
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        commons: {
          test: /[\\/]common[\\/]/,
          name: 'common',
          priority: -10,
          enforce: true
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    },
    runtimeChunk: {
      name: 'manifest'//提取入口文件公共部分
    }
  }

  
}