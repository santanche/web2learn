let square;
function Start() {
   square = new Movel();
}
class Movel{
    constructor(){
        this.down = this.down.bind(this);
        this.move = this.move.bind(this);
        this.up = this.up.bind(this);
        this.grow = this.grow.bind(this);
        this.notGrow = this.notGrow.bind(this);
        this.areaup = this.areaup.bind(this);



        this.growTL = this.growTL.bind(this);
        this.notGrowTL = this.notGrowTL.bind(this);


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

        this.square = document.querySelector("#move");
        this.area = document.querySelector("#area");
        
        // this.growSquareTL.addEventListener("mousedown", this.grow);
        // this.growSquareTL.addEventListener("mouseup", this.notGrow);
        this.growSquareBL.addEventListener("mousedown", this.grow);
        this.growSquareBL.addEventListener("mouseup", this.notGrow);
        this.growSquareTR.addEventListener("mousedown", this.grow);
        this.growSquareTR.addEventListener("mouseup", this.notGrow);

        this.growSquareBR.addEventListener("mousedown", this.grow);
        this.growSquareBR.addEventListener("mouseup", this.notGrow);

        // this.growSquareTL.addEventListener("mousedown", this.grow);
        // this.growSquareTL.addEventListener("mouseup", this.notGrow);


        this.square.addEventListener("mousedown", this.down);
        this.square.addEventListener("mouseup",this.up);
        this.area.addEventListener("mousemove", this.move);
        this.group = document.querySelector("#group-move");
        this.area.addEventListener("mouseup", this.areaup);

        document.addEventListener("keydown", this.move);

        this.resizeTL = false;
        this.growSquareTL.addEventListener("mousedown", this.growTL);
        this.growSquareTL.addEventListener("mouseup", this.notGrowTL);

        this.groupSquare = document.querySelector("#image-inside");

    }

    areaup(event){
        if(this.controlDown){
            this.resize = false;
        }

        this.resizeTL = false;                                         //ver
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

        console.log(" down tx e ty: " + this.position.tx + " " + this.position.ty + " event: " + event.x + " " + event.y);

    }
    move(event) {
        if(event.ctrlKey){
            this.controlDown = true;
            
        }
        else{
            this.square.setAttribute("preserveAspectRatio", "none");              //see
            this.controlDown = false;
        }

        if (this.follow && !this.resize && !this.resizeTL) {
            if(event.x < 0){
                event.x = 0;
            }
            if(event.y < 0){
                event.y = 0;
            }
            this.position.tx = event.x - this.position.dx;
            this.position.ty = event.y - this.position.dy;
            // this.group.setAttribute("transform","translate(" + (this.position.tx) + "," + (this.position.ty) + ")");

            //this.groupSquare.setAttribute("transform","translate(" + (this.position.tx) + "," + (this.position.ty) + ")");
            this.group.setAttribute("transform","translate(" + (this.position.tx) + "," + (this.position.ty) + ")");


            console.log("tx e ty: " + this.position.tx + " " + this.position.ty + " event: " + event.x + " " + event.y);
            
        }
        else if (this.resize){
            
            console.log(event.x);
            
            //console.log("ai nao");
            
            let squareSizeX = event.x - this.position.tx;
            let squareSizeY = event.y - this.position.ty;

            if(event.x > this.position.tx){
                console.log("maiorrrr");
                
            }
            else{
                console.log("menorrrrrrrrrrrrrrrrrrrrrrrrrrr");
                
            }

            // console.log(squareSizeX + " " + squareSizeY);
            console.log("Resize BR: event x = " + event.x + " event y = " + event.y + "\n tx " + this.position.tx + " ty " + this.position.ty);
            
            
            
            if(squareSizeX - 5 >=0 && squareSizeY-5 >= 0){
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
                    let widthSquare = Number(this.square.getAttribute("width"));
                    let heightSquare = Number(this.square.getAttribute("height"));

                    

                    if(squareSizeX>=squareSizeY){

                        let ratio = squareSizeX/widthSquare;
                        this.square.setAttribute("width", maximun);
                        this.square.setAttribute("height", heightSquare*ratio);
                    }
                    else{
                        
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






        else if (this.resizeTL){
            let widthSquare = parseInt(this.square.getAttribute("width"));
            let heightSquare = parseInt(this.square.getAttribute("height"));

            console.log(" resize tx e ty: " + this.position.tx + " " + this.position.ty + " event: " + event.x + " " + event.y);
            
            let squareSizeX;
            let squareSizeY;

            let bigger = -1;

            //eu acho que o evento vai ser sempre < que o tx

            // if(parseInt(event.x) <= parseInt(this.position.tx)){
            //     squareSizeX = widthSquare + this.position.tx - event.x;
            //     console.log("x menor");
            //     bigger = -1;
                
            // }
            // else{
            //     squareSizeX = widthSquare - (event.x - this.position.tx); 
            //     console.log("x maior");
            //     bigger = 1;
                
            // }
            // if(parseInt(event.y) <= parseInt(this.position.ty)){
            //     squareSizeY = heightSquare + this.position.ty - event.y;
            //     console.log("y menor");
                
            // }
            // else{
            //     squareSizeY = heightSquare - (event.y - this.position.ty);
            //     console.log("y maior");
                 
            // }

            squareSizeX = (this.position.tx + widthSquare) - event.x;
            squareSizeY = (this.position.ty + heightSquare) - event.y;

            if(squareSizeX >=0 && squareSizeY >= 0){                   //tirei o -5
                if(this.controlDown===false){

                    // this.position.tx = this.position.tx + bigger*Math.abs(event.x - this.position.tx);
                    // this.position.ty = this.position.ty + bigger*Math.abs(event.y - this.position.ty);

                    // if(this.position.tx<0) this.position.tx = 0;
                    // if(this.position.ty<0) this.position.ty = 0;
                    
                    // this.group.setAttribute("transform","translate(" + this.position.tx + "," + this.position.ty + ")");    
                    
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
            else{
                console.log("ta trollano\n\n");
                
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



    growTL(event){
        this.resizeTL = true;
    }
    notGrowTL(event){
        this.resizeTL = false;
        this.growSquareBR.classList.toggle("visible");
        this.growSquareTL.classList.toggle("visible");
        this.growSquareBL.classList.toggle("visible");
        this.growSquareTR.classList.toggle("visible");
    }
    
}
