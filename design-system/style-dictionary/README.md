# Style Dictionary

## Install

~~~
npm install -D style-dictionary
npx style-dictionary init complete
~~~

Replace the `config.json` with our `config.js` to customize transformations, focusing on CSS.

## Build

Generating CSS with the default config:
~~~
npx style-dictionary build
~~~

Generating the `config-resolved.json` with the `config-classes.js`:
~~~
npx style-dictionary build --config ./config-classes.js
~~~

## Config

* `config.js` - default file: generates only the CSS output with customizations to add the `rem` measure to shape specifications;
* `config-classes.js`: a customized format that loads an extra `classes.json` file and generates `classes-resolved.json`, transforming tokens in their respective values.

## Originals

The folder `originals` contains the files concerning two original setups: basic and complete.

