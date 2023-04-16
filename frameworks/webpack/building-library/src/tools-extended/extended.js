import * as tl from '../../dist/toollib.js'
// import * as tl from '../tools/lib.js'

export class ToolsExtended { // extends Tools {
  static currency (number, length) {
    console.log('=== tools-extended ===')
    console.log(tl)
    console.log(tl.Tools)
    // return '$ ' + tl.Tools.zeroPad(number, length)
  }
}