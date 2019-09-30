let square;
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
      this.grow = this.grow.bind(this);
      this.notGrow = this.notGrow.bind(this);
      this.position = { "dx" : 0,
                        "dy": 0,
                        "tx":0,
                        "ty":0};
      this.follow = false;
      this.resize = false;
      this.growSquare = document.querySelector(".pointerDiff");
      this.growSquare.classList.toggle("visible");
      this.square = document.querySelector("#move");
      this.area = document.querySelector("#area");
      this.growSquare.addEventListener("mousedown", this.grow);
      this.growSquare.addEventListener("mouseup", this.notGrow);
      this.square.addEventListener("mousedown", this.down);
      this.square.addEventListener("mouseup",this.up);
      this.area.addEventListener("mousemove", this.move);
      this.group = document.querySelector("#group-move");
      // this.area.addEventListener("click", this.click);

   }
   grow(event){
      this.resize = true;
   }
   down(event) {
      this.follow = true;
      this.growSquare.classList.add("visible");
      this.position.dx = event.x - this.position.tx;
      this.position.dy = event.y - this.position.ty;
      // this.position.dx = event.x - Number(this.group.getAttribute("transform"));
      // this.position.dy = event.y - Number(this.group.getAttribute("y"));
   }
   move(event) {
      if (this.follow && !this.resize) {
         if(event.x < 0){
            event.x = 0;
         }
         if(event.y < 0){
            event.y = 0;
         }
         this.position.tx = event.x - this.position.dx;
         this.position.ty = event.y - this.position.dy;
         this.group.setAttribute("transform","translate(" + (this.position.tx) + "," + (this.position.ty) + ")");
         // this.group.setAttribute("y",event.y - this.position.dy);
      }
      if (this.resize){
         this.square.setAttribute("width",event.x - this.position.tx);
         this.square.setAttribute("height",event.y - this.position.ty);
         this.growSquare.setAttribute("x", event.x - this.position.tx -5 );
         this.growSquare.setAttribute("y", event.y - this.position.ty -5);
      }
   }
   up(event) {
      this.follow = false;
   }
   notGrow(event){
      this.resize = false;
      this.growSquare.classList.toggle("visible");
   }
}

//(function() {
   //Movel.follow = false;
//})();
