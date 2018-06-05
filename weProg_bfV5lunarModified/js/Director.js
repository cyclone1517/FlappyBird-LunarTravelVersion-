//导演类 控制游戏逻辑
import {DataStore} from "./base/DataStore.js";
import {UpPencil} from "./runtime/UpPencil.js";
import {DownPencil} from "./runtime/DownPencil.js";

export class Director{
    static getIInstance(){
        if(!Director.instance){
            Director.instance = new Director();
        }
        return Director.instance
    }

    constructor(){
        this.DataStore = DataStore.getInstance();
        this.moveSpeed = 2.0;
        this.vertiSpd = -0.1;
    }

    createPencil(){
        const minTop = DataStore.getInstance().canvas.height / 6;
        const maxTop = DataStore.getInstance().canvas.height / 2;
        const top = minTop + Math.random() * (maxTop - minTop);
        this.DataStore.get('pencils').push(new UpPencil(top));
        this.DataStore.get('pencils').push(new DownPencil(top));
    }

    birdsEvent() {
        for(let i=0; i<=2; i++){
            this.DataStore.get('birds').y[i] =
                this.DataStore.get('birds').birdsY[i];
        }
        this.DataStore.get('birds').time = 0;
    }

    // static isStrike(bird, pencil){
    //     let s = false;
    //     if(bird.top>pencil.bottom && bird.bottom<pencil.top ||
    //             bird.right<pencil.left || bird.left>pencil.right){
    //         s = true;
    //     }
    //     //console.log(pencil.top + ',' + pencil.bottom + ',' +pencil.left + ',' + pencil.right);
    //
    //     return !s;
    // }

    static isStrike2(bird, pencil, ind){
        let s = false;
        if(this.isStrikeX(bird, pencil, ind) && this.isStrikeY(bird, pencil,ind)) s = true;
        return s;
    }

    static isStrikeX(bird, pencil, ind){
        //如果鸟儿比管子宽不能用此碰撞模型, 弄错了x轴和y轴的方向，在上面的y反而小！通过投影可判断矩形相交
        let result = ((bird.right > pencil.left && bird.right <pencil.right) || (bird.left > pencil.left && bird.left <pencil.right))? true:false;
        return result;
    }

    static isStrikeY(bird, pencil, ind){
        //console.log(bird.top  + "," + pencil.bottom);
        let result = ((bird.top > pencil.top && bird.top < pencil.bottom) || (bird.bottom > pencil.top && bird.bottom <pencil.bottom))? true:false;
        return result;
    }

    //撞击判断
    check() {
        const birds = this.DataStore.get('birds');
        const land = this.DataStore.get('land');
        const pencils = this.DataStore.get('pencils');
        const score = this.DataStore.get('score');
        //地板撞击判断
        if(birds.birdsY[0] + birds.birdsHeight[0] >= land.y){
            //console.log(birds.birdsY[0] + ',' + birds.birdsHeight[0] + ',' + land.y);
            console.log('撞击地板啦');
            this.isGameOver = true;
            return;
        }

        //小鸟的边框模型
        const birdsBorder = {
            top: birds.birdsY[0] -1,
            bottom: birds.birdsY[0] + birds.birdsHeight[0]+6,
            left: birds.birdsX[0]+2,
            right: birds.birdsX[0] + birds.birdsWidth[0] - 5
        };

        //铅笔边框模型
        const length = pencils.length;
        for(let i=0; i<length; i++){
            const pencil = pencils[i];
            const pencilBorder = {
                top: pencil.y,
                bottom: pencil.y + pencil.height,
                left: pencil.x,
                right: pencil.x + pencil.width
            };

            //if(i==0&&(this.k++)%2==0) console.log(birdsBorder.top + "," + pencilBorder.bottom + Director.isStrike2(birdsBorder, pencilBorder));
            if (Director.isStrike2(birdsBorder, pencilBorder, i)) {
                console.log('撞到啦！');
                this.isGameOver = true;
            }
        }

        //加分逻辑
        // console.log(birds.birdsX[0] + ', ' + (pencils[0].x + pencils[0].width) +
        //  ', ' + (birds.birdsX[0] > pencils[0].x + pencils[0].width));
        if (birds.birdsX[0] > pencils[0].x + pencils[0].width
                && score.isScore ) {
            score.isScore = false;
            score.scoreNumber++;

        } else if(birds.birdsX[0] <= pencils[0].x + pencils[0].width) {
            score.isScore = true;
        }
    }

    run(){
        this.check();
        if(!this.isGameOver){
            this.DataStore.get('background').draw();
            const pencils = this.DataStore.get('pencils');
            if(pencils[0].x + pencils[0].width <=0 &&
                pencils.length===4){
                pencils.shift();
                pencils.shift();
            }

            if(pencils[0].x + pencils[0].width/2 <= DataStore.getInstance().canvas.width/2 - this.DataStore.get('score').scoreNumber*1 &&
                pencils.length === 2){
                //console.log(DataStore.getInstance().canvas.width/2 + this.DataStore.get('score').scoreNumber*12 );
                this.createPencil()
            }

            let self = this;

            //黑夜的来临与绘制
            this.score = this.DataStore.get('score');
            // if(this.score.scoreNumber >= 20){
            //     this.DataStore.get('backgroundBk').draw();
            //     this.DataStore.get('backgroundBk').moveDown();
            // }

            //管道移动逻辑
            this.DataStore.get('pencils').forEach(function (value) {
                value.speedUp(self.moveSpeed);
                value.speedUpVerti(self.vertiSpd);
                if(self.DataStore.get('score').scoreNumber > 3){
                    value.move();
                }
                value.draw();
                if(self.vertiSpd<0.4) self.vertiSpd += 0.00008;
            });

            this.DataStore.get('land').draw();
            this.DataStore.get('score').draw();
            this.DataStore.get('birds').draw();

            let timer = requestAnimationFrame(()=>this.run());
            this.DataStore.put('timer', timer);

            //变速部分
            this.moveSpeed += 0.0011;
            //地图移动部分
            if(this.score.scoreNumber > 5 && this.score.scoreNumber < 12){
                this.DataStore.get('background').moveUp();
            }
            if(this.score.scoreNumber >= 12 && this.score.scoreNumber < 30){
                this.DataStore.get('background').moveUp2();
            }
            if(this.score.scoreNumber >= 32 && this.score.scoreNumber < 50){
                this.DataStore.get('background').moveDown();
            }
            //地面移动部分
            if(this.score.scoreNumber > 5 && this.score.scoreNumber < 60){
                this.DataStore.get('land').moveDown();
            }
            //月球来临与绘制
            if(this.score.scoreNumber > 20){
                this.DataStore.get('moon').draw();
                this.DataStore.get('moon').moveUp();
            }
            //重力加强
            if(this.score.scoreNumber > 30){
                this.DataStore.get('birds').addGrativity();
            }

        }else {
            console.log('游戏结束');
            this.DataStore.get('background').draw();
            this.DataStore.get('pencils').forEach(function (value, index, array) {
                value.draw();
            });
            this.DataStore.get('land').draw();
            this.DataStore.get('score').draw();
            this.DataStore.get('birds').draw();
            this.DataStore.get('moon').draw();
            this.DataStore.get('backgroundTm').draw();
            this.DataStore.get('startButton').draw();
            cancelAnimationFrame(this.DataStore.get('timer'));
            this.DataStore.destroy();
            this.moveSpeed = 2;
            this.vertiSpd = 0;
        }
    }
}