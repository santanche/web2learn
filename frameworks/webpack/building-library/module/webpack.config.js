const path = require('path');

module.exports = {
  entry: './src/tools/index.js',
  output: {
    filename: 'toolapp.js',
    path: path.resolve(__dirname, 'dist')
  }
}