"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.utils = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var utils = function () {
  /**
   * 防抖函数
   * @author Doctorwu
   * @date 2020-09-13
   * @param {any} func
   * @param {any} delay=500
   * @param {any} immediately=false
   * @returns {any}
   */
  function debounce(func) {
    var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
    var immediately = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var timer;

    if (!immediately) {
      return function () {
        var _this = this;

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        timer && clearTimeout(timer);
        timer = setTimeout(function () {
          func.apply(_this, args);
          timer = null;
        }, delay);
      };
    } else {
      return function () {
        timer && clearTimeout(timer);

        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        !timer && func.apply(this, args);
        timer = setTimeout(function () {
          timer = null;
        }, delay);
      };
    }
  }
  /**
   * 节流函数
   * @author Doctorwu
   * @date 2020-09-13
   * @param {any} func
   * @param {any} delay=300
   * @returns {any}
   */


  function throttle(func) {
    var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 300;
    var timer = null,
        previous = 0;
    return function anonymous() {
      var _this2 = this;

      for (var _len3 = arguments.length, params = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        params[_key3] = arguments[_key3];
      }

      var now = Date.now(),
          remaining = delay - (now - previous);

      if (remaining <= 0) {
        clearTimeout(timer);
        timer = null;
        previous = Date.now();
        func.apply(this, params);
      } else if (!timer) {
        timer = setTimeout(function () {
          timer = null;
          previous = Date.now();
          func.apply(_this2, params);
        }, remaining);
      }
    };
  }

  var class2type = {};
  var toString = class2type.toString; //Object.prototype.toString

  var hasOwn = class2type.hasOwnProperty; //Object.prototype.hasOwnProperty

  var fnToString = hasOwn.toString; //Function.prototype.toString

  var ObjectFunctionString = fnToString.call(Object); //"function Object() { [native code] }"

  var getProto = Object.getPrototypeOf; //获取对象原型链__proto__指向的原型
  // 建立数据类型检测的映射表 [object Xxx]:xxx

  ["Boolean", "Number", "String", "Function", "Array", "Date", "RegExp", "Object", "Error", "Symbol", "BigInt", "GeneratorFunction"].forEach(function (name) {
    class2type["[object ".concat(name, "]")] = name.toLowerCase();
  });
  /**
   * toType：数据类型检测的公共方法
   * @author Doctorwu
   * @date 2020-09-13
   * @param {any} obj
   * @returns {any}
   */

  function toType(obj) {
    // null/undefiend
    if (obj == null) {
      return obj + "";
    } // 基本数据类型检测基于typeof
    // 引用数据类型检测基于Object.prototype.toString.call


    return _typeof(obj) === "object" || typeof obj === "function" ? class2type[toString.call(obj)] || "object" : _typeof(obj);
  }
  /**
   * 检测是否为函数
   * @author Doctorwu
   * @date 2020-09-13
   * @param {any} obj
   * @returns {any}
   */

  /**
   * 检测是否为函数
   * @author Doctorwu
   * @date 2020-09-13
   * @param {any} obj
   * @returns {any}
   */


  var isFunction = function isFunction(obj) {
    // i.e., `typeof document.createElement( "object" ) === "function"`
    return typeof obj === "function" && typeof obj.nodeType !== "number";
  };
  /**
   * 检测是否为window对象
   * @author Doctorwu
   * @date 2020-09-13
   * @param {any} obj
   * @returns {any}
   */


  var isWindow = function isWindow(obj) {
    // window.window===window
    return obj != null && obj === obj.window;
  };
  /**
   * 检测是否为数组或者类数组
   * @author Doctorwu
   * @date 2020-09-13
   * @param {any} obj
   * @returns {any}
   */


  function isArrayLike(obj) {
    // length:对象的length属性值或者是false
    // type:获取检测值的数据类型
    var length = !!obj && "length" in obj && obj.length,
        type = toType(obj); // 函数和window一定不是数据或者类数组（但是他们确实有length属性）

    if (isFunction(obj) || isWindow(obj)) {
      return false;
    } // type === "array"：数组
    // length === 0：我们认为其是一空的类数组集合
    // (length - 1) in obj：对于非空集合，我们认为只要最大索引在对象中，则证明索引是逐级递增的（不准确）


    return type === "array" || length === 0 || typeof length === "number" && length > 0 && length - 1 in obj;
  }
  /**
   * 验证是否为空对象：主要是看当前对象中是否存在私有属性
   * @author Doctorwu
   * @date 2020-09-13
   * @param {any} obj
   * @returns {any}
   */


  function isEmptyObject(obj) {
    var name;

    for (name in obj) {
      if (!obj.hasOwnProperty(name)) break;
      return false;
    }

    return true;
  }
  /**
   * 是否为纯粹的对象
   * @author Doctorwu
   * @date 2020-09-13
   * @param {any} obj
   * @returns {any}
   */


  function isPlainObject(obj) {
    var proto, Ctor; // 基于toString.call返回结果不是[object Object]则一定不是纯粹的对象

    if (!obj || toString.call(obj) !== "[object Object]") {
      return false;
    } // 获取当前对象所属类的原型


    proto = getProto(obj); // Object.create(null)：创建一个空对象，但是没有__proto__

    if (!proto) return true; // Ctor：获取当前对象所属类的constructor
    // 纯粹对象的特点：直属类的原型一定是Object.prototype（DOM元素对象/自定义的实例对象...都不是）

    Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
    return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
  }
  /**
   * 断言函数
   * @author Doctorwu
   * @date 2020-09-15
   * @param {any} exp
   * @param {any} msg
   * @returns {any}
   */


  function assert(exp, msg) {
    if (!exp) {
      throw new Error(msg);
    }
  }

  function deepClone(obj) {
    var constructor = obj.constructor;
    if (obj === null) return obj;
    if (_typeof(obj) !== "object") return obj;
    if (/^RegExp|Date$/i.test(constructor.name)) return new constructor(obj);
    var clone = new constructor();

    for (var key in obj) {
      if (!obj.hasOwnProperty(key)) break;
      clone[key] = deepClone(obj[key]);
    }

    return clone;
  }

  return {
    deepClone: deepClone,
    assert: assert,
    debounce: debounce,
    throttle: throttle,
    toType: toType,
    isFunction: isFunction,
    isWindow: isWindow,
    isArrayLike: isArrayLike,
    isEmptyObject: isEmptyObject,
    isPlainObject: isPlainObject
  };
}();

exports.utils = utils;