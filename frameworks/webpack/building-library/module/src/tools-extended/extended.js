import { Tools } from '../../dist/toollib.js'

export class ToolsExtended { // extends Tools {
  static currency (number, length) {
    console.log('=== tools-extended (Tools class) ===')
    console.log(Tools)
    return '$ ' + Tools.zeroPad(number, length)
  }
}