import {Sprite} from "../base/Sprite.js";
import {DataStore} from "../base/DataStore.js";

export class BackgroundBk extends Sprite {
    constructor() {
        const image = Sprite.getImage('backgroundBk');
        super(image,
            0, 0,
            image.width, image.height,
            0, 0,
            DataStore.getInstance().canvas.width, DataStore.getInstance().canvas.height);
        this.delta = 0;
    }

    draw(){
        super.draw(this.img,
            0, 0,
            this.img.width, this.img.height,
            0, -630 + this.delta,
            this.width, this.height)
    }

    moveDown(){
        if(this.delta<650)
            this.delta += 1.2;
    }

}