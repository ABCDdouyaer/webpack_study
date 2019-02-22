const path = require('path');

module.exports = {
  // JS 执行入口文件
  entry: './main.js',
  output: {
    // 把所有依赖的模块合并输出到一个 bundle.js 文件
    filename: 'bundle.js',
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
  // 输出 source-map 方便直接调试 ES6 源码
  devtool: 'source-map',
  watch: true,//开启监听
  watchOptions: {
    ignored: /node_modules/,
    aggregateTimeout: 300,//监听变化300ms后执行动作
    poll: 1000,//每秒询问1000次看文件是否发生变化
  }
  // devServer: {
  //   //指定ip地址 默认127.0.0.1
  //   host: '10.205.98.13',
  //   //指定端口号
  //   port: 8888,
  //   //是否对代码压缩
  //   compress: true,
  //   //inline true 刷新页面
  //   inline: false,
  //   historyApiFallback: {
  //     // 使用正则匹配命中路由
  //     rewrites: [
  //       // /user 开头的都返回 user.html
  //       { from: /^\/user/, to: '/user.html' },
  //       { from: /^\/game/, to: '/game.html' },
  //       // 其它的都返回 index.html
  //       { from: /./, to: '/index.html' },
  //     ]
  //   }
  // }
};
