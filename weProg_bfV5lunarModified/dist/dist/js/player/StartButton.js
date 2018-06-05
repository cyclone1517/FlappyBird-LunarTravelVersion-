"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.StartButton = undefined;

var _Sprite2 = require("../base/Sprite.js");

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var StartButton = exports.StartButton = function (_Sprite) {
    _inherits(StartButton, _Sprite);

    function StartButton() {
        _classCallCheck(this, StartButton);

        var image = _Sprite2.Sprite.getImage('startButton');
        return _possibleConstructorReturn(this, (StartButton.__proto__ || Object.getPrototypeOf(StartButton)).call(this, image, 0, 0, image.width, image.height, (window.innerWidth - image.width) / 2, (DataStore.getInstance().canvas.height - image.height) / 2.5, image.width, image.height));
    }

    return StartButton;
}(_Sprite2.Sprite);
//# sourceMappingURL=StartButton.js.map
//# sourceMappingURL=StartButton.js.map