import {Sprite} from "../base/Sprite.js";
import {DataStore} from "../base/DataStore.js";
import {Director} from "../Director.js";

export class Land extends Sprite{

    constructor() {
        const image = Sprite.getImage('land');
        super(image, 0, 0, image.width, image.height,
            0, DataStore.getInstance().canvas.height - image.height,
            image.width, image.height);

        this.landX = 0;
        this.landSpeed = Director.getIInstance().moveSpeed;
        this.delta = 0;
    }

    draw(){
        this.landX = this.landX + this.landSpeed;
        //console.log((this.landX + DataStore.getInstance().canvas.width) + " " +this.img.width );
        if(this.landX + DataStore.getInstance().canvas.width > this.img.width){
            this.landX = 0;
        }
        super.draw(this.img,
            this.srcX, this.srcY,
            this.srcW, this.srcH,
            -this.landX, this.y + this.delta,
            this.width, this.height + this.delta)
    }

    moveDown(){
        if(this.delta<120)
            this.delta += 0.3;
    }
}