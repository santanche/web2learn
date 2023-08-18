// custom: to import the css transform group
const StyleDictionary = require('style-dictionary')

module.exports = {
  source: [`tokens/**/*.json`],
  // custom transforms
  transform: {
    'shape/rem': {
      type: 'value',
      matcher: (token) => token.attributes.category === 'shape',
      transformer: (token) => token.original.value + 'rem'
    }
  },
  platforms: {
    "css": {
      // extends css transform group with custom transforms
      'transforms': StyleDictionary.transformGroup['css'].concat(['shape/rem']),
      "buildPath": "build/css/",
      "files": [
        {
          "format": "css/variables",
          "destination": "variables.css"
        }
      ]
    }
  }
}