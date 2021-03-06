const path = require('path');

module.exports = {
  mode: 'development',
  entry:{
    'index': './index'
  },
  output:{
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: []
}