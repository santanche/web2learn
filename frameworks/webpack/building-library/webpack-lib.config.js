const path = require('path');

module.exports = {
  entry: './src/tools/lib.js',
  output: {
    filename: 'toollib.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'toollib',
    libraryTarget: 'umd'
  }
}