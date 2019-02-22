const path = require('path');
//生成html并将依赖插入html
const HtmlWebpackPlugin = require('html-webpack-plugin');
//分离css
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//压缩优化css
let OptimizeCss = require('optimize-css-assets-webpack-plugin');
//压缩js
let UglifyJsPlugin = require('uglifyjs-webpack-plugin');
//把插件注入到全局
let ProvidePlugin = require('webpack').ProvidePlugin;
module.exports = {
  optimization:{//优化项配置
    minimizer:[
      new OptimizeCss(),
      // new UglifyJsPlugin({
      //    cache: true,
      //    parallel: true,
      //    sourceMap: true,
      // })
    ]
  },
  mode: 'development',
  // mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),
    //引入资源给所有资源加入统一路径前缀
    // publicPath: 'file:///Users/wangwei/Desktop/webpack/6-1基础配置/dist/'
  },
  module: {
    rules:[
      // {
      //   enforce: "pre",
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   loader: "eslint-loader",
      // },
      {
        test: require.resolve('jquery'),
        use:[{
          loader: 'expose-loader',
          options: "$"
        }]
      },
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env'
            ],
            plugins:[
              ["@babel/plugin-proposal-decorators", { "legacy": true }],
              ["@babel/plugin-proposal-class-properties", { "loose" : true }],
              '@babel/plugin-transform-runtime'
            ]
          }
        }],
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        //css-loader处理css style-loader将css插入
        use: [
          // {
          //   loader: 'style-loader',
          //   options: {
          //     //插入的head优先级低于head上面本身的css
          //     insertAt: 'top'
          //   }
          // }, 
          //抽离css
          MiniCssExtractPlugin.loader,
          'css-loader', 'postcss-loader']
      },

      {
        test: /\.scss$/,
        use:[MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
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
            // publicPath: 'file:///Users/wangwei/Desktop/webpack/6-1基础配置/dist/'
          }
        }],
      },
      {
        test: /\.html$/,
        use: ['html-withimg-loader']//用来解析html中的图片链接
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      //html模板
      template: './src/index.html',
      //输出的html文件
      filename: 'index.html',
      minify: {
        //双引号变单引号
        removeAttributeQuotes: true,
        //去除多余的空格
        collapseWhitespace:true,
      },
      //引入依赖增加hash
      hash:true,
    }),
    new MiniCssExtractPlugin({
      filename: 'css/index.css'
    }),
    //注入全局jq
    new ProvidePlugin({
      $: 'jquery'
    })
  ],
  externals: [],//用来告诉webpack某个模块外面引入 不用打包进来，比如jq通过script引入
  devServer:{
    host: '127.0.0.1',
    port: '8888',
    progress: true,
    contentBase: './dist',
    open: true,
    proxy: {//配置代理
      before(app){
        app.get('/api/user', (req, res) => {
          res.json({name: '模拟数据'})
        })
      },
      '/api': {
        target: 'http://localhost:3000',
        pathRewrite: {'^/api' : ''}
      }
    }
  }
}