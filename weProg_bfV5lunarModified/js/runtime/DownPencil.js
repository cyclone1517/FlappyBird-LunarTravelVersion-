import {Pencil} from "./Pencil.js";
import {Sprite} from "../base/Sprite.js";
import {DataStore} from "../base/DataStore.js";

export class DownPencil extends Pencil{
    constructor(top){
        const image = Sprite.getImage('pencilDown');
        super(image, top);
        this.deltaY = 0;
        this.pdirec = Math.round(Math.random());
    }

    draw(){
        let gap = DataStore.getInstance().canvas.height / 4 + 15;
        this.y = this.top + gap + this.deltaY;
        super.draw();
    }

    speedUpVerti(vertiSpd){
        this.vertiSpd = vertiSpd;
    }

    move(){
        if(this.pdirec == 0){
            this.moveUp();
        }
        else this.moveDown();
    }

    moveDown(){
        if(this.deltaY<20)
            this.deltaY +=this.vertiSpd;
    }
    moveUp(){
        if(this.deltaY<20)
            this.deltaY -=this.vertiSpd;
    }
}