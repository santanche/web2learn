import Handlebars from "handlebars"

const template = Handlebars.compile(
  '<h2>{{firstname}} {{lastname}}</h2>')

document.querySelector('#result').innerHTML = template({
  firstname: 'Asdrubal',
  lastname: 'Silva'
})