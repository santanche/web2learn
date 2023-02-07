webpack + ESLint Tutorial
=========================

# webpack

[webpack](https://webpack.js.org/) is a powerful Web bundler.

Basic steps to start on webpack on [Getting Started](https://webpack.js.org/guides/getting-started).

Important related references:
* creating an NPM environment with [npm init](https://docs.npmjs.com/cli/v9/commands/npm-init)
* installing packages with [npm install](https://docs.npmjs.com/cli/v9/commands/npm-install)
  * it is paramount to understand the difference between `--save` and `--save-dev`
* understanding the [package.json](https://docs.npmjs.com/cli/v9/configuring-npm/package-json) and [package-lock.json](https://docs.npmjs.com/cli/v9/configuring-npm/package-lock-json) structures
* [Lodash](https://lodash.com/) framework adopted as an example in the tutorial
* [webpack mode-](https://webpack.js.org/configuration/mode/) is an extra paramount parameter to produce the code

We added the following parameter in the suggested command:
* running from npx: `npx webpack --config webpack.config.js --mode=production`
* running from npm: `npm run build -- --mode=production`
Argument `development` can replace argument `production`. It will change de bundle format to a development-friendly format: e.g., to produce a more readable js source.

# webpack + ESLint

[ESLint](https://eslint.org/) is a tool to find and fix problems in Javascript.

To install ESLint see [README.md](../eslint/README.md) in the `frameworks/eslint` folder.

[EslintWebpackPlugin](https://www.npmjs.com/package/eslint-webpack-plugin) is a plugin that integrates ESLint with webpack.

The [EslintWebpackPlugin](https://www.npmjs.com/package/eslint-webpack-plugin) page has the installation instructions. We also created two alternative webpack configs:

## Production config: webpack.config.js (default)

Sets the production mode and fixes the style problems (ESLint).

~~~js
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
~~~

To run this production version use: `npm run build`

## Development config: webpack-dev.config.js

Sets the development mode and reports the style problems (ESLint).

~~~js
const path = require('path')
const ESLintPlugin = require('eslint-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [new ESLintPlugin()]
}
~~~

To run this development version use: `npm run build -- --config webpack-dev.config.js`

# webpack + ESLint + Playwright

[Playwright](https://playwright.dev/) is a test automation tool.

To install Playwright see [README.md](../playwright/README.md) in the `frameworks/playwright` folder.

To integrate with webpack and ESLint, add two scripts in the package.json:

~~~json
  "scripts": {
    "test": "playwright test",
    "build": "webpack",
    "test-build": "playwright test && webpack"
  }
~~~

To run the scripts replace the `build` clause with `test` or `test-build`, as follows:
* test in development mode: `npm run test -- --config webpack-dev.config.js`
* test and build in development mode: `npm run test-build -- --config webpack-dev.config.js`
* test in production mode: `npm run test`
* test and build in production mode: `npm run test-build`

# Summary of Installation Commands

1. create a folder and enter in it
2. create a node environment: `npm init -y`
3. install webpack: `npm install webpack webpack-cli --save-dev`
4. install ESLint: `npm init @eslint/config`
  4.1. answer the questions (see ESLint section)
5. install ESLint plugin: `npm install eslint-webpack-plugin --save-dev`
  5.1. adjust webconfig files (see webpack + ESLint section)
6. install Playright: `npm init playwright@latest`
  6.1. answer the questions (see README.md in the Playwright folder)

## Only for the example
3.1. install lodash: `npm install --save lodash`