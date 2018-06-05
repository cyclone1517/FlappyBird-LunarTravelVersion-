import {Sprite} from "../base/Sprite.js";
import {DataStore} from "../base/DataStore.js";

export class Birds extends Sprite{
    constructor(){
        const image = Sprite.getImage('birds');
        super(image, 0, 0, image.width, image.height,
            0, 0, image.width, image.height);

        //小鸟的三种状态用一个数组来存储
        this.clippingX = [9, 9+34+18, 9+34+18+34+18];
        this.clippingY = [10, 10, 10];
        this.clippingWidth = [34, 34, 34];
        this.clippingHeight = [24, 24, 24];
        const birdX = DataStore.getInstance().canvas.width / 4;
        this.birdsX = [birdX, birdX, birdX];
        this.birdY = DataStore.getInstance().canvas.height / 2;
        this.birdsY = [this.birdY, this.birdY, this.birdY];
        const birdWidth = 34;
        this.birdsWidth = [birdWidth, birdWidth, birdWidth];
        const birdHeight = 24;
        this.birdsHeight = [birdHeight, birdHeight, birdHeight];
        this.y = [this.birdY, this.birdY, this.birdY];
        this.index = 0;
        this.count = 0;
        this.time = 0;
        this.g = 0.4;
        this.offsetUp = 29;
    }

    draw() {
        const speed = 0.2;
        this.count = this.count + speed;
        if(this.index >= 2){
            this.count = 0;
        }
        //减速器的作用
        this.index = Math.floor(this.count);

        const offsetY = (this.g * this.time * (this.time - this.offsetUp)) / 2;
        for(let i=0; i<=2; i++){
            this.birdsY[i] = this.y[i] + offsetY;
        }
        this.time++;

        super.draw(
            this.img,
            this.clippingX[this.index], this.clippingY[this.index],
            this.clippingWidth[this.index], this.clippingHeight[this.index],
            this.birdsX[this.index], this.birdsY[this.index],
            this.birdsWidth[this.index], this.birdsHeight[this.index]
        )
    }

    addGrativity(){
        if(this.g < 0.9) this.g += 0.00011;
        if(this.offsetUp < 37) this.offsetUp += 0.005;
    }
}