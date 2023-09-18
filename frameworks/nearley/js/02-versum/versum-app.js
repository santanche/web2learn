class Translator {
  constructor () {
    this.parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
  }

  parse (text) {
    let results = []
    try {
      this.parser.feed(text)
      results = this.parser.results
    } catch (parseError) {
      results = {error: parseError.message}
      // gets only the error message before '...based on'
      // const token = parseError.token
      // console.log(token)
      // const message = parseError.message
      // let expected = message.match(/(?<=A ).*(?= based on:)/g).map(s => s.replace(/\s+token/i,''));
      // let newMessage = `Unexpected ${token.type} token "${token.value}" `+
      // `at line ${token.line} col ${token.col}.`;
      // if (expected && expected.length) newMessage += ` Tokens expected: ${[...new Set(expected)]}`;  
      // results = newMessage
    }
    return results
  }
}

Translator.i = new Translator()