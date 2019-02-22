const path = require('path');
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');

module.exports = {
  // JS 执行入口文件
  entry: {
    main: './main.js',
  },
  output: {
    // 把所有依赖的模块合并输出到一个 bundle.js 文件
    filename: '[name].js',
    // 输出文件都放到 dist 目录下
    path: path.resolve(__dirname, './dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        // 排除 node_modules 目录下的文件，node_modules 目录下的文件都是采用的 ES5 语法，没必要再通过 Babel 去转换
        exclude: path.resolve(__dirname, 'node_modules'),
      },
      {
        test: /\.css/,
        use: ['style-loader', 'css-loader'],
      },
    ]
  },
  plugins: [
    // 现实出被替换模块的名称
    new NamedModulesPlugin(),
  ],
  // 输出 source-map 方便直接调试 ES6 源码
  devtool: 'source-map',
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
