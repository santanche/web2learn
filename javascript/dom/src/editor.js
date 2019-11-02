
const SVG = 'http://www.w3.org/2000/svg';
class Movel{
    constructor(){
        this._down = this._down.bind(this);
        this._move = this._move.bind(this);
        this._up = this._up.bind(this);
        this._areaup = this._areaup.bind(this);
        this._growBR = this._growBR.bind(this);
        this._growTL = this._growTL.bind(this);
        this._growTR = this._growTR.bind(this);
        this._growBL = this._growBL.bind(this);
        this._createCircle = this._createCircle.bind(this);
        this._createSquare = this._createSquare.bind(this);
        this.start = this.start.bind(this);
     }

     start() {
        MessageBus.ext.subscribe("control/create/circle", this._createCircle);
        MessageBus.ext.subscribe("control/create/square", this._createSquare);


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
        this.area.addEventListener("mousemove", this._move);
        this.area.addEventListener("mouseup", this._areaup);
        this.group = document.querySelector("#group-move");
        this.groupSquare = document.querySelector("#image-inside");

        document.addEventListener("keydown", this._move);
        /*let button = "batata";
        while (true){
            button = document.querySelector(".button");
            if(button)
                button.remove();
            else 
                break;
        }*/

        this.resizeBR = false;
        this.growSquareBR.addEventListener("mousedown", this._growBR);
        this.growSquareBR.addEventListener("mouseup", this._areaup);
        this.resizeTL = false;
        this.growSquareTL.addEventListener("mousedown", this._growTL);
        this.growSquareTL.addEventListener("mouseup", this._areaup);
        this.resizeTR = false;
        this.growSquareTR.addEventListener("mousedown", this._growTR);
        this.growSquareTR.addEventListener("mouseup", this._areaup);
        this.resizeBL = false;
        this.growSquareBL.addEventListener("mousedown", this._growBL);
        this.growSquareBL.addEventListener("mouseup", this._areaup);

    }

    _createCircle() {
        this.fig = document.createElementNS(SVG, "ellipse");
        this.fig.setAttribute("id", "circle");
        this.fig.setAttribute("fill", "#b81314");
        this.fig.setAttribute("rx", "50");
        this.fig.setAttribute("ry", "50");
        this.fig.setAttribute("cx", 50);
        this.fig.setAttribute("cy", 50);
        this.aux.appendChild(this.fig);
        this.fig.addEventListener("mousedown", this._down);
        this.fig.addEventListener("mouseup", this._up);
    }
    _createSquare(){
        this.fig = document.createElementNS(SVG, "rect");
        this.fig.setAttribute("id", "square");
        this.fig.setAttribute("width", 100);
        this.fig.setAttribute("height", 100);
        this.fig.setAttribute("fill", "#4f8b2e");
        console.log(this.aux);
        this.aux.appendChild(this.fig);
        this.fig.addEventListener("mousedown", this._down);
        this.fig.addEventListener("mouseup", this._up);
    }

    _areaup(event){
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
    _up(event) {
        this.follow = false;
    }
    _down(event) {
        this.follow = true;

        this.growSquareBR.classList.toggle("visible");
        this.growSquareTL.classList.toggle("visible");
        this.growSquareBL.classList.toggle("visible");
        this.growSquareTR.classList.toggle("visible");

        this.position.dx = event.x - this.position.tx;
        this.position.dy = event.y - this.position.ty;
    }
    _move(event) {
        let widthSquare;
        let heightSquare;
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
            if(this.fig.getAttribute("id") === "square"){
                widthSquare = parseInt(this.fig.getAttribute("width"));
                heightSquare = parseInt(this.fig.getAttribute("height"));
            }else{
                widthSquare = parseInt(this.fig.getAttribute("rx"));
                heightSquare = parseInt(this.fig.getAttribute("ry"));
            }           
            let squareSizeX;
            let squareSizeY;

            squareSizeX = (this.position.tx + widthSquare) - event.x;
            squareSizeY = (this.position.ty + heightSquare) - event.y;


            if(squareSizeX >=0 && squareSizeY >= 0){
                if(this.controlDown===false){
                    this.position.tx = event.x;
                    this.position.ty = event.y;
                    this.group.setAttribute("transform","translate(" + event.x + "," + event.y + ")");    
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
            }
        }

        else if(this.resizeTR){
            if (this.fig.getAttribute("id") === "square") {
                heightSquare = parseInt(this.fig.getAttribute("height")); 
            }else{
                heightSquare = parseInt(this.fig.getAttribute("ry"));
            }          
            let squareSizeX;
            let squareSizeY;

            squareSizeX = event.x - this.position.tx;
            squareSizeY = (this.position.ty + heightSquare) - event.y;

            if(squareSizeX >=0 && squareSizeY >= 0){
                if(this.controlDown===false){

                    this.position.ty = event.y;
                    this.group.setAttribute("transform","translate(" + this.position.tx + "," + event.y + ")");//tx doesn't change here
                    if(this.fig.getAttribute("id") === "square"){
                    this.fig.setAttribute("width",squareSizeX);
                    this.fig.setAttribute("height",squareSizeY);
                    }else{
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
            }
        }
        else if(this.resizeBL){
            if (this.fig.getAttribute("id") === "square") {
                widthSquare = parseInt(this.fig.getAttribute("width"));
            }else{
                widthSquare = parseInt(this.fig.getAttribute("rx"));
            }
            let squareSizeX;
            let squareSizeY;

            squareSizeX = (this.position.tx + widthSquare) - event.x;
            squareSizeY = event.y - this.position.ty;

            if(squareSizeX >=0 && squareSizeY >= 0){
                if(this.controlDown===false){

                    this.position.tx = event.x;
                    this.group.setAttribute("transform","translate(" + event.x + "," + this.position.ty + ")");//ty doesn't change here
                    if(this.fig.getAttribute("id") === "square"){
                        this.fig.setAttribute("width",squareSizeX);
                        this.fig.setAttribute("height",squareSizeY);
                    }else{
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
            }
        }
    }
    _growBR(event){
        this.resizeBR = true;
    }
    _growTL(event){
        this.resizeTL = true;
    }
    _growTR(event){
        this.resizeTR = true;
    }
    _growBL(event){
        this.resizeBL = true;
    }  
}

(function() {
   Movel.instance = new Movel();
})();
   