const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');//打包前清除dist
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
//把插件注入到全局
let ProvidePlugin = require('webpack').ProvidePlugin;
module.exports = {
  mode: 'development',
  watch: true,//监听文件变动进行编译编译
  optimization: {
    minimizer: [new UglifyJsPlugin()],
  },
  entry: {
    'index': './src/index.js',
    'home': './src/home.js',
    '404': './src/404.js'
  },
  output:{
    filename:'[hash:5]-[name]-[id].js',
    path:path.resolve(__dirname, 'dist'),
    // publicPath: 'file:///Users/wangwei/Desktop/webpack/8-1.webpack%E5%AE%98%E7%BD%91/dist/',
    library: 'jquery',
    libraryTarget: 'var',//出口文件以libraryTarget形式赋值给library
    auxiliaryComment: {
        root: "Root Comment",
        commonjs: "CommonJS Comment",
        commonjs2: "CommonJS2 Comment",
        amd: "AMD Comment"
      }
  },
  module: {
    noParse: (content)=>{
        return /jquery|chartjs/.test(content);
    },
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
      use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
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
  resolve: {
      alias: {
          c: path.resolve(__dirname, 'src/a/b/'),
      }
  },
  plugins:[
    new CleanWebpackPlugin({
        verbose: true,//打印日志
    }),
    new CopyPlugin([
        { from: path.resolve(__dirname, 'src'), to: path.resolve(__dirname, 'dist/src')},
      ]),  
    new MiniCssExtractPlugin({
        filename: 'css/[name].css'
    }),
    new OptimizeCssAssetsPlugin({
        cssProcessor: require('cssnano'),
        cssProcessorPluginOptions: {
            preset: ['default', { discardComments: { removeAll: true } }],
        },
        canPrint: true
    }),
     //注入全局jq
    new ProvidePlugin({
        $: 'jquery'
    }),
    new HtmlWebpackPlugin({
        filename: 'index.html',
        chunks:['index']
    }),
    new HtmlWebpackPlugin({
        filename: 'home.html',
        chunks:['home']
    }),
    new HtmlWebpackPlugin({
        filename: '404.html',
        chunks:['404']
    }),
  ],

  devServer: {
      contentBase: path.resolve(__dirname, 'dist'),
      headers: {
        "X-Custom-Foo": "bar"
      },
      compress: true,
      host: '127.0.0.1',
      port: 8080,
      hot:true,//热模块替换
      open: true,//打开浏览器
      openPage: '',//打开浏览器的时候导航到的页面
      quiet: true,//将便以信息不打印
      index: 'index.html',
      overlay: true,//将编译错误显示到页面上
      historyApiFallback: {//路由重置
          rewrites: [
              {from: /^\/test/, to: '/home.html'},
              {from: /./, to: '/404.html'}
          ]
      },
      clientLogLevel: "none"
  },
  devtool: 'source-map',//打包的调试代码
}