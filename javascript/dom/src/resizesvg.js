let square;
let area;
function Start() {
   square = new Movel();
   //square.format.addEventListener("mousedown", square.down);
   //area.format.addEventListener("mousemove", area.move);
   //square.format.addEventListener("mouseup", square.up);
}
class Movel{
   constructor(){
      this.down = this.down.bind(this);
      this.move = this.move.bind(this);
      this.up = this.up.bind(this);
      this.click = this.click.bind(this);
      this.grow = this.grow.bind(this);
      this.notGrow = this.notGrow.bind(this);
      this.position = {"dx" : 0,"dy": 0};
      this.follow = false;
      this.cresce = false;
      this.quadradoElem = document.querySelector(".pointerDiff");
      this.quadradoElem.classList.toggle("visivel");
      this.square = document.querySelector("#movel");
      this.area = document.querySelector("#area");
      this.quadradoElem.addEventListener("mousedown", this.grow);
      this.quadradoElem.addEventListener("mouseup", this.notGrow);
      this.square.addEventListener("click", this.click);
      this.area.addEventListener("mousemove", this.move);
      this.area.addEventListener("click", this.click);

   }
   grow(event){
      this.cresce = true;
   }
   down(event) {
      this.follow = true;
      this.position.dx = event.x - Number(this.square.style.left);
      this.position.dy = event.y - Number(this.square.style.top);
   }
   move(event) {
      if (this.follow && !this.cresce) {
         this.square.style.left = (event.x - this.position.dx) + "px";
         this.square.style.top = (event.y - this.position.dy) + "px";
      }
      if (this.cresce){
         this.square.width = event.x;
         this.square.height = event.y;
         this.quadradoElem.setAttribute("x", event.x -5 );
         this.quadradoElem.setAttribute("y", event.y -5);
      }
   }
   up(event) {square.setAttribute("width", event.x );
            square.setAttribute("height", event.y );
            quadradoElem.setAttribute("x", event.x -5 );
            quadradoElem.setAttribute("y", event.y -5);
      this.follow = false;
   }
   notGrow(event){
      this.cresce = false;
      this.quadradoElem.classList.toggle("visivel");
   }
   click(event){
      if(this.follow){
         this.follow = false;
      }else{
         this.follow = true;
         this.quadradoElem.classList.add("visivel");
         this.position.dx = event.x - Number(this.square.style.left.replace("px",""));
         this.position.dy = event.y - Number(this.square.style.top.replace("px",""));
      }
   }
}

//(function() {
   //Movel.follow = false;
//})();
