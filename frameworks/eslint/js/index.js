import {zeroPad} from './lib.js'

function component() {
  const element = document.createElement('div');

  element.innerHTML = zeroPad(157, 5)

  return element;
}

document.body.appendChild(component());