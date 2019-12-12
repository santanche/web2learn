
const SVG = 'http://www.w3.org/2000/svg';
class Movel{
    constructor(shape){
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
        this._createImage = this._createImage.bind(this);
        this.start = this.start.bind(this);
        if(shape !== undefined){
            this.position = {
                "dx": 0,
                "dy": 0,
                "tx": 0,
                "ty": 0
            };
            this.follow = false;
            this.controlDown = false;
            this.group = document.createElementNS(SVG,"g");
            this.group.setAttribute("id","group-move");
            this.group.setAttribute("transform","translate(8,8)");
            Movel.area.appendChild(this.group);
            this.aux = document.createElementNS(SVG, "g");
            this.aux.setAttribute("id", "image-inside");
            this.aux.setAttribute("transform", "translate(5,5)");
            this.group.appendChild(this.aux);
            this.growSquareTL = document.createElementNS(SVG,"rect"); //querySelector("#squareTL");
            this.growSquareTL.setAttribute("class", "pointerDiffR visible");
            this.growSquareTL.classList.toggle("visible");
            this.growSquareTL.setAttribute("id","squareTL");
            this.growSquareTL.setAttribute("x","1");
            this.growSquareTL.setAttribute("y", "1");
            this.growSquareTL.setAttribute("width", "8");
            this.growSquareTL.setAttribute("height", "8");
            this.group.appendChild(this.growSquareTL);
            this.growSquareBL = document.createElementNS(SVG, "rect"); //querySelector("#squareTL");
            this.growSquareBL.setAttribute("class", "pointerDiffL visible");
            this.growSquareBL.classList.toggle("visible");
            this.growSquareBL.setAttribute("id", "squareBL");
            this.growSquareBL.setAttribute("x", "1");
            this.growSquareBL.setAttribute("y", "100");
            this.growSquareBL.setAttribute("width", "8");
            this.growSquareBL.setAttribute("height", "8");
            this.group.appendChild(this.growSquareBL);
            this.growSquareTR = document.createElementNS(SVG, "rect"); //querySelector("#squareTL");
            this.growSquareTR.setAttribute("class", "pointerDiffL visible");
            this.growSquareTR.classList.toggle("visible");
            this.growSquareTR.setAttribute("id", "squareTR");
            this.growSquareTR.setAttribute("x", "100");
            this.growSquareTR.setAttribute("y", "1");
            this.growSquareTR.setAttribute("width", "8");
            this.growSquareTR.setAttribute("height", "8");
            this.group.appendChild(this.growSquareTR);
            this.growSquareBR = document.createElementNS(SVG, "rect"); //querySelector("#squareTL");
            this.growSquareBR.setAttribute("class", "pointerDiffR visible");
            this.growSquareBR.classList.toggle("visible");
            this.growSquareBR.setAttribute("id", "squareBR");
            this.growSquareBR.setAttribute("x", "100");
            this.growSquareBR.setAttribute("y", "100");
            this.growSquareBR.setAttribute("width", "8");
            this.growSquareBR.setAttribute("height", "8");
            this.group.appendChild(this.growSquareBR);
            Movel.area.addEventListener("mousemove", this._move);
            Movel.area.addEventListener("mouseup", this._areaup);
            document.addEventListener("keydown", this._move);
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
            if(shape === "circle"){
                this.fig = document.createElementNS(SVG, "ellipse");
                this.fig.setAttribute("id", "circle");
                let color = this._chooseColor();
                this.fig.setAttribute("fill", color);
                this.fig.setAttribute("rx", "50");
                this.fig.setAttribute("ry", "50");
                this.fig.setAttribute("cx", 50);
                this.fig.setAttribute("cy", 50);
                this.aux.appendChild(this.fig);
                this.fig.addEventListener("mousedown", this._down);
                this.fig.addEventListener("mouseup", this._up);
            }else if(shape === "square"){
                this.fig = document.createElementNS(SVG, "rect");
                this.fig.setAttribute("id", "square");
                this.fig.setAttribute("width", 100);
                this.fig.setAttribute("height", 100);
                let color = this._chooseColor();
                this.fig.setAttribute("fill", color);
                this.aux.appendChild(this.fig);
                this.fig.addEventListener("mousedown", this._down);
                this.fig.addEventListener("mouseup", this._up);
            } else if (shape === "image") {
                this.fig = document.createElementNS(SVG, "image");
                this.fig.setAttribute("id", "image");
                this.fig.setAttribute("width", 100);
                this.fig.setAttribute("height", 100);
                this.fig.setAttribute("href","images/procurar.svg");
                this.fig.setAttribute("preserveAspectRatio", "none");
                console.log(this.fig);
                this.aux.appendChild(this.fig);
                this.fig.addEventListener("mousedown", this._down);
                this.fig.addEventListener("mouseup", this._up);
                this.fig.setAttribute("fill","#ffffff");
            }
            this.fig.setAttribute("opacity",0.8);
        }

     }

