class Translator {
  constructor () {
    // Create a Parser object from our grammar.
    this.parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
  }

  parse (text) {
    // Parse something!
    this.parser.feed(text)

    // parser.results is an array of possible parsings.
    return this.parser.results
  }
}

Translator.i = new Translator()