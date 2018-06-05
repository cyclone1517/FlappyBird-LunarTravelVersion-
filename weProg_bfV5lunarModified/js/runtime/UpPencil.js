import {Pencil} from "./Pencil.js";
import {Sprite} from "../base/Sprite.js";


export class UpPencil extends Pencil{
    constructor(top){
        const image = Sprite.getImage('pencilUp');
        super(image, top);
        this.deltaY = 0;
        this.pdirec = Math.round(Math.random());
        //this.vertiSpd = 0;
    }

    draw(){
        this.y = this.top - this.height + this.deltaY;
        super.draw();
    }

    speedUpVerti(vertiSpd){
        this.vertiSpd = vertiSpd;
        //console.log(this.vertiSpd);
    }

    move(){
        if(this.pdirec == 0){
            this.moveUp();
        }
        else this.moveDown();
    }

    moveDown(){
        this.deltaY +=this.vertiSpd;
    }
    moveUp(){
        this.deltaY -=this.vertiSpd;
    }


}