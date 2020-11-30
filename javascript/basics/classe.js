class Dino {
   mostra() {
      mostraResultados("O dinossauro pulou na lama.");
   }
}

class Asdrubal {
   mostra() {
      mostraResultados("Eu sou Asdrubal.");
   }
}

class Doriana {
   feliz() {
      mostraResultados("Doriana está feliz");
   }
}

function exemplo01() {
   let a = new Dino();
   ativaMostra(a);
   let b = new Asdrubal();
   ativaMostra(b);
}

function exemplo02() {
   let d = new Doriana();
   ativaMostra(d);
}

function ativaMostra(x) {
   x.mostra();
}


/* -----------------------------*/

function mostraDetalhado(x) {
   for (let a in x)
      mostraResultados(a + ": " + x[a]);
}

function mostraResultados(resultado) {
   let result = document.querySelector("#resultados");
   result.innerHTML =
      result.innerHTML + resultado + "<br>";
}