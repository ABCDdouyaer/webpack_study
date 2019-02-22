const path = require('path');

module.exports = {
  // JS 执行入口文件
  entry: {
    main: './main.js',
  },
  output: {
    // 为从 entry 中配置生成的 Chunk 配置输出文件的名称
    filename: '[name].js',
    // 为动态加载的 Chunk 配置输出文件的名称
    chunkFilename: '[name].js',
    path: path.resolve(__dirname, './dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: path.resolve(__dirname, 'node_modules'),
      },
    ]
  },
  devtool: 'source-map', // 输出 source-map 方便直接调试 ES6 源码
  devServer: {
    //指定ip地址 默认127.0.0.1
    host: '10.205.98.13',
    //指定端口号
    port: 8888,
    //是否对代码压缩
    compress: true,
    // //启用模块热替换
    // hot: true,
    // //inline true 刷新页面
    inline: true,
    //将dist下面的文件作为可访问文件
    // contentBase: './dist'
    //启动服务自动打开浏览器
    open: true,
  }
};
