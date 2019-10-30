let square;
function Start() {
   square = new Movel();
}
class Movel{
    constructor(){
        this.down = this.down.bind(this);
        this.move = this.move.bind(this);
        this.up = this.up.bind(this);
        this.areaup = this.areaup.bind(this);

        this.growBR = this.growBR.bind(this);
        this.growTL = this.growTL.bind(this);
        this.growTR = this.growTR.bind(this);
        this.growBL = this.growBL.bind(this);

        this.position = {   "dx": 0,
                            "dy": 0,
                            "tx" :0,
                            "ty" :0};
        this.follow = false;
        this.controlDown = false;

        this.growSquareTL = document.querySelector("#squareTL");
        this.growSquareTL.classList.toggle("visible");
        this.growSquareBL = document.querySelector("#squareBL");
        this.growSquareBL.classList.toggle("visible");
        this.growSquareTR = document.querySelector("#squareTR");
        this.growSquareTR.classList.toggle("visible");
        this.growSquareBR = document.querySelector("#squareBR");
        this.growSquareBR.classList.toggle("visible");

        this.square = document.querySelector("#move");
        this.area = document.querySelector("#area");
       
        this.square.addEventListener("mousedown", this.down);
        this.square.addEventListener("mouseup",this.up);
        this.area.addEventListener("mousemove", this.move);
        this.area.addEventListener("mouseup", this.areaup);
        this.group = document.querySelector("#group-move");
        this.groupSquare = document.querySelector("#image-inside");

        document.addEventListener("keydown", this.move);

        this.resizeBR = false;
        this.growSquareBR.addEventListener("mousedown", this.growBR);
        this.growSquareBR.addEventListener("mouseup", this.areaup);
        this.resizeTL = false;
        this.growSquareTL.addEventListener("mousedown", this.growTL);
        this.growSquareTL.addEventListener("mouseup", this.areaup);
        this.resizeTR = false;
        this.growSquareTR.addEventListener("mousedown", this.growTR);
        this.growSquareTR.addEventListener("mouseup", this.areaup);
        this.resizeBL = false;
        this.growSquareBL.addEventListener("mousedown", this.growBL);
        this.growSquareBL.addEventListener("mouseup", this.areaup);

    }

