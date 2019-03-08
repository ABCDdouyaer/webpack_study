### 构建优化

- **module.noParse**将不需要解析的文件忽略掉以提高构建性能

- **resolve.extensions**自动解析确定的扩展 注意：有些未知的后缀没有写入可以在配置数组中最后加入"*"，引入的模块尽量都带文件扩展名

### 常用插件

- **clean-webpack-plugin：** 打包前清理出口文件夹
  
- **html-webpack-plugin：** 将js和css文件插入html模板，自动生成html文件

- **mini-css-extract-plugin：** 将css文件从js文件中分离出来 

- **optimize-css-assets-webpack-plugin：** 压缩css代码，【核心使用cssnano压缩】 解决extract-text-webpack-plugin创建的重复css；注意：@3.2.0仅支持webpack@3.0及以下版本，@4.0.0支持webpack@4.0及以上

- **uglifyjs-webpack-plugin：**压缩js代码
  
- **copy-webpack-plugin：**将单个文件或整个目录复制到构建目录

- **webpack-dev-server：**开发环境的模块热更新