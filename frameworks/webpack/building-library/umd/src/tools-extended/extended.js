import '../../dist/toollib.js'

export class ToolsExtended { // extends Tools {
  static currency (number, length) {
    console.log('=== tools-extended ===')
    console.log(toollib)
    console.log(toollib.Tools)
    return '$ ' + toollib.Tools.zeroPad(number, length)
  }
}