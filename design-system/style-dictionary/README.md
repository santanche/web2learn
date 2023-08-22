# Style Dictionary

## Install

~~~
npm install -D style-dictionary
~~~

The following statement initializes the complete environment (not necessary):
~~~
npx style-dictionary init complete
~~~

In this case, you must:
* replace the `config.json` with our `config.js` to customize transformations, focusing on CSS;
* replace the initially generated tokens (`token` folder) with our tokens to use them.

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

* `config.js` -- default file
  * `transform`: add specialized measures to the CSS output -- add the `rem` measure to shape specifications;
  * `format`:
    * `css/variables.css`: JSON tokens transformed in CSS variables.

* `config-classes.js`
  * `transform`: add specialized measures to the CSS output -- add the `rem` measure to shape specifications;
  * `format`: customized formats that load an extra `classes.json` file and generate:
    * `classes/classes-resolved.json`: JSON classes with tokens transformed in their respective values;
    * `css/variables.css`: JSON tokens transformed in CSS variables;
    * `css/classes-tokens.css`: JSON classes transformed in CSS converting first-level properties in CSS classes and tokens to CSS variables;
    * `css/classes-resolved.css`: same as the previous, but converting tokens in their respective values;
    * `intermediary/aggregated-tokens.json`: an auxiliary file aggregating all tokens in a single hierarchical file.

## Originals

The folder `originals` contains the files concerning two original setups: basic and complete.

