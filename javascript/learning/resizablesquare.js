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
      this.position = {"dx" : 0,"dy": 0};
      this.follow = false;
      this.square = document.querySelector("#movel");
      this.area = document.querySelector("#area");
      this.square.addEventListener("mousedown", this.down);
      this.area.addEventListener("mousemove", this.move);
      this.area.addEventListener("mouseup", this.up);
      this.square.addEventListener("mouseup", this.up);

   }
   down(event) {
      this.follow = true;
      this.position.dx = event.x - Number(this.square.getAttribute("x"));
      this.position.dy = event.y - Number(this.square.getAttribute("y"));
   }
   move(event) {
      if (this.follow) {
         this.square.setAttribute("x", event.x - this.position.dx);
         this.square.setAttribute("y", event.y - this.position.dy);
      }
   }
   up(event) {
      this.follow = false;
   }
}

//(function() {
   //Movel.follow = false;
//})();
