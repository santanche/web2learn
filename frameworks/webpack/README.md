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

# ESLint

[ESLint](https://eslint.org/) is a tool to find and fix problems in Javascript.

Installing and a configuring ESLint according to the [Getting Started with ESLint](https://eslint.org/docs/latest/use/getting-started):

* install and config ESLint with the command: `npm init @eslint/config`
* we suggest the following answers to the questions:
~~~
How would you like to use ESLint?
> To check syntax, find problems, and enforce code style

What type of modules does your project use? … 
> JavaScript modules (import/export)

Which framework does your project use? … 
> None of these

Does your project use TypeScript?
> No

Where does your code run?
> Browser

How would you like to define a style for your project?
> Use a popular style guide

Which style guide do you want to follow?
> Standard: https://github.com/standard/standard

What format do you want your config file to be in? … 
> JSON
~~~

[StandardJS](https://standardjs.com/) is the standard style we suggest adopting.

# webpack + ESLint

EslintWebpackPlugin is a plugin that integrates ESLint with webpack.

The EslintWebpackPlugin page has the installation instructions. We also created two alternative webpack configs:

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

o install [Playwright](https://playwright.dev/) see `README.md` in the `Playwright` folder.

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