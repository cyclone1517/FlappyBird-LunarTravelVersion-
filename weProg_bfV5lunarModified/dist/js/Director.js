"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Director = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); //导演类 控制游戏逻辑


var _DataStore = require("./base/DataStore.js");

var _UpPencil = require("./runtime/UpPencil.js");

var _DownPencil = require("./runtime/DownPencil.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Director = exports.Director = function () {
    _createClass(Director, null, [{
        key: "getIInstance",
        value: function getIInstance() {
            if (!Director.instance) {
                Director.instance = new Director();
            }
            return Director.instance;
        }
    }]);

    function Director() {
        _classCallCheck(this, Director);

        this.DataStore = _DataStore.DataStore.getInstance();
        this.moveSpeed = 2.0;
        this.vertiSpd = -0.1;
    }

    _createClass(Director, [{
        key: "createPencil",
        value: function createPencil() {
            var minTop = _DataStore.DataStore.getInstance().canvas.height / 8;
            var maxTop = _DataStore.DataStore.getInstance().canvas.height / 2;
            var top = minTop + Math.random() * (maxTop - minTop);
            this.DataStore.get('pencils').push(new _UpPencil.UpPencil(top));
            this.DataStore.get('pencils').push(new _DownPencil.DownPencil(top));
        }
    }, {
        key: "birdsEvent",
        value: function birdsEvent() {
            for (var i = 0; i <= 2; i++) {
                this.DataStore.get('birds').y[i] = this.DataStore.get('birds').birdsY[i];
            }
            this.DataStore.get('birds').time = 0;
        }
    }, {
        key: "check",


        //撞击判断
        value: function check() {
            var birds = this.DataStore.get('birds');
            var land = this.DataStore.get('land');
            var pencils = this.DataStore.get('pencils');
            var score = this.DataStore.get('score');
            //地板撞击判断
            if (birds.birdsY[0] + birds.birdsHeight[0] >= land.y) {
                //console.log(birds.birdsY[0] + ',' + birds.birdsHeight[0] + ',' + land.y);
                console.log('撞击地板啦');
                this.isGameOver = true;
                return;
            }

            //小鸟的边框模型
            var birdsBorder = {
                top: birds.y[0],
                bottom: birds.birdsY[0] + birds.birdsHeight[0],
                left: birds.birdsX[0],
                right: birds.birdsX[0] + birds.birdsWidth[0] - 5
            };

            //铅笔边框模型
            var length = pencils.length;
            for (var i = 0; i < length; i++) {
                var pencil = pencils[i];
                var pencilBorder = {
                    top: pencil.y,
                    bottom: pencil.y + pencil.height + 5,
                    left: pencil.x,
                    right: pencil.x + pencil.width
                };

                if (Director.isStrike(birdsBorder, pencilBorder)) {
                    console.log('撞到啦！');
                    this.isGameOver = true;
                }
            }

            //加分逻辑
            // console.log(birds.birdsX[0] + ', ' + (pencils[0].x + pencils[0].width) +
            //  ', ' + (birds.birdsX[0] > pencils[0].x + pencils[0].width));
            if (birds.birdsX[0] > pencils[0].x + pencils[0].width && score.isScore) {
                score.isScore = false;
                score.scoreNumber++;
            } else if (birds.birdsX[0] <= pencils[0].x + pencils[0].width) {
                score.isScore = true;
            }
        }
    }, {
        key: "run",
        value: function run() {
            var _this = this;

            this.check();
            if (!this.isGameOver) {
                this.DataStore.get('background').draw();
                var pencils = this.DataStore.get('pencils');
                if (pencils[0].x + pencils[0].width <= 0 && pencils.length === 4) {
                    pencils.shift();
                    pencils.shift();
                }

                if (pencils[0].x + pencils[0].width / 2 <= _DataStore.DataStore.getInstance().canvas.width / 2 && pencils.length === 2) {
                    this.createPencil();
                }

                var self = this;
                this.DataStore.get('pencils').forEach(function (value) {
                    value.speedUp(self.moveSpeed);
                    value.speedUpVerti(self.vertiSpd);
                    if (self.DataStore.get('score').scoreNumber > 3) {
                        value.move();
                    }
                    value.draw();
                    if (self.vertiSpd < 0.4) self.vertiSpd += 0.0001;
                    //console.log(self.vertiSpd);
                });

                this.DataStore.get('land').draw();
                this.DataStore.get('score').draw();
                this.DataStore.get('birds').draw();

                var timer = requestAnimationFrame(function () {
                    return _this.run();
                });
                this.DataStore.put('timer', timer);

                //变速部分
                this.moveSpeed += 0.001;
                //console.log(this.moveSpeed);
            } else {
                console.log('游戏结束');
                this.DataStore.get('background').draw();
                this.DataStore.get('pencils').forEach(function (value, index, array) {
                    value.draw();
                });
                this.DataStore.get('land').draw();
                this.DataStore.get('score').draw();
                this.DataStore.get('birds').draw();
                this.DataStore.get('startButton').draw();
                cancelAnimationFrame(this.DataStore.get('timer'));
                this.DataStore.destroy();
                this.moveSpeed = 2;
                this.vertiSpd = 0;
            }
        }
    }], [{
        key: "isStrike",
        value: function isStrike(bird, pencil) {
            var s = false;
            if (bird.top > pencil.bottom || bird.bottom < pencil.top || bird.right < pencil.left || bird.left > pencil.right) {
                s = true;
            }
            //console.log(pencil.top + ',' + pencil.bottom + ',' +pencil.left + ',' + pencil.right);

            return !s;
        }
    }]);

    return Director;
}();
//# sourceMappingURL=Director.js.map