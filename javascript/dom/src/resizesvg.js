const SVG = 'http://www.w3.org/2000/svg';
class Movel{
    constructor(shape){
        this.down = this.down.bind(this);
        this.move = this.move.bind(this);
        this.up = this.up.bind(this);
        this.grow = this.grow.bind(this);
        this.notGrow = this.notGrow.bind(this);
        this.areaup = this.areaup.bind(this);

        this.position = {   "dx": 0,
                            "dy": 0,
                            "tx" :0,
                            "ty" :0};
        this.follow = false;
        this.resize = false;

        this.controlDown = false;

        this.growSquareTL = document.querySelector("#squareTL");
        this.growSquareTL.classList.toggle("visible");
        this.growSquareBL = document.querySelector("#squareBL");
        this.growSquareBL.classList.toggle("visible");
        this.growSquareTR = document.querySelector("#squareTR");
        this.growSquareTR.classList.toggle("visible");
        this.growSquareBR = document.querySelector("#squareBR");
        this.growSquareBR.classList.toggle("visible");
        let aux = document.querySelector("#image-inside");
        switch (shape){
            case "quadrado":
                this.fig = document.createElementNS(SVG,"rect");
                this.fig.setAttribute("id", "square");
                this.fig.setAttribute("width", 100);
                this.fig.setAttribute("height", 100);
                this.fig.setAttribute("fill", "#4f8b2e");
                break;
            case "circulo":
                this.fig = document.createElementNS(SVG,"circle");
                this.fig.setAttribute("id","circle");
                this.fig.setAttribute("fill","#b81314");
                this.fig.setAttribute("r","50");
                this.fig.setAttribute("cx",50);
                this.fig.setAttribute("cy",50);
                break;
        }
        aux.appendChild(this.fig);
        this.area = document.querySelector("#area");
        
        this.growSquareTL.addEventListener("mousedown", this.grow);
        this.growSquareTL.addEventListener("mouseup", this.notGrow);
        this.growSquareBL.addEventListener("mousedown", this.grow);
        this.growSquareBL.addEventListener("mouseup", this.notGrow);
        this.growSquareTR.addEventListener("mousedown", this.grow);
        this.growSquareTR.addEventListener("mouseup", this.notGrow);

        this.growSquareBR.addEventListener("mousedown", this.grow);
        this.growSquareBR.addEventListener("mouseup", this.notGrow);

        this.fig.addEventListener("mousedown", this.down);
        this.fig.addEventListener("mouseup",this.up);
        this.area.addEventListener("mousemove", this.move);
        this.group = document.querySelector("#group-move");
        this.area.addEventListener("mouseup", this.areaup);

        document.addEventListener("keydown", this.move);
        let button = "batata";
        while (true){
            button = document.querySelector(".button");
            if(button)
                button.remove();
            else 
                break;
        }
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
    }
    move(event) {
        if(event.ctrlKey){
            this.controlDown = true;
            
        }
        else{
            this.fig.setAttribute("preserveAspectRatio", "none");
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
                else{
                    let maximun = Math.max(squareSizeX, squareSizeY);
                    let widthSquare = Number(this.fig.getAttribute("width"));
                    let heightSquare = Number(this.fig.getAttribute("height"));

                    if(squareSizeX>=squareSizeY){

                        let ratio = squareSizeX/widthSquare;
                        this.fig.setAttribute("width", maximun);
                        this.fig.setAttribute("height", heightSquare*ratio);
                    }
                    else{
                        
                        let ratio = squareSizeY/heightSquare;
                        this.fig.setAttribute("height", maximun);
                        this.fig.setAttribute("width", widthSquare*ratio);
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
