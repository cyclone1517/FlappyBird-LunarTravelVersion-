//初始化游戏精灵，作为游戏开始的入口
import {ResourceLoader} from "./js/base/ResourceLoader.js";
import {BackGround} from "./js/runtime/BackGround.js";
import {DataStore} from "./js/base/DataStore.js";
import {Director} from "./js/Director.js";
import {Land} from "./js/runtime/Land.js";
import {Birds} from "./js/player/Birds.js";
import {StartButton} from "./js/player/StartButton.js";
import {Score} from "./js/player/Score.js";
import {BackgroundTm} from "./js/runtime/BackgroundTm.js";
import {Moon} from "./js/runtime/Moon.js";
import {BackgroundBk} from "./js/runtime/BackgroundBk.js";

export class Main{
    constructor(){
        //this.canvas = document.getElementById('game_canvas');
        this.canvas = wx.createCanvas();
        this.ctx = this.canvas.getContext('2d');
        this.DataStore = DataStore.getInstance();
        this.director = Director.getIInstance();
        const loader = ResourceLoader.create();
        loader.onloaded(map=>this.onResourceFirstLoaded(map));
    }

    onResourceFirstLoaded(map){
        this.DataStore.canvas = this.canvas;
        this.DataStore.ctx = this.ctx;
        this.DataStore.res = map;
        this.registerEvent();
        this.init()
    }

    init(){
        this.director.isGameOver = false;

        this.DataStore
            .put('pencils', [])
            .put('background', BackGround)
            .put('land', Land)
            .put('birds', Birds)
            .put('score',Score)
            .put('startButton', StartButton)
            .put('moon', Moon)
            .put('backgroundBk', BackgroundBk)
            .put('backgroundTm', BackgroundTm);
        //创建铅笔在游戏逻辑之前
        // this.tcEvent = this.registerEvent();
        this.director.createPencil();
        this.director.run();
    }

    registerEvent() {
        wx.onTouchStart(()=>{
            if (this.director.isGameOver) {
                console.log('游戏开始');
                this.init();
            } else {
                console.log('clicked');
                this.director.birdsEvent();
            }
        })
    }
}