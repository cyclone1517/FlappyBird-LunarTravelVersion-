"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Main = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); //初始化游戏精灵，作为游戏开始的入口


var _ResourceLoader = require("./js/base/ResourceLoader.js");

var _BackGround = require("./js/runtime/BackGround.js");

var _DataStore = require("./js/base/DataStore.js");

var _Director = require("./js/Director.js");

var _Land = require("./js/runtime/Land.js");

var _Birds = require("./js/player/Birds.js");

var _StartButton = require("./js/player/StartButton.js");

var _Score = require("./js/player/Score.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Main = exports.Main = function () {
    function Main() {
        var _this = this;

        _classCallCheck(this, Main);

        //this.canvas = document.getElementById('game_canvas');
        this.canvas = wx.createCanvas();
        this.ctx = this.canvas.getContext('2d');
        this.DataStore = _DataStore.DataStore.getInstance();
        this.director = _Director.Director.getIInstance();
        var loader = _ResourceLoader.ResourceLoader.create();
        loader.onloaded(function (map) {
            return _this.onResourceFirstLoaded(map);
        });
    }

    _createClass(Main, [{
        key: "onResourceFirstLoaded",
        value: function onResourceFirstLoaded(map) {
            this.DataStore.canvas = this.canvas;
            this.DataStore.ctx = this.ctx;
            this.DataStore.res = map;
            this.registerEvent();
            this.init();
        }
    }, {
        key: "init",
        value: function init() {
            this.director.isGameOver = false;

            this.DataStore.put('pencils', []).put('background', _BackGround.BackGround).put('land', _Land.Land).put('birds', _Birds.Birds).put('score', _Score.Score).put('startButton', _StartButton.StartButton);
            //创建铅笔在游戏逻辑之前
            // this.tcEvent = this.registerEvent();
            this.director.createPencil();
            this.director.run();
        }
    }, {
        key: "registerEvent",
        value: function registerEvent() {
            var _this2 = this;

            wx.onTouchStart(function () {
                if (_this2.director.isGameOver) {
                    console.log('游戏开始');
                    _this2.init();
                } else {
                    console.log('clicked');
                    _this2.director.birdsEvent();
                }
            });
        }
    }]);

    return Main;
}();
//# sourceMappingURL=Main.js.map