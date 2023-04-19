import * as tl from '../../dist/toollib.js'
// import * as tl from '../tools/lib.js'
// import * as tl from '../tools/tools.js'

export class ToolsExtended { // extends Tools {
  static currency (number, length) {
    console.log('=== tools-extended ===')
    console.log(tl)
    console.log(tl.Tools)
    console.log(window.tl)
    console.log(window.Tools)
    // return '$ ' + tl.Tools.zeroPad(number, length)
  }
}