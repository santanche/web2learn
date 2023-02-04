const path = require('path')
const ESLintPlugin = require('eslint-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [new ESLintPlugin({fix:true})]
}
