class Translator {
  constructor () {
    this.parser = new nearley.Parser(
      nearley.Grammar.fromCompiled(grammar),
      {keepHistory: true});
  }

  parse (text) {
    let results = {}
    try {
      this.parser.feed(text)
      results = {
        status: 'success',
        parsed: this.parser.results
      }
    } catch (parseError) {
      results = {
        status: 'error',
        message: parseError.message,
        offset: parseError.offset,
        token: parseError.token
      }
    }
    console.log('=== parser table')
    console.log(this.parser.table)
    return results
  }
}

Translator.i = new Translator()