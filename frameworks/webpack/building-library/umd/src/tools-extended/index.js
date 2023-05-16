import { ToolsExtended } from './extended.js'

function component() {
  const element = document.createElement('div')

  element.innerHTML = ToolsExtended.currency(157, 5)

  return element;
}

document.body.appendChild(component())