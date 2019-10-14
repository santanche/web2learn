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

      this.areaup = this.areaup.bind(this);

      this.position = { "dx" : 0,
                        "dy": 0,
                        "tx":0,
                        "ty":0};
      this.follow = false;
      this.resize = false;

      this.controlDown = false;

      this.growSquareBR = document.querySelector("#squareBR");
      this.growSquareBR.classList.toggle("visible");

      this.growSquareTL = document.querySelector("#squareTL");
      this.growSquareTL.classList.toggle("visible");
      this.growSquareBL = document.querySelector("#squareBL");
      this.growSquareBL.classList.toggle("visible");
      this.growSquareTR = document.querySelector("#squareTR");
      this.growSquareTR.classList.toggle("visible");

      this.square = document.querySelector("#move");
      this.area = document.querySelector("#area");
      this.growSquareBR.addEventListener("mousedown", this.grow);
      this.growSquareBR.addEventListener("mouseup", this.notGrow);

      this.growSquareTL.addEventListener("mousedown", this.grow);
      this.growSquareTL.addEventListener("mouseup", this.notGrow);
      this.growSquareBL.addEventListener("mousedown", this.grow);
      this.growSquareBL.addEventListener("mouseup", this.notGrow);
      this.growSquareTR.addEventListener("mousedown", this.grow);
      this.growSquareTR.addEventListener("mouseup", this.notGrow);

      this.square.addEventListener("mousedown", this.down);
      this.square.addEventListener("mouseup",this.up);
      this.area.addEventListener("mousemove", this.move);
      this.group = document.querySelector("#group-move");
      this.area.addEventListener("mouseup", this.areaup);
      // this.area.addEventListener("click", this.click);

      document.addEventListener("keydown", this.move);

   }

   areaup(event){
       if(this.controlDown){
           this.resize = false;
       }
   }
   grow(event){
      this.resize = true;
   }
   down(event) {
      this.follow = true;
      this.growSquareBR.classList.toggle("visible");

      this.growSquareTL.classList.toggle("visible");
      this.growSquareBL.classList.toggle("visible");
      this.growSquareTR.classList.toggle("visible");

      this.position.dx = event.x - this.position.tx;
      this.position.dy = event.y - this.position.ty;
      // this.position.dx = event.x - Number(this.group.getAttribute("transform"));
      // this.position.dy = event.y - Number(this.group.getAttribute("y"));
   }
   move(event) {
    if(event.ctrlKey){
        this.square.setAttribute("preserveAspectRatio", "xMidYMid");
        this.controlDown = true;
        
    }
    else{
        this.square.setAttribute("preserveAspectRatio", "none");
        this.controlDown = false;
    }

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
      }
      if (this.resize){
         let squareSizeX = event.x - this.position.tx;
         let squareSizeY = event.y - this.position.ty;
         
         if(squareSizeX - 5 >=0 && squareSizeY-5 >= 0){
            if(this.controlDown===false){
                this.square.setAttribute("width",squareSizeX);
                this.square.setAttribute("height",squareSizeY);
                this.growSquareBR.setAttribute("x", squareSizeX -5 );
                this.growSquareBR.setAttribute("y", squareSizeY -5);

                this.growSquareTL.setAttribute("x", 0);
                this.growSquareTL.setAttribute("y", 0);
                this.growSquareBL.setAttribute("x", 0 );
                this.growSquareBL.setAttribute("y", squareSizeY - 5);
                this.growSquareTR.setAttribute("x", squareSizeX - 5 );
                this.growSquareTR.setAttribute("y", 0);
            }
            else{
                let minimun = Math.min(squareSizeX, squareSizeY);
                this.square.setAttribute("width",minimun);
                this.square.setAttribute("height",minimun);
                this.growSquareBR.setAttribute("x", minimun -5 );
                this.growSquareBR.setAttribute("y", minimun -5);

                this.growSquareTL.setAttribute("x", 0);
                this.growSquareTL.setAttribute("y", 0);
                this.growSquareBL.setAttribute("x", 0 );
                this.growSquareBL.setAttribute("y", minimun - 5);
                this.growSquareTR.setAttribute("x", minimun - 5 );
                this.growSquareTR.setAttribute("y", 0);
            }
         }
      }
   }
   up(event) {
      this.follow = false;
   }
   notGrow(event){
      this.resize = false;
      this.growSquareBR.classList.toggle("visible");

      this.growSquareTL.classList.toggle("visible");
      this.growSquareBL.classList.toggle("visible");
      this.growSquareTR.classList.toggle("visible");
      
      
   }
}
