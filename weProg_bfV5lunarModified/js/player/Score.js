//积分器类
import {DataStore} from "../base/DataStore.js";

export class Score{
    constructor(){
        this.ctx = DataStore.getInstance().ctx;
        this.scoreNumber = 0;
        //单次加分flag
        this.isScore = true;
    }

    draw(){
        this.ctx.font = '26px Arial';
        this.ctx.fillStyle = '#fff';
        this.ctx.fillText(
            this.scoreNumber,
            DataStore.getInstance().canvas.width / 2,
            DataStore.getInstance().canvas.height / 18,
            1000
        )
    }
}