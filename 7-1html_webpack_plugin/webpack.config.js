const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
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
  plugins:[
    new HtmlWebpackPlugin({
      title: 'html-webpack-plugin',//title设置
      // template: 'index.html',//设置模板文件
      filename: 'index.html',//设置输出的html文件名
      // templateParameters: {},//允许覆盖模板中使用的参数
      inject: 'body',//body将会把文件插入body，head将会插入head
      favicon: './favicon.jpg',//增加图标
      meta: {viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'},
      minify: {
        removeAttributeQuotes: true,
        removeTagWhitespace: true,
        //去除多余的空格
        collapseWhitespace:true,},//压缩也可以传入对象，对象为压缩配置 html-minifier包
      hash: true,//是否增加hash
      cache:true,//仅仅当文件改变才会去替换
      showErrors: true,//错误详情将被写入html
      chunks: ['index'],//允许仅仅加入一部分chunk
      chunksSortMode: 'auto',//对插入的chunk进行排序
      excludeChunks:[],//不包含某些chunk
      xhtml:false,//true会按xml规则自动所有标签闭合
    }),
    new HtmlWebpackPlugin({
      title: 'html-webpack-plugin',//title设置
      // template: 'index.html',//设置模板文件
      filename: 'home.html',//设置输出的html文件名
      // templateParameters: {},//允许覆盖模板中使用的参数
      inject: 'body',//body将会把文件插入body，head将会插入head
      favicon: './favicon.jpg',//增加图标
      meta: {viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'},
      minify: true,//压缩也可以传入对象，对象为压缩配置 html-minifier包
      hash: true,//是否增加hash
      cache:true,//仅仅当文件改变才会去替换
      showErrors: true,//错误详情将被写入html
      chunks: ['home', 'index'],//允许仅仅加入一部分chunk
      chunksSortMode: 'auto',//对插入的chunk进行排序
      excludeChunks:[],//不包含某些chunk
      xhtml:false,//true会按xml规则自动所有标签闭合
    })
  ]
}