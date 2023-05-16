import { Tools } from './tools.js'

function component() {
  const element = document.createElement('div')

  element.innerHTML = Tools.zeroPad(157, 5)

  return element;
}

document.body.appendChild(component())