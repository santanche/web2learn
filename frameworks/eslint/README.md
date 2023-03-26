---
permalink: /frameworks/eslint/
layout: single
---

ESLint
======

[ESLint](https://eslint.org/) is a tool to find and fix problems in Javascript.

Installing and a configuring ESLint according to the [Getting Started with ESLint](https://eslint.org/docs/latest/use/getting-started).

Basic steps to start on ESLint on "Installation".

# Summary of Installation Commands

1. create a folder and enter in it
2. create a node environment: `npm init -y`
3. install and config ESLint with the command: `npm init @eslint/config`
  3.1. we preliminary answered the questions in the following way:

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

4. running ESLint
  4.1. only test: `npx eslint js/app.js`
  4.2. fixing problems: `npx eslint --fix js/app.js`
  4.3. entire folder: `npx eslint js/`

If you wish to run the example code itself (not the ESLint), it is necessary to install the node.js [Web Dev Server](https://modern-web.dev/docs/dev-server/overview/). There is a `<script type="module">` in the example and browsers do not accept module inclusion from `file:` pages; they must be `http(s):`.

5. installing http-server: `npm install @web/dev-server --save-dev`
6. running http-server: `npx web-dev-server --node-resolve --open`