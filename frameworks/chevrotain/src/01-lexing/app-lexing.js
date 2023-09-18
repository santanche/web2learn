import { lex } from './lexing.js'

export class Translator {
  parse (text) {
    return lex(text)
  }
}

Translator.i = new Translator()

// const inputText = "SELECT column1 FROM table2";
// const lexingResult = lex(inputText);
// console.log(JSON.stringify(lexingResult, null, "\t"));