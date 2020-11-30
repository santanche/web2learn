function exemplo01() {
   let x = 5;
   mostraResultados(x);
   x = "dino";
   mostraResultados(x);
}

function exemplo02() {
   mostraResultados(soma(5, 7));
   mostraResultados(soma("dino", 7));
   mostraResultados(soma("5", 7));

   mostraResultados(dobro(5));
   mostraResultados(dobro("7"));
   mostraResultados(dobro("dino"));
}

function exemplo03() {
   let x = {
      nome: "Asdrubal",
      idade: 25,
      altura: 1.8
   };
   mostraDetalhado(x);
}

function exemplo04() {
   let y = {
      produto: "Glubador",
      preco: 539
   }
   mostraDetalhado(y);
   mostraResultados("-----");
   y.peso = 32;
   mostraDetalhado(y);
}

function exemplo05() {
   let v = [12, "dino", 17.5];
   mostraDetalhado(v);
}

function soma(x, y) {
   return x + y;
}

function dobro(x) {
   return x * 2;
}

function mostraDetalhado(x) {
   for (let a in x)
      mostraResultados(a + ": " + x[a]);
}

function mostraResultados(resultado) {
   let result = document.querySelector("#resultados");
   result.innerHTML =
      result.innerHTML + resultado + "<br>";
}