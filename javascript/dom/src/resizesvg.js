
const SVG = 'http://www.w3.org/2000/svg';
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
        this.createCircle = this.createCircle.bind(this);
        this.createSquare = this.createSquare.bind(this);
     }

     start() {
        MessageBus.ext.subscribe("control/create/circle", this.createCircle);
        MessageBus.ext.subscribe("control/create/square", this.createSquare);


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
        this.aux = document.querySelector("#image-inside");
        /*switch (shape){
            case "quadrado":
                this.fig = document.createElementNS(SVG,"rect");
                this.fig.setAttribute("id", "square");
                this.fig.setAttribute("width", 100);
                this.fig.setAttribute("height", 100);
                this.fig.setAttribute("fill", "#4f8b2e");
                break;
            case "circulo":
                this.fig = document.createElementNS(SVG,"ellipse");
                this.fig.setAttribute("id","circle");
                this.fig.setAttribute("fill","#b81314");
                this.fig.setAttribute("rx","50");
                this.fig.setAttribute("ry", "50");
                this.fig.setAttribute("cx",50);
                this.fig.setAttribute("cy",50);
                break;
        }
        aux.appendChild(this.fig);*/
        this.area = document.querySelector("#area");
        this.area.addEventListener("mousemove", this.move);
        this.area.addEventListener("mouseup", this.areaup);
        this.group = document.querySelector("#group-move");
        this.groupSquare = document.querySelector("#image-inside");

        document.addEventListener("keydown", this.move);
        /*let button = "batata";
        while (true){
            button = document.querySelector(".button");
            if(button)
                button.remove();
            else 
                break;
        }*/

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

    createCircle() {
        this.fig = document.createElementNS(SVG, "ellipse");
        this.fig.setAttribute("id", "circle");
        this.fig.setAttribute("fill", "#b81314");
        this.fig.setAttribute("rx", "50");
        this.fig.setAttribute("ry", "50");
        this.fig.setAttribute("cx", 50);
        this.fig.setAttribute("cy", 50);
        this.aux.appendChild(this.fig);
        this.fig.addEventListener("mousedown", this.down);
        this.fig.addEventListener("mouseup", this.up);
    }
    createSquare(){
        this.fig = document.createElementNS(SVG, "rect");
        this.fig.setAttribute("id", "square");
        this.fig.setAttribute("width", 100);
        this.fig.setAttribute("height", 100);
        this.fig.setAttribute("fill", "#4f8b2e");
        console.log(this.aux);
        this.aux.appendChild(this.fig);
        this.fig.addEventListener("mousedown", this.down);
        this.fig.addEventListener("mouseup", this.up);
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
                    if (this.fig.getAttribute("id") === "square"){
                    this.fig.setAttribute("width",squareSizeX);
                    this.fig.setAttribute("height",squareSizeY);
                    } else{
                        this.fig.setAttribute("rx", squareSizeX);
                        this.fig.setAttribute("ry", squareSizeY);
                    }
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
                    let maximun;
                    let widthSquare;
                    let heightSquare;
                    if(this.fig.getAttribute("id") === "square"){
                        maximun = Math.max(squareSizeX, squareSizeY);
                        widthSquare = Number(this.fig.getAttribute("width"));
                        heightSquare = Number(this.fig.getAttribute("height"));
                    }else{
                        maximun = Math.max(squareSizeX, squareSizeY);
                        widthSquare = Number(this.fig.getAttribute("rx"));
                        heightSquare = Number(this.fig.getAttribute("ry"));
                    }

                    if(squareSizeX>=squareSizeY){

                        let ratio = squareSizeX/widthSquare;
                        if (this.fig.getAttribute("id") === "square"){
                        this.fig.setAttribute("width", maximun);
                        this.fig.setAttribute("height", heightSquare *ratio);
                        }else{
                            this.fig.setAttribute("rx", maximun);
                            this.fig.setAttribute("ry", heightSquare * ratio);
                        }
                    }
                    else if(squareSizeX<=squareSizeY){
                        
                        let ratio = squareSizeY/heightSquare;
                        if (this.fig.getAttribute("id") === "square") {
                            this.fig.setAttribute("height", maximun);
                            this.fig.setAttribute("width", widthSquare * ratio);
                        } else {
                            this.fig.setAttribute("ry", maximun);
                            this.fig.setAttribute("rx", widthSquare * ratio);
                        }
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
            let widthSquare = parseInt(this.fig.getAttribute("width"));
            let heightSquare = parseInt(this.fig.getAttribute("height"));           
            let squareSizeX;
            let squareSizeY;

            squareSizeX = (this.position.tx + widthSquare) - event.x;
            squareSizeY = (this.position.ty + heightSquare) - event.y;


            if(squareSizeX >=0 && squareSizeY >= 0){
                if(this.controlDown===false){
                    this.position.tx = event.x;
                    this.position.ty = event.y;
                    this.group.setAttribute("transform","translate(" + event.x + "," + event.y + ")");    

                    this.fig.setAttribute("width",squareSizeX);
                    this.fig.setAttribute("height",squareSizeY);
                    
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
            let heightSquare = parseInt(this.fig.getAttribute("height"));           
            let squareSizeX;
            let squareSizeY;

            squareSizeX = event.x - this.position.tx;
            squareSizeY = (this.position.ty + heightSquare) - event.y;

            if(squareSizeX >=0 && squareSizeY >= 0){
                if(this.controlDown===false){

                    this.position.ty = event.y;
                    this.group.setAttribute("transform","translate(" + this.position.tx + "," + event.y + ")");//tx doesn't change here

                    this.fig.setAttribute("width",squareSizeX);
                    this.fig.setAttribute("height",squareSizeY);
                    
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
            let widthSquare = parseInt(this.fig.getAttribute("width"));
            let squareSizeX;
            let squareSizeY;

            squareSizeX = (this.position.tx + widthSquare) - event.x;
            squareSizeY = event.y - this.position.ty;

            if(squareSizeX >=0 && squareSizeY >= 0){
                if(this.controlDown===false){

                    this.position.tx = event.x;
                    this.group.setAttribute("transform","translate(" + event.x + "," + this.position.ty + ")");//ty doesn't change here

                    this.fig.setAttribute("width",squareSizeX);
                    this.fig.setAttribute("height",squareSizeY);
                    
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

(function() {
   Movel.instance = new Movel();
})();
   