"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Pencil = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Sprite2 = require("../base/Sprite.js");

var _DataStore = require("../base/DataStore.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Pencil = exports.Pencil = function (_Sprite) {
    _inherits(Pencil, _Sprite);

    function Pencil(image, top) {
        _classCallCheck(this, Pencil);

        var _this = _possibleConstructorReturn(this, (Pencil.__proto__ || Object.getPrototypeOf(Pencil)).call(this, image, 0, 0, image.width, image.height, _DataStore.DataStore.getInstance().canvas.width, _DataStore.DataStore.getInstance().canvas.width + image.width, image.width, image.height));

        _this.top = top;
        _this.moveSpeed = 2;
        _this.vertiSpd = 0;
        return _this;
    }

    _createClass(Pencil, [{
        key: "draw",
        value: function draw() {
            this.x = this.x - this.moveSpeed;
            _get(Pencil.prototype.__proto__ || Object.getPrototypeOf(Pencil.prototype), "draw", this).call(this, this.img, 0, 0, this.img.width, this.img.height, this.x, this.y, this.img.width, this.img.height);
        }
    }, {
        key: "speedUp",
        value: function speedUp(speed) {
            this.moveSpeed = speed;
        }
    }]);

    return Pencil;
}(_Sprite2.Sprite);
//# sourceMappingURL=Pencil.js.map