const path = require('path');

module.exports = {
  entry: './src/tools/tools.js',
  output: {
    filename: 'toollib.js',
    path: path.resolve(__dirname, 'dist'),
    globalObject: 'self',
    library: {
      name: 'toollib',
      type: 'umd'
    }
  }
}