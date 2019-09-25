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
      this.position = {"dx" : 0,"dy": 0};
      this.follow = false;
      this.square = document.querySelector("#movel");
      this.area = document.querySelector("#area");
      this.square.addEventListener("click", this.click);
      this.area.addEventListener("mousemove", this.move);
      this.area.addEventListener("click", this.click);

   }
   down(event) {
      this.follow = true;
      this.position.dx = event.x - Number(this.square.style.left);
      this.position.dy = event.y - Number(this.square.style.top);
   }
   move(event) {
      if (this.follow) {
         console.log("left: " + this.square.style.left);
         this.square.style.left = (event.x - this.position.dx) + "px";
         this.square.style.top = (event.y - this.position.dy) + "px";
      }
   }
   up(event) {
      this.follow = false;
   }
   click(event){
      if(this.follow){
         this.follow = false;
         console.log(this.follow);
      }else{
         this.follow = true;
         console.log(this.follow);
         this.position.dx = event.x - Number(this.square.style.left.replace("px",""));
         this.position.dy = event.y - Number(this.square.style.top.replace("px",""));
      }
   }
}

//(function() {
   //Movel.follow = false;
//})();
