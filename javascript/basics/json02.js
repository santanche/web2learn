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
   mostraResultados(soma(5, "7"));

   mostraResultados(dobro(5));
   mostraResultados(dobro("7"));
   mostraResultados(dobro("dino"));
}

function soma(x, y) {
   return x + y;
}

function dobro(x) {
   return x * 2;
}

function mostraResultados(resultado) {
   let result = document.querySelector("#resultados");
   result.innerHTML =
      result.innerHTML + resultado + "<br>";
}
