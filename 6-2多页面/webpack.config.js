const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BannerPlugin = require('webpack').BannerPlugin;
/**
 * 
 * cleanWebpackPlugin
 * copyWebpackPlugin
 * bannerPlugin内直插件
 */
module.exports = {
  mode: 'production',
  // watch: true,
  // watchOptions: {
  //   ignored: /node_modules/,
  //   aggregateTimeout: 300,//监听变化300ms后执行动作
  //   poll: 1000,//每秒询问1000次看文件是否发生变化

  // },
  entry: {
    'index': './src/index.js',
    // 'login': './src/login'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [{
      test: /\.js$/,
      use:[{
        loader: 'babel-loader',
        options: {
          presets:['@babel/preset-env']
        }
      }]
    }]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template: './template.html',
      filename: 'index.html',
      chunks: ['index']
    }),
    // new HtmlWebpackPlugin({
    //   template: './template.html',
    //   filename: 'login.html',
    //   chunks: ['login', 'index']
    // }),
    // new CleanWebpackPlugin('./dist'),//打包前删除dist文件夹原先的内容
    // new CopyWebpackPlugin([ //将某个文件夹内容复制到dist
    //   {from: 'doc', to: './'}
    // ]),
    // new BannerPlugin('王炜写的代码'),//版权申明
  ],
  devServer:{
    host: '127.0.0.1',
    // progress: true,
    // contentBase: './dist',
    // open: true,
    proxy: {//配置代理
      '/api': {
        target: 'http://localhost:3000',
        pathRewrite: {'^/api' : ''}
      }
    }
  },
  devtool: 'source-map'//单独生成调试文件
  // devtool: 'eval-source-map'//不生成调试文件但可以显示行和列，集成在打包后的文件中
  // devtool: 'cheap-module-source-map'//单独生成调试文件不会产生列
   // devtool: 'cheap-module-eval-source-map'//不生成调试文件但可以显示行，集成在打包后的文件中
}