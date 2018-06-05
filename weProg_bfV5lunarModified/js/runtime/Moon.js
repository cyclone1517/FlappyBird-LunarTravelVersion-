import {Sprite} from "../base/Sprite.js";
import {DataStore} from "../base/DataStore.js";

export class Moon extends Sprite{

    constructor() {
        const image = Sprite.getImage('moon');
        super(image, 0, 0, image.width, image.height,
            0, DataStore.getInstance().canvas.height - image.height,
            image.width, image.height);
        this.deltaX = 0;
        this.deltaY = 0;
    }

    draw(){
        super.draw(this.img,
            0, 0,
            this.img.width, this.img.height,
            15 -this.deltaX, 640 - this.deltaY,
            this.width+110, this.height+40)
    }

    moveUp(){
        if(this.deltaX<95)
            this.deltaX += 0.076;
        if(this.deltaY<172)
            this.deltaY += 0.15;
    }
}