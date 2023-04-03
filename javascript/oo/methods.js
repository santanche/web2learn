class Dino {
  constructor () {
    this._name = ''
  }

  get name() {
    return this._name
  }

  set name(newName) {
    this._name = newName
  }

  name() {
    return 'Quincas'
  }
}

function testDino() {
   d = new Dino()
   mostraResultados('* base name')
   mostraResultados(d.name)
   d.name = 'Asdrubal'
   mostraResultados('* Asdrubal name')
   mostraResultados(d.name)
   mostraResultados('* Quincas name')
   mostraResultados(d.name())
}

/* -----------------------------*/

function mostraResultados(resultado) {
   let result = document.querySelector("#resultados");
   result.innerHTML =
      result.innerHTML + resultado + "<br>";
}
