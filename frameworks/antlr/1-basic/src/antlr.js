import antlr4 from 'antlr4'
import ExprLexer from '../generated/ExprLexer.js'
import ExprParser from '../generated/ExprParser.js'
import ExprListener from '../generated/ExprListener.js'

const input = '10+20*30'
const chars = new antlr4.InputStream(input)
const lexer = new ExprLexer(chars)
const tokens = new antlr4.CommonTokenStream(lexer)
const parser = new ExprParser(tokens)
const tree = parser.prog()

console.log(tree.toStringTree(parser.ruleNames))