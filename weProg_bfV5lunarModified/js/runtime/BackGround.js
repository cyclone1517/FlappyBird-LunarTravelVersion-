import {Sprite} from "../base/Sprite.js";
import {DataStore} from "../base/DataStore.js";

export class BackGround extends Sprite {
    constructor() {
        const image = Sprite.getImage('background');
        super(image,
            0, 1370,
            image.width, image.height,
            0, 0,
            DataStore.getInstance().canvas.width, 1400);
        this.y = 1370;
    }

    draw(){
        super.draw(this.img,
            0, this.y,
            this.img.width, this.y + 700,
            0, 0,
            DataStore.getInstance().canvas.width, 1400)
    }

    moveUp(){
        if(this.y > 0)
            this.y -= 0.69;
        //console.log(this.y);
    }

    moveUp2(){
        if(this.y > 0)
            this.y -= 0.89;
        //console.log(this.y);
    }

    moveDown(){
        if(this.y > 0)
            this.y += 0.1;
    }

}