    areaup(event){
        if(this.controlDown){
            this.resizeBR = false;
        }
        if(this.resizeBL || this.resizeBR || this.resizeTL || this.resizeTR){
    
            this.growSquareBR.classList.toggle("visible");
            this.growSquareTL.classList.toggle("visible");
            this.growSquareBL.classList.toggle("visible");
            this.growSquareTR.classList.toggle("visible");
        }
        this.resizeBR = false;
        this.resizeTL = false;
        this.resizeTR = false;
        this.resizeBL = false;
    }
    up(event) {
        this.follow = false;
    }
    down(event) {
        this.follow = true;

        this.growSquareBR.classList.toggle("visible");
        this.growSquareTL.classList.toggle("visible");
        this.growSquareBL.classList.toggle("visible");
        this.growSquareTR.classList.toggle("visible");

        this.position.dx = event.x - this.position.tx;
        this.position.dy = event.y - this.position.ty;
    }
    move(event) {
        if(event.ctrlKey){
            this.controlDown = true;  
        }
        else{
            this.controlDown = false;
        }

        if (this.follow && !this.resizeBR && !this.resizeTL) {
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
        else if (this.resizeBR){
            
            let squareSizeX = event.x - this.position.tx;
            let squareSizeY = event.y - this.position.ty;
            
            if(squareSizeX>=0 && squareSizeY>=0){
                if(this.controlDown===false){
                    this.square.setAttribute("width",squareSizeX);
                    this.square.setAttribute("height",squareSizeY);

                    this.growSquareBR.setAttribute("x", squareSizeX -5);
                    this.growSquareBR.setAttribute("y", squareSizeY -5);

                    this.growSquareTL.setAttribute("x", 0);
                    this.growSquareTL.setAttribute("y", 0);
                    this.growSquareBL.setAttribute("x", 0 );
                    this.growSquareBL.setAttribute("y", squareSizeY - 5);
                    this.growSquareTR.setAttribute("x", squareSizeX - 5);
                    this.growSquareTR.setAttribute("y", 0);
                }
                else{
                    let maximun = Math.max(squareSizeX, squareSizeY);
                    let widthSquare = parseInt(this.square.getAttribute("width"));
                    let heightSquare = parseInt(this.square.getAttribute("height"));
                    
                    if(squareSizeX>=squareSizeY){

                        let ratio = squareSizeX/widthSquare;
                        this.square.setAttribute("width", maximun);
                        this.square.setAttribute("height", heightSquare*ratio);
                    }
                    else if(squareSizeX<=squareSizeY){
                        
                        let ratio = squareSizeY/heightSquare;
                        this.square.setAttribute("height", maximun);
                        this.square.setAttribute("width", widthSquare*ratio);
                    }

                    this.growSquareBR.setAttribute("x", widthSquare-5);
                    this.growSquareBR.setAttribute("y", heightSquare-5);
                    this.growSquareTL.setAttribute("x", 0);
                    this.growSquareTL.setAttribute("y", 0);
                    this.growSquareBL.setAttribute("x", 0 );
                    this.growSquareBL.setAttribute("y", heightSquare - 5);
                    this.growSquareTR.setAttribute("x", widthSquare - 5 );
                    this.growSquareTR.setAttribute("y", 0);
                   
                }
            }
        }

        else if(this.resizeTL){
            let widthSquare = parseInt(this.square.getAttribute("width"));
            let heightSquare = parseInt(this.square.getAttribute("height"));           
            let squareSizeX;
            let squareSizeY;

            squareSizeX = (this.position.tx + widthSquare) - event.x;
            squareSizeY = (this.position.ty + heightSquare) - event.y;

            if(squareSizeX >=0 && squareSizeY >= 0){
                if(this.controlDown===false){

                    this.position.tx = event.x;
                    this.position.ty = event.y;
                    this.group.setAttribute("transform","translate(" + event.x + "," + event.y + ")");    

                    this.square.setAttribute("width",squareSizeX);
                    this.square.setAttribute("height",squareSizeY);
                    
                    this.growSquareBR.setAttribute("x", squareSizeX -5);
                    this.growSquareBR.setAttribute("y", squareSizeY -5);
                    this.growSquareTL.setAttribute("x", 0);
                    this.growSquareTL.setAttribute("y", 0);
                    this.growSquareBL.setAttribute("x", 0 );
                    this.growSquareBL.setAttribute("y", squareSizeY - 5);
                    this.growSquareTR.setAttribute("x", squareSizeX - 5);
                    this.growSquareTR.setAttribute("y", 0);
                }
            }
        }

        else if(this.resizeTR){
            let heightSquare = parseInt(this.square.getAttribute("height"));           
            let squareSizeX;
            let squareSizeY;

            squareSizeX = event.x - this.position.tx;
            squareSizeY = (this.position.ty + heightSquare) - event.y;

            if(squareSizeX >=0 && squareSizeY >= 0){
                if(this.controlDown===false){

                    this.position.ty = event.y;
                    this.group.setAttribute("transform","translate(" + this.position.tx + "," + event.y + ")");//tx doesn't change here

                    this.square.setAttribute("width",squareSizeX);
                    this.square.setAttribute("height",squareSizeY);
                    
                    this.growSquareBR.setAttribute("x", squareSizeX -5);
                    this.growSquareBR.setAttribute("y", squareSizeY -5);
                    this.growSquareTL.setAttribute("x", 0);
                    this.growSquareTL.setAttribute("y", 0);
                    this.growSquareBL.setAttribute("x", 0 );
                    this.growSquareBL.setAttribute("y", squareSizeY - 5);
                    this.growSquareTR.setAttribute("x", squareSizeX - 5);
                    this.growSquareTR.setAttribute("y", 0);
                }
            }
        }
        else if(this.resizeBL){
            let widthSquare = parseInt(this.square.getAttribute("width"));
            let squareSizeX;
            let squareSizeY;

            squareSizeX = (this.position.tx + widthSquare) - event.x;
            squareSizeY = event.y - this.position.ty;

            if(squareSizeX >=0 && squareSizeY >= 0){
                if(this.controlDown===false){

                    this.position.tx = event.x;
                    this.group.setAttribute("transform","translate(" + event.x + "," + this.position.ty + ")");//ty doesn't change here

                    this.square.setAttribute("width",squareSizeX);
                    this.square.setAttribute("height",squareSizeY);
                    
                    this.growSquareBR.setAttribute("x", squareSizeX -5);
                    this.growSquareBR.setAttribute("y", squareSizeY -5);
                    this.growSquareTL.setAttribute("x", 0);
                    this.growSquareTL.setAttribute("y", 0);
                    this.growSquareBL.setAttribute("x", 0 );
                    this.growSquareBL.setAttribute("y", squareSizeY - 5);
                    this.growSquareTR.setAttribute("x", squareSizeX - 5);
                    this.growSquareTR.setAttribute("y", 0);
                }
            }
        }
    }
    growBR(event){
        this.resizeBR = true;
    }
    growTL(event){
        this.resizeTL = true;
    }
    growTR(event){
        this.resizeTR = true;
    }
    growBL(event){
        this.resizeBL = true;
    }  
}