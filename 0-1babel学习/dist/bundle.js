"use strict";

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _set = require("babel-runtime/core-js/set");

var _set2 = _interopRequireDefault(_set);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var a = 1;

a = Math.pow(a, 2);


var b = new _set2.default([1, 3, 3, 4]);
console.log([].concat((0, _toConsumableArray3.default)(b)));

//添加注释 
var c = new _set2.default([2, 3, 4, 5]);
console.log([].concat((0, _toConsumableArray3.default)(c)));

var Foo = function () {
  function Foo() {
    (0, _classCallCheck3.default)(this, Foo);
  }

  (0, _createClass3.default)(Foo, [{
    key: "method",
    value: function method() {}
  }]);
  return Foo;
}();

//# sourceMappingURL=bundle.js.map