let square;
let area;
function Start() {
   square = new SVG("square");
   area = new SVG("area");
   console.log(square.format)
   //square.format.addEventListener("mousedown", square.Down);
   //area.format.addEventListener("mousemove", area.Move);
   //square.format.addEventListener("mouseup", square.Up);
}
class SVG{
   constructor(type){
      this.Down = this.Down.bind(this);
      this.Move = this.Move.bind(this);
      this.Up = this.Up.bind(this);
      this.format = null;
      this.position = {};
      SVG.follow = false;
      if(type === "square"){
         this.format = document.querySelector("#movel");
         this.format.addEventListener("mousedown", this.Down);
         this.format.addEventListener("mouseup", this.Up);
         console.log(this.format);
      }
      else if(type === "area"){
         this.format = document.querySelector("#area")
         this.format.addEventListener("mousemove", this.Move);
      }

   }
   Down(event) {
      console.log(this.format)
      SVG.follow = true;
      this.position.dx = event.x - Number(this.format.getAttribute("x"));
      this.position.dy = event.y - Number(this.format.getAttribute("y"));
   }
   Move(event) {
      if (SVG.follow) {
         this.format.setAttribute("x", event.x - this.position.dx);
         this.format.setAttribute("y", event.y - this.position.dy);
      }
   }
   Up(event) {
      SVG.follow = false;
   }
}

(function() {
   SVG.follow = false;
})();