     start() {
        MessageBus.ext.subscribe("control/create/circle", this._createCircle);
        MessageBus.ext.subscribe("control/create/square", this._createSquare);
         MessageBus.ext.subscribe("control/create/image", this._createImage);
        Movel.area.setAttribute("id", "area");
        Movel.area.setAttribute("width", "100%");
        Movel.area.setAttribute("height", "100%");
        let div = document.querySelector(".main");
        div.appendChild(Movel.area);
    }

    _createCircle() {
        this.circle = new Movel("circle");
    }
    _createSquare(){
        this.square = new Movel("square");
    }
    _createImage() {
        this.square = new Movel("image");
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

        let offsets = document.getElementById('dccs').getBoundingClientRect();

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

            let squareSizeX = parseInt(event.x) - this.position.tx;
            let squareSizeY = parseInt(event.y) - this.position.ty - offsets.bottom; //neww
            
            if(squareSizeX>=0 && squareSizeY>=0){
                if(this.controlDown===false){
                    this.fig.setAttribute("preserveAspectRatio", "none");}
                if(this.controlDown===true){
                    this.fig.setAttribute("preserveAspectRatio", "xMidYMid meet");
                }
                if (this.fig.getAttribute("id") === "square" || this.fig.getAttribute("id") === "image"){
                    this.fig.setAttribute("width",squareSizeX);
                    this.fig.setAttribute("height",squareSizeY);
                }
                else{
                    let rx = parseInt(this.fig.getAttribute("rx"));
                    let ry = parseInt(this.fig.getAttribute("ry"));
                    let cx = parseInt(this.fig.getAttribute("cx"));
                    let cy = parseInt(this.fig.getAttribute("cy"));

                    let flagx = rx<=squareSizeX/2 ? 1 : -1;
                    let flagy = ry<=squareSizeY/2 ? 1 : -1;

                    this.fig.setAttribute("rx", squareSizeX/2);
                    this.fig.setAttribute("ry", squareSizeY/2);
                    this.fig.setAttribute("cx", parseInt(cx) + flagx*Math.abs(rx - squareSizeX/2));
                    this.fig.setAttribute("cy", parseInt(cy) + flagy*Math.abs(ry - squareSizeY/2));
                }
                    this.growSquareBR.setAttribute("x", squareSizeX);
                    this.growSquareBR.setAttribute("y", squareSizeY);
                    this.growSquareTL.setAttribute("x", 1);
                    this.growSquareTL.setAttribute("y", 1);
                    this.growSquareBL.setAttribute("x", 1 );
                    this.growSquareBL.setAttribute("y", squareSizeY);
                    this.growSquareTR.setAttribute("x", squareSizeX);
                    this.growSquareTR.setAttribute("y", 1);
            }
        }

        else if(this.resizeTL){
            if (this.fig.getAttribute("id") === "square" || this.fig.getAttribute("id") === "image"){
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
                    if (this.fig.getAttribute("id") === "square" || this.fig.getAttribute("id") === "image"){
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
            if (this.fig.getAttribute("id") === "square" || this.fig.getAttribute("id") === "image") {
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
                    if (this.fig.getAttribute("id") === "square" || this.fig.getAttribute("id") === "image"){
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
            if (this.fig.getAttribute("id") === "square" || this.fig.getAttribute("id") === "image") {
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
                    if (this.fig.getAttribute("id") === "square" || this.fig.getAttribute("id") === "image"){
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
    _chooseColor(){
        let hex = [0,1,2,3,4,5,6,7,8,9,"a","b","c","d","e","f"];
        let color = "#";
        for(let i = 0;i < 6; i++){
            let random = Math.random() * 16;
            random = Math.floor(random);
            color += hex[random];
        }
        return color;
    }  
}

(function() {
    Movel.instance = new Movel();
    Movel.area = document.createElementNS(SVG, "svg");
})();
   