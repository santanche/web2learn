// custom: to import the css transform group
const StyleDictionary = require('style-dictionary')
const fs = require('fs')
const { transferableAbortController } = require('util')

const jsonStrClasses =
  fs.readFileSync('classes/classes.json').toString()

// find the path in the token tree and converts to the value
function getFinalValue(tokenName, dictionary) {
  const tokenPath = tokenName.split('.')
  let value = dictionary.tokens
  let subpath = ''
  for (const path of tokenPath) {
    subpath += path + '.'
    if (!value[path]) {
      value = subpath + '..?'
      break
    } else {
      value = value[path]
    }
  }
  return value
}

// convert token fonts into css imports
function cssImportFonts (dictionary) {
  let cssFonts = ''
  const dic = dictionary.tokens
  if (dic.asset && dic.asset.font) {
    const fonts = dic.asset.font
    for (const f in fonts) {
      const ftype =
        (fonts[f].ttf) ? fonts[f].ttf :
        (fonts[f].woff) ? fonts[f].woff :
        (fonts[f].woff2) ? fonts[f].woff2 :
        (fonts[f].eot) ? fonts[f].eot : null
      if (ftype != null)
        cssFonts += `@font-face {\n  font-family: '${fonts[f].name.value}';\n  src: url('${ftype.value}');\n}\n`
    }
    cssFonts += '\n'
  }
  return cssFonts
}

// convert JSON classes to CSS classes
function classJSONtoCSS (jsonStrClasses) {
  let cssClasses = ''
  const jsonClasses = JSON.parse(jsonStrClasses)
  for (const cls in jsonClasses) {
    cssClasses += `.${cls} {\n`
    for (const prop in jsonClasses[cls]) {
      let value = jsonClasses[cls][prop]
      // check Array type and transform in a string
      if (Array.isArray(value))
        value = value.join(' ')
      if (value.includes('{'))
        value = value
          .replace(/\.value/g, '')
          .replace(/\./g, '-')
          .replace(/{/g, 'var(--')
          .replace(/}/g, ')')
      cssClasses += `  ${prop}: ${value};\n`
    }
    cssClasses += '}\n'
  }
  return cssClasses
}

/* Output 1: aggregated tokens */
StyleDictionary.registerFormat({
  name: 'jsonAggregatedFormat',
  formatter: function({dictionary, platform, options, file}) {
    return JSON.stringify(dictionary.tokens, null, 2)
  }
})

/* Output 2: same JSON replacing tokens by final values */
StyleDictionary.registerFormat({
  name: 'jsonResolvedFormat',
  formatter: function({dictionary, platform, options, file}) {
    const jsonResClasses = jsonStrClasses
      .replace(/{(.*)}/g, (match, tokenName) => getFinalValue(tokenName, dictionary))

    return jsonResClasses
  }
})

/* Output 3: CSS file with token variables */
StyleDictionary.registerFormat({
  name: 'cssClassFormat',
  formatter: function({dictionary, platform, options, file}) {
    return cssImportFonts(dictionary) + classJSONtoCSS (jsonStrClasses)
  }
})

/* Output 4: CSS file with final values */
StyleDictionary.registerFormat({
  name: 'cssResolvedClassFormat',
  formatter: function({dictionary, platform, options, file}) {
    const jsonResClasses = jsonStrClasses
      .replace(/{(.*)}/g, (match, tokenName) => getFinalValue(tokenName, dictionary))
    return cssImportFonts(dictionary) + classJSONtoCSS (jsonResClasses)
  }
})

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
      "options": {
        "showFileHeader": true
      },
      // extends css transform group with custom transforms
      'transforms': StyleDictionary.transformGroup['css'].concat(['shape/rem']),
      "buildPath": "build/",
      "files": [
        {
          "format": "jsonAggregatedFormat",
          "destination": "intermediary/aggregated-tokens.json",
          "options": {
            "showFileHeader": false
          }
        },
        {
          "format": "jsonResolvedFormat",
          "destination": "classes/classes-resolved.json",
          "options": {
            "showFileHeader": false
          }
        },
        {
          "format": "cssClassFormat",
          "destination": "css/classes-tokens.css",
          "options": {
            "showFileHeader": false
          }
        },
        {
          "format": "cssResolvedClassFormat",
          "destination": "css/classes-resolved.css",
          "options": {
            "showFileHeader": false
          }
        }
      ]
    }
  }
}