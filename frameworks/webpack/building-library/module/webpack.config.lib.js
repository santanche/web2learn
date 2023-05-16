const path = require('path');

module.exports = {
  entry: './src/tools/lib.js',
  experiments: {
    outputModule: true,
  },
  output: {
    filename: 'toollib.js',
    path: path.resolve(__dirname, 'dist'),
    library: {
      type: 'module'
    }
  }
}